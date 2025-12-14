'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Brand colors from Progix - dark navy theme
const colors = {
  primary: '#0A2456',
  secondary: '#1D4760',
  tertiary: '#222831',
  quaternary: '#B2BEC3',
  white: '#FFFFFF',
  black: '#000000',
  // Accent colors (bright for visibility on dark blue)
  accent: '#4ECDC4', // Bright cyan/teal
  accentLight: '#7EDCD5',
  // Dark navy background colors (matching hero)
  bg: {
    darkest: '#06132B', // Very dark navy (main bg)
    darker: '#0A1A38', // Slightly lighter navy
    dark: '#0E2245', // Navy for cards
    medium: '#132A52', // Medium navy for highlights
    border: '#1A3660', // Navy border
    borderLight: '#234575', // Lighter navy border
  },
  // Text colors (white/light for dark navy bg)
  text: {
    primary: '#FFFFFF', // Pure white for headings
    secondary: '#E0E7F1', // Very light blue-white for body
    muted: '#A8B8D0', // Soft blue-gray for subtle text
    accent: '#4ECDC4', // Bright cyan for accents
  },
};

// Project data for showcase
const creations = [
  {
    id: 'ibox',
    title: 'iBox',
    subtitle:
      'Solution de gestion intelligente pour optimiser vos opérations !',
    description:
      "iBox est une plateforme innovante de gestion et d'automatisation pour les entreprises modernes.",
    features: [
      'Tableau de bord centralisé',
      'Automatisation des processus',
      'Gestion des ressources optimisée',
      'Rapports en temps réel',
      'Intégrations multiples',
      'Interface utilisateur intuitive',
    ],
    badge: "Nous avons réalisé le design et développé l'application",
    image: '/labo/ibox/IMG_1835.PNG',
    gallery: [
      '/labo/ibox/IMG_1835.PNG',
      '/labo/ibox/IMG_1838.PNG',
      '/labo/ibox/IMG_1840.PNG',
    ],
  },
  {
    id: 'coride',
    title: 'CoRide',
    subtitle:
      '5000+ utilisateurs actifs en seulement 3 mois grâce à notre approche orientée produit !',
    description:
      "CoRide est l'application de covoiturage ultime pour vos déplacements quotidiens !",
    features: [
      'Trouvez des trajets près de chez vous',
      'Réservez en quelques clics',
      'Suivez votre trajet en temps réel',
      'Paiements sécurisés intégrés',
      'Système de notation et avis',
      'Support client 24/7',
    ],
    badge: "Nous avons réalisé le design et développé l'application",
    image: '/labo/coride/CoRideCover.png',
    gallery: [
      '/labo/coride/Splash screen.png',
      '/labo/coride/Splash screen (1).png',
      '/labo/coride/Splash screen (2).png',
    ],
  },
  {
    id: 'davinci',
    title: 'DaVinci',
    subtitle:
      'Créativité augmentée avec notre plateforme de design assisté par IA !',
    description:
      'DaVinci est une solution créative qui combine intelligence artificielle et design pour des résultats exceptionnels.',
    features: [
      'Génération de designs assistée par IA',
      'Templates personnalisables',
      'Collaboration en temps réel',
      'Export multi-formats',
      'Bibliothèque de ressources',
      'Historique des versions',
    ],
    badge: "Nous avons réalisé le design et développé l'application",
    image: '/labo/davinci/Splash Screen (3).png',
    gallery: [
      '/labo/davinci/Cas B - Plusieurs profils enfants.png',
      '/labo/davinci/Dashboard Enfant – Mon Espace - Scroll.png',
      '/labo/davinci/Mathématiques.png',
    ],
  },
  {
    id: 'gosholo',
    title: 'GoSholo',
    subtitle: 'Expérience shopping révolutionnaire avec réalité augmentée !',
    description:
      'GoSholo transforme le shopping en ligne avec une expérience immersive en réalité augmentée.',
    features: [
      'Essayage virtuel en AR',
      'Catalogue produits 3D',
      'Recommandations personnalisées',
      'Paiements sécurisés',
      'Suivi de commandes en temps réel',
      'Support client intégré',
    ],
    badge: "Nous avons réalisé le design et développé l'application",
    image: '/labo/gosholo/image copy.png',
    gallery: [
      '/labo/gosholo/image.png',
      '/labo/gosholo/image copy.png',
      '/labo/gosholo/image copy 2.png',
    ],
  },
];

