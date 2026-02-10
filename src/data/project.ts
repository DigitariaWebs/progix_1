type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  services: string[];
  tech: string[];
  image: string;
  preview?: string;
  longTitle?: string;
  longDescription?: string[];
  video?: string;
  bgClass?: string;
  website?: string;
  gallery?: string[];
  mobile: boolean;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'Rideau Vert',
    category: 'Culture',
    description:
      "Théâtre du Rideau Vert – L'excellence théâtrale au cœur de Montréal.",
    services: ['Site vitrine', 'Design UI/UX'],
    tech: ['Next.js', 'Tailwind CSS'],
    image:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/portfoliominiature/hovertheatre.png',
    preview:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/imagescursorfollowup/theatrerideauvertfondblanc.png',
    video: '/rideauVERT.mp4',
    longTitle: 'Théâtre Rideau Vert',
    longDescription: [
      'Fondé en 1948, le Théâtre du Rideau Vert est le plus ancien théâtre professionnel francophone actif au Canada, pilier de la culture montréalaise.',
      'Notre mandat : concevoir une vitrine moderne et fidèle à son identité, avec une programmation éclectique et accessible.',
    ],
    bgClass: 'bg-white',
    website: 'https://rideauvert.qc.ca',
    gallery: [
      '/images/rideau1.png',
      '/images/rideau2.png',
      '/images/rideau3.png',
      '/images/rideau4.png',
    ],
    mobile: false,
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
      preview: '/labo/fruits/1.png',
      video: '/labo/fruits/fruit.mp4',
      bgClass: 'bg-white',
      website: 'https://fruitexotic.com',
      gallery: [
        '/labo/fruits/1.png',
        '/labo/fruits/2.png',
        '/labo/fruits/3.png',
        '/labo/fruits/4.png',
      ],
      mobile: false,
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
    preview:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/imagescursorfollowup/mondev-logo-black (1).svg',
      video: '/labo/mondev/recording-2026-02-10-18-58-56.mp4',
      bgClass: 'bg-white',
      gallery: [
        '/labo/mondev/1.png',
        '/labo/mondev/2.png',
        '/labo/mondev/3.png',
        '/labo/mondev/4.png',
      ],
      mobile: false,
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
    preview: '/images/imranarshad/recplkus.png',
      video: '/labo/recrute/recording-2026-02-10-19-11-31.mp4',
    bgClass: 'bg-white',
      gallery: [
        '/images/imranarshad/recplkus.png',
        '/labo/recrute/1.png',
        '/labo/recrute/2.png',
        '/labo/recrute/3.png',
      ],
    mobile: false,
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
    preview:
      '/images/imranarshad/Cas C – Aucun profil existant (1re utilisation) - À propos de votre enfant.svg',
    bgClass: 'bg-white',
    gallery: [
      '/labo/davinci/Cas B - Plusieurs profils enfants.png',
      '/labo/davinci/Dashboard Enfant – Mon Espace - Scroll.png',
      '/labo/davinci/Mathématiques.png',
    ],
    mobile: true,
  },
  {
    id: 6,
    title: 'CoRide',
    category: 'Transport',
    description:
      'Application de transport urbain similaire à Uber, avec application mobile et site web pour la réservation de courses.',
    services: [
      'Application Mobile',
      'Site Web',
      'Système de réservation',
      'Backend',
    ],
    tech: ['React Native', 'Next.js', 'Node.js', 'MongoDB', 'Socket.io'],
    image:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/portfoliominiature/CoRide.png',
    preview:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/portfoliominiature/CoRide.png',
    video:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/Projects/CoRide/CoRideVideo.mp4',
    longTitle: 'CoRide',
    longDescription: [
      'CoRide révolutionne le transport urbain avec une application mobile et un site web complets offrant des services de transport privé, livraison et bien plus.',
      "L'application utilise React Native pour une expérience mobile fluide, avec un backend robuste basé sur Node.js et une architecture moderne assurant fluidité et évolutivité.",
    ],
    bgClass: 'bg-white',
    gallery: [
      '/labo/coride/Splash screen.png',
      '/labo/coride/Splash screen (1).png',
      '/labo/coride/Splash screen (2).png',
    ],
    mobile: true,
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
    preview: '/images/imranarshad/secup.png',
    bgClass: 'bg-white',
      gallery: [
        '/images/imranarshad/secup.png',
        '/labo/socupe/1.png',
        '/labo/socupe/2.png',
      ],
    mobile: true,
  },
  {
    id: 8,
    title: 'CCAP Productions',
    category: 'Audiovisuel',
    description:
      "Studio de production audiovisuelle créateur d'expériences, spécialisé dans la publicité, le corporatif et les projets sur mesure.",
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
    preview:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/portfoliominiature/CCAPProductions.png',
    video:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/portfoliominiature/CCAPProductions.mp4',
    longTitle: 'CCAP Productions',
    longDescription: [
      "CCAP Productions est un studio de production audiovisuelle établi à Québec, spécialisé dans la création d'expériences visuelles percutantes depuis plus de 15 ans.",
      "Ils offrent une gamme complète de services incluant l'idéation, la préproduction, la production, la postproduction et la diffusion pour divers secteurs : publicité, corporatif, événements, vidéoclips et projets éducatifs.",
    ],
    bgClass: 'bg-white',
      gallery: [
        '/labo/cca_productions/1.png',
        '/labo/cca_productions/2.png',
        '/labo/cca_productions/3.png',
        'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/portfoliominiature/CCAPProductions.png',
      ],
    mobile: false,
  },
  {
    id: 9,
    title: 'QueenDeQ',
    category: 'Bien-être',
    description:
      "Solution thérapeutique digitale composée d'un site web et d'une plateforme interactive utilisant l'IA pour aider les femmes.",
    services: [
      'Site Web',
      'Plateforme Interactive',
      'IA conversationnelle',
      'Thérapie digitale',
    ],
    tech: ['React', 'Express', 'MongoDB', 'Auth0', 'Stripe', 'OpenAI API'],
      image: '/images/logo-gold.png',
    preview:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/portfoliominiature/QueenDeQ.png',
    video:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/portfoliominiature/QueenDeQ.mp4',
    longTitle: 'QueenDeQ',
    longDescription: [
      "QueenDeQ est une solution thérapeutique digitale complète composée d'un site web informatif et d'une plateforme interactive utilisant l'IA.",
      "La plateforme propose trois chatbots spécialisés : un pour analyser le type de partenaire, un pour comprendre le profil de l'utilisateur, et un espace sécurisant pour les conversations libres.",
    ],
    bgClass: 'bg-white',
    gallery: [
      '/images/queen1.png',
      '/images/queen2.png',
      '/images/queen3.png',
      '/images/queen4.png',
    ],
    mobile: false,
  },
  {
    id: 10,
    title: 'iBox',
    category: 'Gestion d\'entreprise',
    description:
      "iBox est une plateforme innovante de gestion et d'automatisation pour les entreprises modernes.",
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
    preview: '/labo/ibox/IMG_1835.PNG',
    longTitle: 'iBox - Solution de gestion intelligente',
    longDescription: [
      "iBox est une plateforme innovante de gestion et d'automatisation pour les entreprises modernes.",
      "Nous avons réalisé le design et développé l'application avec un focus sur l'expérience utilisateur et les fonctionnalités avancées de gestion d'entreprise.",
    ],
    bgClass: 'bg-white',
    gallery: [
      '/labo/ibox/IMG_1835.PNG',
      '/labo/ibox/IMG_1838.PNG',
      '/labo/ibox/IMG_1840.PNG',
    ],
    mobile: true,
  },
  {
    id: 11,
    title: 'GoSholo',
    category: 'E-commerce',
    description:
      'GoSholo transforme le shopping en ligne avec une expérience immersive en réalité augmentée.',
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
    preview: '/labo/gosholo/image copy.png',
    longTitle: 'GoSholo - Shopping révolutionnaire',
    longDescription: [
      'GoSholo transforme le shopping en ligne avec une expérience immersive en réalité augmentée.',
      "L'application mobile utilise les dernières technologies AR pour offrir un essayage virtuel et une expérience d'achat unique.",
    ],
    bgClass: 'bg-white',
    gallery: [
      '/labo/gosholo/image.png',
      '/labo/gosholo/image copy.png',
      '/labo/gosholo/image copy 2.png',
    ],
    mobile: true,
  },
  {
    id: 12,
    title: 'MS CORE',
    category: 'Technologie',
    description: "Des solutions technologiques pour votre croissance. Nous accompagnons les organisations dans la sécurisation, la modernisation et l'optimisation de leurs environnements numériques grâce au cloud, à la cybersécurité et à l'intelligence artificielle.",
    services: ['Site vitrine', 'Design UI/UX', 'Vidéo'],
    tech: ['Next.js', 'React', 'Tailwind CSS'],
    image: '/labo/MS CORE/1.png',
    preview: '/labo/MS CORE/1.png',
    video: '/labo/MS CORE/recording-2026-02-10-18-11-14.mp4',
    longTitle: 'MS CORE',
    longDescription: [
      'Des solutions technologiques pour votre croissance. Nous accompagnons les organisations dans la sécurisation, la modernisation et l\'optimisation de leurs environnements numériques grâce au cloud, à la cybersécurité et à l\'intelligence artificielle',
    ],
    bgClass: 'bg-white',
    website: 'https://www.techmscore.com/',
    gallery: [
      '/labo/MS CORE/1.png',
      '/labo/MS CORE/2.png',
      '/labo/MS CORE/3.png',
      '/labo/MS CORE/4.png',
    ],
    mobile: false,
  },
];

export { type Project, projects };
