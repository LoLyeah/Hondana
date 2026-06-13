'use client';

import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface QuestionExhaustionModalProps {
  isOpen: boolean;
  categoryLabel: string;
  availableCount: number;
  requestedCount: number;
  mode?: 'latihan' | 'simulasi';
  onUseAI: () => void;
  onContinueAnyway: () => void;
  onCancel: () => void;
}

export default function QuestionExhaustionModal({
  isOpen,
  categoryLabel,
  availableCount,
  requestedCount,
  mode = 'latihan',
  onUseAI,
  onContinueAnyway,
  onCancel
}: QuestionExhaustionModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useFocusTrap(modalRef, isOpen, onCancel);

  if (!mounted) return null;

  const isSimulasi = mode === 'simulasi';

  return createPortal(
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
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="exhaustion-modal-title"
            aria-describedby="exhaustion-modal-description"
            initial={{ y: 40, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', damping: 28, stiffness: 360 }}
            className="glass border border-amber-500/20 w-full max-w-sm flex flex-col gap-0 shadow-2xl overflow-hidden outline-none"
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
                  <h2 id="exhaustion-modal-title" className="text-base font-black tracking-tight leading-tight">
                    {isSimulasi ? 'Soal Offline Terbatas' : 'Soal Offline Habis'}
                  </h2>
                  <p id="exhaustion-modal-description" className="text-[11px] font-semibold text-text-secondary leading-relaxed max-w-[240px]">
                    {isSimulasi ? (
                      <>
                        Kamu telah menjawab sebagian besar soal offline. Simulasi ini akan menyajikan beberapa soal yang <span className="font-black text-amber-400">sudah pernah kamu kerjakan sebelumnya</span>.
                      </>
                    ) : (
                      <>
                        Bank soal offline untuk kategori{' '}
                        <span className="font-black text-amber-400">{categoryLabel}</span>{' '}
                        hanya tersisa{' '}
                        <span className="font-black text-text-primary">{availableCount}</span>
                        {' '}soal baru (belum dikerjakan), sementara kamu meminta{' '}
                        <span className="font-black text-text-primary">{requestedCount}</span>.
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* Info box */}
              <div className="p-3.5 bg-amber-500/6 border border-amber-500/15 rounded-2xl flex flex-col gap-1.5">
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider">
                  {isSimulasi ? 'Rekomendasi Kami' : 'Mengapa ini terjadi?'}
                </span>
                <span className="text-[10px] font-semibold text-text-secondary leading-relaxed">
                  {isSimulasi ? (
                    'Aktifkan opsi "Gunakan Soal AI" agar model AI merancang paket soal simulasi baru secara dinamis untuk kamu.'
                  ) : (
                    'Kamu sudah mempelajari semua variasi soal lokal. Gunakan AI untuk menghasilkan soal baru, atau lanjutkan latihan dengan campuran soal lama.'
                  )}
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
                    {isSimulasi ? 'Soal Offline' : 'Lanjutkan Saja'}
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
    </AnimatePresence>,
    document.body
  );
}