// Process steps
const processSteps = [
  {
    step: 1,
    title: 'Découverte & Analyse',
    description:
      'Nous étudions vos besoins et objectifs pour proposer la meilleure solution adaptée à votre projet.',
  },
  {
    step: 2,
    title: 'Design & Conception',
    description:
      'Création des maquettes et prototypes animés pour visualiser le projet final avant développement.',
  },
  {
    step: 3,
    title: 'Développement',
    description:
      'Développement avec les technologies les plus pertinentes pour votre projet et les meilleures pratiques.',
  },
  {
    step: 4,
    title: 'Livraison & Support',
    description:
      'Mise en ligne et accompagnement pour assurer le succès de votre projet. Stratégie MARKETING 100% organique incluse.',
  },
];

// Pricing plans
const pricingPlans = [
  {
    name: 'Starter Pack',
    price: '6,400$',
    delivery: 'Livré en 30j',
    features: [
      '1 fonctionnalité principale (1 à 5 écrans)',
      'Design',
      'Application MOBILE ou WEB',
      'Mise en ligne sur les stores',
      'Optimisation du référencement (ASO)',
      'Support post-lancement durant 1 mois',
    ],
    popular: false,
  },
  {
    name: 'Advanced Pack',
    price: 'Sur devis',
    delivery: 'Livré en 45j',
    features: [
      '1 à 3 fonctionnalités principales (8 à 15 écrans)',
      'Design complet',
      'Application MOBILE native (iOS/Android)',
      'Application WEB responsive',
      'Landing page promotionnelle',
      'Mise en ligne sur les stores',
      'Optimisation du référencement (ASO)',
      'Support post-lancement durant 2 mois',
    ],
    popular: false,
  },
  {
    name: 'Premium Pack',
    price: 'Sur devis',
    delivery: 'Livré en 70j',
    features: [
      "Jusqu'à 8 fonctionnalités principales",
      'Design complet premium',
      'Application MOBILE native avancée (iOS/Android)',
      'Application WEB responsive premium',
      'Landing page premium',
      'Mise en ligne sur les stores',
      'Optimisation du référencement (ASO)',
      'Stratégie MARKETING 100% organique',
      'Support post-lancement durant 4 mois',
    ],
    popular: true,
  },
];

// FAQ items
const faqItems = [
  {
    question: "À qui s'adressent vos services ?",
    answer:
      "Nous propulsons les porteurs de projet, solopreneurs, start-ups, TPE et PME vers le succès digital avec des solutions sur mesure, de l'idée à la réalisation.",
  },
  {
    question: 'Comment garantissez-vous le respect des délais ?',
    answer:
      'Notre expérience de 10 ans dans la gestion de projets IT, le développement et le design nous permet de maîtriser parfaitement les délais. Nous avons développé une méthodologie éprouvée qui garantit la livraison dans les temps. Notre historique de 100% de projets livrés dans les délais témoigne de notre fiabilité.',
  },
  {
    question: 'Quelles technologies utilisez-vous ?',
    answer:
      "Nous utilisons différents outils du marché pour répondre efficacement aux besoins de nos projets, qu'ils soient simples ou complexes. Il peut s'agir de solutions NoCode pour les projets simples ou d'outils de programmation plus complets pour les projets les plus complexes. Nous proposons des solutions flexibles et performantes, qui sont validées en amont avec nos clients.",
  },
  {
    question: 'Le prix peut-il augmenter en cours de projet ?',
    answer:
      "Non, nous nous engageons sur un tarif fixe. Notre principe est simple : le prix initial est votre tarif final, sans aucune surprise ni supplément. Cette transparence fait partie de nos valeurs fondamentales. Bien entendu, si en cours de projet vous souhaitez ajouter des éléments non prévus initialement, ceux-ci feront l'objet d'un devis complémentaire.",
  },
  {
    question:
      "Les applications seront-elles disponibles sur l'App Store et le Play Store ?",
    answer:
      "Oui, nous prenons en charge l'intégralité du processus de mise en ligne, y compris la publication sur les stores iOS et Android. Nous nous occupons de toutes les démarches techniques et administratives.",
  },
  {
    question: "Que se passe-t-il après la mise en ligne de l'application ?",
    answer:
      "Nous assurons un suivi post-livraison pour garantir le bon fonctionnement de votre application. Des options de maintenance et d'évolution peuvent être discutées selon vos besoins futurs, pour un accompagnement à long terme.",
  },
];

