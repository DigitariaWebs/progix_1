import { CreditCard, Store, UserRound, UtensilsCrossed } from 'lucide-react';
import { appSpec, offersTheme } from '@/data/offersData';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const ICONS = {
  UtensilsCrossed,
  CreditCard,
  UserRound,
  Store,
} as const;

export default function AppSpecSection() {
  return (
    <section
      aria-labelledby="offers-appspec-title"
      className="bg-[#f7f8f9] px-5 py-24 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          id="offers-appspec-title"
          eyebrow={appSpec.eyebrow}
          title={appSpec.title}
        />

        <dl className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {appSpec.features.map((feature, index) => {
            const Icon = ICONS[feature.icon as keyof typeof ICONS];

            return (
              <Reveal key={feature.label} delay={index * 0.07}>
                <div className="group border-t border-black/10 pt-6 transition-colors duration-300 hover:border-[#00708C]/40">
                  <dt className="flex items-center gap-3">
                    <Icon
                      aria-hidden
                      strokeWidth={1.5}
                      className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
                      style={{ color: offersTheme.cyanInk }}
                    />
                    <span
                      className="text-sm font-semibold uppercase tracking-[0.08em]"
                      style={{ color: offersTheme.ink }}
                    >
                      {feature.label}
                    </span>
                  </dt>
                  <dd className="mt-3 text-base leading-relaxed text-[#425466]">
                    {feature.body}
                  </dd>
                </div>
              </Reveal>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
