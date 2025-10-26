'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { colors } from '@/config/colors';
import AnimatedButton from '@/components/AnimatedButton';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

    // Delay initial scroll check to ensure we're on client
    const timer = setTimeout(() => {
      handleScroll();
    }, 0);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent backdrop-blur-md scrolled:bg-white/95 scrolled:shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center relative z-10">
            <Image
              src="/images/logo.png"
              alt="PROGIX Logo"
              priority
              onClick={() => (window.location.href = '/')}
              width={130}
              height={130}
              className="h-20 w-auto cursor-pointer"
            />
            <Image
              src="/images/CertifiedLogo.png"
              alt="GPTW Certification"
              width={100}
              height={40}
              className="h-14 w-auto ml-4 mt-4 cursor-pointer"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>

          {/* Centered Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              <Link
                href="/services"
                className="font-heading font-bold inline-flex items-center justify-center text-center text-base menu-scroll transition-colors text-black hover:text-black/80 scrolled:text-gray-900 scrolled:hover:text-gray-700"
              >
                Services
              </Link>
              <Link
                href="/team"
                className="font-heading font-bold inline-flex items-center justify-center text-center text-base menu-scroll transition-colors text-black hover:text-black/80 scrolled:text-gray-900 scrolled:hover:text-gray-700"
              >
                Notre équipe
              </Link>
              <Link
                href="/portfolio"
                className="font-heading font-bold inline-flex items-center justify-center text-center text-base menu-scroll transition-colors text-black hover:text-black/80 scrolled:text-gray-900 scrolled:hover:text-gray-700"
              >
                Portfolio
              </Link>
              <Link
                href="/contact"
                className="font-heading font-bold inline-flex items-center justify-center text-center text-base menu-scroll transition-colors text-black hover:text-black/80 scrolled:text-gray-900 scrolled:hover:text-gray-700"
              >
                Contact
              </Link>
              <Link
                href="/blog"
                className="font-heading font-bold inline-flex items-center justify-center text-center text-base menu-scroll transition-colors text-black hover:text-black/80 scrolled:text-gray-900 scrolled:hover:text-gray-700"
              >
                Blog
              </Link>
              <Link
                href="/nos-valeurs"
                className="font-heading font-bold inline-flex items-center justify-center text-center text-base menu-scroll transition-colors text-black hover:text-black/80 scrolled:text-gray-900 scrolled:hover:text-gray-700"
              >
                Nos Valeurs
              </Link>
              <Link
                href="/confoo-2025"
                className="font-heading font-bold inline-flex items-center justify-center text-center text-base menu-scroll transition-colors text-black hover:text-black/80 scrolled:text-gray-900 scrolled:hover:text-gray-700"
              >
                ConFoo 2025
              </Link>
            </div>
          </div>

          {/* Right side button */}
          <div className="hidden md:flex items-center">
            <Link href="/contact">
              <AnimatedButton text="Démarrer un projet" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="transition-colors text-black hover:text-black/80 scrolled:text-gray-900 scrolled:hover:text-gray-700"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <a
                href="#services"
                className="font-heading font-bold text-gray-700 hover:text-primary inline-flex items-center justify-center text-center text-base menu-scroll transition-colors"
                style={{ color: colors.primary }}
              >
                Services
              </a>
              <Link
                href="/team"
                className="font-heading font-bold text-gray-700 hover:text-primary inline-flex items-center justify-center text-center text-base menu-scroll transition-colors"
                style={{ color: colors.primary }}
              >
                Notre équipe
              </Link>
              <Link
                href="/portfolio"
                className="font-heading font-bold text-gray-700 hover:text-primary inline-flex items-center justify-center text-center text-base menu-scroll transition-colors"
                style={{ color: colors.primary }}
              >
                Portfolio
              </Link>
              <Link
                href="/contact"
                className="font-heading font-bold text-gray-700 hover:text-primary inline-flex items-center justify-center text-center text-base menu-scroll transition-colors"
                style={{ color: colors.primary }}
              >
                Contact
              </Link>
              <Link
                href="/nos-valeurs"
                className="font-heading font-bold text-gray-700 hover:text-primary inline-flex items-center justify-center text-center text-base menu-scroll transition-colors"
                style={{ color: colors.primary }}
              >
                Nos Valeurs
              </Link>
              <Link
                href="/confoo-2025"
                className="font-heading font-bold text-gray-700 hover:text-primary inline-flex items-center justify-center text-center text-base menu-scroll transition-colors"
                style={{ color: colors.primary }}
              >
                ConFoo 2025
              </Link>
              <div className="flex space-x-4 pt-4">
                <Link href="/contact" className="flex-1">
                  <AnimatedButton text="Démarrer un projet" />
                </Link>
                <Link
                  href="/contact"
                  className="border-2 px-4 py-2 rounded-lg font-bold transition-all duration-300 hover:bg-gray-50 flex-1 inline-block text-center"
                  style={{
                    borderColor: colors.primary,
                    color: colors.primary,
                  }}
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
