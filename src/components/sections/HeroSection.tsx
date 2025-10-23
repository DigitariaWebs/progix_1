'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CircularText from '@/components/CircularText';

const HeroSection = () => {
  return (
    <section className="relative h-dvh flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a3a52] via-[#2d5369] to-[#1a3a52]">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Left Side - Vertical Year and Location */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4 z-20"
      >
        <span
          className="text-white/30 text-xs tracking-widest uppercase font-light"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          2025
        </span>
        <div className="w-px h-12 bg-white/20" />
        <span
          className="text-white/30 text-xs tracking-widest uppercase font-light"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          Montréal
        </span>
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center mt-4 sm:mt-8 md:mt-10">
        {/* Small Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-4 sm:mb-8"
        >
          <span className="text-white/50 text-xs sm:text-sm tracking-[0.3em] uppercase font-light">
            Nous sommes
          </span>
        </motion.div>

        {/* Main Company Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-white font-bold tracking-tight mb-4 sm:mb-6"
          style={{
            fontSize: 'clamp(2.5rem, 12vw, 12rem)',
            lineHeight: '1',
            fontFamily: 'Hubot Sans, Inter, sans-serif',
            letterSpacing: '-0.02em',
          }}
        >
          PROGIX
        </motion.h1>

        {/* Subtitle/Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-8 sm:mb-16 md:mb-20"
        >
          <p className="text-white/80 text-xs sm:text-sm md:text-lg lg:text-xl tracking-[0.05em] sm:tracking-[0.1em] uppercase font-semibold max-w-4xl mx-auto px-2">
            UNE FIRME DE DÉVELOPPEMENT LOGICIEL FIÈREMENT MONTRÉALAISE
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Link
            href="/contact"
            className="inline-block group relative overflow-hidden"
          >
            <div className="relative px-6 sm:px-10 py-3 sm:py-4 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-white/10 hover:border-white/40">
              <span className="text-white text-xs sm:text-sm tracking-wider uppercase font-medium whitespace-nowrap">
                Discuter de votre projet
              </span>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Bottom Left Social Icons */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute bottom-8 left-4 sm:left-8 flex flex-col gap-2 sm:gap-4 z-20"
      >
        <a
          href="https://linkedin.com/company/progix"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/40 hover:text-white transition-colors duration-300"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
        <a
          href="https://github.com/progix"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/40 hover:text-white transition-colors duration-300"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
        <a
          href="https://twitter.com/progix"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/40 hover:text-white transition-colors duration-300"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      </motion.div>

      {/* Bottom Right Circular Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute bottom-8 right-4 sm:right-8 z-20"
        style={{
          width: 'clamp(80px, 18vw, 110px)',
          height: 'clamp(80px, 18vw, 110px)',
          minWidth: '80px',
          minHeight: '80px',
        }}
      >
        <div
          className="relative w-full h-full"
          style={{ aspectRatio: '1 / 1' }}
        >
          <CircularText
            text="SCROLL • SCROLL • SCROLL • SCROLL • "
            spinDuration={15}
            onHover="speedUp"
            className="hero-scroll-circular"
          />
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;