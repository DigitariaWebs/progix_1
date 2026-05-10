'use client';

import React, { useState } from 'react';
import { expertiseData } from '../../data/expertiseData';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const FILTERS = [
  { id: 'all', label: 'Tous' },
  { id: 'language', label: 'Languages' },
  { id: 'framework', label: 'Frameworks' },
  { id: 'backend', label: 'Backend' },
] as const;

type FilterId = (typeof FILTERS)[number]['id'];

export default function ExpertisePage() {
  const [filter, setFilter] = useState<FilterId>('all');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const filteredExpertise =
    filter === 'all'
      ? expertiseData
      : expertiseData.filter((item) => item.type.toLowerCase() === filter);

  const toggle = (name: string) =>
    setExpandedItem(expandedItem === name ? null : name);

  return (
    <main className="min-h-screen bg-[#fafafa] text-[#0A2456]">
      <div className="mx-auto max-w-[88rem] px-6 pt-36 pb-32 md:px-10 lg:pt-48">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[5fr_7fr] lg:gap-20">
          {/* Left: sticky intro + filters */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[#1D4760]/55">
              <span aria-hidden className="block h-px w-10 bg-[#1D4760]/30" />
              <span>Expertise · Stack technique</span>
            </div>

            <h1 className="mt-7 font-bold leading-[0.95] tracking-[-0.02em] text-[clamp(2.75rem,6vw,4.75rem)]">
              Notre maîtrise
              <br aria-hidden />
              technique<span className="text-[#0A2456]/25">.</span>
            </h1>

            <p className="mt-7 max-w-md text-base leading-relaxed text-[#0A2456]/70 md:text-lg md:leading-[1.6]">
              Une équipe sénior, une expertise pointue à travers les langages,
              frameworks et infrastructures qui construisent les produits
              modernes — du prototype au déploiement à grande échelle.
            </p>

            <div className="mt-10 flex flex-wrap gap-2">
              {FILTERS.map((f) => {
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFilter(f.id)}
                    aria-pressed={active}
                    className={
                      active
                        ? 'rounded-full bg-[#0A2456] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors'
                        : 'rounded-full border border-[#0A2456]/20 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0A2456]/70 transition-colors hover:border-[#0A2456]/50 hover:text-[#0A2456]'
                    }
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#1D4760]/55">
              <span className="tabular-nums text-[#0A2456]">
                {String(filteredExpertise.length).padStart(2, '0')}
              </span>
              <span aria-hidden className="block h-px w-4 bg-[#1D4760]/30" />
              <span>technologies</span>
            </div>
          </aside>

          {/* Right: technologies list */}
          <section>
            <ul className="border-t border-[#0A2456]/10">
              <AnimatePresence initial={false}>
                {filteredExpertise.map((item) => {
                  const open = expandedItem === item.name;
                  const stableNum =
                    expertiseData.findIndex((e) => e.name === item.name) + 1;
                  return (
                    <motion.li
                      key={item.name}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{
                        duration: 0.28,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="border-b border-[#0A2456]/10"
                    >
                      <button
                        type="button"
                        onClick={() => toggle(item.name)}
                        aria-expanded={open}
                        className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:bg-[#0A2456]/[0.025]"
                      >
                        <div className="flex items-baseline gap-5">
                          <span className="font-mono text-[11px] tabular-nums text-[#1D4760]/45">
                            {String(stableNum).padStart(2, '0')}
                          </span>
                          <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                            {item.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-5">
                          <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-[#1D4760]/55 sm:inline">
                            {item.type}
                          </span>
                          <motion.span
                            animate={{ rotate: open ? 45 : 0 }}
                            transition={{
                              duration: 0.28,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0A2456]/15 text-[#0A2456] transition-colors group-hover:border-[#0A2456]/40"
                          >
                            <Plus className="h-4 w-4" strokeWidth={1.75} />
                          </motion.span>
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                              height: 'auto',
                              opacity: 1,
                              transition: {
                                height: {
                                  duration: 0.3,
                                  ease: [0.22, 1, 0.36, 1],
                                },
                                opacity: { duration: 0.2, delay: 0.05 },
                              },
                            }}
                            exit={{
                              height: 0,
                              opacity: 0,
                              transition: {
                                height: {
                                  duration: 0.25,
                                  ease: [0.4, 0, 0.2, 1],
                                },
                                opacity: { duration: 0.1 },
                              },
                            }}
                            className="overflow-hidden"
                          >
                            <div className="ml-12 max-w-2xl pb-7 pr-2">
                              <p className="text-base leading-relaxed text-[#0A2456]/70">
                                {item.description}
                              </p>
                              <div className="mt-5 flex flex-wrap gap-2">
                                {item.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="inline-flex items-center rounded-full border border-[#0A2456]/15 bg-[#0A2456]/[0.04] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0A2456]/75"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>

            {filteredExpertise.length === 0 && (
              <p className="py-16 text-center text-sm text-[#0A2456]/50">
                Aucune technologie dans cette catégorie.
              </p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
