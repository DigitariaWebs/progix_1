import { ZoomIn } from 'lucide-react';
import { hasMobile, hasWeb, type Project } from '@/data/project';
import LaptopFrame, { type Media } from './LaptopFrame';
import PhoneFrame from './PhoneFrame';
import SmartMedia from './SmartMedia';

type TileProps = {
  media?: Media;
  alt: string;
  aspect: string;
  sizes: string;
  onOpen?: () => void;
};

function MediaTile({ media, alt, aspect, sizes, onOpen }: TileProps) {
  const clickable = !!onOpen;
  return (
    <button
      type="button"
      onClick={onOpen}
      disabled={!clickable}
      aria-label={clickable ? `Agrandir ${alt}` : undefined}
      className={`group relative block w-full overflow-hidden rounded-[22px] bg-white/[0.02] ring-1 ring-white/10 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7)] ${aspect} ${clickable ? 'cursor-zoom-in' : ''}`}
    >
      {media && (
        <SmartMedia
          media={media}
          alt={alt}
          sizes={sizes}
          fit="cover"
          priority
        />
      )}
      {clickable && (
        <span className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            <ZoomIn className="h-3 w-3" />
            Agrandir
          </span>
        </span>
      )}
    </button>
  );
}

type Props = {
  project: Project;
  onOpenGallery: (images: string[], portrait: boolean) => void;
};

function pickGallery(items: (string | undefined)[]) {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const src of items) {
    if (!src || seen.has(src)) continue;
    seen.add(src);
    out.push(src);
  }
  return out;
}

function isVideo(src?: string) {
  return !!src && /\.(mp4|webm|mov)(\?|$)/i.test(src);
}

function toMedia(src?: string): Media | undefined {
  if (!src) return undefined;
  return { kind: isVideo(src) ? 'video' : 'image', src };
}

function pickWebMedia(p: Project): Media | undefined {
  if (p.webVideo) return { kind: 'video', src: p.webVideo };
  return toMedia(p.webPreview || p.webGallery?.[0]);
}

function pickMobileMedia(p: Project): Media | undefined {
  if (p.mobileVideo) return { kind: 'video', src: p.mobileVideo };
  return toMedia(p.mobilePreview || p.mobileGallery?.[0]);
}

export default function DeviceShowcase({ project, onOpenGallery }: Props) {
  const web = hasWeb(project);
  const mobile = hasMobile(project);

  const webGallery = pickGallery([
    project.webVideo,
    project.webPreview,
    ...(project.webGallery ?? []),
  ]);
  const mobileGallery = pickGallery([
    project.mobileVideo,
    project.mobilePreview,
    ...(project.mobileGallery ?? []),
  ]);

  const webMedia = pickWebMedia(project);
  const mobileMedia = pickMobileMedia(project);

  const openWeb =
    webGallery.length > 0 ? () => onOpenGallery(webGallery, false) : undefined;
  const openMobile =
    mobileGallery.length > 0
      ? () => onOpenGallery(mobileGallery, true)
      : undefined;

  if (web && mobile) {
    return (
      <div className="mx-auto flex w-full max-w-[780px] flex-col items-center gap-6 sm:flex-row sm:items-stretch sm:justify-center sm:gap-5 lg:gap-6">
        <div className="w-full min-w-0 sm:flex-[1.7]">
          <MediaTile
            media={webMedia}
            alt={`${project.title} — web`}
            aspect="aspect-[16/10]"
            sizes="(max-width: 640px) 90vw, 55vw"
            onOpen={openWeb}
          />
        </div>
        <div className="w-[58%] min-w-[160px] max-w-[220px] sm:w-auto sm:flex-1 sm:max-w-[240px]">
          <MediaTile
            media={mobileMedia}
            alt={`${project.title} — mobile`}
            aspect="aspect-[9/16]"
            sizes="(max-width: 640px) 60vw, 220px"
            onOpen={openMobile}
          />
        </div>
      </div>
    );
  }

  if (web) {
    return (
      <div className="mx-auto w-full max-w-[640px]">
        <LaptopFrame
          media={webMedia}
          alt={`${project.title} — web`}
          onOpen={openWeb}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-[240px] sm:w-[260px]">
      <PhoneFrame
        media={mobileMedia}
        alt={`${project.title} — mobile`}
        onOpen={openMobile}
      />
    </div>
  );
}
