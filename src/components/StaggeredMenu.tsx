'use client';

import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedButton from '@/components/AnimatedButton';
// @ts-ignore
import './StaggeredMenu.css';

interface MenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

interface SocialItem {
  label: string;
  link: string;
}

interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: MenuItem[];
  socialItems?: SocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  logoFilter?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  ctaButtonTextColor?: string;
  ctaButtonBorderColor?: string;
  ctaButtonCircleColor?: string;
  ctaButtonArrowColor?: string;
  ctaButtonHoverTextColor?: string;
  ctaButtonHoverArrowColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  isFixed?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export const StaggeredMenu = ({
  position = 'right',
  colors = ['#B19EEF', '#5227FF'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = '/src/assets/logos/reactbits-gh-white.svg',
  logoFilter = 'brightness(0) invert(1)',
  menuButtonColor = '#fff',
  openMenuButtonColor = '#fff',
  ctaButtonTextColor = '#ffffff',
  ctaButtonBorderColor = '#ffffff',
  ctaButtonCircleColor = '#ffffff',
  ctaButtonArrowColor = '#ffffff',
  ctaButtonHoverTextColor = '#1a3a52',
  ctaButtonHoverArrowColor = '#1a3a52',
  accentColor = '#5227FF',
  changeMenuColorOnOpen = true,
  isFixed = false,
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLElement | null>(null);
  const plusHRef = useRef(null); // legacy, kept for compatibility
  const plusVRef = useRef(null); // legacy, kept for compatibility
  const iconRef = useRef<HTMLElement | null>(null);
  const textInnerRef = useRef<HTMLElement | null>(null);
  const textWrapRef = useRef<HTMLElement | null>(null);
  const [textLines, setTextLines] = useState(['Menu', 'Close']);
  const [hideHeader, setHideHeader] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const openTlRef = useRef<any>(null);
  const closeTweenRef = useRef<any>(null);
  const spinTweenRef = useRef<any>(null);
  const textCycleAnimRef = useRef<any>(null);
  const colorTweenRef = useRef<any>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);
  const itemEntranceTweenRef = useRef<any>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      if (!panel || !icon || !textInner) return;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set(panel, { xPercent: offscreen });
      if (plusH) gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      if (plusV) gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      gsap.set(textInner, { yPercent: 0 });
      if (toggleBtnRef.current)
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });

      // Mark as initialized after positioning is set
      setIsInitialized(true);
    });
    function onScroll() {
      const y = window.scrollY || 0;
      setHideHeader(y > 20);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      ctx.revert();
      window.removeEventListener('scroll', onScroll);
    };
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
    const numberEls = Array.from(
      panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'),
    );
    const socialTitle = panel.querySelector('.sm-socials-title');
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));

    const panelStart = Number(gsap.getProperty(panel, 'xPercent'));

    if (itemEls.length) {
      gsap.set(itemEls, { yPercent: 0, rotate: 0, opacity: 0 });
    }
    if (numberEls.length) {
      gsap.set(numberEls, { '--sm-num-opacity': 0 });
    }
    if (socialTitle) {
      gsap.set(socialTitle, { opacity: 0 });
    }
    if (socialLinks.length) {
      gsap.set(socialLinks, { y: 25, opacity: 0 });
    }

    const tl = gsap.timeline({ paused: true });

    const panelDuration = 0.65;
    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      0,
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.02;
      const itemsStart = 0 + panelDuration * itemsStartRatio;
      tl.to(
        itemEls,
        {
          opacity: 1,
          duration: 0.25,
          ease: 'power2.out',
          stagger: { each: 0.03, from: 'start' },
        },
        itemsStart,
      );
      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.35,
            ease: 'power2.out',
            '--sm-num-opacity': 1,
            stagger: { each: 0.04, from: 'start' },
          },
          itemsStart + 0.1,
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = 0 + panelDuration * 0.4;
      if (socialTitle) {
        tl.to(
          socialTitle,
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          },
          socialsStart,
        );
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: 'opacity' });
            },
          },
          socialsStart + 0.04,
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    if (!panel) return;

    closeTweenRef.current?.kill();
    const offscreen = position === 'left' ? -100 : 100;
    closeTweenRef.current = gsap.to(panel, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(
          panel.querySelectorAll('.sm-panel-itemLabel'),
        );
        if (itemEls.length) {
          gsap.set(itemEls, { opacity: 0 });
        }
        const numberEls = Array.from(
          panel.querySelectorAll(
            '.sm-panel-list[data-numbering] .sm-panel-item',
          ),
        );
        if (numberEls.length) {
          gsap.set(numberEls, { '--sm-num-opacity': 0 });
        }
        const socialTitle = panel.querySelector('.sm-socials-title');
        const socialLinks = Array.from(
          panel.querySelectorAll('.sm-socials-link'),
        );
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        busyRef.current = false;
      },
    });
  }, [position]);

  const animateIcon = useCallback((opening) => {
    const icon = iconRef.current;
    if (!icon) return;
    spinTweenRef.current?.kill();
    if (opening) {
      spinTweenRef.current = gsap.to(icon, {
        rotate: 225,
        duration: 0.8,
        ease: 'power4.out',
        overwrite: 'auto',
      });
    } else {
      spinTweenRef.current = gsap.to(icon, {
        rotate: 0,
        duration: 0.35,
        ease: 'power3.inOut',
        overwrite: 'auto',
      });
    }
  }, []);

  const animateColor = useCallback(
    (opening) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen],
  );

  React.useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current
          ? openMenuButtonColor
          : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback((opening) => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? 'Menu' : 'Close';
    const targetLabel = opening ? 'Close' : 'Menu';
    const cycles = 3;
    const seq = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === 'Menu' ? 'Close' : 'Menu';
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);
    setTextLines(seq);

    gsap.set(inner, { yPercent: 0 });
    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;
    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: 'power4.out',
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) {
      if (onMenuOpen) onMenuOpen();
      playOpen();
    } else {
      if (onMenuClose) onMenuClose();
      playClose();
    }
    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [
    playOpen,
    playClose,
    animateIcon,
    animateColor,
    animateText,
    onMenuOpen,
    onMenuClose,
  ]);

  // Close menu automatically on route change via native anchor clicks
  React.useEffect(() => {
    const anchors = Array.from(
      document.querySelectorAll('.sm-panel-item[href^="/"]'),
    ) as HTMLAnchorElement[];
    const handle = () => {
      if (openRef.current) {
        openRef.current = false;
        setOpen(false);
        playClose();
        animateIcon(false);
        animateColor(false);
        animateText(false);
      }
    };
    anchors.forEach((a) => a.addEventListener('click', handle));
    return () => anchors.forEach((a) => a.removeEventListener('click', handle));
  }, [playClose, animateIcon, animateColor, animateText]);

  return (
    <div
      className={
        (className ? className + ' ' : '') +
        'staggered-menu-wrapper' +
        (isFixed ? ' fixed-wrapper' : '')
      }
      style={{
        ...(accentColor
          ? ({ '--sm-accent': accentColor } as React.CSSProperties)
          : {}),
        opacity: isInitialized ? 1 : 0,
        transition: 'opacity 0.1s ease',
      }}
      data-position={position}
      data-open={open || undefined}
    >
      <header
        className={`staggered-menu-header${hideHeader && !open ? ' sm-header-hidden' : ''}`}
        aria-label="Main navigation header"
      >
        <div
          className="sm-logo transform -translate-x-2 sm:translate-x-0"
          aria-label="Logo"
        >
          <Image
            src="/images/logo.png"
            alt="PROGIX Logo"
            priority
            onClick={() => (window.location.href = '/')}
            width={130}
            height={130}
            className="h-20 w-auto cursor-pointer transform scale-[1.3] sm:scale-100 origin-left"
            draggable={false}
            style={{
              filter: logoFilter,
              opacity: 0.9,
              transition: 'filter 0.3s ease',
            }}
          />
          <Image
            src="/images/CertifiedLogo.png"
            alt="GPTW Certification"
            width={100}
            height={40}
            className="h-10 sm:h-14 w-auto ml-4 mt-4 cursor-pointer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
            draggable={false}
          />
        </div>
        <div className="flex items-center gap-0 sm:gap-2 md:gap-[12px]">
          {!open && (
            <div className="origin-right w-full sm:w-auto flex items-center">
              {/* Mobile: PARLONS NOUS (sm:hidden) */}
              <div className="block sm:hidden transform scale-[0.62] ml-0 mr-[-12px]">
                <Link href="/contact" className="sm-cta-link">
                  <AnimatedButton
                    text="PARLONS NOUS"
                    textColor={ctaButtonTextColor}
                    borderColor={ctaButtonBorderColor}
                    circleColor={ctaButtonCircleColor}
                    arrowColor={ctaButtonArrowColor}
                    hoverTextColor={ctaButtonHoverTextColor}
                    hoverArrowColor={ctaButtonHoverArrowColor}
                  />
                </Link>
              </div>
              {/* Tablet/Desktop: Démarrer un projet */}
              <div className="hidden sm:block transform sm:scale-75 md:scale-90">
                <Link href="/contact" className="sm-cta-link">
                  <AnimatedButton
                    text="Démarrer un projet"
                    textColor={ctaButtonTextColor}
                    borderColor={ctaButtonBorderColor}
                    circleColor={ctaButtonCircleColor}
                    arrowColor={ctaButtonArrowColor}
                    hoverTextColor={ctaButtonHoverTextColor}
                    hoverArrowColor={ctaButtonHoverArrowColor}
                  />
                </Link>
              </div>
            </div>
          )}
          <button
            ref={toggleBtnRef}
            className="sm-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
            type="button"
          >
            <span
              ref={textWrapRef}
              className="sm-toggle-textWrap"
              aria-hidden="true"
            >
              <span ref={textInnerRef} className="sm-toggle-textInner">
                {textLines.map((l, i) => (
                  <span className="sm-toggle-line" key={i}>
                    {l}
                  </span>
                ))}
              </span>
            </span>
            <span ref={iconRef} className="sm-icon" aria-hidden="true">
              <span className="sm-icon-bars">
                <span className="sm-icon-bar" />
                <span className="sm-icon-bar" />
              </span>
            </span>
          </button>
        </div>
      </header>

      <aside
        id="staggered-menu-panel"
        ref={panelRef}
        className="staggered-menu-panel"
        aria-hidden={!open}
      >
        <div className="sm-panel-inner">
          <ul
            className="sm-panel-list"
            role="list"
            data-numbering={displayItemNumbering || undefined}
          >
            {items && items.length ? (
              items.map((it, idx) => (
                <li className="sm-panel-itemWrap" key={it.label + idx}>
                  <a
                    className="sm-panel-item"
                    href={it.link}
                    aria-label={it.ariaLabel}
                    data-index={idx + 1}
                  >
                    <span className="sm-panel-itemLabel">{it.label}</span>
                  </a>
                </li>
              ))
            ) : (
              <li className="sm-panel-itemWrap" aria-hidden="true">
                <span className="sm-panel-item">
                  <span className="sm-panel-itemLabel">No items</span>
                </span>
              </li>
            )}
          </ul>
          {displaySocials && socialItems && socialItems.length > 0 && (
            <div className="sm-socials" aria-label="Social links">
              <h3 className="sm-socials-title">Socials</h3>
              <ul className="sm-socials-list" role="list">
                {socialItems.map((s, i) => (
                  <li key={s.label + i} className="sm-socials-item">
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-socials-link"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default StaggeredMenu;
