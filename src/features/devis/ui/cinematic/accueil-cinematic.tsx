import type { ReactNode } from "react";
import { SmoothScroll } from "./smooth-scroll";
import { CinematicHeader } from "./cinematic-header";
import { CinematicHero } from "./cinematic-hero";
import { CinematicFooter } from "./cinematic-footer";
import { Reveal } from "./reveal";
import { TiltCard } from "./tilt-card";
import { Marquee } from "./marquee";
import { Counter } from "./counter";
import { GalleryFade } from "./gallery-fade";
import styles from "./cinematic.module.css";
import type { ClientEstimate } from "../../types";

/* ----------------------------------------------------------------- data --- */

type Service = { title: string; text: string; icon: ReactNode };
const ICON = (path: ReactNode) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {path}
  </svg>
);

const services: ReadonlyArray<Service> = [
  {
    title: "Applications mobiles",
    text: "iOS et Android, natifs ou cross-platform. Design sur mesure, back-office, publication sur les stores et accompagnement marketing inclus.",
    icon: ICON(
      <>
        <rect x="6" y="3" width="12" height="18" rx="2" />
        <line x1="11" y1="18" x2="13" y2="18" />
      </>,
    ),
  },
  {
    title: "CRM & ERP sur mesure",
    text: "Digitalisation et automatisation des processus métier. Centralisez vos opérations, gagnez du temps et de l’efficacité.",
    icon: ICON(
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <line x1="9" y1="10" x2="9" y2="20" />
      </>,
    ),
  },
  {
    title: "Intelligence artificielle",
    text: "IA appliquée : agents conversationnels, automatisation intelligente, traitement de données et inférence.",
    icon: ICON(
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.5 5.5l2 2M16.5 16.5l2 2M18.5 5.5l-2 2M7.5 16.5l-2 2" />
      </>,
    ),
  },
  {
    title: "Plateformes web",
    text: "Applications web temps réel, marketplaces, portails clients. Architectures modernes et performantes.",
    icon: ICON(
      <>
        <polyline points="8 8 4 12 8 16" />
        <polyline points="16 8 20 12 16 16" />
        <line x1="13" y1="5" x2="11" y2="19" />
      </>,
    ),
  },
  {
    title: "Accompagnement marketing",
    text: "Formation à l’acquisition d’utilisateurs : UGC, Meta Ads, Apple Search Ads. On vous laisse avec un business, pas juste une app.",
    icon: ICON(
      <>
        <polyline points="3 17 9 11 13 15 21 7" />
        <polyline points="14 7 21 7 21 14" />
      </>,
    ),
  },
  {
    title: "Maintenance long terme",
    text: "Support continu, évolutions, et conception pour durer 5 à 10 ans. Nous maintenons ce que nous construisons.",
    icon: ICON(
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </>,
    ),
  },
];

type Leader = { nm: string; ro: string; ds: string; img?: string };
const leaders: ReadonlyArray<Leader> = [
  {
    nm: "Ilyes Ghorieb",
    ro: "Président & Fondateur",
    img: "/team/ilyes-ghorieb.png",
    ds: "Pilote la stratégie de l’agence et la relation avec les partenaires clés. Interlocuteur direct sur les décisions structurantes.",
  },
  {
    nm: "Morgane",
    ro: "Head of Delivery",
    img: "/team/morgane.png",
    ds: "Responsable de la livraison de l’ensemble des projets. Coordination des équipes, suivi client, respect des délais et de la qualité.",
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
    img: "/team/corentin-desmaizieres.png",
    desc: "Responsable marketing et acquisition.",
  },
];

