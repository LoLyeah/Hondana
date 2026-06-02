'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../../components/Header';
import BottomNav from '../../../components/BottomNav';
import { useQuiz } from '../../../context/QuizContext';
import { TPACategory, TBICategory, TestType } from '../../../lib/types';
import LoadingSpinner from '../../../components/LoadingSpinner';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 22
    }
  }
};

export default function StatistikDetail() {
  const router = useRouter();
  const { stats, history, settings, startLatihan, loading } = useQuiz();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<TestType>('TPA');
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <>
        <Header title="Analisis Statistik" showBack onBack={() => router.push('/hasil')} />
        <main className="flex-1 flex flex-col gap-6 px-4 md:pl-60 py-6 min-h-[60vh] opacity-60">
          <div className="h-10 w-48 bg-white/10 rounded-md animate-pulse" />
          <div className="h-40 bg-white/5 rounded-2xl animate-pulse" />
          <div className="h-64 bg-white/5 rounded-2xl animate-pulse" />
        </main>
        <BottomNav />
      </>
    );
  }

  const tpaCategories = [
    { key: 'verbal-sinonim', label: 'Sinonim (Persamaan Kata)', shortLabel: 'Sinonim', group: 'Verbal' },
    { key: 'verbal-antonim', label: 'Antonim (Lawan Kata)', shortLabel: 'Antonim', group: 'Verbal' },
    { key: 'verbal-analogi', label: 'Analogi (Hubungan Kata)', shortLabel: 'Analogi', group: 'Verbal' },
    { key: 'verbal-bacaan', label: 'Pemahaman Bacaan', shortLabel: 'Bacaan', group: 'Verbal' },
    { key: 'numerik-deret', label: 'Deret Angka Logis', shortLabel: 'Deret', group: 'Numerik' },
    { key: 'numerik-aritmatika', label: 'Aritmatika Dasar', shortLabel: 'Aritmatika', group: 'Numerik' },
    { key: 'numerik-perbandingan', label: 'Perbandingan Kuantitatif', shortLabel: 'Perbandingan', group: 'Numerik' },
    { key: 'numerik-cerita', label: 'Soal Cerita / Penalaran', shortLabel: 'Soal Cerita', group: 'Numerik' },
    { key: 'logika-penalaran', label: 'Penalaran Logis', shortLabel: 'P. Logis', group: 'Logika' },
    { key: 'logika-silogisme', label: 'Silogisme', shortLabel: 'Silogisme', group: 'Logika' },
    { key: 'logika-analitis', label: 'Penalaran Analitis', shortLabel: 'P. Analitis', group: 'Logika' },
    { key: 'logika-diagram', label: 'Diagram Logika (Figural)', shortLabel: 'Figural', group: 'Logika' }
  ];

  const tbiCategories = [
    { key: 'structure-completion', label: 'Sentence Completion', shortLabel: 'Completion', group: 'Structure' },
    { key: 'reading-comprehension', label: 'Passage Comprehension', shortLabel: 'Reading', group: 'Reading' }
  ];

  const activeCategories = activeTab === 'TPA' ? tpaCategories : tbiCategories;

  // Process data from stats context
  const attemptedCategories = activeCategories.map((cat) => {
    const stat = activeTab === 'TPA'
      ? (stats.tpaStats as any)[cat.key]
      : (stats.tbiStats as any)[cat.key];
    const correct = stat ? stat.correct : 0;
    const total = stat ? stat.total : 0;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { ...cat, correct, total, accuracy };
  });

  const attempted = attemptedCategories.filter((cat) => cat.total > 0);
  const unattempted = attemptedCategories.filter((cat) => cat.total === 0);

  // Compute Strengths and Weaknesses
  const strengths = [...attempted]
    .filter((cat) => cat.accuracy >= 70)
    .sort((a, b) => b.accuracy - a.accuracy);

  const weaknesses = [...attempted]
    .filter((cat) => cat.accuracy < 50)
    .sort((a, b) => a.accuracy - b.accuracy);

  const averagePerformance = [...attempted]
    .filter((cat) => cat.accuracy >= 50 && cat.accuracy < 70)
    .sort((a, b) => b.accuracy - a.accuracy);

  // Compute Overall tab statistics
  const totalCorrect = attempted.reduce((sum, item) => sum + item.correct, 0);
  const totalAnswered = attempted.reduce((sum, item) => sum + item.total, 0);
  const overallAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  const handleStartLatihan = async (catKey: string) => {
    await startLatihan(activeTab, catKey, settings.latihanCount, settings.useAI);
    router.push('/quiz');
  };

  // SVG circular gauge properties
  const radius = 64;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - overallAccuracy / 100);

  return (
    <>
      <Header title="Analisis Statistik" showBack onBack={() => router.push('/hasil')} />

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-1 flex flex-col gap-6 px-4 md:pl-60 py-6 pb-24 animate-fade-in"
      >
        {/* Loading Indicator Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex flex-col items-center justify-center">
            <div className="glass p-8 flex flex-col items-center justify-center border-accent/20 max-w-[320px] mx-4 text-center">
              <LoadingSpinner size="lg" label="Menyiapkan Sesi Latihan..." />
              <p className="text-[10px] font-bold text-text-secondary mt-3.5 leading-relaxed">
                Harap tunggu, modul latihan sedang disiapkan secara langsung.
              </p>
            </div>
          </div>
        )}

        {/* Tab Selection */}
        <motion.div variants={itemVariants} className="flex gap-2 bg-white/4 border border-white/8 rounded-2xl p-1 w-full max-w-sm self-center">
          <button
            onClick={() => setActiveTab('TPA')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition-all ${
              activeTab === 'TPA' ? 'bg-amber-500 text-white shadow-sm' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            📊 Modul TPA
          </button>
          <button
            onClick={() => setActiveTab('TBI')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition-all ${
              activeTab === 'TBI' ? 'bg-cyan-500 text-white shadow-sm' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            🇬🇧 Modul TBI
          </button>
        </motion.div>

        {/* Overall Ring & Basic metrics */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-5 w-full">
          {/* Circular Progress Gauge */}
          <div className="md:col-span-5 glass p-6 flex flex-col items-center justify-center gap-4 border-white/8">
            <h3 className="text-[10px] font-black uppercase tracking-wider text-text-secondary">
              AKURASI KESELURUHAN
            </h3>
            
            <div className="relative flex items-center justify-center w-40 h-40">
              <svg className="w-full h-full transform -rotate-90">
                <defs>
                  <linearGradient id="tpaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                  <linearGradient id="tbiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#0891b2" />
                  </linearGradient>
                </defs>
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  className="stroke-white/5 fill-none"
                  strokeWidth={strokeWidth}
                />
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="none"
                  stroke={activeTab === 'TPA' ? 'url(#tpaGrad)' : 'url(#tbiGrad)'}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-text-primary tracking-tight leading-none">
                  {overallAccuracy}%
                </span>
                <span className="text-[9px] font-bold text-text-secondary mt-1 tracking-wider uppercase leading-none">
                  Benar
                </span>
              </div>
            </div>

            <span className="text-[11px] font-semibold text-text-secondary text-center leading-relaxed">
              Anda menjawab benar <strong className="text-text-primary">{totalCorrect}</strong> dari total <strong className="text-text-primary">{totalAnswered}</strong> soal modul {activeTab}.
            </span>
          </div>

          {/* Quick Metrics Columns */}
          <div className="md:col-span-7 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3 flex-1">
              <div className="glass p-5 flex flex-col justify-center border-white/8 relative">
                <span className="text-[10px] font-black tracking-wider text-text-secondary uppercase">Total Soal Dikerjakan</span>
                <span className="text-3xl font-black text-text-primary mt-2">{totalAnswered}</span>
                <span className="text-[10px] text-text-secondary mt-1">Akumulasi seluruh sesi</span>
              </div>

              <div className="glass p-5 flex flex-col justify-center border-white/8 relative">
                <span className="text-[10px] font-black tracking-wider text-text-secondary uppercase">Skor Jawaban Benar</span>
                <span className="text-3xl font-black text-text-primary mt-2">{totalCorrect}</span>
                <span className="text-[10px] text-text-secondary mt-1">Total poin terkumpul</span>
              </div>
            </div>

            <div className="glass p-5 flex flex-col justify-center border-white/8 relative">
              <span className="text-[10px] font-black tracking-wider text-text-secondary uppercase">Sesi Ujian Selesai ({activeTab})</span>
              <span className="text-2xl font-black text-text-primary mt-2">
                {history.filter((s) => s.testType === activeTab).length} Sesi
              </span>
              <span className="text-[10px] text-text-secondary mt-1">
                Latihan mandiri dan simulasi ujian
              </span>
            </div>
          </div>
        </motion.section>

        {/* Column Bar Chart Visualization */}
        <motion.section variants={itemVariants} className="glass p-5 flex flex-col gap-4 border-white/8">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">📈</span>
              <h3 className="text-xs font-black uppercase tracking-wider text-text-primary leading-none">
                VISUALISASI AKURASI SUB-KATEGORI (%)
              </h3>
            </div>
            <span className="text-[9px] font-bold text-text-secondary uppercase">
              Sentuh kolom untuk info detail
            </span>
          </div>

          {totalAnswered === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
              <span className="text-3xl text-text-secondary">📊</span>
              <h4 className="text-sm font-bold text-text-primary">Data Grafik Belum Tersedia</h4>
              <p className="text-xs text-text-secondary max-w-xs leading-relaxed">
                Silakan kerjakan beberapa kuis atau simulasi terlebih dahulu untuk melihat diagram batang akurasi belajar Anda.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Responsive layout chart */}
              <div className="h-64 border-b border-l border-white/5 flex items-end justify-between px-2 pt-6 gap-1 md:gap-3 overflow-x-auto select-none sm:scrollbar-thin">
                {attemptedCategories.map((cat, idx) => {
                  const isHovered = hoveredBar === cat.key;
                  const value = cat.total > 0 ? cat.accuracy : 0;
                  
                  const isFirst = idx === 0;
                  const isLast = idx === attemptedCategories.length - 1;

                  let tooltipAlignClass = "left-1/2 -translate-x-1/2";
                  let arrowAlignClass = "left-1/2 -translate-x-1/2";

                  if (isFirst) {
                    tooltipAlignClass = "left-0";
                    arrowAlignClass = "left-3.5";
                  } else if (isLast) {
                    tooltipAlignClass = "right-0";
                    arrowAlignClass = "right-3.5";
                  }
                  
                  return (
                    <div
                      key={cat.key}
                      className="flex-1 min-w-[20px] max-w-[50px] flex flex-col items-center justify-end h-full relative cursor-pointer group"
                      onMouseEnter={() => setHoveredBar(cat.key)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      {/* Interactive Tooltip Card */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.15 }}
                            className={`absolute top-2 ${tooltipAlignClass} bg-bg-surface border border-white/10 p-2.5 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.4)] z-30 flex flex-col gap-1 w-44`}
                          >
                            <span className="text-[10px] font-black text-text-primary leading-tight uppercase border-b border-white/5 pb-1">
                              {cat.label}
                            </span>
                            <div className="flex items-center justify-between text-[9px] font-bold text-text-secondary mt-1">
                              <span>Akurasi:</span>
                              <span className={activeTab === 'TPA' ? 'text-amber-500' : 'text-cyan-500'}>
                                {cat.total > 0 ? `${cat.accuracy}%` : '0%'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[9px] font-bold text-text-secondary">
                              <span>Skor Soal:</span>
                              <span className="text-text-primary">{cat.correct} / {cat.total}</span>
                            </div>
                            <div className={`w-1.5 h-1.5 bg-bg-surface border-r border-b border-white/10 rotate-45 absolute top-[98%] ${arrowAlignClass}`} />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Bar Fill Block */}
                      <div className="w-full bg-white/2 hover:bg-white/4 rounded-t-md h-full flex items-end relative overflow-hidden transition-colors">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${value}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="w-full rounded-t-sm"
                          style={{
                            background: activeTab === 'TPA'
                              ? 'linear-gradient(to top, rgba(245, 158, 11, 0.25), rgba(245, 158, 11, 1))'
                              : 'linear-gradient(to top, rgba(6, 182, 212, 0.25), rgba(6, 182, 212, 1))'
                          }}
                        />
                      </div>

                      {/* Axis Marker Line */}
                      <div className="w-full h-[1px] bg-white/5 mt-0" />
                    </div>
                  );
                })}
              </div>

              {/* Chart Labels List */}
              <div className="flex justify-between px-2 text-[9px] font-black text-text-secondary tracking-tight select-none">
                {attemptedCategories.map((cat) => (
                  <span
                    key={cat.key}
                    className={`flex-1 text-center truncate max-w-[50px] transition-colors ${
                      hoveredBar === cat.key ? 'text-text-primary scale-105' : ''
                    }`}
                    title={cat.label}
                  >
                    {cat.shortLabel}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.section>

        {/* Strengths & Weaknesses Panel */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          {/* Strengths Card */}
          <div className="glass border-success/15 bg-success/2 p-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <span className="text-xl">🔥</span>
              <h3 className="text-xs font-black uppercase tracking-wider text-success leading-none">
                KEKUATAN ANDA (AKURASI &ge; 70%)
              </h3>
            </div>

            {strengths.length === 0 ? (
              <div className="py-6 flex flex-col items-center justify-center text-center gap-2 text-text-secondary flex-1">
                <span className="text-3xl">🎯</span>
                <p className="text-xs font-bold leading-relaxed max-w-[240px]">
                  {totalAnswered === 0
                    ? 'Belum ada riwayat pengerjaan soal.'
                    : 'Belum ada sub-kategori dengan tingkat akurasi di atas 70%.'}
                </p>
                <span className="text-[10px] font-semibold">Tingkatkan skor Anda dengan latihan terfokus!</span>
              </div>
            ) : (
              <div className="flex flex-col gap-3 flex-1">
                {strengths.map((cat) => (
                  <div key={cat.key} className="flex items-center justify-between p-3 rounded-xl bg-success/5 border border-success/10">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-text-primary leading-tight">{cat.label}</span>
                      <span className="text-[10px] font-bold text-text-secondary">
                        {cat.correct} benar dari {cat.total} soal ({cat.accuracy}% akurasi)
                      </span>
                    </div>
                    <span className="text-xs font-black px-2 py-1 rounded bg-success/20 text-success border border-success/30 uppercase leading-none">
                      Kuat
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Weaknesses Card */}
          <div className="glass border-error/15 bg-error/2 p-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <span className="text-xl">⚠️</span>
              <h3 className="text-xs font-black uppercase tracking-wider text-error leading-none">
                PERLU DITINGKATKAN (AKURASI &lt; 50%)
              </h3>
            </div>

            {weaknesses.length === 0 ? (
              <div className="py-6 flex flex-col items-center justify-center text-center gap-2 text-text-secondary flex-1">
                <span className="text-3xl">🛡️</span>
                <p className="text-xs font-bold leading-relaxed max-w-[240px]">
                  {totalAnswered === 0
                    ? 'Belum ada riwayat pengerjaan soal.'
                    : 'Luar biasa! Tidak ada sub-kategori dengan akurasi di bawah 50%.'}
                </p>
                <span className="text-[10px] font-semibold">Semua sub-kategori Anda saat ini berada dalam kondisi aman.</span>
              </div>
            ) : (
              <div className="flex flex-col gap-3 flex-1">
                {weaknesses.map((cat) => (
                  <div key={cat.key} className="flex items-start md:items-center justify-between p-3 rounded-xl bg-error/5 border border-error/10 gap-3">
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-xs font-bold text-text-primary leading-tight truncate">{cat.label}</span>
                      <span className="text-[10px] font-bold text-text-secondary">
                        {cat.correct} benar dari {cat.total} soal ({cat.accuracy}% akurasi)
                      </span>
                    </div>
                    <button
                      onClick={() => handleStartLatihan(cat.key)}
                      className="px-3 py-1.5 bg-error hover:bg-error/80 text-white text-[10px] font-black rounded-lg cursor-pointer transition-all active:scale-95 outline-none whitespace-nowrap leading-none shrink-0"
                    >
                      🚀 Latih
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.section>

        {/* Detailed Grid breakdown of all categories */}
        <motion.section variants={itemVariants} className="flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <span className="text-xl">📚</span>
            <h3 className="text-xs font-black uppercase tracking-wider text-text-secondary leading-none">
              DETAIL SELURUH SUB-KATEGORI ({activeTab})
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {attemptedCategories.map((cat) => {
              const ringColor = activeTab === 'TPA' ? 'stroke-amber-500' : 'stroke-cyan-500';
              const ringBg = activeTab === 'TPA' ? 'bg-amber-500/10' : 'bg-cyan-500/10';
              const accentColor = activeTab === 'TPA' ? 'text-amber-500' : 'text-cyan-500';
              
              const innerRadius = 14;
              const innerCircumference = 2 * Math.PI * innerRadius;
              const innerDashoffset = innerCircumference * (1 - cat.accuracy / 100);

              return (
                <div
                  key={cat.key}
                  className="w-full glass p-4 flex items-center justify-between gap-4 border-white/5 relative"
                >
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-[9px] font-black text-text-secondary uppercase">
                      {cat.group} SUB-SEKTOR
                    </span>
                    <h4 className="text-xs font-bold text-text-primary leading-tight truncate">
                      {cat.label}
                    </h4>
                    <span className="text-[10px] font-bold text-text-secondary leading-none mt-0.5">
                      {cat.total > 0 ? `${cat.correct} dari ${cat.total} Benar` : 'Belum pernah dilatih'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    {/* Ring indicator */}
                    {cat.total > 0 ? (
                      <div className="relative flex items-center justify-center w-10 h-10">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="20"
                            cy="20"
                            r={innerRadius}
                            className="stroke-white/5 fill-none"
                            strokeWidth="3"
                          />
                          <circle
                            cx="20"
                            cy="20"
                            r={innerRadius}
                            className={`fill-none ${ringColor}`}
                            strokeWidth="3"
                            strokeDasharray={innerCircumference}
                            strokeDashoffset={innerDashoffset}
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className={`absolute text-[9px] font-black ${accentColor}`}>
                          {cat.accuracy}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-[9px] font-bold text-text-secondary italic">N/A</span>
                    )}

                    <button
                      onClick={() => handleStartLatihan(cat.key)}
                      className={`p-2 rounded-xl text-text-primary border border-white/8 hover:bg-white/5 active:scale-95 transition-all cursor-pointer flex items-center justify-center`}
                      title={`Latih ${cat.label}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>
      </motion.main>

      <BottomNav />
    </>
  );
}
