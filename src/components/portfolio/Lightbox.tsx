'use client';

import { useCallback, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import SmartMedia from './SmartMedia';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

type Props = {
  images: string[];
  index: number;
  portrait?: boolean;
  onClose: () => void;
};

export default function Lightbox({
  images,
  index,
  portrait = false,
  onClose,
}: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(index);
  const [snapCount, setSnapCount] = useState(images.length);
  const total = images.length;
  const canScroll = snapCount > 1;

  useEffect(() => {
    if (!api) return;
    api.scrollTo(index, true);
    const sync = () => {
      setCurrent(api.selectedScrollSnap());
      setSnapCount(api.scrollSnapList().length);
    };
    sync();
    api.on('select', sync);
    api.on('reInit', sync);
    return () => {
      api.off('select', sync);
      api.off('reInit', sync);
    };
  }, [api, index]);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.stopPropagation();
        scrollPrev();
      } else if (e.key === 'ArrowRight') {
        e.stopPropagation();
        scrollNext();
      }
    };
    window.addEventListener('keydown', handle, true);
    return () => window.removeEventListener('keydown', handle, true);
  }, [onClose, scrollPrev, scrollNext]);

  // Lock body scroll while mounted
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Mobile gallery: 1 → 2 → 3 columns based on viewport width.
  // Web gallery: peek multiple on mobile, full bleed on desktop.
  const itemBasis = portrait
    ? 'basis-full sm:basis-1/2 md:basis-1/3'
    : 'basis-[85%] sm:basis-full';

  const itemAspect = portrait
    ? 'aspect-[9/19.5] max-w-[260px]'
    : 'aspect-video max-w-[1200px]';

  const mediaClass = '';

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-black"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Galerie d'images"
    >
      <div
        className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-4"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-mono text-sm tabular-nums text-white/60">
          {String(current + 1).padStart(2, '0')}
          <span className="text-white/25">
            {' '}
            / {String(total).padStart(2, '0')}
          </span>
        </span>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label="Fermer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div
        className="flex min-h-0 flex-1 items-center px-4 pt-20 pb-14 sm:px-10 sm:pt-24 sm:pb-16"
        onClick={(e) => e.stopPropagation()}
      >
        <Carousel
          setApi={setApi}
          opts={{ loop: canScroll, align: 'center', startIndex: index }}
          className="group relative h-full w-full"
        >
          <CarouselContent className="-ml-3 h-full sm:-ml-4">
            {images.map((src, i) => (
              <CarouselItem
                key={i}
                className={`pl-3 sm:pl-4 flex items-center justify-center ${itemBasis}`}
              >
                <div
                  className={`relative w-full overflow-hidden rounded-2xl bg-white/[0.02] ring-1 ring-white/5 ${itemAspect}`}
                >
                  <SmartMedia
                    media={{
                      kind: /\.(mp4|webm|mov)(\?|$)/i.test(src)
                        ? 'video'
                        : 'image',
                      src,
                    }}
                    alt={`Image ${i + 1}`}
                    sizes={
                      portrait
                        ? '(max-width: 640px) 90vw, (max-width: 768px) 45vw, 260px'
                        : '100vw'
                    }
                    fit={portrait ? 'cover' : 'contain'}
                    priority={Math.abs(i - index) <= 1}
                    className={mediaClass}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {canScroll && (
            <>
              <CarouselPrevious
                aria-label="Image précédente"
                className="left-2 h-12 w-12 border-white/20 bg-black/40 text-white opacity-60 transition-opacity hover:bg-white/10 hover:text-white hover:opacity-100 sm:left-6 sm:h-14 sm:w-14"
              />
              <CarouselNext
                aria-label="Image suivante"
                className="right-2 h-12 w-12 border-white/20 bg-black/40 text-white opacity-60 transition-opacity hover:bg-white/10 hover:text-white hover:opacity-100 sm:right-6 sm:h-14 sm:w-14"
              />
            </>
          )}
        </Carousel>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 px-5 pb-4 pt-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-2">
          {/* Segmented progress rail */}
          <div className="flex items-center gap-[3px]">
            {images.map((_, i) => {
              const active = i === current;
              const past = i < current;
              return (
                <button
                  key={i}
                  onClick={() => api?.scrollTo(i)}
                  className="group relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/10 transition-[flex] duration-300"
                  style={active ? { flex: '3 3 0%' } : undefined}
                  aria-label={`Aller \u00e0 l'image ${i + 1}`}
                  aria-current={active}
                >
                  <span
                    className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
                      active
                        ? 'w-full bg-white'
                        : past
                          ? 'w-full bg-white/50'
                          : 'w-0 bg-white/30'
                    }`}
                  />
                  <span className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 bg-white/20" />
                </button>
              );
            })}
          </div>
          {/* Counter + hint */}
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">
            <span>
              {String(current + 1).padStart(2, '0')}
              <span className="text-white/20">
                {' '}
                / {String(total).padStart(2, '0')}
              </span>
            </span>
            <span className="hidden sm:inline">← → Esc</span>
          </div>
        </div>
      </div>
    </div>
  );
}
