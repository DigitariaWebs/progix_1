export type CommissionInput = {
  /** Gross monthly delivery sales, in CAD. */
  monthlySales: number;
  /** Marketplace commission rate, in percent. */
  ratePct: number;
};

export type CommissionResult = {
  monthlyCommission: number;
  monthlyNet: number;
  yearlyCommission: number;
  yearlyNet: number;
};

/** Saturates at the bounds. `NaN` has no meaningful clamp, so it falls back to `min`. */
const clamp = (value: number, min: number, max: number) =>
  Number.isNaN(value) ? min : Math.min(max, Math.max(min, value));

export function computeCommission({
  monthlySales,
  ratePct,
}: CommissionInput): CommissionResult {
  const sales = clamp(monthlySales, 0, 1_000_000);
  const rate = clamp(ratePct, 0, 100) / 100;

  const monthlyCommission = Math.round(sales * rate);
  const monthlyNet = Math.round(sales) - monthlyCommission;

  return {
    monthlyCommission,
    monthlyNet,
    yearlyCommission: monthlyCommission * 12,
    yearlyNet: monthlyNet * 12,
  };
}

const cad = new Intl.NumberFormat('fr-CA', {
  style: 'currency',
  currency: 'CAD',
  maximumFractionDigits: 0,
});

/**
 * Formats whole dollars the Québec way: `41 760 $`.
 *
 * Expects a non-negative amount. Callers that prefix their own minus sign would
 * otherwise render a double negative — `computeCommission` never returns one.
 */
export function formatCad(value: number): string {
  return cad.format(Math.abs(Math.round(value)));
}
