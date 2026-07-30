"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Icon } from "./icon";
import { getNavLinks } from "./content";
import styles from "./devis.module.css";

/** Closing call-to-action footer with contact block and document navigation. */
export function Footer({ heading, text }: { heading: string; text: string }) {
  const params = useParams();
  const slug = (params?.client as string) || "client";
  const links = getNavLinks(slug);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerGlow1} aria-hidden="true" />
        <div className={styles.footerGlow2} aria-hidden="true" />
        <div className={styles.footerDots} aria-hidden="true" />
        <div className={styles.footerInner}>
          <img className={styles.footerLogo} src="/progix-logo.png" alt="Progix" />
          <h3 className={styles.footerHeading}>{heading}</h3>
          <p className={styles.footerText}>{text}</p>
          <div className={styles.footerContacts}>
            <span className={styles.footerContact}>
              <Icon name="mail" size={16} style={{ color: "var(--cyan)" }} />
              <b>contact@progix.pro</b>
            </span>
            <span className={styles.footerContact}>
              <Icon name="phone" size={16} style={{ color: "var(--cyan)" }} />
              <b>+1 514 576 5993</b>
            </span>
            <span className={styles.footerContact}>
              <Icon name="globe" size={16} style={{ color: "var(--cyan)" }} />
              <b>progix.pro</b>
            </span>
            <span className={styles.footerContact}>
              <Icon name="pin" size={16} style={{ color: "var(--cyan)" }} />
              <b>Montréal, QC</b>
            </span>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomInner}>
          <span className={styles.footerCopy}>
            © 2026 Progix Inc. · Fièrement montréalaise · NEQ 1181317117
          </span>
          <nav aria-label="Pied de page" className={styles.footerNav}>
            {links.map((l) => (
              <Link key={l.key} href={l.href} className={styles.footerLink}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
