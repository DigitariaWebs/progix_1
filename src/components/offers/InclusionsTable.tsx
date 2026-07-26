import { DISPLAY, MONO, inclusions, offersTheme } from '@/data/offersData';

export default function InclusionsTable() {
  return (
    <section id="inclus" className="scroll-mt-24 bg-white px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <p
          className="text-[11px] uppercase tracking-[0.3em]"
          style={{ fontFamily: MONO, color: offersTheme.muted }}
        >
          {inclusions.eyebrow}
        </p>
        <h2
          className="mt-6 font-bold"
          style={{
            fontFamily: DISPLAY,
            color: offersTheme.ink,
            fontSize: 'clamp(1.7rem, 3.6vw, 2.8rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {inclusions.title}
        </h2>

        <ul className="mt-14 border-t border-black/10">
          {inclusions.rows.map((row) => (
            <li
              key={row.code}
              className="grid gap-2 border-b border-black/10 py-6 sm:grid-cols-[72px_1fr_1.1fr] sm:gap-8"
            >
              <span
                className="text-[11px] uppercase tracking-[0.18em]"
                style={{ fontFamily: MONO, color: offersTheme.cyan }}
              >
                {row.code}
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: offersTheme.ink }}
              >
                {row.label}
              </span>
              <span className="text-sm leading-relaxed text-[#5c6a76]">
                {row.detail}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
