'use client';

import { useId, useState } from 'react';
import { computeCommission, formatCad } from '@/lib/offers/commission';
import {
  DEFAULT_MONTHLY_SALES,
  MAX_MONTHLY_SALES,
  MIN_MONTHLY_SALES,
  MONO,
  PLATFORM_RATE_PCT,
  SALES_STEP,
  hero,
  offersTheme,
  receipt,
} from '@/data/offersData';

const tearEdge = {
  backgroundImage: `linear-gradient(45deg, transparent 50%, ${offersTheme.paper} 50%), linear-gradient(-45deg, transparent 50%, ${offersTheme.paper} 50%)`,
  backgroundSize: '14px 14px',
  backgroundRepeat: 'repeat-x',
  backgroundPosition: 'top left',
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

export default function CommissionReceipt() {
  const [monthlySales, setMonthlySales] = useState(DEFAULT_MONTHLY_SALES);
  const sliderId = useId();
  const result = computeCommission({
    monthlySales,
    ratePct: PLATFORM_RATE_PCT,
  });

  return (
    <div className="w-full max-w-[380px]" style={{ fontFamily: MONO }}>
      {/* Receipt */}
      <div
        className="relative px-6 pb-6 pt-7 shadow-[0_28px_60px_-24px_rgba(0,0,0,0.55)]"
        style={{ background: offersTheme.paper }}
      >
        <p className="text-center text-[10px] uppercase tracking-[0.32em] text-[#5c6a76]">
          {receipt.storeLine}
        </p>
        <p className="mt-3 text-center text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0E2233]">
          {receipt.header}
        </p>

        <div
          className="my-4 h-px w-full"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, #0E2233 0 6px, transparent 6px 12px)',
          }}
        />

        {/* No aria-live here: the range input announces its own value on every
            step, and a polite region over four rows would re-read all of them
            up to 119 times during a single drag. */}
        <div>
          <Line label={receipt.rowSales} value={formatCad(monthlySales)} />
          <Line
            label={receipt.rowRate}
            value={`− ${formatCad(result.monthlyCommission)}`}
            tone="loss"
          />

          <div
            className="my-3 h-px w-full"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, #0E2233 0 6px, transparent 6px 12px)',
            }}
          />

          <Line label={receipt.rowNet} value={formatCad(result.monthlyNet)} strong />
          <Line
            label={receipt.rowYear}
            value={`− ${formatCad(result.yearlyCommission)}`}
            tone="loss"
            strong
          />
        </div>
      </div>
      <div className="h-[14px] w-full" style={tearEdge} aria-hidden />

      {/* Slider */}
      <div className="mt-7">
        {/* Label and amount are siblings, not nested: putting the amount inside the
            <label> would fold it into the input's accessible name, which would then
            change on every step. aria-valuetext carries the formatted value instead. */}
        <div className="flex items-baseline justify-between gap-4">
          <label
            htmlFor={sliderId}
            className="text-[11px] uppercase tracking-[0.12em] text-white/60"
          >
            {hero.sliderLabel}
          </label>
          <span aria-hidden className="tabular-nums text-sm text-white">
            {formatCad(monthlySales)}
          </span>
        </div>
        {/* Native range widget on purpose. `appearance-none` would strip the thumb and
            make `accent-color` inert, leaving a bare track with nothing to grab. */}
        <input
          id={sliderId}
          type="range"
          min={MIN_MONTHLY_SALES}
          max={MAX_MONTHLY_SALES}
          step={SALES_STEP}
          value={monthlySales}
          aria-valuetext={formatCad(monthlySales)}
          onChange={(e) => setMonthlySales(Number(e.target.value))}
          className="mt-3 w-full cursor-pointer accent-[#00D4FF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00D4FF]"
        />
        <p className="mt-3 text-[11px] leading-relaxed text-white/40">
          {hero.rateNote}
        </p>
      </div>

      {/* Relief card */}
      <div className="mt-7 border border-white/10 bg-white/[0.04] p-5">
        <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">
          {receipt.keepTitle}
        </p>
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <span className="text-[11px] uppercase tracking-[0.08em] text-white/60">
            {receipt.keepRow}
          </span>
          <span
            className="text-lg font-semibold tabular-nums"
            style={{ color: offersTheme.cyan }}
          >
            {receipt.keepValue}
          </span>
        </div>
        <div className="mt-2 flex items-baseline justify-between gap-4">
          <span className="text-[11px] uppercase tracking-[0.08em] text-white/60">
            {receipt.keepYear}
          </span>
          <span className="text-lg font-semibold tabular-nums text-white">
            + {formatCad(result.yearlyCommission)}
          </span>
        </div>
        <p className="mt-4 text-[11px] leading-relaxed text-white/40">
          {receipt.keepNote}
        </p>
      </div>
    </div>
  );
}
