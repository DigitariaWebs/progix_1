'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const EquipeManifesto = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const xMarquee = useTransform(scrollYProgress, [0, 1], ['5%', '-35%']);
  const xMarqueeReverse = useTransform(
    scrollYProgress,
    [0, 1],
    ['-25%', '5%'],
  );

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-white py-12 sm:py-16"
    >
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

      {/* Drifting cyan orb (subtle tint) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-cyan-300/25 blur-3xl"
        animate={{ x: [0, 60, -20, 0], y: ['-50%', '-40%', '-60%', '-50%'] }}
        transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity }}
      />

      {/* Subtle scanlines (dark on white) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, rgba(13,34,53,0.04) 0px, rgba(13,34,53,0.04) 1px, transparent 1px, transparent 4px)',
        }}
      />

      {/* Hairline accents */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#0d2235]/15" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#0d2235]/15" />

      {/* Marquee track 1 — outline, fast */}
      <motion.div
        style={{ x: xMarquee }}
        className="relative select-none whitespace-nowrap"
      >
        <div
          className="font-black uppercase tracking-tight text-transparent"
          style={{
            fontSize: 'clamp(2rem, 6vw, 5rem)',
            lineHeight: '1',
            WebkitTextStroke: '1px rgba(13,34,53,0.5)',
            fontFamily: 'Montserrat, Inter, system-ui, sans-serif',
          }}
        >
          PROGIX&nbsp;·&nbsp;ÉQUIPE&nbsp;·&nbsp;MONTRÉAL&nbsp;·&nbsp;SUR
          MESURE&nbsp;·&nbsp;PROGIX&nbsp;·&nbsp;ÉQUIPE&nbsp;·&nbsp;MONTRÉAL&nbsp;·&nbsp;
        </div>
      </motion.div>

      {/* Marquee track 2 — solid ghost (dark fill at low opacity), reverse */}
      <motion.div
        style={{ x: xMarqueeReverse }}
        className="relative mt-1 select-none whitespace-nowrap sm:mt-2"
      >
        <div
          className="font-black uppercase tracking-tight text-[#0d2235]/[0.10]"
          style={{
            fontSize: 'clamp(1.4rem, 4vw, 3.25rem)',
            lineHeight: '1',
            fontFamily: 'Montserrat, Inter, system-ui, sans-serif',
          }}
        >
          PROS&nbsp;·&nbsp;PETITE ÉQUIPE&nbsp;·&nbsp;GRANDES
          AMBITIONS&nbsp;·&nbsp;PROS&nbsp;·&nbsp;PETITE ÉQUIPE&nbsp;·&nbsp;
        </div>
      </motion.div>
    </section>
  );
};

export default EquipeManifesto;
