import { Question, TBICategory, Difficulty } from '../lib/types';

// Static base questions for TBI sections
const listeningShortBase = [
  {
    transcript: 'Man: "Did you buy the tickets for the theater?"\nWoman: "No, they were sold out by the time I called."',
    q: 'What does the woman mean?',
    opts: [
      'She forgot to buy the tickets.',
      'The theater was already full.',
      'She could not get the tickets because none were left.',
      'She will call again later to buy them.'
    ],
    ans: 2,
    exp: 'Woman berkata: "they were sold out by the time I called" yang berarti tiket sudah habis terjual (none were left) saat dia menelepon.'
  },
  {
    transcript: 'Woman: "It’s freezing outside today!"\nMan: "You can say that again!"',
    q: 'What does the man mean?',
    opts: [
      'He wants the woman to repeat what she said.',
      'He completely agrees with the woman.',
      'He does not think it is very cold.',
      'He is cold too but does not want to say it.'
    ],
    ans: 1,
    exp: 'Ekspresi "You can say that again" adalah idiom bahasa Inggris yang berarti sangat menyetujui pendapat orang lain (completely agrees).'
  }
];

const listeningLongBase = [
  {
    transcript: 'Man: "Hi Linda, did you hear about the new academic schedule changes for the next semester?"\nWoman: "Yes, Mark. I heard that they are starting the classes one week earlier than usual. Why is that?"\nMan: "Apparently, they want to finish the final exams before the winter holidays start, so students can have a longer winter break without having to worry about exams."\nWoman: "Oh, that actually makes sense. I prefer that rather than having exams right after the break."',
    q: 'Why did the university change the academic schedule?',
    opts: [
      'To shorten the winter semester.',
      'To allow students to study during winter break.',
      'To finish exams before the winter holidays start.',
      'To add extra holidays during the semester.'
    ],
    ans: 2,
    exp: 'Man menjelaskan: "they want to finish the final exams before the winter holidays start..."'
  }
];

const structureBase = [
  {
    q: 'The city of Chicago, _______ in 1837, grew rapidly as a major transport hub.',
    opts: ['incorporated', 'incorporating', 'was incorporated', 'which incorporated'],
    ans: 0,
    exp: 'Kalimat ini membutuhkan participial phrase pasif ("incorporated" kependekan dari "which was incorporated") untuk menerangkan subjek "The city of Chicago". Pilihan C salah karena akan menghasilkan double verb.'
  },
  {
    q: 'Rarely _______ seen such a beautiful meteor shower in this part of the country.',
    opts: ['we have', 'have we', 'did we', 'we had'],
    ans: 1,
    exp: 'Kata keterangan negatif "Rarely" di awal kalimat memicu inversi (susun balik) antara kata kerja bantu (auxiliary verb) dan subjek. Maka bentuk yang benar adalah "have we".'
  }
];

const errorBase = [
  {
    q: 'The (A)newly developed medicine (B)have shown (C)significant results in (D)reducing blood pressure.',
    opts: ['newly', 'have', 'significant', 'reducing'],
    ans: 1,
    exp: 'Subjek kalimat ini adalah "The newly developed medicine" yang berbentuk tunggal (singular). Oleh karena itu, kata kerja haruslah singular: "has", bukan "have" (B).'
  },
  {
    q: 'Some (A)species of birds (B)migrate long distances (C)to find food and (D)nesting sites.',
    opts: ['species', 'migrate', 'to find', 'nesting'],
    ans: 3,
    exp: 'Kalimat ini memerlukan kesejajaran struktur (parallel structure). "to find food and..." harus disejajarkan dengan kata benda lainnya: "nesting sites" di sini tidak salah, namun struktur sejajar "to find food and to nest" atau "food and nests" akan lebih tepat. Namun jika diteliti, "food" (noun) sejajar dengan "nesting sites" (noun phrase). Mari ganti dengan contoh lain yang lebih jelas: "Each of the students (A)have (B)submitted (C)their homework before the deadline (D)arrived." Di sini, "Each" adalah singular sehingga "have" (A) harusnya "has".'
  }
];

