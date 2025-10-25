'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import ScrollAnimation from '../ScrollAnimation';

const Partners: React.FC = () => { 
  const [currentIndex, setCurrentIndex] = useState(0);

  const partners = [
    { id: 1, name: 'Partner 1', image: 'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/BAnQ-gray.svg' },
    { id: 2, name: 'Partner 2', image: 'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/crustys%20(1).png' },
    { id: 3, name: 'Partner 3', image: 'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/cfaqlogo.png' },
    { id: 4, name: 'Partner 4', image: 'https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/download.png' }, 
    { id: 5, name: 'Partner 5', image: "https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/photo_2019-03-21_11-48-55-2-6-233x91.jpg"},  
    { id: 6, name: 'Partner 6', image: "https://lgpngbxkeuyvjcgrftxa.supabase.co/storage/v1/object/public/Projix/images/ibusinesslogo.png"},  
  ];

  // Auto-scroll effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % partners.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [partners.length]);

  return (
    <section className="bg-transparent">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="zoomIn" delay={0.5}>
          <div className="relative overflow-hidden">
            {/* Mobile: 2 columns */}
            <div className="md:hidden">
              <div className="grid grid-cols-2 gap-4">
                {partners.map((partner, index) => (
                  <motion.div
                    key={partner.id}
                    initial={{ scale: 0.8, opacity: 0.6 }}
                    animate={{
                      scale: currentIndex === index ? 1.1 : 0.9,
                      opacity: currentIndex === index ? 1 : 0.6,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                      duration: 0.5,
                    }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                    className="cursor-pointer p-4 flex items-center justify-center"
                    onClick={() => setCurrentIndex(index)}
                  >
                    <motion.div
                      initial={{ filter: 'grayscale(100%)' }}
                      animate={{
                        filter:
                          currentIndex === index
                            ? 'grayscale(0%)'
                            : 'grayscale(100%)',
                      }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                      className="w-20 h-20"
                    >
                      <Image
                        src={partner.image}
                        alt={partner.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tablet: 3 columns */}
            <div className="hidden md:block lg:hidden">
              <div className="grid grid-cols-3 gap-6">
                {partners.map((partner, index) => (
                  <motion.div
                    key={partner.id}
                    initial={{ scale: 0.8, opacity: 0.6 }}
                    animate={{
                      scale: currentIndex === index ? 1.1 : 0.9,
                      opacity: currentIndex === index ? 1 : 0.6,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                      duration: 0.5,
                    }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                    className="cursor-pointer flex items-center justify-center"
                    onClick={() => setCurrentIndex(index)}
                  >
                    <motion.div
                      initial={{ filter: 'grayscale(100%)' }}
                      animate={{
                        filter:
                          currentIndex === index
                            ? 'grayscale(0%)'
                            : 'grayscale(100%)',
                      }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                      className="w-24 h-24"
                    >
                      <Image
                        src={partner.image}
                        alt={partner.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-contain"
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Desktop: All in one row */}
            <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-8 xl:space-x-12 2xl:space-x-16 gap-6 justify-items-center">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={{ scale: 0.8, opacity: 0.6 }}
                  animate={{
                    scale: index === currentIndex ? 1.1 : 0.9,
                    opacity: index === currentIndex ? 1 : 0.6,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    duration: 0.5,
                  }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  className="flex-shrink-0 cursor-pointer"
                  onClick={() => setCurrentIndex(index)}
                >
                  <div className="w-30 h-30 md:w-30 md:h-30 flex items-center justify-center relative">
                    <motion.div
                      initial={{ filter: 'grayscale(100%)' }}
                      animate={{
                        filter:
                          index === currentIndex
                            ? 'grayscale(0%)'
                            : 'grayscale(100%)',
                      }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                      className="w-full h-full"
                    >
                      <Image
                        src={partner.image}
                        alt={partner.name}
                        width={150}
                        height={150}
                        className="w-full h-full object-contain"
                      />
                    </motion.div>

                    {/* Color reveal overlay */}
                    <AnimatePresence>
                      {index === currentIndex && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                          className="absolute inset-0 rounded-lg"
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Partners;
