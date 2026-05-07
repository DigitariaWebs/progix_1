'use client';

import Image from 'next/image';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

type Chapter = {
  year: string;
  title: string;
  body: string;
};

const chapters: Chapter[] = [
  {
    year: 'CHAPITRE 01',
    title: 'Sur les bancs de l’université',
    body:
      "Tout a commencé sur les bancs de l’université. Deux étudiants en génie logiciel, animés par la même passion du code et du défi, décident un jour de transformer leurs compétences en quelque chose de concret. Après seulement un an et demi de baccalauréat, ils se sentent prêts à entreprendre et lancent, presque par jeu, une publication sur Facebook : « Création de sites web à petits prix ».",
  },
  {
    year: 'CHAPITRE 02',
    title: 'Le premier 900 $',
    body:
      "Quelques jours plus tard, un premier client leur fait confiance. 900 $. Leur tout premier mandat. Leur tout premier site web. Et surtout, leur première victoire. Ce projet marque le début d’une aventure entrepreneuriale où chaque ligne de code devient une leçon, chaque client une opportunité de grandir.",
  },
  {
    year: 'CHAPITRE 03',
    title: "L'apprentissage à grande vitesse",
    body:
      "Motivés par cette réussite, ils décident d’approfondir leurs connaissances en développement web, en marketing et en prospection. Les mandats s’enchaînent, la réputation grandit, et bientôt, l’équipe aussi.",
  },
  {
    year: 'CHAPITRE 04',
    title: 'Premières recrues, premières expertises',
    body:
      "Un projet d’envergure les amène à recruter leur premier ingénieur en intelligence artificielle, pour développer un modèle de langage complexe (LLM). Puis vient le tour d’un développeur mobile, expert en Flutter, pour un mandat d’application que l’équipe voulait mener au plus haut niveau.",
  },
  {
    year: 'CHAPITRE 05',
    title: "L'arrivée d'Islem · 2025",
    body:
      "Les années passent, les projets se multiplient, et l’esprit d’équipe se renforce. En 2025, Islem rejoint l’aventure en tant que designer UI/UX, apportant une touche créative et humaine à chaque interface.",
  },
  {
    year: 'AUJOURD’HUI',
    title: 'Une équipe soudée, ambitieuse',
    body:
      "Aujourd’hui, Progix n’est plus seulement une idée née sur un banc d’université. C’est une équipe soudée, passionnée et ambitieuse, qui accompagne entreprises et entrepreneurs dans la création de solutions web, mobiles et logicielles de nouvelle génération.",
  },
];

const stats = [
  { v: 9, suffix: '', label: 'Talents' },
  { v: 5, suffix: '+', label: 'Années d’aventure' },
  { v: 80, suffix: '+', label: 'Projets livrés' },
  { v: 100, suffix: '%', label: 'Sur mesure' },
];

