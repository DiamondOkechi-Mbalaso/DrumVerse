import React from 'react';
import { HeroDrumSection } from '../components/home/HeroDrumSection';
import { BentoGridSection } from '../components/home/BentoGridSection';
import { SpotlightShowdownSection } from '../components/home/SpotlightShowdownSection';
import { InteractiveMetronomeWidget } from '../components/home/InteractiveMetronomeWidget';
import { instrumentsData } from '../data/instrumentsData';
import { learningPathsData } from '../data/lessonsData';
import { drumSynth } from '../audio/drumSynth';

interface HomePageProps {
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  // Grab top 3 featured instruments
  const featuredInstruments = instrumentsData.slice(0, 3);
  const beginnerPath = learningPathsData[0];

  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Drum Performance Section */}
      <HeroDrumSection navigate={navigate} />

      {/* 2. Editorial Foundation (Discover, Compare, Learn Bento) */}
      <BentoGridSection navigate={navigate} />

      {/* 3. Dual Philosophies Spotlight Showdown */}
      <SpotlightShowdownSection navigate={navigate} />

      {/* 4. Studio Practice Engine Metronome */}
      <InteractiveMetronomeWidget />

      {/* 5. Featured Instruments Preview Row */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 flex flex-col gap-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-1">
              <span>02</span>
              <span aria-hidden="true">/</span>
              <span>CURATED GEAR</span>
            </div>
            <h2 className="text-3xl font-extrabold text-theme-on-surface">
              Featured Percussion
            </h2>
          </div>
          <button
            onClick={() => navigate('/explore')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-orange-600 transition-colors"
          >
            <span>View All Instruments</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredInstruments.map((inst) => (
            <div
              key={inst.id}
              className="group rounded-2xl bg-theme-surface-low border border-theme-border p-5 flex flex-col justify-between shadow-sm hover:shadow-lg hover:border-orange-500/40 transition-all"
            >
              <div className="flex flex-col gap-4">
                {/* Image / Thumbnail with fallback */}
                <div className="relative w-full h-48 rounded-xl overflow-hidden bg-theme-surface-lowest border border-theme-border/60">
                  {inst.imageUrl ? (
                    <img
                      src={inst.imageUrl}
                      alt={inst.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-theme-surface-high text-theme-muted">
                      <span className="material-symbols-outlined text-[48px]">graphic_eq</span>
                    </div>
                  )}
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-mono uppercase font-semibold">
                    {inst.categoryLabel}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-bold text-theme-on-surface group-hover:text-primary transition-colors">
                    {inst.name}
                  </h3>
                  <p className="text-xs text-theme-on-variant line-clamp-2 leading-relaxed">
                    {inst.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-theme-border/60 flex items-center justify-between">
                <button
                  onClick={() => {
                    drumSynth.ensureUnlocked();
                    drumSynth.playInstrumentSound(inst.soundType);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-mono font-bold text-orange-500 hover:text-orange-600 bg-orange-500/10 px-2.5 py-1 rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                  <span>Audio Preview</span>
                </button>
                <button
                  onClick={() => navigate('/explore')}
                  className="text-xs text-theme-muted hover:text-theme-on-surface font-semibold"
                >
                  Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Learning Roadmap Quick Callout */}
      <section className="w-full bg-theme-surface-lowest border-t border-theme-border py-16 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-2 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
              START FROM ZERO
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-theme-on-surface">
              {beginnerPath.title}
            </h3>
            <p className="text-sm text-theme-on-variant leading-relaxed">
              {beginnerPath.summary} Includes lessons on posture, counting, and playing your first authentic rock groove with instant rhythm sequencer feedback.
            </p>
          </div>
          <button
            onClick={() => navigate('/learn')}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm shadow-md shadow-orange-500/20 active:scale-95 transition-all shrink-0"
          >
            Start First Lesson Free
          </button>
        </div>
      </section>
    </div>
  );
};
