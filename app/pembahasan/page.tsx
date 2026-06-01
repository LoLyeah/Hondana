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
import { useQuiz } from '../../context/QuizContext';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';

export default function Pembahasan() {
  const router = useRouter();
  const { session } = useQuiz();
  const [reviewIndex, setReviewIndex] = useState(0);
  const [showGrid, setShowGrid] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  // If no session active or not complete, redirect to home
  useEffect(() => {
    if (!session || !session.isComplete) {
      router.replace('/');
    }
  }, [session, router]);

  if (!session) return null;

  const currentQuestion = session.questions[reviewIndex];
  if (!currentQuestion) return null;

  const handleNext = () => {
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
      if (reviewIndex + 1 < session.questions.length) {
        setReviewIndex((prev) => prev + 1);
      } else {
        router.push('/hasil');
      }
    },
    'l': () => {
      if (reviewIndex + 1 < session.questions.length) {
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
  }, !showGrid && !showShortcuts);

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
  }, showGrid || showShortcuts);

  // Active when both are CLOSED (to open shortcuts with '?')
  useKeyboardShortcuts({
    '?': () => {
      setShowShortcuts(true);
    }
  }, !showGrid && !showShortcuts);

  const isFirst = reviewIndex === 0;
  const isLast = reviewIndex + 1 === session.questions.length;
  const userChosen = session.answers[reviewIndex];

  return (
    <div className="w-full max-w-[720px] mx-auto flex flex-col flex-1 relative">
      <Header
        title={`Review ${session.testType}`}
        showBack
        onBack={() => router.push('/hasil')}
        noSidebar
      />

      <main className="flex-1 flex flex-col gap-5 px-4 py-5 pb-16">
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
                text={option}
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

      </main>

      {/* Review Navigation Controller (Sticky Bottom Control Bar) */}
      <footer className="sticky bottom-0 left-0 right-0 z-30 bg-gray-950/80 backdrop-blur-md border-t border-white/5 px-4 py-3 flex items-center justify-between gap-3 w-full max-w-[720px] mx-auto">
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          disabled={isFirst}
          className="px-4 py-2.5 bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-white/5 border border-white/5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed active:scale-95 text-text-primary"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <span>Sebelumnya</span>
        </button>

        {/* Daftar Soal Button */}
        <button
          onClick={() => setShowGrid(!showGrid)}
          className="px-4 py-2.5 bg-accent/10 border border-accent/20 hover:bg-accent/25 text-accent rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
        >
          <span>📋 Daftar Soal Review</span>
          <span className="bg-accent text-white px-1.5 py-0.5 rounded-md text-[9px] font-black leading-none">
            {session.answers.filter((ans, i) => ans === session.questions[i].correctAnswer).length}/{session.questions.length}
          </span>
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

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="px-4 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-md flex items-center justify-center gap-1"
        >
          <span>{isLast ? 'Selesai' : 'Selanjutnya'}</span>
          {!isLast && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          )}
        </button>
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
                    Daftar Soal Review
                  </h3>
                  <span className="text-[10px] font-bold text-text-secondary">
                    Pilih nomor soal untuk langsung melompat ke pembahasan soal tersebut.
                  </span>
                </div>
                <button
                  onClick={() => setShowGrid(false)}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-text-secondary flex items-center justify-center cursor-pointer outline-none min-h-0 min-w-0"
                  style={{ minBlockSize: 0, minInlineSize: 0 }}
                  aria-label="Tutup Daftar Soal Review"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Grid of numbers */}
              <div className="grid grid-cols-5 sm:grid-cols-8 gap-2.5 my-2">
                {session.questions.map((q, idx) => {
                  const isCurrent = idx === reviewIndex;
                  const userAns = session.answers[idx];
                  const isCorr = userAns === q.correctAnswer;

                  let style = 'bg-white/5 border-white/5 text-text-secondary hover:bg-white/10 hover:text-text-primary';
                  let symbol = '';

                  if (isCurrent) {
                    style = 'bg-accent text-white border-accent shadow-[0_0_15px_rgba(95,99,242,0.3)] scale-105';
                  } else if (userAns === null) {
                    style = 'bg-white/5 border-white/5 text-text-secondary hover:bg-white/10 hover:text-text-primary';
                    symbol = '⚪';
                  } else if (isCorr) {
                    style = 'bg-success/15 text-success border-success/25 hover:bg-success/25';
                    symbol = '✅';
                  } else {
                    style = 'bg-error/15 text-error border-error/25 hover:bg-error/25';
                    symbol = '❌';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setReviewIndex(idx);
                        setShowGrid(false);
                      }}
                      className={`w-full aspect-square rounded-xl flex flex-col items-center justify-center font-black text-xs border transition-all duration-200 active:scale-90 cursor-pointer ${style}`}
                    >
                      <span>{idx + 1}</span>
                      {symbol && <span className="text-[8px] mt-0.5">{symbol}</span>}
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
                  <div className="w-3 h-3 rounded bg-success/15 border border-success/25" />
                  <span>Jawaban Benar (✅)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-error/15 border border-error/25" />
                  <span>Jawaban Salah (❌)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-white/5 border border-white/5" />
                  <span>Dilewati (⚪)</span>
                </div>
              </div>
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
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex flex-col text-left">
                  <h3 className="text-sm font-black uppercase tracking-wider text-text-primary flex items-center gap-2">
                    <span>⌨️</span> Shortcut Keyboard Review
                  </h3>
                  <span className="text-[10px] font-bold text-text-secondary">
                    Gunakan shortcut berikut untuk navigasi review sesi kuis lebih cepat.
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
                    <div className="col-span-8 flex flex-col">
                      <span className="text-xs font-bold text-text-primary">Review Selanjutnya</span>
                      <span className="text-[10px] text-text-secondary">Pindah ke pembahasan berikutnya</span>
                    </div>
                    <div className="col-span-4 flex justify-end gap-1">
                      <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-[10px] font-bold text-text-primary">L</kbd>
                      <span className="text-text-secondary text-xs">atau</span>
                      <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-[10px] font-bold text-text-primary">→</kbd>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 items-center gap-2">
                    <div className="col-span-8 flex flex-col">
                      <span className="text-xs font-bold text-text-primary">Review Sebelumnya</span>
                      <span className="text-[10px] text-text-secondary">Pindah ke pembahasan sebelumnya</span>
                    </div>
                    <div className="col-span-4 flex justify-end gap-1">
                      <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-[10px] font-bold text-text-primary">J</kbd>
                      <span className="text-text-secondary text-xs">atau</span>
                      <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-[10px] font-bold text-text-primary">←</kbd>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 items-center gap-2">
                    <div className="col-span-9 flex flex-col">
                      <span className="text-xs font-bold text-text-primary">Buka/Tutup Daftar Soal Review</span>
                      <span className="text-[10px] text-text-secondary">Toggle grid daftar soal review</span>
                    </div>
                    <div className="col-span-3 flex justify-end">
                      <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-[10px] font-bold text-text-primary">G</kbd>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 items-center gap-2">
                    <div className="col-span-9 flex flex-col">
                      <span className="text-xs font-bold text-text-primary">Tutup Menu / Drawer</span>
                      <span className="text-[10px] text-text-secondary">Menutup popover shortcut atau daftar soal review</span>
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
    </div>
  );
}
