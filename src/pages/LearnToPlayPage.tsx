import React, { useState, useEffect } from 'react';
import { learningPathsData } from '../data/lessonsData';
import { Lesson } from '../types';
import { RhythmStepSequencer } from '../components/learn/RhythmStepSequencer';
import { drumSynth } from '../audio/drumSynth';

interface LearnToPlayPageProps {
  navigate: (path: string) => void;
}

const LESSON_PROGRESS_KEY = 'drumverse_completed_lessons';

interface TeacherResource {
  id: string;
  name: string;
  type: 'Online Academy' | 'Music College' | 'Private Tutor Network' | 'Free Curriculum';
  location: string;
  format: 'Video Courses & Live Q&A' | 'In-Person Degree/Diploma' | '1-on-1 Remote Video' | 'Self-Paced Web';
  beginnerFriendly: boolean;
  cost: string;
  description: string;
  officialUrl: string;
}

const teacherResources: TeacherResource[] = [
  {
    id: 'drumeo',
    name: 'Drumeo',
    type: 'Online Academy',
    location: 'Global (Online)',
    format: 'Video Courses & Live Q&A',
    beginnerFriendly: true,
    cost: 'Subscription (Free 7-Day Trial)',
    description: "The world's largest online drum education platform featuring masterclasses with Dennis Chambers, Chad Smith, Anika Nilles, and Todd Sucherman, with structured 10-level progressive roadmaps and live teacher feedback.",
    officialUrl: 'https://www.drumeo.com/',
  },
  {
    id: 'vic-firth-education',
    name: 'Vic Firth Education Library',
    type: 'Free Curriculum',
    location: 'Worldwide Online',
    format: 'Self-Paced Web',
    beginnerFriendly: true,
    cost: '100% Free',
    description: 'Legendary standard for rudimental drumming education. Complete interactive playback for all 40 Percussive Arts Society (PAS) official drum rudiments with slow-to-fast practice tiers.',
    officialUrl: 'https://vicfirth.com/pages/education',
  },
  {
    id: 'mikes-lessons',
    name: "Mike's Lessons (Mike Johnston)",
    type: 'Online Academy',
    location: 'Global & California Facility',
    format: 'Video Courses & Live Q&A',
    beginnerFriendly: true,
    cost: 'Monthly Membership',
    description: 'Renowned for world-class pedagogy focusing on limb independence, groove pocket, dynamic accents, and mental composure behind the kit.',
    officialUrl: 'https://www.mikeslessons.com/',
  },
  {
    id: 'bimm-music-institute',
    name: 'BIMM Institute Drum Performance',
    type: 'Music College',
    location: 'London, Manchester, Brighton, Bristol, Birmingham & Berlin',
    format: 'In-Person Degree/Diploma',
    beginnerFriendly: false,
    cost: 'Higher Education Tuition',
    description: "Europe's leading contemporary music university offering BA (Hons) Drum Performance degrees, state-of-the-art Roland and acoustic live suites, and direct touring industry networking.",
    officialUrl: 'https://www.bimm.ac.uk/',
  },
  {
    id: 'musicteachers-uk',
    name: 'MusicTeachers.co.uk Verified Directory',
    type: 'Private Tutor Network',
    location: 'United Kingdom Nationwide & Online',
    format: '1-on-1 Remote Video',
    beginnerFriendly: true,
    cost: '£25 – £45 / hour',
    description: 'The UK’s largest directory of certified, DBS-checked private drum instructors offering in-home studio lessons and live Zoom sessions tailored to your grade exam or hobby goals.',
    officialUrl: 'https://www.musicteachers.co.uk/',
  },
];

