'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { colors } from '@/config/colors';

const CARDS = [
  {
    title: 'Scale-up & PME',
    description:
      'Nous concevons des apps mobiles connectées à vos systèmes (CRM, ERP, IoT) avec analytics, monitoring et maintenance planifiée pour soutenir la croissance.',
  },
  {
    title: 'Institutionnel & régulé',
    description:
      'Expériences mobiles inclusives, gestion terrain et contrôles de conformité (sécurité, gouvernance, intégrations SI) pensés pour vos réalités organisationnelles.',
  },
  {
    title: 'Startup & innovation',
    description:
      'Discovery produit, prototypage Flutter/React Native, itérations rapides et stack privacy-first pour atteindre le market fit sans dette technique.',
  },
];

const MobileServicesSection = () => {
  return (
    <section className="relative bg-white pt-12 pb-12 sm:pt-20 sm:pb-16 overflow-hidden">
      {/* Decorative glows and lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -right-32 top-16 w-80 h-80 bg-[#1d4760]/12 blur-[160px]" />
        <div className="absolute left-[-25%] bottom-0 w-[25rem] h-[25rem] bg-[#00d4ff]/10 blur-[220px]" />
        <div className="absolute inset-y-0 left-[55%] w-px bg-gradient-to-b from-transparent via-[#00d4ff]/30 to-transparent opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="max-w-4xl mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Des apps mobiles alignées sur vos objectifs
          </h2>
          <p
            className="text-base sm:text-lg leading-relaxed font-semibold text-justify"
            style={{
              fontFamily: 'Hubot Sans, Inter, sans-serif',
              color: colors.primary,
            }}
          >
            Produit, design, développement et QA travaillent ensemble pour livrer des applications mobiles natives ou hybrides performantes, instrumentées et prêtes à scaler. Nous prenons en charge les stores, l’observabilité, la sécurité et le support long terme.
          </p>
        </div>

        <div className="mb-12 sm:mb-16">
          <Link
            href="/contact"
            className="text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center justify-center"
            style={{
              fontFamily: 'Hubot Sans, Inter, sans-serif',
              backgroundColor: colors.secondary,
            }}
          >
            Discuter de votre app mobile
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {CARDS.map((card) => (
            <motion.div
              key={card.title}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                style={{ backgroundColor: `${colors.secondary}20` }}
              >
                <span className="text-2xl" style={{ color: colors.secondary }}>
                  ●
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{card.title}</h3>
              <p className="text-gray-600 leading-relaxed font-semibold text-justify">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobileServicesSection;


