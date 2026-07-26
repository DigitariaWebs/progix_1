'use client';

import { computeCommission, formatCad } from '@/lib/offers/commission';
import { MONO, PLATFORM_RATE_PCT, offersTheme, receipt } from '@/data/offersData';

const tearEdge = {
  backgroundImage: `linear-gradient(45deg, transparent 50%, ${offersTheme.paper} 50%), linear-gradient(-45deg, transparent 50%, ${offersTheme.paper} 50%)`,
  backgroundSize: '14px 14px',
  backgroundRepeat: 'repeat-x',
  backgroundPosition: 'top left',
};

const dashedRule = {
  backgroundImage:
    'repeating-linear-gradient(90deg, #0E2233 0 6px, transparent 6px 12px)',
};

/**
 * The printed artifact. Presentational on purpose — the hero owns the slider
 * state so the control and this breakdown can never disagree.
 *
 * Three numbers, no minus signs: "ce que la plateforme garde" plus the loss red
 * already say the money is leaving, so a `−` would be the third thing saying it.
 */
export default function CommissionReceipt({
  monthlySales,
}: {
  monthlySales: number;
}) {
  const result = computeCommission({
    monthlySales,
    ratePct: PLATFORM_RATE_PCT,
  });

  return (
    <div className="w-full max-w-[340px]" style={{ fontFamily: MONO }}>
      <div
        className="px-6 pb-6 pt-6 shadow-[0_28px_60px_-24px_rgba(0,0,0,0.55)]"
        style={{ background: offersTheme.paper }}
      >
        <p className="text-center text-[10px] uppercase tracking-[0.32em] text-[#5c6a76]">
          {receipt.storeLine}
        </p>

        <div className="my-5 h-px w-full" style={dashedRule} />

        {/* No aria-live: the slider announces its own value on every step, and a
            polite region here would re-read every row during a drag. */}
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#8b96a1]">
          {receipt.monthlyTag}
        </p>

        <div className="mt-3 flex items-baseline justify-between gap-4">
          <span className="text-[11px] uppercase tracking-[0.08em] text-[#5c6a76]">
            {receipt.rowSales}
          </span>
          <span
            className="shrink-0 text-sm tabular-nums"
            style={{ color: offersTheme.ink }}
          >
            {formatCad(monthlySales)}
          </span>
        </div>

        <div className="mt-4">
          <span className="text-[11px] uppercase tracking-[0.08em] text-[#5c6a76]">
            {receipt.rowRate}
          </span>
          <p
            className="mt-1 text-2xl font-semibold leading-none tabular-nums"
            style={{ color: offersTheme.loss }}
          >
            {formatCad(result.monthlyCommission)}
          </p>
        </div>

        {/* The year is the number that lands. Banded separately, because three
            monthly rows followed by an annual one with nothing between them
            reads as if it all belonged to the same month. */}
        <div className="mt-6 border-t-2 border-dashed border-[#0E2233]/25 pt-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#8b96a1]">
            {receipt.yearlyTag}
          </p>
          <span className="mt-2 block text-[11px] uppercase tracking-[0.08em] text-[#5c6a76]">
            {receipt.rowYear}
          </span>
          <p
            className="mt-1 text-4xl font-bold leading-none tabular-nums"
            style={{ color: offersTheme.loss }}
          >
            {formatCad(result.yearlyCommission)}
          </p>
        </div>

        <p className="mt-5 text-[10px] leading-relaxed text-[#5c6a76]">
          {receipt.note}
        </p>
      </div>
      <div className="h-[14px] w-full" style={tearEdge} aria-hidden />
    </div>
  );
}
