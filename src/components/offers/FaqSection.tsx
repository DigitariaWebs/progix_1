'use client';

import { useId, useState } from 'react';
import { DISPLAY, MONO, faq, offersTheme } from '@/data/offersData';

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="bg-white px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <p
          className="text-[11px] uppercase tracking-[0.3em]"
          style={{ fontFamily: MONO, color: offersTheme.muted }}
        >
          {faq.eyebrow}
        </p>
        <h2
          className="mt-6 font-bold"
          style={{
            fontFamily: DISPLAY,
            color: offersTheme.ink,
            fontSize: 'clamp(1.7rem, 3.6vw, 2.6rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {faq.title}
        </h2>

        <div className="mt-12 border-t border-black/10">
          {faq.items.map((item, index) => {
            const expanded = open === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;

            return (
              <div key={item.q} className="border-b border-black/10">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? null : index)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E2233]"
                  >
                    <span
                      className="text-base font-semibold"
                      style={{ color: offersTheme.ink }}
                    >
                      {item.q}
                    </span>
                    <span
                      aria-hidden
                      className="shrink-0 text-xl leading-none transition-transform duration-300"
                      style={{
                        color: offersTheme.muted,
                        transform: expanded ? 'rotate(45deg)' : 'none',
                      }}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!expanded}
                  className="pb-6 pr-10 text-sm leading-relaxed"
                  style={{ color: offersTheme.muted }}
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
