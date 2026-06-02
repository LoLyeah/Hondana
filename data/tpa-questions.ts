import { Question, TPACategory, Difficulty } from '../lib/types';
import { figuralPatterns } from './figural-patterns';

// Static base questions for Verbal (Sinonim, Antonim, Analogi, Bacaan)
const verbalBase = {
  sinonim: [
    { q: 'PROYEKSI', opts: ['Perkiraan', 'Bantahan', 'Pencapaian', 'Keputusan', 'Kerjasama'], ans: 0, exp: 'Sinonim PROYEKSI adalah Perkiraan atau ramalan (misal proyeksi anggaran).' },
    { q: 'EVALUASI', opts: ['Perbaikan', 'Penilaian', 'Perkiraan', 'Penyusunan', 'Penyelidikan'], ans: 1, exp: 'Sinonim EVALUASI adalah Penilaian (pengukuran hasil).' },
    { q: 'DISPARITAS', opts: ['Persamaan', 'Perbandingan', 'Perbedaan', 'Perpecahan', 'Penyatuan'], ans: 2, exp: 'Sinonim DISPARITAS adalah Perbedaan atau jurang pemisah.' },
    { q: 'PRESTASI', opts: ['Hasil', 'Penghargaan', 'Pencapaian', 'Kemampuan', 'Keberuntungan'], ans: 2, exp: 'Sinonim PRESTASI adalah Pencapaian atau hasil yang telah dicapai.' },
    { q: 'INTEGRITAS', opts: ['Ketulusan', 'Kejujuran', 'Keselarasan', 'Keteguhan', 'Keterpaduan'], ans: 1, exp: 'Sinonim INTEGRITAS adalah Kejujuran, keteguhan sikap, atau mutu.' },
    { q: 'KAPABILITAS', opts: ['Kekuatan', 'Keahlian', 'Kemampuan', 'Kecerdasan', 'Keterampilan'], ans: 2, exp: 'Sinonim KAPABILITAS adalah Kemampuan atau daya tampung.' },
    { q: 'REKONSILIASI', opts: ['Perdamaian', 'Persidangan', 'Perdebatan', 'Perpisahan', 'Penyatuan'], ans: 0, exp: 'Sinonim REKONSILIASI adalah Perdamaian atau pemulihan hubungan persahabatan ke keadaan semula.' },
    { q: 'KONTINGENSI', opts: ['Ketidakpastian', 'Kepastian', 'Kemungkinan', 'Keadaan darurat', 'Peristiwa'], ans: 3, exp: 'Sinonim KONTINGENSI adalah Keadaan darurat atau peristiwa yang mungkin terjadi tapi belum pasti.' },
    { q: 'PANDIR', opts: ['Pintar', 'Bodoh', 'Konyol', 'Lucu', 'Sombong'], ans: 1, exp: 'Sinonim PANDIR adalah Bodoh atau bebal.' },
    { q: 'AKSELERASI', opts: ['Pemberhentian', 'Percepatan', 'Perlambatan', 'Kemajuan', 'Peralihan'], ans: 1, exp: 'Sinonim AKSELERASI adalah Percepatan.' }
  ],
  antonim: [
    { q: 'PROYEKSI', opts: ['Kenyataan', 'Impian', 'Ramalan', 'Penilaian', 'Rencana'], ans: 0, exp: 'Antonim PROYEKSI (perkiraan masa depan) adalah Kenyataan.' },
    { q: 'DISPARITAS', opts: ['Perbedaan', 'Persamaan', 'Keselarasan', 'Keseragaman', 'Penyatuan'], ans: 1, exp: 'Antonim DISPARITAS (perbedaan) adalah Persamaan.' },
    { q: 'PANDIR', opts: ['Bodoh', 'Pintar', 'Cerdas', 'Sakti', 'Bijaksana'], ans: 2, exp: 'Antonim PANDIR (bodoh) adalah Cerdas atau pintar.' },
    { q: 'APATIS', opts: ['Peduli', 'Pasif', 'Acuh', 'Dingin', 'Tenang'], ans: 0, exp: 'Antonim APATIS (acuh tak acuh, tidak peduli) adalah Peduli.' },
    { q: 'EPILOG', opts: ['Kata penutup', 'Monolog', 'Prolog', 'Dialog', 'Kata pengantar'], ans: 2, exp: 'Antonim EPILOG (kata penutup) adalah PROLOG (kata pendahuluan).' },
    { q: 'ASLI', opts: ['Palsu', 'Murni', 'Kuno', 'Plagiat', 'Tiruan'], ans: 0, exp: 'Antonim ASLI adalah Palsu.' },
    { q: 'NOMADIK', opts: ['Pindah-pindah', 'Menetap', 'Berkelana', 'Tetap', 'Sederhana'], ans: 1, exp: 'Antonim NOMADIK (hidup berpindah-pindah) adalah Menetap.' },
    { q: 'PROGRESIF', opts: ['Maju', 'Modern', 'Regresif', 'Stagnan', 'Lamban'], ans: 2, exp: 'Antonim PROGRESIF (berhaluan maju) adalah REGRESIF (kemunduran/mundur).' },
    { q: 'KHAS', opts: ['Khusus', 'Istimewa', 'Umum', 'Langka', 'Biasa'], ans: 2, exp: 'Antonim KHAS (khusus/spesifik) adalah UMUM.' },
    { q: 'SKEPTIS', opts: ['Ragu-ragu', 'Yakin', 'Optimis', 'Percaya', 'Pasrah'], ans: 1, exp: 'Antonim SKEPTIS (ragu-ragu/kurang percaya) adalah YAKIN.' }
  ],
  analogi: [
    { q: 'GURU : SEKOLAH = ... : ...', opts: ['Dokter : Rumah Sakit', 'Petani : Sawah', 'Polisi : Jalanan', 'Supir : Kendaraan', 'Koki : Restoran'], ans: 0, exp: 'Guru bekerja di Sekolah, Dokter bekerja di Rumah Sakit.' },
    { q: 'HAUS : AIR = ... : ...', opts: ['Lapar : Makan', 'Mengantuk : Tidur', 'Lelah : Istirahat', 'Sakit : Obat', 'Dingin : Selimut'], ans: 0, exp: 'Haus dihilangkan dengan Air, Lapar dihilangkan dengan Makan.' },
    { q: 'MATA : MELIHAT = ... : ...', opts: ['Telinga : Mendengar', 'Hidung : Mencium', 'Mulut : Berbicara', 'Kaki : Berjalan', 'Tangan : Meraba'], ans: 0, exp: 'Mata adalah organ untuk Melihat, Telinga adalah organ untuk Mendengar.' },
    { q: 'PADI : PETANI = ... : ...', opts: ['Roti : Pembuat Roti', 'Puisi : Penyair', 'Patung : Pahat', 'Sayur : Pedagang', 'Kursi : Kayu'], ans: 1, exp: 'Padi dihasilkan oleh Petani, Puisi dihasilkan oleh Penyair.' },
    { q: 'BULAN : BUMI = BUMI : ...', opts: ['Matahari', 'Bintang', 'Galaksi', 'Venus', 'Mars'], ans: 0, exp: 'Bulan mengitari Bumi, dan Bumi mengitari Matahari (satelit mengitari planetnya).' }
  ],
  bacaan: [
    {
      p: 'Indonesia merupakan produsen nikel terbesar di dunia. Pada tahun 2023, produksi nikel olahan Indonesia mencapai 1,8 juta metrik ton, atau sekitar 50% dari total pasokan dunia. Peningkatan ini didorong oleh masifnya investasi fasilitas pengolahan (smelter) nikel semenjak larangan ekspor bijih nikel mentah diberlakukan pada tahun 2020. Meskipun meningkatkan devisa negara secara signifikan, industri pengolahan nikel ini menuai tantangan lingkungan berupa pembuangan limbah tambang dan emisi karbon tinggi dari smelter bertenaga batubara captive.',
      q: 'Apa faktor utama pendorong peningkatan pesat produksi nikel olahan di Indonesia pada tahun 2023?',
      opts: ['Peningkatan drastis harga nikel global', 'Investasi masif smelter pasca larangan ekspor bijih mentah', 'Dukungan penuh dari negara pembeli nikel terbesar', 'Peralihan industri otomotif global ke kendaraan listrik', 'Penemuan ladang tambang nikel baru di Sulawesi'],
      ans: 1,
      exp: 'Paragraf menyebutkan: "Peningkatan ini didorong oleh masifnya investasi fasilitas pengolahan (smelter) nikel semenjak larangan ekspor bijih nikel..."'
    }
  ]
};

// Simple helper to shuffle array (used inside generator to keep output random yet deterministic)
function generateDeret(type: 'tambah' | 'kali' | 'fibonacci', start: number, diff: number, len = 6): { seq: string, ans: string, opts: string[], corrIdx: number } {
  const nums: number[] = [];
  if (type === 'tambah') {
    for (let i = 0; i < len; i++) nums.push(start + i * diff);
  } else if (type === 'kali') {
    for (let i = 0; i < len; i++) nums.push(start * Math.pow(diff, i));
  } else {
    nums.push(start, start + diff);
    for (let i = 2; i < len; i++) nums.push(nums[i - 1] + nums[i - 2]);
  }
  const questionSeq = nums.slice(0, len - 1).join(', ') + ', ...';
  const correctAnswer = nums[len - 1];
  const offset = type === 'kali' ? correctAnswer : diff * 2;
  const options = [
    correctAnswer,
    correctAnswer + offset,
    correctAnswer - offset,
    correctAnswer + offset * 2,
    correctAnswer - offset * 2
  ].map(String);

  // Simple determinism check: we want to keep correct answer at index 0 and swap it during full assembly
  return {
    seq: questionSeq,
    ans: String(correctAnswer),
    opts: options,
    corrIdx: 0
  };
}