// Client logos
const clientLogos = [
  '/images/BAnQ-gray.svg',
  '/images/ibusinesslogo.png',
  '/images/logoaquaa.png',
  '/images/rp-logo-1.png',
];

// FAQ Accordion Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-3 sm:mb-4">
      <div
        className="rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer"
        style={{
          backgroundColor: 'rgba(14, 34, 69, 0.4)',
          border: `1px solid ${colors.bg.border}`,
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className="w-full py-4 sm:py-5 px-4 sm:px-6 flex items-center justify-between text-left"
          style={{ color: colors.text.primary }}
        >
          <span className="text-sm sm:text-base font-medium pr-4 sm:pr-8">
            {question}
          </span>
          <span
            className="flex-shrink-0 transition-transform duration-300"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a855f7"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </div>
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: isOpen ? '500px' : '0px',
            opacity: isOpen ? 1 : 0,
          }}
        >
          <p
            className="px-4 sm:px-6 pb-4 sm:pb-5 leading-relaxed text-xs sm:text-sm"
            style={{ color: colors.text.secondary }}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

// Project Modal Component
function ProjectModal({
  project,
  isOpen,
  onClose,
}: {
  project: (typeof creations)[0] | null;
  isOpen: boolean;
  onClose: (e?: React.MouseEvent) => void;
}) {
  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    // Cleanup on unmount
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => onClose(e)}
            className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-sm overflow-hidden"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-1 sm:inset-2 md:inset-5 lg:inset-10 z-[100] overflow-y-auto overflow-x-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 max-w-6xl mx-auto"
              style={{ backgroundColor: colors.bg.dark }}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClose(e);
                }}
                className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-[100]"
                style={{ backgroundColor: colors.accent }}
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 pointer-events-none"
                  fill="none"
                  stroke={colors.white}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Content */}
              <div className="space-y-4 sm:space-y-6 md:space-y-8 mt-10 sm:mt-0">
                {/* Header */}
                <div className="text-center space-y-2 sm:space-y-4">
                  <h2
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
                    style={{ color: colors.text.primary }}
                  >
                    {project.title}
                  </h2>
                  <p
                    className="text-sm sm:text-base md:text-xl font-semibold"
                    style={{ color: colors.text.accent }}
                  >
                    {project.subtitle}
                  </p>
                </div>

                {/* Gallery */}
                {project.gallery && project.gallery.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                    {project.gallery.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-[9/16] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg"
                      >
                        <Image
                          src={img}
                          alt={`${project.title} screenshot ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Description & Features */}
                <div className="space-y-4 sm:space-y-6">
                  <p
                    className="text-sm sm:text-base md:text-lg leading-relaxed"
                    style={{ color: colors.text.secondary }}
                  >
                    {project.description}
                  </p>

                  <div>
                    <h3
                      className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4"
                      style={{ color: colors.text.primary }}
                    >
                      Principales fonctionnalités :
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                      {project.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
                          style={{ color: colors.text.secondary }}
                        >
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: colors.accent }}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex justify-center pt-2 sm:pt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-bold transition-all duration-300 hover:scale-105 shadow-lg"
                    style={{
                      backgroundColor: colors.accent,
                      color: colors.white,
                    }}
                  >
                    Discutons de votre projet
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Creation Card Component
function CreationCard({
  creation,
  index,
  onLearnMore,
}: {
  creation: (typeof creations)[0];
  index: number;
  onLearnMore: () => void;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-6 sm:gap-8 lg:gap-16 items-stretch py-8 sm:py-12 md:py-16`}
      style={{ borderBottom: `1px solid ${colors.bg.border}` }}
    >
      {/* Image */}
      <div className="w-full lg:w-1/2 flex">
        <div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl group w-full cursor-pointer aspect-[3/4] sm:aspect-auto"
          style={{ backgroundColor: colors.bg.dark }}
        >
          <Image
            src={creation.image}
            alt={creation.title}
            fill
            className="object-contain transition-transform duration-300"
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
            style={{
              background: `linear-gradient(to top, ${colors.accent}60, ${colors.accent}40)`,
            }}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onLearnMore();
              }}
              className="px-6 py-3 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg"
              style={{ backgroundColor: colors.white, color: colors.accent }}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6 flex flex-col justify-center">
        <h3
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
          style={{ color: colors.text.primary }}
        >
          {creation.title}
        </h3>
        <p
          className="text-base sm:text-lg md:text-xl font-semibold"
          style={{ color: colors.text.accent }}
        >
          {creation.subtitle}
        </p>
        <p
          className="text-sm sm:text-base md:text-lg"
          style={{ color: colors.text.secondary }}
        >
          {creation.description}
          <br />
          <span className="font-medium" style={{ color: colors.text.primary }}>
            Voici les principales fonctionnalités :
          </span>
        </p>
        <ul className="space-y-3">
          {creation.features.map((feature, i) => (
            <li
              key={i}
              className="flex items-center gap-3"
              style={{ color: colors.text.secondary }}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: colors.accent }}
              />
              {feature}
            </li>
          ))}
        </ul>
        <p
          className="text-sm font-medium italic"
          style={{ color: colors.text.muted }}
        >
          {creation.badge}
        </p>
      </div>
    </motion.div>
  );
}

