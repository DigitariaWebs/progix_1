"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { getNavLinks } from "./content";
import styles from "./devis.module.css";

/**
 * Sticky brand header. On desktop the document nav sits inline; on mobile it
 * collapses behind a menu button that opens a dropdown panel. `active` is the
 * navLinks key of the current document so its item is highlighted.
 */
export function DcHeader({ active = "devis" }: { active?: string }) {
  const params = useParams();
  const slug = (params?.client as string) || "client";
  const links = getNavLinks(slug);

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape.
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

        {/* Inline nav (desktop) */}
        <nav aria-label="Navigation principale" className={styles.nav}>
          {links.map((lnk) => {
            const isActive = lnk.key === active;
            return (
              <Link
                key={lnk.key}
                href={lnk.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(styles.navLink, isActive && styles.navLinkActive)}
              >
                {lnk.label}
              </Link>
            );
          })}
        </nav>

        {/* Menu button (mobile) */}
        <button
          type="button"
          className={styles.menuBtn}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="dc-mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={cn(styles.menuBar, open && styles.menuBarTop)} aria-hidden="true" />
          <span className={cn(styles.menuBar, open && styles.menuBarMid)} aria-hidden="true" />
          <span className={cn(styles.menuBar, open && styles.menuBarBot)} aria-hidden="true" />
        </button>
      </div>

      {/* Dropdown menu (mobile) */}
      <div id="dc-mobile-menu" className={cn(styles.mobileMenu, open && styles.mobileMenuOpen)}>
        <nav aria-label="Navigation principale" className={styles.mobileNav}>
          {links.map((lnk) => {
            const isActive = lnk.key === active;
            return (
              <Link
                key={lnk.key}
                href={lnk.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(styles.mobileNavLink, isActive && styles.mobileNavLinkActive)}
                onClick={() => setOpen(false)}
              >
                {lnk.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
