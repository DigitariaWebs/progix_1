import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CahierDocument, getEstimateBySlug } from "@/features/devis";

type Params = { params: Promise<{ client: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { client } = await params;
  const estimate = await getEstimateBySlug(client);
  if (!estimate) return {};
  return { title: `Cahier des charges · ${estimate.project_name}` };
}

/**
 * The project’s functional & technical specification document rendered dynamically.
 */
export default async function CahierDesChargesPage({ params }: Params) {
  const { client } = await params;
  const estimate = await getEstimateBySlug(client);
  if (!estimate) notFound();

  return <CahierDocument estimate={estimate} />;
}
