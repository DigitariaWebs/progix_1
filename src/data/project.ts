type Project = {
  // identity / copy
  id: number;
  title: string;
  category: string;
  description: string;
  longTitle?: string;
  longDescription?: string[];

  // shared presentation
  image: string;
  bgClass?: string;
  services: string[];
  tech: string[];

  // web platform
  webUrl?: string;
  webPreview?: string;
  webGallery?: string[];
  webVideo?: string;

  // mobile platform
  mobileAppStoreUrl?: string;
  mobilePlayStoreUrl?: string;
  mobilePreview?: string;
  mobileGallery?: string[];
  mobileVideo?: string;
};

function hasWeb(p: Project): boolean {
  return !!(
    p.webUrl ||
    (p.webGallery && p.webGallery.length > 0) ||
    p.webVideo ||
    p.webPreview
  );
}

function hasMobile(p: Project): boolean {
  return !!(
    p.mobileAppStoreUrl ||
    p.mobilePlayStoreUrl ||
    (p.mobileGallery && p.mobileGallery.length > 0) ||
    p.mobileVideo ||
    p.mobilePreview
  );
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Rideau Vert',
    category: 'Culture',
    description:
      "Théâtre du Rideau Vert – L'excellence théâtrale au cœur de Montréal.",
    longTitle: 'Théâtre Rideau Vert',
    longDescription: [
      'Fondé en 1948, le Théâtre du Rideau Vert est le plus ancien théâtre professionnel francophone actif au Canada, pilier de la culture montréalaise.',
      'Notre mandat : concevoir une vitrine moderne et fidèle à son identité, avec une programmation éclectique et accessible.',
    ],
    services: ['Site vitrine', 'Design UI/UX'],
    tech: ['Next.js', 'Tailwind CSS'],
    image:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/portfoliominiature/hovertheatre.png',
    bgClass: 'bg-white',
    webUrl: 'https://rideauvert.qc.ca',
    webPreview:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/imagescursorfollowup/theatrerideauvertfondblanc.png',
    webVideo: '/rideauVERT.mp4',
    webGallery: [
      '/images/rideau1.png',
      '/images/rideau2.png',
      '/images/rideau3.png',
      '/images/rideau4.png',
    ],
  },
  {
    id: 2,
    title: 'Fruit Exotic Inc.',
    category: 'Agroalimentaire',
    description:
      "Vitrine internationale multilingue pour un acteur majeur de l'import de fruits exotiques.",
    services: ['Site vitrine', 'Internationalisation (7 langues)'],
    tech: ['Next.js', 'Tailwind CSS'],
    image:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/portfoliominiature/hovertheatre.png',
    bgClass: 'bg-white',
    webUrl: 'https://fruitexotic.com',
    webPreview: '/labo/fruits/1.png',
    webVideo: '/labo/fruits/fruit.mp4',
    webGallery: [
      '/labo/fruits/1.png',
      '/labo/fruits/2.png',
      '/labo/fruits/3.png',
      '/labo/fruits/4.png',
    ],
  },
  {
    id: 3,
    title: 'MONDEV',
    category: 'Site vitrine',
    description:
      'Vitrine web pour promoteur immobilier montréalais, axée sur la clarté des offres et la conversion.',
    services: ['Site vitrine', 'Performance & SEO'],
    tech: ['Next.js', 'Tailwind CSS'],
    image:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/imagescursorfollowup/Header_rentals_1900x500.jpg',
    bgClass: 'bg-white',
    webPreview:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/imagescursorfollowup/mondev-logo-black (1).svg',
    webVideo: '/labo/mondev/recording-2026-02-10-18-58-56.mp4',
    webGallery: [
      '/labo/mondev/1.png',
      '/labo/mondev/2.png',
      '/labo/mondev/3.png',
      '/labo/mondev/4.png',
    ],
  },
  {
    id: 4,
    title: 'RecrutementPlus',
    category: 'Recrutement',
    description:
      'Plateforme de gestion RH complète pour agence de recrutement spécialisée.',
    services: ['Développement Web', 'CRM personnalisé'],
    tech: ['Next.js', 'PostgreSQL', 'Node.js'],
    image: '/images/imranarshad/recplkus.png',
    bgClass: 'bg-white',
    webPreview: '/images/imranarshad/recplkus.png',
    webVideo: '/labo/recrute/recording-2026-02-10-19-11-31.mp4',
    webGallery: [
      '/images/imranarshad/recplkus.png',
      '/labo/recrute/1.png',
      '/labo/recrute/2.png',
      '/labo/recrute/3.png',
    ],
  },
  {
    id: 5,
    title: 'DaVinci',
    category: 'Éducation',
    description:
      "Plateforme d'apprentissage en ligne interactive avec suivi personnalisé.",
    services: ['E-learning', 'Design UX/UI'],
    tech: ['Next.js', 'MongoDB', 'Tailwind CSS'],
    image:
      '/images/imranarshad/Cas C – Aucun profil existant (1re utilisation) - À propos de votre enfant.svg',
    bgClass: 'bg-white',
    mobilePreview:
      '/images/imranarshad/Cas C – Aucun profil existant (1re utilisation) - À propos de votre enfant.svg',
    mobileGallery: [
      '/labo/davinci/Cas B - Plusieurs profils enfants.png',
      '/labo/davinci/Dashboard Enfant – Mon Espace - Scroll.png',
      '/labo/davinci/Mathématiques.png',
    ],
  },
  {
    id: 6,
    title: 'CoRide',
    category: 'Transport',
    description:
      'Application de transport urbain similaire à Uber, avec application mobile et site web pour la réservation de courses.',
    longTitle: 'CoRide',
    longDescription: [
      'CoRide révolutionne le transport urbain avec une application mobile et un site web complets offrant des services de transport privé, livraison et bien plus.',
      "L'application utilise React Native pour une expérience mobile fluide, avec un backend robuste basé sur Node.js et une architecture moderne assurant fluidité et évolutivité.",
    ],
    services: [
      'Application Mobile',
      'Site Web',
      'Système de réservation',
      'Backend',
    ],
    tech: ['React Native', 'Next.js', 'Node.js', 'MongoDB', 'Socket.io'],
    image:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/portfoliominiature/CoRide.png',
    bgClass: 'bg-white',
    mobilePreview:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/portfoliominiature/CoRide.png',
    mobileVideo:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/CoRide/CoRideVideo.mp4',
    mobileGallery: [
      '/labo/coride/Splash screen.png',
      '/labo/coride/Splash screen (1).png',
      '/labo/coride/Splash screen (2).png',
    ],
  },
  {
    id: 7,
    title: 'Secup',
    category: 'Livraison',
    description:
      'Application mobile de la DGPN Djibouti pour le scan des plaques d’immatriculation et l’identification des véhicules via la base de données nationale.',
    services: [
      'Application Mobile',
      'Système de livraison',
      'Paiement intégré',
    ],
    tech: ['React Native', 'Node.js', 'MongoDB', 'Stripe'],
    image: '/images/imranarshad/secup.png',
    bgClass: 'bg-white',
    mobilePreview: '/images/imranarshad/secup.png',
    mobileGallery: [
      '/images/imranarshad/secup.png',
      '/labo/socupe/1.png',
      '/labo/socupe/2.png',
    ],
  },
  {
    id: 8,
    title: 'CCAP Productions',
    category: 'Audiovisuel',
    description:
      "Studio de production audiovisuelle créateur d'expériences, spécialisé dans la publicité, le corporatif et les projets sur mesure.",
    longTitle: 'CCAP Productions',
    longDescription: [
      "CCAP Productions est un studio de production audiovisuelle établi à Québec, spécialisé dans la création d'expériences visuelles percutantes depuis plus de 15 ans.",
      "Ils offrent une gamme complète de services incluant l'idéation, la préproduction, la production, la postproduction et la diffusion pour divers secteurs : publicité, corporatif, événements, vidéoclips et projets éducatifs.",
    ],
    services: [
      'Production publicitaire',
      "Captation d'événements",
      'Vidéoclips',
      'Contenu corporatif',
      'Vidéos éducatives',
      'Projets sur mesure',
    ],
    tech: ['Next.js', 'React', 'Tailwind CSS'],
    image:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/portfoliominiature/CCAPProductions.png',
    bgClass: 'bg-white',
    webPreview:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/portfoliominiature/CCAPProductions.png',
    webVideo:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/portfoliominiature/CCAPProductions.mp4',
    webGallery: [
      '/labo/cca_productions/1.png',
      '/labo/cca_productions/2.png',
      '/labo/cca_productions/3.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/portfoliominiature/CCAPProductions.png',
    ],
  },
  {
    id: 9,
    title: 'QueenDeQ',
    category: 'Bien-être',
    description:
      "Solution thérapeutique digitale composée d'un site web et d'une plateforme interactive utilisant l'IA pour aider les femmes.",
    longTitle: 'QueenDeQ',
    longDescription: [
      "QueenDeQ est une solution thérapeutique digitale complète composée d'un site web informatif et d'une plateforme interactive utilisant l'IA.",
      "La plateforme propose trois chatbots spécialisés : un pour analyser le type de partenaire, un pour comprendre le profil de l'utilisateur, et un espace sécurisant pour les conversations libres.",
    ],
    services: [
      'Site Web',
      'Plateforme Interactive',
      'IA conversationnelle',
      'Thérapie digitale',
    ],
    tech: ['React', 'Express', 'MongoDB', 'Auth0', 'Stripe', 'OpenAI API'],
    image: '/images/logo-gold.png',
    bgClass: 'bg-white',
    webPreview:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/portfoliominiature/QueenDeQ.png',
    webVideo:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/portfoliominiature/QueenDeQ.mp4',
    webGallery: [
      '/images/queen1.png',
      '/images/queen2.png',
      '/images/queen3.png',
      '/images/queen4.png',
    ],
  },
  {
    id: 10,
    title: 'iBox',
    category: "Gestion d'entreprise",
    description:
      "iBox est une plateforme innovante de gestion et d'automatisation pour les entreprises modernes.",
    longTitle: 'iBox - Solution de gestion intelligente',
    longDescription: [
      "iBox est une plateforme innovante de gestion et d'automatisation pour les entreprises modernes.",
      "Nous avons réalisé le design et développé l'application avec un focus sur l'expérience utilisateur et les fonctionnalités avancées de gestion d'entreprise.",
    ],
    services: [
      'Tableau de bord centralisé',
      'Automatisation des processus',
      'Gestion des ressources optimisée',
      'Rapports en temps réel',
      'Intégrations multiples',
      'Interface utilisateur intuitive',
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    image: '/labo/ibox/IMG_1835.PNG',
    bgClass: 'bg-white',
    mobilePreview: '/labo/ibox/IMG_1835.PNG',
    mobileGallery: [
      '/labo/ibox/IMG_1835.PNG',
      '/labo/ibox/IMG_1838.PNG',
      '/labo/ibox/IMG_1840.PNG',
    ],
  },
  {
    id: 11,
    title: 'GoSholo',
    category: 'E-commerce',
    description:
      'GoSholo transforme le shopping en ligne avec une expérience immersive en réalité augmentée.',
    longTitle: 'GoSholo - Shopping révolutionnaire',
    longDescription: [
      'GoSholo transforme le shopping en ligne avec une expérience immersive en réalité augmentée.',
      "L'application mobile utilise les dernières technologies AR pour offrir un essayage virtuel et une expérience d'achat unique.",
    ],
    services: [
      'Essayage virtuel en AR',
      'Catalogue produits 3D',
      'Recommandations personnalisées',
      'Paiements sécurisés',
      'Suivi de commandes en temps réel',
      'Support client intégré',
    ],
    tech: ['React Native', 'ARCore/ARKit', 'Node.js', 'MongoDB'],
    image: '/labo/gosholo/image copy.png',
    bgClass: 'bg-white',
    mobilePreview: '/labo/gosholo/image copy.png',
    mobileGallery: [
      '/labo/gosholo/image.png',
      '/labo/gosholo/image copy.png',
      '/labo/gosholo/image copy 2.png',
    ],
  },
  {
    id: 12,
    title: 'Al-aqd',
    category: 'Rencontres',
    description:
      "Application mobile de rencontres halal pour la communauté musulmane — trouver l'âme sœur dans le respect des valeurs islamiques.",
    longTitle: 'Al-aqd — Rencontres halal',
    longDescription: [
      'Al-aqd est une application mobile de rencontres dédiée à la communauté musulmane, permettant à ses membres de se découvrir et de se connaître dans le respect des valeurs islamiques.',
      "Inspirée du modèle Tinder, l'application propose un système de matching intelligent tout en garantissant un cadre halal : profils vérifiés, intentions sérieuses et fonctionnalités adaptées aux besoins de la communauté.",
    ],
    services: ['Application Mobile', 'Design UI/UX', 'Backend'],
    tech: ['React Native', 'Node.js', 'MongoDB'],
    image: '/labo/Al-aqd/Al-aqd-mainview.jpeg',
    bgClass: 'bg-white',
    mobilePreview: '/labo/Al-aqd/Al-aqd-preview.jpeg',
    mobileGallery: [
      '/labo/Al-aqd/Al-aqd-mainview.jpeg',
      '/labo/Al-aqd/Al-aqd-profile.jpeg',
      '/labo/Al-aqd/Al-aqd-matchlist.jpeg',
      '/labo/Al-aqd/Al-aqd-matches.jpeg',
      '/labo/Al-aqd/Al-aqd-preview.jpeg',
    ],
  },
  {
    id: 13,
    title: 'MS CORE',
    category: 'Technologie',
    description:
      "Des solutions technologiques pour votre croissance. Nous accompagnons les organisations dans la sécurisation, la modernisation et l'optimisation de leurs environnements numériques grâce au cloud, à la cybersécurité et à l'intelligence artificielle.",
    longTitle: 'MS CORE',
    longDescription: [
      "Des solutions technologiques pour votre croissance. Nous accompagnons les organisations dans la sécurisation, la modernisation et l'optimisation de leurs environnements numériques grâce au cloud, à la cybersécurité et à l'intelligence artificielle",
    ],
    services: ['Site vitrine', 'Design UI/UX', 'Vidéo'],
    tech: ['Next.js', 'React', 'Tailwind CSS'],
    image: '/labo/MS CORE/1.png',
    bgClass: 'bg-white',
    webUrl: 'https://www.techmscore.com/',
    webPreview: '/labo/MS CORE/1.png',
    webVideo: '/labo/MS CORE/recording-2026-02-10-18-11-14.mp4',
    webGallery: [
      '/labo/MS CORE/1.png',
      '/labo/MS CORE/2.png',
      '/labo/MS CORE/3.png',
      '/labo/MS CORE/4.png',
    ],
  },
];

export { type Project, projects, hasWeb, hasMobile };
