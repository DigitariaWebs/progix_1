'use client';

import LaptopFrame from '@/components/portfolio/LaptopFrame';
import { DISPLAY, MONO, dashboard, offersTheme } from '@/data/offersData';

export default function DashboardSection() {
  return (
    <section
      className="px-5 py-24 sm:px-8 lg:px-12"
      style={{ background: offersTheme.steel }}
    >
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p
            className="text-[11px] uppercase tracking-[0.3em] text-white/45"
            style={{ fontFamily: MONO }}
          >
            {dashboard.eyebrow}
          </p>
          <h2
            className="mt-6 font-bold text-white"
            style={{
              fontFamily: DISPLAY,
              fontSize: 'clamp(1.7rem, 3.4vw, 2.6rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {dashboard.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/65">
            {dashboard.body}
          </p>
          <ul className="mt-8 space-y-3">
            {dashboard.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-sm text-white/75">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: offersTheme.cyan }}
                />
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          {dashboard.shots.map((shot) => (
            <LaptopFrame
              key={shot.src}
              media={{ kind: 'image', src: shot.src }}
              alt={shot.alt}
            />
          ))}
          <p className="text-[11px] leading-relaxed text-white/40">
            {dashboard.caption}
          </p>
        </div>
      </div>
    </section>
  );
}
