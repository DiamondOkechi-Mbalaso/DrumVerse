import React, { useState, useEffect, useRef } from 'react';
import { drumSynth } from '../../audio/drumSynth';

interface RhythmStepSequencerProps {
  initialBpm?: number;
  initialPattern?: {
    hihat: boolean[];
    snare: boolean[];
    kick: boolean[];
  };
  title?: string;
}

const defaultPattern = {
  hihat: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
  snare: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
  kick: [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false],
};

export const RhythmStepSequencer: React.FC<RhythmStepSequencerProps> = ({
  initialBpm = 80,
  initialPattern = defaultPattern,
  title = 'Interactive 16-Step Rhythm Sequencer',
}) => {
  const [bpm, setBpm] = useState(initialBpm);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [pattern, setPattern] = useState(initialPattern);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setPattern(initialPattern);
  }, [initialPattern]);

  useEffect(() => {
    setBpm(initialBpm);
  }, [initialBpm]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      restartSequencer();
    }
  }, [bpm]);

  const toggleStep = (instrument: 'hihat' | 'snare' | 'kick', stepIndex: number) => {
    const updated = { ...pattern };
    updated[instrument] = [...updated[instrument]];
    updated[instrument][stepIndex] = !updated[instrument][stepIndex];
    setPattern(updated);

    // Audition sound on toggle
    drumSynth.ensureUnlocked();
    if (updated[instrument][stepIndex]) {
      drumSynth.playInstrumentSound(instrument);
    }
  };

  const startSequencer = () => {
    drumSynth.ensureUnlocked();
    // 16th notes: (60 / bpm / 4) * 1000
    const stepDuration = (60 / bpm / 4) * 1000;
    let s = 0;

    triggerSoundsAtStep(s);
    setCurrentStep(s);

    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
    }

    timerRef.current = window.setInterval(() => {
      s = (s + 1) % 16;
      setCurrentStep(s);
      triggerSoundsAtStep(s);
    }, stepDuration);
  };

  const triggerSoundsAtStep = (s: number) => {
    if (pattern.hihat[s]) drumSynth.playHiHat(false);
    if (pattern.snare[s]) drumSynth.playSnare();
    if (pattern.kick[s]) drumSynth.playKick();
  };

  const stopSequencer = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setCurrentStep(0);
  };

  const restartSequencer = () => {
    stopSequencer();
    startSequencer();
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopSequencer();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      startSequencer();
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 rounded-2xl bg-theme-surface-low border border-theme-border p-6 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            RHYTHM NOTATION LAB
          </span>
          <h4 className="text-xl font-bold text-theme-on-surface mt-1">{title}</h4>
          <p className="text-xs text-theme-on-variant mt-0.5">
            Click any cell to toggle beats on/off. Listen to the pattern in real time.
          </p>
        </div>

        {/* Play & BPM Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-theme-surface px-3 py-1.5 rounded-xl border border-theme-border">
            <span className="text-xs font-mono text-theme-muted">BPM:</span>
            <span className="text-sm font-bold font-mono text-orange-500">{bpm}</span>
            <input
              type="range"
              min="50"
              max="160"
              value={bpm}
              onChange={(e) => setBpm(parseInt(e.target.value))}
              className="w-20 h-1 bg-theme-surface-highest appearance-none accent-orange-500 cursor-pointer ml-1"
            />
          </div>

          <button
            onClick={togglePlay}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase flex items-center gap-1.5 text-white active:scale-95 transition-all shadow-sm ${
              isPlaying
                ? 'bg-red-600 hover:bg-red-700 shadow-red-600/30'
                : 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/30'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
            <span>{isPlaying ? 'Stop' : 'Play Beat'}</span>
          </button>
        </div>
      </div>

      {/* 16-Step Grid */}
      <div className="flex flex-col gap-3 overflow-x-auto pb-2">
        {/* Step Numbers Header */}
        <div className="grid grid-cols-[80px_repeat(16,minmax(28px,1fr))] gap-1.5 items-center min-w-[580px]">
          <span className="text-[11px] font-mono text-theme-muted uppercase">Voice</span>
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className={`text-center text-[10px] font-mono font-medium py-1 rounded transition-colors ${
                isPlaying && currentStep === i
                  ? 'bg-orange-500 text-white font-bold scale-105'
                  : i % 4 === 0
                  ? 'text-orange-500 font-bold'
                  : 'text-theme-muted'
              }`}
            >
              {i % 4 === 0 ? Math.floor(i / 4) + 1 : '·'}
            </div>
          ))}
        </div>

        {/* Hi-Hat Row */}
        <div className="grid grid-cols-[80px_repeat(16,minmax(28px,1fr))] gap-1.5 items-center min-w-[580px]">
          <span className="text-xs font-mono font-medium text-theme-on-surface">Hi-Hat</span>
          {pattern.hihat.map((active, i) => (
            <button
              key={i}
              onClick={() => toggleStep('hihat', i)}
              className={`h-9 rounded-lg border transition-all ${
                active
                  ? isPlaying && currentStep === i
                    ? 'bg-amber-400 border-amber-300 scale-105 shadow-md shadow-amber-500/40'
                    : 'bg-amber-500 border-amber-600 text-black'
                  : 'bg-theme-surface border-theme-border/70 hover:border-amber-500/50'
              }`}
              title={`Toggle Hi-Hat at step ${i + 1}`}
            />
          ))}
        </div>

        {/* Snare Row */}
        <div className="grid grid-cols-[80px_repeat(16,minmax(28px,1fr))] gap-1.5 items-center min-w-[580px]">
          <span className="text-xs font-mono font-medium text-theme-on-surface">Snare</span>
          {pattern.snare.map((active, i) => (
            <button
              key={i}
              onClick={() => toggleStep('snare', i)}
              className={`h-9 rounded-lg border transition-all ${
                active
                  ? isPlaying && currentStep === i
                    ? 'bg-orange-400 border-orange-300 scale-105 shadow-md shadow-orange-500/40'
                    : 'bg-orange-500 border-orange-600 text-white'
                  : 'bg-theme-surface border-theme-border/70 hover:border-orange-500/50'
              }`}
              title={`Toggle Snare at step ${i + 1}`}
            />
          ))}
        </div>

        {/* Kick Row */}
        <div className="grid grid-cols-[80px_repeat(16,minmax(28px,1fr))] gap-1.5 items-center min-w-[580px]">
          <span className="text-xs font-mono font-medium text-theme-on-surface">Kick</span>
          {pattern.kick.map((active, i) => (
            <button
              key={i}
              onClick={() => toggleStep('kick', i)}
              className={`h-9 rounded-lg border transition-all ${
                active
                  ? isPlaying && currentStep === i
                    ? 'bg-red-500 border-red-400 scale-105 shadow-md shadow-red-500/40'
                    : 'bg-red-600 border-red-700 text-white'
                  : 'bg-theme-surface border-theme-border/70 hover:border-red-500/50'
              }`}
              title={`Toggle Kick at step ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
