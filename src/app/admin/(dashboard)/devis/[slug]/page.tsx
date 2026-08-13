// typography-ok: admin interface uses standard apostrophes and labels
"use client";

import { useEffect, useState, use, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  CheckCircle2,
  AlertCircle,
  Layers,
  DollarSign,
  Calendar,
  Lock,
  FileText,
  Sparkles,
  FilePlus,
  ExternalLink,
} from "lucide-react";
import {
  fetchEstimateBySlugAction,
  saveEstimateAction,
  resendClosingEmailAction,
  parseCloserPromptAction,
  buildDraftFormFromAi,
  buildEstimateFromPromptForm,
  slugify,
  DEFAULT_ESTIMATE,
  ClientEstimate,
  EstimateFeatureItem,
  EstimateInvestmentItem,
  CloserPromptFormState,
  FunctionalitySlot,
  INSTALLMENT_PLANS,
  InstallmentCount,
  parseAmount,
  fmtAmount,
  amountDigits,
  AUTO_ACCESS_CODE,
  DELIVERY_DAY_OPTIONS,
} from "@/features/devis";
import { fetchClosersAction, Closer } from "@/features/closers";

type Mode = "vierge" | "prompt";

const PAYMENT_MODALITIES_LABELS: Record<CloserPromptFormState["paymentModalities"], string> = {
  "1x": "Paiement en 1 fois",
  "2x": "Paiement en 2 fois",
  "3x": "Paiement en 3 fois",
  mensualité: "Mensualité",
};

// Identifies the (up to 6) "Fonctionnalité N" placeholder dev features so
// Carte 3 can show only those — computed once per load, not on every
// keystroke, so a slot doesn't vanish from the UI the moment its placeholder
// text is replaced with a real feature name.
const FEATURE_SLOT_LABEL = /^fonctionnalit[eé]\s*\d+$/i;

function getFeatureSlotIds(features: EstimateFeatureItem[]): string[] {
  return features
    .filter((f) => f.category === "dev" && FEATURE_SLOT_LABEL.test((f.labelStrong ?? "").trim()))
    .map((f) => f.id);
}

