type Project = {
  // identity / copy
  id: number;
  slug?: string;
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
    webVideo:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/RideauVert/rideauVERT.mp4',
    webGallery: [
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/RideauVert/rideau1.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/RideauVert/rideau2.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/RideauVert/rideau3.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/RideauVert/rideau4.png',
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
    webPreview:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/FruitExotic/1.png',
    webVideo:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/FruitExotic/fruit.mp4',
    webGallery: [
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/FruitExotic/1.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/FruitExotic/2.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/FruitExotic/3.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/FruitExotic/4.png',
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
    webVideo:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/MONDEV/recording-2026-02-10-18-58-56.mp4',
    webGallery: [
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/MONDEV/1.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/MONDEV/2.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/MONDEV/3.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/MONDEV/4.png',
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
    image:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/RecrutementPlus/recplkus.png',
    bgClass: 'bg-white',
    webPreview:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/RecrutementPlus/recplkus.png',
    webVideo:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/RecrutementPlus/recording-2026-02-10-19-11-31.mp4',
    webGallery: [
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/RecrutementPlus/recplkus.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/RecrutementPlus/1.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/RecrutementPlus/2.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/RecrutementPlus/3.png',
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
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/DaVinci/CasC-AucunProfilExistant.svg',
    bgClass: 'bg-white',
    mobilePreview:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/DaVinci/CasC-AucunProfilExistant.svg',
    mobileGallery: [
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/DaVinci/CasB-PlusieursProfilsEnfants.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/DaVinci/DashboardEnfant-MonEspaceScroll.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/DaVinci/Mathematiques.png',
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
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/CoRide/Splash%20screen.png',
    webPreview:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/CoRide/CoRideVideo.mp4',
    mobileGallery: [
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/CoRide/Splash%20screen.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/CoRide/Splash%20screen%20(1).png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/CoRide/Splash%20screen%20(2).png',
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
    image:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/Secup/secup.png',
    bgClass: 'bg-white',
    mobilePreview:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/Secup/secup.png',
    mobileGallery: [
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/Secup/secup.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/Secup/1.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/Secup/2.png',
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
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/CCAPProductions/1.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/CCAPProductions/2.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/CCAPProductions/3.png',
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
    image:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/QueenDeQ/logo-gold.png',
    bgClass: 'bg-white',
    webPreview:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/portfoliominiature/QueenDeQ.png',
    webVideo:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/portfoliominiature/QueenDeQ.mp4',
    webGallery: [
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/QueenDeQ/queen1.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/QueenDeQ/queen2.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/QueenDeQ/queen3.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/QueenDeQ/queen4.png',
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
    image:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/iBox/IMG_1835.PNG',
    bgClass: 'bg-white',
    mobilePreview:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/iBox/IMG_1835.PNG',
    mobileGallery: [
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/iBox/IMG_1835.PNG',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/iBox/IMG_1838.PNG',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/iBox/IMG_1840.PNG',
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
    image:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/GoSholo/image%20copy.png',
    bgClass: 'bg-white',
    mobilePreview:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/GoSholo/image%20copy.png',
    mobileGallery: [
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/GoSholo/image.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/GoSholo/image%20copy.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/GoSholo/image%20copy%202.png',
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
    image:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/Al-aqd/Al-aqd-mainview.jpeg',
    bgClass: 'bg-white',
    mobilePreview:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/Al-aqd/Al-aqd-preview.jpeg',
    mobileGallery: [
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/Al-aqd/Al-aqd-mainview.jpeg',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/Al-aqd/Al-aqd-profile.jpeg',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/Al-aqd/Al-aqd-matchlist.jpeg',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/Al-aqd/Al-aqd-matches.jpeg',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/Al-aqd/Al-aqd-preview.jpeg',
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
    image:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/MSCORE/1.png',
    bgClass: 'bg-white',
    webUrl: 'https://www.techmscore.com/',
    webPreview:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/MSCORE/1.png',
    webVideo:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/MSCORE/recording-2026-02-10-18-11-14.mp4',
    webGallery: [
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/MSCORE/1.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/MSCORE/2.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/MSCORE/3.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/MSCORE/4.png',
    ],
  },
  {
    id: 14,
    title: 'Breaking Family',
    category: 'Restauration',
    description:
      'Application mobile de restaurant : consultation du menu, commande de plats et livraison à domicile.',
    longTitle: 'Breaking Family',
    longDescription: [
      'Application mobile de restaurant qui permet aux clients de consulter le menu, commander des plats et se faire livrer à domicile.',
      "Deux types d'utilisateurs : Client (parcourt les catégories, consulte les détails de chaque plat, ajoute au panier, valide la commande) et Livreur (reçoit les commandes et assure la livraison).",
      'Objectif : faciliter la commande de nourriture et améliorer le service de livraison entre le restaurant et les clients.',
    ],
    services: [
      'Application Mobile',
      'Commande en ligne',
      'Livraison',
      'Design UI/UX',
    ],
    tech: ['Expo 54', 'React Native', 'Node.js'],
    image:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/BreakingFamily/breaking-family-home.jpeg',
    bgClass: 'bg-white',
    mobilePreview:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/BreakingFamily/breaking-family-home.jpeg',
    mobileVideo:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/BreakingFamily/breaking-family-demo.mp4',
    mobileGallery: [
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/BreakingFamily/breaking-family-onboarding.jpeg',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/BreakingFamily/breaking-family-signup.jpeg',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/BreakingFamily/breaking-family-home.jpeg',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/BreakingFamily/breaking-family-menu.jpeg',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/BreakingFamily/breaking-family-cart.jpeg',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/BreakingFamily/breaking-family-map.jpeg',
    ],
  },
  {
    id: 15,
    title: 'My Fleet',
    category: 'Location de voitures',
    description:
      'Plateforme de mise en relation entre agences de location de voitures et clients : recherche, réservation et suivi.',
    longTitle: 'My Fleet — Réservation & gestion de flotte',
    longDescription: [
      "Plateforme de mise en relation entre des agences de location de voitures et des clients. Permet aux utilisateurs de consulter les voitures disponibles, effectuer une réservation et suivre l'état de leur réservation.",
      "Deux types d'utilisateurs : Client (recherche des voitures, consulte leurs détails, réserve et suit la réservation) et Agence (ajoute des voitures, gère leur disponibilité et suit les réservations).",
      'Objectif : faciliter la réservation de voitures et améliorer la communication entre agences et clients.',
    ],
    services: [
      'Application Mobile',
      'Système de réservation',
      'Gestion de flotte',
      'Design UI/UX',
    ],
    tech: ['Expo 54', 'React Native', 'Node.js'],
    image:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/MyFleet/myfleet-homescreen.png',
    bgClass: 'bg-white',
    mobilePreview:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/MyFleet/myfleet-homescreen.png',
    mobileVideo:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/MyFleet/myfleet-demo.mp4',
    mobileGallery: [
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/MyFleet/myfleet-signup.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/MyFleet/myfleet-homescreen.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/MyFleet/myfleet-inspection.png',
    ],
  },
  {
    id: 16,
    title: 'Hand2Hand',
    category: 'Marketplace',
    description:
      'Marketplace mobile de mise en relation entre particuliers pour échanger biens et services.',
    services: [
      'Application Mobile',
      'Marketplace',
      'Messagerie',
      'Design UI/UX',
    ],
    tech: ['Swift', 'Kotlin', 'Node.js'],
    image:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/Hand2Hand/hand2hand-homepage.png',
    bgClass: 'bg-white',
    mobilePreview:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/Hand2Hand/hand2hand-homepage.png',
    mobileVideo:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/Hand2Hand/hand2hand-dem0.mp4',
    mobileGallery: [
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/Hand2Hand/hand2hand-onboarding.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/Hand2Hand/hand2hand-homepage.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/Hand2Hand/hand2hand-product.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/Hand2Hand/hand2hand-missions.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/Hand2Hand/hand2hand-messages.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/Hand2Hand/hand2hand-profile.png',
    ],
  },
  {
    id: 17,
    title: 'DriveAds',
    category: 'Publicité',
    description:
      'Application mobile de gestion de campagnes publicitaires diffusées sur véhicules.',
    services: [
      'Application Mobile',
      'Gestion de campagnes',
      'Tableau de bord',
      'Design UI/UX',
    ],
    tech: ['Swift', 'Kotlin', 'Node.js'],
    image:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/DriveAds/driveads-homescreen.png',
    bgClass: 'bg-white',
    mobilePreview:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/DriveAds/driveads-homescreen.png',
    mobileVideo:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/DriveAds/driveads-demo.mp4',
    mobileGallery: [
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/DriveAds/driveads-onboarding.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/DriveAds/driveads-login.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/DriveAds/driveads-homescreen.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/DriveAds/driveads-campaigns.png',
    ],
  },
  {
    id: 18,
    title: 'Pops',
    category: 'Restauration',
    description:
      'Application mobile restaurant-to-consumer : commandes, fidélisation et expérience client direct du restaurant.',
    services: [
      'Application Mobile',
      'Commande en ligne',
      'Fidélisation',
      'Design UI/UX',
    ],
    tech: ['Swift', 'Kotlin', 'Node.js'],
    image:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/Pops/pops-splash.png',
    bgClass: 'bg-white',
    mobilePreview:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/Pops/pops-splash.png',
    mobileVideo:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/Pops/pops-demo.mp4',
    mobileGallery: [
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/Pops/pops-splash.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/Pops/pops-onboarding.png',
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/Pops/pops-profile.png',
    ],
  },
];

export { type Project, projects, hasWeb, hasMobile };
