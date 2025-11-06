'use client';

import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const DriveHero: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const fwrdRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const section = sectionRef.current;
    const fwrd = fwrdRef.current;
    if (!section || !fwrd) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fwrd,
        { xPercent: -10 },
        {
          xPercent: 20,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom-=20%', // when FWRD begins to appear
            end: 'bottom top+=20%',
            scrub: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-black text-white w-full">
      <div
        className="mx-auto w-full max-w-none px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-28 lg:py-32"
        style={{
          fontFamily:
            "'Helvetica Now Display', Helvetica, Arial, Inter, sans-serif",
        }}
      >
        {/* Top rows: left block and DRIVE on the right */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-4 sm:gap-6 md:gap-8">
          {/* Left giant copy */}
          <div className="md:col-span-7 leading-none select-none">
            <div className="text-[18vw] sm:text-[16vw] md:text-[12vw] font-extrabold uppercase tracking-[-0.04em]">
              WE
            </div>
            <div className="text-[18vw] sm:text-[16vw] md:text-[12vw] font-extrabold tracking-[-0.04em]">
              <span className="align-middle">→</span>
              <span className="uppercase ml-3 sm:ml-6">YOUR</span>
            </div>
            <div className="text-[18vw] sm:text-[16vw] md:text-[12vw] font-extrabold uppercase tracking-[-0.04em]">
              SYSTEMS
            </div>
          </div>

          {/* Right DRIVE and paragraph/button */}
          <div className="md:col-span-5 flex md:block flex-col items-end md:items-start md:pt-6">
            <div className="text-[20vw] sm:text-[18vw] md:text-[14vw] font-bold uppercase leading-none tracking-[-0.04em] md:text-right self-end">
              DRIVE
            </div>
            <div className="mt-4 sm:mt-6 md:mt-8 md:text-right max-w-xs md:max-w-sm self-end">
              <p className="text-xs sm:text-sm md:text-base text-white/80">
                Digital architectures for an ever-shifting world.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center justify-center mt-3 sm:mt-4 px-4 sm:px-6 py-2 sm:py-3 border border-white text-white text-xs sm:text-sm font-semibold rounded-none hover:bg-white hover:text-black transition-colors"
              >
                LET'S TALK
                <span className="ml-2">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* FWRD scroller */}
        <div
          ref={fwrdRef}
          className="mt-8 sm:mt-10 md:mt-16 w-full overflow-visible select-none"
        >
          <div className="text-[28vw] md:text-[22vw] font-extrabold uppercase leading-none tracking-[-0.04em]">
            FWRD
          </div>
        </div>
      </div>
    </section>
  );
};

export default DriveHero;
