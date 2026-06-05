'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePWAInstall } from '../../hooks/usePWAInstall';

export default function PwaInstallSection() {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [installStatus, setInstallStatus] = React.useState<'idle' | 'accepted' | 'dismissed'>('idle');

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass border border-accent/30 bg-accent/5 p-5 flex flex-col gap-4 glow-tbi"
    >
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-base">📲</span>
          <h3 className="text-xs font-black uppercase tracking-wider text-text-primary leading-none">
            PASANG APLIKASI
          </h3>
        </div>
        <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30 leading-none">
          REKOMENDASI
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {isInstalled ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="w-14 h-14 rounded-2xl bg-success/10 border border-success/20 flex items-center justify-center text-2xl">
              ✅
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="text-sm font-black text-success">Aplikasi Sudah Terpasang!</span>
              <span className="text-[10px] font-bold text-text-secondary leading-normal max-w-[260px]">
                Hondana sudah berjalan sebagai aplikasi. Buka dari layar utama perangkat Anda.
              </span>
            </div>
          </div>
        ) : isIOS ? (
          <div className="flex flex-col gap-3">
            <div className="p-4 bg-accent/5 border border-accent/15 rounded-2xl flex flex-col gap-3">
              <span className="text-[11px] font-black text-accent uppercase tracking-wide">Cara Pasang di iPhone / iPad</span>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-accent/20 text-accent text-[9px] font-black flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <span className="text-[11px] font-semibold text-text-primary leading-relaxed">
                    Ketuk ikon <span className="font-black">Bagikan</span> <span className="text-accent">⬆</span> di toolbar bawah Safari
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-accent/20 text-accent text-[9px] font-black flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <span className="text-[11px] font-semibold text-text-primary leading-relaxed">
                    Gulir ke bawah dan pilih <span className="font-black">&quot;Tambahkan ke Layar Utama&quot;</span>
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-accent/20 text-accent text-[9px] font-black flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <span className="text-[11px] font-semibold text-text-primary leading-relaxed">
                    Ketuk <span className="font-black">&quot;Tambahkan&quot;</span> di pojok kanan atas
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : isInstallable ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 p-3.5 bg-white/3 border border-white/6 rounded-2xl">
              <img src="/icon-192.png" alt="Hondana" className="w-12 h-12 rounded-xl shrink-0" />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-black text-text-primary truncate">Hondana</span>
                <span className="text-[10px] font-bold text-text-secondary">Latihan TPA & TBI — Offline Ready</span>
              </div>
            </div>

            {installStatus === 'dismissed' ? (
              <div className="flex items-center gap-2 text-[10px] font-bold text-text-secondary p-2.5 bg-white/3 rounded-xl border border-white/5">
                <span>ℹ️</span>
                <span>Anda menutup dialog. Ketuk ikon ⊕ di address bar browser untuk memasang aplikasi kapan saja.</span>
              </div>
            ) : (
              <button
                onClick={async () => {
                  const outcome = await install();
                  if (outcome !== 'unavailable') setInstallStatus(outcome);
                }}
                className="w-full py-3.5 bg-accent hover:bg-accent-hover text-white text-xs font-black rounded-2xl cursor-pointer transition-all active:scale-[0.98] outline-none flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Pasang Hondana di Perangkat Ini
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2.5 py-3 text-center">
            <span className="text-2xl">🌐</span>
            <span className="text-xs font-bold text-text-secondary leading-normal max-w-[260px]">
              Browser Anda belum mendukung pemasangan PWA, atau aplikasi sudah terpasang. Gunakan Chrome / Edge untuk pengalaman terbaik.
            </span>
          </div>
        )}

        <div className="p-3 bg-white/3 border border-white/6 rounded-2xl flex flex-col gap-1 text-[10px] text-text-secondary leading-normal select-none">
          <span className="font-bold text-text-primary/70">ℹ️ Apa itu PWA?</span>
          <span>Hondana dapat dipasang sebagai aplikasi di perangkat Anda — berjalan seperti aplikasi native, bisa digunakan saat offline, dan tidak memerlukan toko aplikasi.</span>
        </div>
      </div>
    </motion.section>
  );
}
