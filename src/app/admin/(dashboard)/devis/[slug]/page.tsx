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
  DEFAULT_KARIMA_ESTIMATE,
  ClientEstimate,
  EstimateFeatureItem,
  EstimateInvestmentItem,
} from "@/features/devis";

/** Fixed 3-installment plan: 20 / 50 / 30 % */
const INSTALLMENT_PLAN = [
  { label: "Acompte à la signature", percentage: 20 },
  { label: "Livraison technique", percentage: 50 },
  { label: "Publication sur les stores", percentage: 30 },
] as const;

/** Parse a formatted amount string like "5 600" or "5600" → number */
function parseAmount(raw: string): number {
  return parseFloat(raw.replace(/\s/g, "").replace(",", ".")) || 0;
}

/** Format a number as "1 680" (French spacing, no decimals) */
function fmtAmount(n: number): string {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
}

export default function AdminDevisEditorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const isNew = slug === "new";
  const router = useRouter();

  const [form, setForm] = useState<ClientEstimate>({
    id: "",
    ...DEFAULT_KARIMA_ESTIMATE,
    slug: isNew ? "" : slug,
    client_name: isNew ? "" : DEFAULT_KARIMA_ESTIMATE.client_name,
    project_name: isNew ? "" : DEFAULT_KARIMA_ESTIMATE.project_name,
    total_amount: isNew ? "" : DEFAULT_KARIMA_ESTIMATE.total_amount,
    access_code: isNew ? "progix2026" : DEFAULT_KARIMA_ESTIMATE.access_code,
  });

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isNew) return;
    fetchEstimateBySlugAction(slug)
      .then((data) => {
        if (data) setForm(data);
        else setError("Devis introuvable.");
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Erreur de chargement"))
      .finally(() => setLoading(false));
  }, [slug, isNew]);

  /** Auto-computed installments derived from total_amount — not stored separately */
  const computedInstallments = useMemo(() => {
    const total = parseAmount(form.total_amount);
    return INSTALLMENT_PLAN.map(({ label, percentage }) => {
      const amount = (total * percentage) / 100;
      return { label, percentage, amount: `${fmtAmount(amount)} ${form.currency}` };
    });
  }, [form.total_amount, form.currency]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    // Always save the auto-computed installments so the document renders correctly
    const payload: ClientEstimate = {
      ...form,
      payment_installments: computedInstallments,
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

  function addInvestment() {
    const newItem: EstimateInvestmentItem = {
      id: `inv-${Date.now()}`,
      labelStrong: "Nouveau poste",
      label: " (détail complet)",
      amount: "500 €",
    };
    setForm((prev) => ({ ...prev, investments: [...prev.investments, newItem] }));
  }

  function removeInvestment(id: string) {
    setForm((prev) => ({
      ...prev,
      investments: prev.investments.filter((i) => i.id !== id),
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
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-[#67c8ff] px-5 py-2.5 text-sm font-semibold text-[#0a101d] transition hover:bg-[#85d4ff] disabled:opacity-50"
        >
          <Save className="size-4" />
          {saving ? "Enregistrement…" : "Enregistrer"}
        </button>
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

      <div className="mt-8 space-y-8">
        {/* Carte 1 : Identité & Sécurité */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#67c8ff]">
            <Lock className="size-4" />
            <h2>Identité & sécurité (accès client)</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block font-mono text-xs text-white/60">SLUG URL (UNIQUE)</label>
              <div className="mt-1 flex items-center rounded-lg border border-white/15 bg-black/40">
                <span className="pl-3 font-mono text-xs text-white/40">/devis/</span>
                <input
                  type="text"
                  required
                  value={form.slug}
                  disabled={!isNew}
                  onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().trim() })}
                  placeholder="ex : acme"
                  className="w-full bg-transparent px-2 py-2 text-sm text-white focus:outline-none disabled:text-white/40"
                />
              </div>
            </div>
            <div>
              <label className="block font-mono text-xs text-white/60">
                MOT DE PASSE CLIENT (PORTAIL)
              </label>
              <input
                type="text"
                required
                value={form.access_code}
                onChange={(e) => setForm({ ...form, access_code: e.target.value })}
                placeholder="ex : acme2026"
                className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#67c8ff] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-white/60">NOM DU CLIENT</label>
              <input
                type="text"
                required
                value={form.client_name}
                onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                placeholder="ex : Acme Corp"
                className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#67c8ff] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-white/60">NOM DU PROJET</label>
              <input
                type="text"
                required
                value={form.project_name}
                onChange={(e) => setForm({ ...form, project_name: e.target.value })}
                placeholder="ex : Trajeo (nom de travail)"
                className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#67c8ff] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Carte 2 : Tarification & Description */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#67c8ff]">
            <DollarSign className="size-4" />
            <h2>Tarification & description du projet</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
            <div>
              <label className="block font-mono text-xs text-white/60">
                DÉLAI DE LIVRAISON (JOURS)
              </label>
              <input
                type="text"
                required
                value={form.delivery_days}
                onChange={(e) => setForm({ ...form, delivery_days: e.target.value })}
                placeholder="ex : 90"
                className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#67c8ff] focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <label className="block font-mono text-xs text-white/60">
                TITRE DU PROJET (PAGE D&apos;ACCUEIL)
              </label>
              <input
                type="text"
                required
                value={form.project_title}
                onChange={(e) => setForm({ ...form, project_title: e.target.value })}
                placeholder="ex : plateforme de mobilité à la demande"
                className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#67c8ff] focus:outline-none"
              />
            </div>
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
            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="mkt-toggle"
                checked={form.marketing_included}
                onChange={(e) => setForm({ ...form, marketing_included: e.target.checked })}
                className="size-4 rounded border-white/20 bg-black/40 text-[#67c8ff]"
              />
              <label htmlFor="mkt-toggle" className="text-sm text-white">
                Accompagnement marketing premium inclus dans le forfait (badge page d&apos;accueil
                &amp; section 04)
              </label>
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
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#67c8ff]">
              <FileText className="size-4" />
              <h2>Décomposition de l&apos;investissement (section 03)</h2>
            </div>
            <button
              type="button"
              onClick={addInvestment}
              className="flex items-center gap-1 rounded bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-white hover:bg-white/[0.1]"
            >
              <Plus className="size-3" /> Ajouter un poste
            </button>
          </div>
          <div className="space-y-2">
            {form.investments.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.01] p-2.5"
              >
                <input
                  type="text"
                  value={inv.labelStrong || ""}
                  onChange={(e) => updateInvestment(inv.id, { labelStrong: e.target.value })}
                  placeholder="Poste principal (ex : App mobile)"
                  className="w-1/3 rounded border border-white/10 bg-black/40 px-2 py-1.5 text-xs font-semibold text-white focus:outline-none"
                />
                <input
                  type="text"
                  value={inv.label}
                  onChange={(e) => updateInvestment(inv.id, { label: e.target.value })}
                  placeholder="Détails"
                  className="flex-1 rounded border border-white/10 bg-black/40 px-2 py-1.5 text-xs text-white/80 focus:outline-none"
                />
                <input
                  type="text"
                  value={inv.amount}
                  onChange={(e) => updateInvestment(inv.id, { amount: e.target.value })}
                  placeholder="ex : 1 700 €"
                  className="w-28 rounded border border-white/10 bg-black/40 px-2 py-1.5 text-right font-mono text-xs font-bold text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeInvestment(inv.id)}
                  className="p-1 text-white/30 hover:text-red-400"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Carte 5 : Échéancier de paiement */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#67c8ff]">
            <Calendar className="size-4" />
            <h2>Échéancier & modalités de paiement (section 05)</h2>
          </div>
          <div className="flex gap-6 border-b border-white/10 pb-6">
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
                checked={form.payment_schedule_type === "installments"}
                onChange={() => setForm({ ...form, payment_schedule_type: "installments" })}
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
                Formule fixe : 20 % acompte · 50 % livraison technique · 30 % publication sur les
                stores.
              </p>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
