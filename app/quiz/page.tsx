'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressBar from '../../components/ProgressBar';
import TimerRing from '../../components/TimerRing';
import QuizOption from '../../components/QuizOption';
import FiguralDisplay from '../../components/FiguralDisplay';
import TranscriptCard from '../../components/TranscriptCard';
import PassageCard from '../../components/PassageCard';
import { useQuiz } from '../../context/QuizContext';
import { useTimer } from '../../hooks/useTimer';

export default function Quiz() {
  const router = useRouter();
  const {
    session,
    submitAnswer,
    nextQuestion,
    toggleFlagQuestion,
    jumpToQuestion,
    endQuiz,
    quitQuiz,
    settings
  } = useQuiz();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeUsed, setTimeUsed] = useState(0);
  const [showGrid, setShowGrid] = useState(false);

  // Reference to hold transition timeout ID to prevent duplicate fires (e.g. from rapid double-clicks)
  const advanceTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // If no session active, redirect back home
  useEffect(() => {
    if (!session) {
      router.replace('/');
    }
  }, [session, router]);

  const currentQuestion = session?.questions[session.currentIndex];

  // Callback when timer expires
  const handleTimeUp = () => {
    if (isAnswered) return;
    
    // Auto submit as skipped
    handleAnswerSubmit(null);
  };

  // Timer Hook integration
  const timerLimit = currentQuestion?.timeLimit || 60;
  const { timeLeft, resetTimer } = useTimer({
    initialTime: timerLimit,
    onTimeUp: handleTimeUp,
    isActive: session !== null && !session.isComplete && !isAnswered && settings.timerEnabled
  });

  // Track time used per question
  useEffect(() => {
    if (isAnswered) return;
    const interval = setInterval(() => {
      setTimeUsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isAnswered, session?.currentIndex]);

  // Reset/restore local state when active question changes (due to next, prev, or direct jump)
  useEffect(() => {
    if (session) {
      const answeredIdx = session.answers[session.currentIndex];
      setSelectedOption(answeredIdx !== null ? answeredIdx : null);
      setIsAnswered(answeredIdx !== null);
      setTimeUsed(0);

      // Clear any pending transition timeout from the previous question
      if (advanceTimeoutRef.current) {
        clearTimeout(advanceTimeoutRef.current);
        advanceTimeoutRef.current = null;
      }

      if (currentQuestion) {
        resetTimer(currentQuestion.timeLimit);
      }
    }
  }, [session?.currentIndex, currentQuestion, resetTimer]);

  if (!session || !currentQuestion) return null;

  const handleAnswerSubmit = (optionIndex: number | null) => {
    setSelectedOption(optionIndex);
    setIsAnswered(true);

    // Save answer in context immutably (including time spent)
    submitAnswer(optionIndex, timeUsed);

    // Neutral select sound effect so as not to reveal correctness
    if (settings.soundEnabled) {
      try {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav');
        audio.volume = 0.25;
        audio.play().catch(() => {});
      } catch (e) {}
    }

    // Clear any existing advance timeout to prevent duplicate triggers
    if (advanceTimeoutRef.current) {
      clearTimeout(advanceTimeoutRef.current);
    }

    // Go directly to next question after a brief delay so they don't have to click next manually
    advanceTimeoutRef.current = setTimeout(() => {
      handleNext();
      advanceTimeoutRef.current = null;
    }, 800);
  };

  const handleNext = () => {
    const isLast = session.currentIndex + 1 >= session.questions.length;
    if (isLast) {
      endQuiz();
      router.push('/hasil');
    } else {
      nextQuestion();
    }
  };

  const handleQuit = () => {
    if (window.confirm('Apakah Anda yakin ingin mengakhiri sesi kuis ini? Progress latihan ini tidak akan disimpan.')) {
      quitQuiz();
      router.push('/');
    }
  };

  const handleCompleteQuiz = () => {
    if (window.confirm('Apakah Anda yakin ingin menyelesaikan sesi kuis ini dan melihat hasil?')) {
      if (advanceTimeoutRef.current) {
        clearTimeout(advanceTimeoutRef.current);
        advanceTimeoutRef.current = null;
      }
      endQuiz();
      router.push('/hasil');
    }
  };

  return (
    <div className="w-full max-w-[720px] mx-auto flex flex-col flex-1 relative">

 
      {/* Header bar */}
      <header className="sticky top-0 z-40 w-full glass border-b border-white/8 backdrop-blur-md px-4 py-3 flex items-center justify-between">
        <button
          onClick={handleQuit}
          className="p-2 -ml-2 rounded-xl hover:bg-white/5 active:scale-95 transition-all text-text-primary flex items-center justify-center"
          aria-label="Keluar Kuis"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-error">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
 
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-accent leading-none">
            {session.testType} {session.mode === 'simulasi' ? 'SIMULASI' : 'LATIHAN'}
          </span>
        </div>
 
        {settings.timerEnabled ? (
          <TimerRing timeLeft={timeLeft} timeLimit={timerLimit} />
        ) : (
          <div className="w-12 h-12" />
        )}
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
                    text={option}
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
      <footer className="sticky bottom-0 left-0 right-0 z-30 bg-gray-950/80 backdrop-blur-md border-t border-white/5 px-4 py-3 flex items-center justify-between gap-3 w-full max-w-[720px] mx-auto">
        {/* Prev Button */}
        <button
          onClick={() => jumpToQuestion(session.currentIndex - 1)}
          disabled={session.currentIndex === 0}
          className="px-4 py-2.5 bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-white/5 border border-white/5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed active:scale-95 text-text-primary"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <span>Sebelumnya</span>
        </button>

        {/* Flag Button (Ragu-Ragu) */}
        <button
          onClick={() => toggleFlagQuestion(session.currentIndex)}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 border ${
            session.flagged?.[session.currentIndex]
              ? 'bg-amber-500/10 text-amber-500 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.1)]'
              : 'bg-white/5 border-white/5 text-text-secondary hover:text-text-primary hover:bg-white/10'
          }`}
        >
          <span>{session.flagged?.[session.currentIndex] ? '🚩 Ragu-Ragu' : '🏳️ Ragu-Ragu'}</span>
        </button>

        {/* Navigasi / Grid Toggle Button */}
        <button
          onClick={() => setShowGrid(!showGrid)}
          className="px-4 py-2.5 bg-accent/10 border border-accent/20 hover:bg-accent/25 text-accent rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
        >
          <span>📋 Daftar Soal</span>
          <span className="bg-accent text-white px-1.5 py-0.5 rounded-md text-[9px] font-black leading-none">
            {session.answers.filter(a => a !== null).length}/{session.questions.length}
          </span>
        </button>

        {/* Next Button or Selesaikan Sesi Button */}
        {session.currentIndex + 1 < session.questions.length ? (
          <button
            onClick={() => jumpToQuestion(session.currentIndex + 1)}
            className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 text-text-primary flex items-center justify-center gap-1"
          >
            <span>Selanjutnya</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        ) : (
          <button
            onClick={handleCompleteQuiz}
            className="px-4 py-2.5 bg-success hover:bg-success-hover text-white rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-md shadow-success/15 flex items-center justify-center gap-1"
          >
            <span>🏁 Selesaikan Sesi</span>
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
    </div>
  );
}
