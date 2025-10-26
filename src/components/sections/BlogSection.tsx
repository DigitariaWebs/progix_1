'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/data/blogPosts';

const BlogSection = () => {
  return (
    <section className="bg-[#0a1628] pt-8 pb-2 sm:py-12 md:py-20 relative overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left side - Header */}
          <div className="w-full lg:w-1/4 flex-shrink-0 mb-8 lg:mb-0">
            <h2
              className="text-2xl sm:text-2xl md:text-3xl font-bold text-white mb-5 sm:mb-6 leading-tight"
              style={{
                fontFamily: 'Hubot Sans, Inter, sans-serif',
                letterSpacing: '0.02em',
              }}
            >
              QU&apos;EST-CE QU&apos;IL SE PASSE
              <br className="hidden xs:inline" />
              <span className="xs:hidden"> </span>
              CHEZ PROGIX?
            </h2>
            <Link
              href="/blog"
              className="inline-block text-[#0a1628] bg-[#00d4ff] px-5 sm:px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-xl transform hover:active:scale-95 sm:hover:scale-105"
              style={{
                fontFamily: 'Hubot Sans, Inter, sans-serif',
              }}
            >
              Blog
            </Link>
          </div>

          {/* Right side - Blog Posts Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-6 md:gap-8">
            {blogPosts.slice(0, 3).map((post, idx) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-transparent overflow-hidden cursor-pointer group flex flex-col transform transition-transform hover:translate-y-[-4px]"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <div
                  className="relative w-full overflow-hidden rounded-lg"
                  style={{ paddingBottom: '66.67%' }}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    loading={idx < 1 ? 'eager' : 'lazy'}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </div>
                <div className="py-3 sm:py-4 md:py-6 flex-1 flex flex-col">
                  <p className="text-xs sm:text-sm text-gray-300 mb-2 sm:mb-3 font-medium">
                    {post.date}
                  </p>
                  <h3
                    className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 leading-snug flex-1"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      minHeight: '3rem',
                    }}
                  >
                    {post.title}
                  </h3>
                  <span className="inline-block text-sm font-semibold text-[#00d4ff] relative group-hover:underline">
                    Lire la suite
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
