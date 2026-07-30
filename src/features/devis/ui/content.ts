/**
 * Faithful content for the Progix "Devis contractuel" — Trajeo (nom de travail).
 * List-shaped data lives here; prose with inline emphasis is authored in the
 * section JSX.
 *
 * All copy uses French typography (’ « » … —) — keep it that way.
 */

export const cover = {
  tag: "Devis contractuel · Bon de commande",
  title: "Développement de votre",
  titleLight: "plateforme de mobilité à la demande",
  subtitle:
    "Application mobile de mise en relation entre passagers et chauffeurs : réservation de trajets, géolocalisation et suivi de course en temps réel, estimation de prix, profils vérifiés et notation mutuelle — plus back-office, landing page, API, infrastructure cloud et accompagnement marketing premium jusqu’à la mise en marché. Un prix fixe, une équipe senior, votre propriété à 100 %.",
  badges: [
    { l: "Montant total", v: "5 600 €", u: "" },
    { l: "Délai de livraison", v: "90", u: " jours" },
    { l: "Marketing", v: "Premium", u: " inclus" },
  ],
  meta: [
    { l: "Projet", v: "Trajeo (nom de travail)" },
    { l: "Client", v: "Client" },
    { l: "Prestataire", v: "Progix Inc. · NEQ 1181317117" },
    { l: "Référence · Date", v: "DEVIS-PROGIX-2026 · ____________" },
  ],
} as const;

export const trust = [
  { n: "12", l: "ingénieurs dédiés" },
  { n: "100+", l: "projets livrés" },
  { n: "100 %", l: "propriété au Client" },
  { n: "CA · FR", l: "équipe Canada & France" },
] as const;

/** Section 02 — prestations included, grouped. `b` is emphasized, `t` follows. */
export const incl1 = [
  { b: "Application mobile iOS & Android", t: " design sur mesure" },
  { b: "Réservation de trajets & mise en relation", t: " en temps réel" },
  { b: "Géolocalisation & suivi de course", t: " sur carte" },
  { b: "Profils passagers & chauffeurs", t: " avec vérification des documents" },
  { b: "Estimation de prix & itinéraire", t: " avant réservation" },
  { b: "Historique des courses & notation", t: " mutuelle" },
  { b: "Back-office d’administration", t: " (courses, chauffeurs, litiges)" },
  { b: "Landing page", t: " de présentation, optimisée acquisition" },
  { b: "3 révisions de maquettes", t: " incluses dans le forfait" },
] as const;

export const incl2 = [
  { b: "API & base de données", t: " dédiées à la plateforme" },
  { b: "Infrastructure cloud scalable & intégrations", t: " selon la charge" },
  {
    b: "Monétisation",
    t: " par commission ou abonnement (modèle retenu avec le Client)",
  },
  {
    b: "Publication App Store & Google Play",
    t: " — phase de production (30 j) incluse",
  },
] as const;

export const incl3 = [
  {
    b: "Marketing premium clé en main",
    t: " : stratégie, UGC, créatifs, campagnes gérées de A à Z",
  },
  {
    b: "Gestion Meta Ads, Google Ads & Apple Search Ads",
    t: " — optimisation quotidienne",
  },
  { b: "Analyse des KPIs, réunion hebdomadaire", t: " & reporting continu" },
  { b: "Support technique", t: " + documentation technique complète" },
] as const;

/** Section 03 — investment table, poste par poste. `alt` rows get the tinted
 * background; the priced lines sum to the 5 600 € all-inclusive forfait. */
export const investment = [
  {
    strong: "Application mobile iOS + Android",
    text: " (design sur mesure)",
    amount: "1 700 €",
    alt: false,
  },
  { text: "Back-office d’administration & gestion des courses", amount: "650 €", alt: true },
  { text: "API & base de données", amount: "600 €", alt: false },
  { text: "Infrastructure cloud scalable & intégrations", amount: "550 €", alt: true },
  { text: "Landing page de présentation", amount: "250 €", alt: false },
  {
    text: "Déploiement & phase de production stores (30 j, reviews, test Google Play)",
    amount: "500 €",
    alt: true,
  },
  {
    text: "Accompagnement marketing premium (clé en main, campagnes gérées)",
    amount: "900 €",
    alt: false,
  },
  { text: "Documentation, maintenance & support", amount: "450 €", alt: true },
] as const;

/** Section 03 — payment schedule. The 5 600 € forfait is paid monthly over six
 * months (≈ 933 €/mois). */
export const payments = [
  { pct: "MOIS 1", when: "Au démarrage", desc: "Signature + réunion de cadrage", amount: "933 €" },
  {
    pct: "MOIS 2",
    when: "Développement",
    desc: "Front mobile, API, base de données",
    amount: "933 €",
  },
  { pct: "MOIS 3", when: "Développement", desc: "Back-office & intégrations", amount: "933 €" },
  {
    pct: "MOIS 4",
    when: "Tests internes",
    desc: "Recette & préparation des stores",
    amount: "933 €",
  },
  {
    pct: "MOIS 5",
    when: "Production",
    desc: "Publication & reviews Apple / Google",
    amount: "933 €",
  },
  { pct: "MOIS 6", when: "Validation", desc: "Mise en ligne validée + lancement", amount: "935 €" },
] as const;

/** Section 06 — delivery phases (90 jours au total : 60 dev + 30 production). */
export const phases = [
  {
    tag: "PHASE 1",
    title: "Développement",
    desc: "≈ J1 – J60 · app, back-office, API, base de données, intégrations, tests internes",
  },
  {
    tag: "PHASE 2",
    title: "Publication",
    desc: "≈ J61 – J75 · App Store + Google Play, gestion des reviews Apple & Google, correctifs",
  },
  {
    tag: "PHASE 3",
    title: "Validation",
    desc: "≈ J76 – J90 · test Google Play (14 j) inclus, corrections, suivi jusqu’à validation",
  },
] as const;

/** Header / footer navigation across the document set. */
export const navLinks = [
  { key: "accueil", label: "Présentation", href: "/devis/client" },
  { key: "cahier", label: "Cahier des charges", href: "/devis/client/cahier-des-charges" },
  { key: "calendrier", label: "Calendrier", href: "/devis/client/calendrier" },
  { key: "devis", label: "Devis contractuel", href: "/devis/client/contrat" },
] as const;

export function getNavLinks(slug = "client") {
  return [
    { key: "accueil", label: "Présentation", href: `/devis/${slug}` },
    { key: "cahier", label: "Cahier des charges", href: `/devis/${slug}/cahier-des-charges` },
    { key: "calendrier", label: "Calendrier", href: `/devis/${slug}/calendrier` },
    { key: "devis", label: "Devis contractuel", href: `/devis/${slug}/contrat` },
  ] as const;
}
