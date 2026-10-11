import React from 'react';

interface SpotlightShowdownSectionProps {
  navigate: (path: string) => void;
}

export const SpotlightShowdownSection: React.FC<SpotlightShowdownSectionProps> = ({ navigate }) => {
  return (
    <section className="w-full bg-theme-surface-lowest border-y border-theme-border py-20 lg:py-24 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            ENGINEERING SHOWDOWN
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-theme-on-surface mt-2">
            Dual Philosophies of Percussion
          </h2>
          <p className="text-sm sm:text-base text-theme-on-variant mt-3 leading-relaxed">
            Whether you crave the visceral air movement of multi-ply maple or the silent velocity-sensitive precision of mesh heads, choose your sonic identity.
          </p>
        </div>

        {/* Split Spotlight Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Spotlight A: Acoustic */}
          <div className="group relative rounded-2xl bg-theme-surface-low border border-theme-border p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-hidden shadow-md hover:shadow-xl hover:border-orange-500/50 transition-all">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:scale-105 group-hover:opacity-35 transition-all duration-700"
              style={{
                backgroundImage: "url('/src/assets/images/acoustic_drum_kit_studio_1791734439303.jpg')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-theme-surface-low via-theme-surface-low/90 to-transparent" />

            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-orange-500/15 text-orange-500 text-xs font-mono font-semibold uppercase tracking-wider">
                  Organic Dynamics
                </span>
                <span className="material-symbols-outlined text-orange-500 text-[24px]">graphic_eq</span>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-theme-on-surface">
                  The Raw Power of Acoustic
                </h3>
                <p className="text-sm sm:text-base text-theme-on-variant leading-relaxed">
                  Pure physics, resonant wood shells, and uncompressed harmonic frequencies. Experience physical air impact that commands entire auditoriums.
                </p>
              </div>

              {/* Tech Spec Gauges */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="flex flex-col p-3 rounded-xl bg-theme-surface/90 border border-theme-border/60 backdrop-blur-sm">
                  <span className="text-[10px] font-mono text-theme-muted uppercase">Dynamic Range</span>
                  <span className="text-sm sm:text-base font-bold text-orange-500 font-mono-numbers">100% Tactile</span>
                  <span className="text-[11px] text-theme-on-variant">Direct stick feedback</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl bg-theme-surface/90 border border-theme-border/60 backdrop-blur-sm">
                  <span className="text-[10px] font-mono text-theme-muted uppercase">Sound Level</span>
                  <span className="text-sm sm:text-base font-bold text-orange-500 font-mono-numbers">95-120 dB</span>
                  <span className="text-[11px] text-theme-on-variant">Unattenuated stage SPL</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl bg-theme-surface/90 border border-theme-border/60 backdrop-blur-sm">
                  <span className="text-[10px] font-mono text-theme-muted uppercase">Latency</span>
                  <span className="text-sm sm:text-base font-bold text-orange-500 font-mono-numbers">0.00 ms</span>
                  <span className="text-[11px] text-theme-on-variant">Instant physical reaction</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-8 mt-4">
              <button
                onClick={() => navigate('/drum-kits/acoustic')}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-theme-surface-high hover:bg-orange-500 text-theme-on-surface hover:text-white font-bold text-sm sm:text-base border border-theme-border hover:border-orange-500 shadow-sm active:scale-95 transition-all"
              >
                <span>Explore Acoustic Kits</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Spotlight B: Electronic */}
          <div className="group relative rounded-2xl bg-theme-surface-low border border-theme-border p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-hidden shadow-md hover:shadow-xl hover:border-amber-500/50 transition-all">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:scale-105 group-hover:opacity-35 transition-all duration-700"
              style={{
                backgroundImage: "url('/src/assets/images/electronic_drum_kit_mesh_1791734458237.jpg')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-theme-surface-low via-theme-surface-low/90 to-transparent" />

            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-500 text-xs font-mono font-semibold uppercase tracking-wider">
                  Digital Versatility
                </span>
                <span className="material-symbols-outlined text-amber-500 text-[24px]">developer_board</span>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-theme-on-surface">
                  The Boundaryless Reach of Electronic
                </h3>
                <p className="text-sm sm:text-base text-theme-on-variant leading-relaxed">
                  Endless sonic libraries, midnight headphone sessions, and multi-track studio MIDI routing directly into your digital audio workstation.
                </p>
              </div>

              {/* Tech Spec Gauges */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="flex flex-col p-3 rounded-xl bg-theme-surface/90 border border-theme-border/60 backdrop-blur-sm">
                  <span className="text-[10px] font-mono text-theme-muted uppercase">Volume Control</span>
                  <span className="text-sm sm:text-base font-bold text-amber-500 font-mono-numbers">Whisper to Pro</span>
                  <span className="text-[11px] text-theme-on-variant">Apartment friendly</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl bg-theme-surface/90 border border-theme-border/60 backdrop-blur-sm">
                  <span className="text-[10px] font-mono text-theme-muted uppercase">Sound Engine</span>
                  <span className="text-sm sm:text-base font-bold text-amber-500 font-mono-numbers">1,000+ Kits</span>
                  <span className="text-[11px] text-theme-on-variant">Samples &amp; synthesis</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl bg-theme-surface/90 border border-theme-border/60 backdrop-blur-sm">
                  <span className="text-[10px] font-mono text-theme-muted uppercase">Connectivity</span>
                  <span className="text-sm sm:text-base font-bold text-amber-500 font-mono-numbers">USB &amp; MIDI</span>
                  <span className="text-[11px] text-theme-on-variant">Direct DAW track record</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-8 mt-4">
              <button
                onClick={() => navigate('/drum-kits/electronic')}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-theme-surface-high hover:bg-amber-600 text-theme-on-surface hover:text-white font-bold text-sm sm:text-base border border-theme-border hover:border-amber-600 shadow-sm active:scale-95 transition-all"
              >
                <span>Explore Electronic Kits</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
