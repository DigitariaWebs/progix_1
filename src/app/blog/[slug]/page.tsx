'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { blogPosts } from '@/data/blogPosts';
import { colors } from '@/config/colors';
import { use } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
// Navbar removed to use global StaggeredMenu header

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const post = blogPosts.find((p) => p.slug === slug);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const articleRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const nav = navRef.current;

      // Nav scroll effect
      if (nav) {
        if (scrollTop > 50) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }

      // Show back to top button after scrolling down
      setShowBackToTop(scrollTop > 100);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    notFound();
  }

  // Simplified layout for specific post: only image, then title and body text
  if (post.slug === 'vortex-solution-accueille-imacom') {
    return (
      <div className="min-h-screen bg-[#0a1628] relative">
        {/* Featured Image Only */}
        <section className="pt-32 pb-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            {/* keep subtle animated stars for consistency */}
            <motion.div
              className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-5 left-1/4 w-1 h-1 bg-white rounded-full"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            />
          </div>
          <div className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-6 relative z-10">
            <motion.div
              className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-xl mb-8 shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/50 to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* Title and Body Only */}
        <section className="pb-20">
          <div className="max-w-3xl mx-auto px-2 sm:px-4 lg:px-6">
            <h1
              className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight"
              style={{
                fontFamily: 'Hubot Sans, Inter, sans-serif',
                letterSpacing: '0.02em',
              }}
            >
              {post.title}
            </h1>
            <div className="space-y-6">
              {post.content
                .split('\n')
                .map((p) => p.trim())
                .filter((p) => p.length > 0 && !p.startsWith('#'))
                .map((p, i) => (
                  <p key={i} className="text-gray-100 leading-relaxed text-lg">
                    {p}
                  </p>
                ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Get related posts (excluding current post)
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = post.title;

    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
          '_blank',
        );
        break;
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank',
        );
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          '_blank',
        );
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Lien copié !');
        break;
    }
    setShowShareMenu(false);
  };

  return (
    <div className="min-h-screen bg-[#0a1628] relative">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#00d4ff] origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Navbar removed */}

      {/* Hero Section with Featured Image */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        {/* Background decoration - stars with animation */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-5 left-1/4 w-1 h-1 bg-white rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="absolute top-20 right-20 w-0.5 h-0.5 bg-white rounded-full"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute top-32 right-1/3 w-1 h-1 bg-white rounded-full"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-0.5 h-0.5 bg-white rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: 0.8 }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-6 relative z-10">
          {/* Breadcrumb */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/blog"
              className="text-[#00d4ff] hover:underline text-sm font-medium inline-flex items-center gap-2 transition-all hover:gap-3"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Retour au Blog
            </Link>
          </motion.div>

          {/* Category and Share */}
          <motion.div
            className="flex items-center justify-between mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span
              className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
              style={{ backgroundColor: colors.secondary, color: '#0a1628' }}
            >
              {post.category}
            </span>

            {/* Share Button */}
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-semibold text-white transition-all"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                Partager
              </button>

              {showShareMenu && (
                <motion.div
                  className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl p-2 min-w-[160px]"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    onClick={() => handleShare('twitter')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded text-gray-800 text-sm flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Twitter
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded text-gray-800 text-sm flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded text-gray-800 text-sm flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded text-gray-800 text-sm flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Copier le lien
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            style={{
              fontFamily: 'Hubot Sans, Inter, sans-serif',
              letterSpacing: '0.02em',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {post.title}
          </motion.h1>

          {/* Meta info with reading time */}
          <motion.div
            className="flex items-center gap-4 text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm">{post.date}</span>
            </div>
            <span className="text-sm">•</span>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-sm">{post.author}</span>
            </div>
            <span className="text-sm">•</span>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm">
                {Math.ceil(post.content.split(' ').length / 200)} min de lecture
              </span>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-xl mb-12 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/50 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-6 relative">
          <motion.article
            ref={articleRef}
            className="max-w-none space-y-8"
            style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {post.content.split('\n').map((paragraph, index) => {
              const line = paragraph.trim();
              if (line.startsWith('# ')) {
                return (
                  <div key={index} className="hidden">
                    {line.replace('# ', '')}
                  </div>
                );
              } else if (line.startsWith('## ')) {
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-[#00d4ff]/20 to-transparent p-6 rounded-xl border border-[#00d4ff]/30 mt-12 mb-6"
                  >
                    <h2 className="text-2xl font-bold text-white mb-0">
                      {line.replace('## ', '')}
                    </h2>
                  </div>
                );
              } else if (line.startsWith('### ')) {
                return (
                  <h3
                    key={index}
                    className="text-lg font-semibold text-[#00d4ff] uppercase tracking-wider mb-4 mt-8 border-b border-[#00d4ff]/50 pb-2"
                  >
                    {line.replace('### ', '')}
                  </h3>
                );
              } else if (
                line.startsWith('- ') ||
                line.startsWith('• ') ||
                line.startsWith('* ')
              ) {
                return (
                  <div
                    key={index}
                    className="bg-gray-800/30 p-4 rounded-lg border-l-4 border-[#00d4ff] mb-4 ml-12 pl-8 relative"
                  >
                    <span className="text-[#00d4ff] text-xl font-bold absolute left-2 top-4">
                      •
                    </span>
                    <span className="text-gray-200 leading-relaxed block pl-6">
                      {line.replace(/^(- |• |\* )/, '')}
                    </span>
                  </div>
                );
              } else if (line !== '') {
                return (
                  <div
                    key={index}
                    className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 shadow-lg"
                  >
                    <p className="text-gray-100 leading-relaxed text-lg mb-0">
                      {line}
                    </p>
                  </div>
                );
              }
              return null;
            })}
          </motion.article>

          {/* CTA Section */}
          <motion.div
            className="mt-16 p-8 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-2xl border border-[#00d4ff]/20 relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff]/0 via-[#00d4ff]/10 to-[#00d4ff]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-4">
                Vous avez un projet en tête ?
              </h3>
              <p className="text-gray-300 mb-6">
                Discutons de la façon dont nous pouvons vous aider à atteindre
                vos objectifs.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[#0a1628] bg-[#00d4ff] px-8 py-3 rounded-full font-bold transition-all duration-300 hover:shadow-xl hover:shadow-[#00d4ff]/50 transform hover:scale-105"
                style={{
                  fontFamily: 'Hubot Sans, Inter, sans-serif',
                }}
              >
                Démarrer un projet
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
            <motion.h2
              className="text-3xl font-bold text-white mb-12"
              style={{
                fontFamily: 'Hubot Sans, Inter, sans-serif',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Articles similaires
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className="bg-transparent overflow-hidden cursor-pointer group">
                      <div className="relative h-56 overflow-hidden rounded-lg">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                      </div>
                      <div className="py-6">
                        <p className="text-sm text-gray-300 mb-3 font-medium flex items-center gap-2">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {relatedPost.date}
                        </p>
                        <h3 className="text-lg font-bold text-white mb-4 leading-snug min-h-[3.5rem] text-justify group-hover:text-[#00d4ff] transition-colors duration-300">
                          {relatedPost.title}
                        </h3>
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#00d4ff] relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#00d4ff] after:transition-all after:duration-300 group-hover:after:w-full">
                          Lire la suite
                          <svg
                            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-[#00d4ff] text-[#0a1628] p-4 rounded-full shadow-lg z-40 ring-2 ring-[#00d4ff]/30 hover:ring-4 hover:ring-[#00d4ff]/50 transition-all duration-300"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Logo and description */}
            <div>
              <Image
                src="/images/logo.png"
                alt="PROGIX Logo"
                width={120}
                height={120}
                className="h-16 w-auto mb-4"
              />
              <p className="text-gray-400 text-sm">
                Votre partenaire technologique pour des solutions web
                innovantes.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-4">Liens rapides</h4>
              <div className="flex flex-col gap-2">
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-[#00d4ff] text-sm transition-colors"
                >
                  Services
                </Link>
                <Link
                  href="/team"
                  className="text-gray-400 hover:text-[#00d4ff] text-sm transition-colors"
                >
                  Notre équipe
                </Link>
                <Link
                  href="/portfolio"
                  className="text-gray-400 hover:text-[#00d4ff] text-sm transition-colors"
                >
                  Portfolio
                </Link>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-[#00d4ff] text-sm transition-colors"
                >
                  Blog
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <Link
                href="/contact"
                className="inline-block bg-[#00d4ff] text-[#0a1628] px-6 py-2 rounded-full font-bold text-sm hover:shadow-lg hover:shadow-[#00d4ff]/50 transition-all duration-300"
              >
                Nous contacter
              </Link>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Progix. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
