'use client';

import { motion, useReducedMotion } from 'framer-motion';
import CommissionReceipt from './CommissionReceipt';
import { DISPLAY, MONO, hero, offersTheme } from '@/data/offersData';

export default function OffersHero() {
  const reduce = useReducedMotion();

  // `initial` and `animate` stay unconditional so the server and the client agree.
  // Branching the props instead is a trap: useReducedMotion() returns null during
  // SSR, so the server always emits `opacity:0` inline, while a reduced-motion
  // client renders no motion props at all — and nothing clears that inline style
  // at hydration. The whole hero would stay invisible. Collapse the duration
  // instead: same end state, reached on the first frame.
  const rise = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } };
  const t = (duration: number, delay = 0) =>
    reduce ? { duration: 0 } : { duration, delay };

  return (
    <section
      className="relative overflow-hidden px-5 pb-24 pt-28 sm:px-8 lg:px-12"
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

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            {...rise}
            transition={t(0.6)}
            className="text-[11px] uppercase tracking-[0.3em] text-white/60"
            style={{ fontFamily: MONO }}
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            {...rise}
            transition={t(0.7, 0.08)}
            className="mt-7 font-bold text-white"
            style={{
              fontFamily: DISPLAY,
              fontSize: 'clamp(2.1rem, 5.4vw, 4rem)',
              lineHeight: 1.04,
              letterSpacing: '-0.03em',
            }}
          >
            {hero.title}
            <br />
            <span style={{ color: offersTheme.loss }}>{hero.titleAccent}</span>
          </motion.h1>

          <motion.p
            {...rise}
            transition={t(0.7, 0.16)}
            className="mt-7 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg"
          >
            {hero.body}
          </motion.p>

          <motion.div
            {...rise}
            transition={t(0.7, 0.24)}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#proposition"
              className="rounded-full px-8 py-4 text-sm font-semibold text-[#0E2233] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00D4FF]"
              style={{ background: offersTheme.cyan }}
            >
              {hero.ctaPrimary}
            </a>
            <a
              href="#inclus"
              className="rounded-full border border-white/20 px-8 py-4 text-sm font-medium text-white transition-colors duration-300 hover:border-white/45 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00D4FF]"
            >
              {hero.ctaSecondary}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={t(0.8, 0.3)}
          className="flex justify-center lg:justify-end"
        >
          <CommissionReceipt />
        </motion.div>
      </div>
    </section>
  );
}
