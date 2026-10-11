import React, { useState, useEffect, useRef } from 'react';
import { drumSynth } from '../../audio/drumSynth';

interface MetronomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MetronomeModal: React.FC<MetronomeModalProps> = ({ isOpen, onClose }) => {
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeSig, setTimeSig] = useState<'4/4' | '3/4' | '6/8' | '2/4'>('4/4');
  const [currentBeat, setCurrentBeat] = useState(0);
  const [accentDownbeat, setAccentDownbeat] = useState(true);

  const tapTimesRef = useRef<number[]>([]);
  const intervalRef = useRef<number | null>(null);

  const getBeatsPerBar = () => {
    switch (timeSig) {
      case '4/4': return 4;
      case '3/4': return 3;
      case '6/8': return 6;
      case '2/4': return 2;
    }
  };

  const beatsPerBar = getBeatsPerBar();

  // Clean up timer on unmount or close
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Update metronome timing when bpm or timeSig changes
  useEffect(() => {
    if (isPlaying) {
      restartEngine();
    }
  }, [bpm, timeSig, accentDownbeat]);

  const startEngine = () => {
    drumSynth.ensureUnlocked();
    const intervalMs = (60 / bpm) * 1000;
    let beat = 0;

    // Trigger immediate click
    drumSynth.playMetronomeClick(accentDownbeat && beat === 0);
    setCurrentBeat(beat);

    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      beat = (beat + 1) % beatsPerBar;
      setCurrentBeat(beat);
      drumSynth.playMetronomeClick(accentDownbeat && beat === 0);
    }, intervalMs);
  };

  const stopEngine = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentBeat(0);
  };

  const restartEngine = () => {
    stopEngine();
    startEngine();
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopEngine();
      setIsPlaying(false);
    } else {
      drumSynth.ensureUnlocked();
      setIsPlaying(true);
      startEngine();
    }
  };

  // Tap Tempo Handler
  const handleTapTempo = () => {
    const now = Date.now();
    const taps = tapTimesRef.current.filter((t) => now - t < 3000);
    taps.push(now);
    tapTimesRef.current = taps;

    if (taps.length >= 2) {
      const intervals: number[] = [];
      for (let i = 1; i < taps.length; i++) {
        intervals.push(taps[i] - taps[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgInterval);
      const clamped = Math.max(40, Math.min(240, calculatedBpm));
      setBpm(clamped);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-theme-surface border border-theme-border rounded-2xl p-6 shadow-2xl flex flex-col gap-6 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-500 text-[24px]">timer</span>
            <h2 className="text-lg font-bold text-theme-on-surface">Studio Metronome</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-theme-muted hover:text-theme-on-surface hover:bg-theme-surface-high rounded-lg transition-colors"
            aria-label="Close metronome"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Big BPM Display */}
        <div className="flex flex-col items-center justify-center py-4 bg-theme-surface-low rounded-xl border border-theme-border/60">
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-black font-mono-numbers text-theme-on-surface tracking-tight">
              {bpm}
            </span>
            <span className="text-sm font-mono text-orange-500 font-bold uppercase">BPM</span>
          </div>

          {/* Beat Indicator Dots */}
          <div className="flex items-center gap-3 mt-4">
            {Array.from({ length: beatsPerBar }).map((_, i) => {
              const isActive = isPlaying && currentBeat === i;
              const isDownbeat = i === 0;
              return (
                <div
                  key={i}
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-75 ${
                    isActive
                      ? isDownbeat
                        ? 'bg-orange-500 scale-125 shadow-lg shadow-orange-500/50'
                        : 'bg-amber-400 scale-110'
                      : 'bg-theme-surface-highest'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Tempo Adjust Slider */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs font-mono text-theme-muted">
            <span>40 SLOW</span>
            <span>TEMPO CONTROL</span>
            <span>240 FAST</span>
          </div>
          <input
            type="range"
            min="40"
            max="240"
            value={bpm}
            onChange={(e) => setBpm(parseInt(e.target.value))}
            className="w-full h-2 rounded-lg bg-theme-surface-highest appearance-none cursor-pointer accent-orange-500"
          />
          <div className="flex justify-center gap-2 mt-1">
            {[-5, -1, 1, 5].map((delta) => (
              <button
                key={delta}
                onClick={() => setBpm((prev) => Math.max(40, Math.min(240, prev + delta)))}
                className="px-2.5 py-1 text-xs font-mono rounded bg-theme-surface-high hover:bg-theme-surface-highest text-theme-on-surface transition-colors"
              >
                {delta > 0 ? `+${delta}` : delta}
              </button>
            ))}
          </div>
        </div>

        {/* Meter & Downbeat Accent Toggles */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono text-theme-muted uppercase">Time Signature</label>
            <div className="grid grid-cols-2 gap-1 bg-theme-surface-low p-1 rounded-lg border border-theme-border">
              {(['4/4', '3/4', '6/8', '2/4'] as const).map((sig) => (
                <button
                  key={sig}
                  onClick={() => setTimeSig(sig)}
                  className={`py-1 text-xs font-mono font-medium rounded transition-colors ${
                    timeSig === sig
                      ? 'bg-orange-500 text-white font-bold'
                      : 'text-theme-on-variant hover:text-theme-on-surface'
                  }`}
                >
                  {sig}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5 justify-between">
            <label className="text-xs font-mono text-theme-muted uppercase">Accent Downbeat</label>
            <button
              onClick={() => setAccentDownbeat(!accentDownbeat)}
              className={`p-2 rounded-lg text-xs font-medium border flex items-center justify-center gap-2 transition-colors ${
                accentDownbeat
                  ? 'bg-orange-500/10 border-orange-500/30 text-orange-500 font-semibold'
                  : 'bg-theme-surface-low border-theme-border text-theme-muted'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {accentDownbeat ? 'check_circle' : 'radio_button_unchecked'}
              </span>
              <span>{accentDownbeat ? 'Accent On (Beat 1)' : 'Even Clicks'}</span>
            </button>
          </div>
        </div>

        {/* Action Controls: Tap Tempo & Start/Stop */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleTapTempo}
            className="flex-1 py-3 px-4 rounded-xl bg-theme-surface-high hover:bg-theme-surface-highest text-theme-on-surface text-sm font-semibold active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">touch_app</span>
            <span>Tap Tempo</span>
          </button>

          <button
            onClick={togglePlay}
            className={`flex-1 py-3 px-4 rounded-xl text-white font-bold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 ${
              isPlaying
                ? 'bg-red-600 hover:bg-red-700 shadow-red-600/30'
                : 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-orange-500/30'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
            <span>{isPlaying ? 'Stop' : 'Start Metronome'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
