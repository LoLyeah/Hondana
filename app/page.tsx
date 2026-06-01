'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import StatsCard from '../components/StatsCard';
import TestTypeCard from '../components/TestTypeCard';
import { useQuiz } from '../context/QuizContext';

export default function Home() {
  const router = useRouter();
  const { stats } = useQuiz();

  const handleSelectModule = (type: 'TPA' | 'TBI') => {
    router.push(`/kategori?type=${type}`);
  };

  return (
    <>
      <Header title="Hondana" />

      <main className="flex-1 flex flex-col gap-6 px-4 py-6">
        {/* Welcome Section */}
        <section className="flex flex-col gap-1.5 animate-float">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎯</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-accent">PREMIUM PREPARATION</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight leading-tight">
            Siap Hadapi Ujian Kerja?
          </h2>
          <p className="text-sm font-semibold text-text-secondary leading-relaxed">
            Latih kemampuan berpikir taktis TPA dan keahlian bahasa TBI sesuai standar resmi ujian seleksi.
          </p>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 gap-3 w-full animate-float" style={{ animationDelay: '0.1s' }}>
          <StatsCard
            title="Total XP"
            value={stats.totalXP}
            icon="🔥"
            desc="Kumpulkan untuk naik level"
          />
          <StatsCard
            title="Sesi Selesai"
            value={stats.sessionsCompleted}
            icon="📊"
            desc="Total latihan diselesaikan"
          />
          <StatsCard
            title="Current Streak"
            value={stats.currentStreak}
            icon="⚡"
            desc="Pertahankan hari beruntun"
          />
          <StatsCard
            title="Level"
            value={stats.level}
            icon="🏆"
            desc="Tingkat kompetensi saat ini"
          />
        </section>

        {/* Modules Grid */}
        <section className="flex flex-col gap-4 animate-float" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-wider text-text-secondary">
              Pilih Modul Ujian
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            <TestTypeCard
              type="TPA"
              title="TPA (Tes Potensi Akademik)"
              description="Evaluasi kemampuan verbal, matematika analitis, deret angka logis, dan penalaran figural berpola."
              subcategories={['Verbal', 'Numerik', 'Logika', 'Figural']}
              onClick={() => handleSelectModule('TPA')}
            />

            <TestTypeCard
              type="TBI"
              title="TBI (Tes Bahasa Inggris)"
              description="Ujian kecakapan bahasa Inggris setara format TOEFL ITP dengan simulasi Listening, Structure, dan Reading."
              subcategories={['Listening', 'Structure', 'Reading']}
              onClick={() => handleSelectModule('TBI')}
            />
          </div>
        </section>
      </main>

      <BottomNav />
    </>
  );
}
