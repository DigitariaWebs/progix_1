import Link from "next/link";
import { Cover } from "./cover";
import { DcHeader } from "./dc-header";
import { Footer } from "./footer";
import { ScrollReveal } from "./scroll-reveal";
import { SectionHeader } from "./primitives";
import { ChapterBand } from "./chapter-band";
import styles from "./devis.module.css";
import type { ClientEstimate } from "../types";

/* ---------- Cover data (from the renderVals() island) ---------- */
const coverBadges: ReadonlyArray<{ l: string; v: string; u: string }> = [
  { l: "Durée totale", v: "90", u: " j" },
  { l: "Sprints", v: "6", u: "" },
  { l: "Phases", v: "5", u: "" },
  { l: "Jalons", v: "3", u: "" },
];

const coverMeta: ReadonlyArray<{ l: string; v: string }> = [
  { l: "Projet", v: "Trajeo (nom de travail)" },
  { l: "Client", v: "Karima" },
  { l: "Prestataire", v: "Progix Inc. · NEQ 1181317117" },
  { l: "Référence · Version", v: "SPRINT-PROGIX-2026 · v1.0" },
];

/* ---------- Section 01 — overview data ---------- */
type Stat = { n: string; u: string; l: string };
const stats: ReadonlyArray<Stat> = [
  { n: "90", u: " jours", l: "de la signature à la validation sur les stores" },
  { n: "60", u: " j", l: "de développement, puis 30 j de production" },
  { n: "5", u: "", l: "phases avec validation client" },
  { n: "3", u: "", l: "jalons de paiement, sur un forfait mensuel" },
];

const G_NV = "linear-gradient(90deg,var(--navy),var(--navy-700))";
const G_TL = "linear-gradient(90deg,var(--navy-700),var(--cyan-deep))";
const G_CY = "linear-gradient(90deg,var(--cyan-deep),var(--cyan))";

type GanttRow = {
  name: string;
  sprint: string;
  left: string;
  width: string;
  label: string;
  bg: string;
};
const gantt: ReadonlyArray<GanttRow> = [
  {
    name: "Cadrage & design",
    sprint: "Sprint 1",
    left: "0%",
    width: "15.6%",
    label: "J1–14",
    bg: G_NV,
  },
  {
    name: "Dév — passager & chauffeur",
    sprint: "Sprint 2",
    left: "15.6%",
    width: "17.7%",
    label: "J15–30",
    bg: G_TL,
  },
  {
    name: "Matching, géoloc & paiement",
    sprint: "Sprint 3",
    left: "33.3%",
    width: "17.8%",
    label: "J31–46",
    bg: G_CY,
  },
  {
    name: "Notation, back-office & tests",
    sprint: "Sprint 4",
    left: "51.1%",
    width: "15.6%",
    label: "J47–60",
    bg: G_CY,
  },
  {
    name: "Publication & reviews stores",
    sprint: "Sprint 5",
    left: "66.7%",
    width: "17.8%",
    label: "J61–76",
    bg: G_NV,
  },
  {
    name: "Test Google Play & validation",
    sprint: "Sprint 6",
    left: "84.5%",
    width: "15.5%",
    label: "J77–90",
    bg: G_NV,
  },
];

/* ---------- Section 02 — sprint detail data ---------- */
const ACC = "linear-gradient(160deg,var(--cyan-deep),var(--cyan))";
const NAV = "linear-gradient(160deg,var(--navy-900),var(--navy))";

type Tag = { label: string; bg: string; fg: string; bd: string };
const cy = (label: string): Tag => ({
  label,
  bg: "var(--tint)",
  fg: "var(--cyan-ink)",
  bd: "none",
});
const nv = (label: string): Tag => ({
  label,
  bg: "rgba(255,255,255,0.08)",
  fg: "#cdd9ec",
  bd: "none",
});
const gh = (label: string): Tag => ({
  label,
  bg: "rgba(255,255,255,0.05)",
  fg: "var(--muted)",
  bd: "1px solid var(--line)",
});
const okT = (label: string): Tag => ({ label, bg: "var(--ok-bg)", fg: "var(--ok)", bd: "none" });

type Feat = { b: string; t: string };
const F = (b: string, t: string): Feat => ({ b, t });

