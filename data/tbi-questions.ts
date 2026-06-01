import { Question } from '../lib/types';

const baseQuestions: Question[] = [
  // ─── OLD SET (1 TO 50) ───
  // 1. Structure (easy)
  {
    id: 'tbi-sc-1',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'The tech startup _________ by the founders in 2022 remains the region\'s most successful software development hub.',
    options: [
      'established',
      'was establish',
      'establishing',
      'was established',
      'will establish'
    ],
    correctAnswer: 0,
    explanation: 'Kalimat ini membutuhkan reduced relative clause pasif untuk menerangkan subjek "The tech startup". Frasa "established by..." merupakan kependekan dari "which was established by...". Pilihan "was established" salah karena akan menghasilkan double verb ("was established" dan "remains") tanpa kata hubung.',
    timeLimit: 30
  },
  // 2. Structure (easy)
  {
    id: 'tbi-sc-2',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'In the late 1990s, the local community gradually _________ environmentally aware, opting for sustainable energy sources.',
    options: [
      'has became',
      'has become',
      'have became',
      'becomes',
      'became'
    ],
    correctAnswer: 4,
    explanation: 'Keterangan waktu "In the late 1990s" menunjukkan peristiwa di masa lampau (past tense). Bentuk kata kerja lampau yang tepat adalah "became" (V2). Pilihan lainnya salah secara tata bahasa.',
    timeLimit: 30
  },
  // 3. Structure (easy)
  {
    id: 'tbi-sc-3',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'It was long assumed that climate change was a cyclical phase; however, researchers _________ data to the contrary over the past few decades.',
    options: [
      'find',
      'found',
      'has found',
      'finding',
      'have found'
    ],
    correctAnswer: 4,
    explanation: 'Frasa "over the past few decades" menunjukkan peristiwa yang dimulai di masa lampau dan masih berlanjut hingga kini (present perfect tense). Karena subjek "researchers" berbentuk jamak (plural), bentuk yang tepat adalah "have found".',
    timeLimit: 30
  },
  // 4. Structure (easy)
  {
    id: 'tbi-sc-4',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'Crucial information _________ now transmitted digitally across various departments within a fraction of a second.',
    options: [
      'is',
      'was',
      'are',
      'were',
      'been'
    ],
    correctAnswer: 0,
    explanation: 'Subjek "Crucial information" bersifat singular/uncountable. Keterangan waktu "now" dan makna pasif "transmitted" (ditransmisikan) menuntut penggunaan kata kerja bantu present singular "is".',
    timeLimit: 30
  },
  // 5. Structure (easy)
  {
    id: 'tbi-sc-5',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'Volcanoes dotting the ring of fire _________ millions of tons of ash every decade into the atmosphere.',
    options: [
      'drops',
      'drop',
      'dropped',
      'dropping',
      'has dropped'
    ],
    correctAnswer: 1,
    explanation: 'Subjek utama kalimat adalah "Volcanoes" (jamak/plural). Kata "dotting the ring of fire" merupakan modifier (participial phrase). Keterangan waktu "every decade" menunjukkan fakta umum/rutinitas (simple present tense), sehingga membutuhkan kata kerja bentuk pertama jamak yaitu "drop".',
    timeLimit: 30
  },
  // 6. Structure (easy)
  {
    id: 'tbi-sc-6',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'The lecturer _________ for three hours when the principal unexpectedly walked in.',
    options: [
      'waits',
      'has waited',
      'has been waiting',
      'had waited',
      'had been waiting'
    ],
    correctAnswer: 4,
    explanation: 'Kalimat ini menceritakan tentang durasi suatu tindakan ("for three hours") yang berlangsung sebelum peristiwa lain di masa lampau terjadi ("when the principal unexpectedly walked in"). Hal ini membutuhkan bentuk Past Perfect Continuous: "had been waiting".',
    timeLimit: 30
  },
  // 7. Structure (easy)
  {
    id: 'tbi-sc-7',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'If the engineering team _________ the technical issues during the design phase, the spacecraft would not have experienced a failure.',
    options: [
      'disclosed',
      'had disclosed',
      'has disclosed',
      'would disclose',
      'was disclosing'
    ],
    correctAnswer: 1,
    explanation: 'Ini adalah Conditional Sentence Type 3 (situasi pengandaian di masa lampau yang tidak terjadi). Strukturnya: If + Past Perfect (had + V3), Subject + would have + V3. Karena klausa akibat menggunakan "would not have experienced", maka klausa "if" harus menggunakan Past Perfect: "had disclosed".',
    timeLimit: 30
  },
  // 8. Structure (easy)
  {
    id: 'tbi-sc-8',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'All laboratory workers _________ wear protective goggles when handling chemicals in the research facility.',
    options: [
      'Must',
      'Should',
      'Ought to',
      'Should',
      'Had better'
    ],
    correctAnswer: 0,
    explanation: 'Kalimat ini menunjukkan aturan keselamatan kerja yang keras atau kewajiban mutlak (obligation). Kata bantu modal yang paling tepat untuk mengekspresikan kewajiban mutlak adalah "Must".',
    timeLimit: 30
  },
  // 9. Structure (easy)
  {
    id: 'tbi-sc-9',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'You _________ photograph the secret documents. It is a highly restricted area.',
    options: [
      'must',
      'should',
      'mustn’t',
      'could',
      'may'
    ],
    correctAnswer: 2,
    explanation: 'Keterangan "It is a highly restricted area" menunjukkan larangan keras (prohibition). Kata bantu modal yang menunjukkan larangan adalah "mustn\'t" (must not).',
    timeLimit: 30
  },
  // 10. Structure (easy)
  {
    id: 'tbi-sc-10',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'The original computer _________ nearly two tons in weight.',
    options: [
      'Weighed',
      'To weigh',
      'Weighing',
      'Weigh',
      'Weighs'
    ],
    correctAnswer: 0,
    explanation: 'Pernyataan ini menjelaskan fakta sejarah mengenai komputer generasi pertama (peristiwa masa lampau). Maka dibutuhkan kata kerja bentuk lampau (V2) yaitu "Weighed".',
    timeLimit: 30
  },
  // 11. Structure (easy)
  {
    id: 'tbi-sc-11',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'I _________ a seminar this Friday. Would you like to attend?',
    options: [
      'Am hosting',
      'Will host',
      'Host',
      'Have been hosting',
      'Will have been hosting'
    ],
    correctAnswer: 0,
    explanation: 'Present Continuous Tense ("Am hosting") sering digunakan untuk menyatakan rencana/pengaturan masa depan yang sudah terencana secara matang (future arrangements).',
    timeLimit: 30
  },
  // 12. Structure (easy)
  {
    id: 'tbi-sc-12',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'The number of participants in the conference _________ expanding every semester.',
    options: [
      'is',
      'are',
      'was',
      'were',
      'have been'
    ],
    correctAnswer: 0,
    explanation: 'Frasa "The number of" diikuti oleh kata benda jamak namun membutuhkan kata kerja bantu tunggal (singular verb). Dipasangkan dengan kata "expanding" (continuous) dalam konteks masa kini, maka bentuk yang tepat adalah "is".',
    timeLimit: 30
  },
  // 13. Structure (easy)
  {
    id: 'tbi-sc-13',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'A crate of apples, together with oranges and grapes, _________ delivered to the supermarket three days ago.',
    options: [
      'is',
      'are',
      'was',
      'were',
      'being'
    ],
    correctAnswer: 2,
    explanation: 'Subjek utama kalimat adalah "A crate of apples" (tunggal/singular). Frasa tambahan seperti "together with..." tidak mempengaruhi kesepakatan subjek-kata kerja. Keterangan waktu "three days ago" (past tense) menuntut kata kerja bantu singular lampau yaitu "was".',
    timeLimit: 30
  },
  // 14. Structure (easy)
  {
    id: 'tbi-sc-14',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'Biologists _________ the deep-sea ecosystems for decades. If deep-sea submersibles could ever operate autonomously, scientific discovery could accelerate significantly in the future, and new marine species might be identified in the process.',
    options: [
      'studied',
      'has studied',
      'have studied',
      'had studied',
      'study'
    ],
    correctAnswer: 2,
    explanation: 'Keterangan waktu "for decades" menunjukkan tindakan yang dimulai di masa lalu dan berlanjut ke masa kini (present perfect tense). Karena subjek "Biologists" berbentuk jamak (plural), kata kerja bantu yang tepat adalah "have studied".',
    timeLimit: 30
  },
  // 15. Structure (easy)
  {
    id: 'tbi-sc-15',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'Only a small fraction of goods purchased today in the region _________ locally. It\'s a similar story in other sectors.',
    options: [
      'manufactured',
      'manufacture',
      'manufacturing',
      'was manufactured',
      'were manufactured'
    ],
    correctAnswer: 4,
    explanation: 'Subjek "a small fraction of goods" merujuk pada kata benda jamak "goods". Tindakan pembuatan barang terjadi di masa lampau sebelum dibeli, sehingga membutuhkan bentuk kalimat pasif lampau jamak (plural past passive): "were manufactured".',
    timeLimit: 30
  },
  // 16. Structure (easy)
  {
    id: 'tbi-sc-16',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'Climatologists at the institute _________ thermal imaging and drone data at the moment in an effort to monitor the melting of polar ice caps.',
    options: [
      'analyzed',
      'analyzing',
      'are analyzed',
      'are analyzing',
      'will be analyzing'
    ],
    correctAnswer: 3,
    explanation: 'Frasa "at the moment" menunjukkan tindakan yang sedang berlangsung saat ini (present continuous tense). Subjek "Climatologists" berbentuk jamak, sehingga membutuhkan bentuk aktif jamak: "are analyzing".',
    timeLimit: 30
  },
  // 17. Structure (medium)
  {
    id: 'tbi-sc-17',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sedang',
    question: 'The supervisor advised the clerks _________ their reports.',
    options: [
      'submit',
      'submitting',
      'to submit',
      'submitted',
      'submits'
    ],
    correctAnswer: 2,
    explanation: 'Kata kerja "advise" mengikuti pola: advise + someone + to-infinitive. Oleh karena itu, bentuk yang benar adalah "to submit".',
    timeLimit: 30
  },
  // 18. Structure (medium)
  {
    id: 'tbi-sc-18',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sedang',
    question: 'The counselor suggested _________ more physical exercise.',
    options: [
      'do',
      'doing',
      'to do',
      'done',
      'does'
    ],
    correctAnswer: 1,
    explanation: 'Kata kerja "suggest" langsung diikuti oleh bentuk Gerund (V-ing) jika tidak diikuti oleh objek perantara atau anak kalimat "that". Maka bentuk yang tepat adalah "doing".',
    timeLimit: 30
  },
  // 19. Structure (medium)
  {
    id: 'tbi-sc-19',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sedang',
    question: '____________ are the core requirements of sustainable farming.',
    options: [
      'Conserving water and minimizing pesticides',
      'To conserving water and to minimizing pesticides',
      'Conserve water and minimize pesticides',
      'Conserving water and to minimize pesticides',
      'To conserve water and to minimize pesticides'
    ],
    correctAnswer: 0,
    explanation: 'Kata kerja bantu jamak "are" menunjukkan bahwa subjek kalimat harus berupa gabungan kata benda jamak yang setara (parallel structure). Penggunaan dua gerund phrase ("Conserving water" dan "minimizing pesticides") dihubungkan dengan "and" membentuk subjek jamak yang sejajar.',
    timeLimit: 30
  },
  // 20. Structure (medium)
  {
    id: 'tbi-sc-20',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sedang',
    question: 'The manager permitted them _________ the project.',
    options: [
      'starting',
      'to start',
      'Being started',
      'To be started',
      'Started'
    ],
    correctAnswer: 1,
    explanation: 'Kata kerja "permit" mengikuti pola: permit + someone + to-infinitive. Oleh karena itu, bentuk yang tepat adalah "to start".',
    timeLimit: 30
  },
  // 21. Structure (medium)
  {
    id: 'tbi-sc-21',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sedang',
    question: 'Astronomers _________ as scientists dedicated to the exploration of celestial bodies, focusing on understanding the physical properties of the universe through various observation techniques.',
    options: [
      'is defined',
      'are defined',
      'was defined',
      'defines',
      'defined'
    ],
    correctAnswer: 1,
    explanation: 'Subjek "Astronomers" berbentuk jamak. Kalimat ini menjelaskan definisi ilmiah umum (simple present passive), sehingga membutuhkan to be jamak dan kata kerja bentuk ketiga: "are defined".',
    timeLimit: 30
  },
  // 22. Structure (medium)
  {
    id: 'tbi-sc-22',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sedang',
    question: '_______________ in this department speaks multiple languages fluently.',
    options: [
      'The number of employees',
      'Some employee',
      'The number of employee',
      'A number of employees',
      'Much employees'
    ],
    correctAnswer: 0,
    explanation: 'Kata kerja "speaks" berbentuk tunggal (singular). Frasa "The number of employees" bermakna tunggal dan menuntut kata kerja tunggal, sedangkan "A number of employees" bermakna jamak (membutuhkan "speak").',
    timeLimit: 30
  },
  // 23. Structure (medium)
  {
    id: 'tbi-sc-23',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sedang',
    question: 'Professional writers must be able to research topics, outline chapters, and _________',
    options: [
      'story-drafting effectively',
      'draft stories effectively',
      'effective story-drafting',
      'drafting effectively',
      'story effectively draft'
    ],
    correctAnswer: 1,
    explanation: 'Kalimat ini membutuhkan kesejajaran struktur (parallel structure) setelah kata "to" yang dihilangkan secara implisit: "to research...", "(to) outline...", dan "(to) draft...". Oleh karena itu, kita memerlukan bentuk bare infinitive "draft stories effectively".',
    timeLimit: 30
  },
  // 24. Structure (medium)
  {
    id: 'tbi-sc-24',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sedang',
    question: 'The community encourages kindness, cooperation, and _________',
    options: [
      'members are responsible',
      'responsibility among members',
      'responsible members',
      'members responsibly',
      'member responsibility'
    ],
    correctAnswer: 1,
    explanation: 'Kalimat ini membutuhkan struktur kesejajaran kelas kata benda (nouns): "kindness" (noun), "cooperation" (noun), dan nilai berikutnya yang setara. Pilihan "responsibility among members" mengedepankan kata benda "responsibility" secara sejajar sebagai nilai komunitas.',
    timeLimit: 30
  },
  // 25. Structure (hard)
  {
    id: 'tbi-sc-25',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'The syllabus will cover how to identify sources, how to structure essays, and how to _________',
    options: [
      'presenting arguments effectively',
      'present arguments effectively',
      'effective presenting arguments',
      'arguments effectively presented',
      'effective arguments presentation'
    ],
    correctAnswer: 1,
    explanation: 'Kalimat ini menggunakan struktur kesejajaran klausa: "how to identify...", "how to structure...", dan "how to present...". Kita membutuhkan bentuk bare infinitive "present" setelah frasa "how to".',
    timeLimit: 30
  },
  // 26. Structure (hard)
  {
    id: 'tbi-sc-26',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'The biologist _________ discovered the deep-sea species is now lecturing at the institute.',
    options: [
      'which',
      'who',
      'whom',
      'whose',
      'that'
    ],
    correctAnswer: 1,
    explanation: 'Kata ganti relatif "who" digunakan untuk merujuk pada subjek berupa orang ("The biologist") yang melakukan tindakan di dalam anak kalimat.',
    timeLimit: 30
  },
  // 27. Structure (hard)
  {
    id: 'tbi-sc-27',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'Two-thirds of the laboratory reports _________ submitted to the director last week.',
    options: [
      'was',
      'were',
      'has',
      'are',
      'being'
    ],
    correctAnswer: 1,
    explanation: 'Subjek "Two-thirds of the laboratory reports" merujuk pada kata benda setelah kata "of", yaitu "reports" yang berbentuk jamak (plural). Dipadukan dengan keterangan waktu "last week" (past passive), maka kata kerja bantu yang tepat adalah "were".',
    timeLimit: 30
  },
  // 28. Structure (hard)
  {
    id: 'tbi-sc-28',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'The architect _________ designs won the competition received an award.',
    options: [
      'which',
      'who',
      'whom',
      'whose',
      'that'
    ],
    correctAnswer: 3,
    explanation: 'Relative pronoun "whose" digunakan untuk menyatakan kepemilikan (possessive relative) atas kata benda berikutnya ("designs"), merujuk pada rancangan milik sang arsitek tersebut.',
    timeLimit: 30
  },
  // 29. Structure (hard)
  {
    id: 'tbi-sc-29',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'Mr. Davis is a _________________',
    options: [
      'a highly respected gentleman regarded',
      'a respect highly gentleman',
      'a highly respect gentleman',
      'a highly respected gentleman',
      'a respected highly gentleman'
    ],
    correctAnswer: 3,
    explanation: 'Urutan pengubah kata benda (noun modifier order) yang benar adalah: adverb ("highly") menerangkan adjective/participle ("respected"), yang kemudian menerangkan kata benda utama ("gentleman"). "a" di awal jawaban merupakan bagian dari frasa predikat.',
    timeLimit: 30
  },
  // 30. Structure (hard)
  {
    id: 'tbi-sc-30',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'Bread and butter, a classic breakfast, _________ me of my childhood holidays.',
    options: [
      'has reminded',
      'reminds',
      'have been reminding',
      'are reminding',
      'remind'
    ],
    correctAnswer: 1,
    explanation: 'Meskipun subjeknya berupa gabungan kata "Bread and butter", keterangan tambahan "a classic breakfast" (tunggal) menegaskan bahwa subjek dianggap sebagai satu kesatuan menu makanan tunggal. Oleh karena itu, kata kerja harus berbentuk tunggal: "reminds".',
    timeLimit: 30
  },
  // 31. Structure (hard)
  {
    id: 'tbi-sc-31',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'By the time the project concludes next winter, the organization _________ substantial budget goals.',
    options: [
      'Will have achieved',
      'Will be achieving',
      'Will achieve',
      'Has achieved',
      'Have achieved'
    ],
    correctAnswer: 0,
    explanation: 'Pola anak kalimat "By the time + Simple Present (concludes)" berpasangan dengan Future Perfect Tense (will have + V3) pada klausa utamanya: "will have achieved".',
    timeLimit: 30
  },
  // 32. Structure (hard)
  {
    id: 'tbi-sc-32',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'Through social networks, a user can locate the contact of an old colleague _________ in years.',
    options: [
      'whom he/she hasn\'t contacted',
      'whom is he/she contacted',
      'who is contacted',
      'who he/she hasn\'t contacted',
      'whom hasn\'t been contacted'
    ],
    correctAnswer: 0,
    explanation: 'Kata ganti relatif "whom" digunakan sebagai objek dari kata kerja di dalam anak kalimat ("contacted"). Struktur formal yang tepat adalah "whom he/she hasn\'t contacted".',
    timeLimit: 30
  },
  // 33. Structure (hard)
  {
    id: 'tbi-sc-33',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'When _____________ the ocean, sailors often contend with severe weather.',
    options: [
      'navigated',
      'navigate',
      'navigating',
      'to navigate',
      'being navigated'
    ],
    correctAnswer: 2,
    explanation: 'Kalimat ini menggunakan reduced adverbial clause aktif. Klausa aslinya "When they are navigating the ocean" disederhanakan menjadi "When navigating the ocean" karena subjeknya sama dengan klausa utama ("sailors").',
    timeLimit: 30
  },
  // 34. Structure (hard)
  {
    id: 'tbi-sc-34',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'They continued the mountain expedition _______ the freezing temperatures.',
    options: [
      'Despite of',
      'Because of',
      'Even though',
      'In spite of',
      'Although'
    ],
    correctAnswer: 3,
    explanation: 'Kata hubung pertentangan yang diikuti oleh frasa kata benda ("the freezing temperatures") haruslah berupa preposisi. "In spite of" adalah preposisi pertentangan yang tepat. "Despite of" salah secara tata bahasa karena "despite" tidak menggunakan "of". "Although" dan "Even though" membutuhkan klausa lengkap (S + V).',
    timeLimit: 30
  },
  // 35. Structure (hard)
  {
    id: 'tbi-sc-35',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: '__________ in the project depends on their collaboration.',
    options: [
      'What will the workers achieve',
      'What the workers will achieve',
      'the workers will achieve what',
      'the workers what will achieve',
      'What will achieve the workers'
    ],
    correctAnswer: 1,
    explanation: 'Kalimat ini memerlukan klausa kata benda (noun clause) sebagai subjek kalimat utama. Pola kalimat di dalam noun clause harus berbentuk kalimat pernyataan (kata tanya + subjek + kata kerja): "What the workers will achieve".',
    timeLimit: 30
  },
  // 36. Structure (hard)
  {
    id: 'tbi-sc-36',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'Each of the departments _______ with external consultants to improve productivity.',
    options: [
      'Have collaborated',
      'Collaborating',
      'Are collaborating',
      'Have been collaborating',
      'Is collaborating'
    ],
    correctAnswer: 4,
    explanation: 'Subjek "Each of the departments" bernilai tunggal karena berpatokan pada kata ganti "Each". Oleh karena itu, kata kerja bantu yang tepat adalah kata kerja bantu tunggal present: "Is collaborating".',
    timeLimit: 30
  },
  // 37. Structure (hard)
  {
    id: 'tbi-sc-37',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'Managing ___________ can help project managers succeed in high-pressure tasks.',
    options: [
      'Stressed and anxious',
      'Stress and anxious',
      'Stressed and anxiety',
      'Stress and anxiety',
      'Stressless and anxiety'
    ],
    correctAnswer: 3,
    explanation: 'Frasa "Managing..." membutuhkan objek berupa kata benda (nouns). Agar sejajar (parallel), kedua kata benda tersebut adalah "stress" (kata benda) dan "anxiety" (kata benda).',
    timeLimit: 30
  },
  // 38. Structure (hard)
  {
    id: 'tbi-sc-38',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'The audit committee had been in the conference hall ____________ financial records together.',
    options: [
      'Looking out',
      'Looking in',
      'Looking after',
      'Looking down',
      'Looking over'
    ],
    correctAnswer: 4,
    explanation: 'Phrasal verb "looking over" memiliki arti memeriksa, meneliti, atau mengamati dokumen secara cermat. Sangat sesuai untuk konteks meneliti berkas keuangan bersama.',
    timeLimit: 30
  },
  // 39. Structure (hard)
  {
    id: 'tbi-sc-39',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'The airline delayed the flight ________ the dense fog.',
    options: [
      'Although',
      'When',
      'On account of',
      'Due of',
      'Because'
    ],
    correctAnswer: 2,
    explanation: 'Kalimat ini membutuhkan preposisi penunjuk alasan sebelum frasa benda "the dense fog". Preposisi yang tepat adalah "On account of" (karena). "Due of" salah secara tata bahasa (seharusnya due to). "Because" dan "Although" adalah konjungsi yang membutuhkan anak kalimat lengkap (S + V).',
    timeLimit: 30
  },
  // 40. Structure (hard)
  {
    id: 'tbi-sc-40',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'Why so many stars collapse in this galaxy __________ unknown, but astronomers have learned much about the physics of the phenomenon.',
    options: [
      'are',
      'were',
      'is',
      'had',
      'being'
    ],
    correctAnswer: 2,
    explanation: 'Klausa kata benda (noun clause) "Why so many stars collapse in this galaxy" berfungsi sebagai subjek tunggal dari seluruh kalimat, sehingga membutuhkan kata kerja bantu tunggal present: "is".',
    timeLimit: 30
  },
  // 41. Reading (easy)
  {
    id: 'tbi-rc-41',
    testType: 'TBI',
    category: 'reading-comprehension',
    difficulty: 'mudah',
    passage: 'The study of ancestral dietary habits has attracted significant academic interest. Proponents of evolutionary nutrition often argue that early hominids consumed primarily animal protein with very few plant-based carbohydrates. According to this view, modern human physiology is optimized for such animal-heavy nutritional regimes. However, recent anthropological research suggests a different story. Investigations into ancient food residues and dental wear indicate that prehistoric populations possessed remarkably diverse eating habits, highly dependent on local ecosystems, seasonal cycles, and regional climates. Anthropologists studying modern foraging communities in tropical and subtropical regions have found that their seasonal intake of tubers, honey, and wild plants is surprisingly substantial, challenging the popular assumption that ancient survival relied solely on hunting large game.',
    question: 'What is the main idea of the passage?',
    options: [
      'Modern evolutionary nutrition is the only scientifically backed diet.',
      'Early hominids lived exclusively on animal meat.',
      'Prehistoric diets were far more varied and diverse than commonly assumed.',
      'The development of agriculture completely destroyed human health.',
      'Modern foraging communities have stopped gathering wild plants.'
    ],
    correctAnswer: 2,
    explanation: 'Ide utama teks adalah menyanggah asumsi umum bahwa diet manusia purba hanya berpusat pada daging hewan saja. Penelitian menunjukkan pola makan mereka sangat bervariasi (diverse) tergantung musim, iklim, dan geografi.',
    timeLimit: 90
  },
  // 42. Reading (easy)
  {
    id: 'tbi-rc-42',
    testType: 'TBI',
    category: 'reading-comprehension',
    difficulty: 'mudah',
    passage: 'The study of ancestral dietary habits has attracted significant academic interest. Proponents of evolutionary nutrition often argue that early hominids consumed primarily animal protein with very few plant-based carbohydrates. According to this view, modern human physiology is optimized for such animal-heavy nutritional regimes. However, recent anthropological research suggests a different story. Investigations into ancient food residues and dental wear indicate that prehistoric populations possessed remarkably diverse eating habits, highly dependent on local ecosystems, seasonal cycles, and regional climates. Anthropologists studying modern foraging communities in tropical and subtropical regions have found that their seasonal intake of tubers, honey, and wild plants is surprisingly substantial, challenging the popular assumption that ancient survival relied solely on hunting large game.',
    question: 'What is the author’s primary purpose in writing the passage?',
    options: [
      'To advocate for the widespread adoption of evolutionary diets.',
      'To outline the specific geological timeline of early hominids.',
      'To challenge the assumption that prehistoric diets were universally meat-dominated.',
      'To detail the history of agricultural cultivation in early civilizations.',
      'To demonstrate the specific medicinal benefits of honey and tubers.'
    ],
    correctAnswer: 2,
    explanation: 'Tujuan utama penulis adalah menantang klaim atau asumsi umum bahwa pola makan manusia purba didominasi penuh oleh daging (meat-dominated). Hal ini dijelaskan lewat bukti-bukti riset antropologi terbaru.',
    timeLimit: 90
  },
  // 43. Reading (easy)
  {
    id: 'tbi-rc-43',
    testType: 'TBI',
    category: 'reading-comprehension',
    difficulty: 'mudah',
    passage: 'Global healthcare approaches vary widely due to regional disparities in economic development, cultural traditions, and scientific infrastructure. While industrialized nations rely heavily on advanced clinical protocols, many communities in developing regions depend on traditional healing systems, which frequently lack standardized training and empirical validation. Nevertheless, even in highly developed healthcare environments, evidence-based guidelines are not universally applied. A substantial number of clinical decisions are made without robust clinical trials to confirm their safety or efficacy. In daily practice, a practitioner\'s encounter with a patient begins with a systematic review of symptoms and medical history, followed by a clinical interview and physical examination using diagnostic instruments. The practitioner then formulates a differential diagnosis to exclude unlikely conditions. Every detail of this medical consultation is recorded in the patient\'s clinical file, which serves as a legally binding document in most legal systems.',
    question: 'In the passage, what does the phrase “a legally binding document” refer to?',
    options: [
      'The patient’s clinical history',
      'The consultation between doctor and patient',
      'The patient\'s clinical file',
      'The diagnostic instruments',
      'The pharmaceutical prescription'
    ],
    correctAnswer: 2,
    explanation: 'Di akhir teks secara jelas disebutkan: "Every detail of this medical consultation is recorded in the patient\'s clinical file, which serves as a legally binding document...", menunjukkan dokumen hukum yang dimaksud adalah berkas klinis pasien (clinical file/medical record).',
    timeLimit: 90
  },
  // 44. Reading (easy)
  {
    id: 'tbi-rc-44',
    testType: 'TBI',
    category: 'reading-comprehension',
    difficulty: 'mudah',
    passage: 'Global healthcare approaches vary widely due to regional disparities in economic development, cultural traditions, and scientific infrastructure. While industrialized nations rely heavily on advanced clinical protocols, many communities in developing regions depend on traditional healing systems, which frequently lack standardized training and empirical validation. Nevertheless, even in highly developed healthcare environments, evidence-based guidelines are not universally applied. A substantial number of clinical decisions are made without robust clinical trials to confirm their safety or efficacy. In daily practice, a practitioner\'s encounter with a patient begins with a systematic review of symptoms and medical history, followed by a clinical interview and physical examination using diagnostic instruments. The practitioner then formulates a differential diagnosis to exclude unlikely conditions. Every detail of this medical consultation is recorded in the patient\'s clinical file, which serves as a legally binding document in most legal systems.',
    question: 'Which of the following is NOT mentioned as part of the practitioner-patient encounter in the passage?',
    options: [
      'Reviewing symptoms and medical history',
      'Conducting a clinical interview',
      'Performing a physical examination',
      'Using diagnostic instruments',
      'Designing healthcare facilities'
    ],
    correctAnswer: 4,
    explanation: 'Peninjauan gejala & riwayat (A), wawancara klinis (B), pemeriksaan fisik (C), dan alat diagnosis (D) semuanya disebutkan di paragraf terakhir. Merancang fasilitas kesehatan (E) tidak pernah disebutkan sebagai bagian dari konsultasi.',
    timeLimit: 90
  },
  // 45. Reading (medium)
  {
    id: 'tbi-rc-45',
    testType: 'TBI',
    category: 'reading-comprehension',
    difficulty: 'sedang',
    passage: 'Cultural customs in different countries can often surprise foreign observers, who are accustomed to different daily practices. For instance, international visitors are frequently startled by the transient nature of modern urban life in some societies, where citizens think nothing of renting fully furnished apartments, down to the kitchen utensils, on extremely short notice. This emphasis on convenience is paired with a restless level of spatial mobility. In vast geographic nations, residents regularly drive a hundred miles just to spend an evening dining with acquaintances or attending a theatrical performance. Similarly, teenagers often choose universities thousands of miles away from their hometowns simply to experience a new regional environment, moving across the country in large numbers.',
    question: 'In the passage, the word “startled” is closest in meaning to ___________',
    options: [
      'Excited',
      'Shocked',
      'Confused',
      'Relaxed',
      'Interested'
    ],
    correctAnswer: 1,
    explanation: 'Kata "startled" dalam konteks terkejut/terperangah atas perbedaan budaya memiliki makna yang paling dekat dengan "Shocked" (terkejut/kaget).',
    timeLimit: 90
  },
  // 46. Reading (medium)
  {
    id: 'tbi-rc-46',
    testType: 'TBI',
    category: 'reading-comprehension',
    difficulty: 'sedang',
    passage: 'Cultural customs in different countries can often surprise foreign observers, who are accustomed to different daily practices. For instance, international visitors are frequently startled by the transient nature of modern urban life in some societies, where citizens think nothing of renting fully furnished apartments, down to the kitchen utensils, on extremely short notice. This emphasis on convenience is paired with a restless level of spatial mobility. In vast geographic nations, residents regularly drive a hundred miles just to spend an evening dining with acquaintances or attending a theatrical performance. Similarly, teenagers often choose universities thousands of miles away from their hometowns simply to experience a new regional environment, moving across the country in large numbers.',
    question: 'What can be inferred about the society described in the passage?',
    options: [
      'Residents dislike traveling long distances.',
      'Young people prefer staying close to their families.',
      'The population is highly accustomed to mobility and change.',
      'Cultural events are rarely attended by the general public.',
      'People generally avoid renting temporary goods.'
    ],
    correctAnswer: 2,
    explanation: 'Dari kalimat tentang kehidupan perkotaan yang bersifat sementara ("transient nature") dan kebiasaan berkendara jauh ("spatial mobility"), dapat disimpulkan bahwa populasi tersebut sangat terbiasa dengan mobilitas tinggi dan perubahan (mobility and change).',
    timeLimit: 90
  },
  // 47. Reading (hard)
  {
    id: 'tbi-rc-47',
    testType: 'TBI',
    category: 'reading-comprehension',
    difficulty: 'sulit',
    passage: 'The scientific journey of modern pain relief began in 1758 when a researcher named Edward Stone investigated the therapeutic qualities of willow bark. Stone noticed that the bark had a highly bitter taste, which reminded him of "cinchona bark," a substance utilized since the 1640s to reduce high fevers and treat infections. Intrigued, Stone crushed the willow bark and conducted clinical trials, demonstrating its power to lower body temperatures and alleviate physical discomfort. He presented his scientific findings to the British Royal Society in 1763. Decades later, chemists Brugnatelli and Fontana isolated the active compound responsible for these therapeutic properties, naming it salicin. This discovery eventually led to the synthesis of acetylsalicylic acid, which was commercialized under the trade name "aspirin" in the late 1890s, with commercial sales starting in 1899.',
    question: 'According to the passage, in what year did Edward Stone present his findings on willow bark to the British Royal Society?',
    options: [
      '1640',
      '1758',
      '1763',
      '1890',
      '1899'
    ],
    correctAnswer: 2,
    explanation: 'Teks menyatakan secara langsung pada kalimat ke-4: "He presented his scientific findings to the British Royal Society in 1763."',
    timeLimit: 90
  },
  // 48. Reading (hard)
  {
    id: 'tbi-rc-48',
    testType: 'TBI',
    category: 'reading-comprehension',
    difficulty: 'sulit',
    passage: 'The scientific journey of modern pain relief began in 1758 when a researcher named Edward Stone investigated the therapeutic qualities of willow bark. Stone noticed that the bark had a highly bitter taste, which reminded him of "cinchona bark," a substance utilized since the 1640s to reduce high fevers and treat infections. Intrigued, Stone crushed the willow bark and conducted clinical trials, demonstrating its power to lower body temperatures and alleviate physical discomfort. He presented his scientific findings to the British Royal Society in 1763. Decades later, chemists Brugnatelli and Fontana isolated the active compound responsible for these therapeutic properties, naming it salicin. This discovery eventually led to the synthesis of acetylsalicylic acid, which was commercialized under the trade name "aspirin" in the late 1890s, with commercial sales starting in 1899.',
    question: 'Which of the following statements is TRUE according to the passage?',
    options: [
      'Edward Stone discovered the compound salicin in 1758.',
      'Brugnatelli and Fontana presented their findings to the British Royal Society in 1763.',
      'Synthetic acetylsalicylic acid was first invented in the 1640s.',
      'Edward Stone associated willow bark with cinchona bark due to its bitter taste.',
      'Commercial sales of aspirin first began in 1763.'
    ],
    correctAnswer: 3,
    explanation: 'Riset menyebutkan: "Stone noticed that the bark had a highly bitter taste, which reminded him of cinchona bark..." Hal ini membuktikan Edward Stone mengasosiasikan kulit willow dengan cinchona (Peruvian Bark) karena rasa pahitnya.',
    timeLimit: 90
  },
  // 49. Reading (hard)
  {
    id: 'tbi-rc-49',
    testType: 'TBI',
    category: 'reading-comprehension',
    difficulty: 'sulit',
    passage: 'Sustainable Waste Management (SWM) focuses on handling refuse in ecologically sound ways to mitigate risks to human well-being and ecosystems. In developing regions, medical waste surged by nearly a third during recent global health events, intensifying ecological and social anxieties. This dramatic increase was compounded by poor compliance with international standards, outdated treatment equipment, and lenient regulatory oversight. A significant portion of this refuse consisted of synthetic materials from disposable protective gear, which was frequently dumped in open landfills or burned without regard for safety. Typically, SWM success is evaluated using the triple bottom line (TBL) framework—assessing environmental, social, and economic impacts. While cost-containment is crucial, environmental impacts are mitigated through stricter controls and assessments at treatment facilities. Modern waste management must also integrate technological performance and occupational safety, especially since healthcare waste contains highly infectious agents that put sanitation workers at risk.',
    question: 'In the passage, the word “intensifying” is closest in meaning to __________',
    options: [
      'Weakening',
      'Increasing',
      'Ignoring',
      'Simplifying',
      'Reducing'
    ],
    correctAnswer: 1,
    explanation: 'Kata "intensifying" memiliki makna memperparah atau menaikkan intensitas, sehingga artinya paling dekat dengan "Increasing" (meningkat/menjadi parah).',
    timeLimit: 90
  },
  // 50. Reading (hard)
  {
    id: 'tbi-rc-50',
    testType: 'TBI',
    category: 'reading-comprehension',
    difficulty: 'sulit',
    passage: 'Sustainable Waste Management (SWM) focuses on handling refuse in ecologically sound ways to mitigate risks to human well-being and ecosystems. In developing regions, medical waste surged by nearly a third during recent global health events, intensifying ecological and social anxieties. This dramatic increase was compounded by poor compliance with international standards, outdated treatment equipment, and lenient regulatory oversight. A significant portion of this refuse consisted of synthetic materials from disposable protective gear, which was frequently dumped in open landfills or burned without regard for safety. Typically, SWM success is evaluated using the triple bottom line (TBL) framework—assessing environmental, social, and economic impacts. While cost-containment is crucial, environmental impacts are mitigated through stricter controls and assessments at treatment facilities. Modern waste management must also integrate technological performance and occupational safety, especially since healthcare waste contains highly infectious agents that put sanitation workers at risk.',
    question: 'In the passage, the word “mitigated” is closest in meaning to ___________',
    options: [
      'Worsened',
      'Controlled',
      'Expanded',
      'Eliminated',
      'Ignored'
    ],
    correctAnswer: 1,
    explanation: 'Kata "mitigated" berarti dikurangi dampaknya, diredam, atau dikendalikan. Oleh karena itu, makna terdekatnya adalah "Controlled" (dikendalikan).',
    timeLimit: 90
  },

  // ─── NEW SET (51 TO 100) ───
  // 51. Structure (easy)
  {
    id: 'tbi-sc-51',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'The department ________ a revision of the guidelines. They are unhappy with the active version.',
    options: [
      'wanting',
      'has wanted',
      'wanted',
      'want',
      'wants'
    ],
    correctAnswer: 4,
    explanation: 'Subjek "The department" adalah kata benda tunggal (singular noun). Konteks kalimat menunjukkan ketidakpuasan saat ini ("They are unhappy..."), sehingga menggunakan simple present tense: "wants".',
    timeLimit: 30
  },
  // 52. Structure (easy)
  {
    id: 'tbi-sc-52',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'Macaroni and cheese __________ a popular comfort food. However, it is a meal that contains high calories.',
    options: [
      'are',
      'were',
      'is',
      'was',
      'being'
    ],
    correctAnswer: 2,
    explanation: 'Meskipun subjeknya berupa gabungan kata "Macaroni and cheese", keterangan tambahan "it is a meal" memperjelas bahwa subjek dinilai sebagai satu hidangan tunggal. Maka kata kerja harus tunggal: "is".',
    timeLimit: 30
  },
  // 53. Structure (easy)
  {
    id: 'tbi-sc-53',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'Either the supervisors or the technician __________ the laboratory every morning.',
    options: [
      'to inspect',
      'inspecting',
      'have inspected',
      'inspect',
      'inspects'
    ],
    correctAnswer: 4,
    explanation: 'Untuk korelasi "Either... or...", kata kerja bersepakat dengan subjek terdekat. Subjek terdekat adalah "the technician" (tunggal), sehingga kata kerja berakhiran -s: "inspects".',
    timeLimit: 30
  },
  // 54. Structure (easy)
  {
    id: 'tbi-sc-54',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'In general, a number of voters ___________ the new policy reform.',
    options: [
      'doesn’t support',
      'don’t support',
      'didn’t support',
      'won’t support',
      'isn’t supported'
    ],
    correctAnswer: 1,
    explanation: 'Frasa "a number of" selalu diikuti oleh kata benda jamak dan menuntut kata kerja bantu jamak. Bentuk negatif present jamak yang tepat adalah "don\'t support".',
    timeLimit: 30
  },
  // 55. Structure (easy)
  {
    id: 'tbi-sc-55',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'The foundation\'s Clean Drinking Water initiative, locally known as Air Bersih Sehat, ________ 12.5 million households nationwide, including 3.2 million infants, 1.5 million elderly citizens, and 450,000 remote families.',
    options: [
      'had reached',
      'reach',
      'have reached',
      'has reached',
      'reached'
    ],
    correctAnswer: 3,
    explanation: 'Subjek "The foundation\'s Clean Drinking Water initiative" adalah tunggal (singular). Untuk menyatakan pencapaian yang memiliki dampak hingga kini (present perfect tense), kata kerja bantu yang tepat adalah "has reached".',
    timeLimit: 30
  },
  // 56. Structure (easy)
  {
    id: 'tbi-sc-56',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'The construction workers _______ under a canopy when the storm began to brew.',
    options: [
      'was resting',
      'were resting',
      'had been resting',
      'standing',
      'Has resting'
    ],
    correctAnswer: 1,
    explanation: 'Aksi yang sedang berlangsung di masa lampau ketika disela oleh aksi lain ("when the storm began...") menggunakan Past Continuous Tense. Subjek "The construction workers" jamak, sehingga menggunakan "were resting".',
    timeLimit: 30
  },
  // 57. Structure (easy)
  {
    id: 'tbi-sc-57',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'One of the most experienced engineers who _________ the project is David.',
    options: [
      'to lead',
      'leading',
      'lead',
      'leads',
      'led'
    ],
    correctAnswer: 4,
    explanation: 'Relative pronoun "who" menerangkan "engineers" (jamak), namun dalam konteks fakta sejarah proyek yang telah diselesaikan (past tense), bentuk yang paling tepat adalah "led" (V2).',
    timeLimit: 30
  },
  // 58. Structure (easy)
  {
    id: 'tbi-sc-58',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'I’m not certain, but she _________ missed the announcement.',
    options: [
      'must have',
      'should have',
      'could have',
      'might have',
      'would have'
    ],
    correctAnswer: 3,
    explanation: 'Pernyataan "I\'m not certain" menunjukkan tingkat keyakinan rendah atau spekulasi tentang masa lalu. Bentuk modal lampau yang paling tepat untuk kemungkinan spekulatif adalah "might have".',
    timeLimit: 30
  },
  // 59. Structure (easy)
  {
    id: 'tbi-sc-59',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'If you had practiced, you ______ won the competition easily.',
    options: [
      'must have',
      'should have',
      'could have',
      'might have',
      'would have'
    ],
    correctAnswer: 4,
    explanation: 'Ini adalah Conditional Sentence Type 3 (situasi pengandaian di masa lampau). Strukturnya: If + Past Perfect (had + V3), Subject + would have + V3. Maka kita menggunakan "would have".',
    timeLimit: 30
  },
  // 60. Structure (easy)
  {
    id: 'tbi-sc-60',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'The administrative steps to altering a constitution using either the public referendum or the legislative assembly _____ extremely complex.',
    options: [
      'Are',
      'Have been',
      'Be',
      'Has been',
      'Is'
    ],
    correctAnswer: 0,
    explanation: 'Subjek utama kalimat adalah "The administrative steps" yang berbentuk jamak (plural). Maka, kata kerja bantu present yang tepat adalah "Are".',
    timeLimit: 30
  },
  // 61. Structure (easy)
  {
    id: 'tbi-sc-61',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'The number of tourists ______ the island this summer.',
    options: [
      'will visits',
      'will visit',
      'is visit',
      'is visiting',
      'are visiting'
    ],
    correctAnswer: 3,
    explanation: 'Frasa "The number of..." bernilai tunggal (singular). Keterangan waktu "this summer" menunjukkan tren yang sedang berlangsung saat ini, sehingga kata kerja bantu present continuous singular yang tepat adalah "is visiting".',
    timeLimit: 30
  },
  // 62. Structure (easy)
  {
    id: 'tbi-sc-62',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'Mr. Henderson never risks ________ his savings in the stock market.',
    options: [
      'Being invested',
      'Investing',
      'To invest',
      'To be invested',
      'Invested'
    ],
    correctAnswer: 1,
    explanation: 'Kata kerja "risk" selalu diikuti oleh Gerund (V-ing). Maka bentuk yang tepat adalah "Investing".',
    timeLimit: 30
  },
  // 63. Structure (easy)
  {
    id: 'tbi-sc-63',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'The presenter goes on ________ the same slide over and over again.',
    options: [
      'To show',
      'To be shown',
      'Showing',
      'Shown',
      'Being shown'
    ],
    correctAnswer: 2,
    explanation: 'Ungkapan "go on" yang diikuti oleh Gerund (V-ing) mengekspresikan kelanjutan dari suatu aktivitas atau kebiasaan yang berulang ("over and over again"). Maka kita gunakan "Showing".',
    timeLimit: 30
  },
  // 64. Structure (easy)
  {
    id: 'tbi-sc-64',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'The employee tried ________ the manager to listen but it was of no avail.',
    options: [
      'Convince',
      'to convince',
      'to be convinced',
      'Convincing',
      'Being convinced'
    ],
    correctAnswer: 1,
    explanation: 'Kata kerja "try" diikuti oleh "to-infinitive" jika menunjukkan usaha keras atau ikhtiar untuk mencapai sesuatu yang sulit. Maka bentuk yang tepat adalah "to convince".',
    timeLimit: 30
  },
  // 65. Structure (easy)
  {
    id: 'tbi-sc-65',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'The driver stopped ________ a map before continuing his journey.',
    options: [
      'to consult',
      'consulting',
      'consult',
      'consulted',
      'to consulting'
    ],
    correctAnswer: 0,
    explanation: 'Kata kerja "stop" diikuti "to-infinitive" jika subjek menghentikan tindakan lain untuk memulai tindakan baru (tujuan). Dalam konteks ini, pengemudi berhenti berkendara demi melihat peta: "to consult".',
    timeLimit: 30
  },
  // 66. Structure (easy)
  {
    id: 'tbi-sc-66',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'mudah',
    question: 'Collecting old stamps and coins __________________ a fascinating hobby.',
    options: [
      'is',
      'are',
      'were',
      'have been',
      'had'
    ],
    correctAnswer: 0,
    explanation: 'Subjek kalimat adalah gerund phrase "Collecting old stamps and coins" yang selalu dinilai tunggal (singular), sehingga membutuhkan kata kerja bantu tunggal "is".',
    timeLimit: 30
  },
  // 67. Structure (medium)
  {
    id: 'tbi-sc-67',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sedang',
    question: 'The researcher didn\'t succeed in his analysis. He __________ more variables to achieve a more reliable conclusion.',
    options: [
      'would be added',
      'had to add',
      'should have added',
      'could add',
      'must add'
    ],
    correctAnswer: 2,
    explanation: 'Kalimat ini mengekspresikan penyesalan atau rekomendasi atas peristiwa masa lampau yang tidak dilaksanakan. Pola penyesalan masa lalu adalah: should have + V3 ("should have added").',
    timeLimit: 30
  },
  // 68. Structure (medium)
  {
    id: 'tbi-sc-68',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sedang',
    question: 'The technician conducted a ______ inspection of the equipment.',
    options: [
      'thoroughness',
      'thoroughly',
      'thorough',
      'thoroughing',
      'thoroughness'
    ],
    correctAnswer: 2,
    explanation: 'Kita memerlukan kata sifat (adjective) untuk menerangkan kata benda "inspection". Bentuk kata sifat yang tepat adalah "thorough" (menyeluruh).',
    timeLimit: 30
  },
  // 69. Structure (medium)
  {
    id: 'tbi-sc-69',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sedang',
    question: 'The new program aims to increase the ______ of solar power grids.',
    options: [
      'efficient',
      'efficiency',
      'efficiently',
      'effect',
      'effection'
    ],
    correctAnswer: 1,
    explanation: 'Kalimat ini membutuhkan kata benda (noun) setelah artikel "the". Bentuk kata benda yang tepat adalah "efficiency" (efisiensi).',
    timeLimit: 30
  },
  // 70. Structure (medium)
  {
    id: 'tbi-sc-70',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sedang',
    question: 'Skilled chefs are expected to select ingredients, prepare dishes, and ______ under pressure.',
    options: [
      'kitchen managing',
      'manage kitchens',
      'managing kitchens',
      'managed kitchens',
      'kitchens'
    ],
    correctAnswer: 1,
    explanation: 'Kalimat ini membutuhkan struktur kesejajaran (parallel structure) setelah kata "to": "to select...", "prepare..." (bare V), dan "manage..." (bare V). Maka pilihan yang tepat adalah "manage kitchens".',
    timeLimit: 30
  },
  // 71. Structure (medium)
  {
    id: 'tbi-sc-71',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sedang',
    question: 'Organizational growth depends not only on funding but also on strategy, leadership, and ______',
    options: [
      'innovated',
      'innovation',
      'innovate',
      'innovative',
      'innovating'
    ],
    correctAnswer: 1,
    explanation: 'Kalimat membutuhkan kesejajaran kelas kata benda (nouns) setelah preposisi "on": "strategy" (noun), "leadership" (noun), dan "innovation" (noun).',
    timeLimit: 30
  },
  // 72. Structure (medium)
  {
    id: 'tbi-sc-72',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sedang',
    question: 'The journalist spoke with multiple residents ______ houses were damaged by the severe storm.',
    options: [
      'whom',
      'whose',
      'which',
      'who',
      'where'
    ],
    correctAnswer: 1,
    explanation: 'Kata ganti relatif kepemilikan (possessive relative pronoun) "whose" digunakan untuk menunjukkan hubungan milik atas benda setelahnya ("houses"), merujuk pada rumah-rumah milik warga tersebut.',
    timeLimit: 30
  },
  // 73. Structure (medium)
  {
    id: 'tbi-sc-73',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sedang',
    question: '______ in multiple major galleries, the paintings received critical praise.',
    options: [
      'exhibiting',
      'exhibited',
      'having exhibit',
      'to exhibit',
      'exhibits'
    ],
    correctAnswer: 1,
    explanation: 'Kalimat ini menggunakan reduced relative clause pasif (past participle phrase) untuk memodifikasi subjek "the paintings". Frasa "exhibited in..." merupakan kependekan dari "which were exhibited in...".',
    timeLimit: 30
  },
  // 74. Structure (medium)
  {
    id: 'tbi-sc-74',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sedang',
    question: 'The scientist ________ designed the autonomous system will present the results tomorrow.',
    options: [
      'whom',
      'whose',
      'who',
      'which',
      'where'
    ],
    correctAnswer: 2,
    explanation: 'Kata ganti relatif subjek "who" digunakan untuk merujuk pada orang ("The scientist") yang melakukan tindakan merancang sistem.',
    timeLimit: 30
  },
  // 75. Structure (hard)
  {
    id: 'tbi-sc-75',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'Candidates ________ for the executive position must submit their credentials before Monday.',
    options: [
      'applying',
      'applied',
      'having applied',
      'to applying',
      'apply'
    ],
    correctAnswer: 0,
    explanation: 'Kalimat ini menggunakan reduced relative clause aktif (present participle) untuk memodifikasi subjek "Candidates". Frasa "applying for..." merupakan kependekan dari "who are applying for...".',
    timeLimit: 30
  },
  // 76. Structure (hard)
  {
    id: 'tbi-sc-76',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'The project\'s timeline failed because the plan ______ executed carefully.',
    options: [
      'should be',
      'should have been',
      'may be',
      'must be',
      'could have'
    ],
    correctAnswer: 1,
    explanation: 'Kalimat ini menceritakan kegagalan di masa lampau ("failed"). Kegagalan tersebut terjadi akibat suatu rencana yang tidak dilaksanakan dengan hati-hati (penyesalan pasif masa lampau). Struktur yang tepat adalah: should have been + V3 ("should have been executed").',
    timeLimit: 30
  },
  // 77. Structure (hard)
  {
    id: 'tbi-sc-77',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'You cannot board the flight ______ you present a valid boarding pass.',
    options: [
      'because',
      'although',
      'if',
      'when',
      'unless'
    ],
    correctAnswer: 4,
    explanation: 'Konjungsi pengandaian negatif "unless" (kecuali jika / if not) digunakan untuk menunjukkan syarat mutlak agar suatu tindakan bisa terlaksana.',
    timeLimit: 30
  },
  // 78. Structure (hard)
  {
    id: 'tbi-sc-78',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'The outdoor concert was ______ due to the heavy rain.',
    options: [
      'called off',
      'called up',
      'called in',
      'called out',
      'called on'
    ],
    correctAnswer: 0,
    explanation: 'Phrasal verb "called off" bermakna dibatalkan (cancelled), yang sangat sesuai dengan kondisi pembatalan konser akibat hujan deras.',
    timeLimit: 30
  },
  // 79. Structure (hard)
  {
    id: 'tbi-sc-79',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'They ______ move to Europe next year, but they haven’t finalized the plans.',
    options: [
      'must',
      'should',
      'might',
      'could',
      'may'
    ],
    correctAnswer: 2,
    explanation: 'Pernyataan "haven\'t finalized the plans" menunjukkan kepastian rendah di masa depan. Kata bantu modal "might" mengekspresikan kemungkinan dengan tingkat keyakinan rendah secara tepat.',
    timeLimit: 30
  },
  // 80. Structure (hard)
  {
    id: 'tbi-sc-80',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'The corporation launched a ______ initiative to boost employee digital skills.',
    options: [
      'comprehensive technical development',
      'comprehensively technical development',
      'comprehensive technically development',
      'comprehensiveness technical developer',
      'comprehended technical development'
    ],
    correctAnswer: 0,
    explanation: 'Urutan modifier kata benda yang tepat: kata sifat ("comprehensive") menerangkan frasa kata benda pengubah ("technical development") secara sejajar. Pilihan A adalah bentuk yang paling alamiah.',
    timeLimit: 30
  },
  // 81. Structure (hard)
  {
    id: 'tbi-sc-81',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'Their exceptional ________ allowed them to complete the tedious audit ahead of schedule.',
    options: [
      'efficient',
      'efficiently',
      'efficiency',
      'efficacy',
      'effectuality'
    ],
    correctAnswer: 2,
    explanation: 'Kalimat ini membutuhkan kata benda (noun) setelah kata sifat kepemilikan dan deskriptif "exceptional". Bentuk kata benda yang tepat adalah "efficiency" (efisiensi).',
    timeLimit: 30
  },
  // 82. Structure (hard)
  {
    id: 'tbi-sc-82',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'The delegation of diplomats, together with their translators, ______ attending the emergency summit in Brussels.',
    options: [
      'is',
      'are',
      'has',
      'have',
      'were'
    ],
    correctAnswer: 0,
    explanation: 'Subjek utama kalimat adalah "The delegation of diplomats" (tunggal/singular). Penyertaan frasa tambahan "together with..." tidak merubah kesepakatan kata kerja tunggal, sehingga kata kerja bantu yang tepat adalah "is".',
    timeLimit: 30
  },
  // 83. Structure (hard)
  {
    id: 'tbi-sc-83',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'By the time the museum opens tomorrow, the curators ______ arranged the new art collection.',
    options: [
      'will have',
      'will have been',
      'have',
      'had',
      'are'
    ],
    correctAnswer: 0,
    explanation: 'Kombinasi klausa waktu "By the time + simple present (opens)" berpasangan dengan Future Perfect Tense (will have + V3) di klausa utamanya: "will have arranged".',
    timeLimit: 30
  },
  // 84. Structure (hard)
  {
    id: 'tbi-sc-84',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'The primary conclusions about oceanic patterns ________ by the leading meteorologists.',
    options: [
      'have been dismissed',
      'has been dismissed',
      'has dismissed',
      'have dismissed',
      'will have been dismissed'
    ],
    correctAnswer: 0,
    explanation: 'Subjek "The primary conclusions" berbentuk jamak (plural). Makna kalimat adalah pasif (didiskreditkan/ditolak), sehingga menuntut bentuk present perfect passive jamak: "have been dismissed".',
    timeLimit: 30
  },
  // 85. Structure (hard)
  {
    id: 'tbi-sc-85',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'Neither the highly experienced developers nor the director responsible for the software updates ______ willing to explain how the security vulnerability had been overlooked for several months.',
    options: [
      'were',
      'was',
      'have been',
      'are',
      'being'
    ],
    correctAnswer: 1,
    explanation: 'Untuk korelasi "Neither... nor...", kata kerja bersepakat dengan subjek terdekat yaitu "the director" (tunggal/singular), sehingga membutuhkan to be singular lampau: "was".',
    timeLimit: 30
  },
  // 86. Structure (hard)
  {
    id: 'tbi-sc-86',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'Not only the project coordinator but also the field representatives implementing the local campaign ______ highly active for more than six months.',
    options: [
      'was',
      'were',
      'is',
      'has been',
      'have been'
    ],
    correctAnswer: 4,
    explanation: 'Untuk korelasi "Not only... but also...", kata kerja bersepakat dengan subjek kedua terdekat yaitu "the field representatives" (jamak/plural). Ditambah durasi waktu "for more than six months" (present perfect), maka bentuk yang benar adalah "have been".',
    timeLimit: 30
  },
  // 87. Structure (hard)
  {
    id: 'tbi-sc-87',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'The template is intuitive. I’m sure it _____ recognizable to most of you already.',
    options: [
      'is',
      'was',
      'will be',
      'is going to be',
      'to be'
    ],
    correctAnswer: 0,
    explanation: 'Kalimat ini menyatakan keadaan umum saat ini (simple present state) dari templat tersebut, sehingga membutuhkan kata kerja bantu present: "is".',
    timeLimit: 30
  },
  // 88. Structure (hard)
  {
    id: 'tbi-sc-88',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'Traditional myths describing ancient explorers\' exceptional bravery, resilience, and navigation skills _____ the place of historical record.',
    options: [
      'have long taken',
      'has been taken',
      'is long taking',
      'taking',
      'has long taken'
    ],
    correctAnswer: 0,
    explanation: 'Subjek utama kalimat adalah "Traditional myths" berbentuk jamak (plural). Keterangan waktu menyatakan pencapaian yang relevan hingga saat ini (present perfect), sehingga bentuk aktif jamak yang tepat adalah "have long taken".',
    timeLimit: 30
  },
  // 89. Structure (hard)
  {
    id: 'tbi-sc-89',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'The survivors after the landslide are so isolated that they _____ neither communications nor emergency supplies.',
    options: [
      'could not establish',
      'would establish',
      'should establish',
      'could establish',
      'would not establish'
    ],
    correctAnswer: 3,
    explanation: 'Frasa "neither... nor..." sudah bermakna negatif (tidak ada komunikasi maupun pasokan darurat). Oleh karena itu, kata kerja bantu modal yang mendahuluinya harus bermakna positif agar tidak terjadi double negative: "could establish".',
    timeLimit: 30
  },
  // 90. Structure (hard)
  {
    id: 'tbi-sc-90',
    testType: 'TBI',
    category: 'structure-completion',
    difficulty: 'sulit',
    question: 'The police in the capital _______ the theft of national relics.',
    options: [
      'is investigating',
      'investigating',
      'does investigation',
      'do investigating',
      'are investigating'
    ],
    correctAnswer: 4,
    explanation: 'Subjek "The police" selalu bernilai jamak (plural) dalam bahasa Inggris dan memerlukan kata kerja bantu jamak. Untuk peristiwa yang sedang berlangsung, kata kerja bantu yang tepat adalah "are investigating".',
    timeLimit: 30
  },
  // 91. Reading (easy)
  {
    id: 'tbi-rc-91',
    testType: 'TBI',
    category: 'reading-comprehension',
    difficulty: 'mudah',
    passage: 'Elves in contemporary popular culture are typically depicted as slender, graceful beings with pointed ears, magical wisdom, and peaceful lives. They are often positive figures, such as the wood elves in modern fantasy novels, who use their magic to protect forests and guide lost travelers. This current perception is heavily shaped by 19th-century fantasy literature and folklore collections. However, the origin of elves is much older and far more complex. Similar mythological beings appeared in Germanic and Norse sagas, where they were viewed as minor gods of nature and light. Some scholars believe these spirits were closely tied to pre-Christian elemental worship, but their status gradually declined as new monotheistic religions spread across Europe. Another theory posits that stories of elves were inspired by memories of indigenous tribes who retreated into deep woodlands and subterranean caverns during historical invasions. Because these groups lived in isolation outside the mainstream society, they were often feared by agricultural villagers, who blamed them for mysterious occurrences such as ruined crops or missing livestock. Over time, these rural fears evolved into myths about elusive magical groups playing tricks on humans.',
    question: 'What is the main idea of the passage?',
    options: [
      'Elves were originally invented by 19th-century authors.',
      'Modern fantasy novels depict elves as dangerous creatures.',
      'Beliefs and depictions of elves have changed significantly over centuries and cultures.',
      'Ancient farmers were the first to prove the existence of magical beings.',
      'Wood elves are highly skilled in agriculture.'
    ],
    correctAnswer: 2,
    explanation: 'Gagasan utama teks menjelaskan bahwa kepercayaan dan penggambaran makhluk halus berupa peri/elf telah mengalami evolusi yang signifikan dari waktu ke waktu dan antar kebudayaan yang berbeda.',
    timeLimit: 90
  },
  // 92. Reading (easy)
  {
    id: 'tbi-rc-92',
    testType: 'TBI',
    category: 'reading-comprehension',
    difficulty: 'mudah',
    passage: 'Elves in contemporary popular culture are typically depicted as slender, graceful beings with pointed ears, magical wisdom, and peaceful lives. They are often positive figures, such as the wood elves in modern fantasy novels, who use their magic to protect forests and guide lost travelers. This current perception is heavily shaped by 19th-century fantasy literature and folklore collections. However, the origin of elves is much older and far more complex. Similar mythological beings appeared in Germanic and Norse sagas, where they were viewed as minor gods of nature and light. Some scholars believe these spirits were closely tied to pre-Christian elemental worship, but their status gradually declined as new monotheistic religions spread across Europe. Another theory posits that stories of elves were inspired by memories of indigenous tribes who retreated into deep woodlands and subterranean caverns during historical invasions. Because these groups lived in isolation outside the mainstream society, they were often feared by agricultural villagers, who blamed them for mysterious occurrences such as ruined crops or missing livestock. Over time, these rural fears evolved into myths about elusive magical groups playing tricks on humans.',
    question: 'What is the main purpose of the passage?',
    options: [
      'To tell an entertaining story about wood elves.',
      'To prove that subterranean caverns are inhabited by magical beings.',
      'To compare Norse sagas with modern scientific studies.',
      'To outline the historical origins and changing perceptions of elves over time.',
      'To warn agricultural villagers about crop damage.'
    ],
    correctAnswer: 3,
    explanation: 'Tujuan utama penulis menulis teks ini adalah untuk memaparkan asal-usul sejarah dan pergeseran persepsi masyarakat terhadap elf seiring berjalannya waktu.',
    timeLimit: 90
  },
  // 93. Reading (easy)
  {
    id: 'tbi-rc-93',
    testType: 'TBI',
    category: 'reading-comprehension',
    difficulty: 'mudah',
    passage: 'Contrary to the beliefs of many educators and parents, mandatory daily homework does not seem to improve young students\' academic performance or class attendance, according to a recent national analysis. The study scrutinized data from over 5,000 primary school children. Supporters of daily homework have argued that it instills discipline and fosters a stronger work ethic, which subsequently leads to higher test scores. To examine these assertions, researchers utilized data from a long-term developmental study that tracked a representative group of 5,200 students from first through sixth grade. Each year, teachers graded students\' study habits, classroom attention, and emotional health, while school offices logged their absences. Ultimately, mandatory daily homework showed no statistical impact on any dimension of learning or attendance at any grade level, even after adjusting for a variety of socioeconomic variables. The research did reveal that underprivileged students in schools with mandatory homework had a marginal increase in test scores, but the difference was negligible, amounting to less than a one percent improvement.',
    question: 'The word “fosters” in the passage is closest in meaning to ___________',
    options: [
      'prevents',
      'encourages',
      'ignores',
      'replace',
      'observes'
    ],
    correctAnswer: 1,
    explanation: 'Kata "fosters" bermakna membina, merawat, atau mendorong pertumbuhan. Dalam konteks membangun etos kerja ("fosters a stronger work ethic"), makna terdekatnya adalah "encourages" (mendorong).',
    timeLimit: 90
  },
  // 94. Reading (easy)
  {
    id: 'tbi-rc-94',
    testType: 'TBI',
    category: 'reading-comprehension',
    difficulty: 'mudah',
    passage: 'Contrary to the beliefs of many educators and parents, mandatory daily homework does not seem to improve young students\' academic performance or class attendance, according to a recent national analysis. The study scrutinized data from over 5,000 primary school children. Supporters of daily homework have argued that it instills discipline and fosters a stronger work ethic, which subsequently leads to higher test scores. To examine these assertions, researchers utilized data from a long-term developmental study that tracked a representative group of 5,200 students from first through sixth grade. Each year, teachers graded students\' study habits, classroom attention, and emotional health, while school offices logged their absences. Ultimately, mandatory daily homework showed no statistical impact on any dimension of learning or attendance at any grade level, even after adjusting for a variety of socioeconomic variables. The research did reveal that underprivileged students in schools with mandatory homework had a marginal increase in test scores, but the difference was negligible, amounting to less than a one percent improvement.',
    question: 'What can be inferred from the study about mandatory daily homework?',
    options: [
      'Homework significantly boosts student motivation and social skills.',
      'Most researchers strongly recommend increasing homework loads.',
      'Mandatory daily homework may have only a minimal or negligible impact on student outcomes.',
      'Underprivileged students are unable to complete their projects.',
      'Teachers prefer grading homework over teaching in class.'
    ],
    correctAnswer: 2,
    explanation: 'Berdasarkan teks, pemberian pekerjaan rumah harian secara wajib tidak memberikan efek statistik yang signifikan pada pembelajaran atau tingkat kehadiran. Maka, dapat disimpulkan bahwa dampaknya sangat minimal atau tidak berarti (negligible).',
    timeLimit: 90
  },
  // 95. Reading (medium)
  {
    id: 'tbi-rc-95',
    testType: 'TBI',
    category: 'reading-comprehension',
    difficulty: 'sedang',
    passage: 'In the eighteenth and nineteenth centuries, coal was by far the most vital energetic export of Great Britain, preferred by the European manufacturing sector because it was more efficient and generated far more heat than firewood. Mechanization of steam engines allowed factories to grow rapidly, and demand for coal increased dramatically. British mine operators met this massive demand largely due to Humphrey Davy’s invention of the safety lamp in 1815. Coal could be found widely across the country, but extracting it from deep shafts was extremely dangerous due to explosive gases. Early shallow mines were safer but ran out of fuel quickly. Deeper mines, which had more resources, were difficult to work manually because miners could not see in the dark without sparking explosions. Davy’s lamp, a oil-fueled light enclosed by wire gauze, allowed miners to work safely in gas-filled chambers, multiplying productivity. This development led to a surge in coal mining, making coal the dominant British export. In 1820, coal represented 12 percent of British exports by value, rising to 35 percent by 1835, and 58 percent by 1860. In comparison, wool represented only 5 percent of exports in 1860. Clearly, coal became the cornerstone of British trade during the Industrial Revolution, driving unprecedented urban growth in the midlands.',
    question: 'What invention by Humphrey Davy in 1815 allowed British miners to meet the rising demand for coal?',
    options: [
      'Steam engine',
      'Safety lamp',
      'Mechanical pump',
      'Wire drill',
      'Ventilator fan'
    ],
    correctAnswer: 1,
    explanation: 'Paragraf pertama kalimat ketiga menyatakan secara eksplisit: "...Humphrey Davy\'s invention of the safety lamp in 1815" yang membantu memenuhi tingginya permintaan batu bara.',
    timeLimit: 90
  },
  // 96. Reading (medium)
  {
    id: 'tbi-rc-96',
    testType: 'TBI',
    category: 'reading-comprehension',
    difficulty: 'sedang',
    passage: 'In the eighteenth and nineteenth centuries, coal was by far the most vital energetic export of Great Britain, preferred by the European manufacturing sector because it was more efficient and generated far more heat than firewood. Mechanization of steam engines allowed factories to grow rapidly, and demand for coal increased dramatically. British mine operators met this massive demand largely due to Humphrey Davy’s invention of the safety lamp in 1815. Coal could be found widely across the country, but extracting it from deep shafts was extremely dangerous due to explosive gases. Early shallow mines were safer but ran out of fuel quickly. Deeper mines, which had more resources, were difficult to work manually because miners could not see in the dark without sparking explosions. Davy’s lamp, a oil-fueled light enclosed by wire gauze, allowed miners to work safely in gas-filled chambers, multiplying productivity. This development led to a surge in coal mining, making coal the dominant British export. In 1820, coal represented 12 percent of British exports by value, rising to 35 percent by 1835, and 58 percent by 1860. In comparison, wool represented only 5 percent of exports in 1860. Clearly, coal became the cornerstone of British trade during the Industrial Revolution, driving unprecedented urban growth in the midlands.',
    question: 'By 1860, what percentage of the value of British exports was represented by coal?',
    options: [
      '12%',
      '35%',
      '50%',
      '58%',
      '5%'
    ],
    correctAnswer: 3,
    explanation: 'Kalimat ketiga paragraf kedua menerangkan data ekspor secara terperinci: "...rising to 35 percent by 1835, and 58 percent by 1860". Jadi nilai ekspor batu bara pada tahun 1860 adalah 58%.',
    timeLimit: 90
  },
  // 97. Reading (hard)
  {
    id: 'tbi-rc-97',
    testType: 'TBI',
    category: 'reading-comprehension',
    difficulty: 'sulit',
    passage: 'Memory plays a pivotal role in shaping our intellectual abilities, influencing our decisions, and determining our professional success. These mental processes, whether short-term or long-term, are deeply integrated systems that our brain executes almost seamlessly. Understanding the mechanics behind memory can pave the way for better learning strategies. At its core, memory retention comprises an encoding stage, a storage phase, and a retrieval cue, acting as a sequence for the brain to consolidate information. The encoding stage is the initial processing itself, whether it is reading a page, listening to a lecture, or observing an event. Finally, retrieval is the recall of information when triggered by a cue. This cycle becomes a reinforced neural pathway over time. Enhancing memory requires identifying the optimal retrieval cues and modifying the encoding routine. For instance, if the cue for remembering vocabulary is visual association, finding alternative sensory associations might strengthen the cognitive loop.',
    question: 'According to the passage, which of the following is NOT part of the memory retention cycle?',
    options: [
      'Encoding',
      'Storage',
      'Retrieval cue',
      'Motivation',
      'Sequence'
    ],
    correctAnswer: 3,
    explanation: 'Teks menyebutkan elemen memori: "encoding stage, a storage phase, and a retrieval cue" yang bertindak sebagai urutan ("sequence"). "Motivation" (motivasi) sama sekali tidak disebutkan sebagai bagian dari siklus retensi memori.',
    timeLimit: 90
  },
  // 98. Reading (hard)
  {
    id: 'tbi-rc-98',
    testType: 'TBI',
    category: 'reading-comprehension',
    difficulty: 'sulit',
    passage: 'Memory plays a pivotal role in shaping our intellectual abilities, influencing our decisions, and determining our professional success. These mental processes, whether short-term or long-term, are deeply integrated systems that our brain executes almost seamlessly. Understanding the mechanics behind memory can pave the way for better learning strategies. At its core, memory retention comprises an encoding stage, a storage phase, and a retrieval cue, acting as a sequence for the brain to consolidate information. The encoding stage is the initial processing itself, whether it is reading a page, listening to a lecture, or observing an event. Finally, retrieval is the recall of information when triggered by a cue. This cycle becomes a reinforced neural pathway over time. Enhancing memory requires identifying the optimal retrieval cues and modifying the encoding routine. For instance, if the cue for remembering vocabulary is visual association, finding alternative sensory associations might strengthen the cognitive loop.',
    question: 'Which of the following is NOT mentioned as an example of encoding in the passage?',
    options: [
      'Reading a page',
      'Listening to a lecture',
      'Observing an event',
      'Sleeping early',
      'Visual association'
    ],
    correctAnswer: 3,
    explanation: 'Pada paragraf pertama kalimat kelima disebutkan contoh encoding: "reading a page, listening to a lecture, or observing an event". Asosiasi visual ("Visual association") disebutkan di bagian akhir sebagai contoh cue. "Sleeping early" (tidur awal) sama sekali tidak disinggung.',
    timeLimit: 90
  },
  // 99. Reading (hard)
  {
    id: 'tbi-rc-99',
    testType: 'TBI',
    category: 'reading-comprehension',
    difficulty: 'sulit',
    passage: 'Kyoto is a famous and historical city. It is the cultural capital of Japan. The city is highly popular for international tourism because Kyoto is home to some of the oldest-standing temples and palaces in East Asia. Sarah and Emily recently traveled to Kyoto. They were extremely excited about their trip because this was their first journey overseas from the United States. Among the popular sights that Sarah and Emily visited are the Kinkaku-ji temple, Nijo Castle, and the Kyoto Tower. The Kinkaku-ji (Golden Pavilion) is one of Kyoto\'s most famous monuments. It is a beautiful zen temple covered in gold leaf. Unfortunately, Sarah and Emily were only able to view the pavilion from across the pond. The women learned that the temple\'s interior is undergoing restoration until next year. Fortunately, the Kyoto Tower, the city\'s famous observation deck, was open to the public. Kyoto Tower is situated near the central station, standing 131 meters high. It is one of Kyoto\'s most well-known spots for gaining panoramic views of the city. When their elevator reached the observation deck, the women took spectacular photographs of the beautiful cityscape below. The last place they visited was Nijo Castle, the historical residence of the shogun. The castle\'s incredible wooden architecture and historical significance awed the women. They had an amazing time visiting Kyoto and felt inspired to seek more travel destinations.',
    question: 'In the passage, the word “spectacular” in the sentence “the women took spectacular photographs” is closest in meaning to:',
    options: [
      'ordinary',
      'impressive',
      'simple',
      'average',
      'dull'
    ],
    correctAnswer: 1,
    explanation: 'Kata "spectacular" berarti spektakuler, luar biasa, atau sangat mengesankan, yang paling dekat artinya dengan "impressive" (mengesankan).',
    timeLimit: 90
  },
  // 100. Reading (hard)
  {
    id: 'tbi-rc-100',
    testType: 'TBI',
    category: 'reading-comprehension',
    difficulty: 'sulit',
    passage: 'Kyoto is a famous and historical city. It is the cultural capital of Japan. The city is highly popular for international tourism because Kyoto is home to some of the oldest-standing temples and palaces in East Asia. Sarah and Emily recently traveled to Kyoto. They were extremely excited about their trip because this was their first journey overseas from the United States. Among the popular sights that Sarah and Emily visited are the Kinkaku-ji temple, Nijo Castle, and the Kyoto Tower. The Kinkaku-ji (Golden Pavilion) is one of Kyoto\'s most famous monuments. It is a beautiful zen temple covered in gold leaf. Unfortunately, Sarah and Emily were only able to view the pavilion from across the pond. The women learned that the temple\'s interior is undergoing restoration until next year. Fortunately, the Kyoto Tower, the city\'s famous observation deck, was open to the public. Kyoto Tower is situated near the central station, standing 131 meters high. It is one of Kyoto\'s most well-known spots for gaining panoramic views of the city. When their elevator reached the observation deck, the women took spectacular photographs of the beautiful cityscape below. The last place they visited was Nijo Castle, the historical residence of the shogun. The castle\'s incredible wooden architecture and historical significance awed the women. They had an amazing time visiting Kyoto and felt inspired to seek more travel destinations.',
    question: 'In the passage, the word “awed” in the sentence “the castle\'s incredible wooden architecture... awed the women” is closest in meaning to:',
    options: [
      'frightened',
      'amazed',
      'confused',
      'disappointed',
      'bored'
    ],
    correctAnswer: 1,
    explanation: 'Kata "awed" berarti membuat takjub atau terpesona. Oleh karena itu, makna terdekatnya adalah "amazed" (takjub/terperangah kagum).',
    timeLimit: 90
  }
];

export function getTBIQuestions(): Question[] {
  return baseQuestions;
}
