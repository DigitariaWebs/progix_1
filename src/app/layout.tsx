import type { Metadata } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import './globals.css';
import PageTransition from '@/components/PageTransition';
import GlobalMenu from '@/components/GlobalMenu';

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
    default: 'PROGIX — Développement Web & Mobile à Montréal',
    template: '%s | PROGIX',
  },
  description:
    "Agence de développement web & mobile à Montréal. Apps, ERP/CRM, intégrations cloud, DevOps et hébergement managé.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'PROGIX',
    title: 'PROGIX — Développement Web & Mobile à Montréal',
    description:
      "Agence de développement web & mobile à Montréal. Apps, ERP/CRM, intégrations cloud, DevOps et hébergement managé.",
    images: [{ url: '/images/logo.png', width: 1200, height: 630, alt: 'PROGIX' }],
    locale: 'fr_CA',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@progix',
    creator: '@progix',
    images: ['/images/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: 'large',
      maxVideoPreview: -1,
    },
  },
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${montserrat.variable} ${inter.variable} font-sans antialiased overflow-x-hidden`}
      >
        {/* JSON-LD: Organization & Website */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'PROGIX',
              url: 'https://www.progix.pro',
              logo: 'https://www.progix.pro/images/logo.png',
              sameAs: [
                'https://www.linkedin.com/company/progix-inc/',
                'https://github.com/ilyes200264',
              ],
              address: {
                '@type': 'PostalAddress',
                streetAddress: '11770 5e Avenue',
                addressLocality: 'Montréal',
                addressRegion: 'QC',
                postalCode: 'H1E 7C1',
                addressCountry: 'CA',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer support',
                email: 'contact@progix.pro',
                telephone: '+1-514-576-5993',
                areaServed: 'CA',
                availableLanguage: ['fr', 'en'],
              },
            }),
          }}
        />
        <GlobalMenu />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
