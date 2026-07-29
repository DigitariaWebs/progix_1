import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendrierDocument, getEstimateBySlug } from "@/features/devis";

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
  const estimate = await getEstimateBySlug(client);
  if (!estimate) notFound();

  return <CalendrierDocument estimate={estimate} />;
}
