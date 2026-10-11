import React from 'react';

interface AboutPageProps {
  navigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex flex-col gap-16">
      {/* 1. Mission Header */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-semibold">
          <span>OUR MISSION &amp; PHILOSOPHY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-theme-on-surface leading-tight">
          Democratizing Percussion Education &amp; Acoustic Science
        </h1>
        <p className="text-base sm:text-lg text-theme-on-variant leading-relaxed">
          DRUMVERSE was created with one single purpose: to guide aspiring and practicing drummers through the art, physics, and craftsmanship of drumming. From choosing your very first drum kit to understanding how wood plies vibrate, we provide transparent, practical education free of commercial clutter.
        </p>
      </div>

      {/* 2. Three Pillars Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-theme-surface-low border border-theme-border flex flex-col gap-3">
          <span className="material-symbols-outlined text-orange-500 text-[32px]">menu_book</span>
          <h3 className="text-xl font-bold text-theme-on-surface">Uncompromising Pedagogy</h3>
          <p className="text-xs text-theme-on-variant leading-relaxed">
            Drumming begins with mechanics: matched grip, relaxed fulcrum, ergonomic throne height, and vocalized subdivisions. We teach fundamentals that build lifetime stamina and prevent carpal tunnel strain.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-theme-surface-low border border-theme-border flex flex-col gap-3">
          <span className="material-symbols-outlined text-orange-500 text-[32px]">science</span>
          <h3 className="text-xl font-bold text-theme-on-surface">Acoustic Engineering</h3>
          <p className="text-xs text-theme-on-variant leading-relaxed">
            We explore how wood botany (maple, birch, mahogany), bearing edge angles (45° vs 30°), and cymbal alloys (cast B20 bronze) physically shape timbre, decay, and transient response.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-theme-surface-low border border-theme-border flex flex-col gap-3">
          <span className="material-symbols-outlined text-orange-500 text-[32px]">health_and_safety</span>
          <h3 className="text-xl font-bold text-theme-on-surface">Lifelong Hearing Health</h3>
          <p className="text-xs text-theme-on-variant leading-relaxed">
            Acoustic drum kits exceed 115 dB SPL. We champion musician earplugs and hearing health awareness so every drummer can play passionately for decades without tinnitus.
          </p>
        </div>
      </div>

      {/* 3. Safe Drumming & Hearing Care Guide (Critical Drummer Health) */}
      <section className="p-8 sm:p-10 rounded-2xl bg-theme-surface-low border border-theme-border shadow-sm flex flex-col gap-6" id="hearing-care">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-orange-500 font-bold">
            HEALTH &amp; SAFETY STANDARD
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-on-surface">
            The Drummer’s Guide to Hearing Protection
          </h2>
          <p className="text-sm text-theme-on-variant leading-relaxed max-w-3xl">
            Tinnitus and noise-induced hearing loss are irreversible. An acoustic snare drum rimshot produces sound pressure levels of 115 to 125 dB at the drummer’s ear level. At that intensity, permanent cochlear hair cell damage can occur in less than 2 minutes of unprotected exposure.
          </p>
        </div>

        {/* Decibel Chart */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-theme-surface border border-theme-border flex flex-col gap-1">
            <span className="text-theme-muted uppercase text-[10px]">Normal Conversation</span>
            <span className="text-lg font-bold text-green-500">60 dB SPL</span>
            <span className="text-theme-on-variant text-[11px]">Safe indefinitely</span>
          </div>
          <div className="p-4 rounded-xl bg-theme-surface border border-theme-border flex flex-col gap-1">
            <span className="text-theme-muted uppercase text-[10px]">OSHA Danger Threshold</span>
            <span className="text-lg font-bold text-yellow-500">85 dB SPL</span>
            <span className="text-theme-on-variant text-[11px]">Max 8 hrs before damage</span>
          </div>
          <div className="p-4 rounded-xl bg-theme-surface border border-theme-border flex flex-col gap-1">
            <span className="text-theme-muted uppercase text-[10px]">Acoustic Drum Kit Playing</span>
            <span className="text-lg font-bold text-orange-500">105–118 dB SPL</span>
            <span className="text-theme-on-variant text-[11px]">Damage occurs in &lt; 5 mins</span>
          </div>
          <div className="p-4 rounded-xl bg-theme-surface border border-theme-border flex flex-col gap-1">
            <span className="text-theme-muted uppercase text-[10px]">Crash &amp; Snare Rimshots</span>
            <span className="text-lg font-bold text-red-500">120+ dB SPL</span>
            <span className="text-theme-on-variant text-[11px]">Immediate hearing trauma</span>
          </div>
        </div>

        {/* Types of Ear Protection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs">
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-theme-surface border border-theme-border">
            <span className="font-bold text-sm text-theme-on-surface">1. High-Fidelity Musician Plugs</span>
            <p className="text-theme-on-variant leading-relaxed">
              Brands like Alpine MusicSafe Pro and Vic Firth VICEARPLUG feature acoustic attenuation filters that reduce volume evenly across all frequencies by 15–20 dB. You hear the crisp snap of your snare and the shimmer of your cymbals in full clarity, just at a safe decibel level.
            </p>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-theme-surface border border-theme-border">
            <span className="font-bold text-sm text-theme-on-surface">2. Isolation Headphones</span>
            <p className="text-theme-on-variant leading-relaxed">
              Over-ear headphones such as the Vic Firth SIH2 Stereo Isolation Headphones cut ambient acoustic volume by 25 dB while allowing you to play along with click tracks or music at comfortable volumes.
            </p>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-theme-surface border border-theme-border">
            <span className="font-bold text-sm text-theme-on-surface">3. Custom Audiologist In-Ears</span>
            <p className="text-theme-on-variant leading-relaxed">
              Molded silicone earplugs crafted from silicone impressions of your ear canals. Offer the ultimate seal, zero pressure points, and swappable flat-response acoustic filters.
            </p>
          </div>
        </div>
      </section>

      {/* 4. The Science of Drum Sound */}
      <section className="flex flex-col gap-6" id="sound-science">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            ACOUSTIC PHYSICS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-on-surface mt-1">
            The Science of Percussion Acoustics
          </h2>
          <p className="text-sm text-theme-on-variant mt-1 max-w-2xl">
            How a drum converts the kinetic energy of a stick strike into vibrating air molecules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-5 rounded-2xl bg-theme-surface-low border border-theme-border flex flex-col gap-2">
            <span className="font-bold text-base text-theme-on-surface">Transients &amp; The Attack Peak</span>
            <p className="text-theme-on-variant leading-relaxed">
              When a wooden stick contacts a drumhead, it creates an instantaneous impulse spike called the initial transient (under 5 milliseconds). This transient contains high-frequency attack energy that gives drums their percussive punch before the shell tone begins to resonate.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-theme-surface-low border border-theme-border flex flex-col gap-2">
            <span className="font-bold text-base text-theme-on-surface">Pitch Bend &amp; Air Compression</span>
            <p className="text-theme-on-variant leading-relaxed">
              Immediately upon strike, the drumhead stretches downward, temporarily increasing tension and raising the initial pitch. As the vibration stabilizes, the pitch drops slightly into its fundamental note, creating the characteristic acoustic punch heard on toms and kick drums.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Directory Navigation Callout */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-theme-surface via-theme-surface to-orange-500/10 border border-theme-border flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-theme-on-surface">Explore DRUMVERSE Resources</h3>
          <p className="text-xs text-theme-on-variant">
            Ready to find your groove, choose your kit, or start structured lessons?
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/learn')}
            className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold font-mono uppercase shadow-md shadow-orange-500/20 active:scale-95 transition-all"
          >
            Start Learning Lessons
          </button>
          <button
            onClick={() => navigate('/drum-kits')}
            className="px-5 py-2.5 bg-theme-surface-high hover:bg-theme-surface-highest text-theme-on-surface rounded-xl text-xs font-medium border border-theme-border transition-all"
          >
            Compare Kits
          </button>
        </div>
      </div>
    </div>
  );
};
