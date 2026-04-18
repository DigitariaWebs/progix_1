'use client';

import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

type ExpertiseItem = {
  number: string;
  title: string;
  copy: string;
  mediaSrc: string;
};

const EXPERTISE_ITEMS: ExpertiseItem[] = [
  {
    number: '1',
    title: 'Advisory',
    copy: 'Insights stratégiques, revues techniques complètes et accélération produit avec CTO fractionné.',
    mediaSrc:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/VIDEOHORIZONTALCARDS/advisory_compressed_hW5CFWb.mp4',
  },
  {
    number: '2',
    title: 'Artificial Intelligence',
    copy: 'LLM apps, pipelines de retrieval, évals et déploiements privacy-first adaptés à votre domaine.',
    mediaSrc:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/VIDEOHORIZONTALCARDS/ai_compressed.mp4',
  },
  {
    number: '3',
    title: 'Blockchain',
    copy: 'Applications blockchain, smart contracts, infra scalable et audits rigoureux prêts pour la prod.',
    mediaSrc:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/VIDEOHORIZONTALCARDS/blockchain_compressed_SctBxX6.mp4',
  },
  {
    number: '4',
    title: 'Product Development',
    copy: 'De la discovery au delivery: prototypage rapide, design centré utilisateur, full‑stack shipping.',
    mediaSrc:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/VIDEOHORIZONTALCARDS/product-development_compressed.mp4',
  },
  {
    number: '5',
    title: 'Team Augmentation',
    copy: 'Renfort d’équipe backend, frontend et DevOps, process robustes et vélocité maîtrisée.',
    mediaSrc:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/VIDEOHORIZONTALCARDS/team-augmentation_compressed_bcVk2PB.mp4',
  },
];

