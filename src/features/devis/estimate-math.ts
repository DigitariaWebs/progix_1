/**
 * Shared pure math/formatting helpers for the devis editor and the
 * prompt-to-devis flow (ai-draft.ts) — both compute the same installment
 * breakdown and amount formatting, so this is the single source of truth
 * rather than two copies drifting apart.
 */

/** Installment plans keyed by number of payments */
export const INSTALLMENT_PLANS = {
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

export type InstallmentCount = keyof typeof INSTALLMENT_PLANS;

/** Parse a formatted amount string like "5 600" or "5600" → number */
export function parseAmount(raw: string): number {
  return parseFloat(raw.replace(/\s/g, "").replace(",", ".")) || 0;
}

/** Strip a trailing " <currency>" suffix so an amount can be edited as a bare number */
export function amountDigits(amount: string, currency: string): string {
  const suffix = ` ${currency}`;
  return amount.endsWith(suffix) ? amount.slice(0, -suffix.length) : amount;
}

/** Format a number as "1 680" (French spacing, no decimals) */
export function fmtAmount(n: number): string {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/** Fixed client-portal password — not admin-editable */
export const AUTO_ACCESS_CODE = "progix2026";

/** Duration options for the full editor's "durée de développement" select */
export const DELIVERY_DAY_OPTIONS = ["30", "45", "60", "90"] as const;
