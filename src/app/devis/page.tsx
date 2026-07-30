import { redirect } from "next/navigation";

/**
 * Root `/devis` route redirects to the default client presentation.
 */
export default function DevisRootPage() {
  redirect("/devis/client");
}
