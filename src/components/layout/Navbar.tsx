import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeMode } from '../../types';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
  onOpenSearch: () => void;
  onOpenMetronome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  navigate,
  onOpenSearch,
  onOpenMetronome,
}) => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [drumKitsDropdownOpen, setDrumKitsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDrumKitsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setDrumKitsDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setDrumKitsDropdownOpen(false);
  };

  const isLinkActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath === path || currentPath.startsWith(path + '/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore Drums', path: '/explore' },
    {
      name: 'Drum Kits',
      path: '/drum-kits',
      hasDropdown: true,
      children: [
        { name: 'All Kits & Comparison', path: '/drum-kits' },
        { name: 'Acoustic Kits', path: '/drum-kits/acoustic' },
        { name: 'Electronic Kits', path: '/drum-kits/electronic' },
      ],
    },
    { name: 'Learn to Play', path: '/learn' },
    { name: 'Where to Buy', path: '/buy' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-theme-surface/90 backdrop-blur-md border-b border-theme-border shadow-md transition-colors duration-200">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo Lockup */}
        <div className="flex items-center gap-6 shrink-0">
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1"
            aria-label="DRUMVERSE Home"
          >
            {/* Drum Emblem Graphic */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <ellipse cx="12" cy="7" rx="9" ry="3.5" />
                <path d="M3 7v10c0 1.93 4.03 3.5 9 3.5s9-1.57 9-3.5V7" />
                <path d="M3 12c0 1.93 4.03 3.5 9 3.5s9-1.57 9-3.5" strokeDasharray="3 3" />
                <line x1="7" y1="9" x2="17" y2="15" strokeLinecap="round" />
                <line x1="17" y1="9" x2="7" y2="15" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-theme-on-surface group-hover:text-primary transition-colors">
                DRUMVERSE
              </span>
              <span className="text-[10px] font-mono tracking-widest text-primary font-semibold uppercase">
                FIND YOUR RHYTHM
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            if (link.hasDropdown) {
              const active = isLinkActive(link.path);
              return (
                <div key={link.path} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDrumKitsDropdownOpen(!drumKitsDropdownOpen)}
                    onMouseEnter={() => setDrumKitsDropdownOpen(true)}
                    className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      active
                        ? 'text-primary font-semibold bg-orange-500/10'
                        : 'text-theme-on-variant hover:text-theme-on-surface hover:bg-theme-surface-high/50'
                    }`}
                    aria-expanded={drumKitsDropdownOpen}
                  >
                    <span>{link.name}</span>
                    <span className={`material-symbols-outlined text-[16px] transition-transform ${drumKitsDropdownOpen ? 'rotate-180' : ''}`}>
                      expand_more
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {drumKitsDropdownOpen && (
                    <div
                      onMouseLeave={() => setDrumKitsDropdownOpen(false)}
                      className="absolute left-0 top-full pt-1.5 w-56 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                    >
                      <div className="rounded-xl bg-theme-surface border border-theme-border p-1.5 shadow-xl backdrop-blur-xl">
                        {link.children?.map((child) => (
                          <button
                            key={child.path}
                            onClick={() => handleNavClick(child.path)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                              currentPath === child.path
                                ? 'bg-orange-500/15 text-primary font-medium'
                                : 'text-theme-on-variant hover:bg-theme-surface-high hover:text-theme-on-surface'
                            }`}
                          >
                            {child.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            const active = isLinkActive(link.path);
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                  active
                    ? 'text-primary font-semibold bg-orange-500/10'
                    : 'text-theme-on-variant hover:text-theme-on-surface hover:bg-theme-surface-high/50'
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Right Zone Controls: Theme Selector, Metronome, Search, CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-theme-on-variant hover:text-theme-on-surface hover:bg-theme-surface-high rounded-lg transition-colors"
            title="Search instruments, guides, and lessons (Press /)"
            aria-label="Open search dialog"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          {/* Studio Metronome Launcher */}
          <button
            onClick={onOpenMetronome}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-theme-surface-low border border-theme-border hover:border-primary/50 text-theme-on-surface transition-colors"
            title="Open Studio Metronome"
          >
            <span className="material-symbols-outlined text-orange-500 text-[18px]">timer</span>
            <span className="text-xs font-mono font-medium">120 BPM</span>
          </button>

          {/* Theme Selector (Light, Dark, System) */}
          <div className="hidden md:flex items-center bg-theme-surface-low border border-theme-border rounded-full p-0.5">
            <button
              onClick={() => setTheme('light')}
              className={`p-1.5 rounded-full transition-colors ${
                theme === 'light'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-theme-on-variant hover:text-theme-on-surface'
              }`}
              title="Light theme"
              aria-label="Light theme"
            >
              <span className="material-symbols-outlined text-[16px]">light_mode</span>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`p-1.5 rounded-full transition-colors ${
                theme === 'dark'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-theme-on-variant hover:text-theme-on-surface'
              }`}
              title="Dark theme"
              aria-label="Dark theme"
            >
              <span className="material-symbols-outlined text-[16px]">dark_mode</span>
            </button>
            <button
              onClick={() => setTheme('system')}
              className={`p-1.5 rounded-full transition-colors ${
                theme === 'system'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-theme-on-variant hover:text-theme-on-surface'
              }`}
              title="System theme"
              aria-label="System theme"
            >
              <span className="material-symbols-outlined text-[16px]">desktop_windows</span>
            </button>
          </div>

          {/* Primary CTA */}
          <button
            onClick={() => handleNavClick('/learn')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-sm font-semibold rounded-lg shadow-sm shadow-orange-500/20 active:scale-95 transition-all whitespace-nowrap"
          >
            Start Learning
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-theme-on-surface hover:bg-theme-surface-high rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          ref={mobileNavRef}
          className="fixed inset-0 top-20 z-40 bg-theme-bg/95 backdrop-blur-xl lg:hidden flex flex-col p-6 overflow-y-auto animate-in fade-in duration-200"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div key={link.path} className="flex flex-col gap-1 py-1">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-theme-muted px-3">
                      {link.name}
                    </span>
                    {link.children?.map((child) => (
                      <button
                        key={child.path}
                        onClick={() => handleNavClick(child.path)}
                        className={`text-left px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                          currentPath === child.path
                            ? 'bg-orange-500/15 text-primary'
                            : 'text-theme-on-surface hover:bg-theme-surface-high'
                        }`}
                      >
                        {child.name}
                      </button>
                    ))}
                  </div>
                );
              }

              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-left px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isLinkActive(link.path)
                      ? 'bg-orange-500/15 text-primary'
                      : 'text-theme-on-surface hover:bg-theme-surface-high'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-theme-border flex flex-col gap-4">
            {/* Metronome quick tool */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMetronome();
              }}
              className="flex items-center justify-between p-3 rounded-xl bg-theme-surface-low border border-theme-border text-theme-on-surface"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-500">timer</span>
                <span className="font-medium text-sm">Studio Metronome</span>
              </div>
              <span className="text-xs font-mono text-primary font-semibold">120 BPM</span>
            </button>

            {/* Mobile Theme Selector */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-theme-muted">
                Theme Appearance
              </span>
              <div className="grid grid-cols-3 gap-2 bg-theme-surface-low p-1 rounded-xl border border-theme-border">
                {(['light', 'dark', 'system'] as ThemeMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setTheme(m)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium capitalize flex items-center justify-center gap-1.5 transition-colors ${
                      theme === m
                        ? 'bg-orange-500 text-white font-semibold shadow-sm'
                        : 'text-theme-on-variant hover:text-theme-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {m === 'light' ? 'light_mode' : m === 'dark' ? 'dark_mode' : 'desktop_windows'}
                    </span>
                    <span>{m}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleNavClick('/learn')}
              className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold rounded-xl text-center shadow-lg shadow-orange-500/20 active:scale-95 transition-all mt-2"
            >
              Start Learning Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
