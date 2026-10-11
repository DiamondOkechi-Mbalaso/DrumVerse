import React, { useState } from 'react';
import { retailersData, accessoriesGuide } from '../data/retailersData';

interface WhereToBuyPageProps {
  navigate: (path: string) => void;
}

export const WhereToBuyPage: React.FC<WhereToBuyPageProps> = ({ navigate }) => {
  const [filterRegion, setFilterRegion] = useState<'all' | 'uk' | 'europe' | 'us'>('all');
  const [filterType, setFilterType] = useState<'all' | 'acoustic' | 'electronic'>('all');

  const filteredRetailers = retailersData.filter((ret) => {
    if (filterRegion === 'uk' && !ret.regionsServed.includes('United Kingdom')) return false;
    if (filterRegion === 'europe' && !ret.regionsServed.includes('Europe')) return false;
    if (filterRegion === 'us' && !ret.regionsServed.includes('North America')) return false;

    if (filterType === 'acoustic' && !ret.acousticKits) return false;
    if (filterType === 'electronic' && !ret.electronicKits) return false;

    return true;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex flex-col gap-16">
      {/* 1. Header & Directory Scope */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-semibold">
          <span>VERIFIED RETAILERS &amp; BUYING ADVICE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-theme-on-surface">
          Where to Buy Drums &amp; Equipment
        </h1>
        <p className="text-base text-theme-on-variant max-w-3xl leading-relaxed">
          Purchasing your first drum kit or upgrading your cymbals requires honest retailer service, safe shipping, and real showroom testing. Below is an informative directory of the most respected music dealers in the UK, Europe, and North America, alongside our essential drummer buying checklist.
        </p>
      </div>

      {/* 2. Drummer's Essential Buying Checklist & Equipment Guide */}
      <section className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-theme-surface-low border border-theme-border shadow-sm flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-theme-border pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-orange-500 font-bold">
              BUYER'S CHECKLIST
            </span>
            <h2 className="text-2xl font-bold text-theme-on-surface mt-1">
              Everything You Need on Day One
            </h2>
            <p className="text-xs sm:text-sm text-theme-on-variant mt-0.5">
              Many starter acoustic kits are sold as "shell packs" without cymbals or hardware. Review this checklist before checking out.
            </p>
          </div>
          <button
            onClick={() => navigate('/drum-kits')}
            className="text-xs font-mono font-bold text-orange-500 hover:underline shrink-0"
          >
            Acoustic vs Electronic Guide →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accessoriesGuide.map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-theme-surface border border-theme-border flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-orange-500/15 text-orange-500 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <h3 className="font-bold text-sm text-theme-on-surface">{item.category}</h3>
              </div>
              <span className="text-xs font-mono text-primary font-medium">
                {item.recommendation}
              </span>
              <p className="text-xs text-theme-on-variant leading-relaxed mt-0.5">
                {item.details}
              </p>
            </div>
          ))}
        </div>

        {/* Shell Pack vs Complete Kit Warning Callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-theme-surface border border-theme-border flex flex-col gap-1.5 text-xs">
            <span className="font-bold text-theme-on-surface text-sm">
              Shell Pack vs Complete Kit: Know the Difference
            </span>
            <p className="text-theme-on-variant leading-relaxed">
              <strong>Shell Pack:</strong> Includes only the wooden drums (bass drum, snare, toms). Does NOT include cymbals, cymbal stands, snare stand, or bass drum pedal. Ideal for experienced drummers who already own hardware.
            </p>
            <p className="text-theme-on-variant leading-relaxed">
              <strong>Complete Beginner Package:</strong> Includes drums, hardware stands, kick pedal, throne, and basic starter cymbals in one single shipping box.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-theme-surface border border-theme-border flex flex-col gap-1.5 text-xs">
            <span className="font-bold text-theme-on-surface text-sm">
              Cymbal Metallurgy: Brass vs B20 Bronze
            </span>
            <p className="text-theme-on-variant leading-relaxed">
              <strong>Sheet Brass (MS63):</strong> Included with entry bundles. Inexpensive but can sound tinny and clangy with little musical resonance.
            </p>
            <p className="text-theme-on-variant leading-relaxed">
              <strong>Cast B20 Bronze (80% Copper, 20% Tin):</strong> The professional standard used by Zildjian, Sabian, Meinl, and Paiste. Warmer, musical, shimmering, and expressive.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Verified Music Retailers Directory */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
              OFFICIAL STORE DIRECTORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-on-surface mt-1">
              Verified Retailers
            </h2>
            <p className="text-sm text-theme-on-variant mt-1 max-w-2xl">
              Authentic music retailers with dedicated drum demonstration showrooms, pre-dispatch inspections, and authorized manufacturer warranties.
            </p>
          </div>

          {/* Region Filters */}
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: 'All Regions' },
              { id: 'uk', label: 'UK Showrooms' },
              { id: 'europe', label: 'Europe Flagship' },
              { id: 'us', label: 'North America' },
            ].map((reg) => (
              <button
                key={reg.id}
                onClick={() => setFilterRegion(reg.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-colors ${
                  filterRegion === reg.id
                    ? 'bg-orange-500 text-white border-orange-500 font-bold'
                    : 'bg-theme-surface-low border-theme-border text-theme-on-variant hover:text-theme-on-surface'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Retailers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRetailers.map((ret) => (
            <div
              key={ret.id}
              className="p-6 rounded-2xl bg-theme-surface-low border border-theme-border flex flex-col justify-between gap-5 shadow-sm hover:shadow-lg hover:border-orange-500/40 transition-all"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-orange-500 font-bold px-2 py-0.5 rounded bg-orange-500/10">
                    {ret.ratingScore}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-theme-muted">
                    <span className="material-symbols-outlined text-[14px] text-green-500">verified</span>
                    <span>Authorized Dealer</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-theme-on-surface">{ret.name}</h3>
                  <span className="text-xs text-theme-muted flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[14px]">storefront</span>
                    <span>{ret.headquarters}</span>
                  </span>
                </div>

                <p className="text-xs text-theme-on-variant leading-relaxed">
                  {ret.description}
                </p>

                {/* Specialties tags */}
                <div className="flex flex-wrap gap-1 mt-1">
                  {ret.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-theme-surface border border-theme-border text-theme-muted"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-theme-surface border border-theme-border text-xs text-theme-on-variant mt-1">
                  <span className="font-bold text-theme-on-surface">Best for: </span>
                  <span>{ret.recommendedFor}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-theme-border">
                <a
                  href={ret.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold font-mono uppercase shadow-md shadow-orange-500/20 active:scale-95 transition-all"
                >
                  <span>Visit {ret.name} Online</span>
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
