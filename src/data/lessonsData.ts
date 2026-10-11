import { LearningPath } from '../types';

export const learningPathsData: LearningPath[] = [
  {
    id: 'path-beginner',
    title: 'Absolute Beginner Roadmap',
    level: 'Foundational',
    summary: 'Master stick grip, balanced seated posture, counting quarter and eighth notes, and strike your very first authentic rock drum beat.',
    lessons: [
      {
        id: 'lesson-1-posture-grip',
        pathId: 'path-beginner',
        title: 'Proper Posture, Throne Height & Matched Grip',
        difficulty: 'Beginner',
        duration: '15 mins',
        description: 'Before striking a drum, your body position dictates speed, relaxation, and long-term ergonomics. Learn the German and American matched grips and optimal drum throne height.',
        learningObjectives: [
          'Adjust throne so thighs slope slightly downward at 90°–100° angle',
          'Position fulcrum between thumb and index finger at 1/3 distance from stick butt',
          'Relax shoulders and keep wrists parallel without tension'
        ],
        instructions: [
          'Sit on the center of the throne. Feet flat on bass pedal and hi-hat footboard.',
          'Form the fulcrum on each stick. Allow sticks to bounce freely off a practice pad.',
          'Strike using wrist movement rather than rigid arm swings.'
        ],
        practiceTip: 'Do not grip too tightly—tension kills stick rebound. Aim for a loose, relaxed natural bounce.',
        targetBpm: 60,
        notationPattern: {
          hihat: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
          snare: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
          kick: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
        }
      },
      {
        id: 'lesson-2-counting-time',
        pathId: 'path-beginner',
        title: 'Counting Time: 1, 2, 3, 4 and Eighth Notes',
        difficulty: 'Beginner',
        duration: '20 mins',
        description: 'Understand the mathematical pulse of music. Learn to count quarter notes (1 - 2 - 3 - 4) out loud and subdivide into eighth notes (1 - and - 2 - and - 3 - and - 4 - and).',
        learningObjectives: [
          'Vocalize 4/4 meter out loud while tapping a steady quarter note pulse',
          'Subdivide each beat into equal "downbeats" and "upbeats" (and)',
          'Sync your dominant hand hi-hat taps with a metronome at 70 BPM'
        ],
        instructions: [
          'Set your metronome to 70 BPM.',
          'Tap your right hand on the hi-hat on every click and half-click.',
          'Count aloud: "One-and, Two-and, Three-and, Four-and".'
        ],
        practiceTip: 'Always count out loud when starting. If you can speak it, your limbs will play it with rock-solid timing.',
        targetBpm: 70,
        notationPattern: {
          hihat: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
          snare: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
          kick: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
        }
      },
      {
        id: 'lesson-3-first-rock-beat',
        pathId: 'path-beginner',
        title: 'The Universal Rock Beat ("The Money Beat")',
        difficulty: 'Beginner',
        duration: '25 mins',
        description: 'The iconic drum beat heard on thousands of hit records from AC/DC to Michael Jackson and Billie Eilish. Combines steady eighth-note hi-hats, kick on beats 1 & 3, and snare backbeat on 2 & 4.',
        learningObjectives: [
          'Play steady 8th notes on the hi-hat with your right hand',
          'Drop the bass drum kick on beat 1 and beat 3',
          'Strike a crisp snare drum backbeat on beat 2 and beat 4',
          'Loop continuously for 16 bars without rushing or dragging'
        ],
        instructions: [
          'Step 1: Start just right hand playing 8th notes on the hi-hat.',
          'Step 2: Add left hand on snare on counts 2 and 4.',
          'Step 3: Finally add right foot kick drum on counts 1 and 3.'
        ],
        practiceTip: 'Focus on clean vertical alignment—when kick and hi-hat hit together on beat 1, they should strike as one single sound (no flamming).',
        targetBpm: 80,
        notationPattern: {
          hihat: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
          snare: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
          kick: [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false]
        }
      }
    ]
  },
  {
    id: 'path-groove',
    title: 'The Groove Foundation',
    level: 'Core Essentials',
    summary: 'Develop syncopated bass drum placement, hi-hat dynamic accents, open/closed hi-hat barks, and four-on-the-floor disco/pop grooves.',
    lessons: [
      {
        id: 'lesson-4-syncopated-kick',
        pathId: 'path-groove',
        title: 'Syncopated Bass Drum Patterns',
        difficulty: 'Intermediate',
        duration: '25 mins',
        description: 'Move beyond basic 1 and 3 bass patterns by playing the kick drum on the "and" of beats, creating driving syncopation and infectious pocket.',
        learningObjectives: [
          'Displace the kick drum to beat 1 and the "and of 3"',
          'Maintain steady hi-hat consistency without your right hand flinching',
          'Lock in with bass lines that push forward before the downbeat'
        ],
        instructions: [
          'Count: "1 - and - 2 - and - 3 - AND - 4 - and".',
          'Kick hits on 1 and the AND of 3.',
          'Snare stays locked on 2 and 4.'
        ],
        practiceTip: 'Slow the tempo down to 60 BPM until your right hand and foot separate cleanly.',
        targetBpm: 90,
        notationPattern: {
          hihat: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
          snare: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
          kick: [true, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false]
        }
      },
      {
        id: 'lesson-5-hihat-openings',
        pathId: 'path-groove',
        title: 'Hi-Hat Barks & Dynamic Accents',
        difficulty: 'Intermediate',
        duration: '20 mins',
        description: 'Add color and breathing room to your drum tracks by lifting your left foot on the "and of 4" to release a sizzling open hi-hat note, clamping it shut right on beat 1.',
        learningObjectives: [
          'Coordinate left foot release with right hand strike on the upbeat',
          'Clamp the hi-hat tightly on beat 1 to cut off cymbal sustain',
          'Master hi-hat dynamics between shoulder stick strikes and tip pings'
        ],
        instructions: [
          'Play standard 8th note groove.',
          'On count "and of 4", lift your left toes off the hi-hat pedal.',
          'Strike hi-hat edge with stick shoulder for a loud sizzle.',
          'Snap foot down simultaneously as you hit kick drum on beat 1.'
        ],
        practiceTip: 'The closure of the hi-hat on beat 1 must be instantaneous to create the tight "tss-SHUK" bark.',
        targetBpm: 85,
        notationPattern: {
          hihat: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
          snare: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
          kick: [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false]
        }
      },
      {
        id: 'lesson-6-four-on-the-floor',
        pathId: 'path-groove',
        title: 'Four-on-the-Floor Club & Pop Pulse',
        difficulty: 'Beginner',
        duration: '20 mins',
        description: 'The foundation of disco, funk, house, and modern pop. The bass drum fires on every single quarter note (1, 2, 3, 4) providing an unstoppable driving dance floor train.',
        learningObjectives: [
          'Pound the bass drum solidly on all four downbeats (1, 2, 3, 4)',
          'Layer open hi-hat upbeats on every "and"',
          'Maintain snare consistency on 2 and 4'
        ],
        instructions: [
          'Kick on 1, 2, 3, 4.',
          'Hi-Hat upbeat accents on every "and".',
          'Snare on 2 and 4 with heavy rimshot crack.'
        ],
        practiceTip: 'Keep your heel up on the kick pedal for fast stamina without calf fatigue.',
        targetBpm: 120,
        notationPattern: {
          hihat: [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false],
          snare: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
          kick: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false]
        }
      }
    ]
  },
  {
    id: 'path-rudiments',
    title: 'Rudiments, Fills & Technique',
    level: 'Technical Mastery',
    summary: 'The building blocks of drumming vocabulary: single stroke rolls, double strokes, paradiddles, tom fills, and seamless song transitions.',
    lessons: [
      {
        id: 'lesson-7-single-double-paradiddle',
        pathId: 'path-rudiments',
        title: 'The Big Three: Singles, Doubles & Paradiddles',
        difficulty: 'Intermediate',
        duration: '30 mins',
        description: 'Essential hand rudiments. Master R-L-R-L singles, R-R-L-L doubles using rebound physics, and the legendary R-L-R-R / L-R-L-L single paradiddle.',
        learningObjectives: [
          'Even volume and tone between non-dominant left hand and right hand',
          'Use natural rebound on double strokes (one stroke motion, two bounces)',
          'Accent the first note of each paradiddle group cleanly'
        ],
        instructions: [
          'Single Stroke: R - L - R - L - R - L - R - L.',
          'Double Stroke: R - R - L - L - R - R - L - L.',
          'Single Paradiddle: R - L - R - R - L - R - L - L.'
        ],
        practiceTip: 'Do not rush the second hit of double strokes. Ensure both hits sound identical in loudness and duration.',
        targetBpm: 100,
        notationPattern: {
          hihat: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
          snare: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
          kick: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
        }
      },
      {
        id: 'lesson-8-one-bar-rock-fill',
        pathId: 'path-rudiments',
        title: 'One-Bar Descending Tom Fill',
        difficulty: 'Intermediate',
        duration: '25 mins',
        description: 'How to break out of timekeeping on beat 4 and return seamlessly to beat 1 crash. Descend across Snare -> High Tom -> Mid Tom -> Floor Tom with steady 16th notes.',
        learningObjectives: [
          'Play 3 bars of steady groove, followed by 1 bar of 16th note fill',
          'Smoothly orchestrate hand movement across the kit without clipping rims',
          'Land with authority on beat 1 crash cymbal + kick drum together'
        ],
        instructions: [
          'Bar 4 Beat 1: 4 sixteenth notes on Snare (R-L-R-L).',
          'Bar 4 Beat 2: 4 sixteenth notes on High Tom.',
          'Bar 4 Beat 3: 4 sixteenth notes on Mid Tom.',
          'Bar 4 Beat 4: 4 sixteenth notes on Floor Tom.',
          'Bar 5 Beat 1: Crash + Kick together!'
        ],
        practiceTip: 'The #1 beginner mistake is speeding up during drum fills. Keep your internal metronome dead steady.',
        targetBpm: 95,
        notationPattern: {
          hihat: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
          snare: [true, false, true, false, true, false, true, false, false, false, false, false, false, false, false, false],
          kick: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
        }
      }
    ]
  },
  {
    id: 'path-styles',
    title: 'Musical Styles & World Grooves',
    level: 'Genre Fluency',
    summary: 'Travel across musical traditions: Jazz swing ride patterns with hi-hat foot chicks on 2 & 4, Funk ghost notes, and Bossa Nova cross-stick.',
    lessons: [
      {
        id: 'lesson-9-jazz-swing-spang',
        pathId: 'path-styles',
        title: 'Jazz Swing & The "Spang-a-Lang" Ride',
        difficulty: 'Advanced',
        duration: '35 mins',
        description: 'The essence of jazz drumming. Light, conversational touch on the 20" ride cymbal playing triplets, paired with left foot stepping the hi-hat tightly on beats 2 and 4.',
        learningObjectives: [
          'Swing the 8th notes with a triplet lilt (long-short feel)',
          'Establish the independent left foot hi-hat chick on 2 and 4',
          'Feather the bass drum softly (felt beater barely kissing head)'
        ],
        instructions: [
          'Ride cymbal pattern: 1, 2 and-a, 3, 4 and-a ("ding, ding-a-ding").',
          'Hi-Hat foot steps firmly on 2 and 4.',
          'Snare plays soft comping accents in conversation with soloists.'
        ],
        practiceTip: 'Never crash the ride or play heavily. Jazz drumming is acoustic chamber music—listen to Philly Joe Jones and Max Roach.',
        targetBpm: 130,
        notationPattern: {
          hihat: [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
          snare: [false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false],
          kick: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false]
        }
      },
      {
        id: 'lesson-10-funk-ghost-notes',
        pathId: 'path-styles',
        title: 'Funk Grooves & Whispering Ghost Notes',
        difficulty: 'Advanced',
        duration: '30 mins',
        description: 'How Bernard Purdie, Clyde Stubblefield, and David Garibaldi create irresistible groove pockets. High-contrast snare dynamics between loud rimshots and soft 2-inch ghost taps.',
        learningObjectives: [
          'Differentiate between 12-inch accent strokes and 1-inch ghost strokes',
          'Fill empty 16th-note spaces on the snare drum with light chatter',
          'Lock with syncopated 16th-note hi-hat grooves'
        ],
        instructions: [
          'Accents on 2 and 4 struck with loud rimshots.',
          'Ghost notes played just 1 inch off the snare drum head between hi-hat hits.',
          'Kick syncopates dynamically around the pocket.'
        ],
        practiceTip: 'Do not play ghost notes from the shoulder—use fingertips and light wrist rebound so they sound like subtle percussion textures.',
        targetBpm: 92,
        notationPattern: {
          hihat: [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false],
          snare: [false, false, true, false, true, false, true, false, false, false, true, false, true, false, true, false],
          kick: [true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false]
        }
      }
    ]
  }
];
