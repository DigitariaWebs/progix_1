import { DISPLAY, MONO, offersTheme } from '@/data/offersData';
import Reveal from './Reveal';

type Props = {
  eyebrow: string;
  title: string;
  /** `dark` for the navy and steel bands, `light` for white and #f7f8f9. */
  tone?: 'light' | 'dark';
  /** `lg` is the one-word statement in the timeline; `md` is every other band. */
  size?: 'md' | 'lg';
  /** Anchor for the section's `aria-labelledby`. */
  id?: string;
};

const CLAMP = {
  md: 'clamp(1.7rem, 3.6vw, 2.8rem)',
  lg: 'clamp(2rem, 5vw, 3.4rem)',
} as const;

export default function SectionHeader({
  eyebrow,
  title,
  tone = 'light',
  size = 'md',
  id,
}: Props) {
  const dark = tone === 'dark';

  return (
    <Reveal>
      <p
        className={`text-[11px] uppercase tracking-[0.3em] ${dark ? 'text-white/60' : ''}`}
        style={{
          fontFamily: MONO,
          ...(dark ? {} : { color: offersTheme.muted }),
        }}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-6 max-w-3xl font-bold ${dark ? 'text-white' : ''}`}
        style={{
          fontFamily: DISPLAY,
          fontSize: CLAMP[size],
          lineHeight: size === 'lg' ? 1 : 1.1,
          letterSpacing: size === 'lg' ? '-0.03em' : '-0.02em',
          ...(dark ? {} : { color: offersTheme.ink }),
        }}
      >
        {title}
      </h2>
    </Reveal>
  );
}
