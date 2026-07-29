import { DcHeader } from "./dc-header";
import { Footer } from "./footer";
import { ScrollReveal } from "./scroll-reveal";
import { SectionHeader } from "./primitives";
import { ChapterBand } from "./chapter-band";
import styles from "./devis.module.css";

/* ---- Data island, lifted verbatim from the source's renderVals() ---- */

const G_NV = "linear-gradient(150deg,var(--navy),var(--navy-700))";
const G_CY = "linear-gradient(150deg,var(--cyan-deep),var(--cyan))";

type Stat = { n: string; l: string };
const stats4: ReadonlyArray<Stat> = [
  { n: "107", l: "Projets livrés" },
  { n: "12", l: "Ingénieurs" },
  { n: "2", l: "Continents — Canada & France" },
  { n: "4+", l: "Années d’expérience" },
];

type Leader = { nm: string; ro: string; ds: string; img?: string };
const leaders: ReadonlyArray<Leader> = [
  {
    nm: "Ilyes Ghorieb",
    ro: "Président & Fondateur",
    img: "/team/ilyes-ghorieb.png",
    ds: "Pilote la stratégie de l’agence et la relation avec les partenaires clés. Interlocuteur direct sur les décisions structurantes et l’évolution des partenariats.",
  },
  {
    nm: "Morgane",
    ro: "Head of Delivery",
    ds: "Responsable de la livraison de l’ensemble des projets. Coordination des équipes, suivi client, et garantie du respect des délais et de la qualité.",
  },
  {
    nm: "Fadi Atmania",
    ro: "Cofondateur · Développement",
    img: "/team/fadi-atmania.jpg",
    ds: "Cofondateur de Progix. Pilote le développement commercial, les partenariats et la relation client sur la durée.",
  },
];

type Extra = { label: string; name: string; desc: string; img?: string };
const extras: ReadonlyArray<Extra> = [
  {
    label: "Responsable des ventes",
    name: "Aurelio Gustave",
    img: "/team/aurelio.jpg",
    desc: "Développement commercial et relation client.",
  },
  {
    label: "Marketing",
    name: "Corentin Desmaizières",
    desc: "Responsable marketing et acquisition.",
  },
];

type Member = { init: string; bg: string; nm: string; ro: string; tag: string; img?: string };
const team: ReadonlyArray<Member> = [
  {
    init: "KC",
    bg: G_NV,
    nm: "Karim Cheddad",
    ro: "Architecte Backend Senior",
    tag: "Python · FastAPI",
  },
  { init: "AA", bg: G_CY, nm: "Achref Arabi", ro: "Frontend Senior", tag: "React · Three.js" },
  {
    init: "MB",
    bg: G_NV,
    nm: "Mohamed L. Bouhezza",
    ro: "Ingénieur IA",
    tag: "IA · Flutter",
    img: "/team/mohamed-bouhezza.jpg",
  },
  {
    init: "MA",
    bg: G_CY,
    nm: "Meghlaoui Arselene",
    ro: "Réseaux & Sécurité",
    tag: "Sécurité · Flutter natif",
  },
  {
    init: "KC",
    bg: G_NV,
    nm: "Khalil Cheddadi",
    ro: "Ingénierie Logiciels Complexes",
    tag: "QA · DevOps · CI/CD",
    img: "/team/khalil-cheddadi.jpg",
  },
  {
    init: "MD",
    bg: G_CY,
    nm: "Mohamed Islem Deneche",
    ro: "Frontend Engineer",
    tag: "React · React Native",
    img: "/team/islem-deneche.jpg",
  },
  {
    init: "HF",
    bg: G_NV,
    nm: "Houssem Ferrani",
    ro: "Full Stack Engineer",
    tag: "FastAPI · React",
    img: "/team/houssem-ferrani.jpg",
  },
];

type StackGroup = { h: string; items: ReadonlyArray<string> };
const stack: ReadonlyArray<StackGroup> = [
  {
    h: "Backend",
    items: ["Python · FastAPI", "Node.js · NestJS", "Java · Spring Boot", "Django · Flask"],
  },
  { h: "Frontend", items: ["React", "Next.js", "SvelteKit", "Vue · TypeScript"] },
  { h: "Mobile", items: ["Flutter · Dart", "React Native", "Swift · Kotlin", "Expo"] },
  { h: "Données", items: ["PostgreSQL", "MongoDB", "Redis", "Supabase"] },
  { h: "DevOps", items: ["Docker", "GitHub Actions", "CI/CD", "AWS · VPS"] },
];

