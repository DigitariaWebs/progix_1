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
 * Client estimates and specifications live outside the i18n `[locale]` tree so they
 * own their own `<html>`/`<body>` with brand typography (Space Grotesk + Inter).
 */
export default function DevisLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${inter.variable} font-sans antialiased`}
      >
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
