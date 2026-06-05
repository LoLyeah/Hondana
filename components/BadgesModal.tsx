'use client';

import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { badges } from '../lib/badges';
import { UserStats } from '../lib/types';
import BadgeCard from './BadgeCard';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
}

export default function BadgesModal({ isOpen, onClose, stats }: BadgesModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const unlockedCount = (stats?.unlockedBadges || []).length;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useFocusTrap(modalRef, isOpen, onClose);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="glass border border-white/8 w-full max-w-2xl flex flex-col gap-0 shadow-2xl overflow-hidden outline-none"
          >
            {/* Header stripe */}
            <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-indigo-500 to-cyan-500" />

            {/* Header section */}
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
              <div className="flex flex-col gap-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🏆</span>
                  <h2 className="text-base font-black tracking-tight leading-none">Daftar Pencapaian</h2>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-text-secondary">
                  Terbuka: {unlockedCount} dari {badges.length} Modul
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg border border-white/5 bg-white/2 hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center text-text-secondary hover:text-text-primary cursor-pointer outline-none"
                aria-label="Tutup pencapaian"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body content with scrollable bento layout */}
            <div className="p-6 overflow-y-auto max-h-[60vh] optim-scroll">
              <div className="grid grid-cols-2 min-[440px]:grid-cols-3 sm:grid-cols-4 gap-3">
                {badges.map((badge) => (
                   <BadgeCard
                     key={badge.id}
                     badge={badge}
                     isUnlocked={(stats?.unlockedBadges || []).includes(badge.id)}
                   />
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/5 flex justify-end bg-white/1">
              <button
                id="close-badges-modal"
                onClick={onClose}
                className="px-6 py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-black rounded-xl cursor-pointer transition-all active:scale-[0.98] outline-none shadow-md shadow-accent/10"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
