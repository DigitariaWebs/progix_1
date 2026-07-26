'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Seconds. Use with an index to stagger a list: `delay={i * 0.07}`. */
  delay?: number;
  /** Travel distance in px. Keep small — this is a nudge, not a slide. */
  y?: number;
  className?: string;
  /** `li` when the parent is a `ul`/`ol`, so the markup stays valid. */
  as?: 'div' | 'li';
};

/**
 * Scroll-triggered entrance for a section or a list item.
 *
 * `initial` and `whileInView` stay unconditional so the server and the client
 * render the same markup; reduced motion collapses the duration to zero rather
 * than dropping the props, which would leave the server's `opacity: 0` stuck
 * with nothing to clear it.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = 'div',
}: Props) {
  const reduce = useReducedMotion();
  const Tag = as === 'li' ? motion.li : motion.div;

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </Tag>
  );
}
