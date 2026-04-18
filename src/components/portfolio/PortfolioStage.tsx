'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import DeviceShowcase from './DeviceShowcase';
import HudTopBar from './hud/HudTopBar';
import ProjectPickerModal from './hud/ProjectPickerModal';
import Lightbox from './Lightbox';
import { useProjectNav } from './hooks/useProjectNav';

const CASE_STUDY_SLUGS = new Set(['fahe-crm']);

type LightboxState = { images: string[]; portrait: boolean } | null;

export default function PortfolioStage() {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const nav = useProjectNav({ disabled: pickerOpen || lightbox !== null });
  const [direction, setDirection] = useState(0);
  const [lastIndex, setLastIndex] = useState(nav.index);

  useEffect(() => {
    if (lastIndex !== nav.index) {
      setDirection(nav.index > lastIndex ? 1 : -1);
      setLastIndex(nav.index);
    }
  }, [nav.index, lastIndex]);

  const p = nav.project;
  const hasCaseStudy = !!(p.slug && CASE_STUDY_SLUGS.has(p.slug));

  return (
    <div
      className="relative min-h-[100svh] bg-[#0a0a0a] text-white overflow-hidden"
      onTouchStart={nav.onTouchStart}
      onTouchEnd={nav.onTouchEnd}
    >
      {/* Background aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            'radial-gradient(80% 60% at 50% 30%, rgba(92,120,160,0.18), transparent 70%), radial-gradient(40% 40% at 80% 80%, rgba(160,90,120,0.1), transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <HudTopBar
        project={p}
        index={nav.index}
        total={nav.total}
        onOpenPicker={() => setPickerOpen(true)}
      />

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 items-center gap-10 px-5 pt-28 pb-40 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        {/* Left: device showcase */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={p.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <DeviceShowcase
                project={p}
                onOpenGallery={(images, portrait) =>
                  setLightbox({ images, portrait })
                }
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: info panel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-5"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
                  {p.category}
                </span>
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <h1 className="font-hubot text-4xl font-bold leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
                {p.longTitle || p.title}
              </h1>
              <p className="max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
                {p.description}
              </p>

              {p.longDescription && p.longDescription.length > 0 && (
                <div className="space-y-3 border-l border-white/10 pl-5 text-sm text-white/55">
                  {p.longDescription.slice(0, 2).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-6 pt-2">
                <div>
                  <h3 className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                    Services
                  </h3>
                  <ul className="space-y-1 text-sm text-white/80">
                    {p.services.slice(0, 4).map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                    Stack
                  </h3>
                  <ul className="space-y-1 text-sm text-white/80">
                    {p.tech.slice(0, 4).map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap gap-3">
                {p.webUrl && (
                  <Link
                    href={p.webUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white/10"
                  >
                    Visiter le site
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                )}
                {hasCaseStudy && p.slug && (
                  <Link
                    href={`/case-study/${p.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-black transition-transform hover:scale-[1.02]"
                  >
                    Voir l&apos;étude de cas
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom nav rail */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex items-center justify-between gap-4 border-t border-white/5 bg-gradient-to-t from-black/90 to-black/40 px-5 py-5 sm:px-8 backdrop-blur-sm">
        <button
          type="button"
          onClick={nav.prev}
          className="pointer-events-auto group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/60 transition-colors hover:text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 group-hover:border-white/40">
            ←
          </span>
          Précédent
        </button>

        <div className="pointer-events-none font-mono text-xs tabular-nums text-white/50">
          {String(nav.index + 1).padStart(2, '0')}
          <span className="text-white/25">
            {' '}
            / {String(nav.total).padStart(2, '0')}
          </span>
        </div>

        <button
          type="button"
          onClick={nav.next}
          className="pointer-events-auto group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/60 transition-colors hover:text-white"
        >
          Suivant
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 group-hover:border-white/40">
            →
          </span>
        </button>
      </div>

      <ProjectPickerModal
        open={pickerOpen}
        activeIndex={nav.index}
        onClose={() => setPickerOpen(false)}
        onPick={(i) => {
          setPickerOpen(false);
          nav.goTo(i);
        }}
      />

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          index={0}
          portrait={lightbox.portrait}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