export default function ExpertiseSection() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selectedIdx, setSelectedIdx] = React.useState(0);
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);

  const autoplay = React.useRef(
    Autoplay({
      delay: 5000,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
    }),
  );

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const idx = api.selectedScrollSnap();
      setSelectedIdx(idx);
      videoRefs.current.forEach((video, i) => {
        if (!video) return;
        if (i === idx) {
          const p = video.play();
          if (p && typeof p.catch === 'function') p.catch(() => {});
        } else {
          try {
            video.pause();
          } catch {}
        }
      });
    };

    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);

    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);

  const activeItem = EXPERTISE_ITEMS[selectedIdx] ?? EXPERTISE_ITEMS[0];
  const total = EXPERTISE_ITEMS.length;
  const prevItem = EXPERTISE_ITEMS[(selectedIdx - 1 + total) % total];
  const nextItem = EXPERTISE_ITEMS[(selectedIdx + 1) % total];

  return (
    <section className="relative w-full bg-[#0f0f0f] text-white">
      <div className="mx-auto max-w-[96rem] px-6 pt-24 pb-10 md:px-12 md:pt-36 md:pb-16 lg:pt-44">
        <div className="flex items-center gap-4 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-white/45 md:text-xs">
          <span
            aria-hidden="true"
            className="inline-block h-px w-10 bg-white/25 md:w-14"
          />
          <span>Expertises · Ce que nous construisons</span>
        </div>

        <h2 className="mt-8 font-bold leading-[0.95] tracking-[-0.02em] text-[clamp(2.75rem,9vw,9rem)] md:mt-14">
          Ce que
          <br aria-hidden="true" />
          nous faisons<span className="text-white/30">.</span>
        </h2>

        <div className="mt-10 flex flex-col gap-10 md:mt-16 md:flex-row md:items-end md:justify-between md:gap-20">
          <p className="max-w-xl text-base leading-relaxed text-white/70 md:text-lg md:leading-[1.6]">
            De l&apos;advisory technique à l&apos;augmentation d&apos;équipe,
            nous concevons des produits numériques durables et performants —
            taillés pour des ambitions exigeantes.
          </p>

          <div
            aria-live="polite"
            className="flex items-baseline gap-3 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-white/50 md:text-xs"
          >
            <span className="text-white tabular-nums">
              {activeItem.number.padStart(2, '0')}
            </span>
            <span
              aria-hidden="true"
              className="inline-block h-px w-4 bg-white/30"
            />
            <span className="tabular-nums text-white/40">
              {String(total).padStart(2, '0')}
            </span>
            <span className="ml-2 text-white/70">— {activeItem.title}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[96rem] px-6 md:px-12">
        <div
          role="tablist"
          aria-label="Expertises"
          className="flex items-stretch gap-5 overflow-x-auto border-t border-white/10 pt-5 md:gap-10 md:pt-7 lg:gap-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {EXPERTISE_ITEMS.map((item, i) => {
            const isActive = i === selectedIdx;
            return (
              <button
                key={item.number}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Voir ${item.title}`}
                onClick={() => api?.scrollTo(i)}
                className={cn(
                  'group/tab relative flex shrink-0 cursor-pointer items-baseline gap-2 border-0 bg-transparent px-0 pt-0 pb-3 font-mono text-[0.7rem] font-normal uppercase tracking-[0.12em] transition-colors duration-300 md:gap-3 md:pb-4 md:text-xs',
                  "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-500 after:ease-out after:content-['']",
                  'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/45',
                  isActive
                    ? 'text-white after:scale-x-100'
                    : 'text-white/40 hover:text-white/80',
                )}
              >
                <span
                  className={cn(
                    'font-medium tabular-nums transition-opacity duration-300',
                    isActive ? 'text-white' : 'text-white/50',
                  )}
                >
                  {item.number.padStart(2, '0')}
                </span>
                <span className="whitespace-nowrap">{item.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative mt-8 h-[80vh] min-h-[32rem] w-full overflow-hidden md:mt-12 md:h-[85vh]">
        <Carousel
          opts={{ loop: true, align: 'center' }}
          plugins={[autoplay.current]}
          setApi={setApi}
          className="absolute inset-0 [&>div]:h-full [&>div>div]:h-full"
        >
          <CarouselContent className="!ml-0 h-full">
            {EXPERTISE_ITEMS.map((item, i) => (
              <CarouselItem key={item.number} className="h-full !pl-0">
                <article className="group relative h-full w-full overflow-hidden bg-black">
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    key={`video-${item.number}`}
                    src={item.mediaSrc}
                    className="absolute inset-0 block h-full w-full scale-105 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-100"
                    preload="auto"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/30 md:bg-gradient-to-r md:via-black/70 md:to-black/5"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 overflow-hidden"
                  >
                    <span className="absolute -top-6 -right-2 select-none font-mono text-[9rem] font-black leading-none tracking-tighter text-white/[0.06] md:-top-12 md:right-10 md:text-[22rem]">
                      {item.number.padStart(2, '0')}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 left-6 right-6 flex flex-col items-start pb-8 md:inset-y-0 md:left-12 md:right-auto md:max-w-[58%] md:justify-center md:pb-0">
                    <span className="mb-3 font-mono text-[0.65rem] font-normal uppercase tracking-[0.25em] text-white/50 md:mb-5 md:text-[0.7rem]">
                      Expertise · {item.number.padStart(2, '0')}
                    </span>

                    <h3 className="font-bold leading-[1.05] tracking-tight text-white text-[clamp(1.75rem,5vw,2.5rem)] md:text-[clamp(2.5rem,5.5vw,4.5rem)]">
                      {item.title}
                    </h3>

                    <div
                      aria-hidden="true"
                      className="mt-4 h-px w-10 bg-white/40 transition-all duration-500 ease-out md:mt-6 md:w-14 group-hover:w-20 md:group-hover:w-24"
                    />

                    <p className="mt-4 max-w-xl text-[0.95rem] font-medium leading-relaxed text-white/80 md:mt-6 md:text-lg md:leading-relaxed">
                      {item.copy}
                    </p>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="pointer-events-none absolute top-5 right-5 z-20 flex items-center gap-2 md:top-auto md:right-10 md:bottom-10 md:gap-3">
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            aria-label={`Précédent — ${prevItem.title}`}
            className="group/nav pointer-events-auto flex items-center gap-2 rounded-full border border-white/20 bg-white/5 py-2 pr-3 pl-2 font-mono text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/80 backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-black md:py-2.5 md:pr-4 md:pl-2.5 md:text-[0.7rem]"
          >
            <ArrowLeft
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover/nav:-translate-x-0.5"
              strokeWidth={1.75}
            />
            <span className="tabular-nums">
              {prevItem.number.padStart(2, '0')}
            </span>
          </button>

          <button
            type="button"
            onClick={() => api?.scrollNext()}
            aria-label={`Suivant — ${nextItem.title}`}
            className="group/nav pointer-events-auto flex items-center gap-2 rounded-full border border-white/20 bg-white/5 py-2 pr-2 pl-3 font-mono text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/80 backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-black md:py-2.5 md:pr-2.5 md:pl-4 md:text-[0.7rem]"
          >
            <span className="tabular-nums">
              {nextItem.number.padStart(2, '0')}
            </span>
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover/nav:translate-x-0.5"
              strokeWidth={1.75}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