export function getTPAQuestions(): Question[] {
  const questions: Question[] = [];

  const categories: TPACategory[] = [
    'verbal-sinonim', 'verbal-antonim', 'verbal-analogi', 'verbal-bacaan',
    'numerik-deret', 'numerik-aritmatika', 'numerik-perbandingan', 'numerik-cerita',
    'logika-penalaran', 'logika-silogisme', 'logika-analitis', 'logika-diagram'
  ];

  const difficulties: Difficulty[] = ['mudah', 'sedang', 'sulit'];

  // Seed standard questions to ensure the offline bank contains exactly 360 questions (30 per category)
  // Let's populate each category systematically!
  categories.forEach((cat) => {
    let questionIdCounter = 1;

    difficulties.forEach((diff) => {
      // Generate exactly 10 questions for this category and difficulty
      for (let i = 0; i < 10; i++) {
        const id = `tpa-${cat}-${diff}-${questionIdCounter++}`;
        let questionText = '';
        let options: string[] = [];
        let correctAnswer = 0;
        let explanation = '';
        let timeLimit = 60;
        let figuralData = undefined;
        let passageText = undefined;

        // Populate based on category rules
        if (cat === 'verbal-sinonim') {
          timeLimit = 30;
          const base = verbalBase.sinonim[i % verbalBase.sinonim.length];
          // Modify words slightly for variance
          if (i >= verbalBase.sinonim.length) {
            questionText = `Sinonim dari kata "${base.q} KONTRAK" adalah ...`;
            options = ['Surat', 'Perjanjian', 'Uang', 'Kerja', 'Hukum'];
            correctAnswer = 1;
            explanation = 'Sinonim KONTRAK adalah Perjanjian tertulis yang resmi.';
          } else {
            questionText = `Sinonim dari kata "${base.q}" adalah ...`;
            options = [...base.opts];
            correctAnswer = base.ans;
            explanation = base.exp;
          }
        }
        else if (cat === 'verbal-antonim') {
          timeLimit = 30;
          const base = verbalBase.antonim[i % verbalBase.antonim.length];
          if (i >= verbalBase.antonim.length) {
            questionText = `Lawan kata (antonim) dari kata "TETAP" adalah ...`;
            options = ['Kuat', 'Fana', 'Berubah', 'Kekal', 'Jelas'];
            correctAnswer = 2;
            explanation = 'Antonim TETAP adalah Berubah (tidak statis).';
          } else {
            questionText = `Lawan kata (antonim) dari kata "${base.q}" adalah ...`;
            options = [...base.opts];
            correctAnswer = base.ans;
            explanation = base.exp;
          }
        }
        else if (cat === 'verbal-analogi') {
          timeLimit = 45;
          const base = verbalBase.analogi[i % verbalBase.analogi.length];
          if (i >= verbalBase.analogi.length) {
            questionText = `PADI : BERAS = KEPOMPONG : ...`;
            options = ['Ulat', 'Kepala', 'Kupu-kupu', 'Kepiting', 'Sutera'];
            correctAnswer = 2;
            explanation = 'Padi diproses menjadi Beras, Kepompong bertransformasi menjadi Kupu-kupu.';
          } else {
            questionText = base.q;
            options = [...base.opts];
            correctAnswer = base.ans;
            explanation = base.exp;
          }
        }
        else if (cat === 'verbal-bacaan') {
          timeLimit = 90;
          const base = verbalBase.bacaan[0];
          passageText = base.p;
          questionText = `${base.q} (Variasi Soal #${i + 1})`;
          options = [...base.opts];
          correctAnswer = base.ans;
          explanation = base.exp;
        }
        else if (cat === 'numerik-deret') {
          timeLimit = 60;
          const dType = i % 3 === 0 ? 'tambah' : i % 3 === 1 ? 'kali' : 'fibonacci';
          const start = 2 + i * 2;
          const step = 3 + (i % 4);
          const d = generateDeret(dType, start, step);
          questionText = `Lanjutkan deret angka berikut: ${d.seq}`;
          options = [...d.opts];
          correctAnswer = d.corrIdx;
          explanation = `Deret angka ini memiliki pola ${dType === 'tambah' ? 'penambahan konstan +' + step : dType === 'kali' ? 'perkalian konstan *' + step : 'penambahan Fibonacci (jumlah 2 suku sebelumnya)'}. Suku berikutnya adalah ${d.ans}.`;
        }
        else if (cat === 'numerik-aritmatika') {
          timeLimit = 60;
          const val1 = 12 + i * 3;
          const val2 = 5 + (i % 3);
          const val3 = 24 / (1 + (i % 3));
          questionText = `Berapakah hasil dari ${val1} + ${val2} x ${val3} - 10?`;
          const result = val1 + val2 * val3 - 10;
          options = [result, result + 5, result - 5, result + 10, result - 10].map(String);
          correctAnswer = 0;
          explanation = `Lakukan perkalian dahulu: ${val2} x ${val3} = ${val2 * val3}. Lalu tambahkan ${val1} dan kurangi 10: ${val1} + ${val2 * val3} - 10 = ${result}.`;
        }
        else if (cat === 'numerik-perbandingan') {
          timeLimit = 45;
          const valX = 15 + i * 2;
          questionText = `Jika x = 2/3 dari ${valX}, dan y = 40% dari ${valX * 2}, manakah hubungan yang benar?`;
          const x = (2/3) * valX;
          const y = 0.4 * (valX * 2);
          options = ['x > y', 'x < y', 'x = y', 'x = 2y', 'Hubungan x dan y tidak dapat ditentukan'];
          correctAnswer = x > y ? 0 : x < y ? 1 : 2;
          explanation = `Dihitung: x = 2/3 * ${valX} = ${x.toFixed(1)}. y = 40% * ${valX * 2} = ${y.toFixed(1)}. Sehingga ${x > y ? 'x > y' : x < y ? 'x < y' : 'x = y'}.`;
        }
        else if (cat === 'numerik-cerita') {
          timeLimit = 90;
          const speed = 60 + i * 5;
          const time = 2 + (i % 2);
          questionText = `Sebuah mobil melaju dengan kecepatan konstan ${speed} km/jam selama ${time} jam. Berapa jarak total yang ditempuh mobil tersebut?`;
          const dist = speed * time;
          options = [dist, dist + 20, dist - 20, dist + 40, dist - 40].map((d) => `${d} km`);
          correctAnswer = 0;
          explanation = `Jarak = Kecepatan x Waktu = ${speed} km/jam x ${time} jam = ${dist} km.`;
        }
        else if (cat === 'logika-penalaran') {
          timeLimit = 60;
          questionText = `Jika hari ini hujan, maka jalanan basah. Hari ini jalanan tidak basah. Kesimpulan yang benar adalah ...`;
          options = ['Hari ini tidak hujan', 'Hari ini hujan', 'Jalanan kering karena panas', 'Kemungkinan hari ini hujan', 'Tidak ada kesimpulan'];
          correctAnswer = 0;
          explanation = 'Menggunakan modus tollens: p -> q, ~q, maka kesimpulannya adalah ~p (Hari ini tidak hujan).';
        }
        else if (cat === 'logika-silogisme') {
          timeLimit = 45;
          questionText = `Semua mamalia menyusui anaknya. Lumba-lumba adalah mamalia. Kesimpulan yang sah adalah ...`;
          options = [
            'Lumba-lumba tidak menyusui anaknya',
            'Semua yang menyusui anaknya adalah lumba-lumba',
            'Lumba-lumba menyusui anaknya',
            'Sebagian mamalia bukan lumba-lumba',
            'Lumba-lumba bertelur dan menyusui'
          ];
          correctAnswer = 2;
          explanation = 'Semua A adalah B. C adalah A. Kesimpulannya, C adalah B (Lumba-lumba menyusui anaknya).';
        }
        else if (cat === 'logika-analitis') {
          timeLimit = 60;
          questionText = `Ali lebih tinggi dari Budi. Budi lebih pendek dari Cici. Cici lebih pendek dari Ali. Siapakah yang paling tinggi?`;
          options = ['Ali', 'Budi', 'Cici', 'Ali dan Cici sama tinggi', 'Tidak dapat ditentukan'];
          correctAnswer = 0;
          explanation = 'Urutan tinggi badan dari data: Ali > Cici > Budi. Maka yang paling tinggi adalah Ali.';
        }
        else if (cat === 'logika-diagram') {
          timeLimit = 60;
          const patternKeys = [
            'series1', 'series2', 'series3', 'series4', 'series5',
            'analogy1', 'analogy2', 'analogy3', 'analogy4', 'analogy5'
          ];
          let patternIndex = i;
          if (diff === 'sedang') {
            patternIndex = (i + 3) % patternKeys.length;
          } else if (diff === 'sulit') {
            patternIndex = (i + 7) % patternKeys.length;
          }
          const patternKey = patternKeys[patternIndex];
          const basePattern = figuralPatterns[patternKey as keyof typeof figuralPatterns];
          
          figuralData = {
            type: (patternKey.startsWith('series') ? 'pattern-series' : 'analogy') as 'pattern-series' | 'analogy',
            figures: [basePattern.q1, basePattern.q2, basePattern.q3],
            options: [...basePattern.opts]
          };
          
          questionText = `Perhatikan deret pola/diagram di bawah ini. Pilih gambar selanjutnya yang logis untuk melengkapi deret gambar tersebut.`;
          options = ['A', 'B', 'C', 'D', 'E']; // Will be replaced by inline SVG buttons in the UI
          correctAnswer = (patternKey === 'series1' || patternKey === 'series4' || patternKey === 'series5') ? 0 : 1;
          
          let explanationText = '';
          if (patternKey === 'series1') {
            explanationText = 'Garis berputar 90 derajat searah jarum jam (CW), sedangkan titik kuning bertambah 1 di setiap suku. Suku berikutnya harus menunjuk ke kiri (270 deg) dan memiliki 4 titik.';
          } else if (patternKey === 'series2') {
            explanationText = 'Sisi bangun datar di dalam persegi bertambah 1 di setiap suku (Segitiga -> Segiempat -> Segilima -> Segienam). Suku berikutnya adalah segienam.';
          } else if (patternKey === 'series3') {
            explanationText = 'Segitiga berputar 90 derajat searah jarum jam (CW) di setiap suku. Suku berikutnya harus menunjuk ke kiri (270 deg).';
          } else if (patternKey === 'series4') {
            explanationText = 'Jumlah kotak kecil yang diarsir bertambah 1 di setiap langkah searah jarum jam (1 -> 2 -> 3 -> 4). Suku berikutnya harus memiliki semua 4 kotak diarsir.';
          } else if (patternKey === 'series5') {
            explanationText = 'Jumlah lingkaran konsentris bertambah 1 di setiap langkah (1 -> 2 -> 3 -> 4). Suku berikutnya harus memiliki 4 lingkaran konsentris.';
          } else if (patternKey === 'analogy1') {
            explanationText = 'Hubungan gambar pertama dan kedua adalah bentuk luar dan dalam saling bertukar posisi. Maka, lingkaran di luar dan segitiga di dalam berubah menjadi segitiga di luar dan lingkaran di dalam.';
          } else if (patternKey === 'analogy2') {
            explanationText = 'Bentuk pertama diisi penuh (solid) dan bentuk kedua kosong (outline). Dengan hubungan yang sama, persegi padat berubah menjadi persegi kosong.';
          } else if (patternKey === 'analogy3') {
            explanationText = 'Gambar kedua merupakan hasil pencerminan secara vertikal (dibalik ke bawah) dari gambar pertama. Maka setengah lingkaran menghadap ke atas dibalik menjadi menghadap ke bawah.';
          } else if (patternKey === 'analogy4') {
            explanationText = 'Jumlah sisi bangun datar bertambah 1 (Segitiga [3] -> Persegi [4]). Dengan pola yang sama, Segilima [5] berubah menjadi Segienam [6].';
          } else if (patternKey === 'analogy5') {
            explanationText = 'Gambar kedua membagi bentuk gambar pertama menjadi dua kali lipat lebih banyak bagian (2 bagian menjadi 4 bagian). Maka lingkaran dengan 2 bagian terbagi menjadi 4 bagian.';
          }
          explanation = explanationText;
        }

        // Mix option index to avoid standard index 0 bias for generated options
        if (correctAnswer === 0 && options.length > 1 && cat !== 'logika-diagram') {
          const originalOptions = [...options];
          const newCorrect = (i + 2) % options.length;
          
          // Swap
          const temp = options[0];
          options[0] = options[newCorrect];
          options[newCorrect] = temp;
          correctAnswer = newCorrect;
          
          // Update explanation text to mention the correct option key
          explanation = `Jawaban yang benar adalah pilihan **${String.fromCharCode(65 + newCorrect)}**. ` + explanation;
        }

        questions.push({
          id,
          testType: 'TPA',
          category: cat,
          difficulty: diff,
          question: questionText,
          options,
          correctAnswer,
          explanation,
          timeLimit,
          figural: figuralData,
          passage: passageText
        });
      }
    });
  });

  return [...questions, ...additionalTPAQuestions];
}

