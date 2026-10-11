export type ThemeMode = 'light' | 'dark' | 'system';

export type InstrumentCategory = 
  | 'all'
  | 'drum-kits'
  | 'snare-drums'
  | 'bass-drums'
  | 'toms'
  | 'cymbals'
  | 'world-percussion'
  | 'orchestral';

export interface Instrument {
  id: string;
  name: string;
  category: InstrumentCategory;
  categoryLabel: string;
  tagline: string;
  description: string;
  typicalSound: string;
  commonUses: string[];
  musicalStyles: string[];
  materials: string;
  imageUrl?: string;
  soundType: 'snare' | 'kick' | 'hihat' | 'tom' | 'crash' | 'ride' | 'cajon' | 'conga';
  tuningRange?: string;
  keyFeatures: string[];
}

export interface Lesson {
  id: string;
  pathId: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  description: string;
  learningObjectives: string[];
  instructions: string[];
  practiceTip: string;
  targetBpm: number;
  notationPattern?: {
    hihat: boolean[];
    snare: boolean[];
    kick: boolean[];
  };
}

export interface LearningPath {
  id: string;
  title: string;
  level: string;
  summary: string;
  lessons: Lesson[];
}

export interface Retailer {
  id: string;
  name: string;
  headquarters: string;
  regionsServed: string;
  description: string;
  officialUrl: string;
  specialties: string[];
  acousticKits: boolean;
  electronicKits: boolean;
  inStoreTesting: boolean;
  onlineDelivery: boolean;
  ratingScore: string;
  recommendedFor: string;
}

export interface ComparisonDimension {
  id: string;
  title: string;
  icon: string;
  acoustic: {
    rating: string;
    description: string;
    keyPoints: string[];
  };
  electronic: {
    rating: string;
    description: string;
    keyPoints: string[];
  };
}
