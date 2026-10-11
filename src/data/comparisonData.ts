import { ComparisonDimension } from '../types';

export const comparisonDimensions: ComparisonDimension[] = [
  {
    id: 'sound',
    title: 'Sound & Tone Quality',
    icon: 'graphic_eq',
    acoustic: {
      rating: 'Infinite Organic Harmonics',
      description: 'Physical air resonance from natural wood shells and vibrating brass/bronze alloys.',
      keyPoints: [
        'Natural dynamic response from subtle ghost notes to thunderous rimshots',
        'Rich complex overtones that evolve naturally in room acoustics',
        '100% authentic live sound that cannot be completely replicated digitally',
        'Direct physical stick vibration felt in your hands and body'
      ]
    },
    electronic: {
      rating: 'Pristine Multi-Sample Libraries',
      description: 'Pre-recorded professional studio drum samples or real-time physical modeling DSP.',
      keyPoints: [
        'Instant access to hundreds of iconic kit presets (Jazz, Metal, 808, Vintage)',
        'Built-in studio compression, EQ, and ambient reverb per channel',
        'Consistent sound regardless of venue acoustics or amateur microphone placement',
        'May feel slightly static or lacking harmonic complexity on budget modules'
      ]
    }
  },
  {
    id: 'volume-noise',
    title: 'Volume & Home Practice',
    icon: 'volume_down',
    acoustic: {
      rating: 'High Volume (95 – 118+ dB SPL)',
      description: 'Extremely loud; sounds travel through walls and floors easily without acoustic isolation.',
      keyPoints: [
        'Requires soundproofed basement, dedicated studio, or detached house',
        'Hearing protection is strictly mandatory during daily practice',
        'Mute pads and mesh practice heads exist but alter stick rebound and feel',
        'Practice hours usually constrained by neighbors and family'
      ]
    },
    electronic: {
      rating: 'Whisper Quiet to Headphones (55 – 70 dB)',
      description: 'Pads produce only light stick tapping sounds, allowing 2am headphone practice.',
      keyPoints: [
        'Perfect for flats, shared housing, apartments, and late-night sessions',
        'Volume knob controls your exact headphone listening level',
        'Only bass drum pedal footfall vibration travels through floors (solvable with isolation riser)',
        'Play whenever inspiration strikes without disturbing anyone'
      ]
    }
  },
  {
    id: 'playing-feel',
    title: 'Playing Feel & Stick Rebound',
    icon: 'pan_tool',
    acoustic: {
      rating: '100% Genuine Physical Rebound',
      description: 'The definitive benchmark for stick rebound, rim clicks, and cymbal flexing.',
      keyPoints: [
        'Drumheads give natural tension feedback across snare and toms',
        'Cymbals sway and flex physically under stick shoulder strikes',
        'Direct tactile response develops proper touch, dynamics, and micro-timing',
        'Pedal beater rebounds directly off tensioned bass drumhead'
      ]
    },
    electronic: {
      rating: 'Very Good to Excellent (Mesh Heads)',
      description: 'Modern multi-ply mesh heads mimic tension well, though rubber cymbals feel stiffer.',
      keyPoints: [
        'Tunable mesh heads provide adjustable stick bounce and quiet impact',
        'Rubber cymbals produce slightly less give than swinging bronze plates',
        'High-end digital snares (Roland, Yamaha, EFNOTE) detect subtle rimshots and cross-sticks',
        'Budget rubber pads feel firmer with more wrist shock'
      ]
    }
  },
  {
    id: 'space-portability',
    title: 'Space & Portability',
    icon: 'aspect_ratio',
    acoustic: {
      rating: 'Moderate to Large Footprint',
      description: 'Requires roughly 6ft x 5ft of floor space plus space for stands to spread out.',
      keyPoints: [
        'Heavy hard shells, stands, and cymbal cases make transport labor-intensive',
        'Requires complete disassembly and re-setup for gigs (30–45 mins)',
        'Difficult to store when not in use; usually permanent in a room',
        'Needs a dedicated drum rug on stage'
      ]
    },
    electronic: {
      rating: 'Compact & Often Foldable',
      description: 'Occupies smaller footprint (approx. 4ft x 3ft); many starter kits fold flat.',
      keyPoints: [
        'Lightweight rack folds together for quick corner storage',
        'Easy to carry in a standard car boot or gig bag',
        'Fast stage setup: single stereo cable pair straight into PA mixer',
        'Ideal for small bedrooms, home offices, and tight stage corners'
      ]
    }
  },
  {
    id: 'recording-connectivity',
    title: 'Recording & DAW Integration',
    icon: 'developer_board',
    acoustic: {
      rating: 'Requires Mics & Audio Interface',
      description: 'Recording requires 4 to 8 microphones, audio interface, and treated acoustic space.',
      keyPoints: [
        'Captures unique organic room sound and performance nuances',
        'Significant investment required for quality drum microphones and preamps',
        'Microphone bleed between snare and hi-hat requires audio engineering skill',
        'Cannot edit drum mistakes via MIDI note editing after recording'
      ]
    },
    electronic: {
      rating: 'Plug-and-Play USB-MIDI Recording',
      description: 'A single USB cable into your Mac or PC records multi-track MIDI and stereo audio.',
      keyPoints: [
        'Trigger multi-gigabyte virtual drum libraries (Superior Drummer, EZdrummer, Addictive Drums)',
        'Edit timing and mistakes directly in Logic, Ableton, Pro Tools, or Reaper',
        'Zero microphone bleed; pristine signal separation',
        'Record professional-sounding drum tracks in an untreated bedroom'
      ]
    }
  },
  {
    id: 'maintenance-cost',
    title: 'Maintenance, Tuning & Longevity',
    icon: 'build',
    acoustic: {
      rating: 'Requires Regular Tuning & Upkeep',
      description: 'Drumheads stretch and wear out; temperature and humidity affect wood tuning.',
      keyPoints: [
        'Learning to tune drumheads with a drum key is a core musical skill',
        'Drumheads require periodic replacement (£60–£150 per full set)',
        'Wood shells can last 50+ years with proper climate care and appreciate in value',
        'No electrical components or software updates to worry about'
      ]
    },
    electronic: {
      rating: 'Minimal Maintenance',
      description: 'Zero tuning required; turn on and play. Components are electronic and modular.',
      keyPoints: [
        'Never goes out of tune regardless of room temperature or humidity',
        'Mesh heads last years under normal playing with smooth nylon or wood stick tips',
        'Electronic modules can become outdated as digital technology advances',
        'Pads can be individually replaced or upgraded without replacing entire kit'
      ]
    }
  },
  {
    id: 'budget-pricing',
    title: 'Budget Considerations',
    icon: 'payments',
    acoustic: {
      rating: 'Starter from £350 | Pro £1,200 – £3,500+',
      description: 'Complete beginner packages start around £350; pro shell packs sell separately from cymbals.',
      keyPoints: [
        'Budget kits often include basic sheet brass cymbals that will need upgrading',
        'Hardware and cymbals retain strong resale value on the used market',
        'Professional shell packs last decades and become treasured heirlooms',
        'Remember to factor in ear protection, drum rug, and spare heads'
      ]
    },
    electronic: {
      rating: 'Starter from £280 | Pro £1,500 – £5,000+',
      description: 'Entry-level mesh kits start around £300; high-end digital trigger systems reach £4,000+.',
      keyPoints: [
        'Entry kits usually include module, pads, kick pedal, and basic sticks',
        'Higher tiers offer positional sensing, digital snare/ride pads, and multi-channel audio outs',
        'Headphones or drum monitor amplifier needed for listening',
        'Excellent value for home players who avoid soundproofing expenses'
      ]
    }
  }
];

