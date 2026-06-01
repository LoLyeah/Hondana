export type TestType = 'TPA' | 'TBI';

// ─── TPA Categories (Indonesian) ───
export type TPACategory =
  | 'verbal-sinonim'
  | 'verbal-antonim'
  | 'verbal-analogi'
  | 'verbal-bacaan'
  | 'numerik-deret'
  | 'numerik-aritmatika'
  | 'numerik-perbandingan'
  | 'numerik-cerita'
  | 'logika-penalaran'
  | 'logika-silogisme'
  | 'logika-analitis'
  | 'logika-diagram';

// ─── TBI Categories (TOEFL ITP-based, English) ───
export type TBICategory =
  | 'listening-short'
  | 'listening-long'
  | 'listening-talks'
  | 'structure-completion'
  | 'structure-error'
  | 'reading-comprehension'
  | 'reading-vocabulary';

export type Difficulty = 'mudah' | 'sedang' | 'sulit' | 'seimbang';

// For TPA figural/diagram questions
export interface FiguralData {
  type: 'pattern-series' | 'analogy' | 'odd-one-out' | 'rotation';
  figures: string[];   // SVG strings for the series / question diagrams
  options: string[];   // SVG strings for answer choices
}

// For TBI listening questions (text-based transcript)
export interface ListeningData {
  type: 'short-conversation' | 'long-conversation' | 'talk';
  transcript: string;  // Dialog/monologue transcript
  speaker?: string[];  // Speaker labels (e.g., ["Man", "Woman"])
}

export interface Question {
  id: string;
  testType: TestType;
  category: TPACategory | TBICategory;
  difficulty: Difficulty;
  question: string;
  options: string[];           // 5 options for both TBI (A–E) and TPA (A–E)
  correctAnswer: number;       // index of correct option
  explanation: string;
  timeLimit: number;           // seconds
  figural?: FiguralData;       // TPA diagram questions only
  listening?: ListeningData;   // TBI listening section only
  passage?: string;            // TBI reading / TPA bacaan passages
}

export type SessionMode = 'simulasi' | 'latihan';  // full exam sim vs category practice

export interface QuizSession {
  testType: TestType;
  mode: SessionMode;
  category: string | 'all';       // 'all' for simulasi, specific for latihan
  difficulty: Difficulty;
  questions: Question[];           // 60 for TPA simulasi, 50 for TBI simulasi
  currentIndex: number;
  answers: (number | null)[];
  timePerQuestion: number[];
  flagged: boolean[];
  startTime: number;
  isComplete: boolean;
}

export interface SavedSession {
  id: string;
  timestamp: number;
  testType: TestType;
  mode: SessionMode;
  category: string;
  difficulty?: Difficulty;
  questions: Question[];
  answers: (number | null)[];
  timePerQuestion: number[];
  flagged: boolean[];
  correctCount: number;
  totalQuestions: number;
  duration: number;
  accuracy: number;
}

// Scoring per BAPPENAS: benar = 1, salah/kosong = 0
export interface SessionResult {
  correct: number;
  wrong: number;
  skipped: number;
  total: number;
  score: number;               // = correct (no penalty)
  accuracy: number;            // correct / total * 100
  totalTime: number;
  avgTimePerQuestion: number;
}

export interface UserStats {
  totalCorrect: number;
  totalAnswered: number;
  sessionsCompleted: number;
  tpaStats: Record<TPACategory, { correct: number; total: number }>;
  tbiStats: Record<TBICategory, { correct: number; total: number }>;
}

export interface AppSettings {
  latihanCount: number;         // for Latihan mode: 10 | 20 | 30
  timerEnabled: boolean;
  useAI: boolean;
  soundEnabled: boolean;
  theme: 'light' | 'dark';
  aiProvider: 'built-in' | 'groq-custom' | 'openai-custom' | 'gemini-custom';
  customApiKey: string;
  aiModel: string;
  aiBaseUrl?: string;
}
