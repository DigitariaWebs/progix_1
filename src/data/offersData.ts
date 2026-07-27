export const offersTheme = {
  ink: '#0E2233',
  steel: '#1A3A52',
  paper: '#EFEAE0',
  cyan: '#00D4FF',
  // Same accent, darkened for light backgrounds. `cyan` is 1.77:1 on white —
  // below even the 3:1 non-text floor — so it must never carry text there.
  cyanInk: '#00708C',
  loss: '#E4572E',
  // 5.56:1 on white, 5.23:1 on #f7f8f9 — the 11px labels need it.
  muted: '#5C6A76',
} as const;

export const MONO = "'DM Mono', ui-monospace, SFMono-Regular, monospace";
export const DISPLAY = "'Hubot Sans', Inter, sans-serif";

/** Average commission rate charged by delivery marketplaces, in percent. */
export const PLATFORM_RATE_PCT = 29;

// Sized for an independent Québec restaurant: most do somewhere between a few
// thousand and ~30 k$ a month through the marketplaces, so the range covers the
// realistic band instead of running to figures only a chain would recognise.
export const DEFAULT_MONTHLY_SALES = 10000;
export const MIN_MONTHLY_SALES = 2000;
export const MAX_MONTHLY_SALES = 40000;
export const SALES_STEP = 500;

export const hero = {
  eyebrow: 'Offre restaurants · Montréal',
  title: 'Vos livraisons paient',
  titleAccent: 'les plateformes.',
  body:
    "Uber Eats, DoorDash et SkipTheDishes retiennent jusqu'à 30 % de chaque commande. Votre propre application les remplace — et vous gardez la marge.",
  ctaPrimary: 'Recevoir une proposition',
  ctaSecondary: 'Voir ce qui est inclus',
  sliderLabel: 'Vos ventes en livraison par mois',
  rateNote:
    'Taux de 29 % — moyenne des places de marché au Canada (25 à 30 % selon le forfait).',
  chips: ['4 à 6 semaines', 'Vous en êtes propriétaire', 'Montréal'],
  scrollCue: 'Faites défiler',
};

export const receipt = {
  header: 'Simulation',
  storeLine: 'PROGIX · COMMISSIONS',
  monthlyTag: 'Par mois',
  rowSales: 'Vos ventes en livraison',
  rowRate: `Ce que la plateforme garde (${PLATFORM_RATE_PCT} %)`,
  yearlyTag: 'Sur une année',
  rowYear: 'Ce que la plateforme garde',
  note: 'Hors frais de traitement de carte, dus quel que soit le canal de vente.',
};

export const benchmark = {
  eyebrow: 'Déjà passés à leur propre app',
  title: 'Les chaînes ont arrêté de payer des commissions.',
  body:
    "The Burger's Priest, Raising Cane's, Greene King, PattySlaps : chacune a publié son application de commande. Même logique, même technologie. La seule différence, c'est le budget d'agence — et c'est exactement ce qu'on a réglé.",
  // `alt` lives here rather than being templated in the component: it is what the
  // tile renders if an image ever fails to load.
  apps: [
    {
      name: "The Burger's Priest",
      image: '/images/offers/burgers-priest.webp',
      alt: "Fiche App Store de l'application The Burger's Priest",
    },
    {
      name: "Raising Cane's",
      image: '/images/offers/raising-canes.webp',
      alt: "Fiche App Store de l'application Raising Cane's",
    },
    {
      name: 'Greene King',
      image: '/images/offers/greene-king.webp',
      alt: "Fiche App Store de l'application Greene King Pubs & Restaurants",
    },
    {
      name: 'PattySlaps',
      image: '/images/offers/pattyslaps.webp',
      alt: "Fiche App Store de l'application PattySlaps",
    },
  ],
};

