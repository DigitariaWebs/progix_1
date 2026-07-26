'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { MONO, offersTheme } from '@/data/offersData';

type Props = {
  name: string;
  image: string;
  alt: string;
  index: number;
};

/**
 * One store listing. Enters dealt-onto-a-table — a small alternating tilt that
 * settles to square — then drifts against the scroll so the row has depth
 * instead of sitting flat. Hovering lifts it and dims its neighbours, which is
 * what the `bench-tile` class in globals.css is for.
 */
export default function BenchmarkTile({ name, image, alt, index }: Props) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Alternating direction and slightly different amplitudes, so the row reads
  // as separate objects rather than one sliding block.
  const amplitude = index % 2 === 0 ? 22 : 13;
  const direction = index % 2 === 0 ? 1 : -1;
  const drift = useTransform(
    scrollYProgress,
    [0, 1],
    [amplitude * direction, -amplitude * direction],
  );

  const tilt = index % 2 === 0 ? -2.5 : 2.5;

  return (
    <motion.li
      ref={ref}
      className="bench-tile group"
      style={{ y: reduce ? 0 : drift }}
      initial={{ opacity: 0, y: 28, rotate: reduce ? 0 : tilt }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={
        reduce
          ? { duration: 0 }
          : {
              duration: 0.7,
              delay: index * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }
      }
    >
      <motion.div
        whileHover={reduce ? undefined : { y: -10, scale: 1.025 }}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        className="relative aspect-[9/19.5] w-full overflow-hidden rounded-2xl bg-[#f2f4f6] shadow-[0_10px_24px_-18px_rgba(14,34,51,0.5)] ring-1 ring-black/5 transition-shadow duration-500 group-hover:shadow-[0_30px_56px_-24px_rgba(14,34,51,0.55)] group-hover:ring-black/10"
      >
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 640px) 45vw, 22vw"
          className="object-cover object-top"
        />
        {/* A single highlight sweep on hover — the screenshots are flat crops, so
            this is what makes the tile read as a physical surface being picked up. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-[120%] motion-reduce:hidden motion-reduce:transition-none"
        />
      </motion.div>
      <p
        className="mt-3 text-xs uppercase tracking-[0.1em] transition-colors duration-300 group-hover:text-[#0E2233]"
        style={{ fontFamily: MONO, color: offersTheme.muted }}
      >
        {name}
      </p>
    </motion.li>
  );
}
