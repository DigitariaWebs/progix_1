'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { MONO, offersTheme, siteHeader } from '@/data/offersData';

export default function OffersHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes the mobile sheet — a menu you can only leave by tapping the
  // same small target you opened it with is a trap.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-[#0E2233]/90 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-12">
        <a
          href="#top"
          aria-label={siteHeader.home}
          className="shrink-0 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00D4FF]"
        >
          <Image
            src="/images/logo.png"
            alt="PROGIX"
            width={132}
            height={38}
            priority
            className="h-7 w-auto object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </a>

        <nav
          aria-label="Sections de la page"
          className="hidden items-center gap-8 lg:flex"
        >
          {siteHeader.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[11px] uppercase tracking-[0.16em] text-white/60 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00D4FF]"
              style={{ fontFamily: MONO }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#proposition"
            className="hidden rounded-full px-5 py-2.5 text-xs font-semibold text-[#0E2233] transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00D4FF] sm:inline-block"
            style={{ background: offersTheme.cyan }}
          >
            {siteHeader.cta}
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="offers-mobile-nav"
            aria-label={open ? siteHeader.menuClose : siteHeader.menuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-200 hover:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D4FF] lg:hidden"
          >
            {open ? (
              <X aria-hidden className="h-5 w-5" />
            ) : (
              <Menu aria-hidden className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="offers-mobile-nav"
            aria-label="Sections de la page"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              reduce ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
            }
            className="overflow-hidden border-t border-white/10 bg-[#0E2233]/95 backdrop-blur-md lg:hidden"
          >
            <ul className="px-5 py-3 sm:px-8">
              {siteHeader.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/5 py-4 text-sm text-white/75 transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-4 pb-2 sm:hidden">
                <a
                  href="#proposition"
                  onClick={() => setOpen(false)}
                  className="block rounded-full px-5 py-3.5 text-center text-sm font-semibold text-[#0E2233]"
                  style={{ background: offersTheme.cyan }}
                >
                  {siteHeader.cta}
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
