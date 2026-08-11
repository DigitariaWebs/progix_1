export { AccueilDocument } from "./ui/accueil-document";
export { AccueilCinematic } from "./ui/cinematic/accueil-cinematic";
export { DevisDocument } from "./ui/devis-document";
export { CahierDocument } from "./ui/cahier-document";
export { CalendrierDocument } from "./ui/calendrier-document";
export * from "./types";
export * from "./actions";
export * from "./ai-draft";
// NOTE: "./queries", "./gate" and "./prompt-parse" are deliberately NOT
// re-exported here. All three are `server-only` (queries.ts uses the
// service-role client; gate.ts touches next/headers cookies; prompt-parse.ts
// calls the OpenAI SDK). This barrel is imported by "use client" admin pages
// too (see src/app/admin/(dashboard)/devis/page.tsx) -- if server-only code
// were re-exported here, the bundler would try to pull it into the browser
// bundle and the build fails. The only legitimate consumers are: the devis
// app routes (src/app/devis/**) for queries/gate, and actions.ts for
// prompt-parse.ts (a "use server" action wrapping it is safe to re-export --
// see parseCloserPromptAction above).
//
// "./ai-draft" is safe to re-export: it's pure (no network, no server-only
// imports) and only imports AiDevisDraft from "./prompt-parse" as a
// type-only import, which is erased at compile time.
