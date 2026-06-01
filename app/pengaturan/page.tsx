'use client';

import React from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { useQuiz } from '../../context/QuizContext';

export default function Pengaturan() {
  const { settings, updateSettings, stats, resetStats } = useQuiz();

  const handleReset = () => {
    if (window.confirm('PERINGATAN: Apakah Anda yakin ingin mereset seluruh progress latihan Anda? Tindakan ini akan menghapus Level, XP, Streak, dan statistik latihan secara permanen dan tidak dapat dibatalkan.')) {
      resetStats();
      alert('Progress latihan Anda telah berhasil direset.');
    }
  };

  const toggleTimer = () => {
    updateSettings({ timerEnabled: !settings.timerEnabled });
  };

  const toggleSound = () => {
    updateSettings({ soundEnabled: !settings.soundEnabled });
  };

  return (
    <>
      <Header title="Pengaturan" />

      <main className="flex-1 flex flex-col gap-6 px-4 py-6">
        {/* Settings Group 1: General Preferences */}
        <section className="glass border border-white/8 p-5 flex flex-col gap-4 animate-float">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <span className="text-base">⚙️</span>
            <h3 className="text-xs font-black uppercase tracking-wider text-text-primary leading-none">
              PENGATURAN KUIS & LATIHAN
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            {/* Timer Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-bold">Batasan Waktu (Timer)</span>
                <span className="text-[10px] font-bold text-text-secondary leading-tight">
                  Aktifkan countdown penghitung waktu mundur per soal
                </span>
              </div>
              <button
                onClick={toggleTimer}
                className={`w-12 h-6 rounded-full p-1 transition-all cursor-pointer shrink-0 ${
                  settings.timerEnabled ? 'bg-accent' : 'bg-white/10'
                }`}
                aria-label="Toggle Timer"
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-all ${
                  settings.timerEnabled ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="w-full h-px bg-white/5" />

            {/* Sound Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-bold">Efek Suara Interaktif</span>
                <span className="text-[10px] font-bold text-text-secondary leading-tight">
                  Putar audio singkat ketika menjawab benar atau salah
                </span>
              </div>
              <button
                onClick={toggleSound}
                className={`w-12 h-6 rounded-full p-1 transition-all cursor-pointer shrink-0 ${
                  settings.soundEnabled ? 'bg-accent' : 'bg-white/10'
                }`}
                aria-label="Toggle Sound Effects"
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-all ${
                  settings.soundEnabled ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </section>

        {/* Settings Group 2: Account & Progress */}
        <section className="glass border border-white/8 p-5 flex flex-col gap-4 animate-float" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <span className="text-base">🏆</span>
            <h3 className="text-xs font-black uppercase tracking-wider text-text-primary leading-none">
              AKUN & PROGRESS BELAJAR
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-text-secondary">Pangkat Kompetensi</span>
              <span className="text-accent font-black">Level {stats.level}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-text-secondary">Total Pengalaman (XP)</span>
              <span className="text-accent font-black">{stats.totalXP} XP</span>
            </div>

            <div className="w-full h-px bg-white/5" />

            {/* Reset Progress Button */}
            <div className="flex flex-col gap-3 mt-1">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-error">Hapus Semua Progress</span>
                <span className="text-[10px] font-bold text-text-secondary leading-normal">
                  Tindakan ini akan mengosongkan Level, XP, Streak, dan riwayat akurasi latihan Anda dari awal secara permanen.
                </span>
              </div>
              <button
                onClick={handleReset}
                className="w-full py-3 border border-error/20 bg-error/5 hover:bg-error/10 text-error text-xs font-black rounded-2xl cursor-pointer transition-all active:scale-[0.98] outline-none"
              >
                Reset Progress Latihan
              </button>
            </div>
          </div>
        </section>

        {/* About App Info */}
        <section className="flex flex-col items-center gap-1 mt-4 text-center select-none animate-float" style={{ animationDelay: '0.2s' }}>
          <span className="text-xs font-black tracking-widest text-text-secondary/50">SMARTPREP V1.0.0</span>
          <span className="text-[10px] font-bold text-text-secondary/30">PREPARED BY GOOGLE DEEPMIND ANTIGRAVITY</span>
        </section>
      </main>

      <BottomNav />
    </>
  );
}