function CountUp({
  to,
  suffix = '',
  duration = 1.6,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const mv = useMotionValue(0);
  const display = useTransform(mv, (latest) => Math.round(latest));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration, ease: EASE });
    return controls.stop;
  }, [inView, mv, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

const EquipeHistoire = () => {
  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ['start end', 'end start'],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.12]);

  return (
    <section id="about" className="relative w-full">
      {/* ============================================ */}
      {/* PART 1 — Intro (white bg) */}
      {/* ============================================ */}
      <div className="relative overflow-hidden bg-white py-24 text-gray-900 sm:py-28 md:py-32">
        {/* Ambient grid (dark lines on white) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(13,34,53,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(13,34,53,0.6) 1px, transparent 1px)
            `,
            backgroundSize: '72px 72px',
            maskImage:
              'radial-gradient(ellipse at center, black 30%, transparent 80%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          }}
        />

        {/* Subtle scanlines */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, rgba(13,34,53,0.04) 0px, rgba(13,34,53,0.04) 1px, transparent 1px, transparent 4px)',
          }}
        />

        {/* Vertical label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="pointer-events-none absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 sm:left-6 md:flex"
        >
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gray-400"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            HISTOIRE
          </span>
          <span className="block h-12 w-px bg-gray-300" />
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gray-400"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            2020 — 2026
          </span>
        </motion.div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-16">
          {/* Header */}
          <div className="mb-12 grid grid-cols-1 items-end gap-8 md:grid-cols-12 md:gap-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: EASE }}
              className="md:col-span-7"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="block h-px w-10 bg-cyan-600" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-cyan-700">
                  / NOTRE HISTOIRE
                </span>
              </div>
              <h2
                className="font-black leading-[1.02] tracking-tight text-gray-900"
                style={{
                  fontSize: 'clamp(2rem, 5.4vw, 4.75rem)',
                  letterSpacing: '-0.02em',
                  fontFamily: 'Montserrat, Inter, system-ui, sans-serif',
                }}
              >
                D’une publication Facebook
                <br />
                <span className="text-gray-900">à un studio sur mesure.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
              className="md:col-span-5"
            >
              <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
                Six chapitres, une seule trajectoire : construire des produits
                numériques exigeants, aux côtés d’entrepreneurs qui ne se
                contentent pas du « assez bon ».
              </p>
              <div className="mt-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-gray-500">
                <span>06 chapitres</span>
                <span className="block h-px w-8 bg-gray-300" />
                <span>2020 — 2026</span>
              </div>
            </motion.div>
          </div>

          {/* Hero photo */}
          <motion.div
            ref={photoRef}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: EASE }}
            className="relative mb-16 w-full overflow-hidden rounded-2xl ring-1 ring-gray-200 sm:mb-20 sm:rounded-3xl"
            style={{ aspectRatio: '16/8' }}
          >
            <motion.div
              style={{ y: photoY, scale: photoScale }}
              className="absolute inset-0"
            >
              <Image
                src="https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/CONFOO2025/WhatsApp-Image-2025-03-03-at-02.33.57_7dc632c5.jpg"
                alt="Notre histoire — PROGIX"
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Scanlines on photo */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to bottom, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 3px)',
              }}
            />

            {/* Corner ticks */}
            <span className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l border-t border-white/80" />
            <span className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r border-t border-white/80" />
            <span className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b border-l border-white/80" />
            <span className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b border-r border-white/80" />

            {/* Bottom badge */}
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.28em] text-white/90 sm:inset-x-6 sm:bottom-6">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                </span>
                <span>Studio · Montréal</span>
              </div>
              <span className="rounded-full border border-white/30 bg-black/30 px-3 py-1 backdrop-blur-sm">
                REEL 01
              </span>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-10">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                className="border-l border-gray-200 pl-5 sm:pl-6"
              >
                <div
                  className="font-black leading-none text-gray-900"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  <CountUp to={s.v} suffix={s.suffix} />
                </div>
                <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-500">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* PART 2 — Timeline (dark bg) */}
      {/* ============================================ */}
      <div className="relative overflow-hidden bg-[#08182a] py-24 text-white sm:py-28 md:py-32">
        {/* Ambient grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)
            `,
            backgroundSize: '72px 72px',
            maskImage:
              'radial-gradient(ellipse at center, black 30%, transparent 80%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          }}
        />

        {/* Drifting indigo orb (right side only) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-40 bottom-20 h-[520px] w-[520px] rounded-full bg-indigo-500/12 blur-3xl"
          animate={{ x: [0, -60, 40, 0], y: [0, -40, 30, 0] }}
          transition={{ duration: 26, ease: 'easeInOut', repeat: Infinity }}
        />

        {/* Scanlines */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-50"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 4px)',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-16">
          {/* Section sub-label */}
          <div className="mb-10 flex items-center gap-3 sm:mb-14">
            <span className="block h-px w-10 bg-cyan-300/70" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-cyan-300/90">
              / TIMELINE
            </span>
          </div>

          <ol className="space-y-14 sm:space-y-20">
            {chapters.map((c, idx) => {
              const isLast = idx === chapters.length - 1;
              return (
                <motion.li
                  key={c.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    duration: 0.9,
                    delay: 0.05 * idx,
                    ease: EASE,
                  }}
                  className="relative grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10"
                >
                  {/* Left column: big outline number + chapter label + title */}
                  <div className="md:col-span-4">
                    <div className="flex items-baseline gap-3">
                      <span
                        className="font-black tabular-nums leading-none text-transparent"
                        style={{
                          WebkitTextStroke: '1px rgba(56,189,248,0.55)',
                          fontSize: 'clamp(3.5rem, 7vw, 5.75rem)',
                          letterSpacing: '-0.04em',
                          fontFamily:
                            'Montserrat, Inter, system-ui, sans-serif',
                        }}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="block h-px w-8 bg-cyan-300/60" />
                    </div>
                    <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-300">
                      {c.year}
                    </div>
                    <h3 className="mt-3 text-xl font-bold leading-tight text-white sm:text-2xl">
                      {c.title}
                    </h3>
                  </div>

                  {/* Right column: body text */}
                  <div className="md:col-span-8 md:pt-3">
                    <p className="text-base leading-relaxed text-white/70 sm:text-lg">
                      {c.body}
                    </p>
                  </div>

                  {/* Inter-chapter divider */}
                  {!isLast && (
                    <div className="absolute -bottom-7 left-0 right-0 h-px bg-white/10 sm:-bottom-10" />
                  )}
                </motion.li>
              );
            })}
          </ol>

          {/* Footer line */}
          <div className="mt-16 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.4em] text-white/35 sm:mt-20">
            <span>/ END HISTOIRE</span>
            <span>PROGIX · 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EquipeHistoire;
