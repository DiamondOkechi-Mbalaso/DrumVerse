import React, { useState } from 'react';
import { drumSynth } from '../../audio/drumSynth';

interface KitComponent {
  id: string;
  name: string;
  role: string;
  size: string;
  woodOrAlloy: string;
  tuningTip: string;
  soundType: string;
  xPercent: number; // For diagram placement
  yPercent: number;
}

const kitComponents: KitComponent[] = [
  {
    id: 'bass-drum',
    name: 'Bass Drum (Kick)',
    role: 'The sub-frequency heartbeat and anchor of the rhythm section',
    size: '22" x 18" (Standard)',
    woodOrAlloy: '6 to 8-ply North American Maple',
    tuningTip: 'Batter head tuned finger-tight for punch; resonant head medium for sustain and decay.',
    soundType: 'kick',
    xPercent: 50,
    yPercent: 72,
  },
  {
    id: 'snare-drum',
    name: 'Snare Drum',
    role: 'The primary backbeat engine on beats 2 and 4 with crisp snare wire buzz',
    size: '14" x 5.5" or 14" x 6.5"',
    woodOrAlloy: '10-ply Maple, Brass, or Spun Aluminum',
    tuningTip: 'Resonant head very tight (400 Hz); batter head medium-tight (280–320 Hz) with centered rimshots.',
    soundType: 'snare',
    xPercent: 36,
    yPercent: 58,
  },
  {
    id: 'hi-hat',
    name: 'Hi-Hat Cymbals',
    role: 'The primary timekeeping cymbals modulated by the left foot pedal',
    size: '14" Pair (Top Medium, Bottom Heavy)',
    woodOrAlloy: 'Cast B20 Bronze (80% Copper, 20% Tin)',
    tuningTip: 'Adjust bottom cymbal tilt screw to prevent airlock and ensure crisp, clean chick definition.',
    soundType: 'hihat',
    xPercent: 20,
    yPercent: 44,
  },
  {
    id: 'rack-tom-1',
    name: 'High Rack Tom',
    role: 'High-pitched melodic fills and dynamic drum rolls',
    size: '10" x 7" or 10" x 8"',
    woodOrAlloy: '6-ply Birch or Maple',
    tuningTip: 'Clear 2-ply batter head tuned roughly a perfect fourth above the second tom (around 160 Hz).',
    soundType: 'tom',
    xPercent: 42,
    yPercent: 36,
  },
  {
    id: 'rack-tom-2',
    name: 'Mid Rack Tom',
    role: 'Mid-register tom bridging high rack fills down to the floor tom',
    size: '12" x 8" or 12" x 9"',
    woodOrAlloy: '6-ply Birch or Maple',
    tuningTip: 'Tuned to around 125 Hz for balanced tonal separation between 10" and 14" drums.',
    soundType: 'tom',
    xPercent: 58,
    yPercent: 36,
  },
  {
    id: 'floor-tom',
    name: 'Floor Tom',
    role: 'Thunderous low-end tom mounted on three isolation floor legs',
    size: '16" x 16" (Deep floor drum)',
    woodOrAlloy: '7-ply Birch, Maple, or Mahogany',
    tuningTip: 'Tuned low (70–85 Hz) with minimal muffling to produce full, sustained, booming low-end resonance.',
    soundType: 'tom',
    xPercent: 74,
    yPercent: 62,
  },
  {
    id: 'crash-cymbal',
    name: 'Crash Cymbal',
    role: 'Explosive punctuation for measure downbeats and guitar transitions',
    size: '16" or 18" Medium-Thin Crash',
    woodOrAlloy: 'Hand-hammered Cast B20 Bronze',
    tuningTip: 'Never strike directly on the thin edge at a 90° angle—use a sweeping glance stroke to protect bronze.',
    soundType: 'crash',
    xPercent: 25,
    yPercent: 22,
  },
  {
    id: 'ride-cymbal',
    name: 'Ride Cymbal',
    role: 'Continuous shimmering rhythm ping and cutting raised bell accents',
    size: '20" or 22" Medium-Heavy Ride',
    woodOrAlloy: 'Cast B20 Bronze with lathed bow',
    tuningTip: 'Place stick tip on bow for articulated jazz/rock definition; hit bell with stick shoulder for cutting accents.',
    soundType: 'ride',
    xPercent: 78,
    yPercent: 26,
  },
  {
    id: 'bass-pedal',
    name: 'Bass Drum Pedal & Hardware',
    role: 'Spring-loaded double-chain or direct-drive kick pedal mechanism',
    size: 'Heavy-duty double-braced hardware',
    woodOrAlloy: 'Aircraft-grade aluminum and hardened steel',
    tuningTip: 'Adjust spring tension to match foot velocity; ensure beater strikes drumhead just above dead center.',
    soundType: 'kick',
    xPercent: 50,
    yPercent: 88,
  },
];

