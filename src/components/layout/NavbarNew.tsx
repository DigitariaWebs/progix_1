'use client';

import React from 'react';
import StaggeredMenu from '@/components/StaggeredMenu';

const Navbar = () => {
  const menuItems = [
    { label: 'Accueil', ariaLabel: "Aller à la page d'accueil", link: '/' },
    { label: 'Services', ariaLabel: 'Voir nos services', link: '/services' },
    {
      label: 'Portfolio',
      ariaLabel: 'Voir notre portfolio',
      link: '/portfolio',
    },
    {
      label: 'Notre équipe',
      ariaLabel: 'Découvrir notre équipe',
      link: '/team',
    },
    {
      label: 'Nos valeurs',
      ariaLabel: 'Connaître nos valeurs',
      link: '/nos-valeurs',
    },
    {
      label: 'ConFoo 2025',
      ariaLabel: 'Découvrir ConFoo 2025',
      link: '/confoo-2025',
    },
    { label: 'Contact', ariaLabel: 'Nous contacter', link: '/contact' },
  ];

  const socialItems = [
    { label: 'LinkedIn', link: 'https://linkedin.com/company/progix' },
    { label: 'GitHub', link: 'https://github.com/progix' },
    { label: 'Twitter', link: 'https://twitter.com/progix' },
  ];

  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      menuButtonColor="#1B363C"
      openMenuButtonColor="#1B363C"
      changeMenuColorOnOpen={false}
      colors={['#4FA3D1', '#1B363C']}
      logoUrl="/images/logo.png"
      accentColor="#4FA3D1"
      onMenuOpen={() => console.log('Menu opened')}
      onMenuClose={() => console.log('Menu closed')}
    />
  );
};

export default Navbar;
