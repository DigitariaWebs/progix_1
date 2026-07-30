import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DevisDocument, redactAccessCode } from "@/features/devis";
import { getEstimateBySlug } from "@/features/devis/queries";
import { isDevisUnlocked } from "@/features/devis/gate";

type Params = { params: Promise<{ client: string }> };

// Server Actions invoked from this page (signAndLockEstimateAction,
// getSignedPdfAction) render a PDF via headless Chromium and can take
// several seconds — longer than Vercel's default function timeout.
export const maxDuration = 60;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { client } = await params;
  const estimate = await getEstimateBySlug(client);
  if (!estimate) return {};
  return { title: `Devis contractuel · ${estimate.project_name}` };
}

/**
 * The password-gated “Devis contractuel” document rendered dynamically.
 */
export default async function ContratPage({ params }: Params) {
  const { client } = await params;
  if (!(await isDevisUnlocked(client))) notFound();

  const estimate = await getEstimateBySlug(client);
  if (!estimate) notFound();

  return <DevisDocument estimate={redactAccessCode(estimate)} />;
}
