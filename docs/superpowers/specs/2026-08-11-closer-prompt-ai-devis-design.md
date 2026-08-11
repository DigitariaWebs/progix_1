# "Prompt closer" — AI-prefilled devis creation

**Date:** 2026-08-11
**Status:** Approved, ready for implementation plan

## Problem

Creating a devis today means typing every field by hand into
`/admin/devis/new`: client name, project name, closer, currency, description,
and five feature lines. The closer already has all of that information in
text form — the output of a prompt they run against their call notes. They
retype it.

The ask (from management): add a "Prompt closer" field where the closer
pastes that text. An LLM turns it into structured JSON. The JSON prefills the
existing form. The closer verifies, corrects anything wrong, and clicks save.
From there, everything behaves exactly as it does today.

## Scope

**In scope:** a paste-and-parse card on the devis creation form, an OpenAI
call behind a server action, and the mapping from the returned JSON onto the
existing `ClientEstimate` form state.

**Out of scope:** changing the devis document, the PDF renderer, the signing
flow, the save action, or the database schema. Nothing is persisted by this
feature — the AI writes to React state only. The existing `saveEstimateAction`
remains the sole path to the database, unchanged.

## Target JSON

The model returns exactly this shape, and nothing else:

```json
{
  "clientName": "string",
  "projectName": "string",
  "closerName": "string",
  "currency": "€ | $",
  "fullDescription": "string",
  "functionalities": ["string", "..."]
}
```

Constraints given to the model:

- Do not suppose or invent. Base the output on the input text only.
- A field with no support in the input text is returned as an empty string
  (`""`), never as a guess. `functionalities` with no support is `[]`.
- `functionalities`: aim for at least 5 items, 5 to 10 words each.
- `currency` is `€` or `$`. If the input text does not indicate a currency,
  return `""`. The JSON schema and the Zod schema both declare `currency` as
  the three-value enum `"€" | "$" | ""` — a strict `json_schema` cannot mark a
  field optional, so "unknown" has to be a representable value.

Enforced two ways: OpenAI structured output (`response_format:
{type: "json_schema", strict: true}`) so the model cannot return malformed
JSON, and a Zod schema server-side so a schema drift or a provider change
fails loudly instead of writing garbage into the form.

## Flow

```
Closer pastes text  →  [Analyser avec l'IA]
                            ↓  parseCloserPromptAction (requireAdmin)
                        OpenAI, strict json_schema
                            ↓
                        Zod validation
                            ↓  applyAiDraft() — pure, runs client-side
                        Form state prefilled + warnings shown
                            ↓  closer reviews and corrects
                        [Enregistrer]  →  saveEstimateAction (unchanged)
```

The database is untouched until the closer clicks "Enregistrer". A bad AI
parse costs a re-paste, never a corrupted record.

## Modules

| File | Responsibility | Depends on |
|---|---|---|
| `src/lib/ai/openai.ts` | `server-only`. Builds the OpenAI client from `OPENAI_API_KEY`, resolves the model from `OPENAI_MODEL` (default `gpt-4.1-mini`). Throws a named error if the key is missing. | `openai` |
| `src/features/devis/prompt-parse.ts` | `server-only`. Owns the prompt text, the JSON schema, and the Zod schema. Single export: `parseCloserPrompt(rawText): Promise<AiDevisDraft>`. | `@/lib/ai/openai`, `zod` |
| `src/features/devis/ai-draft.ts` | **Pure. No network, no server-only imports.** Owns every mapping rule, plus `slugify`. Exports: `applyAiDraft(form, draft, closers): { next: ClientEstimate; warnings: string[] }` and `slugify(input): string`. | `./types`, `@/features/closers` types |
| `src/features/devis/actions.ts` | Adds `parseCloserPromptAction(rawText)`. Calls `requireAdmin`, then `parseCloserPrompt`, returns a discriminated result. | existing |
| `src/app/admin/(dashboard)/devis/[slug]/page.tsx` | Adds the "Prompt closer" card, rendered only when `isNew`. Calls the action, then `applyAiDraft`, then `setForm`. | existing |
| `scripts/test-ai-draft.mts` | Assertions over `applyAiDraft`. No API key, no network. | `node:assert/strict` |

