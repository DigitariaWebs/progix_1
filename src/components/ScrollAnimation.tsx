'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  animation?:
    | 'fadeInUp'
    | 'fadeInLeft'
    | 'fadeInRight'
    | 'scaleIn'
    | 'slideUp'
    | 'slideDown'
    | 'zoomIn'
    | 'flipIn'
    | 'bounceIn'
    | 'slideInFromBottom';
  delay?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
  stagger?: boolean;
  staggerDelay?: number;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  className = '',
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.8,
  amount = 0.1,
  once = true,
  stagger = false,
  staggerDelay = 0.1,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount,
    once,
    margin: '0px 0px -100px 0px',
  });

  const getAnimationVariants = () => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration,
          delay,
        },
      },
    };

    switch (animation) {
      case 'fadeInUp':
        return {
          hidden: { opacity: 0, y: 60, filter: 'blur(10px)' },
          visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
              duration,
              delay,
            },
          },
        };

      case 'fadeInLeft':
        return {
          hidden: { opacity: 0, x: -80, filter: 'blur(10px)' },
          visible: {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            transition: {
              duration,
              delay,
            },
          },
        };

      case 'fadeInRight':
        return {
          hidden: { opacity: 0, x: 80, filter: 'blur(10px)' },
          visible: {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            transition: {
              duration,
              delay,
            },
          },
        };

      case 'scaleIn':
        return {
          hidden: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
          visible: {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            transition: {
              duration,
              delay,
            },
          },
        };

      case 'slideUp':
        return {
          hidden: { opacity: 0, y: 100, filter: 'blur(10px)' },
          visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
              duration,
              delay,
            },
          },
        };

      case 'slideDown':
        return {
          hidden: { opacity: 0, y: -100, filter: 'blur(10px)' },
          visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
              duration,
              delay,
            },
          },
        };

      case 'zoomIn':
        return {
          hidden: { opacity: 0, scale: 0.5, filter: 'blur(15px)' },
          visible: {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            transition: {
              duration,
              delay,
            },
          },
        };

      case 'flipIn':
        return {
          hidden: { opacity: 0, rotateY: -90, filter: 'blur(10px)' },
          visible: {
            opacity: 1,
            rotateY: 0,
            filter: 'blur(0px)',
            transition: {
              duration,
              delay,
            },
          },
        };

      case 'bounceIn':
        return {
          hidden: { opacity: 0, scale: 0.3, filter: 'blur(10px)' },
          visible: {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            transition: {
              duration,
              delay,
            },
          },
        };

      case 'slideInFromBottom':
        return {
          hidden: { opacity: 0, y: 120, filter: 'blur(15px)' },
          visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
              duration,
              delay,
            },
          },
        };

      default:
        return baseVariants;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger ? staggerDelay : 0,
        delayChildren: delay,
      },
    },
  };

  if (stagger) {
    return (
      <motion.div
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={getAnimationVariants()}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation;
