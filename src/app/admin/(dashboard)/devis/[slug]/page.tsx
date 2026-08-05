// typography-ok: admin interface uses standard apostrophes and labels
"use client";

import { useEffect, useState, use, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Layers,
  DollarSign,
  Calendar,
  Lock,
  FileText,
} from "lucide-react";
import {
  fetchEstimateBySlugAction,
  saveEstimateAction,
  resendClosingEmailAction,
  DEFAULT_ESTIMATE,
  ClientEstimate,
  EstimateFeatureItem,
  EstimateInvestmentItem,
} from "@/features/devis";
import { fetchClosersAction, Closer } from "@/features/closers";

/** Installment plans keyed by number of payments */
const INSTALLMENT_PLANS = {
  1: [{ label: "Paiement intégral à la signature", percentage: 100 }],
  2: [
    { label: "Acompte à la signature", percentage: 50 },
    { label: "Livraison technique", percentage: 50 },
  ],
  3: [
    { label: "Acompte à la signature", percentage: 30 },
    { label: "Livraison technique", percentage: 50 },
    { label: "Publication sur les stores", percentage: 20 },
  ],
} as const;

type InstallmentCount = keyof typeof INSTALLMENT_PLANS;

/** Parse a formatted amount string like "5 600" or "5600" → number */
function parseAmount(raw: string): number {
  return parseFloat(raw.replace(/\s/g, "").replace(",", ".")) || 0;
}

/** Strip a trailing " <currency>" suffix so an amount can be edited as a bare number */
function amountDigits(amount: string, currency: string): string {
  const suffix = ` ${currency}`;
  return amount.endsWith(suffix) ? amount.slice(0, -suffix.length) : amount;
}

/** Format a number as "1 680" (French spacing, no decimals) */
function fmtAmount(n: number): string {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
}

/** Fixed client-portal password \u2014 no longer admin-editable, always this value */
const AUTO_ACCESS_CODE = "progix2026";

/** Delivery time is always 90 days \u2014 no longer admin-editable */
const AUTO_DELIVERY_DAYS = "90";

