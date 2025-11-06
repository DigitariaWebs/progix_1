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
    longTitle:
      "Théâtre du Rideau Vert - L'excellence théâtrale au cœur de Montréal",
    longDescription: [
      "Fondé en 1948, le Théâtre du Rideau Vert est le plus ancien théâtre professionnel francophone encore actif au Canada et un pilier de la culture montréalaise sur l'avenue Saint‑Denis.",
      "Programmation éclectique, création d'ici et expérience accessible: notre mandat a été de concevoir une vitrine moderne, claire et fidèle à son identité.",
    ],
    bgClass: 'bg-white',
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
    preview:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/imagescursorfollowup/logofruitexotic.avif',
    video: '/fruitexo.mp4',
    bgClass: 'bg-white',
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
    bgClass: 'bg-white',
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
    bgClass: 'bg-white',
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
    longTitle: 'CoRide - Transport urbain intelligent',
    longDescription: [
      'CoRide révolutionne le transport urbain avec une application mobile et un site web complets offrant des services de transport privé, livraison et bien plus.',
      "L'application utilise React Native pour une expérience mobile fluide, avec un backend robuste basé sur Node.js et une architecture moderne assurant fluidité et évolutivité.",
    ],
    bgClass: 'bg-white',
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
    longTitle: "CCAP Productions - Créateurs d'expériences",
    longDescription: [
      "CCAP Productions est un studio de production audiovisuelle établi à Québec, spécialisé dans la création d'expériences visuelles percutantes depuis plus de 15 ans.",
      "Ils offrent une gamme complète de services incluant l'idéation, la préproduction, la production, la postproduction et la diffusion pour divers secteurs : publicité, corporatif, événements, vidéoclips et projets éducatifs.",
    ],
    bgClass: 'bg-white',
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
    image:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/portfoliominiature/QueenDeQ.png',
    preview:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/portfoliominiature/QueenDeQ.png',
    video:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/portfoliominiature/QueenDeQ.mp4',
    longTitle: 'QueenDeQ - Thérapie digitale pour femmes',
    longDescription: [
      "QueenDeQ est une solution thérapeutique digitale complète composée d'un site web informatif et d'une plateforme interactive utilisant l'IA.",
      "La plateforme propose trois chatbots spécialisés : un pour analyser le type de partenaire, un pour comprendre le profil de l'utilisateur, et un espace sécurisant pour les conversations libres.",
    ],
    bgClass: 'bg-white',
  },
];

export { type Project, projects };