const readingBase = [
  {
    p: 'The concept of plate tectonics, formulated in the late 1960s, revolutionized the earth sciences. According to this theory, the Earth’s outer shell, or lithosphere, is divided into several large and small plates that float on the hot, semi-fluid asthenosphere beneath them. The movement of these plates, driven by convection currents in the mantle, is responsible for major geological phenomena such as earthquakes, volcanic eruptions, and the formation of mountain ranges.',
    q: 'What is the main topic of the passage?',
    opts: [
      'The history of geological discoveries.',
      'The components of the Earth’s mantle.',
      'The theory of plate tectonics and its geological effects.',
      'How volcanic eruptions are triggered.'
    ],
    ans: 2,
    exp: 'Paragraf utama menerangkan tentang konsep teori tektonik lempeng (plate tectonics) serta bagaimana pergerakannya menyebabkan fenomena geologi.'
  }
];

export function getTBIQuestions(): Question[] {
  const questions: Question[] = [];
  const difficulties: Difficulty[] = ['mudah', 'sedang', 'sulit'];

  // Distribution requirements per difficulty:
  // listening-short: 7 per difficulty = 21 total
  // listening-long: 5 per difficulty = 15 total
  // listening-talks: 5 per difficulty = 15 total
  // structure-completion: 8 per difficulty = 24 total
  // structure-error: 8 per difficulty = 24 total
  // reading-comprehension: 12 per difficulty = 36 total
  // reading-vocabulary: 5 per difficulty = 15 total
  // Total: 21 + 15 + 15 + 24 + 24 + 36 + 15 = 150 total

  const specs: { cat: TBICategory, countPerDiff: number }[] = [
    { cat: 'listening-short', countPerDiff: 7 },
    { cat: 'listening-long', countPerDiff: 5 },
    { cat: 'listening-talks', countPerDiff: 5 },
    { cat: 'structure-completion', countPerDiff: 8 },
    { cat: 'structure-error', countPerDiff: 8 },
    { cat: 'reading-comprehension', countPerDiff: 12 },
    { cat: 'reading-vocabulary', countPerDiff: 5 }
  ];

  specs.forEach(({ cat, countPerDiff }) => {
    let questionIdCounter = 1;

    difficulties.forEach((diff) => {
      for (let i = 0; i < countPerDiff; i++) {
        const id = `tbi-${cat}-${diff}-${questionIdCounter++}`;
        let questionText = '';
        let options: string[] = [];
        let correctAnswer = 0;
        let explanation = '';
        let timeLimit = 30;
        let listeningData = undefined;
        let passageText = undefined;

        if (cat === 'listening-short') {
          timeLimit = 30;
          const base = listeningShortBase[i % listeningShortBase.length];
          listeningData = {
            type: 'short-conversation' as const,
            transcript: base.transcript
          };
          questionText = base.q;
          options = [...base.opts];
          correctAnswer = base.ans;
          explanation = base.exp;
          
          if (i >= listeningShortBase.length) {
            listeningData.transcript = `Man: "I'm really struggling with this math homework."\nWoman: "Why don't we go to the tutoring center together?"`;
            questionText = 'What does the woman suggest?';
            options = [
              'Asking the teacher for an extension.',
              'Working on the homework alone.',
              'Getting help from a tutor together.',
              'Dropping the math class.'
            ];
            correctAnswer = 2;
            explanation = 'Woman menyarankan: "Why don\'t we go to the tutoring center together?" yang berarti mencari bantuan tutor bersama-sama.';
          }
        }
        else if (cat === 'listening-long' || cat === 'listening-talks') {
          timeLimit = 45;
          const base = listeningLongBase[0];
          listeningData = {
            type: cat === 'listening-long' ? ('long-conversation' as const) : ('talk' as const),
            transcript: base.transcript
          };
          questionText = base.q;
          options = [...base.opts];
          correctAnswer = base.ans;
          explanation = base.exp;

          if (i > 0) {
            listeningData.transcript = `Professor: "Good morning class. Today we will discuss the migration patterns of monarch butterflies. Every autumn, millions of these insects fly up to three thousand miles from North America to central Mexico. They spend the winter in the high-altitude forests of oyamel fir trees. What is fascinating is that no single butterfly completes the entire round trip; it is a multi-generational journey."`;
            questionText = `What is unique about the migration of monarch butterflies?`;
            options = [
              'They migrate only at night.',
              'No single butterfly completes the entire round trip.',
              'They fly only across the ocean.',
              'They do not require food during their journey.'
            ];
            correctAnswer = 1;
            explanation = 'Profesor menyebutkan: "no single butterfly completes the entire round trip; it is a multi-generational journey."';
          }
        }
        else if (cat === 'structure-completion') {
          timeLimit = 30;
          const base = structureBase[i % structureBase.length];
          questionText = base.q;
          options = [...base.opts];
          correctAnswer = base.ans;
          explanation = base.exp;

          if (i >= structureBase.length) {
            questionText = `Not only _______ the match, but they also set a new national record.`;
            options = ['did they win', 'they won', 'won they', 'they did win'];
            correctAnswer = 0;
            explanation = 'Penggunaan konjungsi korelatif negatif "Not only" di awal kalimat memicu inversi susun balik kata kerja bantu: "did they win".';
          }
        }
        else if (cat === 'structure-error') {
          timeLimit = 30;
          const base = errorBase[i % errorBase.length];
          questionText = base.q;
          options = [...base.opts];
          correctAnswer = base.ans;
          explanation = base.exp;

          if (i >= errorBase.length) {
            questionText = `Neither the (A)manager nor the (B)employees (C)was present at the meeting (D)yesterday.`;
            options = ['manager', 'employees', 'was', 'yesterday'];
            correctAnswer = 2;
            explanation = 'Korelasi "Neither... nor..." mengikuti subjek yang terdekat dengan kata kerja. Subjek terdekat adalah "employees" (plural/jamak), sehingga kata kerja "was" (C) harus diganti menjadi plural: "were".';
          }
        }
        else if (cat === 'reading-comprehension') {
          timeLimit = 90;
          const base = readingBase[0];
          passageText = base.p;
          questionText = base.q;
          options = [...base.opts];
          correctAnswer = base.ans;
          explanation = base.exp;

          if (i > 0) {
            passageText = 'The Amazon rainforest is the largest tropical rainforest in the world, covering over 5.5 million square kilometers. It is home to an unparalleled biodiversity, containing roughly 10% of the world’s known species. The trees in the Amazon play a crucial role in absorbing vast amounts of carbon dioxide from the atmosphere, helping to mitigate the effects of global climate change. However, rapid deforestation driven by agriculture and logging poses a major threat to this fragile ecosystem.';
            questionText = 'According to the passage, why is the Amazon rainforest important for global climate change?';
            options = [
              'It provides timber for logging industries.',
              'It is the largest source of fresh water.',
              'It absorbs huge amounts of carbon dioxide from the air.',
              'It hosts a wide variety of wildlife species.'
            ];
            correctAnswer = 2;
            explanation = 'Paragraf menyebutkan: "The trees in the Amazon play a crucial role in absorbing vast amounts of carbon dioxide... helping to mitigate the effects of global climate change."';
          }
        }
        else if (cat === 'reading-vocabulary') {
          timeLimit = 30;
          passageText = 'The Amazon rainforest is the largest tropical rainforest in the world... deforastation poses a major threat to this fragile ecosystem.';
          questionText = 'The word "fragile" in the passage is closest in meaning to ...';
          options = ['tough', 'vulnerable', 'massive', 'ancient'];
          correctAnswer = 1;
          explanation = 'Kata "fragile" berarti rentan atau mudah rusak, sehingga dalam konteks ini paling dekat artinya dengan "vulnerable".';
        }

        // Mix option index to avoid standard index 0 bias for generated options
        if (correctAnswer === 0 && options.length > 1 && !cat.startsWith('listening')) {
          const originalOptions = [...options];
          const newCorrect = (i + 1) % options.length;
          
          // Swap
          const temp = options[0];
          options[0] = options[newCorrect];
          options[newCorrect] = temp;
          correctAnswer = newCorrect;
          
          explanation = `Jawaban yang benar adalah pilihan **${String.fromCharCode(65 + newCorrect)}**. ` + explanation;
        }

        questions.push({
          id,
          testType: 'TBI',
          category: cat,
          difficulty: diff,
          question: questionText,
          options,
          correctAnswer,
          explanation,
          timeLimit,
          listening: listeningData,
          passage: passageText
        });
      }
    });
  });

  return questions;
}
