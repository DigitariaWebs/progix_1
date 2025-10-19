'use client';

import React from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  services: string[];
  tech: string[];
  image: string;
  preview?: string;
  longTitle?: string;
  longDescription?: string[];
  video?: string;
  bgClass?: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'Rideau Vert',
    category: 'Culture',
    description:
      "Théâtre du Rideau Vert – L’excellence théâtrale au cœur de Montréal.",
    services: ['Site vitrine', 'Design UI/UX'],
    tech: ['Next.js', 'Tailwind CSS'],
    image: '/portfoliominiature/hovertheatre.png',
    preview: '/imagescursorfollowup/theatrerideauvertfondblanc.png',
    longTitle: 'Théâtre du Rideau Vert – L’excellence théâtrale au cœur de Montréal',
    longDescription: [
      "Fondé en 1948, le Théâtre du Rideau Vert est le plus ancien théâtre professionnel francophone encore actif au Canada et un pilier de la culture montréalaise sur l’avenue Saint‑Denis.",
      "Programmation éclectique, création d’ici et expérience accessible: notre mandat a été de concevoir une vitrine moderne, claire et fidèle à son identité.",
    ],
    bgClass: 'bg-white',
  },
  {
    id: 2,
    title: 'Fruit Exotic Inc.',
    category: 'Agroalimentaire',
    description:
      'Vitrine internationale multilingue pour un acteur majeur de l’import de fruits exotiques.',
    services: ['Site vitrine', 'Internationalisation (7 langues)'],
    tech: ['Next.js', 'Tailwind CSS'],
    image: '/portfoliominiature/hovertheatre.png',
    preview: '/imagescursorfollowup/logofruitexotic.avif',
    video: '/fruitexo.mp4',
  },
  {
    id: 3,
    title: 'MONDEV',
    category: 'Site vitrine',
    description:
      'Vitrine web pour promoteur immobilier montréalais, axée sur la clarté des offres et la conversion.',
    services: ['Site vitrine', 'Performance & SEO'],
    tech: ['Next.js', 'Tailwind CSS'],
    image: '/imagescursorfollowup/Header_rentals_1900x500.jpg',
    preview: '/imagescursorfollowup/mondev-logo-black (1).svg',
  },
  {
    id: 4,
    title: 'NovaPay',
    category: 'Fintech',
    description:
      'Modern payment experience focusing on speed, compliance and delightful UX.',
    services: ['BACKEND', 'FRONTEND'],
    tech: ['NEXT.JS', 'NODE.JS'],
    image: '/portfoliominiature/hovertheatre.png',
    preview: '/portfoliominiature/hovertheatre.png',
  },
  {
    id: 5,
    title: 'Mercato',
    category: 'E‑Commerce',
    description:
      'Composable storefront with blazing performance and an opinionated design system.',
    services: ['HEADLESS CMS', 'UI SYSTEM'],
    tech: ['NEXT.JS', 'TAILWIND'],
    image: '/portfoliominiature/hovertheatre.png',
    preview: '/portfoliominiature/hovertheatre.png',
  },
  {
    id: 6,
    title: 'PulseCare',
    category: 'Healthcare',
    description:
      'Clinic operations suite with scheduling, EMR integrations and analytics.',
    services: ['PRODUCT DESIGN', 'INTEGRATIONS'],
    tech: ['REACT', 'NODE.JS'],
    image: '/portfoliominiature/hovertheatre.png',
    preview: '/portfoliominiature/hovertheatre.png',
  },
  {
    id: 7,
    title: 'Horizon IoT',
    category: 'IoT',
    description:
      'Device telemetry, control panels and realtime alerts for industrial fleets.',
    services: ['REALTIME', 'DASHBOARDS'],
    tech: ['WEBSOCKETS', 'TS'],
    image: '/portfoliominiature/hovertheatre.png',
    preview: '/portfoliominiature/hovertheatre.png',
  },
  {
    id: 8,
    title: 'Nebula SaaS',
    category: 'SaaS',
    description:
      'Subscription-based analytics platform with multi-tenant architecture.',
    services: ['MULTI‑TENANT', 'BILLING'],
    tech: ['NEXT.JS', 'POSTGRES'],
    image: '/portfoliominiature/hovertheatre.png',
    preview: '/portfoliominiature/hovertheatre.png',
  },
];

