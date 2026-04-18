'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Media } from './LaptopFrame';

type Props = {
  media: Media;
  alt: string;
  sizes?: string;
  fit?: 'cover' | 'contain';
  priority?: boolean;
  className?: string;
};

export default function SmartMedia({
  media,
  alt,
  sizes,
  fit = 'cover',
  priority = false,
  className = '',
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const fitClass = fit === 'cover' ? 'object-cover' : 'object-contain';

  return (
    <>
      <div
        aria-hidden
        className={`absolute inset-0 transition-opacity duration-300 ${
          loaded ? 'opacity-0' : 'opacity-100'
        } bg-[linear-gradient(110deg,#181818_20%,#2a2a2a_40%,#181818_60%)] bg-[length:200%_100%] animate-[shimmer_1.4s_linear_infinite]`}
      />
      {media.kind === 'video' ? (
        <video
          src={media.src}
          className={`absolute inset-0 h-full w-full ${fitClass} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          muted
          loop
          autoPlay
          playsInline
          controls={false}
          aria-label={alt}
          onLoadedData={() => setLoaded(true)}
          onCanPlay={() => setLoaded(true)}
        />
      ) : (
        <Image
          src={media.src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`${fitClass} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
        />
      )}
    </>
  );
}
