"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Reveal } from "./reveal";
import { Magnetic } from "./magnetic";
import { getNavLinks } from "../content";
import styles from "./cinematic.module.css";

/**
 * Closing CTA + footer. A glowing call-to-action over a giant ghost wordmark,
 * the contact line, and the document-set navigation.
 */
export function CinematicFooter() {
  const params = useParams();
  const slug = (params?.client as string) || "client";
  const links = getNavLinks(slug);

  return (
    <footer className={styles.footer} id="contact">
      <span className={styles.footerWordmark} aria-hidden="true">
        PROGIX
      </span>
      <div className={styles.footerTop}>
        <span className={styles.footerGlow} aria-hidden="true" />
        <Reveal>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowBar} />
            Parlons-en
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className={styles.footerHeading}>Donnons vie à votre projet</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className={styles.footerText}>
            Réservez une consultation gratuite. On étudie ensemble la viabilité de votre projet et
            on vous donne des recommandations concrètes — sans engagement.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className={styles.footerActions}>
            <Magnetic>
              <Link href={`/devis/${slug}/contrat`} className={styles.btnPrimary}>
                Voir le devis
                <span className={styles.btnArrow}>→</span>
              </Link>
            </Magnetic>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className={styles.footerContacts}>
            <span className={styles.footerContact}>
              <b>Email</b> contact@progix.ca
            </span>
            <span className={styles.footerContact}>
              <b>Basés à</b> Montréal · Canada &amp; France
            </span>
            <span className={styles.footerContact}>
              <b>Réponse</b> sous 24 h
            </span>
          </div>
        </Reveal>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.footerBottomInner}>
          <span className={styles.footerCopy}>
            © 2026 Progix Inc. · NEQ 1181317117 — Tous droits réservés.
          </span>
          <nav className={styles.footerNav} aria-label="Navigation du document">
            {links.map((lnk) => (
              <Link key={lnk.key} href={lnk.href} className={styles.footerLink}>
                {lnk.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
