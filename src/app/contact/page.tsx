'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown, Check, ArrowRight } from 'lucide-react';
import { FaLinkedin, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
  bg: '#FFFFFF',
  surface: 'rgba(0,0,0,0.025)',
  surfaceHover: 'rgba(27,60,94,0.09)',
  surfaceActive: '#1B3C5E',
  border: 'rgba(0,0,0,0.09)',
  borderHover: 'rgba(0,0,0,0.22)',
  borderActive: '#1B3C5E',
  text: '#0D1F35',
  textSub: 'rgba(13,31,53,0.58)',
  textMuted: 'rgba(13,31,53,0.52)',
  textOnActive: '#FFFFFF',
  progress: '#1B3C5E',
  accent: '#D4711A',
};

// ─── Breakpoint ───────────────────────────────────────────────────────────────
function useBreakpoint() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return mobile;
}

// ─── Types ────────────────────────────────────────────────────────────────────
type StepKind = 'welcome' | 'input' | 'textarea' | 'choice' | 'yesno' | 'scale' | 'success';

interface FormOption {
  key: string;
  label: string;
  value: string;
}

interface FormStep {
  id: string;
  kind: StepKind;
  number?: number;
  question?: string;
  subtitle?: string;
  placeholder?: string;
  field?: keyof FormData;
  options?: FormOption[];
}

interface FormData {
  name: string;
  company: string;
  challenge: string;
  stage: string;
  blockers: string;
  opportunity: string;
  targetUsers: string;
  goalBlockers: string;
  investment: string;
  validation: string;
  commitment: string;
  readiness: string;
  determination: string;
  callCommitment: string;
  questions: string;
}

