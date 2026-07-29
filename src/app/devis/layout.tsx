import { Geist, Geist_Mono, Inter, Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import { MotionProvider } from "@/components/motion";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Devis contractuel · Progix",
  robots: { index: false, follow: false },
};

/**
 * Upstream's devis portal owns its own `<html>`/`<body>` because its root
 * layout is a pass-through. Progix's root layout (src/app/layout.tsx) already
 * renders a real `<html>`/`<body>` for the marketing site, so a second one
 * here would nest invalid HTML and hydration would mismatch. This renders a
 * wrapping `<div>` instead, carrying the same brand typography.
 */
export default function DevisLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${inter.variable} font-sans antialiased`}
    >
      <MotionProvider>{children}</MotionProvider>
    </div>
  );
}
