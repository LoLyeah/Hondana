'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import StatsCard from '../components/StatsCard';
import TestTypeCard from '../components/TestTypeCard';
import { useQuiz } from '../context/QuizContext';

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

export default function Home() {
  const router = useRouter();
  const { stats } = useQuiz();

  const handleSelectModule = (type: 'TPA' | 'TBI') => {
    router.push(`/kategori?type=${type}`);
  };

  return (
    <>
      <Header title="Hondana" />

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-1 flex flex-col gap-6 px-4 md:pl-60 py-6"
      >
        {/* Welcome Section */}
        <motion.section variants={itemVariants} className="flex flex-col gap-1.5">
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
        </motion.section>

        {/* Stats Grid */}
        <motion.section variants={itemVariants} className="grid grid-cols-1 min-[480px]:grid-cols-3 gap-3 w-full">
          <StatsCard
            title="Sesi Selesai"
            value={stats?.sessionsCompleted ?? 0}
            icon="📊"
            desc="Total sesi diselesaikan"
          />
          <StatsCard
            title="Total Soal"
            value={stats?.totalAnswered ?? 0}
            icon="📝"
            desc="Soal yang telah dijawab"
          />
          <StatsCard
            title="Akurasi Belajar"
            value={stats?.totalAnswered ? `${Math.round(((stats.totalCorrect || 0) / stats.totalAnswered) * 100)}%` : '0%'}
            icon="🎯"
            desc="Rasio jawaban benar"
          />
        </motion.section>

        {/* Modules Grid */}
        <motion.section variants={itemVariants} className="flex flex-col gap-4">
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
              description="Ujian kecakapan bahasa Inggris setara format TOEFL ITP dengan simulasi Structure dan Reading."
              subcategories={['Structure', 'Reading']}
              onClick={() => handleSelectModule('TBI')}
            />
          </div>
        </motion.section>
      </motion.main>

      <BottomNav />
    </>
  );
}
