import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from 'lucide-react';
import { useState } from 'react';
import type { Project } from '@/data/project';
import InfoDrawer from './InfoDrawer';

type Props = {
  project: Project;
  onPrev: () => void;
  onNext: () => void;
  hasCaseStudy: boolean;
};

export default function HudBottomBar({
  project,
  onPrev,
  onNext,
  hasCaseStudy,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col">
      <InfoDrawer project={project} open={expanded} />

      <div className="pointer-events-auto flex flex-col gap-4 border-t border-white/5 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-5 sm:px-8 pt-5 pb-6 backdrop-blur-[2px]">
        <div className="flex items-end justify-between gap-6">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">
                {project.category}
              </span>
            </div>
            <h1 className="font-hubot text-3xl sm:text-5xl md:text-6xl font-bold leading-none tracking-tight text-white">
              {project.longTitle || project.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-white/60 line-clamp-2">
              {project.description}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Projet précédent"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-white/40 hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Projet suivant"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-white/40 hover:bg-white/10"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/80 transition-colors hover:bg-white/10"
          >
            {expanded ? (
              <>
                <ChevronDown className="h-3 w-3" /> Fermer
              </>
            ) : (
              <>
                <ChevronUp className="h-3 w-3" /> Plus d&apos;infos
              </>
            )}
          </button>

          {project.webUrl && (
            <Link
              href={project.webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/80 transition-colors hover:bg-white/10"
            >
              Visiter le site
              <ExternalLink className="h-3 w-3" />
            </Link>
          )}

          {hasCaseStudy && project.slug && (
            <Link
              href={`/case-study/${project.slug}`}
              className="ml-auto inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-black transition-transform hover:scale-[1.02]"
            >
              Voir l&apos;étude de cas
              <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