// ─── Steps ────────────────────────────────────────────────────────────────────
const STEPS: FormStep[] = [
  { id: 'welcome', kind: 'welcome' },
  {
    id: 'name', kind: 'input', number: 1,
    question: "Avant tout,\nquel est votre prénom ?",
    placeholder: 'Votre réponse ici...',
    field: 'name',
  },
  {
    id: 'company', kind: 'choice', number: 2,
    question: '',
    field: 'company',
    options: [
      { key: 'A', label: 'Oui, une entreprise déjà créée', value: 'created' },
      { key: 'B', label: 'Oui, en cours de création', value: 'creating' },
      { key: 'C', label: 'Non, pas encore', value: 'none' },
    ],
  },
  {
    id: 'challenge', kind: 'textarea', number: 3,
    question: 'Quel est le principal défi que\nvous souhaitez résoudre ?',
    subtitle: 'Expliquez le problème principal que votre application doit résoudre pour vos utilisateurs ou votre marché.',
    placeholder: 'Votre réponse ici...',
    field: 'challenge',
  },
  {
    id: 'stage', kind: 'choice', number: 4,
    question: "Aujourd'hui, où en êtes-vous\nconcrètement avec votre projet ?",
    field: 'stage',
    options: [
      { key: 'A', label: 'Idée', value: 'idea' },
      { key: 'B', label: 'En cours de développement', value: 'developing' },
      { key: 'C', label: 'Déjà lancé', value: 'launched' },
    ],
  },
  {
    id: 'blockers', kind: 'textarea', number: 5,
    question: "Qu'est-ce qui bloque\nvotre progression actuellement ?",
    placeholder: 'Votre réponse ici...',
    field: 'blockers',
  },
  {
    id: 'opportunity', kind: 'textarea', number: 6,
    question: 'Quelle est la plus grande opportunité\nque vous voyez avec ce projet ?',
    placeholder: 'Votre réponse ici...',
    field: 'opportunity',
  },
  {
    id: 'targetUsers', kind: 'choice', number: 7,
    question: "Combien d'utilisateurs ou clients souhaitez-vous\natteindre dans les 4 prochains mois ?",
    field: 'targetUsers',
    options: [
      { key: 'A', label: 'Moins de 1 000', value: '<1k' },
      { key: 'B', label: '1 000 – 2 000', value: '1k-2k' },
      { key: 'C', label: '2 000 – 5 000', value: '2k-5k' },
      { key: 'D', label: '5 000+', value: '5k+' },
    ],
  },
  {
    id: 'goalBlockers', kind: 'textarea', number: 8,
    question: "Qu'est-ce qui vous empêche\naujourd'hui d'atteindre cet objectif ?",
    placeholder: 'Votre réponse ici...',
    field: 'goalBlockers',
  },
  {
    id: 'investment', kind: 'choice', number: 9,
    question: "Quel niveau d'investissement\navez-vous prévu pour ce projet ?",
    subtitle: "Cela nous aide à vous orienter vers l'approche la plus cohérente en fonction de vos objectifs.",
    field: 'investment',
    options: [
      { key: 'A', label: 'Moins de 5 000 $', value: '<5k' },
      { key: 'B', label: '5 000 $ à 10 000 $', value: '5k-10k' },
      { key: 'C', label: '10 000 $ à 20 000 $', value: '10k-20k' },
      { key: 'D', label: '20 000 $ et plus', value: '20k+' },
      { key: 'E', label: 'Je souhaite en discuter', value: 'discuss' },
    ],
  },
  {
    id: 'validation', kind: 'textarea', number: 10,
    question: "Avez-vous déjà validé certains aspects\nde ce projet auprès de votre marché ?",
    subtitle: "Tests utilisateurs, retours clients, ventes, liste d'attente, prototype, landing page, etc.",
    placeholder: 'Votre réponse ici...',
    field: 'validation',
  },
  {
    id: 'commitment', kind: 'yesno', number: 11,
    question: "Êtes-vous prêt à vous impliquer\nactivement dans le projet ?",
    subtitle: "Cela inclut votre disponibilité pour participer à 2 meetings par semaine, prendre des décisions et valider les étapes sous 24h.",
    field: 'commitment',
  },
  {
    id: 'readiness', kind: 'choice', number: 12,
    question: "Seriez-vous en mesure\nd'initier le projet ?",
    subtitle: "Dans le cas où une approche structurée répond à vos besoins.",
    field: 'readiness',
    options: [
      { key: 'A', label: 'Oui, si la solution correspond à mes attentes', value: 'yes-fit' },
      { key: 'B', label: 'Oui, sous certaines conditions', value: 'conditional' },
      { key: 'C', label: 'Je suis encore en réflexion', value: 'considering' },
      { key: 'D', label: 'Non pour le moment', value: 'no' },
    ],
  },
  {
    id: 'determination', kind: 'scale', number: 13,
    question: "Sur une échelle de 1 à 10,\nà quel point êtes-vous déterminé\nà faire réussir ce projet ?",
    field: 'determination',
  },
  {
    id: 'callCommitment', kind: 'yesno', number: 14,
    question: "Je comprends que cet appel est une\nétape stratégique et je m'engage\nà être présent et préparé",
    field: 'callCommitment',
  },
  {
    id: 'questions', kind: 'textarea', number: 15,
    question: "Avez-vous des questions\nsur notre solution ?",
    placeholder: 'Votre réponse ici...',
    field: 'questions',
  },
  { id: 'success', kind: 'success' },
];

const TOTAL_CONTENT = 15;

