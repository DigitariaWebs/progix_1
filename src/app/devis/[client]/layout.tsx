import { notFound } from "next/navigation";
import { SiteGate } from "@/features/site-gate";
import { getEstimateBySlug } from "@/features/devis";

type Params = { params: Promise<{ client: string }> };

export default async function ClientLayout({
  children,
  params,
}: Params & {
  children: React.ReactNode;
}) {
  const { client } = await params;
  const estimate = await getEstimateBySlug(client);

  if (!estimate) {
    notFound();
  }

  return (
    <SiteGate accessCode={estimate.access_code} slug={estimate.slug}>
      {children}
    </SiteGate>
  );
}
