// src/features/devis/ui/signature-section.tsx
"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { SectionHeader, Strong } from "./primitives";
import styles from "./devis.module.css";
import type { ClientEstimate } from "../types";
import { signAndLockEstimateAction, getSignedPdfAction } from "../actions";

const KEY = "progix.devis.v1";
const FIELD_IDS = ["cli_nom", "cli_societe", "cli_titre", "cli_date", "cli_courriel"] as const;

function readStore(): Record<string, string> {
  try {
    return (JSON.parse(window.localStorage.getItem(KEY) || "{}") as Record<string, string>) || {};
  } catch {
    return {};
  }
}

function writeStore(patch: Record<string, string>) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ ...readStore(), ...patch }));
  } catch {
    // localStorage unavailable — values simply aren't persisted.
  }
}

function downloadBase64Pdf(base64: string, filename: string) {
  const byteChars = atob(base64);
  const byteNumbers = new Array(byteChars.length);
  for (let i = 0; i < byteChars.length; i++) byteNumbers[i] = byteChars.charCodeAt(i);
  const blob = new Blob([new Uint8Array(byteNumbers)], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Section 08 — acceptance & signatures. Before signing: client-side persists
 * the buyer's fields + drawn signature to localStorage (nothing leaves the
 * device until they actually submit) and exports the whole document to PDF.
 * On submit, signAndLockEstimateAction saves the signature server-side,
 * locks the devis, emails the closer, and returns the same PDF for download.
 * Once locked (either right after signing, or on a later visit), this
 * renders a static read-only view instead of the editable form/pad.
 */
export function SignatureSection({ estimate }: { estimate?: ClientEstimate }) {
  const formRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const [isSigned, setIsSigned] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [locked, setLocked] = useState(!!estimate?.locked);
  const [signature, setSignature] = useState(estimate?.signature ?? null);
  const [signing, setSigning] = useState(false);
  const [signError, setSignError] = useState<string | null>(null);

  useEffect(() => {
    const cleanups: Array<() => void> = [];

    // Restore persisted field values + persist on edit (uncontrolled inputs).
    const root = formRef.current;
    const store = readStore();

    const checkForm = () => {
      if (!root) return;
      const nom = root.querySelector<HTMLInputElement>("#cli_nom")?.value;
      const titre = root.querySelector<HTMLInputElement>("#cli_titre")?.value;
      const date = root.querySelector<HTMLInputElement>("#cli_date")?.value;
      const courriel = root.querySelector<HTMLInputElement>("#cli_courriel")?.value;
      setIsFormComplete(!!(nom && titre && date && courriel));
    };

    if (root) {
      FIELD_IDS.forEach((id) => {
        const el = root.querySelector<HTMLInputElement>(`#${id}`);
        if (!el) return;
        if (store[id] != null) el.value = store[id];
        const onInput = () => {
          writeStore({ [id]: el.value });
          checkForm();
        };
        el.addEventListener("input", onInput);
        cleanups.push(() => el.removeEventListener("input", onInput));
      });
      checkForm();
    }

    // Signature pad.
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      const hint = hintRef.current;
      let restored = false; // the saved signature has been drawn once
      let userDrew = false; // the user has begun a fresh stroke

      const applyStroke = () => {
        ctx.lineWidth = 2.2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#0C2340";
      };

      const setup = () => {
        // Re-read dpr every call: browser zoom or a move to another monitor changes it.
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        if (rect.width < 2) return;
        const w = Math.round(rect.width * dpr);
        const h = Math.round(rect.height * dpr);
        if (canvas.width === w && canvas.height === h) return;
        // Preserve whatever is already on the canvas across the backing-store resize.
        let snapshot: HTMLCanvasElement | null = null;
        if (restored && canvas.width > 0 && canvas.height > 0) {
          snapshot = document.createElement("canvas");
          snapshot.width = canvas.width;
          snapshot.height = canvas.height;
          snapshot.getContext("2d")?.drawImage(canvas, 0, 0);
        }
        canvas.width = w;
        canvas.height = h;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        applyStroke();
        if (snapshot) {
          ctx.drawImage(snapshot, 0, 0, rect.width, rect.height);
        } else if (!restored) {
          restored = true;
          const saved = readStore().cli_sign;
          if (saved) {
            setIsSigned(true);
            const img = new Image();
            img.onload = () => {
              // Don't paint the old signature over a stroke the user already started.
              if (!userDrew) ctx.drawImage(img, 0, 0, rect.width, rect.height);
            };
            img.src = saved;
            if (hint) hint.style.display = "none";
          }
        }
      };

      if (window.ResizeObserver) {
        const observer = new ResizeObserver(setup);
        observer.observe(canvas);
        cleanups.push(() => observer.disconnect());
      } else {
        requestAnimationFrame(setup);
      }

      let drawing = false;
      let last: { x: number; y: number } | null = null;
      const point = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
      };
      const down = (e: PointerEvent) => {
        setup();
        drawing = true;
        userDrew = true;
        last = point(e);
        if (hint) hint.style.display = "none";
        try {
          canvas.setPointerCapture(e.pointerId);
        } catch {
          // pointer capture unsupported — drawing still works.
        }
        e.preventDefault();
      };
      const move = (e: PointerEvent) => {
        if (!drawing || !last) return;
        const p = point(e);
        ctx.beginPath();
        ctx.moveTo(last.x, last.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        last = p;
        e.preventDefault();
      };
      const stop = () => {
        if (!drawing) return;
        drawing = false;
        try {
          writeStore({ cli_sign: canvas.toDataURL("image/png") });
          setIsSigned(true);
        } catch {
          // toDataURL can throw on a tainted canvas — ignore.
        }
      };

      canvas.addEventListener("pointerdown", down);
      canvas.addEventListener("pointermove", move);
      canvas.addEventListener("pointerup", stop);
      canvas.addEventListener("pointercancel", stop);
      cleanups.push(() => {
        canvas.removeEventListener("pointerdown", down);
        canvas.removeEventListener("pointermove", move);
        canvas.removeEventListener("pointerup", stop);
        canvas.removeEventListener("pointercancel", stop);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    try {
      const store = readStore();
      delete store.cli_sign;
      window.localStorage.setItem(KEY, JSON.stringify(store));
    } catch {
      // ignore
    }
    setIsSigned(false);
    if (hintRef.current) hintRef.current.style.display = "flex";
  };

  async function handleDownloadClick() {
    if (!estimate) return;

    if (locked) {
      setSigning(true);
      setSignError(null);
      const res = await getSignedPdfAction(estimate.slug);
      setSigning(false);
      if (res.ok) downloadBase64Pdf(res.pdfBase64, `devis-${estimate.slug}.pdf`);
      else setSignError(res.error);
      return;
    }

    if (!isFormComplete) {
      alert(
        "Veuillez remplir vos informations (nom, titre, date, courriel) avant de télécharger le PDF.",
      );
      return;
    }
    if (!isSigned) {
      alert(
        "Veuillez d'abord dessiner votre signature dans le cadre ci-dessus avant de télécharger le PDF.",
      );
      return;
    }

    const root = formRef.current;
    const canvas = canvasRef.current;
    const payload = {
      client_name: root?.querySelector<HTMLInputElement>("#cli_nom")?.value ?? "",
      company: root?.querySelector<HTMLInputElement>("#cli_societe")?.value ?? "",
      title: root?.querySelector<HTMLInputElement>("#cli_titre")?.value ?? "",
      date: root?.querySelector<HTMLInputElement>("#cli_date")?.value ?? "",
      email: root?.querySelector<HTMLInputElement>("#cli_courriel")?.value ?? "",
      signature_data_url: canvas?.toDataURL("image/png") ?? "",
    };

    setSigning(true);
    setSignError(null);
    const res = await signAndLockEstimateAction(estimate.slug, payload);
    setSigning(false);
    if (!res.ok) {
      setSignError(res.error);
      return;
    }
    // signed_at here is optimistic (client clock) — the server persists its own
    // authoritative signed_at; don't display this field without refetching.
    setSignature({ ...payload, signed_at: new Date().toISOString() });
    setLocked(true);
    downloadBase64Pdf(res.pdfBase64, `devis-${estimate.slug}.pdf`);
  }

  const downloadDisabled = signing || (!locked && (!isFormComplete || !isSigned));

  return (
    <section id="s8" data-dc-section className={cn(styles.section, styles.sectionA)}>
      <div className={styles.container}>
        <SectionHeader num="08 — ACCEPTATION" title="Acceptation & signatures" />
        <p className={styles.acceptLead}>
          En foi de quoi, les Parties acceptent les termes du présent Devis contractuel et
          s’engagent à les respecter.{" "}
          <Strong>La signature ci-dessous vaut bon de commande et engagement ferme.</Strong>
        </p>

        <div className={styles.signGrid}>
          {/* Le Client — édition, ou lecture seule une fois signé */}
          {locked ? (
            <div className={styles.signClient}>
              <div className={styles.signKicker}>
                <span className={styles.signKickerDot} aria-hidden="true" />
                <div className={styles.signKickerLabel}>
                  {estimate ? estimate.client_name : "Le Client"} · signé
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.fieldLabel}>Nom complet</div>
                <div className={styles.fieldValue}>{signature?.client_name}</div>
              </div>
              {signature?.company && (
                <div className={styles.field}>
                  <div className={styles.fieldLabel}>Société</div>
                  <div className={styles.fieldValue}>{signature.company}</div>
                </div>
              )}
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <div className={styles.fieldLabel}>Titre / fonction</div>
                  <div className={styles.fieldValue}>{signature?.title}</div>
                </div>
                <div className={styles.field}>
                  <div className={styles.fieldLabel}>Date</div>
                  <div className={styles.fieldValue}>{signature?.date}</div>
                </div>
              </div>
              <div className={styles.field}>
                <div className={styles.fieldLabel}>Courriel</div>
                <div className={styles.fieldValue}>{signature?.email}</div>
              </div>
              <div>
                <div className={styles.signPadLabel}>Signature</div>
                {signature?.signature_data_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={signature.signature_data_url}
                    alt="Signature du client"
                    style={{ display: "block", width: "100%", marginTop: "8px" }}
                  />
                )}
              </div>
            </div>
          ) : (
            <div className={styles.signClient} ref={formRef}>
              <div className={styles.signKicker}>
                <span className={styles.signKickerDot} aria-hidden="true" />
                <div className={styles.signKickerLabel}>
                  {estimate ? estimate.client_name : "Le Client"} · à compléter
                </div>
              </div>
              <div className={styles.signHint}>
                Remplissez vos informations et signez ci-dessous
              </div>

              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="cli_nom">
                  Nom complet
                </label>
                <input
                  id="cli_nom"
                  type="text"
                  placeholder="Votre nom"
                  className={styles.fieldInput}
                  disabled={signing}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="cli_societe">
                  Société (le cas échéant)
                </label>
                <input
                  id="cli_societe"
                  type="text"
                  className={styles.fieldInput}
                  disabled={signing}
                />
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="cli_titre">
                    Titre / fonction
                  </label>
                  <input
                    id="cli_titre"
                    type="text"
                    className={styles.fieldInput}
                    disabled={signing}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="cli_date">
                    Date
                  </label>
                  <input
                    id="cli_date"
                    type="date"
                    className={styles.fieldInput}
                    disabled={signing}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="cli_courriel">
                  Courriel
                </label>
                <input
                  id="cli_courriel"
                  type="email"
                  placeholder="vous@exemple.com"
                  className={styles.fieldInput}
                  disabled={signing}
                />
              </div>

              <div>
                <div className={styles.signPadHead}>
                  <span className={styles.signPadLabel}>Signature</span>
                  <button
                    type="button"
                    data-noprint
                    className={styles.signClearBtn}
                    onClick={clearSignature}
                    disabled={signing}
                  >
                    Effacer
                  </button>
                </div>
                <div className={styles.signPadWrap}>
                  <canvas
                    ref={canvasRef}
                    className={styles.signCanvas}
                    aria-label="Zone de signature"
                    style={{ pointerEvents: signing ? "none" : undefined, opacity: signing ? 0.5 : 1 }}
                  />
                  <div ref={hintRef} className={styles.signPadHint}>
                    Signez ici — souris, stylet ou doigt
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Le Prestataire — Progix Inc. */}
          <div className={styles.signProvider}>
            <div className={styles.signKickerLabel}>Le Prestataire — Progix Inc.</div>
            <div className={styles.signHint}>Pour Progix Inc.</div>

            <div className={styles.field}>
              <div className={styles.fieldLabel}>Nom complet</div>
              <div className={styles.fieldValue}>Ilyes Ghorieb</div>
            </div>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Titre / fonction</div>
              <div className={styles.fieldValue}>Président</div>
            </div>
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <div className={styles.fieldLabel}>NEQ</div>
                <div className={styles.fieldValue}>1181317117</div>
              </div>
              <div className={styles.field}>
                <div className={styles.fieldLabel}>Date</div>
                <div className={styles.fieldValueBlank} />
              </div>
            </div>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Adresse</div>
              <div className={cn(styles.fieldValue, styles.fieldValueSm)}>
                11770, 5e Avenue, Montréal, QC H1E 2X4
              </div>
            </div>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Courriel</div>
              <div className={styles.fieldValue}>contact@progix.pro</div>
            </div>
            <div>
              <div className={styles.fieldLabel}>Signature</div>
              <div className={styles.fieldValueBlankTall} />
            </div>
          </div>
        </div>

        <div data-noprint className={styles.dlBar} style={{ marginTop: "32px" }}>
          <div>
            <div className={styles.dlBarTitle}>Téléchargez votre devis signé</div>
            <div className={styles.dlBarText}>
              {locked
                ? "Ce devis est signé et verrouillé. Vous pouvez retélécharger le PDF à tout moment."
                : "Complétez et signez ci-dessus, puis exportez le document complet en PDF. Vos informations restent sur votre appareil jusqu'à l'envoi."}
              {signError && (
                <span role="alert" style={{ color: "#f87171", display: "block" }}>
                  {signError}
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={handleDownloadClick}
            disabled={downloadDisabled}
            style={{
              opacity: downloadDisabled ? 0.65 : 1,
              cursor: downloadDisabled ? "not-allowed" : "pointer",
            }}
          >
            <span aria-hidden="true">⤓</span> {signing ? "Génération…" : "Télécharger le PDF"}
          </button>
        </div>
      </div>
    </section>
  );
}