export const appSpec = {
  eyebrow: 'Ce que vos clients installent',
  title: 'Votre enseigne, votre application, vos règles.',
  // `icon` names a lucide-react export, resolved in AppSpecSection.
  features: [
    {
      icon: 'UtensilsCrossed',
      label: 'Menu et commande',
      body:
        'Menu complet avec options, extras et allergènes. Commande pour emporter ou en livraison, prête quand le client arrive.',
    },
    {
      icon: 'CreditCard',
      label: 'Paiement intégré',
      body:
        "Carte, Apple Pay et Google Pay. L'argent arrive sur votre compte, sans intermédiaire qui prélève au passage.",
    },
    {
      icon: 'UserRound',
      label: 'Compte client',
      body:
        'Historique des commandes et adresses enregistrées : un habitué recommande en deux touches.',
    },
    {
      icon: 'Store',
      label: 'Marque blanche',
      body:
        "Vos couleurs, votre logo, votre nom sur l'App Store et Google Play. Aucune mention d'agence.",
    },
  ],
};

export const dashboard = {
  eyebrow: 'Le back-office',
  title: 'Chaque commande, chaque plat, chaque dollar au même endroit.',
  caption:
    "Aperçus d'interface — maquettes. Le back-office est adapté à votre menu et à vos opérations.",
  // `imageSide` alternates so the eye zigzags down the section instead of
  // running past two identical rows.
  blocks: [
    {
      imageSide: 'left' as const,
      title: 'Le service, en direct',
      body:
        "Chaque commande arrive avec son statut et son temps de préparation. Le menu, les prix et les disponibilités se changent en une minute — sans nous appeler.",
      bullets: [
        'Commandes en direct, avec statut et temps de préparation',
        'Menu, prix et disponibilité modifiables vous-même',
      ],
      shot: {
        src: '/images/offers/dashboard-tst-food.webp',
        alt: 'Vue de la gestion du menu et de la prise de commande',
      },
    },
    {
      imageSide: 'right' as const,
      title: 'Vos chiffres, en clair',
      body:
        "Vous voyez d'où vient le chiffre d'affaires, plat par plat et canal par canal. Depuis le comptoir comme depuis votre téléphone.",
      bullets: [
        'Ventes par jour, par plat et par canal de vente',
        'Fiches clients et historique de commandes',
      ],
      shot: {
        src: '/images/offers/dashboard-reztro.webp',
        alt: 'Vue des ventes et des commandes du back-office',
      },
    },
  ],
};

export const inclusions = {
  eyebrow: "Inclus dans l'offre",
  title: 'Sept livrables. Un seul interlocuteur.',
  rows: [
    {
      code: 'APP',
      label: 'Application iOS et Android en marque blanche',
      detail: 'Une seule base de code, deux magasins, votre identité de A à Z.',
    },
    {
      code: 'CMD',
      label: 'Commande en ligne et paiement',
      detail: 'Emporter et livraison, paiement par carte et portefeuilles mobiles.',
    },
    {
      code: 'ADM',
      label: 'Back-office de gestion',
      detail: 'Commandes, menu, prix, disponibilité et statistiques de vente.',
    },
    {
      code: 'PUB',
      label: 'Publication App Store et Google Play',
      detail: 'Comptes développeurs, fiches, visuels, soumission et corrections de révision.',
    },
    {
      code: 'POS',
      label: 'Intégrations caisse et livraison',
      detail: 'Raccordement à votre système de caisse ou à vos partenaires de livraison existants.',
    },
    {
      code: 'WEB',
      label: 'Site de commande et référencement local',
      detail: 'Version web de la commande, fiche Google et bases du SEO local.',
    },
    {
      code: 'OPS',
      label: 'Hébergement, maintenance et support',
      detail: 'Mises à jour, correctifs, surveillance et ligne de support directe.',
    },
  ],
};

