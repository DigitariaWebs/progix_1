import { Menu } from 'lucide-react';
import type { Project } from '@/data/project';
import { GlobalMenuToggle } from '@/components/GlobalMenu';

type Props = {
  project: Project;
  index: number;
  total: number;
  onOpenPicker: () => void;
};

export default function HudTopBar({
  project,
  index,
  total,
  onOpenPicker,
}: Props) {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 sm:px-8 py-5">
      <div className="pointer-events-auto flex items-baseline gap-4">
        <span className="font-mono text-xs uppercase tracking-[0.35em] text-white/50">
          Portfolio
        </span>
        <span className="hidden sm:block font-mono text-[11px] uppercase tracking-widest text-white/35">
          /{project.category}
        </span>
      </div>

      <div className="pointer-events-auto flex items-center gap-3 sm:gap-4">
        <span className="font-mono text-xs tabular-nums text-white/60">
          {String(index + 1).padStart(2, '0')}
          <span className="text-white/25">
            {' '}
            / {String(total).padStart(2, '0')}
          </span>
        </span>
        <button
          type="button"
          onClick={onOpenPicker}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:border-white/40 hover:bg-white/10"
        >
          <Menu className="h-3.5 w-3.5" />
          Projets
        </button>
        <span aria-hidden className="h-6 w-px bg-white/10" />
        <GlobalMenuToggle
          iconOnly
          label="Ouvrir le menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-white/90"
        />
      </div>
    </header>
  );
}