type Sprint = {
  hasPhase: boolean;
  phaseNum?: string;
  phaseTitle?: string;
  phaseDays?: string;
  phaseDotBg?: string;
  leftBg: string;
  num: string;
  days: string;
  name: string;
  feats: ReadonlyArray<Feat>;
  tags: ReadonlyArray<Tag>;
};

const sprints: ReadonlyArray<Sprint> = [
  {
    hasPhase: true,
    phaseNum: "1",
    phaseTitle: "Phase 1 — Cadrage & design",
    phaseDays: "J1 – J14",
    phaseDotBg: "var(--navy)",
    leftBg: NAV,
    num: "1",
    days: "J1–J14",
    name: "Cadrage & design UI/UX",
    feats: [
      F("", "Réunion de kickoff et cadrage détaillé du projet."),
      F("Définition des parcours passager & chauffeur", " et des règles de mobilité à la demande."),
      F("Maquettes des écrans clés", " : réservation de course, matching, suivi, paiement."),
      F(
        "",
        "Direction artistique, identité visuelle et choix de la stack · jusqu’à 3 révisions incluses.",
      ),
    ],
    tags: [cy("Cadrage validé"), nv("Maquettes validées"), gh("Backlog priorisé")],
  },
  {
    hasPhase: true,
    phaseNum: "2",
    phaseTitle: "Phase 2 — Développement",
    phaseDays: "J15 – J60",
    phaseDotBg: "var(--cyan-deep)",
    leftBg: ACC,
    num: "2",
    days: "J15–J30",
    name: "Inscription, profils & vérification chauffeur",
    feats: [
      F("Inscription et authentification", " des passagers et des chauffeurs."),
      F("Profils chauffeur", " avec vérification des documents (permis, véhicule, assurance)."),
      F("", "Gestion des comptes, des rôles et du parcours d’onboarding."),
      F("", "Base de données et fondations de l’API back-end."),
    ],
    tags: [cy("Comptes & profils"), nv("Vérification chauffeur")],
  },
  {
    hasPhase: false,
    leftBg: ACC,
    num: "3",
    days: "J31–J46",
    name: "Réservation, estimation & matching temps réel",
    feats: [
      F("Réservation de course", " avec choix du départ et de la destination."),
      F("Estimation de prix", " et calcul de l’itinéraire."),
      F("Matching temps réel", " entre passagers et chauffeurs disponibles."),
      F("", "Premier build de test (TestFlight / APK) et itérations."),
    ],
    tags: [cy("Cœur fonctionnel"), nv("Matching temps réel")],
  },
  {
    hasPhase: false,
    leftBg: ACC,
    num: "4",
    days: "J47–J60",
    name: "Géolocalisation, suivi de course & paiement",
    feats: [
      F("Géolocalisation et suivi de course", " en direct sur la carte."),
      F("Paiement in-app", " et notifications push à chaque étape clé."),
      F("Notation mutuelle", " passager / chauffeur et historique des courses."),
      F("", "Back-office, modération et tests internes (QA)."),
    ],
    tags: [cy("Suivi & paiement"), nv("Back-office & tests")],
  },
  {
    hasPhase: true,
    phaseNum: "3",
    phaseTitle: "Phase 3 — Production & publication",
    phaseDays: "J61 – J90",
    phaseDotBg: "var(--cyan)",
    leftBg: ACC,
    num: "5",
    days: "J61–J76",
    name: "Publication App Store & Google Play",
    feats: [
      F("Préparation des fiches stores", " (textes, visuels, captures)."),
      F("Soumission", " à l’App Store et à Google Play."),
      F("Gestion des reviews Apple & Google", " et réponses aux demandes."),
      F("", "Correctifs demandés par les équipes de validation des stores."),
    ],
    tags: [cy("Soumission stores"), nv("Reviews Apple & Google")],
  },
  {
    hasPhase: false,
    leftBg: NAV,
    num: "6",
    days: "J77–J90",
    name: "Test Google Play, correctifs & validation finale",
    feats: [
      F("Période de test obligatoire Google Play", " de 14 jours incluse."),
      F("", "Correctifs et itérations demandés jusqu’à validation."),
      F("Suivi jusqu’à la mise en ligne", " sur l’App Store et Google Play."),
      F(
        "",
        "La livraison est terminée uniquement lorsque l’app est validée et disponible sur les stores.",
      ),
    ],
    tags: [okT("Application publiée"), nv("Validation stores")],
  },
];

