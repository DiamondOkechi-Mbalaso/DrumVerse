import React, { useState } from 'react';
import { QuizAnswers, evaluateKitRecommendation } from '../../data/comparisonData';

interface HelpMeChooseWizardProps {
  navigate: (path: string) => void;
}

export const HelpMeChooseWizard: React.FC<HelpMeChooseWizardProps> = ({ navigate }) => {
  const [answers, setAnswers] = useState<QuizAnswers>({
    livingEnvironment: 'apartment',
    primaryGoal: 'practice-anytime',
    budgetTier: 'entry',
    experienceLevel: 'beginner',
  });

  const [hasEvaluated, setHasEvaluated] = useState(false);

  const result = evaluateKitRecommendation(answers);

  return (
    <div className="w-full rounded-2xl bg-theme-surface-low border border-theme-border p-6 sm:p-8 lg:p-10 shadow-lg flex flex-col gap-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-semibold">
          <span className="material-symbols-outlined text-[16px]">psychology</span>
          <span>DECISION ASSISTANT</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-theme-on-surface mt-1">
          Help Me Choose: Acoustic or Electronic?
        </h3>
        <p className="text-sm text-theme-on-variant mt-1.5 max-w-2xl">
          Answer four practical questions about your living space, drumming goals, and budget to receive a transparent, rule-based recommendation tailored to your situation.
        </p>
      </div>

      {/* 4-Question Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Question 1: Living Environment */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono text-theme-muted uppercase font-semibold">
            1. Where will you practice?
          </label>
          <div className="grid grid-cols-1 gap-2">
            {[
              { id: 'apartment', label: 'Flat / Apartment / Shared Walls', desc: 'Noise travels easily; neighbors nearby.' },
              { id: 'detached', label: 'Detached House / Garage', desc: 'More acoustic tolerance for daytime playing.' },
              { id: 'studio', label: 'Soundproofed Room or Commercial Rehearsal Space', desc: 'No volume constraints whatsoever.' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setAnswers({ ...answers, livingEnvironment: opt.id as any });
                  setHasEvaluated(true);
                }}
                className={`p-3.5 rounded-xl text-left border transition-all ${
                  answers.livingEnvironment === opt.id
                    ? 'bg-orange-500/15 border-orange-500 text-theme-on-surface'
                    : 'bg-theme-surface border-theme-border text-theme-on-variant hover:border-orange-500/40'
                }`}
              >
                <div className="font-semibold text-sm text-theme-on-surface">{opt.label}</div>
                <div className="text-xs text-theme-muted mt-0.5">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Question 2: Primary Goal */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono text-theme-muted uppercase font-semibold">
            2. What is your primary objective?
          </label>
          <div className="grid grid-cols-1 gap-2">
            {[
              { id: 'practice-anytime', label: 'Daily Practice Anytime (Day & Night)', desc: 'Prioritizing regular routine with headphones.' },
              { id: 'band-live', label: 'Band Rehearsals & Live Gigging', desc: 'Rehearsing with real amps and stage presence.' },
              { id: 'recording-home', label: 'Home Studio & DAW MIDI Recording', desc: 'Multi-tracking drum MIDI with zero microphone bleed.' },
              { id: 'versatility', label: 'Balanced Versatility', desc: 'A mix of casual learning and jamming.' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setAnswers({ ...answers, primaryGoal: opt.id as any });
                  setHasEvaluated(true);
                }}
                className={`p-3.5 rounded-xl text-left border transition-all ${
                  answers.primaryGoal === opt.id
                    ? 'bg-orange-500/15 border-orange-500 text-theme-on-surface'
                    : 'bg-theme-surface border-theme-border text-theme-on-variant hover:border-orange-500/40'
                }`}
              >
                <div className="font-semibold text-sm text-theme-on-surface">{opt.label}</div>
                <div className="text-xs text-theme-muted mt-0.5">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Question 3: Experience Level */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono text-theme-muted uppercase font-semibold">
            3. What is your drumming experience?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'beginner', label: 'Beginner' },
              { id: 'intermediate', label: 'Intermediate' },
              { id: 'advanced', label: 'Advanced' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setAnswers({ ...answers, experienceLevel: opt.id as any });
                  setHasEvaluated(true);
                }}
                className={`p-3 rounded-xl text-center border font-semibold text-xs transition-all ${
                  answers.experienceLevel === opt.id
                    ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                    : 'bg-theme-surface border-theme-border text-theme-on-variant hover:text-theme-on-surface'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Question 4: Approximate Budget */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono text-theme-muted uppercase font-semibold">
            4. Approximate initial budget
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'entry', label: 'Under £600', sub: 'Starter bundle' },
              { id: 'mid', label: '£600 – £1,500', sub: 'Mid-tier solid kit' },
              { id: 'premium', label: '£1,500+', sub: 'Pro level gear' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setAnswers({ ...answers, budgetTier: opt.id as any });
                  setHasEvaluated(true);
                }}
                className={`p-3 rounded-xl text-center border transition-all ${
                  answers.budgetTier === opt.id
                    ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                    : 'bg-theme-surface border-theme-border text-theme-on-variant hover:text-theme-on-surface'
                }`}
              >
                <div className="font-semibold text-xs">{opt.label}</div>
                <div className={`text-[10px] mt-0.5 ${answers.budgetTier === opt.id ? 'text-white/80' : 'text-theme-muted'}`}>
                  {opt.sub}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendation Results Card */}
      <div className="rounded-2xl bg-gradient-to-r from-theme-surface via-theme-surface to-orange-500/10 border border-orange-500/30 p-6 sm:p-8 flex flex-col gap-5 shadow-inner">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-theme-border pb-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-orange-500 text-white font-mono text-xs font-bold uppercase tracking-wider">
              {result.recommendation} Kit Suggested
            </span>
            <span className="text-xs font-mono text-theme-muted">
              Matching Confidence: <strong className="text-orange-500 font-bold">{result.confidence}%</strong>
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-xl sm:text-2xl font-bold text-theme-on-surface">
            {result.headline}
          </h4>
          <p className="text-xs font-mono text-theme-muted mt-1">
            Transparent Rule-Based Evaluation Breakdown:
          </p>
        </div>

        <ul className="flex flex-col gap-2.5">
          {result.reasons.map((reason, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm text-theme-on-variant">
              <span className="material-symbols-outlined text-orange-500 text-[18px] shrink-0 mt-0.5">
                check_circle
              </span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>

        <div className="pt-3 border-t border-theme-border flex flex-wrap items-center gap-3">
          {result.recommendation === 'Acoustic' ? (
            <button
              onClick={() => navigate('/drum-kits/acoustic')}
              className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-orange-500/20 active:scale-95 transition-all"
            >
              Explore Acoustic Kits Guide →
            </button>
          ) : result.recommendation === 'Electronic' ? (
            <button
              onClick={() => navigate('/drum-kits/electronic')}
              className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-orange-500/20 active:scale-95 transition-all"
            >
              Explore Electronic Kits Guide →
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/drum-kits/acoustic')}
                className="px-4 py-2 bg-theme-surface-high hover:bg-theme-surface-highest text-theme-on-surface text-xs font-semibold rounded-xl border border-theme-border transition-all"
              >
                Acoustic Guide
              </button>
              <button
                onClick={() => navigate('/drum-kits/electronic')}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-xl transition-all"
              >
                Electronic Guide
              </button>
            </div>
          )}
          <button
            onClick={() => navigate('/buy')}
            className="px-4 py-2.5 bg-theme-surface-high hover:bg-theme-surface-highest text-theme-on-surface text-sm font-medium rounded-xl border border-theme-border transition-all"
          >
            Where to Buy Retailers
          </button>
        </div>
      </div>
    </div>
  );
};
