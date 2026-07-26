'use client';

import { useEffect, useState } from 'react';
import { MONO, offersTheme, stickyCta } from '@/data/offersData';

export default function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/10 px-4 py-3 transition-transform duration-300 lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ background: offersTheme.ink }}
    >
      <div className="flex items-center justify-between gap-4">
        <span
          className="text-[10px] uppercase leading-tight tracking-[0.14em] text-white/70"
          style={{ fontFamily: MONO }}
        >
          {stickyCta.label}
        </span>
        <a
          href="#proposition"
          className="shrink-0 rounded-full px-5 py-3 text-xs font-semibold text-[#0E2233] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          style={{ background: offersTheme.cyan }}
        >
          {stickyCta.button}
        </a>
      </div>
    </div>
  );
}
