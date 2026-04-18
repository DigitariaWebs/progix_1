import { AnimatePresence, motion } from 'framer-motion';
import { ZoomIn } from 'lucide-react';
import SmartMedia from './SmartMedia';
import type { Media } from './LaptopFrame';

type Props = {
  media?: Media;
  alt: string;
  className?: string;
  onOpen?: () => void;
};

export default function PhoneFrame({
  media,
  alt,
  className = '',
  onOpen,
}: Props) {
  const clickable = !!onOpen;
  return (
    <div className={`relative ${className}`}>
      <div className="relative rounded-[40px] bg-gradient-to-b from-[#1a1a1c] to-[#0a0a0a] p-[4px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
        <button
          type="button"
          onClick={onOpen}
          disabled={!clickable}
          aria-label={clickable ? `Agrandir ${alt}` : undefined}
          className={`group relative block aspect-[9/19.5] w-full overflow-hidden rounded-[36px] bg-black ${clickable ? 'cursor-zoom-in' : ''}`}
        >
          <div className="pointer-events-none absolute left-1/2 top-2 z-10 h-[22px] w-[90px] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/5" />
          <AnimatePresence mode="wait">
            {media && (
              <motion.div
                key={media.src}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <SmartMedia
                  media={media}
                  alt={alt}
                  sizes="(max-width: 1024px) 30vw, 20vw"
                  fit="cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
          {clickable && (
            <span className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center opacity-0 transition-opacity group-hover:opacity-100">
              <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                <ZoomIn className="h-2.5 w-2.5" />
                Ouvrir
              </span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
