import Image from 'next/image';
import { DISPLAY, MONO, benchmark, offersTheme } from '@/data/offersData';

export default function BenchmarkStrip() {
  return (
    <section className="bg-white px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <p
          className="text-[11px] uppercase tracking-[0.3em]"
          style={{ fontFamily: MONO, color: offersTheme.muted }}
        >
          {benchmark.eyebrow}
        </p>
        <h2
          className="mt-6 max-w-3xl font-bold"
          style={{
            fontFamily: DISPLAY,
            color: offersTheme.ink,
            fontSize: 'clamp(1.7rem, 3.6vw, 2.8rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {benchmark.title}
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#425466]">
          {benchmark.body}
        </p>

        <ul className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {benchmark.apps.map((app) => (
            <li key={app.name}>
              <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-2xl bg-[#f2f4f6] ring-1 ring-black/5">
                <Image
                  src={app.image}
                  alt={`Fiche App Store de l'application ${app.name}`}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
                  className="object-cover object-top"
                />
              </div>
              <p
                className="mt-3 text-[11px] uppercase tracking-[0.1em]"
                style={{ fontFamily: MONO, color: offersTheme.muted }}
              >
                {app.name}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-2xl border-l-2 border-black/10 pl-4 text-xs leading-relaxed text-[#6b7683]">
          {benchmark.disclaimer}
        </p>
      </div>
    </section>
  );
}