// Process Step Colors
const stepColors = ['#6366f1', '#ec4899', '#f97316', '#10b981'];

// Process Step Component
function ProcessStep({
  step,
  isLast,
  index,
}: {
  step: (typeof processSteps)[0];
  isLast: boolean;
  index: number;
}) {
  const isEven = index % 2 === 0;
  const dotColor = stepColors[index % stepColors.length];

  return (
    <div className="relative">
      {/* Timeline line */}
      {!isLast && (
        <div
          className="absolute left-4 sm:left-1/2 top-4 w-0.5 h-full sm:-translate-x-1/2"
          style={{ backgroundColor: colors.bg.border }}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.15 }}
        className={`flex items-start gap-4 sm:gap-8 pb-12 sm:pb-24 flex-row sm:${isEven ? 'flex-row' : 'flex-row-reverse'}`}
      >
        {/* Étape label - hidden on mobile, shown on opposite side on desktop */}
        <div
          className={`hidden sm:block flex-1 ${isEven ? 'text-right' : 'text-left'}`}
        >
          <span className="text-lg font-medium" style={{ color: dotColor }}>
            Étape {step.step}
          </span>
        </div>

        {/* Center dot */}
        <div className="relative z-10 flex-shrink-0">
          <div
            className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-lg"
            style={{ backgroundColor: dotColor }}
          />
        </div>

        {/* Content card */}
        <div className="flex-1">
          <span
            className="sm:hidden text-sm font-medium mb-2 block"
            style={{ color: dotColor }}
          >
            Étape {step.step}
          </span>
          <div
            className="p-4 sm:p-6 rounded-xl sm:rounded-2xl"
            style={{
              backgroundColor: 'rgba(14, 34, 69, 0.3)',
              border: `1px solid ${colors.bg.border}`,
            }}
          >
            <h4
              className="text-base sm:text-xl font-bold mb-2 sm:mb-3"
              style={{ color: dotColor }}
            >
              {step.title}
            </h4>
            <p
              className="leading-relaxed text-xs sm:text-sm"
              style={{ color: colors.text.secondary }}
            >
              {step.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Pricing Card Component
function PricingCard({
  plan,
  index,
}: {
  plan: (typeof pricingPlans)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={`relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 ${plan.popular ? 'shadow-2xl shadow-teal-500/20 md:scale-105 z-10' : 'shadow-lg'}`}
      style={{
        backgroundColor: plan.popular ? colors.accent : colors.bg.dark,
        border: plan.popular ? 'none' : `1px solid ${colors.bg.border}`,
      }}
    >
      {plan.popular && (
        <div
          className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold"
          style={{
            backgroundColor: colors.bg.darkest,
            color: colors.text.primary,
          }}
        >
          POPULAIRE
        </div>
      )}

      <div className="text-center mb-5 sm:mb-6 md:mb-8">
        <h3
          className="text-xl sm:text-2xl font-bold mb-1.5 sm:mb-2"
          style={{ color: plan.popular ? colors.white : colors.text.primary }}
        >
          {plan.name}
        </h3>
        <div
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1"
          style={{ color: plan.popular ? colors.white : colors.text.accent }}
        >
          {plan.price}
        </div>
        <p
          className="text-sm"
          style={{
            color: plan.popular ? 'rgba(255,255,255,0.7)' : colors.text.muted,
          }}
        >
          {plan.delivery}
        </p>
      </div>

      <ul className="space-y-3 sm:space-y-4 mb-5 sm:mb-6 md:mb-8">
        {plan.features.map((feature, i) => (
          <li
            key={i}
            className="flex items-start gap-2 sm:gap-3"
            style={{
              color: plan.popular ? colors.white : colors.text.secondary,
            }}
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5"
              fill={plan.popular ? colors.white : colors.accent}
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs sm:text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className="block w-full py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-center text-sm sm:text-base transition-all duration-300 hover:scale-105"
        style={{
          backgroundColor: plan.popular ? colors.white : colors.accent,
          color: plan.popular ? colors.accent : colors.white,
        }}
      >
        JE PRENDS RENDEZ-VOUS
      </Link>
    </motion.div>
  );
}

export default function LaboPage() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof creations)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLearnMore = (project: (typeof creations)[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <div
      className="min-h-screen w-full font-montserrat relative selection:bg-teal-900/50"
      style={{ backgroundColor: colors.bg.darkest, color: colors.text.primary }}
    >
      {/* Grid Background - Fixed across entire page */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, ${colors.accent}15 0%, transparent 70%)`,
          }}
        />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: colors.accent, top: '10%', left: '10%' }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-80 h-80 rounded-full blur-3xl opacity-10"
            style={{
              backgroundColor: colors.secondary,
              bottom: '20%',
              right: '15%',
            }}
            animate={{
              x: [0, -40, 0],
              y: [0, -40, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo */}
            <div className="mb-6 md:mb-8 mt-35 md:mt-40">
              <Image
                src="/images/logo.png"
                alt="PROGIX"
                width={180}
                height={60}
                className="mx-auto brightness-0 invert w-[120px] md:w-[180px]"
              />
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight px-2">
              Ton APPLICATION
              <br />
              <span style={{ color: colors.accent }}>prête en 30 jours</span>
              <br />
              à partir de
              <br />
              <span className="relative">
                <span style={{ color: colors.accent }}>6,400$</span> !
              </span>
            </h1>

            <p
              className="text-base sm:text-lg md:text-2xl mb-6 md:mb-8 max-w-3xl mx-auto px-4"
              style={{ color: colors.text.secondary }}
            >
              Une app performante et un marketing 100% organique pour vendre dès
              le premier jour
            </p>

            {/* Hero Video */}
            <div className="mb-8 md:mb-10 flex justify-center px-4">
              <video
                src="https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/labo/2MIN%20FINAL.mp4"
                controls
                className="w-full max-w-[280px] sm:max-w-sm h-auto rounded-2xl shadow-2xl"
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-bold transition-all duration-300 shadow-2xl hover:shadow-teal-500/25"
                style={{ backgroundColor: colors.accent, color: colors.white }}
              >
                Prendre un Rendez-Vous !
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section
        className="py-16 sm:py-24 md:py-36 mt-8 md:mt-16 relative z-10 overflow-hidden"
        style={{ backgroundColor: '#081830' }}
      >
        {/* Faded circles background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute w-64 h-64 rounded-full blur-3xl opacity-25"
            style={{ backgroundColor: colors.accent, top: '10%', left: '5%' }}
          />
          <div
            className="absolute w-48 h-48 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: '#6366f1', top: '60%', right: '10%' }}
          />
          <div
            className="absolute w-72 h-72 rounded-full blur-3xl opacity-15"
            style={{
              backgroundColor: colors.secondary,
              bottom: '20%',
              left: '40%',
            }}
          />
          <div
            className="absolute w-40 h-40 rounded-full blur-3xl opacity-25"
            style={{ backgroundColor: '#8b5cf6', top: '30%', right: '25%' }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-2xl sm:text-3xl md:text-4xl font-light italic mb-12 sm:mb-20 md:mb-28"
            style={{ color: colors.text.secondary }}
          >
            Ils nous font confiance
          </motion.h2>

          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-24 lg:gap-32">
            {clientLogos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-8 sm:h-10 md:h-14 relative"
              >
                <Image
                  src={logo}
                  alt={`Client ${index + 1}`}
                  width={160}
                  height={70}
                  className="h-full w-auto object-contain brightness-0 invert opacity-60"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Wrapper with Background */}
      <div
        className="relative overflow-hidden"
        style={{ backgroundColor: '#081830' }}
      >
        {/* Faded circles background for all sections */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute w-80 h-80 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: colors.accent, top: '5%', left: '10%' }}
          />
          <div
            className="absolute w-96 h-96 rounded-full blur-3xl opacity-15"
            style={{ backgroundColor: '#6366f1', top: '20%', right: '5%' }}
          />
          <div
            className="absolute w-72 h-72 rounded-full blur-3xl opacity-20"
            style={{
              backgroundColor: colors.secondary,
              top: '35%',
              left: '60%',
            }}
          />
          <div
            className="absolute w-64 h-64 rounded-full blur-3xl opacity-25"
            style={{ backgroundColor: '#8b5cf6', top: '50%', left: '5%' }}
          />
          <div
            className="absolute w-80 h-80 rounded-full blur-3xl opacity-15"
            style={{ backgroundColor: colors.accent, top: '65%', right: '15%' }}
          />
          <div
            className="absolute w-72 h-72 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: '#6366f1', top: '80%', left: '30%' }}
          />
          <div
            className="absolute w-64 h-64 rounded-full blur-3xl opacity-25"
            style={{ backgroundColor: '#8b5cf6', bottom: '10%', right: '25%' }}
          />
        </div>

        {/* Promise Section */}
        <section className="py-12 sm:py-16 md:py-24 relative z-10">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 md:mb-16"
              style={{ color: colors.text.primary }}
            >
              Notre promesse
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
              {/* Transparent Price Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0 }}
                className="p-10 rounded-3xl text-center transition-all duration-300 backdrop-blur-sm"
                style={{
                  backgroundColor: 'rgba(14, 34, 69, 0.5)',
                  border: `1px solid ${colors.bg.border}`,
                }}
              >
                <div className="flex justify-center mb-4">
                  <svg
                    className="w-14 h-14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={colors.accent}
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3"
                  style={{ color: colors.text.primary }}
                >
                  Prix transparent
                </h3>
                <p style={{ color: colors.text.secondary }}>
                  Le tarif initial est votre tarif final, sans surprise ni
                  supplément.
                </p>
              </motion.div>

              {/* Deadline Respect Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl text-center transition-all duration-300 backdrop-blur-sm"
                style={{
                  backgroundColor: 'rgba(14, 34, 69, 0.5)',
                  border: `1px solid ${colors.bg.border}`,
                }}
              >
                <div className="flex justify-center mb-3 sm:mb-4">
                  <svg
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={colors.accent}
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3"
                  style={{ color: colors.text.primary }}
                >
                  Respect absolu des délais
                </h3>
                <p style={{ color: colors.text.secondary }}>
                  Nous livrons votre projet selon le planning annoncé et pas un
                  jour de plus.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Creations Section */}
        <section className="py-12 sm:py-16 md:py-24 relative z-10">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4"
              style={{ color: colors.text.primary }}
            >
              Nos créations
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center text-base sm:text-lg md:text-xl mb-8 sm:mb-12 md:mb-16 max-w-2xl mx-auto px-2"
              style={{ color: colors.text.secondary }}
            >
              Découvrez quelques-uns de nos projets réalisés avec passion et
              expertise
            </motion.p>

            <div className="max-w-6xl mx-auto">
              {creations.map((creation, index) => (
                <CreationCard
                  key={creation.id}
                  creation={creation}
                  index={index}
                  onLearnMore={() => handleLearnMore(creation)}
                />
              ))}
            </div>

            {/* Project Modal */}
            <ProjectModal
              project={selectedProject}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            />
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-12 sm:py-16 md:py-24 relative z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 md:gap-16 items-center max-w-6xl mx-auto">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full lg:w-2/5"
              >
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-teal-500/10">
                  <div className="aspect-[3/4] sm:aspect-[2/3] relative">
                    <Image
                      src="/images/1756818096511.jpg"
                      alt="Notre équipe"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to top, ${colors.bg.darkest}80, transparent 50%)`,
                      }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full lg:w-3/5 space-y-4 sm:space-y-6"
              >
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-bold"
                  style={{ color: colors.text.primary }}
                >
                  Qui sommes-nous ?
                </h2>

                <p
                  className="text-base sm:text-lg leading-relaxed"
                  style={{ color: colors.text.secondary }}
                >
                  Nous sommes{' '}
                  <span
                    className="font-bold"
                    style={{ color: colors.text.accent }}
                  >
                    PROGIX
                  </span>
                  , une équipe passionnée de développeurs et de stratèges.
                  Depuis plus de 10 ans, nous accompagnons des entreprises dans
                  la réussite de projets IT complexes.
                </p>

                <p
                  className="text-lg leading-relaxed"
                  style={{ color: colors.text.secondary }}
                >
                  Mais PROGIX, ce n'est pas qu'une personne. C'est une équipe
                  d'experts organisée en trois pôles complémentaires qui nous
                  permettent de livrer des projets de qualité dans les délais :
                </p>

                <ul className="space-y-3">
                  {[
                    {
                      icon: '➔',
                      title: 'Gestion de projet',
                      desc: 'pour piloter et coordonner chaque étape avec rigueur',
                    },
                    {
                      icon: '➔',
                      title: 'Design',
                      desc: 'pour concevoir des expériences utilisateur fluides et attractives',
                    },
                    {
                      icon: '➔',
                      title: 'Développement',
                      desc: 'pour transformer les idées en solutions performantes et évolutives',
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        style={{ color: colors.text.accent }}
                        className="font-bold"
                      >
                        {item.icon}
                      </span>
                      <span>
                        <strong style={{ color: colors.text.primary }}>
                          {item.title}
                        </strong>
                        <span style={{ color: colors.text.secondary }}>
                          {' '}
                          : {item.desc}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <p
                  className="text-lg leading-relaxed"
                  style={{ color: colors.text.secondary }}
                >
                  Cette synergie nous permet d'offrir :
                </p>

                <ul className="space-y-2">
                  {[
                    '➔ 100 % de satisfaction client',
                    '➔ Des projets livrés avec succès, dans les délais et budgets',
                    "➔ Un accompagnement de A à Z, de l'idée initiale à la mise en ligne",
                  ].map((item, i) => (
                    <li
                      key={i}
                      style={{ color: colors.text.accent }}
                      className="font-medium"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-4"
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-teal-500/25"
                    style={{
                      backgroundColor: colors.accent,
                      color: colors.white,
                    }}
                  >
                    JE PRENDS RENDEZ-VOUS
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-12 sm:py-16 md:py-24 relative z-10">
          <div className="container mx-auto px-4 relative">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 md:mb-16"
              style={{ color: colors.text.primary }}
            >
              Notre processus
            </motion.h2>

            <div className="max-w-6xl mx-auto">
              {processSteps.map((step, index) => (
                <ProcessStep
                  key={step.step}
                  step={step}
                  index={index}
                  isLast={index === processSteps.length - 1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-12 sm:py-16 md:py-24 relative z-10">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 md:mb-16"
              style={{ color: colors.text.primary }}
            >
              Nos offres
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto items-start">
              {pricingPlans.map((plan, index) => (
                <PricingCard key={plan.name} plan={plan} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 sm:py-16 md:py-24 relative z-10">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 md:mb-16"
              style={{ color: colors.text.primary }}
            >
              Questions fréquentes
            </motion.h2>

            <div className="max-w-4xl mx-auto">
              {faqItems.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-12 sm:py-16 md:py-24 relative z-10">
          <div className="container mx-auto px-4 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
                ALORS ON SE LANCE ?
              </h2>
              <p
                className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10"
                style={{ color: colors.text.secondary }}
              >
                Il est temps de lancer ton application !
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-full text-base sm:text-lg font-bold transition-all duration-300 shadow-2xl shadow-teal-500/25"
                  style={{
                    backgroundColor: colors.accent,
                    color: colors.white,
                  }}
                >
                  JE PRENDS RENDEZ-VOUS
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer
        className="py-8 sm:py-12 relative z-10"
        style={{
          backgroundColor: '#081830',
          borderTop: `1px solid ${colors.bg.border}`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-4">
              <Image
                src="/images/logo.png"
                alt="PROGIX"
                width={120}
                height={40}
                className="brightness-0 invert w-[100px] sm:w-[120px]"
              />
            </div>

            <div className="flex items-center gap-4 sm:gap-6 text-center sm:text-left">
              <span
                className="text-xs sm:text-sm"
                style={{ color: colors.text.muted }}
              >
                Suivez-nous sur LinkedIn :
              </span>
              <Link
                href="https://linkedin.com/company/progix"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:opacity-80"
                style={{ color: colors.text.accent }}
              >
                PROGIX
              </Link>
            </div>
          </div>

          <div
            className="mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderTop: `1px solid ${colors.bg.border}` }}
          >
            <div
              className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-6 text-xs sm:text-sm"
              style={{ color: colors.text.muted }}
            >
              <Link
                href="/mentions-legales"
                className="transition-colors hover:opacity-80"
              >
                Mentions légales
              </Link>
              <Link
                href="/politique-confidentialite"
                className="transition-colors hover:opacity-80"
              >
                Politique de Protection des Données Personnelles
              </Link>
              <Link
                href="/cookies"
                className="transition-colors hover:opacity-80"
              >
                Cookies
              </Link>
            </div>
            <p
              className="text-xs sm:text-sm text-center sm:text-right"
              style={{ color: colors.text.muted }}
            >
              © {new Date().getFullYear()} PROGIX - Tous droits réservés
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
