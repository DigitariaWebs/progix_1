'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { Easing } from 'framer-motion';

type Keyframe = Record<string, any>;

function buildKeyframes(from: Keyframe, steps: Keyframe[]) {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);

  const keyframes: Record<string, any[]> = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
}

export type BlurTextProps = {
  text?: string;
  delay?: number; // ms between segments
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Keyframe;
  animationTo?: Keyframe[];
  easing?: Easing | Easing[];
  onAnimationComplete?: () => void;
  stepDuration?: number; // seconds per step in the sequence
  segmentClassName?: (segment: string, index: number) => string | undefined;
  segmentStyle?: (
    segment: string,
    index: number,
  ) => React.CSSProperties | undefined;
};

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing,
  onAnimationComplete,
  stepDuration = 0.35,
  segmentClassName,
  segmentStyle,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(10px)', opacity: 0, y: -50 }
        : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction],
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5,
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction],
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1),
  );
  const totalDuration = stepDuration * (stepCount - 1);

  return (
    <p
      ref={ref}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap' }}
    >
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);
        const transition: any = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
        };
        if (easing) transition.ease = easing;

        const extraClass = segmentClassName
          ? segmentClassName(segment, index)
          : undefined;
        const extraStyle = segmentStyle
          ? segmentStyle(segment, index)
          : undefined;
        return (
          <motion.span
            className={`inline-block will-change-[transform,filter,opacity]${extraClass ? ` ${extraClass}` : ''}`}
            key={`${segment}-${index}`}
            initial={fromSnapshot as any}
            animate={inView ? (animateKeyframes as any) : (fromSnapshot as any)}
            transition={transition}
            style={extraStyle}
            onAnimationComplete={
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </p>
  );
};

export default BlurText;
