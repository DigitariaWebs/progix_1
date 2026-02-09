'use client';

import React from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
import { type Project, projects } from '@/data/project';

const FILTERS = [
  'TOUS',
  'SITE WEB',
  'APP WEB',
  'APP MOBILE',
  'CRM',
  'ERP',
] as const;
type FilterType = (typeof FILTERS)[number];

function stringIncludes(haystack: string | undefined, needle: string) {
  if (!haystack) return false;
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

function matchesFilter(project: Project, filter: FilterType): boolean {
  if (filter === 'TOUS') return true;

  const hasService = (name: string) =>
    project.services.some((s) => stringIncludes(s, name));
  const hasTech = (name: string) =>
    project.tech.some((t) => stringIncludes(t, name));
  const inTitle = (name: string) => stringIncludes(project.title, name);
  const inDesc = (name: string) => stringIncludes(project.description, name);

  switch (filter) {
    case 'SITE WEB':
      return (
        hasService('site vitrine') ||
        hasService('site web') ||
        stringIncludes(project.category, 'site vitrine') ||
        inDesc('site web') ||
        inDesc('vitrine')
      );
    case 'APP WEB':
      return (
        hasService('développement web') ||
        hasService('plateforme') ||
        hasService('e-learning') ||
        hasService('système de gestion') ||
        hasService('lms') ||
        inDesc('application web') ||
        hasTech('next.js') ||
        hasTech('react')
      );
    case 'APP MOBILE':
      return (
        hasService('application mobile') ||
        hasTech('react native') ||
        hasTech('flutter') ||
        hasTech('kotlin') ||
        hasTech('swift')
      );
    case 'CRM':
      return inTitle('crm') || hasService('crm');
    case 'ERP':
      return inTitle('erp') || hasService('erp') || inDesc('erp');
  }
}

function ProjectItem({
  project,
  index,
  openId,
  setOpenId,
  onPreviewEnter,
  onPreviewMove,
  onPreviewLeave,
  onProjectClick,
}: {
  project: Project;
  index: number;
  openId: number | null;
  setOpenId: (id: number | null) => void;
  onPreviewEnter: (src: string) => void;
  onPreviewMove: (e: React.MouseEvent) => void;
  onPreviewLeave: () => void;
  onProjectClick: (project: Project) => void;
}) {
  const isOpen = openId === project.id;

  return (
    <li className="select-none">
      {/* Row (closed state) */}
      <button
        type="button"
        onClick={() => setOpenId(isOpen ? null : project.id)}
        className="group w-full text-left grid grid-cols-[auto_1fr_auto_auto] items-center gap-x-8 sm:gap-x-10 md:gap-x-12 py-12 md:py-14 border-t border-dotted border-white/30 hover:border-black/30 hover:bg-white transition-colors duration-150 px-5 sm:px-8"
        onMouseEnter={() => onPreviewEnter(project.preview || project.image)}
        onMouseMove={onPreviewMove}
        onMouseLeave={onPreviewLeave}
        aria-expanded={isOpen}
      >
        <span className="text-6xl md:text-7xl font-bold tabular-nums leading-none text-white group-hover:text-black transition-colors">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="text-5xl md:text-6xl font-bold leading-tight ml-12 md:ml-16 text-white group-hover:text-black transition-colors">
          {project.title}
        </span>
        <span className="ml-auto hidden md:block mr-8 md:mr-12 text-gray-400 group-hover:text-gray-800 uppercase tracking-wider font-light text-sm md:text-base transition-colors">
          {project.category}
        </span>
        <span className="text-4xl md:text-5xl font-light leading-none text-white/80 group-hover:text-black transition-colors">
          {isOpen ? '–' : '+'}
        </span>
      </button>

      {/* Open panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-dotted border-white/20"
          >
            <div className="py-10 px-5 sm:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* Left: media (video preferred if present) */}
                <div
                  className={`relative rounded-xl overflow-hidden ${project.bgClass ? '' : ''}`}
                >
                  <div
                    className={`absolute inset-0 ${project.bgClass ? project.bgClass : 'bg-[#3BA7FF]'}`}
                  />
                  <div className="relative p-6 md:p-8">
                    <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden ">
                      {project.video ? (
                        <video
                          src={project.video}
                          className="w-full h-full object-cover"
                          muted
                          loop
                          autoPlay
                          playsInline
                          controls={false}
                        />
                      ) : (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-contain"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: text block */}
                <div className="max-w-3xl ml-auto">
                  <h3 className="text-6xl font-bold leading-tight mb-6">
                    {project.longTitle || project.title}
                  </h3>
                  {project.longDescription ? (
                    <div className="space-y-4 text-white/80">
                      {project.longDescription.map((para, idx) => (
                        <p
                          key={idx}
                          className="text-lg md:text-xl leading-relaxed"
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-2xl text-white/80 leading-relaxed mb-10">
                      {project.description}
                    </p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-10 border-b border-dotted border-white/20 mt-8">
                    <div>
                      <div className="text-sm text-white/60 tracking-widest mb-2">
                        SERVICES
                      </div>
                      <div className="font-mono text-sm uppercase space-y-1">
                        {project.services.map((s) => (
                          <div key={s}>{s}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-white/60 tracking-widest mb-2">
                        TECH
                      </div>
                      <div className="font-mono text-sm uppercase space-y-1">
                        {project.tech.map((t) => (
                          <div key={t}>{t}</div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-10">
                    <button
                      onClick={() => onProjectClick(project)}
                      className="inline-flex items-center justify-center px-8 py-4 border border-white rounded-md text-base font-semibold hover:bg-white hover:text-black transition-colors"
                    >
                      VIEW PROJECT
                      <span className="ml-2">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function ProjectsSection({
  onProjectClick,
}: {
  onProjectClick: (project: Project) => void;
}) {
  const [openId, setOpenId] = React.useState<number | null>(null);
  const [previewSrc, setPreviewSrc] = React.useState<string | null>(null);
  const mouseX = useMotionValue<number>(0);
  const mouseY = useMotionValue<number>(0);
  const [activeFilter, setActiveFilter] = React.useState<FilterType>('TOUS');

  const handlePreviewEnter = React.useCallback((src: string) => {
    setPreviewSrc(src);
  }, []);

  const handlePreviewMove = React.useCallback(
    (e: React.MouseEvent) => {
      mouseX.set(e.clientX + 24);
      mouseY.set(e.clientY + 24);
    },
    [mouseX, mouseY],
  );

  const handlePreviewLeave = React.useCallback(() => {
    setPreviewSrc(null);
  }, []);

  return (
    <section className="bg-black text-white">
      {/* Pills header - full width but padded */}
      <div className="flex gap-3 flex-wrap py-6 px-5 sm:px-8">
        {FILTERS.map((label) => {
          const isActive = activeFilter === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setActiveFilter(label)}
              className={
                isActive
                  ? 'inline-flex items-center px-5 py-2 bg-white text-black rounded-md text-sm font-semibold'
                  : 'inline-flex items-center px-5 py-2 border border-white/50 rounded-md text-sm font-semibold text-white/80 hover:text-white hover:border-white'
              }
              aria-pressed={isActive}
            >
              {label}
            </button>
          );
        })}
      </div>

      <ul className="pb-4">
        {projects
          .filter((p) => matchesFilter(p, activeFilter))
          .map((p, i) => (
            <ProjectItem
              key={p.id}
              project={p}
              index={i}
              openId={openId}
              setOpenId={setOpenId}
              onPreviewEnter={handlePreviewEnter}
              onPreviewMove={handlePreviewMove}
              onPreviewLeave={handlePreviewLeave}
              onProjectClick={onProjectClick}
            />
          ))}
        {/* trailing border line (edge-to-edge) */}
        <li className="border-t border-dotted border-white/30" />
      </ul>

      {/* Cursor-follow preview */}
      <AnimatePresence>
        {previewSrc ? (
          <motion.div
            key={previewSrc}
            initial={{ opacity: 0, scale: 0.92, y: 6, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.98, y: 3, filter: 'blur(2px)' }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[60] pointer-events-none rounded-2xl overflow-hidden shadow-2xl"
            style={{ left: mouseX, top: mouseY }}
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.14 }}
              className="w-[420px] max-h-[400px] rounded-2xl overflow-hidden ring-1 ring-white/10"
            >
              <Image
                src={previewSrc}
                alt="preview"
                width={840}
                height={560}
                className="w-full h-full object-contain"
                priority={false}
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