`ai-draft.ts` is deliberately separate from the server action. The mapping is
where the bugs live — currency translation, closer matching, slot
replacement. Keeping it pure means it is exercised by a script that needs no
API key and no network, and the server action stays a thin
auth-then-call-then-return wrapper.

`prompt-parse.ts` is `server-only` and must **not** be re-exported from
`src/features/devis/index.ts`. That barrel is imported by `"use client"`
admin pages; adding server-only code to it breaks the build. This is the same
constraint already documented in the barrel for `queries.ts` and `gate.ts`.
`ai-draft.ts` is pure and may be imported directly by the client page.

`slugify` currently lives as a private helper inside the editor page. It moves
to `ai-draft.ts` and the page imports it from there. One definition, one
behaviour — the slug the AI path derives and the slug the client-name input
derives must never diverge.

## Mapping rules

`applyAiDraft` takes the current form, the AI draft, and the loaded closers
list. It returns a new form object and a list of human-readable warnings.

| JSON field | Form field | Rule |
|---|---|---|
| `clientName` | `client_name`, `slug` | `slug = slugify(clientName)`, always. The card only renders on the creation form, so there is no existing slug to protect. |
| `projectName` | `project_name`, `project_title` | Both set to the same value, mirroring what the existing input's `onChange` already does. |
| `currency` | `currency` | `"$"` → `"$CAD"`, `"€"` → `"€"`. Anything else (including `""`) leaves the current value. |
| `fullDescription` | `project_description` | Direct. |
| `closerName` | `closer_id` | See "Closer matching" below. |
| `functionalities[]` | `features[]` | See "Feature slots" below. |
| — | `total_amount` | Never touched. Not present in the JSON; the closer types it. A warning is emitted only when the field is still empty after the draft is applied. |
| — | `access_code`, `delivery_days`, `marketing_included`, payment schedule | Never touched. Already auto-set at save time. |

Two guards apply to every scalar field:

1. An empty AI value never overwrites a non-empty form value.
2. If the form already holds data (`client_name` is non-empty), the page asks
   for confirmation via `window.confirm` before applying the draft. Declining
   leaves the form untouched.

### Closer matching

`closerName` is free text from a call transcript. It will not match a database
row exactly.

Normalize both sides: lowercase, strip diacritics (`NFD` + combining-mark
removal, the same technique `slugify` already uses in the page), collapse
whitespace. Then try, in order:

1. Full name — `"${first_name} ${last_name}"`
2. Last name alone
3. First name alone

The first tier that produces **exactly one** match wins, and its `id` is
written to `closer_id`. Zero matches, or two or more at every tier, leaves
`closer_id` untouched and emits a warning:

> `Closer « Jean » non reconnu — sélectionne-le manuellement.`

Guessing between two closers would silently misattribute a signed devis and
send the signature email to the wrong person. Refusing to guess costs one
dropdown click.

### Feature slots

`DEFAULT_ESTIMATE.features` ships five placeholder rows — `category: "dev"`,
`labelStrong` of `"Fonctionnalité 1"` through `"Fonctionnalité 5"`, empty
`label` — surrounded by fixed rows (mobile app, back-office, landing page,
revisions, API, infra, monetization, store publication, and four marketing
rows).

The AI functionalities replace the placeholders and nothing else:

1. Find every feature where `category === "dev"` and `labelStrong` matches
   `/^Fonctionnalité\s*\d+$/i` (trimmed).
2. Remove all of them. Insert the AI items at the index the first one held.
3. Each AI item becomes
   `{ id: "ai-<index>-<uniqueSuffix>", category: "dev", labelStrong: <text>, label: "", included: true, isCustom: true }`.

Consequences, all intended:

- 8 functionalities returned → 8 dev rows, not 5.
- 3 returned → 3 dev rows. No empty `"Fonctionnalité 4"` survives into the PDF.
- 0 returned → placeholders are left alone, plus a warning. Wiping the
  scaffold on an empty parse would leave the closer worse off than before.
- No placeholders present (draft applied twice) → AI items are inserted after
  the last `dev` feature.
- Every fixed row is untouched in content, order, and `included` state.

