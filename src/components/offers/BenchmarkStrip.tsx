import { benchmark } from '@/data/offersData';
import BenchmarkTile from './BenchmarkTile';
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

        <ul className="bench-grid mt-14 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {benchmark.apps.map((app, index) => (
            <BenchmarkTile
              key={app.name}
              name={app.name}
              image={app.image}
              alt={app.alt}
              index={index}
            />
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
