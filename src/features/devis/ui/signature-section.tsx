"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { SectionHeader, Strong } from "./primitives";
import styles from "./devis.module.css";
import type { ClientEstimate } from "../types";

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

/**
 * Section 08 — acceptance & signatures. Client side persists the buyer's fields
 * + drawn signature to localStorage (nothing leaves the device) and exports the
 * whole document to PDF via the browser print dialog. The fields are
 * uncontrolled and hydrated from storage in an effect (matching the source).
 */
export function SignatureSection({ estimate }: { estimate?: ClientEstimate }) {
  const formRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const [isSigned, setIsSigned] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);

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
          {/* Le Client — à compléter */}
          <div className={styles.signClient} ref={formRef}>
            <div className={styles.signKicker}>
              <span className={styles.signKickerDot} aria-hidden="true" />
              <div className={styles.signKickerLabel}>
                {estimate ? estimate.client_name : "Le Client"} · à compléter
              </div>
            </div>
            <div className={styles.signHint}>Remplissez vos informations et signez ci-dessous</div>

            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="cli_nom">
                Nom complet
              </label>
              <input
                id="cli_nom"
                type="text"
                placeholder="Votre nom"
                className={styles.fieldInput}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="cli_societe">
                Société (le cas échéant)
              </label>
              <input id="cli_societe" type="text" className={styles.fieldInput} />
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="cli_titre">
                  Titre / fonction
                </label>
                <input id="cli_titre" type="text" className={styles.fieldInput} />
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="cli_date">
                  Date
                </label>
                <input id="cli_date" type="date" className={styles.fieldInput} />
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
                >
                  Effacer
                </button>
              </div>
              <div className={styles.signPadWrap}>
                <canvas
                  ref={canvasRef}
                  className={styles.signCanvas}
                  aria-label="Zone de signature"
                />
                <div ref={hintRef} className={styles.signPadHint}>
                  Signez ici — souris, stylet ou doigt
                </div>
              </div>
            </div>
          </div>

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
              Complétez et signez ci-dessus, puis exportez le document complet en PDF. Vos
              informations restent sur votre appareil.
            </div>
          </div>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={() => {
              if (isFormComplete && isSigned) window.print();
              else if (!isFormComplete)
                alert(
                  "Veuillez remplir vos informations (nom, titre, date, courriel) avant de télécharger le PDF.",
                );
              else
                alert(
                  "Veuillez d'abord dessiner votre signature dans le cadre ci-dessus avant de télécharger le PDF.",
                );
            }}
            style={{
              opacity: isFormComplete && isSigned ? 1 : 0.65,
              cursor: isFormComplete && isSigned ? "pointer" : "not-allowed",
            }}
          >
            <span aria-hidden="true">⤓</span> Télécharger le PDF
          </button>
        </div>
      </div>
    </section>
  );
}
