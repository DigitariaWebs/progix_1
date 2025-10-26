export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  content: string;
  author: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'vortex-solution-accueille-imacom',
    title:
      "Progix étend son hébergement managé: migrations rapides et sans rupture",
    date: '1 octobre 2025',
    excerpt:
      "Progix renforce son hébergement managé: migration rapide, sécurité renforcée et support 24/7.",
    image:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/premierbloc.jpg',
    author: 'Équipe Progix',
    category: 'Hébergement',
    content: `
# Progix étend son hébergement managé

Nous renforçons notre offre d'hébergement managé pour accompagner les équipes qui exigent performance, sécurité et sérénité opérationnelle.

## Ce que ça change pour vous

- Plateformes plus rapides et stables
- SLA clairs et mesurables
- Observabilité bout‑à‑bout (logs, métriques, alertes)
- Runbooks et réponses incidents documentés
- Support 24/7 par des ingénieurs Progix

## Une migration sans rupture

Nous opérons des migrations planifiées, testées et réversibles:
- Cartographie applicative et plan de bascule
- Environnements miroirs et tests de charge
- Fenêtre de migration courte et communication proactive
- Rollback instantané si nécessaire

## Sécurité et fiabilité by design

- Backups chiffrés et tests de restauration réguliers
- WAF, TLS moderne et durcissement des configurations
- Mises à jour et correctifs automatisés
- Surveillance 24/7 et réponse aux incidents

Vous souhaitez migrer vers un hébergement managé Progix ou auditer votre stack actuelle?
Parlons-en.
    `,
  },
  {
    slug: 'nouveau-site-mont-saint-hilaire',
    title: 'Un site municipal nouvelle génération, conçu par Progix',
    date: '30 septembre 2025',
    excerpt: "Accessibilité, performance et édition simplifiée — le nouveau standard municipal.",
    image: 'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/logoaquaa.png',
    author: 'Équipe Progix',
    category: 'Projets',
    content: `
# Un site municipal nouvelle génération

Informer rapidement, simplifier les démarches et garantir l’accessibilité: nos critères pour concevoir une expérience citoyenne utile et inclusive.

## Design centré usagers

- Parcours orientés tâches (trouver, faire, signaler)
- Arborescence claire et recherche améliorée
- Pages services standardisées et réutilisables

## Performance, SEO et accessibilité

- LCP < 1,5 s sur mobile, Core Web Vitals au vert
- Balises, schémas et métas optimisés
- Conformité WCAG 2.1 AA, contrastes vérifiés

## Édition simplifiée pour les équipes

- Design system documenté et blocs prêts à l’emploi
- Workflows d’approbation et prévisualisation
- Rôles et permissions granulaires

## Stack technique

- Next.js, SSR/ISR selon le besoin
- Media optimization et cache CDN
- Intégration analytique privacy‑first
    `,
  },
  {
    slug: 'agence-wordpress-canadienne-seo',
    title:
      'Pourquoi choisir Progix pour votre stratégie SEO WordPress',
    date: '29 septembre 2025',
    excerpt:
      'Architecture, performance et contenu: la méthode Progix pour un SEO WordPress durable.',
    image: 'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/data_management_illustration.svg',
    author: 'Équipe Progix',
    category: 'SEO & Marketing',
    content: `
# Pourquoi choisir Progix pour votre stratégie SEO WordPress

Un SEO durable se construit sur trois piliers: technique, contenu et maillage. Notre approche cadre ces piliers avec un backlog priorisé, mesuré et itératif.

## 1) Fondations techniques

- Architecture d’information claire et scalable
- Maillage interne guidé par l’intention de recherche
- Vitesse et stabilité (Core Web Vitals au vert)
- Données structurées (schema.org) et métas complètes

## 2) Contenu qui performe

- Cartographie mots‑clés et personas
- Briefs éditoriaux et guidelines de tonalité
- Production assistée par IA (revue humaine systématique)
- Templates de pages piliers et satellites

## 3) Mesure et itérations

- KPI actionnables (trafic, conversions, visibilité par thème)
- Tableaux de bord et revues mensuelles
- Hypothèses, tests et décisions appuyées par la donnée

## Ce que vous obtenez avec Progix

- Gains rapides priorisés, roadmap trimestrielle
- Stack d’optimisation prête pour WordPress
- Équipe pluridisciplinaire (SEO, contenu, dev, data)

Parlez-nous de votre contexte: on vous propose un plan d’action en 48h.
    `,
  },
];
