"use client";

import Image from "next/image";
import { useState, useSyncExternalStore, useCallback, type FormEvent } from "react";
import { clientEnv } from "@/core/env.client";
import { assets } from "@/config/assets";
import styles from "./site-gate.module.css";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

/**
 * Frontend-only access gate. Shows a password screen until the visitor enters
 * NEXT_PUBLIC_SITE_ACCESS_CODE (or a per-client accessCode), then reveals the site
 * and remembers the unlock in localStorage for this browser.
 */
export function SiteGate({
  children,
  accessCode,
  slug,
}: {
  children: React.ReactNode;
  accessCode?: string;
  slug?: string;
}) {
  const storageKey = slug ? `progix.gate.unlocked.${slug}` : "progix.gate.unlocked";
  const targetCode = accessCode || clientEnv.NEXT_PUBLIC_SITE_ACCESS_CODE;

  const getSnapshot = useCallback(() => {
    try {
      return window.localStorage.getItem(storageKey) === "1";
    } catch {
      return false; // localStorage unavailable (e.g. private mode)
    }
  }, [storageKey]);

  const storedUnlocked = useSyncExternalStore(subscribe, getSnapshot, () => false);
  const [sessionUnlocked, setSessionUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const unlocked = storedUnlocked || sessionUnlocked;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (value === targetCode) {
      setSessionUnlocked(true);
      setError(false);
      try {
        window.localStorage.setItem(storageKey, "1");
      } catch {
        // ignore — the unlock still holds for this page load.
      }
    } else {
      setError(true);
    }
  }

  if (unlocked) return <>{children}</>;

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
            />
          </div>
          <p id="gate-error" className={styles.error} role="alert">
            {error ? "Mot de passe incorrect. Réessayez." : ""}
          </p>
          <button className={styles.button} type="submit">
            Déverrouiller
          </button>
        </form>
        <div className={styles.foot}>Progix Inc. · Fièrement montréalaise</div>
      </div>
    </div>
  );
}
