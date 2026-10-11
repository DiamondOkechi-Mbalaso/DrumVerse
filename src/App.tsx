import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { MetronomeModal } from './components/common/MetronomeModal';
import { HomePage } from './pages/HomePage';
import { ExploreDrumsPage } from './pages/ExploreDrumsPage';
import { DrumKitsPage } from './pages/DrumKitsPage';
import { AcousticKitsPage } from './pages/AcousticKitsPage';
import { ElectronicKitsPage } from './pages/ElectronicKitsPage';
import { LearnToPlayPage } from './pages/LearnToPlayPage';
import { WhereToBuyPage } from './pages/WhereToBuyPage';
import { AboutPage } from './pages/AboutPage';

export function AppContent() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      return pathname || '/';
    }
    return '/';
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMetronomeOpen, setIsMetronomeOpen] = useState(false);

  // Synchronize browser popstate (Back/Forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Global Keyboard shortcuts: '/' or Cmd+K / Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) &&
        !isSearchOpen
      ) {
        if (
          !(e.target instanceof HTMLInputElement) &&
          !(e.target instanceof HTMLTextAreaElement)
        ) {
          e.preventDefault();
          setIsSearchOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  // Route navigation helper
  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Render current page based on route
  const renderCurrentPage = () => {
    // Exact or prefix matching
    const cleanPath = currentPath.replace(/\/$/, '') || '/';

    switch (cleanPath) {
      case '/':
        return <HomePage navigate={navigate} />;
      case '/explore':
        return <ExploreDrumsPage navigate={navigate} />;
      case '/drum-kits':
        return <DrumKitsPage navigate={navigate} />;
      case '/drum-kits/acoustic':
        return <AcousticKitsPage navigate={navigate} />;
      case '/drum-kits/electronic':
        return <ElectronicKitsPage navigate={navigate} />;
      case '/learn':
        return <LearnToPlayPage navigate={navigate} />;
      case '/buy':
        return <WhereToBuyPage navigate={navigate} />;
      case '/about':
        return <AboutPage navigate={navigate} />;
      default:
        // Fallback for unknown sub-route
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-theme-bg text-theme-on-surface antialiased transition-colors duration-200">
      {/* Universal Top Navigation */}
      <Navbar
        currentPath={currentPath}
        navigate={navigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenMetronome={() => setIsMetronomeOpen(true)}
      />

      {/* Main Page Body */}
      <main className="flex-1 w-full">
        {renderCurrentPage()}
      </main>

      {/* Universal Footer */}
      <Footer navigate={navigate} />

      {/* Global Modals */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        navigate={navigate}
      />

      <MetronomeModal
        isOpen={isMetronomeOpen}
        onClose={() => setIsMetronomeOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
