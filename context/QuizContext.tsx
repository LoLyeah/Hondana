'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';
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
import { useLocalStorage } from '../hooks/useLocalStorage';

interface SessionContextValue {
  session: QuizSession | null;
  loading: boolean;
  startSimulasi: (testType: TestType, useAI: boolean) => Promise<void>;
  startLatihan: (testType: TestType, category: string, count: number, useAI: boolean) => Promise<void>;
  submitAnswer: (answerIndex: number | null, timeSpent?: number) => void;
  skipQuestion: () => void;
  nextQuestion: () => void;
  toggleFlagQuestion: (index: number) => void;
  jumpToQuestion: (index: number) => void;
  endQuiz: () => SessionResult;
  quitQuiz: () => void;
  loadSavedSession: (saved: SavedSession) => void;
}

interface SettingsContextValue {
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
}

interface StatsContextValue {
  stats: UserStats;
  resetStats: () => void;
}

interface HistoryContextValue {
  history: SavedSession[];
  preGeneratedCache: Record<string, Question[]>;
  deleteSavedSession: (id: string) => void;
  preGenerateQuestions: (testType: TestType, category: string, count: number) => Promise<void>;
  clearPreGenerated: (key?: string) => void;
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined);
const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);
const StatsContext = createContext<StatsContextValue | undefined>(undefined);
const HistoryContext = createContext<HistoryContextValue | undefined>(undefined);

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
  const [session, setSession] = useLocalStorage<QuizSession | null>('hondana_active_session', null);
  
  // Ref for session state to prevent stale closures in async/callback functions
  const sessionRef = useRef(session);
  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  const [stats, setStats] = useLocalStorage<UserStats>('hondana_user_stats', initialStats);
  const statsRef = useRef(stats);
  useEffect(() => {
    statsRef.current = stats;
  }, [stats]);

  const [settings, setSettings] = useLocalStorage<AppSettings>('hondana_settings', initialSettings);
  const settingsRef = useRef(settings);
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useLocalStorage<SavedSession[]>('hondana_session_history', []);
  const historyRef = useRef(history);
  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  const [preGeneratedCache, setPreGeneratedCache] = useLocalStorage<Record<string, Question[]>>('hondana_pregen_cache', {});
  const preGeneratedCacheRef = useRef(preGeneratedCache);
  useEffect(() => {
    preGeneratedCacheRef.current = preGeneratedCache;
  }, [preGeneratedCache]);

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

  // Validate restored active session to prevent corrupt redirection crash loops
  useEffect(() => {
    if (session) {
      const isValid = 
        session &&
        typeof session === 'object' &&
        Array.isArray(session.questions) &&
        session.questions.length > 0 &&
        typeof session.currentIndex === 'number' &&
        Array.isArray(session.answers) &&
        session.answers.length === session.questions.length;
      
      if (!isValid) {
        console.warn('Deteksi data sesi kuis korup atau tidak valid. Melakukan auto-reset sesi.');
        setSession(null);
      }
    }
  }, [session]);

  // ─── Pre-Generate cache helpers ───
  const preGenerateQuestions = useCallback(async (
    testType: TestType,
    category: string,
    count: number
  ): Promise<void> => {
    const cacheKey = `${testType}:${category}`;
    const currentSettings = settingsRef.current;
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        testType,
        category,
        difficulty: 'seimbang',
        count,
        aiProvider: currentSettings.aiProvider,
        customApiKey: currentSettings.customApiKey,
        aiModel: currentSettings.aiModel
      })
    });
    if (!res.ok) throw new Error('Gagal generate soal AI');
    const data = await res.json();
    const newQuestions: Question[] = data.questions || [];
    setPreGeneratedCache((prev) => ({
      ...prev,
      [cacheKey]: [...(prev[cacheKey] || []), ...newQuestions]
    }));
  }, []);

  const clearPreGenerated = useCallback((key?: string) => {
    if (key) {
      setPreGeneratedCache((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    } else {
      setPreGeneratedCache({});
    }
  }, []);

  // Helper to fetch offline questions (drains pre-gen cache first) - dynamically imports banks
  const fetchOfflineQuestions = useCallback(async (
    testType: TestType,
    category: string | 'all',
    count: number
  ): Promise<Question[]> => {
    if (category !== 'all') {
      const cacheKey = `${testType}:${category}`;
      const cached = preGeneratedCacheRef.current[cacheKey] || [];
      if (cached.length >= count) {
        const taken = cached.slice(0, count);
        const remaining = cached.slice(count);
        setPreGeneratedCache((prev) => ({ ...prev, [cacheKey]: remaining }));
        return shuffleArray(taken);
      }
    }

    if (testType === 'TPA') {
      const { getTPAQuestions } = await import('../data/tpa-questions');
      const allTpa = getTPAQuestions();
      
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
        return shuffleArray(chosen);
      } else {
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
      const { getTBIQuestions } = await import('../data/tbi-questions');
      const allTbi = getTBIQuestions();
      
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
  }, []);

  const startSimulasi = useCallback(async (testType: TestType, useAI: boolean) => {
    setLoading(true);
    const count = testType === 'TPA' ? 60 : 50;
    
    try {
      let questions: Question[] = [];
      if (useAI) {
        const currentSettings = settingsRef.current;
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            testType,
            category: 'all',
            difficulty: 'seimbang',
            count,
            aiProvider: currentSettings.aiProvider,
            customApiKey: currentSettings.customApiKey,
            aiModel: currentSettings.aiModel
          })
        });
        
        if (res.ok) {
          const data = await res.json();
          questions = data.questions;
        } else {
          throw new Error('AI Generation failed, falling back to local bank');
        }
      } else {
        questions = await fetchOfflineQuestions(testType, 'all', count);
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
      const questions = await fetchOfflineQuestions(testType, 'all', count);
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
  }, [fetchOfflineQuestions]);

  const startLatihan = useCallback(async (
    testType: TestType,
    category: string,
    count: number,
    useAI: boolean
  ) => {
    setLoading(true);
    try {
      let questions: Question[] = [];
      if (useAI) {
        const currentSettings = settingsRef.current;
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            testType,
            category,
            difficulty: 'seimbang',
            count,
            aiProvider: currentSettings.aiProvider,
            customApiKey: currentSettings.customApiKey,
            aiModel: currentSettings.aiModel
          })
        });
        if (res.ok) {
          const data = await res.json();
          questions = data.questions;
        } else {
          throw new Error('AI Generation failed, falling back to local bank');
        }
      } else {
        questions = await fetchOfflineQuestions(testType, category, count);
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
      const questions = await fetchOfflineQuestions(testType, category, count);
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
  }, [fetchOfflineQuestions]);

  const submitAnswer = useCallback((answerIndex: number | null, timeSpent?: number) => {
    const currentSession = sessionRef.current;
    if (!currentSession || currentSession.isComplete) return;

    const currentIndex = currentSession.currentIndex;
    const currentQuestion = currentSession.questions[currentIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;

    const prevAnswer = currentSession.answers[currentIndex];
    const hasBeenAnswered = prevAnswer !== null;
    const wasCorrect = prevAnswer === currentQuestion.correctAnswer;

    // 1. Update the session state immutably
    setSession((prevSession) => {
      if (!prevSession) return null;
      const nextAnswers = [...prevSession.answers];
      nextAnswers[currentIndex] = answerIndex;

      const nextTimePerQuestion = [...prevSession.timePerQuestion];
      if (typeof timeSpent === 'number') {
        nextTimePerQuestion[currentIndex] = timeSpent;
      }

      return {
        ...prevSession,
        answers: nextAnswers,
        timePerQuestion: nextTimePerQuestion
      };
    });

    // 2. Update user stats
    setStats((prev) => {
      const currentStats = prev || initialStats;

      const tpaStats = { ...initialStats.tpaStats, ...currentStats.tpaStats };
      const tbiStats = { ...initialStats.tbiStats, ...currentStats.tbiStats };

      let correctDiff = 0;
      let answeredDiff = 0;

      if (!hasBeenAnswered) {
        answeredDiff = 1;
        if (isCorrect) {
          correctDiff = 1;
        }
      } else {
        if (wasCorrect && !isCorrect) {
          correctDiff = -1;
        } else if (!wasCorrect && isCorrect) {
          correctDiff = 1;
        }
      }

      if (currentSession.testType === 'TPA') {
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
  }, []);

  const skipQuestion = useCallback(() => {
    submitAnswer(null);
  }, [submitAnswer]);

  const nextQuestion = useCallback(() => {
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
  }, []);

  const toggleFlagQuestion = useCallback((index: number) => {
    setSession((prevSession) => {
      if (!prevSession) return null;
      const nextFlagged = prevSession.flagged ? [...prevSession.flagged] : Array(prevSession.questions.length).fill(false);
      nextFlagged[index] = !nextFlagged[index];
      return {
        ...prevSession,
        flagged: nextFlagged
      };
    });
  }, []);

  const jumpToQuestion = useCallback((index: number) => {
    setSession((prevSession) => {
      if (!prevSession) return null;
      if (index < 0 || index >= prevSession.questions.length) return prevSession;
      return {
        ...prevSession,
        currentIndex: index
      };
    });
  }, []);

  const endQuiz = useCallback((): SessionResult => {
    const currentSession = sessionRef.current;
    if (!currentSession) {
      return { correct: 0, wrong: 0, skipped: 0, total: 0, score: 0, accuracy: 0, totalTime: 0, avgTimePerQuestion: 0 };
    }

    let correct = 0;
    let wrong = 0;
    let skipped = 0;

    currentSession.answers.forEach((ans, idx) => {
      if (ans === null) {
        skipped++;
      } else if (ans === currentSession.questions[idx].correctAnswer) {
        correct++;
      } else {
        wrong++;
      }
    });

    const total = currentSession.questions.length;
    const score = correct;
    const accuracy = total > 0 ? (correct / total) * 100 : 0;
    const totalTime = Math.floor((Date.now() - currentSession.startTime) / 1000);
    const avgTimePerQuestion = total > 0 ? totalTime / total : 0;
    
    if (!currentSession.isComplete) {
      setStats((prev) => {
        return {
          ...prev,
          sessionsCompleted: (prev?.sessionsCompleted || 0) + 1
        };
      });

      const newSavedSession: SavedSession = {
        id: `session-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        timestamp: Date.now(),
        testType: currentSession.testType,
        mode: currentSession.mode,
        category: currentSession.category,
        difficulty: currentSession.difficulty,
        questions: currentSession.questions,
        answers: currentSession.answers,
        timePerQuestion: currentSession.timePerQuestion,
        flagged: currentSession.flagged || Array(total).fill(false),
        correctCount: correct,
        totalQuestions: total,
        duration: totalTime,
        accuracy: accuracy
      };

      // Keep only the last 20 sessions in history
      setHistory((prev) => [newSavedSession, ...prev].slice(0, 20));
    }

    setSession({
      ...currentSession,
      isComplete: true,
      duration: totalTime
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
  }, []);

  const loadSavedSession = useCallback((saved: SavedSession) => {
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
      startTime: Date.now() - (saved.duration * 1000),
      isComplete: true,
      duration: saved.duration
    });
  }, []);

  const deleteSavedSession = useCallback((id: string) => {
    setHistory((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const quitQuiz = useCallback(() => {
    setSession(null);
  }, []);

  const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const resetStats = useCallback(() => {
    setStats(initialStats);
  }, []);

  const sessionValue = useMemo(() => ({
    session,
    loading,
    startSimulasi,
    startLatihan,
    submitAnswer,
    skipQuestion,
    nextQuestion,
    toggleFlagQuestion,
    jumpToQuestion,
    endQuiz,
    quitQuiz,
    loadSavedSession
  }), [session, loading, startSimulasi, startLatihan, submitAnswer, skipQuestion, nextQuestion, toggleFlagQuestion, jumpToQuestion, endQuiz, quitQuiz, loadSavedSession]);

  const settingsValue = useMemo(() => ({
    settings,
    updateSettings
  }), [settings, updateSettings]);

  const statsValue = useMemo(() => ({
    stats,
    resetStats
  }), [stats, resetStats]);

  const historyValue = useMemo(() => ({
    history,
    preGeneratedCache,
    deleteSavedSession,
    preGenerateQuestions,
    clearPreGenerated
  }), [history, preGeneratedCache, deleteSavedSession, preGenerateQuestions, clearPreGenerated]);

  return (
    <SettingsContext.Provider value={settingsValue}>
      <StatsContext.Provider value={statsValue}>
        <HistoryContext.Provider value={historyValue}>
          <SessionContext.Provider value={sessionValue}>
            {children}
          </SessionContext.Provider>
        </HistoryContext.Provider>
      </StatsContext.Provider>
    </SettingsContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a QuizProvider');
  }
  return context;
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a QuizProvider');
  }
  return context;
}

export function useStats() {
  const context = useContext(StatsContext);
  if (context === undefined) {
    throw new Error('useStats must be used within a QuizProvider');
  }
  return context;
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a QuizProvider');
  }
  return context;
}

export function useQuiz() {
  const session = useContext(SessionContext);
  const settings = useContext(SettingsContext);
  const stats = useContext(StatsContext);
  const history = useContext(HistoryContext);

  if (!session || !settings || !stats || !history) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }

  return {
    ...session,
    ...settings,
    ...stats,
    ...history
  };
}
