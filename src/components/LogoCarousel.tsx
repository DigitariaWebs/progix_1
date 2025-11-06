'use client';

import React from 'react';
import Image from 'next/image';

const LogoCarousel = () => {
  // Liste des logos avec leurs informations
  const logos = [
    {
      src: 'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/barbershop-logo.png',
      alt: 'Barbershop',
    },
    {
      src: 'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/crustys.png',
      alt: 'Crustys',
    },
    {
      src: 'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/LogoFr.webp',
      alt: 'LogoFr',
    },
    {
      src: 'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/logoibox.png',
      alt: 'iBox',
    },
    {
      src: 'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/logoaquaa.png',
      alt: 'Aquaa',
    },
    {
      src: 'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/logo-gold.png',
      alt: 'Gold Logo',
    },
    {
      src: 'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/LogoEle-1024x724.webp',
      alt: 'Ele Logo',
    },
    {
      src: 'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/rp-logo-1.png',
      alt: 'RP Logo',
    },
    {
      src: 'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/logo%20(1).png',
      alt: 'Logo 1',
    },
  ];

  return (
    <div className="mt-20 pt-16 border-t border-gray-200/50">
      <div className="relative overflow-hidden">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50/30 via-white/90 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50/30 via-white/90 to-transparent z-10"></div>

        {/* Scrolling Container */}
        <div className="flex animate-scroll items-center gap-16 opacity-60 py-8">
          {/* First Set */}
          {logos.map((logo, index) => (
            <div
              key={`first-${index}`}
              className="flex items-center justify-center h-12 flex-shrink-0"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={48}
                className="h-8 w-auto object-contain filter sepia-0 saturate-100 hue-rotate-210deg brightness-50 contrast-150"
              />
            </div>
          ))}

          {/* Second Set for Seamless Loop */}
          {logos.map((logo, index) => (
            <div
              key={`second-${index}`}
              className="flex items-center justify-center h-12 flex-shrink-0"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={48}
                className="h-8 w-auto object-contain filter sepia-0 saturate-100 hue-rotate-210deg brightness-50 contrast-150"
              />
            </div>
          ))}

          {/* Third Set for Seamless Loop */}
          {logos.map((logo, index) => (
            <div
              key={`third-${index}`}
              className="flex items-center justify-center h-12 flex-shrink-0"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={48}
                className="h-8 w-auto object-contain filter sepia-0 saturate-100 hue-rotate-210deg brightness-50 contrast-150"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;