// Named `processSteps`, not `process` — a module-scope `process` would shadow the
// Node global in every file that imports it.
export const processSteps = {
  eyebrow: 'Du premier appel à la mise en ligne',
  title: '4 à 6 semaines.',
  phases: [
    {
      when: 'Semaine 1',
      label: 'Cadrage',
      body: 'On relève votre menu, vos canaux de vente et votre caisse. Vous validez le périmètre.',
    },
    {
      when: 'Semaines 1–2',
      label: 'Design',
      body: "Maquettes de l'application à vos couleurs. Vous voyez les écrans avant la première ligne de code.",
    },
    {
      when: 'Semaines 2–5',
      label: 'Développement',
      body: 'Application, paiement, back-office et intégrations. Démo fonctionnelle chaque semaine.',
    },
    {
      when: 'Semaines 5–6',
      label: 'Publication',
      body: 'Soumission aux magasins, formation de votre équipe, mise en ligne.',
    },
  ],
};

export const faq = {
  eyebrow: 'Questions fréquentes',
  title: 'Ce que les restaurateurs nous demandent.',
  items: [
    {
      q: 'Combien ça coûte ?',
      a: "Le prix dépend de votre menu, de vos intégrations et du nombre d'établissements. On vous envoie une proposition chiffrée après un appel de 20 minutes. Pas de forfait générique.",
    },
    {
      q: 'Est-ce que je dois quitter Uber Eats ou DoorDash ?',
      a: 'Non. Gardez les plateformes pour la découverte et poussez vos habitués vers votre application. Chaque commande déplacée est une commission de moins.',
    },
    {
      q: "Qui est propriétaire de l'application ?",
      a: 'Vous. Le code, les comptes développeurs et les données clients sont à votre nom.',
    },
    {
      q: "Et si j'ai plusieurs établissements ?",
      a: "L'application gère plusieurs adresses, menus et horaires. Le back-office donne une vue par établissement et une vue consolidée.",
    },
    {
      q: 'Ça fonctionne avec ma caisse ?',
      a: "On se raccorde aux systèmes qui exposent une API, comme Square, Lightspeed ou Clover. Sinon, le back-office sert de tableau de commandes autonome.",
    },
    {
      q: 'Combien de temps avant la mise en ligne ?',
      a: '4 à 6 semaines entre le cadrage et la publication, si le menu et les visuels sont prêts.',
    },
  ],
};

export const leadForm = {
  eyebrow: 'Prochaine étape',
  title: 'Recevoir une proposition',
  body: "Un appel de 20 minutes, puis une proposition chiffrée. Aucun engagement.",
  submit: 'Envoyer ma demande',
  sending: 'Envoi en cours…',
  success: 'Demande reçue. On vous rappelle sous 24 heures ouvrables.',
  errorGeneric: "L'envoi a échoué. Réessayez ou écrivez à contact@progix.pro.",
  errorRequired: 'Ce champ est obligatoire.',
  errorEmail: 'Entrez un courriel valide, par exemple nom@restaurant.com.',
  errorSelect: 'Choisissez une option.',
  fields: {
    name: 'Votre nom',
    restaurant: 'Nom du restaurant',
    city: 'Ville',
    locations: "Nombre d'établissements",
    monthlySales: 'Ventes en livraison par mois',
    phone: 'Téléphone',
    email: 'Courriel',
    message: 'Précisions (facultatif)',
  },
  locationOptions: [
    { value: '1', label: '1 établissement' },
    { value: '2-5', label: '2 à 5' },
    { value: '6-20', label: '6 à 20' },
    { value: '20+', label: 'Plus de 20' },
  ],
  salesOptions: [
    { value: '<5k', label: 'Moins de 5 000 $' },
    { value: '5k-15k', label: '5 000 $ à 15 000 $' },
    { value: '15k-40k', label: '15 000 $ à 40 000 $' },
    { value: '40k+', label: 'Plus de 40 000 $' },
    { value: 'none', label: 'Pas encore de livraison' },
  ],
};

export const stickyCta = {
  label: 'Commissions : 29 % de vos livraisons',
  button: 'Recevoir une proposition',
};
