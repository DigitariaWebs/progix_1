import type { Metadata } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import './globals.css';
import PageTransition from '@/components/PageTransition';
import GlobalMenu from '@/components/GlobalMenu';
import { GlobalMenuProvider } from '@/components/globalMenuBus';
import MaintenancePage from '@/components/MaintenancePage';

// Maintenance mode is ON by default (site is closed). To reopen the site,
// set the env var MAINTENANCE_MODE=false in the host (Vercel) and redeploy.
const MAINTENANCE_MODE = process.env.MAINTENANCE_MODE !== 'false';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.progix.pro'),
  title: {
    default: 'PROGIX — Développement web, mobile et conseil IT à Montréal',
    template: 'PROGIX | %s',
  },
  description:
    'Agence basée à Montréal spécialisée en développement web full‑stack, applications mobiles performantes et services-conseils IT. Hébergement managé, UX/UI, DevOps et support.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/images/logo.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.progix.pro',
    siteName: 'PROGIX',
    title: 'PROGIX — Développement web, mobile et conseil IT à Montréal',
    description:
      'Agence basée à Montréal spécialisée en développement web full‑stack, applications mobiles performantes et services-conseils IT.',
    locale: 'fr_CA',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'PROGIX',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PROGIX — Développement web, mobile et conseil IT à Montréal',
    description:
      'Agence basée à Montréal spécialisée en développement web full‑stack, applications mobiles performantes et services-conseils IT.',
    images: ['/images/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="overflow-x-hidden">
      <head>
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17686381075"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17686381075');
            `,
          }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${inter.variable} font-sans antialiased overflow-x-hidden`}
      >
        {MAINTENANCE_MODE ? (
          <MaintenancePage />
        ) : (
          <GlobalMenuProvider>
            <GlobalMenu />
            <PageTransition>{children}</PageTransition>
          </GlobalMenuProvider>
        )}
      </body>
    </html>
  );
}