export default function AdminDevisEditorPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ mode?: string }>;
}) {
  const { slug } = use(params);
  const { mode: modeParam } = use(searchParams);
  const isNew = slug === "new";
  const router = useRouter();

  const [mode, setMode] = useState<Mode>(modeParam === "prompt" ? "prompt" : "vierge");

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
    marketing_included: true,
  });

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [closers, setClosers] = useState<Closer[]>([]);
  const [resending, setResending] = useState(false);
  const [installmentCount, setInstallmentCount] = useState<InstallmentCount>(3);
  const [featureSlotIds, setFeatureSlotIds] = useState<string[]>(() =>
    getFeatureSlotIds(DEFAULT_ESTIMATE.features)
  );

  // "Depuis un prompt" mode state — kept entirely separate from `form`
  // (the full ClientEstimate shape) since the review form only has the 9
  // reduced fields from the boss's spec, not the full editor's shape.
  const [closerPrompt, setCloserPrompt] = useState("");
  const [extracting, setExtracting] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiWarnings, setAiWarnings] = useState<string[]>([]);
  const [promptForm, setPromptForm] = useState<CloserPromptFormState | null>(null);

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

  function switchMode(next: Mode) {
    setMode(next);
    setCloserPrompt("");
    setAiError(null);
    setAiWarnings([]);
    setPromptForm(null);
    setError(null);
  }

  async function handleExtract() {
    setExtracting(true);
    setAiError(null);
    setAiWarnings([]);

    const res = await parseCloserPromptAction(closerPrompt);
    setExtracting(false);

    if (!res.ok) {
      setAiError(res.error);
      return;
    }

    const { form: draftForm, warnings } = buildDraftFormFromAi(res.draft, closers);
    setPromptForm(draftForm);
    setAiWarnings(warnings);
  }

  function updatePromptForm(updates: Partial<CloserPromptFormState>) {
    setPromptForm((prev) => (prev ? { ...prev, ...updates } : prev));
  }

  function updateFunctionalitySlot(index: number, updates: Partial<FunctionalitySlot>) {
    setPromptForm((prev) => {
      if (!prev) return prev;
      const functionalities = prev.functionalities.map((slot, i) =>
        i === index ? { ...slot, ...updates } : slot
      );
      return { ...prev, functionalities };
    });
  }

  const canValidatePromptForm =
    !!promptForm &&
    promptForm.clientName.trim() !== "" &&
    promptForm.projectName.trim() !== "" &&
    promptForm.price.trim() !== "";

  async function handleValidatePromptForm(e: React.FormEvent) {
    e.preventDefault();
    if (!promptForm) return;
    setSaving(true);
    setError(null);

    const estimate = buildEstimateFromPromptForm(promptForm);
    const res = await saveEstimateAction(estimate);
    setSaving(false);

    if (res.ok) {
      router.push(`/admin/devis/${res.slug}`);
    } else {
      setError(res.error);
    }
  }

  useEffect(() => {
    if (isNew) return;
    fetchEstimateBySlugAction(slug)
      .then((data) => {
        if (data) {
          setForm(data);
          setFeatureSlotIds(getFeatureSlotIds(data.features));
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
    // admin-editable: fixed portal password, project title mirroring the
    // project name, and marketing always included. delivery_days is a real
    // editable field (see DELIVERY_DAY_OPTIONS select below) — it must NOT
    // be overwritten here, or a value set via the "depuis un prompt" flow
    // would revert on the very next save.
    const payload: ClientEstimate = {
      ...form,
      payment_installments: computedInstallments,
      access_code: AUTO_ACCESS_CODE,
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

  const showFullForm = !isNew || mode === "vierge";

  return (
    <div className="mx-auto max-w-5xl px-8 py-12">
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
        <div className="flex items-center gap-3">
          {!isNew && (
            <Link
              href={`/devis/${form.slug}`}
              target="_blank"
              className="flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/[0.06]"
            >
              <ExternalLink className="size-4" />
              Voir le devis
            </Link>
          )}
          {form.locked ? (
            <span className="rounded-lg bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-white/50">
              Verrouillé
            </span>
          ) : showFullForm ? (
            <button
              type="submit"
              form="devis-form"
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-[#67c8ff] px-5 py-2.5 text-sm font-semibold text-[#0a101d] transition hover:bg-[#85d4ff] disabled:opacity-50"
            >
              <Save className="size-4" />
              {saving ? "Enregistrement…" : "Enregistrer"}
            </button>
          ) : null}
        </div>
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
            {form.closer_id && (
              <button
                type="button"
                onClick={handleResendEmail}
                disabled={resending}
                className="shrink-0 rounded-lg bg-amber-500/20 px-3 py-1.5 text-xs font-semibold text-amber-100 transition hover:bg-amber-500/30 disabled:opacity-50"
              >
                {resending ? "Envoi…" : "Renvoyer l'email au closer"}
              </button>
            )}
          </div>
          {/* No closer assigned → no email is ever sent, so the "jamais envoyé"
              warning below would be a false alarm. */}
          <p className="mt-2 text-xs text-amber-200/80">
            {!form.closer_id
              ? "Aucun closer assigné — aucun email n'est envoyé pour ce devis."
              : form.pdf_email_sent_at
                ? `Email envoyé au closer le ${new Date(form.pdf_email_sent_at).toLocaleString("fr-FR")}.`
                : "⚠ Email jamais envoyé avec succès au closer — utilisez « Renvoyer l'email »."}
          </p>
        </div>
      )}

      {isNew && (
        <div className="mt-8 inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.02] p-1">
          <button
            type="button"
            onClick={() => switchMode("vierge")}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold transition ${
              mode === "vierge" ? "bg-[#67c8ff] text-[#0a101d]" : "text-white/60 hover:text-white"
            }`}
          >
            <FilePlus className="size-3.5" />
            Vierge
          </button>
          <button
            type="button"
            onClick={() => switchMode("prompt")}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold transition ${
              mode === "prompt" ? "bg-[#67c8ff] text-[#0a101d]" : "text-white/60 hover:text-white"
            }`}
          >
            <Sparkles className="size-3.5" />
            Depuis un prompt
          </button>
        </div>
      )}

      {isNew && mode === "prompt" && (
        <div className="mt-6 space-y-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#67c8ff]">
              <Sparkles className="size-4" />
              <h2>Prompt closer</h2>
            </div>
            <p className="mb-4 text-xs text-white/50">
              Colle ici le résultat de ton prompt.
            </p>
            <textarea
              rows={8}
              value={closerPrompt}
              onChange={(e) => setCloserPrompt(e.target.value)}
              placeholder="Colle ici le texte généré par ton prompt…"
              className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#67c8ff] focus:outline-none"
            />

            {aiError && (
              <div className="mt-3 flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
                <AlertCircle className="size-4 shrink-0 text-red-400" />
                <span>{aiError}</span>
              </div>
            )}

            {aiWarnings.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {aiWarnings.map((w, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-2.5 text-xs text-amber-200"
                  >
                    <AlertCircle className="mt-0.5 size-3.5 shrink-0 text-amber-400" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleExtract}
                disabled={extracting || !closerPrompt.trim()}
                className="flex items-center gap-2 rounded-lg bg-[#67c8ff] px-4 py-2 text-sm font-semibold text-[#0a101d] transition hover:bg-[#85d4ff] disabled:opacity-50"
              >
                <Sparkles className="size-4" />
                {extracting ? "Extraction…" : "Extraire les informations"}
              </button>
            </div>
          </div>

          {promptForm && (
            <form onSubmit={handleValidatePromptForm} className="space-y-6">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#67c8ff]">
                  <Lock className="size-4" />
                  <h2>Informations extraites — à relire avant validation</h2>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block font-mono text-xs text-white/60">NOM DU CLIENT</label>
                    <input
                      type="text"
                      required
                      value={promptForm.clientName}
                      onChange={(e) => updatePromptForm({ clientName: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#67c8ff] focus:outline-none"
                    />
                    {promptForm.clientName && (
                      <p className="mt-1 font-mono text-[11px] text-white/40">
                        /devis/{slugify(promptForm.clientName)}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-white/60">NOM DU PROJET</label>
                    <input
                      type="text"
                      required
                      value={promptForm.projectName}
                      onChange={(e) => updatePromptForm({ projectName: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#67c8ff] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-white/60">CLOSER ASSIGNÉ</label>
                    <select
                      value={promptForm.closerId}
                      onChange={(e) => updatePromptForm({ closerId: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#67c8ff] focus:outline-none"
                    >
                      <option value="">Pas de closer</option>
                      {closers.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.first_name} {c.last_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-white/60">DEVISE</label>
                    <select
                      value={promptForm.currency}
                      onChange={(e) =>
                        updatePromptForm({ currency: e.target.value as "€" | "$CAD" })
                      }
                      className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#67c8ff] focus:outline-none"
                    >
                      <option value="€">Euro (€)</option>
                      <option value="$CAD">Dollar canadien ($CAD)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-white/60">PRIX</label>
                    <input
                      type="number"
                      required
                      min={0}
                      step={1}
                      value={promptForm.price}
                      onChange={(e) =>
                        updatePromptForm({ price: e.target.value.replace(/[^\d]/g, "") })
                      }
                      placeholder="12480"
                      className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#67c8ff] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-white/60">DÉLAI RECOMMANDÉ</label>
                    <select
                      value={promptForm.timeRecommanded}
                      onChange={(e) =>
                        updatePromptForm({
                          timeRecommanded: e.target.value as CloserPromptFormState["timeRecommanded"],
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#67c8ff] focus:outline-none"
                    >
                      {DELIVERY_DAY_OPTIONS.map((d) => (
                        <option key={d} value={d}>
                          {d} jours
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-white/60">MODALITÉ DE PAIEMENT</label>
                    <select
                      value={promptForm.paymentModalities}
                      onChange={(e) =>
                        updatePromptForm({
                          paymentModalities: e.target
                            .value as CloserPromptFormState["paymentModalities"],
                        })
                      }
                      className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#67c8ff] focus:outline-none"
                    >
                      {Object.entries(PAYMENT_MODALITIES_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {promptForm.paymentModalities === "mensualité" && (
                    <div>
                      <label className="block font-mono text-xs text-white/60">
                        NOMBRE DE MOIS
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={36}
                        value={promptForm.paymentMonths}
                        onChange={(e) => updatePromptForm({ paymentMonths: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#67c8ff] focus:outline-none"
                      />
                    </div>
                  )}
                </div>
                <div className="mt-6">
                  <label className="block font-mono text-xs text-white/60">
                    DESCRIPTION DÉTAILLÉE DU PROJET
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={promptForm.fullDescription}
                    onChange={(e) => updatePromptForm({ fullDescription: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#67c8ff] focus:outline-none"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#67c8ff]">
                  <Layers className="size-4" />
                  <h2>Fonctionnalités (jusqu&apos;à 6)</h2>
                </div>
                <p className="mb-4 text-xs text-white/50">
                  Décoche celles à ne pas inclure. Tu peux aussi corriger le texte.
                </p>
                <div className="space-y-2">
                  {promptForm.functionalities.map((slot, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.01] p-2.5"
                    >
                      <input
                        type="checkbox"
                        checked={slot.included}
                        onChange={(e) =>
                          updateFunctionalitySlot(idx, { included: e.target.checked })
                        }
                        className="size-4 rounded border-white/20 bg-black/40 text-[#67c8ff]"
                      />
                      <input
                        type="text"
                        value={slot.text}
                        onChange={(e) => updateFunctionalitySlot(idx, { text: e.target.value })}
                        placeholder={`Fonctionnalité ${idx + 1}`}
                        className="flex-1 rounded border border-white/10 bg-black/40 px-2 py-1.5 text-xs text-white/80 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving || !canValidatePromptForm}
                  className="flex items-center gap-2 rounded-lg bg-[#67c8ff] px-5 py-2.5 text-sm font-semibold text-[#0a101d] transition hover:bg-[#85d4ff] disabled:opacity-50"
                >
                  <Save className="size-4" />
                  {saving ? "Création…" : "Valider et créer le devis"}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {showFullForm && (
        <form id="devis-form" onSubmit={handleSubmit}>
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
                value={form.closer_id ?? ""}
                onChange={(e) => setForm({ ...form, closer_id: e.target.value })}
                className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#67c8ff] focus:outline-none"
              >
                <option value="">Pas de closer</option>
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
            <div>
              <label className="block font-mono text-xs text-white/60">DÉLAI RECOMMANDÉ</label>
              <select
                value={form.delivery_days}
                onChange={(e) => setForm({ ...form, delivery_days: e.target.value })}
                className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#67c8ff] focus:outline-none"
              >
                {DELIVERY_DAY_OPTIONS.map((d) => (
                  <option key={d} value={d}>
                    {d} jours
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-mono text-xs text-white/60">DURÉE DE DÉVELOPPEMENT</label>
              <select
                value={form.dev_duration_days}
                onChange={(e) => setForm({ ...form, dev_duration_days: e.target.value })}
                className="mt-1 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[#67c8ff] focus:outline-none"
              >
                {DELIVERY_DAY_OPTIONS.map((d) => (
                  <option key={d} value={d}>
                    {d} jours
                  </option>
                ))}
              </select>
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
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#67c8ff]">
            <Layers className="size-4" />
            <h2>Prestations incluses (section 02)</h2>
          </div>
          <p className="mb-4 text-xs text-white/50">
            Jusqu&apos;à 6 fonctionnalités spécifiques au projet. Les autres prestations
            (application, back-office, API, marketing…) sont toujours incluses dans le devis et ne
            se configurent pas ici.
          </p>
          <div className="space-y-2">
            {form.features
              .filter((feat) => featureSlotIds.includes(feat.id))
              .map((feat, idx) => (
                <div
                  key={feat.id}
                  className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.01] p-2.5"
                >
                  <input
                    type="checkbox"
                    checked={feat.included}
                    onChange={(e) => updateFeature(feat.id, { included: e.target.checked })}
                    className="size-4 rounded border-white/20 bg-black/40 text-[#67c8ff]"
                  />
                  <input
                    type="text"
                    value={feat.labelStrong || ""}
                    onChange={(e) => updateFeature(feat.id, { labelStrong: e.target.value })}
                    placeholder={`Fonctionnalité ${idx + 1}`}
                    className="flex-1 rounded border border-white/10 bg-black/40 px-2 py-1.5 text-xs text-white/80 focus:outline-none"
                  />
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
          <div className="space-y-1">
            {form.investments.map((inv, idx) => {
              const editable = idx === 0;
              return (
                <div
                  key={inv.id}
                  className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.01] px-2.5 py-1"
                >
                  <input
                    type="text"
                    value={inv.label}
                    disabled={!editable}
                    onChange={(e) => updateInvestment(inv.id, { label: e.target.value })}
                    placeholder="Détails"
                    className="flex-1 rounded border border-white/10 bg-black/40 px-2 py-1 text-xs text-white/80 focus:outline-none disabled:text-white/40"
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
                      className="w-full min-w-0 rounded border border-white/10 bg-black/40 px-2 py-1 text-right font-mono text-xs font-bold text-white focus:outline-none disabled:text-white/40"
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
      )}
    </div>
  );
}
