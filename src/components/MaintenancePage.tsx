import Image from 'next/image';

/**
 * Full-screen "under maintenance" gate, styled to match the PROGIX home hero:
 * solid steel-navy background, white-on-navy monochrome, uppercase tracked
 * labels, glass pill CTA and the signature year / location markers.
 * Static — no animation, no gradients, no background pattern.
 */
export default function MaintenancePage() {
  return (
    <main className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#1a3a52] px-6 text-center">
      {/* Left vertical markers — mirrors the hero */}
      <div className="absolute left-2 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 sm:left-4 md:left-8 md:flex">
        <span
          className="text-xs font-light uppercase tracking-widest text-white/30"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          2026
        </span>
        <div className="h-12 w-px bg-white/20" />
        <span
          className="text-xs font-light uppercase tracking-widest text-white/30"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          Montréal
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
        <span className="mb-8 text-xs font-light uppercase tracking-[0.3em] text-white/50 sm:text-sm">
          En maintenance
        </span>

        <Image
          src="/images/logo.png"
          alt="PROGIX"
          width={280}
          height={82}
          priority
          className="mb-10 h-auto w-[clamp(180px,46vw,270px)] object-contain"
          style={{ filter: 'brightness(0) invert(1)' }}
        />

        <h1
          className="mb-6 font-bold tracking-tight"
          style={{
            fontSize: 'clamp(1.75rem, 5vw, 3rem)',
            lineHeight: '1.1',
            fontFamily: 'Hubot Sans, Inter, sans-serif',
            letterSpacing: '-0.02em',
          }}
        >
          <span className="text-white/90">Nous revenons </span>
          <span style={{ color: '#5cc3ec' }}>bientôt</span>
        </h1>

        <p className="mb-4 max-w-2xl px-2 text-xs font-semibold uppercase tracking-[0.1em] text-white/80 sm:text-sm md:text-base">
          Le site est temporairement en maintenance
        </p>

        <p className="mb-10 max-w-xl text-sm font-light leading-relaxed text-white/50">
          Nos équipes travaillent à une expérience encore meilleure. Merci de votre
          patience.
        </p>

        {/* Glass pill CTA — mirrors the hero button */}
        <a href="mailto:contact@progix.pro" className="group relative inline-block overflow-hidden">
          <div className="relative rounded-full border border-white/20 bg-white/5 px-8 py-3.5 backdrop-blur-sm transition-all duration-500 hover:border-white/40 hover:bg-white/10 sm:px-10 sm:py-4">
            <span className="whitespace-nowrap text-xs font-medium uppercase tracking-wider text-white sm:text-sm">
              contact@progix.pro
            </span>
          </div>
        </a>
      </div>

      {/* Bottom-left social icons — mirrors the hero */}
      <div className="absolute bottom-8 left-4 flex flex-col gap-4 sm:left-8">
        <a
          href="https://www.linkedin.com/company/progix-inc/?viewAsMember=true"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/40 transition-colors duration-300 hover:text-white"
          aria-label="LinkedIn"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
        <a
          href="https://github.com/ilyes200264?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/40 transition-colors duration-300 hover:text-white"
          aria-label="GitHub"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
      </div>
    </main>
  );
}
