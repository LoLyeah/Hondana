'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  icon: string | React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="glass border border-white/8 p-8 rounded-2xl flex flex-col items-center justify-center text-center gap-4 py-12 relative overflow-hidden"
    >
      {/* Decorative background glow */}
      <div className="absolute -inset-10 bg-radial from-accent/5 to-transparent blur-xl pointer-events-none" />

      {/* Illustrative Icon */}
      <div className="w-16 h-16 rounded-2xl bg-white/4 border border-white/8 flex items-center justify-center text-3xl shadow-lg relative z-10">
        {typeof icon === 'string' ? (
          <span className="select-none">{icon}</span>
        ) : (
          icon
        )}
      </div>

      <div className="flex flex-col gap-1.5 max-w-[320px] relative z-10">
        <h4 className="text-sm font-black text-text-primary tracking-tight">
          {title}
        </h4>
        <p className="text-xs font-semibold text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-3 bg-accent hover:bg-accent-hover text-white text-xs font-black rounded-xl active:scale-95 transition-all outline-none shadow-md shadow-accent/20 cursor-pointer relative z-10 mt-1"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}
