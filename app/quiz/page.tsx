'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressBar from '../../components/ProgressBar';
import TimerRing from '../../components/TimerRing';
import QuizOption from '../../components/QuizOption';
import FiguralDisplay from '../../components/FiguralDisplay';
import TranscriptCard from '../../components/TranscriptCard';
import PassageCard from '../../components/PassageCard';
import { useSession, useSettings } from '../../context/QuizContext';
import ConfirmModal from '../../components/ConfirmModal';
import { useTimer } from '../../hooks/useTimer';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { useFullscreen } from '../../hooks/useFullscreen';
import { sfx } from '../../lib/audio';

export default function Quiz() {
  const router = useRouter();
  const {
    session,
    submitAnswer,
    nextQuestion,
    toggleFlagQuestion,
    jumpToQuestion,
    endQuiz,
    quitQuiz
  } = useSession();

  const { settings } = useSettings();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const timeUsedRef = React.useRef(0);
  const [showGrid, setShowGrid] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const [isQuitModalOpen, setIsQuitModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isTimeUpModalOpen, setIsTimeUpModalOpen] = useState(false);

  // Reference to hold transition timeout ID to prevent duplicate fires (e.g. from rapid double-clicks)
  const advanceTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Mark hydration/mounting as complete
  useEffect(() => {
    setMounted(true);
  }, []);

  // If no session active, redirect back home (only after client mount is complete)
  useEffect(() => {
    if (mounted && !session) {
      router.replace('/');
    }
  }, [session, router, mounted]);

  const currentQuestion = session?.questions[session.currentIndex];

  // Total duration in seconds based on test type (TPA: 60 minutes, TBI: 50 minutes)
  const totalDurationSeconds = session?.testType === 'TPA' ? 3600 : 3000;

  // Callback when timer expires
  const handleTimeUp = useCallback(() => {
    if (advanceTimeoutRef.current) {
      clearTimeout(advanceTimeoutRef.current);
      advanceTimeoutRef.current = null;
    }
    endQuiz();
    setIsTimeUpModalOpen(true);
  }, [endQuiz]);

  // Timer Hook integration (session-level stable countdown)
  const { timeLeft } = useTimer({
    startTime: session?.startTime || Date.now(),
    totalDurationSeconds,
    onTimeUp: handleTimeUp,
    isActive: session !== null && !session.isComplete && settings.timerEnabled
  });

  // Track time used per question using Ref to avoid unnecessary re-renders
  useEffect(() => {
    if (isAnswered) return;
    timeUsedRef.current = 0;
    const interval = setInterval(() => {
      timeUsedRef.current += 1;
    }, 1000);
    return () => clearInterval(interval);
  }, [isAnswered, session?.currentIndex]);

  // Reset/restore local state when active question changes (due to next, prev, or direct jump)
  useEffect(() => {
    if (session) {
      const answeredIdx = session.answers[session.currentIndex];
      setSelectedOption(answeredIdx !== null ? answeredIdx : null);
      setIsAnswered(answeredIdx !== null);
      timeUsedRef.current = 0;

      // Clear any pending transition timeout from the previous question
      if (advanceTimeoutRef.current) {
        clearTimeout(advanceTimeoutRef.current);
        advanceTimeoutRef.current = null;
      }
    }
  }, [session?.currentIndex, currentQuestion]);

  const handleNext = useCallback(() => {
    if (!session) return;
    const isLast = session.currentIndex + 1 >= session.questions.length;
    if (isLast) {
      endQuiz();
      router.push('/hasil');
    } else {
      nextQuestion();
    }
  }, [session, endQuiz, router, nextQuestion]);

  const handleAnswerSubmit = useCallback((optionIndex: number | null) => {
    if (!session || !currentQuestion) return;
    setSelectedOption(optionIndex);
    setIsAnswered(true);

    // Save answer in context immutably (including time spent)
    submitAnswer(optionIndex, timeUsedRef.current);

    // Neutral select sound effect so as not to reveal correctness
    if (settings.soundEnabled) {
      sfx.playClick();
    }

    // Clear any existing advance timeout to prevent duplicate triggers
    if (advanceTimeoutRef.current) {
      clearTimeout(advanceTimeoutRef.current);
    }

    // Go directly to next question after a brief delay so they don't have to click next manually.
    // If it's the last question, do not auto-advance or end the session automatically so the user can review.
    const isLast = session.currentIndex + 1 >= session.questions.length;
    if (!isLast) {
      advanceTimeoutRef.current = setTimeout(() => {
        handleNext();
        advanceTimeoutRef.current = null;
      }, 800);
    }
  }, [session, currentQuestion, submitAnswer, settings.soundEnabled, handleNext]);

  const handleQuit = useCallback(() => {
    setIsQuitModalOpen(true);
  }, []);

  const handleQuitConfirm = useCallback(() => {
    setIsQuitModalOpen(false);
    quitQuiz();
    router.push('/');
  }, [quitQuiz, router]);

  const handleCompleteQuiz = useCallback(() => {
    setIsCompleteModalOpen(true);
  }, []);

  const handleCompleteConfirm = useCallback(() => {
    setIsCompleteModalOpen(false);
    if (advanceTimeoutRef.current) {
      clearTimeout(advanceTimeoutRef.current);
      advanceTimeoutRef.current = null;
    }
    endQuiz();
    router.push('/hasil');
  }, [endQuiz, router]);

  // Active when drawer is CLOSED
  useKeyboardShortcuts({
    '1': () => { if (currentQuestion && currentQuestion.options.length >= 1) handleAnswerSubmit(0); },
    'a': () => { if (currentQuestion && currentQuestion.options.length >= 1) handleAnswerSubmit(0); },
    '2': () => { if (currentQuestion && currentQuestion.options.length >= 2) handleAnswerSubmit(1); },
    'b': () => { if (currentQuestion && currentQuestion.options.length >= 2) handleAnswerSubmit(1); },
    '3': () => { if (currentQuestion && currentQuestion.options.length >= 3) handleAnswerSubmit(2); },
    'c': () => { if (currentQuestion && currentQuestion.options.length >= 3) handleAnswerSubmit(2); },
    '4': () => { if (currentQuestion && currentQuestion.options.length >= 4) handleAnswerSubmit(3); },
    'd': () => { if (currentQuestion && currentQuestion.options.length >= 4) handleAnswerSubmit(3); },
    '5': () => { if (currentQuestion && currentQuestion.options.length >= 5) handleAnswerSubmit(4); },
    'e': () => { if (currentQuestion && currentQuestion.options.length >= 5) handleAnswerSubmit(4); },
    'ArrowRight': () => {
      if (session && session.currentIndex + 1 < session.questions.length) {
        jumpToQuestion(session.currentIndex + 1);
      }
    },
    'l': () => {
      if (session && session.currentIndex + 1 < session.questions.length) {
        jumpToQuestion(session.currentIndex + 1);
      }
    },
    'ArrowLeft': () => {
      if (session && session.currentIndex > 0) {
        jumpToQuestion(session.currentIndex - 1);
      }
    },
    'j': () => {
      if (session && session.currentIndex > 0) {
        jumpToQuestion(session.currentIndex - 1);
      }
    },
    'f': () => {
      if (session) {
        toggleFlagQuestion(session.currentIndex);
      }
    },
    'g': () => {
      setShowGrid(true);
    },
  }, !showGrid && !showShortcuts && !!session && !!currentQuestion);

  // Active when drawer or shortcuts is OPEN
  useKeyboardShortcuts({
    'Escape': () => {
      setShowGrid(false);
      setShowShortcuts(false);
    },
    'g': () => {
      if (showGrid) setShowGrid(false);
    },
    '?': () => {
      if (showShortcuts) setShowShortcuts(false);
    }
  }, (showGrid || showShortcuts) && !!session && !!currentQuestion);

  // Active when both are CLOSED (to open shortcuts with '?')
  useKeyboardShortcuts({
    '?': () => {
      setShowShortcuts(true);
    }
  }, !showGrid && !showShortcuts && !!session && !!currentQuestion);

  if (!mounted || !session || !currentQuestion) return null;

  return (
    <div id="quiz-page" className="w-full max-w-[720px] mx-auto flex flex-col flex-1 relative">

 
      {/* Header bar */}
      <header
        className="sticky top-0 z-40 w-full glass border-b border-white/8 backdrop-blur-md px-4 flex items-center justify-between"
        style={{ paddingTop: 'calc(12px + env(safe-area-inset-top, 0px))', paddingBottom: '12px' }}
      >
        {/* Left Side: Exit Button */}
        <div className="flex-1 flex justify-start">
          <button
            onClick={handleQuit}
            className="p-2 -ml-2 rounded-xl hover:bg-white/5 active:scale-95 transition-all text-text-primary flex items-center justify-center cursor-pointer"
            aria-label="Keluar Kuis"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-error">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
 
        {/* Center: Title */}
        <div className="flex-initial flex flex-col items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-accent leading-none">
            {session.testType} {session.mode === 'simulasi' ? 'SIMULASI' : 'LATIHAN'}
          </span>
        </div>
 
        {/* Right Side: Controls */}
        <div className="flex-1 flex items-center justify-end gap-2">
          {/* Fullscreen Toggle Button */}
          <button
            onClick={toggleFullscreen}
            className="p-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-text-secondary hover:text-text-primary flex items-center justify-center transition-all active:scale-95 cursor-pointer shrink-0 min-h-0 min-w-0"
            style={{ minBlockSize: 0, minInlineSize: 0, width: '36px', height: '36px' }}
            title="Toggle Fullscreen"
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
            )}
          </button>

          {/* Shortcut Keyboard Legend Button (Desktop only) */}
          <button
            onClick={() => setShowShortcuts(!showShortcuts)}
            className="hidden sm:flex w-9 h-9 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-text-secondary hover:text-text-primary items-center justify-center font-bold text-xs transition-all active:scale-95 cursor-pointer shrink-0"
            title="Shortcut Keyboard (?)"
            aria-label="Shortcut Keyboard"
          >
            <span>⌨️</span>
          </button>

          {settings.timerEnabled ? (
            <TimerRing timeLeft={timeLeft} timeLimit={totalDurationSeconds} />
          ) : (
            <div className="w-12 h-12" />
          )}
        </div>
      </header>
 
      <main className="flex-1 flex flex-col gap-5 px-4 py-5 pb-12">
        {/* Progress indicators */}
        <ProgressBar
          currentIndex={session.currentIndex}
          total={session.questions.length}
          answers={session.answers}
        />
 
        <AnimatePresence mode="wait">
          <motion.div
            key={session.currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex flex-col gap-5 w-full"
          >
            {/* Dynamic Context Render: Passages or Audio Transcripts */}
            {currentQuestion.passage && (
              <PassageCard passage={currentQuestion.passage} />
            )}
 
            {currentQuestion.listening && (
              <TranscriptCard transcript={currentQuestion.listening.transcript} />
            )}
 
            {/* Question Text Box */}
            <div className="w-full flex flex-col gap-3">
              <h3 className="text-base font-bold text-text-primary leading-relaxed text-left">
                {currentQuestion.question}
              </h3>
            </div>
 
            {/* Dynamic Figural SVG Display (TPA diagram) */}
            {currentQuestion.figural && (
              <FiguralDisplay figures={currentQuestion.figural.figures} />
            )}
 
            {/* Answer Options Box */}
            <div className="flex flex-col gap-3 mt-2">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx || session.answers[session.currentIndex] === idx;
                
                return (
                  <QuizOption
                    key={idx}
                    index={idx}
                    text={currentQuestion.figural ? currentQuestion.figural.options[idx] : option}
                    isSelected={isSelected}
                    isCorrect={null}
                    isFigural={!!currentQuestion.figural}
                    disabled={false}
                    onClick={() => handleAnswerSubmit(idx)}
                  />
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Quiz Navigation Controller (Bottom Control Bar) */}
      <footer
        className="sticky bottom-0 left-0 right-0 z-30 bg-gray-950/80 backdrop-blur-md border-t border-white/5 px-2.5 min-[480px]:px-4 flex items-center justify-between gap-2.5 w-full max-w-[720px] mx-auto shrink-0"
        style={{ paddingTop: '12px', paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))' }}
      >
        {/* Prev Button */}
        <button
          onClick={() => jumpToQuestion(session.currentIndex - 1)}
          disabled={session.currentIndex === 0}
          className="px-2.5 py-2.5 min-[480px]:px-4 bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-white/5 border border-white/5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed active:scale-95 text-text-primary shrink-0 min-h-0 min-w-0"
          style={{ minBlockSize: 0, minInlineSize: 0 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <span className="hidden min-[480px]:inline">Sebelumnya</span>
        </button>

        {/* Flag Button (Ragu-Ragu) */}
        <button
          onClick={() => toggleFlagQuestion(session.currentIndex)}
          className={`px-2.5 py-2.5 min-[480px]:px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 border shrink-0 min-h-0 min-w-0 ${
            session.flagged?.[session.currentIndex]
              ? 'bg-amber-500/10 text-amber-500 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.1)]'
              : 'bg-white/5 border-white/5 text-text-secondary hover:text-text-primary hover:bg-white/10'
          }`}
          style={{ minBlockSize: 0, minInlineSize: 0 }}
        >
          <span>{session.flagged?.[session.currentIndex] ? '🚩' : '🏳️'}</span>
          <span className="hidden min-[480px]:inline">Ragu-Ragu</span>
        </button>

        {/* Navigasi / Grid Toggle Button */}
        <button
          onClick={() => setShowGrid(!showGrid)}
          className="px-2.5 py-2.5 min-[480px]:px-4 bg-accent/10 border border-accent/20 hover:bg-accent/25 text-accent rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0 min-h-0 min-w-0"
          style={{ minBlockSize: 0, minInlineSize: 0 }}
        >
          <span>📋</span>
          <span className="hidden min-[480px]:inline">Daftar Soal</span>
          <span className="bg-accent text-white px-1.5 py-0.5 rounded-md text-[9px] font-black leading-none shrink-0">
            {session.answers.filter(a => a !== null).length}/{session.questions.length}
          </span>
        </button>



        {/* Next Button or Selesaikan Sesi Button */}
        {session.currentIndex + 1 < session.questions.length ? (
          <button
            onClick={() => jumpToQuestion(session.currentIndex + 1)}
            className="px-2.5 py-2.5 min-[480px]:px-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 text-text-primary flex items-center justify-center gap-1 shrink-0 min-h-0 min-w-0"
            style={{ minBlockSize: 0, minInlineSize: 0 }}
          >
            <span className="hidden min-[480px]:inline">Selanjutnya</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        ) : (
          <button
            onClick={handleCompleteQuiz}
            className="px-2.5 py-2.5 min-[480px]:px-4 bg-success hover:bg-success-hover text-white rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-md shadow-success/15 flex items-center justify-center gap-1 shrink-0 min-h-0 min-w-0"
            style={{ minBlockSize: 0, minInlineSize: 0 }}
          >
            <span className="hidden min-[480px]:inline">🏁 Selesaikan Sesi</span>
            <span className="min-[480px]:hidden">🏁 Selesai</span>
          </button>
        )}
      </footer>

      {/* Collapsible Question Grid Drawer */}
      <AnimatePresence>
        {showGrid && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGrid(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 cursor-pointer"
            />

            {/* Slide-up Drawer Container */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-gray-950/95 border-t border-white/8 backdrop-blur-xl rounded-t-[32px] p-6 max-w-[720px] mx-auto w-full max-h-[70vh] overflow-y-auto flex flex-col gap-5 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
              style={{ paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex flex-col text-left">
                  <h3 className="text-sm font-black uppercase tracking-wider text-text-primary">
                    Daftar Soal Sesi
                  </h3>
                  <span className="text-[10px] font-bold text-text-secondary">
                    Pilih nomor soal untuk langsung menuju ke soal tersebut.
                  </span>
                </div>
                <button
                  onClick={() => setShowGrid(false)}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-text-secondary flex items-center justify-center cursor-pointer outline-none min-h-0 min-w-0"
                  style={{ minBlockSize: 0, minInlineSize: 0 }}
                  aria-label="Tutup Daftar Soal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Grid of numbers */}
              <div className="grid grid-cols-5 sm:grid-cols-8 gap-2.5 my-2">
                {session.questions.map((_, idx) => {
                  const isCurrent = idx === session.currentIndex;
                  const isQuestionAnswered = session.answers[idx] !== null;
                  const isQuestionFlagged = session.flagged?.[idx];

                  let style = 'bg-white/5 border-white/5 text-text-secondary hover:bg-white/10 hover:text-text-primary';
                  if (isCurrent) {
                    style = 'bg-accent text-white border-accent shadow-[0_0_15px_rgba(95,99,242,0.3)] scale-105';
                  } else if (isQuestionFlagged) {
                    style = 'bg-amber-500/10 text-amber-500 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.1)]';
                  } else if (isQuestionAnswered) {
                    style = 'bg-accent/15 text-accent border-accent/25';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        jumpToQuestion(idx);
                        setShowGrid(false);
                      }}
                      className={`w-full aspect-square rounded-xl flex flex-col items-center justify-center font-black text-xs border transition-all duration-200 active:scale-90 cursor-pointer ${style}`}
                    >
                      <span>{idx + 1}</span>
                      {isQuestionFlagged && <span className="text-[8px] mt-0.5">🚩</span>}
                    </button>
                  );
                })}
              </div>

              {/* Legend info */}
              <div className="flex items-center flex-wrap gap-4 text-[10px] font-bold text-text-secondary bg-white/3 p-3.5 rounded-2xl border border-white/5 mt-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-accent" />
                  <span>Aktif</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-accent/15 border border-accent/25" />
                  <span>Sudah Dijawab</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-amber-500/15 border border-amber-500/30" />
                  <span>Ragu-Ragu (Flag)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-white/5 border border-white/5" />
                  <span>Belum Dijawab</span>
                </div>
              </div>

              {/* Complete Sesi Button in Drawer */}
              <button
                onClick={handleCompleteQuiz}
                className="w-full py-3.5 bg-success hover:bg-success-hover text-white text-xs font-black rounded-2xl cursor-pointer transition-all active:scale-[0.98] outline-none flex items-center justify-center gap-1.5 mt-1.5 shadow-md shadow-success/15"
              >
                <span>🏁 Selesaikan Sesi Kuis</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Keyboard Shortcuts Legend Drawer */}
      <AnimatePresence>
        {showShortcuts && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShortcuts(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 cursor-pointer"
            />

            {/* Slide-up Drawer Container */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-gray-950/95 border-t border-white/8 backdrop-blur-xl rounded-t-[32px] p-6 max-w-[720px] mx-auto w-full max-h-[70vh] overflow-y-auto flex flex-col gap-5 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] text-left"
              style={{ paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex flex-col text-left">
                  <h3 className="text-sm font-black uppercase tracking-wider text-text-primary flex items-center gap-2">
                    <span>⌨️</span> Shortcut Keyboard
                  </h3>
                  <span className="text-[10px] font-bold text-text-secondary">
                    Gunakan shortcut berikut untuk navigasi kuis lebih cepat.
                  </span>
                </div>
                <button
                  onClick={() => setShowShortcuts(false)}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-text-secondary flex items-center justify-center cursor-pointer outline-none min-h-0 min-w-0"
                  style={{ minBlockSize: 0, minInlineSize: 0 }}
                  aria-label="Tutup Shortcut"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Shortcuts Table/Grid */}
              <div className="flex flex-col gap-3 my-2">
                <div className="grid grid-cols-12 gap-2 pb-2.5 border-b border-white/5 text-[10px] font-black uppercase tracking-wider text-text-secondary">
                  <div className="col-span-5">Fungsi / Aksi</div>
                  <div className="col-span-7 text-right">Tombol Keyboard</div>
                </div>

                <div className="flex flex-col gap-4 py-2">
                  <div className="grid grid-cols-12 items-center gap-2">
                    <div className="col-span-5 flex flex-col">
                      <span className="text-xs font-bold text-text-primary">Pilih Pilihan A - E</span>
                      <span className="text-[10px] text-text-secondary">Pilih jawaban pilihan ganda (no-op jika sudah dijawab)</span>
                    </div>
                    <div className="col-span-7 flex justify-end items-center gap-1.5 flex-wrap">
                      {['A', 'B', 'C', 'D', 'E'].map((key) => (
                        <kbd key={key} className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded-md font-mono text-[10px] font-bold text-accent shadow-sm">
                          {key}
                        </kbd>
                      ))}
                      <span className="text-text-secondary text-[10px] mx-0.5">atau</span>
                      {['1', '2', '3', '4', '5'].map((key) => (
                        <kbd key={key} className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded-md font-mono text-[10px] font-bold text-text-primary shadow-sm">
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-12 items-center gap-2">
                    <div className="col-span-8 flex flex-col">
                      <span className="text-xs font-bold text-text-primary">Soal Selanjutnya</span>
                      <span className="text-[10px] text-text-secondary">Pindah ke pertanyaan berikutnya</span>
                    </div>
                    <div className="col-span-4 flex justify-end gap-1">
                      <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-[10px] font-bold text-text-primary">L</kbd>
                      <span className="text-text-secondary text-xs">atau</span>
                      <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-[10px] font-bold text-text-primary">→</kbd>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 items-center gap-2">
                    <div className="col-span-8 flex flex-col">
                      <span className="text-xs font-bold text-text-primary">Soal Sebelumnya</span>
                      <span className="text-[10px] text-text-secondary">Pindah ke pertanyaan sebelumnya</span>
                    </div>
                    <div className="col-span-4 flex justify-end gap-1">
                      <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-[10px] font-bold text-text-primary">J</kbd>
                      <span className="text-text-secondary text-xs">atau</span>
                      <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-[10px] font-bold text-text-primary">←</kbd>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 items-center gap-2">
                    <div className="col-span-9 flex flex-col">
                      <span className="text-xs font-bold text-text-primary">Tandai Ragu-Ragu</span>
                      <span className="text-[10px] text-text-secondary">Beri bendera ragu-ragu pada soal aktif</span>
                    </div>
                    <div className="col-span-3 flex justify-end">
                      <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-[10px] font-bold text-text-primary">F</kbd>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 items-center gap-2">
                    <div className="col-span-9 flex flex-col">
                      <span className="text-xs font-bold text-text-primary">Buka/Tutup Daftar Soal</span>
                      <span className="text-[10px] text-text-secondary">Toggle grid daftar soal halaman</span>
                    </div>
                    <div className="col-span-3 flex justify-end">
                      <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-[10px] font-bold text-text-primary">G</kbd>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 items-center gap-2">
                    <div className="col-span-9 flex flex-col">
                      <span className="text-xs font-bold text-text-primary">Tutup Menu / Drawer</span>
                      <span className="text-[10px] text-text-secondary">Menutup popover shortcut atau daftar soal</span>
                    </div>
                    <div className="col-span-3 flex justify-end">
                      <kbd className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-[10px] font-bold text-text-primary">Esc</kbd>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close Info */}
              <div className="text-[10px] font-bold text-text-secondary bg-white/3 p-3.5 rounded-2xl border border-white/5 mt-2 text-center">
                Tekan <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded font-mono text-[9px] text-text-primary">Esc</kbd> atau <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded font-mono text-[9px] text-text-primary">?</kbd> untuk menutup petunjuk ini.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ConfirmModal
        isOpen={isQuitModalOpen}
        title="Keluar Sesi Kuis"
        message="Apakah Anda yakin ingin mengakhiri sesi kuis ini? Progress latihan ini tidak akan disimpan."
        confirmLabel="Keluar"
        cancelLabel="Batal"
        variant="danger"
        onConfirm={handleQuitConfirm}
        onCancel={() => setIsQuitModalOpen(false)}
      />

      <ConfirmModal
        isOpen={isCompleteModalOpen}
        title="Selesaikan Kuis"
        message="Apakah Anda yakin ingin menyelesaikan sesi kuis ini dan melihat hasil?"
        confirmLabel="Selesai & Lihat Hasil"
        cancelLabel="Kembali"
        onConfirm={handleCompleteConfirm}
        onCancel={() => setIsCompleteModalOpen(false)}
      />

      <ConfirmModal
        isOpen={isTimeUpModalOpen}
        title="Waktu Ujian Habis"
        message="Waktu ujian Anda telah habis! Sesi kuis telah diselesaikan secara otomatis."
        confirmLabel="Lihat Hasil"
        cancelLabel="Tutup"
        onConfirm={() => {
          setIsTimeUpModalOpen(false);
          router.push('/hasil');
        }}
        onCancel={() => {
          setIsTimeUpModalOpen(false);
          router.push('/hasil');
        }}
      />
    </div>
  );
}
