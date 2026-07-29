"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Count-up number that animates from 0 to `value` when scrolled into view.
 * `prefix`/`suffix` carry non-numeric glyphs (e.g. "+", "%"). Honors
 * reduced-motion by snapping straight to the final value.
 */
export function Counter({
  value,
  duration = 1.6,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const dur = reduce ? 0 : duration;
    let raf = 0;
    let start: number | null = null;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      if (start === null) start = now;
      const p = dur <= 0 ? 1 : Math.min((now - start) / (dur * 1000), 1);
      setDisplay(value * ease(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString("fr-FR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
