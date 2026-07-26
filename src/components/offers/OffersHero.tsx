'use client';

import { useId, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import CommissionReceipt from './CommissionReceipt';
import { computeCommission, formatCad } from '@/lib/offers/commission';
import {
  DEFAULT_MONTHLY_SALES,
  DISPLAY,
  MAX_MONTHLY_SALES,
  MIN_MONTHLY_SALES,
  MONO,
  PLATFORM_RATE_PCT,
  SALES_STEP,
  hero,
  offersTheme,
} from '@/data/offersData';

export default function OffersHero() {
  const [monthlySales, setMonthlySales] = useState(DEFAULT_MONTHLY_SALES);
  const sliderId = useId();
  const reduce = useReducedMotion();

  const result = computeCommission({
    monthlySales,
    ratePct: PLATFORM_RATE_PCT,
  });

  // `initial` and `animate` stay unconditional so the server and the client agree.
  // Branching the props instead is a trap: useReducedMotion() returns null during
  // SSR, so the server always emits `opacity:0` inline, while a reduced-motion
  // client renders no motion props at all — and nothing clears that inline style
  // at hydration. The whole hero would stay invisible. Collapse the duration
  // instead: same end state, reached on the first frame.
  const rise = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
  const t = (duration: number, delay = 0) =>
    reduce ? { duration: 0 } : { duration, delay };

  return (
    <section
      aria-labelledby="offers-hero-title"
      className="relative flex flex-col justify-center overflow-hidden px-5 py-20 sm:px-8 lg:min-h-dvh lg:px-12 lg:py-16"
      style={{ background: offersTheme.ink }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />
      {/* One warm bloom behind the receipt, so the paper reads as lit rather than
          pasted onto the navy. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-12%] top-1/3 h-[440px] w-[440px] rounded-full opacity-[0.18] blur-[130px]"
        style={{ background: offersTheme.loss }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <motion.div
            {...rise}
            transition={t(0.5)}
            className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] uppercase tracking-[0.28em] text-white/50"
            style={{ fontFamily: MONO }}
          >
            <span>{hero.eyebrow}</span>
          </motion.div>

          <motion.h1
            id="offers-hero-title"
            {...rise}
            transition={t(0.6, 0.06)}
            className="mt-5 font-bold text-white"
            style={{
              fontFamily: DISPLAY,
              fontSize: 'clamp(2.2rem, 5.2vw, 3.9rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.035em',
            }}
          >
            {hero.title}{' '}
            <span style={{ color: offersTheme.loss }}>{hero.titleAccent}</span>
          </motion.h1>

          <motion.p
            {...rise}
            transition={t(0.6, 0.12)}
            className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/70 sm:text-base"
          >
            {hero.body}
          </motion.p>

          {/* The figure is the argument. Everything else on this screen exists to
              make it credible or to act on it. */}
          <motion.div
            {...rise}
            transition={t(0.6, 0.2)}
            className="mt-9 border-l-2 pl-5"
            style={{ borderColor: offersTheme.loss }}
          >
            <p
              className="text-[10px] uppercase tracking-[0.22em] text-white/50"
              style={{ fontFamily: MONO }}
            >
              {hero.lossLabel}
            </p>
            <p className="mt-2 flex flex-wrap items-baseline gap-x-3">
              <motion.span
                key={reduce ? 'static' : result.yearlyCommission}
                initial={reduce ? false : { opacity: 0.4, y: -3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="font-bold leading-none tabular-nums"
                style={{
                  color: offersTheme.loss,
                  fontFamily: DISPLAY,
                  fontSize: 'clamp(2.6rem, 7vw, 4.6rem)',
                  letterSpacing: '-0.04em',
                }}
              >
                − {formatCad(result.yearlyCommission)}
              </motion.span>
              <span
                className="text-[11px] uppercase tracking-[0.18em] text-white/50"
                style={{ fontFamily: MONO }}
              >
                {hero.lossUnit}
              </span>
            </p>
            <p className="mt-2 text-xs text-white/60">{hero.keepInline}</p>
          </motion.div>

          {/* Slider. Label and amount are siblings, not nested: nesting the amount
              inside the <label> folds it into the input's accessible name, which
              would then change on every step. aria-valuetext carries it instead. */}
          <motion.div {...rise} transition={t(0.6, 0.26)} className="mt-7 max-w-md">
            <div className="flex items-baseline justify-between gap-4">
              <label
                htmlFor={sliderId}
                className="text-[11px] uppercase tracking-[0.12em] text-white/60"
                style={{ fontFamily: MONO }}
              >
                {hero.sliderLabel}
              </label>
              <span
                aria-hidden
                className="tabular-nums text-sm text-white"
                style={{ fontFamily: MONO }}
              >
                {formatCad(monthlySales)}
              </span>
            </div>
            {/* Native range widget on purpose: `appearance-none` strips the thumb and
                makes `accent-color` inert, leaving nothing to grab. `py-2` lifts the
                hit area to 44px without changing how it looks. */}
            <input
              id={sliderId}
              type="range"
              min={MIN_MONTHLY_SALES}
              max={MAX_MONTHLY_SALES}
              step={SALES_STEP}
              value={monthlySales}
              aria-valuetext={formatCad(monthlySales)}
              onChange={(event) => setMonthlySales(Number(event.target.value))}
              className="mt-2 w-full cursor-pointer py-2 accent-[#00D4FF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00D4FF]"
            />
            <p className="mt-1.5 text-[11px] leading-relaxed text-white/50">
              {hero.rateNote}
            </p>
          </motion.div>

          <motion.div
            {...rise}
            transition={t(0.6, 0.32)}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#proposition"
              className="group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-[#0E2233] transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00D4FF]"
              style={{ background: offersTheme.cyan }}
            >
              {hero.ctaPrimary}
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#inclus"
              className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:border-white/45 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00D4FF]"
            >
              {hero.ctaSecondary}
            </a>
            <ul
              className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.16em] text-white/40"
              style={{ fontFamily: MONO }}
            >
              {hero.chips.map((chip, index) => (
                <li key={chip} className="flex items-center gap-3">
                  {index > 0 && <span aria-hidden>·</span>}
                  {chip}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28, rotate: reduce ? 0 : -1.5 }}
          animate={{ opacity: 1, y: 0, rotate: reduce ? 0 : -1.5 }}
          transition={t(0.7, 0.28)}
          className="flex justify-center lg:justify-end"
        >
          <CommissionReceipt monthlySales={monthlySales} />
        </motion.div>
      </div>

      {/* Scroll cue sits absolute so it never adds to the height the section has
          to fit into. */}
      <motion.p
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={t(0.6, 0.9)}
        className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto hidden max-w-6xl items-center gap-3 px-12 text-[10px] uppercase tracking-[0.28em] text-white/35 lg:flex"
        style={{ fontFamily: MONO }}
      >
        {hero.scrollCue}
        <motion.span
          className="block h-px w-14 origin-left bg-white/25"
          animate={reduce ? undefined : { scaleX: [0.3, 1, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.p>
    </section>
  );
}
