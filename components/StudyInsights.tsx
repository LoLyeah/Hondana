'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserStats } from '../lib/types';

interface StudyInsightsProps {
  stats: UserStats;
}

export default function StudyInsights({ stats }: StudyInsightsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Generate dynamic professional insights based on stats
  const insights = React.useMemo(() => {
    const list: string[] = [];

    // Calculate subcategory accuracies
    let verbalCorrect = 0, verbalTotal = 0;
    let numerikCorrect = 0, numerikTotal = 0;
    let logikaCorrect = 0, logikaTotal = 0;
    let figuralCorrect = 0, figuralTotal = 0;
    let structCorrect = 0, structTotal = 0;
    let readCorrect = 0, readTotal = 0;

    Object.entries(stats.tpaStats || {}).forEach(([catKey, stat]) => {
      if (catKey.startsWith('verbal-')) {
        verbalTotal += stat.total;
        verbalCorrect += stat.correct;
      } else if (catKey.startsWith('numerik-')) {
        numerikTotal += stat.total;
        numerikCorrect += stat.correct;
      } else if (catKey.startsWith('logika-') && catKey !== 'logika-diagram') {
        logikaTotal += stat.total;
        logikaCorrect += stat.correct;
      } else if (catKey === 'logika-diagram') {
        figuralTotal += stat.total;
        figuralCorrect += stat.correct;
      }
    });

    Object.entries(stats.tbiStats || {}).forEach(([catKey, stat]) => {
      if (catKey.startsWith('structure-') || catKey.startsWith('listening-')) {
        structTotal += stat.total;
        structCorrect += stat.correct;
      } else if (catKey.startsWith('reading-') || catKey === 'verbal-bacaan') {
        readTotal += stat.total;
        readCorrect += stat.correct;
      }
    });

    const categories = [
      { name: 'Verbal', correct: verbalCorrect, total: verbalTotal },
      { name: 'Numerik', correct: numerikCorrect, total: numerikTotal },
      { name: 'Logika', correct: logikaCorrect, total: logikaTotal },
      { name: 'Figural', correct: figuralCorrect, total: figuralTotal },
      { name: 'TBI Structure', correct: structCorrect, total: structTotal },
      { name: 'TBI Reading', correct: readCorrect, total: readTotal }
    ];

    // Filter categories that have been practiced
    const practiced = categories.filter(c => c.total > 0);

    if (practiced.length === 0) {
      list.push("Selamat datang! Mulailah dengan mengambil satu sesi Simulasi Ujian untuk mengukur tingkat kemampuan awal Anda.");
      list.push("Tips: Gunakan Latihan Per Kategori untuk melatih materi spesifik yang menurut Anda paling menantang.");
    } else {
      // Find lowest accuracy category
      const accuracies = practiced.map(c => ({
        name: c.name,
        acc: Math.round((c.correct / c.total) * 100),
        total: c.total
      }));

      // Sort by accuracy ascending
      accuracies.sort((a, b) => a.acc - b.acc);

      const lowest = accuracies[0];
      if (lowest.acc < 70) {
        list.push(`Fokus Latihan: Akurasi materi ${lowest.name} Anda adalah ${lowest.acc}%. Cobalah lakukan 10-20 latihan soal untuk meningkatkan pemahaman.`);
      } else {
        list.push(`Kerja bagus! Akurasi terendah Anda adalah pada materi ${lowest.name} (${lowest.acc}%). Teruskan latihan untuk mempertahankan performa.`);
      }

      // Check for high accuracy categories to motivate
      const highest = [...accuracies].sort((a, b) => b.acc - a.acc)[0];
      if (highest.acc >= 85) {
        list.push(`Kekuatan Utama: Anda sangat mahir dalam materi ${highest.name} dengan akurasi ${highest.acc}%. Pertahankan konsistensi ini!`);
      }

      // general professional exam tips
      list.push("Manajemen Waktu: Saat ujian TPA asli, targetkan penyelesaian rata-rata 50-60 detik per soal agar memiliki waktu sisa untuk meninjau kembali jawaban.");
      list.push("Strategi TOEFL TBI: Pada bagian Structure, selalu analisis subjek dan kata kerja (verb) terlebih dahulu sebelum membaca seluruh pilihan jawaban.");
    }

    return list;
  }, [stats]);

  // Rotate through insights every 6 seconds
  useEffect(() => {
    if (insights.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % insights.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [insights.length]);

  return (
    <div className="glass border border-white/8 p-5 flex flex-col gap-3 h-full min-h-[220px] select-none text-left relative overflow-hidden">
      <div className="flex items-center gap-2 border-b border-white/5 pb-2">
        <span className="text-base text-amber-400">💡</span>
        <h3 className="text-xs font-black uppercase tracking-wider text-text-primary leading-none">
          REKOMENDASI BELAJAR (INSIGHTS)
        </h3>
      </div>

      <div className="relative flex-1 flex items-center py-2">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="text-xs md:text-sm font-semibold text-text-secondary leading-relaxed pr-6"
          >
            {insights[currentIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
