'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../LoadingSpinner';
import { useSettings } from '../../context/QuizContext';

interface GroqModelsCatalogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GroqModelsCatalog({
  isOpen,
  onClose
}: GroqModelsCatalogProps) {
  const { settings, updateSettings } = useSettings();
  const [fetchedModels, setFetchedModels] = React.useState<any[]>([]);
  const [isLoadingModels, setIsLoadingModels] = React.useState(false);
  const [modelsFetchError, setModelsFetchError] = React.useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const aiProvider = settings?.aiProvider || 'built-in';
  const aiModel = settings?.aiModel || 'llama-3.1-8b-instant';
  const customApiKey = settings?.customApiKey || '';

  const fetchGroqModels = React.useCallback(async () => {
    setIsLoadingModels(true);
    setModelsFetchError(null);
    try {
      const res = await fetch('/api/groq-models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aiProvider, customApiKey })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFetchedModels(data.models || []);
      } else {
        setModelsFetchError(data.error || 'Gagal mengambil daftar model dari Groq.');
      }
    } catch (e: any) {
      setModelsFetchError(e.message || 'Terjadi kesalahan saat menghubungi API kuis.');
    } finally {
      setIsLoadingModels(false);
    }
  }, [aiProvider, customApiKey]);

  React.useEffect(() => {
    if (isOpen && (aiProvider === 'built-in' || aiProvider === 'groq-custom')) {
      fetchGroqModels();
    }
  }, [isOpen, aiProvider, fetchGroqModels]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="glass border border-white/10 w-full max-w-xl max-h-[85vh] flex flex-col p-6 shadow-2xl glow-tbi"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
              <div className="flex flex-col">
                <h2 className="text-lg font-black tracking-tight leading-none">🧠 Model Groq yang Tersedia</h2>
                <span className="text-[10px] text-text-secondary font-bold mt-1.5">Pilih model kuis dari daftar aktif di server Groq secara real-time</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-white/8 rounded-full cursor-pointer text-text-secondary hover:text-text-primary transition-all outline-none min-h-0 min-w-0"
                style={{ minBlockSize: 0, minInlineSize: 0 }}
                aria-label="Tutup Catalog"
              >
                ❌
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3 scrollbar-thin">
              {isLoadingModels ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <LoadingSpinner size="md" label="Menghubungi API Groq & Mengambil Model..." />
                </div>
              ) : modelsFetchError ? (
                <div className="p-5 bg-error/10 border border-error/20 rounded-2xl flex flex-col gap-3 text-center items-center">
                  <span className="text-3xl">⚠️</span>
                  <span className="text-xs font-bold text-error leading-normal">{modelsFetchError}</span>
                  <button 
                    onClick={fetchGroqModels}
                    className="px-5 py-2 bg-error/20 hover:bg-error/35 text-error text-[10px] font-black rounded-xl cursor-pointer active:scale-95 transition-all outline-none"
                  >
                    Coba Ulang
                  </button>
                </div>
              ) : fetchedModels.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 gap-2 text-text-secondary">
                  <span className="text-3xl">📁</span>
                  <span className="text-xs font-bold">Tidak ada model aktif ditemukan.</span>
                </div>
              ) : (
                <div className="flex flex-col gap-2.5">
                  {fetchedModels.map((model: any) => {
                    const isSelected = aiModel === model.id;
                    return (
                      <div 
                        key={model.id}
                        onClick={() => {
                          updateSettings({ aiModel: model.id });
                          onClose();
                        }}
                        className={`p-3.5 border rounded-2xl flex flex-col gap-2 hover:bg-white/4 cursor-pointer transition-all active:scale-[0.99] select-none ${
                          isSelected 
                            ? 'border-accent/40 bg-accent/5 shadow-md shadow-accent/5' 
                            : 'border-white/6 bg-white/2 hover:border-white/10'
                        }`}
                      >
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <div className="flex flex-col">
                            <span className={`text-xs font-black font-mono ${isSelected ? 'text-accent' : 'text-text-primary'}`}>{model.id}</span>
                            <span className="text-[9px] text-text-secondary font-bold uppercase tracking-wider mt-0.5">Disediakan oleh: {model.owned_by}</span>
                          </div>
                          
                          <div className="flex items-center gap-1.5">
                            {model.active !== undefined && (
                              <span className={`text-[8px] font-black px-1.5 py-0.5 rounded leading-none ${
                                model.active ? 'bg-success/15 text-success border border-success/25' : 'bg-white/5 text-text-secondary border border-white/5'
                              }`}>
                                {model.active ? 'AKTIF' : 'NONAKTIF'}
                              </span>
                            )}
                            {isSelected && (
                              <span className="text-[9px] font-bold text-accent bg-accent/15 border border-accent/25 px-2 py-0.5 rounded-full">
                                Terpilih
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-[9px] font-bold text-text-secondary pt-1.5 border-t border-white/5 mt-0.5">
                          {model.context_window && (
                            <div className="flex items-center gap-1">
                              <span>Konteks Maksimal:</span>
                              <span className="text-text-primary">{(model.context_window / 1024).toFixed(0)}k token</span>
                            </div>
                          )}
                          {model.created && (
                            <div className="flex items-center gap-1">
                              <span>Rilis:</span>
                              <span className="text-text-primary">{new Date(model.created * 1000).toLocaleDateString('id-ID')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-white/5 pt-4 mt-4 flex justify-end">
              <button
                onClick={onClose}
                className="py-2 px-5 bg-accent hover:bg-accent-hover text-white text-xs font-black rounded-xl cursor-pointer active:scale-[0.98] outline-none shadow-lg min-h-0 min-w-0"
                style={{ minBlockSize: 0, minInlineSize: 0 }}
              >
                Tutup Catalog
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
