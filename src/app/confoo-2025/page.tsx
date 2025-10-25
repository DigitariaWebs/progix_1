'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { colors } from '@/config/colors';
import CircularGallery from '@/components/CircularGallery';

export default function ConFoo2025Page() {
  // Images pour le CircularGallery
  const galleryItems = [
    { image: '/CONFOO2025/WhatsApp-Image-2025-03-03-at-02.33.54_2e01351d-1024x768 (1).jpg', text: 'ConFoo 2025' },
    { image: '/CONFOO2025/WhatsApp-Image-2025-03-03-at-02.33.55_0254ee6f.jpg', text: 'Conférence' },
    { image: '/CONFOO2025/WhatsApp-Image-2025-03-03-at-02.33.55_3e600391.jpg', text: 'Équipe Progix' },
    { image: '/CONFOO2025/WhatsApp-Image-2025-03-03-at-02.33.57_7dc632c5.jpg', text: 'Développement' },
    { image: '/CONFOO2025/WhatsApp-Image-2025-03-03-at-02.33.57_883147e9-768x1024 (1).jpg', text: 'Innovation' },
    { image: '/CONFOO2025/volunteers (2).png', text: 'Volontaires' },
    { image: '/CONFOO2025/2.jpg', text: 'Moments forts' },
    { image: '/CONFOO2025/3.jpg', text: 'Réseautage' },
    { image: '/CONFOO2025/5.jpg', text: 'Partage' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/CONFOO2025/WhatsApp-Image-2025-03-03-at-02.33.54_2e01351d-1024x768%20(1).jpg"
            alt="ConFoo 2025 Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            ConFoo 2025
          </h1>
          <p className="text-xl md:text-2xl font-bold">
            Progix en mission à la conférence des développeurs full-stack !
          </p>
        </div>
      </section>

      {/* Retour sur notre expérience */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ color: colors.primary }}>
                Retour sur notre expérience à ConFoo 2025
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Du 26 au 28 février 2025, l&apos;équipe Progix a eu l&apos;honneur de participer à ConFoo 2025, 
                  l&apos;un des plus grands rassemblements de développeurs full-stack, d&apos;enthousiastes de l&apos;IA 
                  et de professionnels du web au Canada.
                </p>
                <p>
                  Cette conférence représente pour nous une opportunité unique de rester à la pointe des dernières 
                  technologies et tendances du développement logiciel. Chez Progix, nous croyons fermement que 
                  l&apos;excellence technique passe par une veille technologique constante.
                </p>
                <p>
                  Notre objectif était double : découvrir les nouvelles tendances qui façonneront l&apos;avenir du 
                  développement et partager notre expertise avec la communauté de développeurs québécoise et internationale.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/CONFOO2025/WhatsApp-Image-2025-03-03-at-02.33.55_0254ee6f.jpg"
                  alt="ConFoo 2025 Conference"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ConFoo, c'est quoi ? */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ color: colors.primary }}>
            ConFoo, c&apos;est quoi ?
          </h2>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              ConFoo est une conférence annuelle de référence pour les experts en développement logiciel et en 
              technologies. Reconnue pour la qualité exceptionnelle de ses conférences et la diversité de ses sujets, 
              elle couvre tous les aspects du développement moderne.
            </p>
            <p>
              De la programmation web au cloud computing, en passant par l&apos;intelligence artificielle, les performances 
              et la sécurité, ConFoo offre une plateforme unique pour les présentations techniques, les démonstrations 
              pratiques, les ateliers interactifs et le réseautage avec des développeurs, architectes logiciels et CTO 
              du monde entier.
            </p>
          </div>
        </div>
      </section>

      {/* L'équipe Progix en action */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/CONFOO2025/WhatsApp-Image-2025-03-03-at-02.33.55_3e600391.jpg"
                  alt="Équipe Progix à ConFoo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ color: colors.primary }}>
                L&apos;équipe Progix en action
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Notre participation à ConFoo 2025 ne s&apos;est pas limitée à assister aux conférences. 
                  L&apos;équipe Progix s&apos;est activement impliquée dans l&apos;écosystème de la conférence.
                </p>
                <p>
                  Nous avons échangé avec des développeurs de tous horizons, testé de nouveaux outils et frameworks, 
                  participé à des ateliers interactifs et rencontré de potentiels partenaires pour renforcer notre réseau 
                  professionnel. Ces interactions enrichissantes nous permettent de rester connectés aux réalités du terrain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ce que cela signifie pour nos clients */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ color: colors.primary }}>
            Ce que cela signifie pour nos clients
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Les connaissances acquises lors de ConFoo 2025 seront intégrées dans nos services, nous permettant 
            d&apos;offrir des solutions encore plus avancées en développement sur mesure, intégration d&apos;IA et 
            performance d&apos;applications. Nos clients bénéficient directement de cette veille technologique constante.
          </p>
        </div>
      </section>

      {/* Notre immersion à ConFoo 2025 */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ color: colors.primary }}>
              Notre immersion à ConFoo 2025
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Trois jours intenses d&apos;absorption de connaissances et d&apos;échanges avec d&apos;autres passionnés. 
              Voici ce que nous avons retenu de notre expérience :
            </p>
          </div>

          <div className="space-y-16">
            {/* L'intelligence artificielle */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6" style={{ color: colors.secondary }}>
                  L&apos;intelligence artificielle et le futur du développement
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  L&apos;IA est désormais au cœur du développement logiciel. Les outils d&apos;automatisation, 
                  l&apos;assistance au code (comme GitHub Copilot) et les solutions basées sur l&apos;IA pour 
                  améliorer la productivité des développeurs et la qualité du code sont devenus incontournables. 
                  Chez Progix, nous intégrons ces technologies pour optimiser nos processus de développement.
                </p>
              </div>
              <div className="relative">
                <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src="https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/CONFOO2025/WhatsApp-Image-2025-03-03-at-02.33.57_7dc632c5.jpg"
                    alt="IA et développement"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Développement responsable */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src="https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/CONFOO2025/WhatsApp-Image-2025-03-03-at-02.33.57_883147e9-768x1024%20(1).jpg"
                    alt="Développement responsable"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-3xl font-bold mb-6" style={{ color: colors.secondary }}>
                  Vers un développement plus responsable
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  L&apos;impact écologique du numérique est devenu une préoccupation majeure. Les conférences ont 
                  mis l&apos;accent sur l&apos;optimisation des applications pour réduire l&apos;empreinte carbone 
                  et sur les choix architecturaux qui équilibrent performance et efficacité énergétique. 
                  Chez Progix, nous intégrons ces considérations dans tous nos projets.
                </p>
              </div>
            </div>

            {/* Frameworks et tendances */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6" style={{ color: colors.secondary }}>
                  Les frameworks et tendances à surveiller
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Les évolutions dans les frameworks JavaScript, les architectures MVC modernes, les solutions 
                  serverless, les démonstrations de Node.js 20, les performances optimisées de React 19 et 
                  les microservices pour applications web et mobiles ont été au cœur des discussions. 
                  Ces technologies façonnent l&apos;avenir du développement que nous pratiquons chez Progix.
                </p>
              </div>
              <div className="relative">
                <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src="https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/CONFOO2025/volunteers%20(2).png"
                    alt="Frameworks et tendances"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos moments forts en images */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: colors.primary }}>
              Nos moments forts en images
            </h2>
            <div className="text-4xl mb-4">📸</div>
            <p className="text-lg text-gray-600">
              {galleryItems.length} photos de notre expérience ConFoo 2025
            </p>
          </div>

          {/* Circular Gallery */}
          <div style={{ height: '600px', position: 'relative' }}>
            <CircularGallery 
              items={galleryItems}
              bend={3} 
              textColor="#ffffff" 
              borderRadius={0.05} 
              scrollEase={0.02}
            />
          </div>

          {/* Instructions */}
          <div className="flex justify-center items-center mt-8 space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>{galleryItems.length} photos</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-500"></div>
              <span>Scroll pour naviguer</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-1000"></div>
              <span>Galerie circulaire 3D</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Prêt à développer votre projet avec les dernières technologies ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Bénéficiez de notre expertise acquise lors de ConFoo 2025 pour votre prochain projet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Démarrer un projet
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-gray-900 transition-colors duration-300"
            >
              Voir nos réalisations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
