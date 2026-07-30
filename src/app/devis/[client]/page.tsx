import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getEstimateBySlug } from "@/features/devis/queries";

type Params = { params: Promise<{ client: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { client } = await params;
  const estimate = await getEstimateBySlug(client);
  if (!estimate) return {};
  return { title: `Devis contractuel · ${estimate.project_name}` };
}

/**
 * Client root route (`/devis/[client]`). The gate lives in the layout —
 * once unlocked, skip straight to the devis contractuel document instead of
 * the présentation page (that route still exists at /cahier-des-charges,
 * /calendrier, and this one just isn't the entry point anymore).
 */
export default async function ClientDevisPage({ params }: Params) {
  const { client } = await params;
  redirect(`/devis/${client}/contrat`);
}
