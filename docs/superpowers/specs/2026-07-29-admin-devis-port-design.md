# Spec — Port Admin Dashboard + Devis Client Portal from ProgixLandingPage

- **Status:** draft
- **Type:** feature (port of existing, already-shipped functionality)
- **Requested by / owner:** User / Product Owner
- **Date:** 2026-07-29
- **Source:** `ProgixLandingPage` (github `ProgixDev/progix-landing`), commits from 2026-07-28
- **Slice / areas touched:** `src/core`, `src/lib/supabase`, `src/features/site-gate`, `src/features/devis`, `src/app/admin/**`, `src/app/devis/**`, `supabase/migrations` (docs only), `.env.example`, `.env.local`, `package.json`

## Problem (the why)

`ProgixLandingPage` and this repo (`Progix`, package name `projix`) are two separate codebases — different GitHub remotes (`progix-landing` vs `progix_1`), different architecture conventions, no shared history. Yesterday (2026-07-28), the admin dashboard (`/admin/devis`) and the dynamic client estimate portal (`/devis/[client]`) were built and shipped in `ProgixLandingPage`, backed by a new Supabase project (auth, Postgres + RLS). That functionality does not exist in `Progix` yet. The two routes need to exist here too, reading and writing the same data.

## Desired behavior (the what)

Same product behavior as `ProgixLandingPage`'s specs 003 and 004, running inside `Progix`:

1. **Admin dashboard** (`/admin/login`, `/admin/devis`, `/admin/devis/[slug]`): authenticate via Supabase Auth, list client estimates, create/edit one via a French-language form (identity, hero, prestations, investissement line items, payment schedule — monthly or 3-installment).
2. **Client portal** (`/devis/[client]` + `/cahier-des-charges`, `/calendrier`, `/contrat`): password-gated (`SiteGate`, per-client `access_code` from Supabase, env var fallback), renders the four document tabs from Supabase data, gates the PDF download button behind a completed signature.
3. Both apps operate against the **same Supabase project** — an estimate created/edited in either app's admin is visible in both.

## Decisions (resolved before this doc was written)

| Decision | Choice | Why |
|---|---|---|
| Supabase project | Share `ProgixLandingPage`'s project; copy env vars (don't move) | Same live Karima data and admin account in both apps; `ProgixLandingPage` keeps working unaffected |
| Code architecture | Faithful port of `src/features/*` + `src/core/env*.ts` pattern, even though `Progix` currently uses `src/components` / `src/lib` / `src/data` | Lowest risk across ~8,200 lines of UI; rewriting to match existing conventions is effectively a from-scratch rewrite for no functional gain |
| Scope | Admin + devis + the backend plumbing they need only | The two routes are the ask; offers tweaks / brand-system doc / team portraits / reference PDF bundled into the same source commits are unrelated |

## Scope

### In scope — new files (faithful port, adapted only where paths must change)

