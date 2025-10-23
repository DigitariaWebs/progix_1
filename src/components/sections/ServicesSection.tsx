'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { colors } from '@/config/colors';
import BlurText from '@/components/ui/BlurText';

const ServicesSection = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 640); // sm breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <section className="relative bg-white pt-12 pb-12 sm:pt-20 sm:pb-16 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        {/* Header */}
        <div className="max-w-4xl mb-8 sm:mb-12">
          {/* Desktop: BlurText animation */}
          {isDesktop && (
            <BlurText
              text="Votre partenaire web, mobile et systèmes d'affaires"
              delay={240}
              animateBy="words"
              direction="top"
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              segmentClassName={(word) =>
                word.replace(/\u00A0/g, ' ') === 'systèmes' ||
                word.includes("d'affaires")
                  ? 'text-[#1D4760]'
                  : ''
              }
            />
          )}

          {/* Mobile: Simple title */}
          {!isDesktop && (
            <h1 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
              Votre partenaire web, mobile et{' '}
              <span className="text-[#1D4760]">systèmes d'affaires</span>
            </h1>
          )}
          <p
            className="text-base sm:text-lg leading-relaxed font-semibold text-justify"
            style={{
              fontFamily: 'Hubot Sans, Inter, sans-serif',
              color: colors.primary,
            }}
          >
            Progix conçoit et développe des solutions web, mobiles et CRM/ERP,
            livrées dans les temps, maintenables sur le long terme et
            compétitives en budget — grâce à une équipe sénior et une méthode
            orientée impact.
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-12 sm:mb-16">
          <Link
            href="/contact"
            className="text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block"
            style={{
              fontFamily: 'Hubot Sans, Inter, sans-serif',
              backgroundColor: colors.secondary,
            }}
          >
            Discuter de votre projet
          </Link>
        </div>

        {/* Service Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {/* SMES Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
              style={{ backgroundColor: `${colors.secondary}20` }}
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                style={{ color: colors.secondary }}
              >
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">PME</h3>
            <p className="text-gray-600 leading-relaxed font-semibold text-justify">
              Pour les entreprises qui souhaitent automatiser leurs processus,
              réduire les délais, prendre des décisions éclairées et stabiliser
              leurs opérations.
            </p>
          </div>

          {/* Institutional Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
              style={{ backgroundColor: `${colors.secondary}20` }}
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                style={{ color: colors.secondary }}
              >
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Institutionnel
            </h3>
            <p className="text-gray-600 leading-relaxed font-semibold text-justify">
              Pour les institutions qui souhaitent valoriser leurs données,
              tirer le meilleur parti de leur infrastructure et maximiser
              l&apos;impact de leurs ressources.
            </p>
          </div>

          {/* Startup Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
              style={{ backgroundColor: `${colors.secondary}20` }}
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                style={{ color: colors.secondary }}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Startup</h3>
            <p className="text-gray-600 leading-relaxed font-semibold text-justify">
              Pour les start-ups qui veulent changer le monde de demain, briser
              le statu quo et innover grâce à la technologie logicielle.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
