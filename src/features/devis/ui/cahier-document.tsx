import type { CSSProperties, ReactNode } from "react";
import { Cover } from "./cover";
import { DcHeader } from "./dc-header";
import { Footer } from "./footer";
import { ScrollReveal } from "./scroll-reveal";
import { SectionHeader } from "./primitives";
import styles from "./devis.module.css";
import type { ClientEstimate } from "../types";

/* ------------------------------------------------------------------ */
/* Shared inline-style fragments (lifted verbatim from the source).   */
/* ------------------------------------------------------------------ */

const SECTION_DOTS: CSSProperties = {
  width: "100%",
};

const CONTAINER: CSSProperties = {
  maxWidth: "1040px",
  margin: "0 auto",
  padding: "clamp(56px,7vw,94px) clamp(24px,5vw,48px)",
};

const CARD: CSSProperties = {
  background: "var(--card-grad)",
  border: "1px solid var(--card-bd)",
  borderRadius: "14px",
  padding: "22px 24px",
  boxShadow: "var(--shadow)",
};

const CARD_TITLE: CSSProperties = {
  fontFamily: "var(--font-disp)",
  fontSize: "15px",
  color: "#fff",
  fontWeight: 600,
  margin: "0 0 7px",
  display: "flex",
  alignItems: "center",
  gap: "9px",
};

const CARD_TEXT: CSSProperties = {
  fontSize: "14px",
  margin: 0,
  color: "var(--slate)",
  lineHeight: 1.6,
};

const ROUND_BADGE: CSSProperties = {
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  color: "#fff",
  fontSize: "13px",
  fontWeight: 700,
  fontFamily: "var(--font-disp)",
};

const GRID_AUTO: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))",
  gap: "16px",
};

const H3_DIAMOND: CSSProperties = {
  fontFamily: "var(--font-disp)",
  fontSize: "19px",
  color: "#fff",
  fontWeight: 600,
  margin: "34px 0 12px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const INFOBOX: CSSProperties = {
  background: "var(--tint-2)",
  border: "1px solid rgba(56,182,255,0.22)",
  borderRadius: "14px",
  padding: "18px 22px",
  margin: "16px 0",
  display: "flex",
  gap: "14px",
  alignItems: "flex-start",
};

const INFOBOX_ICON: CSSProperties = {
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
  fontFamily: "var(--font-disp)",
  background: "var(--cyan)",
};

const INFOBOX_TITLE: CSSProperties = {
  fontFamily: "var(--font-disp)",
  fontSize: "14px",
  margin: "0 0 4px",
  color: "#fff",
  fontWeight: 600,
};

const INFOBOX_TEXT: CSSProperties = {
  fontSize: "13.6px",
  margin: 0,
  color: "var(--slate)",
  lineHeight: 1.55,
};

const STRONG_INK: CSSProperties = { color: "var(--ink)", fontWeight: 600 };

const TH: CSSProperties = {
  background: "var(--navy)",
  color: "#fff",
  textAlign: "left",
  padding: "11px 15px",
  fontFamily: "var(--font-disp)",
  fontWeight: 600,
  fontSize: "11px",
  letterSpacing: ".6px",
  textTransform: "uppercase",
};

const TAG_BASE: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  fontFamily: "var(--font-disp)",
  fontWeight: 600,
  fontSize: "10.5px",
  letterSpacing: ".6px",
  textTransform: "uppercase",
  padding: "4px 11px",
  borderRadius: "999px",
  whiteSpace: "nowrap",
};

const STEP_CARD: CSSProperties = {
  flex: "1 1 180px",
  background: "var(--card-grad)",
  border: "1px solid var(--card-bd)",
  borderRadius: "14px",
  padding: "16px 14px",
  boxShadow: "var(--shadow)",
};

const STEP_EYEBROW: CSSProperties = {
  fontFamily: "var(--font-disp)",
  fontWeight: 700,
  fontSize: "11px",
  color: "var(--cyan-ink)",
  letterSpacing: ".5px",
};

const STEP_TITLE: CSSProperties = {
  fontFamily: "var(--font-disp)",
  fontWeight: 600,
  fontSize: "14px",
  color: "#fff",
  margin: "6px 0 4px",
};

const STEP_DESC: CSSProperties = {
  fontSize: "12.5px",
  color: "var(--slate)",
  lineHeight: 1.5,
};

const STEP_RULE: CSSProperties = {
  height: "6px",
  borderRadius: "6px",
  background: "linear-gradient(90deg,var(--cyan),var(--navy))",
  margin: "14px 0 0",
};

const A_GRAD = "linear-gradient(150deg,var(--cyan-deep),var(--cyan))";
const N_GRAD = "linear-gradient(150deg,var(--navy),var(--navy-700))";

/* ------------------------------------------------------------------ */
/* Small presentational helpers                                        */
/* ------------------------------------------------------------------ */

