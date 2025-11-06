'use client';

import React from 'react';
import Image from 'next/image';
import TeamSection from '@/components/sections/TeamSection';
import EquipeHero from '@/components/sections/EquipeHero';

const TeamPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <EquipeHero />

      {/* Team grid block */}
      <TeamSection />

      {/* Subtle separator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16">
        <div className="border-t border-gray-200/70" />
      </div>

      {/* Notre histoire */}
      <section className="w-full bg-white py-12 sm:py-16 px-4 sm:px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Corner label */}
          <div className="mb-4 sm:mb-6">
            <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
              / NOTRE HISTOIRE
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-start">
            {/* Text */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Notre histoire
              </h2>
              <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed max-w-2xl text-justify text-sm sm:text-base">
                <p>
                  Tout a commencé sur les bancs de l’université. Deux étudiants
                  en génie logiciel, animés par la même passion du code et du
                  défi, décident un jour de transformer leurs compétences en
                  quelque chose de concret. Après seulement un an et demi de
                  baccalauréat, ils se sentent prêts à entreprendre et lancent,
                  presque par jeu, une publication sur Facebook : « Création de
                  sites web à petits prix ».
                </p>
                <p>
                  Quelques jours plus tard, un premier client leur fait
                  confiance. 900 $. Leur tout premier mandat. Leur tout premier
                  site web. Et surtout, leur première victoire. Ce projet marque
                  le début d’une aventure entrepreneuriale où chaque ligne de
                  code devient une leçon, chaque client une opportunité de
                  grandir.
                </p>
                <p>
                  Motivés par cette réussite, ils décident d’approfondir leurs
                  connaissances en développement web, en marketing et en
                  prospection. Les mandats s’enchaînent, la réputation grandit,
                  et bientôt, l’équipe aussi.
                </p>

                {/* Mobile: Show last 3 paragraphs here */}
                <div className="lg:hidden space-y-4 sm:space-y-6 text-justify">
                  <p>
                    Un projet d’envergure les amène à recruter leur premier
                    ingénieur en intelligence artificielle, pour développer un
                    modèle de langage complexe (LLM). Puis vient le tour d’un
                    développeur mobile, expert en Flutter, pour un mandat
                    d’application que l’équipe voulait mener au plus haut
                    niveau.
                  </p>
                  <p>
                    Les années passent, les projets se multiplient, et l’esprit
                    d’équipe se renforce. En 2025, Islem rejoint l’aventure en
                    tant que designer UI/UX, apportant une touche créative et
                    humaine à chaque interface.
                  </p>
                  <p>
                    Aujourd’hui, Progix n’est plus seulement une idée née sur un
                    banc d’université. C’est une équipe soudée, passionnée et
                    ambitieuse, qui accompagne entreprises et entrepreneurs dans
                    la création de solutions web, mobiles et logicielles de
                    nouvelle génération.
                  </p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div
              className="w-full overflow-hidden mt-6 lg:mt-0"
              style={{ aspectRatio: '4 / 3' }}
            >
              <Image
                src="https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/CONFOO2025/WhatsApp-Image-2025-03-03-at-02.33.57_7dc632c5.jpg"
                alt="Notre histoire - PROGIX"
                width={1200}
                height={900}
                className="w-full h-full object-cover rounded-lg sm:rounded-xl"
                priority
              />
            </div>
          </div>

          {/* Desktop: Last 3 paragraphs under the image */}
          <div className="hidden lg:block mt-8 lg:mt-12">
            <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed text-justify text-sm sm:text-base">
              <p>
                Un projet d’envergure les amène à recruter leur premier
                ingénieur en intelligence artificielle, pour développer un
                modèle de langage complexe (LLM). Puis vient le tour d’un
                développeur mobile, expert en Flutter, pour un mandat
                d’application que l’équipe voulait mener au plus haut niveau.
              </p>
              <p>
                Les années passent, les projets se multiplient, et l’esprit
                d’équipe se renforce. En 2025, Islem rejoint l’aventure en tant
                que designer UI/UX, apportant une touche créative et humaine à
                chaque interface.
              </p>
              <p>
                Aujourd’hui, Progix n’est plus seulement une idée née sur un
                banc d’université. C’est une équipe soudée, passionnée et
                ambitieuse, qui accompagne entreprises et entrepreneurs dans la
                création de solutions web, mobiles et logicielles de nouvelle
                génération.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
