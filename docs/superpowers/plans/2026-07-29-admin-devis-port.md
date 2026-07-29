# Admin Dashboard + Devis Portal Port — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the `/admin/devis` dashboard and the `/devis/[client]` client-estimate portal — built 2026-07-28 in `ProgixLandingPage` — into this repo (`Progix`), reading/writing the same shared Supabase project.

**Architecture:** This is a **port of already-shipped, already-correct code**, not new design. Every source file lives at an exact, already-verified absolute path in `d:\Vs-code\ProgixLandingPage`. Bulk-copy tasks use a filesystem `cp`, never Read-then-Write — for files up to ~1,600 lines, retyping through a model risks silent transcription drift; a filesystem copy is byte-identical by construction. Where a file needs a real adjustment (not a verbatim copy), the task says so explicitly and shows the exact change. "Test" in this plan means: TypeScript compiles, ESLint is clean, the production build succeeds, and the app is exercised at the route level against the spec's acceptance criteria — matching how this feature was verified upstream (there is no unit-test harness for this document-UI code in either repo, and inventing one now would test nothing that isn't already covered by typecheck + build + manual/CUJ verification).

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, Supabase (`@supabase/ssr` + `@supabase/supabase-js`), zod.

**Reference:** [docs/superpowers/specs/2026-07-29-admin-devis-port-design.md](../specs/2026-07-29-admin-devis-port-design.md)

**Path convention used below:**
- `SRC` = `/d/Vs-code/ProgixLandingPage` (git-bash form of `d:\Vs-code\ProgixLandingPage`)
- `DST` = `/d/Vs-code/Progix` (git-bash form of `d:\Vs-code\Progix`, this repo)
- All shell commands below assume the Bash tool (git-bash), run from `DST` unless a `cd` is shown.

---

### Task 1: Dependencies + env schema

**Files:**
- Modify: `package.json`
- Create: `src/core/env.ts`
- Create: `src/core/env.client.ts`
- Modify: `.env.example`
- Modify: `.env.local` (gitignored, real secrets)

- [ ] **Step 1: Add the 4 new packages to `package.json`**

In the `"dependencies"` block, insert `@supabase/ssr` and `@supabase/supabase-js` alphabetically after `"@radix-ui/react-slot"` and before `"@tabler/icons-react"`:

```json
    "@radix-ui/react-slot": "^1.2.4",
    "@supabase/ssr": "^0.7.0",
    "@supabase/supabase-js": "^2.58.0",
    "@tabler/icons-react": "^3.35.0",
```

Insert `server-only` alphabetically after `"react-icons"` and add `"zod"` after `"tailwind-merge"` (the last existing entry):

```json
    "react-icons": "^5.5.0",
    "server-only": "^0.0.1",
    "tailwind-merge": "^3.3.1",
    "zod": "^4.4.3"
```

- [ ] **Step 2: Install**

Run: `npm install`
Expected: lockfile updates, no peer-dependency errors.

- [ ] **Step 3: Create `src/core/env.ts` (verbatim copy)**

Run:
```bash
mkdir -p "/d/Vs-code/Progix/src/core"
cp "/d/Vs-code/ProgixLandingPage/src/core/env.ts" "/d/Vs-code/Progix/src/core/env.ts"
```

- [ ] **Step 4: Create `src/core/env.client.ts` (verbatim copy)**

Run: `cp "/d/Vs-code/ProgixLandingPage/src/core/env.client.ts" "/d/Vs-code/Progix/src/core/env.client.ts"`

- [ ] **Step 5: Add the new vars to `.env.example`**

Append to the end of the file:

```
# --- Supabase (public: safe in the browser; RLS is the boundary) ---
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-or-publishable-key"

# --- Server-only secret (NEVER prefix NEXT_PUBLIC_) ---
# service_role bypasses RLS — used only in trusted server code (admin devis CRUD).
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Password gate for /devis/[client] (per-client access_code in Supabase overrides this default).
NEXT_PUBLIC_SITE_ACCESS_CODE="progix2026"
```

- [ ] **Step 6: Copy the real values into `.env.local`**

This copies secrets file-to-file. Do **not** `Read` or `cat` `.env.local` in a way that prints values — use redirection only, so nothing sensitive lands in a transcript.

