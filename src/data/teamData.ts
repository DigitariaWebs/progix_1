interface TeamMember {
  id: string;
  name: string;
  role: string;
  skills: string;
  image: string;
  linkedinUrl: string;
  description: string;
  experience: {
    title: string;
    company: string;
    period: string;
    location: string;
    description: string;
  }[];
  mainSkills: string[];
  education: {
    degree: string;
    institution: string;
    period?: string;
    details?: string;
  };
  methodologies?: {
    title: string;
    description: string;
  }[];
}

export const teamMembers: TeamMember[] = [
  {
    id: 'jean-boissoneault',
    name: 'Jean Boissoneault',
    role: 'Ingénieur logiciel',
    skills: 'TypeScript • React • Node.js',
    image:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images%20of%20the%20team/277803464_10158335867770248_3489003544783992666_n.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/boissonneaultjean/',
    description: "Membre de l'équipe PROGIX.",
    experience: [
      {
        title: 'Ingénieur logiciel',
        company: 'PROGIX',
        period: '2025 - Présent',
        location: 'Montréal, QC',
        description: 'Conception et développement de solutions logicielles.',
      },
    ],
    mainSkills: ['TypeScript', 'React', 'Node.js'],
    education: { degree: 'Études en informatique', institution: '—' },
  },
  {
    id: 'yann-bonzom',
    name: 'Yann Bonzom',
    role: 'Ingénieur logiciel',
    skills: 'TypeScript • React • Next.js',
    image:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images%20of%20the%20team/Screenshot%202025-10-16%20033128.png',
    linkedinUrl:
      'https://www.linkedin.com/in/yann-bonzom/?lipi=urn%3Ali%3Apage%3Ad_flagship3_people%3BKq283o4pQkuh%2Fmhml38A3A%3D%3D',
    description: "Membre de l'équipe PROGIX.",
    experience: [
      {
        title: 'Ingénieur logiciel',
        company: 'PROGIX',
        period: '2025 - Présent',
        location: 'Montréal, QC',
        description: 'Développement d’applications web modernes.',
      },
    ],
    mainSkills: ['TypeScript', 'React', 'Next.js'],
    education: { degree: 'Études en informatique', institution: '—' },
  },
  {
    id: 'ilyes',
    name: 'Ilyes Ghorieb',
    role: 'Full-Stack Software Engineer',
    skills: 'React • Node.js • TypeScript • PostgreSQL',
    image: '/ChatGPT Image Feb 15, 2026, 09_07_59 PM.png',
    linkedinUrl: 'https://www.linkedin.com/in/ilyes-ghorieb-95b470244/',
    description:
      'Salut ! Je suis Ilyes, un développeur full-stack passionné par la création de solutions logicielles innovantes. Chez PROGIX, je conçois et développe des systèmes CRM et ERP sur mesure, des plateformes SaaS et des applications mobiles performantes et évolutives.',
    experience: [
      {
        title: 'Ingénieur logiciel',
        company: 'PROGIX',
        period: 'Juillet 2024 - Présent',
        location: 'Montréal, QC (Hybride)',
        description:
          "Conception et développement de solutions logicielles SaaS, d'applications et de sites web sur mesure. Gestion complète du cycle de développement, de la planification à la mise en production.",
      },
      {
        title: 'Responsable produit',
        company: 'iBusiness Consulting Inc.',
        period: 'Janvier 2024 - Juillet 2024',
        location: 'Longueuil, QC',
        description:
          "Gestion et suivi des projets de l'équipe de développement. Coordination entre besoins métier et équipe technique en méthodologie Agile.",
      },
    ],
    mainSkills: [
      'React.js',
      'Node.js',
      'Express.js',
      'Flask',
      'Next.js',
      'PostgreSQL',
      'MongoDB',
      'Docker',
      'GraphQL',
      'JWT',
      'CI/CD',
    ],
    education: {
      degree: 'Baccalauréat en Génie informatique et logiciel',
      institution: 'UQAM | Université du Québec à Montréal',
      period: '2025',
      details: "GPA: 3.1 • Membre de l'AGEEI",
    },
  },
  {
    id: 'fadi',
    name: 'Fadi Atmania',
    role: 'Développeur Web Full-Stack',
    skills: 'Flutter • React Native • Swift • Kotlin',
    image: '/images/imranarshad/IMG_4282.JPG',
    linkedinUrl: 'https://www.linkedin.com/in/fadi-atmania-011756354/',
    description:
      'Salut ! Je suis Fadi, un développeur web full-stack passionné par les technologies modernes. Chez PROGIX, je me spécialise dans la création de solutions robustes, efficaces et scalables en utilisant Java, Python, React et Docker.',
    experience: [
      {
        title: 'Administrator',
        company: 'PROGIX',
        period: 'Septembre 2024 - Présent',
        location: 'Montréal, QC (Hybride)',
        description:
          "Développement de services IT et solutions logicielles. Conception d'applications web full-stack avec les dernières technologies et frameworks.",
      },
    ],
    mainSkills: [
      'Java',
      'Python',
      'React',
      'Docker',
      'Git',
      'Flutter',
      'React Native',
      'Swift',
      'Kotlin',
      'Software Development',
      'IT Services',
    ],
    education: {
      degree: 'Computer Software Engineering',
      institution: 'UQAM | Université du Québec à Montréal',
    },
  },
  {
    id: 'mohamed-bouhezza',
    name: 'Mohamed Bouhezza',
    role: 'Ingénieur Backend',
    skills: 'Go • Python • PostgreSQL • Kafka',
    image: '/images/team-new/younes-belkacem.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/progix/',
    description:
      "Salut ! Moi c'est Mohamed, ingénieur backend obsédé par les systèmes distribués. Chez PROGIX, je conçois des APIs solides, des microservices Go et Python, et j'orchestre des pipelines de données qui tiennent la charge à grande échelle.",
    experience: [
      {
        title: 'Ingénieur Backend',
        company: 'PROGIX',
        period: '2024 - Présent',
        location: 'Montréal, QC',
        description:
          "Conception et développement de services backend critiques, APIs gRPC, microservices Go/Python, intégration Kafka et optimisation des performances PostgreSQL.",
      },
    ],
    mainSkills: [
      'Go',
      'Python',
      'PostgreSQL',
      'Kafka',
      'gRPC',
      'Microservices',
      'Docker',
      'REST APIs',
    ],
    education: {
      degree: 'Baccalauréat en Génie informatique',
      institution: 'Polytechnique Montréal',
      period: '2024',
    },
  },
  {
    id: 'houssem-ferrani',
    name: 'Houssem Ferrani',
    role: 'Full-Stack Developer',
    skills: 'React • Next.js • Node.js • TypeScript',
    image: '/images/team-new/houssem-ferrani.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/progix/',
    description:
      "Salut ! Moi c'est Houssem, développeur full-stack. Chez PROGIX, je conçois des applications web de bout en bout — du modèle de données à l'interface — avec un focus sur la performance, la robustesse et une UX qui ne laisse rien au hasard.",
    experience: [
      {
        title: 'Full-Stack Developer',
        company: 'PROGIX',
        period: '2024 - Présent',
        location: 'Montréal, QC',
        description:
          "Développement d'applications web full-stack avec React, Next.js, Node.js et TypeScript. Conception d'APIs REST/GraphQL, modélisation de bases de données et déploiement de solutions sur mesure pour les clients PROGIX.",
      },
    ],
    mainSkills: [
      'React',
      'Next.js',
      'Node.js',
      'TypeScript',
      'PostgreSQL',
      'REST APIs',
      'GraphQL',
      'Tailwind CSS',
      'Git',
      'CI/CD',
    ],
    education: {
      degree: 'Baccalauréat en Génie informatique et logiciel',
      institution: 'UQAM | Université du Québec à Montréal',
      period: '2024',
    },
  },
  {
    id: 'islem',
    name: 'Islem Deneche',
    role: 'UX/UI Designer',
    skills: 'Figma • Adobe XD • Prototyping • User Research',
    image: '/images/team-new/islem-deneche.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/islem-deneche-097701384/',
    description:
      "Salut ! Je suis Islem, un designer UX/UI passionné par la création d'expériences utilisateur exceptionnelles. Chez PROGIX, je conçois des interfaces intuitives et esthétiques qui améliorent l'engagement utilisateur.",
    experience: [
      {
        title: 'UX/UI Designer',
        company: 'PROGIX',
        period: '2024 - Présent',
        location: 'Montréal, QC',
        description:
          "Conception d'interfaces utilisateur et d'expériences utilisateur pour nos applications web et mobiles. Collaboration étroite avec l'équipe de développement pour assurer une implémentation fidèle aux designs.",
      },
    ],
    mainSkills: [
      'Figma',
      'Adobe XD',
      'Prototyping',
      'User Research',
      'UI Design',
      'UX Design',
      'Design Systems',
      'Wireframing',
      'User Testing',
      'Accessibility',
    ],
    education: {
      degree: 'Design Graphique',
      institution: 'École de design',
    },
  },
  {
    id: 'aurelio',
    name: 'Aurelio',
    role: 'Chef de projet & Stratégie produit',
    skills: 'Agile • Scrum • Discovery • Roadmap',
    image: '/images/team-new/mamadou-diallo.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/progix/',
    description:
      "Salut ! Je suis Aurelio, chef de projet et stratège produit. Chez PROGIX, je fais le pont entre la vision client et l'exécution technique : discovery, roadmaps, OKR et rituels Agile pour que chaque livrable ait du sens.",
    experience: [
      {
        title: 'Chef de projet & Stratégie produit',
        company: 'PROGIX',
        period: '2022 - Présent',
        location: 'Montréal, QC',
        description:
          "Pilotage de projets sur mesure de bout en bout : ateliers de discovery, roadmaps produit, gestion Agile/Scrum, suivi des OKR et coordination des équipes design et ingénierie.",
      },
    ],
    mainSkills: [
      'Agile',
      'Scrum',
      'Discovery',
      'Roadmap',
      'OKR',
      'Jira',
      'Product Strategy',
      'Stakeholder Management',
    ],
    education: {
      degree: 'MBA Tech',
      institution: 'HEC Montréal',
      period: '2022',
    },
  },
  {
    id: 'khalil-cheddadi',
    name: 'Khalil Cheddadi',
    role: 'Ingénieur DevOps & Cloud',
    skills: 'AWS • Kubernetes • Terraform • CI/CD',
    image: '/images/team-new/karim-amrani.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/progix/',
    description:
      "Salut ! Je suis Khalil, ingénieur DevOps & Cloud. Chez PROGIX, je construis l'infrastructure qui soutient nos produits : pipelines CI/CD, clusters Kubernetes, automatisation Terraform et observabilité à 360° pour que tout reste prévisible et rapide.",
    experience: [
      {
        title: 'Ingénieur DevOps & Cloud',
        company: 'PROGIX',
        period: '2023 - Présent',
        location: 'Montréal, QC',
        description:
          "Mise en place et maintien d'infrastructures cloud AWS, orchestration Kubernetes, pipelines CI/CD GitLab, monitoring Prometheus/Grafana et automatisation Terraform.",
      },
    ],
    mainSkills: [
      'AWS',
      'Kubernetes',
      'Terraform',
      'CI/CD',
      'Prometheus',
      'Grafana',
      'Docker',
      'Linux',
    ],
    education: {
      degree: "Baccalauréat en Génie des technologies de l'information",
      institution: 'ÉTS Montréal',
      period: '2023',
    },
  },
];
