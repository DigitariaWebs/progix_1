import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AccueilCinematic, redactAccessCode } from "@/features/devis";
import { getEstimateBySlug } from "@/features/devis/queries";
import { isDevisUnlocked } from "@/features/devis/gate";

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
  if (!(await isDevisUnlocked(client))) notFound();

  const estimate = await getEstimateBySlug(client);
  if (!estimate) notFound();

  return <AccueilCinematic estimate={redactAccessCode(estimate)} />;
}