// ─── Animation ────────────────────────────────────────────────────────────────
const variants = {
  enter: (d: number) => ({ y: d > 0 ? '55%' : '-55%', opacity: 0, filter: 'blur(7px)' }),
  center: {
    y: 0, opacity: 1, filter: 'blur(0px)',
    transition: { type: 'spring' as const, stiffness: 255, damping: 32, mass: 0.95 },
  },
  exit: (d: number) => ({
    y: d > 0 ? '-40%' : '40%', opacity: 0, filter: 'blur(7px)',
    transition: { duration: 0.26, ease: [0.4, 0, 1, 1] as [number, number, number, number] },
  }),
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ContactPage() {
  const mobile = useBreakpoint();
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '', company: '', challenge: '', stage: '',
    blockers: '', opportunity: '', targetUsers: '', goalBlockers: '',
    investment: '', validation: '', commitment: '', readiness: '',
    determination: '', callCommitment: '', questions: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const transitioning = useRef(false);
  const formDataRef = useRef(formData);
  formDataRef.current = formData;

  const step = STEPS[idx];
  const progress = step.number != null
    ? ((step.number - 1) / TOTAL_CONTENT) * 100
    : step.kind === 'success' ? 100 : 0;

  const submit = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formDataRef.current),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'Submission failed');
      setDir(1);
      setIdx(STEPS.length - 1);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  }, [submitting]);

  const navigate = useCallback((delta: number) => {
    if (transitioning.current) return;
    if (delta > 0 && idx === STEPS.length - 2) {
      submit();
      return;
    }
    const next = idx + delta;
    if (next < 0 || next >= STEPS.length) return;
    transitioning.current = true;
    setDir(delta);
    setIdx(next);
    setTimeout(() => { transitioning.current = false; }, 600);
  }, [idx, submit]);

  const handleChoice = useCallback((field: keyof FormData, value: string) => {
    setFormData(p => ({ ...p, [field]: value }));
    setTimeout(() => navigate(1), 390);
  }, [navigate]);

  const getQuestion = useCallback((s: FormStep): string => {
    if (s.id === 'company') {
      const n = formData.name.trim();
      return n
        ? `Merci, ${n}.\nAvez-vous déjà une entreprise\nou une structure liée à ce projet ?`
        : `Avez-vous déjà une entreprise\nou une structure liée à ce projet ?`;
    }
    return s.question || '';
  }, [formData.name]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (transitioning.current) return;
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      const inField = tag === 'input' || tag === 'textarea';

      if (step.kind === 'welcome') {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(1); }
        return;
      }
      if (step.kind === 'success') return;

      if (!inField) {
        if (step.kind === 'choice' && step.options) {
          const opt = step.options.find(o => o.key === e.key.toUpperCase());
          if (opt && step.field) { handleChoice(step.field, opt.value); return; }
        }
        if (step.kind === 'yesno' && step.field) {
          if (e.key.toUpperCase() === 'Y') { handleChoice(step.field, 'yes'); return; }
          if (e.key.toUpperCase() === 'N') { handleChoice(step.field, 'no'); return; }
        }
        if (step.kind === 'scale' && step.field) {
          if (e.key >= '1' && e.key <= '9') { handleChoice(step.field, e.key); return; }
          if (e.key === '0') { handleChoice(step.field, '10'); return; }
        }
        if (e.key === 'Enter') { e.preventDefault(); navigate(1); }
        if (e.key === 'ArrowDown') { e.preventDefault(); navigate(1); }
        if (e.key === 'ArrowUp') { e.preventDefault(); navigate(-1); }
      } else {
        if (step.kind === 'input' && e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault(); navigate(1);
        }
        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
          e.preventDefault(); navigate(1);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [idx, step, navigate, handleChoice]);

  const isLastContent = step.id === 'questions';
  const val = step.field ? formData[step.field] : '';
  const choiceHasValue = (step.kind === 'choice' || step.kind === 'yesno' || step.kind === 'scale') && !!val;

  return (
    <div
      className="font-sans"
      style={{ position: 'fixed', inset: 0, background: C.bg, color: C.text, overflow: 'hidden' }}
    >
      {/* Grain overlay */}
      <svg
        aria-hidden="true"
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5, opacity: 0.055 }}
      >
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Progress bar */}
      <div
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'rgba(0,0,0,0.08)', zIndex: 20 }}
      >
        <motion.div
          style={{ height: '100%', background: C.progress }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>

      {/* Logo */}
      <div style={{ position: 'absolute', top: mobile ? 20 : 28, left: mobile ? 16 : 36, zIndex: 30 }}>
        <Link
          href="/"
          style={{
            fontSize: '11px', fontWeight: 800, letterSpacing: '0.28em',
            textTransform: 'uppercase', color: C.text, textDecoration: 'none',
          }}
        >
          PROGIX
        </Link>
      </div>

      {/* Step counter — bottom-left, mirrors nav arrows at bottom-right */}
      {step.number != null && (
        <div style={{
          position: 'absolute', bottom: 28, left: mobile ? 20 : 36, zIndex: 30,
          display: 'flex', alignItems: 'center', gap: '5px',
        }}>
          <span style={{ fontSize: mobile ? '16px' : '20px', fontWeight: 800, color: C.text, letterSpacing: '0.02em', lineHeight: 1 }}>
            {String(step.number).padStart(2, '0')}
          </span>
          <span style={{ fontSize: mobile ? '11px' : '14px', color: 'rgba(0,0,0,0.18)', fontWeight: 300, lineHeight: 1 }}>/</span>
          <span style={{ fontSize: mobile ? '12px' : '15px', fontWeight: 500, color: C.textMuted, letterSpacing: '0.04em', lineHeight: 1 }}>
            {String(TOTAL_CONTENT).padStart(2, '0')}
          </span>
        </div>
      )}

      {/* Content — outer div scrolls on mobile, inner div centers */}
      <div style={{
        position: 'absolute', inset: 0,
        overflowY: mobile ? 'auto' : 'hidden',
        overflowX: 'hidden',
      }}>
        <div style={{
          minHeight: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: mobile ? '72px 20px 80px' : '80px 40px',
          boxSizing: 'border-box',
        }}>
          <div style={{ width: '100%', maxWidth: step.kind === 'welcome' ? '1020px' : '680px', transition: 'max-width 0.4s ease' }}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={idx} custom={dir} variants={variants} initial="enter" animate="center" exit="exit">
                {step.kind === 'welcome' && <WelcomeStep onStart={() => navigate(1)} />}

                {(step.kind === 'input' || step.kind === 'textarea') && step.field && (
                  <InputStep
                    step={step}
                    question={getQuestion(step)}
                    value={formData[step.field]}
                    onChange={v => setFormData(p => ({ ...p, [step.field!]: v }))}
                    onNext={() => navigate(1)}
                    isLast={isLastContent}
                    submitting={submitting}
                    error={submitError}
                  />
                )}

                {step.kind === 'choice' && step.field && step.options && (
                  <ChoiceStep
                    step={step}
                    question={getQuestion(step)}
                    value={formData[step.field]}
                    onSelect={v => handleChoice(step.field!, v)}
                  />
                )}

                {step.kind === 'yesno' && step.field && (
                  <YesNoStep
                    step={step}
                    question={getQuestion(step)}
                    value={formData[step.field]}
                    onSelect={v => handleChoice(step.field!, v)}
                  />
                )}

                {step.kind === 'scale' && step.field && (
                  <ScaleStep
                    step={step}
                    question={getQuestion(step)}
                    value={formData[step.field]}
                    onSelect={v => handleChoice(step.field!, v)}
                  />
                )}

                {step.kind === 'success' && <SuccessStep name={formData.name} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Nav arrows — same square buttons on all screen sizes */}
      {step.kind !== 'welcome' && step.kind !== 'success' && (
        <div style={{
          position: 'absolute', bottom: 28, right: mobile ? 20 : 36, zIndex: 30,
          display: 'flex', flexDirection: 'column', gap: '6px',
        }}>
          <motion.button
            whileHover={idx > 1 ? { scale: 1.08 } : {}}
            whileTap={idx > 1 ? { scale: 0.92 } : {}}
            onClick={() => navigate(-1)}
            disabled={idx <= 1}
            style={{
              width: mobile ? 42 : 38, height: mobile ? 42 : 38,
              border: `1px solid ${idx <= 1 ? 'rgba(0,0,0,0.06)' : C.border}`,
              background: 'transparent',
              color: idx <= 1 ? 'rgba(0,0,0,0.15)' : C.textMuted,
              borderRadius: '3px', cursor: idx <= 1 ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <ArrowUp size={13} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => navigate(1)}
            style={{
              width: mobile ? 42 : 38, height: mobile ? 42 : 38,
              border: `1px solid ${choiceHasValue ? C.borderActive : C.border}`,
              background: choiceHasValue ? 'rgba(0,0,0,0.05)' : 'transparent',
              color: choiceHasValue ? C.text : C.textMuted,
              borderRadius: '3px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <ArrowDown size={13} />
          </motion.button>
        </div>
      )}

      {/* Welcome scroll hint — desktop only */}
      {step.kind === 'welcome' && !mobile && (
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          style={{
            position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
            zIndex: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
            color: C.textMuted,
          }}
        >
          <span style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500 }}>
            Entrée
          </span>
          <ArrowDown size={11} />
        </motion.div>
      )}
    </div>
  );
}

