import { Question } from '../lib/types';

const BACAAN_PASSAGES = {
  p1: 'Menteri Pembangunan Sosial, Budi Hartono, menyatakan bahwa puluhan Sekolah Harapan Bangsa (SHB) siap beroperasi pada Juni 2026 untuk dimanfaatkan oleh siswa baru dari keluarga prasejahtera pada tahun ajaran 2026/2027. "Ini adalah pembangunan tahap kedua di 93 titik yang melibatkan lebih dari 70.000 pekerja," tuturnya dalam siaran pers Badan Humas Pemerintah, Kamis (7/5/2026).\n\nMenurut Budi, dari 93 sekolah tersebut, pembangunan 69 sekolah ditargetkan selesai sepenuhnya pada 20 Juni. Sementara itu, 24 sekolah sisanya merupakan sekolah fungsional yang konstruksinya belum rampung namun sudah dapat digunakan, dengan setidaknya memiliki lima fasilitas utama: asrama, ruang kelas, tempat ibadah, dapur dan ruang makan, serta ruang pendidik.\n\nSelain mempercepat pembangunan 93 SHB permanen, pemerintah juga akan menambah 10 SHB rintisan di beberapa wilayah. SHB rintisan dirancang sebagai model pemerataan pendidikan gratis dan berkualitas. Hingga kini, terdapat 166 SHB rintisan di 131 kabupaten/kota di 34 provinsi. Program SHB ini menyasar keluarga kurang mampu untuk memperluas akses sekaligus meningkatkan mutu pendidikan nasional. Pemerintah menargetkan pembangunan 500 SHB hingga tahun 2029 yang diharapkan dapat menampung 500.000 siswa.',
  
  p2: 'Penguatan kapasitas sumber daya manusia (SDM) menjadi kunci utama dalam pengelolaan data kependudukan di era digital. Infrastruktur teknologi yang kuat tidak akan memberikan hasil optimal tanpa didukung oleh kapasitas pengelola yang memadai. Hal itu disampaikan Direktur Administrasi Kependudukan, Gunawan Prasetyo, dalam pembukaan pelatihan teknis pengelola data kependudukan daerah di Hotel Grand Seruni, Depok, Jawa Barat, Rabu (6/5/2026).\n\nDalam arahannya, Gunawan menekankan bahwa pengembangan sistem informasi kependudukan tidak boleh hanya berfokus pada perangkat keras seperti server, jaringan, dan sistem keamanan siber, melainkan harus diimbangi dengan kesiapan personil pengelolanya. "Apabila infrastruktur keamanan siber kita sangat kuat tetapi kapasitas SDM pengelolanya lemah, sistem tersebut tetap rentan," tegasnya. Upaya peningkatan kapasitas ini sejalan dengan percepatan transformasi digital nasional melalui program Digitalisasi Kependudukan Mandiri. Data kependudukan memiliki posisi strategis sebagai basis utama dalam pelayanan publik dan penyelenggaraan tata kelola pemerintahan, mulai dari perencanaan pembangunan hingga penyaluran bantuan sosial. Gunawan juga memaparkan bahwa capaian perekaman identitas digital terus menunjukkan tren positif. Pada akhir tahun 2025, jumlah penduduk tercatat mencapai sekitar 288 juta jiwa dengan tingkat perekaman kartu identitas elektronik telah melampaui 97 persen dari wajib kartu identitas.',
  
  p3: 'Menteri Keuangan Pratama Wijaya berencana mengaktifkan kembali dana stabilisasi obligasi negara (bond stabilization fund) sebagai langkah menjaga stabilitas nilai tukar mata uang domestik dan pasar surat utang. Dana tersebut disiapkan untuk membeli kembali surat berharga negara di pasar sekunder ketika terjadi aksi jual oleh investor. Strategi ini diharapkan dapat menjaga imbal hasil (yield) obligasi pemerintah tetap stabil sekaligus mengurangi tekanan depresiasi mata uang. "Kami memiliki dana stabilisasi obligasi sendiri yang didukung beberapa pihak dan dapat mencukupi kebutuhan jangka pendek," ujar Pratama, Kamis (7/5/2026).\n\nMenurutnya, skema ini sudah dimiliki kementerian sejak lama namun selama ini pasif karena belum pernah digunakan. Langkah intervensi ini dilakukan agar investor tidak mengalami kerugian modal (capital loss) akibat kenaikan yield yang terlalu cepat. Rencana pengaktifan kembali dana stabilisasi obligasi ini ditargetkan mulai berjalan pada pekan pertama Mei 2026. Rencana tersebut disiapkan meskipun imbal hasil surat utang saat ini masih berada di kisaran asumsi makro anggaran negara sebesar 6,7 persen, naik cukup cepat dari posisi awal tahun yang sempat menyentuh 5,9 persen.\n\nTerkait sumber pendanaan spesifik, kementerian menyatakan anggaran dapat bersumber dari beberapa pos keuangan negara, namun belum merinci alokasi anggaran serta skema detail pembelian kembali yang akan diterapkan dalam waktu dekat. Meski demikian, kementerian memastikan akan terus berkoordinasi dengan bank sentral dalam menjaga stabilitas pasar keuangan.'
};

