'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStats, useHistory } from '../../context/QuizContext';
import ConfirmModal from '../ConfirmModal';

export default function AccountSection() {
  const { stats, resetStats } = useStats();
  const { seenQuestionIds, resetSeenQuestions } = useHistory();
  const [isResetProgressOpen, setIsResetProgressOpen] = useState(false);
  const [isFullResetOpen, setIsFullResetOpen] = useState(false);
  const [isResetSuccessOpen, setIsResetSuccessOpen] = useState(false);
  const [isResetSeenOpen, setIsResetSeenOpen] = useState(false);
  const [isResetSeenSuccessOpen, setIsResetSeenSuccessOpen] = useState(false);

  const handleResetConfirm = () => {
    setIsResetProgressOpen(false);
    resetStats();
    setIsResetSuccessOpen(true);
  };

  const handleResetSeenConfirm = () => {
    setIsResetSeenOpen(false);
    resetSeenQuestions();
    setIsResetSeenSuccessOpen(true);
  };

  const handleFullResetConfirm = () => {
    setIsFullResetOpen(false);
    try {
      localStorage.removeItem('hondana_user_stats');
      localStorage.removeItem('hondana_settings');
      localStorage.removeItem('hondana_active_session');
      localStorage.removeItem('hondana_session_history');
      localStorage.removeItem('hondana_pregen_cache');
      localStorage.removeItem('hondana_seen_question_ids');
      
      // Force complete page reload to reinitialize all React states cleanly
      window.location.href = '/';
    } catch (e) {
      console.error(e);
    }
  };

  const accuracy = stats?.totalAnswered 
    ? Math.round(((stats.totalCorrect || 0) / stats.totalAnswered) * 100) 
    : 0;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass border border-white/8 p-5 flex flex-col gap-4"
    >
      <div className="flex items-center gap-2 border-b border-white/5 pb-2">
        <span className="text-base">🏆</span>
        <h3 className="text-xs font-black uppercase tracking-wider text-text-primary leading-none">
          AKUN & PROGRESS BELAJAR
        </h3>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center text-sm font-semibold">
          <span className="text-text-secondary">Total Sesi Latihan</span>
          <span className="text-accent font-black">{stats?.sessionsCompleted ?? 0} Sesi</span>
        </div>
        
        <div className="flex justify-between items-center text-sm font-semibold">
          <span className="text-text-secondary">Total Soal Dijawab</span>
          <span className="text-accent font-black">{stats?.totalAnswered ?? 0} Soal</span>
        </div>

        <div className="flex justify-between items-center text-sm font-semibold">
          <span className="text-text-secondary">Rasio Akurasi Belajar</span>
          <span className="text-accent font-black">{accuracy}%</span>
        </div>

        <div className="flex justify-between items-center text-sm font-semibold">
          <span className="text-text-secondary">Total Soal Unik Ditemui</span>
          <span className="text-accent font-black">{seenQuestionIds?.length ?? 0} Soal</span>
        </div>

        <div className="w-full h-px bg-[var(--border-badge)]" />

        {/* Reset Progress Button */}
        <div className="flex flex-col gap-3 mt-1">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-error">Hapus Semua Progress</span>
            <span className="text-[10px] font-bold text-text-secondary leading-normal">
              Tindakan ini akan mengosongkan seluruh statistik latihan dan riwayat akurasi Anda dari awal secara permanen.
            </span>
          </div>
          <button
            onClick={() => setIsResetProgressOpen(true)}
            className="w-full py-3 border border-error/20 bg-error/5 hover:bg-error/10 text-error text-xs font-black rounded-2xl cursor-pointer transition-all active:scale-[0.98] outline-none"
          >
            Reset Progress Latihan
          </button>
        </div>

        <div className="w-full h-px bg-[var(--border-badge)]" />

        {/* Reset Seen Questions Button */}
        <div className="flex flex-col gap-3 mt-1">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-error">Reset Riwayat Soal Unik</span>
            <span className="text-[10px] font-bold text-text-secondary leading-normal">
              Tindakan ini akan menghapus daftar soal yang sudah pernah Anda jawab dari memori filter, sehingga soal-soal offline akan diacak kembali dari awal tanpa prioritas soal baru.
            </span>
          </div>
          <button
            onClick={() => setIsResetSeenOpen(true)}
            className="w-full py-3 border border-error/20 bg-error/5 hover:bg-error/10 text-error text-xs font-black rounded-2xl cursor-pointer transition-all active:scale-[0.98] outline-none"
          >
            Reset Riwayat Soal Unik
          </button>
        </div>

        <div className="w-full h-px bg-[var(--border-badge)]" />

        {/* Troubleshooting Full App Reset Button */}
        <div className="flex flex-col gap-3 mt-1">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-error">Troubleshooting: Reset &amp; Bersihkan Seluruh Data</span>
            <span className="text-[10px] font-bold text-text-secondary leading-normal">
              Jika Anda mengalami masalah seperti stuck, error, atau loop redirect, gunakan tombol ini untuk menghapus seluruh sesi aktif, pengaturan, dan riwayat di browser ini (akan membersihkan localStorage dan me-reload aplikasi).
            </span>
          </div>
          <button
            onClick={() => setIsFullResetOpen(true)}
            className="w-full py-3 bg-error hover:bg-error/90 text-white text-xs font-black rounded-2xl cursor-pointer transition-all active:scale-[0.98] outline-none shadow-lg shadow-error/10"
          >
            Bersihkan &amp; Reset Seluruh Data Aplikasi
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={isResetProgressOpen}
        title="Reset Progress Latihan"
        message="PERINGATAN: Apakah Anda yakin ingin mereset seluruh progress latihan Anda? Tindakan ini akan menghapus statistik latihan dan riwayat akurasi secara permanen dan tidak dapat dibatalkan."
        confirmLabel="Reset Progress"
        cancelLabel="Batal"
        variant="danger"
        onConfirm={handleResetConfirm}
        onCancel={() => setIsResetProgressOpen(false)}
      />

      <ConfirmModal
        isOpen={isResetSeenOpen}
        title="Reset Riwayat Soal"
        message="Apakah Anda yakin ingin mereset riwayat soal unik Anda? Tindakan ini akan menghapus daftar soal yang sudah pernah dikerjakan dari filter, sehingga Anda dapat menemui soal-soal tersebut kembali."
        confirmLabel="Reset Riwayat"
        cancelLabel="Batal"
        variant="danger"
        onConfirm={handleResetSeenConfirm}
        onCancel={() => setIsResetSeenOpen(false)}
      />

      <ConfirmModal
        isOpen={isFullResetOpen}
        title="Bersihkan & Reset Seluruh Data"
        message="APAKAH ANDA YAKIN? Tindakan ini akan menghapus SELURUH data aplikasi Hondana (statistik, riwayat, sesi aktif, cache soal AI, dan pengaturan) dari browser ini. Halaman akan dimuat ulang. Selesaikan jika Anda mengalami masalah/error."
        confirmLabel="Bersihkan & Reload"
        cancelLabel="Batal"
        variant="danger"
        onConfirm={handleFullResetConfirm}
        onCancel={() => setIsFullResetOpen(false)}
      />

      <ConfirmModal
        isOpen={isResetProgressOpen ? false : isResetSuccessOpen}
        title="Progress Direset"
        message="Progress latihan Anda telah berhasil direset."
        confirmLabel="Tutup"
        onConfirm={() => setIsResetSuccessOpen(false)}
        onCancel={() => setIsResetSuccessOpen(false)}
      />

      <ConfirmModal
        isOpen={isResetSeenOpen ? false : isResetSeenSuccessOpen}
        title="Riwayat Soal Direset"
        message="Riwayat soal unik Anda telah berhasil direset."
        confirmLabel="Tutup"
        onConfirm={() => setIsResetSeenSuccessOpen(false)}
        onCancel={() => setIsResetSeenSuccessOpen(false)}
      />
    </motion.section>
  );
}
