import { cover as devisCover } from "./content";
import styles from "./devis.module.css";

type CoverBadge = { l: string; v: string; u: string };
type CoverMeta = { l: string; v: string };

/**
 * Hero cover: brand gradient, headline, key figures, project metadata. Defaults
 * to the devis cover; pass props to reuse it for the other documents in the set
 * (the badges row is omitted when `badges` is empty).
 */
export function Cover({
  tag = devisCover.tag,
  title = devisCover.title,
  titleLight = devisCover.titleLight,
  subtitle = devisCover.subtitle,
  badges = devisCover.badges,
  meta = devisCover.meta,
}: {
  tag?: string;
  title?: string;
  titleLight?: string;
  subtitle?: string;
  badges?: ReadonlyArray<CoverBadge>;
  meta?: ReadonlyArray<CoverMeta>;
}) {
  return (
    <section className={styles.cover}>
      <div className={styles.coverDots} aria-hidden="true" />
      <img className={styles.coverWatermark} src="/images/logo.png" alt="" aria-hidden="true" />
      <div className={styles.coverInner}>
        <span className={styles.coverChip}>
          <img src="/images/logo.png" alt="Progix" />
        </span>
        <div className={styles.coverEyebrow}>
          <span className={styles.coverEyebrowBar} aria-hidden="true" />
          {tag}
        </div>
        <h1 className={styles.coverTitle}>
          {title} <span className={styles.coverTitleAccent}>{titleLight}</span>
        </h1>
        <p className={styles.coverSubtitle}>{subtitle}</p>
        {badges.length > 0 ? (
          <div className={styles.coverBadges}>
            {badges.map((b) => (
              <div key={b.l} className={styles.coverBadge}>
                <span className={styles.coverBadgeBar} aria-hidden="true" />
                <div className={styles.coverBadgeLabel}>{b.l}</div>
                <div className={styles.coverBadgeValue}>
                  {b.v}
                  <small>{b.u}</small>
                </div>
              </div>
            ))}
          </div>
        ) : null}
        <div className={styles.coverDivider} aria-hidden="true" />
        <div className={styles.coverMeta}>
          {meta.map((m) => (
            <div key={m.l}>
              <div className={styles.coverMetaLabel}>{m.l}</div>
              <div className={styles.coverMetaValue}>{m.v}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.coverFootbar}>
        <div className={styles.coverFootbarInner}>
          <span>
            Une firme de développement logiciel{" "}
            <span className={styles.coverFootAccent}>fièrement montréalaise</span>
          </span>
          <span>contact@progix.pro · progix.pro</span>
        </div>
      </div>
    </section>
  );
}