type Step = { num: string; h: string; p: string };
const steps: ReadonlyArray<Step> = [
  {
    num: "1",
    h: "Cadrage",
    p: "Réunion de kickoff. On définit les workflows, les user stories et l’architecture. On vous challenge sur vos choix.",
  },
  {
    num: "2",
    h: "Design",
    p: "Maquettes sur mesure validées avec vous. Nos designers seniors créent une interface qui convertit.",
  },
  {
    num: "3",
    h: "Développement",
    p: "Livraison itérative par sprints. Vous validez à chaque étape via TestFlight ou APK, meeting hebdomadaire.",
  },
  {
    num: "4",
    h: "Lancement",
    p: "Publication sur l’App Store et le Play Store. On gère toute la mise en ligne pour vous.",
  },
  {
    num: "5",
    h: "Croissance",
    p: "Accompagnement marketing 90 jours et support continu. On vous aide à acquérir vos utilisateurs.",
  },
];

type Commit = { h: string; p: string };
const commits: ReadonlyArray<Commit> = [
  {
    h: "Communication transparente",
    p: "Meeting hebdomadaire, réponse sous 24h, suivi en continu via Slack.",
  },
  {
    h: "Propriété intellectuelle progressive",
    p: "Vous êtes propriétaire à 100 % — transférée à chaque sprint payé.",
  },
  { h: "Garantie de délai", p: "Pénalités contractuelles en cas de retard de notre part." },
  {
    h: "Documentation complète",
    p: "Code maintenable, documenté, reprenable par n’importe quelle équipe.",
  },
];

type Project = { cat: string; nm: string; p: string; bar: string };
const portfolio: ReadonlyArray<Project> = [
  {
    cat: "Restauration",
    nm: "Pops Villepinte",
    p: "App de commande propre au restaurant pour bypasser Uber Eats et garder 100 % des revenus. Disponible sur les stores.",
    bar: "linear-gradient(90deg,var(--cyan-deep),var(--cyan))",
  },
  {
    cat: "Auto-école · CRM",
    nm: "GoodLock",
    p: "CRM complet + apps mobiles pour 3 succursales. Contrats, factures, réservations et relances entièrement digitalisés.",
    bar: "linear-gradient(90deg,var(--navy),var(--navy-700))",
  },
  {
    cat: "Marketplace",
    nm: "Hand2Hand",
    p: "Marketplace type Vinted avec système de livraison communautaire intégré. Logistique complexe gérée de bout en bout.",
    bar: "linear-gradient(90deg,var(--navy-700),var(--cyan-deep))",
  },
  {
    cat: "Pâtisserie · ERP",
    nm: "Marius & Fanny",
    p: "Digitalisation complète : inventaire, préparation de commandes, service client et commande en ligne pour 2 succursales.",
    bar: "linear-gradient(90deg,var(--cyan-deep),var(--cyan))",
  },
  {
    cat: "EdTech",
    nm: "Caser Pompier",
    p: "App de formation pour les futurs pompiers — cours, examens blancs et suivi de progression sur abonnement.",
    bar: "linear-gradient(90deg,var(--navy),var(--navy-700))",
  },
  {
    cat: "RH · Matching",
    nm: "Recrutement Plus",
    p: "Plateforme de matching automatisé candidats-employeurs, connectée au site web et aux processus de l’agence.",
    bar: "linear-gradient(90deg,var(--navy-700),var(--cyan-deep))",
  },
];

type Diff = { h: string; p: string };
const diff: ReadonlyArray<Diff> = [
  {
    h: "Expertise business + technique",
    p: "On ne fait pas qu’exécuter un cahier des charges. On vous conseille sur ce qui marche.",
  },
  {
    h: "Accompagnement marketing inclus",
    p: "On vous forme à acquérir vos utilisateurs. Code + croissance.",
  },
  { h: "107 projets livrés", p: "Une équipe expérimentée qui sait éviter les pièges et livrer." },
  {
    h: "Fièrement montréalaise",
    p: "Proximité, même fuseau horaire, conformité Loi 25 native.",
  },
  { h: "Vision long terme", p: "On conçoit pour durer 5 à 10 ans, pas pour le court terme." },
];

/* ---- Shared inline style fragments (faithful to the source) ---- */

const dottedSectionA: React.CSSProperties = {
  width: "100%",
  backgroundColor: "var(--band-a)",
};

const dottedSectionB: React.CSSProperties = {
  width: "100%",
  backgroundColor: "var(--band-b)",
};

const container: React.CSSProperties = {
  maxWidth: "1040px",
  margin: "0 auto",
  padding: "clamp(56px,7vw,94px) clamp(24px,5vw,48px)",
};

const cardBase: React.CSSProperties = {
  background: "linear-gradient(180deg,#fff,#EDF4FF)",
  border: "1px solid #D6E3F1",
  borderRadius: "14px",
  padding: "24px",
  boxShadow: "var(--shadow)",
};

