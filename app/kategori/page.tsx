'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import CategoryCard from '../../components/CategoryCard';
import QuestionExhaustionModal from '../../components/QuestionExhaustionModal';
import { useQuiz } from '../../context/QuizContext';
import { TestType } from '../../lib/types';
import { getTPAQuestions } from '../../data/tpa-questions';
import { getTBIQuestions } from '../../data/tbi-questions';
import LoadingSpinner from '../../components/LoadingSpinner';
import LoadingSkeleton from '../../components/LoadingSkeleton';

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

function KategoriContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawType = searchParams.get('type') || 'TPA';
  const type = rawType === 'TBI' ? 'TBI' : 'TPA';

  const { stats, settings, updateSettings, startSimulasi, startLatihan, loading } = useQuiz();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);

  // Exhaustion modal state — must be before any conditional return (Rules of Hooks)
  const [exhaustionModal, setExhaustionModal] = useState<{
    isOpen: boolean;
    catKey: string;
    catLabel: string;
    available: number;
  }>({ isOpen: false, catKey: '', catLabel: '', available: 0 });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <>
        <Header title={`Modul ${type}`} />
        <main className="flex-1 flex flex-col gap-6 px-4 md:pl-60 py-6 min-h-[60vh] opacity-60">
          {/* Config area mimic */}
          <div className="glass border border-white/5 p-5 flex flex-col gap-4 animate-pulse">
            <div className="h-3.5 w-36 bg-white/10 rounded-md border-b border-white/5 pb-2" />
            <div className="flex flex-col gap-4 mt-2">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex flex-col gap-1.5">
                    <div className="h-4 w-32 bg-white/10 rounded-md" />
                    <div className="h-2 w-44 bg-white/5 rounded-md" />
                  </div>
                  <div className="w-12 h-6 rounded-full bg-white/10" />
                </div>
              ))}
            </div>
          </div>

          {/* Main simulation button mimic */}
          <div className="glass border border-white/5 p-6 h-28 animate-pulse rounded-2xl bg-white/3" />
          
          {/* Categories Grid mimic */}
          <div className="flex flex-col gap-2.5">
            <div className="h-3.5 w-40 bg-white/10 rounded-md animate-pulse" />
            <LoadingSkeleton type="categories" count={4} className="mt-2" />
          </div>
        </main>
        <BottomNav />
      </>
    );
  }

  const useAI = settings.useAI;
  const latihanCount = settings.latihanCount;

  const setUseAI = (val: boolean) => {
    updateSettings({ useAI: val });
  };

  const setLatihanCount = (val: number) => {
    updateSettings({ latihanCount: val });
  };

  const handleStartSimulasi = async () => {
    await startSimulasi(type, useAI);
    router.push('/quiz');
  };

  // Returns how many unique offline questions exist for a category
  const getAvailableOfflineCount = (catKey: string): number => {
    if (type === 'TPA') {
      return getTPAQuestions().filter((q) => q.category === catKey).length;
    }
    return getTBIQuestions().filter((q) => q.category === catKey).length;
  };

  const doStartLatihan = async (catKey: string) => {
    await startLatihan(type, catKey, latihanCount, useAI);
    router.push('/quiz');
  };

  const handleStartLatihan = (catKey: string) => {
    // If AI is on, no need to check exhaustion
    if (useAI) {
      doStartLatihan(catKey);
      return;
    }
    const available = getAvailableOfflineCount(catKey);
    if (available < latihanCount) {
      const catEntry = activeCategories.find((c) => c.key === catKey);
      setExhaustionModal({
        isOpen: true,
        catKey,
        catLabel: catEntry?.label || catKey,
        available
      });
    } else {
      doStartLatihan(catKey);
    }
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
    { key: 'structure-completion', label: 'Sentence Completion', group: 'Structure & Written' },
    { key: 'reading-comprehension', label: 'Passage Comprehension', group: 'Reading Comprehension' }
  ];

  const activeCategories = type === 'TPA' ? tpaCategories : tbiCategories;

  // Group categories for rendering
  const groups = Array.from(new Set(activeCategories.map((c) => c.group)));

  return (
    <>
      <Header title={`Modul ${type}`} showBack onBack={() => router.push('/')} />

      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex-1 flex flex-col gap-6 px-4 md:pl-60 py-6"
      >
        {/* Loading Indicator Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex flex-col items-center justify-center">
            <div className="glass p-8 flex flex-col items-center justify-center border-accent/20 max-w-[320px] mx-4 text-center">
              <LoadingSpinner size="lg" label="Menyiapkan Paket Soal AI..." />
              <p className="text-[10px] font-bold text-text-secondary mt-3.5 leading-relaxed">
                Harap tunggu, model AI sedang merancang paket soal simulasi khusus untuk Anda.
              </p>
            </div>
          </div>
        )}

        {/* Configurations Area */}
        <div className="glass border border-white/8 p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-text-secondary">
              Konfigurasi Latihan ({type})
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            {/* AI Mode Selector */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-bold">Gunakan Soal AI</span>
                <span className="text-[10px] font-bold text-text-secondary leading-tight">
                  Soal dihasilkan secara dinamis dan cerdas menggunakan AI
                </span>
              </div>
              <button
                onClick={() => setUseAI(!useAI)}
                className={`relative inline-flex h-[31px] w-[51px] shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out outline-none min-h-0 min-w-0 [min-block-size:0] [min-inline-size:0] ${
                  useAI ? 'bg-[#34C759]' : 'bg-[#E9E9EA] dark:bg-[#39393D]'
                }`}
                style={{ minBlockSize: 0, minInlineSize: 0 }}
                aria-label="Toggle AI Mode"
              >
                <span
                  className={`absolute top-[2px] left-[2px] block h-[27px] w-[27px] transform rounded-full bg-white shadow-[0_3px_8px_rgba(0,0,0,0.15),0_3px_1px_rgba(0,0,0,0.06)] transition-transform duration-200 ease-in-out ${
                    useAI ? 'translate-x-[20px]' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="w-full h-px bg-[var(--border-badge)]" />

            {/* Timer Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-bold">Batasan Waktu (Timer)</span>
                <span className="text-[10px] font-bold text-text-secondary leading-tight">
                  Aktifkan batasan waktu ujian per sesi (TPA: 60 menit, TBI: 50 menit)
                </span>
              </div>
              <button
                onClick={() => updateSettings({ timerEnabled: !settings.timerEnabled })}
                className={`relative inline-flex h-[31px] w-[51px] shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out outline-none min-h-0 min-w-0 [min-block-size:0] [min-inline-size:0] ${
                  settings.timerEnabled ? 'bg-[#34C759]' : 'bg-[#E9E9EA] dark:bg-[#39393D]'
                }`}
                style={{ minBlockSize: 0, minInlineSize: 0 }}
                aria-label="Toggle Timer"
              >
                <span
                  className={`absolute top-[2px] left-[2px] block h-[27px] w-[27px] transform rounded-full bg-white shadow-[0_3px_8px_rgba(0,0,0,0.15),0_3px_1px_rgba(0,0,0,0.06)] transition-transform duration-200 ease-in-out ${
                    settings.timerEnabled ? 'translate-x-[20px]' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="w-full h-px bg-[var(--border-badge)]" />

            {/* Sound Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-bold">Efek Suara Interaktif</span>
                <span className="text-[10px] font-bold text-text-secondary leading-tight">
                  Putar audio singkat ketika menjawab benar atau salah
                </span>
              </div>
              <button
                onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                className={`relative inline-flex h-[31px] w-[51px] shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out outline-none min-h-0 min-w-0 [min-block-size:0] [min-inline-size:0] ${
                  settings.soundEnabled ? 'bg-[#34C759]' : 'bg-[#E9E9EA] dark:bg-[#39393D]'
                }`}
                style={{ minBlockSize: 0, minInlineSize: 0 }}
                aria-label="Toggle Sound Effects"
              >
                <span
                  className={`absolute top-[2px] left-[2px] block h-[27px] w-[27px] transform rounded-full bg-white shadow-[0_3px_8px_rgba(0,0,0,0.15),0_3px_1px_rgba(0,0,0,0.06)] transition-transform duration-200 ease-in-out ${
                    settings.soundEnabled ? 'translate-x-[20px]' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Simulasi Ujian Section */}
        <div>
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
                Ujian full paket terstandarisasi. {type === 'TPA' ? '60 soal TPA seimbang (Verbal, Numerik, Logika) selama 60 menit' : '50 soal TBI (Structure & Reading) selama 50 menit'}. Tanpa penalti nilai.
              </p>
            </div>
            <button
              onClick={handleStartSimulasi}
              className="w-full py-3.5 bg-accent hover:bg-accent-hover text-white text-sm font-black rounded-2xl cursor-pointer transition-all active:scale-[0.98] outline-none shadow-[0_4px_20px_rgba(95,99,242,0.25)] flex items-center justify-center gap-2"
            >
              <span>🚀 Mulai Simulasi Ujian</span>
            </button>
          </div>
        </div>

        {/* Latihan Per Kategori Section */}
        <div className="flex flex-col gap-4">
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
                        ? (stats?.tpaStats as any)?.[cat.key]
                        : (stats?.tbiStats as any)?.[cat.key];
                        
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
        </div>
      </motion.main>

      <BottomNav />

      {/* Exhaustion Modal */}
      <QuestionExhaustionModal
        isOpen={exhaustionModal.isOpen}
        categoryLabel={exhaustionModal.catLabel}
        availableCount={exhaustionModal.available}
        requestedCount={latihanCount}
        onUseAI={() => {
          setExhaustionModal((prev) => ({ ...prev, isOpen: false }));
          updateSettings({ useAI: true });
          doStartLatihan(exhaustionModal.catKey);
        }}
        onContinueAnyway={() => {
          setExhaustionModal((prev) => ({ ...prev, isOpen: false }));
          doStartLatihan(exhaustionModal.catKey);
        }}
        onCancel={() => setExhaustionModal((prev) => ({ ...prev, isOpen: false }))}
      />
    </>
  );
}

export default function Kategori() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <LoadingSpinner size="lg" label="Memuat Kategori..." />
      </div>
    }>
      <KategoriContent />
    </Suspense>
  );
}
