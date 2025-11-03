'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const ConfirmationPage = () => {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 20% 20%, rgba(0,212,255,0.2) 0, transparent 50%),
                          radial-gradient(circle at 80% 30%, rgba(29,71,96,0.35) 0, transparent 55%),
                          radial-gradient(circle at 30% 75%, rgba(0,212,255,0.15) 0, transparent 50%)`
      }} />

      <div className="relative z-10 w-full max-w-4xl px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm uppercase tracking-[0.4em] text-[#00d4ff]/80"
          style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
        >
          Merci!
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 text-[10vw] sm:text-[6rem] font-bold tracking-tight"
          style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
        >
          SUUUPER!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg text-white/80 max-w-2xl mx-auto"
          style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
        >
          Nous avons bien reçu votre demande. Un membre de l’équipe Progix vous contacte rapidement pour la suite.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-[#0a1628] font-semibold shadow-lg hover:shadow-xl transition-transform hover:-translate-y-0.5"
            style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
          >
            Retour à l'accueil
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/40 text-white font-semibold hover:bg-white/10 transition-transform hover:-translate-y-0.5"
            style={{ fontFamily: 'Hubot Sans, Inter, sans-serif' }}
          >
            Voir nos réalisations
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-8 text-[#00d4ff]/70 text-sm tracking-[0.3em] uppercase hidden sm:block">
        Progix • Montréal
      </div>
      <div className="absolute bottom-8 right-8 text-[#00d4ff]/70 text-sm tracking-[0.3em] uppercase hidden sm:block">
        Apps web & mobiles
      </div>
    </div>
  );
};

export default ConfirmationPage;


