import { Geist_Mono, Newsreader } from "next/font/google";
import type { Metadata } from "next";
import { AuthProvider } from "./_lib/auth";
import "../globals.css";

const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const newsreader = Newsreader({
  variable: "--font-newsreader",
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

/** Internal tool — never index it. */
export const metadata: Metadata = {
  title: "Progix Admin",
  robots: { index: false, follow: false },
};

/**
 * Upstream's admin panel owns its own `<html>`/`<body>` because its root
 * layout is a pass-through. Progix's root layout (src/app/layout.tsx) already
 * renders a real `<html>`/`<body>` for the marketing site, so a second one
 * here would nest invalid HTML and hydration would mismatch. This renders a
 * wrapping `<div>` instead, carrying the same fonts/background/text color.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${geistMono.variable} ${newsreader.variable} min-h-dvh bg-[#060d1c] font-sans text-white antialiased`}
    >
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}
