'use client';

import EquipeHero from '@/components/sections/EquipeHero';
import EquipeManifesto from '@/components/sections/EquipeManifesto';
import EquipeTeamGrid from '@/components/sections/EquipeTeamGrid';
import EquipeHistoire from '@/components/sections/EquipeHistoire';
import EquipeJoinCta from '@/components/sections/EquipeJoinCta';

export default function TeamPage() {
  return (
    <main className="bg-[#0a1a2a]">
      <EquipeHero />
      <EquipeManifesto />
      <EquipeTeamGrid />
      <EquipeHistoire />
      <EquipeJoinCta />
    </main>
  );
}
