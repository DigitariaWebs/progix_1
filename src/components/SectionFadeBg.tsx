'use client';

import React, { useEffect, useRef, useState } from 'react';
import './SectionFadeBg.css';

interface SectionFadeBgProps {
  threshold?: number;
  className?: string;
  children: React.ReactNode;
}

export default function SectionFadeBg({
  threshold = 0.3,
  className = '',
  children,
}: SectionFadeBgProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setInView(entry.isIntersecting);
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      data-in-view={inView || undefined}
      className={`section-fade-bg w-full${className ? ' ' + className : ''}`}
    >
      {children}
    </div>
  );
}
