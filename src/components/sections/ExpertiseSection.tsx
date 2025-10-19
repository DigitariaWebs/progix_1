'use client';

import React from 'react';
import styles from './ExpertiseSection.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

type ExpertiseItem = {
  number: string;
  title: string;
  copy: string;
  mediaSrc: string;
};

const EXPERTISE_ITEMS: ExpertiseItem[] = [
  {
    number: '1',
    title: 'Advisory',
    copy:
      'Insights stratégiques, revues techniques complètes et accélération produit avec CTO fractionné.',
    mediaSrc: '/VIDEOHORIZONTALCARDS/advisory_compressed_hW5CFWb.mp4',
  },
  {
    number: '2',
    title: 'Artificial Intelligence',
    copy:
      'LLM apps, pipelines de retrieval, évals et déploiements privacy-first adaptés à votre domaine.',
    mediaSrc: '/VIDEOHORIZONTALCARDS/ai_compressed.mp4',
  },
  {
    number: '3',
    title: 'Blockchain',
    copy:
      'Applications blockchain, smart contracts, infra scalable et audits rigoureux prêts pour la prod.',
    mediaSrc: '/VIDEOHORIZONTALCARDS/blockchain_compressed_SctBxX6.mp4',
  },
  {
    number: '4',
    title: 'Product Development',
    copy:
      'De la discovery au delivery: prototypage rapide, design centré utilisateur, full‑stack shipping.',
    mediaSrc: '/VIDEOHORIZONTALCARDS/product-development_compressed.mp4',
  },
  {
    number: '5',
    title: 'Team Augmentation',
    copy:
      'Renfort d’équipe backend, frontend et DevOps, process robustes et vélocité maîtrisée.',
    mediaSrc: '/VIDEOHORIZONTALCARDS/team-augmentation_compressed_bcVk2PB.mp4',
  },
];

export default function ExpertiseSection() {
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const wrapper = section.querySelector(`.${styles.exhWrapper}`);
    const items = section.querySelectorAll(`.${styles.exhItem}`);
    if (!wrapper || !items.length) return;

    // Collect videos per item (same order)
    const videos: HTMLVideoElement[] = Array.from(items)
      .map((item) => item.querySelector('video'))
      .filter(Boolean) as HTMLVideoElement[];

    const pauseAll = () => {
      videos.forEach((v) => {
        try {
          v.pause();
        } catch {}
      });
    };

    const primeVideo = (video: HTMLVideoElement) => {
      if (!video) return;
      if (video.preload !== 'auto') {
        video.preload = 'auto';
        try {
          // Hint the browser to fetch quickly
          video.load();
        } catch {}
      }
    };

    const setActive = (index: number) => {
      videos.forEach((v, i) => {
        if (i === index) {
          primeVideo(v);
          // Attempt immediate play; ignore promise rejection on some devices
          const p = v.play();
          if (p && typeof p.catch === 'function') {
            p.catch(() => {});
          }
        } else {
          try {
            v.pause();
          } catch {}
        }
      });
      const next = videos[index + 1];
      if (next) primeVideo(next);
    };

    items.forEach((item, index) => {
      // Set stacking order so later cards appear above earlier ones
      (item as HTMLElement).style.zIndex = String(10 + index);
      if (index !== 0) {
        gsap.set(item, { xPercent: 100 });
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        start: 'top top',
        end: `+=${items.length * 100}%`,
        scrub: 1,
        invalidateOnRefresh: true,
        // anticipatePin slightly delays pin to avoid jank on mobile
        anticipatePin: 1,
      },
      defaults: { ease: 'none' },
    });

    // Dark mode toggle while the section is in view
    const darkTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      end: 'bottom 30%',
      onEnter: () => setIsDark(true),
      onEnterBack: () => setIsDark(true),
      onLeave: () => setIsDark(false),
      onLeaveBack: () => setIsDark(false),
    });

    // Start with first video primed/playing
    setActive(0);

    items.forEach((item, index) => {
      // Ensure the first card is fully in view before horizontal transition
      // Add a small scroll gap before first transition kicks in
      if (index === 0) {
        tl.to({}, { duration: 0.05 });
      }
      tl.to(item, { scale: 0.9, borderRadius: '10px' });
      const next = items[index + 1];
      if (next) {
        tl.to(next, { xPercent: 0 }, '<');
        // When the next item arrives, mark it active and preload the following
        tl.call(() => setActive(index + 1));
      }
    });

    // Safety: pause videos when leaving the section
    tl.scrollTrigger?.vars && Object.assign(tl.scrollTrigger.vars, {
      onLeave: () => pauseAll(),
      onLeaveBack: () => pauseAll(),
      onEnter: () => setActive(0),
      onEnterBack: () => setActive(Math.min(videos.length - 1, 1)),
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      darkTrigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className={`${styles.exhSection} ${isDark ? styles.exhDark : ''}`} ref={sectionRef} style={{ ['--contact-bg' as any]: '#1D4760' }}>
      <div className={styles.exhHeading}>
        <h2
          className={styles.exhHeadingText + ' text-4xl md:text-5xl font-bold text-gray-900 dark:text-white'}
        >
          Ce que nous faisons
        </h2>
      </div>

      <div className={`${styles.exhScrollSection}`}>
        <div className={styles.exhWrapper}>
          <div className={styles.exhList} role="list">
            {EXPERTISE_ITEMS.map((item) => (
              <div key={item.number} role="listitem" className={styles.exhItem}>
                <div className={styles.exhItemContent}>
                  <div className={styles.exhBlurAccent} aria-hidden="true" />
                  <h3 className={styles.exhItemNumber}>{item.number}</h3>
                  <h3 className={styles.exhItemTitle}>{item.title}</h3>
                  <p className={styles.exhItemCopy}>{item.copy}</p>
                </div>
                <div className={styles.exhVideoWrap} style={{ ['--brand-blue' as any]: '#0A2456' }}>
                  <video
                    src={item.mediaSrc}
                    className={styles.exhItemMedia}
                    preload="none"
                    muted
                    loop
                    autoPlay
                    playsInline
                  />
                  <div className={styles.exhTint} aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


