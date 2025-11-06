"use client";

import { useEffect, useRef } from "react";
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const ServicesSection2 = () => {
  const spotlightRef = useRef<HTMLElement>(null);
  const spotlightContentRef = useRef<HTMLDivElement>(null);
  const headerContentRef = useRef<HTMLDivElement>(null);
  const featuresContainerRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLAnchorElement>(null);
  const searchBarTextRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);
  const featureBgsRef = useRef<(HTMLDivElement | null)[]>([]);
  const featureContentsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);

    const features = featuresRef.current.filter(
      (f): f is HTMLDivElement => f !== null,
    );
    const featureBgs = featureBgsRef.current.filter(
      (f): f is HTMLDivElement => f !== null,
    );
    const featureContents = featureContentsRef.current.filter(
      (f): f is HTMLDivElement => f !== null,
    );

    const featureStartPositions = [
      { top: 25, left: 15 }, // Web
      { top: 12.5, left: 50 }, // Mobile
      { top: 22.5, left: 75 }, // CRM/ERP
      { top: 45, left: 82.5 }, // PME (moved down from 30)
      { top: 55, left: 20 }, // Institutionnel (moved down from 50)
      { top: 80, left: 20 }, // Startup
      { top: 75, left: 75 }, // Innovation
    ];

    features.forEach((feature, index) => {
      if (!feature) return;
      const featurePos = featureStartPositions[index];
      gsap.set(feature, {
        top: `${featurePos.top}%`,
        left: `${featurePos.left}%`,
      });
    });

    const featureStartDimensions: { width: number; height: number }[] = [];
    featureBgs.forEach((bg) => {
      if (!bg) return;
      const rect = bg.getBoundingClientRect();
      featureStartDimensions.push({
        width: rect.width,
        height: rect.height,
      });
    });

    const remInPixels = parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );
    const targetWidth = 3 * remInPixels;
    const targetHeight = 3 * remInPixels;

    const getSearchBarFinalWidth = () => {
      return window.innerWidth < 1000 ? 20 : 25;
    };

    let searchBarFinalWidth = getSearchBarFinalWidth();

    const handleResize = () => {
      searchBarFinalWidth = getSearchBarFinalWidth();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    ScrollTrigger.create({
      trigger: spotlightRef.current,
      start: 'top top',
      end: `+=${window.innerHeight * 3}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        // Spotlight content animation (0-33%)
        if (spotlightContentRef.current) {
          if (progress <= 0.3333) {
            const spotlightHeaderProgress = progress / 0.3333;
            gsap.set(spotlightContentRef.current, {
              y: `${-100 * spotlightHeaderProgress}%`,
            });
          } else {
            gsap.set(spotlightContentRef.current, {
              y: '-100%',
            });
          }
        }

        // Feature animation (0-50%)
        if (progress >= 0 && progress <= 0.5) {
          const featureProgress = progress / 0.5;

          features.forEach((feature, index) => {
            if (!feature) return;
            const original = featureStartPositions[index];
            const currentTop =
              original.top + (50 - original.top) * featureProgress;
            const currentLeft =
              original.left + (50 - original.left) * featureProgress;

            gsap.set(feature, {
              top: `${currentTop}%`,
              left: `${currentLeft}%`,
            });
          });

          featureBgs.forEach((bg, index) => {
            if (!bg) return;
            const featureDim = featureStartDimensions[index];
            const currentWidth =
              featureDim.width +
              (targetWidth - featureDim.width) * featureProgress;
            const currentHeight =
              featureDim.height +
              (targetHeight - featureDim.height) * featureProgress;
            const currentBorderRadius = 0.5 + (25 - 0.5) * featureProgress;
            const currentBorderWidth = 0.125 + (0.35 - 0.125) * featureProgress;

            gsap.set(bg, {
              width: `${currentWidth}px`,
              height: `${currentHeight}px`,
              borderRadius: `${currentBorderRadius}rem`,
              borderWidth: `${currentBorderWidth}rem`,
            });
          });

          // Feature text fade (0-10%)
          if (progress >= 0 && progress <= 0.1) {
            const featureTextProgress = progress / 0.1;
            featureContents.forEach((content) => {
              if (!content) return;
              gsap.set(content, {
                opacity: 1 - featureTextProgress,
              });
            });
          } else if (progress > 0.1) {
            featureContents.forEach((content) => {
              if (!content) return;
              gsap.set(content, {
                opacity: 0,
              });
            });
          }
        }

        // Features container opacity
        if (featuresContainerRef.current) {
          if (progress >= 0.5) {
            gsap.set(featuresContainerRef.current, {
              opacity: 0,
            });
          } else {
            gsap.set(featuresContainerRef.current, {
              opacity: 1,
            });
          }
        }

        // Search bar opacity
        if (searchBarRef.current) {
          if (progress >= 0.5) {
            gsap.set(searchBarRef.current, {
              opacity: 1,
            });
          } else {
            gsap.set(searchBarRef.current, {
              opacity: 0,
            });
          }

          // Search bar expansion (50-75%)
          if (progress >= 0.5 && progress <= 0.75) {
            const searchBarProgress = (progress - 0.5) / 0.25;

            const width = 3 + (searchBarFinalWidth - 3) * searchBarProgress;
            const height = 3 + (5 - 3) * searchBarProgress;

            const translateY = -50 + (200 - -50) * searchBarProgress;

            gsap.set(searchBarRef.current, {
              width: `${width}rem`,
              height: `${height}rem`,
              transform: `translate(-50%, ${translateY}%)`,
            });

            if (searchBarTextRef.current) {
              gsap.set(searchBarTextRef.current, {
                opacity: 0,
              });
            }
          } else if (progress > 0.75) {
            gsap.set(searchBarRef.current, {
              width: `${searchBarFinalWidth}rem`,
              height: '5rem',
              transform: 'translate(-50%, 200%)',
            });
          }
        }

        // Final header animation (75-100%)
        if (progress >= 0.75) {
          const finalHeaderProgress = (progress - 0.75) / 0.25;

          if (searchBarTextRef.current) {
            gsap.set(searchBarTextRef.current, {
              opacity: finalHeaderProgress,
            });
          }

          if (headerContentRef.current) {
            gsap.set(headerContentRef.current, {
              y: -50 + 50 * finalHeaderProgress,
              opacity: finalHeaderProgress,
            });
          }
        } else {
          if (searchBarTextRef.current) {
            gsap.set(searchBarTextRef.current, {
              opacity: 0,
            });
          }
          if (headerContentRef.current) {
            gsap.set(headerContentRef.current, {
              y: -50,
              opacity: 0,
            });
          }
        }
      },
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lenis.destroy();
    };
  }, []);

  const featureLabels = [
    'Web',
    'Mobile',
    'CRM/ERP',
    'PME',
    'Institutionnel',
    'Startup',
    'Innovation',
  ];

  return (
    <div
      className="bg-[#0f0f0f] text-white"
      style={{ fontFamily: "'Instrument Serif', serif" }}
    >
      {/* Intro Section */}
      <section className="relative w-full h-screen overflow-hidden flex justify-center items-center p-8">
        <h1 className="text-center text-[2.5rem] md:text-[5rem] font-medium leading-[0.9] w-full md:w-[55%] px-8 md:px-0">
          Partenaire web, mobile et systèmes d'affaires
        </h1>
      </section>

      {/* Spotlight Section */}
      <section
        ref={spotlightRef}
        className="spotlight relative w-full h-screen overflow-hidden"
      >
        <div
          ref={spotlightContentRef}
          className="spotlight-content absolute w-full h-full flex justify-center items-center will-change-transform"
        >
          <div className="spotlight-bg absolute scale-[0.8] md:scale-[2] opacity-25">
            <img
              src="/mesh.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-center text-[2.5rem] md:text-[5rem] font-medium leading-[0.9] w-full md:w-[40%] px-8">
            Solutions web, mobiles et CRM/ERP, livrées dans les temps
          </h1>
        </div>

        <div className="header absolute w-full h-full flex justify-center items-center">
          <div
            ref={headerContentRef}
            className="header-content w-full md:w-[60%] flex flex-col items-center text-center gap-8 px-8 will-change-transform"
            style={{ transform: 'translateY(-50px)', opacity: 0 }}
          >
            <h1 className="text-[2.5rem] md:text-[5rem] font-medium leading-[0.9]">
              Conçu pour durer, optimisé pour performer
            </h1>
            <p
              className="text-base font-medium leading-none"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Progix conçoit des solutions maintenables sur le long terme et
              compétitives en budget — grâce à une équipe sénior et une méthode
              orientée impact.
            </p>
          </div>
        </div>

        <div
          ref={featuresContainerRef}
          className="features absolute w-full h-full"
        >
          {featureLabels.map((label, index) => (
            <div
              key={index}
              ref={(el) => {
                featuresRef.current[index] = el;
              }}
              className="feature absolute w-max h-max px-4 md:px-6 py-4 -translate-x-1/2 -translate-y-1/2 will-change-[top,left]"
            >
              <div
                ref={(el) => {
                  featureBgsRef.current[index] = el;
                }}
                className="feature-bg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#141414] border-[0.125rem] border-[#262626] rounded-lg will-change-[width,height,border-radius,border-width]"
              ></div>
              <div
                ref={(el) => {
                  featureContentsRef.current[index] = el;
                }}
                className="feature-content relative will-change-[opacity]"
              >
                <p
                  className="uppercase font-normal text-[0.7rem] md:text-[0.85rem] leading-none whitespace-nowrap"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/contact"
          ref={searchBarRef}
          className="search-bar absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-[25rem] border-[0.35rem] border-[#262626] bg-[#141414] opacity-0 flex items-center justify-center cursor-pointer hover:bg-[#1a1a1a] transition-colors duration-300 overflow-hidden will-change-[opacity,width,height,transform]"
        >
          <p
            ref={searchBarTextRef}
            className="absolute left-1/2 -translate-x-1/2 opacity-0 font-medium text-base leading-none whitespace-nowrap will-change-[opacity]"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Discuter de votre projet
          </p>
        </Link>
      </section>

      {/* Outro Section */}
      <section className="relative w-full h-screen overflow-hidden flex justify-center items-center p-8">
        <h1 className="text-center text-[2.5rem] md:text-[5rem] font-medium leading-[0.9] w-full md:w-[40%]">
          Automatiser, valoriser, innover
        </h1>
      </section>
    </div>
  );
};

export default ServicesSection2;