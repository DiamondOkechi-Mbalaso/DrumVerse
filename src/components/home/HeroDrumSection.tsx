import React, { useState, useEffect, useRef } from 'react';
import { drumHeroController, PlaybackState } from '../../audio/drumHeroController';
import { drumSynth } from '../../audio/drumSynth';

interface HeroDrumSectionProps {
  navigate: (path: string) => void;
}

export const HeroDrumSection: React.FC<HeroDrumSectionProps> = ({ navigate }) => {
  const [playbackState, setPlaybackState] = useState<PlaybackState>('playing');
  const [isMuted, setIsMuted] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [activePad, setActivePad] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Subscribe to drumHeroController
  useEffect(() => {
    // Autoplay muted on mount
    drumHeroController.play();

    const unsubscribe = drumHeroController.subscribe((state, step, muted) => {
      setPlaybackState(state);
      setCurrentStep(step);
      setIsMuted(muted);
    });

    return () => {
      unsubscribe();
      drumHeroController.pause();
    };
  }, []);

  // Keyboard shortcut listener for live drum play-along
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key.toLowerCase()) {
        case 'k':
          handlePlayPad('kick');
          break;
        case 's':
          handlePlayPad('snare');
          break;
        case 'h':
          handlePlayPad('hihat');
          break;
        case 'c':
          handlePlayPad('crash');
          break;
        case 't':
          handlePlayPad('tom');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePlayPad = (pad: string) => {
    drumSynth.ensureUnlocked();
    drumSynth.playInstrumentSound(pad);
    setActivePad(pad);
    setTimeout(() => setActivePad(null), 150);
  };

  const handleToggleSound = () => {
    if (isMuted) {
      drumHeroController.enableAudioAndPlay();
    } else {
      drumHeroController.toggleMute();
    }
  };

  const handleTogglePlay = () => {
    if (playbackState === 'playing') {
      drumHeroController.pause();
      if (videoRef.current) videoRef.current.pause();
    } else {
      drumHeroController.play();
      if (videoRef.current) videoRef.current.play().catch(() => {});
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    drumHeroController.setVolume(val);
    if (isMuted && val > 0) {
      drumHeroController.toggleMute();
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-theme-surface-lowest transition-colors duration-200">
      {/* Background Drum Performance Video & Image Scrim */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Cinematic Backdrop Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out transform scale-105"
          style={{
            backgroundImage: "url('/src/assets/images/hero_drummer_performance_1791734411810.jpg')",
            opacity: 0.28,
            filter: 'contrast(1.1) brightness(0.9)',
          }}
        />

        {/* Ambient Volumetric Lighting Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-orange-500/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-amber-600/15 rounded-full blur-[120px]" />

        {/* Darkening Gradients for AA Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-theme-bg/75 to-theme-surface-lowest/90" />
      </div>

      {/* Hero Content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pb-24 flex flex-col items-center text-center">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-theme-surface-low/90 border border-theme-border shadow-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-sm shadow-orange-500" />
          <span className="text-xs font-mono tracking-widest text-primary font-semibold uppercase">
            YOUR JOURNEY STARTS HERE
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-theme-on-surface max-w-5xl leading-tight">
          Feel the Beat.{' '}
          <br className="hidden sm:inline" />
          Find Your{' '}
          <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
            Rhythm.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-theme-on-variant max-w-2xl mt-4 mb-8 leading-relaxed">
          Discover the world of drums, explore your perfect kit, and learn the skills to turn every beat into something extraordinary.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
          <button
            onClick={() => navigate('/explore')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-base shadow-lg shadow-orange-500/25 active:scale-95 transition-all"
          >
            <span>Explore the Drums</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
          <button
            onClick={() => navigate('/learn')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-theme-surface-high hover:bg-theme-surface-highest text-theme-on-surface font-semibold text-base border border-theme-border shadow-sm active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[20px] text-orange-500">play_circle</span>
            <span>Start Learning</span>
          </button>
        </div>

        {/* Tactile Media Controller Widget (Section 5) */}
        <div className="w-full max-w-lg rounded-2xl bg-theme-surface-low/95 border border-theme-border p-3.5 shadow-xl backdrop-blur-xl flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            {/* Visualizer & Waveform Bars */}
            <div className="flex items-center gap-1.5 pl-2 h-8" aria-hidden="true">
              {[12, 24, 32, 18, 28, 14, 36, 22].map((height, i) => {
                const isActive = playbackState === 'playing' && (currentStep % 8 === i || !isMuted);
                return (
                  <div
                    key={i}
                    style={{ height: `${isActive ? height : 8}px` }}
                    className={`w-1 rounded-full transition-all duration-75 ${
                      isMuted
                        ? 'bg-theme-muted/40'
                        : i % 2 === 0
                        ? 'bg-orange-500'
                        : 'bg-amber-400'
                    }`}
                  />
                );
              })}
            </div>

            {/* Performance status */}
            <div className="flex flex-col text-left min-w-0 flex-1">
              <span className="text-xs font-semibold text-theme-on-surface truncate">
                Synchronized Studio Drum Beat (120 BPM)
              </span>
              <span className="text-[11px] font-mono text-theme-muted truncate">
                {isMuted ? 'Muted by default · Click to unmute' : 'Audio engine actively playing in sync'}
              </span>
            </div>

            {/* Audio Toggle Button */}
            <button
              onClick={handleToggleSound}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold uppercase transition-all shadow-sm ${
                isMuted
                  ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-orange-500/20'
                  : 'bg-theme-surface-high text-orange-500 hover:bg-theme-surface-highest border border-theme-border'
              }`}
              aria-label={isMuted ? 'Enable Sound' : 'Mute Sound'}
            >
              <span className="material-symbols-outlined text-[16px]">
                {isMuted ? 'volume_off' : 'volume_up'}
              </span>
              <span>{isMuted ? 'Enable Sound' : 'Sound: Active'}</span>
            </button>
          </div>

          {/* Expanded Secondary Controls: Play/Pause, Volume, 16-Step Beat Tracker */}
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-theme-border/60 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={handleTogglePlay}
                className="p-1 rounded text-theme-on-variant hover:text-theme-on-surface hover:bg-theme-surface-high transition-colors"
                title={playbackState === 'playing' ? 'Pause groove' : 'Play groove'}
                aria-label={playbackState === 'playing' ? 'Pause groove' : 'Play groove'}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {playbackState === 'playing' ? 'pause' : 'play_arrow'}
                </span>
              </button>

              {/* Volume Slider */}
              <div className="flex items-center gap-1.5" title="Volume">
                <span className="material-symbols-outlined text-[14px] text-theme-muted">
                  {volume === 0 ? 'volume_mute' : volume < 0.5 ? 'volume_down' : 'volume_up'}
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 rounded bg-theme-surface-highest appearance-none accent-orange-500 cursor-pointer"
                  aria-label="Volume slider"
                />
              </div>
            </div>

            {/* 16-Step Beat Dots */}
            <div className="flex items-center gap-1" title="16-Step Step Clock">
              {Array.from({ length: 16 }).map((_, step) => (
                <div
                  key={step}
                  className={`w-1.5 h-3 rounded-full transition-colors ${
                    currentStep === step
                      ? 'bg-orange-500 scale-110 shadow-sm shadow-orange-500'
                      : step % 4 === 0
                      ? 'bg-theme-muted/50'
                      : 'bg-theme-surface-highest'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Live Drum Pads Play-Along Widget (Interactive Experience) */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <span className="text-[11px] font-mono tracking-widest uppercase text-theme-muted">
            Interactive Pad Station · Click or Press [K, S, H, T, C]
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'kick', label: 'Kick', key: 'K' },
              { id: 'snare', label: 'Snare', key: 'S' },
              { id: 'hihat', label: 'Hi-Hat', key: 'H' },
              { id: 'tom', label: 'Tom', key: 'T' },
              { id: 'crash', label: 'Crash', key: 'C' },
            ].map((pad) => (
              <button
                key={pad.id}
                onClick={() => handlePlayPad(pad.id)}
                className={`px-3 py-2 rounded-xl text-xs font-mono font-semibold border transition-all active:scale-95 ${
                  activePad === pad.id
                    ? 'bg-orange-500 text-white border-orange-400 scale-105 shadow-md shadow-orange-500/40'
                    : 'bg-theme-surface-low border-theme-border text-theme-on-surface hover:border-orange-500/50 hover:bg-theme-surface-high'
                }`}
              >
                <span>{pad.label}</span>
                <span className="ml-1.5 text-[10px] text-orange-500 font-bold opacity-80">[{pad.key}]</span>
              </button>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#editorial"
          className="inline-flex flex-col items-center gap-1 text-theme-muted hover:text-primary transition-colors mt-12 group"
          aria-label="Scroll to content"
        >
          <span className="text-[10px] font-mono uppercase tracking-wider">Scroll to explore</span>
          <span className="material-symbols-outlined text-[20px] text-orange-500 animate-bounce group-hover:translate-y-1 transition-transform">
            keyboard_arrow_down
          </span>
        </a>
      </div>
    </section>
  );
};
