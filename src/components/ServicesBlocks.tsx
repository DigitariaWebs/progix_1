'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import clsx from 'clsx';

type ServiceItem = {
  code: string;
  title: string;
  description: string;
};

const SERVICES: ServiceItem[] = [
  {
    code: 'S/001',
    title: 'Advisory',
    description:
      'Gain strategic insights from our fractional CTOs, benefit from comprehensive technical reviews, and achieve accelerated development with expert backend, frontend, and DevOps solutions.',
  },
  {
    code: 'S/002',
    title: 'Blockchain',
    description:
      'Build secure, production-grade blockchain applications, smart contracts, and scalable infrastructure with rigorous audits and real-world deployment expertise.',
  },
  {
    code: 'S/003',
    title: 'Product Development',
    description:
      'From discovery to delivery: rapid prototyping, user-centered design, and full-stack implementation to launch products that people love.',
  },
  {
    code: 'S/004',
    title: 'Enterprise Software',
    description:
      'Design robust, compliant, and observable systems. We modernize legacy stacks, integrate complex workflows, and scale reliably across teams.',
  },
  {
    code: 'S/005',
    title: 'Artificial Intelligence',
    description:
      'Ship AI features responsibly: LLM apps, retrieval pipelines, evaluations, and privacy-first deployments tailored to your domain.',
  },
];

function useActiveOnCenter(refs: React.RefObject<HTMLElement>[]) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    refs.forEach((ref, index) => {
      if (!ref.current) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActive(index);
            }
          });
        },
        {
          root: null,
          rootMargin: '-40% 0px -40% 0px', // triggers when the card centers roughly
          threshold: 0.0,
        },
      );
      observer.observe(ref.current);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [refs]);

  return active;
}

export default function ServicesBlocks() {
  const sectionRefs = useMemo(
    () =>
      SERVICES.map(
        () => ({ current: null }) as React.RefObject<HTMLDivElement>,
      ),
    [],
  ) as React.RefObject<HTMLDivElement>[];

  // Assign refs using callback to satisfy TS
  const setRefAt = (index: number) => (el: HTMLDivElement | null) => {
    (sectionRefs[index] as any).current = el;
  };

  const activeIndex = useActiveOnCenter(
    sectionRefs as React.RefObject<HTMLElement>[],
  );

  const spring = useSpring(0, { stiffness: 300, damping: 30, mass: 0.6 });
  useEffect(() => {
    spring.set(activeIndex);
  }, [activeIndex, spring]);

  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Sticky left rail */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <div className="mb-6 text-xs tracking-widest text-neutral-500 dark:text-neutral-400">
                / SERVICES
              </div>
              <ul className="space-y-2">
                {SERVICES.map((s, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <li key={s.code}>
                      <div
                        className={clsx(
                          'inline-flex items-center gap-3 rounded-full border px-3 py-1 text-sm transition-colors',
                          isActive
                            ? 'bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 border-neutral-900 dark:border-neutral-100'
                            : 'text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800',
                        )}
                      >
                        <span className="font-medium tabular-nums">
                          {s.code}
                        </span>
                        <span className="hidden sm:inline">{s.title}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Scroll-reactive right column */}
          <div className="lg:col-span-8 space-y-6">
            {SERVICES.map((s, i) => {
              const isActive = i === activeIndex;
              const targetScale = isActive ? 1 : 0.965;
              const targetOpacity = isActive ? 1 : 0.88;
              const targetPad = isActive ? 'py-10' : 'py-8';

              return (
                <motion.article
                  key={s.code}
                  ref={setRefAt(i)}
                  layout
                  initial={false}
                  animate={{ scale: targetScale, opacity: targetOpacity }}
                  transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                  className={clsx(
                    'rounded-2xl border bg-neutral-50 dark:bg-neutral-900/30 backdrop-blur-sm',
                    'border-neutral-200 dark:border-neutral-800',
                    targetPad,
                  )}
                  style={{ filter: isActive ? 'blur(0px)' : 'blur(0.5px)' }}
                >
                  <div className="flex items-start gap-6 px-6 sm:px-8">
                    <div className="hidden sm:block">
                      <div className="rounded-xl bg-neutral-100 dark:bg-neutral-800 p-6">
                        {/* Simple emblem to echo reference style */}
                        <div className="h-24 w-24 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 text-xs font-medium tracking-widest text-neutral-500 dark:text-neutral-400">
                        {s.code}
                      </div>
                      <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-3xl">
                        {s.title}
                      </h3>
                      <p className="mt-3 text-neutral-700 dark:text-neutral-300">
                        {s.description}
                      </p>

                      <div className="mt-6">
                        <span
                          className={clsx(
                            'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs',
                            isActive
                              ? 'border-neutral-900 bg-neutral-900 text-neutral-50 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900'
                              : 'border-neutral-300 text-neutral-600 dark:border-neutral-700 dark:text-neutral-300',
                          )}
                        >
                          {isActive ? 'Now in view' : 'Scroll'}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