// ─── 50 NEW TPA QUESTIONS (UNAIR DRILLING REWRITTEN) ───
const additionalTPAQuestions: Question[] = [
  // 1. Sinonim (mudah)
  {
    id: 'tpa-verbal-sinonim-mudah-add1',
    testType: 'TPA',
    category: 'verbal-sinonim',
    difficulty: 'mudah',
    question: 'Sinonim dari kata "TAKSA" adalah ...',
    options: ['Kabur / Mendua', 'Jelas', 'Terang', 'Pasti', 'Mutlak'],
    correctAnswer: 0,
    explanation: 'Sinonim dari kata "TAKSA" adalah kabur, meragukan, atau mempunyai dua arti (ambigu).',
    timeLimit: 30
  },
  // 2. Antonim (mudah)
  {
    id: 'tpa-verbal-antonim-mudah-add1',
    testType: 'TPA',
    category: 'verbal-antonim',
    difficulty: 'mudah',
    question: 'Lawan kata (antonim) dari kata "LIAR" (dalam konteks izin/hukum) adalah ...',
    options: ['Absah', 'Sengaja', 'Bebas', 'Ganas', 'Teratur'],
    correctAnswer: 0,
    explanation: 'Dalam konteks hukum, "liar" berarti tidak memiliki izin resmi atau tidak sah. Lawan katanya adalah "absah" yang berarti sah atau berizin resmi.',
    timeLimit: 30
  },
  // 3. Analogi (mudah)
  {
    id: 'tpa-verbal-analogi-mudah-add1',
    testType: 'TPA',
    category: 'verbal-analogi',
    difficulty: 'mudah',
    question: 'CANGKIR : KERAMIK = BAN : ...',
    options: ['Karet', 'Roda', 'Kendaraan', 'Jalan', 'Hitam'],
    correctAnswer: 0,
    explanation: 'Cangkir terbuat dari Keramik, sebagaimana Ban terbuat dari Karet.',
    timeLimit: 45
  },
  // 4. Analogi (mudah)
  {
    id: 'tpa-verbal-analogi-mudah-add2',
    testType: 'TPA',
    category: 'verbal-analogi',
    difficulty: 'mudah',
    question: 'EMAS : TAMBANG = PADI : ...',
    options: ['Sawah', 'Petani', 'Beras', 'Tanah', 'Pupuk'],
    correctAnswer: 0,
    explanation: 'Emas ditemukan/dihasilkan di Tambang, sebagaimana Padi ditemukan/dihasilkan di Sawah.',
    timeLimit: 45
  },
  // 5. Analogi (mudah)
  {
    id: 'tpa-verbal-analogi-mudah-add3',
    testType: 'TPA',
    category: 'verbal-analogi',
    difficulty: 'mudah',
    question: 'LAMPU : TERANG = MAKANAN : ...',
    options: ['Kenyang', 'Dapur', 'Piring', 'Koki', 'Lapar'],
    correctAnswer: 0,
    explanation: 'Lampu berfungsi membuat keadaan menjadi Terang, sedangkan Makanan berfungsi membuat tubuh menjadi Kenyang.',
    timeLimit: 45
  },
  // 6. Analogi (mudah)
  {
    id: 'tpa-verbal-analogi-mudah-add4',
    testType: 'TPA',
    category: 'verbal-analogi',
    difficulty: 'mudah',
    question: 'PUPUK : GERSANG = ILMU : ...',
    options: ['Bodoh', 'Pintar', 'Guru', 'Sekolah', 'Buku'],
    correctAnswer: 0,
    explanation: 'Pupuk digunakan untuk mengatasi lahan yang Gersang, sedangkan Ilmu digunakan untuk mengatasi pikiran yang Bodoh.',
    timeLimit: 45
  },
  // 7. Analogi (mudah)
  {
    id: 'tpa-verbal-analogi-mudah-add5',
    testType: 'TPA',
    category: 'verbal-analogi',
    difficulty: 'mudah',
    question: 'NELAYAN : LAUT = DOSEN : ...',
    options: ['Kampus', 'Mahasiswa', 'Mengajar', 'Buku', 'Rektor'],
    correctAnswer: 0,
    explanation: 'Nelayan bekerja di Laut, sedangkan Dosen bekerja di Kampus.',
    timeLimit: 45
  },
  // 8. Bacaan (sedang)
  {
    id: 'tpa-verbal-bacaan-sedang-add1',
    testType: 'TPA',
    category: 'verbal-bacaan',
    difficulty: 'sedang',
    passage: 'Kuliner Nusantara hampir selalu identik dengan cita rasa pedas yang berasal dari sambal. Penggunaan cabai dalam masakan Nusantara sebenarnya memiliki sejarah panjang yang dipengaruhi oleh perdagangan global. Cabai sendiri (capsicum) bukan tanaman asli Nusantara, melainkan dibawa oleh pelaut Portugis dan Spanyol pada abad ke-16 dari benua Amerika. Sebelum kedatangan cabai, masyarakat tradisional Nusantara menggunakan jahe, merica, dan cabai jawa untuk menciptakan rasa hangat dan pedas pada masakan. Setelah cabai diperkenalkan, budidayanya menyebar sangat cepat karena kecocokan iklim tropis. Kini, sambal telah terintegrasi secara mendalam dan menjadi elemen pelengkap wajib dalam menu harian masyarakat Indonesia. Konsumsi cabai nasional yang sangat tinggi sering kali memicu fluktuasi inflasi ketika pasokan terganggu oleh cuaca ekstrem, menunjukkan betapa ketergantungan kuliner lokal terhadap komoditas pedas ini tidak dapat dipisahkan dari kehidupan sehari-hari.',
    question: 'Apa tema utama dari wacana mengenai sambal di atas?',
    options: [
      'Ketergantungan kuliner harian masyarakat Indonesia terhadap sambal dan cabai yang tidak dapat dipisahkan.',
      'Cabai merupakan tanaman asli dari benua Amerika yang dibawa pelaut Portugis.',
      'Masyarakat tradisional Nusantara menggunakan jahe dan merica sebagai pengganti rasa pedas cabai.',
      'Fluktuasi inflasi ekonomi nasional yang disebabkan oleh pasokan cabai yang tidak stabil.',
      'Penyebaran budidaya tanaman cabai yang cepat di wilayah beriklim tropis.'
    ],
    correctAnswer: 0,
    explanation: 'Wacana tersebut membahas secara mendalam bagaimana sambal telah terintegrasi dalam kehidupan sehari-hari masyarakat Indonesia, mulai dari sejarah masuknya hingga dampaknya terhadap keseharian dan ekonomi (tema ketergantungan harian terhadap sambal/cabai).',
    timeLimit: 90
  },
  // 9. Bacaan (sedang)
  {
    id: 'tpa-verbal-bacaan-sedang-add2',
    testType: 'TPA',
    category: 'verbal-bacaan',
    difficulty: 'sedang',
    passage: 'Peneliti lembaga kajian ekonomi menilai bahwa Indonesia, meskipun memiliki wilayah dataran tinggi subur yang sangat luas, masih bergantung pada impor susu sapi dan produk olahan susu (dairy) lainnya hingga mencapai 80 persen dari kebutuhan nasional. Ketergantungan impor ini dinilai ironis bagi negara tropis beriklim subur yang memiliki potensi besar dalam pengembangan peternakan sapi perah lokal. Pemerintah berdalih bahwa impor dilakukan karena kapasitas produksi peternak rakyat masih sangat rendah dan teknologi pengolahan susu lokal belum memenuhi standar industri global. Namun, pengamat melihat masalah mendasar terletak pada tata kelola sektor peternakan yang belum terintegrasi, rendahnya bantuan modal peternak kecil, serta lahan gembala hijau yang belum dimanfaatkan secara maksimal. Di sisi lain, peningkatan konsumsi susu di perkotaan didorong oleh tren gaya hidup sehat serta variasi produk minuman kekinian berbasis susu. Padahal, jika fokusnya adalah pemenuhan gizi, Indonesia memiliki sumber protein hewani alternatif yang melimpah dan murah seperti telur ayam lokal serta ikan air tawar yang nilai gizinya tidak kalah bersaing dengan susu impor.',
    question: 'Apa pesan utama yang ingin disampaikan oleh wacana mengenai impor susu sapi di atas?',
    options: [
      'Potensi lahan dan tata kelola sektor peternakan lokal belum dimanfaatkan secara maksimal untuk menekan ketergantungan impor.',
      'Indonesia mengimpor produk olahan susu hingga mencapai 80 persen dari kebutuhan nasional.',
      'Peningkatan gaya hidup sehat di perkotaan memicu tingginya konsumsi susu.',
      'Susu impor memiliki kualitas dan standar industri yang lebih baik dibandingkan susu lokal.',
      'Telur ayam lokal dan ikan tawar memiliki kandungan gizi protein hewani alternatif yang murah.'
    ],
    correctAnswer: 0,
    explanation: 'Wacana menyoroti bahwa ketergantungan impor susu sapi terjadi akibat tata kelola sektor peternakan, permodalan, dan pemanfaatan lahan gembala lokal yang belum dimanfaatkan secara maksimal oleh Indonesia.',
    timeLimit: 90
  },
  // 10. Bacaan (sedang)
  {
    id: 'tpa-verbal-bacaan-sedang-add3',
    testType: 'TPA',
    category: 'verbal-bacaan',
    difficulty: 'sedang',
    passage: 'Bencana banjir bandang yang melanda wilayah pesisir Jawa Timur pada akhir bulan lalu telah menyebabkan kerusakan parah pada infrastruktur pemukiman warga. Ratusan rumah dilaporkan roboh dan mengalami kerusakan struktur yang membahayakan, memaksa ribuan jiwa mengungsi ke posko darurat. Juru bicara Badan Penanggulangan Bencana Daerah (BPBD) menyatakan bahwa logistik makanan telah tercukupi, namun kebutuhan material hunian sementara (huntara) masih mendesak karena kapasitas posko utama mulai melebihi batas. Rencananya, pemerintah provinsi akan mengucurkan dana stimulan rekonstruksi pemukiman mulai pekan depan. Bantuan tersebut akan dibagi ke dalam tiga kategori stimulan tunai: kategori rusak berat sebesar Rp40 juta, kategori rusak sedang sebesar Rp20 juta, dan kategori rusak ringan sebesar Rp8 juta. Gubernur menekankan bahwa pengelolaan dana stimulan tersebut sepenuhnya diserahkan kepada warga penerima bantuan secara swadaya agar proses pembangunan fisik rumah tahan banjir dapat selesai dalam target waktu lima bulan.',
    question: 'Berdasarkan wacana tentang rekonstruksi pascabanjir di atas, pernyataan manakah yang paling sesuai?',
    options: [
      'Bantuan stimulan rekonstruksi dari pemerintah provinsi dibagi ke dalam tiga kategori kerusakan fisik.',
      'Pengelolaan dana stimulan pembangunan rumah sepenuhnya dikerjakan dan menjadi tanggung jawab dinas BPBD.',
      'Bencana banjir bandang pesisir tidak berdampak signifikan terhadap kerusakan pemukiman warga setempat.',
      'Target penyelesaian seluruh pembangunan fisik rumah tahan banjir adalah satu tahun.',
      'Bantuan hunian sementara huntara telah melimpah ruah di posko utama pengungsian.'
    ],
    correctAnswer: 0,
    explanation: 'Pilihan A sesuai dengan wacana karena teks menyebutkan secara eksplisit bahwa bantuan dibagi menjadi tiga kategori stimulan tunai berdasarkan tingkat kerusakan rumah (rusak berat, rusak sedang, dan rusak ringan).',
    timeLimit: 90
  },
  // 11. Silogisme (mudah)
  {
    id: 'tpa-logika-silogisme-mudah-add1',
    testType: 'TPA',
    category: 'logika-silogisme',
    difficulty: 'mudah',
    question: 'Tidak ada buah impor dari toko S yang rasanya asam. Semua buah jeruk di keranjang A rasanya asam. Kesimpulan yang benar adalah ...',
    options: [
      'Tidak ada buah jeruk di keranjang A yang merupakan buah impor dari toko S.',
      'Semua buah jeruk di keranjang A adalah buah impor dari toko S.',
      'Sebagian buah jeruk di keranjang A adalah buah impor dari toko S.',
      'Sebagian buah impor dari toko S rasanya asam.',
      'Semua buah impor dari toko S adalah buah jeruk di keranjang A.'
    ],
    correctAnswer: 0,
    explanation: 'Menggunakan silogisme kategoris negatif: Tidak ada S yang P. Semua M adalah P. Kesimpulannya: Tidak ada M yang S (Tidak ada buah jeruk di keranjang A yang merupakan buah impor dari toko S).',
    timeLimit: 45
  },
  // 12. Silogisme (mudah)
  {
    id: 'tpa-logika-silogisme-mudah-add2',
    testType: 'TPA',
    category: 'logika-silogisme',
    difficulty: 'mudah',
    question: 'Semua karyawan divisi pemasaran memiliki laptop dinas. Beberapa mahasiswa magang di perusahaan ini tidak memiliki laptop dinas. Kesimpulan yang benar adalah ...',
    options: [
      'Beberapa mahasiswa magang di perusahaan ini bukan karyawan divisi pemasaran.',
      'Semua mahasiswa magang memiliki laptop dinas.',
      'Sebagian karyawan divisi pemasaran adalah mahasiswa magang.',
      'Semua karyawan divisi pemasaran adalah mahasiswa magang.',
      'Tidak ada mahasiswa magang yang memiliki laptop dinas.'
    ],
    correctAnswer: 0,
    explanation: 'Semua A adalah B. Beberapa C bukan B. Maka, beberapa C bukan A (Beberapa mahasiswa magang di perusahaan ini bukan karyawan divisi pemasaran).',
    timeLimit: 45
  },
  // 13. Silogisme (mudah)
  {
    id: 'tpa-logika-silogisme-mudah-add3',
    testType: 'TPA',
    category: 'logika-silogisme',
    difficulty: 'mudah',
    question: 'Semua atlet maraton memiliki kapasitas paru-paru yang sangat besar. Sebagian anggota klub sepeda Lipat adalah atlet maraton. Kesimpulan yang benar adalah ...',
    options: [
      'Sebagian anggota klub sepeda Lipat memiliki kapasitas paru-paru yang sangat besar.',
      'Semua anggota klub sepeda Lipat memiliki kapasitas paru-paru yang sangat besar.',
      'Sebagian atlet maraton tidak memiliki kapasitas paru-paru yang besar.',
      'Tidak ada anggota klub sepeda Lipat yang merupakan atlet maraton.',
      'Sebagian anggota klub sepeda Lipat bukan atlet maraton.'
    ],
    correctAnswer: 0,
    explanation: 'Semua A adalah B. Sebagian C adalah A. Kesimpulan: Sebagian C adalah B (Sebagian anggota klub sepeda Lipat memiliki kapasitas paru-paru yang sangat besar).',
    timeLimit: 45
  },
  // 14. Silogisme (mudah)
  {
    id: 'tpa-logika-silogisme-mudah-add4',
    testType: 'TPA',
    category: 'logika-silogisme',
    difficulty: 'mudah',
    question: 'Semua lukisan di galeri nasional dibuat menggunakan cat minyak asli. Sebagian karya seni yang dipajang di pameran kota adalah lukisan di galeri nasional. Kesimpulan yang benar adalah ...',
    options: [
      'Sebagian karya seni yang dipajang di pameran kota dibuat menggunakan cat minyak asli.',
      'Semua karya seni yang dipajang di pameran kota dibuat menggunakan cat minyak asli.',
      'Sebagian lukisan di galeri nasional dibuat tanpa cat minyak asli.',
      'Semua karya seni yang dibuat menggunakan cat minyak asli adalah lukisan di galeri nasional.',
      'Sebagian karya seni di pameran kota bukan lukisan di galeri nasional.'
    ],
    correctAnswer: 0,
    explanation: 'Semua A adalah B. Sebagian C adalah A. Kesimpulan: Sebagian C adalah B (Sebagian karya seni yang dipajang di pameran kota dibuat menggunakan cat minyak asli).',
    timeLimit: 45
  },
  // 15. Silogisme (mudah)
  {
    id: 'tpa-logika-silogisme-mudah-add5',
    testType: 'TPA',
    category: 'logika-silogisme',
    difficulty: 'mudah',
    question: 'Sebagian tanaman obat liar merupakan spesies langka yang dilindungi. Semua tanaman obat liar memiliki kandungan senyawa alkaloid aktif. Kesimpulan yang benar adalah ...',
    options: [
      'Sebagian tanaman yang memiliki kandungan senyawa alkaloid aktif merupakan spesies langka yang dilindungi.',
      'Semua spesies langka yang dilindungi adalah tanaman obat liar.',
      'Tidak ada spesies langka yang dilindungi yang memiliki kandungan senyawa alkaloid aktif.',
      'Semua tanaman obat liar bukan merupakan spesies langka yang dilindungi.',
      'Sebagian spesies langka yang dilindungi tidak memiliki kandungan alkaloid aktif.'
    ],
    correctAnswer: 0,
    explanation: 'Sebagian A adalah B. Semua A adalah C. Kesimpulan: Sebagian C adalah B (Sebagian tanaman yang memiliki kandungan senyawa alkaloid aktif merupakan spesies langka yang dilindungi).',
    timeLimit: 45
  },
  // 16. Silogisme (mudah)
  {
    id: 'tpa-logika-silogisme-mudah-add6',
    testType: 'TPA',
    category: 'logika-silogisme',
    difficulty: 'mudah',
    question: 'Sebagian produk elektronik lokal memiliki garansi pabrik tiga tahun. Semua barang rumah tangga bermerek X adalah produk elektronik lokal. Kesimpulan yang benar adalah ...',
    options: [
      'Sebagian barang rumah tangga bermerek X memiliki garansi pabrik tiga tahun.',
      'Semua barang rumah tangga bermerek X tidak memiliki garansi pabrik tiga tahun.',
      'Sebagian produk elektronik lokal bukan barang rumah tangga bermerek X.',
      'Semua barang yang memiliki garansi pabrik tiga tahun adalah produk elektronik lokal.',
      'Sebagian barang rumah tangga bermerek X bukan produk elektronik lokal.'
    ],
    correctAnswer: 0,
    explanation: 'Sebagian A adalah B. Semua C adalah A. Kesimpulan: Sebagian C adalah B (Sebagian barang rumah tangga bermerek X memiliki garansi pabrik tiga tahun).',
    timeLimit: 45
  },
  // 17. Silogisme (mudah)
  {
    id: 'tpa-logika-silogisme-mudah-add7',
    testType: 'TPA',
    category: 'logika-silogisme',
    difficulty: 'mudah',
    question: 'Semua astronom profesional memahami teori relativitas umum. Semua astronom profesional adalah anggota asosiasi sains nasional. Kesimpulan yang benar adalah ...',
    options: [
      'Sebagian yang memahami teori relativitas umum adalah anggota asosiasi sains nasional.',
      'Semua yang memahami teori relativitas umum adalah anggota asosiasi sains nasional.',
      'Sebagian astronom profesional bukan anggota asosiasi sains nasional.',
      'Semua anggota asosiasi sains nasional tidak memahami teori relativitas umum.',
      'Tidak ada astronom profesional yang memahami teori relativitas umum.'
    ],
    correctAnswer: 0,
    explanation: 'Semua A adalah B. Semua A adalah C. Kesimpulan: Sebagian B adalah C (Sebagian yang memahami teori relativitas umum adalah anggota asosiasi sains nasional).',
    timeLimit: 45
  },
  // 18. Silogisme (mudah)
  {
    id: 'tpa-logika-silogisme-mudah-add8',
    testType: 'TPA',
    category: 'logika-silogisme',
    difficulty: 'mudah',
    question: 'Beberapa pengusaha UMKM menggunakan metode pemasaran digital. Semua pengusaha UMKM wajib mendaftarkan nomor induk berusaha (NIB). Kesimpulan yang benar adalah ...',
    options: [
      'Beberapa pengusaha yang wajib mendaftarkan NIB menggunakan metode pemasaran digital.',
      'Semua pengusaha yang wajib mendaftarkan NIB menggunakan metode pemasaran digital.',
      'Beberapa yang menggunakan metode pemasaran digital tidak wajib mendaftarkan NIB.',
      'Semua pengusaha UMKM menggunakan metode pemasaran digital.',
      'Tidak ada pengusaha UMKM yang mendaftarkan NIB.'
    ],
    correctAnswer: 0,
    explanation: 'Beberapa A adalah B. Semua A adalah C. Kesimpulan: Beberapa C adalah B (Beberapa pengusaha yang wajib mendaftarkan NIB menggunakan metode pemasaran digital).',
    timeLimit: 45
  },
  // 19. Silogisme (mudah)
  {
    id: 'tpa-logika-silogisme-mudah-add9',
    testType: 'TPA',
    category: 'logika-silogisme',
    difficulty: 'mudah',
    question: 'Tidak ada mahasiswa fakultas kedokteran yang mengambil mata kuliah makroekonomi. Semua peserta seminar kardiologi di aula utama adalah mahasiswa fakultas kedokteran. Kesimpulan yang benar adalah ...',
    options: [
      'Tidak ada peserta seminar kardiologi di aula utama yang mengambil mata kuliah makroekonomi.',
      'Semua peserta seminar kardiologi di aula utama mengambil mata kuliah makroekonomi.',
      'Sebagian peserta seminar kardiologi mengambil mata kuliah makroekonomi.',
      'Beberapa mahasiswa fakultas kedokteran mengambil mata kuliah makroekonomi.',
      'Semua mahasiswa kedokteran mengikuti seminar kardiologi di aula utama.'
    ],
    correctAnswer: 0,
    explanation: 'Tidak ada A yang B. Semua C adalah A. Kesimpulan: Tidak ada C yang B (Tidak ada peserta seminar kardiologi di aula utama yang mengambil mata kuliah makroekonomi).',
    timeLimit: 45
  },
  // 20. Penalaran (mudah)
  {
    id: 'tpa-logika-penalaran-mudah-add1',
    testType: 'TPA',
    category: 'logika-penalaran',
    difficulty: 'mudah',
    question: 'Jika hari hujan, Wawan mengendarai mobil ke kantor. Jika hari cerah, Wawan mengendarai sepeda motor ke taman. Ternyata Wawan tidak mengendarai mobil ke kantor atau sepeda motor ke taman. Kesimpulan yang benar adalah ...',
    options: [
      'Jika Wawan tidak mengendarai mobil ke kantor atau sepeda motor ke taman, maka hari tidak hujan dan tidak cerah.',
      'Jika Wawan mengendarai mobil ke kantor atau sepeda motor ke taman, maka hari hujan dan cerah.',
      'Jika Wawan tidak hujan dan tidak cerah, maka Wawan tidak mengendarai mobil ke kantor atau sepeda motor ke taman.',
      'Jika Wawan pergi ke kantor dan pergi ke taman, maka hari hujan dan cerah.',
      'Jika Wawan mengendarai mobil ke kantor, maka hari pasti tidak cerah.'
    ],
    correctAnswer: 0,
    explanation: 'Menggunakan hukum kontrapositif gabungan (destruktif): p -> q, r -> s, maka (~q dan ~s) -> (~p dan ~r). (Jika Wawan tidak mengendarai mobil ke kantor atau sepeda motor ke taman, maka hari tidak hujan dan tidak cerah).',
    timeLimit: 60
  },
  // 21. Penalaran (mudah)
  {
    id: 'tpa-logika-penalaran-mudah-add2',
    testType: 'TPA',
    category: 'logika-penalaran',
    difficulty: 'mudah',
    question: 'Jika guru tidak datang, maka siswa kelas X akan belajar mandiri di perpustakaan. Jika ketua kelas pergi ke ruang guru, maka wakil ketua kelas akan menjaga ketertiban kelas. Ternyata siswa kelas X tidak belajar mandiri di perpustakaan atau ketua kelas pergi ke ruang guru. Kesimpulan yang benar adalah ...',
    options: [
      'Guru datang atau wakil ketua kelas menjaga ketertiban kelas.',
      'Siswa kelas X belajar mandiri di perpustakaan dan wakil ketua kelas menjaga ketertiban kelas.',
      'Guru datang maka wakil ketua kelas menjaga ketertiban kelas.',
      'Guru datang dan wakil ketua kelas menjaga ketertiban kelas.',
      'Guru tidak datang karena wakil ketua kelas menjaga ketertiban kelas.'
    ],
    correctAnswer: 0,
    explanation: 'Menggunakan dilema konstruktif/destruktif: p -> q dan r -> s. Diketahui ~q atau r. Maka kesimpulannya adalah ~p atau s (Guru datang atau wakil ketua kelas menjaga ketertiban kelas).',
    timeLimit: 60
  },
  // 22. Penalaran (mudah)
  {
    id: 'tpa-logika-penalaran-mudah-add3',
    testType: 'TPA',
    category: 'logika-penalaran',
    difficulty: 'mudah',
    question: 'Jika cuaca sejuk maka bunga mawar akan mekar indah. Jika pemupukan teratur maka tanah kebun akan subur gembur. Ternyata bunga mawar tidak mekar indah atau tanah kebun tidak subur gembur atau keduanya. Kesimpulan yang benar adalah ...',
    options: [
      'Cuaca tidak sejuk atau pemupukan tidak teratur.',
      'Cuaca sejuk atau pemupukan tidak teratur.',
      'Cuaca tidak sejuk dan pemupukan tidak teratur.',
      'Cuaca sejuk dan pemupukan teratur.',
      'Bunga mawar tidak mekar ketika tanah tidak subur.'
    ],
    correctAnswer: 0,
    explanation: 'Menggunakan modus tollens gabungan (dilema destruktif): p -> q dan r -> s. Diketahui ~q atau ~s. Maka kesimpulannya adalah ~p atau ~r (Cuaca tidak sejuk atau pemupukan tidak teratur).',
    timeLimit: 60
  },
  // 23. Penalaran (mudah)
  {
    id: 'tpa-logika-penalaran-mudah-add4',
    testType: 'TPA',
    category: 'logika-penalaran',
    difficulty: 'mudah',
    question: 'Jika perusahaan menaikkan gaji karyawan, produktivitas kerja akan meningkat. Tetapi jika perusahaan membagikan bonus tahunan, seluruh staf akan berlibur ke luar negeri. Hubungan kesimpulan yang logis adalah ...',
    options: [
      'Jika perusahaan menaikkan gaji karyawan dan membagikan bonus tahunan, maka produktivitas kerja akan meningkat dan seluruh staf akan berlibur ke luar negeri.',
      'Jika produktivitas kerja meningkat atau staf tidak berlibur ke luar negeri, maka gaji naik.',
      'Jika produktivitas kerja tidak meningkat atau staf berlibur ke luar negeri, maka gaji naik.',
      'Jika produktivitas kerja meningkat dan staf tidak berlibur, maka bonus dibagikan.',
      'Jika gaji naik atau bonus dibagikan, maka produktivitas meningkat dan staf berlibur.'
    ],
    correctAnswer: 0,
    explanation: 'Berdasarkan prinsip silogisme kondisional gabungan: jika p -> q dan r -> s, maka jika keduanya terpenuhi (p dan r), hasilnya juga akan terpenuhi bersamaan (q dan s).',
    timeLimit: 60
  },
  // 24. Analitis (sedang)
  {
    id: 'tpa-logika-analitis-sedang-add1',
    testType: 'TPA',
    category: 'logika-analitis',
    difficulty: 'sedang',
    question: 'Lima orang pemanjat tebing bernama Anton, Budi, Choki, Dodi, dan Eko mengikuti kompetisi panjat tebing. Hasilnya adalah, Budi mencapai titik lebih tinggi dari Anton. Dodi berada di bawah Eko. Choki berada di atas Eko. Anton lebih tinggi dari Choki. Pemanjat tebing yang mencapai titik paling tinggi adalah ...',
    options: ['Budi', 'Anton', 'Choki', 'Dodi', 'Eko'],
    correctAnswer: 0,
    explanation: 'Urutan lengkap dari tertinggi ke terendah adalah Budi > Anton > Choki > Eko > Dodi. Jadi pemanjat yang mencapai titik tertinggi adalah Budi.',
    timeLimit: 60
  },
  // 25. Analitis (sedang)
  {
    id: 'tpa-logika-analitis-sedang-add2',
    testType: 'TPA',
    category: 'logika-analitis',
    difficulty: 'sedang',
    question: 'Sebuah klub riset memiliki tujuh divisi: Fisika, Kimia, Biologi, Geologi, Astronomi, Matematika, dan Komputer. Klub harus mengirimkan lima perwakilan divisi untuk menghadiri seminar dengan ketentuan: Komputer ikut maka Matematika ikut; Matematika dan Biologi ikut maka Fisika ikut; Biologi dan Fisika ikut maka Astronomi tidak ikut; Fisika ikut maka Geologi atau Kimia ikut salah satu saja; Geologi atau Astronomi harus ikut salah satu saja. Jika divisi Fisika dan divisi Kimia ikut, maka divisi lain yang ikut mendampingi adalah ...',
    options: [
      'Divisi Komputer, Matematika, dan Astronomi',
      'Divisi Komputer, Matematika, dan Biologi',
      'Divisi Biologi, Geologi, dan Astronomi',
      'Divisi Biologi, Matematika, dan Astronomi',
      'Divisi Komputer, Matematika, dan Geologi'
    ],
    correctAnswer: 0,
    explanation: 'Fisika dan Kimia ikut, sehingga Geologi tidak ikut (salah satu). Karena Geologi tidak ikut, Astronomi wajib ikut. Karena Astronomi ikut, Biologi tidak ikut. Kuota tersisa diisi oleh divisi Komputer dan Matematika. Maka perwakilannya adalah Komputer, Matematika, dan Astronomi.',
    timeLimit: 60
  },
  // 26. Analitis (sedang)
  {
    id: 'tpa-logika-analitis-sedang-add3',
    testType: 'TPA',
    category: 'logika-analitis',
    difficulty: 'sedang',
    question: 'Seorang atlet bulu tangkis bernama Rian harus melakukan program pemulihan pasca-cedera: beban tangan 2 kali seminggu tidak boleh berturut-turut; berenang 1 kali seminggu tidak boleh bersamaan dengan skipping; tiap hari harus melakukan 4 jenis latihan termasuk wajib sepeda statis dan yoga; skipping hanya boleh sekali dalam 2 minggu. Jika hari Senin Rian sudah latihan beban tangan tetapi belum berenang, dan sejak minggu lalu belum skipping sama sekali, maka latihan yang bisa dilakukan Rian pada hari Selasa besok adalah ...',
    options: [
      'Sepeda statis, yoga peregangan, latihan otot punggung, dan berenang.',
      'Sepeda statis, yoga peregangan, beban tangan, dan latihan skipping.',
      'Berenang, yoga peregangan, latihan otot punggung, dan latihan bahu.',
      'Sepeda statis, yoga peregangan, latihan skipping, dan berenang.',
      'Latihan bahu, otot punggung, sepeda statis, dan latihan skipping.'
    ],
    correctAnswer: 0,
    explanation: 'Hari Selasa tidak boleh beban tangan (tidak boleh berturut-turut). Wajib melakukan sepeda statis dan yoga. Sisa dua slot latihan diisi oleh latihan otot punggung dan berenang (karena tidak boleh skipping di hari yang sama dengan berenang).',
    timeLimit: 60
  },
  // 27. Analitis (sedang)
  {
    id: 'tpa-logika-analitis-sedang-add4',
    testType: 'TPA',
    category: 'logika-analitis',
    difficulty: 'sedang',
    question: 'Delapan murid duduk melingkar: Kiky, Leo, Mira, Nina, Owen, Putra, Rian, dan Soni. Rian duduk di antara Putra dan Soni. Owen duduk tepat berhadapan dengan Rian. Owen berada di antara Nina dan Leo. Mira duduk di antara Soni dan Nina. Kiky duduk tepat berhadapan dengan Mira. Dengan demikian, Kiky duduk di antara ...',
    options: ['Leo dan Putra', 'Soni dan Putra', 'Leo dan Nina', 'Owen dan Leo', 'Putra dan Soni'],
    correctAnswer: 0,
    explanation: 'Gambarkan posisi melingkar: 1: Rian, 2: Soni, 3: Mira, 4: Nina, 5: Owen, 6: Leo, 7: Kiky, 8: Putra. Kiky yang berhadapan dengan Mira berada di antara Leo dan Putra.',
    timeLimit: 60
  },
  // 28. Analitis (sedang)
  {
    id: 'tpa-logika-analitis-sedang-add5',
    testType: 'TPA',
    category: 'logika-analitis',
    difficulty: 'sedang',
    question: 'Siska harus menghadiri wisuda kakaknya di Kota C pada 5 Oktober. Siska ingin memesan tiket bus untuk keberangkatan 4 Oktober: pesan sebelum 27 Sept diskon 15% dari Rp 400.000 (tiba 5 Okt jam 09:00, terlambat); pesan tanggal 27-29 Sept harga normal Rp 400.000 (tiba 5 Okt jam 04:00, tepat waktu); pesan tanggal 30 Sept naik 25% menjadi Rp 500.000 (tiba 4 Okt jam 21:00, harga melebihi budget). Jika budget Siska maksimal Rp 450.000 dan dia harus tiba sebelum jam 07:00 pagi di hari wisuda, tanggal pemesanan manakah yang paling tepat dipilih Siska?',
    options: ['28 September', '25 September', '30 September', '1 Oktober', '2 Oktober'],
    correctAnswer: 0,
    explanation: 'Pada tanggal 28 September, Siska mendapatkan tiket harga normal Rp 400.000 (lulus syarat budget <= Rp 450.000) dan tiba pukul 04:00 pagi (lulus syarat tiba sebelum pukul 07:00 pagi).',
    timeLimit: 60
  },
  // 29. Analitis (sedang)
  {
    id: 'tpa-logika-analitis-sedang-add6',
    testType: 'TPA',
    category: 'logika-analitis',
    difficulty: 'sedang',
    question: 'Bu Retno menyediakan katering sarapan. Tiap porsi berisi makanan utama, lauk pendamping wajib, lauk ekstra, dan minuman hangat. Ketentuan: sosis sapi berpasangan dengan nasi goreng atau mi goreng; saus ekstra disertakan pada sup iga atau soto daging; bakso ikan dipadukan dengan bubur ayam; lauk pendamping wajib adalah telur dadar atau tempe bacem. Jika hari ini mi, nasi, dan sosis sapi tidak tersedia sama sekali, maka Bu Retno memutuskan menu paket sarapan hari ini adalah ...',
    options: [
      'Soto daging, saus ekstra, telur dadar, dan minuman hangat.',
      'Nasi goreng, telur dadar, sosis sapi, dan minuman hangat.',
      'Bubur ayam, bakso ikan, tempe bacem, dan minuman hangat.',
      'Sup iga, sosis sapi, tempe bacem, dan minuman hangat.',
      'Mi goreng, telur dadar, bakso ikan, dan minuman hangat.'
    ],
    correctAnswer: 0,
    explanation: 'Bahan nasi dan mi habis, sosis habis. Maka soto daging terpilih sebagai menu utama mingguan bersama saus ekstra. Lauk pendamping wajib adalah telur dadar. Pilihan A memenuhi semua ketersediaan bahan.',
    timeLimit: 60
  },
  // 30. Analitis (sedang)
  {
    id: 'tpa-logika-analitis-sedang-add7',
    testType: 'TPA',
    category: 'logika-analitis',
    difficulty: 'sedang',
    question: 'Ranti menata lima jilbab favoritnya di gantungan lemari dari kiri ke kanan. Jilbab tersebut berwarna: ungu, kuning, hijau, hitam, dan cokelat. Gantungan diatur: hijau di antara kuning dan hitam; cokelat di paling ujung kanan; ungu tepat di sebelah kiri kuning. Urutan jilbab di gantungan lemari Ranti dari kiri ke kanan adalah ...',
    options: [
      'Ungu – Kuning – Hijau – Hitam – Cokelat',
      'Kuning – Hijau – Hitam – Ungu – Cokelat',
      'Ungu – Hijau – Kuning – Hitam – Cokelat',
      'Hitam – Hijau – Kuning – Ungu – Cokelat',
      'Kuning – Hijau – Ungu – Hitam – Cokelat'
    ],
    correctAnswer: 0,
    explanation: 'Hijau di antara Kuning dan Hitam (Kuning-Hijau-Hitam). Cokelat di paling kanan. Ungu tepat di kiri Kuning. Gabungan lengkap jilbab dari kiri ke kanan adalah Ungu – Kuning – Hijau – Hitam – Cokelat.',
    timeLimit: 60
  },
  // 31. Analitis (sedang)
  {
    id: 'tpa-logika-analitis-sedang-add8',
    testType: 'TPA',
    category: 'logika-analitis',
    difficulty: 'sedang',
    question: '7 ilmuwan diundang presentasi riset: Asep, Bambang, Candra, Dedi, Eko, Fahri, dan Galih. Panitia hanya memilih 3 orang perwakilan: Candra dan Eko tidak boleh bersamaan; Dedi wajib terpilih (riset terbaik); Bambang hanya terpilih jika Fahri dan Eko terpilih; Asep tidak terpilih jika Eko terpilih; Galih wajib terpilih jika Candra terpilih. Jika diketahui Bambang tidak terpilih, maka siapa sajakah perwakilan yang terpilih?',
    options: [
      'Candra, Dedi, dan Galih',
      'Candra, Dedi, dan Asep',
      'Eko, Dedi, dan Asep',
      'Eko, Dedi, dan Galih',
      'Dedi, Candra, dan Eko'
    ],
    correctAnswer: 0,
    explanation: 'Dedi wajib terpilih (slot 1). Candra dan Eko tidak boleh bersamaan. Karena jika Candra dipilih maka Galih wajib ikut terpilih (slot 2 dan 3), ini secara logis mengisi kuota 3 orang yaitu Candra, Dedi, dan Galih.',
    timeLimit: 60
  },
  // 32. Analitis (sedang)
  {
    id: 'tpa-logika-analitis-sedang-add9',
    testType: 'TPA',
    category: 'logika-analitis',
    difficulty: 'sedang',
    question: 'Di asrama terdapat 3 sofa tidur: Sofa 1 kapasitas 2 orang, Sofa 2 kapasitas 3 orang, Sofa 3 kapasitas 3 orang. Sofa disusun berjejer dari jendela ke arah pintu. Andika tidur di Sofa 1 sebelah jendela berdampingan dengan Citra. Elan, Farhan, dan Gani tidur di sofa yang sama. Farhan bersebelahan dengan Gani dan Hani. Citra dan Dinda tidur berdampingan tetapi di sofa yang berbeda. Di manakah Bimo tidur?',
    options: [
      'Sofa 3 bersama Dinda dan Hani.',
      'Sofa 3 bersama Dinda dan Citra.',
      'Sofa 2 bersama Dinda dan Hani.',
      'Sofa 2 di antara Dinda dan Hani.',
      'Sofa 1 bersama Dinda.'
    ],
    correctAnswer: 0,
    explanation: 'Sofa 1 kapasitas 2 penuh oleh Andika dan Citra. Kelompok 3 orang (Elan, Farhan, Gani) harus menempati Sofa 2 penuh. Sisa 3 orang (Dinda, Hani, Bimo) harus berada di Sofa 3. Jadi Bimo tidur di Sofa 3 bersama Dinda dan Hani.',
    timeLimit: 60
  },
  // 33. Analitis (sedang)
  {
    id: 'tpa-logika-analitis-sedang-add10',
    testType: 'TPA',
    category: 'logika-analitis',
    difficulty: 'sedang',
    question: '5 karyawan bernama Anto, Budi, Coki, Dedi, dan Erna memesan kopi. Pilihan kopi: Espresso, Latte, Cappuccino, Macchiato, dan Americano. Diskon 15% diberikan jika satu jenis kopi dipesan oleh minimal 3 orang. Anto: Espresso, Latte, Cappuccino. Budi: Latte, Cappuccino, Macchiato. Coki: Latte, Cappuccino, Americano. Dedi: Espresso, Macchiato. Erna: Espresso, Latte, Americano. Jenis kopi yang mendapatkan diskon 15% adalah ...',
    options: ['Latte dan Espresso', 'Latte dan Cappuccino', 'Espresso dan Cappuccino', 'Macchiato dan Americano', 'Latte dan Americano'],
    correctAnswer: 0,
    explanation: 'Latte dipesan 4 orang (Anto, Budi, Coki, Erna). Espresso dipesan 3 orang (Anto, Dedi, Erna). Cappuccino dipesan 3 orang. Maka Latte dan Espresso (serta Cappuccino) berhak atas diskon 15%.',
    timeLimit: 60
  },
  // 34. Analitis (sedang)
  {
    id: 'tpa-logika-analitis-sedang-add11',
    testType: 'TPA',
    category: 'logika-analitis',
    difficulty: 'sedang',
    question: 'Enam orang pelari bersiap di garis start sejajar nomor lintasan 1-6: Rian tidak di samping Soni dan Tio; Udin di samping Tio; Rian di samping Vian, sedangkan Vian di samping Udin; Soni tidak didahului Wawan (Soni lintasan kecil dari Wawan), sedangkan Wawan di samping Rian; Tio berdiri di lintasan terakhir (nomor 6). Siapakah yang berdiri di lintasan nomor empat?',
    options: ['Vian', 'Rian', 'Soni', 'Udin', 'Wawan'],
    correctAnswer: 0,
    explanation: 'Analisis urutan dari 1 sampai 6: 1: Soni, 2: Wawan, 3: Rian, 4: Vian, 5: Udin, 6: Tio. Maka yang berdiri di lintasan nomor empat adalah Vian.',
    timeLimit: 60
  },
  // 35. Analitis (sedang)
  {
    id: 'tpa-logika-analitis-sedang-add12',
    testType: 'TPA',
    category: 'logika-analitis',
    difficulty: 'sedang',
    question: 'Tujuh pasien mengantre di poliklinik: Andi sebelum Budi; Citra sebelum Dedi dan Erwin; Farhan sebelum Budi dan Dedi; Gina dipanggil pertama; Budi dipanggil setelah Citra; Dedi dipanggil setelah Budi; tidak ada pasien di antara Dedi dan Erwin; Farhan dipanggil tepat di antara Andi dan Citra; Dedi dipanggil sebelum Erwin. Citra dipanggil pada urutan nomor ...',
    options: ['4', '2', '3', '5', '6'],
    correctAnswer: 0,
    explanation: 'Analisis urutan pemanggilan pasien: 1: Gina, 2: Andi, 3: Farhan, 4: Citra, 5: Budi, 6: Dedi, 7: Erwin. Maka Citra dipanggil pada urutan nomor 4.',
    timeLimit: 60
  },
  // 36. Deret (sedang)
  {
    id: 'tpa-numerik-deret-sedang-add1',
    testType: 'TPA',
    category: 'numerik-deret',
    difficulty: 'sedang',
    question: 'Lanjutkan deret angka berikut: 18, 22, 16, 20, 14, ...',
    options: ['18', '16', '24', '12', '15'],
    correctAnswer: 0,
    explanation: 'Pola deret angka ini adalah bergantian ditambah 4 lalu dikurangi 6 (+4, -6). Maka, suku berikutnya setelah 14 adalah 14 + 4 = 18.',
    timeLimit: 60
  },
  // 37. Deret (sedang)
  {
    id: 'tpa-numerik-deret-sedang-add2',
    testType: 'TPA',
    category: 'numerik-deret',
    difficulty: 'sedang',
    question: 'Lanjutkan deret angka berikut: 3, 5, 6, 8, 12, 11, ...',
    options: ['24', '14', '18', '15', '22'],
    correctAnswer: 0,
    explanation: 'Deret terdiri dari dua pola selang-seling. Deret posisi ganjil (3, 6, 12, ...): dikalikan 2. Deret posisi genap (5, 8, 11, ...): ditambah 3. Maka suku berikutnya adalah 12 * 2 = 24.',
    timeLimit: 60
  },
  // 38. Deret (sedang)
  {
    id: 'tpa-numerik-deret-sedang-add3',
    testType: 'TPA',
    category: 'numerik-deret',
    difficulty: 'sedang',
    question: 'Lanjutkan deret angka berikut: 12, 8, 23, 26, 22, 37, 40, ...',
    options: ['36, 51', '38, 53', '35, 50', '36, 48', '34, 49'],
    correctAnswer: 0,
    explanation: 'Pola deret ini adalah berulang dikurangi 4, ditambah 15, lalu ditambah 3 (-4, +15, +3). Maka, dua suku setelah 40 adalah 40 - 4 = 36, dan 36 + 15 = 51.',
    timeLimit: 60
  },
  // 39. Deret (sedang)
  {
    id: 'tpa-numerik-deret-sedang-add4',
    testType: 'TPA',
    category: 'numerik-deret',
    difficulty: 'sedang',
    question: 'Lanjutkan deret angka berikut: 5, 7, 13, 31, 85, 247, 733, ...',
    options: ['2191', '2174', '2164', '2284', '2211'],
    correctAnswer: 0,
    explanation: 'Pola deret angka ini adalah dikalikan 3 kemudian dikurangi 8 (x 3 - 8). Maka, suku berikutnya setelah 733 adalah 733 * 3 - 8 = 2191.',
    timeLimit: 60
  },
  // 40. Deret (sedang)
  {
    id: 'tpa-numerik-deret-sedang-add5',
    testType: 'TPA',
    category: 'numerik-deret',
    difficulty: 'sedang',
    question: 'Lengkapi deret angka berikut: 6, 4, 12, ..., ..., 28, 84, 82',
    options: ['10, 30', '10, 28', '12, 36', '8, 24', '10, 20'],
    correctAnswer: 0,
    explanation: 'Pola deret ini adalah bergantian dikurangi 2 kemudian dikalikan 3 (-2, x 3). Maka, angka pengisi rumpang adalah 12 - 2 = 10, dan 10 * 3 = 30.',
    timeLimit: 60
  },
  // 41. Deret (sedang)
  {
    id: 'tpa-numerik-deret-sedang-add6',
    testType: 'TPA',
    category: 'numerik-deret',
    difficulty: 'sedang',
    question: 'Lengkapi deret angka berikut: 9, ..., ..., 16, -1, 8, -6, 4, -11',
    options: ['32, 4', '24, 4', '48, 2', '32, 2', '36, 6'],
    correctAnswer: 0,
    explanation: 'Pola selang-seling. Posisi ganjil (9, [4], -1, -6, -11): dikurangi 5. Posisi genap ([32], 16, 8, 4): dibagi 2. Maka angka pengisi rumpang adalah 32 dan 4.',
    timeLimit: 60
  },
  // 42. Aritmatika (sedang)
  {
    id: 'tpa-numerik-aritmatika-sedang-add1',
    testType: 'TPA',
    category: 'numerik-aritmatika',
    difficulty: 'sedang',
    question: 'Jika 2(3x - 5y) - 10 = 2(y + 3,5) - x dan 3y + 2x = -8, maka hasil dari x - y = ...',
    options: ['1', '-1', '2', '-2', '3'],
    correctAnswer: 0,
    explanation: 'Sederhanakan persamaan pertama menjadi 7x - 12y = 17. Dari persamaan kedua, kalikan dengan 4 menjadi 8x + 12y = -32. Jumlahkan: 15x = -15 -> x = -1. Substitusikan: 2(-1) + 3y = -8 -> 3y = -6 -> y = -2. Maka x - y = -1 - (-2) = 1.',
    timeLimit: 60
  },
  // 43. Aritmatika (sedang)
  {
    id: 'tpa-numerik-aritmatika-sedang-add2',
    testType: 'TPA',
    category: 'numerik-aritmatika',
    difficulty: 'sedang',
    question: 'Jika 2y - 3x = 8 dan 2x + 12 = y, maka hasil dari x - 2y = ...',
    options: ['24', '16', '12', '-16', '28'],
    correctAnswer: 0,
    explanation: 'Substitusikan y = 2x + 12 ke persamaan pertama: 2(2x + 12) - 3x = 8 -> x = -16. Substitusikan kembali: y = 2(-16) + 12 = -20. Maka, x - 2y = -16 - 2(-20) = -16 + 40 = 24.',
    timeLimit: 60
  },
  // 44. Aritmatika (sedang)
  {
    id: 'tpa-numerik-aritmatika-sedang-add3',
    testType: 'TPA',
    category: 'numerik-aritmatika',
    difficulty: 'sedang',
    question: 'Jika 8x - 3y = 50 dan 2x + 3y + 10 = 0, maka hasil dari x - 3y = ...',
    options: ['22', '18', '24', '16', '20'],
    correctAnswer: 0,
    explanation: 'Jumlahkan kedua persamaan: 10x = 40 -> x = 4. Substitusikan x = 4 ke persamaan kedua: 2(4) + 3y = -10 -> 3y = -18 -> y = -6. Maka, x - 3y = 4 - 3(-6) = 22.',
    timeLimit: 60
  },
  // 45. Perbandingan (sedang)
  {
    id: 'tpa-numerik-perbandingan-sedang-add1',
    testType: 'TPA',
    category: 'numerik-perbandingan',
    difficulty: 'sedang',
    question: 'Jika 4x + 3y = 10 dan x = 3y, maka hubungan x dan y yang benar adalah ...',
    options: ['x > y', 'x < y', 'x = y', 'x = 2y', 'Hubungan x dan y tidak dapat ditentukan'],
    correctAnswer: 0,
    explanation: 'Substitusikan x = 3y ke persamaan pertama: 15y = 10 -> y = 2/3. Maka x = 3 * (2/3) = 2. Karena x = 2 dan y = 0.67, maka x > y.',
    timeLimit: 45
  },
  // 46. Perbandingan (sedang)
  {
    id: 'tpa-numerik-perbandingan-sedang-add2',
    testType: 'TPA',
    category: 'numerik-perbandingan',
    difficulty: 'sedang',
    question: 'Jika 5y = -2x dan 3x - 23 = 4y, maka hubungan x dan y yang benar adalah ...',
    options: ['x > y', 'x < y', 'x = y', 'x <= y', 'Hubungan tidak dapat ditentukan'],
    correctAnswer: 0,
    explanation: 'Eliminasi sistem persamaan memberikan hasil x = 5 dan y = -2. Karena x = 5 dan y = -2, maka hubungan yang tepat adalah x > y.',
    timeLimit: 45
  },
  // 47. Perbandingan (sedang)
  {
    id: 'tpa-numerik-perbandingan-sedang-add3',
    testType: 'TPA',
    category: 'numerik-perbandingan',
    difficulty: 'sedang',
    question: 'Jika 2x - 10 = 6y dan 4y - 20 = 2x, maka hubungan x dan y yang benar adalah ...',
    options: ['x < y', 'x > y', 'x = y', 'x >= y', 'Hubungan tidak dapat ditentukan'],
    correctAnswer: 0,
    explanation: 'Sederhanakan menjadi x - 3y = 5 dan x - 2y = -10. Kurangkan keduanya sehingga didapat y = -15, dan substitusikan didapat x = -40. Karena x = -40 dan y = -15, maka x < y.',
    timeLimit: 45
  },
  // 48. Cerita (sedang)
  {
    id: 'tpa-numerik-cerita-sedang-add1',
    testType: 'TPA',
    category: 'numerik-cerita',
    difficulty: 'sedang',
    question: 'Roni berhasil menjual sepeda lipat miliknya seharga Rp 13.800.000 sehingga memperoleh keuntungan 15%. Setahun yang lalu, Roni membeli sepeda tersebut dengan diskon 20% dari harga retail aslinya. Berapakah harga retail asli sepeda lipat tersebut jika tanpa diskon?',
    options: ['Rp 15.000.000', 'Rp 16.000.000', 'Rp 14.500.000', 'Rp 12.000.000', 'Rp 18.000.000'],
    correctAnswer: 0,
    explanation: 'Harga beli = Rp 13.800.000 / 1,15 = Rp 12.000.000. Karena dibeli setelah diskon 20%, maka harga retail asli = Rp 12.000.000 / 0,8 = Rp 15.000.000.',
    timeLimit: 90
  },
  // 49. Cerita (sedang)
  {
    id: 'tpa-numerik-cerita-sedang-add2',
    testType: 'TPA',
    category: 'numerik-cerita',
    difficulty: 'sedang',
    question: 'Sebuah sanggar seni memiliki 800 anggota, dan 15% di antaranya tidak mengikuti kelas seni tari maupun seni lukis. Jika 420 anggota mengikuti kelas seni tari dan 480 anggota mengikuti kelas seni lukis, berapakah jumlah anggota yang mengikuti kedua kelas tersebut sekaligus?',
    options: ['220', '260', '180', '120', '250'],
    correctAnswer: 0,
    explanation: 'Anggota aktif = 800 - 120 = 680 orang. Jumlah anggota tari + lukis = 900 orang. Maka, jumlah anggota yang mengikuti kedua kelas sekaligus adalah 900 - 680 = 220 orang.',
    timeLimit: 90
  },
  // 50. Cerita (sedang)
  {
    id: 'tpa-numerik-cerita-sedang-add3',
    testType: 'TPA',
    category: 'numerik-cerita',
    difficulty: 'sedang',
    question: 'Doni bekerja sebagai sales dan memiliki masa kerja 2 tahun. Perusahaan menetapkan gaji pokok sales berdasarkan masa kerja: Rp 2.000.000 untuk masa kerja > 3 tahun dan Rp 1.500.000 untuk masa kerja < 3 tahun, belum termasuk potongan pajak 10% dari gaji pokok. Sales mendapatkan komisi 4% dari total penjualan bulanan. Jika total pendapatan bersih Doni bulan lalu adalah Rp 13.350.000, berapakah total nilai penjualan yang dicapai Doni bulan lalu?',
    options: ['Rp 300.000.000', 'Rp 280.000.000', 'Rp 250.000.000', 'Rp 200.000.000', 'Rp 320.000.000'],
    correctAnswer: 0,
    explanation: 'Gaji bersih Doni = Rp 1.500.000 - 10% = Rp 1.350.000. Pendapatan komisi = Rp 13.350.000 - Rp 1.350.000 = Rp 12.000.000. Maka total nilai penjualan = Rp 12.000.000 / 0,04 = Rp 300.000.000.',
    timeLimit: 90
  }
];
