import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  serverExternalPackages: ['@sparticuz/chromium'],
  // @sparticuz/chromium reads its brotli-packed Chromium from bin/ at runtime
  // via a constructed path, not an import — so Next's output file tracing never
  // sees it and the files are absent from the deployed function ("The input
  // directory /var/task/node_modules/@sparticuz/chromium/bin does not exist").
  // Force them into the two route trees whose server actions render PDFs.
  // Globs deliberately stop at the segment before [client]/[slug]: brackets are
  // character classes in glob syntax, so `/devis/**` avoids escaping them.
  outputFileTracingIncludes: {
    '/devis/**': ['./node_modules/@sparticuz/chromium/bin/**'],
    '/admin/**': ['./node_modules/@sparticuz/chromium/bin/**'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lgpngbxkeuyvjcgrftxa.supabase.co',
      },
    ],
  },
};

export default nextConfig;