export const AcousticAnatomyDiagram: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<KitComponent>(kitComponents[1]); // Default to snare

  const handleSelect = (comp: KitComponent) => {
    setSelectedComponent(comp);
    drumSynth.ensureUnlocked();
    drumSynth.playInstrumentSound(comp.soundType);
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            INTERACTIVE ANATOMY MAP
          </span>
          <h3 className="text-2xl font-bold text-theme-on-surface mt-1">
            Anatomy of the 5-Piece Acoustic Kit
          </h3>
          <p className="text-sm text-theme-on-variant mt-1">
            Click or tap any component or hotspot to explore shell acoustics, dimensions, and trigger sound samples.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-orange-500 bg-orange-500/10 px-3 py-1.5 rounded-lg border border-orange-500/20 w-fit">
          <span className="material-symbols-outlined text-[16px]">volume_up</span>
          <span>Clicking triggers audio</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive Visual Map Card */}
        <div className="lg:col-span-7 rounded-2xl bg-theme-surface-low border border-theme-border p-4 sm:p-6 shadow-md flex flex-col gap-4">
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-theme-surface-lowest border border-theme-border flex items-center justify-center">
            {/* Background Photographic Reference */}
            <img
              src="/src/assets/images/acoustic_drum_kit_studio_1791734439303.jpg"
              alt="Acoustic Drum Kit Studio View"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-theme-surface-lowest via-theme-surface-lowest/40 to-transparent" />

            {/* Hotspot Markers */}
            {kitComponents.map((comp) => {
              const isSelected = selectedComponent.id === comp.id;
              return (
                <button
                  key={comp.id}
                  onClick={() => handleSelect(comp)}
                  style={{
                    left: `${comp.xPercent}%`,
                    top: `${comp.yPercent}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-full z-20 transition-all ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}
                  aria-label={`Select ${comp.name}`}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-[11px] font-bold shadow-lg transition-all ${
                      isSelected
                        ? 'bg-orange-500 text-white ring-4 ring-orange-500/30 shadow-orange-500/60'
                        : 'bg-theme-surface/90 text-theme-on-surface border border-theme-border hover:bg-orange-500 hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">touch_app</span>
                  </div>

                  {/* Tooltip on hover */}
                  <span className="absolute left-1/2 -translate-x-1/2 -top-7 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {comp.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Component Button Bar for Keyboard and Mobile Accessibility */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {kitComponents.map((comp) => {
              const isSelected = selectedComponent.id === comp.id;
              return (
                <button
                  key={comp.id}
                  onClick={() => handleSelect(comp)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all ${
                    isSelected
                      ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                      : 'bg-theme-surface border-theme-border text-theme-on-variant hover:text-theme-on-surface hover:bg-theme-surface-high'
                  }`}
                >
                  {comp.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Component Technical Detail Card */}
        <div className="lg:col-span-5 rounded-2xl bg-theme-surface-low border border-theme-border p-6 shadow-md flex flex-col gap-5">
          <div className="flex items-center justify-between pb-3 border-b border-theme-border">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              <span className="text-xs font-mono text-primary font-semibold uppercase">
                SELECTED COMPONENT
              </span>
            </div>
            <button
              onClick={() => {
                drumSynth.ensureUnlocked();
                drumSynth.playInstrumentSound(selectedComponent.soundType);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/15 hover:bg-orange-500/25 text-orange-500 rounded-lg text-xs font-mono font-bold transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">play_arrow</span>
              <span>Test Tone</span>
            </button>
          </div>

          <div>
            <h4 className="text-2xl font-extrabold text-theme-on-surface">
              {selectedComponent.name}
            </h4>
            <p className="text-sm text-theme-on-variant mt-1.5 leading-relaxed">
              {selectedComponent.role}
            </p>
          </div>

          {/* Specs Matrix */}
          <div className="flex flex-col gap-3 py-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-theme-surface border border-theme-border">
              <span className="text-xs font-mono text-theme-muted uppercase">Typical Size</span>
              <span className="text-sm font-semibold text-theme-on-surface font-mono">
                {selectedComponent.size}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-theme-surface border border-theme-border">
              <span className="text-xs font-mono text-theme-muted uppercase">Construction</span>
              <span className="text-sm font-semibold text-theme-on-surface text-right">
                {selectedComponent.woodOrAlloy}
              </span>
            </div>

            <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-theme-surface border border-theme-border">
              <span className="text-xs font-mono text-orange-500 font-semibold uppercase">
                Tuning &amp; Acoustic Engineering
              </span>
              <p className="text-xs text-theme-on-variant leading-relaxed">
                {selectedComponent.tuningTip}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