export interface QuizAnswers {
  livingEnvironment: 'apartment' | 'detached' | 'studio';
  primaryGoal: 'practice-anytime' | 'band-live' | 'recording-home' | 'versatility';
  budgetTier: 'entry' | 'mid' | 'premium';
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
}

export function evaluateKitRecommendation(answers: QuizAnswers): {
  recommendation: 'Acoustic' | 'Electronic' | 'Hybrid';
  confidence: number;
  headline: string;
  reasons: string[];
  suggestedAction: string;
} {
  let electronicScore = 0;
  let acousticScore = 0;
  const reasons: string[] = [];

  // 1. Living Environment
  if (answers.livingEnvironment === 'apartment') {
    electronicScore += 5;
    reasons.push('Living in a flat or shared housing makes acoustic drumming (115 dB) impractical without £10k+ in room isolation. Electronic mesh heads allow quiet headphone practice.');
  } else if (answers.livingEnvironment === 'detached') {
    acousticScore += 3;
    electronicScore += 1;
    reasons.push('Having a detached home or garage gives you the acoustic clearance to let real wood drums resonate without immediate neighbor complaints.');
  } else {
    acousticScore += 4;
    reasons.push('A dedicated studio space enables full acoustic kit microphoning and unrestricted volume dynamics.');
  }

  // 2. Primary Goal
  if (answers.primaryGoal === 'practice-anytime') {
    electronicScore += 4;
    reasons.push('The ability to sit down at 11pm, put on headphones, and play whenever you want drastically accelerates regular practice consistency.');
  } else if (answers.primaryGoal === 'band-live') {
    acousticScore += 4;
    reasons.push('Playing in a rehearsal room and gigging in clubs delivers maximum energy through an acoustic kit with organic cymbal wash and stage presence.');
  } else if (answers.primaryGoal === 'recording-home') {
    electronicScore += 3;
    reasons.push('Home recording with an e-kit gives you direct USB-MIDI multi-tracking without needing multiple microphones, audio interfaces, or acoustic room treatment.');
  } else {
    electronicScore += 2;
    acousticScore += 2;
    reasons.push('Versatility can be served by either format, with modern e-kits offering hybrid triggering opportunities.');
  }

  // 3. Budget
  if (answers.budgetTier === 'entry') {
    if (answers.livingEnvironment === 'apartment') {
      electronicScore += 2;
      reasons.push('For entry budgets in residential areas, an all-mesh electronic kit includes all sounds, metronome, and practice tools in one self-contained box.');
    } else {
      acousticScore += 1;
    }
  }

  if (electronicScore > acousticScore + 1) {
    return {
      recommendation: 'Electronic',
      confidence: Math.min(96, 75 + (electronicScore - acousticScore) * 4),
      headline: 'An Electronic Drum Kit is your optimal choice.',
      reasons,
      suggestedAction: 'Explore electronic kits featuring multi-zone mesh pads and USB-MIDI recording.'
    };
  } else if (acousticScore > electronicScore + 1) {
    return {
      recommendation: 'Acoustic',
      confidence: Math.min(94, 75 + (acousticScore - electronicScore) * 4),
      headline: 'An Acoustic Drum Kit is your optimal match.',
      reasons,
      suggestedAction: 'Explore classic 5-piece acoustic birch or maple kits and essential cymbal packs.'
    };
  } else {
    return {
      recommendation: 'Hybrid',
      confidence: 88,
      headline: 'A Hybrid Setup or Acoustic with Silent Mesh Heads fits best.',
      reasons: [
        ...reasons,
        'Your profile balances authentic physical feel with residential consideration. Many drummers choose an acoustic shell kit fitted with mesh silent heads and acoustic triggers, or an electronic kit with full-size wooden shells.'
      ],
      suggestedAction: 'Compare both formats or consider acoustic shells with dual mesh conversion heads.'
    };
  }
}
