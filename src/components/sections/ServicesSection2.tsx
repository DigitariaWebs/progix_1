'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
      { top: 25, left: 15 },
      { top: 12.5, left: 50 },
      { top: 22.5, left: 75 },
      { top: 45, left: 82.5 },
      { top: 55, left: 20 },
      { top: 80, left: 20 },
      { top: 75, left: 75 },
    ];

    features.forEach((feature, index) => {
      const pos = featureStartPositions[index];
      gsap.set(feature, { top: `${pos.top}%`, left: `${pos.left}%` });
    });

    const remInPixels = parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );
    const ctaCircleSize = 3 * remInPixels;

    const getSearchBarFinalWidth = () => (window.innerWidth < 1000 ? 20 : 25);
    let searchBarFinalWidth = getSearchBarFinalWidth();

    gsap.set(spotlightContentRef.current, { yPercent: 0 });
    gsap.set(featureContents, { opacity: 1 });
    gsap.set(featuresContainerRef.current, { opacity: 1 });
    gsap.set(searchBarRef.current, {
      xPercent: -50,
      yPercent: -50,
      width: '3rem',
      height: '3rem',
      opacity: 0,
    });
    gsap.set(searchBarTextRef.current, { opacity: 0 });
    gsap.set(headerContentRef.current, { y: -50, opacity: 0 });

    const buildTimeline = () => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'none' },
      });

      // Phase A (0 → 2s): coalesce labels toward center + shrink bgs to circle
      tl.to(featureContents, { opacity: 0, duration: 0.4 }, 0);
      tl.to(spotlightContentRef.current, { yPercent: -100, duration: 1.33 }, 0);

      features.forEach((feature) => {
        tl.to(feature, { top: '50%', left: '50%', duration: 2 }, 0);
      });

      featureBgs.forEach((bg) => {
        tl.to(
          bg,
          {
            width: `${ctaCircleSize}px`,
            height: `${ctaCircleSize}px`,
            borderRadius: '25rem',
            borderWidth: '0.35rem',
            duration: 2,
          },
          0,
        );
      });

      // @ 2s: hand-off — features vanish, CTA circle appears
      tl.set(featuresContainerRef.current, { opacity: 0 }, 2);
      tl.set(searchBarRef.current, { opacity: 1 }, 2);

      // Phase B (2 → 3s): CTA circle expands into pill + drops
      tl.to(
        searchBarRef.current,
        {
          width: `${searchBarFinalWidth}rem`,
          height: '5rem',
          yPercent: 200,
          duration: 1,
        },
        2,
      );

      // Phase C (3 → 4s): CTA text + final header reveal
      tl.to(searchBarTextRef.current, { opacity: 1, duration: 1 }, 3);
      tl.to(headerContentRef.current, { y: 0, opacity: 1, duration: 1 }, 3);

      return tl;
    };

    let tl = buildTimeline();
    let viewportTrigger = ScrollTrigger.create({
      trigger: spotlightRef.current,
      start: 'top top',
      end: '+=200%',
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 0.6,
      animation: tl,
      invalidateOnRefresh: true,
    });

    const handleResize = () => {
      const next = getSearchBarFinalWidth();
      if (next === searchBarFinalWidth) return;
      searchBarFinalWidth = next;
      viewportTrigger.kill();
      tl.kill();
      tl = buildTimeline();
      viewportTrigger = ScrollTrigger.create({
        trigger: spotlightRef.current,
        start: 'top top',
        end: '+=200%',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.6,
        animation: tl,
        invalidateOnRefresh: true,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      tl.kill();
      viewportTrigger.kill();
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
    <section
      ref={spotlightRef}
      className="spotlight relative w-full h-screen overflow-hidden bg-[#0f0f0f] text-white"
      style={{ fontFamily: "'Instrument Serif', serif" }}
    >
      <div
        ref={spotlightContentRef}
        className="spotlight-content absolute w-full h-full flex justify-center items-center will-change-transform"
      >
        <div className="spotlight-bg absolute scale-[0.8] md:scale-[2] opacity-25">
          <img src="/mesh.png" alt="" className="w-full h-full object-cover" />
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
  );
};

export default ServicesSection2;
