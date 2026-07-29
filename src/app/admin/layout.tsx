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
 * The admin panel lives outside the i18n `[locale]` tree, so it owns its own
 * `<html>`/`<body>` (the root layout is a pass-through). Authenticates against
 * the NestJS API — no marketing header/footer, no next-intl.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistMono.variable} ${newsreader.variable} min-h-dvh bg-[#060d1c] font-sans text-white antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
