'use client';

import React from 'react';
import Image from 'next/image';
import { colors } from '@/config/colors';

const TestimonialsSection = () => {
  return (
    <section className="bg-white pb-20">
      {/* Creative wavy separator */}
      <div className="relative w-full h-16 mb-16 overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 w-full h-8"
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
        >
          <path
            d="M0,25 Q300,5 600,25 T1200,25 L1200,35 Q900,40 600,35 T0,40 Z"
            fill="#0A2456"
            opacity="0.6"
          />
          <path
            d="M0,25 Q300,5 600,25 T1200,25 L1200,35 Q900,40 600,35 T0,40 Z"
            fill="#1D4760"
            opacity="0.8"
          />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span style={{ color: colors.secondary }}>Témoignages</span> de
            projets réussis
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-gray-50 rounded-2xl p-8 relative">
            {/* Avatar */}
            <div className="absolute -top-6 left-8">
              <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg border-4 border-white">
                <Image
                  src="/imagesreview/1517492082228.jpg"
                  alt="Yves Hennekens"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="pt-8">
              <p className="text-gray-700 leading-relaxed font-bold mb-6">
                J&apos;ai développé une plateforme web pour ma société
                spécialisée dans l&apos;acquisition d&apos;actifs immobiliers
                résidentiels et fonciers.{' '}
                <span style={{ color: colors.secondary }}>
                  L&apos;équipe a su m&apos;éduquer et même prendre des
                  initiatives
                </span>{' '}
                pour mon site. Je recommande.
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">
                    David Manianga
                  </div>
                  <div className="text-sm text-gray-500">
                    Gestion de Patrimoine chez Desjardins
                  </div>
                </div>
                <a
                  href="https://ca.linkedin.com/in/david-manianga-ba2249126"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-gray-50 rounded-2xl p-8 relative">
            {/* Avatar */}
            <div className="absolute -top-6 left-8">
              <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg border-4 border-white">
                <Image
                  src="/imagesreview/1751852017364.jpg"
                  alt="Maude Rondeau"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="pt-8">
              <p className="text-gray-700 leading-relaxed font-bold mb-6">
                Ilyes avait travaillé en tant que product owner pour iBusiness
                Consulting et avait su gérer mon équipe IT à la perfection.{' '}
                <span style={{ color: colors.secondary }}>
                  Je n&apos;ai pas hésité une seule seconde à le contacter
                </span>{' '}
                pour développer un CRM interne pour ma deuxième entreprise
                RecrutementPlus. Toute l&apos;équipe est plus que satisfaite du
                résultat.
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">Hakim Safa</div>
                  <div className="text-sm text-gray-500">
                    CEO de iBusiness Consulting Inc.
                  </div>
                </div>
                <a
                  href="https://ca.linkedin.com/in/hakim-safa-85b46b17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-gray-50 rounded-2xl p-8 relative">
            {/* Avatar */}
            <div className="absolute -top-6 left-8">
              <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg border-4 border-white">
                <Image
                  src="/imagesreview/images.jpg"
                  alt="Kenya Kondo"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="pt-8">
              <p className="text-gray-700 leading-relaxed font-bold mb-6">
                L&apos;équipe était à l&apos;écoute et réactive. Le projet a
                pris un petit peu plus de temps que prévu mais{' '}
                <span style={{ color: colors.secondary }}>
                  on en ressort avec un produit complet sans dettes techniques
                </span>{' '}
                et c&apos;est ce qui m&apos;importait. Donc bravo et merci à
                tous !
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">
                    Daniel Dekasse
                  </div>
                  <div className="text-sm text-gray-500">
                    Economist-Fiscal Policy Advisor
                    <br />
                    Ministère des Finances du Québec (MFQ)
                  </div>
                </div>
                <a
                  href="https://ca.linkedin.com/in/daniel-dekasse-economiste/en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button
            className="text-white px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            style={{
              backgroundColor: colors.secondary,
              fontFamily: 'Hubot Sans, Inter, sans-serif',
            }}
          >
            Voir plus de témoignages
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
