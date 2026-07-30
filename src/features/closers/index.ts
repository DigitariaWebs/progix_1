export * from "./types";
export * from "./actions";
// NOTE: "./queries" is deliberately NOT re-exported here. It is
// `server-only` (uses the service-role client to read `closers`, bypassing
// RLS). This barrel is imported by "use client" admin pages too -- if
// server-only code were re-exported here, the bundler would try to pull it
// into the browser bundle and the build fails. The only legitimate
// consumers of queries.ts are server-only modules (e.g. actions.ts in this
// same feature), which import directly from "@/features/closers/queries".
