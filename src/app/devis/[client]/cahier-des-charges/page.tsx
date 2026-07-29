import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CahierDocument, redactAccessCode } from "@/features/devis";
import { getEstimateBySlug } from "@/features/devis/queries";
import { isDevisUnlocked } from "@/features/devis/gate";

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
  if (!(await isDevisUnlocked(client))) notFound();

  const estimate = await getEstimateBySlug(client);
  if (!estimate) notFound();

  return <CahierDocument estimate={redactAccessCode(estimate)} />;
}
