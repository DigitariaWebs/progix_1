'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { blogPosts } from '@/data/blogPosts';
// Navbar removed to use global StaggeredMenu header

export default function BlogPage() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const nav = navRef.current;
      if (nav) {
        if (scrollTop > 50) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a1628]">
      {/* Navbar removed */}

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background decoration - stars */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-5 left-1/4 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-20 right-20 w-0.5 h-0.5 bg-white rounded-full"></div>
          <div className="absolute top-32 right-1/3 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute bottom-40 right-1/3 w-0.5 h-0.5 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-0.5 h-0.5 bg-white rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 relative z-10">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{
              fontFamily: 'Hubot Sans, Inter, sans-serif',
              letterSpacing: '0.02em',
            }}
          >
            Qu'est-ce qu'il se passe chez Progix?
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Actus produit, études de cas et conseils concrets en delivery,
            IA, web & growth — par l'équipe Progix.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug}>
                <div className="bg-transparent overflow-hidden cursor-pointer group">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="py-6">
                    <p className="text-sm text-gray-300 mb-3 font-medium">
                      {post.date}
                    </p>
                    <h3 className="text-lg font-bold text-white mb-4 leading-snug min-h-[3.5rem] text-justify">
                      {post.title}
                    </h3>
                    <span className="inline-block text-sm font-semibold text-[#00d4ff] relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#00d4ff] after:transition-all after:duration-300 group-hover:after:w-full">
                      Lire la suite
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 text-center">
          <p className="text-gray-400">© 2025 Progix. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
