'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { StaggeredMenu } from '@/components/StaggeredMenu';

export default function GlobalMenu() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  // Set initial state based on pathname to avoid hydration mismatch
  const getInitialState = () => {
    if (pathname === '/') {
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
      // On home page, check if we're in the hero section (dark background)
      if (pathname === '/') {
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

    // Add scroll listener for home page to switch colors dynamically
    if (pathname === '/') {
      window.addEventListener('scroll', checkBackground);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', checkBackground);
      };
    }

    return () => clearTimeout(timer);
  }, [pathname, isClient]);

  const menuItems = [
    { label: 'Accueil', ariaLabel: "Aller à la page d'accueil", link: '/' },
    { label: 'A', ariaLabel: 'Accéder à la section A', link: '#' },
    { label: 'Projets', ariaLabel: 'Voir nos projets', link: '/portfolio' },
    { label: 'Appel d’Offres', ariaLabel: "Accéder à Appel d’Offres", link: '#' },
    { label: 'Devis fournisseur', ariaLabel: 'Accéder à Devis fournisseur', link: '#' },
    { label: 'Acheter en ligne', ariaLabel: 'Accéder à Acheter en ligne', link: '#' },
    { label: "Factures d'achat", ariaLabel: "Accéder aux Factures d'achat", link: '#' },
    { label: 'Devis', ariaLabel: 'Accéder à Devis', link: '#' },
    { label: 'Commandes', ariaLabel: 'Accéder à Commandes', link: '#' },
    { label: 'Factures', ariaLabel: 'Accéder à Factures', link: '#' },
    { label: 'Livraisons', ariaLabel: 'Accéder à Livraisons', link: '#' },
    { label: 'Tickets', ariaLabel: 'Accéder à Tickets', link: '#' },
    { label: 'Adresses', ariaLabel: 'Accéder à Adresses', link: '#' },
    { label: 'Feuilles de temps', ariaLabel: 'Accéder à Feuilles de temps', link: '#' },
    { label: 'Newsletter', ariaLabel: 'Accéder à Newsletter', link: '#' },
    { label: 'Demande de matériel', ariaLabel: 'Accéder à Demande de matériel', link: '#' },
    { label: 'Mon Compte', ariaLabel: 'Accéder à Mon Compte', link: '#' },
  ];

  const socialItems = [
    { label: 'LinkedIn', link: 'https://www.linkedin.com/company/progix-inc/?viewAsMember=true' },
    { label: 'GitHub', link: 'https://github.com/ilyes200264?tab=repositories' },
  ];

  // duplicates removed

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
    />
  );
}


