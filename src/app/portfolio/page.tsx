import { Suspense } from 'react';
import PortfolioStage from '@/components/portfolio/PortfolioStage';
import PortfolioSkeleton from '@/components/portfolio/PortfolioSkeleton';

export default function PortfolioPage() {
  return (
    <Suspense fallback={<PortfolioSkeleton />}>
      <PortfolioStage />
    </Suspense>
  );
}
