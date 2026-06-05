'use client';

import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'default' | 'danger';
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Ya',
  cancelLabel = 'Batal',
  variant = 'default',
  onConfirm,
  onCancel
}: ConfirmModalProps) {
  const isDanger = variant === 'danger';
  const accentColor = isDanger ? 'red' : 'accent';
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Enter') {
        if (document.activeElement?.id !== 'confirm-cancel-btn') {
          e.preventDefault();
          onConfirm();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onConfirm]);

  useFocusTrap(modalRef, isOpen, onCancel);
  
  if (!mounted) return null;
  
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
            initial={{ y: 40, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', damping: 28, stiffness: 360 }}
            className={`glass border ${
              isDanger ? 'border-red-500/20' : 'border-accent/20'
            } w-full max-w-sm flex flex-col gap-0 shadow-2xl overflow-hidden outline-none`}
          >
            {/* Header stripe */}
            <div className={`h-1 w-full ${
              isDanger 
                ? 'bg-gradient-to-r from-red-500 via-rose-500 to-red-400' 
                : 'bg-gradient-to-r from-accent via-indigo-500 to-accent/80'
            }`} />

            <div className="p-6 flex flex-col gap-5">
              {/* Icon + Title */}
              <div className="flex flex-col items-center gap-3 text-center pt-1">
                <div className={`w-16 h-16 rounded-2xl ${
                  isDanger 
                     ? 'bg-red-500/10 border border-red-500/25 shadow-red-500/10 text-red-500' 
                     : 'bg-accent/10 border border-accent/25 shadow-accent/10 text-accent'
                } flex items-center justify-center text-3xl shadow-lg`}>
                  {isDanger ? '⚠️' : '❓'}
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-base font-black tracking-tight leading-tight">
                    {title}
                  </h2>
                  <p className="text-[11px] font-semibold text-text-secondary leading-relaxed max-w-[260px] mx-auto">
                    {message}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-2 flex-row-reverse">
                {/* Primary: Confirm */}
                <button
                  id="confirm-action-btn"
                  onClick={onConfirm}
                  className={`flex-1 py-3 ${
                    isDanger 
                      ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' 
                      : 'bg-accent hover:bg-accent/90 shadow-accent/20'
                  } text-white text-xs font-black rounded-xl cursor-pointer transition-all active:scale-[0.98] outline-none shadow-lg`}
                >
                  {confirmLabel}
                </button>
                {/* Secondary: Cancel */}
                <button
                  id="confirm-cancel-btn"
                  onClick={onCancel}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-text-secondary hover:text-text-primary text-xs font-black rounded-xl border border-white/8 cursor-pointer transition-all active:scale-[0.98] outline-none"
                >
                  {cancelLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
