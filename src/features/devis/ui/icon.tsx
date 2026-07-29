import type { CSSProperties, ReactNode } from "react";

/**
 * One custom line-icon set for the whole document — a single visual language
 * (24×24 grid, 1.75 stroke, round caps/joins) so nothing reads as OS emoji or
 * stray typographic glyphs. Add to the map rather than reaching for a character.
 */
const ICONS: Record<string, ReactNode> = {
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 5.6L20.5 7" />
    </>
  ),
  phone: (
    <path d="M6 3.5H4.6A1.6 1.6 0 0 0 3 5.2 15.8 15.8 0 0 0 18.8 21a1.6 1.6 0 0 0 1.7-1.6v-1.9a1 1 0 0 0-.85-1l-3-.5a1 1 0 0 0-1 .4l-.7 1a12.3 12.3 0 0 1-5.3-5.3l1-.7a1 1 0 0 0 .4-1l-.5-3a1 1 0 0 0-1-.85z" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.5 2.4 3.8 5.4 3.8 8.5s-1.3 6.1-3.8 8.5c-2.5-2.4-3.8-5.4-3.8-8.5S9.5 5.9 12 3.5z" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21c4.2-4.4 6.3-8 6.3-10.7A6.3 6.3 0 0 0 5.7 10.3C5.7 13 7.8 16.6 12 21z" />
      <circle cx="12" cy="10.2" r="2.4" />
    </>
  ),
  download: (
    <>
      <path d="M12 3.5v11.4" />
      <path d="m7.4 10.4 4.6 4.6 4.6-4.6" />
      <path d="M5 20h14" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11.2v4.8" />
      <path d="M12 8.1h.01" />
    </>
  ),
  euro: (
    <>
      <path d="M16.6 6.4a6.4 6.4 0 1 0 .2 11.2" />
      <path d="M4.8 10.6h8.4" />
      <path d="M4.8 13.8h7" />
    </>
  ),
  check: <path d="m5 12.6 4.3 4.3L19 7.4" />,
  plus: <path d="M12 5.5v13M5.5 12h13" />,
  arrow: (
    <>
      <path d="M8.5 15.5 15.5 8.5" />
      <path d="M9.5 8.5h6v6" />
    </>
  ),
  diamond: <path d="M12 3.8 20.2 12 12 20.2 3.8 12z" />,
  shield: (
    <>
      <path d="M12 3.2 5.5 5.8v5.1c0 3.9 2.8 6.6 6.5 7.9 3.7-1.3 6.5-4 6.5-7.9V5.8z" />
      <path d="m9.2 11.6 1.9 1.9 3.7-3.8" />
    </>
  ),
  wrench: (
    <path d="M14.8 5.6a3.6 3.6 0 0 0-4.9 4.4l-5 5a1.9 1.9 0 0 0 2.7 2.7l5-5a3.6 3.6 0 0 0 4.4-4.9l-2.3 2.4-2.3-2.3 2.4-2.3z" />
  ),
  star: <path d="M12 4.5 14.2 9l5 .7-3.6 3.5.9 5-4.5-2.4L7.5 18l.9-5L4.8 9.7l5-.7z" />,
};

export function Icon({
  name,
  size = 18,
  strokeWidth = 1.75,
  fill = "none",
  style,
}: {
  name: string;
  size?: number;
  strokeWidth?: number;
  fill?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block", flexShrink: 0, ...style }}
    >
      {ICONS[name] ?? null}
    </svg>
  );
}
