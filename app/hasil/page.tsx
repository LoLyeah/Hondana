'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import StatsCard from '../../components/StatsCard';
import ResultBar from '../../components/ResultBar';
import { useQuiz } from '../../context/QuizContext';
import { SessionResult, SavedSession } from '../../lib/types';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 22
    }
  }
};

export default function Hasil() {
  const router = useRouter();
  const { session, stats, history, endQuiz, quitQuiz, loadSavedSession, deleteSavedSession } = useQuiz();
  const [result, setResult] = useState<SessionResult | null>(null);

  // Compute final results on mount
  useEffect(() => {
    if (session) {
      if (!session.isComplete) {
        const res = endQuiz();
        setResult(res);
      } else {
        // Already ended, compute manually
        let correct = 0;
        let wrong = 0;
        let skipped = 0;
        session.answers.forEach((ans, idx) => {
          if (ans === null) skipped++;
          else if (ans === session.questions[idx].correctAnswer) correct++;
          else wrong++;
        });
        const total = session.questions.length;
        const accuracy = total > 0 ? (correct / total) * 100 : 0;
        const totalTime = session.timePerQuestion ? session.timePerQuestion.reduce((a, b) => a + b, 0) : 0;
        const avgTimePerQuestion = total > 0 ? totalTime / total : 0;
        
        setResult({
          correct,
          wrong,
          skipped,
          total,
          score: correct,
          accuracy,
          totalTime,
          avgTimePerQuestion
        });
      }
    }
  }, [session, endQuiz]);

  // Helper formatting for durations
  const formatTime = (secs: number) => {
    if (!secs) return '0s';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  };

  // Helper to map category keys to clean labels
  const getCategoryLabel = (key: string, type: 'TPA' | 'TBI'): string => {
    if (key === 'all') return 'Simulasi Ujian';
    
    const labels: Record<string, string> = {
      // TPA
      'verbal-sinonim': 'Sinonim',
      'verbal-antonim': 'Antonim',
      'verbal-analogi': 'Analogi',
      'verbal-bacaan': 'Pemahaman Bacaan',
      'numerik-deret': 'Deret Angka',
      'numerik-aritmatika': 'Aritmatika',
      'numerik-perbandingan': 'Perbandingan',
      'numerik-cerita': 'Soal Cerita',
      'logika-penalaran': 'Penalaran Logis',
      'logika-silogisme': 'Silogisme',
      'logika-analitis': 'Penalaran Analitis',
      'logika-diagram': 'Diagram (Figural)',
      // TBI
      'structure-completion': 'Sentence Completion',
      'reading-comprehension': 'Passage Comprehension'
    };

    return labels[key] || key.split('-').slice(1).join(' ');
  };

  // Render main History list and Stats Dashboard if no active session is loaded
  if (!session) {
    const overallAccuracy = stats?.totalAnswered 
      ? Math.round(((stats.totalCorrect || 0) / stats.totalAnswered) * 100) 
      : 0;

    return (
      <>
        <Header title="Statistik & Riwayat" />

        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex-1 flex flex-col gap-6 px-4 md:pl-60 py-6 pb-20 animate-fade-in"
        >
          {/* Dashboard Summary Cards */}
          <motion.section variants={itemVariants} className="flex flex-col gap-3">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <span className="text-xl">🏆</span>
              <h3 className="text-xs font-black uppercase tracking-wider text-text-primary leading-none">
                RINGKASAN BELAJAR ANDA
              </h3>
            </div>
            
            <div className="grid grid-cols-1 min-[480px]:grid-cols-3 gap-3 w-full">
              <StatsCard
                title="Sesi Selesai"
                value={history.length}
                icon="📊"
                desc="Total paket selesai"
              />
              <StatsCard
                title="Soal Dijawab"
                value={stats?.totalAnswered ?? 0}
                icon="📝"
                desc="Total soal dikerjakan"
              />
              <StatsCard
                title="Akurasi Belajar"
                value={`${overallAccuracy}%`}
                icon="🎯"
                desc="Rasio jawaban benar"
              />
            </div>
          </motion.section>

          {/* Practice History List */}
          <motion.section variants={itemVariants} className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">⏱️</span>
                <h3 className="text-xs font-black uppercase tracking-wider text-text-primary leading-none">
                  RIWAYAT LATIHAN & UJIAN
                </h3>
              </div>
              <span className="text-[10px] font-black text-text-secondary uppercase">
                {history.length} Sesi Terbaca
              </span>
            </div>

            {history.length === 0 ? (
              <div className="glass border border-white/8 p-8 rounded-2xl flex flex-col items-center justify-center text-center gap-4 py-12">
                <span className="text-4xl text-text-secondary">📁</span>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-bold text-text-primary">Belum Ada Riwayat Ujian</h4>
                  <p className="text-xs font-semibold text-text-secondary leading-relaxed max-w-[280px]">
                    Selesaikan salah satu modul TPA atau TBI terlebih dahulu untuk melihat riwayat hasil belajar di sini.
                  </p>
                </div>
                <button
                  onClick={() => router.push('/')}
                  className="px-6 py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded-xl active:scale-95 transition-all outline-none"
                >
                  Latih Sekarang
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3.5">
                <AnimatePresence>
                  {history.map((item, idx) => {
                    const isItemTPA = item.testType === 'TPA';
                    const categoryLabel = getCategoryLabel(item.category, item.testType);
                    const formattedDate = new Date(item.timestamp).toLocaleString('id-ID', {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    });

                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="glass border border-white/8 p-4 rounded-2xl flex flex-col gap-4 hover:border-white/15 transition-all"
                      >
                        {/* Header Details */}
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border leading-none ${
                                isItemTPA 
                                  ? 'bg-primary/20 text-primary border-primary/30'
                                  : 'bg-accent/20 text-accent border-accent/30'
                              }`}>
                                {item.testType}
                              </span>
                              <span className="text-[10px] font-black text-text-secondary uppercase tracking-wider">
                                {item.mode === 'simulasi' ? 'Simulasi Ujian' : 'Latihan Mandiri'}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-text-primary mt-0.5 leading-none">
                              {categoryLabel}
                            </h4>
                            <span className="text-[10px] font-semibold text-text-secondary">
                              {formattedDate}
                            </span>
                          </div>

                          {/* Delete Session Icon */}
                          <button
                            onClick={() => {
                              if (window.confirm('Hapus riwayat latihan ini secara permanen?')) {
                                deleteSavedSession(item.id);
                              }
                            }}
                            className="p-1.5 rounded-lg border border-white/5 bg-white/2 hover:bg-error/15 hover:text-error hover:border-error/25 active:scale-95 transition-all text-text-secondary cursor-pointer"
                            title="Hapus Riwayat"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                          </button>
                        </div>

                        {/* Mid-Row Statistics Grid */}
                        <div className="grid grid-cols-3 gap-2 bg-white/2 border border-white/5 rounded-xl p-3 text-center">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] font-bold text-text-secondary leading-none">Skor Benar</span>
                            <span className="text-sm font-black text-text-primary mt-1">
                              {item.correctCount} <span className="text-[10px] text-text-secondary font-semibold">/ {item.totalQuestions}</span>
                            </span>
                          </div>
                          <div className="flex flex-col gap-0.5 border-x border-white/5">
                            <span className="text-[10px] font-bold text-text-secondary leading-none">Akurasi</span>
                            <span className="text-sm font-black text-text-primary mt-1">
                              {Math.round(item.accuracy)}%
                            </span>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] font-bold text-text-secondary leading-none">Durasi</span>
                            <span className="text-sm font-black text-text-primary mt-1">
                              {formatTime(item.duration)}
                            </span>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              loadSavedSession(item);
                              router.push('/pembahasan');
                            }}
                            className="flex-1 py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-black rounded-xl cursor-pointer transition-all active:scale-[0.98] outline-none flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            <span>📖 Review Pembahasan</span>
                          </button>
                          <button
                            onClick={() => {
                              loadSavedSession(item);
                            }}
                            className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-text-primary border border-white/8 text-xs font-black rounded-xl cursor-pointer transition-all active:scale-[0.98] outline-none"
                          >
                            Lihat Detail
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </motion.section>
        </motion.main>

        <BottomNav />
      </>
    );
  }

  // Under reviewing or completed mode (session is active)
  const isTPA = session.testType === 'TPA';
  const categoryLabel = getCategoryLabel(session.category, session.testType);

  // Group correct/total statistics per sub-category for this session
  const categoryStats: Record<string, { correct: number; total: number }> = {};
  session.questions.forEach((q, idx) => {
    const cat = q.category;
    if (!categoryStats[cat]) {
      categoryStats[cat] = { correct: 0, total: 0 };
    }
    categoryStats[cat].total++;
    if (session.answers[idx] === q.correctAnswer) {
      categoryStats[cat].correct++;
    }
  });

  const handleReview = () => {
    router.push('/pembahasan');
  };

  const handleClose = () => {
    quitQuiz();
    // Pushing again to hasil without active session returns to the main statistics dashboard!
    router.push('/hasil');
  };

  return (
    <>
      <Header title="Hasil Ujian" />

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-1 flex flex-col gap-6 px-4 md:pl-60 py-6"
      >
        {/* Congratulations Banner */}
        <motion.section variants={itemVariants} className="flex flex-col gap-1.5 text-center items-center py-4">
          <span className="text-5xl">🎉</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-accent mt-2">SESI SELESAI</span>
          <h2 className="text-2xl font-black tracking-tight leading-none mt-1">Ujian Selesai!</h2>
          <p className="text-sm font-semibold text-text-secondary leading-relaxed max-w-[350px]">
            Kerja bagus! Anda baru saja menyelesaikan sesi {session.testType} ({categoryLabel}).
          </p>
        </motion.section>

        {/* Stats cards grid */}
        {result && (
          <motion.section variants={itemVariants} className="grid grid-cols-2 gap-3">
            <StatsCard
              title="Skor Akhir"
              value={result.score}
              icon="🎯"
              desc={`Dari total ${result.total} soal`}
              accent={isTPA ? 'tpa' : 'tbi'}
            />
            <StatsCard
              title="Akurasi"
              value={`${Math.round(result.accuracy)}%`}
              icon="📈"
              desc={`${result.correct} Jawaban Benar`}
            />
            <StatsCard
              title="Total Waktu"
              value={formatTime(result.totalTime || Math.floor((Date.now() - session.startTime) / 1000))}
              icon="⏱️"
              desc="Durasi pengerjaan"
            />
            <StatsCard
              title="Rata-rata Waktu"
              value={`${Math.round(result.avgTimePerQuestion)}s`}
              icon="⚡"
              desc="Waktu rata-rata per soal"
            />
          </motion.section>
        )}

        {/* Categories Analysis */}
        <motion.section variants={itemVariants} className="glass border border-white/8 p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <span className="text-xl">📊</span>
            <h3 className="text-xs font-black uppercase tracking-wider text-text-primary leading-none">
              ANALISIS SUB-KATEGORI SOAL
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            {Object.keys(categoryStats).map((catKey) => {
              const stat = categoryStats[catKey];
              // Format category label beautifully
              const formattedLabel = getCategoryLabel(catKey, session.testType);

              return (
                <ResultBar
                  key={catKey}
                  label={formattedLabel}
                  correct={stat.correct}
                  total={stat.total}
                  type={session.testType}
                />
              );
            })}
          </div>
        </motion.section>

        {/* Call to action zone */}
        <motion.section variants={itemVariants} className="flex flex-col gap-3 mt-2">
          <button
            onClick={handleReview}
            className="w-full py-4 bg-accent hover:bg-accent-hover text-white text-sm font-black rounded-2xl cursor-pointer transition-all active:scale-[0.98] outline-none shadow-[0_4px_20px_rgba(95,99,242,0.25)] flex items-center justify-center gap-2"
          >
            <span>📖 Review Pembahasan Detail</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>

          <button
            onClick={handleClose}
            className="w-full py-3.5 bg-white/5 border border-white/8 hover:bg-white/10 text-text-primary text-sm font-black rounded-2xl cursor-pointer transition-all active:scale-[0.98] outline-none"
          >
            Kembali ke Riwayat
          </button>
        </motion.section>
      </motion.main>

      <BottomNav />
    </>
  );
}
