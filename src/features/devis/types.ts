export interface EstimateFeatureItem {
  id: string;
  category: "dev" | "api" | "marketing";
  labelStrong?: string;
  label: string;
  included: boolean;
  isCustom?: boolean;
}

export interface EstimateInvestmentItem {
  id: string;
  labelStrong?: string;
  label: string;
  amount: string;
}

export interface EstimateInstallmentItem {
  label: string; // e.g. "Acompte à la signature"
  percentage: number; // e.g. 20
  amount: string; // e.g. "1 120 €"
}

export interface SignatureData {
  client_name: string;
  company: string;
  title: string;
  date: string;
  email: string;
  signature_data_url: string;
  signed_at: string;
}

export interface ClientEstimate {
  id: string;
  slug: string;
  access_code: string;
  client_name: string;
  project_name: string;
  project_title: string;
  project_description: string;
  currency: "€" | "$CAD";
  total_amount: string;
  delivery_days: string;
  marketing_included: boolean;
  // Nullable: the DB column allows null (existing rows predate this field,
  // and the FK is `on delete set null`). Required-ness is enforced only at
  // save time, by the admin form's `required` select + the Zod schema in
  // saveEstimateAction — not by this type, which must stay honest about what
  // an already-loaded row can actually contain.
  closer_id: string | null;
  features: EstimateFeatureItem[];
  investments: EstimateInvestmentItem[];
  payment_schedule_type: "monthly" | "installments";
  payment_months: number;
  payment_installments: EstimateInstallmentItem[];
  signature: SignatureData | null;
  locked: boolean;
  pdf_email_sent_at: string | null;
  created_at?: string;
  updated_at?: string;
}

/**
 * The devis document UI (AccueilCinematic, DevisDocument, etc.) is a "use
 * client" tree — anything passed into it as a prop is serialized into the
 * page's RSC payload and shipped to the browser, unlocked or not (the gate is
 * enforced upstream of this, in layout.tsx/page.tsx, before these components
 * are ever reached). None of them display access_code; redact it before
 * handing an estimate down so the real value never leaves the server.
 */
export function redactAccessCode(estimate: ClientEstimate): ClientEstimate {
  return { ...estimate, access_code: "" };
}

export const DEFAULT_ESTIMATE: Omit<ClientEstimate, "id"> = {
  slug: "client",
  access_code: "",
  client_name: "",
  closer_id: null,
  project_name: "Trajeo (nom de travail)",
  project_title: "plateforme de mobilité à la demande",
  project_description:
    "Application mobile de mise en relation entre passagers et chauffeurs : réservation de trajets, géolocalisation et suivi de course en temps réel, estimation de prix, profils vérifiés et notation mutuelle — plus back-office, landing page, API, infrastructure cloud et accompagnement marketing premium jusqu’à la mise en marché. Un prix fixe, une équipe senior, votre propriété à 100 %.",
  currency: "€",
  total_amount: "5 600",
  delivery_days: "90",
  marketing_included: true,
  features: [
    // Category: dev
    {
      id: "f1",
      category: "dev",
      labelStrong: "Application mobile iOS & Android",
      label: " design sur mesure",
      included: true,
    },
    {
      id: "f2",
      category: "dev",
      labelStrong: "Fonctionnalité 1",
      label: "",
      included: true,
    },
    {
      id: "f3",
      category: "dev",
      labelStrong: "Fonctionnalité 2",
      label: "",
      included: true,
    },
    {
      id: "f4",
      category: "dev",
      labelStrong: "Fonctionnalité 3",
      label: "",
      included: true,
    },
    {
      id: "f5",
      category: "dev",
      labelStrong: "Fonctionnalité 4",
      label: "",
      included: true,
    },
    {
      id: "f6",
      category: "dev",
      labelStrong: "Fonctionnalité 5",
      label: "",
      included: true,
    },
    {
      id: "f7",
      category: "dev",
      labelStrong: "Back-office d’administration",
      label: " incluant statistiques des données de l’application",
      included: true,
    },
    {
      id: "f8",
      category: "dev",
      labelStrong: "Landing page",
      label: " de présentation, optimisée acquisition",
      included: true,
    },
    {
      id: "f9",
      category: "dev",
      labelStrong: "3 révisions de maquettes",
      label: " incluses dans le forfait",
      included: true,
    },
    // Category: api
    {
      id: "f10",
      category: "api",
      labelStrong: "API & base de données",
      label: " dédiées à la plateforme",
      included: true,
    },
    {
      id: "f11",
      category: "api",
      labelStrong: "Infrastructure cloud scalable & intégrations",
      label: " selon la charge",
      included: true,
    },
    {
      id: "f12",
      category: "api",
      labelStrong: "Monétisation",
      label: " par commission ou abonnement (modèle retenu avec le Client)",
      included: true,
    },
    {
      id: "f13",
      category: "api",
      labelStrong: "Publication Appstore & Playstore",
      label: " phase de production - 60j incluse",
      included: true,
    },
    // Category: marketing
    {
      id: "f14",
      category: "marketing",
      labelStrong: "Marketing premium clé en main",
      label: " : stratégie, UGC, créatifs, campagnes gérées de A à Z",
      included: true,
    },
    {
      id: "f15",
      category: "marketing",
      labelStrong: "Gestion Meta Ads, Google Ads & Apple Search Ads",
      label: " — optimisation quotidienne",
      included: true,
    },
    {
      id: "f16",
      category: "marketing",
      labelStrong: "Analyse des KPIs, réunion hebdomadaire",
      label: " & reporting continu",
      included: true,
    },
    {
      id: "f17",
      category: "marketing",
      labelStrong: "Support technique",
      label: " + documentation technique complète",
      included: true,
    },
  ],
  investments: [
    {
      id: "inv1",
      labelStrong: "Application mobile iOS + Android",
      label: " (design sur mesure)",
      amount: "1 700 €",
    },
    {
      id: "inv2",
      label: "Back-office d’administration & gestion des courses",
      amount: "650 €",
    },
    { id: "inv3", label: "API & base de données", amount: "600 €" },
    {
      id: "inv4",
      label: "Infrastructure cloud scalable & intégrations",
      amount: "550 €",
    },
    { id: "inv5", label: "Landing page de présentation", amount: "250 €" },
    {
      id: "inv6",
      label: "Déploiement & phase de production stores (30 j, reviews, test Google Play)",
      amount: "500 €",
    },
    {
      id: "inv7",
      label: "Accompagnement marketing premium (clé en main, campagnes gérées)",
      amount: "900 €",
    },
    {
      id: "inv8",
      label: "Documentation, maintenance & support",
      amount: "450 €",
    },
  ],
  payment_schedule_type: "monthly",
  payment_months: 6,
  payment_installments: [
    { label: "Acompte à la signature", percentage: 30, amount: "1 680 €" },
    { label: "Livraison technique", percentage: 50, amount: "2 800 €" },
    { label: "Publication sur les stores", percentage: 20, amount: "1 120 €" },
  ],
  signature: null,
  locked: false,
  pdf_email_sent_at: null,
};
