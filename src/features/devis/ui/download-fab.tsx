"use client";

import { Icon } from "./icon";
import styles from "./devis.module.css";

/** Floating button that opens the browser print dialog (export to PDF). */
export function DownloadFab() {
  return (
    <button
      type="button"
      data-noprint
      aria-label="Télécharger le devis en PDF"
      className={styles.dlFab}
      onClick={() => window.print()}
    >
      <Icon name="download" size={16} />
      PDF
    </button>
  );
}
