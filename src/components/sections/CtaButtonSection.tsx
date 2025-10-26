'use client';

import React from 'react';
import Link from 'next/link';
import { colors } from '@/config/colors';

const CtaSection = () => {
  return (
    <section
      className="py-12 sm:py-16 md:py-20"
      style={{ backgroundColor: colors.secondary }}
    >
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
          Prêt à démarrer votre projet ?
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8">
          Contactez-nous dès aujourd&apos;hui pour une consultation gratuite
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            href="/contact"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-white rounded-full font-semibold text-base sm:text-lg transition-all hover:scale-105 shadow-lg inline-block"
            style={{
              color: colors.secondary,
              fontFamily: 'Hubot Sans, Inter, sans-serif',
            }}
          >
            Démarrer un projet
          </Link>
          <Link
            href="/contact"
            className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-full font-semibold text-base sm:text-lg transition-all hover:scale-105 inline-block"
          >
            Planifier un appel
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
