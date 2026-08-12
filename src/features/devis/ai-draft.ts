import type { ClientEstimate, EstimateFeatureItem } from "./types";
import type { Closer } from "@/features/closers/types";
import type { AiDevisDraft } from "./prompt-parse";
import { DEFAULT_ESTIMATE } from "./types";
import { INSTALLMENT_PLANS, parseAmount, fmtAmount, AUTO_ACCESS_CODE, DELIVERY_DAY_OPTIONS } from "./estimate-math";

/** Slug auto-derived from a client name (accent-stripped, dash-separated) */
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/\p{Mn}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Lowercase, accent-stripped, single-spaced — for fuzzy name comparison only */
function normalizeName(input: string): string {
  return input
    .normalize("NFD")
    .replace(/\p{Mn}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

const PLACEHOLDER_LABEL = /^fonctionnalit[eé]\s*\d+$/i;

const PAYMENT_MODALITIES = ["1x", "2x", "3x", "mensualité"] as const;
export type PaymentModalities = (typeof PAYMENT_MODALITIES)[number];

export type TimeRecommanded = (typeof DELIVERY_DAY_OPTIONS)[number];

/**
 * Resolves a free-text closer name (from a call transcript) against the
 * loaded closers list. Tries full name, then last name alone, then first
 * name alone; the first tier producing exactly one match wins. Zero matches
 * or an ambiguous tier returns null rather than guessing — a wrong guess
 * would misattribute a signed devis and send its email to the wrong closer.
 */
function matchCloser(closerName: string, closers: Closer[]): Closer | null {
  const target = normalizeName(closerName);
  if (!target) return null;

  const tiers: ((c: Closer) => string)[] = [
    (c) => normalizeName(`${c.first_name} ${c.last_name}`),
    (c) => normalizeName(c.last_name),
    (c) => normalizeName(c.first_name),
  ];

  for (const tierKey of tiers) {
    const matches = closers.filter((c) => tierKey(c) === target);
    if (matches.length === 1) return matches[0];
  }
  return null;
}

export interface FunctionalitySlot {
  text: string;
  included: boolean;
}

/** Pads/truncates the AI's functionalities to exactly 6 slots — the review
 *  form always shows 6 text fields, regardless of how many the model
 *  actually returned. A slot with no text starts unchecked; the closer can
 *  still type into it and check it manually. */
export function functionalitiesToSlots(functionalities: string[]): FunctionalitySlot[] {
  return Array.from({ length: 6 }, (_, i) => {
    const text = (functionalities[i] ?? "").trim();
    return { text, included: text !== "" };
  });
}

/** Editable state behind the "Depuis un prompt" review form — the reduced
 *  9-field set from the boss's spec, not the full ClientEstimate shape. */
export interface CloserPromptFormState {
  clientName: string;
  projectName: string;
  closerId: string;
  currency: "€" | "$CAD";
  /** Digits only, no currency symbol — e.g. "12480" */
  price: string;
  fullDescription: string;
  paymentModalities: PaymentModalities;
  /** Only meaningful when paymentModalities === "mensualité"; the AI never
   *  supplies this (it isn't in the JSON), so it always starts at a sane
   *  default and the closer confirms/adjusts it. */
  paymentMonths: string;
  timeRecommanded: TimeRecommanded;
  functionalities: FunctionalitySlot[];
}

export interface BuildDraftFormResult {
  form: CloserPromptFormState;
  warnings: string[];
}

/**
 * Converts the raw AI draft into the review form's editable state — the
 * "Extraire les informations" step. Pure — no network, no server-only
 * imports — so it's exercised directly by scripts/test-ai-draft.mts.
 */
export function buildDraftFormFromAi(draft: AiDevisDraft, closers: Closer[]): BuildDraftFormResult {
  const warnings: string[] = [];

  let closerId = "";
  if (draft.closerName.trim()) {
    const match = matchCloser(draft.closerName, closers);
    if (match) {
      closerId = match.id;
    } else {
      warnings.push(`Closer « ${draft.closerName.trim()} » non reconnu — sélectionne-le manuellement.`);
    }
  }

  const price = draft.price.replace(/[^\d]/g, "");
  if (!price) {
    warnings.push("Prix non détecté — saisis-le manuellement.");
  }

  const currency: CloserPromptFormState["currency"] = draft.currency === "$CAD" ? "$CAD" : "€";

  const paymentModalities: PaymentModalities = (PAYMENT_MODALITIES as readonly string[]).includes(
    draft.paymentModalities
  )
    ? (draft.paymentModalities as PaymentModalities)
    : "mensualité";

  const timeRecommanded: TimeRecommanded = (DELIVERY_DAY_OPTIONS as readonly string[]).includes(
    draft.timeRecommanded
  )
    ? (draft.timeRecommanded as TimeRecommanded)
    : "90";

  const functionalitiesSupported = draft.functionalities.some((f) => f.trim());
  const nothingExtracted =
    !draft.clientName.trim() &&
    !draft.projectName.trim() &&
    !draft.closerName.trim() &&
    !draft.currency &&
    !price &&
    !draft.fullDescription.trim() &&
    !draft.paymentModalities &&
    !draft.timeRecommanded &&
    !functionalitiesSupported;
  if (nothingExtracted) {
    warnings.unshift("Aucune information exploitable n'a été extraite du texte collé.");
  }

  return {
    form: {
      clientName: draft.clientName.trim(),
      projectName: draft.projectName.trim(),
      closerId,
      currency,
      price,
      fullDescription: draft.fullDescription.trim(),
      paymentModalities,
      paymentMonths: "6",
      timeRecommanded,
      functionalities: functionalitiesToSlots(draft.functionalities),
    },
    warnings,
  };
}

/**
 * Replaces the "Fonctionnalité N" placeholder dev features with the review
 * form's functionality slots (skipping empty ones), at the position the
 * first placeholder held. If no placeholders exist, the items are appended
 * after the last dev feature instead. Each slot's `included` flag carries
 * through — a closer-disabled slot still appears in the full editor,
 * unchecked, rather than being silently dropped.
 */
function replacePlaceholderFeatures(
  baseFeatures: EstimateFeatureItem[],
  slots: FunctionalitySlot[]
): EstimateFeatureItem[] {
  const items = slots.filter((s) => s.text.trim() !== "");
  if (items.length === 0) return baseFeatures;

  const newItems: EstimateFeatureItem[] = items.map((slot, idx) => ({
    id: `prompt-${idx}-${Date.now()}`,
    category: "dev",
    labelStrong: slot.text.trim(),
    label: "",
    included: slot.included,
    isCustom: true,
  }));

  const placeholderIndexes = baseFeatures
    .map((f, idx) => ({ f, idx }))
    .filter(({ f }) => f.category === "dev" && PLACEHOLDER_LABEL.test((f.labelStrong ?? "").trim()))
    .map(({ idx }) => idx);

  if (placeholderIndexes.length === 0) {
    const lastDevIndex = baseFeatures.reduce(
      (last, f, idx) => (f.category === "dev" ? idx : last),
      -1
    );
    const insertAt = lastDevIndex + 1;
    return [...baseFeatures.slice(0, insertAt), ...newItems, ...baseFeatures.slice(insertAt)];
  }

  const placeholderSet = new Set(placeholderIndexes);
  const insertAt = placeholderIndexes[0];
  const kept = baseFeatures.filter((_, idx) => !placeholderSet.has(idx));
  const keptInsertAt = baseFeatures.slice(0, insertAt).filter((_, idx) => !placeholderSet.has(idx)).length;

  return [...kept.slice(0, keptInsertAt), ...newItems, ...kept.slice(keptInsertAt)];
}

/**
 * Scales the default 8-row investment breakdown proportionally so its total
 * matches `price` exactly — the review form doesn't collect a breakdown, so
 * without this the closer would land on /admin/devis/[slug] with the
 * section-03 total/target mismatch banner already red.
 */
export function scaleInvestments(
  price: number,
  currency: "€" | "$CAD",
  baseInvestments = DEFAULT_ESTIMATE.investments
): ClientEstimate["investments"] {
  if (baseInvestments.length === 0) return baseInvestments;

  const baseTotal = baseInvestments.reduce((sum, inv) => sum + parseAmount(inv.amount), 0);
  const scale = baseTotal > 0 ? price / baseTotal : 0;
  const scaled = baseInvestments.map((inv) => Math.round(parseAmount(inv.amount) * scale));

  // Rounding each row independently can drift the total by a unit or two —
  // the last row absorbs the remainder so the sum matches `price` exactly.
  // The section-03 total/target banner must read green the moment the
  // closer lands on /admin/devis/[slug], not off by a rounding artifact.
  const roundedTotal = scaled.reduce((sum, n) => sum + n, 0);
  scaled[scaled.length - 1] += Math.round(price) - roundedTotal;

  return baseInvestments.map((inv, idx) => ({
    ...inv,
    amount: `${fmtAmount(scaled[idx])} ${currency}`,
  }));
}

/**
 * Maps paymentModalities/paymentMonths onto the editor's existing schedule
 * model. "1x"/"2x"/"3x" become an installment plan; "mensualité" becomes
 * monthly billing. payment_installments is always computed (even for
 * monthly) — the full editor already does this unconditionally today, so
 * this just matches that behavior rather than special-casing it.
 */
export function buildPaymentFields(
  modalities: PaymentModalities,
  months: string,
  price: number,
  currency: "€" | "$CAD"
): Pick<ClientEstimate, "payment_schedule_type" | "payment_months" | "payment_installments"> {
  const installmentCount = modalities === "1x" ? 1 : modalities === "2x" ? 2 : modalities === "3x" ? 3 : 3;
  const payment_installments = INSTALLMENT_PLANS[installmentCount].map(({ label, percentage }) => ({
    label,
    percentage,
    amount: `${fmtAmount((price * percentage) / 100)} ${currency}`,
  }));

  if (modalities === "mensualité") {
    const payment_months = Math.max(1, parseInt(months, 10) || 6);
    return { payment_schedule_type: "monthly", payment_months, payment_installments };
  }

  return {
    payment_schedule_type: "installments",
    payment_months: DEFAULT_ESTIMATE.payment_months,
    payment_installments,
  };
}

/**
 * Builds the full ClientEstimate to save from the closer-reviewed prompt
 * form — the "Valider" step. Everything not covered by the reduced 9-field
 * set (investments breakdown, marketing flag, access code, signature state)
 * gets a sensible default the closer can still adjust afterward on
 * /admin/devis/[slug], which shows the same full editor as any other devis.
 */
export function buildEstimateFromPromptForm(form: CloserPromptFormState): ClientEstimate {
  const priceNum = parseAmount(form.price);
  const clientName = form.clientName.trim();
  const projectName = form.projectName.trim();

  const payment = buildPaymentFields(form.paymentModalities, form.paymentMonths, priceNum, form.currency);

  return {
    id: "",
    slug: slugify(clientName),
    access_code: AUTO_ACCESS_CODE,
    client_name: clientName,
    closer_id: form.closerId || null,
    project_name: projectName,
    project_title: projectName,
    project_description: form.fullDescription.trim(),
    currency: form.currency,
    total_amount: form.price,
    delivery_days: form.timeRecommanded,
    dev_duration_days: DEFAULT_ESTIMATE.dev_duration_days,
    marketing_included: true,
    features: replacePlaceholderFeatures(DEFAULT_ESTIMATE.features, form.functionalities),
    investments: scaleInvestments(priceNum, form.currency),
    payment_schedule_type: payment.payment_schedule_type,
    payment_months: payment.payment_months,
    payment_installments: payment.payment_installments,
    signature: null,
    locked: false,
    pdf_email_sent_at: null,
  };
}
