-- ============================================================
-- STEP 1 — Create an admin user account in Supabase Auth
-- Run this in: Supabase dashboard → SQL Editor → New query
-- ============================================================

-- Creates a confirmed user (no email confirmation required)
-- Change the email and password below before running.
-- REDACTED: the real password used to seed the shared project is not
-- recorded here. Set your own strong password when (re-)running this.
SELECT auth.create_user(
  '{"email": "admin@progix.pro", "password": "REPLACE_WITH_A_REAL_PASSWORD", "email_confirm": true}'::jsonb
);

-- ⚠️  After running, note down the UUID returned — it is the admin's user ID.
-- You can also create users via: Authentication → Users → Add user (no SQL needed).

-- ============================================================
-- STEP 2 — Seed the Karima client estimate into the database
-- Run this AFTER step 1 (and after running 0005_client_estimates.sql)
-- ============================================================

INSERT INTO public.client_estimates (
  slug,
  access_code,
  client_name,
  project_name,
  project_title,
  project_description,
  currency,
  total_amount,
  delivery_days,
  marketing_included,
  features,
  investments,
  payment_schedule_type,
  payment_months,
  payment_installments
) VALUES (
  'karima',
  'progix2026',
  'Karima',
  'Trajeo (nom de travail)',
  'plateforme de mobilité à la demande',
  'Application mobile de mise en relation entre passagers et chauffeurs : réservation de trajets, géolocalisation et suivi de course en temps réel, estimation de prix, profils vérifiés et notation mutuelle — plus back-office, landing page, API, infrastructure cloud et accompagnement marketing premium jusqu''à la mise en marché. Un prix fixe, une équipe senior, votre propriété à 100 %.',
  '€',
  '5 600',
  '90',
  true,
  '[
    {"id":"f1","category":"dev","labelStrong":"Application mobile iOS & Android","label":" (passager + chauffeur), design sur mesure","included":true},
    {"id":"f2","category":"dev","labelStrong":"Réservation de trajets & mise en relation","label":" en temps réel","included":true},
    {"id":"f3","category":"dev","labelStrong":"Géolocalisation & suivi de course","label":" sur carte","included":true},
    {"id":"f4","category":"dev","labelStrong":"Profils passagers & chauffeurs","label":" avec vérification des documents","included":true},
    {"id":"f5","category":"dev","labelStrong":"Estimation de prix & itinéraire","label":" avant réservation","included":true},
    {"id":"f6","category":"dev","labelStrong":"Historique des courses & notation","label":" mutuelle","included":true},
    {"id":"f7","category":"dev","labelStrong":"Back-office d''administration","label":" (courses, chauffeurs, litiges)","included":true},
    {"id":"f8","category":"dev","labelStrong":"Landing page","label":" de présentation, optimisée acquisition","included":true},
    {"id":"f9","category":"dev","labelStrong":"3 révisions de maquettes","label":" incluses dans le forfait","included":true},
    {"id":"f10","category":"api","labelStrong":"API & base de données","label":" dédiées à la plateforme","included":true},
    {"id":"f11","category":"api","labelStrong":"Infrastructure cloud scalable & intégrations","label":" selon la charge","included":true},
    {"id":"f12","category":"api","labelStrong":"Monétisation","label":" par commission ou abonnement (modèle retenu avec le Client)","included":true},
    {"id":"f13","category":"api","labelStrong":"Publication App Store & Google Play","label":" — phase de production (30 j) incluse","included":true},
    {"id":"f14","category":"marketing","labelStrong":"Marketing premium clé en main","label":" : stratégie, UGC, créatifs, campagnes gérées de A à Z","included":true},
    {"id":"f15","category":"marketing","labelStrong":"Gestion Meta Ads, Google Ads & Apple Search Ads","label":" — optimisation quotidienne","included":true},
    {"id":"f16","category":"marketing","labelStrong":"Analyse des KPIs, réunion hebdomadaire","label":" & reporting continu","included":true},
    {"id":"f17","category":"marketing","labelStrong":"Support technique","label":" + documentation technique complète","included":true}
  ]'::jsonb,
  '[
    {"id":"inv1","labelStrong":"Application mobile iOS + Android","label":" (passager + chauffeur, design sur mesure)","amount":"1 700 €"},
    {"id":"inv2","label":"Back-office d''administration & gestion des courses","amount":"650 €"},
    {"id":"inv3","label":"API & base de données","amount":"600 €"},
    {"id":"inv4","label":"Infrastructure cloud scalable & intégrations","amount":"550 €"},
    {"id":"inv5","label":"Landing page de présentation","amount":"250 €"},
    {"id":"inv6","label":"Déploiement & phase de production stores (30 j, reviews, test Google Play)","amount":"500 €"},
    {"id":"inv7","label":"Accompagnement marketing premium (clé en main, campagnes gérées)","amount":"900 €"},
    {"id":"inv8","label":"Documentation, maintenance & support","amount":"450 €"}
  ]'::jsonb,
  'monthly',
  6,
  '[
    {"label":"Acompte à la signature","percentage":20,"amount":"1 120 €"},
    {"label":"Livraison technique","percentage":50,"amount":"2 800 €"},
    {"label":"Publication sur les stores","percentage":30,"amount":"1 680 €"}
  ]'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  access_code          = EXCLUDED.access_code,
  client_name          = EXCLUDED.client_name,
  project_name         = EXCLUDED.project_name,
  project_title        = EXCLUDED.project_title,
  project_description  = EXCLUDED.project_description,
  currency             = EXCLUDED.currency,
  total_amount         = EXCLUDED.total_amount,
  delivery_days        = EXCLUDED.delivery_days,
  marketing_included   = EXCLUDED.marketing_included,
  features             = EXCLUDED.features,
  investments          = EXCLUDED.investments,
  payment_schedule_type = EXCLUDED.payment_schedule_type,
  payment_months       = EXCLUDED.payment_months,
  payment_installments = EXCLUDED.payment_installments,
  updated_at           = now();
