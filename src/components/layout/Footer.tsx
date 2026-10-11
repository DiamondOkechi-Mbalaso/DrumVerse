import React from 'react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="w-full bg-theme-surface-lowest border-t border-theme-border mt-20 transition-colors duration-200">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-14">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4 pr-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 text-left w-fit group"
              aria-label="DRUMVERSE Home"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md">
                <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <ellipse cx="12" cy="7" rx="9" ry="3.5" />
                  <path d="M3 7v10c0 1.93 4.03 3.5 9 3.5s9-1.57 9-3.5V7" />
                  <path d="M3 12c0 1.93 4.03 3.5 9 3.5s9-1.57 9-3.5" strokeDasharray="3 3" />
                </svg>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-theme-on-surface group-hover:text-primary transition-colors">
                DRUMVERSE
              </span>
            </button>
            <p className="text-sm text-theme-on-variant leading-relaxed max-w-sm">
              Empowering drummers worldwide through precision education, instrument curation, acoustics science, and community rhythm.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-orange-500 pt-1">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span>Web Audio Physical Modeling Engine Active</span>
            </div>
          </div>

          {/* Column 1: Explore */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
              Explore
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-theme-on-variant">
              <li>
                <button
                  onClick={() => navigate('/drum-kits/acoustic')}
                  className="hover:text-theme-on-surface hover:translate-x-0.5 transition-all text-left"
                >
                  Acoustic Kits
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/drum-kits/electronic')}
                  className="hover:text-theme-on-surface hover:translate-x-0.5 transition-all text-left"
                >
                  Electronic Kits
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/explore')}
                  className="hover:text-theme-on-surface hover:translate-x-0.5 transition-all text-left"
                >
                  Snare &amp; Cymbals
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/explore')}
                  className="hover:text-theme-on-surface hover:translate-x-0.5 transition-all text-left"
                >
                  World Percussion
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/drum-kits/acoustic')}
                  className="hover:text-theme-on-surface hover:translate-x-0.5 transition-all text-left"
                >
                  Anatomy Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Learn */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
              Learn
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-theme-on-variant">
              <li>
                <button
                  onClick={() => navigate('/learn')}
                  className="hover:text-theme-on-surface hover:translate-x-0.5 transition-all text-left"
                >
                  Beginner Roadmap
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/learn')}
                  className="hover:text-theme-on-surface hover:translate-x-0.5 transition-all text-left"
                >
                  Rhythm &amp; Timing
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/learn')}
                  className="hover:text-theme-on-surface hover:translate-x-0.5 transition-all text-left"
                >
                  Limb Independence
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/learn')}
                  className="hover:text-theme-on-surface hover:translate-x-0.5 transition-all text-left"
                >
                  Drum Notation
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/learn')}
                  className="hover:text-theme-on-surface hover:translate-x-0.5 transition-all text-left"
                >
                  Teacher Directory
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Gear & Guides */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
              Equipment
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-theme-on-variant">
              <li>
                <button
                  onClick={() => navigate('/drum-kits')}
                  className="hover:text-theme-on-surface hover:translate-x-0.5 transition-all text-left"
                >
                  Acoustic vs Electronic
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/buy')}
                  className="hover:text-theme-on-surface hover:translate-x-0.5 transition-all text-left"
                >
                  Buying Checklist
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/buy')}
                  className="hover:text-theme-on-surface hover:translate-x-0.5 transition-all text-left"
                >
                  Verified Retailers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/drum-kits/acoustic')}
                  className="hover:text-theme-on-surface hover:translate-x-0.5 transition-all text-left"
                >
                  Tuning &amp; Upkeep
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: About & Science */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
              About
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-theme-on-variant">
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-theme-on-surface hover:translate-x-0.5 transition-all text-left"
                >
                  Our Mission
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-theme-on-surface hover:translate-x-0.5 transition-all text-left"
                >
                  Hearing Protection
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-theme-on-surface hover:translate-x-0.5 transition-all text-left"
                >
                  Sound Acoustics
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-theme-on-surface hover:translate-x-0.5 transition-all text-left"
                >
                  FAQ &amp; Contact
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Copyright */}
        <div className="pt-8 border-t border-theme-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-theme-muted">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} DRUMVERSE. All rights reserved.</span>
            <span aria-hidden="true">·</span>
            <span>Find Your Rhythm.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono">Precision Percussion Education</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
