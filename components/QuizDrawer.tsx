'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '../lib/types';

interface QuizDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  currentIndex: number;
  answers: (number | null)[];
  flagged?: boolean[];
  onSelectQuestion: (index: number) => void;
  mode: 'quiz' | 'review';
  onCompleteQuiz?: () => void;
}

export default function QuizDrawer({
  isOpen,
  onClose,
  questions,
  currentIndex,
  answers,
  flagged = [],
  onSelectQuestion,
  mode,
  onCompleteQuiz
}: QuizDrawerProps) {
  const isReview = mode === 'review';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 cursor-pointer"
          />

          {/* Slide-up Drawer Container */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-gray-950/95 border-t border-white/8 backdrop-blur-xl rounded-t-[32px] p-6 max-w-[var(--content-narrow-max-width)] mx-auto w-full max-h-[70vh] overflow-y-auto flex flex-col gap-5 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
            style={{ paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex flex-col text-left">
                <h3 className="text-sm font-black uppercase tracking-wider text-text-primary">
                  {isReview ? 'Daftar Soal Review' : 'Daftar Soal Sesi'}
                </h3>
                <span className="text-[10px] font-bold text-text-secondary">
                  {isReview
                    ? 'Pilih nomor soal untuk langsung melompat ke pembahasan soal tersebut.'
                    : 'Pilih nomor soal untuk langsung menuju ke soal tersebut.'}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-text-secondary flex items-center justify-center cursor-pointer outline-none min-h-0 min-w-0 min-logical-zero"
                aria-label="Tutup Daftar Soal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Grid of numbers */}
            <div className="grid grid-cols-5 sm:grid-cols-8 gap-2.5 my-2">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const userAns = answers[idx];
                const isAnswered = userAns !== null;
                const isFlagged = flagged[idx];

                let style = 'bg-white/5 border-white/5 text-text-secondary hover:bg-white/10 hover:text-text-primary';
                let symbol = '';

                if (isCurrent) {
                  style = 'bg-accent text-white border-accent shadow-[0_0_15px_rgba(95,99,242,0.3)] scale-105';
                } else if (isReview) {
                  if (userAns === null) {
                    style = 'bg-white/5 border-white/5 text-text-secondary hover:bg-white/10 hover:text-text-primary';
                    symbol = '⚪';
                  } else if (userAns === q.correctAnswer) {
                    style = 'bg-success/15 text-success border-success/25 hover:bg-success/25';
                    symbol = '✅';
                  } else {
                    style = 'bg-error/15 text-error border-error/25 hover:bg-error/25';
                    symbol = '❌';
                  }
                } else {
                  if (isFlagged) {
                    style = 'bg-amber-500/10 text-amber-500 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.1)]';
                    symbol = '🚩';
                  } else if (isAnswered) {
                    style = 'bg-accent/15 text-accent border-accent/25';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelectQuestion(idx);
                      onClose();
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
            {isReview ? (
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
            ) : (
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
            )}

            {/* Complete Sesi Button in Drawer (only for quiz mode) */}
            {!isReview && onCompleteQuiz && (
              <button
                onClick={onCompleteQuiz}
                className="w-full py-3.5 bg-success hover:bg-success-hover text-white text-xs font-black rounded-2xl cursor-pointer transition-all active:scale-[0.98] outline-none flex items-center justify-center gap-1.5 mt-1.5 shadow-md shadow-success/15"
              >
                <span>🏁 Selesaikan Sesi Kuis</span>
              </button>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
