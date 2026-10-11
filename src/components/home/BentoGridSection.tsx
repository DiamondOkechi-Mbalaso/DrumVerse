import React from 'react';

interface BentoGridSectionProps {
  navigate: (path: string) => void;
}

export const BentoGridSection: React.FC<BentoGridSectionProps> = ({ navigate }) => {
  return (
    <section id="editorial" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col gap-12">
      {/* Editorial Heading Block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col max-w-2xl">
          <div className="flex items-center gap-2 text-primary text-xs font-mono uppercase tracking-widest mb-2 font-semibold">
            <span>01</span>
            <span aria-hidden="true">/</span>
            <span>THE FOUNDATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-theme-on-surface">
            More Than Just a Beat
          </h2>
        </div>
        <p className="text-base sm:text-lg text-theme-on-variant max-w-xl leading-relaxed">
          Drums provide the heartbeat, dynamics, energy, and ultimate foundation for musical expression across every genre worldwide.
        </p>
      </div>

      {/* 3-Column Pillar Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {/* Card 1: Discover */}
        <div className="group relative rounded-2xl bg-theme-surface-low border border-theme-border p-6 lg:p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-lg hover:border-orange-500/40 transition-all">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
          <div className="flex flex-col gap-5 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded-full bg-theme-surface-high text-primary font-semibold">
                Encyclopedia
              </span>
              <span className="material-symbols-outlined text-orange-500 text-[28px]">graphic_eq</span>
            </div>

            {/* Micro Visual: Acoustic Snare Mapping Ring */}
            <div className="w-full h-36 rounded-xl bg-theme-surface-lowest flex items-center justify-center p-4 relative overflow-hidden border border-theme-border/50">
              <svg className="w-24 h-24 text-orange-500 transform group-hover:rotate-45 transition-transform duration-700" fill="none" viewBox="0 0 100 100">
                <circle className="opacity-40" cx="50" cy="50" r="42" stroke="currentColor" strokeDasharray="4 4" strokeWidth="2" />
                <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="3" />
                <circle cx="50" cy="50" fill="currentColor" fillOpacity="0.2" r="16" stroke="currentColor" strokeWidth="1.5" />
                <line stroke="currentColor" strokeLinecap="round" strokeWidth="2" x1="50" x2="50" y1="8" y2="24" />
                <line stroke="currentColor" strokeLinecap="round" strokeWidth="2" x1="50" x2="50" y1="76" y2="92" />
                <line stroke="currentColor" strokeLinecap="round" strokeWidth="2" x1="8" x2="24" y1="50" y2="50" />
                <line stroke="currentColor" strokeLinecap="round" strokeWidth="2" x1="76" x2="92" y1="50" y2="50" />
              </svg>
              <span className="absolute bottom-2 right-2 text-[10px] font-mono text-theme-muted">
                ACOUSTIC MAPPING
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-theme-on-surface group-hover:text-primary transition-colors">
                Discover
              </h3>
              <p className="text-sm text-theme-on-variant leading-relaxed">
                Explore the history, anatomy, and acoustic engineering of percussion instruments from vintage shells to modern metallurgy.
              </p>
            </div>
          </div>

          <div className="pt-6 mt-4 border-t border-theme-border/50">
            <button
              onClick={() => navigate('/explore')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-orange-600 transition-colors group/btn"
            >
              <span>Explore Drums</span>
              <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>

        {/* Card 2: Compare */}
        <div className="group relative rounded-2xl bg-theme-surface-low border border-theme-border p-6 lg:p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-lg hover:border-amber-500/40 transition-all">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
          <div className="flex flex-col gap-5 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded-full bg-theme-surface-high text-amber-500 font-semibold">
                Kit Selector
              </span>
              <span className="material-symbols-outlined text-amber-500 text-[28px]">tune</span>
            </div>

            {/* Micro Visual: Acoustic vs Electronic Matrix Bars */}
            <div className="w-full h-36 rounded-xl bg-theme-surface-lowest flex items-center justify-around px-6 py-4 relative overflow-hidden border border-theme-border/50">
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-[11px] font-mono text-orange-500 font-semibold">Acoustic</span>
                <div className="w-12 h-16 rounded bg-theme-surface-high flex flex-col justify-end p-1">
                  <div className="w-full bg-orange-500 rounded h-4/5 group-hover:h-full transition-all duration-300" />
                </div>
                <span className="text-[10px] font-mono text-theme-muted">118 dB</span>
              </div>
              <div className="h-16 w-px bg-theme-border" />
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-[11px] font-mono text-amber-500 font-semibold">Electronic</span>
                <div className="w-12 h-16 rounded bg-theme-surface-high flex flex-col justify-end p-1">
                  <div className="w-full bg-amber-500 rounded h-3/5 group-hover:h-4/5 transition-all duration-300" />
                </div>
                <span className="text-[10px] font-mono text-theme-muted">USB MIDI</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-theme-on-surface group-hover:text-amber-500 transition-colors">
                Compare
              </h3>
              <p className="text-sm text-theme-on-variant leading-relaxed">
                Find out whether acoustic power or electronic versatility suits your sound, residential space, and performance aspirations.
              </p>
            </div>
          </div>

          <div className="pt-6 mt-4 border-t border-theme-border/50">
            <button
              onClick={() => navigate('/drum-kits')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-500 hover:text-orange-500 transition-colors group/btn"
            >
              <span>Compare Drum Kits</span>
              <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>

        {/* Card 3: Learn */}
        <div className="group relative rounded-2xl bg-theme-surface-low border border-theme-border p-6 lg:p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-lg hover:border-orange-500/40 transition-all">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
          <div className="flex flex-col gap-5 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded-full bg-theme-surface-high text-primary font-semibold">
                Academy
              </span>
              <span className="material-symbols-outlined text-orange-500 text-[28px]">school</span>
            </div>

            {/* Micro Visual: 4-Limb Independence Meter */}
            <div className="w-full h-36 rounded-xl bg-theme-surface-lowest flex flex-col justify-center gap-2.5 px-5 py-4 relative overflow-hidden border border-theme-border/50">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-theme-on-variant">Right Hand (Hi-Hat)</span>
                <span className="text-orange-500 font-semibold">8th Notes</span>
              </div>
              <div className="w-full bg-theme-surface-highest h-1.5 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full w-full" />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-theme-on-variant">Left Hand (Snare)</span>
                <span className="text-amber-500 font-semibold">Beats 2 &amp; 4</span>
              </div>
              <div className="w-full bg-theme-surface-highest h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-3/4" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-theme-on-surface group-hover:text-primary transition-colors">
                Learn
              </h3>
              <p className="text-sm text-theme-on-variant leading-relaxed">
                Build your timing, limb independence, coordination, and rock-solid drumming confidence from day one.
              </p>
            </div>
          </div>

          <div className="pt-6 mt-4 border-t border-theme-border/50">
            <button
              onClick={() => navigate('/learn')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-orange-600 transition-colors group/btn"
            >
              <span>Start Learning</span>
              <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
