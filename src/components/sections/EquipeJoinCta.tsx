'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedButton from '@/components/AnimatedButton';

const EASE = [0.22, 1, 0.36, 1] as const;

const EquipeJoinCta = () => {
  return (
    <section className="relative w-full bg-[#0d2235]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="bg-white text-gray-900"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-8 text-center sm:px-8 md:flex-row md:justify-between md:gap-10 md:py-9 md:text-left">
          <div className="md:flex-1 md:text-center">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.32em] text-cyan-700">
              / Next Episode
            </p>
            <h2
              className="font-black leading-[1] tracking-tight text-gray-900"
              style={{
                fontSize: 'clamp(1.5rem, 3.2vw, 2.25rem)',
                letterSpacing: '-0.03em',
                fontFamily: 'Montserrat, Inter, system-ui, sans-serif',
              }}
            >
              À toi de jouer.
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Un projet ambitieux, un défi qui mérite des pros ? Parlons-en.
            </p>
          </div>

          <Link href="/contact" className="flex-shrink-0">
            <AnimatedButton
              text="Démarrer un projet"
              textColor="#000000"
              borderColor="#000000"
              circleColor="#000000"
              arrowColor="#000000"
              hoverTextColor="#ffffff"
              hoverArrowColor="#ffffff"
            />
          </Link>
        </div>
      </motion.div>

      <div className="h-12 w-full bg-[#0d2235]" />
    </section>
  );
};

export default EquipeJoinCta;