`id` uniqueness: ids must not collide with the `custom-${Date.now()}` ids the
existing "add feature" buttons produce, nor with each other when several are
created in the same millisecond. Index is part of the id for that reason.

## UI

A card at the top of `/admin/devis/new`, above the existing "Identité &
sécurité" card, rendered only when `isNew`. Editing an existing devis does not
show it — the boss's flow is creation, and re-parsing over a devis that is
mid-review is a footgun, not a feature.

```
┌─ ✨ PROMPT CLOSER ─────────────────── [replier] ─┐
│ Colle ici le résultat de ton prompt.             │
│ ┌──────────────────────────────────────────────┐ │
│ │                                              │ │
│ │                                              │ │
│ └──────────────────────────────────────────────┘ │
│ ⚠ Closer « Jean » non reconnu — sélectionne-le   │
│   manuellement.                                  │
│ ⚠ Montant total à saisir manuellement.           │
│                           [ Analyser avec l'IA ] │
└──────────────────────────────────────────────────┘
```

Styling follows the existing cards exactly: `rounded-xl border border-white/10
bg-white/[0.02] p-6`, `#67c8ff` heading with a Lucide icon, `font-mono
text-xs text-white/60` labels.

Behaviour:

- The button is disabled while the textarea is empty or a parse is in flight.
- During the call the button reads `Analyse…`.
- Warnings render as an amber list inside the card and persist until the next
  parse. They are advisory, never blocking.
- Errors render in the same red style the page already uses for `error`.
- The pasted text stays in the textarea after a successful parse, so a closer
  who spots a bad parse can adjust and retry.
- The card sits outside the `<fieldset disabled={form.locked}>` question
  entirely — it only renders when `isNew`, and a new devis is never locked.

## Errors

| Case | Behaviour |
|---|---|
| `OPENAI_API_KEY` unset | `Analyse IA indisponible : OPENAI_API_KEY manquante.` The rest of the form stays fully usable by hand. |
| OpenAI network failure, timeout, or rate limit | The provider message is surfaced in the card. Pasted text is kept; the button re-enables. |
| Model returns JSON that fails Zod | `Réponse IA illisible, réessaie.` Nothing is written to the form. |
| Not signed in as admin | `Non autorisé.` — `requireAdmin`, identical to every other action in the file. |
| Parse succeeds but every field is empty | Form untouched (the empty-value guard), plus a warning that nothing usable was extracted. |

The pasted text is never logged and never stored. It is sent to OpenAI,
produces the JSON, and is discarded. Provider-side retention is OpenAI's
standard API policy; no additional copy is made by this application.

`maxDuration` needs no change — `src/app/admin/layout.tsx` already exports
`maxDuration = 60`, inherited by the whole admin route tree, which is ample
for a single non-streaming completion.

## Configuration

Added to `.env.example`:

```
# --- OpenAI (server-only; parses the closer's pasted prompt output) ---
OPENAI_API_KEY=
# Optional. Defaults to gpt-4.1-mini.
OPENAI_MODEL=
```

New dependency: `openai`.

## Testing

`scripts/test-ai-draft.mts`, run via `npm run test:ai-draft`, following the
existing `scripts/test-commission.mts` pattern (`node
--experimental-strip-types`, `node:assert/strict`, a final `console.log` on
success). It covers `applyAiDraft` only — no key, no network:

- `"$"` maps to `"$CAD"`; `"€"` maps to `"€"`; `""` leaves the current currency
- Full-name, last-name-only, and first-name-only closer matches each resolve
- An ambiguous name (two closers share a last name) leaves `closer_id` unset
  and warns
- An unknown name leaves `closer_id` unset and warns
- 3, 5, and 8 functionalities each produce exactly that many dev rows
- 0 functionalities leaves the placeholders intact and warns
- Fixed features (mobile app, back-office, API, marketing) survive unchanged
  in content and order
- Generated feature ids are unique within one call
- Empty AI strings do not overwrite non-empty form fields
- `total_amount` is never modified
- `slug` is derived from `clientName` with accents stripped

Plus `npm run type-check` and `npm run lint`, and one manual pass: paste a
real prompt output into `/admin/devis/new`, confirm the fields fill, correct
one deliberately, save, and open the resulting `/devis/<slug>` page.