function Strong({ children }: { children: ReactNode }) {
  return <strong style={STRONG_INK}>{children}</strong>;
}

/** Subsection heading with the cyan diamond marker, with custom top margin. */
function DiamondHeading({
  children,
  marginTop = "34px",
}: {
  children: ReactNode;
  marginTop?: string;
}) {
  return (
    <h3 style={{ ...H3_DIAMOND, margin: `${marginTop} 0 12px` }}>
      <span style={{ color: "var(--cyan)", fontSize: "13px" }} aria-hidden="true">
        ◆
      </span>
      {children}
    </h3>
  );
}

function FeatureCard({
  icon,
  iconBg,
  title,
  children,
}: {
  icon: ReactNode;
  iconBg: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div style={CARD}>
      <h4 style={CARD_TITLE}>
        <span style={{ ...ROUND_BADGE, background: iconBg }} aria-hidden="true">
          {icon}
        </span>
        {title}
      </h4>
      <p style={CARD_TEXT}>{children}</p>
    </div>
  );
}

function InfoCallout({
  iconBg = "var(--cyan)",
  icon = "i",
  title,
  titleColor = "#fff",
  borderColor = "rgba(56,182,255,0.22)",
  background = "var(--tint-2)",
  children,
}: {
  iconBg?: string;
  icon?: ReactNode;
  title: string;
  titleColor?: string;
  borderColor?: string;
  background?: string;
  children: ReactNode;
}) {
  return (
    <div style={{ ...INFOBOX, background, border: `1px solid ${borderColor}` }}>
      <div style={{ ...INFOBOX_ICON, background: iconBg }} aria-hidden="true">
        {icon}
      </div>
      <div>
        <h4 style={{ ...INFOBOX_TITLE, color: titleColor }}>{title}</h4>
        <p style={INFOBOX_TEXT}>{children}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Data lifted from the renderVals() island.                           */
/* ------------------------------------------------------------------ */

const meta = [
  { l: "Projet", v: "Trajeo (nom de travail)" },
  { l: "Client", v: "Client" },
  { l: "Prestataire", v: "Progix Inc. · NEQ 1181317117" },
  { l: "Référence · Version", v: "CDC-PROGIX-2026 · v1.0" },
] as const;

const toc = [
  { n: "01", t: "Contexte & vision" },
  { n: "02", t: "Objectifs" },
  { n: "03", t: "Public cible" },
  { n: "04", t: "Fonctionnalités" },
  { n: "05", t: "Parcours utilisateur type" },
  { n: "06", t: "Approche technique" },
  { n: "07", t: "Livrables & accompagnement" },
] as const;

type Tag = { label: string; bg: string; fg: string; bd: string };
type Feat = { b: string; t: string };
type Module = {
  n: string;
  iconBg: string;
  title: string;
  hasBadge: boolean;
  badge: string;
  desc: string;
  feats: Feat[];
  tags: Tag[];
};

const ok: Tag = { label: "Inclus V1", bg: "var(--ok-bg)", fg: "var(--ok)", bd: "none" };
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
const F = (b: string, t: string): Feat => ({ b, t });

const modules: Module[] = [
  {
    n: "01",
    iconBg: N_GRAD,
    title: "Inscription & profils",
    hasBadge: true,
    badge: "Cœur de la plateforme",
    desc: "Création de compte avec choix du rôle (passager, chauffeur ou les deux) et vérification des documents du chauffeur.",
    feats: [
      F("", "Inscription par courriel, téléphone et options tierces (Google, Apple)."),
      F("Profil chauffeur", " : vérification du permis, de l’assurance et du véhicule."),
      F("", "Contrôle des justificatifs par l’administration avant activation."),
      F("", "Photo, présentation et informations du véhicule (marque, plaque)."),
    ],
    tags: [ok],
  },
  {
    n: "02",
    iconBg: N_GRAD,
    title: "Réservation de course",
    hasBadge: true,
    badge: "Cœur de la plateforme",
    desc: "Le passager saisit son point de départ et sa destination, puis obtient une estimation avant de réserver.",
    feats: [
      F("", "Saisie du départ et de la destination avec adresses et points d’intérêt."),
      F("Estimation avant réservation", " : prix indicatif et durée du trajet."),
      F("", "Aperçu de l’itinéraire proposé et confirmation de la demande."),
      F("", "Choix éventuel d’options (type de course, notes pour le chauffeur)."),
    ],
    tags: [ok],
  },
  {
    n: "03",
    iconBg: A_GRAD,
    title: "Matching & mise en relation en temps réel",
    hasBadge: true,
    badge: "Fonction clé",
    desc: "La demande est attribuée au chauffeur disponible le plus proche, qui peut accepter ou refuser.",
    feats: [
      F("Attribution", " du chauffeur le plus proche selon la position et la disponibilité."),
      F("", "Acceptation ou refus de la course par le chauffeur, puis réattribution."),
      F("", "Notifications temps réel à chaque étape de la mise en relation."),
    ],
    tags: [ok],
  },
  {
    n: "04",
    iconBg: A_GRAD,
    title: "Géolocalisation & suivi de course",
    hasBadge: true,
    badge: "Fonction clé",
    desc: "Une carte en temps réel permet de suivre le chauffeur, d’estimer son arrivée et de partager le trajet.",
    feats: [
      F("", "Carte temps réel avec la position du chauffeur et du passager."),
      F("", "Estimation de l’heure d’arrivée (ETA) mise à jour en continu."),
      F("Partage du trajet", " avec un proche pour plus de sécurité."),
    ],
    tags: [ok],
  },
  {
    n: "05",
    iconBg: N_GRAD,
    title: "Déroulement de la course",
    hasBadge: false,
    badge: "",
    desc: "Le cycle complet de la course, du démarrage à la fin, avec navigation et reçu.",
    feats: [
      F("", "Démarrage de la course à la prise en charge du passager."),
      F("", "Navigation guidée du chauffeur vers la destination."),
      F("", "Fin de course, calcul du montant et récapitulatif du trajet."),
      F("Reçu", " : détail de la course envoyé au passager après le trajet."),
    ],
    tags: [ok],
  },
  {
    n: "06",
    iconBg: A_GRAD,
    title: "Paiement & monétisation",
    hasBadge: false,
    badge: "",
    desc: "Paiement in-app à la fin de la course et prélèvement de la commission de la plateforme.",
    feats: [
      F("", "Paiement in-app par carte et méthodes de paiement enregistrées."),
      F("Commission de la plateforme", " prélevée automatiquement sur chaque course."),
      F("", "Reversement au chauffeur et historique des transactions."),
    ],
    tags: [ok, cy("Monétisation")],
  },
  {
    n: "07",
    iconBg: N_GRAD,
    title: "Notation & confiance",
    hasBadge: true,
    badge: "Socle de confiance",
    desc: "Le socle de confiance qui distingue Trajeo d’une simple mise en relation informelle.",
    feats: [
      F("", "Évaluation mutuelle du passager et du chauffeur après chaque course."),
      F("", "Profils vérifiés (permis, assurance, véhicule) côté chauffeur."),
      F("", "Historique des courses réalisées pour chaque utilisateur."),
      F("", "Signalement d’un comportement inapproprié."),
    ],
    tags: [ok],
  },
  {
    n: "08",
    iconBg: A_GRAD,
    title: "Back-office d’administration",
    hasBadge: false,
    badge: "",
    desc: "Panneau d’administration complet pour piloter la plateforme.",
    feats: [
      F("", "Suivi des courses en cours et de l’historique."),
      F("", "Gestion des chauffeurs et vérification des documents (permis, assurance)."),
      F("Gestion des litiges", " et modération des signalements."),
      F("", "Tableau de bord : taux d’acceptation, courses, chauffeurs actifs."),
    ],
    tags: [ok, gh("Web sécurisé")],
  },
];

/* ------------------------------------------------------------------ */
/* The page                                                            */
/* ------------------------------------------------------------------ */

/**
 * Full "Cahier des charges" document for Trajeo — header, hero cover, the table
 * of contents, the content sections, and the footer. A Server Component
 * composing the shared client leaves (header, FAB, scroll-reveal) at the edges.
 */
export function CahierDocument({ estimate }: { estimate?: ClientEstimate }) {
  const dynamicMeta = estimate
    ? [
        { l: "Projet", v: estimate.project_name },
        { l: "Client", v: estimate.client_name },
        { l: "Prestataire", v: "Progix Inc. · NEQ 1181317117" },
        { l: "Référence · Version", v: `CDC-PROGIX-${new Date().getFullYear()} · v1.0` },
      ]
    : meta;

  return (
    <div className={styles.root} data-devis-root>
      <DcHeader active="cahier" />
      <main className={styles.main}>
        <Cover
          tag="Cahier des charges · Document de cadrage"
          title={estimate ? estimate.project_title : "Plateforme de mobilité"}
          titleLight={estimate ? "" : "entre passagers et chauffeurs"}
          subtitle={
            estimate
              ? estimate.project_description
              : "Application mobile de mise en relation entre passagers et chauffeurs : réservation de course, matching en temps réel avec le chauffeur le plus proche, géolocalisation et suivi du trajet, estimation du prix avant réservation et paiement in-app."
          }
          badges={[]}
          meta={dynamicMeta}
        />

        {/* SOMMAIRE */}
        <section data-dc-section style={{ ...SECTION_DOTS, backgroundColor: "var(--band-a)" }}>
          <div style={CONTAINER}>
            <span
              style={{
                fontFamily: "var(--font-disp)",
                fontWeight: 600,
                fontSize: "11px",
                letterSpacing: "1.8px",
                textTransform: "uppercase",
                color: "var(--cyan-ink)",
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
              }}
            >
              <span
                style={{
                  width: "22px",
                  height: "2px",
                  background: "var(--cyan)",
                  borderRadius: "2px",
                  display: "inline-block",
                }}
                aria-hidden="true"
              />
              Sommaire
            </span>
            <h2
              style={{
                fontFamily: "var(--font-disp)",
                fontSize: "clamp(23px,3vw,28px)",
                color: "#fff",
                fontWeight: 600,
                letterSpacing: "-.01em",
                margin: "12px 0 0",
              }}
            >
              Ce que couvre ce document
            </h2>
            <p
              style={{
                margin: "12px 0 0",
                fontSize: "15.5px",
                color: "var(--slate)",
                maxWidth: "66ch",
                lineHeight: 1.62,
              }}
            >
              Ce cahier des charges définit le périmètre fonctionnel et technique de l’Application,
              les livrables attendus et la démarche de réalisation. Il sert de base contractuelle au
              devis associé.
            </p>
            <div style={{ marginTop: "24px", borderTop: "1px solid var(--line)" }}>
              {toc.map((row) => (
                <div
                  key={row.n}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "14px",
                    padding: "13px 2px",
                    borderBottom: "1px solid var(--line)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-disp)",
                      fontWeight: 600,
                      color: "var(--cyan-ink)",
                      fontSize: "13px",
                      width: "30px",
                      flexShrink: 0,
                    }}
                  >
                    {row.n}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-disp)",
                      fontWeight: 500,
                      color: "#fff",
                      fontSize: "15px",
                    }}
                  >
                    {row.t}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      borderBottom: "1px dotted var(--line)",
                      transform: "translateY(-4px)",
                      minWidth: "20px",
                    }}
                    aria-hidden="true"
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-disp)",
                      color: "var(--muted)",
                      fontSize: "13px",
                    }}
                    aria-hidden="true"
                  >
                    —
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 01 — CONTEXTE */}
        <section
          id="s1"
          data-dc-section
          style={{ ...SECTION_DOTS, backgroundColor: "var(--band-b)" }}
        >
          <div style={CONTAINER}>
            <SectionHeader
              num="01 — CONTEXTE"
              title="Contexte & vision du projet"
              lead="Se déplacer à la demande reste souvent une affaire de solutions informelles et fragmentées : appels directs, contacts personnels, absence de prix connu à l’avance et aucune visibilité sur le trajet. Côté passager, on perd du temps et de la confiance ; côté chauffeur, les demandes arrivent de façon dispersée, sans outil fiable pour les recevoir, les accepter et être payé."
            />
            <p
              style={{
                fontSize: "15.5px",
                color: "var(--ink)",
                margin: "0 0 13px",
                lineHeight: 1.62,
              }}
            >
              Trajeo est une <Strong>plateforme de mobilité à la demande</Strong> qui connecte les{" "}
              <Strong>passagers</Strong> souhaitant réserver une course avec des{" "}
              <Strong>chauffeurs disponibles à proximité</Strong>, en temps réel, avec estimation du
              prix avant réservation, suivi du trajet et paiement in-app.
            </p>
            <DiamondHeading>Positionnement</DiamondHeading>
            <p
              style={{
                fontSize: "14.5px",
                color: "var(--slate)",
                margin: "0 0 13px",
                lineHeight: 1.62,
              }}
            >
              Trajeo se concentre sur un besoin précis : la{" "}
              <Strong>mise en relation en temps réel</Strong> entre un passager et un chauffeur.
              Trajeo structure une marketplace à deux faces, fiable et rapide, où la
              géolocalisation, la confiance (profils vérifiés, notation) et le paiement in-app sont
              au cœur de chaque course.
            </p>
            <div
              style={{
                background:
                  "linear-gradient(155deg,var(--navy-900),var(--navy) 60%,var(--navy-800))",
                color: "#DDE8F4",
                borderRadius: "22px",
                padding: "30px clamp(24px,4vw,34px)",
                margin: "22px 0",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  right: "18px",
                  bottom: "-22px",
                  fontSize: "120px",
                  color: "rgba(56,182,255,.10)",
                  fontFamily: "var(--font-disp)",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                —
              </span>
              <span
                style={{
                  fontFamily: "var(--font-disp)",
                  fontWeight: 600,
                  fontSize: "11px",
                  letterSpacing: "1.8px",
                  textTransform: "uppercase",
                  color: "var(--cyan)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "9px",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    width: "22px",
                    height: "2px",
                    background: "var(--cyan)",
                    borderRadius: "2px",
                    display: "inline-block",
                  }}
                  aria-hidden="true"
                />
                Une marketplace à deux faces
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-disp)",
                  color: "#fff",
                  fontSize: "19px",
                  fontWeight: 600,
                  margin: "12px 0 6px",
                  position: "relative",
                  lineHeight: 1.3,
                }}
              >
                Une mise en relation en temps réel entre passagers et chauffeurs
              </h3>
              <p
                style={{
                  color: "#B9CCE2",
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: 1.6,
                  position: "relative",
                }}
              >
                Trajeo structure des déplacements aujourd’hui informels et fragmentés en une
                plateforme dédiée, fiable et en temps réel, où la géolocalisation, la confiance et
                le paiement in-app sont au cœur de chaque course.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,160px),1fr))",
                  gap: "22px",
                  marginTop: "18px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-disp)",
                      fontWeight: 700,
                      fontSize: "26px",
                      color: "#fff",
                      letterSpacing: "-.02em",
                    }}
                  >
                    2
                    <small style={{ color: "var(--cyan)", fontSize: "15px", fontWeight: 600 }}>
                      {" "}
                      rôles
                    </small>
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#9FB6CE",
                      marginTop: "3px",
                      lineHeight: 1.4,
                    }}
                  >
                    passager & chauffeur, rôles interchangeables
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-disp)",
                      fontWeight: 700,
                      fontSize: "26px",
                      color: "#fff",
                      letterSpacing: "-.02em",
                    }}
                  >
                    Temps réel
                    <small style={{ color: "var(--cyan)", fontSize: "15px", fontWeight: 600 }}>
                      {" "}
                      live
                    </small>
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#9FB6CE",
                      marginTop: "3px",
                      lineHeight: 1.4,
                    }}
                  >
                    matching & suivi de course en direct
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-disp)",
                      fontWeight: 700,
                      fontSize: "26px",
                      color: "#fff",
                      letterSpacing: "-.02em",
                    }}
                  >
                    In-app
                    <small style={{ color: "var(--cyan)", fontSize: "15px", fontWeight: 600 }}>
                      {" "}
                      paiement
                    </small>
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#9FB6CE",
                      marginTop: "3px",
                      lineHeight: 1.4,
                    }}
                  >
                    paiement in-app & commission de la plateforme
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 — OBJECTIFS */}
        <section
          id="s2"
          data-dc-section
          style={{ ...SECTION_DOTS, backgroundColor: "var(--band-a)" }}
        >
          <div style={CONTAINER}>
            <SectionHeader num="02 — OBJECTIFS" title="Objectifs" />
            <div style={GRID_AUTO}>
              <FeatureCard icon="1" iconBg="var(--cyan)" title="Réserver en quelques secondes">
                Permettre à un passager de réserver une course en quelques secondes, avec le prix et
                la durée estimés avant la réservation.
              </FeatureCard>
              <FeatureCard icon="2" iconBg="var(--navy)" title="Matching fiable & rapide">
                Attribuer la course au chauffeur disponible le plus proche, en temps réel, avec
                acceptation ou refus immédiat.
              </FeatureCard>
              <FeatureCard icon="3" iconBg="var(--cyan)" title="Confiance & sécurité">
                Sécuriser chaque course grâce à des profils vérifiés (permis, assurance, véhicule)
                et un système de notation mutuelle.
              </FeatureCard>
              <FeatureCard icon="4" iconBg="var(--navy)" title="Paiement fluide in-app">
                Offrir un paiement in-app simple à la fin de la course, avec commission de la
                plateforme prélevée automatiquement.
              </FeatureCard>
            </div>
            <InfoCallout title="Objectif de lancement">
              Réussir le lancement d’une <Strong>marketplace à deux faces</Strong> (passagers ET
              chauffeurs) avec une liquidité suffisante, en s’appuyant sur l’accompagnement
              marketing premium de Progix pour acquérir les premiers passagers et chauffeurs.
            </InfoCallout>
          </div>
        </section>

        {/* 03 — UTILISATEURS */}
        <section
          id="s3"
          data-dc-section
          style={{ ...SECTION_DOTS, backgroundColor: "var(--band-b)" }}
        >
          <div style={CONTAINER}>
            <SectionHeader
              num="03 — PUBLIC"
              title="Public cible"
              lead="Trajeo s’adresse à deux profils complémentaires : les passagers qui souhaitent réserver une course rapidement et voyager en confiance, et les chauffeurs qui souhaitent recevoir des demandes à proximité, les accepter et être payés. Un même utilisateur peut, selon ses besoins, être passager et chauffeur."
            />
            <UserCard
              letter="A"
              letterBg="linear-gradient(150deg,var(--cyan-deep),var(--cyan))"
              title="Le passager"
              desc="Utilisateur qui souhaite réserver une course rapidement, connaître le prix à l’avance et suivre son chauffeur en temps réel."
              rows={[
                {
                  b: "Attentes :",
                  t: " réserver en quelques secondes, connaître le prix à l’avance, suivre son chauffeur en temps réel et voyager en confiance.",
                },
                { b: "Support :", t: " application mobile (iOS + Android)." },
              ]}
              tags={[cy("Réserve une course"), gh("Suivi temps réel")]}
            />
            <UserCard
              letter="B"
              letterBg="linear-gradient(150deg,var(--navy),var(--navy-700))"
              title="Le chauffeur"
              desc="Chauffeur qui souhaite recevoir des demandes de course près de lui, les accepter ou les refuser, être payé et bâtir sa réputation."
              rows={[
                {
                  b: "Attentes :",
                  t: " recevoir des demandes de course à proximité, accepter ou refuser, être payé et bâtir sa réputation.",
                },
                { b: "Support :", t: " application mobile (iOS + Android)." },
              ]}
              tags={[nv("Reçoit des courses"), cy("Paiement & réputation")]}
            />
          </div>
        </section>

        {/* 05 — PÉRIMÈTRE FONCTIONNEL */}
        <section
          id="s5"
          data-dc-section
          style={{ ...SECTION_DOTS, backgroundColor: "var(--band-b)" }}
        >
          <div style={CONTAINER}>
            <SectionHeader
              num="04 — FONCTIONNALITÉS"
              title="Fonctionnalités"
              lead="L’application s’articule autour de modules pensés pour fluidifier la mise en relation entre passagers et chauffeurs et instaurer la confiance entre les parties. L’ensemble ci-dessous constitue le périmètre de la première version (MVP)."
            />
            {modules.map((m) => (
              <div
                key={m.n}
                style={{
                  background: "var(--card-grad)",
                  border: "1px solid var(--card-bd)",
                  borderRadius: "14px",
                  margin: "16px 0",
                  boxShadow: "var(--shadow)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "14px",
                    alignItems: "flex-start",
                    padding: "20px 22px 14px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "11px",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontWeight: 600,
                      fontFamily: "var(--font-disp)",
                      fontSize: "15px",
                      boxShadow: "0 6px 14px rgba(12,35,64,.22)",
                      background: m.iconBg,
                    }}
                    aria-hidden="true"
                  >
                    {m.n}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4
                      style={{
                        fontFamily: "var(--font-disp)",
                        fontSize: "16px",
                        color: "#fff",
                        fontWeight: 600,
                        margin: "2px 0 3px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        flexWrap: "wrap",
                      }}
                    >
                      {m.title}
                      {m.hasBadge ? (
                        <span
                          style={{
                            ...TAG_BASE,
                            background: "var(--tint)",
                            color: "var(--cyan-ink)",
                          }}
                        >
                          {m.badge}
                        </span>
                      ) : null}
                    </h4>
                    <div
                      style={{
                        fontSize: "13.5px",
                        color: "var(--slate)",
                        lineHeight: 1.55,
                      }}
                    >
                      {m.desc}
                    </div>
                  </div>
                </div>
                <div style={{ padding: "4px 22px 14px clamp(22px,4vw,76px)" }}>
                  {m.feats.map((f, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: "10px",
                        padding: "6px 0",
                        fontSize: "13.6px",
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
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span>
                        {f.b ? <Strong>{f.b}</Strong> : null}
                        {f.t}
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    padding: "0 22px 18px clamp(22px,4vw,76px)",
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  {m.tags.map((t) => (
                    <span
                      key={t.label}
                      style={{
                        ...TAG_BASE,
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
            ))}
          </div>
        </section>

        {/* 06 — PARCOURS */}
        <section
          id="s6"
          data-dc-section
          style={{ ...SECTION_DOTS, backgroundColor: "var(--band-a)" }}
        >
          <div style={CONTAINER}>
            <SectionHeader num="05 — PARCOURS" title="Parcours utilisateur type" />
            <JourneyHeading letter="▸">Le parcours, étape par étape</JourneyHeading>
            <JourneyRow
              steps={[
                {
                  n: "ÉTAPE 1",
                  t: "Inscription & vérification",
                  d: "L’utilisateur crée son profil et choisit son rôle ; le chauffeur fait vérifier ses documents (permis, assurance, véhicule).",
                },
                {
                  n: "ÉTAPE 2",
                  t: "Demande de course & estimation",
                  d: "Le passager saisit son départ et sa destination, et obtient une estimation du prix et de la durée.",
                },
                {
                  n: "ÉTAPE 3",
                  t: "Matching & acceptation",
                  d: "La course est attribuée au chauffeur le plus proche, qui l’accepte ; la mise en relation se fait en temps réel.",
                },
                {
                  n: "ÉTAPE 4",
                  t: "Course & suivi temps réel",
                  d: "Le passager suit le chauffeur sur la carte ; la course se déroule du démarrage à la destination.",
                },
                {
                  n: "ÉTAPE 5",
                  t: "Paiement & notation",
                  d: "Le paiement in-app est réglé en fin de course ; passager et chauffeur s’évaluent mutuellement.",
                },
              ]}
            />
          </div>
        </section>

        {/* 06 — APPROCHE TECHNIQUE */}
        <section
          id="s7"
          data-dc-section
          style={{ ...SECTION_DOTS, backgroundColor: "var(--band-b)" }}
        >
          <div style={CONTAINER}>
            <SectionHeader
              num="06 — APPROCHE TECHNIQUE"
              title="Approche technique"
              lead="Progix sélectionne les technologies les plus adaptées au besoin, en privilégiant la performance, la rapidité de développement et la maintenabilité. Le choix final de la stack relève de l’expertise de Progix."
            />
            <div style={{ overflowX: "auto", margin: "16px 0" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "13.6px",
                  border: "1px solid var(--line)",
                  borderRadius: "14px",
                  overflow: "hidden",
                  minWidth: "520px",
                }}
              >
                <thead>
                  <tr>
                    <th style={TH}>Composant</th>
                    <th style={TH}>Approche</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={TD_NB}>
                      <Strong>Application mobile</Strong>
                    </td>
                    <td style={TD_NB}>
                      Développement cross-platform (iOS + Android), modes passager & chauffeur.
                    </td>
                  </tr>
                  <tr>
                    <td style={TD_NB_ALT}>
                      <Strong>Matching</Strong>
                    </td>
                    <td style={TD_NB_ALT}>Moteur de mise en relation en temps réel.</td>
                  </tr>
                  <tr>
                    <td style={TD_NB}>
                      <Strong>Géolocalisation</Strong>
                    </td>
                    <td style={TD_NB}>Cartographie, position en temps réel et itinéraire.</td>
                  </tr>
                  <tr>
                    <td style={TD_NB_ALT}>
                      <Strong>Paiement</Strong>
                    </td>
                    <td style={TD_NB_ALT}>Intégration du paiement in-app et de la commission.</td>
                  </tr>
                  <tr>
                    <td style={TD_NB}>
                      <Strong>Notifications</Strong>
                    </td>
                    <td style={TD_NB}>Notifications push en temps réel.</td>
                  </tr>
                  <tr>
                    <td style={{ ...TD_NB, borderBottom: "none" }}>
                      <Strong>Hébergement</Strong>
                    </td>
                    <td style={{ ...TD_NB, borderBottom: "none" }}>
                      Infrastructure cloud scalable.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <InfoCallout title="Périmètre de la première version">
              Le présent cahier des charges définit le périmètre d’un{" "}
              <Strong>MVP solide et complet</Strong> couvrant le cœur de la mise en relation entre
              passagers et chauffeurs. Les fonctionnalités avancées (options de course
              additionnelles, programmes de fidélité, modules spécifiques) pourront faire l’objet
              d’évolutions ultérieures, affinées conjointement au fil du projet et de la croissance
              de la base d’utilisateurs.
            </InfoCallout>
          </div>
        </section>

        {/* 09 — LIVRABLES */}
        <section
          id="s9"
          data-dc-section
          style={{ ...SECTION_DOTS, backgroundColor: "var(--band-b)" }}
        >
          <div style={CONTAINER}>
            <SectionHeader num="07 — LIVRABLES" title="Livrables & accompagnement" />
            <div
              style={{
                background: "var(--card-grad)",
                border: "1px solid var(--card-bd)",
                borderRadius: "14px",
                padding: "8px 24px",
                boxShadow: "var(--shadow)",
                margin: "14px 0",
              }}
            >
              {[
                {
                  n: "1",
                  t: "Application mobile iOS & Android",
                  d: "Publiée sur l’App Store et le Google Play Store, avec un design sur mesure.",
                },
                {
                  n: "2",
                  t: "Back-office d’administration",
                  d: "Interface web de pilotage : courses, chauffeurs, vérification des documents, litiges, modération, tableau de bord.",
                },
                {
                  n: "3",
                  t: "Landing page",
                  d: "Page de présentation responsive, optimisée pour l’acquisition.",
                },
                {
                  n: "4",
                  t: "Support technique — 90 jours",
                  d: "Correction des bugs et ajustements mineurs pendant 90 jours suivant la livraison.",
                },
                {
                  n: "5",
                  t: "Documentation technique complète",
                  d: "Transfert de propriété progressif au fil des paiements ; documentation permettant la reprise par tout développeur.",
                },
                {
                  n: "6",
                  t: "Accompagnement marketing premium — 90 jours",
                  d: "Campagnes gérées de A à Z (UGC + Meta/Apple Ads, scripts fournis) et suivi hebdomadaire des KPIs sur 90 jours.",
                },
              ].map((d, i, arr) => (
                <div
                  key={d.n}
                  style={{
                    display: "flex",
                    gap: "16px",
                    padding: "16px 0",
                    borderBottom: i < arr.length - 1 ? "1px solid var(--line)" : "none",
                  }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "10px",
                      background: "var(--tint)",
                      color: "var(--cyan-ink)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-disp)",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    {d.n}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-disp)",
                        fontWeight: 600,
                        fontSize: "15px",
                        color: "#fff",
                        marginBottom: "3px",
                      }}
                    >
                      {d.t}
                    </div>
                    <div
                      style={{
                        fontSize: "13.4px",
                        color: "var(--slate)",
                        lineHeight: 1.5,
                      }}
                    >
                      {d.d}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <InfoCallout title="Au-delà du développement">
              Progix accompagne le Client sur la commercialisation de Trajeo grâce à un{" "}
              <Strong>accompagnement marketing premium</Strong> (campagnes gérées de A à Z), afin
              d’acquérir les premiers passagers et chauffeurs et d’atteindre une liquidité
              suffisante, en mettant à profit ses process éprouvés sur de nombreuses applications
              mobiles.
            </InfoCallout>
          </div>
        </section>

        <Footer
          heading="Prêts à construire Trajeo"
          text="Ce cahier des charges fixe le périmètre de la première version (MVP) et sert de base au devis contractuel associé. Toute évolution du périmètre fera l’objet d’un accord écrit entre les parties."
        />
      </main>
      <ScrollReveal />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section-03 user cards & Section-06 journey rows (local helpers).    */
/* ------------------------------------------------------------------ */

const TD_NB: CSSProperties = {
  padding: "11px 15px",
  borderBottom: "1px solid var(--line)",
  color: "var(--slate)",
  lineHeight: 1.5,
};

const TD_NB_ALT: CSSProperties = { ...TD_NB, background: "var(--paper)" };

type UserRow = { b: string; t?: string; node?: ReactNode };

function UserCard({
  letter,
  letterBg,
  title,
  desc,
  rows,
  tags,
}: {
  letter: string;
  letterBg: string;
  title: string;
  desc: string;
  rows: UserRow[];
  tags: Tag[];
}) {
  return (
    <div
      style={{
        background: "var(--card-grad)",
        border: "1px solid var(--card-bd)",
        borderRadius: "14px",
        margin: "16px 0",
        boxShadow: "var(--shadow)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "14px",
          alignItems: "flex-start",
          padding: "20px 22px 14px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "11px",
            background: letterBg,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontWeight: 600,
            fontFamily: "var(--font-disp)",
            fontSize: "15px",
            boxShadow: "0 6px 14px rgba(12,35,64,.22)",
          }}
          aria-hidden="true"
        >
          {letter}
        </div>
        <div style={{ flex: 1 }}>
          <h4
            style={{
              fontFamily: "var(--font-disp)",
              fontSize: "16px",
              color: "#fff",
              fontWeight: 600,
              margin: "2px 0 3px",
            }}
          >
            {title}
          </h4>
          <div style={{ fontSize: "13.5px", color: "var(--slate)", lineHeight: 1.55 }}>{desc}</div>
        </div>
      </div>
      <div style={{ padding: "4px 22px 14px clamp(22px,4vw,76px)" }}>
        {rows.map((r, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "10px",
              padding: "6px 0",
              fontSize: "13.6px",
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
              aria-hidden="true"
            >
              ▸
            </span>
            <span>
              {r.node ? (
                r.node
              ) : (
                <>
                  <Strong>{r.b}</Strong>
                  {r.t}
                </>
              )}
            </span>
          </div>
        ))}
      </div>
      <div
        style={{
          padding: "0 22px 18px clamp(22px,4vw,76px)",
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        {tags.map((t) => (
          <span key={t.label} style={{ ...TAG_BASE, background: t.bg, color: t.fg, border: t.bd }}>
            {t.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function JourneyHeading({
  letter,
  children,
  marginTop = "14px",
}: {
  letter: string;
  children: ReactNode;
  marginTop?: string;
}) {
  return (
    <h3
      style={{
        fontFamily: "var(--font-disp)",
        fontSize: "18px",
        color: "#fff",
        fontWeight: 600,
        margin: `${marginTop} 0 12px`,
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <span style={{ color: "var(--cyan)", fontSize: "13px", fontWeight: 700 }} aria-hidden="true">
        {letter}
      </span>
      {children}
    </h3>
  );
}

function JourneyRow({ steps }: { steps: ReadonlyArray<{ n: string; t: string; d: string }> }) {
  return (
    <div style={{ margin: "0 0 8px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {steps.map((s) => (
          <div key={s.n} style={STEP_CARD}>
            <div style={STEP_EYEBROW}>{s.n}</div>
            <div style={STEP_TITLE}>{s.t}</div>
            <div style={STEP_DESC}>{s.d}</div>
          </div>
        ))}
      </div>
      <div style={STEP_RULE} aria-hidden="true" />
    </div>
  );
}
