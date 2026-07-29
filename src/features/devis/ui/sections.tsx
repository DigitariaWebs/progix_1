import { cn } from "@/lib/utils";
import { BadgeHeading, InfoBox, Pill, SectionHeader, Strong, SubHeading } from "./primitives";
import { incl1, incl2, incl3, investment, payments, trust } from "./content";
import styles from "./devis.module.css";
import type { ClientEstimate } from "../types";

/** A styled reference to another document in the set. */
function DocRef({ children }: { children: React.ReactNode }) {
  return <span className={styles.link}>{children}</span>;
}

function CheckList({ items }: { items: ReadonlyArray<{ b: string; t: string }> }) {
  return (
    <div className={styles.checkGrid}>
      {items.map((i) => (
        <div key={i.b} className={styles.check}>
          <span className={styles.checkMark} aria-hidden="true">
            ✓
          </span>
          <span>
            <Strong>{i.b}</Strong>
            {i.t}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Sections 01–07 of the devis (section 08, the signature block, is separate). */
export function BodySections({ estimate }: { estimate?: ClientEstimate }) {
  const inclDev = estimate
    ? estimate.features
        .filter((f) => f.category === "dev" && f.included)
        .map((f) => ({ b: f.labelStrong || "", t: f.label }))
    : incl1;
  const inclApi = estimate
    ? estimate.features
        .filter((f) => f.category === "api" && f.included)
        .map((f) => ({ b: f.labelStrong || "", t: f.label }))
    : incl2;
  const inclMkt = estimate
    ? estimate.features
        .filter((f) => f.category === "marketing" && f.included)
        .map((f) => ({ b: f.labelStrong || "", t: f.label }))
    : incl3;

  const invRows = estimate
    ? estimate.investments.map((row, idx) => ({
        strong: row.labelStrong,
        text: row.label,
        amount: row.amount,
        alt: idx % 2 === 1,
      }))
    : investment;

  const parseAmount = (raw: string | number) => {
    if (typeof raw === "number") return raw;
    return parseFloat(raw.replace(/\s/g, "").replace(",", ".")) || 0;
  };

  const totalAmountStr = estimate
    ? `${parseAmount(estimate.total_amount).toLocaleString("fr-FR")} ${estimate.currency}`
    : "5 600 €";
  const monthlyAmountStr = estimate
    ? `${Math.round(parseAmount(estimate.total_amount) / (estimate.payment_months || 6)).toLocaleString("fr-FR")} ${estimate.currency}`
    : "933 €";

  const payCards = estimate
    ? estimate.payment_schedule_type === "installments"
      ? estimate.payment_installments.map((inst) => ({
          pct: `${inst.percentage} %`,
          when: inst.label,
          desc: `Versement de ${inst.percentage} % du montant total.`,
          amount: inst.amount,
        }))
      : Array.from({ length: estimate.payment_months || 6 }).map((_, i) => ({
          pct: `${Math.round(100 / (estimate.payment_months || 6))} %`,
          when: `Mois ${i + 1}`,
          desc: `Paiement mensuel n°${i + 1} sur ${estimate.payment_months || 6}.`,
          amount: `${monthlyAmountStr}`,
        }))
    : payments;

  return (
    <>
      {/* 01 — OBJET */}
      <section id="s1" data-dc-section className={cn(styles.section, styles.sectionA)}>
        <div className={styles.container}>
          <SectionHeader num="01 — OBJET" title="Objet du devis" />
          <p className={styles.pLead}>
            Le présent devis contractuel (le « Devis ») définit les modalités selon lesquelles{" "}
            <Strong>Progix Inc.</Strong> (le « Prestataire ») s’engage à concevoir, développer et
            livrer <Strong>{estimate ? estimate.project_name : "Trajeo"}</Strong> (l’« Application
            »), une plateforme de{" "}
            <Strong>
              {estimate ? estimate.project_title : "mise en relation entre passagers et chauffeurs"}
            </Strong>
            , pour le compte du client signataire (le « Client »).
          </p>
          <p className={styles.p}>
            Il précise les prestations incluses, l’investissement et son échéancier,
            l’accompagnement marketing premium et les objectifs garantis, ainsi que les engagements
            respectifs des Parties. Le périmètre fonctionnel et technique détaillé fait l’objet du{" "}
            <DocRef>cahier des charges</DocRef> associé, qui complète le présent Devis. La signature
            du Devis vaut acceptation de l’ensemble de ses termes et engagement ferme.
          </p>
          <div className={styles.trust}>
            {trust.map((t) => (
              <div key={t.l} className={styles.trustCell}>
                <div className={styles.trustNum}>{t.n}</div>
                <div className={styles.trustLabel}>{t.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — PRESTATIONS */}
      <section id="s2" data-dc-section className={cn(styles.section, styles.sectionB)}>
        <div className={styles.container}>
          <SectionHeader
            num="02 — PRESTATIONS"
            title="Tout ce qui est inclus"
            lead="Une prestation complète, de la conception jusqu’à la mise en marché et au lancement commercial. Rien à gérer en plus."
          />
          <SubHeading first>Conception & développement</SubHeading>
          <CheckList items={inclDev} />
          <SubHeading>API, infrastructure & mise en ligne</SubHeading>
          <CheckList items={inclApi} />
          <SubHeading>Lancement & accompagnement premium</SubHeading>
          <CheckList items={inclMkt} />
        </div>
      </section>

      {/* 03 — INVESTISSEMENT */}
      <section id="s3" data-dc-section className={cn(styles.section, styles.sectionA)}>
        <div className={styles.container}>
          <SectionHeader
            num="03 — INVESTISSEMENT"
            title="Votre investissement"
            lead={`Décomposition transparente, poste par poste. Un forfait fixe de ${totalAmountStr}, réglé ${estimate?.payment_schedule_type === "installments" ? "en versements" : "mensuellement"}, tout compris — accompagnement marketing premium inclus.`}
          />
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Composante de la prestation</th>
                  <th className={styles.thRight}>Montant</th>
                </tr>
              </thead>
              <tbody>
                {invRows.map((row, idx) => (
                  <tr key={idx} className={row.alt ? styles.tableAlt : undefined}>
                    <td>
                      {"strong" in row && row.strong ? (
                        <>
                          <Strong>{row.strong}</Strong>
                          {row.text}
                        </>
                      ) : (
                        row.text
                      )}
                    </td>
                    <td className={styles.tableNum}>{row.amount}</td>
                  </tr>
                ))}
                <tr className={styles.tableTotal}>
                  <td>
                    <strong>Total — forfait, tout compris</strong>
                  </td>
                  <td className={styles.tableTotalAmount}>{totalAmountStr}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={cn(styles.totalPanel, styles.lift)}>
            <div className={styles.totalPanelInner}>
              <span className={styles.totalArrow} aria-hidden="true">
                —
              </span>
              <div className={styles.totalEyebrow}>Montant total · forfait fixe</div>
              <div className={styles.totalValue}>{totalAmountStr}</div>
              <div className={styles.totalNote}>
                {estimate?.payment_schedule_type === "installments" ? (
                  <>
                    Paiement échelonné selon l&apos;avancement du projet. Prix ferme, aucun coût
                    caché.
                  </>
                ) : (
                  <>
                    Soit{" "}
                    <Strong>
                      {monthlyAmountStr} / mois pendant {estimate?.payment_months || 6} mois
                    </Strong>
                    . Prix ferme, marketing premium inclus. Aucun coût caché.
                  </>
                )}
              </div>
            </div>
          </div>
          <InfoBox icon="€" title="Aucune taxe applicable">
            Progix étant une entreprise <Strong>canadienne</Strong> et le Client étant établi en{" "}
            <Strong>France</Strong>, la prestation n’est pas assujettie à la TVA ni à aucune taxe de
            vente (service transfrontalier — autoliquidation par le preneur le cas échéant).
          </InfoBox>
          <SubHeading>
            Échéancier de paiement —{" "}
            {estimate?.payment_schedule_type === "installments" ? "par versement" : "mensuel"}
          </SubHeading>
          <div className={styles.grid3} style={{ margin: "6px 0 16px" }}>
            {payCards.map((p, i) => (
              <div key={i} className={cn(styles.payCard, styles.lift)}>
                <div className={styles.payPct}>{p.pct}</div>
                <div className={styles.payWhen}>{p.when}</div>
                <div className={styles.payDesc}>{p.desc}</div>
                <div className={styles.payAmount}>{p.amount}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "13px", color: "var(--slate)", margin: 0, lineHeight: 1.6 }}>
            {estimate?.payment_schedule_type === "installments" ? (
              <>
                Paiements échelonnés par <Strong>Stripe</Strong> ou{" "}
                <Strong>virement bancaire</Strong>. Aucun travail de développement ne débute avant
                réception du premier versement.
              </>
            ) : (
              <>
                Paiement mensuel d’environ{" "}
                <Strong>
                  {monthlyAmountStr} sur {estimate?.payment_months || 6} mois
                </Strong>{" "}
                par <Strong>Stripe</Strong> ou <Strong>virement bancaire</Strong>. Aucun travail de
                développement ne débute avant réception du premier versement.
              </>
            )}
          </p>
        </div>
      </section>

      {/* 04 — MARKETING */}
      <section id="s4" data-dc-section className={cn(styles.section, styles.sectionB)}>
        <div className={styles.container}>
          <SectionHeader
            num="04 — MARKETING PREMIUM"
            title="Accompagnement marketing premium — inclus"
            lead="Une prise en charge complète du lancement. Progix réalise l’intégralité des campagnes : le Client n’a aucune campagne à gérer lui-même."
          />
          <div className={styles.grid2}>
            <div className={cn(styles.card, styles.lift)}>
              <h3 className={styles.cardTitle}>
                <span className={styles.cardNum} aria-hidden="true">
                  1
                </span>
                Stratégie & positionnement
              </h3>
              <p className={styles.cardText}>
                Définition de la <Strong>stratégie marketing</Strong> et du positionnement de
                l’Application sur son marché.
              </p>
            </div>
            <div className={cn(styles.card, styles.lift)}>
              <h3 className={styles.cardTitle}>
                <span className={cn(styles.cardNum, styles.cardNumNavy)} aria-hidden="true">
                  2
                </span>
                Création complète
              </h3>
              <p className={styles.cardText}>
                <Strong>Vidéos UGC</Strong>, écriture des scripts, créatifs publicitaires et visuels
                — entièrement produits par Progix.
              </p>
            </div>
            <div className={cn(styles.card, styles.lift)}>
              <h3 className={styles.cardTitle}>
                <span className={styles.cardNum} aria-hidden="true">
                  3
                </span>
                Gestion des campagnes
              </h3>
              <p className={styles.cardText}>
                Paramétrage et gestion des campagnes <Strong>Meta Ads</Strong>,{" "}
                <Strong>Google Ads</Strong> et <Strong>Apple Search Ads</Strong>.
              </p>
            </div>
            <div className={cn(styles.card, styles.lift)}>
              <h3 className={styles.cardTitle}>
                <span className={cn(styles.cardNum, styles.cardNumNavy)} aria-hidden="true">
                  4
                </span>
                Optimisation & reporting
              </h3>
              <p className={styles.cardText}>
                <Strong>Optimisation quotidienne</Strong>, analyse des KPIs, réunion hebdomadaire et
                reporting continu.
              </p>
            </div>
          </div>
          <p className={styles.note} style={{ marginTop: "24px" }}>
            Le détail complet de la prestation de commercialisation est présenté dans un document
            annexe. Ce document précise les actions prévues, les livrables, les modalités
            d&apos;accompagnement ainsi que l&apos;étendue des services inclus, afin de vous offrir
            une vision claire et complète de la prestation proposée.
          </p>
        </div>
      </section>

      {/* 05 — APRÈS-LIVRAISON */}
      <section id="s5" data-dc-section className={cn(styles.section, styles.sectionA)}>
        <div className={styles.container}>
          <SectionHeader num="05 — APRÈS-LIVRAISON" title="Support, maintenance & propriété" />
          <InfoBox variant="ok" icon="★" title="Vous êtes propriétaire à 100 %">
            Le Client est propriétaire de l’intégralité de l’Application. La propriété
            intellectuelle est <Strong>transférée progressivement à mesure des paiements</Strong> :
            chaque{" "}
            {estimate?.payment_schedule_type === "installments"
              ? "versement réglé"
              : "mensualité réglée"}{" "}
            transfère la portion correspondante des travaux. À la livraison finale, une
            documentation technique complète est remise — l’Application peut être reprise par tout
            développeur de votre choix. <Strong>Aucun verrouillage.</Strong>
          </InfoBox>
          <SubHeading>Support inclus — {estimate ? estimate.delivery_days : "90"} jours</SubHeading>
          <ul className={styles.arrowList}>
            <li className={styles.arrowItem}>
              Correction des bugs et ajustements mineurs (hors nouvelles fonctionnalités).
            </li>
            <li className={styles.arrowItem}>
              Temps de réponse sous <Strong>24 heures</Strong> + point de suivi hebdomadaire.
            </li>
          </ul>
          <SubHeading>
            Au-delà des {estimate ? estimate.delivery_days : "90"} jours <Pill>Optionnel</Pill>
          </SubHeading>
          <div className={styles.grid2}>
            <div className={cn(styles.card, styles.lift)}>
              <h3 className={styles.cardTitle}>
                <span className={cn(styles.cardNum, styles.cardNumNavy)} aria-hidden="true">
                  ♲
                </span>
                Maintenance mensuelle
              </h3>
              <p className={styles.cardText}>
                <Strong>90 € / mois</Strong> — support continu, correction de bugs et petites
                corrections, disponibilité étendue grâce à l’équipe sur plusieurs fuseaux horaires.
              </p>
            </div>
            <div className={cn(styles.card, styles.lift)}>
              <h3 className={styles.cardTitle}>
                <span className={styles.cardNum} aria-hidden="true">
                  +
                </span>
                Évolutions & nouvelles fonctionnalités
              </h3>
              <p className={styles.cardText}>
                <Strong>80 $ / heure</Strong> — pour toute évolution postérieure de l’Application
                (paiement en ligne intégré, modules spécifiques, fonctionnalités additionnelles…).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — ENGAGEMENTS */}
      <section id="s6" data-dc-section className={cn(styles.section, styles.sectionA)}>
        <div className={styles.container}>
          <SectionHeader num="06 — ENGAGEMENTS" title="Engagements du Client" />
          <BadgeHeading badge="A" first>
            Ce que le Client fournit
          </BadgeHeading>
          <p className={styles.p}>
            Pour permettre la tenue du délai, la qualité de la livraison et l’atteinte des objectifs
            garantis, le Client s’engage à :
          </p>
          <ul className={styles.arrowList}>
            <li className={styles.arrowItem}>
              Fournir en temps utile les <Strong>contenus, informations et validations</Strong>{" "}
              nécessaires à l’avancement.
            </li>
            <li className={styles.arrowItem}>
              Créer les comptes <Strong>Apple Developer</Strong> (99 $/an) et{" "}
              <Strong>Google Play Console</Strong> (25 $ une fois) et fournir les accès — Progix
              accompagne la création et publie pour le Client.
            </li>
            <li className={styles.arrowItem}>
              Créer un compte <Strong>Stripe</Strong> et fournir un accès développeur pour les
              paiements le cas échéant.
            </li>
            <li className={styles.arrowItem}>
              Prévoir le <Strong>budget publicitaire minimum</Strong> de 1 000 € pour les campagnes.
            </li>
            <li className={styles.arrowItem}>
              <Strong>Valider les éléments nécessaires</Strong> et respecter les recommandations —
              condition de l’obligation de résultat marketing.
            </li>
          </ul>
          <BadgeHeading badge="B">Retards imputables au Client</BadgeHeading>
          <p className={styles.p}>
            Les retards liés à l’absence de validation, de contenu ou d’accès, ou aux demandes de
            modification du Client peuvent décaler la date de livraison d’autant.
          </p>
        </div>
      </section>

      {/* 07 — DISPOSITIONS */}
      <section id="s7" data-dc-section className={cn(styles.section, styles.sectionB)}>
        <div className={styles.container}>
          <SectionHeader num="07 — DISPOSITIONS" title="Dispositions générales" />
          <BadgeHeading badge="1" first>
            Droit applicable & juridiction
          </BadgeHeading>
          <p className={styles.p}>
            Le présent Devis est régi par les lois de la province de Québec et les lois fédérales du
            Canada applicables. Tout litige est soumis à la compétence exclusive des tribunaux de la
            province de Québec, district de Montréal.
          </p>
          <BadgeHeading badge="2">Intégralité de l’entente</BadgeHeading>
          <p className={styles.p}>
            Le présent Devis, complété par le <DocRef>cahier des charges</DocRef> associé, constitue
            l’intégralité de l’entente entre les Parties relativement à son objet et remplace toute
            entente ou communication antérieure.
          </p>
          <BadgeHeading badge="3">Modifications</BadgeHeading>
          <p className={styles.p}>
            Toute modification du présent Devis ou du périmètre convenu doit faire l’objet d’un
            écrit signé par les deux Parties.
          </p>
          <BadgeHeading badge="4">Divisibilité</BadgeHeading>
          <p className={styles.p}>
            Si une disposition du présent Devis est jugée invalide ou inapplicable, les autres
            dispositions demeurent en vigueur et de plein effet.
          </p>
        </div>
      </section>
    </>
  );
}
