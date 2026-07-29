import { Cover } from "./cover";
import { DcHeader } from "./dc-header";
import { Footer } from "./footer";
import { ScrollReveal } from "./scroll-reveal";
import { BodySections } from "./sections";
import { SignatureSection } from "./signature-section";
import styles from "./devis.module.css";
import type { ClientEstimate } from "../types";

/**
 * Full "Devis contractuel" document — header, hero cover, the nine content
 * sections (the last being the interactive signature block), and the footer.
 */
export function DevisDocument({ estimate }: { estimate?: ClientEstimate }) {
  const meta = estimate
    ? [
        { l: "Projet", v: estimate.project_name },
        { l: "Client", v: estimate.client_name },
        { l: "Prestataire", v: "Progix Inc. · NEQ 1181317117" },
        { l: "Référence · Date", v: `DEVIS-PROGIX-${new Date().getFullYear()} · ____________` },
      ]
    : undefined;

  const badges = estimate
    ? [
        { l: "Montant total", v: `${estimate.total_amount} ${estimate.currency}`, u: "" },
        { l: "Délai de livraison", v: `${estimate.delivery_days}`, u: " jours" },
        {
          l: "Marketing",
          v: "Premium",
          u: " inclus",
        },
      ]
    : undefined;

  return (
    <div className={styles.root} data-devis-root>
      <DcHeader />
      <main className={styles.main}>
        <Cover
          titleLight={estimate?.project_title}
          subtitle={estimate?.project_description}
          badges={badges}
          meta={meta}
        />
        <BodySections estimate={estimate} />
        <SignatureSection estimate={estimate} />
        <Footer
          heading={estimate ? `Construisons ${estimate.project_name}` : "Construisons Trajeo"}
          text="Un prix fixe, une équipe senior, votre propriété à 100 % et un marketing premium jusqu’au lancement. Il ne reste qu’à signer."
        />
      </main>
      <ScrollReveal />
    </div>
  );
}
