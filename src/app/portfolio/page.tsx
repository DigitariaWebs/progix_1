'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Filter } from 'lucide-react';
import Partners from '@/components/ui/Partners';
import { filterProjects } from '@/data/projectsData';
// Navbar removed to use global StaggeredMenu header
import ProjectsSection from '@/components/sections/ProjectsSection';
import DriveHero from '@/components/sections/DriveHero';

const colors = {
  primary: '#1B363C',
  secondary: '#1D4760',
};

const categories = [
  'ALL',
  'E-COMMERCE',
  'HEALTHCARE',
  'FINTECH',
  'IOT',
  'EDUCATION',
  'HOSPITALITY',
];

const industries = [
  'ALL',
  'RETAIL',
  'MEDICAL',
  'FINANCE',
  'GOVERNMENT',
  'EDUCATION',
  'FOOD',
];

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Filter projects based on selected filters
  const filteredProjects = useMemo(() => {
    const filtered = filterProjects(activeFilter, activeCategory);
    // Sort alphabetically by title
    return filtered.sort((a, b) => a.title.localeCompare(b.title));
  }, [activeFilter, activeCategory]);

  // Projects to display (either 4 or all)
  const displayedProjects = useMemo(() => {
    if (showAllProjects) {
      return filteredProjects;
    }
    return filteredProjects.slice(0, 4);
  }, [filteredProjects, showAllProjects]);

  // Reset showAllProjects when filters change
  useEffect(() => {
    setShowAllProjects(false);
  }, [activeFilter, activeCategory]);

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
              <span className="uppercase tracking-wider font-bold">PROJETS</span>
            </div>

            {/* Main Heading with CircularText */}
            <div className="flex justify-between items-start">
              {/* Main Heading */}
              <div className="flex-1 -ml-4 sm:-ml-6 md:-ml-10 lg:-ml-16">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-6xl 2xl:text-7xl font-bold leading-tight max-w-6xl">
              Parle, parle, jase, jase, mais concrètement, ça ressemble à quoi notre travail?
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
                        animation: 'rotate-clock 60s linear infinite'
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
                        animation: 'rotate-clock 5s linear infinite'
                      }}
                    />
                    {/* Centre de la pendule */}
                    <circle cx="12" cy="12" r="2" fill="currentColor" />
                  </svg>
                </div>

                {/* Description Text */}
                <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
                  Fini le blabla, c’est le temps de vous prouver qu’on est bon dans ce qu'on fait. Découvrez nos études de cas et parcourez la liste de nos projets plus bas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects accordion-like section (Webisoft style) */}
      <ProjectsSection />

      {/* Drive-style hero block at the bottom */}
      <DriveHero />

      {/* Removed legacy filters and grids */}
    </>
  );
};

export default PortfolioPage;