/* ---------- Section 03 — payment milestones data ---------- */
type Mile = { pct: string; nm: string; when: string; amt: string; trig: string };
const miles: ReadonlyArray<Mile> = [
  {
    pct: "MOIS 1–2 · ≈ 933 €/MOIS",
    nm: "Au démarrage",
    when: "À la signature, puis chaque mois pendant le développement",
    amt: "1 867 €",
    trig: "Déclenche le cadrage",
  },
  {
    pct: "MOIS 3–4 · ≈ 933 €/MOIS",
    nm: "Pendant le développement",
    when: "Versements mensuels sur la phase de développement",
    amt: "1 867 €",
    trig: "Développement en cours",
  },
  {
    pct: "MOIS 5–6 · ≈ 933 €/MOIS",
    nm: "Production & validation",
    when: "Sur la phase de production, jusqu’à validation sur les stores",
    amt: "1 866 €",
    trig: "Solde final",
  },
];

const dispFont = "var(--font-disp)";

/**
 * "Calendrier des sprints" document for Trajeo — header, hero cover, the four
 * content sections (overview + Gantt, sprint detail, payment milestones,
 * cadence & validation), and the footer. Covers the 90-day plan (60 j de
 * développement puis 30 j de production et publication sur les stores). A
 * Server Component composing client leaves (header, FAB, scroll-reveal) at the
 * edges.
 */