type Member = { nm: string; ro: string; tag: string; img?: string };
const team: ReadonlyArray<Member> = [
  {
    nm: "Karim Cheddad",
    ro: "Architecte Backend Senior",
    tag: "Python · FastAPI",
    img: "/team/karim-cheddad.jpg",
  },
  {
    nm: "Achref Arabi",
    ro: "Frontend Senior",
    tag: "React · Three.js",
    img: "/team/achraf-arabi.png",
  },
  {
    nm: "Mohamed L. Bouhezza",
    ro: "Ingénieur IA",
    tag: "IA · Flutter",
    img: "/team/mohamed-bouhezza.jpg",
  },
  {
    nm: "Meghlaoui Arselene",
    ro: "Réseaux & Sécurité",
    tag: "Sécurité · Flutter",
    img: "/team/arslene.png",
  },
  {
    nm: "Khalil Cheddadi",
    ro: "Ingénierie Logiciels Complexes",
    tag: "QA · DevOps · CI/CD",
    img: "/team/khalil-cheddadi.jpg",
  },
  {
    nm: "Mohamed Islem Deneche",
    ro: "Frontend Engineer",
    tag: "React · React Native",
    img: "/team/islem-deneche.jpg",
  },
  {
    nm: "Houssem Ferrani",
    ro: "Full Stack Engineer",
    tag: "FastAPI · React",
    img: "/team/houssem-ferrani.jpg",
  },
  {
    nm: "Hafed",
    ro: "Mobile Engineer",
    tag: "Flutter · Dart",
    img: "/team/hafed.png",
  },
  {
    nm: "Ghassen D.",
    ro: "Mobile Engineer",
    tag: "React Native · Expo",
    img: "/team/ghassen.png",
  },
  {
    nm: "Ali T.",
    ro: "Full Stack Engineer",
    tag: "Next.js · NestJS",
    img: "/team/ali.png",
  },
];

type StackGroup = { h: string; items: ReadonlyArray<string> };
const stack: ReadonlyArray<StackGroup> = [
  { h: "Backend", items: ["Python · FastAPI", "Node · NestJS", "Java · Spring", "Django"] },
  { h: "Frontend", items: ["React", "Next.js", "SvelteKit", "Vue · TS"] },
  { h: "Mobile", items: ["Flutter · Dart", "React Native", "Swift · Kotlin", "Expo"] },
  { h: "Données", items: ["PostgreSQL", "MongoDB", "Redis", "Supabase"] },
  { h: "DevOps", items: ["Docker", "GitHub Actions", "CI/CD", "AWS · VPS"] },
];

type Step = { num: string; h: string; p: string };
const steps: ReadonlyArray<Step> = [
  {
    num: "1",
    h: "Cadrage",
    p: "Réunion de kickoff. On définit workflows, user stories et architecture. On vous challenge sur vos choix.",
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
    p: "Meeting hebdomadaire, réponse sous 24 h, suivi continu via Slack.",
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

/* Realisations — mobile apps shipped by Progix. Media (app demos + screenshots)
 * hosted on Supabase (Projix bucket). Videos autoplay muted on loop. */
const SB = "https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects";

type Project = {
  cat: string;
  nm: string;
  p: string;
  media?: string;
  poster?: string;
  gallery?: readonly string[];
  combo?: { video: string; phone: string; poster?: string };
};
const portfolio: ReadonlyArray<Project> = [
  {
    cat: "Restauration",
    nm: "Pops",
    p: "App mobile restaurant-to-consumer : commande, fidélisation et expérience client en direct, sans intermédiaire.",
    media: `${SB}/Pops/pops-demo.mp4`,
    poster: `${SB}/Pops/pops-splash.png`,
  },
  {
    cat: "Marketplace",
    nm: "Hand2Hand",
    p: "Marketplace mobile entre particuliers — biens et services, messagerie et missions de livraison intégrées.",
    media: `${SB}/Hand2Hand/hand2hand-dem0.mp4`,
    poster: `${SB}/Hand2Hand/hand2hand-homepage.png`,
  },
  {
    cat: "Transport · Multi-services",
    nm: "CoRide",
    p: "App mobile multi-services (Flutter) : transport privé, livraison et food delivery — app mobile et vitrine web.",
    combo: {
      video: `${SB}/CoRide/CoRideVideo.mp4`,
      phone: `${SB}/CoRide/Splash%20screen.png`,
      poster: `${SB}/CoRide/PosterImage.png`,
    },
  },
  {
    cat: "Location de voitures",
    nm: "My Fleet",
    p: "Mise en relation agences ↔ clients : recherche, réservation, inspection et suivi du véhicule.",
    media: `${SB}/MyFleet/myfleet-demo.mp4`,
    poster: `${SB}/MyFleet/myfleet-homescreen.png`,
  },
  {
    cat: "Publicité",
    nm: "DriveAds",
    p: "Gestion de campagnes publicitaires diffusées sur véhicules — du ciblage au suivi des performances.",
    media: `${SB}/DriveAds/driveads-demo.mp4`,
    poster: `${SB}/DriveAds/driveads-homescreen.png`,
  },
  {
    cat: "Restauration · Livraison",
    nm: "Breaking Family",
    p: "App de restaurant : consultation du menu, commande de plats et livraison à domicile.",
    media: `${SB}/BreakingFamily/breaking-family-demo.mp4`,
    poster: `${SB}/BreakingFamily/breaking-family-home.jpeg`,
  },
  {
    cat: "Logistique · Expédition",
    nm: "iBox",
    p: "Expédition de colis en un geste : mise en relation avec des transporteurs de confiance, partout dans le monde.",
    gallery: [`${SB}/iBox/IMG_1835.PNG`, `${SB}/iBox/IMG_1838.PNG`, `${SB}/iBox/IMG_1840.PNG`],
  },
  {
    cat: "Rencontres",
    nm: "Al-aqd",
    p: "Application de rencontres halal — profils, matchs et messagerie, dans le respect des valeurs de la communauté.",
    gallery: [
      `${SB}/Al-aqd/Al-aqd-mainview.jpeg`,
      `${SB}/Al-aqd/Al-aqd-profile.jpeg`,
      `${SB}/Al-aqd/Al-aqd-matchlist.jpeg`,
      `${SB}/Al-aqd/Al-aqd-matches.jpeg`,
    ],
  },
];

const isVideo = (u: string) => /\.(mp4|webm|mov)(\?|$)/i.test(u);

function ProjectMedia({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  if (isVideo(src)) {
    return (
      <video
        className={className}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
    );
  }
  return <img className={className} src={src} alt="" loading="lazy" aria-hidden="true" />;
}

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
  { h: "140+ projets livrés", p: "Une équipe expérimentée qui sait éviter les pièges et livrer." },
  { h: "Fièrement montréalaise", p: "Proximité, même fuseau horaire, conformité Loi 25 native." },
  { h: "Vision long terme", p: "On conçoit pour durer 5 à 10 ans, pas pour le court terme." },
];

const marqueeItems = [
  "Applications mobiles",
  "CRM & ERP",
  "Intelligence artificielle",
  "Plateformes web",
  "Accompagnement marketing",
  "Maintenance long terme",
];

function initials(name: string): string {
  const p = name.trim().split(/\s+/);
  return ((p[0]?.[0] ?? "") + (p.length > 1 ? (p[p.length - 1]?.[0] ?? "") : "")).toUpperCase();
}

function Avatar({ img, name, size }: { img?: string; name: string; size: number }) {
  if (img) {
    return (
      <img
        src={img}
        alt={name}
        className={styles.avatar}
        style={{ width: size, height: size }}
        loading="lazy"
      />
    );
  }
  return (
    <span
      className={styles.avatarFallback}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.34) }}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}

