import React from 'react';
import { ElectronicSoundModuleExplorer } from '../components/electronic/ElectronicSoundModuleExplorer';

interface ElectronicKitsPageProps {
  navigate: (path: string) => void;
}

export const ElectronicKitsPage: React.FC<ElectronicKitsPageProps> = ({ navigate }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex flex-col gap-16">
      {/* 1. Hero & Introduction */}
      <div className="flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            <span>ELECTRONIC DRUM KITS GUIDE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-theme-on-surface leading-tight">
            The Digital Revolution: Infinite Kits in Total Silence
          </h1>
          <p className="text-base text-theme-on-variant leading-relaxed">
            Electronic drum kits have transformed drumming for bedroom producers and apartment dwellers. By replacing acoustic heads with velocity-sensitive woven mesh pads and piezo-electric triggers, drummers can experience realistic stick rebound while sending pure MIDI trigger data to headphones, monitors, and digital audio workstations.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('module-explorer-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-amber-500/20 active:scale-95 transition-all"
            >
              Test Virtual Sound Engine ↓
            </button>
            <button
              onClick={() => navigate('/drum-kits/acoustic')}
              className="px-5 py-2.5 bg-theme-surface-high hover:bg-theme-surface-highest text-theme-on-surface rounded-xl text-sm font-medium border border-theme-border transition-all"
            >
              Compare with Acoustic Kits →
            </button>
          </div>
        </div>

        {/* Hero Photographic Banner */}
        <div className="flex-1 w-full relative rounded-2xl overflow-hidden border border-theme-border shadow-lg aspect-[4/3]">
          <img
            src="/src/assets/images/electronic_drum_kit_mesh_1791734458237.jpg"
            alt="Studio Electronic Mesh Drum Kit"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
              MULTI-ZONE MESH PADS &amp; DSP MODULE BRAIN
            </span>
            <p className="text-xs text-white/90 mt-0.5">
              Dual-zone rimshot detection, positional sensing, and zero-latency USB-MIDI audio routing.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Interactive Digital Sound Module Explorer */}
      <section id="module-explorer-section" className="scroll-mt-24">
        <ElectronicSoundModuleExplorer />
      </section>

      {/* 3. Core Anatomy of an Electronic Kit */}
      <section className="flex flex-col gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            HARDWARE &amp; SENSORS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-on-surface mt-1">
            Electronic Kit Component Breakdown
          </h2>
          <p className="text-sm text-theme-on-variant mt-1 max-w-2xl">
            From the piezo sensor under the mesh head to the floating hi-hat clutch and the DSP drum brain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Tunable Mesh Heads',
              badge: 'TACTILE FEEL',
              desc: 'Woven synthetic mesh heads that can be tensioned with a standard drum key. They allow silent stick rebound while eliminating the harsh wrist fatigue of old rubber pads.',
            },
            {
              title: 'Dual-Zone & Triple-Zone Triggers',
              badge: 'DYNAMIC SENSING',
              desc: 'High-end pads contain separate sensors for head vs rim, allowing natural cross-stick clicks and rimshots. Cymbals feature 3 zones: bell, bow, and edge with manual hand choke.',
            },
            {
              title: 'The Drum Brain (Module)',
              badge: 'DSP COMPUTER',
              desc: 'The central command processor that converts analog voltage pulses from piezo sensors into digital audio samples or MIDI data packets with sub-4ms latency.',
            },
            {
              title: 'Kick Tower & Inverted Beater',
              badge: 'LOW-END IMPACT',
              desc: 'A heavy stand accommodating a real acoustic bass drum pedal. Fitted with a soft foam or mesh pad to absorb the beater strike while triggering thunderous sub-bass kicks.',
            },
            {
              title: 'Optical Hi-Hat Controllers',
              badge: 'INFRARED ACCURACY',
              desc: 'Instead of a simple on/off foot switch, top electronic kits use continuous optical sensors mounted on standard acoustic hi-hat stands to track smooth transitions from tightly closed to fully open.',
            },
            {
              title: 'Monitoring: Cans vs Wedge Amp',
              badge: 'AUDIO OUTPUT',
              desc: 'Use closed-back 80-ohm studio monitor headphones (like Audio-Technica ATH-M50x) for silent practice, or a dedicated bi-amped drum monitor amplifier for rehearsals.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-theme-surface-low border border-theme-border flex flex-col justify-between gap-3 shadow-sm"
            >
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500 font-bold">
                  {item.badge}
                </span>
                <h3 className="text-lg font-bold text-theme-on-surface">{item.title}</h3>
                <p className="text-xs text-theme-on-variant leading-relaxed mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. USB / MIDI Recording Setup Guide */}
      <section className="p-8 rounded-2xl bg-theme-surface-low border border-theme-border flex flex-col gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            HOME RECORDING
          </span>
          <h2 className="text-2xl font-bold text-theme-on-surface mt-1">
            DAW Integration &amp; Virtual Drum Libraries
          </h2>
          <p className="text-sm text-theme-on-variant mt-1 max-w-2xl">
            How a £400 electronic drum kit can trigger £200,000 worth of Abbey Road studio drum samples inside your laptop.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-theme-surface border border-theme-border">
            <span className="font-bold text-sm text-theme-on-surface">1. Connect via USB</span>
            <p className="text-theme-on-variant leading-relaxed">
              Plug a standard USB-B to USB-A cable directly from the drum module into your computer. Most modern modules are USB class-compliant (no driver installations required).
            </p>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-theme-surface border border-theme-border">
            <span className="font-bold text-sm text-theme-on-surface">2. Load VST Drum Engine</span>
            <p className="text-theme-on-variant leading-relaxed">
              Open your DAW (Reaper, Logic, Ableton, FL Studio) and load a professional drum sampler like Superior Drummer 3, EZdrummer 3, or Addictive Drums 2.
            </p>
          </div>
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-theme-surface border border-theme-border">
            <span className="font-bold text-sm text-theme-on-surface">3. Zero-Bleed MIDI Editing</span>
            <p className="text-theme-on-variant leading-relaxed">
              Record your performance as MIDI notes. You can quantize timing errors, adjust individual drum mix balances, or switch the snare sample even after recording.
            </p>
          </div>
        </div>

        {/* Apartment Sound Isolation Tip */}
        <div className="p-4 rounded-xl bg-theme-surface border border-theme-border flex items-start gap-3">
          <span className="material-symbols-outlined text-amber-500 text-[24px] shrink-0 mt-0.5">
            apartment
          </span>
          <div className="flex flex-col gap-1 text-xs">
            <span className="font-bold text-theme-on-surface">
              Apartment Floor Vibration Tip: The Tennis Ball Riser
            </span>
            <p className="text-theme-on-variant leading-relaxed">
              While mesh pads are silent to airborne ears, kick pedal footfalls send low-frequency kinetic vibrations straight down through concrete and wooden joists. Building a DIY "tennis ball sandwich riser" (two MDF boards with sliced tennis balls in between) decouples kinetic energy from the building structure by over 80%.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-theme-border flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => navigate('/drum-kits')}
            className="text-xs text-amber-500 font-bold hover:underline"
          >
            ← Back to Acoustic vs Electronic Comparison
          </button>
          <button
            onClick={() => navigate('/buy')}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold font-mono uppercase transition-colors"
          >
            Explore Electronic Kit Retailers →
          </button>
        </div>
      </section>
    </div>
  );
};
