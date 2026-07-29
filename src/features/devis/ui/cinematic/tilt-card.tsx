"use client";

import { m } from "@/components/motion";
import { useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./cinematic.module.css";

/**
 * 3D tilt + cursor spotlight glass card. The card rotates subtly toward the
 * pointer and a radial highlight (--mx/--my, read by `.spotlight`) follows it.
 * Pointer-fine only; flattens to a static glass card on touch / reduced-motion.
 */
export function TiltCard({
  children,
  className,
  style,
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 200,
    damping: 20,
  });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 200,
    damping: 20,
  });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    px.set(nx);
    py.set(ny);
    el.style.setProperty("--mx", `${nx * 100}%`);
    el.style.setProperty("--my", `${ny * 100}%`);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <m.div
      ref={ref}
      className={cn(styles.glass, className)}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{
        ...style,
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      }}
    >
      <span className={styles.spotlight} aria-hidden="true" />
      {children}
    </m.div>
  );
}
