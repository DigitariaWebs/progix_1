"use client";

import { m } from "@/components/motion";
import { useScroll, useTransform } from "motion/react";
import { Counter } from "./counter";
import styles from "./cinematic.module.css";

const TITLE_LEAD = ["L’ingénierie", "logicielle", "qui", "fait"];
const TITLE_ACCENT = ["grandir", "votre", "entreprise"];

const PROOF = [
  { to: 140, suffix: "+", label: "Projets livrés en production" },
  { to: 12, suffix: "", label: "Ingénieurs seniors dédiés" },
  { to: 100, suffix: " %", label: "Propriété du code au client" },
];

const wordIn = {
  hidden: { opacity: 0, y: "0.5em", filter: "blur(12px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.15 + i * 0.07, duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/**
 * Full-viewport hero: drifting aurora blobs, faint logo watermark, a kinetic
 * word-by-word headline reveal, magnetic CTAs and animated proof counters.
 */
export function CinematicHero() {
  const { scrollY } = useScroll();
  const auraY = useTransform(scrollY, [0, 900], [0, 220]);
  const contentY = useTransform(scrollY, [0, 700], [0, -60]);
  const cueOpacity = useTransform(scrollY, [0, 240], [1, 0]);

  return (
    <section className={styles.hero}>
      <m.div className={styles.heroAura} aria-hidden="true" style={{ y: auraY }}>
        <span className={`${styles.heroBlob} ${styles.heroBlob1}`} />
        <span className={`${styles.heroBlob} ${styles.heroBlob2}`} />
        <span className={`${styles.heroBlob} ${styles.heroBlob3}`} />
      </m.div>
      <img className={styles.heroWatermark} src="/images/logo.png" alt="" aria-hidden="true" />

      <m.div className={styles.heroInner} style={{ y: contentY }}>
        <div className={styles.heroLeft}>
          <m.span
            className={styles.heroTag}
            initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.heroTagPulse} />
            Firme d’ingénierie logicielle · Montréal
          </m.span>

          <h1 className={styles.heroTitle}>
            {TITLE_LEAD.map((w, i) => (
              <m.span
                key={w}
                className={styles.heroWord}
                custom={i}
                variants={wordIn}
                initial="hidden"
                animate="show"
              >
                {w}{" "}
              </m.span>
            ))}
            {TITLE_ACCENT.map((w, i) => (
              <m.span
                key={w}
                className={`${styles.heroWord} ${styles.gradText}`}
                custom={TITLE_LEAD.length + i}
                variants={wordIn}
                initial="hidden"
                animate="show"
              >
                {w}{" "}
              </m.span>
            ))}
          </h1>

          <m.p
            className={styles.heroSub}
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Applications mobiles · CRM &amp; ERP · Intelligence artificielle. Nous concevons,
            développons et accompagnons des produits qui génèrent des revenus.
          </m.p>
        </div>

        <m.div
          className={`${styles.glass} ${styles.heroCard}`}
          initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.spotlight} aria-hidden="true" />
          <div className={styles.heroCardHead}>
            <span className={styles.heroTagPulse} />
            Progix en chiffres
          </div>
          {PROOF.map((p) => (
            <div key={p.label} className={styles.heroStat}>
              <div className={styles.heroStatNum}>
                <span>
                  <Counter value={p.to} suffix={p.suffix} />
                </span>
              </div>
              <div className={styles.heroStatLabel}>{p.label}</div>
            </div>
          ))}
          <div className={styles.heroCardFoot}>
            <span className={styles.eyebrowBar} aria-hidden="true" />
            Équipe Canada &amp; France · Réponse sous 24 h
          </div>
        </m.div>
      </m.div>

      <m.div className={styles.scrollCue} aria-hidden="true" style={{ opacity: cueOpacity }}>
        <span className={styles.scrollCueLine} />
        Défiler
      </m.div>
    </section>
  );
}
