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
      'Progix étend son hébergement managé: migrations rapides et sans rupture',
    date: '1 octobre 2025',
    excerpt:
      'Progix renforce son hébergement managé: migration rapide, sécurité renforcée et support 24/7.',
    image:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/premierbloc.jpg',
    author: 'Équipe Progix',
    category: 'Hébergement',
    content: `
Chez Progix, l’hébergement n’est pas un simple « endroit où héberger un site ». C’est une promesse de fiabilité, de performance et de tranquillité d’esprit. En étendant notre offre d’hébergement managé, nous aidons nos clients à se concentrer sur leur produit pendant que nous prenons en charge l’invisible: la stabilité, la sécurité et l’exploitation au quotidien.

Concrètement, cela veut dire des plateformes plus rapides, des temps de réponse prévisibles et des engagements mesurables. Nous mettons en place une observabilité complète (logs, métriques, alertes) afin de détecter proactivement ce qui pourrait devenir un incident. Et lorsque ça arrive — parce que ça arrive — nous avons des runbooks clairs, une procédure de réponse outillée et une équipe qui sait quoi faire, quand le faire et comment communiquer.

La question des migrations revient souvent: « est‑ce que je vais avoir une coupure? ». Notre approche privilégie la préparation. Nous cartographions l’environnement, montons un miroir, faisons des tests de charge, planifions une fenêtre de bascule courte et communiquons chaque étape. Si quelque chose dévie, nous avons la possibilité de revenir en arrière en quelques minutes. Pas de pari hasardeux, pas de nuit blanche inutile.

Côté sécurité, nous appliquons des principes simples et non négociables: sauvegardes chiffrées testées régulièrement, durcissement des configurations, mises à jour contrôlées, surveillance continue et gestion stricte des accès. Le tout documenté, auditable et aligné sur les bonnes pratiques du secteur.

Ce que nos clients apprécient le plus? La simplicité. Un point de contact unique, des indicateurs clairs, et surtout des plateformes qui tiennent la route, même quand le trafic grimpe ou que les équipes publient souvent. Notre rôle est de rendre l’infrastructure « silencieuse » pour que votre énergie aille au bon endroit: bâtir, lancer, grandir.

Vous envisagez une migration vers un hébergement managé Progix ou vous souhaitez évaluer votre stack actuelle? Parlons‑en. Nous vous présenterons un plan concret, des risques maîtrisés et un chemin de mise en œuvre sans surprise.
    `,
  },
  {
    slug: 'nouveau-site-mont-saint-hilaire',
    title: 'Un site municipal nouvelle génération, conçu par Progix',
    date: '30 septembre 2025',
    excerpt:
      'Accessibilité, performance et édition simplifiée — le nouveau standard municipal.',
    image: '/images/imranarshad/Création sans titre (1).png',
    author: 'Équipe Progix',
    category: 'Projets',
    content: `
# Un site municipal nouvelle génération

Concevoir un site municipal, c’est transformer des besoins concrets en réponses simples. Pour Mont‑Saint‑Hilaire, nous avons mis l’expérience citoyenne au centre: trouver une information, effectuer une démarche ou signaler un problème doit prendre quelques secondes, pas plusieurs minutes.

## Contexte et objectifs

La municipalité souhaitait un site plus clair, plus rapide et plus accessible. Notre mandat: réduire le temps de recherche de l’information, simplifier les démarches en ligne et offrir un environnement d’édition fluide pour les équipes internes. Nous avons également intégré des exigences fortes en matière d’accessibilité (WCAG 2.1 AA) et de conformité (Loi 25) pour que le site soit utile à tous, dans un cadre légal maîtrisé.

## Approche Progix

Nous avons commencé par des ateliers de discovery avec les directions et services municipaux afin de cartographier les besoins réels. De là est née une architecture de l’information orientée tâches: trouver, faire, signaler. Le design system qui en découle permet de composer rapidement des pages cohérentes, sans repartir de zéro. L’accessibilité a été intégrée dès les maquettes: contrastes vérifiés, focus visibles, alternatives textuelles et navigations clavier pensées en amont.

## Expérience et fonctionnalités

Les pages « Services » sont standardisées avec des gabarits éditoriaux qui guident la rédaction et évitent l’incohérence. Le moteur de recherche suggère et comprend les synonymes pour amener l’usager au bon contenu plus vite. Nous avons prévu l’actualité et les avis publics avec filtres et archivage, ainsi qu’un système d’alertes pour informer rapidement en cas de travaux, de fermetures ou d’urgences. Les composantes éditoriales (documents, cartes, FAQ, appels à l’action) se glissent partout, au bon format, en quelques clics.

## Performance, SEO et accessibilité

Le site charge vite, même sur mobile. Nous avons défini des budgets de performance, optimisé les médias, rationalisé les scripts et mis en place du préchargement ciblé. Résultat: un LCP inférieur à 1,5 s et des Core Web Vitals au vert. Côté découvrabilité, les balises, schémas et métadonnées structurées renforcent le SEO tandis que la navigation reste entièrement utilisable au clavier avec un focus toujours visible.

## Stack et mise en œuvre

La base technique repose sur Next.js 14 avec SSR/ISR selon les besoins de fraîcheur et de performance. TypeScript et Tailwind CSS garantissent robustesse et maintenabilité, tandis que les design tokens assurent une cohérence visuelle durable. L’optimisation média native et le cache CDN accélèrent l’affichage, et l’analytique privacy‑first permet de mesurer l’usage sans multiplier les cookies inutiles.

## Gouvernance et transfert

Nous avons documenté le design system et les bonnes pratiques de contribution, puis formé les équipes — éditeur, approbateur, administrateur — pour fluidifier la publication. Les workflows de validation et la prévisualisation sécurisée permettent d’itérer vite, sans surprises à la mise en ligne.

Au final, Mont‑Saint‑Hilaire dispose d’une plateforme plus rapide, inclusive et durable, que l’équipe municipale peut faire évoluer en toute autonomie. Et surtout: un site qui sert réellement ses citoyens.
    `,
  },
  {
    slug: 'agence-wordpress-canadienne-seo',
    title: 'Pourquoi choisir Progix pour votre ERP interne',
    date: '29 septembre 2025',
    excerpt:
      'De la sélection à l’adoption: un ERP taillé pour vos processus et votre croissance.',
    image:
      'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/data_management_illustration.svg',
    author: 'Équipe Progix',
    category: 'ERP & Systèmes d’information',
    content: `
Votre ERP n’est pas un logiciel générique: c’est l’ossature opérationnelle de votre entreprise. Chez Progix, nous concevons et mettons en place des ERP qui épousent vos processus réels, au lieu de vous forcer à plier votre organisation autour d’un outil rigide.

Avant toute ligne de code, on clarifie l’essentiel: objectifs métiers, contraintes, intégrations critiques, niveaux d’accès, indicateurs à suivre. À partir de là, nous recommandons la meilleure trajectoire: mise en place d’un ERP du marché avec une personnalisation maîtrisée, ou construction d’un noyau sur‑mesure interfacé à vos outils existants (CRM, comptabilité, e‑commerce, logistique, BI).

Notre approche repose sur trois leviers: une architecture propre et documentée, des intégrations fiables (API, ETL, synchronisations temps réel) et une expérience utilisateur qui simplifie vraiment le quotidien (navigation logique, formulaires rapides, validations et workflows clairs). Le résultat: moins d’erreurs, plus de données exploitables, et des équipes qui adoptent l’outil.

La réussite d’un ERP se mesure dans la durée. Nous planifions une montée en charge progressive, des formations adaptées aux rôles et une gouvernance simple: qui change quoi, comment, et pourquoi. Côté sécurité, nous appliquons des pratiques strictes (RBAC, chiffrement en transit/au repos, journaux d’audit) sans sacrifier la fluidité.

Ce que vous gagnez avec Progix: un ERP qui centralise vos opérations, expose les bons KPI, et s’adapte à votre croissance sans crouler sous la dette technique. Parlez‑nous de votre contexte: nous vous proposerons une feuille de route pragmatique, des risques maîtrisés et des jalons livrables qui créent de la valeur dès les premières semaines.
    `,
  },
];
