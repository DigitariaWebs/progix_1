'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getServiceBySlug, ServiceDetail } from '@/data/servicesData';
import { assets } from '@/config/assets';
import {
  FiClipboard,
  FiLayers,
  FiTrendingUp,
  FiPlus,
  FiMinus,
} from 'react-icons/fi';
// Navbar removed to use global StaggeredMenu header

const colors = {
  primary: '#1B363C',
  secondary: '#1D4760',
};

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadService = async () => {
      try {
        const resolvedParams = await params;
        const serviceData = getServiceBySlug(resolvedParams.slug);
        if (serviceData) {
          setService(serviceData);
        }
      } catch (error) {
        console.error('Error loading service:', error);
      } finally {
        setLoading(false);
      }
    };

    loadService();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Service Not Found
          </h1>
          <Link href="/services" className="text-primary hover:underline">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Navbar removed */}

      {/* Hero Section */}
      <section className="pt-46 sm:pt-64 pb-12 sm:pb-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6"
              style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
            >
              {service.title}
            </h1>

            <div className="max-w-4xl">
              <h2
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6"
                style={{
                  color: colors.secondary,
                  fontFamily: 'Hubot Sans, Inter, sans-serif',
                }}
              >
                {service.hero.subtitle}
              </h2>
              <p
                className="text-base sm:text-lg text-gray-600 leading-relaxed"
                style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
              >
                {service.hero.description}
              </p>
            </div>

            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-block text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                style={{ backgroundColor: colors.secondary }}
              >
                Discuter de votre projet
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
            >
              <span className="text-gray-900">Why start with a </span>
              <span style={{ color: colors.secondary }}>business</span>
              <br />
              <span style={{ color: colors.secondary }}>
                and technical analysis
              </span>
              <span className="text-gray-900">?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {service.whySection.reasons.map((reason, index) => {
              // Map icons based on index or reason type
              const IconComponent =
                index === 0
                  ? FiClipboard
                  : index === 1
                    ? FiLayers
                    : FiTrendingUp;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300"
                >
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                    style={{ color: colors.secondary }}
                  >
                    <IconComponent size={32} strokeWidth={2} />
                  </div>
                  <h3
                    className="text-xl font-bold text-gray-900 mb-4"
                    style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
                  >
                    {reason.title}
                  </h3>
                  <p
                    className="text-gray-600 leading-relaxed text-base"
                    style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
                  >
                    {reason.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
              style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
            >
              <span className="text-gray-900">Our business and</span>
              <br />
              <span className="text-gray-900">technical analysis </span>
              <span style={{ color: colors.secondary }}>process</span>
            </h2>
            <p
              className="text-sm sm:text-base text-gray-600 max-w-3xl leading-relaxed px-1 sm:px-0"
              style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
            >
              {service.process.description}
            </p>
          </motion.div>

          <div className="space-y-0">
            {service.process.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-b border-gray-200 last:border-b-0"
              >
                <div className="py-8 sm:py-12 grid grid-cols-12 gap-4 sm:gap-8 md:gap-16 items-start">
                  <div className="col-span-3 sm:col-span-2 md:col-span-2">
                    <div
                      className="text-5xl sm:text-6xl md:text-7xl font-bold leading-none w-16 sm:w-20 md:w-24"
                      style={{
                        color: colors.secondary,
                        fontFamily: 'Hubot Sans, Inter, sans-serif',
                      }}
                    >
                      {step.number}
                    </div>
                  </div>
                  <div className="col-span-9 sm:col-span-10 md:col-span-10">
                    <h3
                      className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-4"
                      style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-base text-gray-600 mb-6 leading-relaxed"
                      style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
                    >
                      {step.description}
                    </p>
                    <ul className="space-y-3">
                      {step.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start gap-3">
                          <div
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                            style={{ backgroundColor: colors.secondary }}
                          />
                          <span className="text-gray-700 text-base leading-relaxed">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      {service.testimonial && (
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6"
                style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
              >
                Ce que nos{' '}
                <span style={{ color: colors.secondary }}>clients</span> disent
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 relative"
            >
              <div className="absolute -top-6 left-8">
                <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg border-4 border-white">
                  <Image
                    src={service.testimonial.image}
                    alt={service.testimonial.author}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="pt-8">
                <svg
                  className="w-12 h-12 mb-6 opacity-20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: colors.secondary }}
                >
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                </svg>

                <p
                  className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6 sm:mb-8 italic"
                  style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
                >
                  &ldquo;{service.testimonial.quote}&rdquo;
                </p>

                <div>
                  <p
                    className="font-bold text-gray-900 text-lg"
                    style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
                  >
                    {service.testimonial.author}
                  </p>
                  <p className="text-gray-600">
                    {service.testimonial.position},{' '}
                    {service.testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16">
            {/* Left Column - Title & Contact Card */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                    style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
                  >
                    <span className="text-gray-900">Questions</span>
                    <br />
                    <span className="text-gray-900">and </span>
                    <span style={{ color: colors.secondary }}>answers</span>
                  </h2>
                </motion.div>

                {/* Contact Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8"
                >
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-32  rounded-2xl flex items-center justify-center p-4">
                        <Image
                          src={assets.logo}
                          alt="PROGIX Logo"
                          width={120}
                          height={120}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p
                        className="text-base mb-3"
                        style={{
                          color: colors.secondary,
                          fontFamily: 'Hubot Sans, Inter, sans-serif',
                        }}
                      >
                        Custom software development
                      </p>
                      <div className="space-y-2 text-sm text-gray-700">
                        <p
                          style={{
                            fontFamily: 'Hubot Sans, Inter, sans-serif',
                          }}
                        >
                          contact@progix.pro
                        </p>
                        <p
                          style={{
                            fontFamily: 'Hubot Sans, Inter, sans-serif',
                          }}
                        >
                          +1 514 576 5993
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column - FAQ Items */}
            <div className="lg:col-span-7">
              <div className="space-y-4">
                {service.faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gray-50 rounded-xl sm:rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setOpenFaqIndex(openFaqIndex === index ? null : index)
                      }
                      className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-100 transition-colors"
                    >
                      <h3
                        className="text-base md:text-lg font-medium text-gray-900 pr-8"
                        style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
                      >
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0">
                        {openFaqIndex === index ? (
                          <FiMinus
                            size={20}
                            style={{ color: colors.primary }}
                          />
                        ) : (
                          <FiPlus size={20} style={{ color: colors.primary }} />
                        )}
                      </div>
                    </button>
                    {openFaqIndex === index && (
                      <div className="px-6 pb-6">
                        <p
                          className="text-gray-600 leading-relaxed text-sm md:text-base"
                          style={{
                            fontFamily: 'Hubot Sans, Inter, sans-serif',
                          }}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-cyan-800 to-cyan-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6"
              style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
            >
              Prêt à démarrer votre projet?
            </h2>
            <p
              className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8"
              style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
            >
              Discutons de vos besoins et découvrez comment nous pouvons vous
              aider à atteindre vos objectifs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-block bg-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                style={{ color: colors.primary }}
              >
                Réserver une consultation gratuite
              </Link>
              <Link
                href="/services"
                className="inline-block border-2 border-white text-white hover:bg-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold transition-all duration-300 text-sm sm:text-base"
                style={{
                  fontFamily: 'Hubot Sans, Inter, sans-serif',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'white';
                }}
              >
                Voir tous les services
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
                src={assets.logo}
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
}
