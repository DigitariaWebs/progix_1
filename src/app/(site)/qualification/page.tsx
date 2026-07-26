import type { Metadata } from 'next';
import QualificationForm from '@/components/QualificationForm';

// Unlisted variant sent directly to known clients: no email/phone step,
// not linked from any menu, excluded from search engines and the sitemap.
export const metadata: Metadata = {
  title: 'Qualification',
  robots: { index: false, follow: false },
};

export default function QualificationDirectPage() {
  return <QualificationForm collectContact={false} />;
}
