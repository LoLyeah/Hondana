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
  SessionMode,
  SavedSession
} from '../lib/types';
import { getTPAQuestions } from '../data/tpa-questions';
import { getTBIQuestions } from '../data/tbi-questions';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface QuizContextValue {
  session: QuizSession | null;
  stats: UserStats;
  settings: AppSettings;
  loading: boolean;
  history: SavedSession[];
  
  startSimulasi: (testType: TestType, useAI: boolean) => Promise<void>;
  startLatihan: (testType: TestType, category: string, count: number, useAI: boolean) => Promise<void>;
  submitAnswer: (answerIndex: number | null, timeSpent?: number) => void;
  skipQuestion: () => void;
  nextQuestion: () => void;
  toggleFlagQuestion: (index: number) => void;
  jumpToQuestion: (index: number) => void;
  endQuiz: () => SessionResult;
  quitQuiz: () => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  resetStats: () => void;
  loadSavedSession: (saved: SavedSession) => void;
  deleteSavedSession: (id: string) => void;
}

const QuizContext = createContext<QuizContextValue | undefined>(undefined);

const initialStats: UserStats = {
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
  soundEnabled: true,
  theme: 'dark',
  aiProvider: 'built-in',
  customApiKey: '',
  aiModel: 'llama-3.1-8b-instant',
  aiBaseUrl: ''
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
  const [history, setHistory] = useLocalStorage<SavedSession[]>('hondana_session_history', []);

  // Sync Theme preference with Document root
  useEffect(() => {
    const root = window.document.documentElement;
    if (settings.theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
    }
  }, [settings.theme]);

  // Helper to fetch offline questions
  const fetchOfflineQuestions = (
    testType: TestType,
    category: string | 'all',
    count: number
  ): Question[] => {
    if (testType === 'TPA') {
      const allTpa = getTPAQuestions();
      // If Simulasi, pick 5 random per each of 12 categories (balanced difficulty: 2 mudah, 1 sedang, 2 sulit)
      if (category === 'all') {
        const categories: TPACategory[] = [
          'verbal-sinonim', 'verbal-antonim', 'verbal-analogi', 'verbal-bacaan',
          'numerik-deret', 'numerik-aritmatika', 'numerik-perbandingan', 'numerik-cerita',
          'logika-penalaran', 'logika-silogisme', 'logika-analitis', 'logika-diagram'
        ];
        let chosen: Question[] = [];
        categories.forEach((cat) => {
          const matching = allTpa.filter((q) => q.category === cat);
          const mudah = matching.filter(q => q.difficulty === 'mudah');
          const sedang = matching.filter(q => q.difficulty === 'sedang');
          const sulit = matching.filter(q => q.difficulty === 'sulit');
          
          let catChosen = [
            ...shuffleArray(mudah).slice(0, 2),
            ...shuffleArray(sedang).slice(0, 1),
            ...shuffleArray(sulit).slice(0, 2)
          ];
          
          if (catChosen.length < 5) {
            const remaining = matching.filter(q => !catChosen.some(x => x.id === q.id));
            catChosen = [...catChosen, ...shuffleArray(remaining).slice(0, 5 - catChosen.length)];
          }
          chosen = [...chosen, ...catChosen];
        });
        return shuffleArray(chosen); // Final shuffle of balanced exam
      } else {
        // Latihan mode: pick count from single category with balanced mix (40% mudah, 20% sedang, 40% sulit)
        const matching = allTpa.filter((q) => q.category === category);
        const mudah = matching.filter(q => q.difficulty === 'mudah');
        const sedang = matching.filter(q => q.difficulty === 'sedang');
        const sulit = matching.filter(q => q.difficulty === 'sulit');

        const targetMudah = Math.floor(count * 0.4);
        const targetSedang = Math.floor(count * 0.2);
        const targetSulit = count - targetMudah - targetSedang;

        let chosen = [
          ...shuffleArray(mudah).slice(0, targetMudah),
          ...shuffleArray(sedang).slice(0, targetSedang),
          ...shuffleArray(sulit).slice(0, targetSulit)
        ];

        if (chosen.length < count) {
          const remaining = matching.filter(q => !chosen.some(x => x.id === q.id));
          chosen = [...chosen, ...shuffleArray(remaining).slice(0, count - chosen.length)];
        }
        return shuffleArray(chosen);
      }
    } else {
      const allTbi = getTBIQuestions();
      // If Simulasi, pick all 40 structure questions and 10 reading questions to form the 50-question exam
      if (category === 'all') {
        const spec: { sub: TBICategory; qty: number; targetMudah: number; targetSedang: number; targetSulit: number }[] = [
          { sub: 'structure-completion', qty: 40, targetMudah: 16, targetSedang: 8, targetSulit: 16 },
          { sub: 'reading-comprehension', qty: 10, targetMudah: 4, targetSedang: 2, targetSulit: 4 }
        ];
        let chosen: Question[] = [];
        spec.forEach(({ sub, qty, targetMudah, targetSedang, targetSulit }) => {
          const matching = allTbi.filter((q) => q.category === sub);
          const mudah = matching.filter(q => q.difficulty === 'mudah');
          const sedang = matching.filter(q => q.difficulty === 'sedang');
          const sulit = matching.filter(q => q.difficulty === 'sulit');

          let subChosen = [
            ...shuffleArray(mudah).slice(0, targetMudah),
            ...shuffleArray(sedang).slice(0, targetSedang),
            ...shuffleArray(sulit).slice(0, targetSulit)
          ];

          if (subChosen.length < qty) {
            const remaining = matching.filter(q => !subChosen.some(x => x.id === q.id));
            subChosen = [...subChosen, ...shuffleArray(remaining).slice(0, qty - subChosen.length)];
          }
          chosen = [...chosen, ...subChosen];
        });
        return shuffleArray(chosen);
      } else {
        // Latihan mode: pick count from specific section with balanced mix (40% mudah, 20% sedang, 40% sulit)
        const matching = allTbi.filter((q) => q.category === category);
        const mudah = matching.filter(q => q.difficulty === 'mudah');
        const sedang = matching.filter(q => q.difficulty === 'sedang');
        const sulit = matching.filter(q => q.difficulty === 'sulit');

        const targetMudah = Math.floor(count * 0.4);
        const targetSedang = Math.floor(count * 0.2);
        const targetSulit = count - targetMudah - targetSedang;

        let chosen = [
          ...shuffleArray(mudah).slice(0, targetMudah),
          ...shuffleArray(sedang).slice(0, targetSedang),
          ...shuffleArray(sulit).slice(0, targetSulit)
        ];

        if (chosen.length < count) {
          const remaining = matching.filter(q => !chosen.some(x => x.id === q.id));
          chosen = [...chosen, ...shuffleArray(remaining).slice(0, count - chosen.length)];
        }
        return shuffleArray(chosen);
      }
    }
  };

  const startSimulasi = async (testType: TestType, useAI: boolean) => {
    setLoading(true);
    const count = testType === 'TPA' ? 60 : 50;
    
    try {
      let questions: Question[] = [];
      if (useAI) {
        // AI Call via internal route
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            testType,
            category: 'all',
            difficulty: 'seimbang',
            count,
            aiProvider: settings.aiProvider,
            customApiKey: settings.customApiKey,
            aiModel: settings.aiModel
          })
        });
        
        if (res.ok) {
          const data = await res.json();
          questions = data.questions;
        } else {
          throw new Error('AI Generation failed, falling back to local bank');
        }
      } else {
        questions = fetchOfflineQuestions(testType, 'all', count);
      }
      
      setSession({
        testType,
        mode: 'simulasi',
        category: 'all',
        difficulty: 'seimbang',
        questions,
        currentIndex: 0,
        answers: Array(questions.length).fill(null),
        timePerQuestion: Array(questions.length).fill(0),
        flagged: Array(questions.length).fill(false),
        startTime: Date.now(),
        isComplete: false
      });
    } catch (e) {
      console.warn(e);
      // Fallback
      const questions = fetchOfflineQuestions(testType, 'all', count);
      setSession({
        testType,
        mode: 'simulasi',
        category: 'all',
        difficulty: 'seimbang',
        questions,
        currentIndex: 0,
        answers: Array(questions.length).fill(null),
        timePerQuestion: Array(questions.length).fill(0),
        flagged: Array(questions.length).fill(false),
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
          body: JSON.stringify({
            testType,
            category,
            difficulty: 'seimbang',
            count,
            aiProvider: settings.aiProvider,
            customApiKey: settings.customApiKey,
            aiModel: settings.aiModel
          })
        });
        if (res.ok) {
          const data = await res.json();
          questions = data.questions;
        } else {
          throw new Error('AI Generation failed, falling back to local bank');
        }
      } else {
        questions = fetchOfflineQuestions(testType, category, count);
      }
      
      setSession({
        testType,
        mode: 'latihan',
        category,
        difficulty: 'seimbang',
        questions,
        currentIndex: 0,
        answers: Array(questions.length).fill(null),
        timePerQuestion: Array(questions.length).fill(0),
        flagged: Array(questions.length).fill(false),
        startTime: Date.now(),
        isComplete: false
      });
    } catch (e) {
      console.warn(e);
      const questions = fetchOfflineQuestions(testType, category, count);
      setSession({
        testType,
        mode: 'latihan',
        category,
        difficulty: 'seimbang',
        questions,
        currentIndex: 0,
        answers: Array(questions.length).fill(null),
        timePerQuestion: Array(questions.length).fill(0),
        flagged: Array(questions.length).fill(false),
        startTime: Date.now(),
        isComplete: false
      });
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = (answerIndex: number | null, timeSpent?: number) => {
    if (!session || session.isComplete) return;

    const currentIndex = session.currentIndex;
    const currentQuestion = session.questions[currentIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;

    const prevAnswer = session.answers[currentIndex];
    const hasBeenAnswered = prevAnswer !== null;
    const wasCorrect = prevAnswer === currentQuestion.correctAnswer;

    // 1. Update the session state immutably
    const nextAnswers = [...session.answers];
    nextAnswers[currentIndex] = answerIndex;

    const nextTimePerQuestion = [...session.timePerQuestion];
    if (typeof timeSpent === 'number') {
      nextTimePerQuestion[currentIndex] = timeSpent;
    }

    setSession({
      ...session,
      answers: nextAnswers,
      timePerQuestion: nextTimePerQuestion
    });

    // 2. Update user stats outside session state updater
    setStats((prev) => {
      const currentStats = prev || initialStats;

      // Update category-specific stats safely
      const tpaStats = { ...initialStats.tpaStats, ...currentStats.tpaStats };
      const tbiStats = { ...initialStats.tbiStats, ...currentStats.tbiStats };

      let correctDiff = 0;
      let answeredDiff = 0;

      if (!hasBeenAnswered) {
        // First time answering this question in the session
        answeredDiff = 1;
        if (isCorrect) {
          correctDiff = 1;
        }
      } else {
        // Recorrecting an already answered question
        if (wasCorrect && !isCorrect) {
          correctDiff = -1;
        } else if (!wasCorrect && isCorrect) {
          correctDiff = 1;
        }
      }

      if (session.testType === 'TPA') {
        const cat = currentQuestion.category as TPACategory;
        if (tpaStats[cat]) {
          tpaStats[cat] = {
            correct: Math.max(0, (tpaStats[cat].correct || 0) + correctDiff),
            total: (tpaStats[cat].total || 0) + answeredDiff
          };
        }
      } else {
        const cat = currentQuestion.category as TBICategory;
        if (tbiStats[cat]) {
          tbiStats[cat] = {
            correct: Math.max(0, (tbiStats[cat].correct || 0) + correctDiff),
            total: (tbiStats[cat].total || 0) + answeredDiff
          };
        }
      }

      return {
        ...currentStats,
        totalCorrect: Math.max(0, (currentStats.totalCorrect || 0) + correctDiff),
        totalAnswered: (currentStats.totalAnswered || 0) + answeredDiff,
        tpaStats,
        tbiStats
      };
    });
  };

  const skipQuestion = () => {
    submitAnswer(null);
  };

  const nextQuestion = () => {
    setSession((prevSession) => {
      if (!prevSession) return null;
      const nextIndex = prevSession.currentIndex + 1;
      if (nextIndex >= prevSession.questions.length) {
        return prevSession;
      }
      return {
        ...prevSession,
        currentIndex: nextIndex
      };
    });
  };

  const toggleFlagQuestion = (index: number) => {
    setSession((prevSession) => {
      if (!prevSession) return null;
      const nextFlagged = prevSession.flagged ? [...prevSession.flagged] : Array(prevSession.questions.length).fill(false);
      nextFlagged[index] = !nextFlagged[index];
      return {
        ...prevSession,
        flagged: nextFlagged
      };
    });
  };

  const jumpToQuestion = (index: number) => {
    setSession((prevSession) => {
      if (!prevSession) return null;
      if (index < 0 || index >= prevSession.questions.length) return prevSession;
      return {
        ...prevSession,
        currentIndex: index
      };
    });
  };

  const endQuiz = (): SessionResult => {
    if (!session) {
      return { correct: 0, wrong: 0, skipped: 0, total: 0, score: 0, accuracy: 0, totalTime: 0, avgTimePerQuestion: 0 };
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
    
    // Save to history and update stats only if this is a newly completed session (not loaded from history)
    if (!session.isComplete) {
      setStats((prev) => {
        return {
          ...prev,
          sessionsCompleted: (prev?.sessionsCompleted || 0) + 1
        };
      });

      const newSavedSession: SavedSession = {
        id: `session-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        timestamp: Date.now(),
        testType: session.testType,
        mode: session.mode,
        category: session.category,
        difficulty: session.difficulty,
        questions: session.questions,
        answers: session.answers,
        timePerQuestion: session.timePerQuestion,
        flagged: session.flagged || Array(total).fill(false),
        correctCount: correct,
        totalQuestions: total,
        duration: totalTime,
        accuracy: accuracy
      };

      setHistory((prev) => [newSavedSession, ...prev]);
    }

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
      avgTimePerQuestion
    };
  };

  const loadSavedSession = (saved: SavedSession) => {
    setSession({
      testType: saved.testType,
      mode: saved.mode,
      category: saved.category,
      difficulty: saved.difficulty || 'seimbang',
      questions: saved.questions,
      currentIndex: 0,
      answers: saved.answers,
      timePerQuestion: saved.timePerQuestion,
      flagged: saved.flagged || Array(saved.questions.length).fill(false),
      startTime: Date.now() - (saved.duration * 1000), // mock starting time based on saved duration
      isComplete: true
    });
  };

  const deleteSavedSession = (id: string) => {
    setHistory((prev) => prev.filter((s) => s.id !== id));
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

  return (
    <QuizContext.Provider
      value={{
        session,
        stats,
        settings,
        loading,
        history,
        startSimulasi,
        startLatihan,
        submitAnswer,
        skipQuestion,
        nextQuestion,
        toggleFlagQuestion,
        jumpToQuestion,
        endQuiz,
        quitQuiz,
        updateSettings,
        resetStats,
        loadSavedSession,
        deleteSavedSession
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
