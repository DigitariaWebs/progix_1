'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

export type ScrollFloatProps = {
  children: string;
  scrollContainerRef?: React.RefObject<HTMLElement | Window>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
};

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03,
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    // Keep spaces as separate tokens and preserve newlines
    const tokens = text.split(/(\n|\s+)/);
    let globalIndex = 0;
    return tokens.map((token, tokenIdx) => {
      if (token === '\n') {
        return <br key={`br-${tokenIdx}`} />;
      }
      if (/^\s+$/.test(token)) {
        // Preserve spaces as NBSP of equal length
        const nbsp = token.replace(/ /g, '\u00A0');
        return (
          <span className="space" key={`space-${tokenIdx}`}>
            {nbsp}
          </span>
        );
      }
      // Word token: wrap characters inside a non-wrapping container
      const chars = token.split('').map((char) => (
        <span className="char" key={`char-${globalIndex++}`}>
          {char}
        </span>
      ));
      return (
        <span className="word" key={`word-${tokenIdx}`}>
          {chars}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef?.current ?? window;
    const charElements = el.querySelectorAll('.char');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        charElements,
        {
          willChange: 'opacity, transform',
          opacity: 0,
          yPercent: 120,
          scaleY: 2.3,
          scaleX: 0.7,
          transformOrigin: '50% 0%',
        },
        {
          duration: animationDuration,
          ease,
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger,
          scrollTrigger: {
            trigger: el,
            scroller: scroller as any,
            start: scrollStart,
            end: scrollEnd,
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [
    scrollContainerRef,
    animationDuration,
    ease,
    scrollStart,
    scrollEnd,
    stagger,
  ]);

  return (
    <h2 ref={containerRef} className={`scroll-float ${containerClassName}`}>
      <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
    </h2>
  );
};

export default ScrollFloat;