// ─── Welcome ──────────────────────────────────────────────────────────────────

function WelcomeStep({ onStart }: { onStart: () => void }) {
  const mobile = useBreakpoint();
  const stats = [
    { number: '50+', label: 'Projets accompagnés' },
    { number: '< 24h', label: 'Délai de réponse' },
    { number: '6 min', label: 'Pour compléter' },
  ];

  return (
    <div style={{ display: 'flex', gap: mobile ? '24px' : '48px', alignItems: 'stretch', flexWrap: 'wrap' }}>
      {/* Left column */}
      <div style={{ flex: '1 1 340px', textAlign: mobile ? 'center' : 'left' }}>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          style={{
            fontSize: '9px', fontWeight: 600, letterSpacing: '0.32em',
            textTransform: 'uppercase', color: C.accent, marginBottom: mobile ? '16px' : '28px',
          }}
        >
          Qualification — Appel Stratégique
        </motion.p>

        <h1
          style={{
            fontSize: mobile ? 'clamp(1.6rem, 7vw, 2.2rem)' : 'clamp(1.75rem, 3.8vw, 3.4rem)',
            fontWeight: 800, lineHeight: 1.25, letterSpacing: '-0.028em',
            color: C.text, marginBottom: mobile ? '14px' : '20px',
          }}
        >
          {[
            { text: 'Parlez-nous', color: C.text },
            { text: 'de', color: C.text },
            { text: 'votre', color: C.text },
            { text: "projet d'application", color: C.surfaceActive },
            { text: 'ou', color: C.text },
            { text: 'SaaS.', color: C.text },
          ].map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.15 + i * 0.14, type: 'spring', stiffness: 160, damping: 22 }}
              style={{ display: 'inline-block', color: word.color, marginRight: '0.26em' }}
            >
              {word.text}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{
            fontSize: mobile ? '0.82rem' : '0.93rem', fontWeight: 300, lineHeight: 1.65,
            color: C.textSub, marginBottom: mobile ? '20px' : '36px',
          }}
        >
          Répondez à quelques questions rapides afin que nous puissions préparer une stratégie claire pour le développement, le lancement et l&apos;acquisition de vos premiers utilisateurs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.33 }}
          style={{ display: 'flex', flexDirection: 'column', gap: mobile ? '10px' : '0', alignItems: mobile ? 'stretch' : 'flex-start' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <motion.button
              whileHover={{ scale: 1.02, background: '#1B3C5E' }}
              whileTap={{ scale: 0.98 }}
              onClick={onStart}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                padding: mobile ? '14px 28px' : '15px 34px',
                width: mobile ? '100%' : undefined,
                background: C.text, color: C.bg,
                border: 'none', borderRadius: '3px',
                fontSize: '12px', fontWeight: 700, fontFamily: 'inherit',
                letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer',
              }}
            >
              Commencer
              <ArrowRight size={14} />
            </motion.button>
            {!mobile && (
              <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(13,31,53,0.60)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                6 minutes suffisent
              </span>
            )}
          </div>
          {mobile && (
            <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(13,31,53,0.50)', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center' }}>
              6 minutes suffisent
            </span>
          )}
        </motion.div>
      </div>

      {/* Right column — stats panel */}
      <motion.div
        initial={{ opacity: 0, x: 32 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 28 }}
        style={{
          flex: '1 1 240px',
          background: 'linear-gradient(150deg, #0D1F35 0%, #162d48 100%)',
          borderRadius: '6px',
          padding: mobile ? '14px 16px' : '36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Decorative glow */}
        <div style={{
          position: 'absolute', top: -60, right: -60,
          width: 200, height: 200, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(91,156,200,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Header label */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          style={{
            fontSize: '9px', fontWeight: 600, letterSpacing: '0.3em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: mobile ? '8px' : '28px',
            textAlign: mobile ? 'center' : 'left',
          }}
        >
          Pourquoi Progix
        </motion.p>

        {/* Stats with dividers */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {stats.map(({ number, label }, i) => (
            <div key={label}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.34 + i * 0.1 }}
                style={{ padding: mobile ? '8px 0' : '18px 0', textAlign: mobile ? 'center' : 'left' }}
              >
                <div style={{ fontSize: mobile ? 'clamp(1.4rem, 5vw, 1.9rem)' : 'clamp(1.9rem, 3.6vw, 2.7rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#FFFFFF', lineHeight: 1, marginBottom: '5px' }}>
                  {number}
                </div>
                <div style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)' }}>
                  {label}
                </div>
              </motion.div>
              {i < stats.length - 1 && (
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />
              )}
            </div>
          ))}
        </div>

        {/* Testimonial — desktop only */}
        {!mobile && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.66 }}
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '22px', marginTop: '8px' }}
          >
            <p style={{ fontSize: '0.81rem', fontWeight: 300, lineHeight: 1.72, color: 'rgba(255,255,255,0.52)', fontStyle: 'italic' }}>
              &ldquo;Du concept au lancement, une équipe structurée et réactive à chaque étape.&rdquo;
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