- `src/core/env.ts`, `src/core/env.client.ts` — zod-validated env access (new pattern for this repo)
- `src/lib/supabase/client.ts`, `server.ts`, `admin.ts` — browser / server / service-role Supabase clients
- `src/features/site-gate/` — password-gate component (`index.ts`, `ui/site-gate.tsx`, `ui/site-gate.module.css`)
- `src/features/devis/` — `types.ts`, `actions.ts` (zod-validated server actions), `queries.ts`, `index.ts`, `ui/*.tsx`, `ui/*.css`, `ui/cinematic/*`
- `src/app/admin/layout.tsx`, `src/app/admin/_lib/auth.tsx` (+ `types.ts` for the `AdminUser` type), `src/app/admin/login/page.tsx`
- `src/app/admin/(dashboard)/layout.tsx`, `src/app/admin/(dashboard)/page.tsx` (redirects to `/admin/devis`, matching upstream's current de-scoped state), `src/app/admin/(dashboard)/devis/page.tsx`, `src/app/admin/(dashboard)/devis/[slug]/page.tsx`
- `src/app/devis/layout.tsx`, `src/app/devis/page.tsx`, `src/app/devis/[client]/layout.tsx`, `src/app/devis/[client]/page.tsx`, `src/app/devis/[client]/cahier-des-charges/page.tsx`, `src/app/devis/[client]/calendrier/page.tsx`, `src/app/devis/[client]/contrat/page.tsx`
- No new logo asset: `SiteGate` renders it via `assets.logo` (`@/config/assets`, → `/images/logo.png`), Progix's existing brand logo, instead of copying `progix-logo.png` from upstream
- `supabase/migrations/0001_security_baseline.sql`, `0002_profiles.sql`, `0005_client_estimates.sql`, `0006_seed_admin_and_karima.sql` — copied into this repo **for schema documentation and local-dev parity only**. They are **not re-run**: the shared Supabase project already has them applied.

### New dependencies

`zod`, `@supabase/supabase-js`, `@supabase/ssr`. Everything else the ported code needs (`motion`, `lenis`, `lucide-react`) is already in `Progix`'s `package.json`.

### Env vars

Add to `.env.example` (placeholders) and `.env.local` (real values, copied file-to-file — never pasted into chat):
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SITE_ACCESS_CODE`.

### Explicitly out of scope

- `leads` admin page and `src/app/admin/_lib/api.ts` (NestJS token client) — upstream already de-scoped/hid these yesterday in favor of Supabase-only auth; nothing in the ported code imports `api.ts`.
- `src/features/auth` (generic sign-in-form/guard/actions scaffold in `ProgixLandingPage`) — not imported by admin or devis; admin has its own self-contained auth context in `_lib/auth.tsx`.
- `supabase/migrations/0003_notes.sql`, `0004_subscriptions.sql` — unrelated scaffolding, confirmed zero references from devis/admin code.
- Root `proxy.ts` / Next middleware — upstream's matcher explicitly excludes `admin` and `devis` from it (i18n-only concern); not needed for this feature to function, and `Progix` has no i18n.
- `next-intl` / any `[locale]` routing — devis/admin live outside the locale tree upstream too.
- Offers component tweaks, `brand-system.src.html`, team portrait photos, the reference PDF — incidental to the same source commits, not part of this port.

## Acceptance criteria

Mirrors upstream specs 003/004, adapted to this repo:

- **AC-1:** Visiting `/admin/devis` without a session redirects to `/admin/login`; signing in with the shared Supabase admin account unlocks the dashboard.
- **AC-2:** The admin can create a new estimate (slug + access code + hero + prestations + investissement + payment schedule) and it persists to the shared Supabase project.
- **AC-3:** Visiting `/devis/karima` prompts `SiteGate`; the existing Karima access code unlocks it and renders her real, already-seeded data (proving both apps share the DB).
- **AC-4:** Visiting `/devis/<newly-created-slug>` with its access code unlocks and renders the dynamic project title, currency, and total amount just configured in admin.
- **AC-5:** In Section 05 of the Devis Contractuel, the 3-installment vs. monthly schedule renders per what was configured in admin.
- **AC-6:** In Section 09, the PDF download button stays disabled until name, date, and signature are complete.
- **AC-7 (non-happy path):** Wrong access code or an unknown slug shows an error/404 without leaking estimate contents.
- **AC-8:** `pnpm`/`npm` lint, typecheck, and build all pass; `appsec-reviewer` finds no unaddressed high-severity issues (diff touches server actions, auth, env/secrets).

## Out of scope (product-level, not just this port)

- Automated online payment processing, real-time collaborative editing, server-side PDF generation — same as upstream spec 004, still out of scope here.
- Reconciling the two repos' architecture conventions beyond this feature (no repo-wide refactor).
- Deciding the long-term relationship between `Progix` and `ProgixLandingPage` (which one is canonical, eventual retirement of one) — outside this task; revisit separately if needed.

## Open questions

- [ ] None — all decisions above were confirmed with the user before writing this doc.
