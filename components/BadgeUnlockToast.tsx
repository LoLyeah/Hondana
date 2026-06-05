'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../lib/badges';
import Confetti from './Confetti';

interface BadgeUnlockToastProps {
  badge: Badge;
  onClose: () => void;
}

export default function BadgeUnlockToast({ badge, onClose }: BadgeUnlockToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <>
      <Confetti />
      <motion.div
        initial={{ x: 100, opacity: 0, scale: 0.9 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        exit={{ x: 100, opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', damping: 20, stiffness: 260 }}
        className="glass border border-amber-500/30 bg-amber-500/10 p-4 rounded-2xl flex items-center gap-3.5 shadow-2xl pointer-events-auto max-w-[280px] select-none relative overflow-hidden"
      >
      {/* Background radial glow */}
      <div className="absolute -inset-10 bg-radial from-amber-500/15 to-transparent blur-xl pointer-events-none" />

      {/* Badge Icon */}
      <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-xl shadow-lg shadow-amber-500/10 shrink-0">
        {badge.icon}
      </div>

      <div className="flex flex-col gap-0.5 text-left min-w-0 flex-1">
        <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest leading-none">
          PENCAPAIAN BARU!
        </span>
        <h4 className="text-xs font-black text-text-primary leading-tight truncate mt-1">
          {badge.name}
        </h4>
        <span className="text-[9px] font-semibold text-text-secondary leading-snug truncate">
          {badge.description}
        </span>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="text-text-secondary hover:text-text-primary text-[10px] p-1 cursor-pointer"
        aria-label="Tutup Toast"
      >
        ✕
      </button>
    </motion.div>
    </>
  );
}
