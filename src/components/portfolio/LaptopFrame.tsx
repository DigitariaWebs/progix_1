import { AnimatePresence, motion } from 'framer-motion';
import { ZoomIn } from 'lucide-react';
import SmartMedia from './SmartMedia';

export type Media = { kind: 'video' | 'image'; src: string };

type Props = {
  media?: Media;
  alt: string;
  className?: string;
  onOpen?: () => void;
};

export default function LaptopFrame({
  media,
  alt,
  className = '',
  onOpen,
}: Props) {
  const clickable = !!onOpen;
  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative w-full rounded-[14px] bg-gradient-to-b from-[#2a2a2e] to-[#1a1a1c] p-[6px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/5">
        <button
          type="button"
          onClick={onOpen}
          disabled={!clickable}
          aria-label={clickable ? `Agrandir ${alt}` : undefined}
          className={`group relative block aspect-[16/10] w-full overflow-hidden rounded-[8px] bg-black ${clickable ? 'cursor-zoom-in' : ''}`}
        >
          <div className="pointer-events-none absolute left-1/2 top-[6px] z-10 h-[3px] w-[24px] -translate-x-1/2 rounded-full bg-[#0a0a0a] ring-1 ring-white/5" />
          <AnimatePresence mode="wait">
            {media && (
              <motion.div
                key={media.src}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <SmartMedia
                  media={media}
                  alt={alt}
                  sizes="(max-width: 1024px) 90vw, 60vw"
                  fit="cover"
                  priority
                />
              </motion.div>
            )}
          </AnimatePresence>
          {clickable && (
            <span className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center opacity-0 transition-opacity group-hover:opacity-100">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                <ZoomIn className="h-3 w-3" />
                Agrandir
              </span>
            </span>
          )}
        </button>
      </div>
      <div className="relative mx-auto h-[10px] w-[calc(100%+4%)] -translate-y-[2px] rounded-b-[14px] bg-gradient-to-b from-[#2a2a2e] to-[#101012] shadow-[0_15px_30px_-10px_rgba(0,0,0,0.8)]">
        <div className="absolute left-1/2 top-0 h-[3px] w-[80px] -translate-x-1/2 rounded-b-full bg-black/60" />
      </div>
    </div>
  );
}
