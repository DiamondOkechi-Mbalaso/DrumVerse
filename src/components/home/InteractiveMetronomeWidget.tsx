import React, { useState, useEffect, useRef } from 'react';
import { drumSynth } from '../../audio/drumSynth';

export const InteractiveMetronomeWidget: React.FC = () => {
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeSig, setTimeSig] = useState<'4/4' | '6/8' | '3/4'>('4/4');
  const [currentStep, setCurrentStep] = useState(0);

  const timerRef = useRef<number | null>(null);

  const getStepCount = () => {
    switch (timeSig) {
      case '4/4': return 4;
      case '3/4': return 3;
      case '6/8': return 6;
    }
  };

  const steps = getStepCount();

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      restartEngine();
    }
  }, [bpm, timeSig]);

  const startEngine = () => {
    drumSynth.ensureUnlocked();
    const intervalMs = (60 / bpm) * 1000;
    let s = 0;

    drumSynth.playMetronomeClick(s === 0);
    setCurrentStep(s);

    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
    }

    timerRef.current = window.setInterval(() => {
      s = (s + 1) % steps;
      setCurrentStep(s);
      drumSynth.playMetronomeClick(s === 0);
    }, intervalMs);
  };

  const stopEngine = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setCurrentStep(0);
  };

  const restartEngine = () => {
    stopEngine();
    startEngine();
  };

  const toggleMetronome = () => {
    if (isPlaying) {
      stopEngine();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      startEngine();
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex flex-col gap-10">
      {/* Rack Metronome Interactive Bar */}
      <div className="w-full rounded-2xl bg-theme-surface-low border border-theme-border p-6 sm:p-8 lg:p-10 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Module Info & Display */}
        <div className="flex items-center gap-6 w-full lg:w-auto">
          <button
            onClick={toggleMetronome}
            className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white active:scale-95 transition-all shrink-0 ${
              isPlaying
                ? 'bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/30'
                : 'bg-gradient-to-br from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-lg shadow-orange-500/30'
            }`}
            aria-label={isPlaying ? 'Pause metronome' : 'Start metronome'}
          >
            <span className="material-symbols-outlined text-[36px]">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                STUDIO PRACTICE ENGINE
              </span>
              <span
                className={`w-2 h-2 rounded-full transition-colors ${
                  isPlaying ? 'bg-orange-500 shadow-sm shadow-orange-500 animate-pulse' : 'bg-theme-muted/40'
                }`}
              />
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-4xl sm:text-5xl font-black font-mono-numbers text-theme-on-surface">
                {bpm}
              </span>
              <span className="text-sm font-mono text-theme-on-variant font-semibold">BPM</span>
            </div>
          </div>
        </div>

        {/* Controls Matrix */}
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto flex-1 max-w-2xl justify-end">
          {/* Tempo Slider */}
          <div className="flex flex-col gap-1.5 w-full sm:w-64">
            <div className="flex justify-between text-[11px] font-mono text-theme-muted">
              <span>TEMPO ADJUST</span>
              <span className="font-semibold text-theme-on-surface">{bpm} BPM</span>
            </div>
            <input
              type="range"
              min="40"
              max="240"
              value={bpm}
              onChange={(e) => setBpm(parseInt(e.target.value))}
              className="w-full h-2 rounded-lg bg-theme-surface-highest appearance-none cursor-pointer accent-orange-500"
              aria-label="Adjust Tempo"
            />
          </div>

          {/* Time Signature Buttons */}
          <div className="flex flex-col gap-1.5 shrink-0">
            <span className="text-[11px] font-mono text-theme-muted uppercase">METER SIGNATURE</span>
            <div className="flex rounded-lg bg-theme-surface-high p-1 gap-1 border border-theme-border">
              {(['4/4', '6/8', '3/4'] as const).map((sig) => (
                <button
                  key={sig}
                  onClick={() => setTimeSig(sig)}
                  className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
                    timeSig === sig
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'text-theme-on-variant hover:text-theme-on-surface'
                  }`}
                >
                  {sig}
                </button>
              ))}
            </div>
          </div>

          {/* Step Clock Visualizer */}
          <div className="hidden md:flex flex-col gap-1.5 shrink-0">
            <span className="text-[11px] font-mono text-theme-muted uppercase">STEP CLOCK</span>
            <div className="flex items-center gap-1.5 p-2 bg-theme-surface-lowest rounded-lg border border-theme-border/60">
              {Array.from({ length: steps }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-7 rounded-sm transition-all duration-75 ${
                    isPlaying && currentStep === i
                      ? i === 0
                        ? 'bg-orange-500 shadow-sm shadow-orange-500 scale-105'
                        : 'bg-amber-400'
                      : 'bg-theme-surface-highest'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Quote & Philosophy Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-theme-surface-high via-theme-surface-low to-theme-surface-lowest border border-theme-border p-8 sm:p-12 overflow-hidden shadow-sm">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl flex flex-col gap-4">
          <span className="material-symbols-outlined text-orange-500 text-[48px] opacity-80 leading-none">
            format_quote
          </span>
          <blockquote className="text-xl sm:text-2xl lg:text-3xl text-theme-on-surface font-semibold tracking-tight leading-snug">
            “Rhythm is not just technique; it is how you speak without words.”
          </blockquote>
          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-0.5 bg-orange-500" />
            <span className="text-xs font-mono text-primary uppercase tracking-wider font-semibold">
              The DRUMVERSE Philosophy
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