// ─── Animated Words ───────────────────────────────────────────────────────────

function AnimatedWords({ text, baseDelay = 0 }: { text: string; baseDelay?: number }) {
  let wordIndex = 0;
  return (
    <>
      {text.split('\n').map((line, li, lines) => (
        <React.Fragment key={li}>
          {line.split(' ').filter(Boolean).map((word) => {
            const idx = wordIndex++;
            return (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 16, filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: baseDelay + idx * 0.04, type: 'spring', stiffness: 220, damping: 26 }}
                style={{ display: 'inline-block', marginRight: '0.26em' }}
              >
                {word}
              </motion.span>
            );
          })}
          {li < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );
}

// ─── Step Header ──────────────────────────────────────────────────────────────

function StepHeader({ number, question, subtitle }: {
  number?: number; question: string; subtitle?: string;
}) {
  return (
    <div style={{ marginBottom: '30px' }}>
      {number != null && (
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.28 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}
        >
          <span style={{
            fontSize: '13px', fontWeight: 700, color: C.accent,
            letterSpacing: '0.12em', lineHeight: 1,
            background: 'rgba(212,113,26,0.08)',
            border: '1px solid rgba(212,113,26,0.22)',
            borderRadius: '4px', padding: '4px 9px',
          }}>
            {String(number).padStart(2, '0')}
          </span>
          <span style={{ color: 'rgba(13,31,53,0.22)', fontSize: '12px' }}>→</span>
        </motion.div>
      )}
      <h2
        style={{
          fontSize: 'clamp(1.4rem, 5.5vw, 2.7rem)',
          fontWeight: 800, lineHeight: 1.3, letterSpacing: '-0.022em',
          color: C.text, marginBottom: subtitle ? '10px' : 0,
        }}
      >
        <AnimatedWords text={question} />
      </h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36, delay: 0.06 }}
          style={{ fontSize: '0.84rem', fontWeight: 300, lineHeight: 1.72, color: C.textSub }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

// ─── OK Button ────────────────────────────────────────────────────────────────

function OkButton({ onClick, label = 'OK', loading = false }: {
  onClick: () => void; label?: string; loading?: boolean;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.16 }}
      whileHover={!loading ? { scale: 1.02, background: '#1B3C5E' } : {}}
      whileTap={!loading ? { scale: 0.97 } : {}}
      onClick={onClick}
      disabled={loading}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '10px',
        padding: '13px 26px', background: C.text, color: C.bg,
        border: 'none', borderRadius: '3px',
        fontSize: '12px', fontWeight: 700, fontFamily: 'inherit',
        letterSpacing: '0.1em', textTransform: 'uppercase',
        cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.15s',
      }}
    >
      {loading ? 'Envoi en cours...' : label}
      {!loading && (
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '20px', height: '20px', background: 'rgba(0,0,0,0.1)',
          borderRadius: '2px', fontSize: '11px', fontWeight: 600,
        }}>↵</span>
      )}
    </motion.button>
  );
}

