'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '@/config/assets';
import { colors } from '@/config/colors';
import { 
  FaMobile, 
  FaDatabase, 
  FaRocket, 
  FaUsers
} from 'react-icons/fa';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Header appears when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
      
      // Add background when scrolled
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {showHeader && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            duration: 0.3,
          }}
          className={`fixed top-12 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
            isScrolled ? 'w-[80%] max-w-5xl mx-8' : 'w-[85%] max-w-6xl mx-6'
          }`}
        >
          <div
            className={`px-10 py-4 rounded-full shadow-lg backdrop-blur-md border transition-all duration-300 ${
              isScrolled
                ? 'bg-white/95 border-gray-200/50 shadow-xl'
                : 'bg-white/90 border-white/20 shadow-lg'
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Image
                  src={assets.logo}
                  alt="PROGIX Logo"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
                <Image
                  src="/images/CertifiedLogo.webp"
                  alt="GPTW Certification"
                  width={80}
                  height={32}
                  className="h-8 w-auto ml-4 mt-4 cursor-pointer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>

              <nav className="hidden md:flex space-x-6 lg:space-x-8">
                <div className="relative group">
                  <a
                    href="#expertises"
                    className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm flex items-center gap-1"
                  >
                    Expertises
                    <svg
                      className="w-3 h-3 transition-transform group-hover:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </a>

                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 mt-2 flex gap-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                    {/* Left Menu - Blue */}
                    <div className="w-64 bg-blue-600 rounded-2xl shadow-2xl">
                      {/* Arrow */}
                      <div className="absolute -top-2 left-6 w-4 h-4 bg-blue-600 rotate-45"></div>

                      <div className="p-6 space-y-1">
                        {/* Développement Section */}
                        <div className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg cursor-pointer">
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white font-semibold text-sm">
                              Développement
                            </h3>
                            <p className="text-blue-100 text-xs">
                              Mobile, Web, Logiciel, E-commerce
                            </p>
                          </div>
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>

                        {/* Product Section */}
                        <div className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg cursor-pointer">
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <FaRocket className="text-white text-sm" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white font-semibold text-sm">
                              Product
                            </h3>
                            <p className="text-blue-100 text-xs">
                              Management, Design (UX/UI)
                            </p>
                          </div>
                        </div>

                        {/* Data & IA Section */}
                        <div className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg cursor-pointer">
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <FaDatabase className="text-white text-sm" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white font-semibold text-sm">
                              Data & IA
                            </h3>
                            <p className="text-blue-100 text-xs">
                              Data Engineering, BI & DataViz, ...
                            </p>
                          </div>
                        </div>

                        {/* Conseil Section */}
                        <div className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg cursor-pointer">
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <FaUsers className="text-white text-sm" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white font-semibold text-sm">
                              Conseil
                            </h3>
                            <p className="text-blue-100 text-xs">
                              Conseil IT, Transformation Digitale
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Menu - White */}
                    <div className="w-80 bg-white rounded-2xl shadow-2xl">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-gray-800 font-medium text-sm">
                            Nos services
                          </span>
                          <a
                            href="#"
                            className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1"
                          >
                            Découvrez nos réalisations
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </a>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          {/* Application mobile */}
                          <div className="p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                              <FaMobile className="text-blue-600 text-lg" />
                            </div>
                            <h4 className="font-semibold text-gray-800 text-sm mb-1">
                              Application mobile
                            </h4>
                            <p className="text-gray-500 text-xs leading-relaxed">
                              Une app cross-platform sur mesure qui performe.
                            </p>
                          </div>

                          {/* Logiciel métier */}
                          <div className="p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                              <svg
                                className="w-5 h-5 text-blue-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                              </svg>
                            </div>
                            <h4 className="font-semibold text-gray-800 text-sm mb-1">
                              Logiciel métier
                            </h4>
                            <p className="text-gray-500 text-xs leading-relaxed">
                              Une solution puissante pour vos process internes.
                            </p>
                          </div>

                          {/* Site e-commerce */}
                          <div className="p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                              <FaUsers className="text-blue-600 text-lg" />
                            </div>
                            <h4 className="font-semibold text-gray-800 text-sm mb-1">
                              Site e-commerce
                            </h4>
                            <p className="text-gray-500 text-xs leading-relaxed">
                              Une boutique en ligne qui convertit.
                            </p>
                          </div>

                          {/* Développement web */}
                          <div className="p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                              <svg
                                className="w-5 h-5 text-blue-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <h4 className="font-semibold text-gray-800 text-sm mb-1">
                              Développement web
                            </h4>
                            <p className="text-gray-500 text-xs leading-relaxed">
                              Une application SaaS robuste et scalable.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  href="#technos"
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm"
                >
                  Technos
                </a>
                <a
                  href="#realisations"
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm"
                >
                  Réalisations
                </a>
                <a
                  href="#blog"
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm"
                >
                  Blog
                </a>
                <a
                  href="/team"
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm"
                >
                  Notre équipe
                </a>
                <a
                  href="#advisory"
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm"
                >
                  Advisory
                </a>
              </nav>

              <button
                className="px-8 py-3 rounded-full text-white font-medium transition-all hover:scale-105 shadow-md flex items-center gap-2 group"
                style={{ backgroundColor: colors.secondary }}
              >
                Nous contacter
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Header;
