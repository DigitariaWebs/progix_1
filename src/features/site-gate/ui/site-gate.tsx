"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { assets } from "@/config/assets";
import styles from "./site-gate.module.css";

/**
 * Password screen for a gated document. Unlike the upstream version, this
 * does not compare the password in the browser and does not receive the real
 * access code as a prop — both would ship it to anyone who loads the page,
 * unlocked or not. Submitting delegates to `verify` (the caller's
 * server-side check, e.g. devis's verifyDevisAccessAction bound to a slug) —
 * this component stays feature-agnostic and never imports another feature
 * directly (see docs/architecture/module-boundaries.md upstream). On success
 * the caller is expected to have set whatever cookie its own check relies on;
 * `router.refresh()` re-renders the current route so the real content shows.
 * There is no "unlocked" state to render here — this component only ever
 * renders the form.
 */
export function SiteGate({ verify }: { verify: (code: string) => Promise<{ ok: boolean }> }) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    const result = await verify(value);
    if (result.ok) {
      router.refresh();
    } else {
      setError(true);
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="gate-title">
      <div className={styles.card}>
        <span className={styles.chip}>
          <Image src={assets.logo} alt="Progix" width={134} height={32} priority />
        </span>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowBar} aria-hidden="true" />
          Document confidentiel
        </div>
        <h1 id="gate-title" className={styles.title}>
          Accès protégé
        </h1>
        <p className={styles.subtitle}>
          Saisissez le mot de passe qui vous a été communiqué pour consulter le document.
        </p>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div>
            <label className={styles.label} htmlFor="gate-password">
              Mot de passe
            </label>
            <input
              id="gate-password"
              className={error ? `${styles.input} ${styles.inputError}` : styles.input}
              type="password"
              autoComplete="current-password"
              autoFocus
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
                if (error) setError(false);
              }}
              placeholder="••••••••"
              aria-invalid={error}
              aria-describedby="gate-error"
              disabled={submitting}
            />
          </div>
          <p id="gate-error" className={styles.error} role="alert">
            {error ? "Mot de passe incorrect. Réessayez." : ""}
          </p>
          <button className={styles.button} type="submit" disabled={submitting}>
            {submitting ? "Vérification…" : "Déverrouiller"}
          </button>
        </form>
        <div className={styles.foot}>Progix Inc. · Fièrement montréalaise</div>
      </div>
    </div>
  );
}
