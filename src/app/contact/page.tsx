'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Barlow } from 'next/font/google';
import { ThumbsUp } from 'lucide-react';

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
  index: number;
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
        className="mb-3 flex items-center"
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
          className="ml-2 text-black"
          aria-hidden
        >
          <ThumbsUp size={20} />
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

export default function ContactPage() {
  const [project, setProject] = React.useState<string | null>(null);
  const [timeline, setTimeline] = React.useState<string | null>(null);
  const [budget, setBudget] = React.useState<string | null>(null);
  const [source, setSource] = React.useState<string | null>(null);
  const [thumbFor, setThumbFor] = React.useState<string | null>(null);

  // Form fields for "Qui?" section
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [projectDescription, setProjectDescription] = React.useState('');

  // Form submission states
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
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
        text: 'Veuillez remplir tous les champs obligatoires.',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
          text: 'Votre demande a été envoyée avec succès ! Nous vous contacterons bientôt.',
        });
        // Reset form
        setProject(null);
        setTimeline(null);
        setBudget(null);
        setSource(null);
        setFullName('');
        setEmail('');
        setPhone('');
        setProjectDescription('');
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

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const targetY = (window.scrollY || window.pageYOffset) + rect.top - 5; // stop 5px before the section top
    smoothScrollTo(targetY, 750);
  };

  const showThumbThenScroll = (currentId: string, nextId: string) => {
    setThumbFor(currentId);
    window.setTimeout(() => {
      goTo(nextId);
    }, 450);
    window.setTimeout(() => setThumbFor(null), 1000);
  };

  return (
    <main className="min-h-screen bg-white text-black pt-[120px] md:pt-[80px]">
      <div className={`${barlow.className} pb-24`}>
        {/* Submit Message */}
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
          {/* Header */}
          <header className="pt-[140px] md:pt-[180px] pb-8 md:pb-16">
            <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="uppercase tracking-[0.12em] text-[11px] text-black"
              >
                devis
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="mt-2 text-[11vw] md:text-[3.75rem] lg:text-[4.5rem] md:leading-[1] leading-[0.95] font-extrabold -tracking-[0.02em] md:whitespace-nowrap text-black"
              >
                Demande de soumission
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-8 md:mt-10 max-w-[520px] text-black font-medium text-[15px] md:text-[16px]"
              >
                Ça nous ferait plaisir de parler d'un projet potentiel avec
                vous. Remplissez ce court formulaire pour qu'on ait un peu
                d'information et on vous reviendra rapidement par la suite.
              </motion.p>
            </div>
          </header>

          {/* Quoi */}
          <Section
            id="sec-quoi"
            index={0}
            title="Quoi? *"
            thumbVisible={thumbFor === 'sec-quoi'}
          >
            <div className="mt-2 space-y-6">
              <p className="text-black font-medium text-[15px] md:text-[16px]">
                Quel genre de projets avez-vous en tête?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                <ChoiceButton
                  label="Application Web"
                  active={project === 'web'}
                  onClick={() => {
                    setProject('web');
                    showThumbThenScroll('sec-quoi', 'sec-quand');
                  }}
                />
                <ChoiceButton
                  label="Application Mobile"
                  active={project === 'mobile'}
                  onClick={() => {
                    setProject('mobile');
                    showThumbThenScroll('sec-quoi', 'sec-quand');
                  }}
                />
                <ChoiceButton
                  label="CRM"
                  active={project === 'crm'}
                  onClick={() => {
                    setProject('crm');
                    showThumbThenScroll('sec-quoi', 'sec-quand');
                  }}
                />
                <ChoiceButton
                  label="ERP"
                  active={project === 'erp'}
                  onClick={() => {
                    setProject('erp');
                    showThumbThenScroll('sec-quoi', 'sec-quand');
                  }}
                />
                <ChoiceButton
                  label="Intégration SAP, Dynamics"
                  active={project === 'integration'}
                  onClick={() => {
                    setProject('integration');
                    showThumbThenScroll('sec-quoi', 'sec-quand');
                  }}
                />
                <ChoiceButton
                  label="E-commerce"
                  active={project === 'ecommerce'}
                  onClick={() => {
                    setProject('ecommerce');
                    showThumbThenScroll('sec-quoi', 'sec-quand');
                  }}
                />
                <ChoiceButton
                  label="Data & Analytics"
                  active={project === 'data'}
                  onClick={() => {
                    setProject('data');
                    showThumbThenScroll('sec-quoi', 'sec-quand');
                  }}
                />
                <ChoiceButton
                  label="Autre"
                  active={project === 'autre'}
                  onClick={() => {
                    setProject('autre');
                    showThumbThenScroll('sec-quoi', 'sec-quand');
                  }}
                />
              </div>
            </div>
          </Section>

          {/* Quand */}
          <div className="mt-4 md:mt-6" />
          <Section
            id="sec-quand"
            index={1}
            title="Quand? *"
            thumbVisible={thumbFor === 'sec-quand'}
          >
            <div className="mt-2 space-y-6">
              <p className="text-black font-medium text-[15px] md:text-[16px]">
                Quelle est votre date de mise en ligne idéale?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                <ChoiceButton
                  label="D'ICI 1 MOIS"
                  active={timeline === '1m'}
                  onClick={() => {
                    setTimeline('1m');
                    showThumbThenScroll('sec-quand', 'sec-combien');
                  }}
                />
                <ChoiceButton
                  label="D'ICI 3 MOIS"
                  active={timeline === '3m'}
                  onClick={() => {
                    setTimeline('3m');
                    showThumbThenScroll('sec-quand', 'sec-combien');
                  }}
                />
                <ChoiceButton
                  label="D'ICI 6 MOIS"
                  active={timeline === '6m'}
                  onClick={() => {
                    setTimeline('6m');
                    showThumbThenScroll('sec-quand', 'sec-combien');
                  }}
                />
                <ChoiceButton
                  label="D'ICI 12 MOIS"
                  active={timeline === '12m'}
                  onClick={() => {
                    setTimeline('12m');
                    showThumbThenScroll('sec-quand', 'sec-combien');
                  }}
                />
              </div>
            </div>
          </Section>

          {/* Où */}
          <div className="mt-4 md:mt-6" />
          <Section
            id="sec-ou"
            index={3}
            title="Où? *"
            thumbVisible={thumbFor === 'sec-ou'}
          >
            <div className="mt-2 space-y-6">
              <p className="text-black font-medium text-[15px] md:text-[16px]">
                Où est-ce que vous avez entendu parler de nous?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                <ChoiceButton
                  label="GOOGLE"
                  active={source === 'google'}
                  onClick={() => {
                    setSource('google');
                    showThumbThenScroll('sec-ou', 'sec-qui');
                  }}
                />
                <ChoiceButton
                  label="RÉFÉRENCE"
                  active={source === 'ref'}
                  onClick={() => {
                    setSource('ref');
                    showThumbThenScroll('sec-ou', 'sec-qui');
                  }}
                />
                <ChoiceButton
                  label="RÉSEAUX SOCIAUX"
                  active={source === 'social'}
                  onClick={() => {
                    setSource('social');
                    showThumbThenScroll('sec-ou', 'sec-qui');
                  }}
                />
                <ChoiceButton
                  label="AUTRE"
                  active={source === 'autre'}
                  onClick={() => {
                    setSource('autre');
                    showThumbThenScroll('sec-ou', 'sec-qui');
                  }}
                />
              </div>
            </div>
          </Section>

          {/* Qui */}
          <Section
            id="sec-qui"
            index={4}
            title="Qui? *"
            thumbVisible={thumbFor === 'sec-qui'}
          >
            <div className="mt-2">
              <p className="text-black font-medium text-[15px] md:text-[16px] mb-8">
                Maintenant qu'on en connaît un peu plus sur votre projet, on
                aimerait en apprendre plus sur vous.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Nom complet */}
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

                  {/* Adresse courriel */}
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

                  {/* Téléphone */}
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

                {/* Right Column */}
                <div>
                  <label
                    htmlFor="projectDescription"
                    className="inline-block text-[14px] font-semibold text-black mb-2"
                  >
                    Description du projet{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="projectDescription"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    rows={10}
                    className="w-full px-4 py-3 rounded-lg border border-[#1D4760]/20 bg-white text-black text-[15px] focus:outline-none focus:border-[#1D4760] focus:ring-1 focus:ring-[#1D4760] transition-colors resize-none"
                    placeholder="Décrivez votre projet en quelques mots..."
                  />
                </div>
              </div>
            </div>
          </Section>

          {/* Submit Button */}
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
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
              </motion.button>
            </div>
          </div>
        </form>

        {/* Footer-like info rows */}
        <div className="mt-24 border-t border-[#1D4760]/10">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 grid md:grid-cols-3 gap-10 py-10 text-sm text-[#1D4760]/80">
            <div>
              <h4 className="uppercase text-black font-bold tracking-[0.06em] text-[12px] mb-4">
                Vous souhaitez nous parler?
              </h4>
              <p>
                contact@progix.pro
                <br />
                +1 514 576 5993
              </p>
            </div>
            <div>
              <h4 className="uppercase text-black font-bold tracking-[0.06em] text-[12px] mb-4">
                Passez nous voir
              </h4>
              <p>
                11770 5e Avenue
                <br />
                Montréal, QC H1E 7C1
              </p>
            </div>
            <div>
              <h4 className="uppercase text-black font-bold tracking-[0.06em] text-[12px] mb-4">
                On vous répond rapidement
              </h4>
              <ul className="space-y-1">
                <li>Temps de réponse moyen: &lt; 24 h</li>
                <li>Modes: visio, présentiel, asynchrone</li>
                <li>Langues: français, anglais</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
