import PageTransition from '@/components/PageTransition';
import GlobalMenu from '@/components/GlobalMenu';
import { GlobalMenuProvider } from '@/components/globalMenuBus';
import MaintenancePage from '@/components/MaintenancePage';

// Maintenance mode is hard-ON: every route in this group is closed.
// NOTE: intentionally NOT reading process.env here — a stale MAINTENANCE_MODE
// env var on the host (Vercel) was overriding the flag. To REOPEN the site,
// change this to `false` and push (and/or remove the MAINTENANCE_MODE env var
// in the Vercel project settings).
//
// Routes OUTSIDE this group are never gated. /offers lives at src/app/offers
// on purpose so it stays reachable while the rest of the site is closed.
const MAINTENANCE_MODE = true;

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  if (MAINTENANCE_MODE) return <MaintenancePage />;

  return (
    <GlobalMenuProvider>
      <GlobalMenu />
      <PageTransition>{children}</PageTransition>
    </GlobalMenuProvider>
  );
}
