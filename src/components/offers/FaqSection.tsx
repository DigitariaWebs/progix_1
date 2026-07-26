'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { faq, offersTheme } from '@/data/offersData';
import SectionHeader from './SectionHeader';

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  const reduce = useReducedMotion();

  return (
    <section
      id="faq"
      aria-labelledby="offers-faq-title"
      className="scroll-mt-20 bg-white px-5 py-24 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          id="offers-faq-title"
          eyebrow={faq.eyebrow}
          title={faq.title}
        />

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
                    className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-200 hover:text-[#00708C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E2233]"
                  >
                    <span
                      className="text-base font-semibold"
                      style={{ color: expanded ? offersTheme.cyanInk : offersTheme.ink }}
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

                {/* Height is animated rather than toggled with `hidden`, so the
                    rotating icon and the panel move together instead of one
                    easing while the other snaps. */}
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
                      }
                      className="overflow-hidden"
                    >
                      <p
                        className="pb-6 pr-10 text-sm leading-relaxed"
                        style={{ color: offersTheme.muted }}
                      >
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
