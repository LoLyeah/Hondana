'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  TestType,
  TPACategory,
  TBICategory,
  Difficulty,
  Question,
  QuizSession,
  SessionResult,
  UserStats,
  AppSettings,
  SessionMode
} from '../lib/types';
import { getTPAQuestions } from '../data/tpa-questions';
import { getTBIQuestions } from '../data/tbi-questions';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface QuizContextValue {
  session: QuizSession | null;
  stats: UserStats;
  settings: AppSettings;
  loading: boolean;
  xpPopup: number | null;
  showLevelUp: boolean;
  oldLevel: number;
  
  startSimulasi: (testType: TestType, difficulty: Difficulty, useAI: boolean) => Promise<void>;
  startLatihan: (testType: TestType, category: string, difficulty: Difficulty, count: number, useAI: boolean) => Promise<void>;
  submitAnswer: (answerIndex: number | null) => void;
  skipQuestion: () => void;
  nextQuestion: () => void;
  endQuiz: () => SessionResult;
  quitQuiz: () => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  resetStats: () => void;
  dismissLevelUp: () => void;
}

const QuizContext = createContext<QuizContextValue | undefined>(undefined);

const initialStats: UserStats = {
  totalXP: 0,
  level: 1,
  bestStreak: 0,
  currentStreak: 0,
  totalCorrect: 0,
  totalAnswered: 0,
  sessionsCompleted: 0,
  tpaStats: {
    'verbal-sinonim': { correct: 0, total: 0 },
    'verbal-antonim': { correct: 0, total: 0 },
    'verbal-analogi': { correct: 0, total: 0 },
    'verbal-bacaan': { correct: 0, total: 0 },
    'numerik-deret': { correct: 0, total: 0 },
    'numerik-aritmatika': { correct: 0, total: 0 },
    'numerik-perbandingan': { correct: 0, total: 0 },
    'numerik-cerita': { correct: 0, total: 0 },
    'logika-penalaran': { correct: 0, total: 0 },
    'logika-silogisme': { correct: 0, total: 0 },
    'logika-analitis': { correct: 0, total: 0 },
    'logika-diagram': { correct: 0, total: 0 }
  },
  tbiStats: {
    'listening-short': { correct: 0, total: 0 },
    'listening-long': { correct: 0, total: 0 },
    'listening-talks': { correct: 0, total: 0 },
    'structure-completion': { correct: 0, total: 0 },
    'structure-error': { correct: 0, total: 0 },
    'reading-comprehension': { correct: 0, total: 0 },
    'reading-vocabulary': { correct: 0, total: 0 }
  }
};

const initialSettings: AppSettings = {
  latihanCount: 10,
  timerEnabled: true,
  useAI: false,
  soundEnabled: true
};

