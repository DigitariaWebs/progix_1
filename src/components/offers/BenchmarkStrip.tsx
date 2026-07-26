import Image from 'next/image';
import { MONO, benchmark, offersTheme } from '@/data/offersData';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

export default function BenchmarkStrip() {
  return (
    <section
      aria-labelledby="offers-benchmark-title"
      className="bg-white px-5 py-24 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          id="offers-benchmark-title"
          eyebrow={benchmark.eyebrow}
          title={benchmark.title}
        />

        <Reveal delay={0.08}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#425466]">
            {benchmark.body}
          </p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {benchmark.apps.map((app, index) => (
            <Reveal key={app.name} as="li" delay={index * 0.07} className="group">
              <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-2xl bg-[#f2f4f6] ring-1 ring-black/5 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_24px_48px_-24px_rgba(14,34,51,0.45)] group-hover:ring-black/10">
                <Image
                  src={app.image}
                  alt={app.alt}
                  fill
                  sizes="(max-width: 640px) 45vw, 22vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <p
                className="mt-3 text-xs uppercase tracking-[0.1em]"
                style={{ fontFamily: MONO, color: offersTheme.muted }}
              >
                {app.name}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl border-l-2 border-black/10 pl-4 text-xs leading-relaxed text-[#5c6a76]">
            {benchmark.disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
