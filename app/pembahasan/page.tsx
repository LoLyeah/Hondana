'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import ProgressBar from '../../components/ProgressBar';
import QuizOption from '../../components/QuizOption';
import FiguralDisplay from '../../components/FiguralDisplay';
import TranscriptCard from '../../components/TranscriptCard';
import PassageCard from '../../components/PassageCard';
import { useQuiz } from '../../context/QuizContext';

export default function Pembahasan() {
  const router = useRouter();
  const { session } = useQuiz();
  const [reviewIndex, setReviewIndex] = useState(0);

  // If no session active or not complete, redirect to home
  useEffect(() => {
    if (!session || !session.isComplete) {
      router.replace('/');
    }
  }, [session, router]);

  if (!session) return null;

  const currentQuestion = session.questions[reviewIndex];
  if (!currentQuestion) return null;

  const handleNext = () => {
    if (reviewIndex + 1 < session.questions.length) {
      setReviewIndex((prev) => prev + 1);
    } else {
      router.push('/hasil');
    }
  };

  const handlePrev = () => {
    if (reviewIndex > 0) {
      setReviewIndex((prev) => prev - 1);
    }
  };

  const isFirst = reviewIndex === 0;
  const isLast = reviewIndex + 1 === session.questions.length;
  const userChosen = session.answers[reviewIndex];

  return (
    <>
      <Header
        title={`Review ${session.testType}`}
        showBack
        onBack={() => router.push('/hasil')}
      />

      <main className="flex-1 flex flex-col gap-5 px-4 py-5 pb-16">
        {/* Progress indicator */}
        <ProgressBar
          currentIndex={reviewIndex}
          total={session.questions.length}
          answers={session.answers}
        />

        {/* Dynamic Context Render: Passages or Audio Transcripts */}
        {currentQuestion.passage && (
          <PassageCard passage={currentQuestion.passage} />
        )}

        {currentQuestion.listening && (
          <TranscriptCard transcript={currentQuestion.listening.transcript} />
        )}

        {/* Question Text Box */}
        <div className="w-full flex flex-col gap-3">
          <h3 className="text-base font-bold text-text-primary leading-relaxed text-justify">
            {currentQuestion.question}
          </h3>
        </div>

        {/* Dynamic Figural SVG Display (TPA diagram) */}
        {currentQuestion.figural && (
          <FiguralDisplay figures={currentQuestion.figural.figures} />
        )}

        {/* Answer Options Box */}
        <div className="flex flex-col gap-3 mt-2">
          {currentQuestion.options.map((option, idx) => {
            const isChosen = userChosen === idx;
            const isCorrectAnswer = idx === currentQuestion.correctAnswer;
            
            let isCorrect: boolean | null = null;
            if (isCorrectAnswer) {
              isCorrect = true; // Highligted Green
            } else if (isChosen && !isCorrectAnswer) {
              isCorrect = false; // Highligted Red
            }

            return (
              <QuizOption
                key={idx}
                index={idx}
                text={option}
                isSelected={isChosen}
                isCorrect={isCorrect}
                isFigural={!!currentQuestion.figural}
                disabled={true}
                onClick={() => {}}
              />
            );
          })}
        </div>

        {/* User Choice Stats Banner */}
        <div className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2 ${
          userChosen === null
            ? 'bg-white/4 border-white/6 text-text-secondary'
            : userChosen === currentQuestion.correctAnswer
            ? 'bg-success/10 border-success/20 text-success'
            : 'bg-error/10 border-error/20 text-error'
        }`}>
          <span>
            {userChosen === null ? '⚪' : userChosen === currentQuestion.correctAnswer ? '✅' : '❌'}
          </span>
          <span>
            {userChosen === null 
              ? 'Anda melewatkan soal ini.' 
              : userChosen === currentQuestion.correctAnswer 
              ? 'Jawaban Anda Benar!' 
              : `Jawaban Anda Salah (Anda memilih pilihan ${String.fromCharCode(65 + userChosen)}).`}
          </span>
        </div>

        {/* Explanation Block */}
        <div className="glass border border-white/8 p-5 flex flex-col gap-4 animate-float">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <span className="text-xl">💡</span>
            <h4 className="text-xs font-black uppercase tracking-wider text-accent leading-none">
              PEMBAHASAN SOAL
            </h4>
          </div>

          <p className="text-sm font-semibold leading-relaxed text-text-primary text-justify">
            {currentQuestion.explanation}
          </p>
        </div>

        {/* Navigation Bar */}
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={handlePrev}
            disabled={isFirst}
            className={`flex-1 py-3.5 border rounded-2xl text-xs font-black transition-all active:scale-[0.98] outline-none ${
              isFirst 
                ? 'border-white/5 bg-transparent text-text-secondary/40 cursor-not-allowed'
                : 'border-white/8 bg-white/5 hover:bg-white/10 text-text-primary cursor-pointer'
            }`}
          >
            Sebelumnya
          </button>

          <button
            onClick={handleNext}
            className="flex-1 py-3.5 bg-accent hover:bg-accent-hover text-white text-xs font-black rounded-2xl cursor-pointer transition-all active:scale-[0.98] outline-none flex items-center justify-center gap-1.5"
          >
            <span>{isLast ? 'Selesai Review' : 'Selanjutnya'}</span>
            {!isLast && (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            )}
          </button>
        </div>
      </main>
    </>
  );
}