function ProjectItem({
  project,
  index,
  openId,
  setOpenId,
  onPreviewEnter,
  onPreviewMove,
  onPreviewLeave,
}: {
  project: Project;
  index: number;
  openId: number | null;
  setOpenId: (id: number | null) => void;
  onPreviewEnter: (src: string) => void;
  onPreviewMove: (e: React.MouseEvent) => void;
  onPreviewLeave: () => void;
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
        <span className="text-6xl md:text-7xl font-bold tabular-nums leading-none text-white group-hover:text-black transition-colors">{String(index + 1).padStart(2, '0')}</span>
        <span className="text-5xl md:text-6xl font-bold leading-tight ml-12 md:ml-16 text-white group-hover:text-black transition-colors">{project.title}</span>
        <span className="ml-auto hidden md:block mr-8 md:mr-12 text-gray-400 group-hover:text-gray-800 uppercase tracking-wider font-light text-sm md:text-base transition-colors">{project.category}</span>
        <span className="text-4xl md:text-5xl font-light leading-none text-white/80 group-hover:text-black transition-colors">{isOpen ? '–' : '+'}</span>
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
                <div className={`relative rounded-xl overflow-hidden ${project.bgClass ? '' : ''}`}>
                  <div className={`absolute inset-0 ${project.bgClass ? project.bgClass : 'bg-[#3BA7FF]'}`} />
                  <div className="relative p-6 md:p-8">
                    <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden shadow-lg">
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
                        <Image src={project.image} alt={project.title} fill className="object-contain" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: text block */}
                <div className="max-w-3xl ml-auto">
                  <h3 className="text-6xl font-bold leading-tight mb-6">{project.longTitle || project.title}</h3>
                  {project.longDescription ? (
                    <div className="space-y-4 text-white/80">
                      {project.longDescription.map((para, idx) => (
                        <p key={idx} className="text-lg md:text-xl leading-relaxed">{para}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-2xl text-white/80 leading-relaxed mb-10">
                      {project.description}
                    </p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-10 border-b border-dotted border-white/20 mt-8">
                    <div>
                      <div className="text-sm text-white/60 tracking-widest mb-2">SERVICES</div>
                      <div className="font-mono text-sm uppercase space-y-1">
                        {project.services.map((s) => (
                          <div key={s}>{s}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-white/60 tracking-widest mb-2">TECH</div>
                      <div className="font-mono text-sm uppercase space-y-1">
                        {project.tech.map((t) => (
                          <div key={t}>{t}</div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-10">
                    <a
                      href="#"
                      className="inline-flex items-center justify-center px-8 py-4 border border-white rounded-md text-base font-semibold hover:bg-white hover:text-black transition-colors"
                    >
                      VIEW PROJECT 
                      <span className="ml-2">→</span>
                    </a>
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

export default function ProjectsSection() {
  const [openId, setOpenId] = React.useState<number | null>(null);
  const [previewSrc, setPreviewSrc] = React.useState<string | null>(null);
  const mouseX = useMotionValue<number>(0);
  const mouseY = useMotionValue<number>(0);

  const handlePreviewEnter = React.useCallback((src: string) => {
    setPreviewSrc(src);
  }, []);

  const handlePreviewMove = React.useCallback((e: React.MouseEvent) => {
    mouseX.set(e.clientX + 24);
    mouseY.set(e.clientY + 24);
  }, [mouseX, mouseY]);

  const handlePreviewLeave = React.useCallback(() => {
    setPreviewSrc(null);
  }, []);

  return (
    <section className="bg-black text-white">
      {/* Pills header - full width but padded */}
      <div className="flex gap-4 py-6 px-5 sm:px-8">
        <span className="inline-flex items-center px-5 py-2 bg-white text-black rounded-md text-sm font-semibold">WEB 3</span>
        <span className="inline-flex items-center px-5 py-2 border border-white/50 rounded-md text-sm font-semibold text-white/80">WEB 2</span>
      </div>

      <ul className="pb-4">
        {projects.map((p, i) => (
          <ProjectItem
            key={p.id}
            project={p}
            index={i}
            openId={openId}
            setOpenId={setOpenId}
            onPreviewEnter={handlePreviewEnter}
            onPreviewMove={handlePreviewMove}
            onPreviewLeave={handlePreviewLeave}
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
            className="fixed z-[60] pointer-events-none rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
            style={{ left: mouseX, top: mouseY }}
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.14 }}
              className="w-[360px] h-[260px] bg-white"
            >
              <Image
                src={previewSrc}
                alt="preview"
                width={720}
                height={520}
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


