'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import CardSwap, { Card } from '@/components/CardSwap';
import ScrollVelocity from '@/components/ScrollVelocity';
import CircularText from '@/components/CircularText';
import SectionFadeBg from '@/components/SectionFadeBg';
import CurvedLoop from '@/components/CurvedLoop';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { colors } from '@/config/colors';
import Footer from '@/components/layout/Footer';
import AnimatedButton from '@/components/AnimatedButton';
// Navbar removed to use global StaggeredMenu header
import { Squares } from '@/components/ui/squares-background';

// Types for case study data
interface Collaborator {
  name: string;
  role: string;
  image?: string;
}

interface CaseStudySection {
  title: string;
  subtitle: string;
  content: string;
  images: string[];
  layout: 'single' | 'two-column' | 'gallery' | 'architecture';
}

interface CaseStudy {
  title: string;
  subtitle: string;
  logo: string;
  heroImage?: string;
  heroVideo?: string;
  client: string;
  date: string;
  role: string;
  collaborators: Collaborator[];
  description: string;
  mandat: {
    title: string;
    content: string;
  };
  objectifs: {
    title: string;
    items: string[];
  };
  sections: CaseStudySection[];
}

// Case study data - you can move this to a separate file or database
const caseStudies: Record<string, CaseStudy> = {
  'fahe-crm': {
    title: 'FAHE CRM',
    subtitle: 'UNE FIRME DE DÉVELOPPEMENT LOGICIEL FIÈREMENT MONTRÉALAISE',
    logo: 'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/photo_2019-03-21_11-48-55-2-6-233x91.jpg',
    heroImage: 'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/WhatsApp%20Image%202025-10-08%20at%2020.20.25.jpeg',
    heroVideo: 'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/video.mp4',
    client: 'FAHE Automotive',
    date: '2024',
    role: 'Développement Web & Mobile',
    collaborators: [
      {
        name: 'Daani Abderrahman',
        role: 'Lead Developer',
        image: 'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images%20of%20the%20team/1758914011397.jpg',
      },
      {
        name: 'Mohamed Duneche',
        role: 'Full Stack Developer',
        image: 'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images%20of%20the%20team/1757886357065.jpg',
      },
      {
        name: 'Jean Boissoneault',
        role: 'Design & Development',
        image: 'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images%20of%20the%20team/1649105009859.jpg',
      },
    ],
    description:
      'FAHE est un client du domaine automobile. Nous avons développé pour eux un CRM complet permettant de tracker leur visibilité en ligne, gérer leurs prospects, automatiser le check-in des véhicules et optimiser leur processus de service client.',
    mandat: {
      title: 'MANDAT',
      content:
        "Concevoir une solution CRM complète et moderne, tout en repensant l'expérience utilisateur pour la rendre plus intuitive et efficace. La plateforme devait refléter l'identité de marque de FAHE Automotive et mettre en valeur son positionnement distinctif dans le secteur automobile, tout en intégrant des fonctionnalités avancées de gestion des prospects et d'automatisation des processus.",
    },
    objectifs: {
      title: 'OBJECTIFS',
      items: [
        'Développer un système de gestion des prospects efficace et automatisé',
        'Intégrer des outils de tracking de la visibilité en ligne en temps réel',
        'Créer un module de check-in des véhicules simplifié et intuitif',
        'Optimiser le processus de service client avec des workflows automatisés',
        'Assurer une interface utilisateur moderne et responsive',
        'Garantir la sécurité et la confidentialité des données clients',
        'Permettre une évolutivité facile pour des fonctionnalités futures',
      ],
    },
    sections: [
      {
        title: 'UNE EXPÉRIENCE IMMERSIVE',
        subtitle: 'DÉCOUVREZ LE CRM EN ACTION',
        content:
          "Plongez dans l'univers FAHE avec cette démonstration interactive qui vous montre toutes les fonctionnalités de notre solution CRM. De la gestion des prospects à l'automatisation des processus, découvrez comment nous avons transformé leur façon de travailler.",
        images: [
          'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/CRMFAHE/CRMSCREEN1.png',
          'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/CRMFAHE/Screenshot%202025-10-08%20224826.png',
          'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/CRMFAHE/Screenshot%202025-10-08%20225008.png',
          'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/CRMFAHE/Screenshot%202025-10-08%20225558.png',
          'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/CRMFAHE/Screenshot%202025-10-08%20230044.png',
        ],
        layout: 'gallery',
      },
      {
        title: 'ARCHITECTURE ÉVOLUTIVE',
        subtitle: "PRÊTE POUR L'AVENIR",
        content:
          "L'architecture technique a été conçue pour permettre l'ajout facile de nouvelles fonctionnalités. La plateforme est scalable et peut s'adapter à la croissance de l'entreprise, tout en maintenant des performances optimales.",
        images: [],
        layout: 'architecture',
      },
    ],
  },
  fruitexotic: {
    title: 'FruitExotic',
    subtitle: 'SITE WEB MULTILINGUE',
    logo: 'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/crustys.png',
    heroVideo: 'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/fruitexo.mp4',
    client: 'FruitExotic Inc.',
    date: '2024',
    role: 'Développement Web Frontend & UI/UX',
    collaborators: [
      { name: 'Frontend Team', role: 'React & Next.js Development' },
      { name: 'UI/UX Team', role: 'Design & User Experience' },
      { name: 'Backend Team', role: 'API & Content Management' },
      { name: 'DevOps Team', role: 'Deployment & Infrastructure' },
    ],
    description:
      "FruitExotic Inc. est une entreprise spécialisée dans l'exportation de fruits exotiques de qualité premium. Nous avons développé leur site web international multilingue (7 langues) pour mettre en valeur leurs services de la meilleure façon grâce à nos développeurs frontend et designers UI/UX d'élite, créant une expérience digitale exceptionnelle qui reflète l'excellence de leurs produits exotiques.",
    mandat: {
      title: 'MANDAT',
      content:
        'Concevoir et développer un site web international multilingue pour FruitExotic Inc., capable de communiquer efficacement dans 7 langues différentes. Le site devait refléter la qualité premium de leurs produits exotiques tout en offrant une expérience utilisateur exceptionnelle à travers différentes cultures et marchés.',
    },
    objectifs: {
      title: 'OBJECTIFS',
      items: [
        'Créer un site web multilingue supportant 7 langues',
        'Développer une interface visuellement captivante reflétant le côté exotique',
        "Optimiser l'expérience utilisateur pour différents marchés internationaux",
        'Mettre en valeur la qualité premium des produits',
        'Assurer une performance optimale sur tous les appareils',
        'Intégrer une gestion de contenu facile pour les mises à jour multilingues',
        'Créer une identité visuelle forte et cohérente',
      ],
    },
    sections: [
      {
        title: 'UNE EXPÉRIENCE MULTILINGUE',
        subtitle: 'ACCESSIBLE À TOUS',
        content:
          'Nous avons développé un système de gestion multilingue sophistiqué permettant une navigation fluide entre 7 langues. Chaque langue a été soigneusement adaptée pour respecter les nuances culturelles et offrir une expérience authentique.',
        images: ['https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/crustys.png'],
        layout: 'single',
      },
      {
        title: 'DESIGN VISUEL CAPTIVANT',
        subtitle: "L'EXCELLENCE DES PRODUITS EXOTIQUES",
        content:
          "Notre équipe de designers UI/UX d'élite a créé une interface visuellement époustouflante qui met en valeur la beauté et la qualité des fruits exotiques. Chaque élément du design a été pensé pour évoquer l'exotisme et le premium.",
        images: ['https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/crustys%20(1).png'],
        layout: 'single',
      },
    ],
  },
  coride: {
    title: 'CoRide',
    subtitle: 'APPLICATION DE MOBILITÉ',
    logo: 'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/logo-gold.png',
    heroVideo: 'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/CoRide/CoRideVideo.mp4',
    client: 'CoRide',
    date: '2024',
    role: 'Développement Mobile & Web Full Stack',
    collaborators: [
      { name: 'Mobile Team', role: 'Flutter Development' },
      { name: 'Backend Team', role: 'Node.js Development' },
      { name: 'Web Team', role: 'Frontend Development' },
    ],
    description:
      'CoRide est une application de mobilité multi-services révolutionnaire. Notre équipe a développé une solution complète incluant une app mobile Flutter (transport privé, livraison, food delivery), un backend Node.js robuste et une refonte totale de leur site vitrine, créant un écosystème digital intégré et évolutif.',
    mandat: {
      title: 'MANDAT',
      content:
        "Développer un écosystème complet de mobilité multi-services pour CoRide, incluant une application mobile native performante, un backend robuste et scalable, ainsi qu'un site web vitrine moderne. La solution devait intégrer trois services majeurs : transport privé, livraison de colis et food delivery, le tout dans une interface unifiée et intuitive.",
    },
    objectifs: {
      title: 'OBJECTIFS',
      items: [
        'Développer une application mobile Flutter performante et fluide',
        'Créer un backend Node.js scalable et sécurisé',
        'Intégrer trois services distincts : transport, livraison et food delivery',
        "Assurer une synchronisation parfaite entre l'app et le backend",
      ],
    },
    sections: [
      {
        title: 'APPLICATION MOBILE FLUTTER',
        subtitle: 'PERFORMANCE ET FLUIDITÉ',
        content:
          "Nous avons développé une application mobile native avec Flutter, offrant des performances exceptionnelles et une expérience utilisateur fluide sur iOS et Android. L'application intègre trois services dans une interface intuitive et élégante.",
        images: [
          'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/imagesmobileapp/659b09824ee19afb14262ffe_yield-studio-app-levitation-p-800.webp',
          'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/imagesmobileapp/appmobile%20image%20du%20bloc%201.png',
        ],
        layout: 'two-column',
      },
      {
        title: 'BACKEND ROBUSTE',
        subtitle: 'NODE.JS & ARCHITECTURE SCALABLE',
        content:
          'Notre équipe backend a développé une architecture robuste avec Node.js, capable de gérer des milliers de requêtes simultanées. Le système inclut la gestion en temps réel des courses, la géolocalisation, les notifications push et un système de paiement sécurisé.',
        images: ['https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/data_management_illustration.svg'],
        layout: 'single',
      },
      {
        title: 'SITE VITRINE MODERNE',
        subtitle: 'REFONTE COMPLÈTE',
        content:
          "Nous avons entièrement repensé le site web de CoRide avec une approche moderne et engageante. Le nouveau site met en avant les trois services offerts, facilite les téléchargements de l'app et offre une expérience utilisateur exceptionnelle.",
        images: ['https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/imagesmobileapp/images%20bloc2%20app%20mobile.png'],
        layout: 'single',
      },
    ],
  },
};

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const caseStudy = caseStudies[slug];
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play video when component mounts
  useEffect(() => {
    if (videoRef.current && caseStudy.heroVideo) {
      videoRef.current.play().catch(() => {
        // Ignore play promise rejection
      });
    }
  }, [caseStudy.heroVideo]);

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-rotate {
          animation: rotate 10s linear infinite;
        }
        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.8);
          }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
      {/* Navigation */}
      {/* Navbar removed */}

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        {/* Squares Background */}
        <div className="absolute inset-0 z-0">
          <Squares
            direction="diagonal"
            speed={0.2}
            squareSize={50}
            borderColor="#e2e8f0"
            hoverFillColor={colors.secondary}
          />
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 z-1">
          <div className="absolute top-40 right-20 w-24 h-24 border border-gray-400 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-gray-400 rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10 pt-6 md:pt-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1
                className="text-6xl md:text-7xl font-bold mb-2"
                style={{
                  fontFamily: 'Hubot Sans, Inter, sans-serif',
                  color: colors.primary,
                }}
              >
                {caseStudy.title}
              </h1>
              <p
                className="text-2xl font-light tracking-wider"
                style={{ color: colors.secondary }}
              >
                {caseStudy.subtitle}
              </p>
            </div>
            {/* Replace small circle logo with CircularText badge */}
            <div className="relative w-30 h-30 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="absolute inset-0">
                <CircularText
                  text={`${caseStudy.title} • PROGIX • `}
                  className="case-study-circular-text"
                />
              </div>
            </div>
          </div>

          {/* Hero Image/Video */}
          <div className="relative h-[400px] md:h-[500px] mb-16 overflow-hidden rounded-lg shadow-2xl">
            {caseStudy.heroVideo ? (
              <video
                ref={videoRef}
                src={caseStudy.heroVideo}
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={caseStudy.heroImage || '/images/placeholder.jpg'}
                alt={caseStudy.title}
                fill
                className="object-cover"
              />
            )}
          </div>

          {/* Project Info Grid */}
          <div className="grid md:grid-cols-2 gap-16 mb-20 max-w-5xl mx-auto">
            {/* Left Column - Project Details */}
            <div className="space-y-8">
              <div>
                <h3
                  className="text-sm font-semibold uppercase mb-2"
                  style={{ color: colors.secondary }}
                >
                  Client
                </h3>
                <p
                  className="text-lg font-semibold"
                  style={{ color: colors.primary }}
                >
                  {caseStudy.client}
                </p>
              </div>
              <div>
                <h3
                  className="text-sm font-semibold uppercase mb-2"
                  style={{ color: colors.secondary }}
                >
                  Date
                </h3>
                <p
                  className="text-lg font-semibold"
                  style={{ color: colors.primary }}
                >
                  {caseStudy.date}
                </p>
              </div>
              <div>
                <h3
                  className="text-sm font-semibold uppercase mb-2"
                  style={{ color: colors.secondary }}
                >
                  Rôle
                </h3>
                <p
                  className="text-lg font-semibold"
                  style={{ color: colors.primary }}
                >
                  {caseStudy.role}
                </p>
              </div>
              <div>
                <h3
                  className="text-sm font-semibold uppercase mb-2"
                  style={{ color: colors.secondary }}
                >
                  Collaborateurs
                </h3>
                <div className="flex space-x-3">
                  {caseStudy.collaborators.map(
                    (collab: Collaborator, idx: number) => (
                      <div key={idx} className="relative group">
                        <div
                          className="w-14 h-14 rounded-full border-3 overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                          style={{ borderColor: colors.secondary }}
                        >
                          {collab.image ? (
                            <Image
                              src={collab.image}
                              alt={collab.name}
                              width={56}
                              height={56}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div
                              className="w-full h-full flex items-center justify-center font-bold text-white text-sm"
                              style={{ backgroundColor: colors.secondary }}
                            >
                              {collab.name.charAt(0)}
                            </div>
                          )}
                        </div>

                        {/* Tooltip with name */}
                        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                          <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                            <div className="font-semibold">{collab.name}</div>
                            <div className="text-gray-300">{collab.role}</div>
                            {/* Arrow */}
                            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Description */}
            <div>
              <p
                className="text-lg leading-relaxed font-medium"
                style={{ color: colors.tertiary }}
              >
                {caseStudy.description}
              </p>
            </div>
          </div>

          {/* Curved Loop Text at bottom of hero section */}
          <div className="relative mt-16 z-10">
            <CurvedLoop
              marqueeText="FAHE CRM • PROGIX • UNE FIRME DE DÉVELOPPEMENT LOGICIEL FIÈREMENT MONTRÉALAISE • "
              speed={2}
              curveAmount={300}
              direction="left"
              interactive={true}
              className="text-black"
            />
          </div>
        </div>
      </div>

      {/* Mission Section - Only for FAHE CRM */}
      {caseStudy.heroVideo && (
        <div className="relative py-20 overflow-hidden bg-gray-50">
          {/* Background Pattern */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-white/70"></div>
          </div>

          {/* Content Layout */}
          <div className="relative z-10 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                {/* Left Side - Title */}
                <div className="text-left">
                  <div className="inline-block mb-6">
                    <span className="text-sm font-bold uppercase tracking-wider text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
                      {caseStudy.mandat.title}
                    </span>
                  </div>

                  <h2
                    className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
                    style={{
                      fontFamily: 'Hubot Sans, Inter, sans-serif',
                      color: '#0A2456',
                    }}
                  >
                    Notre
                    <br />
                    Mission
                  </h2>

                  {/* Decorative Line */}
                  <div
                    className="w-20 h-1 mb-8"
                    style={{
                      backgroundColor: colors.secondary,
                    }}
                  ></div>
                </div>

                {/* Right Side - Content */}
                <div className="relative">
                  {/* Text with underline accent */}
                  <div className="relative">
                    <p className="text-xl md:text-2xl leading-relaxed text-gray-800 font-light mb-8">
                      {caseStudy.mandat.content}
                    </p>

                    {/* Decorative underline */}
                    <div
                      className="absolute -bottom-4 left-0 w-24 h-0.5"
                      style={{
                        backgroundColor: colors.secondary,
                      }}
                    ></div>
                  </div>

                  {/* Key points as floating elements */}
                  <div className="mt-12 space-y-6">
                    <div className="flex items-start space-x-4 group">
                      <div
                        className="w-2 h-2 rounded-full mt-3 group-hover:scale-125 transition-transform duration-300"
                        style={{
                          backgroundColor: colors.secondary,
                        }}
                      ></div>
                      <p className="text-gray-700 font-medium">
                        Solution CRM complète et moderne
                      </p>
                    </div>

                    <div className="flex items-start space-x-4 group">
                      <div
                        className="w-2 h-2 rounded-full mt-3 group-hover:scale-125 transition-transform duration-300"
                        style={{
                          backgroundColor: colors.secondary,
                        }}
                      ></div>
                      <p className="text-gray-700 font-medium">
                        Expérience utilisateur repensée et intuitive
                      </p>
                    </div>

                    <div className="flex items-start space-x-4 group">
                      <div
                        className="w-2 h-2 rounded-full mt-3 group-hover:scale-125 transition-transform duration-300"
                        style={{
                          backgroundColor: colors.secondary,
                        }}
                      ></div>
                      <p className="text-gray-700 font-medium">
                        Identité de marque FAHE Automotive mise en valeur
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Decorative Elements */}
            </div>
          </div>
        </div>
      )}

      {/* Traditional Mandat Section - For other case studies */}
      {!caseStudy.heroVideo && (
        <div
          className="text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
          style={{ backgroundColor: colors.primary }}
        >
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute top-0 right-0 w-96 h-96 rounded-full"
              style={{ backgroundColor: colors.secondary }}
            ></div>
            <div
              className="absolute bottom-0 left-0 w-72 h-72 rounded-full"
              style={{ backgroundColor: colors.secondary }}
            ></div>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-5xl font-bold mb-6">
                  {caseStudy.mandat.title}
                </h2>
              </div>
              <div>
                <p className="text-lg leading-relaxed text-white/90 font-medium">
                  {caseStudy.mandat.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Impact & Résultats - clean white section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Side - Content */}
            <div className="relative">
              <ul
                className="space-y-6 text-lg leading-relaxed list-none"
                style={{ color: colors.tertiary }}
              >
                <li className="flex items-start space-x-4 group">
                  <div
                    className="flex-shrink-0 w-3 h-3 rounded-full mt-2 group-hover:scale-125 transition-transform duration-300"
                    style={{ backgroundColor: colors.primary }}
                  ></div>
                  <div className="flex-1">
                    <p className="font-medium group-hover:translate-x-2 transition-transform duration-300">
                      Vue complète et centralisée des stocks et des historiques.
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-4 group">
                  <div
                    className="flex-shrink-0 w-3 h-3 rounded-full mt-2 group-hover:scale-125 transition-transform duration-300"
                    style={{ backgroundColor: colors.primary }}
                  ></div>
                  <div className="flex-1">
                    <p className="font-medium group-hover:translate-x-2 transition-transform duration-300">
                      60% d'absences en moins grâce aux rappels automatiques
                      (SMS / email).
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-4 group">
                  <div
                    className="flex-shrink-0 w-3 h-3 rounded-full mt-2 group-hover:scale-125 transition-transform duration-300"
                    style={{ backgroundColor: colors.primary }}
                  ></div>
                  <div className="flex-1">
                    <p className="font-medium group-hover:translate-x-2 transition-transform duration-300">
                      Processus d'accueil et de vente simplifiés, temps de
                      traitement réduit.
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-4 group">
                  <div
                    className="flex-shrink-0 w-3 h-3 rounded-full mt-2 group-hover:scale-125 transition-transform duration-300"
                    style={{ backgroundColor: colors.primary }}
                  ></div>
                  <div className="flex-1">
                    <p className="font-medium group-hover:translate-x-2 transition-transform duration-300">
                      Données client sécurisées et accessibles par
                      autorisations.
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-4 group">
                  <div
                    className="flex-shrink-0 w-3 h-3 rounded-full mt-2 group-hover:scale-125 transition-transform duration-300"
                    style={{ backgroundColor: colors.primary }}
                  ></div>
                  <div className="flex-1">
                    <p className="font-medium group-hover:translate-x-2 transition-transform duration-300">
                      Indicateurs clairs pour piloter les opérations au
                      quotidien.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right Side - Title */}
            <div className="text-left ml-62">
              <div className="inline-block mb-6">
                <span className="text-sm font-bold uppercase tracking-wider text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
                  RÉSULTATS
                </span>
              </div>

              <h2
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
                style={{
                  fontFamily: 'Hubot Sans, Inter, sans-serif',
                  color: colors.primary,
                }}
              >
                Impact &
                <br />
                Résultats
              </h2>

              {/* Decorative Line */}
              <div
                className="w-20 h-1 mb-8"
                style={{
                  backgroundColor: colors.secondary,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Objectifs Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-36 items-center">
            {/* Left Side - Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="relative h-[640px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/1757001640677.jpg"
                    alt="Objectifs FAHE CRM"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div
                  className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-xl animate-pulse"
                  style={{
                    background: `linear-gradient(to bottom right, ${colors.secondary}33, ${colors.quaternary}33)`,
                  }}
                ></div>
                <div
                  className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full blur-xl animate-pulse delay-1000"
                  style={{
                    background: `linear-gradient(to bottom right, ${colors.quaternary}33, ${colors.primary}33)`,
                  }}
                ></div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="order-1 lg:order-2">
              <div className="mb-8">
                <div className="inline-block mb-4">
                  <span
                    className="text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full"
                    style={{
                      color: colors.secondary,
                      backgroundColor: `${colors.primary}15`,
                    }}
                  >
                    {caseStudy.objectifs.title}
                  </span>
                </div>

                <h2
                  className="text-4xl md:text-5xl font-bold mb-6"
                  style={{
                    color: colors.primary,
                    fontFamily: 'Hubot Sans, Inter, sans-serif',
                  }}
                >
                  Nos objectifs
                  <br />
                  <span
                    style={{
                      color: colors.primary,
                    }}
                  >
                    stratégiques
                  </span>
                </h2>

                <div
                  className="w-20 h-1 mb-8"
                  style={{
                    backgroundColor: colors.secondary,
                  }}
                ></div>
              </div>

              <div className="space-y-6">
                {caseStudy.objectifs.items.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-start group">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 mr-4 group-hover:scale-110 transition-transform duration-300"
                      style={{
                        backgroundColor: colors.secondary,
                      }}
                    >
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p
                        className="text-lg font-medium group-hover:translate-x-2 transition-transform duration-300"
                        style={{ color: colors.tertiary }}
                      >
                        {item}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom accent */}
              <div
                className="mt-12 p-6 rounded-xl border-l-4"
                style={{
                  backgroundColor: `${colors.primary}10`,
                  borderColor: colors.primary,
                }}
              >
                <p
                  className="font-medium italic"
                  style={{ color: colors.tertiary }}
                >
                  &ldquo;Chaque objectif a été soigneusement défini pour
                  garantir le succès du projet FAHE CRM et maximiser
                  l&apos;impact sur leur activité.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technologies & Stack Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        {/* Decorative background elements (consistent with ServicesSection) */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          {/* Blurry circles */}
          <div
            className="absolute top-10 right-12 w-80 h-80 rounded-full blur-3xl"
            style={{ backgroundColor: `${colors.primary}15` }}
          ></div>
          <div
            className="absolute bottom-10 left-16 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: `${colors.secondary}15` }}
          ></div>
          <div
            className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full blur-3xl"
            style={{ backgroundColor: `${colors.primary}10` }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="mb-20">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                / TECHNOLOGIES
              </span>
            </div>

            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
              style={{
                fontFamily: 'Hubot Sans, Inter, sans-serif',
                color: colors.primary,
              }}
            >
              Stack Technique &
              <br />
              <span style={{ color: colors.secondary }}>Architecture</span>
            </h2>

            <p
              className="text-lg leading-relaxed max-w-3xl font-semibold"
              style={{ color: colors.tertiary }}
            >
              Une architecture robuste et moderne, conçue pour la scalabilité,
              la performance et la maintenabilité. Découvrez les technologies
              qui alimentent nos solutions.
            </p>
          </div>

          {/* Tech Stack Grid - 4 columns */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Frontend */}
            <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100/50">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: `${colors.primary}15` }}
              >
                <svg
                  className="w-7 h-7"
                  style={{ color: colors.primary }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3
                className="text-lg font-bold mb-4 uppercase tracking-wide"
                style={{ color: colors.primary }}
              >
                Frontend
              </h3>
              <div className="space-y-3">
                {[
                  'React 18.x',
                  'Next.js 14.x',
                  'TypeScript 5.x',
                  'Tailwind CSS',
                ].map((tech, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span
                      className="text-sm font-medium"
                      style={{ color: colors.tertiary }}
                    >
                      {tech}
                    </span>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-gray-300"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100/50">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: `${colors.primary}15` }}
              >
                <svg
                  className="w-7 h-7"
                  style={{ color: colors.primary }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                  />
                </svg>
              </div>
              <h3
                className="text-lg font-bold mb-4 uppercase tracking-wide"
                style={{ color: colors.primary }}
              >
                Backend
              </h3>
              <div className="space-y-3">
                {[
                  'Node.js 20.x',
                  'Express.js 4.x',
                  'PostgreSQL 15.x',
                  'Redis 7.x',
                ].map((tech, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span
                      className="text-sm font-medium"
                      style={{ color: colors.tertiary }}
                    >
                      {tech}
                    </span>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-gray-300"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile */}
            <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100/50">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: `${colors.primary}15` }}
              >
                <svg
                  className="w-7 h-7"
                  style={{ color: colors.primary }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3
                className="text-lg font-bold mb-4 uppercase tracking-wide"
                style={{ color: colors.primary }}
              >
                Mobile
              </h3>
              <div className="space-y-3">
                {['Flutter 3.x', 'Dart 3.x', 'Firebase SDK', 'Google Maps'].map(
                  (tech, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span
                        className="text-sm font-medium"
                        style={{ color: colors.tertiary }}
                      >
                        {tech}
                      </span>
                      <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-gray-300"></div>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* DevOps & Tools */}
            <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100/50">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: `${colors.primary}15` }}
              >
                <svg
                  className="w-7 h-7"
                  style={{ color: colors.primary }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3
                className="text-lg font-bold mb-4 uppercase tracking-wide"
                style={{ color: colors.primary }}
              >
                DevOps & Outils
              </h3>
              <div className="space-y-3">
                {[
                  'Docker 24.x',
                  'AWS Cloud',
                  'GitHub Actions',
                  'Vercel Deploy',
                ].map((tech, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span
                      className="text-sm font-medium"
                      style={{ color: colors.tertiary }}
                    >
                      {tech}
                    </span>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-gray-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Technical Highlights - Single Column */}
          <div>
            {/* Left - Content */}
            <div>
              <h3
                className="text-3xl md:text-4xl font-bold mb-8 leading-tight"
                style={{ color: colors.primary }}
              >
                Défis Techniques &
                <br />
                <span style={{ color: colors.secondary }}>
                  Solutions Innovantes
                </span>
              </h3>

              <div className="space-y-6 mb-12">
                {[
                  {
                    title: 'Performance & Scalabilité',
                    desc: "Architecture microservices avec cache Redis et optimisation des requêtes pour gérer des milliers d'utilisateurs simultanément.",
                  },
                  {
                    title: 'Sécurité Renforcée',
                    desc: 'Authentification JWT, chiffrement des données sensibles, et conformité RGPD avec audit trails complets.',
                  },
                  {
                    title: 'Intégration Temps Réel',
                    desc: 'WebSocket pour les notifications push, géolocalisation en temps réel, et synchronisation multi-appareils.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div
                      className="flex-shrink-0 w-2 h-2 rounded-full mt-2"
                      style={{ backgroundColor: colors.secondary }}
                    ></div>
                    <div>
                      <h4
                        className="font-bold mb-2"
                        style={{ color: colors.primary }}
                      >
                        {item.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats - Below Content */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { metric: '99.9%', label: 'Uptime' },
                  { metric: '< 200ms', label: 'Response Time' },
                  { metric: '10k+', label: 'Concurrent Users' },
                  { metric: '0 Critical', label: 'Security Issues' },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 text-center hover:border-opacity-50 transition-colors duration-300"
                    style={{ borderColor: colors.secondary }}
                  >
                    <div
                      className="text-3xl md:text-4xl font-bold mb-2"
                      style={{ color: colors.primary }}
                    >
                      {stat.metric}
                    </div>
                    <div className="text-sm text-gray-600 uppercase font-semibold tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Blog Style */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="p-8 md:p-12 bg-gradient-to-r from-[#1a3a52]/30 to-[#2d5369]/30 rounded-2xl border border-[#2d5369]/20 relative overflow-hidden group">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2d5369]/0 via-[#2d5369]/10 to-[#2d5369]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

            <div className="relative z-10">
              <h3
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: colors.primary }}
              >
                Prêt à transformer votre projet ?
              </h3>
              <p
                className="text-lg mb-8 opacity-90"
                style={{ color: colors.tertiary }}
              >
                Découvrez comment notre expertise en architecture technique et
                développement full-stack peut propulser votre vision en réalité.
              </p>
              <Link href="/contact">
                <AnimatedButton
                  text="Démarrer un projet"
                  textColor="white"
                  borderColor={colors.primary}
                  circleColor={colors.primary}
                  arrowColor="white"
                  hoverTextColor="white"
                  hoverArrowColor="white"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

