import React, { useState } from 'react';
import { instrumentsData } from '../data/instrumentsData';
import { Instrument, InstrumentCategory } from '../types';
import { drumSynth } from '../audio/drumSynth';

interface ExploreDrumsPageProps {
  navigate: (path: string) => void;
}

export const ExploreDrumsPage: React.FC<ExploreDrumsPageProps> = ({ navigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<InstrumentCategory>('all');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [activeModalInstrument, setActiveModalInstrument] = useState<Instrument | null>(null);

  // Extract all musical styles for the genre filter
  const allStyles = Array.from(
    new Set(instrumentsData.flatMap((inst) => inst.musicalStyles))
  ).sort();

  // Filter instruments
  const filteredInstruments = instrumentsData.filter((inst) => {
    // Search match
    const matchesSearch =
      inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inst.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inst.typicalSound.toLowerCase().includes(searchTerm.toLowerCase());

    // Category match
    const matchesCategory =
      selectedCategory === 'all' || inst.category === selectedCategory;

    // Style match
    const matchesStyle =
      selectedStyle === 'all' || inst.musicalStyles.includes(selectedStyle);

    return matchesSearch && matchesCategory && matchesStyle;
  });

  const categories: { id: InstrumentCategory; label: string }[] = [
    { id: 'all', label: 'All Instruments' },
    { id: 'drum-kits', label: 'Full Drum Kits' },
    { id: 'snare-drums', label: 'Snare Drums' },
    { id: 'bass-drums', label: 'Bass Drums' },
    { id: 'toms', label: 'Toms' },
    { id: 'cymbals', label: 'Cymbals' },
    { id: 'world-percussion', label: 'World & Hand Drums' },
    { id: 'orchestral', label: 'Orchestral Percussion' },
  ];

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedStyle('all');
  };

  const handlePlaySound = (e: React.MouseEvent, soundType: string) => {
    e.stopPropagation();
    drumSynth.ensureUnlocked();
    drumSynth.playInstrumentSound(soundType);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex flex-col gap-10">
      {/* Header Banner */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-semibold">
          <span>CATALOGUE &amp; ENCYCLOPEDIA</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-theme-on-surface">
          Explore the Drumverse
        </h1>
        <p className="text-base text-theme-on-variant max-w-2xl leading-relaxed">
          From acoustic multi-ply maple shells and brass snares to velocity-sensitive electronic mesh pads and Afro-Peruvian cajóns—listen, compare, and study every percussion instrument.
        </p>
      </div>

      {/* Search & Filter Controls Matrix */}
      <div className="flex flex-col gap-5 p-6 rounded-2xl bg-theme-surface-low border border-theme-border shadow-sm">
        {/* Search Input Bar */}
        <div className="relative w-full">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-theme-muted text-[22px]">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by instrument name, timber, or sonic character..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-theme-surface border border-theme-border text-theme-on-surface placeholder:text-theme-muted focus:outline-none focus:border-orange-500 text-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-theme-muted hover:text-theme-on-surface"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills & Genre Dropdown */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-orange-500 text-white font-semibold shadow-sm'
                    : 'bg-theme-surface border border-theme-border text-theme-on-variant hover:text-theme-on-surface hover:bg-theme-surface-high'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Style Filter & Clear Button */}
          <div className="flex items-center gap-3 shrink-0">
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-theme-surface border border-theme-border text-xs font-medium text-theme-on-surface focus:outline-none focus:border-orange-500"
              aria-label="Filter by Musical Style"
            >
              <option value="all">All Musical Styles</option>
              {allStyles.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>

            {(searchTerm || selectedCategory !== 'all' || selectedStyle !== 'all') && (
              <button
                onClick={handleClearFilters}
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold text-orange-500 hover:bg-orange-500/10 transition-colors"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Count Bar */}
      <div className="flex items-center justify-between text-xs font-mono text-theme-muted">
        <span>SHOWING {filteredInstruments.length} OF {instrumentsData.length} INSTRUMENTS</span>
        {selectedCategory !== 'all' && (
          <span className="uppercase text-primary font-semibold">Category: {selectedCategory}</span>
        )}
      </div>

      {/* Instruments Grid */}
      {filteredInstruments.length === 0 ? (
        <div className="py-20 rounded-2xl bg-theme-surface-low border border-theme-border flex flex-col items-center justify-center text-center gap-3">
          <span className="material-symbols-outlined text-[48px] text-theme-muted">music_off</span>
          <h3 className="text-lg font-bold text-theme-on-surface">No Instruments Match Your Filter</h3>
          <p className="text-xs text-theme-muted max-w-sm">
            Try adjusting your search query, selecting "All Instruments", or clearing the musical style filter.
          </p>
          <button
            onClick={handleClearFilters}
            className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-xl text-xs font-bold font-mono uppercase shadow-sm"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstruments.map((inst) => (
            <div
              key={inst.id}
              onClick={() => setActiveModalInstrument(inst)}
              className="group rounded-2xl bg-theme-surface-low border border-theme-border p-5 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-orange-500/40 transition-all cursor-pointer"
            >
              <div className="flex flex-col gap-4">
                {/* Image Showcase */}
                <div className="relative w-full h-52 rounded-xl overflow-hidden bg-theme-surface-lowest border border-theme-border">
                  {inst.imageUrl ? (
                    <img
                      src={inst.imageUrl}
                      alt={inst.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-theme-surface-high/50 text-theme-muted gap-2">
                      <span className="material-symbols-outlined text-[40px]">graphic_eq</span>
                      <span className="text-[11px] font-mono">DRUM ACOUSTICS</span>
                    </div>
                  )}

                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[10px] font-mono uppercase font-semibold">
                    {inst.categoryLabel}
                  </span>

                  {/* Quick Sound Play Button on Image */}
                  <button
                    onClick={(e) => handlePlaySound(e, inst.soundType)}
                    className="absolute bottom-2.5 right-2.5 w-9 h-9 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg flex items-center justify-center transition-transform active:scale-90"
                    title={`Hear ${inst.name} tone`}
                    aria-label={`Hear ${inst.name} tone`}
                  >
                    <span className="material-symbols-outlined text-[18px]">volume_up</span>
                  </button>
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="text-xl font-bold text-theme-on-surface group-hover:text-primary transition-colors">
                    {inst.name}
                  </h3>
                  <p className="text-xs font-mono text-primary font-medium">
                    {inst.tagline}
                  </p>
                  <p className="text-xs text-theme-on-variant line-clamp-3 leading-relaxed mt-1">
                    {inst.description}
                  </p>
                </div>

                {/* Common Musical Styles Tags */}
                <div className="flex flex-wrap gap-1 mt-1">
                  {inst.musicalStyles.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-theme-surface border border-theme-border text-theme-muted"
                    >
                      {s}
                    </span>
                  ))}
                  {inst.musicalStyles.length > 4 && (
                    <span className="text-[10px] font-mono text-theme-muted self-center">
                      +{inst.musicalStyles.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-theme-border/60 flex items-center justify-between text-xs">
                <span className="font-semibold text-orange-500 group-hover:underline">
                  View Full Anatomy &amp; Specs →
                </span>
                <span className="text-theme-muted font-mono text-[11px]">Click to open</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detailed Modal Drawer for Selected Instrument */}
      {activeModalInstrument && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setActiveModalInstrument(null)}
        >
          <div
            className="w-full max-w-2xl bg-theme-surface border border-theme-border rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col gap-6 animate-in zoom-in-95 duration-150 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-theme-border pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
                  {activeModalInstrument.categoryLabel}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-on-surface mt-1">
                  {activeModalInstrument.name}
                </h2>
                <p className="text-xs sm:text-sm font-mono text-theme-muted mt-0.5">
                  {activeModalInstrument.tagline}
                </p>
              </div>
              <button
                onClick={() => setActiveModalInstrument(null)}
                className="p-1.5 rounded-lg text-theme-muted hover:text-theme-on-surface hover:bg-theme-surface-high transition-colors"
                aria-label="Close modal"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Description & Audio Trigger */}
            <div className="flex flex-col gap-4">
              <p className="text-sm text-theme-on-variant leading-relaxed">
                {activeModalInstrument.description}
              </p>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <button
                  onClick={() => {
                    drumSynth.ensureUnlocked();
                    drumSynth.playInstrumentSound(activeModalInstrument.soundType);
                  }}
                  className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-mono font-bold uppercase flex items-center gap-1.5 shadow-sm active:scale-95 transition-all shrink-0"
                >
                  <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                  <span>Play Tone</span>
                </button>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-theme-on-surface">Sonic Character</span>
                  <span className="text-xs text-theme-on-variant line-clamp-1">
                    {activeModalInstrument.typicalSound}
                  </span>
                </div>
              </div>
            </div>

            {/* Structured Specifications Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col gap-1 p-3 rounded-xl bg-theme-surface-low border border-theme-border">
                <span className="font-mono text-theme-muted uppercase text-[10px]">Materials &amp; Metallurgy</span>
                <span className="font-medium text-theme-on-surface">{activeModalInstrument.materials}</span>
              </div>
              <div className="flex flex-col gap-1 p-3 rounded-xl bg-theme-surface-low border border-theme-border">
                <span className="font-mono text-theme-muted uppercase text-[10px]">Tuning Spectrum</span>
                <span className="font-medium text-theme-on-surface">{activeModalInstrument.tuningRange}</span>
              </div>
            </div>

            {/* Key Architectural Features */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-theme-muted">
                Key Features &amp; Engineering
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeModalInstrument.keyFeatures.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-theme-on-variant">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-theme-border flex items-center justify-between">
              {activeModalInstrument.category === 'drum-kits' ? (
                <button
                  onClick={() => {
                    setActiveModalInstrument(null);
                    navigate('/drum-kits');
                  }}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold uppercase transition-colors"
                >
                  View Drum Kits Hub →
                </button>
              ) : (
                <button
                  onClick={() => {
                    setActiveModalInstrument(null);
                    navigate('/drum-kits/acoustic');
                  }}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold uppercase transition-colors"
                >
                  Explore Acoustic Anatomy Guide →
                </button>
              )}
              <button
                onClick={() => setActiveModalInstrument(null)}
                className="px-4 py-2 text-xs font-medium text-theme-muted hover:text-theme-on-surface"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
