import type { ClientEstimate, EstimateFeatureItem } from "./types";
import type { Closer } from "@/features/closers/types";
import type { AiDevisDraft } from "./prompt-parse";

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

export interface ApplyAiDraftResult {
  next: ClientEstimate;
  warnings: string[];
}

/**
 * Maps a validated AI draft onto the current form state. Pure — no network,
 * no server-only imports — so it's exercised directly by
 * scripts/test-ai-draft.mts without an API key.
 *
 * An empty AI value never overwrites a non-empty form value; total_amount is
 * never touched (it isn't in the AI's JSON); the five "Fonctionnalité N"
 * placeholder features are replaced by the AI's functionalities, and every
 * other feature (mobile app, back-office, API, marketing, ...) is left
 * exactly as-is.
 */
export function applyAiDraft(
  form: ClientEstimate,
  draft: AiDevisDraft,
  closers: Closer[]
): ApplyAiDraftResult {
  const warnings: string[] = [];

  const clientName = draft.clientName.trim() || form.client_name;
  const projectName = draft.projectName.trim() || form.project_name;
  const description = draft.fullDescription.trim() || form.project_description;

  let currency = form.currency;
  if (draft.currency === "$") currency = "$CAD";
  else if (draft.currency === "€") currency = "€";

  let closerId = form.closer_id;
  if (draft.closerName.trim()) {
    const match = matchCloser(draft.closerName, closers);
    if (match) {
      closerId = match.id;
    } else {
      warnings.push(`Closer « ${draft.closerName.trim()} » non reconnu — sélectionne-le manuellement.`);
    }
  }

  const { features, replaced } = applyFunctionalities(form.features, draft.functionalities);
  if (draft.functionalities.length === 0) {
    warnings.push("Aucune fonctionnalité détectée — les emplacements existants sont conservés.");
  } else if (!replaced) {
    warnings.push(
      "Aucun emplacement « Fonctionnalité N » trouvé — les fonctionnalités ont été ajoutées à la suite."
    );
  }

  if (!form.total_amount.trim()) {
    warnings.push("Montant total à saisir manuellement.");
  }

  const nothingExtracted =
    !draft.clientName.trim() &&
    !draft.projectName.trim() &&
    !draft.closerName.trim() &&
    !draft.currency &&
    !draft.fullDescription.trim() &&
    draft.functionalities.length === 0;
  if (nothingExtracted) {
    warnings.unshift("Aucune information exploitable n'a été extraite du texte collé.");
  }

  const next: ClientEstimate = {
    ...form,
    client_name: clientName,
    slug: clientName ? slugify(clientName) : form.slug,
    project_name: projectName,
    project_title: projectName,
    project_description: description,
    currency,
    closer_id: closerId,
    features,
  };

  return { next, warnings };
}

/**
 * Replaces the "Fonctionnalité N" placeholder dev features with the AI's
 * functionalities, at the position the first placeholder held. If no
 * placeholders exist (e.g. the draft is applied a second time), the AI
 * items are appended after the last dev feature instead. `replaced` is
 * false in that fallback case, so the caller can warn about it.
 */
function applyFunctionalities(
  features: EstimateFeatureItem[],
  functionalities: string[]
): { features: EstimateFeatureItem[]; replaced: boolean } {
  if (functionalities.length === 0) {
    return { features, replaced: true };
  }

  const aiItems: EstimateFeatureItem[] = functionalities.map((text, idx) => ({
    id: `ai-${idx}-${Date.now()}`,
    category: "dev",
    labelStrong: text,
    label: "",
    included: true,
    isCustom: true,
  }));

  const placeholderIndexes = features
    .map((f, idx) => ({ f, idx }))
    .filter(({ f }) => f.category === "dev" && PLACEHOLDER_LABEL.test((f.labelStrong ?? "").trim()))
    .map(({ idx }) => idx);

  if (placeholderIndexes.length === 0) {
    const lastDevIndex = features.reduce(
      (last, f, idx) => (f.category === "dev" ? idx : last),
      -1
    );
    const insertAt = lastDevIndex + 1;
    return {
      features: [...features.slice(0, insertAt), ...aiItems, ...features.slice(insertAt)],
      replaced: false,
    };
  }

  const placeholderSet = new Set(placeholderIndexes);
  const insertAt = placeholderIndexes[0];
  const kept = features.filter((_, idx) => !placeholderSet.has(idx));
  const keptInsertAt = features.slice(0, insertAt).filter((_, idx) => !placeholderSet.has(idx)).length;

  return {
    features: [...kept.slice(0, keptInsertAt), ...aiItems, ...kept.slice(keptInsertAt)],
    replaced: true,
  };
}
