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
import { checkBadgeUnlocks } from '../lib/badges';

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
  seenQuestionIds: string[];
  resetSeenQuestions: () => void;
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
  },
  unlockedBadges: []
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

// Helper to save generated AI questions to the offline bank in localStorage
function saveQuestionsToOfflineBank(testType: TestType, newQs: Question[]) {
  if (typeof window === 'undefined' || newQs.length === 0) return;
  try {
    const key = testType === 'TPA' ? 'hondana_custom_offline_tpa' : 'hondana_custom_offline_tbi';
    const existingStr = localStorage.getItem(key);
    const existing: Question[] = existingStr ? JSON.parse(existingStr) : [];
    
    const merged = [...existing];
    newQs.forEach((q) => {
      if (!merged.some((existingQ) => existingQ.id === q.id)) {
        merged.push(q);
      }
    });
    
    localStorage.setItem(key, JSON.stringify(merged));
  } catch (e) {
    console.error('Failed to save questions to custom offline bank:', e);
  }
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

  const [seenQuestionIds, setSeenQuestionIds] = useLocalStorage<string[]>('hondana_seen_question_ids', []);
  const seenQuestionIdsRef = useRef(seenQuestionIds);
  useEffect(() => {
    seenQuestionIdsRef.current = seenQuestionIds;
  }, [seenQuestionIds]);

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
    if (newQuestions.length > 0) {
      saveQuestionsToOfflineBank(testType, newQuestions);
    }
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
    const getCategorized = (pool: Question[], targetCount: number) => {
      const unseen = pool.filter(q => !seenQuestionIdsRef.current.includes(q.id));
      const seen = pool.filter(q => seenQuestionIdsRef.current.includes(q.id));
      
      let chosen = shuffleArray(unseen).slice(0, targetCount);
      if (chosen.length < targetCount) {
        const needed = targetCount - chosen.length;
        chosen = [...chosen, ...shuffleArray(seen).slice(0, needed)];
      }
      return chosen;
    };

    if (category !== 'all') {
      const cacheKey = `${testType}:${category}`;
      const cached = preGeneratedCacheRef.current[cacheKey] || [];
      
      let cachedTaken: Question[] = [];
      if (cached.length > 0) {
        const takeCount = Math.min(count, cached.length);
        cachedTaken = cached.slice(0, takeCount);
        const remaining = cached.slice(takeCount);
        setPreGeneratedCache((prev) => ({ ...prev, [cacheKey]: remaining }));
        
        if (cachedTaken.length === count) {
          return shuffleArray(cachedTaken);
        }
      }

      const neededCount = count - cachedTaken.length;
      let offlinePool: Question[] = [];
      if (testType === 'TPA') {
        const { getTPAQuestions } = await import('../data/tpa-questions');
        offlinePool = getTPAQuestions().filter((q) => q.category === category);
      } else {
        const { getTBIQuestions } = await import('../data/tbi-questions');
        offlinePool = getTBIQuestions().filter((q) => q.category === category);
      }

      const takenIds = cachedTaken.map(q => q.id);
      const filteredOfflinePool = offlinePool.filter(q => !takenIds.includes(q.id));

      const targetMudah = Math.floor(neededCount * 0.4);
      const targetSedang = Math.floor(neededCount * 0.2);
      const targetSulit = neededCount - targetMudah - targetSedang;

      const mudah = filteredOfflinePool.filter(q => q.difficulty === 'mudah');
      const sedang = filteredOfflinePool.filter(q => q.difficulty === 'sedang');
      const sulit = filteredOfflinePool.filter(q => q.difficulty === 'sulit');

      let chosen = [
        ...getCategorized(mudah, targetMudah),
        ...getCategorized(sedang, targetSedang),
        ...getCategorized(sulit, targetSulit)
      ];

      if (chosen.length < neededCount) {
        const remaining = filteredOfflinePool.filter(q => !chosen.some(x => x.id === q.id));
        chosen = [...chosen, ...shuffleArray(remaining).slice(0, neededCount - chosen.length)];
      }

      return shuffleArray([...cachedTaken, ...chosen]);
    }

    if (testType === 'TPA') {
      const { getTPAQuestions } = await import('../data/tpa-questions');
      const allTpa = getTPAQuestions();
      
      const categories: TPACategory[] = [
        'verbal-sinonim', 'verbal-antonim', 'verbal-analogi', 'verbal-bacaan',
        'numerik-deret', 'numerik-aritmatika', 'numerik-perbandingan', 'numerik-cerita',
        'logika-penalaran', 'logika-silogisme', 'logika-analitis', 'logika-diagram'
      ];
      let chosen: Question[] = [];
      const cacheUpdates: Record<string, Question[]> = {};

      categories.forEach((cat) => {
        const cacheKey = `${testType}:${cat}`;
        const cached = cacheUpdates[cacheKey] !== undefined ? cacheUpdates[cacheKey] : (preGeneratedCacheRef.current[cacheKey] || []);
        
        let catCachedTaken: Question[] = [];
        if (cached.length > 0) {
          const takeCount = Math.min(5, cached.length);
          catCachedTaken = cached.slice(0, takeCount);
          cacheUpdates[cacheKey] = cached.slice(takeCount);
        }

        const needed = 5 - catCachedTaken.length;
        let catChosen = [...catCachedTaken];

        if (needed > 0) {
          const takenIds = catCachedTaken.map(q => q.id);
          const matching = allTpa.filter((q) => q.category === cat && !takenIds.includes(q.id));
          const mudah = matching.filter(q => q.difficulty === 'mudah');
          const sedang = matching.filter(q => q.difficulty === 'sedang');
          const sulit = matching.filter(q => q.difficulty === 'sulit');
          
          let extraChosen = [
            ...getCategorized(mudah, Math.min(needed, 2)),
            ...getCategorized(sedang, Math.min(needed - Math.min(needed, 2), 1))
          ];
          const remainingNeeded = needed - extraChosen.length;
          if (remainingNeeded > 0) {
            extraChosen = [...extraChosen, ...getCategorized(sulit, remainingNeeded)];
          }
          
          catChosen = [...catChosen, ...extraChosen];

          if (catChosen.length < 5) {
            const remaining = matching.filter(q => !catChosen.some(x => x.id === q.id));
            catChosen = [...catChosen, ...shuffleArray(remaining).slice(0, 5 - catChosen.length)];
          }
        }
        chosen = [...chosen, ...catChosen];
      });

      if (Object.keys(cacheUpdates).length > 0) {
        setPreGeneratedCache((prev) => ({ ...prev, ...cacheUpdates }));
      }

      return shuffleArray(chosen);
    } else {
      const { getTBIQuestions } = await import('../data/tbi-questions');
      const allTbi = getTBIQuestions();
      
      const spec: { sub: TBICategory; qty: number; targetMudah: number; targetSedang: number; targetSulit: number }[] = [
        { sub: 'structure-completion', qty: 40, targetMudah: 16, targetSedang: 8, targetSulit: 16 },
        { sub: 'reading-comprehension', qty: 10, targetMudah: 4, targetSedang: 2, targetSulit: 4 }
      ];
      let chosen: Question[] = [];
      const cacheUpdates: Record<string, Question[]> = {};

      spec.forEach(({ sub, qty, targetMudah, targetSedang, targetSulit }) => {
        const cacheKey = `${testType}:${sub}`;
        const cached = cacheUpdates[cacheKey] !== undefined ? cacheUpdates[cacheKey] : (preGeneratedCacheRef.current[cacheKey] || []);
        
        let subCachedTaken: Question[] = [];
        if (cached.length > 0) {
          const takeCount = Math.min(qty, cached.length);
          subCachedTaken = cached.slice(0, takeCount);
          cacheUpdates[cacheKey] = cached.slice(takeCount);
        }

        const needed = qty - subCachedTaken.length;
        let subChosen = [...subCachedTaken];

        if (needed > 0) {
          const takenIds = subCachedTaken.map(q => q.id);
          const matching = allTbi.filter((q) => q.category === sub && !takenIds.includes(q.id));
          const mudah = matching.filter(q => q.difficulty === 'mudah');
          const sedang = matching.filter(q => q.difficulty === 'sedang');
          const sulit = matching.filter(q => q.difficulty === 'sulit');
          
          const ratio = needed / qty;
          const curTargetMudah = Math.round(targetMudah * ratio);
          const curTargetSedang = Math.round(targetSedang * ratio);
          const curTargetSulit = needed - curTargetMudah - curTargetSedang;

          let extraChosen = [
            ...getCategorized(mudah, curTargetMudah),
            ...getCategorized(sedang, curTargetSedang),
            ...getCategorized(sulit, curTargetSulit)
          ];
          subChosen = [...subChosen, ...extraChosen];

          if (subChosen.length < qty) {
            const remaining = matching.filter(q => !subChosen.some(x => x.id === q.id));
            subChosen = [...subChosen, ...shuffleArray(remaining).slice(0, qty - subChosen.length)];
          }
        }
        chosen = [...chosen, ...subChosen];
      });

      if (Object.keys(cacheUpdates).length > 0) {
        setPreGeneratedCache((prev) => ({ ...prev, ...cacheUpdates }));
      }

      return shuffleArray(chosen);
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
          if (questions.length > 0) {
            saveQuestionsToOfflineBank(testType, questions);
          }
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
          if (questions.length > 0) {
            saveQuestionsToOfflineBank(testType, questions);
          }
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
    
    let newlyUnlockedBadgesList: string[] = [];

    if (!currentSession.isComplete) {
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

      setStats((prev) => {
        const nextStats = {
          ...prev,
          sessionsCompleted: (prev?.sessionsCompleted || 0) + 1
        };
        const currentUnlocked = prev?.unlockedBadges || [];
        const unlocks = checkBadgeUnlocks(nextStats, newSavedSession, currentUnlocked);
        newlyUnlockedBadgesList = unlocks;
        nextStats.unlockedBadges = [...currentUnlocked, ...unlocks];
        return nextStats;
      });

      // Keep only the last 20 sessions in history
      setHistory((prev) => [newSavedSession, ...prev].slice(0, 20));

      // Add questions to seen pool
      setSeenQuestionIds((prev) => {
        const addedIds = currentSession.questions.map((q) => q.id);
        const uniqueNewIds = addedIds.filter((id) => !prev.includes(id));
        if (uniqueNewIds.length === 0) return prev;
        return [...prev, ...uniqueNewIds];
      });
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
      avgTimePerQuestion,
      newlyUnlockedBadges: newlyUnlockedBadgesList
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

  const resetSeenQuestions = useCallback(() => {
    setSeenQuestionIds([]);
  }, []);

  const historyValue = useMemo(() => ({
    history,
    preGeneratedCache,
    deleteSavedSession,
    preGenerateQuestions,
    clearPreGenerated,
    seenQuestionIds,
    resetSeenQuestions
  }), [history, preGeneratedCache, deleteSavedSession, preGenerateQuestions, clearPreGenerated, seenQuestionIds, resetSeenQuestions]);

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
