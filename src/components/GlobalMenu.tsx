'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { StaggeredMenu } from '@/components/StaggeredMenu';

import { useGlobalMenuToggle } from '@/components/globalMenuBus';

export function GlobalMenuToggle({
  className,
  label = 'Menu',
  iconOnly = false,
}: {
  className?: string;
  label?: string;
  iconOnly?: boolean;
}) {
  const toggle = useGlobalMenuToggle();
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        toggle();
      }}
      aria-label={label}
      className={
        className ??
        'inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:border-white/40 hover:bg-white/10'
      }
    >
      <Menu className="h-4 w-4" />
      {!iconOnly && <span>{label}</span>}
    </button>
  );
}

export default function GlobalMenu() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  // Set initial state based on pathname to avoid hydration mismatch
  const isAlwaysDarkPage =
    pathname === '/team' || pathname === '/contact' || pathname === '/qualification';
  const isDarkHeroPage =
    isAlwaysDarkPage ||
    pathname === '/' ||
    pathname.startsWith('/services/app-mobile') ||
    pathname === '/labo' ||
    pathname === '/portfolio' ||
    pathname === '/confoo-2025';

  const getInitialState = () => {
    if (isDarkHeroPage) {
      // On home page, start with white (hero section colors)
      return {
        menuButtonColor: '#ffffff',
        logoFilter: 'brightness(0) invert(1)',
        ctaButtonColors: {
          textColor: '#ffffff',
          borderColor: '#ffffff',
          circleColor: '#ffffff',
          arrowColor: '#ffffff',
          hoverTextColor: '#1a3a52',
          hoverArrowColor: '#1a3a52',
        },
      };
    } else {
      // Other pages start with dark/blue colors
      return {
        menuButtonColor: '#1B363C',
        logoFilter: 'none',
        ctaButtonColors: {
          textColor: '#1D4760',
          borderColor: '#1D4760',
          circleColor: '#1D4760',
          arrowColor: '#1D4760',
          hoverTextColor: '#ffffff',
          hoverArrowColor: '#ffffff',
        },
      };
    }
  };

  const initialState = getInitialState();
  const [menuButtonColor, setMenuButtonColor] = useState(
    initialState.menuButtonColor,
  );
  const [logoFilter, setLogoFilter] = useState(initialState.logoFilter);
  const [ctaButtonColors, setCtaButtonColors] = useState(
    initialState.ctaButtonColors,
  );

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Detect if we're on a dark background (hero section on home page)
  useEffect(() => {
    if (!isClient) return; // Wait for client-side hydration

    const checkBackground = () => {
      // Pages that are dark from top to bottom: always use white
      if (isAlwaysDarkPage) {
        setMenuButtonColor('#ffffff');
        setLogoFilter('brightness(0) invert(1)');
        setCtaButtonColors({
          textColor: '#ffffff',
          borderColor: '#ffffff',
          circleColor: '#ffffff',
          arrowColor: '#ffffff',
          hoverTextColor: '#1a3a52',
          hoverArrowColor: '#1a3a52',
        });
        return;
      }

      // On home page, check if we're in the hero section (dark background)
      if (isDarkHeroPage) {
        const heroSection = document.querySelector('section');
        if (heroSection) {
          const rect = heroSection.getBoundingClientRect();
          // If hero section is visible, use white/grey for everything
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            setMenuButtonColor('#ffffff');
            setLogoFilter('brightness(0) invert(1)'); // White logo
            setCtaButtonColors({
              textColor: '#ffffff',
              borderColor: '#ffffff',
              circleColor: '#ffffff',
              arrowColor: '#ffffff',
              hoverTextColor: '#1a3a52',
              hoverArrowColor: '#1a3a52',
            });
          } else {
            setMenuButtonColor('#1B363C');
            setLogoFilter('none'); // Normal colored logo
            setCtaButtonColors({
              textColor: '#1D4760',
              borderColor: '#1D4760',
              circleColor: '#1D4760',
              arrowColor: '#1D4760',
              hoverTextColor: '#ffffff',
              hoverArrowColor: '#ffffff',
            });
          }
        }
      } else {
        // For all other pages, use blue button
        setMenuButtonColor('#1B363C');
        setLogoFilter('none'); // Normal colored logo
        setCtaButtonColors({
          textColor: '#1D4760',
          borderColor: '#1D4760',
          circleColor: '#1D4760',
          arrowColor: '#1D4760',
          hoverTextColor: '#ffffff',
          hoverArrowColor: '#ffffff',
        });
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(checkBackground, 50);

    // Add scroll listener for dark hero pages to switch colors dynamically
    if (isDarkHeroPage) {
      window.addEventListener('scroll', checkBackground);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', checkBackground);
      };
    }

    return () => clearTimeout(timer);
  }, [pathname, isClient, isDarkHeroPage]);

  const menuItems = [
    { label: 'Accueil', ariaLabel: "Aller à la page d'accueil", link: '/' },
    {
      label: 'Offre restaurants',
      ariaLabel: "Découvrir l'offre application pour restaurants",
      link: '/offers',
    },
    {
      label: 'Expertise',
      ariaLabel: 'Voir notre expertise',
      link: '/expertise',
    },
    {
      label: 'Portfolio',
      ariaLabel: 'Voir notre portfolio',
      link: '/portfolio',
    },
    { label: 'Équipe', ariaLabel: 'Découvrir notre équipe', link: '/team' },
    {
      label: 'Valeurs',
      ariaLabel: 'Connaître nos valeurs',
      link: '/nos-valeurs',
    },
    {
      label: 'ConFoo',
      ariaLabel: 'Découvrir ConFoo 2025',
      link: '/confoo-2025',
    },
  ];

  const socialItems = [
    { label: 'LinkedIn', link: 'https://linkedin.com/company/progix' },
    { label: 'GitHub', link: 'https://github.com/progix' },
    { label: 'Twitter', link: 'https://twitter.com/progix' },
  ];

  return (
    <StaggeredMenu
      key={pathname}
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      menuButtonColor={menuButtonColor}
      logoFilter={logoFilter}
      ctaButtonTextColor={ctaButtonColors.textColor}
      ctaButtonBorderColor={ctaButtonColors.borderColor}
      ctaButtonCircleColor={ctaButtonColors.circleColor}
      ctaButtonArrowColor={ctaButtonColors.arrowColor}
      ctaButtonHoverTextColor={ctaButtonColors.hoverTextColor}
      ctaButtonHoverArrowColor={ctaButtonColors.hoverArrowColor}
      openMenuButtonColor="#000000"
      changeMenuColorOnOpen={true}
      colors={['#1D4760', '#1B363C']}
      logoUrl="/images/logo.png"
      accentColor="#ffffff"
      isFixed={true}
      displayCta={pathname !== '/qualification'}
      headless={pathname === '/portfolio'}
    />
  );
}
