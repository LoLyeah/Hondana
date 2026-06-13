'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShortcutsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'quiz' | 'review';
}

export default function ShortcutsOverlay({ isOpen, onClose, mode }: ShortcutsOverlayProps) {
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
            className="fixed bottom-0 left-0 right-0 z-50 bg-gray-950/95 border-t border-white/8 backdrop-blur-xl rounded-t-[32px] p-6 max-w-[var(--content-narrow-max-width)] mx-auto w-full max-h-[70vh] overflow-y-auto flex flex-col gap-5 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] text-left"
            style={{ paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex flex-col text-left">
                <h3 className="text-sm font-black uppercase tracking-wider text-text-primary flex items-center gap-2">
                  <span>⌨️</span> {isReview ? 'Shortcut Keyboard Review' : 'Shortcut Keyboard'}
                </h3>
                <span className="text-[10px] font-bold text-text-secondary">
                  {isReview
                    ? 'Gunakan shortcut berikut untuk navigasi review sesi kuis lebih cepat.'
                    : 'Gunakan shortcut berikut untuk navigasi kuis lebih cepat.'}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-text-secondary flex items-center justify-center cursor-pointer outline-none min-h-0 min-w-0 min-logical-zero"
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
                {!isReview && (
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
                )}

                <div className="grid grid-cols-12 items-center gap-2">
                  <div className="col-span-8 flex flex-col">
                    <span className="text-xs font-bold text-text-primary">
                      {isReview ? 'Review Selanjutnya' : 'Soal Selanjutnya'}
                    </span>
                    <span className="text-[10px] text-text-secondary">
                      {isReview ? 'Pindah ke pembahasan berikutnya' : 'Pindah ke pertanyaan berikutnya'}
                    </span>
                  </div>
                  <div className="col-span-4 flex justify-end gap-1">
                    <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-[10px] font-bold text-text-primary">L</kbd>
                    <span className="text-text-secondary text-xs">atau</span>
                    <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-[10px] font-bold text-text-primary">→</kbd>
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center gap-2">
                  <div className="col-span-8 flex flex-col">
                    <span className="text-xs font-bold text-text-primary">
                      {isReview ? 'Review Sebelumnya' : 'Soal Sebelumnya'}
                    </span>
                    <span className="text-[10px] text-text-secondary">
                      {isReview ? 'Pindah ke pembahasan sebelumnya' : 'Pindah ke pertanyaan sebelumnya'}
                    </span>
                  </div>
                  <div className="col-span-4 flex justify-end gap-1">
                    <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-[10px] font-bold text-text-primary">J</kbd>
                    <span className="text-text-secondary text-xs">atau</span>
                    <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-[10px] font-bold text-text-primary">←</kbd>
                  </div>
                </div>

                {!isReview && (
                  <div className="grid grid-cols-12 items-center gap-2">
                    <div className="col-span-9 flex flex-col">
                      <span className="text-xs font-bold text-text-primary">Tandai Ragu-Ragu</span>
                      <span className="text-[10px] text-text-secondary">Beri bendera ragu-ragu pada soal aktif</span>
                    </div>
                    <div className="col-span-3 flex justify-end">
                      <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-[10px] font-bold text-text-primary">F</kbd>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-12 items-center gap-2">
                  <div className="col-span-9 flex flex-col">
                    <span className="text-xs font-bold text-text-primary">
                      {isReview ? 'Buka/Tutup Daftar Soal Review' : 'Buka/Tutup Daftar Soal'}
                    </span>
                    <span className="text-[10px] text-text-secondary">
                      {isReview ? 'Toggle grid daftar soal review' : 'Toggle grid daftar soal halaman'}
                    </span>
                  </div>
                  <div className="col-span-3 flex justify-end">
                    <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded-md font-mono text-[10px] font-bold text-text-primary">G</kbd>
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center gap-2">
                  <div className="col-span-9 flex flex-col">
                    <span className="text-xs font-bold text-text-primary">Tutup Menu / Drawer</span>
                    <span className="text-[10px] text-text-secondary">
                      {isReview ? 'Menutup popover shortcut atau daftar soal review' : 'Menutup popover shortcut atau daftar soal'}
                    </span>
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
  );
}