// ─── Input Step ───────────────────────────────────────────────────────────────

function InputStep({ step, question, value, onChange, onNext, isLast, submitting, error }: {
  step: FormStep; question: string; value: string;
  onChange: (v: string) => void; onNext: () => void;
  isLast: boolean; submitting: boolean; error: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      if (step.kind === 'textarea') textareaRef.current?.focus();
      else inputRef.current?.focus();
    }, 440);
    return () => clearTimeout(t);
  }, [step.kind]);

  const baseStyle: React.CSSProperties = {
    width: '100%', background: 'transparent', outline: 'none', border: 'none',
    borderBottom: `1px solid ${C.border}`, color: C.text,
    fontSize: '1.08rem', fontWeight: 400, fontFamily: 'inherit',
    padding: '10px 0', transition: 'border-color 0.2s',
  };

  const focusIn = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderBottomColor = 'rgba(27,60,94,0.55)';
  };
  const focusOut = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderBottomColor = C.border;
  };

  return (
    <div>
      <StepHeader number={step.number} question={question} subtitle={step.subtitle} />
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} style={{ marginBottom: '28px' }}>
        {step.kind === 'textarea' ? (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={step.placeholder}
            rows={4}
            style={{ ...baseStyle, resize: 'none' }}
            onFocus={focusIn}
            onBlur={focusOut}
            className="placeholder:text-black/25"
          />
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={step.placeholder}
            style={baseStyle}
            onFocus={focusIn}
            onBlur={focusOut}
            className="placeholder:text-black/25"
          />
        )}
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ color: 'rgba(255,85,85,0.9)', fontSize: '0.8rem', marginBottom: '16px' }}
        >
          {error}
        </motion.p>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <OkButton
          onClick={onNext}
          label={isLast ? 'Soumettre' : 'OK'}
          loading={isLast && submitting}
        />
        {!isLast && (
          <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(13,31,53,0.60)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {step.kind === 'textarea' ? '⌘ + Entrée' : 'Entrée ↵'}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Choice Step ──────────────────────────────────────────────────────────────

function ChoiceStep({ step, question, value, onSelect }: {
  step: FormStep; question: string; value: string;
  onSelect: (v: string) => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <div>
      <StepHeader number={step.number} question={question} subtitle={step.subtitle} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '26px' }}>
        {step.options!.map((opt, i) => {
          const active = value === opt.value;
          const lit = active || hovered === opt.value;
          return (
            <motion.button
              key={opt.value}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.04 * i, type: 'spring', stiffness: 420, damping: 36 }}
              whileHover={!active ? { x: 4 } : {}}
              onMouseEnter={() => { if (!active) setHovered(opt.value); }}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelect(opt.value)}
              style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '13px 16px', textAlign: 'left',
                border: `1px solid ${lit ? C.borderActive : C.border}`,
                background: lit ? C.surfaceActive : C.surface,
                borderRadius: '3px', cursor: 'pointer',
                transition: 'all 0.17s',
              }}
            >
              <span style={{
                flexShrink: 0, width: '24px', height: '24px', borderRadius: '2px',
                border: `1px solid ${lit ? C.textOnActive : C.border}`,
                background: lit ? C.textOnActive : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '10px', fontWeight: 700, letterSpacing: '0.04em',
                color: lit ? C.surfaceActive : C.textMuted, transition: 'all 0.17s',
              }}>
                {opt.key}
              </span>
              <span style={{
                flex: 1, fontSize: '0.91rem', fontWeight: lit ? 600 : 400,
                color: lit ? C.textOnActive : C.textSub, fontFamily: 'inherit',
                transition: 'all 0.17s',
              }}>
                {opt.label}
              </span>
              {active && (
                <motion.span initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ color: C.textOnActive, flexShrink: 0 }}>
                  <Check size={13} />
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}
        style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(13,31,53,0.60)', letterSpacing: '0.12em', textTransform: 'uppercase' }}
      >
        Touche A – {step.options![step.options!.length - 1].key} pour sélectionner
      </motion.p>
    </div>
  );
}

