'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { teamMembers } from '@/data/teamData';
import { useState } from 'react';

/**
 * Cinematic team grid for the /team page.
 * - Dark stage backdrop
 * - Stagger reveal on scroll
 * - Hover: image colorize + accent line + skills reveal
 * - Image stays in 3/4 portrait card with cinematic black bars
 */

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const EquipeTeamGrid = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="equipe-grid"
      className="relative w-full py-20 sm:py-24 md:py-28 px-4 sm:px-6 md:px-10 lg:px-16 bg-[#0a1a2a] overflow-hidden"
    >
      {/* ambient bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage:
            'radial-gradient(ellipse at top, black 30%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at top, black 30%, transparent 80%)',
        }}
      />
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] rounded-full blur-3xl opacity-30 bg-cyan-400/20" />

      {/* Section header */}
      <div className="relative max-w-7xl mx-auto mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="block w-10 h-px bg-cyan-400/70" />
          <span className="text-[11px] sm:text-xs tracking-[0.4em] uppercase text-cyan-300/90 font-medium">
            / LE CASTING
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.02] text-white"
          >
            UNE PETITE ÉQUIPE, <span className="text-white">9 SIGNATURES</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="md:col-span-4 text-sm sm:text-base text-white/60 leading-relaxed"
          >
            Designers, ingénieurs, stratèges. Chacun apporte une voix
            singulière au projet — et tous partagent la même obsession du
            détail bien fait.
          </motion.p>
        </div>
      </div>

      {/* Grid */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-7">
        {teamMembers.map((member, idx) => {
          const isActive = hovered === member.id;
          const number = String(idx + 1).padStart(2, '0');

          return (
            <motion.a
              key={member.id}
              href={member.linkedinUrl || '#'}
              target={member.linkedinUrl ? '_blank' : undefined}
              rel="noopener noreferrer"
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              onMouseEnter={() => setHovered(member.id)}
              onMouseLeave={() => setHovered(null)}
              className="group relative flex flex-col"
            >
              {/* Card */}
              <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl ring-1 ring-white/10 bg-[#0e2238]">
                <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
                  {member.image && member.image.trim() !== '' ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className={`object-cover transition-all duration-700 ease-out ${
                        isActive
                          ? 'scale-[1.05] saturate-100'
                          : 'saturate-[0.6]'
                      }`}
                      style={
                        member.name === 'Jean Boissoneault'
                          ? { objectPosition: 'top' }
                          : undefined
                      }
                      loading={idx < 4 ? 'eager' : 'lazy'}
                      priority={idx < 4}
                    />
                  ) : null}

                  {/* dark wash gradient (always) */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1a2a] via-[#0a1a2a]/30 to-transparent" />

                  {/* scanline overlay – cinematic */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.08]"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(0deg, rgba(255,255,255,0.7) 0px, rgba(255,255,255,0.7) 1px, transparent 1px, transparent 3px)',
                    }}
                  />

                  {/* number badge */}
                  <div className="absolute top-3 left-3 text-[10px] tracking-[0.3em] uppercase text-white/80 font-medium">
                    {number} /
                  </div>

                  {/* corner ticks */}
                  <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-white/40" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-white/40" />

                  {/* skills reveal on hover */}
                  <motion.div
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="absolute left-3 right-3 bottom-3 flex flex-wrap gap-1.5"
                  >
                    {(member.mainSkills || []).slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="text-[10px] px-2 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white tracking-wide"
                      >
                        {s}
                      </span>
                    ))}
                  </motion.div>

                  {/* hover accent border */}
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl ring-1 transition-all duration-500 ${
                      isActive
                        ? 'ring-cyan-300/70 shadow-[0_0_40px_-10px_rgba(56,189,248,0.6)]'
                        : 'ring-transparent'
                    }`}
                  />
                </div>
              </div>

              {/* Caption */}
              <div className="mt-4 flex items-start gap-3">
                <div
                  className={`mt-2 h-px transition-all duration-500 ${
                    isActive ? 'w-10 bg-cyan-300' : 'w-4 bg-white/40'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base md:text-lg font-bold tracking-wide text-white uppercase truncate">
                    {member.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-white/60 mt-1 leading-relaxed line-clamp-2">
                    {member.role}
                  </p>
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* footer line */}
      <div className="relative max-w-7xl mx-auto mt-14 sm:mt-20 flex items-center justify-between text-[10px] tracking-[0.4em] uppercase text-white/40">
        <span>/ END CAST</span>
        <span>PROGIX · 2026</span>
      </div>
    </section>
  );
};

export default EquipeTeamGrid;
