"use client";

import { m } from "@/components/motion";
import {
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { useRef } from "react";
import styles from "./cinematic.module.css";

/**
 * Velocity-responsive marquee, ported from progix_1's ScrollVelocity: scrolls on
 * its own, and speeds up / reverses with the page's scroll velocity. Two copies
 * of the row are rendered so the wrap is seamless.
 */
export function Marquee({
  items,
  baseVelocity = 1.4,
}: {
  items: readonly string[];
  baseVelocity?: number;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    moveBy += dir.current * moveBy * Math.abs(f);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={styles.marqueeWrap} aria-hidden="true">
      <m.div className={styles.marqueeRow} style={{ x }}>
        {[0, 1].map((copy) => (
          <div key={copy} className={styles.marqueeRow}>
            {items.map((item, i) => (
              <span key={`${copy}-${i}`} className={styles.marqueeItem}>
                <span className={i % 2 ? styles.marqueeGhost : undefined}>{item}</span>
                <span className={styles.marqueeStar}>✦</span>
              </span>
            ))}
          </div>
        ))}
      </m.div>
    </div>
  );
}
