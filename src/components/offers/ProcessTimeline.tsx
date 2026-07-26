import { DISPLAY, MONO, offersTheme, processSteps } from '@/data/offersData';

export default function ProcessTimeline() {
  return (
    <section className="bg-[#f7f8f9] px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <p
          className="text-[11px] uppercase tracking-[0.3em]"
          style={{ fontFamily: MONO, color: offersTheme.muted }}
        >
          {processSteps.eyebrow}
        </p>
        <h2
          className="mt-6 font-bold"
          style={{
            fontFamily: DISPLAY,
            color: offersTheme.ink,
            fontSize: 'clamp(2rem, 5vw, 3.4rem)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}
        >
          {processSteps.title}
        </h2>

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.phases.map((phase) => (
            <li key={phase.label} className="border-t-2 border-[#0E2233] pt-5">
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
              <p className="mt-3 text-sm leading-relaxed text-[#5c6a76]">
                {phase.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
