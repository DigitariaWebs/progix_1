'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Barlow } from 'next/font/google';
import { ThumbsUp } from 'lucide-react';

const barlow = Barlow({ subsets: ['latin'], weight: ['400','500','600','700','800'] });
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

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

const Section: React.FC<SectionProps> = ({ id, title, children, thumbVisible = false }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  return (
    <section id={id} ref={ref} className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 mb-[74px] md:mb-[106px]">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        custom={0}
        className="mb-3 flex items-center"
      >
        <h2 className="text-white font-semibold text-[15px] md:text-[16px]">{title}</h2>
        <motion.span
          initial={{ opacity: 0, scale: 0.6, y: -2 }}
          animate={thumbVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.6, y: -2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 26 }}
          className="ml-2 text-white"
          aria-hidden
        >
          <ThumbsUp size={20} />
        </motion.span>
      </motion.div>
      <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'} custom={1}>
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

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ label, active = false, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.03, boxShadow: '0 0 0 1px rgba(255,255,255,0.3)' }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    onClick={onClick}
    aria-pressed={active}
    className={`inline-flex items-center justify-center px-1 md:px-1 lg:px-1 py-[14px] md:py-4 lg:py-4 rounded-full border text-[15px] md:text-[15px] font-semibold tracking-[0.04em] min-w-[120px] md:min-w-[140px] lg:min-w-[160px] backdrop-blur-sm transition-colors duration-300 ${
      active
        ? 'bg-white text-black border-white'
        : 'bg-transparent text-white border-white/20 hover:bg-white hover:text-black hover:border-white/60'
    }`}
    type="button"
  >
    {label}
  </motion.button>
);

