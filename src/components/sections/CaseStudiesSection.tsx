'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '@/config/colors';
import DecorativeElements from '@/components/DecorativeElements';

const CaseStudiesSection = () => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const faheVideoRef = useRef<HTMLVideoElement>(null);
  const coRideVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsMounted(true);

    // Mobile detection
    const checkMobile = () => {
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        ) || window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };

    // Check for reduced motion preference
    const checkReducedMotion = () => {
      setIsReducedMotion(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      );
    };

    checkMobile();
    checkReducedMotion();

    window.addEventListener('resize', checkMobile);

    // Media query for reduced motion preference
    const motionMediaQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    motionMediaQuery.addEventListener('change', checkReducedMotion);

    return () => {
      window.removeEventListener('resize', checkMobile);
      motionMediaQuery.removeEventListener('change', checkReducedMotion);
    };
  }, []);

  // Mouse position tracking for custom cursor - only on desktop
  useEffect(() => {
    if (!isMobile) {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isMobile]);

  return (
    <section className="bg-cyan-800">
      <DecorativeElements type="wave-top" />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12 sm:mb-16 space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Découvrez nos
              <br />
              dernières{' '}
              <span style={{ color: colors.secondary }}>réalisations</span>
            </h2>
          </div>
          <button
            className="text-white px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-base w-full sm:w-auto"
            style={{
              backgroundColor: colors.secondary,
              fontFamily: 'Hubot Sans, Inter, sans-serif',
            }}
          >
            Voir tous les projets
          </button>
        </div>

        {/* Case Studies Grid */}
        <div className="space-y-8">
          {/* Centre Fahe Mechanics */}
          <motion.div
            className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-sha duration-200"
            style={{
              backgroundColor: '#F8F9FA',
              transition: 'background-color 0.2s ease',
            }}
            whileHover={{
              backgroundColor: '#1B363C',
            }}
            onMouseEnter={() => {
              if (!isMobile) {
                setHoveredImage('fahe');
                if (faheVideoRef.current && !isReducedMotion) {
                  faheVideoRef.current
                    .play()
                    .catch((err) => console.log('Video play prevented:', err));
                }
              }
            }}
            onMouseLeave={() => {
              if (!isMobile) {
                setHoveredImage(null);
                if (faheVideoRef.current && !isReducedMotion) {
                  faheVideoRef.current.pause();
                  faheVideoRef.current.currentTime = 0;
                }
              }
            }}
            onClick={() => {
              if (isMobile && faheVideoRef.current) {
                if (faheVideoRef.current.paused) {
                  faheVideoRef.current
                    .play()
                    .catch((err) => console.log('Video play prevented:', err));
                } else {
                  faheVideoRef.current.pause();
                }
              }
            }}
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-sm text-gray-500 group-hover:text-white uppercase tracking-wide transition-colors duration-200">
                    Case Study
                  </span>
                  <span className="text-sm text-gray-500 group-hover:text-white uppercase tracking-wide transition-colors duration-200">
                    Custom CRM Development
                  </span>
                </div>

                <h3 className="text-3xl font-bold text-gray-900 group-hover:text-white mb-6 transition-colors duration-200">
                  Centre Fahe Mechanics
                </h3>

                <p className="text-gray-600 group-hover:text-gray-200 leading-relaxed font-bold mb-8 transition-colors duration-200">
                  Centre Fahe Mechanics est une référence à Rivière-des-Prairies
                  dans le domaine de la réparation automobile. Nous avons
                  développé pour eux un CRM complet permettant de tracker leur
                  visibilité en ligne, gérer leurs prospects, automatiser le
                  check-in des véhicules et optimiser leur processus de service
                  client.
                </p>

                <Link
                  href="/case-study/fahe-crm"
                  className="inline-flex items-center text-sm font-bold group-hover:translate-x-2 group-hover:text-white transition-all duration-200"
                  style={{
                    color: colors.secondary,
                    fontFamily: 'Hubot Sans, Inter, sans-serif',
                  }}
                >
                  Read case study
                  <svg
                    className="w-4 h-4 ml-2 group-hover:stroke-white transition-colors duration-200"
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
                </Link>
              </div>

              <div className="relative h-72 sm:h-64 lg:h-full bg-white/20">
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="w-full h-full bg-black/10 rounded-lg overflow-hidden shadow-lg">
                    {isMounted && (
                      <>
                        <video
                          ref={faheVideoRef}
                          className="w-full h-full object-cover"
                          loop
                          muted
                          playsInline
                          autoPlay={isMobile && !isReducedMotion}
                          preload="metadata"
                          style={{
                            filter: 'brightness(0.9) contrast(1.1)',
                            transform: 'scaleX(-1) rotate(-90deg)',
                          }}
                        >
                          <source
                            src="https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/imagesculture/WhatsApp%20Video%202025-09-28%20at%2011.59.54%20(1).mp4"
                            type="video/mp4"
                          />
                          Votre navigateur ne supporte pas la lecture vidéo.
                        </video>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Confortplus65 */}
          <motion.div
            className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-200"
            style={{
              backgroundColor: '#F8F9FA',
              transition: 'background-color 0.2s ease',
            }}
            whileHover={{
              backgroundColor: '#1B363C',
            }}
            onMouseEnter={() => {
              if (!isMobile) {
                setHoveredImage('confortplus');
              }
            }}
            onMouseLeave={() => {
              if (!isMobile) {
                setHoveredImage(null);
              }
            }}
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-sm text-gray-500 group-hover:text-white uppercase tracking-wide transition-colors duration-200">
                    Case Study
                  </span>
                  <span className="text-sm text-gray-500 group-hover:text-white uppercase tracking-wide transition-colors duration-200">
                    Healthcare Management System
                  </span>
                </div>

                <h3 className="text-3xl font-bold text-gray-900 group-hover:text-white mb-6 transition-colors duration-200">
                  FruitExotic
                </h3>

                <p className="text-gray-600 group-hover:text-gray-200 leading-relaxed font-bold mb-8 transition-colors duration-200">
                  FruitExotic Inc. est une entreprise spécialisée dans
                  l&apos;exportation de fruits exotiques de qualité premium.
                  Nous avons développé leur site web international multilingue
                  (7 langues) pour mettre en valeur leurs services de la
                  meilleure façon grâce à nos développeurs frontend et designers
                  UI/UX d&apos;élite, créant une expérience digitale
                  exceptionnelle qui reflète l&apos;excellence de leurs produits
                  exotiques.
                </p>

                <Link
                  href="/case-study/fruitexotic"
                  className="inline-flex items-center text-sm font-bold group-hover:translate-x-2 transition-transform duration-200"
                  style={{
                    color: colors.secondary,
                    fontFamily: 'Hubot Sans, Inter, sans-serif',
                  }}
                >
                  Read case study
                  <svg
                    className="w-4 h-4 ml-2 group-hover:stroke-white transition-colors duration-200"
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
                </Link>
              </div>

              <div className="relative h-72 sm:h-64 lg:h-full bg-white/20">
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="w-full h-full bg-black/10 rounded-lg overflow-hidden shadow-lg">
                    {isMounted && (
                      <>
                        <video
                          ref={coRideVideoRef}
                          className="w-full h-full object-cover"
                          loop
                          muted
                          playsInline
                          autoPlay={isMobile && !isReducedMotion}
                          preload="metadata"
                          style={{
                            filter: 'brightness(0.9) contrast(1.1)',
                          }}
                        >
                          <source
                            src="https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/fruitexo.mp4"
                            type="video/mp4"
                          />
                          Votre navigateur ne supporte pas la lecture vidéo.
                        </video>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CoRide */}
          <motion.div
            className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-200 mb-10"
            style={{
              backgroundColor: '#F8F9FA',
              transition: 'background-color 0.2s ease',
            }}
            whileHover={{
              backgroundColor: '#1B363C',
            }}
            onMouseEnter={() => {
              if (!isMobile) {
                setHoveredImage('coride');
                if (coRideVideoRef.current && !isReducedMotion) {
                  coRideVideoRef.current
                    .play()
                    .catch((err) => console.log('Video play prevented:', err));
                }
              }
            }}
            onMouseLeave={() => {
              if (!isMobile) {
                setHoveredImage(null);
                if (coRideVideoRef.current && !isReducedMotion) {
                  coRideVideoRef.current.pause();
                  coRideVideoRef.current.currentTime = 0;
                }
              }
            }}
            onClick={() => {
              if (isMobile && coRideVideoRef.current) {
                if (coRideVideoRef.current.paused) {
                  coRideVideoRef.current
                    .play()
                    .catch((err) => console.log('Video play prevented:', err));
                } else {
                  coRideVideoRef.current.pause();
                }
              }
            }}
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-sm text-gray-500 group-hover:text-white uppercase tracking-wide transition-colors duration-200">
                    Case Study
                  </span>
                  <span className="text-sm text-gray-500 group-hover:text-white uppercase tracking-wide transition-colors duration-200">
                    Mobile App & Web Development
                  </span>
                </div>

                <h3 className="text-3xl font-bold text-gray-900 group-hover:text-white mb-6 transition-colors duration-200">
                  CoRide
                </h3>

                <p className="text-gray-600 group-hover:text-gray-200 leading-relaxed font-bold mb-8 transition-colors duration-200">
                  CoRide est une application de mobilité multi-services
                  révolutionnaire. Notre équipe a développé une solution
                  complète incluant une app mobile Flutter (transport privé,
                  livraison, food delivery), un backend Node.js robuste et une
                  refonte totale de leur site vitrine, créant un écosystème
                  digital intégré et évolutif.
                </p>

                <Link
                  href="/case-study/coride"
                  className="inline-flex items-center text-sm font-bold group-hover:translate-x-2 transition-transform duration-200"
                  style={{
                    color: colors.secondary,
                    fontFamily: 'Hubot Sans, Inter, sans-serif',
                  }}
                >
                  Read case study
                  <svg
                    className="w-4 h-4 ml-2 group-hover:stroke-white transition-colors duration-200"
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
                </Link>
              </div>

              <div className="relative h-72 sm:h-64 lg:h-full bg-white/20">
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="w-full h-full bg-black/10 rounded-lg overflow-hidden shadow-lg">
                    {isMounted && (
                      <>
                        <video
                          ref={coRideVideoRef}
                          className="w-full h-full object-cover"
                          loop
                          muted
                          playsInline
                          autoPlay={isMobile && !isReducedMotion}
                          preload="metadata"
                          style={{
                            filter: 'brightness(0.9) contrast(1.1)',
                          }}
                        >
                          <source
                            src="https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/WhatsApp%20Video%202025-09-26%20at%2010.22.25.mp4"
                            type="video/mp4"
                          />
                          Votre navigateur ne supporte pas la lecture vidéo.
                        </video>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <DecorativeElements type="wave-bottom" />

      {/* Global Custom Cursor for Case Studies - Only visible on desktop */}
      {!isMobile && (
        <AnimatePresence>
          {hoveredImage && (
            <motion.div
              className="fixed pointer-events-none w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-gray-300"
              style={{
                backgroundColor: '#FFFFFF',
                zIndex: 9999,
                left: 0,
                top: 0,
              }}
              animate={{
                x: mousePosition.x - 24,
                y: mousePosition.y - 24,
                opacity: 1,
              }}
              transition={{
                x: { type: 'spring', stiffness: 800, damping: 30, mass: 0.1 },
                y: { type: 'spring', stiffness: 800, damping: 30, mass: 0.1 },
                opacity: { duration: 0.05 },
              }}
              initial={{
                opacity: 0,
                x: mousePosition.x - 24,
                y: mousePosition.y - 24,
              }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
            >
              <svg
                className="w-6 h-6 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 17l9.2-9.2M17 17V7H7"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
};

export default CaseStudiesSection;