export function CalendrierDocument({ estimate }: { estimate?: ClientEstimate }) {
  const meta = estimate
    ? [
        { l: "Projet", v: estimate.project_name },
        { l: "Client", v: estimate.client_name },
        { l: "Prestataire", v: "Progix Inc. · NEQ 1181317117" },
        { l: "Référence · Date", v: `DEVIS-PROGIX-${new Date().getFullYear()}` },
      ]
    : coverMeta;

  const badges = estimate
    ? [
        { l: "Durée totale", v: `${estimate.delivery_days}`, u: " j" },
        { l: "Sprints", v: "6", u: "" },
        { l: "Phases", v: "5", u: "" },
        { l: "Jalons", v: "3", u: "" },
      ]
    : coverBadges;

  return (
    <div className={styles.root} data-devis-root>
      <DcHeader active="calendrier" />
      <main className={styles.main}>
        <Cover
          tag="Calendrier des sprints · Planning de réalisation"
          title="Le plan de"
          titleLight="livraison, sprint par sprint"
          subtitle={
            estimate
              ? `Découpage détaillé de la réalisation de ${estimate.project_name} sur ${estimate.delivery_days} jours. Livraison itérative avec validation à chaque étape, alignée sur l’échéancier du devis.`
              : "Découpage détaillé de la réalisation de Trajeo sur 90 jours — 60 jours de développement puis 30 jours de production et de publication sur les stores. Livraison itérative avec validation à chaque étape, alignée sur l’échéancier du devis."
          }
          badges={badges}
          meta={meta}
        />

        {/* 01 — VUE D’ENSEMBLE */}
        <section
          id="s1"
          data-dc-section
          style={{
            width: "100%",
            backgroundColor: "var(--band-a)",
          }}
        >
          <div
            style={{
              maxWidth: "1040px",
              margin: "0 auto",
              padding: "clamp(56px,7vw,94px) clamp(24px,5vw,48px)",
            }}
          >
            <SectionHeader
              num="01 — VUE D’ENSEMBLE"
              title="Vue d’ensemble du planning"
              lead="Le projet est livré de façon itérative sur 90 jours : 60 jours de développement, puis 30 jours de production et de publication sur les stores. Le calendrier ci-dessous s’aligne sur les phases et l’échéancier de paiement du devis."
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,150px),1fr))",
                gap: "1px",
                background: "var(--line)",
                border: "1px solid var(--line)",
                borderRadius: "14px",
                overflow: "hidden",
                margin: "18px 0",
              }}
            >
              {stats.map((t) => (
                <div
                  key={t.l}
                  style={{ background: "var(--card)", padding: "20px 16px", textAlign: "center" }}
                >
                  <div
                    style={{
                      fontFamily: dispFont,
                      fontWeight: 700,
                      fontSize: "28px",
                      color: "#fff",
                      letterSpacing: "-.02em",
                    }}
                  >
                    {t.n}
                    <small style={{ fontSize: "14px", color: "var(--cyan)", fontWeight: 600 }}>
                      {t.u}
                    </small>
                  </div>
                  <div
                    style={{
                      fontSize: "11.5px",
                      color: "var(--muted)",
                      marginTop: "4px",
                      lineHeight: 1.35,
                    }}
                  >
                    {t.l}
                  </div>
                </div>
              ))}
            </div>
            <h3
              style={{
                fontFamily: dispFont,
                fontSize: "18px",
                color: "#fff",
                fontWeight: 600,
                margin: "30px 0 12px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span style={{ color: "var(--cyan)", fontSize: "13px" }}>◆</span>Diagramme de Gantt
            </h3>
            <div style={{ overflowX: "auto", margin: "16px 0" }}>
              <div
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: "14px",
                  padding: "22px 22px 18px",
                  background: "var(--paper)",
                  minWidth: "640px",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    height: "16px",
                    marginLeft: "172px",
                    marginBottom: "12px",
                    borderBottom: "1px solid var(--line)",
                  }}
                >
                  {(
                    [
                      { left: "0%", label: "J1" },
                      { left: "18%", label: "J18" },
                      { left: "38%", label: "J36" },
                      { left: "58%", label: "J54" },
                      { left: "78%", label: "J72" },
                      { left: "98%", label: "J90" },
                    ] as const
                  ).map((mark) => (
                    <span
                      key={mark.label}
                      style={{
                        position: "absolute",
                        left: mark.left,
                        top: 0,
                        fontFamily: dispFont,
                        fontSize: "10px",
                        fontWeight: 600,
                        color: "var(--muted)",
                      }}
                    >
                      {mark.label}
                    </span>
                  ))}
                </div>
                {gantt.map((g) => (
                  <div
                    key={g.sprint}
                    style={{ display: "flex", alignItems: "center", marginBottom: "9px" }}
                  >
                    <div style={{ width: "172px", flexShrink: 0, paddingRight: "14px" }}>
                      <div
                        style={{
                          fontFamily: dispFont,
                          fontWeight: 600,
                          fontSize: "12.5px",
                          color: "#fff",
                          lineHeight: 1.25,
                        }}
                      >
                        {g.name}
                      </div>
                      <div style={{ fontSize: "10.5px", color: "var(--muted)" }}>{g.sprint}</div>
                    </div>
                    <div
                      style={{
                        position: "relative",
                        flex: 1,
                        height: "30px",
                        background: "var(--card)",
                        borderRadius: "7px",
                        border: "1px solid var(--line)",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "3px",
                          bottom: "3px",
                          borderRadius: "5px",
                          display: "flex",
                          alignItems: "center",
                          padding: "0 9px",
                          color: "#fff",
                          fontSize: "10.5px",
                          fontWeight: 600,
                          fontFamily: dispFont,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          boxShadow: "0 2px 7px rgba(12,35,64,.20)",
                          left: g.left,
                          width: g.width,
                          background: g.bg,
                        }}
                      >
                        {g.label}
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    gap: "18px",
                    marginLeft: "172px",
                    marginTop: "14px",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      fontSize: "11.5px",
                      color: "var(--slate)",
                    }}
                  >
                    <span
                      style={{
                        width: "14px",
                        height: "10px",
                        borderRadius: "3px",
                        background: "var(--navy)",
                      }}
                    />
                    Cadrage & mise en production
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      fontSize: "11.5px",
                      color: "var(--slate)",
                    }}
                  >
                    <span
                      style={{
                        width: "14px",
                        height: "10px",
                        borderRadius: "3px",
                        background: "var(--cyan-deep)",
                      }}
                    />
                    Design
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      fontSize: "11.5px",
                      color: "var(--slate)",
                    }}
                  >
                    <span
                      style={{
                        width: "14px",
                        height: "10px",
                        borderRadius: "3px",
                        background: "var(--cyan)",
                      }}
                    />
                    Développement
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                background: "var(--tint-2)",
                border: "1px solid rgba(56,182,255,0.22)",
                borderRadius: "14px",
                padding: "18px 22px",
                margin: "16px 0",
                display: "flex",
                gap: "14px",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: "30px",
                  height: "30px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "14px",
                  fontFamily: dispFont,
                  background: "var(--cyan)",
                }}
              >
                i
              </div>
              <div>
                <h4
                  style={{
                    fontFamily: dispFont,
                    fontSize: "14px",
                    margin: "0 0 4px",
                    color: "#fff",
                    fontWeight: 600,
                  }}
                >
                  Durée indicative & jalonnement
                </h4>
                <p
                  style={{
                    fontSize: "13.6px",
                    margin: 0,
                    color: "var(--slate)",
                    lineHeight: 1.55,
                  }}
                >
                  Les bornes en jours sont indicatives et peuvent glisser selon les retours de
                  validation et les délais des stores (Apple / Google). Le démarrage (J1) correspond
                  à la réception du premier versement et à la réunion de cadrage. La livraison est
                  considérée terminée uniquement lorsque l’application est validée et disponible sur
                  les stores.
                </p>
              </div>
            </div>
          </div>
        </section>

        <ChapterBand
          eyebrow="Méthode"
          title="Itératif, validé"
          titleAccent="à chaque étape."
          sub="Vous validez chaque sprint de Trajeo via TestFlight ou APK lors d’un point hebdomadaire — jusqu’à la publication finale sur les stores, sans surprise."
        />

        {/* 02 — DÉTAIL */}
        <section
          id="s2"
          data-dc-section
          style={{
            width: "100%",
            backgroundColor: "var(--band-b)",
          }}
        >
          <div
            style={{
              maxWidth: "1040px",
              margin: "0 auto",
              padding: "clamp(56px,7vw,94px) clamp(24px,5vw,48px)",
            }}
          >
            <SectionHeader num="02 — DÉTAIL" title="Détail des sprints" />
            {sprints.map((s) => (
              <div key={s.num}>
                {s.hasPhase ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      margin: "30px 0 6px",
                      paddingBottom: "10px",
                      borderBottom: "2px solid var(--line)",
                    }}
                  >
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "9px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontFamily: dispFont,
                        fontWeight: 700,
                        fontSize: "13px",
                        flexShrink: 0,
                        background: s.phaseDotBg,
                      }}
                    >
                      {s.phaseNum}
                    </div>
                    <div
                      style={{
                        fontFamily: dispFont,
                        fontWeight: 600,
                        fontSize: "17px",
                        color: "#fff",
                      }}
                    >
                      {s.phaseTitle}
                    </div>
                    <div
                      style={{
                        marginLeft: "auto",
                        fontFamily: dispFont,
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "var(--cyan-ink)",
                        background: "var(--tint)",
                        padding: "4px 12px",
                        borderRadius: "999px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {s.phaseDays}
                    </div>
                  </div>
                ) : null}
                <div
                  style={{
                    display: "flex",
                    border: "1px solid var(--line)",
                    borderRadius: "14px",
                    margin: "12px 0",
                    background: "var(--card)",
                    boxShadow: "var(--shadow)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "104px",
                      flexShrink: 0,
                      color: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "18px 10px",
                      textAlign: "center",
                      background: s.leftBg,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: dispFont,
                        fontSize: "10px",
                        letterSpacing: "1.2px",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,.7)",
                      }}
                    >
                      Sprint
                    </div>
                    <div
                      style={{
                        fontFamily: dispFont,
                        fontWeight: 700,
                        fontSize: "34px",
                        lineHeight: 1,
                        margin: "2px 0 6px",
                      }}
                    >
                      {s.num}
                    </div>
                    <div
                      style={{
                        fontFamily: dispFont,
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#fff",
                        background: "rgba(255,255,255,.16)",
                        padding: "3px 9px",
                        borderRadius: "999px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {s.days}
                    </div>
                  </div>
                  <div style={{ flex: 1, padding: "18px 22px", minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: dispFont,
                        fontWeight: 600,
                        fontSize: "16px",
                        color: "#fff",
                        marginBottom: "10px",
                      }}
                    >
                      {s.name}
                    </div>
                    {s.feats.map((f, fi) => (
                      <div
                        key={fi}
                        style={{
                          display: "flex",
                          gap: "9px",
                          padding: "4px 0",
                          fontSize: "13.4px",
                          color: "var(--slate)",
                          lineHeight: 1.5,
                        }}
                      >
                        <span
                          style={{
                            color: "var(--cyan-ink)",
                            flexShrink: 0,
                            fontWeight: 700,
                            fontSize: "12px",
                            marginTop: "3px",
                          }}
                        >
                          ✓
                        </span>
                        <span>
                          <strong style={{ color: "var(--ink)", fontWeight: 600 }}>{f.b}</strong>
                          {f.t}
                        </span>
                      </div>
                    ))}
                    <div
                      style={{
                        marginTop: "12px",
                        paddingTop: "12px",
                        borderTop: "1px solid var(--line)",
                        display: "flex",
                        gap: "8px",
                        alignItems: "baseline",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: dispFont,
                          fontSize: "10px",
                          letterSpacing: ".8px",
                          textTransform: "uppercase",
                          color: "var(--muted)",
                        }}
                      >
                        Livrables
                      </span>
                      {s.tags.map((t) => (
                        <span
                          key={t.label}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            fontFamily: dispFont,
                            fontWeight: 600,
                            fontSize: "10.5px",
                            letterSpacing: ".6px",
                            textTransform: "uppercase",
                            padding: "4px 11px",
                            borderRadius: "999px",
                            whiteSpace: "nowrap",
                            background: t.bg,
                            color: t.fg,
                            border: t.bd,
                          }}
                        >
                          {t.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div
              style={{
                background: "var(--ok-bg)",
                border: "1px solid rgba(52,226,192,0.25)",
                borderRadius: "14px",
                padding: "18px 22px",
                margin: "16px 0",
                display: "flex",
                gap: "14px",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: "30px",
                  height: "30px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "14px",
                  fontFamily: dispFont,
                  background: "var(--ok)",
                }}
              >
                —
              </div>
              <div>
                <h4
                  style={{
                    fontFamily: dispFont,
                    fontSize: "14px",
                    margin: "0 0 4px",
                    color: "#7ef0d2",
                    fontWeight: 600,
                  }}
                >
                  Inclus : marketing premium clé en main
                </h4>
                <p
                  style={{
                    fontSize: "13.6px",
                    margin: 0,
                    color: "var(--slate)",
                    lineHeight: 1.55,
                  }}
                >
                  Un accompagnement marketing premium est inclus, clé en main : création de vidéos
                  publicitaires (UGC), lancement et optimisation des campagnes Meta Ads et Apple
                  Search Ads, et suivi des KPIs pour accompagner le lancement de Trajeo sur les
                  stores.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 03 — JALONS */}
        <section
          id="s3"
          data-dc-section
          style={{
            width: "100%",
            backgroundColor: "var(--band-a)",
          }}
        >
          <div
            style={{
              maxWidth: "1040px",
              margin: "0 auto",
              padding: "clamp(56px,7vw,94px) clamp(24px,5vw,48px)",
            }}
          >
            <SectionHeader
              num="03 — JALONS"
              title="Jalons de paiement"
              lead="Un forfait de 5 600 €, réglé mensuellement (≈ 933 €/mois sur 6 mois), identique à l’échéancier du devis."
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))",
                gap: "14px",
                margin: "16px 0",
              }}
            >
              {miles.map((m) => (
                <div
                  key={m.pct}
                  style={{
                    border: "1px solid var(--line)",
                    borderRadius: "14px",
                    padding: "18px 18px",
                    background: "var(--card)",
                    boxShadow: "var(--shadow)",
                    transition: "transform .25s ease,box-shadow .3s ease,border-color .25s ease",
                  }}
                >
                  <div
                    style={{
                      fontFamily: dispFont,
                      fontWeight: 700,
                      fontSize: "13px",
                      color: "var(--cyan-ink)",
                    }}
                  >
                    {m.pct}
                  </div>
                  <div
                    style={{
                      fontFamily: dispFont,
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "#fff",
                      margin: "7px 0 3px",
                    }}
                  >
                    {m.nm}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--muted)",
                      minHeight: "30px",
                      lineHeight: 1.4,
                    }}
                  >
                    {m.when}
                  </div>
                  <div
                    style={{
                      fontFamily: dispFont,
                      fontWeight: 700,
                      fontSize: "24px",
                      color: "#fff",
                      marginTop: "8px",
                      borderTop: "1px solid var(--line)",
                      paddingTop: "10px",
                    }}
                  >
                    {m.amt}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "var(--cyan-ink)",
                      marginTop: "6px",
                      fontWeight: 600,
                    }}
                  >
                    {m.trig}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                background: "var(--tint-2)",
                border: "1px solid rgba(56,182,255,0.22)",
                borderRadius: "14px",
                padding: "18px 22px",
                margin: "16px 0",
                display: "flex",
                gap: "14px",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: "30px",
                  height: "30px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "14px",
                  fontFamily: dispFont,
                  background: "var(--cyan)",
                }}
              >
                €
              </div>
              <div>
                <h4
                  style={{
                    fontFamily: dispFont,
                    fontSize: "14px",
                    margin: "0 0 4px",
                    color: "#fff",
                    fontWeight: 600,
                  }}
                >
                  Montant total : 5 600 €
                </h4>
                <p
                  style={{
                    fontSize: "13.6px",
                    margin: 0,
                    color: "var(--slate)",
                    lineHeight: 1.55,
                  }}
                >
                  Forfait de 5 600 € réglé mensuellement, soit ≈ 933 €/mois sur 6 mois. La livraison
                  est validée sur les stores (≈ 90 jours) tandis que le paiement reste mensuel sur 6
                  mois. Paiements par Stripe ou virement bancaire, en euros. Aucune taxe applicable
                  (prestataire canadien / client français). Aucun travail de développement ne débute
                  avant réception du premier versement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 04 — CADENCE */}
        <section
          id="s4"
          data-dc-section
          style={{
            width: "100%",
            backgroundColor: "var(--band-b)",
          }}
        >
          <div
            style={{
              maxWidth: "1040px",
              margin: "0 auto",
              padding: "clamp(56px,7vw,94px) clamp(24px,5vw,48px)",
            }}
          >
            <SectionHeader num="04 — CADENCE" title="Cadence & validation" />
            <h3
              style={{
                fontFamily: dispFont,
                fontSize: "18px",
                color: "#fff",
                fontWeight: 600,
                margin: "14px 0 10px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span style={{ color: "var(--cyan)", fontSize: "13px" }}>◆</span>Rythme de travail
            </h3>
            <ul style={{ listStyle: "none", margin: "8px 0", padding: 0 }}>
              <li
                style={{
                  position: "relative",
                  padding: "5px 0 5px 22px",
                  fontSize: "13.8px",
                  color: "var(--slate)",
                  lineHeight: 1.55,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "5px",
                    color: "var(--cyan)",
                    fontWeight: 700,
                    fontSize: "12px",
                  }}
                >
                  —
                </span>
                Sprints d’environ{" "}
                <b style={{ color: "var(--ink)", fontWeight: 600 }}>deux semaines</b>, avec une{" "}
                <b style={{ color: "var(--ink)", fontWeight: 600 }}>démo en fin de chaque sprint</b>
                .
              </li>
              <li
                style={{
                  position: "relative",
                  padding: "5px 0 5px 22px",
                  fontSize: "13.8px",
                  color: "var(--slate)",
                  lineHeight: 1.55,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "5px",
                    color: "var(--cyan)",
                    fontWeight: 700,
                    fontSize: "12px",
                  }}
                >
                  —
                </span>
                <b style={{ color: "var(--ink)", fontWeight: 600 }}>
                  Point d’avancement hebdomadaire
                </b>{" "}
                : revue de ce qui a été livré et priorités de la semaine suivante.
              </li>
              <li
                style={{
                  position: "relative",
                  padding: "5px 0 5px 22px",
                  fontSize: "13.8px",
                  color: "var(--slate)",
                  lineHeight: 1.55,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "5px",
                    color: "var(--cyan)",
                    fontWeight: 700,
                    fontSize: "12px",
                  }}
                >
                  —
                </span>
                Développement <b style={{ color: "var(--ink)", fontWeight: 600 }}>itératif</b> :
                chaque sprint livre un incrément testable.
              </li>
            </ul>
            <h3
              style={{
                fontFamily: dispFont,
                fontSize: "18px",
                color: "#fff",
                fontWeight: 600,
                margin: "30px 0 10px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span style={{ color: "var(--cyan)", fontSize: "13px" }}>◆</span>Points de validation
            </h3>
            <ul style={{ listStyle: "none", margin: "8px 0", padding: 0 }}>
              <li
                style={{
                  position: "relative",
                  padding: "5px 0 5px 22px",
                  fontSize: "13.8px",
                  color: "var(--slate)",
                  lineHeight: 1.55,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "5px",
                    color: "var(--cyan)",
                    fontWeight: 700,
                    fontSize: "12px",
                  }}
                >
                  —
                </span>
                Validation du Client à chaque{" "}
                <b style={{ color: "var(--ink)", fontWeight: 600 }}>fin de phase clé</b> (design,
                fonctionnalités, publication sur les stores) avant de poursuivre.
              </li>
              <li
                style={{
                  position: "relative",
                  padding: "5px 0 5px 22px",
                  fontSize: "13.8px",
                  color: "var(--slate)",
                  lineHeight: 1.55,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "5px",
                    color: "var(--cyan)",
                    fontWeight: 700,
                    fontSize: "12px",
                  }}
                >
                  —
                </span>
                Les{" "}
                <b style={{ color: "var(--ink)", fontWeight: 600 }}>retards imputables au Client</b>{" "}
                (absence de validation, de contenu ou d’accès) décalent d’autant le calendrier et ne
                sont pas comptés dans le délai.
              </li>
              <li
                style={{
                  position: "relative",
                  padding: "5px 0 5px 22px",
                  fontSize: "13.8px",
                  color: "var(--slate)",
                  lineHeight: 1.55,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "5px",
                    color: "var(--cyan)",
                    fontWeight: 700,
                    fontSize: "12px",
                  }}
                >
                  —
                </span>
                Toute modification du périmètre fait l’objet d’un accord écrit (voir{" "}
                <Link
                  href="/devis/karima/contrat"
                  style={{ color: "var(--cyan-ink)", fontWeight: 600, textDecoration: "none" }}
                >
                  devis
                </Link>{" "}
                &{" "}
                <Link
                  href="/devis/karima/cahier-des-charges"
                  style={{ color: "var(--cyan-ink)", fontWeight: 600, textDecoration: "none" }}
                >
                  cahier des charges
                </Link>
                ).
              </li>
            </ul>
            <div
              style={{
                background: "var(--amber-bg)",
                border: "1px solid rgba(232,161,58,0.3)",
                borderRadius: "14px",
                padding: "18px 22px",
                margin: "16px 0",
                display: "flex",
                gap: "14px",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: "30px",
                  height: "30px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "14px",
                  fontFamily: dispFont,
                  background: "var(--amber)",
                }}
              >
                ▸
              </div>
              <div>
                <h4
                  style={{
                    fontFamily: dispFont,
                    fontSize: "14px",
                    margin: "0 0 4px",
                    color: "#f0c98a",
                    fontWeight: 600,
                  }}
                >
                  Ce qui maintient le rythme
                </h4>
                <p
                  style={{
                    fontSize: "13.6px",
                    margin: 0,
                    color: "var(--slate)",
                    lineHeight: 1.55,
                  }}
                >
                  La livraison est considérée terminée uniquement lorsque l’application est validée
                  et disponible sur les stores. Le délai peut être décalé par Apple ou Google, par
                  les délais de validation des stores, par les demandes de modification du Client ou
                  ses retards de réponse — des facteurs hors du contrôle de Progix. Plus les retours
                  et les contenus arrivent vite, plus la livraison sur les stores est fluide.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer
          heading="Un plan clair, une livraison maîtrisée jusqu’aux stores"
          text="Ce calendrier accompagne le devis et le cahier des charges. Sprint après sprint, vous voyez Trajeo prendre forme jusqu’à sa publication sur l’App Store et Google Play."
        />
      </main>
      <ScrollReveal />
    </div>
  );
}
