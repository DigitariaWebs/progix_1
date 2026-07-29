import { redirect } from "next/navigation";

/**
 * Root `/devis` route redirects to the canonical `/devis/karima` presentation.
 */
export default function DevisRootPage() {
  redirect("/devis/karima");
}