/** Slug auto-derived from the client name (accent-stripped, dash-separated) */
function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AdminDevisEditorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const isNew = slug === "new";
  const router = useRouter();

  const [form, setForm] = useState<ClientEstimate>({
    id: "",
    ...DEFAULT_ESTIMATE,
    slug: isNew ? "" : slug,
    client_name: isNew ? "" : DEFAULT_ESTIMATE.client_name,
    project_name: isNew ? "" : DEFAULT_ESTIMATE.project_name,
    project_title: isNew ? "" : DEFAULT_ESTIMATE.project_title,
    project_description: isNew ? "" : DEFAULT_ESTIMATE.project_description,
    closer_id: isNew ? "" : DEFAULT_ESTIMATE.closer_id,
    total_amount: isNew ? "" : DEFAULT_ESTIMATE.total_amount,
    access_code: AUTO_ACCESS_CODE,
    delivery_days: AUTO_DELIVERY_DAYS,
    marketing_included: true,
  });

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [closers, setClosers] = useState<Closer[]>([]);
  const [resending, setResending] = useState(false);
  const [installmentCount, setInstallmentCount] = useState<InstallmentCount>(3);

  useEffect(() => {
    fetchClosersAction()
      .then(setClosers)
      .catch((e) => {
        console.error("Failed to load closers", e);
        setClosers([]);
        setError((prev) =>
          prev ??
          (e instanceof Error
            ? `Impossible de charger les closers : ${e.message}`
            : "Impossible de charger les closers.")
        );
      });
  }, []);

  async function handleResendEmail() {
    setResending(true);
    const res = await resendClosingEmailAction(form.slug);
    setResending(false);
    if (res.ok) alert("Email renvoyé au closer.");
    else alert(`Erreur : ${res.error}`);
  }

  useEffect(() => {
    if (isNew) return;
    fetchEstimateBySlugAction(slug)
      .then((data) => {
        if (data) {
          setForm(data);
          const count = data.payment_installments.length;
          if (data.payment_schedule_type === "installments" && (count === 1 || count === 2 || count === 3)) {
            setInstallmentCount(count);
          }
        } else setError("Devis introuvable.");
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Erreur de chargement"))
      .finally(() => setLoading(false));
  }, [slug, isNew]);

  /** Auto-computed installments derived from total_amount — not stored separately */
  const computedInstallments = useMemo(() => {
    const total = parseAmount(form.total_amount);
    return INSTALLMENT_PLANS[installmentCount].map(({ label, percentage }) => {
      const amount = (total * percentage) / 100;
      return { label, percentage, amount: `${fmtAmount(amount)} ${form.currency}` };
    });
  }, [form.total_amount, form.currency, installmentCount]);

  // Investment amounts always follow the currency chosen at the top of the
  // generator (DEVISE) — re-suffix every row whenever it changes so a row
  // typed under one currency never lingers with the old symbol.
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      investments: prev.investments.map((inv) =>
        inv.amount ? { ...inv, amount: `${fmtAmount(parseAmount(inv.amount))} ${prev.currency}` } : inv
      ),
    }));
  }, [form.currency]);

  const investmentsTotal = useMemo(
    () => form.investments.reduce((sum, inv) => sum + parseAmount(inv.amount), 0),
    [form.investments]
  );
  const targetTotal = parseAmount(form.total_amount);
  const investmentsMatchTarget = Math.round(investmentsTotal) === Math.round(targetTotal);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    // Always save the auto-computed installments, plus the fields no longer
    // admin-editable: fixed portal password, fixed 90-day delivery, project
    // title mirroring the project name, and marketing always included.
    const payload: ClientEstimate = {
      ...form,
      payment_installments: computedInstallments,
      access_code: AUTO_ACCESS_CODE,
      delivery_days: AUTO_DELIVERY_DAYS,
      project_title: form.project_name,
      marketing_included: true,
    };

    const res = await saveEstimateAction(payload);
    setSaving(false);
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      if (isNew && res.slug !== "new") {
        router.push(`/admin/devis/${res.slug}`);
      }
    } else {
      setError(res.error);
    }
  }

  function addFeature(category: "dev" | "api" | "marketing") {
    const newItem: EstimateFeatureItem = {
      id: `custom-${Date.now()}`,
      category,
      labelStrong: "Nouvelle prestation",
      label: " — description personnalisée",
      included: true,
      isCustom: true,
    };
    setForm((prev) => ({ ...prev, features: [...prev.features, newItem] }));
  }

  function removeFeature(id: string) {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f.id !== id),
    }));
  }

  function updateFeature(id: string, updates: Partial<EstimateFeatureItem>) {
    setForm((prev) => ({
      ...prev,
      features: prev.features.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    }));
  }

  function updateInvestment(id: string, updates: Partial<EstimateInvestmentItem>) {
    setForm((prev) => ({
      ...prev,
      investments: prev.investments.map((i) => (i.id === id ? { ...i, ...updates } : i)),
    }));
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-white/40">
        <span className="mr-3 size-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        Chargement de la proposition…
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-5xl px-8 py-12">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/devis"
            className="mb-2 inline-flex items-center gap-2 font-mono text-xs text-white/45 transition hover:text-white"
          >
            <ArrowLeft className="size-3" /> RETOUR AUX PROPOSITIONS
          </Link>
          <h1 className="text-3xl font-bold tracking-[-0.02em] text-white">
            {isNew ? "Créer une proposition client" : `Éditer : ${form.client_name || form.slug}`}
          </h1>
        </div>
        {form.locked ? (
          <span className="rounded-lg bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-white/50">
            Verrouillé
          </span>
        ) : (
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-[#67c8ff] px-5 py-2.5 text-sm font-semibold text-[#0a101d] transition hover:bg-[#85d4ff] disabled:opacity-50"
          >
            <Save className="size-4" />
            {saving ? "Enregistrement…" : "Enregistrer"}
          </button>
        )}
      </div>

      {error && (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          <AlertCircle className="size-5 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
          <CheckCircle2 className="size-5 shrink-0 text-emerald-400" />
          <span>Devis enregistré avec succès !</span>
        </div>
      )}

      {form.locked && (
        <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-2">
              <Lock className="size-4 shrink-0" />
              Signé{form.signature ? ` le ${new Date(form.signature.signed_at).toLocaleDateString("fr-FR")}` : ""} — verrouillé, non modifiable.
            </span>
            <button
              type="button"
              onClick={handleResendEmail}
              disabled={resending}
              className="shrink-0 rounded-lg bg-amber-500/20 px-3 py-1.5 text-xs font-semibold text-amber-100 transition hover:bg-amber-500/30 disabled:opacity-50"
            >
              {resending ? "Envoi…" : "Renvoyer l'email au closer"}
            </button>
          </div>
          <p className="mt-2 text-xs text-amber-200/80">
            {form.pdf_email_sent_at
              ? `Email envoyé au closer le ${new Date(form.pdf_email_sent_at).toLocaleString("fr-FR")}.`
              : "⚠ Email jamais envoyé avec succès au closer — utilisez « Renvoyer l'email »."}
          </p>
        </div>
      )}

      <fieldset disabled={form.locked} className="contents">
        <div className="mt-8 space-y-8">
        {/* Carte 1 : Identité & Sécurité */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#67c8ff]">
            <Lock className="size-4" />
            <h2>Identité & sécurité (accès client)</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block font-mono text-xs text-white/60">NOM DU CLIENT</label>
              <input
                type="text"
                required
                value={form.client_name}
                onChange={(e) => {
                  const value = e.target.value;
                  setForm((prev) => ({
                    ...prev,
                    client_name: value,
                    slug: isNew ? slugify(value) : prev.slug,
                  }));
                }}
                placeholder="ex : Acme Corp"
                className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#67c8ff] focus:outline-none"
              />
              {isNew && form.slug && (
                <p className="mt-1 font-mono text-[11px] text-white/40">/devis/{form.slug}</p>
              )}
            </div>
            <div>
              <label className="block font-mono text-xs text-white/60">NOM DU PROJET</label>
              <input
                type="text"
                required
                value={form.project_name}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    project_name: e.target.value,
                    project_title: e.target.value,
                  }))
                }
                placeholder="ex : Trajeo (nom de travail)"
                className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#67c8ff] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-white/60">CLOSER ASSIGNÉ</label>
              <select
                required
                value={form.closer_id ?? ""}
                onChange={(e) => setForm({ ...form, closer_id: e.target.value })}
                className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#67c8ff] focus:outline-none"
              >
                <option value="" disabled>
                  Sélectionner un closer…
                </option>
                {closers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.first_name} {c.last_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Carte 2 : Tarification & Description */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#67c8ff]">
            <DollarSign className="size-4" />
            <h2>Tarification & description du projet</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block font-mono text-xs text-white/60">DEVISE</label>
              <select
                value={form.currency}
                onChange={(e) => setForm({ ...form, currency: e.target.value as "€" | "$CAD" })}
                className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#67c8ff] focus:outline-none"
              >
                <option value="€">Euro (€)</option>
                <option value="$CAD">Dollar canadien ($CAD)</option>
              </select>
            </div>
            <div>
              <label className="block font-mono text-xs text-white/60">
                MONTANT TOTAL DU FORFAIT
              </label>
              <input
                type="text"
                required
                value={form.total_amount}
                onChange={(e) => setForm({ ...form, total_amount: e.target.value })}
                placeholder="ex : 5 600"
                className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#67c8ff] focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <label className="block font-mono text-xs text-white/60">
                DESCRIPTION DÉTAILLÉE DU PROJET
              </label>
              <textarea
                rows={3}
                required
                value={form.project_description}
                onChange={(e) => setForm({ ...form, project_description: e.target.value })}
                className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#67c8ff] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Carte 3 : Prestations */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#67c8ff]">
              <Layers className="size-4" />
              <h2>Prestations incluses (section 02)</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => addFeature("dev")}
                className="flex items-center gap-1 rounded bg-white/[0.06] px-2.5 py-1 text-xs text-white/80 hover:bg-white/[0.1]"
              >
                <Plus className="size-3" /> + Développement
              </button>
              <button
                type="button"
                onClick={() => addFeature("api")}
                className="flex items-center gap-1 rounded bg-white/[0.06] px-2.5 py-1 text-xs text-white/80 hover:bg-white/[0.1]"
              >
                <Plus className="size-3" /> + API / Infra
              </button>
              <button
                type="button"
                onClick={() => addFeature("marketing")}
                className="flex items-center gap-1 rounded bg-white/[0.06] px-2.5 py-1 text-xs text-white/80 hover:bg-white/[0.1]"
              >
                <Plus className="size-3" /> + Marketing
              </button>
            </div>
          </div>
          <p className="mb-4 text-xs text-white/50">
            Cochez pour inclure dans le devis ou ajoutez vos propres éléments personnalisés.
          </p>
          <div className="max-h-96 space-y-2 overflow-y-auto pr-2">
            {form.features.map((feat) => (
              <div
                key={feat.id}
                className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.01] p-2.5 transition hover:bg-white/[0.03]"
              >
                <input
                  type="checkbox"
                  checked={feat.included}
                  onChange={(e) => updateFeature(feat.id, { included: e.target.checked })}
                  className="size-4 rounded border-white/20 bg-black/40 text-[#67c8ff]"
                />
                <span className="w-24 shrink-0 font-mono text-[10px] text-white/40 uppercase">
                  [{feat.category}]
                </span>
                <input
                  type="text"
                  value={feat.labelStrong || ""}
                  onChange={(e) => updateFeature(feat.id, { labelStrong: e.target.value })}
                  placeholder="Titre (ex : Application mobile)"
                  className="w-1/3 rounded border border-white/10 bg-black/40 px-2 py-1 text-xs font-semibold text-white focus:outline-none"
                />
                <input
                  type="text"
                  value={feat.label}
                  onChange={(e) => updateFeature(feat.id, { label: e.target.value })}
                  placeholder="Détail (ex : design sur mesure)"
                  className="flex-1 rounded border border-white/10 bg-black/40 px-2 py-1 text-xs text-white/80 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(feat.id)}
                  className="p-1 text-white/30 hover:text-red-400"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Carte 4 : Décomposition de l'investissement */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#67c8ff]">
            <FileText className="size-4" />
            <h2>Décomposition de l&apos;investissement (section 03)</h2>
          </div>
          <p className="mb-4 text-xs text-white/50">
            Seul le poste &laquo; Application mobile &raquo; est modifiable, pour ajuster le tarif
            du devis. Les autres postes sont fixes.
          </p>
          <div className="space-y-2">
            {form.investments.map((inv, idx) => {
              const editable = idx === 0;
              return (
                <div
                  key={inv.id}
                  className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.01] p-2.5"
                >
                  <input
                    type="text"
                    value={inv.label}
                    disabled={!editable}
                    onChange={(e) => updateInvestment(inv.id, { label: e.target.value })}
                    placeholder="Détails"
                    className="flex-1 rounded border border-white/10 bg-black/40 px-2 py-1.5 text-xs text-white/80 focus:outline-none disabled:text-white/40"
                  />
                  <div className="flex w-32 shrink-0 items-center gap-1.5">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={amountDigits(inv.amount, form.currency)}
                      disabled={!editable}
                      onChange={(e) =>
                        updateInvestment(inv.id, {
                          amount: e.target.value ? `${e.target.value} ${form.currency}` : "",
                        })
                      }
                      placeholder="1 700"
                      className="w-full min-w-0 rounded border border-white/10 bg-black/40 px-2 py-1.5 text-right font-mono text-xs font-bold text-white focus:outline-none disabled:text-white/40"
                    />
                    <span className="shrink-0 font-mono text-[11px] text-white/40">
                      {form.currency}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className={`mt-3 flex items-center justify-between rounded-lg border px-3 py-2 ${
              investmentsMatchTarget
                ? "border-emerald-500/20 bg-emerald-500/[0.06]"
                : "border-red-500/20 bg-red-500/[0.06]"
            }`}
          >
            <span className="flex items-center gap-1.5 text-xs font-medium text-white/70">
              {investmentsMatchTarget ? (
                <CheckCircle2 className="size-3.5 text-emerald-400" />
              ) : (
                <AlertCircle className="size-3.5 text-red-400" />
              )}
              Total des postes
            </span>
            <span className="font-mono text-sm font-bold text-white">
              {fmtAmount(investmentsTotal)} {form.currency}
              <span className="ml-2 font-normal text-white/40">
                / {fmtAmount(targetTotal)} {form.currency} visé
              </span>
            </span>
          </div>
        </div>

        {/* Carte 5 : Échéancier de paiement */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#67c8ff]">
            <Calendar className="size-4" />
            <h2>Échéancier & modalités de paiement (section 05)</h2>
          </div>
          <div className="flex flex-wrap gap-6 border-b border-white/10 pb-6">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="sched_type"
                checked={form.payment_schedule_type === "monthly"}
                onChange={() => setForm({ ...form, payment_schedule_type: "monthly" })}
                className="size-4 text-[#67c8ff]"
              />
              <span className="text-sm font-medium text-white">Paiement mensuel</span>
            </label>
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="sched_type"
                checked={form.payment_schedule_type === "installments" && installmentCount === 1}
                onChange={() => {
                  setInstallmentCount(1);
                  setForm({ ...form, payment_schedule_type: "installments" });
                }}
                className="size-4 text-[#67c8ff]"
              />
              <span className="text-sm font-medium text-white">Paiement en 1 fois</span>
            </label>
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="sched_type"
                checked={form.payment_schedule_type === "installments" && installmentCount === 2}
                onChange={() => {
                  setInstallmentCount(2);
                  setForm({ ...form, payment_schedule_type: "installments" });
                }}
                className="size-4 text-[#67c8ff]"
              />
              <span className="text-sm font-medium text-white">Paiement en 2 fois</span>
            </label>
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="sched_type"
                checked={form.payment_schedule_type === "installments" && installmentCount === 3}
                onChange={() => {
                  setInstallmentCount(3);
                  setForm({ ...form, payment_schedule_type: "installments" });
                }}
                className="size-4 text-[#67c8ff]"
              />
              <span className="text-sm font-medium text-white">Plan en 3 versements</span>
            </label>
          </div>

          {form.payment_schedule_type === "monthly" ? (
            <div className="pt-6">
              <label className="block font-mono text-xs text-white/60">
                NOMBRE DE MOIS DE PAIEMENT
              </label>
              <input
                type="number"
                min={1}
                max={36}
                value={form.payment_months}
                onChange={(e) =>
                  setForm({ ...form, payment_months: parseInt(e.target.value || "6", 10) })
                }
                className="mt-1 w-48 rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:outline-none"
              />
              <p className="mt-2 text-xs text-white/50">
                Section 05 affichera : &laquo; Paiement mensuel d&apos;environ{" "}
                {fmtAmount(parseAmount(form.total_amount) / form.payment_months)} {form.currency} /
                mois pendant {form.payment_months} mois. &raquo;
              </p>
            </div>
          ) : (
            <div className="pt-6">
              <p className="mb-4 text-xs text-white/50">
                Les montants sont calculés automatiquement à partir du montant total du forfait.
              </p>
              <div className="space-y-3">
                {computedInstallments.map((inst, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 rounded-lg border border-white/5 bg-white/[0.01] px-4 py-3"
                  >
                    <span className="w-6 text-center font-mono text-sm font-bold text-[#67c8ff]">
                      {idx + 1}
                    </span>
                    <span className="flex-1 text-sm text-white">{inst.label}</span>
                    <span className="w-12 text-right font-mono text-xs text-white/60">
                      {inst.percentage}%
                    </span>
                    <span className="w-28 rounded border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-right font-mono text-sm font-bold text-emerald-300">
                      {inst.amount}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-white/40">
                Formule fixe :{" "}
                {INSTALLMENT_PLANS[installmentCount]
                  .map((p) => `${p.percentage} % ${p.label.toLowerCase()}`)
                  .join(" · ")}
                .
              </p>
            </div>
          )}
        </div>
      </div>
      </fieldset>
    </form>
  );
}
