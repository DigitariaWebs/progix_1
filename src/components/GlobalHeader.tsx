'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
// Deprecated Navbar removed; header is now provided by StaggeredMenu header globally

export default function GlobalHeader() {
  const pathname = usePathname();
  // Hide classic Navbar on homepage only
  return null;
}
