'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

interface FilmStripProps {
  label: string;
  reverse?: boolean;
}

const FilmStrip = ({ label, reverse = false }: FilmStripProps) => {
  const PERFORATIONS = Array.from({ length: 60 });
  return (
    <div className="relative h-9 w-full overflow-hidden border-y border-[#0d2235]/30 bg-[#0d2235] sm:h-10">
      <motion.div
        aria-hidden
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 36, ease: 'linear', repeat: Infinity }}
        className="absolute inset-y-0 left-0 flex items-center will-change-transform"
        style={{ width: '200%' }}
      >
        {PERFORATIONS.map((_, i) => (
          <span
            key={`a-${i}`}
            className="mx-3 block h-2.5 w-5 flex-shrink-0 rounded-[2px] bg-white/15 sm:h-3 sm:w-6"
          />
        ))}
        {PERFORATIONS.map((_, i) => (
          <span
            key={`b-${i}`}
            className="mx-3 block h-2.5 w-5 flex-shrink-0 rounded-[2px] bg-white/15 sm:h-3 sm:w-6"
          />
        ))}
      </motion.div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="rounded-full border border-cyan-300/40 bg-[#0d2235] px-3 py-0.5 text-[9px] font-semibold uppercase tracking-[0.4em] text-cyan-100 sm:text-[10px]">
          {label}
        </span>
      </div>
    </div>
  );
};

const EquipeJoinCta = () => {
  return (
    <section className="relative w-full bg-[#0d2235]">
      <FilmStrip label="ACT V — END CREDITS" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="bg-white text-gray-900"
      >
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-4 py-8 text-center sm:px-6 md:flex-row md:justify-between md:gap-8 md:py-9 md:text-left">
          <div>
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.32em] text-cyan-700">
              / Next Episode
            </p>
            <h2
              className="font-black leading-[1] tracking-tight text-gray-900"
              style={{
                fontSize: 'clamp(1.5rem, 3.2vw, 2.25rem)',
                letterSpacing: '-0.03em',
                fontFamily: 'Montserrat, Inter, system-ui, sans-serif',
              }}
            >
              À toi de <span className="text-cyan-600">jouer.</span>
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Un projet ambitieux, un défi qui mérite des pros ? Parlons-en.
            </p>
          </div>

          <Link
            href="/contact"
            style={{
              backgroundColor: '#0d2235',
              color: '#ffffff',
              opacity: 1,
            }}
            className="group inline-flex flex-shrink-0 items-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-300 hover:!bg-cyan-600"
          >
            <span style={{ color: '#ffffff' }}>Démarrer un projet</span>
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.6"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </motion.div>

      <FilmStrip label="FIN — PROGIX 2026" reverse />
    </section>
  );
};

export default EquipeJoinCta;
