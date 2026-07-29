import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendrierDocument, redactAccessCode } from "@/features/devis";
import { getEstimateBySlug } from "@/features/devis/queries";
import { isDevisUnlocked } from "@/features/devis/gate";

type Params = { params: Promise<{ client: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { client } = await params;
  const estimate = await getEstimateBySlug(client);
  if (!estimate) return {};
  return { title: `Calendrier · ${estimate.project_name}` };
}

/**
 * The delivery calendar / sprint schedule document rendered dynamically.
 */
export default async function CalendrierPage({ params }: Params) {
  const { client } = await params;
  if (!(await isDevisUnlocked(client))) notFound();

  const estimate = await getEstimateBySlug(client);
  if (!estimate) notFound();

  return <CalendrierDocument estimate={redactAccessCode(estimate)} />;
}
