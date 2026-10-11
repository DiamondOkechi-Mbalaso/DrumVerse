import React, { useState } from 'react';
import { drumSynth } from '../../audio/drumSynth';

interface KitPreset {
  id: string;
  name: string;
  genre: string;
  tuningPitchMod: number;
  snareSnap: number;
  description: string;
}

const presets: KitPreset[] = [
  {
    id: 'studio-maple',
    name: '01. Studio Custom Maple',
    genre: 'Pop / Modern Rock',
    tuningPitchMod: 1.0,
    snareSnap: 1.0,
    description: 'Natural tight acoustic maple recording with studio compression and close-mic punch.',
  },
  {
    id: 'arena-rock',
    name: '02. Stadium Arena 1985',
    genre: 'Classic Rock / Metal',
    tuningPitchMod: 0.85,
    snareSnap: 1.4,
    description: 'Huge gated snare crack with deep sub-bass bass drum and explosive wide stereo crashes.',
  },
  {
    id: 'vintage-808',
    name: '03. TR-808 Analog Pulse',
    genre: 'Hip-Hop / Trap / EDM',
    tuningPitchMod: 0.7,
    snareSnap: 0.9,
    description: 'Sub-bass 40 Hz kick drone, snappy noise burst snare, and bright electronic tick hi-hats.',
  },
  {
    id: 'tight-funk',
    name: '04. Neo-Soul Pocket',
    genre: 'Funk / R&B / Fusion',
    tuningPitchMod: 1.25,
    snareSnap: 1.3,
    description: 'High-pitched cranked snare, dry muffled punchy kick, and crisp articulate 14" hi-hats.',
  },
];

export const ElectronicSoundModuleExplorer: React.FC = () => {
  const [activePreset, setActivePreset] = useState<KitPreset>(presets[0]);
  const [activePad, setActivePad] = useState<string | null>(null);

  const handlePadStrike = (pad: 'kick' | 'snare' | 'hihat' | 'tom' | 'crash' | 'ride') => {
    drumSynth.ensureUnlocked();
    setActivePad(pad);
    setTimeout(() => setActivePad(null), 150);

    switch (pad) {
      case 'kick':
        drumSynth.playKick(0, activePreset.tuningPitchMod);
        break;
      case 'snare':
        drumSynth.playSnare(0, activePreset.snareSnap);
        break;
      case 'hihat':
        drumSynth.playHiHat(false);
        break;
      case 'tom':
        drumSynth.playTom('mid');
        break;
      case 'crash':
        drumSynth.playCrash();
        break;
      case 'ride':
        drumSynth.playRide();
        break;
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 rounded-2xl bg-theme-surface-low border border-theme-border p-6 sm:p-8 lg:p-10 shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-theme-border pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            DIGITAL SOUND ENGINE SIMULATOR
          </span>
          <h3 className="text-2xl font-bold text-theme-on-surface mt-1">
            Interactive Drum Brain &amp; Pad Trigger
          </h3>
          <p className="text-sm text-theme-on-variant mt-1">
            Switch digital sound presets and strike velocity-sensitive mesh pads to test real-time DSP response.
          </p>
        </div>

        {/* OLED Screen Badge */}
        <div className="flex items-center gap-3 bg-black px-4 py-2.5 rounded-xl border border-orange-500/30 text-orange-400 font-mono text-xs shadow-inner">
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span>DSP ENGINE: 96kHz / 24-bit</span>
        </div>
      </div>

      {/* Preset Selector Buttons */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-mono uppercase tracking-wider text-theme-muted">
          Select Module Kit Preset
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {presets.map((preset) => {
            const isSelected = activePreset.id === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => setActivePreset(preset)}
                className={`p-3.5 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-orange-500/15 border-orange-500 text-theme-on-surface shadow-sm'
                    : 'bg-theme-surface border-theme-border text-theme-on-variant hover:text-theme-on-surface hover:bg-theme-surface-high'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-theme-on-surface truncate">
                    {preset.name}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                  )}
                </div>
                <span className="text-[11px] font-mono text-primary font-medium mt-1 block">
                  {preset.genre}
                </span>
                <p className="text-xs text-theme-muted mt-1.5 line-clamp-2">
                  {preset.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Trigger Mesh Pads Array */}
      <div className="flex flex-col gap-3 pt-2">
        <span className="text-xs font-mono uppercase tracking-wider text-theme-muted">
          Virtual Mesh Pad Array (Tap or Click)
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { id: 'snare', label: 'Snare (Mesh Dual-Zone)', hotkey: 'S' },
            { id: 'kick', label: 'Kick (Tower Pad)', hotkey: 'K' },
            { id: 'hihat', label: 'Hi-Hat (Pedal & Pad)', hotkey: 'H' },
            { id: 'tom', label: 'Tom 1 (Mesh)', hotkey: 'T' },
            { id: 'crash', label: 'Crash 1 (Choke Pad)', hotkey: 'C' },
            { id: 'ride', label: 'Ride (3-Zone Bell)', hotkey: 'R' },
          ].map((pad) => {
            const isHit = activePad === pad.id;
            return (
              <button
                key={pad.id}
                onClick={() => handlePadStrike(pad.id as any)}
                className={`p-5 rounded-2xl flex flex-col items-center justify-center gap-2 border active:scale-95 transition-all text-center ${
                  isHit
                    ? 'bg-orange-500 text-white border-orange-400 scale-105 shadow-lg shadow-orange-500/40 ring-4 ring-orange-500/20'
                    : 'bg-theme-surface border-theme-border text-theme-on-surface hover:border-orange-500/50 hover:bg-theme-surface-high'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isHit
                      ? 'border-white bg-white/20'
                      : 'border-theme-border bg-theme-surface-low text-orange-500'
                  }`}
                >
                  <span className="material-symbols-outlined text-[24px]">
                    {pad.id === 'kick' ? 'album' : pad.id.includes('crash') || pad.id.includes('ride') || pad.id.includes('hihat') ? 'adjust' : 'radio_button_checked'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xs">{pad.label}</span>
                  <span className="text-[10px] font-mono text-theme-muted mt-0.5">Key: [{pad.hotkey}]</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
