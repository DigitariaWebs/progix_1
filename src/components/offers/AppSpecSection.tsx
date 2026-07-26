import { DISPLAY, MONO, appSpec, offersTheme } from '@/data/offersData';

export default function AppSpecSection() {
  return (
    <section className="bg-[#f7f8f9] px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <p
          className="text-[11px] uppercase tracking-[0.3em]"
          style={{ fontFamily: MONO, color: offersTheme.muted }}
        >
          {appSpec.eyebrow}
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
          {appSpec.title}
        </h2>

        <dl className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {appSpec.features.map((feature) => (
            <div key={feature.label} className="border-t border-black/10 pt-6">
              <dt
                className="text-sm font-semibold uppercase tracking-[0.08em]"
                style={{ color: offersTheme.ink }}
              >
                {feature.label}
              </dt>
              <dd className="mt-3 text-base leading-relaxed text-[#425466]">
                {feature.body}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
