'use client';

import { motion } from 'framer-motion';
import { Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedText } from '@/components/ui/animated-underline-text-one';

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = 'from-white/[0.08]',
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn('absolute', className)}
    >
      <motion.div
        animate={{
          y: [0, -20, 10, -15, 0],
          x: [0, 10, -5, 8, 0],
          rotate: [rotate, rotate + 5, rotate - 3, rotate + 2, rotate],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.4, 0.7, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
          className={cn(
            'absolute inset-0 rounded-full',
            'bg-gradient-to-r to-transparent',
            gradient,
            'backdrop-blur-[2px] border-2 border-cyan-400/[0.2]',
            'shadow-[0_8px_32px_0_rgba(34,211,238,0.15)]',
            'after:absolute after:inset-0 after:rounded-full',
            'after:bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.15),transparent_70%)]',
          )}
        />
      </motion.div>
    </motion.div>
  );
}

function HeroGeometric({
  badge = 'Design Collective',
  title1 = 'Elevate Your Digital Vision',
  description = 'Crafting exceptional digital experiences through innovative design and cutting-edge technology.',
}: {
  badge?: string;
  title1?: string;
  description?: string;
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
      },
    }),
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-transparent to-gray-100/[0.8] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-cyan-400/[0.3] to-cyan-600/[0.2]"
          className="left-[-15%] md:left-[-8%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-cyan-500/[0.25] to-cyan-700/[0.15]"
          className="right-[-8%] md:right-[-2%] top-[65%] md:top-[70%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-cyan-300/[0.2] to-cyan-500/[0.1]"
          className="left-[2%] md:left-[8%] bottom-[8%] md:bottom-[12%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-cyan-600/[0.2] to-cyan-800/[0.1]"
          className="right-[12%] md:right-[18%] top-[8%] md:top-[12%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-400/[0.15] to-cyan-600/[0.08]"
          className="left-[18%] md:left-[22%] top-[3%] md:top-[8%]"
        />

        <ElegantShape
          delay={0.8}
          width={100}
          height={30}
          rotate={45}
          gradient="from-cyan-500/[0.15] to-cyan-700/[0.08]"
          className="right-[25%] md:right-[30%] top-[45%] md:top-[50%]"
        />

        <ElegantShape
          delay={0.9}
          width={80}
          height={25}
          rotate={-60}
          gradient="from-cyan-300/[0.12] to-cyan-500/[0.06]"
          className="left-[35%] md:left-[40%] bottom-[25%] md:bottom-[30%]"
        />

        <ElegantShape
          delay={1.0}
          width={120}
          height={35}
          rotate={30}
          gradient="from-cyan-400/[0.12] to-cyan-600/[0.06]"
          className="right-[40%] md:right-[45%] top-[25%] md:top-[30%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D4760]/[0.1] border border-[#1D4760]/[0.2] mb-8 md:mb-12"
          >
            <Circle className="h-2 w-2 fill-[#1D4760]" />
            <span className="text-sm text-gray-600 tracking-wide">{badge}</span>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-700">
                {title1}
              </span>
              <br />
              <div className="  items-center justify-center gap-2">
                <span
                  className={cn(
                    'bg-clip-text text-transparent bg-gradient-to-r from-[#1D4760] via-gray-900 to-[#1D4760]',
                  )}
                >
                  Building Trust Through
                </span>
                <AnimatedText
                  text=" Technology"
                  textClassName="bg-clip-text text-transparent bg-gradient-to-r from-[#1D4760] via-gray-900 to-[#1D4760] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
                  underlineClassName="text-[#1D4760]"
                  underlinePath="M 0,10 Q 75,0 150,10 Q 225,20 300,10"
                  underlineHoverPath="M 0,10 Q 75,20 150,10 Q 225,0 300,10"
                  underlineDuration={1.5}
                  className="inline-block"
                />
              </div>
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              {description}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/80 pointer-events-none" />
    </div>
  );
}

export { HeroGeometric };