const QuoteForm: React.FC = () => {
  const [project, setProject] = React.useState<string | null>(null);
  const [timeline, setTimeline] = React.useState<string | null>(null);
  const [budget, setBudget] = React.useState<string | null>(null);
  const [source, setSource] = React.useState<string | null>(null);
  const [thumbFor, setThumbFor] = React.useState<string | null>(null);

  const handleSubmit = React.useCallback(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-1768631075/vuICKbzIJbgELJO6w_FB',
        value: 1.0,
        currency: 'CAD',
      });
    }
    alert('Formulaire envoyé !');
  }, []);

  const smoothScrollTo = (targetY: number, duration = 750) => {
    const startY = window.scrollY || window.pageYOffset;
    const distance = targetY - startY;
    let startTime: number | null = null;

    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

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
    <div className={`${barlow.className} pb-24`}>
      {/* Header */}
      <header className="pt-[140px] md:pt-[180px] pb-8 md:pb-16">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="uppercase tracking-[0.12em] text-[11px] text-white">devis</motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-2 text-[11vw] md:text-[3.75rem] lg:text-[4.5rem] md:leading-[1] leading-[0.95] font-extrabold -tracking-[0.02em] md:whitespace-nowrap"
          >
            Demande de soumission
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-8 md:mt-10 max-w-[520px] text-white font-medium text-[15px] md:text-[16px]">
            Ça nous ferait plaisir de parler d’un projet potentiel avec vous. Remplissez ce court formulaire pour qu’on ait un peu d’information et on vous reviendra rapidement par la suite.
          </motion.p>
        </div>
      </header>

      {/* Quoi */}
      <Section id="sec-quoi" index={0} title="Quoi?" thumbVisible={thumbFor === 'sec-quoi'}> 
        <div className="mt-2 space-y-6">
          <p className="text-white font-medium text-[15px] md:text-[16px]">Quel genre de projets avez-vous en tête?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            <ChoiceButton label="Application Web" active={project==='web'} onClick={() => { setProject('web'); showThumbThenScroll('sec-quoi','sec-quand'); }} />
            <ChoiceButton label="Application Mobile" active={project==='mobile'} onClick={() => { setProject('mobile'); showThumbThenScroll('sec-quoi','sec-quand'); }} />
            <ChoiceButton label="CRM" active={project==='crm'} onClick={() => { setProject('crm'); showThumbThenScroll('sec-quoi','sec-quand'); }} />
            <ChoiceButton label="ERP" active={project==='erp'} onClick={() => { setProject('erp'); showThumbThenScroll('sec-quoi','sec-quand'); }} />
            <ChoiceButton label="Intégration SAP, Dynamics" active={project==='integration'} onClick={() => { setProject('integration'); showThumbThenScroll('sec-quoi','sec-quand'); }} />
            <ChoiceButton label="E-commerce" active={project==='ecommerce'} onClick={() => { setProject('ecommerce'); showThumbThenScroll('sec-quoi','sec-quand'); }} />
            <ChoiceButton label="Data & Analytics" active={project==='data'} onClick={() => { setProject('data'); showThumbThenScroll('sec-quoi','sec-quand'); }} />
            <ChoiceButton label="Autre" active={project==='autre'} onClick={() => { setProject('autre'); showThumbThenScroll('sec-quoi','sec-quand'); }} />
          </div>
        </div>
      </Section>

      {/* Quand */}
      <div className="mt-4 md:mt-6" />
      <Section id="sec-quand" index={1} title="Quand?" thumbVisible={thumbFor === 'sec-quand'}>
        <div className="mt-2 space-y-6">
          <p className="text-white font-medium text-[15px] md:text-[16px]">Quelle est votre date de mise en ligne idéale?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <ChoiceButton label="D’ICI 1 MOIS" active={timeline==='1m'} onClick={() => { setTimeline('1m'); showThumbThenScroll('sec-quand','sec-combien'); }} />
            <ChoiceButton label="D’ICI 3 MOIS" active={timeline==='3m'} onClick={() => { setTimeline('3m'); showThumbThenScroll('sec-quand','sec-combien'); }} />
            <ChoiceButton label="D’ICI 6 MOIS" active={timeline==='6m'} onClick={() => { setTimeline('6m'); showThumbThenScroll('sec-quand','sec-combien'); }} />
            <ChoiceButton label="D’ICI 12 MOIS" active={timeline==='12m'} onClick={() => { setTimeline('12m'); showThumbThenScroll('sec-quand','sec-combien'); }} />
          </div>
        </div>
      </Section>

      {/* Combien */}
      <div className="mt-4 md:mt-6" />
      <Section id="sec-combien" index={2} title="Combien?" thumbVisible={thumbFor === 'sec-combien'}>
        <div className="mt-2 space-y-6">
          <p className="text-white font-medium text-[15px] md:text-[16px]">À quoi ressemble le budget pour votre projet?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            <ChoiceButton label="MOINS DE 20 000$" active={budget==='b1'} onClick={() => { setBudget('b1'); showThumbThenScroll('sec-combien','sec-ou'); }} />
            <ChoiceButton label="DE 20 000$ À 40 000$" active={budget==='b2'} onClick={() => { setBudget('b2'); showThumbThenScroll('sec-combien','sec-ou'); }} />
            <ChoiceButton label="DE 40 000$ À 60 000$" active={budget==='b3'} onClick={() => { setBudget('b3'); showThumbThenScroll('sec-combien','sec-ou'); }} />
            <ChoiceButton label="DE 60 000$ À 100 000$" active={budget==='b4'} onClick={() => { setBudget('b4'); showThumbThenScroll('sec-combien','sec-ou'); }} />
            <ChoiceButton label="PLUS DE 100 000$" active={budget==='b5'} onClick={() => { setBudget('b5'); showThumbThenScroll('sec-combien','sec-ou'); }} />
          </div>
        </div>
      </Section>

      {/* Où */}
      <div className="mt-4 md:mt-6" />
      <Section id="sec-ou" index={3} title="Où?" thumbVisible={thumbFor === 'sec-ou'}>
        <div className="mt-2 space-y-6">
          <p className="text-white font-medium text-[15px] md:text-[16px]">Où est-ce que vous avez entendu parler de nous?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <ChoiceButton label="GOOGLE" active={source==='google'} onClick={() => { setSource('google'); showThumbThenScroll('sec-ou','sec-qui'); }} />
            <ChoiceButton label="RÉFÉRENCE" active={source==='ref'} onClick={() => { setSource('ref'); showThumbThenScroll('sec-ou','sec-qui'); }} />
            <ChoiceButton label="RÉSEAUX SOCIAUX" active={source==='social'} onClick={() => { setSource('social'); showThumbThenScroll('sec-ou','sec-qui'); }} />
            <ChoiceButton label="AUTRE" active={source==='autre'} onClick={() => { setSource('autre'); showThumbThenScroll('sec-ou','sec-qui'); }} />
          </div>
        </div>
      </Section>

      {/* Qui */}
      <div className="mt-4 md:mt-6" />
      <Section id="sec-qui" index={4} title="Qui?">
        <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <p className="text-white font-medium text-[15px] md:text-[16px] max-w-[520px]">Maintenant qu’on en connaît un peu plus sur votre projet, on aimerait en apprendre plus sur vous.</p>
            <div className="mt-8 space-y-8 max-w-md">
              <div>
                <label className="block text-[12px] text-[#9aa1a6] mb-2">NOM COMPLET *</label>
                <input className="w-full bg-transparent border-b border-white/20 focus:border-white/40 outline-none py-3 text-[14px] placeholder-white/30" placeholder="" />
              </div>
              <div>
                <label className="block text-[12px] text-[#9aa1a6] mb-2">ADRESSE COURRIEL *</label>
                <input className="w-full bg-transparent border-b border-white/20 focus:border-white/40 outline-none py-3 text-[14px] placeholder-white/30" placeholder="" />
              </div>
              <div>
                <label className="block text-[12px] text-[#9aa1a6] mb-2">TÉLÉPHONE *</label>
                <input className="w-full bg-transparent border-b border-white/20 focus:border-white/40 outline-none py-3 text-[14px] placeholder-white/30" placeholder="" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-[12px] text-[#9aa1a6] mb-2">DÉCRIVEZ-NOUS BRIÈVEMENT VOTRE PROJET</label>
            <textarea rows={8} className="w-full bg-transparent border-b border-white/20 focus:border-white/40 outline-none py-3 text-[14px] placeholder-white/30 min-h-[220px]" placeholder="" />
          </div>
        </div>

        <div className="mt-10">
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 0 24px rgba(255,255,255,0.08)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 280, damping: 20 }}
            className="px-10 h-[52px] rounded-full bg-white text-[#131618] font-bold tracking-[0.04em]"
            onClick={handleSubmit}
          >
            ENVOYER
          </motion.button>
        </div>
      </Section>

      {/* Footer-like info rows */}
      <div className="mt-24 border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 grid md:grid-cols-3 gap-10 py-10 text-sm text-[#b6bdc2]">
          <div>
            <h4 className="uppercase text-white font-bold tracking-[0.06em] text-[12px] mb-4">Vous souhaitez nous parler?</h4>
            <p>contact@progix.pro<br/>+1 514 576 5993</p>
          </div>
          <div>
            <h4 className="uppercase text-white font-bold tracking-[0.06em] text-[12px] mb-4">Passez nous voir</h4>
            <p>11770 5e Avenue<br/>Montréal, QC H1E 7C1</p>
          </div>
          <div>
            <h4 className="uppercase text-white font-bold tracking-[0.06em] text-[12px] mb-4">On vous répond rapidement</h4>
            <ul className="space-y-1">
              <li>Temps de réponse moyen: &lt; 24 h</li>
              <li>Modes: visio, présentiel, asynchrone</li>
              <li>Langues: français, anglais</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;


