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

function Line({
  label,
  value,
  tone = 'base',
  strong = false,
}: {
  label: string;
  value: string;
  tone?: 'base' | 'loss';
  strong?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5">
      <span
        className={`text-[11px] uppercase tracking-[0.08em] ${
          strong ? 'text-[#0E2233]' : 'text-[#5c6a76]'
        }`}
      >
        {label}
      </span>
      <span
        className={`shrink-0 tabular-nums ${strong ? 'text-base font-semibold' : 'text-sm'}`}
        style={{ color: tone === 'loss' ? offersTheme.loss : offersTheme.ink }}
      >
        {value}
      </span>
    </div>
  );
}

/**
 * The printed artifact. Presentational on purpose — the hero owns the slider
 * state so the headline figure and this breakdown can never disagree.
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
        className="px-6 pb-5 pt-6 shadow-[0_28px_60px_-24px_rgba(0,0,0,0.55)]"
        style={{ background: offersTheme.paper }}
      >
        <p className="text-center text-[10px] uppercase tracking-[0.32em] text-[#5c6a76]">
          {receipt.storeLine}
        </p>
        <p className="mt-2.5 text-center text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0E2233]">
          {receipt.header}
        </p>

        <div className="my-4 h-px w-full" style={dashedRule} />

        {/* No aria-live: the slider announces its own value on every step, and a
            polite region over these rows would re-read all of them during a drag.

            The monthly rows and the annual row are banded separately — without
            that, the last line reads as if it belonged to the same month as the
            three above it. */}
        <div>
          <p className="mb-1 text-[9px] uppercase tracking-[0.26em] text-[#8b96a1]">
            {receipt.monthlyTag}
          </p>
          <Line label={receipt.rowSales} value={formatCad(monthlySales)} />
          <Line
            label={receipt.rowRate}
            value={`− ${formatCad(result.monthlyCommission)}`}
            tone="loss"
          />
          <div className="my-2.5 h-px w-full" style={dashedRule} />
          <Line label={receipt.rowNet} value={formatCad(result.monthlyNet)} strong />

          <div className="mt-5 border-t-2 border-dashed border-[#0E2233]/25 pt-4">
            <p className="mb-1 text-[9px] uppercase tracking-[0.26em] text-[#8b96a1]">
              {receipt.yearlyTag}
            </p>
            <Line
              label={receipt.rowYear}
              value={`− ${formatCad(result.yearlyCommission)}`}
              tone="loss"
              strong
            />
          </div>
        </div>

        <p className="mt-4 text-[10px] leading-relaxed text-[#5c6a76]">
          {receipt.note}
        </p>
      </div>
      <div className="h-[14px] w-full" style={tearEdge} aria-hidden />
    </div>
  );
}