// Shuffle helper
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<QuizSession | null>(null);
  const [stats, setStats] = useLocalStorage<UserStats>('hondana_user_stats', initialStats);
  const [settings, setSettings] = useLocalStorage<AppSettings>('hondana_settings', initialSettings);
  const [loading, setLoading] = useState(false);
  const [xpPopup, setXpPopup] = useState<number | null>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [oldLevel, setOldLevel] = useState(1);

  // Helper to fetch offline questions
  const fetchOfflineQuestions = (
    testType: TestType,
    category: string | 'all',
    difficulty: Difficulty,
    count: number
  ): Question[] => {
    if (testType === 'TPA') {
      const allTpa = getTPAQuestions();
      // If Simulasi, pick 5 random per each of 12 categories
      if (category === 'all') {
        const categories: TPACategory[] = [
          'verbal-sinonim', 'verbal-antonim', 'verbal-analogi', 'verbal-bacaan',
          'numerik-deret', 'numerik-aritmatika', 'numerik-perbandingan', 'numerik-cerita',
          'logika-penalaran', 'logika-silogisme', 'logika-analitis', 'logika-diagram'
        ];
        let chosen: Question[] = [];
        categories.forEach((cat) => {
          const matching = allTpa.filter((q) => q.category === cat && q.difficulty === difficulty);
          const shuffled = shuffleArray(matching);
          chosen = [...chosen, ...shuffled.slice(0, 5)];
        });
        return shuffleArray(chosen); // Final shuffle of balanced exam
      } else {
        // Latihan mode: pick count from single category
        const matching = allTpa.filter((q) => q.category === category && q.difficulty === difficulty);
        return shuffleArray(matching).slice(0, count);
      }
    } else {
      const allTbi = getTBIQuestions();
      // If Simulasi, pick balanced 50 questions per TOEFL structure:
      // Short: 7, Long: 5, Talks: 5, Sentence: 8, Error: 8, Passage: 12, Vocab: 5 = 50 total
      if (category === 'all') {
        const spec: { sub: TBICategory; qty: number }[] = [
          { sub: 'listening-short', qty: 7 },
          { sub: 'listening-long', qty: 5 },
          { sub: 'listening-talks', qty: 5 },
          { sub: 'structure-completion', qty: 8 },
          { sub: 'structure-error', qty: 8 },
          { sub: 'reading-comprehension', qty: 12 },
          { sub: 'reading-vocabulary', qty: 5 }
        ];
        let chosen: Question[] = [];
        spec.forEach(({ sub, qty }) => {
          const matching = allTbi.filter((q) => q.category === sub && q.difficulty === difficulty);
          const shuffled = shuffleArray(matching);
          chosen = [...chosen, ...shuffled.slice(0, qty)];
        });
        return shuffleArray(chosen);
      } else {
        // Latihan mode: pick count from specific section
        const matching = allTbi.filter((q) => q.category === category && q.difficulty === difficulty);
        return shuffleArray(matching).slice(0, count);
      }
    }
  };

  const startSimulasi = async (testType: TestType, difficulty: Difficulty, useAI: boolean) => {
    setLoading(true);
    const count = testType === 'TPA' ? 60 : 50;
    
    try {
      let questions: Question[] = [];
      if (useAI) {
        // AI Call via internal route
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ testType, category: 'all', difficulty, count })
        });
        
        if (res.ok) {
          const data = await res.json();
          questions = data.questions;
        } else {
          throw new Error('AI Generation failed, falling back to local bank');
        }
      } else {
        questions = fetchOfflineQuestions(testType, 'all', difficulty, count);
      }
      
      setSession({
        testType,
        mode: 'simulasi',
        category: 'all',
        difficulty,
        questions,
        currentIndex: 0,
        answers: Array(questions.length).fill(null),
        timePerQuestion: Array(questions.length).fill(0),
        startTime: Date.now(),
        isComplete: false
      });
    } catch (e) {
      console.warn(e);
      // Fallback
      const questions = fetchOfflineQuestions(testType, 'all', difficulty, count);
      setSession({
        testType,
        mode: 'simulasi',
        category: 'all',
        difficulty,
        questions,
        currentIndex: 0,
        answers: Array(questions.length).fill(null),
        timePerQuestion: Array(questions.length).fill(0),
        startTime: Date.now(),
        isComplete: false
      });
    } finally {
      setLoading(false);
    }
  };

  const startLatihan = async (
    testType: TestType,
    category: string,
    difficulty: Difficulty,
    count: number,
    useAI: boolean
  ) => {
    setLoading(true);
    try {
      let questions: Question[] = [];
      if (useAI) {
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ testType, category, difficulty, count })
        });
        if (res.ok) {
          const data = await res.json();
          questions = data.questions;
        } else {
          throw new Error('AI Generation failed, falling back to local bank');
        }
      } else {
        questions = fetchOfflineQuestions(testType, category, difficulty, count);
      }
      
      setSession({
        testType,
        mode: 'latihan',
        category,
        difficulty,
        questions,
        currentIndex: 0,
        answers: Array(questions.length).fill(null),
        timePerQuestion: Array(questions.length).fill(0),
        startTime: Date.now(),
        isComplete: false
      });
    } catch (e) {
      console.warn(e);
      const questions = fetchOfflineQuestions(testType, category, difficulty, count);
      setSession({
        testType,
        mode: 'latihan',
        category,
        difficulty,
        questions,
        currentIndex: 0,
        answers: Array(questions.length).fill(null),
        timePerQuestion: Array(questions.length).fill(0),
        startTime: Date.now(),
        isComplete: false
      });
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = (answerIndex: number | null) => {
    if (!session || session.isComplete) return;

    const currentIndex = session.currentIndex;
    const currentQuestion = session.questions[currentIndex];
    
    // Update session answers
    const nextAnswers = [...session.answers];
    nextAnswers[currentIndex] = answerIndex;

    const isCorrect = answerIndex === currentQuestion.correctAnswer;

    // Calculate XP
    let xpGained = 0;
    if (isCorrect) {
      const difficultyXP = session.difficulty === 'mudah' ? 10 : session.difficulty === 'sedang' ? 20 : 30;
      xpGained += difficultyXP;

      // Streak logic
      const newStreak = stats.currentStreak + 1;
      const streakBonus = Math.floor(newStreak / 3) * 5; // +5 per 3 consecutive correct
      xpGained += streakBonus;

      setXpPopup(xpGained);
      setTimeout(() => setXpPopup(null), 1500);

      // Trigger stats update
      setStats((prev) => {
        const nextStreak = prev.currentStreak + 1;
        const nextBest = Math.max(prev.bestStreak, nextStreak);
        const nextXP = prev.totalXP + xpGained;
        
        // Level up formula: every 500 XP = 1 Level
        const nextLevel = Math.floor(nextXP / 500) + 1;
        if (nextLevel > prev.level) {
          setOldLevel(prev.level);
          setShowLevelUp(true);
        }

        // Update category-specific stats
        const tpaStats = { ...prev.tpaStats };
        const tbiStats = { ...prev.tbiStats };

        if (session.testType === 'TPA') {
          const cat = currentQuestion.category as TPACategory;
          tpaStats[cat] = {
            correct: tpaStats[cat].correct + 1,
            total: tpaStats[cat].total + 1
          };
        } else {
          const cat = currentQuestion.category as TBICategory;
          tbiStats[cat] = {
            correct: tbiStats[cat].correct + 1,
            total: tbiStats[cat].total + 1
          };
        }

        return {
          ...prev,
          totalXP: nextXP,
          level: nextLevel,
          currentStreak: nextStreak,
          bestStreak: nextBest,
          totalCorrect: prev.totalCorrect + 1,
          totalAnswered: prev.totalAnswered + 1,
          tpaStats,
          tbiStats
        };
      });
    } else {
      // Wrong or skipped
      setStats((prev) => {
        const tpaStats = { ...prev.tpaStats };
        const tbiStats = { ...prev.tbiStats };

        if (session.testType === 'TPA') {
          const cat = currentQuestion.category as TPACategory;
          tpaStats[cat] = {
            ...tpaStats[cat],
            total: tpaStats[cat].total + 1
          };
        } else {
          const cat = currentQuestion.category as TBICategory;
          tbiStats[cat] = {
            ...tbiStats[cat],
            total: tbiStats[cat].total + 1
          };
        }

        return {
          ...prev,
          currentStreak: 0,
          totalAnswered: prev.totalAnswered + 1,
          tpaStats,
          tbiStats
        };
      });
    }

    setSession({
      ...session,
      answers: nextAnswers
    });
  };

  const skipQuestion = () => {
    submitAnswer(null);
  };

  const nextQuestion = () => {
    if (!session) return;
    const nextIndex = session.currentIndex + 1;
    if (nextIndex >= session.questions.length) {
      endQuiz();
    } else {
      setSession({
        ...session,
        currentIndex: nextIndex
      });
    }
  };

  const endQuiz = (): SessionResult => {
    if (!session) {
      return { correct: 0, wrong: 0, skipped: 0, total: 0, score: 0, accuracy: 0, totalTime: 0, avgTimePerQuestion: 0, xpEarned: 0 };
    }

    let correct = 0;
    let wrong = 0;
    let skipped = 0;

    session.answers.forEach((ans, idx) => {
      if (ans === null) {
        skipped++;
      } else if (ans === session.questions[idx].correctAnswer) {
        correct++;
      } else {
        wrong++;
      }
    });

    const total = session.questions.length;
    const score = correct; // No penalty scoring per BAPPENAS
    const accuracy = total > 0 ? (correct / total) * 100 : 0;
    const totalTime = Math.floor((Date.now() - session.startTime) / 1000);
    const avgTimePerQuestion = total > 0 ? totalTime / total : 0;
    
    // Final session finish XP bonus
    const finishBonus = 50;
    setStats((prev) => {
      const nextXP = prev.totalXP + finishBonus;
      const nextLevel = Math.floor(nextXP / 500) + 1;
      if (nextLevel > prev.level) {
        setOldLevel(prev.level);
        setShowLevelUp(true);
      }
      return {
        ...prev,
        totalXP: nextXP,
        level: nextLevel,
        sessionsCompleted: prev.sessionsCompleted + 1
      };
    });

    setSession({
      ...session,
      isComplete: true
    });

    return {
      correct,
      wrong,
      skipped,
      total,
      score,
      accuracy,
      totalTime,
      avgTimePerQuestion,
      xpEarned: finishBonus
    };
  };

  const quitQuiz = () => {
    setSession(null);
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetStats = () => {
    setStats(initialStats);
  };

  const dismissLevelUp = () => {
    setShowLevelUp(false);
  };

  return (
    <QuizContext.Provider
      value={{
        session,
        stats,
        settings,
        loading,
        xpPopup,
        showLevelUp,
        oldLevel,
        startSimulasi,
        startLatihan,
        submitAnswer,
        skipQuestion,
        nextQuestion,
        endQuiz,
        quitQuiz,
        updateSettings,
        resetStats,
        dismissLevelUp
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