// ─── Yes/No Step ──────────────────────────────────────────────────────────────

function YesNoStep({ step, question, value, onSelect }: {
  step: FormStep; question: string; value: string;
  onSelect: (v: string) => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const opts = [
    { key: 'Y', label: 'Oui', value: 'yes' },
    { key: 'N', label: 'Non', value: 'no' },
  ];
  return (
    <div>
      <StepHeader number={step.number} question={question} subtitle={step.subtitle} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', maxWidth: '400px', marginBottom: '26px' }}>
        {opts.map((opt, i) => {
          const active = value === opt.value;
          const lit = active || hovered === opt.value;
          return (
            <motion.button
              key={opt.value}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i }}
              onMouseEnter={() => { if (!active) setHovered(opt.value); }}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelect(opt.value)}
              style={{
                padding: '22px 16px', textAlign: 'center',
                border: `1px solid ${lit ? C.borderActive : C.border}`,
                background: lit ? C.surfaceActive : C.surface,
                borderRadius: '3px', cursor: 'pointer', transition: 'all 0.17s',
              }}
            >
              <div style={{
                fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em',
                textTransform: 'uppercase', color: lit ? C.textOnActive : C.textMuted, marginBottom: '8px',
              }}>
                {opt.key}
              </div>
              <div style={{
                fontSize: '1.05rem', fontWeight: lit ? 700 : 400,
                color: lit ? C.textOnActive : C.textSub,
              }}>
                {opt.label}
              </div>
            </motion.button>
          );
        })}
      </div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.16 }}
        style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(13,31,53,0.60)', letterSpacing: '0.12em', textTransform: 'uppercase' }}
      >
        Touche Y / N pour sélectionner
      </motion.p>
    </div>
  );
}

