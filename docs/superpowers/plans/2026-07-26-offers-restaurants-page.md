# `/offers` — Restaurant Offer Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a public, French-language landing page at `progix.pro/offers` that sells PROGIX's restaurant offer (white-label ordering app + back-office), converts via a short inline lead form, and stays reachable while the rest of the site is closed for maintenance.

**Architecture:** All existing routes move into a `(site)` route group whose layout owns the maintenance gate; `/offers` lives outside that group so it renders normally while `/` stays closed. The page is a server component assembling nine section components from `src/components/offers/`, all copy lives in one data module (`src/data/offersData.ts`), the only real logic (commission math) is a pure module with an executable test, and the form posts to a new `/api/offers` route that reuses a new shared email sender.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, framer-motion, Resend with SMTP fallback (nodemailer), Node 22 type-stripping for the one unit test.

---

## Context the implementer needs

**This repo has no test runner.** No jest, no vitest, no playwright in `package.json`. Do not add one — it is out of scope for a marketing page. The verification loop for UI work is:

```bash
npm run type-check     # tsc --noEmit
npm run lint           # eslint src/
npm run build          # next build
```

The one piece of real logic (commission math) *is* unit-tested, via Node's built-in type stripping — no new dependency. Verified working on this machine (Node v22.12.0).

**Site is currently closed.** `src/app/layout.tsx:14` hard-codes `MAINTENANCE_MODE = true` and renders `<MaintenancePage />` instead of the app. Task 1 relocates that gate so `/offers` escapes it.

**Design decisions already made with the client (do not re-litigate):**

| Decision | Value |
|---|---|
| Route | `/offers`, public, indexed, in sitemap |
| Language | French only |
| Price | Not shown — "sur devis", revealed on the call |
| Hook | Delivery platforms take 25–30 % of every order |
| Timeline advertised | 4 to 6 weeks |
| Inclusions | iOS+Android white-label app · online ordering + payment · back-office dashboard · App Store & Play publication · POS/delivery integrations · hosting, maintenance & support · website + Google/SEO |
| CTA | Short inline form → new `/api/offers` |
| Third-party app screenshots | Shown, named, **with an explicit disclaimer that they are market examples, not PROGIX clients** |
| Maintenance | `/offers` accessible while the rest of the site stays closed |

**Two honesty constraints that are non-negotiable in the copy:**

