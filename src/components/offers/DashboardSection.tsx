'use client';

import LaptopFrame from '@/components/portfolio/LaptopFrame';
import { dashboard, offersTheme } from '@/data/offersData';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

export default function DashboardSection() {
  return (
    <section
      aria-labelledby="offers-dashboard-title"
      className="px-5 py-24 sm:px-8 lg:px-12"
      style={{ background: offersTheme.steel }}
    >
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <SectionHeader
            id="offers-dashboard-title"
            eyebrow={dashboard.eyebrow}
            title={dashboard.title}
            tone="dark"
          />

          <Reveal delay={0.08}>
            <p className="mt-6 text-base leading-relaxed text-white/70">
              {dashboard.body}
            </p>
          </Reveal>

          <ul className="mt-8 space-y-3">
            {dashboard.bullets.map((bullet, index) => (
              <Reveal
                key={bullet}
                as="li"
                delay={0.12 + index * 0.06}
                className="flex gap-3 text-sm text-white/75"
              >
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: offersTheme.cyan }}
                />
                {bullet}
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          {dashboard.shots.map((shot, index) => (
            <Reveal key={shot.src} delay={index * 0.12}>
              <div className="transition-transform duration-500 hover:-translate-y-1">
                <LaptopFrame
                  media={{ kind: 'image', src: shot.src }}
                  alt={shot.alt}
                />
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            {/* The mockup disclosure. It qualifies the images above it, so it has to be
                as readable as they are — 4.5:1 minimum, not a whispered footnote. */}
            <p className="text-xs leading-relaxed text-white/70">
              {dashboard.caption}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
