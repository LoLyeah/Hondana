import { UserStats, SavedSession } from './types';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const badges: Badge[] = [
  {
    id: 'perfect-accuracy',
    name: 'Presisi Sempurna',
    description: 'Akurasi 100% dalam satu sesi latihan/ujian (minimal 10 soal).',
    icon: '🎯'
  },
  {
    id: 'diligent-practitioner',
    name: 'Rajin Berlatih',
    description: 'Mengerjakan total 50 soal latihan/ujian.',
    icon: '📚'
  },
  {
    id: 'centurion',
    name: 'Centurion',
    description: 'Mengerjakan total 100 soal latihan/ujian.',
    icon: '💯'
  },
  {
    id: 'lightning-speed',
    name: 'Kilat',
    description: 'Menyelesaikan simulasi dalam waktu ≤ 50% batas waktu, atau rata-rata waktu per soal ≤ 15 detik.',
    icon: '⚡'
  },
  {
    id: 'expert-verbal',
    name: 'Ahli Verbal',
    description: 'Mendapat nilai ≥ 90% pada materi Verbal (minimal 10 soal).',
    icon: '🧠'
  },
  {
    id: 'expert-numerik',
    name: 'Ahli Numerik',
    description: 'Mendapat nilai ≥ 90% pada materi Numerik (minimal 10 soal).',
    icon: '🔢'
  },
  {
    id: 'expert-logika',
    name: 'Ahli Logika',
    description: 'Mendapat nilai ≥ 90% pada materi Logika (minimal 10 soal).',
    icon: '🧩'
  },
  {
    id: 'expert-figural',
    name: 'Ahli Figural',
    description: 'Mendapat nilai ≥ 90% pada materi Figural/Diagram (minimal 5 soal).',
    icon: '🖼️'
  },
  {
    id: 'expert-structure',
    name: 'Ahli Structure',
    description: 'Mendapat nilai ≥ 90% pada materi TBI Structure/Written (minimal 10 soal).',
    icon: '📖'
  },
  {
    id: 'expert-reading',
    name: 'Ahli Reading',
    description: 'Mendapat nilai ≥ 90% pada materi TBI Reading (minimal 10 soal).',
    icon: '📝'
  },
  {
    id: 'tpa-master',
    name: 'TPA Master',
    description: 'Membuka seluruh badge kategori TPA (Verbal, Numerik, Logika, Figural).',
    icon: '🏆'
  },
  {
    id: 'tbi-master',
    name: 'TBI Master',
    description: 'Membuka seluruh badge kategori TBI (Structure, Reading).',
    icon: '🏅'
  }
];

export function checkBadgeUnlocks(
  stats: UserStats,
  sessionResult: SavedSession,
  currentlyUnlocked: string[] = []
): string[] {
  const newUnlocks: string[] = [];
  const currentSet = new Set(currentlyUnlocked);

  const checkAndAdd = (id: string, condition: boolean) => {
    if (condition && !currentSet.has(id)) {
      newUnlocks.push(id);
      currentSet.add(id); // prevent duplicate check dependencies in the same pass
    }
  };

  // 1. Presisi Sempurna
  checkAndAdd(
    'perfect-accuracy',
    sessionResult.accuracy === 100 && sessionResult.totalQuestions >= 10
  );

  // 2. Rajin Berlatih
  checkAndAdd('diligent-practitioner', stats.totalAnswered >= 50);

  // 3. Centurion
  checkAndAdd('centurion', stats.totalAnswered >= 100);

  // 4. Kilat
  const isSimulationTimeUp =
    sessionResult.mode === 'simulasi' &&
    ((sessionResult.testType === 'TPA' && sessionResult.duration <= 1800) ||
      (sessionResult.testType === 'TBI' && sessionResult.duration <= 1500));
  const isPracticeFast =
    sessionResult.mode === 'latihan' &&
    sessionResult.totalQuestions > 0 &&
    sessionResult.duration / sessionResult.totalQuestions <= 15;
  checkAndAdd('lightning-speed', isSimulationTimeUp || isPracticeFast);

  // Helper counters
  let verbalTotal = 0, verbalCorrect = 0;
  let numerikTotal = 0, numerikCorrect = 0;
  let logikaTotal = 0, logikaCorrect = 0;
  let figuralTotal = 0, figuralCorrect = 0;
  let structTotal = 0, structCorrect = 0;
  let readTotal = 0, readCorrect = 0;

  sessionResult.questions.forEach((q, idx) => {
    const isCorrect = sessionResult.answers[idx] === q.correctAnswer;
    const cat = q.category;

    if (cat.startsWith('verbal-')) {
      verbalTotal++;
      if (isCorrect) verbalCorrect++;
    }
    if (cat.startsWith('numerik-')) {
      numerikTotal++;
      if (isCorrect) numerikCorrect++;
    }
    if (cat.startsWith('logika-') && cat !== 'logika-diagram') {
      logikaTotal++;
      if (isCorrect) logikaCorrect++;
    }
    if (cat === 'logika-diagram' || q.figural) {
      figuralTotal++;
      if (isCorrect) figuralCorrect++;
    }
    if (cat.startsWith('structure-') || cat.startsWith('listening-')) {
      // Structure & listening combined under structure category check in original model
      structTotal++;
      if (isCorrect) structCorrect++;
    }
    if (cat.startsWith('reading-') || cat === 'verbal-bacaan') {
      readTotal++;
      if (isCorrect) readCorrect++;
    }
  });

  // 5. Ahli Verbal
  checkAndAdd('expert-verbal', verbalTotal >= 10 && (verbalCorrect / verbalTotal) >= 0.9);

  // 6. Ahli Numerik
  checkAndAdd('expert-numerik', numerikTotal >= 10 && (numerikCorrect / numerikTotal) >= 0.9);

  // 7. Ahli Logika
  checkAndAdd('expert-logika', logikaTotal >= 10 && (logikaCorrect / logikaTotal) >= 0.9);

  // 8. Ahli Figural
  checkAndAdd('expert-figural', figuralTotal >= 5 && (figuralCorrect / figuralTotal) >= 0.9);

  // 9. Ahli Structure
  checkAndAdd('expert-structure', structTotal >= 10 && (structCorrect / structTotal) >= 0.9);

  // 10. Ahli Reading
  checkAndAdd('expert-reading', readTotal >= 10 && (readCorrect / readTotal) >= 0.9);

  // 11. TPA Master (requires the 4 categories)
  const hasAllTpaBadges =
    currentSet.has('expert-verbal') &&
    currentSet.has('expert-numerik') &&
    currentSet.has('expert-logika') &&
    currentSet.has('expert-figural');
  checkAndAdd('tpa-master', hasAllTpaBadges);

  // 12. TBI Master (requires the 2 categories)
  const hasAllTbiBadges =
    currentSet.has('expert-structure') &&
    currentSet.has('expert-reading');
  checkAndAdd('tbi-master', hasAllTbiBadges);

  return newUnlocks;
}
