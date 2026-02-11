'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Navbar removed to use global StaggeredMenu header
import ProjectsSection from '@/components/sections/ProjectsSection';
import DriveHero from '@/components/sections/DriveHero';
import CtaButtonSection from '@/components/sections/CtaButtonSection';
import Footer from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { type Project } from '@/data/project';
const colors = {
  primary: '#1B363C',
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

// Project Modal Component
function ProjectModal({
  project,
  isOpen,
  onClose,
}: {
  project: Project | null;
  isOpen: boolean;
  onClose: (e?: React.MouseEvent) => void;
}) {
  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      // Only add padding on desktop where scrollbar appears
      if (typeof window !== 'undefined' && window.innerWidth > 768) {
        const scrollbarWidth =
          window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      } else {
        // On mobile, just hide overflow
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
      }
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
          {/* Backdrop - tap to close on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => onClose(e)}
            className="fixed inset-0 bg-black/60 md:bg-black/80 z-[100] md:backdrop-blur-sm overflow-hidden"
          />

          {/* Modal - Full-screen on mobile, centered on desktop with visible margins */}
          <motion.div
            initial={{ opacity: 0, y: 'var(--initial-y)' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 'var(--initial-y)' }}
            transition={{
              duration: 0.25,
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className="fixed inset-2 sm:inset-3 md:inset-8 lg:inset-12 z-[100] overflow-y-auto overflow-x-hidden"
            style={
              {
                '--initial-y':
                  typeof window !== 'undefined' && window.innerWidth < 768
                    ? '100%'
                    : '20px',
              } as React.CSSProperties
            }
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-h-full md:min-h-auto flex items-center justify-center">
              <div
                className="relative rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-10 max-w-5xl w-full"
                style={{ backgroundColor: colors.bg.dark }}
              >
                {/* Close Button - Larger for mobile touch */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onClose(e);
                  }}
                  className="absolute top-4 right-4 sm:top-4 sm:right-4 md:top-6 md:right-6 w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 z-[110] flex-shrink-0"
                  style={{ backgroundColor: colors.accent }}
                  aria-label="Fermer"
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
                      strokeWidth={2.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Content */}
                <div className="space-y-4 sm:space-y-6 md:space-y-8 mt-6 sm:mt-0">
                  {/* Header */}
                  <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
                    <h2
                      className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight"
                      style={{ color: colors.text.primary }}
                    >
                      {project.longTitle || project.title}
                    </h2>
                    <p
                      className="text-xs sm:text-sm md:text-lg font-semibold"
                      style={{ color: colors.text.accent }}
                    >
                      {project.category}
                    </p>
                  </div>

                  {/* Gallery - Lazy load images and optimize for mobile */}
                  {project.gallery && project.gallery.length > 0 && (
                    <div
                      className={`grid gap-2 sm:gap-3 md:gap-4 ${project.mobile ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}
                    >
                      {project.gallery.map((img, idx) => (
                        <div
                          key={idx}
                          className={`relative rounded-lg sm:rounded-2xl overflow-hidden shadow-lg ${project.mobile ? 'aspect-[9/16]' : 'aspect-[16/9]'}`}
                        >
                          <Image
                            src={img}
                            alt={`${project.title} screenshot ${idx + 1}`}
                            fill
                            loading="lazy"
                            className={
                              project.mobile ? 'object-cover' : 'object-fill'
                            }
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  <div className="space-y-4 sm:space-y-5 md:space-y-6 pb-6 md:pb-0">
                    {project.longDescription ? (
                      <div
                        className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed"
                        style={{ color: colors.text.secondary }}
                      >
                        {project.longDescription.map((para, idx) => (
                          <p key={idx}>{para}</p>
                        ))}
                      </div>
                    ) : (
                      <p
                        className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed"
                        style={{ color: colors.text.secondary }}
                      >
                        {project.description}
                      </p>
                    )}

                    <div>
                      <h3
                        className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 md:mb-4"
                        style={{ color: colors.text.primary }}
                      >
                        Services :
                      </h3>
                      <ul className="grid grid-cols-1 gap-1 sm:gap-2 md:gap-3">
                        {project.services.map((service, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-xs sm:text-sm md:text-base"
                            style={{ color: colors.text.secondary }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ backgroundColor: colors.accent }}
                            />
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3
                        className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 md:mb-4"
                        style={{ color: colors.text.primary }}
                      >
                        Technologies :
                      </h3>
                      <ul className="grid grid-cols-1 gap-1 sm:gap-2 md:gap-3">
                        {project.tech.map((tech, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-xs sm:text-sm md:text-base"
                            style={{ color: colors.text.secondary }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ backgroundColor: colors.accent }}
                            />
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA - Full width on mobile */}
                  <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4 sm:pt-6 md:pt-8 border-t border-gray-700">
                    {project.website && (
                      <Link
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-8 py-3 sm:py-4 rounded-xl md:rounded-full text-xs sm:text-sm md:text-base font-bold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg w-full sm:w-auto"
                        style={{
                          backgroundColor: colors.accent,
                          color: colors.white,
                        }}
                      >
                        Visiter le site
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </Link>
                    )}
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-8 py-3 sm:py-4 rounded-xl md:rounded-full text-xs sm:text-sm md:text-base font-bold transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg border-2 w-full sm:w-auto"
                      style={{
                        borderColor: colors.accent,
                        color: colors.accent,
                      }}
                    >
                      Discutons de votre projet
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
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
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const PortfolioPage = () => {
  const navRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 50) {
          navRef.current.classList.add('scrolled');
        } else {
          navRef.current.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navbar removed */}

      {/* Hero Section */}
      <section className="relative min-h-screen w-full bg-[#F5F5F5] pt-48 md:pt-56 pb-20">
        {/* Content */}
        <div className="max-w-7xl mx-auto pr-4 sm:pr-6 lg:pr-8 pl-0 sm:pl-1 lg:pl-2 h-full flex items-center">
          <div className="w-full space-y-12">
            {/* Breadcrumb */}
            <div className="flex items-center gap-4 sm:gap-6 text-sm text-gray-600 -ml-4 sm:-ml-6 md:-ml-10 lg:-ml-16">
              <span>/</span>
              <span className="uppercase tracking-wider font-bold">
                PROJETS
              </span>
            </div>

            {/* Main Heading with CircularText */}
            <div className="flex justify-between items-start">
              {/* Main Heading */}
              <div className="flex-1 ml-1 sm:-ml-6 md:-ml-10 lg:-ml-16">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-6xl 2xl:text-7xl font-bold leading-tight max-w-6xl">
                  Parle, parle, jase, jase, mais concrètement, ça ressemble à
                  quoi notre travail?
                </h1>
              </div>

              {/* Removed CircularText */}
            </div>

            {/* Description on the Right Side - With Icon */}
            <div className="flex justify-end">
              <div className="flex gap-4 items-start max-w-xl -mr-4 sm:-mr-8 lg:-mr-12">
                {/* Icon */}
                <div className="flex-shrink-0 mt-1">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-gray-800"
                  >
                    <circle cx="12" cy="12" r="10" />
                    {/* Aiguille des heures */}
                    <line
                      x1="12"
                      y1="12"
                      x2="12"
                      y2="8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      style={{
                        transformOrigin: '12px 12px',
                        animation: 'rotate-clock 60s linear infinite',
                      }}
                    />
                    {/* Aiguille des minutes */}
                    <line
                      x1="12"
                      y1="12"
                      x2="12"
                      y2="6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      style={{
                        transformOrigin: '12px 12px',
                        animation: 'rotate-clock 5s linear infinite',
                      }}
                    />
                    {/* Centre de la pendule */}
                    <circle cx="12" cy="12" r="2" fill="currentColor" />
                  </svg>
                </div>

                {/* Description Text */}
                <p className="text-sm sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
                  Fini le blabla, c’est le temps de vous prouver qu’on est bon
                  dans ce qu’on fait. Découvrez nos études de cas et parcourez
                  la liste de nos projets plus bas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects accordion-like section (Webisoft style) */}
      <ProjectsSection onProjectClick={handleProjectClick} />

      {/* Drive-style hero block at the bottom */}
      <DriveHero />

      {/* CTA Section */}
      <CtaButtonSection />

      {/* Footer */}
      <Footer />

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Removed legacy filters and grids */}
    </>
  );
};

export default PortfolioPage;
