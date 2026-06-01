'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import DifficultySelector from '../../components/DifficultySelector';
import CategoryCard from '../../components/CategoryCard';
import { useQuiz } from '../../context/QuizContext';
import { Difficulty, TestType } from '../../lib/types';

function KategoriContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawType = searchParams.get('type') || 'TPA';
  const type = rawType === 'TBI' ? 'TBI' : 'TPA';

  const { stats, settings, updateSettings, startSimulasi, startLatihan, loading } = useQuiz();
  const [difficulty, setDifficulty] = useState<Difficulty>('sedang');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const useAI = settings.useAI;
  const latihanCount = settings.latihanCount;

  const setUseAI = (val: boolean) => {
    updateSettings({ useAI: val });
  };

  const setLatihanCount = (val: number) => {
    updateSettings({ latihanCount: val });
  };

  const handleStartSimulasi = async () => {
    await startSimulasi(type, difficulty, useAI);
    router.push('/quiz');
  };

  const handleStartLatihan = async (catKey: string) => {
    await startLatihan(type, catKey, difficulty, latihanCount, useAI);
    router.push('/quiz');
  };

  // Sub-category specifications
  const tpaCategories = [
    { key: 'verbal-sinonim', label: 'Sinonim (Persamaan Kata)', group: 'Verbal' },
    { key: 'verbal-antonim', label: 'Antonim (Lawan Kata)', group: 'Verbal' },
    { key: 'verbal-analogi', label: 'Analogi (Hubungan Kata)', group: 'Verbal' },
    { key: 'verbal-bacaan', label: 'Pemahaman Bacaan', group: 'Verbal' },
    { key: 'numerik-deret', label: 'Deret Angka Logis', group: 'Numerik' },
    { key: 'numerik-aritmatika', label: 'Aritmatika Dasar', group: 'Numerik' },
    { key: 'numerik-perbandingan', label: 'Perbandingan Kuantitatif', group: 'Numerik' },
    { key: 'numerik-cerita', label: 'Soal Cerita / Penalaran', group: 'Numerik' },
    { key: 'logika-penalaran', label: 'Penalaran Logis', group: 'Logika' },
    { key: 'logika-silogisme', label: 'Silogisme (Penarikan Kesimpulan)', group: 'Logika' },
    { key: 'logika-analitis', label: 'Penalaran Analitis', group: 'Logika' },
    { key: 'logika-diagram', label: 'Diagram Logika (Figural)', group: 'Logika' }
  ];

  const tbiCategories = [
    { key: 'listening-short', label: 'Short Conversations', group: 'Listening Comprehension' },
    { key: 'listening-long', label: 'Long Conversations', group: 'Listening Comprehension' },
    { key: 'listening-talks', label: 'Talks & Lectures', group: 'Listening Comprehension' },
    { key: 'structure-completion', label: 'Sentence Completion', group: 'Structure & Written' },
    { key: 'structure-error', label: 'Error Recognition', group: 'Structure & Written' },
    { key: 'reading-comprehension', label: 'Passage Comprehension', group: 'Reading Comprehension' },
    { key: 'reading-vocabulary', label: 'Vocabulary in Context', group: 'Reading Comprehension' }
  ];

  const activeCategories = type === 'TPA' ? tpaCategories : tbiCategories;

  // Group categories for rendering
  const groups = Array.from(new Set(activeCategories.map((c) => c.group)));

  return (
    <>
      <Header title={`Modul ${type}`} showBack onBack={() => router.push('/')} />

      <main className="flex-1 flex flex-col gap-6 px-4 py-6">
        {/* Loading Indicator Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-3">
            <span className="text-4xl animate-spin">⏳</span>
            <span className="text-sm font-bold text-accent animate-pulse">Menyiapkan Paket Soal AI Groq...</span>
          </div>
        )}

        {/* Configurations Area */}
        <section className="glass border border-white/8 p-5 flex flex-col gap-4 animate-float">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-text-secondary">
              Konfigurasi Latihan ({type})
            </h3>
          </div>

          <DifficultySelector selected={difficulty} onChange={setDifficulty} />

          {/* AI Mode Selector */}
          <div className="flex items-center justify-between p-3 border border-white/6 bg-white/3 rounded-2xl">
            <div className="flex flex-col">
              <span className="text-sm font-bold">Gunakan Soal AI Groq (Llama 3.3)</span>
              <span className="text-[10px] font-bold text-text-secondary">Soal dihasilkan cerdas oleh AI Groq</span>
            </div>
            <button
              onClick={() => setUseAI(!useAI)}
              className={`w-12 h-6 rounded-full p-1 transition-all cursor-pointer ${useAI ? 'bg-accent' : 'bg-white/10'}`}
              aria-label="Toggle AI Mode"
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-all ${useAI ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        </section>

        {/* Simulasi Ujian Section */}
        <section className="animate-float" style={{ animationDelay: '0.1s' }}>
          <div className="glass border border-accent/20 bg-accent/5 p-6 flex flex-col gap-4 glow-tpa">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30 leading-none">
                  MODE UTAMA
                </span>
                <span className="text-xs font-bold text-text-secondary">Simulasi Ujian Realistis</span>
              </div>
              <h2 className="text-xl font-black tracking-tight">🎯 Sesi Simulasi Ujian</h2>
              <p className="text-xs font-semibold text-text-secondary leading-relaxed">
                Ujian full paket terstandarisasi. {type === 'TPA' ? '60 soal TPA seimbang (Verbal, Numerik, Logika) selama 60 menit' : '50 soal TBI (Listening, Structure, Reading) selama 40 menit'}. Tanpa penalti nilai.
              </p>
            </div>
            <button
              onClick={handleStartSimulasi}
              className="w-full py-3.5 bg-accent hover:bg-accent-hover text-white text-sm font-black rounded-2xl cursor-pointer transition-all active:scale-[0.98] outline-none shadow-[0_4px_20px_rgba(95,99,242,0.25)] flex items-center justify-center gap-2"
            >
              <span>🚀 Mulai Simulasi Ujian</span>
            </button>
          </div>
        </section>

        {/* Latihan Per Kategori Section */}
        <section className="flex flex-col gap-4 animate-float" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-black uppercase tracking-wider text-text-secondary">
              📚 Latihan Per Kategori
            </h3>
            <p className="text-xs font-semibold text-text-secondary">
              Latih kemampuan spesifik sub-kategori. Pilih jumlah soal latihan Anda di bawah ini.
            </p>
          </div>

          {/* Latihan Count Selector */}
          <div className="flex items-center gap-2 bg-white/4 border border-white/8 rounded-2xl p-1 w-fit">
            {[10, 20, 30].map((count) => (
              <button
                key={count}
                onClick={() => setLatihanCount(count)}
                className={`py-1.5 px-4 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                  latihanCount === count ? 'bg-accent text-white' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {count} Soal
              </button>
            ))}
          </div>

          {/* Category grids grouped */}
          <div className="flex flex-col gap-6">
            {groups.map((groupName) => (
              <div key={groupName} className="flex flex-col gap-3">
                <h4 className="text-xs font-black uppercase tracking-widest text-accent border-l-2 border-accent pl-2 leading-none">
                  {groupName}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeCategories
                    .filter((c) => c.group === groupName)
                    .map((cat) => {
                      const stat = type === 'TPA' 
                        ? stats.tpaStats[cat.key as keyof typeof stats.tpaStats]
                        : stats.tbiStats[cat.key as keyof typeof stats.tbiStats];
                        
                      const correct = stat ? stat.correct : 0;
                      const totalVal = stat ? stat.total : 0;

                      return (
                        <CategoryCard
                          key={cat.key}
                          title={cat.label}
                          type={type}
                          correct={correct}
                          total={totalVal}
                          onClick={() => handleStartLatihan(cat.key)}
                        />
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </>
  );
}

export default function Kategori() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white gap-3">
        <span className="text-4xl animate-spin">⏳</span>
        <span className="text-sm font-bold text-accent animate-pulse">Memuat Kategori...</span>
      </div>
    }>
      <KategoriContent />
    </Suspense>
  );
}
