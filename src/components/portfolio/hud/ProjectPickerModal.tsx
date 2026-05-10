import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { projects } from '@/data/project';
import {
  FILTERS,
  matchesFilter,
  type FilterType,
} from '@/components/sections/ProjectsSection';
import { slugFor } from '../hooks/useProjectNav';

type Props = {
  open: boolean;
  activeIndex: number;
  onClose: () => void;
  onPick: (index: number) => void;
};

export default function ProjectPickerModal({
  open,
  activeIndex,
  onClose,
  onPick,
}: Props) {
  const [filter, setFilter] = useState<FilterType>('TOUS');

  const filtered = projects
    .map((p, i) => ({ p, i }))
    .filter(({ p }) => matchesFilter(p, filter));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="picker"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex flex-col bg-[#0a1628]/95 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 sm:px-8 py-4 sm:py-5">
            <div className="flex items-center gap-4 min-w-0">
              <Link
                href="/"
                aria-label="Retour à l'accueil PROGIX"
                className="flex items-center shrink-0"
              >
                <Image
                  src="/images/logo.png"
                  alt="PROGIX Logo"
                  width={100}
                  height={40}
                  priority
                  draggable={false}
                  className="h-6 w-auto cursor-pointer"
                  style={{
                    filter: 'brightness(0) invert(1)',
                    opacity: 0.9,
                  }}
                />
                <Image
                  src="/images/CertifiedLogo.png"
                  alt="GPTW Certification"
                  width={100}
                  height={40}
                  draggable={false}
                  className="h-10 sm:h-14 w-auto ml-4 mt-4 cursor-pointer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      'none';
                  }}
                />
              </Link>
              <span
                aria-hidden
                className="hidden md:block h-8 w-px bg-white/15"
              />
              <div className="hidden md:block min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                  Portfolio
                </p>
                <h2 className="truncate font-hubot text-xl font-bold text-white">
                  Tous les projets
                </h2>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 border-b border-white/10 px-5 sm:px-8 py-4">
            {FILTERS.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={active}
                  className={
                    active
                      ? 'rounded-full bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-black'
                      : 'rounded-full border border-white/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/70 hover:border-white/40 hover:text-white'
                  }
                >
                  {f}
                </button>
              );
            })}
          </div>

          <div className="grid flex-1 auto-rows-min gap-5 overflow-y-auto px-5 sm:px-8 py-8 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
            {filtered.map(({ p, i }) => {
              const isActive = i === activeIndex;
              return (
                <motion.button
                  key={slugFor(p) + '-' + p.id}
                  type="button"
                  onClick={() => onPick(i)}
                  whileHover={{ y: -4 }}
                  className={`group relative flex flex-col overflow-hidden rounded-xl border text-left transition-colors ${
                    isActive
                      ? 'border-white/60 bg-white/[0.06]'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#050d1c]">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    {isActive && (
                      <span className="absolute top-3 right-3 rounded-full bg-white px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-black">
                        Actif
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 px-4 py-3.5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                      {p.category}
                    </p>
                    <h3 className="font-hubot text-base font-bold leading-tight text-white">
                      {p.title}
                    </h3>
                  </div>
                </motion.button>
              );
            })}
            {filtered.length === 0 && (
              <p className="col-span-full py-16 text-center text-sm text-white/50">
                Aucun projet dans cette catégorie.
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
