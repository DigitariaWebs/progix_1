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
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => onClose(e)}
            className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-sm overflow-hidden"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-1 sm:inset-2 md:inset-5 lg:inset-10 z-[100] overflow-y-auto overflow-x-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 max-w-6xl mx-auto"
              style={{ backgroundColor: colors.bg.dark }}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClose(e);
                }}
                className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-[100]"
                style={{ backgroundColor: colors.accent }}
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
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Content */}
              <div className="space-y-4 sm:space-y-6 md:space-y-8 mt-10 sm:mt-0">
                {/* Header */}
                <div className="text-center space-y-2 sm:space-y-4">
                  <h2
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
                    style={{ color: colors.text.primary }}
                  >
                    {project.longTitle || project.title}
                  </h2>
                  <p
                    className="text-sm sm:text-base md:text-xl font-semibold"
                    style={{ color: colors.text.accent }}
                  >
                    {project.category}
                  </p>
                </div>

                {/* Gallery */}
                {project.gallery && project.gallery.length > 0 && (
                  <div
                    className={`grid gap-2 sm:gap-3 md:gap-4 ${project.mobile ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-2'}`}
                  >
                    {project.gallery.map((img, idx) => (
                      <div
                        key={idx}
                        className={`relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg ${project.mobile ? 'aspect-[9/16]' : 'aspect-[16/9]'}`}
                      >
                        <Image
                          src={img}
                          alt={`${project.title} screenshot ${idx + 1}`}
                          fill
                          className={
                            project.mobile ? 'object-cover' : 'object-fill'
                          }
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Description */}
                <div className="space-y-4 sm:space-y-6">
                  {project.longDescription ? (
                    <div
                      className="space-y-4 text-sm sm:text-base md:text-lg leading-relaxed"
                      style={{ color: colors.text.secondary }}
                    >
                      {project.longDescription.map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}
                    </div>
                  ) : (
                    <p
                      className="text-sm sm:text-base md:text-lg leading-relaxed"
                      style={{ color: colors.text.secondary }}
                    >
                      {project.description}
                    </p>
                  )}

                  <div>
                    <h3
                      className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4"
                      style={{ color: colors.text.primary }}
                    >
                      Services :
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                      {project.services.map((service, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
                          style={{ color: colors.text.secondary }}
                        >
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: colors.accent }}
                          />
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3
                      className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4"
                      style={{ color: colors.text.primary }}
                    >
                      Technologies :
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                      {project.tech.map((tech, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
                          style={{ color: colors.text.secondary }}
                        >
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: colors.accent }}
                          />
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex justify-center gap-4 pt-2 sm:pt-4">
                  {project.website && (
                    <Link
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-bold transition-all duration-300 hover:scale-105 shadow-lg"
                      style={{
                        backgroundColor: colors.accent,
                        color: colors.white,
                      }}
                    >
                      Visiter le site
                      <svg
                        className="w-5 h-5"
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
                    className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-bold transition-all duration-300 hover:scale-105 shadow-lg border-2"
                    style={{
                      borderColor: colors.accent,
                      color: colors.accent,
                    }}
                  >
                    Discutons de votre projet
                    <svg
                      className="w-5 h-5"
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
