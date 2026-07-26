import { MONO, inclusions, offersTheme } from '@/data/offersData';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

export default function InclusionsTable() {
  return (
    <section
      id="inclus"
      aria-labelledby="offers-inclusions-title"
      className="scroll-mt-24 bg-white px-5 py-24 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          id="offers-inclusions-title"
          eyebrow={inclusions.eyebrow}
          title={inclusions.title}
        />

        <ul className="mt-14 border-t border-black/10">
          {inclusions.rows.map((row, index) => (
            <Reveal
              key={row.code}
              as="li"
              delay={index * 0.05}
              className="group grid gap-2 border-b border-black/10 py-6 transition-colors duration-300 hover:bg-[#f7f8f9] sm:grid-cols-[72px_1fr_1.1fr] sm:gap-8 sm:px-3 sm:-mx-3"
            >
              <span
                className="text-xs uppercase tracking-[0.18em] transition-transform duration-300 group-hover:translate-x-0.5"
                style={{ fontFamily: MONO, color: offersTheme.cyanInk }}
              >
                {row.code}
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: offersTheme.ink }}
              >
                {row.label}
              </span>
              <span
                className="text-sm leading-relaxed"
                style={{ color: offersTheme.muted }}
              >
                {row.detail}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
