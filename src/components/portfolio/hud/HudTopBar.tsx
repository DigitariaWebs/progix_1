import Image from 'next/image';
import Link from 'next/link';
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
      <div className="pointer-events-auto flex items-center gap-3 sm:gap-4">
        <Link
          href="/"
          aria-label="Retour à l'accueil PROGIX"
          className="flex items-center"
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
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        </Link>
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
