'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

const TITLE_LINES: string[][] = [
  ['UNE', 'PETITE'],
  ['ÉQUIPE'],
  ['AUX', 'GRANDES'],
  ['AMBITIONS'],
];

const STATS = [
  { value: '9', label: 'Talents' },
  { value: '20+', label: 'Projets / an' },
  { value: '100%', label: 'Sur mesure' },
];

const EquipeHero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  let wordIndex = 0;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#0d2235] text-white"
    >
      {/* Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Scanlines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-overlay"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent 4px)',
          opacity: 0.7,
        }}
      />

      {/* Vertical label - left */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
        className="pointer-events-none absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 sm:left-6 md:flex"
      >
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/45"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          ÉQUIPE — 2026
        </span>
        <span className="block h-16 w-px bg-white/20" />
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/45"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          MONTRÉAL
        </span>
      </motion.div>

      {/* Main grid */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pb-24 pt-32 sm:px-6 md:px-10 md:pb-28 md:pt-36 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Text */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-cyan-300/80" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-200">
                / NOTRE ÉQUIPE
              </span>
            </motion.div>

            {/* Headline */}
            <h1
              className="font-black tracking-tight text-white"
              style={{
                fontSize: 'clamp(2.25rem, 7.4vw, 6rem)',
                lineHeight: 1.02,
                letterSpacing: '-0.025em',
                fontFamily: 'Montserrat, Inter, system-ui, sans-serif',
              }}
            >
              {TITLE_LINES.map((line, lineIdx) => (
                <div
                  key={lineIdx}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'baseline',
                    columnGap: '0.3em',
                  }}
                >
                  {line.map((word) => {
                    const idx = wordIndex++;
                    return (
                      <span
                        key={`${lineIdx}-${idx}`}
                        style={{
                          display: 'inline-block',
                          overflow: 'hidden',
                          paddingBottom: '0.08em',
                        }}
                      >
                        <motion.span
                          initial={{ y: '110%' }}
                          animate={{ y: '0%' }}
                          transition={{
                            duration: 0.95,
                            delay: 0.2 + idx * 0.08,
                            ease: EASE,
                          }}
                          style={{ display: 'inline-block' }}
                        >
                          {word}
                        </motion.span>
                      </span>
                    );
                  })}
                </div>
              ))}
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
              className="mt-8 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
            >
              Notre pire cauchemar est d&apos;un jour se réveiller et être une
              équipe de 100 et devenir, ce qu&apos;on appelle à l&apos;interne,
              une usine à saucisses. On préfère avoir une petite équipe de
              pros et faire une vingtaine de projets par année qui nous
              tiennent à cœur.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <a
                href="#equipe-grid"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#0d2235] transition-colors duration-300 hover:bg-cyan-200"
              >
                <span>Rencontrez l&apos;équipe</span>
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="#about"
                className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/10"
              >
                <span>Notre histoire</span>
              </a>
            </motion.div>

            {/* Mini stats */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.12, delayChildren: 1.2 },
                },
              }}
              className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6"
            >
              {STATS.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                  }}
                  className="flex flex-col"
                >
                  <span
                    className="font-black leading-none tracking-tight text-white"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', letterSpacing: '-0.02em' }}
                  >
                    {stat.value}
                  </span>
                  <span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Photo */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.55, ease: EASE }}
              className="relative mx-auto w-full max-w-md lg:max-w-none"
            >
              <motion.div
                style={{ y: photoY, scale: photoScale }}
                className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
              >
                <div
                  className="absolute inset-0"
                  style={{ transform: 'rotate(-2deg) scale(1.08)' }}
                >
                  <Image
                    src="https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/imagesculture/Picsart_25-09-29_19-39-01-194.jpg"
                    alt="Équipe PROGIX en studio à Montréal"
                    fill
                    sizes="(max-width: 1024px) 95vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Scanlines on photo */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-40"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(to bottom, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 3px)',
                  }}
                />

                {/* Corner ticks */}
                <CornerTicks />

                {/* Bottom badge */}
                <div className="absolute inset-x-4 bottom-4 z-10 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-white/85">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    <span>Studio · Montréal</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/30 bg-black/30 px-3 py-1 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    <span>REC</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4, ease: EASE }}
          className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/50">
            Scroll
          </span>
          <motion.span
            aria-hidden
            className="block h-10 w-px bg-white/60"
            animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
          />
        </motion.div>
      </div>
    </section>
  );
};

const CornerTicks = () => {
  const base =
    'pointer-events-none absolute h-5 w-5 border-white/80';
  return (
    <>
      <span className={`${base} left-3 top-3 border-l border-t`} />
      <span className={`${base} right-3 top-3 border-r border-t`} />
      <span className={`${base} bottom-3 left-3 border-b border-l`} />
      <span className={`${base} bottom-3 right-3 border-b border-r`} />
    </>
  );
};

export default EquipeHero;
