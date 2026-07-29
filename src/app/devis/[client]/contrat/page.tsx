import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DevisDocument, getEstimateBySlug } from "@/features/devis";

type Params = { params: Promise<{ client: string }> };

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
  const estimate = await getEstimateBySlug(client);
  if (!estimate) notFound();

  return <DevisDocument estimate={estimate} />;
}
