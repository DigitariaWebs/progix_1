"use client";

import { m } from "@/components/motion";
import { useInView } from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 48 },
  down: { x: 0, y: -48 },
  left: { x: 64, y: 0 },
  right: { x: -64, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Scroll-triggered reveal — opacity + translate + blur, ported from progix_1's
 * ScrollAnimation. Fires once when the element enters the viewport. The blur is
 * what makes it read as "expensive" rather than a plain fade.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  className,
  style,
  as = "div",
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "li" | "span" | "section" | "article";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const off = OFFSET[direction];

  const MotionTag = m[as] as typeof m.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, x: off.x, y: off.y, filter: "blur(10px)" }}
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
          : { opacity: 0, x: off.x, y: off.y, filter: "blur(10px)" }
      }
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggered container — children passed as an array are revealed one after the
 * other. Each child should be wrapped by the caller; this only schedules delays.
 */
export function RevealStagger({
  children,
  step = 0.08,
  baseDelay = 0,
  direction = "up",
  className,
  style,
}: {
  children: ReactNode[];
  step?: number;
  baseDelay?: number;
  direction?: Direction;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={className} style={style}>
      {children.map((child, i) => (
        <Reveal key={i} direction={direction} delay={baseDelay + i * step}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
