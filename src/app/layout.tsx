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
  title: 'Progix - Coming Soon',
  description: "We're building something amazing. Stay tuned!",
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
        <GlobalMenu />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