export const LearnToPlayPage: React.FC<LearnToPlayPageProps> = ({ navigate }) => {
  const [selectedPathId, setSelectedPathId] = useState<string>(learningPathsData[0].id);
  const [activeLesson, setActiveLesson] = useState<Lesson>(learningPathsData[0].lessons[0]);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LESSON_PROGRESS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Teacher Directory Filters
  const [teacherTypeFilter, setTeacherTypeFilter] = useState<string>('all');
  const [teacherBeginnerOnly, setTeacherBeginnerOnly] = useState<boolean>(false);

  // Sync completed lessons to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LESSON_PROGRESS_KEY, JSON.stringify(completedLessonIds));
    } catch {
      // Ignore storage errors
    }
  }, [completedLessonIds]);

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessonIds((prev) => {
      if (prev.includes(lessonId)) {
        return prev.filter((id) => id !== lessonId);
      } else {
        drumSynth.ensureUnlocked();
        drumSynth.playCrash(); // Reward sound!
        return [...prev, lessonId];
      }
    });
  };

  const currentPath = learningPathsData.find((p) => p.id === selectedPathId) || learningPathsData[0];

  // Calculate overall progress across all lessons
  const allLessons = learningPathsData.flatMap((p) => p.lessons);
  const totalLessonCount = allLessons.length;
  const completedCount = completedLessonIds.filter((id) =>
    allLessons.some((l) => l.id === id)
  ).length;
  const progressPercentage = Math.round((completedCount / totalLessonCount) * 100);

  // Filter teacher resources
  const filteredTeachers = teacherResources.filter((t) => {
    const matchesType = teacherTypeFilter === 'all' || t.type === teacherTypeFilter;
    const matchesBeginner = !teacherBeginnerOnly || t.beginnerFriendly;
    return matchesType && matchesBeginner;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex flex-col gap-16">
      {/* 1. Header & Dynamic Progress Banner */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            <span>PERCUSSION ACADEMY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-theme-on-surface">
            Learn to Play Drums
          </h1>
          <p className="text-base text-theme-on-variant leading-relaxed">
            From your very first matched grip to complex syncopated ghost notes and 4-limb independence. Follow structured lessons, track verified progress, and play along with interactive rhythm notation.
          </p>
        </div>

        {/* Real Progress Card (Persisted locally) */}
        <div className="p-5 rounded-2xl bg-theme-surface-low border border-theme-border flex flex-col gap-3 min-w-[280px] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-theme-muted font-semibold">
              Academy Progress
            </span>
            <span className="text-sm font-bold font-mono text-orange-500">
              {progressPercentage}% Completed
            </span>
          </div>
          <div className="w-full bg-theme-surface-highest h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-theme-muted">
            <span>{completedCount} of {totalLessonCount} Lessons Done</span>
            {completedCount > 0 && (
              <button
                onClick={() => setCompletedLessonIds([])}
                className="text-theme-muted hover:text-red-500 transition-colors"
                title="Reset local completion history"
              >
                Reset Progress
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Learning Paths Navigation Tabs */}
      <div className="flex flex-col gap-4">
        <span className="text-xs font-mono uppercase tracking-wider text-theme-muted">
          Select Your Progression Tier
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {learningPathsData.map((path) => {
            const isSelected = selectedPathId === path.id;
            const pathCompletedCount = path.lessons.filter((l) =>
              completedLessonIds.includes(l.id)
            ).length;

            return (
              <button
                key={path.id}
                onClick={() => {
                  setSelectedPathId(path.id);
                  setActiveLesson(path.lessons[0]);
                }}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  isSelected
                    ? 'bg-orange-500/15 border-orange-500 text-theme-on-surface shadow-sm'
                    : 'bg-theme-surface-low border-theme-border text-theme-on-variant hover:text-theme-on-surface hover:bg-theme-surface-high'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-bold">
                    {path.level}
                  </span>
                  <span className="text-[10px] font-mono text-theme-muted">
                    {pathCompletedCount}/{path.lessons.length}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-theme-on-surface mt-1 truncate">
                  {path.title}
                </h3>
                <p className="text-xs text-theme-muted mt-1 line-clamp-2">
                  {path.summary}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main Lesson Player & Curriculum Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Lessons Sidebar for Current Path */}
        <div className="lg:col-span-4 rounded-2xl bg-theme-surface-low border border-theme-border p-4 sm:p-5 flex flex-col gap-3">
          <div className="border-b border-theme-border pb-3">
            <h3 className="font-bold text-base text-theme-on-surface">
              {currentPath.title}
            </h3>
            <p className="text-xs text-theme-on-variant mt-0.5">
              Click a lesson to begin exercises and interactive notation.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {currentPath.lessons.map((lesson, idx) => {
              const isActive = activeLesson.id === lesson.id;
              const isCompleted = completedLessonIds.includes(lesson.id);

              return (
                <div
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    isActive
                      ? 'bg-orange-500/15 border-orange-500 text-theme-on-surface shadow-sm'
                      : 'bg-theme-surface border-theme-border text-theme-on-variant hover:bg-theme-surface-high hover:text-theme-on-surface'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLessonComplete(lesson.id);
                      }}
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isCompleted
                          ? 'bg-orange-500 text-white'
                          : 'border border-theme-border hover:border-orange-500 text-transparent'
                      }`}
                      title={isCompleted ? 'Mark Incomplete' : 'Mark Lesson Complete'}
                    >
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </button>
                    <div className="flex flex-col min-w-0">
                      <span className={`text-xs font-bold truncate ${isActive ? 'text-primary' : 'text-theme-on-surface'}`}>
                        {idx + 1}. {lesson.title}
                      </span>
                      <span className="text-[10px] font-mono text-theme-muted">
                        {lesson.difficulty} · {lesson.duration}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Lesson Workspace */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Lesson Header Card */}
          <div className="rounded-2xl bg-theme-surface-low border border-theme-border p-6 sm:p-8 flex flex-col gap-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-theme-border pb-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-500/15 text-orange-500 text-[10px] font-mono font-bold uppercase">
                    {activeLesson.difficulty}
                  </span>
                  <span className="text-xs font-mono text-theme-muted">
                    Estimated Duration: {activeLesson.duration}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-on-surface mt-1">
                  {activeLesson.title}
                </h2>
              </div>

              {/* Mark Complete Button */}
              <button
                onClick={() => toggleLessonComplete(activeLesson.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase flex items-center gap-2 transition-all active:scale-95 shrink-0 shadow-sm ${
                  completedLessonIds.includes(activeLesson.id)
                    ? 'bg-green-600 text-white shadow-green-600/30'
                    : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/30'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {completedLessonIds.includes(activeLesson.id) ? 'check_circle' : 'radio_button_unchecked'}
                </span>
                <span>
                  {completedLessonIds.includes(activeLesson.id) ? 'Completed' : 'Mark as Complete'}
                </span>
              </button>
            </div>

            <p className="text-sm text-theme-on-variant leading-relaxed">
              {activeLesson.description}
            </p>

            {/* Learning Objectives */}
            <div className="flex flex-col gap-2 p-4 rounded-xl bg-theme-surface border border-theme-border">
              <span className="text-xs font-mono uppercase tracking-wider text-orange-500 font-bold">
                Core Learning Objectives
              </span>
              <ul className="flex flex-col gap-1.5 mt-1">
                {activeLesson.learningObjectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-theme-on-variant">
                    <span className="material-symbols-outlined text-orange-500 text-[16px] shrink-0 mt-0.5">
                      arrow_right
                    </span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions Steps */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-theme-muted">
                Step-by-Step Exercise Instructions
              </span>
              <ol className="flex flex-col gap-2">
                {activeLesson.instructions.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-theme-surface border border-theme-border text-xs text-theme-on-surface">
                    <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-500 font-mono font-bold flex items-center justify-center shrink-0 text-[10px]">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Practice Tip Callout */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-500 text-[20px] shrink-0 mt-0.5">
                lightbulb
              </span>
              <div className="flex flex-col gap-0.5 text-xs">
                <span className="font-bold text-theme-on-surface">Pro Instructor Practice Tip</span>
                <p className="text-theme-on-variant leading-relaxed">{activeLesson.practiceTip}</p>
              </div>
            </div>
          </div>

          {/* Interactive Rhythm Sequencer (Section 11) */}
          {activeLesson.notationPattern && (
            <RhythmStepSequencer
              initialBpm={activeLesson.targetBpm}
              initialPattern={activeLesson.notationPattern}
              title={`Live Rhythm Sequencer: ${activeLesson.title}`}
            />
          )}
        </div>
      </div>

      {/* 4. Find a Drum Teacher & Lessons Directory (Section 11) */}
      <section className="flex flex-col gap-8 pt-8 border-t border-theme-border" id="teacher-directory">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
              VERIFIED TUTOR DIRECTORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-on-surface mt-1">
              Find Drum Lessons &amp; Certified Academies
            </h2>
            <p className="text-sm text-theme-on-variant mt-1 max-w-2xl">
              Connect with accredited UK music colleges, DBS-checked private 1-on-1 teachers, and world-class online academies.
            </p>
          </div>

          {/* Teacher Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={teacherTypeFilter}
              onChange={(e) => setTeacherTypeFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-theme-surface-low border border-theme-border text-xs text-theme-on-surface"
              aria-label="Filter by Institution Type"
            >
              <option value="all">All Formats &amp; Colleges</option>
              <option value="Online Academy">Online Academy</option>
              <option value="Music College">Music College (Degrees)</option>
              <option value="Private Tutor Network">Private Tutor Network</option>
              <option value="Free Curriculum">Free Curriculum</option>
            </select>

            <button
              onClick={() => setTeacherBeginnerOnly(!teacherBeginnerOnly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                teacherBeginnerOnly
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-theme-surface-low border-theme-border text-theme-on-variant'
              }`}
            >
              Beginner Friendly Only
            </button>
          </div>
        </div>

        {/* Teacher Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-theme-surface-low border border-theme-border flex flex-col justify-between gap-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-orange-500 font-bold px-2 py-0.5 rounded bg-orange-500/10">
                    {t.type}
                  </span>
                  <span className="text-[11px] font-mono text-theme-muted">{t.cost}</span>
                </div>

                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-theme-on-surface">{t.name}</h3>
                  <span className="text-xs text-theme-muted flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    <span>{t.location}</span>
                  </span>
                </div>

                <p className="text-xs text-theme-on-variant leading-relaxed">
                  {t.description}
                </p>

                <div className="flex items-center gap-1.5 text-[11px] font-mono text-theme-on-surface bg-theme-surface p-2 rounded-lg border border-theme-border">
                  <span className="text-orange-500 font-bold">Format:</span>
                  <span className="truncate">{t.format}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-theme-border">
                <a
                  href={t.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-theme-surface-high hover:bg-orange-500 text-theme-on-surface hover:text-white text-xs font-bold transition-all"
                >
                  <span>Visit Verified Academy</span>
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
