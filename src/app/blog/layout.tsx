import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Actualités et études de cas PROGIX',
  description:
    "Découvrez nos articles: delivery, IA, web, growth et études de cas par l'équipe Progix.",
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog — Actualités et études de cas PROGIX',
    description:
      "Découvrez nos articles: delivery, IA, web, growth et études de cas par l'équipe Progix.",
    url: 'https://www.progix.pro/blog',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
