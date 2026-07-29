import { notFound } from "next/navigation";
import { SiteGate } from "@/features/site-gate";
import { getEstimateBySlug } from "@/features/devis/queries";
import { isDevisUnlocked, verifyDevisAccessAction } from "@/features/devis/gate";

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

  if (!(await isDevisUnlocked(client))) {
    return <SiteGate verify={verifyDevisAccessAction.bind(null, client)} />;
  }

  return <>{children}</>;
}
