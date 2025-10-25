'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Squares } from '@/components/ui/squares-background';
import Navbar from '@/components/layout/Navbar';

const colors = {
  primary: '#1B363C',
  secondary: '#1D4760',
};

const ServicesPage = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="bg-white">
      {/* Navbar removed to use global StaggeredMenu header */}

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-56 pb-12 md:pb-20 overflow-hidden">
        {/* Right-side SVG blur only (no squares) */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-blur-yield opacity-60 z-0"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 md:mb-6"
              style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
            >
              Services de développement logiciel
              <br />
              <span style={{ color: colors.secondary }}>
                adaptés à votre entreprise
              </span>
            </h1>
            <p
              className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6 md:mb-8 px-4 sm:px-0"
              style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
            >
              Tous nos services font partie de votre réussite. Notre expertise
              ajoute de la valeur à votre entreprise grâce à la technologie
              logicielle et à la transformation numérique.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section - Horizontal Layout */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {/* Management & Automation Software - Image Left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
              className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 shadow-lg hover:shadow-2xl transition-all duration-500 border"
              style={{
                backgroundColor: hoveredCard === 1 ? colors.primary : 'white',
                borderColor: hoveredCard === 1 ? colors.primary : '#f3f4f6',
              }}
            >
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Image */}
                <div className="order-1">
                  <Image
                    src="https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/management_automation_software_illustration%20(1).svg"
                    alt="Management & automation software"
                    width={500}
                    height={400}
                    className="w-full h-auto object-contain"
                    style={{ filter: 'hue-rotate(200deg) saturate(1.2)' }}
                  />
                </div>

                {/* Content */}
                <div className="order-2">
                  <h2
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 transition-colors duration-500"
                    style={{
                      fontFamily: 'Hubot Sans, Inter, sans-serif',
                      color: hoveredCard === 1 ? 'white' : '#111827',
                    }}
                  >
                    Logiciels de gestion & d&apos;automatisation
                  </h2>

                  <p
                    className="text-base sm:text-lg leading-relaxed mb-6 md:mb-8 transition-colors duration-500"
                    style={{
                      fontFamily: 'Hubot Sans, Inter, sans-serif',
                      color: hoveredCard === 1 ? '#e0e0e0' : '#4b5563',
                    }}
                  >
                    Les logiciels de gestion (ERP, intranet, etc.) sont des
                    systèmes centralisés qui automatisent toutes les opérations,
                    organisent les équipes, garantissent l&apos;intégrité des
                    données et fournissent des informations en temps réel sur
                    l&apos;état de l&apos;entreprise, permettant une prise de
                    décision éclairée.
                  </p>

                  <div className="space-y-3">
                    <Link
                      href="/services/business-technical-analysis"
                      className="flex items-center justify-between group cursor-pointer p-4 rounded-lg transition-all duration-300"
                      style={{
                        backgroundColor:
                          hoveredCard === 1
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          hoveredCard === 1
                            ? 'rgba(255, 255, 255, 0.2)'
                            : 'rgb(239 246 255)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          hoveredCard === 1
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'transparent';
                      }}
                    >
                      <span
                        className="text-base font-semibold transition-colors duration-300"
                        style={{
                          color: hoveredCard === 1 ? 'white' : colors.secondary,
                        }}
                      >
                        Analyse métier et technique
                      </span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{
                          color: hoveredCard === 1 ? 'white' : colors.secondary,
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>

                    <Link
                      href="/services/custom-software"
                      className="flex items-center justify-between group cursor-pointer p-4 rounded-lg transition-all duration-300"
                      style={{
                        backgroundColor:
                          hoveredCard === 1
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          hoveredCard === 1
                            ? 'rgba(255, 255, 255, 0.2)'
                            : 'rgb(239 246 255)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          hoveredCard === 1
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'transparent';
                      }}
                    >
                      <span
                        className="text-base font-semibold transition-colors duration-300"
                        style={{
                          color: hoveredCard === 1 ? 'white' : colors.secondary,
                        }}
                      >
                        Développement logiciel sur mesure
                      </span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{
                          color: hoveredCard === 1 ? 'white' : colors.secondary,
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>

                    <Link
                      href="/services/custom-erp"
                      className="flex items-center justify-between group cursor-pointer p-4 rounded-lg transition-all duration-300"
                      style={{
                        backgroundColor:
                          hoveredCard === 1
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          hoveredCard === 1
                            ? 'rgba(255, 255, 255, 0.2)'
                            : 'rgb(239 246 255)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          hoveredCard === 1
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'transparent';
                      }}
                    >
                      <span
                        className="text-base font-semibold transition-colors duration-300"
                        style={{
                          color: hoveredCard === 1 ? 'white' : colors.secondary,
                        }}
                      >
                        Développement ERP personnalisé
                      </span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{
                          color: hoveredCard === 1 ? 'white' : colors.secondary,
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>

                    <Link
                      href="/services/software-support"
                      className="flex items-center justify-between group cursor-pointer p-4 rounded-lg transition-all duration-300"
                      style={{
                        backgroundColor:
                          hoveredCard === 1
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          hoveredCard === 1
                            ? 'rgba(255, 255, 255, 0.2)'
                            : 'rgb(239 246 255)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          hoveredCard === 1
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'transparent';
                      }}
                    >
                      <span
                        className="text-base font-semibold transition-colors duration-300"
                        style={{
                          color: hoveredCard === 1 ? 'white' : colors.secondary,
                        }}
                      >
                        Support et maintenance logicielle
                      </span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{
                          color: hoveredCard === 1 ? 'white' : colors.secondary,
                        }}
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
                </div>
              </div>
            </motion.div>

            {/* Laboratoire PROGIX - Image Right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
              className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 shadow-lg hover:shadow-2xl transition-all duration-500 border"
              style={{
                backgroundColor: hoveredCard === 2 ? colors.primary : 'white',
                borderColor: hoveredCard === 2 ? colors.primary : '#f3f4f6',
              }}
            >
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Content */}
                <div className="order-2 md:order-1">
                  <h2
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 transition-colors duration-500"
                    style={{
                      fontFamily: 'Hubot Sans, Inter, sans-serif',
                      color: hoveredCard === 2 ? 'white' : '#111827',
                    }}
                  >
                    Laboratoire PROGIX
                  </h2>

                  <p
                    className="text-base sm:text-lg leading-relaxed mb-6 md:mb-8 transition-colors duration-500"
                    style={{
                      fontFamily: 'Hubot Sans, Inter, sans-serif',
                      color: hoveredCard === 2 ? '#e0e0e0' : '#4b5563',
                    }}
                  >
                    Le laboratoire PROGIX est spécialisé dans la conception et
                    le développement de projets logiciels innovants. Les
                    applications web et mobiles développées au laboratoire se
                    distinguent par leur caractère unique et audacieux.
                    D&apos;une plateforme de type marketplace à une application
                    de rencontre, les possibilités sont infinies.
                  </p>

                  <div className="space-y-3">
                    <Link
                      href="/services/web-application"
                      className="flex items-center justify-between group cursor-pointer p-4 rounded-lg transition-all duration-300"
                      style={{
                        backgroundColor:
                          hoveredCard === 2
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          hoveredCard === 2
                            ? 'rgba(255, 255, 255, 0.2)'
                            : 'rgb(239 246 255)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          hoveredCard === 2
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'transparent';
                      }}
                    >
                      <span
                        className="text-base font-semibold transition-colors duration-300"
                        style={{
                          color: hoveredCard === 2 ? 'white' : colors.secondary,
                        }}
                      >
                        Application web
                      </span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{
                          color: hoveredCard === 2 ? 'white' : colors.secondary,
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>

                    <Link
                      href="/services/mobile-application"
                      className="flex items-center justify-between group cursor-pointer p-4 rounded-lg transition-all duration-300"
                      style={{
                        backgroundColor:
                          hoveredCard === 2
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          hoveredCard === 2
                            ? 'rgba(255, 255, 255, 0.2)'
                            : 'rgb(239 246 255)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          hoveredCard === 2
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'transparent';
                      }}
                    >
                      <span
                        className="text-base font-semibold transition-colors duration-300"
                        style={{
                          color: hoveredCard === 2 ? 'white' : colors.secondary,
                        }}
                      >
                        Application mobile
                      </span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{
                          color: hoveredCard === 2 ? 'white' : colors.secondary,
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>

                    <Link
                      href="/services/ai-integration"
                      className="flex items-center justify-between group cursor-pointer p-4 rounded-lg transition-all duration-300"
                      style={{
                        backgroundColor:
                          hoveredCard === 2
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          hoveredCard === 2
                            ? 'rgba(255, 255, 255, 0.2)'
                            : 'rgb(239 246 255)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          hoveredCard === 2
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'transparent';
                      }}
                    >
                      <span
                        className="text-base font-semibold transition-colors duration-300"
                        style={{
                          color: hoveredCard === 2 ? 'white' : colors.secondary,
                        }}
                      >
                        Intégration de l&apos;Intelligence Artificielle (IA)
                      </span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{
                          color: hoveredCard === 2 ? 'white' : colors.secondary,
                        }}
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
                </div>

                {/* Image */}
                <div className="order-1 md:order-2">
                  <Image
                    src="https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/witify_lab_illustration%20(1).svg"
                    alt="Laboratoire PROGIX"
                    width={500}
                    height={400}
                    className="w-full h-auto object-contain"
                    style={{ filter: 'hue-rotate(200deg) saturate(1.2)' }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Data Management - Image Left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredCard(3)}
              onMouseLeave={() => setHoveredCard(null)}
              className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 shadow-lg hover:shadow-2xl transition-all duration-500 border"
              style={{
                backgroundColor: hoveredCard === 3 ? colors.primary : 'white',
                borderColor: hoveredCard === 3 ? colors.primary : '#f3f4f6',
              }}
            >
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Image */}
                <div className="order-1">
                  <Image
                    src="https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/data_management_illustration.svg"
                    alt="Gestion des données"
                    width={500}
                    height={400}
                    className="w-full h-auto object-contain"
                    style={{ filter: 'hue-rotate(200deg) saturate(1.2)' }}
                  />
                </div>

                {/* Content */}
                <div className="order-2">
                  <h2
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 transition-colors duration-500"
                    style={{
                      fontFamily: 'Hubot Sans, Inter, sans-serif',
                      color: hoveredCard === 3 ? 'white' : '#111827',
                    }}
                  >
                    Gestion des données
                  </h2>

                  <p
                    className="text-base sm:text-lg leading-relaxed mb-6 md:mb-8 transition-colors duration-500"
                    style={{
                      fontFamily: 'Hubot Sans, Inter, sans-serif',
                      color: hoveredCard === 3 ? '#e0e0e0' : '#4b5563',
                    }}
                  >
                    La gestion des données consiste en un accompagnement
                    stratégique et/ou des travaux techniques pour faire
                    ressortir tout le potentiel des informations avec lesquelles
                    votre organisation interagit. Lorsqu&apos;elle est mature,
                    elle vous permet de guider vos choix en toute confiance et
                    de prendre des décisions éclairées.
                  </p>

                  <div className="space-y-3">
                    <Link
                      href="/services/data-strategy"
                      className="flex items-center justify-between group cursor-pointer p-4 rounded-lg transition-all duration-300"
                      style={{
                        backgroundColor:
                          hoveredCard === 3
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          hoveredCard === 3
                            ? 'rgba(255, 255, 255, 0.2)'
                            : 'rgb(239 246 255)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          hoveredCard === 3
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'transparent';
                      }}
                    >
                      <span
                        className="text-base font-semibold transition-colors duration-300"
                        style={{
                          color: hoveredCard === 3 ? 'white' : colors.secondary,
                        }}
                      >
                        Stratégie de données
                      </span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{
                          color: hoveredCard === 3 ? 'white' : colors.secondary,
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>

                    <Link
                      href="/services/data-analysis"
                      className="flex items-center justify-between group cursor-pointer p-4 rounded-lg transition-all duration-300"
                      style={{
                        backgroundColor:
                          hoveredCard === 3
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          hoveredCard === 3
                            ? 'rgba(255, 255, 255, 0.2)'
                            : 'rgb(239 246 255)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          hoveredCard === 3
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'transparent';
                      }}
                    >
                      <span
                        className="text-base font-semibold transition-colors duration-300"
                        style={{
                          color: hoveredCard === 3 ? 'white' : colors.secondary,
                        }}
                      >
                        Analyse de données
                      </span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{
                          color: hoveredCard === 3 ? 'white' : colors.secondary,
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>

                    <Link
                      href="/services/data-visualization"
                      className="flex items-center justify-between group cursor-pointer p-4 rounded-lg transition-all duration-300"
                      style={{
                        backgroundColor:
                          hoveredCard === 3
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          hoveredCard === 3
                            ? 'rgba(255, 255, 255, 0.2)'
                            : 'rgb(239 246 255)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          hoveredCard === 3
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'transparent';
                      }}
                    >
                      <span
                        className="text-base font-semibold transition-colors duration-300"
                        style={{
                          color: hoveredCard === 3 ? 'white' : colors.secondary,
                        }}
                      >
                        Visualisation de données
                      </span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{
                          color: hoveredCard === 3 ? 'white' : colors.secondary,
                        }}
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
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-cyan-800 to-cyan-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6"
              style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
            >
              Nous voulons éliminer les inefficacités dans vos opérations
            </h2>
            <p
              className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8"
              style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
            >
              Simplifiez votre gestion. De la conception technique au
              développement, notre équipe d&apos;experts relève les principaux
              défis commerciaux et technologiques de votre entreprise. Nous
              sommes votre partenaire technologique.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-cyan-800 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
              style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
            >
              Réserver une consultation gratuite
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6"
              style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
            >
              Intéressé à{' '}
              <span style={{ color: colors.secondary }}>
                propulser votre entreprise?
              </span>
            </h2>
            <p
              className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8"
              style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
            >
              Discutons de votre projet et découvrez comment nous pouvons vous
              aider à atteindre vos objectifs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                style={{ backgroundColor: colors.secondary }}
              >
                Démarrer un projet
              </Link>
              <Link
                href="/portfolio"
                className="border-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold transition-all duration-300 hover:bg-gray-50 text-sm sm:text-base"
                style={{
                  borderColor: colors.secondary,
                  color: colors.secondary,
                }}
              >
                Voir nos projets
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <Image
                src="/images/logo.png"
                alt="PROGIX Logo"
                width={120}
                height={120}
                className="h-16 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-gray-400 text-sm">
                Solutions logicielles sur mesure pour les organisations
                ambitieuses
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    href="/services"
                    className="hover:text-white transition-colors"
                  >
                    Tous les services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/custom-software"
                    className="hover:text-white transition-colors"
                  >
                    Logiciels sur mesure
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/web-application"
                    className="hover:text-white transition-colors"
                  >
                    Applications web
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/mobile-application"
                    className="hover:text-white transition-colors"
                  >
                    Applications mobiles
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Entreprise</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    href="/team"
                    className="hover:text-white transition-colors"
                  >
                    Notre équipe
                  </Link>
                </li>
                <li>
                  <Link
                    href="/portfolio"
                    className="hover:text-white transition-colors"
                  >
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Montréal, Québec</li>
                <li>
                  <a
                    href="mailto:info@progix.ca"
                    className="hover:text-white transition-colors"
                  >
                    info@progix.ca
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 PROGIX. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPage;
