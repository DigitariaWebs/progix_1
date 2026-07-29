import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AccueilCinematic, getEstimateBySlug } from "@/features/devis";

type Params = { params: Promise<{ client: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { client } = await params;
  const estimate = await getEstimateBySlug(client);
  if (!estimate) return {};
  return { title: `Présentation · ${estimate.project_name}` };
}

/**
 * Client presentation route (`/devis/[client]`).
 * Dynamically renders for any seeded client estimate slug in Supabase.
 */
export default async function ClientDevisPage({ params }: Params) {
  const { client } = await params;
  const estimate = await getEstimateBySlug(client);
  if (!estimate) notFound();

  return <AccueilCinematic estimate={estimate} />;
}
