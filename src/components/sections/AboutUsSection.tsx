'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { colors } from '@/config/colors';
import AnimatedButton from '../AnimatedButton';

const AboutUsSection = () => {
  // Simple right-side image rotation (lightweight crossfade)
  const rightImages = [
    'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/imagesculture/Picsart_25-09-29_19-39-01-194.jpg',
    'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/imagesculture/Picsart_25-09-29_19-34-34-749.jpg',
    'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/imagesculture/Picsart_25-09-29_19-39-46-733.jpg',
    'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/imagesculture/Picsart_25-09-29_19-38-30-170.jpg',
    'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/imagesculture/Picsart_25-09-29_19-37-55-797.jpg',
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % rightImages.length);
    }, 3500);
    return () => clearInterval(id);
  }, [rightImages.length]);

  return (
    <section className="bg-white pb-20 mt-5 pt-24 md:pt-32">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              UNE PETITE ÉQUIPE
              <br />
              AUX{' '}
              <span style={{ color: colors.secondary }}>
                GRANDES
                <br />
                AMBITIONS
              </span>
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed font-semibold mb-8">
              Progix tire son nom de notre passion pour la programmation et
              l&apos;innovation technologique. Notre équipe de 9 ingénieurs
              logiciels, majoritairement diplômés de l&apos;UQAM, forme un
              collectif soudé où la collaboration et l&apos;excellence technique
              sont au cœur de notre approche.
            </p>

            <div className="flex items-center space-x-6">
              <style jsx>{`
                .custom-animated-btn :global(.animated-button) {
                  background-color: ${colors.secondary} !important;
                }
                .custom-animated-btn-outline :global(.animated-button) {
                  background-color: transparent !important;
                }
              `}</style>
              <AnimatedButton
                text="Notre équipe"
                textColor={colors.secondary}
                borderColor={colors.secondary}
                circleColor={colors.secondary}
                arrowColor="#ffffff"
                hoverTextColor="#ffffff"
                hoverArrowColor="#ffffff"
                className="custom-animated-btn"
              />
            </div>
          </div>

          {/* Right Simple Image Rotator */}
          <div className="relative h-96 rounded-3xl overflow-hidden">
            {rightImages.map((src, index) => (
              <Image
                key={src}
                src={src}
                alt="Équipe PROGIX"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={`object-cover transition-opacity duration-700 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                priority={index === 0}
              />
            ))}
          </div>
        </div>

        {/* Stats replaced by simple statement */}
        <div className="mt-20 text-center">
          <p className="text-xl md:text-2xl font-semibold text-gray-700">
            PROGIX, c’est plus de{' '}
            <span className="font-bold text-gray-900">60 projets</span> depuis
            2021
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
