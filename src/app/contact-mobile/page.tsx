'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Barlow } from 'next/font/google';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.08 * i },
  }),
};

type SectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  thumbVisible?: boolean;
};

const Section: React.FC<SectionProps> = ({
  id,
  title,
  children,
  thumbVisible = false,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  return (
    <section
      id={id}
      ref={ref}
      className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 mb-[74px] md:mb-[106px]"
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        custom={0}
        className="mb-3"
      >
        <h2 className="text-black font-semibold text-[15px] md:text-[16px]">
          {title}
        </h2>
        <motion.span
          initial={{ opacity: 0, scale: 0.6, y: -2 }}
          animate={
            thumbVisible
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.6, y: -2 }
          }
          transition={{ type: 'spring', stiffness: 500, damping: 26 }}
          className="inline-block ml-2 text-black"
          aria-hidden
        >
          👍
        </motion.span>
      </motion.div>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        custom={1}
      >
        {children}
      </motion.div>
    </section>
  );
};

interface ChoiceButtonProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({
  label,
  active = false,
  onClick,
}) => (
  <motion.button
    whileHover={{ scale: 1.03, boxShadow: '0 0 0 1px rgba(29, 71, 96, 0.3)' }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    onClick={onClick}
    aria-pressed={active}
    className={`inline-flex items-center justify-center px-1 md:px-1 lg:px-1 py-[14px] md:py-4 lg:py-4 rounded-full border text-[15px] md:text-[15px] font-semibold tracking-[0.04em] min-w-[120px] md:min-w-[140px] lg:min-w-[160px] backdrop-blur-sm transition-colors duration-300 ${
      active
        ? 'bg-[#1D4760] text-white border-[#1D4760]'
        : 'bg-transparent text-[#1D4760] border-[#1D4760]/20 hover:bg-[#1D4760] hover:text-white hover:border-[#1D4760]/60'
    }`}
    type="button"
  >
    {label}
  </motion.button>
);

export default function ContactMobilePage() {
  const [project, setProject] = React.useState<string | null>(null);
  const [timeline, setTimeline] = React.useState<string | null>(null);
  const [budget, setBudget] = React.useState<string | null>(null);
  const [source, setSource] = React.useState<string | null>(null);
  const [thumbFor, setThumbFor] = React.useState<string | null>(null);

  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [projectDescription, setProjectDescription] = React.useState('');

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitMessage, setSubmitMessage] = React.useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const smoothScrollTo = (targetY: number, duration = 750) => {
    const startY = window.scrollY || window.pageYOffset;
    const distance = targetY - startY;
    let startTime: number | null = null;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);
      window.scrollTo(0, startY + distance * eased);
      if (elapsed < duration) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const targetY = (window.scrollY || window.pageYOffset) + rect.top - 5;
    smoothScrollTo(targetY, 750);
  };

  const showThumbThenScroll = (currentId: string, nextId: string) => {
    setThumbFor(currentId);
    window.setTimeout(() => {
      goTo(nextId);
    }, 450);
    window.setTimeout(() => setThumbFor(null), 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !project ||
      !timeline ||
      !budget ||
      !source ||
      !fullName ||
      !email ||
      !phone ||
      !projectDescription
    ) {
      setSubmitMessage({
        type: 'error',
        text: 'Veuillez remplir tous les champs obligatoires pour votre projet mobile.',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project,
          timeline,
          budget,
          source,
          fullName,
          email,
          phone,
          projectDescription,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitMessage({
          type: 'success',
          text: 'Merci! Votre demande mobile a bien été reçue. Nous reviendrons vers vous rapidement.',
        });
        setProject(null);
        setTimeline(null);
        setBudget(null);
        setSource(null);
        setFullName('');
        setEmail('');
        setPhone('');
        setProjectDescription('');
        window.location.assign('/confirmation');
      } else {
        setSubmitMessage({
          type: 'error',
          text: "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
        });
      }
    } catch {
      setSubmitMessage({
        type: 'error',
        text: "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black pt-[120px] md:pt-[80px]">
      <div className={`${barlow.className} pb-24`}>
        {submitMessage && (
          <div className="fixed top-4 right-4 z-50 max-w-sm">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`px-4 py-3 rounded-lg border ${
                submitMessage.type === 'success'
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              {submitMessage.text}
            </motion.div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <header className="pt-[140px] md:pt-[180px] pb-8 md:pb-16">
            <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="uppercase tracking-[0.12em] text-[11px] text-black"
              >
                devis app mobile
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="mt-2 text-[11vw] md:text-[3.75rem] lg:text-[4.5rem] md:leading-[1] leading-[0.95] font-extrabold -tracking-[0.02em] md:whitespace-nowrap text-black"
              >
                Soumission app mobile
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-8 md:mt-10 max-w-[520px] text-black font-medium text-[15px] md:text-[16px]"
              >
                Donnez-nous les informations clés sur votre application mobile
                (use cases, utilisateurs, intégrations). Nous reviendrons avec
                une proposition technique et un plan de livraison.
              </motion.p>
            </div>
          </header>

          <Section
            id="sec-quoi"
            title="Quel type d'app mobile souhaitez-vous? *"
            thumbVisible={thumbFor === 'sec-quoi'}
          >
            <div className="mt-2 space-y-6">
              <p className="text-black font-medium text-[15px] md:text-[16px]">
                Sélectionnez le cas d’usage principal de votre application.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {[
                  ['ecommerce', 'Application e-commerce'],
                  ['reservation', 'Application de réservation / services'],
                  ['entreprise', 'Application d’entreprise (CRM / ERP)'],
                  ['communautaire', 'Application communautaire ou sociale'],
                  ['education', 'Application éducative / e-learning'],
                  ['evenementiel', 'Application événementielle / culturelle'],
                  ['surmesure', 'Application sur mesure / projet innovant'],
                ].map(([value, label]) => (
                  <ChoiceButton
                    key={value}
                    label={label}
                    active={project === value}
                    onClick={() => {
                      setProject(value);
                      showThumbThenScroll('sec-quoi', 'sec-quand');
                    }}
                  />
                ))}
              </div>
            </div>
          </Section>

          <Section
            id="sec-quand"
            title="Quand voulez-vous lancer sur les stores? *"
            thumbVisible={thumbFor === 'sec-quand'}
          >
            <div className="mt-2 space-y-6">
              <p className="text-black font-medium text-[15px] md:text-[16px]">
                Indiquez votre fenêtre de lancement idéal (App Store / Play
                Store).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {[
                  ['1m', 'Dans 1 mois'],
                  ['3m', 'Dans 3 mois'],
                  ['6m', 'Dans 6 mois'],
                  ['12m', 'Dans 12 mois'],
                ].map(([value, label]) => (
                  <ChoiceButton
                    key={value}
                    label={label}
                    active={timeline === value}
                    onClick={() => {
                      setTimeline(value);
                      showThumbThenScroll('sec-quand', 'sec-combien');
                    }}
                  />
                ))}
              </div>
            </div>
          </Section>

          <Section
            id="sec-combien"
            title="Quel budget mobilisez-vous? *"
            thumbVisible={thumbFor === 'sec-combien'}
          >
            <div className="mt-2 space-y-6">
              <p className="text-black font-medium text-[15px] md:text-[16px]">
                Cela nous aide à calibrer la scope (native vs hybride,
                intégrations, QA, analytics).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-4">
                {[
                  ['b1', 'Moins de 10 000$'],
                  ['b2', '10 000$ à 25 000$'],
                  ['b3', '25 000$ à 50 000$'],
                  ['b4', '50 000$ et plus'],
                ].map(([value, label]) => (
                  <ChoiceButton
                    key={value}
                    label={label}
                    active={budget === value}
                    onClick={() => {
                      setBudget(value);
                      showThumbThenScroll('sec-combien', 'sec-ou');
                    }}
                  />
                ))}
              </div>
            </div>
          </Section>

          <Section
            id="sec-ou"
            title="Où avez-vous entendu parler de nous? *"
            thumbVisible={thumbFor === 'sec-ou'}
          >
            <div className="mt-2 space-y-6">
              <p className="text-black font-medium text-[15px] md:text-[16px]">
                Merci! Cela nous aide à comprendre nos canaux d’acquisition.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {[
                  ['google', 'Recherche Google'],
                  ['ref', 'Référence'],
                  ['social', 'Réseaux sociaux'],
                  ['autre', 'Autre'],
                ].map(([value, label]) => (
                  <ChoiceButton
                    key={value}
                    label={label}
                    active={source === value}
                    onClick={() => {
                      setSource(value);
                      showThumbThenScroll('sec-ou', 'sec-qui');
                    }}
                  />
                ))}
              </div>
            </div>
          </Section>

          <Section
            id="sec-qui"
            title="Qui êtes-vous? *"
            thumbVisible={thumbFor === 'sec-qui'}
          >
            <div className="mt-2">
              <p className="text-black font-medium text-[15px] md:text-[16px] mb-8">
                Donnez-nous les coordonnées pour vous recontacter et en
                apprendre plus sur le projet.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="inline-block text-[14px] font-semibold text-black mb-2"
                    >
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-[#1D4760]/20 bg-white text-black text-[15px] focus:outline-none focus:border-[#1D4760] focus:ring-1 focus:ring-[#1D4760] transition-colors"
                      placeholder="Jean Dupont"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="inline-block text-[14px] font-semibold text-black mb-2"
                    >
                      Adresse courriel <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-[#1D4760]/20 bg-white text-black text-[15px] focus:outline-none focus:border-[#1D4760] focus:ring-1 focus:ring-[#1D4760] transition-colors"
                      placeholder="jean.dupont@exemple.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="inline-block text-[14px] font-semibold text-black mb-2"
                    >
                      Téléphone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-[#1D4760]/20 bg-white text-black text-[15px] focus:outline-none focus:border-[#1D4760] focus:ring-1 focus:ring-[#1D4760] transition-colors"
                      placeholder="+1 514 123 4567"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="projectDescription"
                    className="inline-block text-[14px] font-semibold text-black mb-2"
                  >
                    Racontez-nous votre app mobile{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="projectDescription"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    rows={10}
                    className="w-full px-4 py-3 rounded-lg border border-[#1D4760]/20 bg-white text-black text-[15px] focus:outline-none focus:border-[#1D4760] focus:ring-1 focus:ring-[#1D4760] transition-colors resize-none"
                    placeholder="Parlez-nous du contexte, des fonctionnalités clés, des intégrations nécessaires, etc."
                  />
                </div>
              </div>
            </div>
          </Section>

          <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 mb-[74px] md:mb-[106px]">
            <div className="mt-10 flex justify-center lg:justify-start">
              <motion.button
                whileHover={
                  !isSubmitting
                    ? {
                        scale: 1.03,
                        boxShadow: '0 8px 24px rgba(29, 71, 96, 0.25)',
                      }
                    : {}
                }
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center px-8 md:px-10 py-4 md:py-5 rounded-full bg-[#1D4760] text-white border-2 border-[#1D4760] text-[15px] md:text-[16px] font-bold tracking-[0.04em] min-w-[200px] hover:bg-[#152f41] hover:border-[#152f41] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? 'Envoi en cours...'
                  : 'Envoyer la demande mobile'}
              </motion.button>
            </div>
          </div>
        </form>

        <div className="mt-24 border-t border-[#1D4760]/10">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 grid md:grid-cols-3 gap-10 py-10 text-sm text-[#1D4760]/80">
            <div>
              <h4 className="uppercase text-black font-bold tracking-[0.06em] text-[12px] mb-4">
                Vous voulez discuter mobile?
              </h4>
              <p>
                contact@progix.pro
                <br />
                +1 514 576 5993
              </p>
            </div>
            <div>
              <h4 className="uppercase text-black font-bold tracking-[0.06em] text-[12px] mb-4">
                Venez nous voir
              </h4>
              <p>
                11770 5e Avenue
                <br />
                Montréal, QC H1E 7C1
              </p>
            </div>
            <div>
              <h4 className="uppercase text-black font-bold tracking-[0.06em] text-[12px] mb-4">
                On répond vite
              </h4>
              <ul className="space-y-1">
                <li>Temps de réponse moyen : &lt; 24h</li>
                <li>Modes : visio, présentiel, asynchrone</li>
                <li>Langues : français, anglais</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
