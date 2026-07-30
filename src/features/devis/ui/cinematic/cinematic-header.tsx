"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { m } from "@/components/motion";
import { useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { getNavLinks } from "../content";
import styles from "./cinematic.module.css";

/**
 * Cinematic sticky header: transparent over the hero, frosts to glass once
 * scrolled, with a gradient scroll-progress bar and a glowing CTA. Collapses to
 * a full-screen-ish glass dropdown on mobile.
 */
export function CinematicHeader({ active = "accueil" }: { active?: string }) {
  const params = useParams();
  const slug = (params?.client as string) || "client";
  const links = getNavLinks(slug);

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={cn(styles.header, scrolled && styles.headerScrolled)}>
      <div className={styles.headerInner}>
        <Link href={`/devis/${slug}/contrat`} className={styles.brand} aria-label="Progix — Devis contractuel">
          <img className={styles.brandLogo} src="/images/logo.png" alt="Progix" />
        </Link>

        <nav aria-label="Navigation principale" className={styles.nav}>
          {links.map((lnk) => (
            <Link
              key={lnk.key}
              href={lnk.href}
              aria-current={lnk.key === active ? "page" : undefined}
              className={cn(styles.navLink, lnk.key === active && styles.navLinkActive)}
            >
              {lnk.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className={styles.menuBtn}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="cin-mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={cn(styles.menuBar, open && styles.menuBarTop)} aria-hidden="true" />
          <span className={cn(styles.menuBar, open && styles.menuBarMid)} aria-hidden="true" />
          <span className={cn(styles.menuBar, open && styles.menuBarBot)} aria-hidden="true" />
        </button>

        <div className={styles.progressTrack} aria-hidden="true">
          <m.div className={styles.progressBar} style={{ scaleX: progress }} />
        </div>
      </div>

      <div id="cin-mobile-menu" className={cn(styles.mobileMenu, open && styles.mobileMenuOpen)}>
        {links.map((lnk) => (
          <Link
            key={lnk.key}
            href={lnk.href}
            aria-current={lnk.key === active ? "page" : undefined}
            className={cn(styles.mobileLink, lnk.key === active && styles.mobileLinkActive)}
            onClick={() => setOpen(false)}
          >
            {lnk.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
