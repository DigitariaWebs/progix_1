import type { Metadata } from 'next';
import Footer from '@/components/layout/Footer';
import AppSpecSection from '@/components/offers/AppSpecSection';
import BenchmarkStrip from '@/components/offers/BenchmarkStrip';
import DashboardSection from '@/components/offers/DashboardSection';
import FaqSection from '@/components/offers/FaqSection';
import InclusionsTable from '@/components/offers/InclusionsTable';
import OfferLeadForm from '@/components/offers/OfferLeadForm';
import OffersHeader from '@/components/offers/OffersHeader';
import OffersHero from '@/components/offers/OffersHero';
import ProcessTimeline from '@/components/offers/ProcessTimeline';
import StickyCta from '@/components/offers/StickyCta';

export const metadata: Metadata = {
  title: 'Application de commande pour restaurants',
  description:
    "Arrêtez de verser 29 % de vos livraisons aux plateformes. PROGIX livre l'application de commande de votre restaurant et son back-office en 4 à 6 semaines.",
  alternates: { canonical: '/offers' },
  openGraph: {
    type: 'website',
    url: 'https://www.progix.pro/offers',
    siteName: 'PROGIX',
    locale: 'fr_CA',
    title: 'Application de commande pour restaurants — PROGIX',
    description:
      'Votre application, votre back-office, zéro commission de plateforme. En ligne en 4 à 6 semaines.',
  },
};

/**
 * Deliberately without GlobalMenu: this route sits outside the (site) route
 * group so it stays reachable while the rest of progix.pro is in maintenance,
 * and every site link would land on the maintenance screen. OffersHeader
 * navigates within this page instead; restore the site links there once
 * MAINTENANCE_MODE flips in src/app/(site)/layout.tsx.
 */
export default function OffersPage() {
  return (
    <main id="top" className="offers-page overflow-x-hidden">
      <OffersHeader />
      <OffersHero />
      <BenchmarkStrip />
      <AppSpecSection />
      <DashboardSection />
      <InclusionsTable />
      <ProcessTimeline />
      <FaqSection />
      <OfferLeadForm />
      <Footer />
      <StickyCta />
    </main>
  );
}