/** Two-letter initials from a name, e.g. “Ilyes Ghorieb” → “IG”. */
function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}

/** Team avatar: real photo when available, gradient initials otherwise. Uses a
 *  soft rounded square (not a tight circle) so faces stay large and legible. */
function Avatar({
  img,
  alt,
  init,
  bg,
  size,
  radius = "16px",
}: {
  img?: string;
  alt: string;
  init: string;
  bg: string;
  size: number;
  radius?: string;
}) {
  const base: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: radius,
    flexShrink: 0,
  };
  if (img) {
    return (
      <img
        src={img}
        alt={alt}
        style={{
          ...base,
          objectFit: "cover",
          objectPosition: "center 28%",
          display: "block",
          border: "1px solid var(--line)",
          boxShadow: "var(--shadow)",
        }}
      />
    );
  }
  return (
    <div
      aria-hidden="true"
      style={{
        ...base,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "var(--font-disp)",
        fontWeight: 700,
        fontSize: `${Math.round(size * 0.32)}px`,
        background: bg,
      }}
    >
      {init}
    </div>
  );
}

/**
 * Accueil / Présentation — the landing page for the Progix document set. Custom
 * navy hero, then eight dotted content sections (identité, services, direction,
 * équipe, technologies, méthode, réalisations, pourquoi nous) and the footer.
 * A Server Component composing client leaves (header, scroll-reveal).
 */