// ─── Scale Step ───────────────────────────────────────────────────────────────

function ScaleStep({ step, question, value, onSelect }: {
  step: FormStep; question: string; value: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div>
      <StepHeader number={step.number} question={question} />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ marginBottom: '12px' }}
      >
        {[['1', '2', '3', '4', '5'], ['6', '7', '8', '9', '10']].map((row, ri) => (
          <div key={ri} style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '8px' }}>
            {row.map(n => {
              const active = value === n;
              return (
                <motion.button
                  key={n}
                  whileHover={!active ? { scale: 1.05, background: C.surfaceActive, borderColor: C.borderActive, color: C.textOnActive } : { scale: 1.05 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => onSelect(n)}
                  style={{
                    padding: '18px 8px', textAlign: 'center',
                    border: `1px solid ${active ? C.borderActive : C.border}`,
                    background: active ? C.surfaceActive : C.surface,
                    color: active ? C.textOnActive : C.textSub,
                    borderRadius: '3px', cursor: 'pointer',
                    fontSize: '1.05rem', fontWeight: active ? 700 : 400,
                    fontFamily: 'inherit', transition: 'all 0.17s',
                  }}
                >
                  {n}
                </motion.button>
              );
            })}
          </div>
        ))}
      </motion.div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        {['Moins probable', 'Plus probable'].map(label => (
          <span key={label} style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(13,31,53,0.60)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {label}
          </span>
        ))}
      </div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.26 }}
        style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(13,31,53,0.60)', letterSpacing: '0.12em', textTransform: 'uppercase' }}
      >
        Touche 1 – 9, 0 = 10 pour sélectionner
      </motion.p>
    </div>
  );
}

// ─── Success ──────────────────────────────────────────────────────────────────

const SOCIAL = [
  { Icon: FaLinkedin, href: 'https://linkedin.com/company/progix', label: 'LinkedIn' },
  { Icon: FaInstagram, href: 'https://www.instagram.com/teamprogix/', label: 'Instagram' },
  { Icon: FaFacebook, href: 'https://www.facebook.com/progixinc', label: 'Facebook' },
  { Icon: FaTwitter, href: 'https://twitter.com/progix', label: 'Twitter' },
];

function SuccessStep({ name }: { name: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 18 }}
        style={{
          width: '54px', height: '54px', borderRadius: '50%',
          border: '1px solid rgba(13,31,53,0.18)',
          background: 'rgba(13,31,53,0.04)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 28px',
        }}
      >
        <Check size={22} style={{ color: C.text }} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14, type: 'spring', stiffness: 240, damping: 26 }}
        style={{
          fontSize: 'clamp(2.4rem, 6.5vw, 4.4rem)',
          fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.025em',
          color: C.text, marginBottom: '16px',
        }}
      >
        {name ? `Merci, ${name}.` : 'Merci.'}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
        style={{
          fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.82,
          color: C.textSub, maxWidth: '380px', margin: '0 auto 44px',
        }}
      >
        Votre réponse a bien été reçue. Notre équipe vous contactera dans les prochaines 24 heures pour planifier votre appel stratégique.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.30 }}
        style={{ marginBottom: '40px' }}
      >
        <p style={{
          fontSize: '9px', fontWeight: 600, letterSpacing: '0.28em',
          textTransform: 'uppercase', color: C.textMuted, marginBottom: '18px',
        }}>
          Suivez-nous
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          {SOCIAL.map(({ Icon, href, label }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.36 + i * 0.06, type: 'spring', stiffness: 340, damping: 24 }}
              whileHover={{ scale: 1.14, borderColor: 'rgba(27,60,94,0.5)', color: C.text }}
              style={{
                width: '44px', height: '44px',
                border: `1px solid ${C.border}`, borderRadius: '3px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: C.textMuted, textDecoration: 'none', transition: 'all 0.18s',
              }}
              aria-label={label}
            >
              <Icon size={17} />
            </motion.a>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.52 }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: C.textMuted, textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = C.text; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = C.textMuted; }}
        >
          Retour à l&apos;accueil
          <ArrowRight size={12} />
        </Link>
      </motion.div>
    </div>
  );
}
