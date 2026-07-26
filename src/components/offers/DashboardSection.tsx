'use client';

import LaptopFrame from '@/components/portfolio/LaptopFrame';
import { DISPLAY, dashboard, offersTheme } from '@/data/offersData';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

export default function DashboardSection() {
  return (
    <section
      id="back-office"
      aria-labelledby="offers-dashboard-title"
      className="scroll-mt-20 px-5 py-24 sm:px-8 lg:px-12"
      style={{ background: offersTheme.steel }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          id="offers-dashboard-title"
          eyebrow={dashboard.eyebrow}
          title={dashboard.title}
          tone="dark"
        />

        <div className="mt-16 space-y-20 lg:space-y-24">
          {dashboard.blocks.map((block) => {
            const imageFirst = block.imageSide === 'left';

            return (
              <div
                key={block.title}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                {/* Order is set per column rather than by source order, so the
                    text always reads first on mobile no matter which side the
                    image takes on desktop. */}
                <Reveal
                  delay={0.06}
                  className={imageFirst ? 'lg:order-2' : 'lg:order-1'}
                >
                  <h3
                    className="font-bold text-white"
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: 'clamp(1.35rem, 2.4vw, 1.9rem)',
                      lineHeight: 1.15,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {block.title}
                  </h3>
                  <p className="mt-5 text-base leading-relaxed text-white/70">
                    {block.body}
                  </p>
                  <ul className="mt-7 space-y-3">
                    {block.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-sm text-white/75"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: offersTheme.cyan }}
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal
                  delay={0.12}
                  className={imageFirst ? 'lg:order-1' : 'lg:order-2'}
                >
                  <div className="transition-transform duration-500 hover:-translate-y-1.5">
                    <LaptopFrame
                      media={{ kind: 'image', src: block.shot.src }}
                      alt={block.shot.alt}
                    />
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>

        {/* The mockup disclosure. It qualifies both images above it, so it has to
            be as readable as they are — 4.5:1 minimum, not a whispered footnote. */}
        <Reveal delay={0.1}>
          <p className="mt-14 text-xs leading-relaxed text-white/70">
            {dashboard.caption}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
