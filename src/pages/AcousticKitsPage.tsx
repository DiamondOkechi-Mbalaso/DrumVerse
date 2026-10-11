import React from 'react';
import { AcousticAnatomyDiagram } from '../components/acoustic/AcousticAnatomyDiagram';

interface AcousticKitsPageProps {
  navigate: (path: string) => void;
}

export const AcousticKitsPage: React.FC<AcousticKitsPageProps> = ({ navigate }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex flex-col gap-16">
      {/* 1. Hero & Introduction */}
      <div className="flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            <span>ACOUSTIC DRUM KITS GUIDE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-theme-on-surface leading-tight">
            The Physics of Air, Wood &amp; Resonant Metal
          </h1>
          <p className="text-base text-theme-on-variant leading-relaxed">
            Acoustic drum kits represent the unadulterated acoustic foundation of modern rhythm. When you strike a drumhead, the kinetic shockwave compresses the air column enclosed within the wood shell, vibrating the bottom resonant head and forcing the wood plies to sing with distinct harmonic warmth.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('anatomy-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-orange-500/20 active:scale-95 transition-all"
            >
              Explore Interactive Anatomy ↓
            </button>
            <button
              onClick={() => navigate('/drum-kits/electronic')}
              className="px-5 py-2.5 bg-theme-surface-high hover:bg-theme-surface-highest text-theme-on-surface rounded-xl text-sm font-medium border border-theme-border transition-all"
            >
              Compare with Electronic Kits →
            </button>
          </div>
        </div>

        {/* Hero Photographic Banner */}
        <div className="flex-1 w-full relative rounded-2xl overflow-hidden border border-theme-border shadow-lg aspect-[4/3]">
          <img
            src="/src/assets/images/acoustic_drum_kit_studio_1791734439303.jpg"
            alt="Studio Acoustic Maple Drum Kit"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400 font-bold">
              MULTI-PLY MAPLE SHELL ARCHITECTURE
            </span>
            <p className="text-xs text-white/90 mt-0.5">
              Hand-crafted bearing edges and polished B20 bronze cymbals in a tuned recording studio.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Interactive Anatomy Diagram */}
      <section id="anatomy-section" className="scroll-mt-24">
        <AcousticAnatomyDiagram />
      </section>

      {/* 3. Tonewoods & Shell Engineering Guide */}
      <section className="flex flex-col gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            METALLURGY &amp; BOTANY
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-on-surface mt-1">
            Drum Shell Tonewoods &amp; Sound Characteristics
          </h2>
          <p className="text-sm text-theme-on-variant mt-1 max-w-2xl">
            The wood species used to construct the drum cylinder dictates its acoustic frequency curve, sustain, and projection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              wood: 'North American Maple',
              profile: 'Balanced Highs, Warm Mids, Rich Lows',
              bestFor: 'All-round Studio Recording, Pop, Rock, Fusion',
              desc: 'The gold standard tonewood. Maple delivers an exceptionally smooth, balanced frequency response across low, mid, and high registers with resonant decay.',
            },
            {
              wood: 'Scandinavian Birch',
              profile: 'Boosted Highs, Punchy Attack, Tight Lows',
              bestFor: 'Live Stages, Modern Metal, Crisp Studio Tracking',
              desc: 'Known as the "naturally EQ’d" drum wood. Birch accentuates attack transients while minimizing muddiness in the midrange, cutting effortlessly through wall of guitars.',
            },
            {
              wood: 'African Mahogany',
              profile: 'Thumping Low-End, Dark Mids, Soft Highs',
              bestFor: 'Vintage Rock, Blues, Neo-Soul, R&B',
              desc: 'Deep, dark, and punchy. Mahogany delivers enhanced bass frequencies and vintage warmth with a shorter sustain that produces that classic 1960s thud.',
            },
            {
              wood: 'American Walnut',
              profile: 'Dark Warmth, Equal Lows & Mids',
              bestFor: 'Boutique Drum Kits, Acoustic Jazz, Warm Rock',
              desc: 'Slightly darker than maple with a rich, velvety low-end emphasis. Beautiful dark brown grain that commands premium boutique prices.',
            },
            {
              wood: 'Japanese Oak',
              profile: 'Maximum Volume, Explosive Projection',
              bestFor: 'Stadium Touring, Heavy Metal, Live Arenas',
              desc: 'Dense, hard hardwood that produces extraordinary acoustic volume and piercing presence. Requires heavy physical stick strikes to fully open up.',
            },
            {
              wood: 'Spun Brass & Bronze',
              profile: 'Bright, Crisp, Metallic Ring & Sensitive Buzz',
              bestFor: 'Snare Drums across every musical genre',
              desc: 'Metal snare shells offer maximum sensitivity to light ghost notes and an unmistakable sharp rimshot crack that cuts through 100-watt guitar amplifiers.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-theme-surface-low border border-theme-border flex flex-col justify-between gap-3 shadow-sm"
            >
              <div className="flex flex-col gap-2">
                <span className="text-lg font-bold text-theme-on-surface">{item.wood}</span>
                <span className="text-xs font-mono font-semibold text-orange-500">
                  {item.profile}
                </span>
                <p className="text-xs text-theme-on-variant leading-relaxed mt-1">
                  {item.desc}
                </p>
              </div>
              <div className="pt-3 border-t border-theme-border/60 text-[11px] font-mono text-theme-muted">
                Best for: <span className="text-theme-on-surface font-semibold">{item.bestFor}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Common Kit Configurations */}
      <section className="flex flex-col gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            SETUP GEOMETRY
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-on-surface mt-1">
            Common Kit Configurations
          </h2>
          <p className="text-sm text-theme-on-variant mt-1 max-w-2xl">
            Acoustic kits are classified by the number of drums (cymbals and stands are counted separately).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-theme-surface-low border border-theme-border flex flex-col gap-3">
            <span className="text-xs font-mono text-orange-500 font-bold uppercase">4-Piece "Bop" Kit</span>
            <h3 className="text-lg font-bold text-theme-on-surface">Jazz &amp; Club Portability</h3>
            <p className="text-xs text-theme-on-variant leading-relaxed">
              Consists of 18" Bass Drum, 14" Snare, 12" Rack Tom, 14" Floor Tom. Small footprint, lightning-fast setup, and warm acoustic resonance suited for jazz, cafes, and small stages.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-theme-surface-low border border-orange-500/40 flex flex-col gap-3 shadow-md">
            <span className="text-xs font-mono text-orange-500 font-bold uppercase">5-Piece Standard Kit</span>
            <h3 className="text-lg font-bold text-theme-on-surface">The Universal Benchmark</h3>
            <p className="text-xs text-theme-on-variant leading-relaxed">
              Consists of 22" Bass Drum, 14" Snare, 10" and 12" Rack Toms, 16" Floor Tom. The most versatile setup ever designed—played across rock, pop, funk, blues, and worship.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-theme-surface-low border border-theme-border flex flex-col gap-3">
            <span className="text-xs font-mono text-orange-500 font-bold uppercase">6-Piece Fusion &amp; Metal Kit</span>
            <h3 className="text-lg font-bold text-theme-on-surface">Expanded Melodic Range</h3>
            <p className="text-xs text-theme-on-variant leading-relaxed">
              Adds an extra 8" high tom or 14" secondary floor tom. Allows complex descending fills, prog-rock ostinatos, and double-bass metal drumming.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Maintenance & Tuning Fundamentals */}
      <section className="p-8 rounded-2xl bg-theme-surface-low border border-theme-border flex flex-col gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            DRUMMER CRAFT
          </span>
          <h2 className="text-2xl font-bold text-theme-on-surface mt-1">
            Acoustic Tuning &amp; Head Maintenance
          </h2>
          <p className="text-sm text-theme-on-variant mt-1 max-w-2xl">
            Unlike guitar strings, drums have two heads: the batter (top) head and the resonant (bottom) head. Tuning both in musical harmony unlocks pure acoustic sustain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-theme-surface border border-theme-border">
            <span className="font-bold text-sm text-theme-on-surface">1. The Star Lug Pattern</span>
            <p className="text-theme-on-variant leading-relaxed">
              Always tighten tension rods in opposing pairs (like lug nuts on a car wheel). This prevents warping the counterhoop and guarantees even tension across the entire head diameter.
            </p>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-theme-surface border border-theme-border">
            <span className="font-bold text-sm text-theme-on-surface">2. Clearing the Head</span>
            <p className="text-theme-on-variant leading-relaxed">
              Lightly tap 1 inch in front of each tension lug with a stick tip while placing a finger lightly in the center of the drumhead. Fine-tune each lug until every pitch matches identically.
            </p>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-theme-surface border border-theme-border">
            <span className="font-bold text-sm text-theme-on-surface">3. Resonant Head Relationship</span>
            <p className="text-theme-on-variant leading-relaxed">
              Tuning the resonant head higher than the batter head gives a crisp, short pitch-bend decay. Tuning both heads to the exact same pitch yields maximum sustained singing resonance.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-theme-border flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs text-theme-muted font-mono">
            Ready to find your acoustic drum kit?
          </span>
          <button
            onClick={() => navigate('/buy')}
            className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold font-mono uppercase transition-colors"
          >
            Browse Verified Retailers →
          </button>
        </div>
      </section>
    </div>
  );
};
