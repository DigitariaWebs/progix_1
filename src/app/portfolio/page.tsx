'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProjectsSection from '@/components/sections/ProjectsSection';
import CtaButtonSection from '@/components/sections/CtaButtonSection';
import Footer from '@/components/layout/Footer';
import { hasMobile, hasWeb, type Project } from '@/data/project';
import { colors } from '@/config/colors';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import {
  ExternalLink,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from 'lucide-react';

function DotIndicator({
  count,
  current,
  onSelect,
}: {
  count: number;
  current: number;
  onSelect: (i: number) => void;
}) {
  if (count <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className="rounded-full transition-all duration-200"
          style={{
            width: i === current ? '20px' : '6px',
            height: '6px',
            backgroundColor: i === current ? '#fff' : 'rgba(255,255,255,0.3)',
          }}
          aria-label={`Photo ${i + 1}`}
        />
      ))}
    </div>
  );
}

function Lightbox({
  images,
  index,
  isMobile,
  onClose,
}: {
  images: string[];
  index: number;
  isMobile: boolean;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);
  const total = images.length;

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + total) % total),
    [total],
  );
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [prev, next, onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-sm text-white/50 font-mono tabular-nums">
          {current + 1} / {total}
        </span>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors text-white"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div
        className="flex-1 flex items-center justify-center px-14 py-4 min-h-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`relative ${isMobile ? 'h-full max-w-xs w-full' : 'w-full h-full'}`}
        >
          <Image
            key={current}
            src={images[current]}
            alt={`Image ${current + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      <div
        className="flex items-center justify-center gap-4 pb-5 flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors text-white"
          aria-label="Image précédente"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <DotIndicator count={total} current={current} onSelect={setCurrent} />

        <button
          onClick={next}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors text-white"
          aria-label="Image suivante"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function ProjectModal({
  project,
  isOpen,
  onClose,
}: {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const autoplayPlugin = useRef(
    Autoplay({ delay: 3500, stopOnInteraction: true }),
  );

  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => setCurrent(carouselApi.selectedScrollSnap());
    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap());
    carouselApi.on('select', onSelect);
    return () => {
      carouselApi.off('select', onSelect);
    };
  }, [carouselApi]);

  // Reset lightbox when modal closes
  useEffect(() => {
    if (!isOpen) setLightboxIndex(null);
  }, [isOpen]);

  if (!project) return null;

  const isMobileOnly = hasMobile(project) && !hasWeb(project);
  const gallery = isMobileOnly
    ? project.mobileGallery
    : (project.webGallery ?? project.mobileGallery);
  const hasGallery = !!(gallery && gallery.length > 0);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-4xl w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto bg-[#0f0f0f] border-white/10 text-white p-0 gap-0 rounded-2xl">
          <div className="sticky top-0 z-10 bg-[#0f0f0f]/95 backdrop-blur-sm border-b border-white/[0.08] px-6 py-5">
            <DialogHeader className="gap-1.5 pr-8">
              <span
                className="inline-flex items-center self-start px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-white"
                style={{ backgroundColor: colors.secondary }}
              >
                {project.category}
              </span>
              <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight text-left font-hubot">
                {project.longTitle || project.title}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {project.description}
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="px-6 pb-8 pt-6 space-y-8">
            {/* Carousel */}
            {hasGallery && (
              <div className="space-y-3">
                <Carousel
                  opts={{ loop: true, align: 'start' }}
                  plugins={[autoplayPlugin.current]}
                  setApi={setCarouselApi}
                  className="w-full"
                >
                  <CarouselContent className={isMobileOnly ? '-ml-3' : '-ml-4'}>
                    {gallery!.map((img, idx) => (
                      <CarouselItem
                        key={idx}
                        className={
                          isMobileOnly ? 'basis-1/2 sm:basis-1/3 pl-3' : 'pl-4'
                        }
                      >
                        <button
                          type="button"
                          onClick={() => setLightboxIndex(idx)}
                          className={`group relative w-full overflow-hidden cursor-zoom-in bg-[#141414] ${
                            isMobileOnly
                              ? 'aspect-[9/16] rounded-2xl'
                              : 'aspect-[16/9] rounded-xl'
                          }`}
                          aria-label={`Agrandir l'image ${idx + 1}`}
                        >
                          <Image
                            src={img}
                            alt={`${project.title} — screenshot ${idx + 1}`}
                            fill
                            loading={idx === 0 ? 'eager' : 'lazy'}
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 400px"
                          />
                          {/* Zoom hint */}
                          <span className="absolute inset-0 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <span className="flex items-center gap-1.5 bg-black/70 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm tracking-wide">
                              <ZoomIn className="w-3.5 h-3.5" />
                              Agrandir
                            </span>
                          </span>
                        </button>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <CarouselPrevious className="left-3 border-white/15 bg-black/50 hover:bg-white/10 text-white hover:text-white" />
                  <CarouselNext className="right-3 border-white/15 bg-black/50 hover:bg-white/10 text-white hover:text-white" />
                </Carousel>

                <DotIndicator
                  count={count}
                  current={current}
                  onSelect={(i) => carouselApi?.scrollTo(i)}
                />
              </div>
            )}

            {/* Description */}
            <div className="space-y-3 text-sm md:text-base leading-relaxed text-white/70">
              {project.longDescription ? (
                project.longDescription.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))
              ) : (
                <p>{project.description}</p>
              )}
            </div>

            {/* Services + Tech grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                  Services
                </p>
                <ul className="space-y-2">
                  {project.services.map((service, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2.5 text-sm text-white/75"
                    >
                      <span className="w-1 h-1 rounded-full flex-shrink-0 bg-white/40" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                  Technologies
                </p>
                <ul className="space-y-2">
                  {project.tech.map((tech, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2.5 text-sm text-white/75"
                    >
                      <span className="w-1 h-1 rounded-full flex-shrink-0 bg-white/40" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-4 border-t border-white/[0.08]">
              {project.webUrl && (
                <Link
                  href={project.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-hubot inline-flex items-center justify-center gap-2 px-6 py-3 bg-white rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg w-full sm:w-auto"
                  style={{ color: colors.primary }}
                >
                  Visiter le site
                  <ExternalLink className="w-4 h-4" />
                </Link>
              )}
              {project.mobileAppStoreUrl && (
                <Link
                  href={project.mobileAppStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-hubot inline-flex items-center justify-center gap-2 px-6 py-3 bg-white rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg w-full sm:w-auto"
                  style={{ color: colors.primary }}
                >
                  App Store
                  <ExternalLink className="w-4 h-4" />
                </Link>
              )}
              {project.mobilePlayStoreUrl && (
                <Link
                  href={project.mobilePlayStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-hubot inline-flex items-center justify-center gap-2 px-6 py-3 bg-white rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg w-full sm:w-auto"
                  style={{ color: colors.primary }}
                >
                  Google Play
                  <ExternalLink className="w-4 h-4" />
                </Link>
              )}
              <Link
                href="/contact"
                className="font-hubot inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white text-white rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 w-full sm:w-auto"
              >
                Discutons de votre projet
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Lightbox — rendered outside Dialog so it's truly fullscreen */}
      {lightboxIndex !== null && gallery && (
        <Lightbox
          images={gallery}
          index={lightboxIndex}
          isMobile={isMobileOnly}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}

const PortfolioPage = () => {
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      {/* Navbar removed */}

      {/* Hero Section — compact editorial band */}
      <section className="relative w-full bg-[#F5F5F5] pt-32 pb-10 md:pt-40 md:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8">
            <span>/</span>
            <span className="uppercase tracking-[0.2em] font-bold">
              Projets
            </span>
          </div>

          {/* Heading + supporting copy */}
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end md:gap-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight max-w-4xl">
              Parle, parle, jase, jase, mais concrètement, ça ressemble à quoi
              notre travail?
            </h1>

            <div className="flex gap-3 items-start max-w-md md:max-w-sm md:justify-self-end">
              <div className="flex-shrink-0 mt-1">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-800 sm:w-6 sm:h-6"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line
                    x1="12"
                    y1="12"
                    x2="12"
                    y2="8"
                    strokeLinecap="round"
                    style={{
                      transformOrigin: '12px 12px',
                      animation: 'rotate-clock 60s linear infinite',
                    }}
                  />
                  <line
                    x1="12"
                    y1="12"
                    x2="12"
                    y2="6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    style={{
                      transformOrigin: '12px 12px',
                      animation: 'rotate-clock 5s linear infinite',
                    }}
                  />
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                </svg>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Fini le blabla, c&apos;est le temps de vous prouver qu&apos;on
                est bon dans ce qu&apos;on fait. Découvrez nos études de cas et
                parcourez la liste de nos projets plus bas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ProjectsSection onProjectClick={handleProjectClick} />
      <CtaButtonSection />
      <Footer />
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default PortfolioPage;
