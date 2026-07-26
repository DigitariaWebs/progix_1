import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio — Réalisations PROGIX',
  description:
    'Études de cas et projets livrés: web, mobile, CRM/ERP, intégrations et hébergement managé.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Portfolio — Réalisations PROGIX',
    description:
      'Études de cas et projets livrés: web, mobile, CRM/ERP, intégrations et hébergement managé.',
    url: 'https://www.progix.pro/portfolio',
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
