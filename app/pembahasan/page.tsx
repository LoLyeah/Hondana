'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/Header';
import ProgressBar from '../../components/ProgressBar';
import QuizOption from '../../components/QuizOption';
import FiguralDisplay from '../../components/FiguralDisplay';
import TranscriptCard from '../../components/TranscriptCard';
import PassageCard from '../../components/PassageCard';
import { useSession, useSettings } from '../../context/QuizContext';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { sfx } from '../../lib/audio';
import ContentWrapper from '../../components/ContentWrapper';
import QuizDrawer from '../../components/QuizDrawer';
import ShortcutsOverlay from '../../components/ShortcutsOverlay';

export default function Pembahasan() {
  const router = useRouter();
  const { session } = useSession();
  const { settings } = useSettings();
  const [reviewIndex, setReviewIndex] = useState(0);
  const [showGrid, setShowGrid] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mark hydration/mounting as complete
  useEffect(() => {
    setMounted(true);
  }, []);
 
  // Play correctness feedback sound during question review
  useEffect(() => {
    if (mounted && session && settings.soundEnabled) {
      const q = session.questions[reviewIndex];
      const ans = session.answers[reviewIndex];
      if (ans === q.correctAnswer) {
        sfx.playCorrect();
      } else if (ans !== null) {
        sfx.playIncorrect();
      }
    }
  }, [reviewIndex, mounted, session, settings.soundEnabled]);

  // If no session active or not complete, redirect to home (only after client mount is complete)
  useEffect(() => {
    if (mounted && (!session || !session.isComplete)) {
      router.replace('/');
    }
  }, [session, router, mounted]);

  const currentQuestion = session?.questions[reviewIndex];

  const handleNext = () => {
    if (!session) return;
    if (reviewIndex + 1 < session.questions.length) {
      setReviewIndex((prev) => prev + 1);
    } else {
      router.push('/hasil');
    }
  };

  const handlePrev = () => {
    if (reviewIndex > 0) {
      setReviewIndex((prev) => prev - 1);
    }
  };

  // Active when drawer is CLOSED
  useKeyboardShortcuts({
    'ArrowRight': () => {
      if (session && reviewIndex + 1 < session.questions.length) {
        setReviewIndex((prev) => prev + 1);
      } else {
        router.push('/hasil');
      }
    },
    'l': () => {
      if (session && reviewIndex + 1 < session.questions.length) {
        setReviewIndex((prev) => prev + 1);
      } else {
        router.push('/hasil');
      }
    },
    'ArrowLeft': () => {
      if (reviewIndex > 0) {
        setReviewIndex((prev) => prev - 1);
      }
    },
    'j': () => {
      if (reviewIndex > 0) {
        setReviewIndex((prev) => prev - 1);
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

  const isFirst = reviewIndex === 0;
  const isLast = session ? reviewIndex + 1 === session.questions.length : false;
  const userChosen = session ? session.answers[reviewIndex] : null;

  return (
    <ContentWrapper narrow hasSidebar={false} noPadding className="flex flex-col flex-1 relative" id="pembahasan-page">
      <Header
        title={`Review ${session.testType}`}
        showBack
        onBack={() => router.push('/hasil')}
        noSidebar
        rightElement={
          <button
            onClick={() => setShowShortcuts(!showShortcuts)}
            className="hidden sm:flex w-9 h-9 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-text-secondary hover:text-text-primary items-center justify-center font-bold text-xs transition-all active:scale-95 cursor-pointer shrink-0"
            title="Shortcut Keyboard (?)"
            aria-label="Shortcut Keyboard"
          >
            <span>⌨️</span>
          </button>
        }
      />

      <div className="flex-1 flex flex-col gap-5 px-4 py-5 pb-16">
        {/* Progress indicator */}
        <ProgressBar
          currentIndex={reviewIndex}
          total={session.questions.length}
          answers={session.answers}
        />

        {/* Dynamic Context Render: Passages or Audio Transcripts */}
        {currentQuestion.passage && (
          <PassageCard passage={currentQuestion.passage} />
        )}

        {currentQuestion.listening && (
          <TranscriptCard transcript={currentQuestion.listening.transcript} />
        )}

        {/* Question Text Box */}
        <div className="w-full flex flex-col gap-3">
          <h3 className="text-base font-bold text-text-primary leading-relaxed text-justify">
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
            const isChosen = userChosen === idx;
            const isCorrectAnswer = idx === currentQuestion.correctAnswer;
            
            let isCorrect: boolean | null = null;
            if (isCorrectAnswer) {
              isCorrect = true; // Highligted Green
            } else if (isChosen && !isCorrectAnswer) {
              isCorrect = false; // Highligted Red
            }

            return (
              <QuizOption
                key={idx}
                index={idx}
                text={currentQuestion.figural ? currentQuestion.figural.options[idx] : option}
                isSelected={isChosen}
                isCorrect={isCorrect}
                isFigural={!!currentQuestion.figural}
                disabled={true}
                onClick={() => {}}
              />
            );
          })}
        </div>

        {/* User Choice Stats Banner */}
        <div className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2 ${
          userChosen === null
            ? 'bg-white/4 border-white/6 text-text-secondary'
            : userChosen === currentQuestion.correctAnswer
            ? 'bg-success/10 border-success/20 text-success'
            : 'bg-error/10 border-error/20 text-error'
        }`}>
          <span>
            {userChosen === null ? '⚪' : userChosen === currentQuestion.correctAnswer ? '✅' : '❌'}
          </span>
          <span>
            {userChosen === null 
              ? 'Anda melewatkan soal ini.' 
              : userChosen === currentQuestion.correctAnswer 
              ? 'Jawaban Anda Benar!' 
              : `Jawaban Anda Salah (Anda memilih pilihan ${String.fromCharCode(65 + userChosen)}).`}
          </span>
        </div>

        {/* Explanation Block */}
        <div className="glass border border-white/8 p-5 flex flex-col gap-4 animate-float">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <span className="text-xl">💡</span>
            <h4 className="text-xs font-black uppercase tracking-wider text-accent leading-none">
              PEMBAHASAN SOAL
            </h4>
          </div>

          <p className="text-sm font-semibold leading-relaxed text-text-primary text-justify">
            {currentQuestion.explanation}
          </p>
        </div>

      </div>

      {/* Review Navigation Controller (Sticky Bottom Control Bar) */}
      <footer
        className="sticky bottom-0 left-0 right-0 z-30 bg-[var(--bg-nav)] backdrop-blur-md border-t border-white/5 px-2.5 min-[480px]:px-4 flex items-center justify-between gap-2.5 w-full max-w-[var(--content-narrow-max-width)] mx-auto shrink-0"
        style={{ paddingTop: '12px', paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))' }}
      >
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          disabled={isFirst}
          className="px-2.5 py-2.5 min-[480px]:px-4 bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-white/5 border border-white/5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed active:scale-95 text-text-primary shrink-0 min-h-0 min-w-0"
          style={{ minBlockSize: 0, minInlineSize: 0 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <span className="hidden min-[480px]:inline">Sebelumnya</span>
        </button>

        {/* Daftar Soal Button */}
        <button
          onClick={() => setShowGrid(!showGrid)}
          className="px-2.5 py-2.5 min-[480px]:px-4 bg-accent/10 border border-accent/20 hover:bg-accent/25 text-accent rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0 min-h-0 min-w-0"
          style={{ minBlockSize: 0, minInlineSize: 0 }}
        >
          <span>📋</span>
          <span className="hidden min-[480px]:inline"> Daftar Soal Review</span>
          <span className="min-[480px]:hidden"> Review</span>
          <span className="bg-accent text-white px-1.5 py-0.5 rounded-md text-[9px] font-black leading-none shrink-0">
            {session.answers.filter((ans, i) => ans === session.questions[i].correctAnswer).length}/{session.questions.length}
          </span>
        </button>



        {/* Next Button */}
        <button
          onClick={handleNext}
          className="px-2.5 py-2.5 min-[480px]:px-4 bg-accent hover:bg-accent-hover text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-md flex items-center justify-center gap-1 shrink-0 min-h-0 min-w-0"
          style={{ minBlockSize: 0, minInlineSize: 0 }}
        >
          <span className="hidden min-[480px]:inline">{isLast ? 'Selesai' : 'Selanjutnya'}</span>
          <span className="min-[480px]:hidden">{isLast ? 'Selesai' : 'Lanjut'}</span>
          {!isLast && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          )}
        </button>
      </footer>

      <QuizDrawer
        isOpen={showGrid}
        onClose={() => setShowGrid(false)}
        questions={session.questions}
        currentIndex={reviewIndex}
        answers={session.answers}
        onSelectQuestion={setReviewIndex}
        mode="review"
      />

      <ShortcutsOverlay
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
        mode="review"
      />
    </ContentWrapper>
  );
}
