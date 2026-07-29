"use client";

import { AnimatePresence, m } from "@/components/motion";
import { useEffect, useState } from "react";
import styles from "./cinematic.module.css";

/**
 * Auto-crossfading image gallery — used for projects that ship screenshots but
 * no demo video. Cycles through the images with a soft fade so the phone frame
 * still feels alive. Honors prefers-reduced-motion (shows the first frame only).
 */
export function GalleryFade({
  images,
  className,
}: {
  images: readonly string[];
  className?: string;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % images.length), 2800);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className={className}>
      <AnimatePresence initial={false}>
        <m.img
          key={images[i]}
          src={images[i]}
          alt=""
          aria-hidden="true"
          className={styles.galleryImg}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        />
      </AnimatePresence>
    </div>
  );
}