export function AccueilDocument() {
  return (
    <div className={styles.root} data-devis-root>
      <DcHeader active="accueil" />
      <main className={styles.main}>
        {/* HERO — editorial navy cover (left-aligned, asymmetric) */}
        <section
          style={{
            position: "relative",
            color: "#EAF1F9",
            background:
              "radial-gradient(120% 90% at 92% -10%, rgba(56,182,255,.24) 0%, rgba(56,182,255,0) 52%),linear-gradient(160deg,var(--navy-900) 0%,var(--navy) 50%,var(--navy-800) 100%)",
            overflow: "hidden",
            width: "100%",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "radial-gradient(rgba(56,182,255,.10) 1px,transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage: "linear-gradient(180deg,#000 0%,transparent 78%)",
              WebkitMaskImage: "linear-gradient(180deg,#000 0%,transparent 78%)",
              pointerEvents: "none",
            }}
          />
          <img
            src="/progix-logo.png"
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "-7%",
              top: "46%",
              width: "clamp(420px,46vw,760px)",
              opacity: 0.08,
              transform: "translateY(-50%) rotate(-3deg)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: "1040px",
              margin: "0 auto",
              padding: "clamp(70px,10vw,124px) clamp(24px,5vw,48px) clamp(80px,9vw,116px)",
            }}
          >
            <img
              src="/progix-logo.png"
              alt="Progix"
              style={{ height: "30px", filter: "brightness(0) invert(1)", display: "block" }}
            />
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "30px",
                fontFamily: "var(--font-disp)",
                fontWeight: 600,
                fontSize: "12px",
                letterSpacing: "2.2px",
                textTransform: "uppercase",
                color: "var(--cyan)",
              }}
            >
              <span
                style={{
                  width: "26px",
                  height: "2px",
                  background: "var(--cyan)",
                  borderRadius: "2px",
                  display: "inline-block",
                }}
              />
              Firme de développement · Montréal
            </div>
            <h1
              style={{
                color: "#fff",
                fontFamily: "var(--font-disp)",
                fontSize: "clamp(37px,6.2vw,62px)",
                fontWeight: 700,
                letterSpacing: "-.025em",
                margin: "18px 0 0",
                maxWidth: "15ch",
                lineHeight: 1.03,
              }}
            >
              L’ingénierie logicielle qui fait{" "}
              <span
                style={{
                  background: "linear-gradient(115deg,#9FD8FF,#38B6FF 70%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  fontWeight: 600,
                }}
              >
                grandir votre entreprise
              </span>
            </h1>
            <p
              style={{
                margin: "22px 0 0",
                fontSize: "clamp(15px,1.8vw,18px)",
                color: "#BCD2E6",
                maxWidth: "52ch",
                lineHeight: 1.6,
              }}
            >
              Applications mobiles · CRM & ERP · Intelligence artificielle. Nous concevons,
              développons et accompagnons des produits qui génèrent des revenus.
            </p>
          </div>
        </section>

        {/* Floating proof strip — bridges the hero into the content */}
        <div
          style={{
            position: "relative",
            zIndex: 5,
            maxWidth: "1040px",
            margin: "-56px auto 0",
            padding: "0 clamp(24px,5vw,48px)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,170px),1fr))",
              background: "#fff",
              border: "1px solid var(--line)",
              borderRadius: "16px",
              boxShadow: "var(--shadow-lg)",
              overflow: "hidden",
            }}
          >
            {stats4.map((t, i) => (
              <div
                key={t.l}
                style={{
                  padding: "22px clamp(18px,2.2vw,26px)",
                  borderLeft: i ? "1px solid var(--line-soft)" : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-disp)",
                    fontWeight: 700,
                    fontSize: "32px",
                    color: "var(--navy)",
                    letterSpacing: "-.02em",
                    fontVariantNumeric: "tabular-nums",
                    lineHeight: 1,
                  }}
                >
                  {t.n}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "var(--muted)",
                    marginTop: "7px",
                    lineHeight: 1.35,
                  }}
                >
                  {t.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 01 — NOTRE IDENTITÉ */}
        <section data-dc-section style={dottedSectionA}>
          <div style={container}>
            <SectionHeader
              num="01 — NOTRE IDENTITÉ"
              title="Un cabinet d’ingénierie, pas un atelier de code"
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))",
                gap: "clamp(24px,4vw,48px)",
                alignItems: "center",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "16px",
                    color: "var(--ink)",
                    margin: "0 0 14px",
                    lineHeight: 1.64,
                  }}
                >
                  Progix est une firme de développement logiciel basée à{" "}
                  <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Montréal</strong>. Nous
                  concevons, développons et maintenons des systèmes en production — applications
                  mobiles, plateformes web, CRM et ERP sur mesure.
                </p>
                <p style={{ fontSize: "15px", color: "var(--slate)", margin: 0, lineHeight: 1.64 }}>
                  Nous ne livrons pas seulement du code. Nous livrons des produits qui{" "}
                  <strong style={{ color: "var(--ink)", fontWeight: 600 }}>
                    génèrent des revenus
                  </strong>{" "}
                  et que nous accompagnons sur la durée.
                </p>
              </div>
              <figure
                style={{
                  position: "relative",
                  margin: 0,
                  background: "linear-gradient(155deg,var(--navy-900),var(--navy))",
                  color: "#EAF1F9",
                  borderRadius: "18px",
                  padding: "30px 32px 26px",
                  boxShadow: "var(--shadow-lg)",
                  overflow: "hidden",
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "radial-gradient(rgba(56,182,255,.10) 1px,transparent 1px)",
                    backgroundSize: "22px 22px",
                    pointerEvents: "none",
                  }}
                />
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "-30px",
                    left: "22px",
                    fontFamily: "var(--font-disp)",
                    fontSize: "120px",
                    lineHeight: 1,
                    fontWeight: 700,
                    color: "rgba(56,182,255,.18)",
                  }}
                >
                  “
                </div>
                <blockquote
                  style={{
                    position: "relative",
                    margin: "24px 0 0",
                    fontFamily: "var(--font-disp)",
                    fontWeight: 500,
                    fontSize: "20px",
                    lineHeight: 1.42,
                    letterSpacing: "-.01em",
                    color: "#fff",
                  }}
                >
                  Un produit qui ne génère pas de revenus n’est pas livré — il est seulement écrit.
                </blockquote>
                <figcaption
                  style={{
                    position: "relative",
                    marginTop: "18px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontFamily: "var(--font-disp)",
                    fontSize: "12px",
                    letterSpacing: ".4px",
                    color: "var(--cyan)",
                  }}
                >
                  <span
                    style={{
                      width: "22px",
                      height: "2px",
                      background: "var(--cyan)",
                      display: "inline-block",
                    }}
                  />
                  La conviction Progix
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* 02 — SERVICES */}
        <section id="services" data-dc-section style={dottedSectionB}>
          <div style={container}>
            <SectionHeader
              num="02 — SERVICES"
              title="Des solutions complètes, du concept au lancement"
              lead="Du concept au lancement et au-delà : applications, plateformes, IA et accompagnement business — une équipe senior pour chaque brique de votre produit."
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))",
                gap: "16px",
              }}
            >
              {/* Applications mobiles */}
              <div style={{ ...cardBase, boxShadow: "var(--shadow)" }}>
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "12px",
                    background: G_NV,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 6px 14px rgba(12,35,64,.22)",
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="6" y="3" width="12" height="18" rx="2" />
                    <line x1="11" y1="18" x2="13" y2="18" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-disp)",
                    fontSize: "16px",
                    color: "var(--navy)",
                    fontWeight: 600,
                    margin: "14px 0 6px",
                  }}
                >
                  Applications mobiles
                </h3>
                <p
                  style={{ fontSize: "13.8px", color: "var(--slate)", margin: 0, lineHeight: 1.6 }}
                >
                  iOS et Android natifs ou cross-platform. Design sur mesure, back-office,
                  publication sur les stores et accompagnement marketing inclus.
                </p>
              </div>
              {/* CRM & ERP sur mesure */}
              <div style={cardBase}>
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "12px",
                    background: G_CY,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 6px 14px rgba(12,35,64,.22)",
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <line x1="9" y1="10" x2="9" y2="20" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-disp)",
                    fontSize: "16px",
                    color: "var(--navy)",
                    fontWeight: 600,
                    margin: "14px 0 6px",
                  }}
                >
                  CRM & ERP sur mesure
                </h3>
                <p
                  style={{ fontSize: "13.8px", color: "var(--slate)", margin: 0, lineHeight: 1.6 }}
                >
                  Digitalisation et automatisation des processus métier. Centralisez vos opérations,
                  gagnez du temps et de l’efficacité.
                </p>
              </div>
              {/* Intelligence artificielle */}
              <div style={cardBase}>
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "12px",
                    background: G_NV,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 6px 14px rgba(12,35,64,.22)",
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.5 5.5l2 2M16.5 16.5l2 2M18.5 5.5l-2 2M7.5 16.5l-2 2" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-disp)",
                    fontSize: "16px",
                    color: "var(--navy)",
                    fontWeight: 600,
                    margin: "14px 0 6px",
                  }}
                >
                  Intelligence artificielle
                </h3>
                <p
                  style={{ fontSize: "13.8px", color: "var(--slate)", margin: 0, lineHeight: 1.6 }}
                >
                  Intégration d’IA appliquée : agents conversationnels, automatisation intelligente,
                  traitement de données et inférence.
                </p>
              </div>
              {/* Plateformes web */}
              <div style={cardBase}>
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "12px",
                    background: G_CY,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 6px 14px rgba(12,35,64,.22)",
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="8 8 4 12 8 16" />
                    <polyline points="16 8 20 12 16 16" />
                    <line x1="13" y1="5" x2="11" y2="19" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-disp)",
                    fontSize: "16px",
                    color: "var(--navy)",
                    fontWeight: 600,
                    margin: "14px 0 6px",
                  }}
                >
                  Plateformes web
                </h3>
                <p
                  style={{ fontSize: "13.8px", color: "var(--slate)", margin: 0, lineHeight: 1.6 }}
                >
                  Applications web temps réel, marketplaces, portails clients. Architectures
                  modernes et performantes.
                </p>
              </div>
              {/* Accompagnement marketing */}
              <div style={cardBase}>
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "12px",
                    background: G_NV,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 6px 14px rgba(12,35,64,.22)",
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 17 9 11 13 15 21 7" />
                    <polyline points="14 7 21 7 21 14" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-disp)",
                    fontSize: "16px",
                    color: "var(--navy)",
                    fontWeight: 600,
                    margin: "14px 0 6px",
                  }}
                >
                  Accompagnement marketing
                </h3>
                <p
                  style={{ fontSize: "13.8px", color: "var(--slate)", margin: 0, lineHeight: 1.6 }}
                >
                  Formation à l’acquisition d’utilisateurs : UGC, Meta Ads, Apple Search Ads. On
                  vous laisse avec un business, pas juste une app.
                </p>
              </div>
              {/* Maintenance long terme */}
              <div style={cardBase}>
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "12px",
                    background: G_CY,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 6px 14px rgba(12,35,64,.22)",
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-disp)",
                    fontSize: "16px",
                    color: "var(--navy)",
                    fontWeight: 600,
                    margin: "14px 0 6px",
                  }}
                >
                  Maintenance long terme
                </h3>
                <p
                  style={{ fontSize: "13.8px", color: "var(--slate)", margin: 0, lineHeight: 1.6 }}
                >
                  Support continu, évolutions, et conception pour durer 5 à 10 ans. Nous maintenons
                  ce que nous construisons.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 03 — DIRECTION */}
        <section data-dc-section style={dottedSectionA}>
          <div style={container}>
            <SectionHeader num="03 — DIRECTION" title="Une direction impliquée à chaque étape" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,250px),1fr))",
                gap: "16px",
              }}
            >
              {leaders.map((l, i) => (
                <div key={l.nm} style={cardBase}>
                  <div
                    style={{
                      display: "flex",
                      gap: "14px",
                      alignItems: "center",
                      marginBottom: "12px",
                    }}
                  >
                    <Avatar
                      img={l.img}
                      alt={l.nm}
                      init={initialsOf(l.nm)}
                      bg={i % 2 === 0 ? G_NV : G_CY}
                      size={84}
                      radius="18px"
                    />
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontFamily: "var(--font-disp)",
                          fontWeight: 600,
                          fontSize: "17px",
                          color: "var(--navy)",
                        }}
                      >
                        {l.nm}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-disp)",
                          fontSize: "11px",
                          color: "var(--cyan-ink)",
                          fontWeight: 600,
                          letterSpacing: ".5px",
                          margin: "3px 0 0",
                          textTransform: "uppercase",
                        }}
                      >
                        {l.ro}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: "13.6px", color: "var(--slate)", lineHeight: 1.6 }}>
                    {l.ds}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))",
                gap: "16px 40px",
                marginTop: "22px",
                paddingTop: "22px",
                borderTop: "1px solid var(--line)",
              }}
            >
              {extras.map((e) => (
                <div
                  key={e.name}
                  style={{ display: "flex", gap: "13px", alignItems: "flex-start" }}
                >
                  <Avatar img={e.img} alt={e.name} init={initialsOf(e.name)} bg={G_CY} size={64} />
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "var(--font-disp)",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        color: "var(--cyan-ink)",
                        marginBottom: "6px",
                      }}
                    >
                      {e.label}
                    </div>
                    <div style={{ fontSize: "14.5px", color: "var(--slate)", lineHeight: 1.55 }}>
                      <b style={{ color: "var(--ink)", fontWeight: 600 }}>{e.name}</b> — {e.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 04 — L'ÉQUIPE */}
        <section data-dc-section style={dottedSectionB}>
          <div style={container}>
            <SectionHeader
              num="04 — L’ÉQUIPE"
              title="Une équipe rôdée à travailler ensemble"
              lead="Nos ingénieurs, seniors et spécialisés, travaillent ensemble depuis des années — la collaboration prolongée fait la différence sur les projets complexes."
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,264px),1fr))",
                gap: "14px",
              }}
            >
              {team.map((m, i) => (
                <div
                  key={`${m.init}-${i}`}
                  style={{
                    display: "flex",
                    gap: "14px",
                    alignItems: "center",
                    background: "linear-gradient(180deg,#fff,#EDF4FF)",
                    border: "1px solid #D6E3F1",
                    borderRadius: "14px",
                    padding: "16px 18px",
                    boxShadow: "var(--shadow)",
                  }}
                >
                  <Avatar img={m.img} alt={m.nm} init={m.init} bg={m.bg} size={72} />
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "var(--font-disp)",
                        fontWeight: 600,
                        fontSize: "14.5px",
                        color: "var(--navy)",
                      }}
                    >
                      {m.nm}
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--slate)" }}>{m.ro}</div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "var(--cyan-ink)",
                        fontFamily: "var(--font-disp)",
                        fontWeight: 600,
                        marginTop: "2px",
                      }}
                    >
                      {m.tag}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p
              style={{
                fontSize: "15px",
                color: "var(--slate)",
                margin: "22px 0 0",
                lineHeight: 1.62,
              }}
            >
              Nos ingénieurs ont collaboré sur{" "}
              <strong style={{ color: "var(--ink)", fontWeight: 600 }}>107 projets</strong> ensemble
              — applications web, mobiles, frontends, backends et intégrations. Une collaboration
              prolongée qui fait la différence sur les projets complexes.
            </p>
          </div>
        </section>

        <ChapterBand
          eyebrow="Notre approche"
          title="Un partenaire,"
          titleAccent="pas un prestataire."
          sub="L’expertise d’une équipe senior et un accompagnement business complet, du cadrage jusqu’au lancement — au prix d’un lancement, pas d’une ESN."
          stats={[
            { n: "100", u: "%", l: "Propriété du code, transférée à chaque sprint" },
            { n: "24", u: "h", l: "Délai de réponse garanti" },
            { n: "90", u: "j", l: "Accompagnement marketing inclus" },
            { n: "5–10", u: "ans", l: "Conçu pour durer" },
          ]}
        />

        {/* 05 — TECHNOLOGIES */}
        <section data-dc-section style={dottedSectionA}>
          <div style={container}>
            <SectionHeader
              num="05 — TECHNOLOGIES"
              title="La bonne techno pour le bon problème"
              lead="Sans préférence dogmatique. Nous maîtrisons la pile la plus performante du moment et choisissons l’outil adapté à chaque besoin métier."
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,150px),1fr))",
                gap: "14px",
              }}
            >
              {stack.map((s) => (
                <div
                  key={s.h}
                  style={{
                    background: "var(--paper)",
                    border: "1px solid var(--line)",
                    borderRadius: "14px",
                    padding: "18px 18px",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "var(--font-disp)",
                      fontSize: "13px",
                      color: "var(--cyan-ink)",
                      fontWeight: 700,
                      letterSpacing: ".5px",
                      textTransform: "uppercase",
                      margin: "0 0 10px",
                    }}
                  >
                    {s.h}
                  </h4>
                  {s.items.map((it) => (
                    <div
                      key={it}
                      style={{ fontSize: "13px", color: "var(--slate)", padding: "3px 0" }}
                    >
                      {it}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: "18px",
                background: "linear-gradient(155deg,var(--navy-900),var(--navy))",
                borderRadius: "18px",
                padding: "26px clamp(24px,4vw,32px)",
                display: "flex",
                alignItems: "center",
                gap: "22px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-disp)",
                  fontSize: "40px",
                  fontWeight: 700,
                  color: "var(--cyan)",
                  lineHeight: 1,
                }}
              >
                ∞
              </div>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <div
                  style={{
                    color: "#fff",
                    fontSize: "17px",
                    fontWeight: 600,
                    fontFamily: "var(--font-disp)",
                    marginBottom: "4px",
                  }}
                >
                  La technologie n’est jamais le facteur bloquant
                </div>
                <div style={{ color: "rgba(255,255,255,.7)", fontSize: "14px", lineHeight: 1.55 }}>
                  On identifie le bon outil, on apprend vite les briques manquantes, on livre.
                  Projet après projet.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 06 — MÉTHODE */}
        <section data-dc-section style={dottedSectionB}>
          <div style={container}>
            <SectionHeader num="06 — MÉTHODE" title="Un process éprouvé en 5 étapes" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,170px),1fr))",
                gap: "14px",
              }}
            >
              {steps.map((st) => (
                <div
                  key={st.num}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    background: "linear-gradient(180deg,#fff,#EDF4FF)",
                    border: "1px solid #D6E3F1",
                    borderRadius: "14px",
                    padding: "20px 18px",
                    boxShadow: "var(--shadow)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: "-16px",
                      right: "8px",
                      fontFamily: "var(--font-disp)",
                      fontWeight: 700,
                      fontSize: "78px",
                      lineHeight: 1,
                      color: "rgba(91,107,240,.07)",
                      WebkitTextStroke: "1px rgba(91,107,240,.15)",
                      pointerEvents: "none",
                    }}
                  >
                    {st.num}
                  </span>
                  <div
                    style={{
                      position: "relative",
                      width: "34px",
                      height: "34px",
                      borderRadius: "10px",
                      background: G_CY,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-disp)",
                      fontWeight: 700,
                      fontSize: "15px",
                      boxShadow: "0 6px 14px rgba(12,35,64,.2)",
                    }}
                  >
                    {st.num}
                  </div>
                  <h4
                    style={{
                      fontFamily: "var(--font-disp)",
                      fontSize: "15px",
                      color: "var(--navy)",
                      fontWeight: 600,
                      margin: "12px 0 5px",
                    }}
                  >
                    {st.h}
                  </h4>
                  <p
                    style={{ fontSize: "13px", color: "var(--slate)", margin: 0, lineHeight: 1.55 }}
                  >
                    {st.p}
                  </p>
                </div>
              ))}
            </div>
            <h3
              style={{
                fontFamily: "var(--font-disp)",
                fontSize: "18px",
                color: "var(--navy)",
                fontWeight: 600,
                margin: "30px 0 14px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span style={{ color: "var(--cyan)", fontSize: "13px" }}>◆</span>Nos engagements
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))",
                gap: "16px 30px",
              }}
            >
              {commits.map((c) => (
                <div key={c.h} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "8px",
                      background: "var(--ok-bg)",
                      color: "var(--ok)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: "13px",
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-disp)",
                        fontWeight: 600,
                        fontSize: "14px",
                        color: "var(--navy)",
                        marginBottom: "2px",
                      }}
                    >
                      {c.h}
                    </div>
                    <div style={{ fontSize: "13px", color: "var(--slate)", lineHeight: 1.5 }}>
                      {c.p}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 07 — RÉALISATIONS */}
        <section data-dc-section style={dottedSectionA}>
          <div style={container}>
            <SectionHeader
              num="07 — RÉALISATIONS"
              title="Des projets qui génèrent des résultats"
              lead="Ils nous ont fait confiance — applications, plateformes, CRM et ERP livrés et en production."
            />
            {portfolio[0] ? (
              <article
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))",
                  background: "linear-gradient(180deg,#fff,#EDF4FF)",
                  border: "1px solid #D6E3F1",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-lg)",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    minHeight: "210px",
                    background: "linear-gradient(150deg,var(--navy-900),var(--navy-700))",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "26px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: "radial-gradient(rgba(56,182,255,.14) 1px,transparent 1px)",
                      backgroundSize: "22px 22px",
                    }}
                  />
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      right: "-50px",
                      top: "-50px",
                      width: "210px",
                      height: "210px",
                      borderRadius: "50%",
                      background: "radial-gradient(circle,rgba(56,182,255,.4),transparent 68%)",
                    }}
                  />
                  <div style={{ position: "relative" }}>
                    <span
                      style={{
                        display: "inline-block",
                        fontFamily: "var(--font-disp)",
                        fontSize: "10.5px",
                        fontWeight: 700,
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        color: "var(--navy-900)",
                        background: "var(--cyan)",
                        borderRadius: "999px",
                        padding: "4px 11px",
                      }}
                    >
                      Projet phare
                    </span>
                    <div
                      style={{
                        fontFamily: "var(--font-disp)",
                        fontWeight: 700,
                        fontSize: "27px",
                        letterSpacing: "-.02em",
                        color: "#fff",
                        marginTop: "12px",
                      }}
                    >
                      {portfolio[0].nm}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    padding: "28px clamp(24px,3vw,34px)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-disp)",
                      fontSize: "11px",
                      color: "var(--cyan-ink)",
                      fontWeight: 600,
                      letterSpacing: ".8px",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    {portfolio[0].cat}
                  </div>
                  <p
                    style={{
                      fontSize: "15px",
                      color: "var(--slate)",
                      margin: "0 0 18px",
                      lineHeight: 1.62,
                    }}
                  >
                    {portfolio[0].p}
                  </p>
                  <div style={{ display: "flex", gap: "28px", flexWrap: "wrap" }}>
                    {[
                      { v: "100 %", l: "des revenus conservés" },
                      { v: "iOS · Android", l: "publié sur les stores" },
                    ].map((s) => (
                      <div key={s.l}>
                        <div
                          style={{
                            fontFamily: "var(--font-disp)",
                            fontWeight: 700,
                            fontSize: "18px",
                            color: "var(--navy)",
                            letterSpacing: "-.01em",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          {s.v}
                        </div>
                        <div
                          style={{ fontSize: "11.5px", color: "var(--muted)", marginTop: "3px" }}
                        >
                          {s.l}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ) : null}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,250px),1fr))",
                gap: "16px",
              }}
            >
              {portfolio.slice(1).map((p) => (
                <div
                  key={p.nm}
                  style={{
                    background: "linear-gradient(180deg,#fff,#EDF4FF)",
                    border: "1px solid #D6E3F1",
                    borderRadius: "14px",
                    overflow: "hidden",
                    boxShadow: "var(--shadow)",
                  }}
                >
                  <div style={{ height: "6px", background: p.bar }} />
                  <div style={{ padding: "20px 22px" }}>
                    <div
                      style={{
                        fontFamily: "var(--font-disp)",
                        fontSize: "11px",
                        color: "var(--cyan-ink)",
                        fontWeight: 600,
                        letterSpacing: ".8px",
                        textTransform: "uppercase",
                        marginBottom: "6px",
                      }}
                    >
                      {p.cat}
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-disp)",
                        fontSize: "17px",
                        color: "var(--navy)",
                        fontWeight: 600,
                        margin: "0 0 7px",
                      }}
                    >
                      {p.nm}
                    </h3>
                    <p
                      style={{
                        fontSize: "13.4px",
                        color: "var(--slate)",
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      {p.p}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 08 — POURQUOI NOUS */}
        <section data-dc-section style={dottedSectionB}>
          <div style={container}>
            <SectionHeader
              num="08 — POURQUOI NOUS"
              title="Plus qu’un prestataire, un partenaire"
              lead="La plupart des agences vous livrent du code et disparaissent. Nous, on s’installe comme votre partenaire stratégique et technologique — jusqu’au succès, pas juste jusqu’à la livraison."
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))",
                gap: "16px 30px",
              }}
            >
              {diff.map((d) => (
                <div key={d.h} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "8px",
                      background: "var(--ok-bg)",
                      color: "var(--ok)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: "13px",
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-disp)",
                        fontWeight: 600,
                        fontSize: "14px",
                        color: "var(--navy)",
                        marginBottom: "2px",
                      }}
                    >
                      {d.h}
                    </div>
                    <div style={{ fontSize: "13px", color: "var(--slate)", lineHeight: 1.5 }}>
                      {d.p}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div id="contact">
          <Footer
            heading="Donnons vie à votre projet"
            text="Réservez une consultation gratuite. On étudie ensemble la viabilité de votre projet et on vous donne des recommandations concrètes — sans engagement."
          />
        </div>
      </main>
      <ScrollReveal />
    </div>
  );
}
