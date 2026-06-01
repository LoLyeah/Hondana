'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuestionExhaustionModalProps {
  isOpen: boolean;
  categoryLabel: string;
  availableCount: number;
  requestedCount: number;
  onUseAI: () => void;
  onContinueAnyway: () => void;
  onCancel: () => void;
}

export default function QuestionExhaustionModal({
  isOpen,
  categoryLabel,
  availableCount,
  requestedCount,
  onUseAI,
  onContinueAnyway,
  onCancel
}: QuestionExhaustionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', damping: 28, stiffness: 360 }}
            className="glass border border-amber-500/20 w-full max-w-sm flex flex-col gap-0 shadow-2xl overflow-hidden"
          >
            {/* Header stripe */}
            <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400" />

            <div className="p-6 flex flex-col gap-5">
              {/* Icon + Title */}
              <div className="flex flex-col items-center gap-3 text-center pt-1">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/10">
                  📭
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-base font-black tracking-tight leading-tight">
                    Soal Offline Habis
                  </h2>
                  <p className="text-[11px] font-semibold text-text-secondary leading-relaxed max-w-[240px]">
                    Bank soal offline untuk kategori{' '}
                    <span className="font-black text-amber-400">{categoryLabel}</span>{' '}
                    hanya tersisa{' '}
                    <span className="font-black text-text-primary">{availableCount}</span>
                    {' '}soal, sementara kamu meminta{' '}
                    <span className="font-black text-text-primary">{requestedCount}</span>.
                  </p>
                </div>
              </div>

              {/* Info box */}
              <div className="p-3.5 bg-amber-500/6 border border-amber-500/15 rounded-2xl flex flex-col gap-1.5">
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider">Mengapa ini terjadi?</span>
                <span className="text-[10px] font-semibold text-text-secondary leading-relaxed">
                  Kamu sudah mempelajari semua variasi soal yang tersedia di bank lokal. Gunakan AI untuk menghasilkan soal-soal unik yang baru dan tidak berulang.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2.5">
                {/* Primary: Use AI */}
                <button
                  id="exhaustion-use-ai-btn"
                  onClick={onUseAI}
                  className="w-full py-3.5 bg-accent hover:bg-accent-hover text-white text-sm font-black rounded-2xl cursor-pointer transition-all active:scale-[0.98] outline-none shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
                >
                  <span className="text-base">✨</span>
                  Gunakan Soal AI Sekarang
                </button>

                {/* Secondary row */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    id="exhaustion-continue-btn"
                    onClick={onContinueAnyway}
                    className="py-2.5 bg-white/5 hover:bg-white/10 text-text-secondary hover:text-text-primary text-xs font-black rounded-xl border border-white/8 cursor-pointer transition-all active:scale-[0.98] outline-none"
                  >
                    Lanjutkan Saja
                  </button>
                  <button
                    id="exhaustion-cancel-btn"
                    onClick={onCancel}
                    className="py-2.5 bg-white/5 hover:bg-white/10 text-text-secondary hover:text-text-primary text-xs font-black rounded-xl border border-white/8 cursor-pointer transition-all active:scale-[0.98] outline-none"
                  >
                    Batal
                  </button>
                </div>
              </div>

              {/* Hint */}
              <p className="text-[9px] font-semibold text-text-secondary/60 text-center leading-relaxed -mt-1">
                💡 Kamu juga bisa generate soal AI lebih awal melalui{' '}
                <span className="text-accent font-bold">Pengaturan → Cache Soal AI</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
