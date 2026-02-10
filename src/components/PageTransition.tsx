'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import Image from 'next/image';

type PageTransitionProps = {
  children: React.ReactNode;
};

export default function PageTransition({ children }: PageTransitionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const logoOverlayRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);
  const isTransitioning = useRef(false);
  const revealTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const revealPage = useCallback(() => {
    if (revealTimeoutRef.current) {
      clearTimeout(revealTimeoutRef.current);
    }

    gsap.set(blocksRef.current, { scaleX: 1, transformOrigin: 'right' });
    gsap.to(blocksRef.current, {
      scaleX: 0,
      duration: 0.4,
      stagger: 0.02,
      ease: 'power2.out',
      transformOrigin: 'right',
      onComplete: () => {
        isTransitioning.current = false;
        if (overlayRef.current) overlayRef.current.style.pointerEvents = 'none';
        if (logoOverlayRef.current)
          logoOverlayRef.current.style.pointerEvents = 'none';
      },
    });

    // safety fallback drastically reduced to avoid perceived stall
    revealTimeoutRef.current = setTimeout(() => {
      if (blocksRef.current.length > 0) {
        const firstBlock = blocksRef.current[0];
        const val = Number(gsap.getProperty(firstBlock, 'scaleX'));
        if (firstBlock && val > 0.01) {
          gsap.to(blocksRef.current, {
            scaleX: 0,
            duration: 0.18,
            ease: 'power2.out',
            transformOrigin: 'right',
            onComplete: () => {
              isTransitioning.current = false;
              if (overlayRef.current)
                overlayRef.current.style.pointerEvents = 'none';
              if (logoOverlayRef.current)
                logoOverlayRef.current.style.pointerEvents = 'none';
            },
          });
        }
      }
    }, 250);
  }, []);

  const coverPage = useCallback(
    (url: string) => {
      if (overlayRef.current) overlayRef.current.style.pointerEvents = 'auto';
      if (logoOverlayRef.current)
        logoOverlayRef.current.style.pointerEvents = 'auto';

      const tl = gsap.timeline();

      // 1) Cover with blocks; THEN immediately start routing
      tl.to(blocksRef.current, {
        scaleX: 1,
        duration: 0.4,
        stagger: 0.02,
        ease: 'power2.out',
        transformOrigin: 'left',
        onComplete: () => {
          // begin navigation while logo animation plays over the cover
          router.push(url);
        },
      })
        // 2) Play logo animation while new page loads
        .set(logoOverlayRef.current, { opacity: 1 }, '-=0.2')
        .fromTo(
          logoRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.3',
        )
        .to(logoOverlayRef.current, {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.out',
        });
    },
    [router],
  );

  const handleRouteChange = useCallback(
    (url: string) => {
      if (isTransitioning.current) return;
      isTransitioning.current = true;
      coverPage(url);
    },
    [coverPage],
  );

  const onAnchorClick = useCallback(
    (e: Event) => {
      const target = e.currentTarget as HTMLAnchorElement;
      if (isTransitioning.current) {
        e.preventDefault();
        return;
      }
      const mev = e as MouseEvent;
      if (
        mev.metaKey ||
        mev.ctrlKey ||
        mev.shiftKey ||
        mev.altKey ||
        mev.button !== 0 ||
        target.target === '_blank'
      ) {
        return;
      }
      e.preventDefault();
      const href = target.href;
      const url = new URL(href).pathname;
      if (url !== pathname) {
        handleRouteChange(url);
      }
    },
    [pathname, handleRouteChange],
  );

  useEffect(() => {
    const createBlocks = () => {
      if (!overlayRef.current) return;
      overlayRef.current.innerHTML = '';
      blocksRef.current = [];
      for (let i = 0; i < 20; i++) {
        const block = document.createElement('div');
        block.className = 'block';
        overlayRef.current.appendChild(block);
        blocksRef.current.push(block);
      }
    };

    createBlocks();
    gsap.set(blocksRef.current, { scaleX: 0, transformOrigin: 'left' });

    revealPage();

    const links = Array.from(
      document.querySelectorAll('a[href^="/"]'),
    ) as HTMLAnchorElement[];
    links.forEach((link) => link.addEventListener('click', onAnchorClick));

    return () => {
      links.forEach((link) => link.removeEventListener('click', onAnchorClick));
      if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);
    };
  }, [router, pathname, onAnchorClick, revealPage]);

  return (
    <>
      <div ref={overlayRef} className="transition-overlay" />
      <div ref={logoOverlayRef} className="logo-overlay">
        <div className="logo-container">
          <div ref={logoRef} className="transition-logo">
            <Image
              src="/images/logo.png"
              alt="PROGIX Logo"
              width={1200}
              height={1200}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
