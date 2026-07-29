import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./devis.module.css";

/** Numbered section header with the big outlined watermark number. */
export function SectionHeader({ num, title, lead }: { num: string; title: string; lead?: string }) {
  const bigNum = num.match(/\d+/)?.[0] ?? "";
  return (
    <header className={styles.sechead}>
      <div className={styles.secheadBigNum} aria-hidden="true">
        {bigNum}
      </div>
      <div className={styles.secheadBody}>
        <div className={styles.secheadNum}>
          <span className={styles.secheadDot} aria-hidden="true" />
          {num}
        </div>
        <h2 className={styles.secheadTitle}>{title}</h2>
        <div className={styles.secheadRule} aria-hidden="true">
          <span className={styles.secheadRuleBar} />
        </div>
        {lead ? <p className={styles.secheadLead}>{lead}</p> : null}
      </div>
    </header>
  );
}

/** Tinted callout box with an icon chip. */
export function InfoBox({
  variant = "cyan",
  icon,
  title,
  children,
}: {
  variant?: "cyan" | "ok";
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  const ok = variant === "ok";
  return (
    <div className={cn(styles.infobox, ok && styles.infoboxOk)}>
      <div className={cn(styles.infoboxIcon, ok && styles.infoboxIconOk)} aria-hidden="true">
        {icon}
      </div>
      <div>
        <h3 className={cn(styles.infoboxTitle, ok && styles.infoboxTitleOk)}>{title}</h3>
        <p className={styles.infoboxText}>{children}</p>
      </div>
    </div>
  );
}

/** Small uppercase status pill (e.g. “Optionnel”). */
export function Pill({ children }: { children: ReactNode }) {
  return <span className={styles.pill}>{children}</span>;
}

/** Subsection heading with the cyan diamond marker. */
export function SubHeading({ children, first = false }: { children: ReactNode; first?: boolean }) {
  return (
    <h3 className={cn(styles.h3, first && styles.h3First)}>
      <span className={styles.h3Diamond} aria-hidden="true">
        ◆
      </span>
      {children}
    </h3>
  );
}

/** Lettered/numbered subsection heading (Engagements A/B, Dispositions 1-4). */
export function BadgeHeading({
  badge,
  children,
  first = false,
}: {
  badge: ReactNode;
  children: ReactNode;
  first?: boolean;
}) {
  return (
    <h3 className={cn(styles.subhead, first && styles.subheadFirst)}>
      <span className={styles.subheadBadge} aria-hidden="true">
        {badge}
      </span>
      {children}
    </h3>
  );
}

/** Emphasized inline run, matching the source’s `<strong>` ink styling. */
export function Strong({ children }: { children: ReactNode }) {
  return <strong className={styles.strong}>{children}</strong>;
}