Run:
```bash
grep -E '^(NEXT_PUBLIC_SUPABASE_URL|NEXT_PUBLIC_SUPABASE_ANON_KEY|SUPABASE_SERVICE_ROLE_KEY|NEXT_PUBLIC_SITE_ACCESS_CODE)=' "/d/Vs-code/ProgixLandingPage/.env.local" >> "/d/Vs-code/Progix/.env.local"
```
Expected: command prints nothing (output was redirected to the file). Do not run this with `cat` afterward.

- [ ] **Step 7: Typecheck**

Run: `npm run type-check`
Expected: passes (these two files have no other dependencies yet).

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json src/core/env.ts src/core/env.client.ts .env.example
git commit -m "feat(env): add Supabase env schema and dependencies for admin/devis port"
```
(`.env.local` is gitignored — nothing to add there.)

---

### Task 2: Supabase client helpers + shared motion provider

**Files:**
- Create: `src/lib/supabase/client.ts`
- Create: `src/lib/supabase/server.ts`
- Create: `src/lib/supabase/admin.ts`
- Create: `src/components/motion.tsx`

- [ ] **Step 1: Copy the three Supabase client helpers verbatim**

```bash
mkdir -p "/d/Vs-code/Progix/src/lib/supabase"
cp "/d/Vs-code/ProgixLandingPage/src/lib/supabase/client.ts" "/d/Vs-code/Progix/src/lib/supabase/client.ts"
cp "/d/Vs-code/ProgixLandingPage/src/lib/supabase/server.ts" "/d/Vs-code/Progix/src/lib/supabase/server.ts"
cp "/d/Vs-code/ProgixLandingPage/src/lib/supabase/admin.ts" "/d/Vs-code/Progix/src/lib/supabase/admin.ts"
```

- [ ] **Step 2: Copy the shared motion provider verbatim**

`src/app/devis/layout.tsx` (Task 6) wraps its children in `MotionProvider` from this file — it's a generic `LazyMotion` wrapper, not devis-specific, so it belongs in `src/components/`, not the feature slice.

```bash
cp "/d/Vs-code/ProgixLandingPage/src/components/motion.tsx" "/d/Vs-code/Progix/src/components/motion.tsx"
```

- [ ] **Step 3: Typecheck**

Run: `npm run type-check`
Expected: passes. (`src/lib/utils.ts` — the `cn()` helper both `client.ts`/`server.ts` transitively expect via other files — already exists in this repo with identical behavior; nothing to do there.)

- [ ] **Step 4: Commit**

```bash
git add src/lib/supabase src/components/motion.tsx
git commit -m "feat(supabase): add browser/server/admin Supabase clients and motion provider"
```

---

### Task 3: `site-gate` feature (password gate)

**Files:**
- Create: `src/features/site-gate/index.ts`
- Create: `src/features/site-gate/ui/site-gate.tsx`
- Create: `src/features/site-gate/ui/site-gate.module.css`

- [ ] **Step 1: Copy the feature verbatim**

```bash
mkdir -p "/d/Vs-code/Progix/src/features/site-gate/ui"
cp "/d/Vs-code/ProgixLandingPage/src/features/site-gate/index.ts" "/d/Vs-code/Progix/src/features/site-gate/index.ts"
cp "/d/Vs-code/ProgixLandingPage/src/features/site-gate/ui/site-gate.tsx" "/d/Vs-code/Progix/src/features/site-gate/ui/site-gate.tsx"
cp "/d/Vs-code/ProgixLandingPage/src/features/site-gate/ui/site-gate.module.css" "/d/Vs-code/Progix/src/features/site-gate/ui/site-gate.module.css"
```

- [ ] **Step 2: Point the logo at Progix's existing brand asset**

Progix already has a real logo at `/images/logo.png` (`src/config/assets.ts` → `assets.logo`); it does not have `progix-logo.png`. Edit `src/features/site-gate/ui/site-gate.tsx`:

Replace:
```tsx
import Image from "next/image";
import { useState, useSyncExternalStore, useCallback, type FormEvent } from "react";
import { clientEnv } from "@/core/env.client";
import styles from "./site-gate.module.css";
```
with:
```tsx
import Image from "next/image";
import { useState, useSyncExternalStore, useCallback, type FormEvent } from "react";
import { clientEnv } from "@/core/env.client";
import { assets } from "@/config/assets";
import styles from "./site-gate.module.css";
```

Replace:
```tsx
          <Image src="/progix-logo.png" alt="Progix" width={134} height={32} priority />
