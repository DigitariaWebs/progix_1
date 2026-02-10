'use client';

import React, { useRef, useLayoutEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'framer-motion';
import './ScrollVelocity.css';

function useElementWidth(ref: React.RefObject<HTMLElement | null>): number {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [ref]);

  return width;
}

type VelocityMapping = { input: number[]; output: number[] };

interface ScrollVelocityProps {
  scrollContainerRef?: HTMLElement | null;
  texts?: string[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

export default function ScrollVelocity({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = 'parallax',
  scrollerClassName = 'scroller',
  parallaxStyle,
  scrollerStyle,
}: ScrollVelocityProps) {
  function VelocityText({
    children,
    baseVelocity = velocity,
    scrollContainerRef,
    className = '',
    damping,
    stiffness,
    numCopies,
    velocityMapping,
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle,
  }: {
    children: React.ReactNode;
    baseVelocity?: number;
    scrollContainerRef?: HTMLElement | null;
    className?: string;
    damping?: number;
    stiffness?: number;
    numCopies?: number;
    velocityMapping?: VelocityMapping;
    parallaxClassName?: string;
    scrollerClassName?: string;
    parallaxStyle?: React.CSSProperties;
    scrollerStyle?: React.CSSProperties;
  }) {
    const baseX = useMotionValue(0);
    const scrollOptions: { container?: Element } = scrollContainerRef
      ? { container: scrollContainerRef }
      : {};
    const { scrollY } = useScroll(scrollOptions);
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: damping ?? 50,
      stiffness: stiffness ?? 400,
    });
    const velocityFactor = useTransform(
      smoothVelocity,
      velocityMapping?.input || [0, 1000],
      velocityMapping?.output || [0, 5],
      { clamp: false },
    );

    const copyRef = useRef<HTMLSpanElement | null>(null);
    const copyWidth = useElementWidth(
      copyRef as unknown as React.RefObject<HTMLElement>,
    );

    function wrap(min: number, max: number, v: number): number {
      const range = max - min;
      const mod = (((v - min) % range) + range) % range;
      return mod + min;
    }

    const x = useTransform(baseX, (v) => {
      if (copyWidth === 0) return '0px';
      return `${wrap(-copyWidth, 0, v)}px`;
    });

    const directionFactor = useRef(1);
    useAnimationFrame((_, delta) => {
      let moveBy =
        directionFactor.current * (baseVelocity ?? 100) * (delta / 1000);

      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();
      baseX.set(baseX.get() + moveBy);
    });

    const spans: React.ReactNode[] = [];
    // Render helper: split "NOTRE ÉQUIPE" into styled parts
    const renderParts = (content: React.ReactNode) => {
      const raw = String(content ?? '');
      const parts = raw.split(/\s+/);
      const first = parts[0] || '';
      const rest = parts.slice(1).join(' ');
      return (
        <>
          <span className="sv-notre">{first}</span>
          {rest ? <span className="sv-equipe"> {rest}</span> : null}
        </>
      );
    };

    for (let i = 0; i < (numCopies ?? 6); i++) {
      spans.push(
        <span
          className={`sv-word ${className}`}
          key={i}
          ref={i === 0 ? copyRef : null}
        >
          {renderParts(children)}
        </span>,
      );
    }

    return (
      <div
        className={`${parallaxClassName} overflow-hidden`}
        style={parallaxStyle}
      >
        <motion.div
          className={scrollerClassName}
          style={{ x, ...(scrollerStyle || {}) }}
        >
          {spans}
        </motion.div>
      </div>
    );
  }

  return (
    <section className="overflow-hidden w-full">
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={
            index % 2 !== 0 ? -(velocity ?? 100) : (velocity ?? 100)
          }
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
        >
          {text}
        </VelocityText>
      ))}
    </section>
  );
}
