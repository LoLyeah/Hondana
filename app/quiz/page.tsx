'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProgressBar from '../../components/ProgressBar';
import TimerRing from '../../components/TimerRing';
import QuizOption from '../../components/QuizOption';
import FiguralDisplay from '../../components/FiguralDisplay';
import TranscriptCard from '../../components/TranscriptCard';
import PassageCard from '../../components/PassageCard';
import XPPopup from '../../components/XPPopup';
import LevelUpModal from '../../components/LevelUpModal';
import { useQuiz } from '../../context/QuizContext';
import { useTimer } from '../../hooks/useTimer';

export default function Quiz() {
  const router = useRouter();
  const {
    session,
    submitAnswer,
    nextQuestion,
    endQuiz,
    quitQuiz,
    xpPopup,
    showLevelUp,
    oldLevel,
    stats,
    dismissLevelUp,
    settings
  } = useQuiz();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeUsed, setTimeUsed] = useState(0);

  // If no session active, redirect back home
  useEffect(() => {
    if (!session) {
      router.replace('/');
    }
  }, [session, router]);

  const currentQuestion = session?.questions[session.currentIndex];

  // Callback when timer expires
  const handleTimeUp = () => {
    if (isAnswered) return;
    
    // Auto submit as skipped
    handleAnswerSubmit(null);
  };

  // Timer Hook integration
  const timerLimit = currentQuestion?.timeLimit || 60;
  const { timeLeft, resetTimer } = useTimer({
    initialTime: timerLimit,
    onTimeUp: handleTimeUp,
    isActive: session !== null && !session.isComplete && !isAnswered && settings.timerEnabled
  });

  // Track time used per question
  useEffect(() => {
    if (isAnswered) return;
    const interval = setInterval(() => {
      setTimeUsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isAnswered, session?.currentIndex]);

  // Reset local state on next question
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setTimeUsed(0);
    if (currentQuestion) {
      resetTimer(currentQuestion.timeLimit);
    }
  }, [session?.currentIndex, currentQuestion, resetTimer]);

  if (!session || !currentQuestion) return null;

  const handleAnswerSubmit = (optionIndex: number | null) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);

    // Save answer in context
    submitAnswer(optionIndex);

    // Record time spent
    if (session.timePerQuestion) {
      session.timePerQuestion[session.currentIndex] = timeUsed;
    }

    // Sound effect
    if (settings.soundEnabled) {
      try {
        const isCorr = optionIndex === currentQuestion.correctAnswer;
        const audio = new Audio(isCorr ? 'https://assets.mixkit.co/active_storage/sfx/2019/2019-84.wav' : 'https://assets.mixkit.co/active_storage/sfx/951/951-84.wav');
        audio.volume = 0.2;
        audio.play().catch(() => {});
      } catch (e) {}
    }

    // In SIMULASI mode, go directly to next question without immediate explanation
    if (session.mode === 'simulasi') {
      setTimeout(() => {
        handleNext();
      }, 800);
    }
  };

  const handleNext = () => {
    const isLast = session.currentIndex + 1 >= session.questions.length;
    if (isLast) {
      endQuiz();
      router.push('/hasil');
    } else {
      nextQuestion();
    }
  };

  const handleQuit = () => {
    if (window.confirm('Apakah Anda yakin ingin mengakhiri sesi kuis ini? Progress latihan ini tidak akan disimpan.')) {
      quitQuiz();
      router.push('/');
    }
  };

  return (
    <>
      {/* Floating XP Gain and Level Up modal */}
      <XPPopup xp={xpPopup} />
      <LevelUpModal
        show={showLevelUp}
        level={stats.level}
        oldLevel={oldLevel}
        onClose={dismissLevelUp}
      />

      {/* Header bar */}
      <header className="sticky top-0 z-40 w-full glass border-b border-white/8 backdrop-blur-md px-4 py-3 flex items-center justify-between">
        <button
          onClick={handleQuit}
          className="p-2 -ml-2 rounded-xl hover:bg-white/5 active:scale-95 transition-all text-text-primary flex items-center justify-center"
          aria-label="Keluar Kuis"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-error">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-accent leading-none">
            {session.testType} {session.mode === 'simulasi' ? 'SIMULASI' : 'LATIHAN'}
          </span>
          <span className="text-xs font-bold text-text-secondary mt-0.5 capitalize">
            {session.difficulty}
          </span>
        </div>

        {settings.timerEnabled ? (
          <TimerRing timeLeft={timeLeft} timeLimit={timerLimit} />
        ) : (
          <div className="w-12 h-12" />
        )}
      </header>

      <main className="flex-1 flex flex-col gap-5 px-4 py-5 pb-12">
        {/* Progress indicators */}
        <ProgressBar
          currentIndex={session.currentIndex}
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
            const isSelected = selectedOption === idx || session.answers[session.currentIndex] === idx;
            
            // In Latihan mode, show immediate correct/incorrect coloring. In Simulasi mode, hide until the end.
            const showFeedback = isAnswered && session.mode === 'latihan';
            const isCorrect = showFeedback
              ? idx === currentQuestion.correctAnswer
              : null;

            return (
              <QuizOption
                key={idx}
                index={idx}
                text={option}
                isSelected={isSelected}
                isCorrect={isCorrect}
                isFigural={!!currentQuestion.figural}
                disabled={isAnswered}
                onClick={() => handleAnswerSubmit(idx)}
              />
            );
          })}
        </div>

        {/* In Latihan mode: explanation shows up immediately after answering */}
        {isAnswered && session.mode === 'latihan' && (
          <div className="glass border border-white/8 p-5 mt-4 flex flex-col gap-4 animate-float">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <span className="text-xl">💡</span>
              <h4 className="text-xs font-black uppercase tracking-wider text-accent leading-none">
                PEMBAHASAN SOAL
              </h4>
            </div>

            <p className="text-sm font-semibold leading-relaxed text-text-primary text-justify">
              {currentQuestion.explanation}
            </p>

            <button
              onClick={handleNext}
              className="w-full py-3 bg-accent hover:bg-accent-hover text-white text-sm font-black rounded-2xl cursor-pointer transition-all active:scale-[0.98] outline-none flex items-center justify-center gap-2 mt-2"
            >
              <span>Lanjutkan Soal</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        )}
      </main>
    </>
  );
}
