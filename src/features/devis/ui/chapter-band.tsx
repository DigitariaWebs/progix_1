import styles from "./devis.module.css";

type BandStat = { n: string; u?: string; l: string };

/**
 * Full-bleed navy “chapter” band — a dark interstitial that breaks the run of
 * pale sections and gives the long documents rhythm. Reuses the hero/footer
 * brand language (navy gradient, cyan dot texture, glow, watermark arrow).
 */
export function ChapterBand({
  eyebrow,
  title,
  titleAccent,
  sub,
  stats,
}: {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  sub?: string;
  stats?: ReadonlyArray<BandStat>;
}) {
  return (
    <section className={styles.band}>
      <div className={styles.bandDots} aria-hidden="true" />
      <div className={styles.bandGlow} aria-hidden="true" />
      <div className={styles.bandInner}>
        <div className={styles.bandEyebrow}>
          <span className={styles.bandEyebrowBar} aria-hidden="true" />
          {eyebrow}
        </div>
        <h2 className={styles.bandTitle}>
          {title}
          {titleAccent ? (
            <>
              {" "}
              <span className={styles.bandTitleAccent}>{titleAccent}</span>
            </>
          ) : null}
        </h2>
        {sub ? <p className={styles.bandSub}>{sub}</p> : null}
        {stats && stats.length > 0 ? (
          <div className={styles.bandStats}>
            {stats.map((s) => (
              <div key={s.l}>
                <div className={styles.bandStatNum}>
                  {s.n}
                  {s.u ? <small>{s.u}</small> : null}
                </div>
                <div className={styles.bandStatLabel}>{s.l}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
