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
          // Rotate options / use pre-built SVGs
          const patternKey = i % 2 === 0 ? 'series1' : i % 2 === 1 ? 'series2' : 'analogy1';
          const basePattern = figuralPatterns[patternKey as 'series1' | 'series2' | 'analogy1'];
          
          figuralData = {
            type: (patternKey === 'series1' || patternKey === 'series2' ? 'pattern-series' : 'analogy') as 'pattern-series' | 'analogy',
            figures: [basePattern.q1, basePattern.q2, basePattern.q3],
            options: [...basePattern.opts]
          };
          
          questionText = `Perhatikan deret pola/diagram di bawah ini. Pilih gambar selanjutnya yang logis untuk melengkapi deret gambar tersebut.`;
          options = ['A', 'B', 'C', 'D', 'E']; // Will be replaced by inline SVG buttons
          correctAnswer = patternKey === 'series1' ? 0 : patternKey === 'series2' ? 1 : 1;
          explanation = patternKey === 'series1' 
            ? 'Garis berputar 90 derajat searah jarum jam (CW), sedangkan titik kuning bertambah 1 di setiap suku. Suku berikutnya harus menunjuk ke kiri (270 deg) dan memiliki 4 titik.' 
            : 'Sisi bangun datar di dalam lingkaran bertambah 1 di setiap suku (Segitiga -> Segiempat -> Segilima -> Segienam). Suku berikutnya adalah segienam.';
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

  return questions;
}
