import React, { useState } from 'react';
import { comparisonDimensions } from '../data/comparisonData';
import { HelpMeChooseWizard } from '../components/comparison/HelpMeChooseWizard';

interface DrumKitsPageProps {
  navigate: (path: string) => void;
}

export const DrumKitsPage: React.FC<DrumKitsPageProps> = ({ navigate }) => {
  const [selectedDimension, setSelectedDimension] = useState<string>('all');

  const displayedDimensions =
    selectedDimension === 'all'
      ? comparisonDimensions
      : comparisonDimensions.filter((dim) => dim.id === selectedDimension);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex flex-col gap-14">
      {/* Page Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-semibold">
          <span>DRUM KITS HUB &amp; COMPARISON</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-theme-on-surface">
          Acoustic vs Electronic Drum Kits
        </h1>
        <p className="text-base text-theme-on-variant max-w-3xl leading-relaxed">
          Choosing between an acoustic and electronic drum kit is the most important decision every drummer faces. Compare tone, dynamic volume, stick rebound, recording workflows, and apartment suitability.
        </p>
      </div>

      {/* Two Dedicated Guide Portals Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Acoustic Portal Card */}
        <div className="rounded-2xl bg-theme-surface-low border border-theme-border p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-lg hover:border-orange-500/40 transition-all">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-orange-500 font-semibold">
              ORGANIC POWER
            </span>
            <h2 className="text-2xl font-bold text-theme-on-surface">
              Acoustic Drum Kits Guide
            </h2>
            <p className="text-sm text-theme-on-variant leading-relaxed">
              Explore wood shell science, bearing edges, drumhead tuning relationships, cymbal metallurgy, and our interactive 5-piece kit anatomy diagram.
            </p>
          </div>
          <button
            onClick={() => navigate('/drum-kits/acoustic')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-theme-surface-high hover:bg-orange-500 text-theme-on-surface hover:text-white rounded-xl font-bold text-sm border border-theme-border hover:border-orange-500 transition-all"
          >
            <span>Open Acoustic Guide &amp; Anatomy Map</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

        {/* Electronic Portal Card */}
        <div className="rounded-2xl bg-theme-surface-low border border-theme-border p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-sm hover:shadow-lg hover:border-amber-500/40 transition-all">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
              DIGITAL PRECISION
            </span>
            <h2 className="text-2xl font-bold text-theme-on-surface">
              Electronic Drum Kits Guide
            </h2>
            <p className="text-sm text-theme-on-variant leading-relaxed">
              Study tunable mesh heads, multi-zone triggers, DSP drum module brains, USB-MIDI DAW recording, and our interactive digital sound module explorer.
            </p>
          </div>
          <button
            onClick={() => navigate('/drum-kits/electronic')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-theme-surface-high hover:bg-amber-600 text-theme-on-surface hover:text-white rounded-xl font-bold text-sm border border-theme-border hover:border-amber-600 transition-all"
          >
            <span>Open Electronic Guide &amp; Sound Engine</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* "Help Me Choose" Interactive Decision Assistant */}
      <HelpMeChooseWizard navigate={navigate} />

      {/* Side-by-Side Comprehensive Comparison Matrix */}
      <section className="flex flex-col gap-6" id="comparison-matrix">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
              DETAILED SPEC MATRIX
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-theme-on-surface mt-1">
              Side-by-Side Dimension Analysis
            </h3>
            <p className="text-sm text-theme-on-variant mt-1">
              Filter by specific dimension or compare all 7 key metrics below.
            </p>
          </div>

          {/* Dimension Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => setSelectedDimension('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedDimension === 'all'
                  ? 'bg-orange-500 text-white font-semibold'
                  : 'bg-theme-surface-low border border-theme-border text-theme-on-variant hover:text-theme-on-surface'
              }`}
            >
              All Dimensions
            </button>
            {comparisonDimensions.map((dim) => (
              <button
                key={dim.id}
                onClick={() => setSelectedDimension(dim.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedDimension === dim.id
                    ? 'bg-orange-500 text-white font-semibold'
                    : 'bg-theme-surface-low border border-theme-border text-theme-on-variant hover:text-theme-on-surface'
                }`}
              >
                {dim.title}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Comparison Table (Hidden on small mobile) */}
        <div className="hidden lg:block rounded-2xl bg-theme-surface-low border border-theme-border overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-theme-border bg-theme-surface">
                <th className="p-4 text-xs font-mono uppercase text-theme-muted tracking-wider w-1/4">
                  Comparison Area
                </th>
                <th className="p-4 text-xs font-mono uppercase text-orange-500 tracking-wider w-[37.5%]">
                  Acoustic Drum Kits
                </th>
                <th className="p-4 text-xs font-mono uppercase text-amber-500 tracking-wider w-[37.5%]">
                  Electronic Drum Kits
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme-border/60">
              {displayedDimensions.map((dim) => (
                <tr key={dim.id} className="hover:bg-theme-surface/60 transition-colors">
                  <td className="p-5 align-top">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-orange-500 text-[20px]">
                        {dim.icon}
                      </span>
                      <span className="font-bold text-sm text-theme-on-surface">{dim.title}</span>
                    </div>
                  </td>

                  {/* Acoustic Column */}
                  <td className="p-5 align-top">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-mono font-bold text-orange-500">
                        {dim.acoustic.rating}
                      </span>
                      <p className="text-xs text-theme-on-surface leading-relaxed">
                        {dim.acoustic.description}
                      </p>
                      <ul className="flex flex-col gap-1 mt-1">
                        {dim.acoustic.keyPoints.map((pt, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs text-theme-on-variant">
                            <span className="text-orange-500 font-bold shrink-0">·</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>

                  {/* Electronic Column */}
                  <td className="p-5 align-top">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-mono font-bold text-amber-500">
                        {dim.electronic.rating}
                      </span>
                      <p className="text-xs text-theme-on-surface leading-relaxed">
                        {dim.electronic.description}
                      </p>
                      <ul className="flex flex-col gap-1 mt-1">
                        {dim.electronic.keyPoints.map((pt, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs text-theme-on-variant">
                            <span className="text-amber-500 font-bold shrink-0">·</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile & Tablet Stacked Cards */}
        <div className="lg:hidden flex flex-col gap-4">
          {displayedDimensions.map((dim) => (
            <div
              key={dim.id}
              className="rounded-2xl bg-theme-surface-low border border-theme-border p-5 flex flex-col gap-4"
            >
              <div className="flex items-center gap-2 border-b border-theme-border pb-3">
                <span className="material-symbols-outlined text-orange-500 text-[20px]">
                  {dim.icon}
                </span>
                <h4 className="font-bold text-base text-theme-on-surface">{dim.title}</h4>
              </div>

              {/* Acoustic Card Part */}
              <div className="p-4 rounded-xl bg-theme-surface border border-theme-border flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase font-bold text-orange-500">
                    Acoustic Kit
                  </span>
                  <span className="text-[10px] font-mono text-theme-muted">{dim.acoustic.rating}</span>
                </div>
                <p className="text-xs text-theme-on-variant leading-relaxed">
                  {dim.acoustic.description}
                </p>
                <ul className="flex flex-col gap-1 mt-1">
                  {dim.acoustic.keyPoints.map((pt, i) => (
                    <li key={i} className="text-xs text-theme-on-variant flex items-start gap-1.5">
                      <span className="text-orange-500 shrink-0 font-bold">·</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Electronic Card Part */}
              <div className="p-4 rounded-xl bg-theme-surface border border-theme-border flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase font-bold text-amber-500">
                    Electronic Kit
                  </span>
                  <span className="text-[10px] font-mono text-theme-muted">{dim.electronic.rating}</span>
                </div>
                <p className="text-xs text-theme-on-variant leading-relaxed">
                  {dim.electronic.description}
                </p>
                <ul className="flex flex-col gap-1 mt-1">
                  {dim.electronic.keyPoints.map((pt, i) => (
                    <li key={i} className="text-xs text-theme-on-variant flex items-start gap-1.5">
                      <span className="text-amber-500 shrink-0 font-bold">·</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
