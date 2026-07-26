'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { MONO, offersTheme, processSteps } from '@/data/offersData';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

export default function ProcessTimeline() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="offers-process-title"
      className="bg-[#f7f8f9] px-5 py-24 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          id="offers-process-title"
          eyebrow={processSteps.eyebrow}
          title={processSteps.title}
          size="lg"
        />

        <div className="relative mt-14">
          {/* The rule draws left to right as the section enters, so the four
              phases read as one elapsing timeline rather than four cards. */}
          <motion.div
            aria-hidden
            className="absolute inset-x-0 top-0 hidden h-0.5 origin-left sm:block"
            style={{ background: offersTheme.ink }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={reduce ? { duration: 0 } : { duration: 0.9, ease: 'easeOut' }}
          />

          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.phases.map((phase, index) => (
              <Reveal
                key={phase.label}
                as="li"
                delay={0.2 + index * 0.12}
                className="border-t-2 pt-5 sm:border-t-0 sm:pt-6"
                // The drawn rule replaces the border from `sm` up; below that each
                // phase keeps its own so the sequence still reads as stacked steps.
              >
                <span
                  aria-hidden
                  className="hidden sm:mb-5 sm:block sm:h-2 sm:w-2 sm:rounded-full"
                  style={{ background: offersTheme.ink }}
                />
                <p
                  className="text-[11px] uppercase tracking-[0.16em]"
                  style={{ fontFamily: MONO, color: offersTheme.muted }}
                >
                  {phase.when}
                </p>
                <p
                  className="mt-3 text-lg font-semibold"
                  style={{ color: offersTheme.ink }}
                >
                  {phase.label}
                </p>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: offersTheme.muted }}
                >
                  {phase.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
