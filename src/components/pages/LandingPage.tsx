'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '../layout/Header';
import LogoCarousel from '../LogoCarousel';
import { assets } from '@/config/assets';
import { colors } from '@/config/colors';
import { 
  FaMobile, 
  FaRocket, 
  FaUsers, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaStar,
  FaQuoteLeft
} from 'react-icons/fa';
import { MdWeb, MdAnalytics, MdSecurity, MdSupport } from 'react-icons/md';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'var(--font-montserrat)' }}>
      {/* Header Component */}
      <Header />

      {/* Blue Banner */}
      <div className="bg-blue-600 text-white text-center py-2 text-sm font-medium">
        <span>NOUVEAU ! Découvrez </span>
        <a href="#" className="underline hover:no-underline">ici</a>
        <span> notre pôle Data & IA</span>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50/30 to-white pt-16 pb-20">
        {/* Subtle Grid Background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        ></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 pt-8"
            >
              {/* Badge */}
              <div className="inline-block">
                <span className="text-xs font-bold px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full uppercase tracking-wider">
                  AGENCE DE DÉVELOPPEMENT WEB & MOBILE
                </span>
              </div>
              
              {/* Title */}
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-gray-900">
                Votre équipe{' '}
                <span className="text-blue-600">web</span>,{' '}
                <span className="text-blue-600">mobile</span>,{' '}
                <span className="text-blue-600">data</span>
              </h1>
              
              {/* Description */}
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl font-normal">
                PROGIX Studio conçoit et développe des produits digitaux livrés dans les temps, 
                maintenables sur le long terme, et compétitifs en budget — grâce à une équipe senior et 
                une méthode orientée impact.
              </p>

              {/* Service Pills */}
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center space-x-3 px-5 py-3 bg-white rounded-full shadow-sm border border-gray-100">
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm font-medium text-gray-700">Application web</span>
                </div>
                <div className="flex items-center space-x-3 px-5 py-3 bg-white rounded-full shadow-sm border border-gray-100">
                  <div className="w-4 h-4 bg-purple-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm font-medium text-gray-700">Logiciel métier</span>
                </div>
                <div className="flex items-center space-x-3 px-5 py-3 bg-white rounded-full shadow-sm border border-gray-100">
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm font-medium text-gray-700">Application mobile</span>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl">
                  Commencer maintenant
                </button>
                <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-full transition-all duration-200">
                  Voir nos projets
                </button>
              </div>
            </motion.div>

            {/* Image Section with Lightning Shape */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:pt-8 flex justify-center"
            >
              <div className="relative w-full max-w-2xl">
                {/* Lightning Shape Container */}
                <div className="relative">
                  {/* Lightning SVG Mask */}
                  <svg
                    viewBox="0 0 500 400"
                    className="w-full h-auto"
                    style={{ filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15))' }}
                  >
                    <defs>
                      <clipPath id="lightning-clip">
                        <path
                          d="M250 60 L180 160 L220 160 L150 240 L190 240 L120 340 L200 220 L160 220 L230 140 L190 140 L250 60 Z"
                          fill="white"
                        />
                      </clipPath>
                    </defs>
                    
                    {/* Background Lightning Shape */}
                    <path
                      d="M250 60 L180 160 L220 160 L150 240 L190 240 L120 340 L200 220 L160 220 L230 140 L190 140 L250 60 Z"
                      fill="url(#lightning-gradient)"
                      stroke="rgba(59, 130, 246, 0.2)"
                      strokeWidth="1"
                    />
                    
                    {/* Image inside Lightning */}
                    <foreignObject
                      x="50"
                      y="40"
                      width="400"
                      height="320"
                      clipPath="url(#lightning-clip)"
                    >
                      <div className="w-full h-full">
                        <Image
                          src="https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/premierbloc.jpg"
                          alt="Équipe PROGIX au travail"
                          width={500}
                          height={400}
                          className="w-full h-full object-cover object-center"
                          priority
                        />
                      </div>
                    </foreignObject>
                    
                    <defs>
                      <linearGradient id="lightning-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(59, 130, 246, 0.05)" />
                        <stop offset="50%" stopColor="rgba(147, 197, 253, 0.1)" />
                        <stop offset="100%" stopColor="rgba(59, 130, 246, 0.05)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Subtle Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-200/10 to-cyan-200/10 rounded-full blur-2xl scale-90 -z-10"></div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Logo Carousel Component */}
          <LogoCarousel />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              Nos services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une expertise complète pour tous vos besoins digitaux
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                icon: <MdWeb size={48} />,
                title: "Développement Web",
                description: "Sites web modernes, applications web complexes et e-commerce performants"
              },
              {
                icon: <FaMobile size={48} />,
                title: "Applications Mobile",
                description: "Apps iOS et Android natives ou cross-platform avec React Native"
              },
              {
                icon: <MdAnalytics size={48} />,
                title: "Data & Analytics",
                description: "Solutions de data science, BI et intelligence artificielle"
              },
              {
                icon: <MdSecurity size={48} />,
                title: "Sécurité",
                description: "Audit de sécurité, protection des données et conformité RGPD"
              },
              {
                icon: <FaRocket size={48} />,
                title: "DevOps & Cloud",
                description: "Déploiement cloud, CI/CD et infrastructure scalable"
              },
              {
                icon: <MdSupport size={48} />,
                title: "Support & Maintenance",
                description: "Accompagnement continu et maintenance évolutive"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="mb-6 flex justify-center" style={{ color: colors.secondary }}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: colors.primary }}>
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why PROGIX Section */}
      <section className="py-20" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Pourquoi choisir PROGIX ?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Notre approche unique garantit le succès de vos projets
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaUsers size={32} />,
                title: "Équipe experte",
                description: "Développeurs seniors avec 10+ ans d'expérience"
              },
              {
                icon: <FaRocket size={32} />,
                title: "Livraison rapide",
                description: "Méthodologie agile pour des résultats en temps record"
              },
              {
                icon: <MdSupport size={32} />,
                title: "Support 24/7",
                description: "Accompagnement continu et support technique"
              },
              {
                icon: <MdSecurity size={32} />,
                title: "Sécurité garantie",
                description: "Standards de sécurité les plus élevés"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center text-white"
              >
                <div className="mb-4 flex justify-center" style={{ color: colors.secondary }}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-blue-100 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.primary }}>
              Ce que disent nos clients
            </h2>
            <p className="text-xl text-gray-600">
              Leurs témoignages parlent pour nous
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Marie Dubois",
                company: "TechStart",
                rating: 5,
                text: "PROGIX a transformé notre vision en une application mobile exceptionnelle. Leur expertise technique et leur accompagnement ont dépassé nos attentes."
              },
              {
                name: "Jean Martin",
                company: "E-Commerce Plus",
                rating: 5,
                text: "Grâce à PROGIX, notre site e-commerce a vu ses ventes augmenter de 300%. Une équipe professionnelle et réactive."
              },
              {
                name: "Sophie Leroy",
                company: "DataCorp",
                rating: 5,
                text: "L'expertise data de PROGIX nous a permis d'optimiser nos processus et de prendre de meilleures décisions stratégiques."
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="mb-4">
                  <FaQuoteLeft size={24} style={{ color: colors.secondary }} />
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold" style={{ color: colors.primary }}>
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} size={16} className="text-yellow-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6" style={{ color: colors.primary }}>
                Notre équipe de PROGIX
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Depuis 2020, PROGIX accompagne les entreprises dans leur transformation digitale. 
                Notre équipe de passionnés combine expertise technique et vision business pour 
                créer des solutions qui font la différence.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4">
                  <div className="text-3xl font-bold mb-2" style={{ color: colors.secondary }}>
                    100+
                  </div>
                  <p className="text-gray-600">Projets réalisés</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl font-bold mb-2" style={{ color: colors.secondary }}>
                    50+
                  </div>
                  <p className="text-gray-600">Clients satisfaits</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-2xl flex items-center justify-center">
                  <span className="text-gray-400">Photo équipe {i}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: colors.secondary }}>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Contactez-nous dès aujourd&apos;hui pour une consultation gratuite
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white rounded-full font-semibold text-lg transition-all hover:scale-105 shadow-lg"
              style={{ color: colors.secondary }}
            >
              Démarrer un projet
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg transition-all hover:scale-105">
              Planifier un appel
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <Image
                  src={assets.logo}
                  alt="PROGIX Logo"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
                <span className="ml-2 text-xl font-bold">PROGIX</span>
              </div>
              <p className="text-gray-400 mb-6">
                Votre partenaire de confiance pour tous vos projets digitaux.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaLinkedin size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaTwitter size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Services</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Développement Web</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Applications Mobile</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Data & Analytics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Consulting</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Entreprise</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="/team" className="hover:text-white transition-colors">Notre équipe</a></li>
                <li><a href="/team" className="hover:text-white transition-colors">Équipe</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carrières</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Contact</h3>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center">
                  <FaEnvelope size={16} className="mr-3" />
                  <span>contact@progix.pro</span>
                </div>
                <div className="flex items-center">
                  <FaPhone size={16} className="mr-3" />
                  <span>+33 1 23 45 67 89</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt size={16} className="mr-3" />
                  <span>Paris, France</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PROGIX. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
