export default function PortfolioSkeleton() {
  return (
    <div className="relative w-full h-[100svh] bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)',
        }}
      />
      <div className="flex items-center gap-3 text-white/60 text-xs font-mono tracking-[0.3em] uppercase">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
        </span>
        Booting scene
      </div>
    </div>
  );
}
