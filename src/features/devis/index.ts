export { AccueilDocument } from "./ui/accueil-document";
export { AccueilCinematic } from "./ui/cinematic/accueil-cinematic";
export { DevisDocument } from "./ui/devis-document";
export { CahierDocument } from "./ui/cahier-document";
export { CalendrierDocument } from "./ui/calendrier-document";
export * from "./types";
export * from "./actions";
// NOTE: "./queries" and "./gate" are deliberately NOT re-exported here.
// Both are `server-only` (queries.ts uses the service-role client; gate.ts
// touches next/headers cookies). This barrel is imported by "use client"
// admin pages too (see src/app/admin/(dashboard)/devis/page.tsx) -- if
// server-only code were re-exported here, the bundler would try to pull it
// into the browser bundle and the build fails. The only legitimate
// consumers are the devis app routes (src/app/devis/**), which import
// directly from "@/features/devis/queries" / "@/features/devis/gate".