```
with:
```tsx
          <Image src={assets.logo} alt="Progix" width={134} height={32} priority />
```

- [ ] **Step 3: Typecheck**

Run: `npm run type-check`
Expected: passes.

- [ ] **Step 4: Commit**

```bash
git add src/features/site-gate
git commit -m "feat(site-gate): port password-gate feature, use existing Progix logo"
```

---

### Task 4: `devis` feature slice (types, actions, queries, UI)

This is the largest task (~8,200 lines across ~30 files: document sections, cinematic scroll UI, CSS modules). All of it is verbatim — copy the whole directory tree in one shot rather than file-by-file.

**Files:**
- Create: `src/features/devis/` (entire tree: `index.ts`, `types.ts`, `actions.ts`, `queries.ts`, `content.ts`, `ui/*.tsx`, `ui/*.css`, `ui/cinematic/*`)

- [ ] **Step 1: Copy the entire directory verbatim**

```bash
mkdir -p "/d/Vs-code/Progix/src/features/devis"
cp -r "/d/Vs-code/ProgixLandingPage/src/features/devis/." "/d/Vs-code/Progix/src/features/devis/"
```

- [ ] **Step 2: Confirm nothing was missed**

Run: `diff -rq "/d/Vs-code/ProgixLandingPage/src/features/devis" "/d/Vs-code/Progix/src/features/devis"`
Expected: no output (directories identical).

- [ ] **Step 3: Typecheck**

Run: `npm run type-check`
Expected: passes. `actions.ts` imports `zod`, `revalidatePath`; `queries.ts`/`actions.ts` import the Supabase server/admin clients from Task 2 — all now present. If this fails, the error will name the missing import; there should be none given the dependency audit above (only `@/lib/supabase/*`, `@/lib/utils` — already present — and package-level imports already installed).

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: passes. This code was already lint-clean upstream against a stricter ESLint config (boundaries plugin included); Progix's config is a subset, so it should be clean here too.

- [ ] **Step 5: Commit**

```bash
git add src/features/devis
git commit -m "feat(devis): port dynamic client-estimate feature slice from ProgixLandingPage"
```

---

### Task 5: Admin routes (login, dashboard shell, devis list + editor)

**Files:**
- Create: `src/app/admin/layout.tsx`
- Create: `src/app/admin/_lib/auth.tsx`
- Create: `src/app/admin/_lib/types.ts` (trimmed — see Step 2)
- Create: `src/app/admin/login/page.tsx`
- Create: `src/app/admin/(dashboard)/layout.tsx`
- Create: `src/app/admin/(dashboard)/page.tsx`
- Create: `src/app/admin/(dashboard)/devis/page.tsx`
- Create: `src/app/admin/(dashboard)/devis/[slug]/page.tsx`

- [ ] **Step 1: Copy the route files verbatim**

```bash
mkdir -p "/d/Vs-code/Progix/src/app/admin/_lib" "/d/Vs-code/Progix/src/app/admin/login" "/d/Vs-code/Progix/src/app/admin/(dashboard)/devis/[slug]"

cp "/d/Vs-code/ProgixLandingPage/src/app/admin/layout.tsx" "/d/Vs-code/Progix/src/app/admin/layout.tsx"
cp "/d/Vs-code/ProgixLandingPage/src/app/admin/_lib/auth.tsx" "/d/Vs-code/Progix/src/app/admin/_lib/auth.tsx"
cp "/d/Vs-code/ProgixLandingPage/src/app/admin/login/page.tsx" "/d/Vs-code/Progix/src/app/admin/login/page.tsx"
cp "/d/Vs-code/ProgixLandingPage/src/app/admin/(dashboard)/layout.tsx" "/d/Vs-code/Progix/src/app/admin/(dashboard)/layout.tsx"
cp "/d/Vs-code/ProgixLandingPage/src/app/admin/(dashboard)/page.tsx" "/d/Vs-code/Progix/src/app/admin/(dashboard)/page.tsx"
cp "/d/Vs-code/ProgixLandingPage/src/app/admin/(dashboard)/devis/page.tsx" "/d/Vs-code/Progix/src/app/admin/(dashboard)/devis/page.tsx"
cp "/d/Vs-code/ProgixLandingPage/src/app/admin/(dashboard)/devis/[slug]/page.tsx" "/d/Vs-code/Progix/src/app/admin/(dashboard)/devis/[slug]/page.tsx"
```

Deliberately **not** copied: `src/app/admin/_lib/api.ts` (dead NestJS token client — nothing imports it once `leads` is excluded) and `src/app/admin/(dashboard)/leads/page.tsx` (upstream already de-scoped it to a redirect; not linked from anywhere in this port, so it's simply not needed here).

- [ ] **Step 2: Create the trimmed `_lib/types.ts`**

Upstream's version also defines a `Lead` type for the NestJS API, which we're not porting. Create `src/app/admin/_lib/types.ts` with only what `auth.tsx` needs:

```ts
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor";
}
```

- [ ] **Step 3: Typecheck**

Run: `npm run type-check`
Expected: passes. `auth.tsx` imports `@/lib/supabase/client` (Task 2) and `./types` (Step 2 above) — both now present.

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: passes.

- [ ] **Step 5: Commit**

```bash
git add "src/app/admin"
git commit -m "feat(admin): port login, dashboard shell, and devis list/editor routes"
```

---

### Task 6: Devis client routes (`/devis/[client]/...`)

**Files:**
- Create: `src/app/devis/layout.tsx`
- Create: `src/app/devis/page.tsx`
- Create: `src/app/devis/[client]/layout.tsx`
- Create: `src/app/devis/[client]/page.tsx`
- Create: `src/app/devis/[client]/cahier-des-charges/page.tsx`
- Create: `src/app/devis/[client]/calendrier/page.tsx`
- Create: `src/app/devis/[client]/contrat/page.tsx`

- [ ] **Step 1: Copy the route files verbatim**

```bash
mkdir -p "/d/Vs-code/Progix/src/app/devis/[client]/cahier-des-charges" "/d/Vs-code/Progix/src/app/devis/[client]/calendrier" "/d/Vs-code/Progix/src/app/devis/[client]/contrat"

cp "/d/Vs-code/ProgixLandingPage/src/app/devis/layout.tsx" "/d/Vs-code/Progix/src/app/devis/layout.tsx"
cp "/d/Vs-code/ProgixLandingPage/src/app/devis/page.tsx" "/d/Vs-code/Progix/src/app/devis/page.tsx"
cp "/d/Vs-code/ProgixLandingPage/src/app/devis/[client]/layout.tsx" "/d/Vs-code/Progix/src/app/devis/[client]/layout.tsx"
cp "/d/Vs-code/ProgixLandingPage/src/app/devis/[client]/page.tsx" "/d/Vs-code/Progix/src/app/devis/[client]/page.tsx"
cp "/d/Vs-code/ProgixLandingPage/src/app/devis/[client]/cahier-des-charges/page.tsx" "/d/Vs-code/Progix/src/app/devis/[client]/cahier-des-charges/page.tsx"
cp "/d/Vs-code/ProgixLandingPage/src/app/devis/[client]/calendrier/page.tsx" "/d/Vs-code/Progix/src/app/devis/[client]/calendrier/page.tsx"
cp "/d/Vs-code/ProgixLandingPage/src/app/devis/[client]/contrat/page.tsx" "/d/Vs-code/Progix/src/app/devis/[client]/contrat/page.tsx"
```

- [ ] **Step 2: Typecheck**

Run: `npm run type-check`
Expected: passes. These import `@/features/devis` (Task 4), `@/features/site-gate` (Task 3), `@/components/motion` (Task 2) — all present.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: passes.

- [ ] **Step 4: Commit**

```bash
git add "src/app/devis"
git commit -m "feat(devis): port client-facing /devis/[client] document routes"
```

---

### Task 7: Migration SQL — schema documentation only, do not re-run

**Files:**
- Create: `supabase/migrations/0001_security_baseline.sql`
- Create: `supabase/migrations/0002_profiles.sql`
- Create: `supabase/migrations/0005_client_estimates.sql`
- Create: `supabase/migrations/0006_seed_admin_and_karima.sql`

Per the spec: this repo shares `ProgixLandingPage`'s Supabase project, which **already has these migrations applied**. Copying the files here is purely so this repo's schema history is documented and greppable — running them again against the same project would error on already-existing objects (tables/policies), so **do not run `supabase db push` or execute these SQL files**.

- [ ] **Step 1: Copy verbatim**

```bash
mkdir -p "/d/Vs-code/Progix/supabase/migrations"
cp "/d/Vs-code/ProgixLandingPage/supabase/migrations/0001_security_baseline.sql" "/d/Vs-code/Progix/supabase/migrations/0001_security_baseline.sql"
cp "/d/Vs-code/ProgixLandingPage/supabase/migrations/0002_profiles.sql" "/d/Vs-code/Progix/supabase/migrations/0002_profiles.sql"
cp "/d/Vs-code/ProgixLandingPage/supabase/migrations/0005_client_estimates.sql" "/d/Vs-code/Progix/supabase/migrations/0005_client_estimates.sql"
cp "/d/Vs-code/ProgixLandingPage/supabase/migrations/0006_seed_admin_and_karima.sql" "/d/Vs-code/Progix/supabase/migrations/0006_seed_admin_and_karima.sql"
```

(0003_notes.sql and 0004_subscriptions.sql are deliberately excluded — confirmed zero references from any devis/admin code.)

- [ ] **Step 2: Commit**

```bash
git add supabase/migrations
git commit -m "docs(supabase): document already-applied schema (client_estimates, profiles, RLS baseline)"
```

---

### Task 8: Full verification

**Files:** none (verification only)

- [ ] **Step 1: Full gate**

Run each in order, fixing forward on any failure before moving to the next:
```bash
npm run lint
npm run type-check
npm run build
```
Expected: all three exit 0. `next build` will statically analyze every new route — this is the strongest single signal that nothing was missed.

- [ ] **Step 2: Manual smoke test against the spec's acceptance criteria**

Use the `run` skill to launch the dev server, then check against `docs/superpowers/specs/2026-07-29-admin-devis-port-design.md`'s AC-1 through AC-7:
- `/admin/devis` redirects to `/admin/login` when signed out (AC-1)
- Sign in with the shared Supabase admin account → lands on `/admin/devis`, lists existing estimates including Karima
- `/devis/karima` shows `SiteGate`; the real Karima access code unlocks it and renders her actual seeded data (AC-3) — this is the proof the two apps share the same Supabase project
- Create a test estimate in admin (AC-2), then visit `/devis/<its-slug>` with its access code and confirm the dynamic title/currency/total match what was entered (AC-4)
- Section 05 renders the installment plan configured in admin (AC-5); Section 09's PDF button stays disabled until signature fields are complete (AC-6)
- Wrong access code / unknown slug fails closed without leaking content (AC-7)

- [ ] **Step 3: Commit any fixes found during smoke test**

If the smoke test surfaces a real bug (not just missing env config), fix it, re-run the affected check, then:
```bash
git add -A
git commit -m "fix(devis): <describe the specific fix>"
```

---

### Task 9: Security review

**Files:** none (review only)

- [ ] **Step 1: Dispatch `appsec-reviewer`**

This diff touches server actions (`devis/actions.ts`), auth (`admin/_lib/auth.tsx`, Supabase clients), env/secrets (`.env.example`, `core/env.ts`), and `package.json`/lockfile — exactly the `appsec-reviewer` agent's proactive-use trigger. Dispatch it against the full diff introduced by Tasks 1–7 (compare against the commit before Task 1).

- [ ] **Step 2: Address findings**

Fix anything it flags at medium severity or above; for anything lower-severity or intentionally accepted (e.g., a risk already accepted upstream in the source repo), note why inline rather than silently skipping.

---

## Execution notes

- Tasks 3 and 4 (`site-gate`, `devis` slice) only depend on Task 2 — they can run in either order, or in parallel.
- Tasks 5 and 6 (`admin` routes, `devis` client routes) both depend on Task 4 (and Task 3 for Task 6) but not on each other — they can run in parallel too.
- Task 7 has no code dependencies and can run any time after Task 1.
- Tasks 8 and 9 must run last, after everything else.