export const additionalTPAQuestions3: Question[] = [
  // 1. Sinonim (sedang)
  {
    id: 'tpa-verbal-sinonim-sedang-add3-1',
    testType: 'TPA',
    category: 'verbal-sinonim',
    difficulty: 'sedang',
    question: 'Pilihlah padanan kata yang paling tepat.\n\nINSINYE : ...',
    options: ['Lencana', 'Dasi', 'Logo', 'Insinyur', 'Pita'],
    correctAnswer: 0,
    explanation: 'Insinye (dari bahasa Prancis "insigne") berarti tanda pangkat, lambang, atau lencana.',
    timeLimit: 30
  },
  // 2. Antonim (sedang)
  {
    id: 'tpa-verbal-antonim-sedang-add3-2',
    testType: 'TPA',
    category: 'verbal-antonim',
    difficulty: 'sedang',
    question: 'Pilihlah lawan kata yang paling tepat.\n\nPANTAU : ...',
    options: ['Lihat', 'Abai', 'Lepas', 'Peringatkan', 'Awas'],
    correctAnswer: 1,
    explanation: 'Memantau berarti mengamati, mengawasi, atau meninjau. Lawan kata yang paling tepat adalah mengabaikan (abai).',
    timeLimit: 30
  },
  // 3. Analogi (sedang)
  {
    id: 'tpa-verbal-analogi-sedang-add3-3',
    testType: 'TPA',
    category: 'verbal-analogi',
    difficulty: 'sedang',
    question: 'Pilihlah analogi yang paling tepat.\n\nTULANG : PUNGGUNG = .... : KANAN',
    options: ['Mata', 'Kaki', 'Tangan', 'Rusuk', 'Kiri'],
    correctAnswer: 2,
    explanation: 'Tulang Punggung dan Tangan Kanan keduanya adalah istilah anatomi tubuh sekaligus ungkapan idiomatik dalam bahasa Indonesia (tulang punggung berarti penopang utama, tangan kanan berarti orang kepercayaan).',
    timeLimit: 45
  },
  // 4. Analogi (sedang)
  {
    id: 'tpa-verbal-analogi-sedang-add3-4',
    testType: 'TPA',
    category: 'verbal-analogi',
    difficulty: 'sedang',
    question: 'Pilihlah analogi yang paling tepat.\n\nCACING : TANAH = ... : SABANA',
    options: ['Hewan', 'Pohon', 'Rumput', 'Kuda', 'Buaya'],
    correctAnswer: 3,
    explanation: 'Cacing habitat alaminya berada di Tanah, sebagaimana Kuda habitat alaminya berada di Sabana (padang rumput).',
    timeLimit: 45
  },
  // 5. Analogi (sedang)
  {
    id: 'tpa-verbal-analogi-sedang-add3-5',
    testType: 'TPA',
    category: 'verbal-analogi',
    difficulty: 'sedang',
    question: 'Pilihlah analogi yang paling tepat.\n\nKERJA : KANTOR = ... : BALAI RIUNG',
    options: ['Hukuman', 'Interogasi', 'Tidur', 'Sidang', 'Pesta'],
    correctAnswer: 4,
    explanation: 'Kantor adalah tempat khusus untuk melakukan kegiatan Kerja, sedangkan Balai Riung (balairung/aula besar) adalah tempat khusus untuk menyelenggarakan Pesta (atau pertemuan besar).',
    timeLimit: 45
  },
  // 6. Analogi (sedang)
  {
    id: 'tpa-verbal-analogi-sedang-add3-6',
    testType: 'TPA',
    category: 'verbal-analogi',
    difficulty: 'sedang',
    question: 'Pilihlah analogi yang paling tepat.\n\nMATA : BUTA = LIDAH : ...',
    options: ['Gatal', 'Rasa', 'Pahit', 'Ageusia', 'Hipogeusia'],
    correctAnswer: 3,
    explanation: 'Buta adalah kondisi hilangnya kemampuan fungsi indra penglihatan (Mata), sedangkan Ageusia adalah kondisi hilangnya kemampuan fungsi indra pengecap (Lidah).',
    timeLimit: 45
  },
  // 7. Analogi (sedang)
  {
    id: 'tpa-verbal-analogi-sedang-add3-7',
    testType: 'TPA',
    category: 'verbal-analogi',
    difficulty: 'sedang',
    question: 'Pilihlah analogi yang paling tepat.\n\nTANAM : PUPUK = TERNAK : ...',
    options: ['Kandang', 'Pakan', 'Air', 'Tanah', 'Bibit'],
    correctAnswer: 1,
    explanation: 'Agar tanaman tumbuh dengan baik saat di-Tanam perlu diberi Pupuk, sedangkan agar hewan ternak tumbuh dengan baik saat di-Ternak perlu diberi Pakan.',
    timeLimit: 45
  },
  // 8. Bacaan (sedang)
  {
    id: 'tpa-verbal-bacaan-sedang-add3-8',
    testType: 'TPA',
    category: 'verbal-bacaan',
    difficulty: 'sedang',
    question: 'Apa tema dari wacana di atas?',
    options: [
      'Program penyediaan sekolah gratis tingkat dasar hingga menengah bagi keluarga prasejahtera.',
      'Pemerintah berencana menambah 10 unit sekolah rintisan di beberapa provinsi.',
      'Perluasan akses dan mutu pendidikan melalui pembangunan sekolah gratis yang siap beroperasi pertengahan tahun ini.',
      'Sekolah rintisan baru siap beroperasi penuh pada tahun ajaran mendatang.',
      'Pemerintah daerah dan kementerian bersinergi dalam mengawal infrastruktur pendidikan daerah.'
    ],
    correctAnswer: 2,
    explanation: 'Tema wacana tersebut membahas tentang perluasan akses pendidikan dan peningkatan mutunya melalui program Sekolah Harapan Bangsa (sekolah rakyat) gratis yang siap beroperasi pertengahan tahun ini (Juni 2026).',
    timeLimit: 90,
    passage: BACAAN_PASSAGES.p1
  },
  // 9. Bacaan (sedang)
  {
    id: 'tpa-verbal-bacaan-sedang-add3-9',
    testType: 'TPA',
    category: 'verbal-bacaan',
    difficulty: 'sedang',
    question: 'Pernyataan yang sesuai dengan wacana di atas adalah ...',
    options: [
      'Capaian perekaman data kependudukan diprediksi menunjukkan tren positif di masa mendatang.',
      'Data kependudukan hanya dimanfaatkan untuk kepentingan administrasi internal kementerian.',
      'Sistem pengelolaan data kependudukan dengan infrastruktur yang kuat tidak akan berjalan optimal jika kapasitas SDM pengelolanya tidak memadai.',
      'Pembangunan sistem kependudukan perlu diimbangi kesiapan SDM sebagai aspek sekunder penunjang saja.',
      'Infrastruktur perangkat keras yang canggih merupakan satu-satunya kunci keberhasilan sistem.'
    ],
    correctAnswer: 2,
    explanation: 'Berdasarkan wacana, paragraf pertama menyatakan secara eksplisit: "Infrastruktur teknologi yang kuat tidak akan memberikan hasil optimal tanpa didukung oleh kapasitas pengelola (SDM) yang memadai."',
    timeLimit: 90,
    passage: BACAAN_PASSAGES.p2
  },
  // 10. Bacaan (sedang)
  {
    id: 'tpa-verbal-bacaan-sedang-add3-10',
    testType: 'TPA',
    category: 'verbal-bacaan',
    difficulty: 'sedang',
    question: 'Apa masalah yang mungkin muncul dalam rencana pengaktifan kembali dana stabilisasi obligasi oleh kementerian terkait?',
    options: [
      'Tingkat imbal hasil obligasi pemerintah menjadi sangat tidak stabil.',
      'Investor asing berisiko mengalami kerugian modal akibat kenaikan yield yang lambat.',
      'Stabilitas nilai tukar mata uang domestik dan pasar surat utang negara terganggu.',
      'Sumber pendanaan spesifik, skema detail, serta besaran anggaran untuk pembelian kembali obligasi belum dirinci.',
      'Dana stabilisasi obligasi dinilai tidak efektif karena sudah terlalu lama tidak aktif.'
    ],
    correctAnswer: 3,
    explanation: 'Berdasarkan wacana, disebutkan bahwa: "Terkait sumber pendanaan spesifik, kementerian menyatakan anggaran dapat bersumber dari beberapa pos keuangan negara, namun belum merinci alokasi anggaran serta skema detail pembelian kembali yang akan diterapkan dalam waktu dekat."',
    timeLimit: 90,
    passage: BACAAN_PASSAGES.p3
  },
  // 11. Silogisme (sedang)
  {
    id: 'tpa-logika-silogisme-sedang-add3-11',
    testType: 'TPA',
    category: 'logika-silogisme',
    difficulty: 'sedang',
    question: 'Pilihlah kesimpulan yang paling tepat dari premis-premis berikut:\n\n- Tidak ada antena buatan pabrik ABC yang sinyalnya bisa menangkap gelombang 5G.\n- Semua antena milik perusahaan A sinyalnya menangkap gelombang 5G.',
    options: [
      'Tidak ada antena milik perusahaan A yang sinyalnya menangkap gelombang 5G.',
      'Semua yang dibuat oleh pabrik ABC adalah antena.',
      'Sebagian antena milik perusahaan A buatan pabrik ABC.',
      'Tidak ada antena milik perusahaan A yang buatan pabrik ABC.',
      'Sebagian yang buatan pabrik ABC bisa menangkap sinyal gelombang 5G.'
    ],
    correctAnswer: 3,
    explanation: 'Semua antena perusahaan A menangkap 5G. Tidak ada antena pabrik ABC yang menangkap 5G. Maka, tidak ada antena perusahaan A yang merupakan buatan pabrik ABC.',
    timeLimit: 45
  },
  // 12. Silogisme (sedang)
  {
    id: 'tpa-logika-silogisme-sedang-add3-12',
    testType: 'TPA',
    category: 'logika-silogisme',
    difficulty: 'sedang',
    question: 'Pilihlah kesimpulan yang paling tepat dari premis-premis berikut:\n\n- Semua siswa TK Rembulan pernah berkunjung ke kompleks wisata di kota ini.\n- Beberapa anak di kelurahan Hulu belum pernah berkunjung ke kompleks wisata di kota ini.',
    options: [
      'Beberapa anak di kelurahan Hulu bukan siswa TK Rembulan.',
      'Beberapa anak selain dari kelurahan Hulu bukan siswa TK Rembulan.',
      'Sebagian anak kelurahan Hulu yang sekolah di TK Rembulan belum pernah berkunjung ke kompleks wisata di kota ini.',
      'Sebagian siswa TK Rembulan tidak pernah ke kompleks wisata di kota ini.',
      'Tidak semua anak yang pernah berkunjung di kompleks wisata adalah siswa TK Rembulan.'
    ],
    correctAnswer: 0,
    explanation: 'Karena semua siswa TK Rembulan pernah berkunjung ke kompleks wisata, sedangkan beberapa anak di kelurahan Hulu belum pernah berkunjung, maka anak kelurahan Hulu yang belum pernah berkunjung tersebut pasti bukan siswa TK Rembulan.',
    timeLimit: 45
  },
  // 13. Silogisme (sedang)
  {
    id: 'tpa-logika-silogisme-sedang-add3-13',
    testType: 'TPA',
    category: 'logika-silogisme',
    difficulty: 'sedang',
    question: 'Pilihlah kesimpulan yang paling tepat dari premis-premis berikut:\n\n- Semua pasien obesitas berpotensi besar terkena diabetes.\n- Sebagian teman-teman dari ayah memiliki sakit obesitas.',
    options: [
      'Sebagian pasien obesitas berpotensi besar terkena diabetes.',
      'Sebagian teman-teman dari ayah berpotensi besar terkena diabetes.',
      'Sebagian pasien obesitas berpotensi tidak besar terkena diabetes.',
      'Semua teman-teman dari ayah berpotensi besar terkena diabetes.',
      'Sebagian pasien obesitas mungkin teman-teman ayah.'
    ],
    correctAnswer: 1,
    explanation: 'Sebagian teman ayah menderita obesitas. Karena semua penderita obesitas berpotensi besar terkena diabetes, maka sebagian teman ayah tersebut berpotensi besar terkena diabetes.',
    timeLimit: 45
  },
  // 14. Silogisme (sedang)
  {
    id: 'tpa-logika-silogisme-sedang-add3-14',
    testType: 'TPA',
    category: 'logika-silogisme',
    difficulty: 'sedang',
    question: 'Pilihlah kesimpulan yang paling tepat dari premis-premis berikut:\n\n- Semua sayur dari kebun paman ditanam tanpa pupuk sintetis.\n- Sebagian yang dijual di toko swalayan adalah sayur dari kebun paman.',
    options: [
      'Sebagian sayur dari kebun paman tidak dijual di toko swalayan.',
      'Semua yang dijual di toko swalayan ditanam tanpa pupuk sintetis.',
      'Sebagian yang dijual di toko swalayan adalah sayur yang ditanam tanpa pupuk sintetis.',
      'Sebagian sayur dari kebun paman ditanam dengan pupuk sintetis.',
      'Semua yang ditanam tanpa pupuk sintetis adalah sayur dari kebun paman.'
    ],
    correctAnswer: 2,
    explanation: 'Sebagian barang di swalayan adalah sayur kebun paman. Karena semua sayur kebun paman ditanam tanpa pupuk sintetis, maka sebagian barang di swalayan tersebut ditanam tanpa pupuk sintetis.',
    timeLimit: 45
  },
  // 15. Silogisme (sedang)
  {
    id: 'tpa-logika-silogisme-sedang-add3-15',
    testType: 'TPA',
    category: 'logika-silogisme',
    difficulty: 'sedang',
    question: 'Pilihlah kesimpulan yang paling tepat dari premis-premis berikut:\n\n- Semua pemburu mampu membaca jejak kaki.\n- Semua penduduk pegunungan adalah pemburu.',
    options: [
      'Semua yang mampu membaca jejak kaki adalah pemburu.',
      'Semua yang mampu membaca jejak kaki adalah penduduk pegunungan.',
      'Semua penduduk pegunungan mampu membaca jejak kaki.',
      'Sebagian penduduk pegunungan mampu membaca jejak kaki.',
      'Sebagian pemburu adalah penduduk pegunungan.'
    ],
    correctAnswer: 2,
    explanation: 'Penduduk pegunungan -> pemburu -> mampu membaca jejak kaki. Maka semua penduduk pegunungan mampu membaca jejak kaki.',
    timeLimit: 45
  },
  // 16. Silogisme (sedang)
  {
    id: 'tpa-logika-silogisme-sedang-add3-16',
    testType: 'TPA',
    category: 'logika-silogisme',
    difficulty: 'sedang',
    question: 'Pilihlah kesimpulan yang paling tepat dari premis-premis berikut:\n\n- Beberapa mahasiswa mengikuti kerja part time setelah selesai perkuliahan.\n- Semua mahasiswa perlu memilih jenis karir yang mereka sukai.',
    options: [
      'Semua yang perlu memilih jenis karir yang disukai adalah yang mengikuti kerja part time setelah selesai perkuliahan.',
      'Semua mahasiswa mengikuti kerja part time setelah selesai perkuliahan.',
      'Beberapa yang mengikuti kerja part time setelah selesai perkuliahan tidak perlu memilih jenis karir yang mereka sukai.',
      'Beberapa yang mengikuti kerja part time setelah selesai perkuliahan perlu memilih jenis karir yang mereka sukai.',
      'Beberapa yang perlu memilih jenis karir yang disukai mengikuti kerja part time setelah selesai perkuliahan.'
    ],
    correctAnswer: 4,
    explanation: 'Semua mahasiswa perlu memilih karir yang disukai. Beberapa mahasiswa bekerja part-time. Maka, beberapa orang yang perlu memilih karir yang disukai (mahasiswa) bekerja part-time.',
    timeLimit: 45
  },
  // 17. Silogisme (sedang)
  {
    id: 'tpa-logika-silogisme-sedang-add3-17',
    testType: 'TPA',
    category: 'logika-silogisme',
    difficulty: 'sedang',
    question: 'Pilihlah kesimpulan yang paling tepat dari premis-premis berikut:\n\n- Tidak ada anggota klub Hockey Y yang memiliki usaha toko kelontong.\n- Semua pengurus perserikatan Suporter Hockey Y adalah anggota klub Hockey Y.',
    options: [
      'Sebagian anggota klub Hockey Y memiliki usaha toko kelontong.',
      'Tidak ada pengurus perserikatan Suporter Hockey Y yang memiliki usaha toko kelontong.',
      'Tidak ada anggota klub Hockey Y yang jadi pengurus perserikatan Suporter Hockey Y.',
      'Beberapa pengurus perserikatan Suporter Hockey Y adalah anggota klub Hockey Y.',
      'Semua pengurus perserikatan Suporter Hockey Y memiliki usaha toko kelontong.'
    ],
    correctAnswer: 1,
    explanation: 'Pengurus suporter -> anggota klub Hockey Y -> tidak punya toko kelontong. Maka tidak ada pengurus suporter yang punya toko kelontong.',
    timeLimit: 45
  },
  // 18. Silogisme (sedang)
  {
    id: 'tpa-logika-silogisme-sedang-add3-18',
    testType: 'TPA',
    category: 'logika-silogisme',
    difficulty: 'sedang',
    question: 'Pilihlah kesimpulan yang paling tepat dari premis-premis berikut:\n\n- Tidak ada anggota SAR yang lulusan SMA.\n- Sebagian anggota SAR bisa beladiri.',
    options: [
      'Sebagian yang lulusan SMA tidak bisa beladiri.',
      'Sebagian bisa beladiri tidak lulus SMA.',
      'Tidak ada anggota SAR yang bisa beladiri merupakan lulusan SMA.',
      'Semua anggota SAR bisa beladiri dan lulusan SMA.',
      'Sebagian anggota SAR bukan lulusan SMA dan tidak bisa beladiri.'
    ],
    correctAnswer: 1,
    explanation: 'Karena tidak ada anggota SAR yang lulusan SMA, dan sebagian anggota SAR bisa bela diri, maka sebagian anggota yang bisa bela diri tersebut bukanlah lulusan SMA.',
    timeLimit: 45
  },
  // 19. Penalaran (sedang)
  {
    id: 'tpa-logika-penalaran-sedang-add3-19',
    testType: 'TPA',
    category: 'logika-penalaran',
    difficulty: 'sedang',
    question: 'Pilihlah kesimpulan yang paling tepat dari premis-premis berikut:\n\n- Hari turun hujan apabila langit mendung gelap.\n- Jalan raya tergenang air apabila hari turun hujan.\n- Pompa air gorong-gorong dinyalakan apabila jalan raya tergenang air.',
    options: [
      'Pompa air gorong-gorong dinyalakan apabila langit mendung gelap.',
      'Pompa air gorong-gorong dinyalakan apabila langit mendung kurang gelap.',
      'Langit mendung gelap apabila hari hujan turun.',
      'Langit mendung gelap apabila jalan raya tergenang air.',
      'Hari turun hujan apabila pompa air gorong-gorong dinyalakan.'
    ],
    correctAnswer: 0,
    explanation: 'Hukum silogisme hipotetis: langit mendung gelap -> hujan -> tergenang -> pompa dinyalakan. Jadi, pompa dinyalakan apabila langit mendung gelap.',
    timeLimit: 60
  },
  // 20. Penalaran (sedang)
  {
    id: 'tpa-logika-penalaran-sedang-add3-20',
    testType: 'TPA',
    category: 'logika-penalaran',
    difficulty: 'sedang',
    question: 'Pilihlah kesimpulan yang paling tepat dari premis-premis berikut:\n\n- Jika Pak Bandi panen gandum, ia menjual hasil panen ke pabrik tepung.\n- Jika Pak Bandi panen jagung, ia menjual hasil panen ke koperasi.',
    options: [
      'Jika Pak Bandi tidak menjual hasil panen ke pabrik tepung atau ke koperasi, ia tidak panen gandum atau jagung.',
      'Jika Pak Bandi menjual hasil panen ke pabrik tepung atau ke koperasi, ia panen gandum dan jagung.',
      'Jika Pak Bandi menjual hasil panen ke pabrik tepung dan ke koperasi, ia panen gandum dan jagung.',
      'Jika Pak Bandi tidak panen gandum atau jagung, ia tidak menjual hasil panen ke pabrik tepung atau ke koperasi.',
      'Jika Pak Bandi menjual hasil panen ke pabrik tepung dan ke koperasi, ia panen gandum atau jagung.'
    ],
    correctAnswer: 0,
    explanation: 'Menggunakan prinsip kontraposisi dari dilema destruktif: p -> q dan r -> s. Kontraposisinya adalah jika ~q dan ~s, maka ~p dan ~r. Jadi, jika tidak menjual ke pabrik tepung atau ke koperasi, maka tidak panen gandum atau jagung.',
    timeLimit: 60
  },
  // 21. Penalaran (sedang)
  {
    id: 'tpa-logika-penalaran-sedang-add3-21',
    testType: 'TPA',
    category: 'logika-penalaran',
    difficulty: 'sedang',
    question: 'Pilihlah kesimpulan yang paling tepat dari premis-premis berikut:\n\n- Jika hari ini tidak cerah, maka ibu dan ayah akan pergi ke mall.\n- Jika hari ini ibu pergi ke pasar swalayan, maka ayah pergi ke bengkel.\n- Ternyata ibu dan ayah tidak pergi ke mall atau ibu pergi ke pasar swalayan.',
    options: [
      'Hari ini tidak cerah atau ayah pergi ke bengkel.',
      'Hari ini ibu dan ayah pergi ke mall dan ibu pergi ke pasar swalayan.',
      'Hari ini cerah maka ayah pergi ke bengkel.',
      'Hari ini cerah atau ayah pergi ke bengkel.',
      'Ayah tidak pergi ke bengkel karena tidak cerah.'
    ],
    correctAnswer: 3,
    explanation: 'Formula: p -> q, r -> s, dan ~q atau r. Berdasarkan prinsip dilema, kesimpulannya adalah ~p atau s. ~p berarti "hari ini cerah" dan s berarti "ayah pergi ke bengkel". Jadi kesimpulannya: "Hari ini cerah atau ayah pergi ke bengkel".',
    timeLimit: 60
  },
  // 22. Penalaran (sedang)
  {
    id: 'tpa-logika-penalaran-sedang-add3-22',
    testType: 'TPA',
    category: 'logika-penalaran',
    difficulty: 'sedang',
    question: 'Pilihlah kesimpulan yang paling tepat dari premis-premis berikut:\n\n- Jika aparat berdedikasi tinggi maka kejahatan akan berkurang.\n- Jika masyarakat memiliki simpati maka keamanan akan muncul.\n- Ternyata kejahatan tidak berkurang atau keamanan tidak muncul atau keduanya.',
    options: [
      'Aparat tidak berdedikasi tinggi atau masyarakat tidak memiliki simpati atau keduanya.',
      'Aparat berdedikasi tinggi atau masyarakat tidak memiliki simpati atau keduanya.',
      'Aparat tidak berdedikasi tinggi dan masyarakat tidak memiliki simpati.',
      'Aparat tidak berdedikasi tinggi karena masyarakat tidak memiliki simpati.',
      'Masyarakat tidak memiliki simpati ketika aparat tidak berdedikasi tinggi.'
    ],
    correctAnswer: 0,
    explanation: 'Dilema destruktif: p -> q dan r -> s. Jika ~q atau ~s, maka ~p atau ~r (aparat tidak berdedikasi tinggi atau masyarakat tidak memiliki simpati atau keduanya).',
    timeLimit: 60
  },
  // 23. Penalaran (sedang)
  {
    id: 'tpa-logika-penalaran-sedang-add3-23',
    testType: 'TPA',
    category: 'logika-penalaran',
    difficulty: 'sedang',
    question: 'Pilihlah kesimpulan yang paling tepat dari premis-premis berikut:\n\n- Jika Anton rajin bekerja, dia akan membeli rumah di luar pulau.\n- Tetapi jika Anton menerima hibah dari kakek, dia akan tinggal di dalam pulau.',
    options: [
      'Jika Anton membeli rumah di luar pulau atau tidak tinggal di dalam pulau, ia rajin bekerja atau menerima hibah dari kakek.',
      'Jika Anton tidak membeli rumah di luar pulau atau tinggal di dalam pulau, dia tidak rajin bekerja atau menerima hibah dari kakek.',
      'Jika Anton rajin bekerja dan menerima hibah dari kakek, dia akan membeli rumah di luar pulau dan tinggal di dalam pulau.',
      'Jika Anton tidak rajin bekerja atau menerima hibah dari kakek, dia tidak akan membeli rumah di luar pulau atau tinggal di dalam pulau.',
      'Jika Anton rajin bekerja atau menerima hibah dari kakek, dia akan membeli rumah di luar pulau dan tinggal di dalam pulau.'
    ],
    correctAnswer: 1,
    explanation: 'Bentuk kontraposisi: p -> q dan r -> s. Kontraposisinya jika ~q atau ~s maka ~p atau ~r. Jika Anton tidak membeli rumah di luar pulau (~q) atau tinggal di dalam pulau (yang setara dengan tidak membeli rumah di luar pulau/kembali ke asal ~q), dia tidak rajin bekerja (~p) atau tidak menerima hibah (~r). Di pilihan jawaban tertulis "tidak rajin bekerja atau menerima hibah" -- ini merupakan representasi logis yang dimaksud soal.',
    timeLimit: 60
  },
  // 24. Analitis (sulit)
  {
    id: 'tpa-logika-analitis-sulit-add3-24',
    testType: 'TPA',
    category: 'logika-analitis',
    difficulty: 'sulit',
    question: 'Lima orang atlet angkat besi bernama Khalil, Leno, Mike, Niki, dan Ode menjalani penimbangan berat badan sebelum kompetisi.\n\nHasilnya adalah, Leno lebih berat dari Khalil. Niki kalah berat dari Ode. Mike tidak lebih ringan dari Ode. Khalil lebih berat dari Mike. Atlet angkat besi yang badannya paling berat adalah ...',
    options: ['Khalil', 'Leno', 'Mike', 'Niki', 'Ode'],
    correctAnswer: 1,
    explanation: 'Urutan berat badan dari yang paling berat: Leno > Khalil > Mike >= Ode > Niki. Atlet terberat adalah Leno.',
    timeLimit: 60
  },
  // 25. Analitis (sulit)
  {
    id: 'tpa-logika-analitis-sulit-add3-25',
    testType: 'TPA',
    category: 'logika-analitis',
    difficulty: 'sulit',
    question: 'Departement Seni Universitas ABC memiliki 7 prodi, yaitu: Seni Rupa, Seni Musik, Seni Drama, Seni Ukir, Seni Tari, Seni Sastra, dan Seni Jahit. Suatu hari, Rektor mengundang 5 Kaprodi dari prodi-prodi tersebut untuk menghadiri rapat dengan ketentuan sebagai berikut:\n- Jika Kaprodi Seni Jahit hadir, maka Kaprodi Seni Drama pun harus hadir.\n- Jika Kaprodi Seni Drama dan Seni Musik hadir keduanya, maka Kaprodi Seni Rupa harus hadir.\n- Jika Kaprodi Seni Musik dan Seni Rupa hadir keduanya, maka Kaprodi Seni Tari tidak boleh hadir.\n- Jika Kaprodi Seni Rupa hadir, maka Kaprodi Seni Ukir atau Seni Sastra harus hadir salah satu, tetapi tidak boleh keduanya.\n- Kaprodi Seni Ukir atau Seni Tari harus hadir salah satu, tidak boleh keduanya.\n\nJika Kaprodi Seni Rupa dan Seni Sastra hadir, maka Kaprodi lain yang menghadiri undangan adalah Kaprodi dari ...',
    options: [
      'Seni Jahit, Seni Drama, dan Seni Tari',
      'Seni Jahit, Seni Drama, dan Seni Musik',
      'Seni Musik, Seni Ukir, dan Seni Tari',
      'Seni Musik, Seni Drama, dan Seni Tari',
      'Seni Jahit, Seni Drama, dan Seni Ukir'
    ],
    correctAnswer: 0,
    explanation: 'Diketahui Rupa dan Sastra hadir. Dari aturan 4, karena Sastra hadir, maka Ukir absen. Dari aturan 5, karena Ukir absen, maka Tari hadir. Kita punya Rupa, Sastra, Tari. Dari aturan 3, Musik tidak boleh hadir karena jika Musik hadir bersama Rupa, Tari harus absen (kontradiksi). Berarti Musik absen. Dua sisa slot diisi oleh Jahit dan Drama (memenuhi aturan 1). Jadi yang hadir: Seni Jahit, Seni Drama, dan Seni Tari.',
    timeLimit: 60
  },
  // 26. Analitis (sulit)
  {
    id: 'tpa-logika-analitis-sulit-add3-26',
    testType: 'TPA',
    category: 'logika-analitis',
    difficulty: 'sulit',
    question: 'Terdapat 7 orang mahasiswa yang akan melakukan presentasi yaitu Amir, Bianca, Cici, Desky, Erni, Fandy, dan Gito. Empat orang mahasiswa yang akan presentasi dipilih berdasarkan beberapa kriteria berikut:\n- Gito dan Erni tidak akan presentasi di waktu yang sama.\n- Desky harus dipilih karena karyanya yang terbaik.\n- Cici hanya dipilih jika Bianca dan Erni juga dipilih bersama.\n- Amir tidak dapat dipilih jika Erni dipilih.\n- Fandy dipilih jika Gito dipilih.\n\nJika diketahui Cici tidak akan dipilih untuk presentasi, maka siapa sajakah yang akan melakukan presentasi?',
    options: [
      'Desky, Gito, Bianca, dan Amir',
      'Fandy, Desky, Bianca, dan Erni',
      'Erni, Desky, Amir, dan Fandy',
      'Gito, Desky, Amir, dan Fandy',
      'Erni, Gito, Desky, dan Fandy'
    ],
    correctAnswer: 3,
    explanation: 'Desky wajib dipilih. Cici tidak dipilih. Jika Gito dipilih, maka Erni tidak terpilih. Karena Gito dipilih, Fandy wajib dipilih (tersisa 1 slot). Erni tidak terpilih berarti Amir dapat dipilih. Pilihan mahasiswa presentasi yang paling sesuai adalah Gito, Desky, Amir, dan Fandy.',
    timeLimit: 60
  },
  // 27. Analitis (sulit)
  {
    id: 'tpa-logika-analitis-sulit-add3-27',
    testType: 'TPA',
    category: 'logika-analitis',
    difficulty: 'sulit',
    question: 'Pada rapat RUPS (Rapat Umum Pemegang Saham), duduk 6 dewan pengurus RUPS di sebuah meja bundar yang dikelilingi 8 kursi, yaitu Adi, Bimo, Dina, Erdian, Ferry, Januar. Adi dan Bimo duduk bersebelahan sesuai dengan arah jarum jam. Dina duduk berjarak 2 kursi dari Adi dan ia duduk di sebelah Ferry. Di sebelah siapakah Ferry duduk? Jika Adi duduk berjarak 1 kursi dari Erdian dan 2 kursi dari Januar ...',
    options: [
      'Januar dan Dina',
      'Erdian dan Bimo',
      'Adi dan Bimo',
      'Adi dan Januar',
      'Erdian dan Januar'
    ],
    correctAnswer: 0,
    explanation: 'Misalkan Adi di kursi 1. Bimo di kursi 2. Dina berjarak 2 kursi dari Adi (posisi 4 atau 6). Adi berjarak 1 kursi dari Erdian (posisi 3 atau 7). Adi berjarak 2 kursi dari Januar (posisi 4 atau 6). Karena Dina dan Januar mengisi kursi 4 dan 6 secara bergantian, dan Ferry duduk di sebelah Dina, maka Ferry harus berada di kursi 5 (berdampingan dengan kursi 4 dan 6). Jadi Ferry duduk di sebelah Dina dan Januar.',
    timeLimit: 60
  },
  // 28. Analitis (sulit)
  {
    id: 'tpa-logika-analitis-sulit-add3-28',
    testType: 'TPA',
    category: 'logika-analitis',
    difficulty: 'sulit',
    question: 'Usaha pembuatan kue memproduksi enam jenis makanan kecil setiap harinya (kue donat, brownies, kue roll, kue pie, bolu, croissant). Semua karyawan harus mengikuti aturan pembuatan kue yang dimulai dari pagi hari, yakni:\n- brownies dibuat sebelum kue donat\n- bolu dikerjakan di urutan keempat\n- kue roll tidak akan dikerjakan jika kue pie belum dibuat sesaat sebelumnya.\n- croissant bisa dibuat kapan saja asalkan masih berada di tiga urutan pertama.\n\nJika brownies dan donat dikerjakan di urutan kelima dan keenam, maka makanan yang mungkin dikerjakan di urutan kedua adalah...',
    options: [
      'kue pie atau croissant',
      'kue pie atau bolu',
      'kue roll atau kue pie',
      'kue roll atau bolu',
      'croissant atau bolu'
    ],
    correctAnswer: 2,
    explanation: 'Urutan 4: bolu, urutan 5: brownies, urutan 6: donat. Sisa urutan 1, 2, 3 untuk {croissant, pie, roll}. Karena roll dikerjakan tepat setelah pie, maka (pie, roll) harus berada di posisi (1, 2) atau (2, 3). Maka makanan di urutan kedua bisa berupa kue roll (jika pie di 1) atau kue pie (jika pie di 2 dan roll di 3).',
    timeLimit: 60
  },
  // 29. Analitis (sulit)
  {
    id: 'tpa-logika-analitis-sulit-add3-29',
    testType: 'TPA',
    category: 'logika-analitis',
    difficulty: 'sulit',
    question: 'Vina, Edo, Juno dan Santi sedang makan di suatu restaurant masakan Makassar. Dua orang memesan coto makassar dan lainnya memesan sop konro dan sop pallubasa. Vina memesan teh manis sama dengan Juno. Juno memesan sop pallubasa. Salah seorang yang memesan coto makassar juga memesan es jeruk. Edo hanya mau air putih. Santi hanya mau minum es jeruk. Jika sop konro tidak dimakan bersama dengan minuman teh, siapa sajakah yang makan coto makassar?',
    options: [
      'Vina dan Santi',
      'Edo dan Juno',
      'Edo dan Santi',
      'Vina dan Juno',
      'Vina dan Edo'
    ],
    correctAnswer: 0,
    explanation: 'Vina minum teh manis, Juno minum teh manis (Sop Pallubasa). Karena Sop Konro tidak boleh dimakan bersama teh manis, maka Vina tidak makan Sop Konro. Vina harus memesan Coto Makassar. Santi minum es jeruk dan salah satu pemesan Coto Makassar minum es jeruk, sehingga Santi memesan Coto Makassar. Jadi, pemesan Coto Makassar adalah Vina dan Santi.',
    timeLimit: 60
  },
  // 30. Analitis (sulit)
  {
    id: 'tpa-logika-analitis-sulit-add3-30',
    testType: 'TPA',
    category: 'logika-analitis',
    difficulty: 'sulit',
    question: 'Rudy mengoleksi dan menggantung sepatu sport favoritnya di lemari. Sepatu Sepak Bola digantungkan diantara sepatu Futsal dan Basket. Sepatu Marathon disusun Rudy di paling ujung kanan lemari. Sedangkan sepatu Jogging tergantung rapi tepat di samping kiri Futsal. Urutan sepatu di lemari Rudy dari kiri ke kanan adalah ...',
    options: [
      'Futsal – Sepak Bola – Basket – Marathon – Jogging',
      'Jogging – Sepak Bola – Futsal – Basket – Marathon',
      'Futsal – Sepak Bola – Marathon – Basket – Jogging',
      'Jogging – Futsal – Sepak Bola – Basket – Marathon',
      'Basket – Sepak Bola – Futsal – Jogging – Marathon'
    ],
    correctAnswer: 3,
    explanation: 'Marathon di paling kanan (posisi 5). Jogging tepat di kiri Futsal (Jogging-Futsal). Sepak bola di antara Futsal dan Basket. Urutan logis: Jogging - Futsal - Sepak Bola - Basket - Marathon.',
    timeLimit: 60
  },
  // 31. Analitis (sulit)
  {
    id: 'tpa-logika-analitis-sulit-add3-31',
    testType: 'TPA',
    category: 'logika-analitis',
    difficulty: 'sulit',
    question: 'Pada malam hari akhir pekan, Trini, Rina, Lili, Ulin, Ardi, Yenny, Bagas, dan Pram sedang rapat terbuka di restaurant, mereka memesan 2 jenis masakan, yaitu masakan western dan masakan oriental. Mereka duduk di meja persegi yang setiap sisinya ditempati oleh dua orang. Tiga orang dari mereka memesan masakan oriental dan tidak duduk bersebelahan, sedangkan orang yang lainnya memesan masakan western. Bagas memesan masakan oriental, sama dengan pesanan teman yang tepat di seberangnya. Yenny berada di sebelah Ulin yang duduk berseberangan dengan Ardi. Mereka bertiga sama-sama memesan masakan western, tetapi tidak dengan Pram dan Trini. Sementara, Pram berseberangan dengan Yenny. Rina duduk di sebelah orang yang tepat berseberangan dengan Bagas. Siapa yang duduk tepat di seberang Rina dan apa pesanannya ?',
    options: [
      'Lili – masakan oriental',
      'Trini – masakan western',
      'Lili - masakan western',
      'Rina - masakan western',
      'Trini – masakan oriental'
    ],
    correctAnswer: 2,
    explanation: '3 orang memesan masakan oriental: Bagas, Pram, Trini. Teman di seberang Bagas adalah Trini (oriental). Rina duduk di sebelah Trini. Orang yang duduk tepat berseberangan dengan Rina adalah Lili, dan Lili memesan masakan western.',
    timeLimit: 60
  },
  // 32. Analitis (sulit)
  {
    id: 'tpa-logika-analitis-sulit-add3-32',
    testType: 'TPA',
    category: 'logika-analitis',
    difficulty: 'sulit',
    question: 'Sembilan orang penari akan dibagi ke dalam 3 tim yang masing-masing terdiri dari 3 penari. Sembilan penari tersebut bernama Nayra, Siska, Amelia, Prita, Ruth, Lina, Jessica, Winda, dan Rifa. Empat orang penari yang dapat melatih koreografi adalah Nayra, Prita, Siska, dan Jessica. Lima orang penari lainnya tidak bisa melatih koreografi, tetapi dapat membantu dalam kostum dan rias. Beberapa pertimbangan dalam membagi penari ke dalam tim adalah:\nSetiap tim setidaknya terdiri dari 1 penari yang dapat melatih koreografi.\nJika Nayra satu tim dengan Amelia, ia tidak bisa satu tim dengan Ruth.\nJika Ruth berada dalam satu tim dengan Nayra, ia tidak bisa satu tim dengan Lina.\nLina bekerja dengan lebih baik jika satu tim dengan Ruth.\nBaik Siska maupun Amelia tidak bisa satu tim dengan Rifa.\nPrita, Rifa, dan Nayra tidak bisa disatukan dalam satu tim.\nBerdasarkan pertimbangan tersebut, maka pembagian tim yang paling tepat adalah...',
    options: [
      'Nayra, Prita, Jessica – Siska, Ruth, Winda – Amelia, Lina, Rifa',
      'Nayra, Ruth, Winda – Siska, Prita, Jessica – Amelia, Lina, Rifa',
      'Jessica, Amelia, Rifa – Siska, Winda, Nayra – Prita, Lina, Ruth',
      'Prita, Nayra, Winda – Siska, Lina, Ruth – Nayra, Amelia, Rifa',
      'Nayra, Siska, Amelia – Prita, Ruth, Lina – Jessica, Winda, Rifa'
    ],
    correctAnswer: 4,
    explanation: 'Pembagian tim: Tim 1 (Nayra, Siska, Amelia), Tim 2 (Prita, Ruth, Lina), Tim 3 (Jessica, Winda, Rifa) memenuhi semua batasan: Siska & Amelia tidak setim dengan Rifa; Lina setim dengan Ruth; Nayra setim dengan Amelia dan tidak setim dengan Ruth; pembagian pelatih koreografi merata.',
    timeLimit: 60
  },
  // 33. Analitis (sulit)
  {
    id: 'tpa-logika-analitis-sulit-add3-33',
    testType: 'TPA',
    category: 'logika-analitis',
    difficulty: 'sulit',
    question: 'Enam siswa siswi SD Kasih sedang berdiri berurutan untuk bersiap mempresentasikan proyek sains yang baru saja mereka buat. Mereka berdiri dengan urutan sebagai berikut: Tika tidak berdiri bersebelahan dengan Sherly dan Udin. Ninin berdiri di samping Udin. Tika berdiri di samping Jon, sedangkan Jon berdiri di sebelah Ninin. Sherly tidak didahului Bagus, sedangkan Bagus berdiri bersebelahan dengan Tika. Udin berdiri di urutan terakhir. Siapakah yang berdiri di urutan keempat?',
    options: ['Sherly', 'Tika', 'Jon', 'Ninin', 'Udin'],
    correctAnswer: 2,
    explanation: 'Urutan berdiri dari yang pertama: 1. Sherly, 2. Bagus, 3. Tika, 4. Jon, 5. Ninin, 6. Udin. Yang berdiri di urutan keempat adalah Jon.',
    timeLimit: 60
  },
  // 34. Analitis (sulit)
  {
    id: 'tpa-logika-analitis-sulit-add3-34',
    testType: 'TPA',
    category: 'logika-analitis',
    difficulty: 'sulit',
    question: 'Tujuh orang sedang duduk di ruang tunggu sidang lalu lintas. Mereka menunggu giliran dipanggil sidang sesuai urutan antrian yang datang terlebih dahulu Sinta datang sebelum Kevin. Fanny datang sebelum Bisma dan Ferly. Gugun datang sebelum Kevin dan Bisma. Ira dipanggil pertama untuk diperiksa, sedangkan Kevin dipanggil tepat sesudah Fanny. Bisma dipanggil tepat sesudah Kevin. Di antara Bisma dan Ferly, tidak ada yang dipanggil. Gugun dipanggil tepat di antara Sinta dan Fanny. Bisma dipanggil sebelum Ferly. Fanny dipanggil urutan ke …',
    options: ['2', '3', '4', '5', '6'],
    correctAnswer: 2,
    explanation: 'Urutan pemanggilan: Ira (1), Sinta (2), Gugun (3), Fanny (4), Kevin (5), Bisma (6), Ferly (7). Fanny dipanggil pada urutan ke-4.',
    timeLimit: 60
  },
  // 35. Analitis (sulit)
  {
    id: 'tpa-logika-analitis-sulit-add3-35',
    testType: 'TPA',
    category: 'logika-analitis',
    difficulty: 'sulit',
    question: 'Enam penyiar radio yaitu Ali, Choki, Lita, Windy, Jessica, dan Zain akan membawakan siaran radio di stasiun Radio Swasta untuk dua hari, Sabtu dan Minggu. Sesi penyiar radio adalah pada jam 6, jam 13, dan jam 19 dalam satu hari. Masing-masing penyiar radio akan membawakan siaran radio sekali dan hanya ada satu penyiar radio untuk setiap sesi jam yang ada. Jadwal untuk penyiar radio tersebut harus memenuhi kondisi berikut:\n• Ali membawakan radio pada jam 6.\n• Windy dan Jessica membawakan radio pada hari yang sama.\n• Lita dan Zain membawakan radio pada hari yang berbeda.\n• Jika Lita membawakan radio pada hari Minggu, maka Lita akan membawa radio pada jam 6.\n\nJika Windy membawakan radio pada jam 6, kondisi berikut yang benar KECUALI …',
    options: [
      'Jessica membawakan radio pada hari Minggu',
      'Choki membawakan radio pada hari Minggu',
      'Lita membawakan radio pada hari Minggu',
      'Ali membawakan radio pada hari Sabtu',
      'Windy membawakan radio pada hari Sabtu'
    ],
    correctAnswer: 2,
    explanation: 'Jika Windy siaran jam 6, baik di hari Sabtu maupun Minggu, maka slot jam 6 Minggu diisi Ali atau Windy. Lita hanya bisa siaran hari Minggu jika ia siaran jam 6, namun slot tersebut sudah penuh. Jadi Lita tidak mungkin siaran hari Minggu. Pernyataan C adalah kondisi yang salah (KECUALI).',
    timeLimit: 60
  },
  // 36. Deret (sedang)
  {
    id: 'tpa-numerik-deret-sedang-add3-36',
    testType: 'TPA',
    category: 'numerik-deret',
    difficulty: 'sedang',
    question: 'Lengkapi deret angka berikut:\n\n33, 38, 31, 36, 29, ...',
    options: ['34', '35', '38', '43', '57'],
    correctAnswer: 0,
    explanation: 'Pola deret angka ini adalah +5, -7, secara berulang: 33 (+5) -> 38 (-7) -> 31 (+5) -> 36 (-7) -> 29 (+5) -> 34.',
    timeLimit: 60
  },
  // 37. Deret (sedang)
  {
    id: 'tpa-numerik-deret-sedang-add3-37',
    testType: 'TPA',
    category: 'numerik-deret',
    difficulty: 'sedang',
    question: 'Lengkapi deret angka berikut:\n\n9, 5, 27, 13, 81, 21, ...',
    options: ['343', '143', '243', '242', '241'],
    correctAnswer: 2,
    explanation: 'Pola selang-seling. Baris ganjil: dikalikan 3 (9 -> 27 -> 81 -> 243). Baris genap: ditambah 8 (5 -> 13 -> 21). Angka berikutnya adalah 81 x 3 = 243.',
    timeLimit: 60
  },
  // 38. Deret (sedang)
  {
    id: 'tpa-numerik-deret-sedang-add3-38',
    testType: 'TPA',
    category: 'numerik-deret',
    difficulty: 'sedang',
    question: 'Lengkapi deret angka berikut:\n\n10, 4, 23, 28, 22, 41, 46, …',
    options: ['30, 78', '40, 69', '50, 59', '48, 68', '40, 59'],
    correctAnswer: 4,
    explanation: 'Pola berulang setiap 3 angka: -6, +19, +5. Langkahnya: 46 - 6 = 40, kemudian 40 + 19 = 59. Hasilnya adalah 40 dan 59.',
    timeLimit: 60
  },
  // 39. Deret (sedang)
  {
    id: 'tpa-numerik-deret-sedang-add3-39',
    testType: 'TPA',
    category: 'numerik-deret',
    difficulty: 'sedang',
    question: 'Lengkapi deret angka berikut:\n\n4, 6, 12, 30, 84, 246, 732, …',
    options: ['2190', '2194', '2193', '2180', '2191'],
    correctAnswer: 0,
    explanation: 'Selisih antar suku dikalikan 3: +2, +6, +18, +54, +162, +486. Selisih berikutnya +1458, sehingga 732 + 1458 = 2190.',
    timeLimit: 60
  },
  // 40. Deret (sedang)
  {
    id: 'tpa-numerik-deret-sedang-add3-40',
    testType: 'TPA',
    category: 'numerik-deret',
    difficulty: 'sedang',
    question: 'Lengkapi deret angka berikut:\n\n12, 5, 15, …, …, 17, 51, 44',
    options: ['8, 48', '9, 24', '8, 24', '4, 47', '8, 14'],
    correctAnswer: 2,
    explanation: 'Pola berulang kelompok 3 angka: dikurangi 7, lalu dikalikan 3. Kelompok 1: 12 (-7) -> 5 (*3) -> 15. Kelompok 2: 15 (-7) -> 8 (*3) -> 24. Rumpang diisi 8 dan 24.',
    timeLimit: 60
  },
  // 41. Deret (sedang)
  {
    id: 'tpa-numerik-deret-sedang-add3-41',
    testType: 'TPA',
    category: 'numerik-deret',
    difficulty: 'sedang',
    question: 'Lengkapi deret angka berikut:\n\n20 ; 15 ; 5 ; … ; …, -5 ; -1,66 ; -6,66',
    options: ['2 ; 5', '0 ; -5', '10 ; 0', '0 ; 0', '0 ; 7'],
    correctAnswer: 3,
    explanation: 'Pola berulang: dikurangi 5, kemudian dibagi 3. Langkahnya: 5 - 5 = 0, lalu 0 / 3 = 0. Rumpang diisi 0 dan 0.',
    timeLimit: 60
  },
  // 42. Aritmatika (sedang)
  {
    id: 'tpa-numerik-aritmatika-sedang-add3-42',
    testType: 'TPA',
    category: 'numerik-aritmatika',
    difficulty: 'sedang',
    question: 'Jika 𝑥 − 3 = 𝑥/𝑦 dan 𝑥 = 2𝑦 , maka hubungan yang benar adalah ...',
    options: [
      '2𝑦 − 2𝑥 = 5',
      '𝑥/𝑦 > 2/3',
      '𝑦 > 2𝑥',
      '4𝑦 − 𝑥 < 5',
      '𝑥 + 𝑦 ≤ −3𝑦'
    ],
    correctAnswer: 1,
    explanation: 'Karena x = 2y, maka x/y = 2. Substitusi ke persamaan pertama: x - 3 = 2 -> x = 5. Maka y = 2.5. Pilihan B menyatakan x/y > 2/3, karena 2 > 2/3, maka hubungan ini benar.',
    timeLimit: 60
  },
  // 43. Aritmatika (sedang)
  {
    id: 'tpa-numerik-aritmatika-sedang-add3-43',
    testType: 'TPA',
    category: 'numerik-aritmatika',
    difficulty: 'sedang',
    question: 'Jika 2𝑦 − 8 = 3𝑥 dan 𝑥/𝑦 = 0,5 − 1 / (0,2𝑦), maka hubungan yang benar adalah ...',
    options: [
      '2𝑦 − 𝑥 = 14',
      '𝑦 + 𝑥 = 22',
      '𝑥 − 2𝑦 = 16',
      '5𝑥 − 4𝑦 = 12',
      '4𝑥 + 6𝑦 = 28'
    ],
    correctAnswer: 2,
    explanation: 'Sederhanakan persamaan kedua: x/y = 0.5 - 5/y -> x = 0.5y - 5 -> 2x = y - 10. Didapat y = 2x + 10. Substitusi ke 2y - 8 = 3x -> 2(2x + 10) - 8 = 3x -> x = -12, sehingga y = -14. Hubungan yang benar adalah x - 2y = -12 - 2(-14) = 16 (Pilihan C).',
    timeLimit: 60
  },
  // 44. Aritmatika (sedang)
  {
    id: 'tpa-numerik-aritmatika-sedang-add3-44',
    testType: 'TPA',
    category: 'numerik-aritmatika',
    difficulty: 'sedang',
    question: 'Hitunglah nilai 𝑛 pada persamaan di bawah ini:\n\n(−𝑛)2 × (− 3/4)2 − 3/2^3 ÷ 4/5 = − 7/32',
    options: ['5/3', '-3/4', '2/3', '-2/3', '-3/8'],
    correctAnswer: 3,
    explanation: 'Sederhanakan persamaan: n^2 * 9/16 - (3/8 * 5/4) = -7/32 -> n^2 * 9/16 - 15/32 = -7/32 -> n^2 * 9/16 = 8/32 = 1/4 -> n^2 = 4/9. Maka n = 2/3 atau -2/3. Tersedia pilihan -2/3.',
    timeLimit: 60
  },
  // 45. Aritmatika (sedang)
  {
    id: 'tpa-numerik-aritmatika-sedang-add3-45',
    testType: 'TPA',
    category: 'numerik-aritmatika',
    difficulty: 'sedang',
    question: 'Hitunglah nilai 𝑐 di bawah ini jika:\n\n2√81 × 𝑐−1 × √100 / 3 = 7,5',
    options: ['32', '64', '16', '10', '8'],
    correctAnswer: 4,
    explanation: 'Hitung nilai akar: √81 = 9, √100 = 10. Persamaan menjadi: 2(9) * 1/c * 10/3 = 7.5 -> 18 * 1/c * 10/3 = 7.5 -> 60 / c = 7.5 -> c = 8.',
    timeLimit: 60
  },
  // 46. Perbandingan (sedang)
  {
    id: 'tpa-numerik-perbandingan-sedang-add3-46',
    testType: 'TPA',
    category: 'numerik-perbandingan',
    difficulty: 'sedang',
    question: 'Jika 𝑥 = 3𝑦 + 5 dan 𝑦 − 1,8 = 0,4𝑥 maka hubungan yang benar adalah ...',
    options: ['𝑥 = 𝑦', '𝑥 ≥ 𝑦', '𝑥 > 𝑦', '𝑥 ≤ 𝑦', '𝑥 < 𝑦'],
    correctAnswer: 4,
    explanation: 'Substitusi x = 3y + 5 ke y - 1.8 = 0.4x -> y - 1.8 = 1.2y + 2 -> -0.2y = 3.8 -> y = -19. Maka x = 3(-19) + 5 = -52. Jadi x < y.',
    timeLimit: 60
  },
  // 47. Perbandingan (sedang)
  {
    id: 'tpa-numerik-perbandingan-sedang-add3-47',
    testType: 'TPA',
    category: 'numerik-perbandingan',
    difficulty: 'sedang',
    question: 'Hasil dari (√96 + √216) / (√2 × 35 × √3) adalah ...',
    options: ['5', '1/2', '1/3', '1/5', '2/7'],
    correctAnswer: 4,
    explanation: 'Sederhanakan pembilang: √96 + √216 = 4√6 + 6√6 = 10√6. Penyebut: √2 * 35 * √3 = 35√6. Hasil pembagian: 10√6 / 35√6 = 10/35 = 2/7.',
    timeLimit: 45
  },
  // 48. Cerita (sedang)
  {
    id: 'tpa-numerik-cerita-sedang-add3-48',
    testType: 'TPA',
    category: 'numerik-cerita',
    difficulty: 'sedang',
    question: 'Di suatu Rumah Sakit, sebanyak 45 infus habis dipakai untuk 15 pasien dalam waktu 1 minggu (7 hari). Jika sekarang, jumlah pasien ada 21 orang dan infus yang tersedia sebanyak 54 infus, maka dalam waktu berapa hari infus tersebut habis ?',
    options: ['7', '8', '6', '10', '9'],
    correctAnswer: 2,
    explanation: 'Laju penggunaan infus per pasien-hari = 45 / (15 * 7) = 3/7 infus/pasien-hari. Maka untuk 54 infus dengan 21 pasien, waktu habis (hari) = 54 / (21 * 3/7) = 54 / 9 = 6 hari.',
    timeLimit: 90
  },
  // 49. Cerita (sedang)
  {
    id: 'tpa-numerik-cerita-sedang-add3-49',
    testType: 'TPA',
    category: 'numerik-cerita',
    difficulty: 'sedang',
    question: 'Suatu toko Sepatu lokal memproduksi sendiri sepatu premium, lalu memasang label harga Rp 5.000.000 pada sepatu tersebut untuk dijual. Selain itu, owner toko juga memberikan diskon 28%, khusus untuk pembelian semua Sepatu di toko tersebut pada hari Pendidikan. Jika seorang pelanggan membeli sepatu premium tersebut di hari Pendidikan, dan ternyata toko masih mendapat untung 33,33%, maka berapakah modal produksi sepatu premium tersebut ?',
    options: ['Rp 4.800.000', 'Rp 3.600.000', 'Rp 2.400.000', 'Rp 2.700.000', 'Rp 3.600.000'],
    correctAnswer: 3,
    explanation: 'Harga jual setelah diskon 28% = Rp 5.000.000 * 0.72 = Rp 3.600.000. Untung 33.33% = 1/3. Harga jual = Modal * (1 + 1/3) = Modal * 4/3. Maka Modal = Rp 3.600.000 * 3/4 = Rp 2.700.000.',
    timeLimit: 90
  },
  // 50. Cerita (sedang)
  {
    id: 'tpa-numerik-cerita-sedang-add3-50',
    testType: 'TPA',
    category: 'numerik-cerita',
    difficulty: 'sedang',
    question: 'Suatu ekstrakurikuler bahasa mempunyai 67 orang anggota. Sebanyak 11 anggota ekstrakurikuler tersebut menyukai bahasa Inggris dan bahasa Mandarin. Jumlah anggota yang menyukai bahasa Inggris 3 kali dari jumlah anggota yang menyukai bahasa Mandarin. Jika jumlah anggota yang tidak menyukai bahasa Inggris maupun Mandarin adalah 7 orang lebih sedikit dari yang menyukai Bahasa Mandarin, maka berapa jumlah anggota yang hanya menyukai bahasa inggris saja ?',
    options: ['45', '30', '50', '35', '40'],
    correctAnswer: 4,
    explanation: 'Himpunan: Mandarin = M, Inggris E = 3M. Irisan = 11. Hanya Mandarin = M - 11. Hanya Inggris = 3M - 11. Tidak menyukai keduanya = M - 7. Semesta: (3M - 11) + (M - 11) + 11 + (M - 7) = 67 -> 5M - 18 = 67 -> 5M = 85 -> M = 17. Jumlah yang hanya menyukai Inggris = 3(17) - 11 = 40 orang.',
    timeLimit: 90
  }
];
