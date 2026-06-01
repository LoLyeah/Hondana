'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import StatsCard from '../../components/StatsCard';
import ResultBar from '../../components/ResultBar';
import { useQuiz } from '../../context/QuizContext';
import { SessionResult, TestType } from '../../lib/types';

export default function Hasil() {
  const router = useRouter();
  const { session, endQuiz, quitQuiz } = useQuiz();
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
        
        setResult({
          correct,
          wrong,
          skipped,
          total,
          score: correct,
          accuracy,
          totalTime: 0, // Placeholder
          avgTimePerQuestion: 0,
          xpEarned: 50 // Session finish bonus
        });
      }
    }
  }, [session, endQuiz]);

  if (!session) {
    return (
      <>
        <Header title="Hasil Latihan" />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center gap-4">
          <span className="text-5xl">📊</span>
          <h2 className="text-xl font-bold">Belum ada Sesi Latihan</h2>
          <p className="text-sm text-text-secondary leading-relaxed max-w-[360px]">
            Selesaikan modul TPA atau TBI terlebih dahulu untuk melihat analisis hasil pencapaian di sini.
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded-xl active:scale-95 transition-all outline-none"
          >
            Latih Sekarang
          </button>
        </main>
        <BottomNav />
      </>
    );
  }

  const isTPA = session.testType === 'TPA';
  const accentText = isTPA ? 'text-amber-500' : 'text-cyan-500';

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
    router.push('/');
  };

  // Helper formatting for durations
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  };

  return (
    <>
      <Header title="Hasil Ujian" />

      <main className="flex-1 flex flex-col gap-6 px-4 py-6">
        {/* Congratulations Banner */}
        <section className="flex flex-col gap-1.5 text-center items-center py-4 animate-float">
          <span className="text-5xl">🎉</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-accent mt-2">SESI SELESAI</span>
          <h2 className="text-2xl font-black tracking-tight leading-none mt-1">Ujian Selesai!</h2>
          <p className="text-sm font-semibold text-text-secondary leading-relaxed max-w-[350px]">
            Kerja bagus! Anda baru saja menyelesaikan sesi {session.testType} ({session.mode === 'simulasi' ? 'Simulasi' : 'Latihan'}).
          </p>
        </section>

        {/* Stats cards grid */}
        {result && (
          <section className="grid grid-cols-2 gap-3 animate-float" style={{ animationDelay: '0.1s' }}>
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
              title="Bonus Sesi"
              value={`+${result.xpEarned} XP`}
              icon="🔥"
              desc="Bonus menyelesaikan sesi"
            />
          </section>
        )}

        {/* Categories Analysis */}
        <section className="glass border border-white/8 p-5 flex flex-col gap-4 animate-float" style={{ animationDelay: '0.2s' }}>
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
              const formattedLabel = catKey.split('-').slice(1).join(' ');

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
        </section>

        {/* Call to action zone */}
        <section className="flex flex-col gap-3 mt-2 animate-float" style={{ animationDelay: '0.3s' }}>
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
            Kembali ke Beranda
          </button>
        </section>
      </main>

      <BottomNav />
    </>
  );
}