1. The five App Store screenshots are real third-party brands (The Burger's Priest, Greene King, PattySlaps, Raising Cane's, POP'S Villepinte). They are presented as *market benchmark*, never as PROGIX work. The disclaimer string in Task 2 must render visibly in Task 6, not in a tooltip.
2. The two dashboard images are design mockups, not screenshots of a shipped PROGIX product. Task 8 renders them with a visible "Aperçu d'interface — maquette" caption.

Loyalty programs and push notifications were **not** selected as inclusions. Do not mention them anywhere.

---

## Assets — prerequisite

The client exports 7 images into `public/images/offers/` with these exact filenames. The build does **not** fail if they are missing (`next.config.ts` sets `images.unoptimized: true`), the page just shows empty frames — so implementation is not blocked.

```
public/images/offers/burgers-priest.png
public/images/offers/greene-king.png
public/images/offers/pattyslaps.png
public/images/offers/raising-canes.png
public/images/offers/pops-villepinte.png
public/images/offers/dashboard-reztro.png
public/images/offers/dashboard-tst-food.png
```

---

## Design direction

**Subject:** an independent Québec restaurant owner, 35–60, not technical, reading on a phone, who already knows the commission hurts and is skeptical of agencies.

**Signature element — the thermal receipt.** The hero's right column is a printed kitchen ticket on warm receipt stock with a torn sawtooth bottom edge. One slider ("Ventes en livraison par mois") reprints it live: the commission line and the annual loss are set in the loss red. Beside it, a compact dark card shows the same money kept. The calculator *is* the hero image — no stock photo, no floating phone, no gradient blob. Everything else on the page stays quiet so this is the thing people remember.

**Palette** (offers scope only, derived from the existing PROGIX navy/cyan so the page still reads as PROGIX):

| Token | Hex | Used for |
|---|---|---|
| `ink` | `#0E2233` | dark section backgrounds |
| `steel` | `#1A3A52` | secondary dark, matches the home hero |
| `paper` | `#EFEAE0` | receipt stock — **only** the receipt surface |
| `cyan` | `#00D4FF` | brand accent, CTA only |
| `loss` | `#E4572E` | money leaving — commission figures only |
| `keep` | `#0B7A5A` | money kept — the relief card only |
| `muted` | `#7C8B99` | labels, captions |

`loss` and `keep` are semantic, never decorative. If a number is not money moving, it is not colored.

**Type** — all three faces are already loaded by `src/app/globals.css`, zero new font cost:

- **Display:** Hubot Sans — headlines, tight tracking, large clamp.
- **Body:** Montserrat — the site default.
- **Data:** DM Mono — receipt figures, eyebrows, the inclusions spec table. Mono is the register of a POS ticket; that is why it is here.

**Structure:** alternating light/dark bands. Numbered markers appear **only** in the process timeline, where the order is real information (week ranges). The inclusions list is a spec table, not a card grid — it reads like a menu sheet.

---

## File structure

**Create**

| Path | Responsibility |
|---|---|
| `src/app/(site)/layout.tsx` | Maintenance gate + GlobalMenu + PageTransition for every pre-existing route |
| `src/app/offers/page.tsx` | Route, metadata, section assembly |
| `src/data/offersData.ts` | Entire French copy deck + theme hexes. Single source of truth for text. |
| `src/lib/offers/commission.ts` | Pure commission math + `fr-CA` currency formatter |
| `src/lib/email/sendLeadEmail.ts` | Resend → SMTP fallback sender |
| `src/app/api/offers/route.ts` | Lead validation + email dispatch |
| `src/components/offers/CommissionReceipt.tsx` | Signature receipt + slider (client) |
| `src/components/offers/OffersHero.tsx` | Hero band (client) |
| `src/components/offers/BenchmarkStrip.tsx` | Third-party apps + disclaimer |
| `src/components/offers/AppSpecSection.tsx` | What the customer installs |
| `src/components/offers/DashboardSection.tsx` | Back-office band + mockup caption (client) |
| `src/components/offers/InclusionsTable.tsx` | Seven-row spec table |
| `src/components/offers/ProcessTimeline.tsx` | Four dated phases |
| `src/components/offers/FaqSection.tsx` | Accordion (client) |
| `src/components/offers/OfferLeadForm.tsx` | Inline lead form (client) |
| `src/components/offers/StickyCta.tsx` | Mobile-only bottom CTA bar (client) |
| `scripts/test-commission.mts` | Executable assertions for the commission math |

**Modify**

| Path | Change |
|---|---|
| `src/app/layout.tsx` | Strip the maintenance gate and menu providers down to `<html>/<body>` + `{children}` |
| `src/app/sitemap.ts` | Add `/offers` |
| `src/app/globals.css` | Add `.offers-page` reduced-motion rule |
| `src/components/GlobalMenu.tsx` | Add the "Offre restaurants" nav item |

**Moved by `git mv` in Task 1** — every route folder plus `page.tsx` from `src/app/` into `src/app/(site)/`. `api/`, `globals.css`, `favicon.ico`, `robots.ts`, `sitemap.ts` and `layout.tsx` stay at `src/app/` root. Route groups do not change URLs, so `/blog`, `/contact` etc. keep their paths.

---

## Task 1: Escape the maintenance gate with a `(site)` route group

Layouts nest, so any gate in the root layout wraps every route including a new one. Moving the gate down into a route group is the only way to exempt `/offers` without deopting the whole site to dynamic rendering. Route handlers under `api/` are not wrapped by layouts, so they already bypass the gate today.

**Files:**
- Create: `src/app/(site)/layout.tsx`
- Modify: `src/app/layout.tsx`
- Move: 12 folders + `page.tsx` from `src/app/` into `src/app/(site)/`

- [ ] **Step 1: Move the existing routes into the group**

```bash
cd src/app
mkdir -p "(site)"
for d in blog case-study confirmation confoo-2025 contact expertise labo nos-valeurs portfolio qualification services team page.tsx; do
  git mv "$d" "(site)/$d"
done
cd ../..
```

- [ ] **Step 2: Verify only the intended files remain at the app root**

```bash
ls src/app
```

Expected exactly: `(site)`, `api`, `favicon.ico`, `globals.css`, `layout.tsx`, `robots.ts`, `sitemap.ts`

- [ ] **Step 3: Create the group layout that owns the gate**

Create `src/app/(site)/layout.tsx`:

```tsx
import PageTransition from '@/components/PageTransition';
import GlobalMenu from '@/components/GlobalMenu';
import { GlobalMenuProvider } from '@/components/globalMenuBus';
import MaintenancePage from '@/components/MaintenancePage';

// Maintenance mode is hard-ON: every route in this group is closed.
// NOTE: intentionally NOT reading process.env here — a stale MAINTENANCE_MODE
// env var on the host (Vercel) was overriding the flag. To REOPEN the site,
// change this to `false` and push (and/or remove the MAINTENANCE_MODE env var
// in the Vercel project settings).
//
// Routes OUTSIDE this group are never gated. /offers lives at src/app/offers
// on purpose so it stays reachable while the rest of the site is closed.
const MAINTENANCE_MODE = true;

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  if (MAINTENANCE_MODE) return <MaintenancePage />;

  return (
    <GlobalMenuProvider>
      <GlobalMenu />
      <PageTransition>{children}</PageTransition>
    </GlobalMenuProvider>
  );
}
```

- [ ] **Step 4: Strip the root layout down to the document shell**

In `src/app/layout.tsx`, delete these four imports:

```tsx
import PageTransition from '@/components/PageTransition';
import GlobalMenu from '@/components/GlobalMenu';
import { GlobalMenuProvider } from '@/components/globalMenuBus';
import MaintenancePage from '@/components/MaintenancePage';
```

Delete the `MAINTENANCE_MODE` const and its comment block. Keep the font setup, `metadata` export and the gtag `<head>` scripts untouched. Replace the `<body>` contents so the whole element reads:

```tsx
      <body
        className={`${montserrat.variable} ${inter.variable} font-sans antialiased overflow-x-hidden`}
      >
        {children}
      </body>
```

- [ ] **Step 5: Prove the gate still closes the site and a non-grouped route does not**

```bash
npm run dev
```

In a second terminal:

```bash
curl -s http://localhost:3000/ | grep -c "En maintenance"
```

Expected: `1` (home is still closed)

```bash
mkdir -p src/app/offers
printf "export default function P() { return <main>offers-probe</main>; }\n" > src/app/offers/page.tsx
curl -s http://localhost:3000/offers | grep -c "offers-probe"
```

Expected: `1` (the new route escapes the gate). Leave the probe file — Task 14 overwrites it.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor(routing): move gated routes into (site) group so /offers can stay open"
```

---

## Task 2: Copy deck and theme tokens

Every French string on the page lives here so copy edits never require touching JSX.

**Files:**
- Create: `src/data/offersData.ts`

- [ ] **Step 1: Write the data module**

Create `src/data/offersData.ts`:

```ts
export const offersTheme = {
  ink: '#0E2233',
  steel: '#1A3A52',
  paper: '#EFEAE0',
  cyan: '#00D4FF',
  loss: '#E4572E',
  keep: '#0B7A5A',
  muted: '#7C8B99',
} as const;

export const MONO = "'DM Mono', ui-monospace, SFMono-Regular, monospace";
export const DISPLAY = "'Hubot Sans', Inter, sans-serif";

/** Average commission rate charged by delivery marketplaces, in percent. */
export const PLATFORM_RATE_PCT = 29;
export const DEFAULT_MONTHLY_SALES = 12000;
export const MIN_MONTHLY_SALES = 1000;
export const MAX_MONTHLY_SALES = 60000;
export const SALES_STEP = 500;

export const hero = {
  eyebrow: 'Offre restaurants · Montréal',
  title: 'Vos clients commandent chez vous.',
  titleAccent: 'Les plateformes encaissent 29 %.',
  body:
    "PROGIX construit l'application de commande de votre restaurant et le back-office qui va avec. Vous gardez la marge, la relation client et les données. En ligne en 4 à 6 semaines.",
  ctaPrimary: 'Recevoir une proposition',
  ctaSecondary: 'Voir ce qui est inclus',
  sliderLabel: 'Vos ventes en livraison par mois',
  rateNote: 'Taux de 29 % — moyenne constatée sur les places de marché (25 à 30 %).',
};

export const receipt = {
  header: 'Ce que les plateformes retiennent',
  storeLine: 'PROGIX · SIMULATION',
  rowSales: 'Ventes livraison / mois',
  rowRate: `Commission plateforme ${PLATFORM_RATE_PCT} %`,
  rowNet: 'Il vous reste',
  rowYear: 'Perte sur 12 mois',
  keepTitle: 'Avec votre propre application',
  keepRow: 'Commission versée',
  keepValue: '0 $',
  keepYear: 'Récupéré sur 12 mois',
  keepNote:
    "Hors frais de traitement de carte, qui restent dus quel que soit le canal.",
};

export const benchmark = {
  eyebrow: 'Déjà passés à leur propre app',
  title: 'Les chaînes ont arrêté de payer des commissions.',
  body:
    "The Burger's Priest, Raising Cane's, Greene King, PattySlaps, POP'S : chacune a publié son application de commande. Même logique, même technologie. La seule différence, c'est le budget d'agence — et c'est exactement ce qu'on a réglé.",
  disclaimer:
    'Applications publiées par leurs marques respectives. Exemples de marché, présentés à titre de référence — ce ne sont pas des réalisations PROGIX.',
  apps: [
    { name: "The Burger's Priest", image: '/images/offers/burgers-priest.png' },
    { name: "Raising Cane's", image: '/images/offers/raising-canes.png' },
    { name: 'Greene King', image: '/images/offers/greene-king.png' },
    { name: 'PattySlaps', image: '/images/offers/pattyslaps.png' },
    { name: "POP'S Villepinte", image: '/images/offers/pops-villepinte.png' },
  ],
};

export const appSpec = {
  eyebrow: 'Ce que vos clients installent',
  title: 'Votre enseigne, votre application, vos règles.',
  features: [
    {
      label: 'Menu et commande',
      body:
        'Menu complet avec options, extras et allergènes. Commande pour emporter ou en livraison, prête quand le client arrive.',
    },
    {
      label: 'Paiement intégré',
      body:
        "Carte, Apple Pay et Google Pay. L'argent arrive sur votre compte, sans intermédiaire qui prélève au passage.",
    },
    {
      label: 'Compte client',
      body:
        'Historique des commandes et adresses enregistrées : un habitué recommande en deux touches.',
    },
    {
      label: 'Marque blanche',
      body:
        "Vos couleurs, votre logo, votre nom sur l'App Store et Google Play. Aucune mention d'agence.",
    },
  ],
};

export const dashboard = {
  eyebrow: 'Le back-office',
  title: 'Chaque commande, chaque plat, chaque dollar au même endroit.',
  body:
    "Vous suivez le service en direct, changez un prix en une minute et voyez d'où vient le chiffre d'affaires. Accessible depuis le comptoir comme depuis votre téléphone.",
  bullets: [
    'Commandes en direct, avec statut et temps de préparation',
    'Menu, prix et disponibilité modifiables sans nous appeler',
    'Ventes par jour, par plat et par canal de vente',
    'Fiches clients et historique de commandes',
  ],
  caption:
    "Aperçu d'interface — maquette. Le back-office est adapté à votre menu et à vos opérations.",
  shots: [
    { src: '/images/offers/dashboard-reztro.png', alt: 'Vue des ventes et des commandes du back-office' },
    { src: '/images/offers/dashboard-tst-food.png', alt: 'Vue de la gestion du menu et de la prise de commande' },
  ],
};

export const inclusions = {
  eyebrow: 'Inclus dans l’offre',
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

export const process = {
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
```

- [ ] **Step 2: Type-check**

Run: `npm run type-check`
Expected: exits 0, no output.

- [ ] **Step 3: Commit**

```bash
git add src/data/offersData.ts
git commit -m "feat(offers): add restaurant offer copy deck and theme tokens"
```

---

## Task 3: Commission math, test-first

**Files:**
- Create: `scripts/test-commission.mts`
- Create: `src/lib/offers/commission.ts`

`scripts/test-commission.mts` uses the `.mts` extension deliberately: `tsconfig.json` includes `**/*.ts`, which does **not** match `.mts`, so the `.ts`-suffixed import below never trips `allowImportingTsExtensions` during `npm run type-check`. Node strips the types at runtime.

- [ ] **Step 1: Write the failing test**

Create `scripts/test-commission.mts`:

```ts
import assert from 'node:assert/strict';
import { computeCommission, formatCad } from '../src/lib/offers/commission.ts';

// 12 000 $/month at 29 % is the page default.
const base = computeCommission({ monthlySales: 12000, ratePct: 29 });
assert.equal(base.monthlyCommission, 3480);
assert.equal(base.monthlyNet, 8520);
assert.equal(base.yearlyCommission, 41760);
assert.equal(base.yearlyNet, 102240);

// A zero rate costs nothing.
const free = computeCommission({ monthlySales: 12000, ratePct: 0 });
assert.equal(free.monthlyCommission, 0);
assert.equal(free.monthlyNet, 12000);

// Negative and absurd inputs are clamped, never propagated.
assert.equal(computeCommission({ monthlySales: -500, ratePct: 29 }).monthlyCommission, 0);
assert.equal(computeCommission({ monthlySales: 12000, ratePct: -5 }).monthlyCommission, 0);
assert.equal(computeCommission({ monthlySales: 12000, ratePct: 500 }).monthlyNet, 0);

// Results are whole dollars — no cents leak into the receipt.
const odd = computeCommission({ monthlySales: 9999, ratePct: 29 });
assert.equal(Number.isInteger(odd.monthlyCommission), true);
assert.equal(Number.isInteger(odd.yearlyCommission), true);

// fr-CA money, no cents, non-breaking space before the dollar sign.
assert.equal(formatCad(41760).replace(/ /g, ' '), '41 760 $');
assert.equal(formatCad(0).replace(/ /g, ' '), '0 $');

console.log('commission: all assertions passed');
```

- [ ] **Step 2: Run it and watch it fail**

Run: `node --experimental-strip-types scripts/test-commission.mts`
Expected: `ERR_MODULE_NOT_FOUND` — `Cannot find module .../src/lib/offers/commission.ts`

- [ ] **Step 3: Write the implementation**

Create `src/lib/offers/commission.ts`:

```ts
export type CommissionInput = {
  /** Gross monthly delivery sales, in CAD. */
  monthlySales: number;
  /** Marketplace commission rate, in percent. */
  ratePct: number;
};

export type CommissionResult = {
  monthlyCommission: number;
  monthlyNet: number;
  yearlyCommission: number;
  yearlyNet: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));

export function computeCommission({
  monthlySales,
  ratePct,
}: CommissionInput): CommissionResult {
  const sales = clamp(monthlySales, 0, 1_000_000);
  const rate = clamp(ratePct, 0, 100) / 100;

  const monthlyCommission = Math.round(sales * rate);
  const monthlyNet = Math.round(sales) - monthlyCommission;

  return {
    monthlyCommission,
    monthlyNet,
    yearlyCommission: monthlyCommission * 12,
    yearlyNet: monthlyNet * 12,
  };
}

const cad = new Intl.NumberFormat('fr-CA', {
  style: 'currency',
  currency: 'CAD',
  maximumFractionDigits: 0,
});

/** Formats whole dollars the Québec way: `41 760 $`. */
export function formatCad(value: number): string {
  return cad.format(Math.round(value));
}
```

- [ ] **Step 4: Run the test again**

Run: `node --experimental-strip-types scripts/test-commission.mts`
Expected: an `ExperimentalWarning` about type stripping on stderr, then `commission: all assertions passed`

- [ ] **Step 5: Add the test to package.json**

In `package.json`, add this line to `"scripts"` after `"type-check"`:

```json
    "test:commission": "node --experimental-strip-types scripts/test-commission.mts",
```

- [ ] **Step 6: Verify the script alias and the type-checker**

```bash
npm run test:commission
npm run type-check
```

Expected: the passing message, then `type-check` exits 0.

- [ ] **Step 7: Commit**

```bash
git add scripts/test-commission.mts src/lib/offers/commission.ts package.json
git commit -m "feat(offers): add commission math with executable assertions"
```

---

## Task 4: The signature receipt

**Files:**
- Create: `src/components/offers/CommissionReceipt.tsx`

The sawtooth bottom edge is two 45° gradients tiled horizontally — no image, no SVG. The slider is a native `range` input so keyboard and screen-reader support come for free.

- [ ] **Step 1: Write the component**

Create `src/components/offers/CommissionReceipt.tsx`:

```tsx
'use client';

import { useId, useState } from 'react';
import { computeCommission, formatCad } from '@/lib/offers/commission';
import {
  DEFAULT_MONTHLY_SALES,
  MAX_MONTHLY_SALES,
  MIN_MONTHLY_SALES,
  MONO,
  PLATFORM_RATE_PCT,
  SALES_STEP,
  hero,
  offersTheme,
  receipt,
} from '@/data/offersData';

const tearEdge = {
  backgroundImage: `linear-gradient(45deg, transparent 50%, ${offersTheme.paper} 50%), linear-gradient(-45deg, transparent 50%, ${offersTheme.paper} 50%)`,
  backgroundSize: '14px 14px',
  backgroundRepeat: 'repeat-x',
  backgroundPosition: 'top left',
};

function Line({
  label,
  value,
  tone = 'base',
  strong = false,
}: {
  label: string;
  value: string;
  tone?: 'base' | 'loss';
  strong?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5">
      <span
        className={`text-[11px] uppercase tracking-[0.08em] ${
          strong ? 'text-[#0E2233]' : 'text-[#5c6a76]'
        }`}
      >
        {label}
      </span>
      <span
        className={`shrink-0 tabular-nums ${strong ? 'text-base font-semibold' : 'text-sm'}`}
        style={{ color: tone === 'loss' ? offersTheme.loss : offersTheme.ink }}
      >
        {value}
      </span>
    </div>
  );
}

export default function CommissionReceipt() {
  const [monthlySales, setMonthlySales] = useState(DEFAULT_MONTHLY_SALES);
  const sliderId = useId();
  const result = computeCommission({
    monthlySales,
    ratePct: PLATFORM_RATE_PCT,
  });

  return (
    <div className="w-full max-w-[380px]" style={{ fontFamily: MONO }}>
      {/* Receipt */}
      <div
        className="relative px-6 pb-6 pt-7 shadow-[0_28px_60px_-24px_rgba(0,0,0,0.55)]"
        style={{ background: offersTheme.paper }}
      >
        <p className="text-center text-[10px] uppercase tracking-[0.32em] text-[#5c6a76]">
          {receipt.storeLine}
        </p>
        <p className="mt-3 text-center text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0E2233]">
          {receipt.header}
        </p>

        <div
          className="my-4 h-px w-full"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, #0E2233 0 6px, transparent 6px 12px)',
          }}
        />

        <div aria-live="polite">
          <Line label={receipt.rowSales} value={formatCad(monthlySales)} />
          <Line
            label={receipt.rowRate}
            value={`− ${formatCad(result.monthlyCommission)}`}
            tone="loss"
          />

          <div
            className="my-3 h-px w-full"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, #0E2233 0 6px, transparent 6px 12px)',
            }}
          />

          <Line label={receipt.rowNet} value={formatCad(result.monthlyNet)} strong />
          <Line
            label={receipt.rowYear}
            value={`− ${formatCad(result.yearlyCommission)}`}
            tone="loss"
            strong
          />
        </div>
      </div>
      <div className="h-[14px] w-full max-w-[380px]" style={tearEdge} aria-hidden />

      {/* Slider */}
      <div className="mt-7">
        <label
          htmlFor={sliderId}
          className="flex items-baseline justify-between gap-4 text-[11px] uppercase tracking-[0.12em] text-white/60"
        >
          {hero.sliderLabel}
          <span className="tabular-nums text-sm text-white">
            {formatCad(monthlySales)}
          </span>
        </label>
        <input
          id={sliderId}
          type="range"
          min={MIN_MONTHLY_SALES}
          max={MAX_MONTHLY_SALES}
          step={SALES_STEP}
          value={monthlySales}
          onChange={(e) => setMonthlySales(Number(e.target.value))}
          className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-[#00D4FF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00D4FF]"
        />
        <p className="mt-3 text-[11px] leading-relaxed text-white/40">
          {hero.rateNote}
        </p>
      </div>

      {/* Relief card */}
      <div className="mt-7 border border-white/10 bg-white/[0.04] p-5">
        <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">
          {receipt.keepTitle}
        </p>
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <span className="text-[11px] uppercase tracking-[0.08em] text-white/60">
            {receipt.keepRow}
          </span>
          <span
            className="text-lg font-semibold tabular-nums"
            style={{ color: offersTheme.cyan }}
          >
            {receipt.keepValue}
          </span>
        </div>
        <div className="mt-2 flex items-baseline justify-between gap-4">
          <span className="text-[11px] uppercase tracking-[0.08em] text-white/60">
            {receipt.keepYear}
          </span>
          <span className="text-lg font-semibold tabular-nums text-white">
            + {formatCad(result.yearlyCommission)}
          </span>
        </div>
        <p className="mt-4 text-[11px] leading-relaxed text-white/40">
          {receipt.keepNote}
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check and lint**

```bash
npm run type-check && npm run lint
```

Expected: both exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/offers/CommissionReceipt.tsx
git commit -m "feat(offers): add live commission receipt"
```

---

## Task 5: Hero

**Files:**
- Create: `src/components/offers/OffersHero.tsx`

- [ ] **Step 1: Write the component**

Create `src/components/offers/OffersHero.tsx`:

```tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import CommissionReceipt from './CommissionReceipt';
import { DISPLAY, MONO, hero, offersTheme } from '@/data/offersData';

export default function OffersHero() {
  const reduce = useReducedMotion();
  const rise = reduce
    ? {}
    : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } };

  return (
    <section
      className="relative overflow-hidden px-5 pb-24 pt-28 sm:px-8 lg:px-12"
      style={{ background: offersTheme.ink }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            {...rise}
            transition={{ duration: 0.6 }}
            className="text-[11px] uppercase tracking-[0.3em] text-white/45"
            style={{ fontFamily: MONO }}
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            {...rise}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-7 font-bold text-white"
            style={{
              fontFamily: DISPLAY,
              fontSize: 'clamp(2.1rem, 5.4vw, 4rem)',
              lineHeight: 1.04,
              letterSpacing: '-0.03em',
            }}
          >
            {hero.title}
            <br />
            <span style={{ color: offersTheme.loss }}>{hero.titleAccent}</span>
          </motion.h1>

          <motion.p
            {...rise}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-7 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg"
          >
            {hero.body}
          </motion.p>

          <motion.div
            {...rise}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#proposition"
              className="rounded-full px-8 py-4 text-sm font-semibold text-[#0E2233] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00D4FF]"
              style={{ background: offersTheme.cyan }}
            >
              {hero.ctaPrimary}
            </a>
            <a
              href="#inclus"
              className="rounded-full border border-white/20 px-8 py-4 text-sm font-medium text-white transition-colors duration-300 hover:border-white/45 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00D4FF]"
            >
              {hero.ctaSecondary}
            </a>
          </motion.div>
        </div>

        <motion.div
          {...(reduce
            ? {}
            : { initial: { opacity: 0, y: 32 }, animate: { opacity: 1, y: 0 } })}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center lg:justify-end"
        >
          <CommissionReceipt />
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check and lint**

```bash
npm run type-check && npm run lint
```

Expected: both exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/offers/OffersHero.tsx
git commit -m "feat(offers): add hero band"
```

---

## Task 6: Benchmark strip

**Files:**
- Create: `src/components/offers/BenchmarkStrip.tsx`

The disclaimer renders as visible body text under the images. It is a factual claim about who made these apps — it does not get hidden behind a hover or a tooltip.

- [ ] **Step 1: Write the component**

Create `src/components/offers/BenchmarkStrip.tsx`:

```tsx
import Image from 'next/image';
import { DISPLAY, MONO, benchmark, offersTheme } from '@/data/offersData';

export default function BenchmarkStrip() {
  return (
    <section className="bg-white px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <p
          className="text-[11px] uppercase tracking-[0.3em]"
          style={{ fontFamily: MONO, color: offersTheme.muted }}
        >
          {benchmark.eyebrow}
        </p>
        <h2
          className="mt-6 max-w-3xl font-bold"
          style={{
            fontFamily: DISPLAY,
            color: offersTheme.ink,
            fontSize: 'clamp(1.7rem, 3.6vw, 2.8rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {benchmark.title}
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#425466]">
          {benchmark.body}
        </p>

        <ul className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {benchmark.apps.map((app) => (
            <li key={app.name}>
              <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-2xl bg-[#f2f4f6] ring-1 ring-black/5">
                <Image
                  src={app.image}
                  alt={`Fiche App Store de l'application ${app.name}`}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
                  className="object-cover object-top"
                />
              </div>
              <p
                className="mt-3 text-[11px] uppercase tracking-[0.1em]"
                style={{ fontFamily: MONO, color: offersTheme.muted }}
              >
                {app.name}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-2xl border-l-2 border-black/10 pl-4 text-xs leading-relaxed text-[#6b7683]">
          {benchmark.disclaimer}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check and lint**

```bash
npm run type-check && npm run lint
```

Expected: both exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/offers/BenchmarkStrip.tsx
git commit -m "feat(offers): add market benchmark strip with attribution notice"
```

---

## Task 7: App spec section

**Files:**
- Create: `src/components/offers/AppSpecSection.tsx`

- [ ] **Step 1: Write the component**

Create `src/components/offers/AppSpecSection.tsx`:

```tsx
import { DISPLAY, MONO, appSpec, offersTheme } from '@/data/offersData';

export default function AppSpecSection() {
  return (
    <section className="bg-[#f7f8f9] px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <p
          className="text-[11px] uppercase tracking-[0.3em]"
          style={{ fontFamily: MONO, color: offersTheme.muted }}
        >
          {appSpec.eyebrow}
        </p>
        <h2
          className="mt-6 max-w-3xl font-bold"
          style={{
            fontFamily: DISPLAY,
            color: offersTheme.ink,
            fontSize: 'clamp(1.7rem, 3.6vw, 2.8rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {appSpec.title}
        </h2>

        <dl className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {appSpec.features.map((feature) => (
            <div key={feature.label} className="border-t border-black/10 pt-6">
              <dt
                className="text-sm font-semibold uppercase tracking-[0.08em]"
                style={{ color: offersTheme.ink }}
              >
                {feature.label}
              </dt>
              <dd className="mt-3 text-base leading-relaxed text-[#425466]">
                {feature.body}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check and lint**

```bash
npm run type-check && npm run lint
```

Expected: both exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/offers/AppSpecSection.tsx
git commit -m "feat(offers): add app capability section"
```

---

## Task 8: Dashboard section

**Files:**
- Create: `src/components/offers/DashboardSection.tsx`

Reuses `LaptopFrame` from the portfolio. It is imported without `onOpen`, which disables its zoom button — no lightbox coupling. `LaptopFrame` pulls in framer-motion, so this section is a client component.

- [ ] **Step 1: Write the component**

Create `src/components/offers/DashboardSection.tsx`:

```tsx
'use client';

import LaptopFrame from '@/components/portfolio/LaptopFrame';
import { DISPLAY, MONO, dashboard, offersTheme } from '@/data/offersData';

export default function DashboardSection() {
  return (
    <section
      className="px-5 py-24 sm:px-8 lg:px-12"
      style={{ background: offersTheme.steel }}
    >
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p
            className="text-[11px] uppercase tracking-[0.3em] text-white/45"
            style={{ fontFamily: MONO }}
          >
            {dashboard.eyebrow}
          </p>
          <h2
            className="mt-6 font-bold text-white"
            style={{
              fontFamily: DISPLAY,
              fontSize: 'clamp(1.7rem, 3.4vw, 2.6rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {dashboard.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/65">
            {dashboard.body}
          </p>
          <ul className="mt-8 space-y-3">
            {dashboard.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-sm text-white/75">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: offersTheme.cyan }}
                />
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          {dashboard.shots.map((shot) => (
            <LaptopFrame
              key={shot.src}
              media={{ kind: 'image', src: shot.src }}
              alt={shot.alt}
            />
          ))}
          <p className="text-[11px] leading-relaxed text-white/40">
            {dashboard.caption}
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check and lint**

```bash
npm run type-check && npm run lint
```

Expected: both exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/offers/DashboardSection.tsx
git commit -m "feat(offers): add back-office section with mockup caption"
```

---

## Task 9: Inclusions table

**Files:**
- Create: `src/components/offers/InclusionsTable.tsx`

- [ ] **Step 1: Write the component**

Create `src/components/offers/InclusionsTable.tsx`:

```tsx
import { DISPLAY, MONO, inclusions, offersTheme } from '@/data/offersData';

export default function InclusionsTable() {
  return (
    <section id="inclus" className="scroll-mt-24 bg-white px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <p
          className="text-[11px] uppercase tracking-[0.3em]"
          style={{ fontFamily: MONO, color: offersTheme.muted }}
        >
          {inclusions.eyebrow}
        </p>
        <h2
          className="mt-6 font-bold"
          style={{
            fontFamily: DISPLAY,
            color: offersTheme.ink,
            fontSize: 'clamp(1.7rem, 3.6vw, 2.8rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {inclusions.title}
        </h2>

        <ul className="mt-14 border-t border-black/10">
          {inclusions.rows.map((row) => (
            <li
              key={row.code}
              className="grid gap-2 border-b border-black/10 py-6 sm:grid-cols-[72px_1fr_1.1fr] sm:gap-8"
            >
              <span
                className="text-[11px] uppercase tracking-[0.18em]"
                style={{ fontFamily: MONO, color: offersTheme.cyan }}
              >
                {row.code}
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: offersTheme.ink }}
              >
                {row.label}
              </span>
              <span className="text-sm leading-relaxed text-[#5c6a76]">
                {row.detail}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

Note: `offersTheme.cyan` on white fails contrast for body text, which is why the code column is a short uppercase label paired with the adjacent full label, never the only carrier of meaning. Keep it that way.

- [ ] **Step 2: Type-check and lint**

```bash
npm run type-check && npm run lint
```

Expected: both exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/offers/InclusionsTable.tsx
git commit -m "feat(offers): add inclusions spec table"
```

---

## Task 10: Process timeline

**Files:**
- Create: `src/components/offers/ProcessTimeline.tsx`

- [ ] **Step 1: Write the component**

Create `src/components/offers/ProcessTimeline.tsx`:

```tsx
import { DISPLAY, MONO, offersTheme, process } from '@/data/offersData';

export default function ProcessTimeline() {
  return (
    <section className="bg-[#f7f8f9] px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <p
          className="text-[11px] uppercase tracking-[0.3em]"
          style={{ fontFamily: MONO, color: offersTheme.muted }}
        >
          {process.eyebrow}
        </p>
        <h2
          className="mt-6 font-bold"
          style={{
            fontFamily: DISPLAY,
            color: offersTheme.ink,
            fontSize: 'clamp(2rem, 5vw, 3.4rem)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}
        >
          {process.title}
        </h2>

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {process.phases.map((phase) => (
            <li key={phase.label} className="border-t-2 border-[#0E2233] pt-5">
              <p
                className="text-[11px] uppercase tracking-[0.16em]"
                style={{ fontFamily: MONO, color: offersTheme.muted }}
              >
                {phase.when}
              </p>
              <p
                className="mt-3 text-lg font-semibold"
                style={{ color: offersTheme.ink }}
              >
                {phase.label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#5c6a76]">
                {phase.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check and lint**

```bash
npm run type-check && npm run lint
```

Expected: both exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/offers/ProcessTimeline.tsx
git commit -m "feat(offers): add delivery timeline"
```

---

## Task 11: FAQ accordion

**Files:**
- Create: `src/components/offers/FaqSection.tsx`

- [ ] **Step 1: Write the component**

Create `src/components/offers/FaqSection.tsx`:

```tsx
'use client';

import { useId, useState } from 'react';
import { DISPLAY, MONO, faq, offersTheme } from '@/data/offersData';

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="bg-white px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <p
          className="text-[11px] uppercase tracking-[0.3em]"
          style={{ fontFamily: MONO, color: offersTheme.muted }}
        >
          {faq.eyebrow}
        </p>
        <h2
          className="mt-6 font-bold"
          style={{
            fontFamily: DISPLAY,
            color: offersTheme.ink,
            fontSize: 'clamp(1.7rem, 3.6vw, 2.6rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {faq.title}
        </h2>

        <div className="mt-12 border-t border-black/10">
          {faq.items.map((item, index) => {
            const expanded = open === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;

            return (
              <div key={item.q} className="border-b border-black/10">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? null : index)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E2233]"
                  >
                    <span
                      className="text-base font-semibold"
                      style={{ color: offersTheme.ink }}
                    >
                      {item.q}
                    </span>
                    <span
                      aria-hidden
                      className="shrink-0 text-xl leading-none transition-transform duration-300"
                      style={{
                        color: offersTheme.muted,
                        transform: expanded ? 'rotate(45deg)' : 'none',
                      }}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!expanded}
                  className="pb-6 pr-10 text-sm leading-relaxed text-[#5c6a76]"
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check and lint**

```bash
npm run type-check && npm run lint
```

Expected: both exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/offers/FaqSection.tsx
git commit -m "feat(offers): add FAQ accordion"
```

---

## Task 12: Lead email sender and `/api/offers`

**Files:**
- Create: `src/lib/email/sendLeadEmail.ts`
- Create: `src/app/api/offers/route.ts`

`src/app/api/contact/route.ts` keeps its own inline sender. It works, it is in production, and refactoring it is not part of this feature — the new module exists so the offers route does not copy 60 lines of transport logic, and `/api/contact` can migrate to it later in a dedicated change.

- [ ] **Step 1: Write the sender**

Create `src/lib/email/sendLeadEmail.ts`:

```ts
import nodemailer from 'nodemailer';

export type LeadEmail = {
  subject: string;
  html: string;
  replyTo?: string;
};

/** Returns the list of missing env vars, or an empty array when sending is possible. */
export function missingMailConfig(): string[] {
  const missing: string[] = [];
  if (!process.env.CONTACT_EMAIL) missing.push('CONTACT_EMAIL');

  const hasResend = !!process.env.RESEND_API_KEY;
  const hasSmtp = !!(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.SMTP_FROM
  );
  if (!hasResend && !hasSmtp) {
    missing.push('RESEND_API_KEY (or SMTP_HOST/USER/PASS/FROM)');
  }
  return missing;
}

async function sendViaResend({ subject, html, replyTo }: LeadEmail) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  if (!apiKey || !to) return false;

  const from = process.env.SMTP_FROM || 'no-reply@progix.pro';
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `PROGIX <${from}>`,
      to: [to],
      ...(replyTo ? { reply_to: replyTo } : {}),
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Resend error ${res.status}: ${detail}`);
  }
  return true;
}

async function sendViaSmtp({ subject, html, replyTo }: LeadEmail) {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const configuredFrom = process.env.SMTP_FROM;
  const to = process.env.CONTACT_EMAIL;

  if (!host || !user || !pass || !configuredFrom || !to) {
    throw new Error('SMTP configuration incomplete');
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  });

  await transporter.verify();

  // Gmail rejects a From that is not the authenticated mailbox.
  const useGmailSafeFrom = /gmail\.com$/i.test(user) || /smtp\.gmail\.com$/i.test(host);

  await transporter.sendMail({
    from: useGmailSafeFrom ? user : configuredFrom,
    to,
    ...(replyTo ? { replyTo } : {}),
    subject,
    html,
  });
}

/** Sends through Resend when available, falling back to SMTP. Throws on total failure. */
export async function sendLeadEmail(email: LeadEmail): Promise<void> {
  if (process.env.RESEND_API_KEY) {
    try {
      if (await sendViaResend(email)) return;
    } catch {
      // fall through to SMTP
    }
  }
  await sendViaSmtp(email);
}
```

- [ ] **Step 2: Write the route**

Create `src/app/api/offers/route.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server';
import { missingMailConfig, sendLeadEmail } from '@/lib/email/sendLeadEmail';

export const runtime = 'nodejs';

const safe = (v: unknown) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const safeNl = (v: unknown) => safe(v).replace(/\n/g, '<br>');

const row = (key: string, val: string) => `
  <tr>
    <td style="padding:13px 0;border-bottom:1px solid #e9edf2;color:#8a94a3;font-size:11px;width:190px;vertical-align:top;letter-spacing:0.08em;text-transform:uppercase;font-weight:600">${key}</td>
    <td style="padding:13px 0;border-bottom:1px solid #e9edf2;color:#0d2235;font-size:14px;vertical-align:top;font-weight:500">${val || '<span style="color:#b6bdc7">—</span>'}</td>
  </tr>`;

const LOCATIONS: Record<string, string> = {
  '1': '1 établissement',
  '2-5': '2 à 5 établissements',
  '6-20': '6 à 20 établissements',
  '20+': 'Plus de 20 établissements',
};

const SALES: Record<string, string> = {
  '<5k': 'Moins de 5 000 $ / mois',
  '5k-15k': '5 000 $ à 15 000 $ / mois',
  '15k-40k': '15 000 $ à 40 000 $ / mois',
  '40k+': 'Plus de 40 000 $ / mois',
  none: 'Pas encore de livraison',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, restaurant, city, locations, monthlySales, phone, email, message } = body;

    const required: Record<string, unknown> = {
      name,
      restaurant,
      locations,
      monthlySales,
      phone,
      email,
    };
    const missingFields = Object.entries(required)
      .filter(([, v]) => !String(v ?? '').trim())
      .map(([k]) => k);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'validation_failed',
          message: 'Veuillez remplir tous les champs obligatoires.',
          details: `Missing: ${missingFields.join(', ')}`,
        },
        { status: 400 },
      );
    }

    const leadEmail = String(email).trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadEmail)) {
      return NextResponse.json(
        {
          success: false,
          error: 'validation_failed',
          message: 'Veuillez entrer un courriel valide.',
        },
        { status: 400 },
      );
    }

    const missingConfig = missingMailConfig();
    if (missingConfig.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'missing_config',
          message: 'Server configuration incomplete',
          details: `Missing: ${missingConfig.join(', ')}`,
        },
        { status: 500 },
      );
    }

    const dateStr = new Date().toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#eef1f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef1f5;padding:32px 12px">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
      <tr>
        <td style="background:#0d2235;border-radius:8px 8px 0 0;padding:36px 40px">
          <p style="margin:0 0 18px;font-size:13px;font-weight:800;letter-spacing:0.32em;color:#ffffff">PROGIX</p>
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td width="34" height="2" style="background:#00d4ff;font-size:0;line-height:0">&nbsp;</td>
            <td style="padding-left:10px;font-size:10px;font-weight:700;letter-spacing:0.26em;text-transform:uppercase;color:#00d4ff">/ Offre restaurants</td>
          </tr></table>
          <h1 style="margin:16px 0 6px;font-size:28px;font-weight:800;letter-spacing:-0.02em;color:#ffffff;line-height:1.2">${safe(restaurant)}</h1>
          <p style="margin:0 0 14px;font-size:12px;color:rgba(255,255,255,0.55)">Reçue le ${dateStr} via progix.pro/offers</p>
          <p style="margin:0;font-size:14px">
            <a href="mailto:${safe(leadEmail)}" style="color:#00d4ff;text-decoration:none;font-weight:600">${safe(leadEmail)}</a>
            <span style="color:rgba(255,255,255,0.35)">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
            <a href="tel:${safe(String(phone).replace(/[^+\d]/g, ''))}" style="color:#ffffff;text-decoration:none">${safe(phone)}</a>
          </p>
        </td>
      </tr>
      <tr>
        <td style="background:#ffffff;padding:26px 40px 8px">
          <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#0093b8">Profil du restaurant</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
            ${row('Contact', safe(name))}
            ${row('Restaurant', safe(restaurant))}
            ${row('Ville', safe(city))}
            ${row('Établissements', safe(LOCATIONS[String(locations)] || locations))}
            ${row('Ventes livraison', safe(SALES[String(monthlySales)] || monthlySales))}
          </table>
        </td>
      </tr>
      ${
        String(message ?? '').trim()
          ? `<tr>
        <td style="background:#ffffff;padding:26px 40px 14px">
          <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#0093b8">Précisions</p>
          <p style="margin:0;font-size:14px;line-height:1.7;color:#3a4654">${safeNl(message)}</p>
        </td>
      </tr>`
          : ''
      }
      <tr>
        <td style="background:#0d2235;border-radius:0 0 8px 8px;padding:20px 40px">
          <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.45)">PROGIX — Développement web, mobile et conseil IT à Montréal &nbsp;·&nbsp; <a href="https://www.progix.pro" style="color:#00d4ff;text-decoration:none">progix.pro</a></p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body></html>`;

    await sendLeadEmail({
      subject: `Offre restaurants — ${safe(restaurant) || 'Sans nom'}`,
      html,
      replyTo: leadEmail,
    });

    return NextResponse.json({ success: true, message: 'Submitted successfully' });
  } catch (error) {
    const details = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      {
        success: false,
        error: 'submission_failed',
        message: 'Failed to submit',
        details,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
```

- [ ] **Step 3: Test validation against the running dev server**

```bash
npm run dev
```

In a second terminal — an empty body must be rejected before any mail work:

```bash
curl -s -X POST http://localhost:3000/api/offers \
  -H "Content-Type: application/json" -d '{}'
```

Expected JSON containing `"error":"validation_failed"` and `Missing: name, restaurant, locations, monthlySales, phone, email`

A bad email must be rejected:

```bash
curl -s -X POST http://localhost:3000/api/offers -H "Content-Type: application/json" \
  -d '{"name":"A","restaurant":"B","locations":"1","monthlySales":"<5k","phone":"514","email":"nope"}'
```

Expected: `"message":"Veuillez entrer un courriel valide."`

A complete payload must get past validation:

```bash
curl -s -X POST http://localhost:3000/api/offers -H "Content-Type: application/json" \
  -d '{"name":"Alex","restaurant":"Chez Alex","city":"Montréal","locations":"1","monthlySales":"5k-15k","phone":"514-555-0100","email":"alex@example.com","message":"Test"}'
```

Expected: `{"success":true,...}` when mail env vars are set locally, or `"error":"missing_config"` when they are not. **`validation_failed` here means the route is broken — fix it before moving on.**

- [ ] **Step 4: Type-check and lint**

```bash
npm run type-check && npm run lint
```

Expected: both exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/lib/email/sendLeadEmail.ts src/app/api/offers/route.ts
git commit -m "feat(offers): add restaurant lead endpoint and shared mail sender"
```

---

## Task 13: Lead form

**Files:**
- Create: `src/components/offers/OfferLeadForm.tsx`

- [ ] **Step 1: Write the component**

Create `src/components/offers/OfferLeadForm.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { DISPLAY, MONO, leadForm, offersTheme } from '@/data/offersData';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const FIELD_CLASS =
  'w-full border border-white/15 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-[#00D4FF] focus:outline-none';

const LABEL_CLASS =
  'block text-[11px] uppercase tracking-[0.14em] text-white/50 mb-2';

export default function OfferLeadForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    const data = Object.fromEntries(new FormData(event.currentTarget).entries());

    try {
      const res = await fetch('/api/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const payload = await res.json().catch(() => ({}));

      if (!res.ok || !payload.success) {
        setErrorMessage(payload.message || leadForm.errorGeneric);
        setStatus('error');
        return;
      }
      setStatus('sent');
    } catch {
      setErrorMessage(leadForm.errorGeneric);
      setStatus('error');
    }
  }

  return (
    <section
      id="proposition"
      className="scroll-mt-24 px-5 py-24 sm:px-8 lg:px-12"
      style={{ background: offersTheme.ink }}
    >
      <div className="mx-auto max-w-3xl">
        <p
          className="text-[11px] uppercase tracking-[0.3em] text-white/45"
          style={{ fontFamily: MONO }}
        >
          {leadForm.eyebrow}
        </p>
        <h2
          className="mt-6 font-bold text-white"
          style={{
            fontFamily: DISPLAY,
            fontSize: 'clamp(1.7rem, 3.6vw, 2.6rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {leadForm.title}
        </h2>
        <p className="mt-5 text-base leading-relaxed text-white/60">
          {leadForm.body}
        </p>

        {status === 'sent' ? (
          <p
            role="status"
            className="mt-12 border border-[#00D4FF]/40 bg-[#00D4FF]/10 px-6 py-8 text-base text-white"
          >
            {leadForm.success}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 grid gap-6 sm:grid-cols-2">
            <div>
              <label className={LABEL_CLASS} htmlFor="of-name">
                {leadForm.fields.name}
              </label>
              <input id="of-name" name="name" required className={FIELD_CLASS} />
            </div>

            <div>
              <label className={LABEL_CLASS} htmlFor="of-restaurant">
                {leadForm.fields.restaurant}
              </label>
              <input
                id="of-restaurant"
                name="restaurant"
                required
                className={FIELD_CLASS}
              />
            </div>

            <div>
              <label className={LABEL_CLASS} htmlFor="of-city">
                {leadForm.fields.city}
              </label>
              <input id="of-city" name="city" className={FIELD_CLASS} />
            </div>

            <div>
              <label className={LABEL_CLASS} htmlFor="of-locations">
                {leadForm.fields.locations}
              </label>
              <select
                id="of-locations"
                name="locations"
                required
                defaultValue=""
                className={FIELD_CLASS}
              >
                <option value="" disabled>
                  Choisir
                </option>
                {leadForm.locationOptions.map((option) => (
                  <option key={option.value} value={option.value} className="text-black">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className={LABEL_CLASS} htmlFor="of-sales">
                {leadForm.fields.monthlySales}
              </label>
              <select
                id="of-sales"
                name="monthlySales"
                required
                defaultValue=""
                className={FIELD_CLASS}
              >
                <option value="" disabled>
                  Choisir
                </option>
                {leadForm.salesOptions.map((option) => (
                  <option key={option.value} value={option.value} className="text-black">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={LABEL_CLASS} htmlFor="of-phone">
                {leadForm.fields.phone}
              </label>
              <input
                id="of-phone"
                name="phone"
                type="tel"
                required
                className={FIELD_CLASS}
              />
            </div>

            <div>
              <label className={LABEL_CLASS} htmlFor="of-email">
                {leadForm.fields.email}
              </label>
              <input
                id="of-email"
                name="email"
                type="email"
                required
                className={FIELD_CLASS}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={LABEL_CLASS} htmlFor="of-message">
                {leadForm.fields.message}
              </label>
              <textarea
                id="of-message"
                name="message"
                rows={4}
                className={`${FIELD_CLASS} resize-y`}
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full rounded-full px-8 py-4 text-sm font-semibold text-[#0E2233] transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                style={{ background: offersTheme.cyan }}
              >
                {status === 'sending' ? leadForm.sending : leadForm.submit}
              </button>

              <p role="alert" aria-live="polite" className="mt-4 text-sm text-[#E4572E]">
                {status === 'error' ? errorMessage : ''}
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check and lint**

```bash
npm run type-check && npm run lint
```

Expected: both exit 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/offers/OfferLeadForm.tsx
git commit -m "feat(offers): add restaurant lead form"
```

---

## Task 14: Sticky CTA and page assembly

**Files:**
- Create: `src/components/offers/StickyCta.tsx`
- Create (overwrites the Task 1 probe): `src/app/offers/page.tsx`
- Modify: `src/app/globals.css`

The page deliberately does not render `GlobalMenu`: while the rest of the site is closed, every menu link would land on the maintenance screen. The hero CTA and the sticky bar are the only navigation.

- [ ] **Step 1: Write the sticky bar**

Create `src/components/offers/StickyCta.tsx`:

```tsx
'use client';

import { useEffect, useState } from 'react';
import { MONO, offersTheme, stickyCta } from '@/data/offersData';

export default function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/10 px-4 py-3 transition-transform duration-300 lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ background: offersTheme.ink }}
    >
      <div className="flex items-center justify-between gap-4">
        <span
          className="text-[10px] uppercase leading-tight tracking-[0.14em] text-white/50"
          style={{ fontFamily: MONO }}
        >
          {stickyCta.label}
        </span>
        <a
          href="#proposition"
          className="shrink-0 rounded-full px-5 py-3 text-xs font-semibold text-[#0E2233]"
          style={{ background: offersTheme.cyan }}
        >
          {stickyCta.button}
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Write the page**

Create `src/app/offers/page.tsx`, replacing the probe file from Task 1:

```tsx
import type { Metadata } from 'next';
import Footer from '@/components/layout/Footer';
import AppSpecSection from '@/components/offers/AppSpecSection';
import BenchmarkStrip from '@/components/offers/BenchmarkStrip';
import DashboardSection from '@/components/offers/DashboardSection';
import FaqSection from '@/components/offers/FaqSection';
import InclusionsTable from '@/components/offers/InclusionsTable';
import OfferLeadForm from '@/components/offers/OfferLeadForm';
import OffersHero from '@/components/offers/OffersHero';
import ProcessTimeline from '@/components/offers/ProcessTimeline';
import StickyCta from '@/components/offers/StickyCta';

export const metadata: Metadata = {
  title: 'Application de commande pour restaurants',
  description:
    "Arrêtez de verser 29 % de vos livraisons aux plateformes. PROGIX livre l'application de commande de votre restaurant et son back-office en 4 à 6 semaines.",
  alternates: { canonical: '/offers' },
  openGraph: {
    type: 'website',
    url: 'https://www.progix.pro/offers',
    siteName: 'PROGIX',
    locale: 'fr_CA',
    title: 'Application de commande pour restaurants — PROGIX',
    description:
      "Votre application, votre back-office, zéro commission de plateforme. En ligne en 4 à 6 semaines.",
  },
};

export default function OffersPage() {
  return (
    <main className="offers-page overflow-x-hidden">
      <OffersHero />
      <BenchmarkStrip />
      <AppSpecSection />
      <DashboardSection />
      <InclusionsTable />
      <ProcessTimeline />
      <FaqSection />
      <OfferLeadForm />
      <Footer />
      <StickyCta />
    </main>
  );
}
```

- [ ] **Step 3: Respect reduced motion**

Append to `src/app/globals.css`:

```css
/* Offers page: honour the OS "reduce motion" setting for every transition. */
@media (prefers-reduced-motion: reduce) {
  .offers-page *,
  .offers-page *::before,
  .offers-page *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 4: Verify the page renders end to end**

```bash
npm run dev
```

```bash
curl -s http://localhost:3000/offers | grep -c "Les plateformes encaissent"
curl -s http://localhost:3000/offers | grep -c "ce ne sont pas des réalisations PROGIX"
curl -s http://localhost:3000/ | grep -c "En maintenance"
```

Expected: `1`, `1`, `1` — the offer page is open, the disclaimer is in the HTML, the rest of the site is still closed.

Then open `http://localhost:3000/offers` in a browser and confirm:
- dragging the slider reprints the receipt figures and the annual loss
- the receipt's bottom edge shows sawtooth teeth
- at ≤640 px width nothing scrolls horizontally and the sticky bar appears after scrolling
- Tab reaches the slider, both hero CTAs, every FAQ button and every form field with a visible focus ring

- [ ] **Step 5: Commit**

```bash
git add src/components/offers/StickyCta.tsx src/app/offers/page.tsx src/app/globals.css
git commit -m "feat(offers): assemble /offers page"
```

---

## Task 15: Discoverability

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `src/components/GlobalMenu.tsx`

- [ ] **Step 1: Add the route to the sitemap**

In `src/app/sitemap.ts`, change the `staticRoutes` path array to include `/offers`:

```ts
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/offers',
    '/services',
    '/team',
    '/portfolio',
    '/blog',
    '/contact',
    '/nos-valeurs',
  ].map((path) => ({
```

- [ ] **Step 2: Add the menu entry**

In `src/components/GlobalMenu.tsx`, find the nav items array — the entry `{ label: 'Accueil', ariaLabel: "Aller à la page d'accueil", link: '/' }` is on line 181. Insert directly after it:

```tsx
    {
      label: 'Offre restaurants',
      ariaLabel: "Découvrir l'offre application pour restaurants",
      link: '/offers',
    },
```

- [ ] **Step 3: Verify**

```bash
npm run dev
curl -s http://localhost:3000/sitemap.xml | grep -c "progix.pro/offers"
```

Expected: `1`

```bash
npm run type-check && npm run lint
```

Expected: both exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.ts src/components/GlobalMenu.tsx
git commit -m "feat(offers): list /offers in sitemap and global menu"
```

---

## Task 16: Full verification

- [ ] **Step 1: Run every check**

```bash
npm run test:commission
npm run type-check
npm run lint
npm run build
```

Expected: assertions pass, `type-check` and `lint` exit 0, `next build` completes. In the build route table, confirm `/offers` and `/api/offers` are both listed.

Note: `next.config.ts` sets `typescript.ignoreBuildErrors: true`, so a green `build` does **not** imply a green `type-check`. Both must be run.

- [ ] **Step 2: Verify the production build serves the right things**

```bash
npm run start
```

```bash
curl -s http://localhost:3000/offers | grep -c "Recevoir une proposition"
curl -s http://localhost:3000/ | grep -c "En maintenance"
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:3000/api/offers \
  -H "Content-Type: application/json" -d '{}'
```

Expected: `1`, `1`, `400`

- [ ] **Step 3: Confirm the images resolve**

```bash
ls public/images/offers
```

Expected: the 7 filenames from the Assets section. If any are missing, the page still builds — report exactly which ones are absent rather than substituting placeholder art.

- [ ] **Step 4: Commit any remaining changes**

```bash
git status --short
git add -A
git commit -m "chore(offers): final verification pass"
```

---

## Deferred, on purpose

- `src/app/api/contact/route.ts` still has its own inline mail transport. Migrating it onto `src/lib/email/sendLeadEmail.ts` is a separate, low-risk change once `/api/offers` has run in production for a while.
- The hero slider value does not prefill the form's `monthlySales` select. Wiring it would need shared state across two sections for a marginal gain — revisit if the form's drop-off rate says it matters.
- Reopening the site is one edit: `MAINTENANCE_MODE = false` in `src/app/(site)/layout.tsx`, plus removing the stale `MAINTENANCE_MODE` env var in the Vercel project settings.