function SectionHead({
  num,
  eyebrow,
  title,
  lead,
}: {
  num: string;
  eyebrow: string;
  title: ReactNode;
  lead?: string;
}) {
  return (
    <div style={{ position: "relative", marginBottom: 8 }}>
      <span className={styles.ghostNum} aria-hidden="true">
        {num}
      </span>
      <Reveal>
        <span className={styles.eyebrow}>
          <span className={styles.eyebrowBar} />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className={styles.heading}>{title}</h2>
      </Reveal>
      {lead ? (
        <Reveal delay={0.12}>
          <p className={styles.lead}>{lead}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

/* --------------------------------------------------------------- render --- */

/**
 * Accueil / Présentation — dark cinematic landing. Server Component composing
 * the cinematic client leaves (smooth scroll, header, hero, reveals, tilt cards,
 * marquee, counters, footer). Same Progix content, reframed as a product launch.
 */
export function AccueilCinematic({ estimate }: { estimate?: ClientEstimate }) {
  return (
    <div className={styles.scope} data-cinematic-root>
      <SmoothScroll />
      <div className={styles.pageAura} aria-hidden="true" />
      <div className={styles.pageGrid} aria-hidden="true" />
      <div className={styles.pageNoise} aria-hidden="true" />

      <div className={styles.content}>
        <CinematicHeader active="accueil" />
        <main>
          <CinematicHero />

          <Marquee items={marqueeItems} />

          {/* 01 — IDENTITÉ */}
          <section className={styles.section}>
            <div className={styles.container}>
              <SectionHead
                num="01"
                eyebrow="Notre identité"
                title="Un cabinet d’ingénierie, pas un atelier de code"
              />
              <div className={styles.identityGrid} style={{ marginTop: 48 }}>
                <Reveal direction="right">
                  <div>
                    <p style={{ fontSize: 18, color: "var(--text)", lineHeight: 1.66, margin: 0 }}>
                      Progix est une firme de développement logiciel basée à Montréal. Nous
                      concevons, développons et maintenons des systèmes en production — applications
                      mobiles, plateformes web, CRM et ERP sur mesure.
                    </p>
                    <p
                      style={{
                        fontSize: 16,
                        color: "var(--text-dim)",
                        lineHeight: 1.66,
                        margin: "18px 0 0",
                      }}
                    >
                      Nous ne livrons pas seulement du code. Nous livrons des produits qui génèrent
                      des revenus et que nous accompagnons sur la durée.
                    </p>
                  </div>
                </Reveal>
                <Reveal direction="left" delay={0.1}>
                  <div className={`${styles.glass} ${styles.quoteCard}`}>
                    <span className={styles.quoteMark} aria-hidden="true">
                      “
                    </span>
                    <p className={styles.quoteText}>
                      Un produit qui ne génère pas de revenus n’est pas livré — il est seulement
                      écrit.
                    </p>
                    <span className={styles.quoteAuthor}>
                      <span className={styles.eyebrowBar} />
                      La conviction Progix
                    </span>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* 02 — SERVICES */}
          <section className={styles.section} id="services">
            <span className={`${styles.sectionGlow} ${styles.sectionGlowA}`} aria-hidden="true" />
            <div className={styles.container}>
              <SectionHead
                num="02"
                eyebrow="Services"
                title={
                  <>
                    Des solutions complètes,{" "}
                    <span className={styles.gradText}>du concept au lancement</span>
                  </>
                }
                lead="Du concept au lancement et au-delà : applications, plateformes, IA et accompagnement business — une équipe senior pour chaque brique de votre produit."
              />
              <div className={`${styles.gridAuto} ${styles.cols3}`}>
                {services.map((s, i) => (
                  <Reveal key={s.title} delay={(i % 3) * 0.08}>
                    <TiltCard className={styles.serviceCard}>
                      <span className={styles.serviceIcon}>{s.icon}</span>
                      <h3 className={styles.cardTitle}>{s.title}</h3>
                      <p className={styles.cardText}>{s.text}</p>
                    </TiltCard>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* 03 — DIRECTION */}
          <section className={styles.section}>
            <div className={styles.container}>
              <SectionHead
                num="03"
                eyebrow="Direction"
                title="Une direction impliquée à chaque étape"
              />
              <div className={`${styles.gridAuto} ${styles.cols3}`}>
                {leaders.map((l, i) => (
                  <Reveal key={l.nm} delay={i * 0.08}>
                    <TiltCard className={styles.leaderCard} max={5}>
                      <div className={styles.leaderTop}>
                        <Avatar img={l.img} name={l.nm} size={72} />
                        <div>
                          <div className={styles.leaderName}>{l.nm}</div>
                          <div className={styles.leaderRole}>{l.ro}</div>
                        </div>
                      </div>
                      <p className={styles.leaderDesc}>{l.ds}</p>
                    </TiltCard>
                  </Reveal>
                ))}
              </div>
              <div className={styles.extrasRow}>
                {extras.map((e, i) => (
                  <Reveal key={e.name} delay={i * 0.08}>
                    <div className={`${styles.glass} ${styles.extra}`}>
                      <Avatar img={e.img} name={e.name} size={84} />
                      <div style={{ minWidth: 0 }}>
                        <div className={styles.extraLabel}>{e.label}</div>
                        <div className={styles.extraNameMain}>{e.name}</div>
                        <div className={styles.extraName}>{e.desc}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* 04 — ÉQUIPE */}
          <section className={`${styles.section} ${styles.sectionTight}`}>
            <div className={styles.container}>
              <SectionHead
                num="04"
                eyebrow="L’équipe"
                title="Une équipe rôdée à travailler ensemble"
                lead="Nos ingénieurs, seniors et spécialisés, travaillent ensemble depuis des années — la collaboration prolongée fait la différence sur les projets complexes."
              />
              <div className={styles.teamWall}>
                {team.map((m, i) => (
                  <Reveal key={m.nm} delay={(i % 4) * 0.07}>
                    <div className={styles.teamMember}>
                      <div className={styles.teamFrame}>
                        {m.img ? (
                          <img className={styles.teamPhoto} src={m.img} alt={m.nm} loading="lazy" />
                        ) : (
                          <span className={styles.teamInitials} aria-hidden="true">
                            {initials(m.nm)}
                          </span>
                        )}
                        <span className={styles.teamScan} aria-hidden="true" />
                        <span className={styles.teamWash} aria-hidden="true" />
                        <span className={styles.teamNum} aria-hidden="true">
                          {String(i + 1).padStart(2, "0")} /
                        </span>
                        <span className={styles.teamTickTR} aria-hidden="true" />
                        <span className={styles.teamTickBL} aria-hidden="true" />
                        <span className={styles.teamSkills}>
                          {m.tag.split("·").map((s) => (
                            <span key={s} className={styles.teamSkill}>
                              {s.trim()}
                            </span>
                          ))}
                        </span>
                      </div>
                      <div className={styles.teamMeta}>
                        <span className={styles.teamAccent} aria-hidden="true" />
                        <div style={{ minWidth: 0 }}>
                          <div className={styles.teamName}>{m.nm}</div>
                          <div className={styles.teamRole}>{m.ro}</div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* CHAPTER BAND — counters */}
          <section className={styles.band}>
            <div className={styles.bandInner}>
              <Reveal>
                <span className={styles.eyebrow}>
                  <span className={styles.eyebrowBar} />
                  Notre approche
                </span>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className={styles.bandTitle}>
                  Un partenaire, <span className={styles.gradText}>pas un prestataire.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className={styles.lead}>
                  L’expertise d’une équipe senior et un accompagnement business complet, du cadrage
                  jusqu’au lancement — au prix d’un lancement, pas d’une ESN.
                </p>
              </Reveal>
              <div className={styles.bandStats}>
                {[
                  {
                    num: <Counter value={100} suffix=" %" />,
                    l: "Propriété du code, transférée à chaque sprint",
                  },
                  { num: <Counter value={24} suffix=" h" />, l: "Délai de réponse garanti" },
                  {
                    num: (
                      <Counter
                        value={estimate ? Number(estimate.delivery_days) || 90 : 90}
                        suffix=" j"
                      />
                    ),
                    l: "Accompagnement marketing inclus",
                  },
                  { num: <>5–10 ans</>, l: "Conçu pour durer dans le temps" },
                ].map((s, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <div>
                      <div className={styles.bandStatNum}>{s.num}</div>
                      <div className={styles.bandStatLabel}>{s.l}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* 05 — TECHNOLOGIES */}
          <section className={styles.section}>
            <div className={styles.container}>
              <SectionHead
                num="05"
                eyebrow="Technologies"
                title="La bonne techno pour le bon problème"
                lead="Sans préférence dogmatique. Nous maîtrisons la pile la plus performante du moment et choisissons l’outil adapté à chaque besoin métier."
              />
              <div className={styles.stackGrid}>
                {stack.map((s, i) => (
                  <Reveal key={s.h} delay={(i % 5) * 0.06}>
                    <div className={`${styles.glass} ${styles.stackCard}`}>
                      <h4 className={styles.stackHead}>{s.h}</h4>
                      {s.items.map((it) => (
                        <div key={it} className={styles.stackItem}>
                          {it}
                        </div>
                      ))}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* 06 — MÉTHODE */}
          <section className={`${styles.section} ${styles.sectionTight}`}>
            <div className={styles.container}>
              <SectionHead num="06" eyebrow="Méthode" title="Un process éprouvé en 5 étapes" />
              <div className={styles.method}>
                {steps.map((st, i) => (
                  <Reveal key={st.num} delay={i * 0.07}>
                    <div className={`${styles.glass} ${styles.stepCard}`}>
                      <span className={styles.stepGhost} aria-hidden="true">
                        {st.num}
                      </span>
                      <span className={styles.stepNum}>{st.num}</span>
                      <h4 className={styles.stepTitle}>{st.h}</h4>
                      <p className={styles.stepText}>{st.p}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal>
                <h3
                  style={{
                    fontFamily: "var(--font-disp)",
                    fontSize: 20,
                    color: "#fff",
                    fontWeight: 600,
                    margin: "44px 0 0",
                  }}
                >
                  <span style={{ color: "var(--cyan)", marginRight: 10 }}>◆</span>Nos engagements
                </h3>
              </Reveal>
              <div className={styles.checkGrid}>
                {commits.map((c, i) => (
                  <Reveal key={c.h} delay={(i % 2) * 0.08}>
                    <div className={styles.checkItem}>
                      <span className={styles.checkMark}>✓</span>
                      <div>
                        <p className={styles.checkTitle}>{c.h}</p>
                        <p className={styles.checkText}>{c.p}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* 07 — RÉALISATIONS */}
          <section className={styles.section} id="realisations">
            <span className={`${styles.sectionGlow} ${styles.sectionGlowB}`} aria-hidden="true" />
            <div className={styles.container}>
              <SectionHead
                num="07"
                eyebrow="Réalisations"
                title="Des applications mobiles en production"
                lead="Des apps iOS et Android conçues, développées et publiées sur les stores — un aperçu de chacune, en démo et en images."
              />
              <div className={styles.showcaseList}>
                {portfolio.map((p, i) => (
                  <Reveal key={p.nm}>
                    <article
                      className={`${styles.glass} ${styles.featured} ${
                        p.combo ? styles.featuredWide : ""
                      } ${i % 2 === 1 ? styles.featuredReverse : ""}`}
                    >
                      {p.combo ? (
                        <div className={styles.comboWrap}>
                          <div className={styles.comboBrowser}>
                            <span className={styles.comboBar} aria-hidden="true">
                              <span className={styles.comboDot} />
                              <span className={styles.comboDot} />
                              <span className={styles.comboDot} />
                            </span>
                            <video
                              className={styles.comboVideo}
                              src={p.combo.video}
                              poster={p.combo.poster}
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload="auto"
                              aria-hidden="true"
                            />
                          </div>
                          <img
                            className={styles.comboPhone}
                            src={p.combo.phone}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                          />
                        </div>
                      ) : p.gallery ? (
                        <GalleryFade images={p.gallery} className={styles.featuredGallery} />
                      ) : (
                        <ProjectMedia
                          src={p.media ?? ""}
                          poster={p.poster}
                          className={styles.featuredVideo}
                        />
                      )}
                      <div className={styles.featuredBody}>
                        <div className={styles.projCat}>{p.cat}</div>
                        <h3 className={styles.projName}>{p.nm}</h3>
                        <p className={styles.projText}>{p.p}</p>
                        <div className={styles.featuredStores}>
                          <span className={styles.featuredStore}>App Store</span>
                          <span className={styles.featuredStore}>Google Play</span>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
              <Reveal>
                <a
                  href="https://github.com/progixdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.moreProjects}
                >
                  <div>
                    <div className={styles.moreNum}>140+</div>
                    <div className={styles.moreLabel}>
                      projets livrés à ce jour — ceci n’est qu’un aperçu de nos réalisations.
                    </div>
                  </div>
                  <span className={styles.moreLink}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.6 8.21 11.16.6.11.82-.25.82-.57v-2.2c-3.34.71-4.04-1.6-4.04-1.6-.55-1.36-1.34-1.72-1.34-1.72-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.21 1.84 1.21 1.07 1.79 2.81 1.27 3.5.97.11-.76.42-1.27.76-1.56-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.21a11.6 11.6 0 0 1 6 0c2.29-1.53 3.3-1.21 3.3-1.21.66 1.64.24 2.86.12 3.16.77.83 1.23 1.88 1.23 3.17 0 4.53-2.81 5.53-5.49 5.82.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12.02 12.02 0 0 0 24 12.29C24 5.78 18.63.5 12 .5z" />
                    </svg>
                    github.com/progixdev
                    <span className={styles.btnArrow}>→</span>
                  </span>
                </a>
              </Reveal>
            </div>
          </section>

          {/* 08 — POURQUOI NOUS */}
          <section className={`${styles.section} ${styles.sectionTight}`}>
            <div className={styles.container}>
              <SectionHead
                num="08"
                eyebrow="Pourquoi nous"
                title="Plus qu’un prestataire, un partenaire"
                lead="La plupart des agences vous livrent du code et disparaissent. Nous, on s’installe comme votre partenaire stratégique et technologique — jusqu’au succès, pas juste jusqu’à la livraison."
              />
              <div className={styles.checkGrid}>
                {diff.map((d, i) => (
                  <Reveal key={d.h} delay={(i % 2) * 0.08}>
                    <div className={styles.checkItem}>
                      <span className={styles.checkMark}>✓</span>
                      <div>
                        <p className={styles.checkTitle}>{d.h}</p>
                        <p className={styles.checkText}>{d.p}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </main>
        <CinematicFooter />
      </div>
    </div>
  );
}
