import React, { useState, useEffect, useRef } from 'react';
import { instrumentsData } from '../../data/instrumentsData';
import { learningPathsData } from '../../data/lessonsData';
import { retailersData } from '../../data/retailersData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  navigate: (path: string) => void;
}

interface SearchResultItem {
  id: string;
  title: string;
  category: 'Instrument' | 'Lesson' | 'Retailer' | 'Guide';
  snippet: string;
  path: string;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  navigate,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle keyboard shortcut Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Build searchable index
  const allSearchItems: SearchResultItem[] = [
    ...instrumentsData.map((inst) => ({
      id: inst.id,
      title: inst.name,
      category: 'Instrument' as const,
      snippet: `${inst.categoryLabel} · ${inst.typicalSound}`,
      path: '/explore',
    })),
    ...learningPathsData.flatMap((path) =>
      path.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        category: 'Lesson' as const,
        snippet: `${path.title} · ${lesson.difficulty} (${lesson.duration}) · ${lesson.description}`,
        path: '/learn',
      }))
    ),
    ...retailersData.map((ret) => ({
      id: ret.id,
      title: ret.name,
      category: 'Retailer' as const,
      snippet: `${ret.headquarters} · ${ret.specialties.join(', ')}`,
      path: '/buy',
    })),
    {
      id: 'guide-acoustic-anatomy',
      title: 'Acoustic Drum Kit Anatomy & Woods',
      category: 'Guide' as const,
      snippet: 'Interactive diagram of shells, heads, cymbals, bearing edges, and maple vs birch.',
      path: '/drum-kits/acoustic',
    },
    {
      id: 'guide-electronic-mesh',
      title: 'Electronic Drums & Module Recording',
      category: 'Guide' as const,
      snippet: 'Mesh heads, dual-zone triggers, USB-MIDI DAW connection, and silent apartment practice.',
      path: '/drum-kits/electronic',
    },
    {
      id: 'guide-comparison',
      title: 'Acoustic vs Electronic Kit Comparison',
      category: 'Guide' as const,
      snippet: 'Side-by-side volume, feel, footprint, and Help Me Choose quiz.',
      path: '/drum-kits',
    },
    {
      id: 'guide-hearing',
      title: 'Hearing Protection & Decibel Guide',
      category: 'Guide' as const,
      snippet: 'Musician earplugs, safe SPL thresholds, and acoustic frequency isolation.',
      path: '/about',
    },
  ];

  const filteredResults = query.trim()
    ? allSearchItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.snippet.toLowerCase().includes(query.toLowerCase())
      )
    : allSearchItems.slice(0, 7);

  const handleSelect = (item: SearchResultItem) => {
    navigate(item.path);
    onClose();
  };

  const handleKeyDownInInput = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredResults.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % Math.max(1, filteredResults.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelect(filteredResults[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 md:p-20 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-theme-surface border border-theme-border rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-theme-border">
          <span className="material-symbols-outlined text-theme-muted text-[22px]">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDownInInput}
            placeholder="Search instruments, lessons, kits, or retailers..."
            className="flex-1 bg-transparent text-theme-on-surface placeholder:text-theme-muted focus:outline-none text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs font-mono text-theme-muted hover:text-theme-on-surface px-2 py-1"
            >
              Clear
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-medium text-theme-muted bg-theme-surface-high rounded border border-theme-border">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-theme-border/40">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-theme-muted text-[36px]">search_off</span>
              <p className="text-sm font-medium text-theme-on-surface">No results found for "{query}"</p>
              <p className="text-xs text-theme-muted max-w-sm">
                Try searching for snare, hi-hat, electronic kits, beginner beats, or Thomann.
              </p>
            </div>
          ) : (
            filteredResults.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={`${item.category}-${item.id}`}
                  onClick={() => handleSelect(item)}
                  className={`w-full text-left p-3 rounded-xl flex items-center justify-between gap-3 transition-colors ${
                    isSelected ? 'bg-orange-500/15' : 'hover:bg-theme-surface-high'
                  }`}
                >
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-theme-on-surface truncate">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-primary px-1.5 py-0.5 rounded bg-orange-500/10 shrink-0">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-theme-on-variant line-clamp-1">
                      {item.snippet}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-[18px] text-theme-muted shrink-0">
                    arrow_forward
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-theme-surface-low border-t border-theme-border flex items-center justify-between text-xs text-theme-muted">
          <div className="flex items-center gap-2">
            <span>Navigate: ↑ ↓</span>
            <span aria-hidden="true">·</span>
            <span>Select: Enter</span>
          </div>
          <span className="font-mono text-[11px]">{filteredResults.length} Results</span>
        </div>
      </div>
    </div>
  );
};
