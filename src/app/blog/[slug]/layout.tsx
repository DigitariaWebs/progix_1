import type { Metadata } from 'next';
import { blogPosts } from '@/data/blogPosts';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = blogPosts.find((bp) => bp.slug === params.slug);
  if (!post) {
    return { title: 'Article — PROGIX' };
  }
  const title = `${post.title} — PROGIX`;
  const description = post.excerpt || post.content.slice(0, 160);
  const url = `https://www.progix.pro/blog/${post.slug}`;
  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: post.image }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.image],
    },
  };
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


