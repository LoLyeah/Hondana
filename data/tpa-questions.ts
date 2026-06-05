import { Question, TPACategory, Difficulty } from '../lib/types';
import { figuralPatterns } from './figural-patterns';
import { additionalTPAQuestions3 } from './tpa-questions-add3';

const TPA_PASSAGES = {
  p1: 'Indonesia merupakan produsen nikel terbesar di dunia. Pada tahun 2023, produksi nikel olahan Indonesia mencapai 1,8 juta metrik ton, atau sekitar 50% dari total pasokan dunia. Peningkatan ini didorong oleh masifnya investasi fasilitas pengolahan (smelter) nikel semenjak larangan ekspor bijih nikel mentah diberlakukan pada tahun 2020. Meskipun meningkatkan devisa negara secara signifikan, industri pengolahan nikel ini menuai tantangan lingkungan berupa pembuangan limbah tambang dan emisi karbon tinggi dari smelter bertenaga batubara captive.',
  p2: 'Perkembangan kecerdasan buatan (AI) di sektor pendidikan telah membawa transformasi yang signifikan dalam metode pembelajaran. Melalui platform adaptif berbasis AI, kurikulum dapat dipersonalisasi sesuai dengan kecepatan belajar masing-masing siswa. Sistem dapat mendeteksi kelemahan pemahaman konsep dan memberikan rekomendasi materi pengayaan secara otomatis. Namun, integrasi teknologi ini memicu perdebatan mengenai peran guru manusia. Pengamat menekankan bahwa AI tidak akan pernah bisa menggantikan empati, bimbingan moral, dan ikatan emosional yang diberikan oleh pendidik. Kekhawatiran lain meliputi kesenjangan digital di daerah terpencil yang belum terjangkau akses internet memadai serta potensi penurunan kemampuan berpikir kritis jika siswa terlalu bergantung pada jawaban instan dari asisten AI.',
  p3: 'Transisi menuju energi hijau menjadi agenda krusial global guna menekan laju krisis iklim. Target utama transisi ini adalah menghentikan operasional pembangkit listrik berbahan bakar fosil, khususnya batubara, dan menggantikannya dengan sumber energi terbarukan seperti tenaga surya, angin, dan panas bumi. Hambatan terbesar proses ini adalah tingginya investasi awal infrastruktur energi bersih serta kestabilan pasokan listrik intermiten (tidak konsisten) dari panel surya and kincir angin. Untuk mengatasinya, teknologi penyimpanan baterai skala besar mulai dikembangkan. Di samping itu, negara berkembang memerlukan bantuan pendanaan iklim dari negara-negara maju yang secara historis merupakan penyumbang emisi karbon terbesar di bumi agar transisi berjalan secara adil.',
};

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
    { q: 'AKSELERASI', opts: ['Pemberhentian', 'Percepatan', 'Perlambatan', 'Kemajuan', 'Peralihan'], ans: 1, exp: 'Sinonim AKSELERASI adalah Percepatan.' },
    { q: 'KONSENSUS', opts: ['Kesepakatan', 'Pertikaian', 'Perbedaan', 'Ketidakpastian', 'Keputusan'], ans: 0, exp: 'Sinonim KONSENSUS adalah Kesepakatan bersama.' },
    { q: 'AMBIGU', opts: ['Jelas', 'Taksa / Mendua', 'Pasti', 'Tegas', 'Nyata'], ans: 1, exp: 'Sinonim AMBIGU adalah bermakna ganda atau taksa.' },
    { q: 'KOGNITIF', opts: ['Emosional', 'Intelektual', 'Motorik', 'Sosial', 'Fisik'], ans: 1, exp: 'Sinonim KOGNITIF adalah segala hal yang berhubungan dengan Intelektual atau pikiran.' },
    { q: 'PERSUASIF', opts: ['Memaksa', 'Membujuk', 'Melarang', 'Menentang', 'Menolak'], ans: 1, exp: 'Sinonim PERSUASIF adalah bersifat membujuk atau meyakinkan secara halus.' },
    { q: 'INISIATIF', opts: ['Prakarsa', 'Tiruan', 'Ikut-ikutan', 'Pemberhentian', 'Rencana'], ans: 0, exp: 'Sinonim INISIATIF adalah Prakarsa atau langkah pertama.' },
    { q: 'ALTRUISME', opts: ['Kedermawanan / Filantropi', 'Keserakahan', 'Egoisme', 'Individualisme', 'Kebencian'], ans: 0, exp: 'Sinonim ALTRUISME adalah sifat kedermawanan atau mengutamakan kepentingan orang lain.' },
    { q: 'DEDUKSI', opts: ['Penambahan', 'Induksi', 'Penarikan Kesimpulan', 'Pengurangan', 'Penyimpulan Khusus'], ans: 2, exp: 'Sinonim DEDUKSI adalah Penarikan kesimpulan dari keadaan yang umum.' },
    { q: 'EMPATI', opts: ['Kebencian', 'Ketidakpedulian', 'Tenggang Rasa / Simpati', 'Kemarahan', 'Kesedihan'], ans: 2, exp: 'Sinonim EMPATI adalah Tenggang rasa atau keadaan mental merasa sepaham dengan orang lain.' },
    { q: 'DEGRADASI', opts: ['Kemajuan', 'Penurunan / Kemunduran', 'Elevasi', 'Kestabilan', 'Peningkatan'], ans: 1, exp: 'Sinonim DEGRADASI adalah Penurunan pangkat, mutu, atau kemunduran.' },
    { q: 'SKEPTIS', opts: ['Yakin', 'Ragu-ragu', 'Optimis', 'Percaya', 'Pasrah'], ans: 1, exp: 'Sinonim SKEPTIS adalah Ragu-ragu atau kurang percaya.' },
    { q: 'KOLABORASI', opts: ['Persaingan', 'Kerja Sama', 'Perpisahan', 'Pembagian', 'Kemandirian'], ans: 1, exp: 'Sinonim KOLABORASI adalah Kerja sama atau kolaborasi.' },
    { q: 'KLASIFIKASI', opts: ['Pengelompokan', 'Pencampuran', 'Pemisahan', 'Penggabungan', 'Penguraian'], ans: 0, exp: 'Sinonim KLASIFIKASI adalah Pengelompokan sistematik berdasarkan aturan.' },
    { q: 'ASIMILASI', opts: ['Pemisahan', 'Peleburan / Penyesuaian', 'Perbedaan', 'Pertentangan', 'Pengabaian'], ans: 1, exp: 'Sinonim ASIMILASI adalah Peleburan atau penyesuaian sifat asli dengan lingkungan sekitar.' },
    { q: 'DOMINAN', opts: ['Lemah', 'Seimbang', 'Unggul / Berkuasa', 'Pasif', 'Sama'], ans: 2, exp: 'Sinonim DOMINAN adalah Unggul, menonjol, atau paling berkuasa.' },
    { q: 'FLUKTUASI', opts: ['Kestabilan', 'Gejolak / Naik-Turun', 'Penurunan', 'Kenaikan', 'Keheningan'], ans: 1, exp: 'Sinonim FLUKTUASI adalah Gejolak atau keadaan yang tidak tetap (naik-turun).' },
    { q: 'SIGNIFIKAN', opts: ['Berarti / Penting', 'Sepele', 'Kecil', 'Sembarangan', 'Tidak jelas'], ans: 0, exp: 'Sinonim SIGNIFIKAN adalah Berarti, penting, atau bermakna besar.' },
    { q: 'TENTATIF', opts: ['Pasti', 'Belum Pasti / Sementara', 'Mutlak', 'Tetap', 'Jelas'], ans: 1, exp: 'Sinonim TENTATIF adalah belum pasti atau masih bersifat sementara.' },
    { q: 'KATEGORI', opts: ['Pengecualian', 'Golongan / Klasifikasi', 'Perbedaan', 'Bagian', 'Kelompok Kecil'], ans: 1, exp: 'Sinonim KATEGORI adalah Golongan atau kelompok klasifikasi.' },
    { q: 'EFEKTIF', opts: ['Boros', 'Lambat', 'Tepat Guna / Manjur', 'Sulit', 'Sederhana'], ans: 2, exp: 'Sinonim EFEKTIF adalah Tepat guna, manjur, atau membawa efek yang diinginkan.' },
    { q: 'INOVASI', opts: ['Kuno', 'Kemunduran', 'Pembaruan', 'Keajegan', 'Tiruan'], ans: 2, exp: 'Sinonim INOVASI adalah Pembaruan atau penemuan hal baru.' }
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
    { q: 'SKEPTIS', opts: ['Ragu-ragu', 'Yakin', 'Optimis', 'Percaya', 'Pasrah'], ans: 1, exp: 'Antonim SKEPTIS (ragu-ragu/kurang percaya) adalah YAKIN.' },
    { q: 'KONSENSUS', opts: ['Kesepakatan', 'Disensus / Perselisihan', 'Kerja sama', 'Perdamaian', 'Kepatuhan'], ans: 1, exp: 'Antonim KONSENSUS (kesepakatan) adalah Disensus atau perselisihan.' },
    { q: 'AMBIGU', opts: ['Taksa', 'Mendua', 'Kabur', 'Jelas / Gamblang', 'Ragu-ragu'], ans: 3, exp: 'Antonim AMBIGU (bermakna ganda/samar) adalah Jelas atau gamblang.' },
    { q: 'INTRINSIK', opts: ['Ekstrinsik', 'Internal', 'Dalam', 'Utama', 'Murni'], ans: 0, exp: 'Antonim INTRINSIK (nilai dari dalam) adalah Ekstrinsik (nilai dari luar).' },
    { q: 'OPTIMIS', opts: ['Yakin', 'Pesimis', 'Ceria', 'Semangat', 'Pasrah'], ans: 1, exp: 'Antonim OPTIMIS (berpengharapan baik) adalah Pesimis (berpengharapan buruk).' },
    { q: 'PASIF', opts: ['Diam', 'Aktif', 'Lambat', 'Tenang', 'Patuh'], ans: 1, exp: 'Antonim PASIF (tidak giat) adalah Aktif (giat bekerja).' },
    { q: 'KOGNITIF', opts: ['Intelektual', 'Afektif', 'Logis', 'Mental', 'Rasional'], ans: 1, exp: 'Antonim KOGNITIF (ranah cipta/intelek) adalah Afektif (ranah rasa/perasaan).' },
    { q: 'ASIMILASI', opts: ['Pemisahan / Desimilasi', 'Peleburan', 'Pembauran', 'Penyesuaian', 'Penyatuan'], ans: 0, exp: 'Antonim ASIMILASI (pembauran/peleburan) adalah Pemisahan atau desimilasi.' },
    { q: 'EFISIEN', opts: ['Boros / Tidak Efisien', 'Hemat', 'Tepat', 'Cepat', 'Berguna'], ans: 0, exp: 'Antonim EFISIEN (tepat guna/hemat) adalah Boros atau tidak efisien.' },
    { q: 'DEGRADASI', opts: ['Penurunan', 'Kemerosotan', 'Peningkatan / Elevasi', 'Kejatuhan', 'Stagnasi'], ans: 2, exp: 'Antonim DEGRADASI (kemunduran/penurunan pangkat) adalah Peningkatan atau elevasi.' },
    { q: 'TENTATIF', opts: ['Sementara', 'Belum pasti', 'Pasti / Definitif', 'Ragu-ragu', 'Fleksibel'], ans: 2, exp: 'Antonim TENTATIF (masih sementara/belum pasti) adalah Pasti atau definitif.' },
    { q: 'KONVERGEN', opts: ['Divergen', 'Menyatu', 'Memusat', 'Sejajar', 'Melengkung'], ans: 0, exp: 'Antonim KONVERGEN (memusat/menyatu) adalah Divergen (menyebar).' },
    { q: 'FLUKTUASI', opts: ['Naik-turun', 'Stagnasi / Kestabilan', 'Gejolak', 'Perubahan', 'Gerakan'], ans: 1, exp: 'Antonim FLUKTUASI (keadaan naik-turun/tidak stabil) adalah Stagnasi atau kestabilan.' },
    { q: 'SIGNIFIKAN', opts: ['Berarti', 'Penting', 'Sepele / Tidak Berarti', 'Besar', 'Nyata'], ans: 2, exp: 'Antonim SIGNIFIKAN (berarti/penting) adalah Sepele atau tidak berarti.' },
    { q: 'KRONIS', opts: ['Akut', 'Lama', 'Menahun', 'Parah', 'Sembuh'], ans: 0, exp: 'Antonim KRONIS (menahun/lama) adalah Akut (mendadak dan memuncak singkat).' },
    { q: 'MONOTON', opts: ['Jenuh', 'Membosankan', 'Variatif / Berwarna', 'Sama', 'Datar'], ans: 2, exp: 'Antonim MONOTON (keadaan yang sama/membosankan) adalah Variatif atau berwarna.' },
    { q: 'ABSTRAK', opts: ['Khayal', 'Konkret / Nyata', 'Kabur', 'Mendasar', 'Gaib'], ans: 1, exp: 'Antonim ABSTRAK (tidak berwujud/khayal) adalah Konkret atau nyata.' },
    { q: 'PROLOG', opts: ['Pengantar', 'Epilog', 'Dialog', 'Monolog', 'Skenario'], ans: 1, exp: 'Antonim PROLOG (kata pendahuluan) adalah Epilog (kata penutup).' },
    { q: 'STATIS', opts: ['Diam', 'Tetap', 'Dinamis', 'Pasif', 'Kokoh'], ans: 2, exp: 'Antonim STATIS (diam/tidak bergerak) adalah Dinamis (bergerak aktif).' },
    { q: 'ALTRUIS', opts: ['Egois', 'Dermawan', 'Baik', 'Sosial', 'Sabar'], ans: 0, exp: 'Antonim ALTRUIS (mengutamakan orang lain) adalah Egois (mengutamakan diri sendiri).' },
    { q: 'TULUS', opts: ['Jujur', 'Culas / Pamrih', 'Ikhlas', 'Setia', 'Sopan'], ans: 1, exp: 'Antonim TULUS (ikhlas/tanpa pamrih) adalah Culas atau pamrih.' }
  ],
  analogi: [
    { q: 'GURU : SEKOLAH = ... : ...', opts: ['Dokter : Rumah Sakit', 'Petani : Sawah', 'Polisi : Jalanan', 'Supir : Kendaraan', 'Koki : Restoran'], ans: 0, exp: 'Guru bekerja di Sekolah, Dokter bekerja di Rumah Sakit.' },
    { q: 'HAUS : AIR = ... : ...', opts: ['Lapar : Makan', 'Mengantuk : Tidur', 'Lelah : Istirahat', 'Sakit : Obat', 'Dingin : Selimut'], ans: 0, exp: 'Haus dihilangkan dengan Air, Lapar dihilangkan dengan Makan.' },
    { q: 'MATA : MELIHAT = ... : ...', opts: ['Telinga : Mendengar', 'Hidung : Mencium', 'Mulut : Berbicara', 'Kaki : Berjalan', 'Tangan : Meraba'], ans: 0, exp: 'Mata adalah organ untuk Melihat, Telinga adalah organ untuk Mendengar.' },
    { q: 'PADI : PETANI = ... : ...', opts: ['Roti : Pembuat Roti', 'Puisi : Penyair', 'Patung : Pahat', 'Sayur : Pedagang', 'Kursi : Kayu'], ans: 1, exp: 'Padi dihasilkan oleh Petani, Puisi dihasilkan oleh Penyair.' },
    { q: 'BULAN : BUMI = BUMI : ...', opts: ['Matahari', 'Bintang', 'Galaksi', 'Venus', 'Mars'], ans: 0, exp: 'Bulan mengitari Bumi, dan Bumi mengitari Matahari (satelit mengitari planetnya).' },
    { q: 'MOBIL : BENSIN = MANUSIA : ...', opts: ['Makanan', 'Minuman', 'Oksigen', 'Rumah', 'Uang'], ans: 0, exp: 'Mobil membutuhkan Bensin agar dapat berjalan, Manusia membutuhkan Makanan agar dapat beraktivitas.' },
    { q: 'KUAS : PELUKIS = CANGKUL : ...', opts: ['Petani', 'Guru', 'Dokter', 'Nelayan', 'Montir'], ans: 0, exp: 'Kuas merupakan alat utama bagi Pelukis, Cangkul merupakan alat utama bagi Petani.' },
    { q: 'SINGA : HUTAN = HIU : ...', opts: ['Laut', 'Darat', 'Sungai', 'Udara', 'Gua'], ans: 0, exp: 'Singa adalah predator utama di Hutan, Hiu adalah predator utama di Laut.' },
    { q: 'DOKTER : PASIEN = GURU : ...', opts: ['Murid', 'Sekolah', 'Kelas', 'Buku', 'Pena'], ans: 0, exp: 'Dokter melayani/mengobati Pasien, Guru melayani/mengajar Murid.' },
    { q: 'DINGIN : ES = PANAS : ...', opts: ['Api', 'Air', 'Matahari', 'Udara', 'Siang'], ans: 0, exp: 'Sifat khas dari Es adalah Dingin, Sifat khas dari Api adalah Panas.' },
    { q: 'SENAPAN : BERBURU = JALA : ...', opts: ['Menangkap Ikan', 'Menembak', 'Menjaring', 'Berlayar', 'Mendayung'], ans: 0, exp: 'Senapan digunakan untuk Berburu, Jala digunakan untuk Menangkap Ikan.' },
    { q: 'GIGI : MENGUNYAH = KAKI : ...', opts: ['Berjalan', 'Menendang', 'Lari', 'Melompat', 'Berdiri'], ans: 0, exp: 'Gigi berfungsi untuk Mengunyah makanan, Kaki berfungsi utama untuk Berjalan.' },
    { q: 'BUNGA : RIASAN = BUKU : ...', opts: ['Pengetahuan', 'Toko', 'Perpustakaan', 'Kertas', 'Pena'], ans: 0, exp: 'Bunga berfungsi sebagai Riasan, Buku berfungsi sebagai sumber Pengetahuan.' },
    { q: 'MATAHARI : SIANG = BINTANG : ...', opts: ['Malam', 'Sore', 'Pagi', 'Gelap', 'Langit'], ans: 0, exp: 'Matahari bersinar dan menandakan hari Siang, Bintang bersinar dan menandakan hari Malam.' },
    { q: 'HEWAN : ZOOLOGI = TUMBUHAN : ...', opts: ['Botani', 'Biologi', 'Geologi', 'Ekologi', 'Antropologi'], ans: 0, exp: 'Hewan dipelajari dalam ilmu Zoologi, Tumbuhan dipelajari dalam ilmu Botani.' },
    { q: 'KAYU : MEJA = BESI : ...', opts: ['Pagar', 'Logam', 'Baja', 'Tambang', 'Keras'], ans: 0, exp: 'Kayu merupakan bahan baku untuk membuat Meja, Besi merupakan bahan baku untuk membuat Pagar.' },
    { q: 'DINDING : RUMAH = KULIT : ...', opts: ['Tubuh', 'Wajah', 'Buku', 'Buah', 'Hewan'], ans: 0, exp: 'Dinding merupakan lapisan luar pelindung Rumah, Kulit merupakan lapisan luar pelindung Tubuh.' },
    { q: 'KOMPUTER : LISTRIK = SEPEDA MOTOR : ...', opts: ['Bensin', 'Ban', 'Mesin', 'Roda', 'Jalan'], ans: 0, exp: 'Komputer membutuhkan energi Listrik untuk hidup, Sepeda motor membutuhkan energi Bensin untuk jalan.' },
    { q: 'BATA : TANAH LIAT = KERTAS : ...', opts: ['Kayu', 'Serat', 'Pohon', 'Hutan', 'Buku'], ans: 0, exp: 'Bata dibuat dari bahan dasar Tanah Liat, Kertas dibuat dari bahan dasar Kayu.' },
    { q: 'PENA : MENULIS = PISAU : ...', opts: ['Memotong', 'Dapur', 'Tajam', 'Besi', 'Sayur'], ans: 0, exp: 'Pena digunakan untuk Menulis, Pisau digunakan untuk Memotong.' },
    { q: 'PIRING : MAKAN = GELAS : ...', opts: ['Minum', 'Air', 'Kaca', 'Cangkir', 'Haus'], ans: 0, exp: 'Piring digunakan sebagai tempat untuk Makan, Gelas digunakan sebagai tempat untuk Minum.' },
    { q: 'MERAH : BERANI = PUTIH : ...', opts: ['Suci', 'Bersih', 'Damai', 'Bendera', 'Netral'], ans: 0, exp: 'Merah melambangkan sifat Berani, Putih melambangkan sifat Suci.' },
    { q: 'SARUNG TANGAN : TANGAN = SEPATU : ...', opts: ['Kaki', 'Jalan', 'Kaos Kaki', 'Kulit', 'Tali'], ans: 0, exp: 'Sarung tangan dikenakan di Tangan, Sepatu dikenakan di Kaki.' },
    { q: 'HUJAN : PAYUNG = PANAS : ...', opts: ['Topi', 'Matahari', 'Payung', 'Kacamata', 'Kipas'], ans: 0, exp: 'Saat Hujan kita berlindung dengan Payung, saat Panas kita berlindung dengan Topi.' },
    { q: 'PILOT : PESAWAT = MASINIS : ...', opts: ['Kereta Api', 'Stasiun', 'Rel', 'Penumpang', 'Lokomotif'], ans: 0, exp: 'Pilot mengemudikan Pesawat, Masinis mengemudikan Kereta Api.' },
    { q: 'GANDUM : ROTI = SUSU : ...', opts: ['Keju', 'Sapi', 'Mentega', 'Gelas', 'Sehat'], ans: 0, exp: 'Gandum diolah menjadi Roti, Susu diolah menjadi Keju.' },
    { q: 'ARSITEK : GEDUNG = DESAINER : ...', opts: ['Pakaian', 'Benang', 'Kain', 'Model', 'Jahit'], ans: 0, exp: 'Arsitek merancang bangunan/Gedung, Desainer merancang pakaian/Busana.' },
    { q: 'HEWAN : SEL = SENYAWA : ...', opts: ['Molekul', 'Atom', 'Kimia', 'Zat', 'Unsur'], ans: 0, exp: 'Hewan tersusun atas unit terkecil yaitu Sel, Senyawa tersusun atas unit terkecil yaitu Molekul.' },
    { q: 'TEATER : AKTOR = KONSER : ...', opts: ['Musisi', 'Panggung', 'Lagu', 'Penonton', 'Musik'], ans: 0, exp: 'Teater melibatkan penampilan utama dari Aktor, Konser melibatkan penampilan utama dari Musisi.' },
    { q: 'TELEPON : KOMUNIKASI = SEPEDA : ...', opts: ['Transportasi', 'Olahraga', 'Roda', 'Pedal', 'Jalan'], ans: 0, exp: 'Telepon berfungsi sebagai alat Komunikasi, Sepeda berfungsi sebagai alat Transportasi.' }
  ],
  bacaan: [
    // Passage 1: Nikel (0-9)
    {
      p: TPA_PASSAGES.p1,
      q: 'Apa faktor utama pendorong peningkatan pesat produksi nikel olahan di Indonesia pada tahun 2023?',
      opts: ['Peningkatan drastis harga nikel global', 'Investasi masif smelter pasca larangan ekspor bijih mentah', 'Dukungan penuh dari negara pembeli nikel terbesar', 'Peralihan industri otomotif global ke kendaraan listrik', 'Penemuan ladang tambang nikel baru di Sulawesi'],
      ans: 1,
      exp: 'Paragraf menyebutkan: "Peningkatan ini didorong oleh masifnya investasi fasilitas pengolahan (smelter) nikel semenjak larangan ekspor bijih nikel..."'
    },
    {
      p: TPA_PASSAGES.p1,
      q: 'Berapakah kontribusi persentase produksi nikel olahan Indonesia terhadap pasokan dunia pada tahun 2023?',
      opts: ['Sekitar 20%', 'Sekitar 35%', 'Sekitar 50%', 'Sekitar 65%', 'Sekitar 80%'],
      ans: 2,
      exp: 'Paragraf menyebutkan: "...atau sekitar 50% dari total pasokan dunia."'
    },
    {
      p: TPA_PASSAGES.p1,
      q: 'Kapan pemerintah Indonesia mulai memberlakukan larangan ekspor bijih nikel mentah?',
      opts: ['Tahun 2018', 'Tahun 2019', 'Tahun 2020', 'Tahun 2021', 'Tahun 2022'],
      ans: 2,
      exp: 'Paragraf menyebutkan: "...semenjak larangan ekspor bijih nikel mentah diberlakukan pada tahun 2020."'
    },
    {
      p: TPA_PASSAGES.p1,
      q: 'Apa tantangan lingkungan utama yang dihadapi oleh industri pengolahan nikel di Indonesia?',
      opts: ['Pencemaran suara di sekitar smelter', 'Limbah tambang dan emisi karbon tinggi dari pembangkit batubara', 'Penggunaan air tanah yang berlebihan secara ilegal', 'Kerusakan terumbu karang akibat kapal pengangkut', 'Kebisingan wilayah pemukiman di sekitar kawasan industri'],
      ans: 1,
      exp: 'Paragraf menyebutkan: "...industri pengolahan nikel ini menuai tantangan lingkungan berupa pembuangan limbah tambang dan emisi karbon tinggi dari smelter bertenaga batubara captive."'
    },
    {
      p: TPA_PASSAGES.p1,
      q: 'Berdasarkan wacana, pembangkit listrik jenis apa yang digunakan untuk mengoperasikan smelter nikel captive tersebut?',
      opts: ['Pembangkit Listrik Tenaga Air (PLTA)', 'Pembangkit Listrik Tenaga Batubara (PLTU)', 'Pembangkit Listrik Tenaga Surya (PLTS)', 'Pembangkit Listrik Tenaga Gas (PLTG)', 'Pembangkit Listrik Tenaga Panas Bumi (PLTB)'],
      ans: 1,
      exp: 'Paragraf menyebutkan: "...emisi karbon tinggi dari smelter bertenaga batubara captive."'
    },
    {
      p: TPA_PASSAGES.p1,
      q: 'Apa dampak positif ekonomi dari industri nikel olahan yang disebutkan dalam teks?',
      opts: ['Penyediaan lapangan kerja lokal', 'Peningkatan devisa negara secara signifikan', 'Subsidi energi bagi masyarakat sekitar', 'Pertumbuhan ekspor sektor otomotif', 'Kemandirian energi terbarukan daerah'],
      ans: 1,
      exp: 'Wacana menyebutkan secara eksplisit: "Meskipun meningkatkan devisa negara secara signifikan..."'
    },
    {
      p: TPA_PASSAGES.p1,
      q: 'Apa makna istilah "smelter captive" berdasarkan konteks bacaan di atas?',
      opts: ['Smelter yang menyewa pasokan listrik PLN', 'Smelter yang memiliki pembangkit listrik khusus sendiri', 'Smelter yang mengolah nikel menjadi barang jadi elektronik', 'Smelter milik pemerintah daerah setempat', 'Smelter dengan emisi karbon terendah secara nasional'],
      ans: 1,
      exp: 'Captive power plant pada smelter merujuk pada pembangkit listrik mandiri yang dikhususkan melayani kebutuhan smelter tersebut.'
    },
    {
      p: TPA_PASSAGES.p1,
      q: 'Berapa volume produksi nikel olahan Indonesia pada tahun 2023?',
      opts: ['1,0 juta metrik ton', '1,5 juta metrik ton', '1,8 juta metrik ton', '2,0 juta metrik ton', '2,5 juta metrik ton'],
      ans: 2,
      exp: 'Sesuai wacana: "...produksi nikel olahan Indonesia mencapai 1,8 juta metrik ton..."'
    },
    {
      p: TPA_PASSAGES.p1,
      q: 'Bagaimana kontribusi produksi nikel mentah sebelum diolah pada tahun 2020 menurut teks?',
      opts: ['Hanya boleh diekspor dalam bentuk mentah', 'Mulai dilarang diekspor dalam bentuk mentah', 'Mengalami penurunan harga investasi smelter', 'Menggunakan energi bersih ramah lingkungan', 'Bebas pajak ekspor untuk pasar global'],
      ans: 1,
      exp: 'Teks menyebutkan larangan ekspor bijih nikel mentah diberlakukan mulai tahun 2020.'
    },
    {
      p: TPA_PASSAGES.p1,
      q: 'Pernyataan mana yang TIDAK sesuai dengan isi paragraf tersebut?',
      opts: ['Larangan ekspor bijih nikel mentah dimulai tahun 2020.', 'Investasi smelter meningkat tajam setelah larangan ekspor.', 'Indonesia menguasai 100% pasokan nikel olahan dunia pada 2023.', 'Limbah tambang menjadi tantangan pengelolaan lingkungan.', 'Sebagian smelter nikel masih mengandalkan pembangkit batubara.'],
      ans: 2,
      exp: 'Teks menyebutkan Indonesia menguasai "sekitar 50% dari total pasokan dunia", bukan 100%.'
    },

    // Passage 2: AI (10-19)
    {
      p: TPA_PASSAGES.p2,
      q: 'Apa keuntungan utama penggunaan platform adaptif berbasis AI menurut wacana di atas?',
      opts: ['Mengurangi beban kerja administratif sekolah secara total', 'Personalisasi kurikulum sesuai kecepatan belajar siswa', 'Menghilangkan kebutuhan akan ujian konvensional di kelas', 'Menjamin kelulusan semua siswa tanpa pengecualian', 'Mempercepat waktu sekolah menjadi lebih singkat'],
      ans: 1,
      exp: 'Wacana menyebutkan: "...kurikulum dapat dipersonalisasi sesuai dengan kecepatan belajar masing-masing siswa."'
    },
    {
      p: TPA_PASSAGES.p2,
      q: 'Aspek apa dari pendidik manusia yang menurut pengamat tidak dapat digantikan oleh teknologi AI?',
      opts: ['Kecepatan transfer informasi ke siswa', 'Penyusunan modul soal ujian secara otomatis', 'Empati, bimbingan moral, dan ikatan emosional', 'Kemampuan mengevaluasi nilai rapor siswa', 'Penyediaan referensi buku-buku ilmiah terbaru'],
      ans: 2,
      exp: 'Teks menyebutkan: "...AI tidak akan pernah bisa menggantikan empati, bimbingan moral, dan ikatan emosional yang diberikan oleh pendidik."'
    },
    {
      p: TPA_PASSAGES.p2,
      q: 'Kekhawatiran apa saja yang timbul akibat integrasi AI di sekolah menurut bacaan?',
      opts: ['Kesenjangan digital dan potensi penurunan berpikir kritis', 'Tingginya biaya listrik operasional komputer', 'Hilangnya mata pelajaran olahraga dan seni', 'Meningkatnya angka putus sekolah di perkotaan', 'Penurunan gaji guru secara nasional'],
      ans: 0,
      exp: 'Teks menyebutkan kekhawatiran meliputi kesenjangan digital di daerah terpencil dan potensi penurunan kemampuan berpikir kritis akibat bergantung pada jawaban instan.'
    },
    {
      p: TPA_PASSAGES.p2,
      q: 'Bagaimana sistem AI membantu mendeteksi masalah belajar siswa berdasarkan teks?',
      opts: ['Dengan memantau kehadiran siswa di kelas secara fisik', 'Mendeteksi kelemahan konsep dan merekomendasikan materi pengayaan', 'Melaporkan nilai buruk siswa secara langsung ke orang tua', 'Memaksa siswa belajar di luar jam sekolah tanpa henti', 'Mengganti mata pelajaran yang dianggap terlalu sulit'],
      ans: 1,
      exp: 'Teks menyebutkan: "Sistem dapat mendeteksi kelemahan pemahaman konsep dan memberikan rekomendasi materi pengayaan secara otomatis."'
    },
    {
      p: TPA_PASSAGES.p2,
      q: 'Mengapa daerah terpencil menjadi hambatan bagi integrasi AI dalam pendidikan?',
      opts: ['Kurangnya minat belajar dari siswa setempat', 'Ketiadaan komputer berspesifikasi sangat tinggi', 'Kesenjangan digital akibat ketiadaan akses internet memadai', 'Kurangnya jumlah tenaga pengajar terlatih', 'Penolakan dari pemerintah daerah terhadap teknologi'],
      ans: 2,
      exp: 'Teks menyebutkan: "...kesenjangan digital di daerah terpencil yang belum terjangkau akses internet memadai..."'
    },
    {
      p: TPA_PASSAGES.p2,
      q: 'Apa akibat negatif bagi siswa jika terlalu bergantung pada asisten AI?',
      opts: ['Kesehatan mata menurun secara signifikan', 'Kehilangan teman-teman bersosialisasi di kelas', 'Potensi penurunan kemampuan berpikir kritis', 'Ketidakmampuan menggunakan komputer dasar', 'Nilai ujian sekolah yang selalu turun drastis'],
      ans: 2,
      exp: 'Teks menyebutkan: "...potensi penurunan kemampuan berpikir kritis jika siswa terlalu bergantung pada jawaban instan..."'
    },
    {
      p: TPA_PASSAGES.p2,
      q: 'Apa tema besar wacana AI dalam sektor pendidikan di atas?',
      opts: ['Kelebihan dan tantangan dari penerapan AI dalam pembelajaran sekolah', 'Cara membuat aplikasi AI khusus untuk ujian nasional', 'Kurangnya kualitas guru manusia akibat munculnya asisten AI', 'Pentingnya jaringan internet serat optik di sekolah pedesaan', 'Perubahan drastis materi kurikulum nasional demi teknologi'],
      ans: 0,
      exp: 'Wacana membahas manfaat personalisasi AI sekaligus tantangan berupa kesenjangan digital, berkurangnya berpikir kritis, dan pentingnya peran guru.'
    },
    {
      p: TPA_PASSAGES.p2,
      q: 'Pernyataan mana yang SESUAI dengan isi wacana tersebut?',
      opts: ['Sistem AI dapat memberikan rekomendasi materi pengayaan secara otomatis.', 'Guru manusia sudah tidak diperlukan lagi di sekolah modern.', 'Semua sekolah di Indonesia telah terhubung internet kecepatan tinggi.', 'Siswa menjadi lebih kreatif setelah menggunakan platform asisten AI.', 'AI menggantikan guru dalam membangun emosi moral siswa.'],
      ans: 0,
      exp: 'Teks menyebutkan: "Sistem dapat mendeteksi kelemahan... dan memberikan rekomendasi materi pengayaan secara otomatis." (Pernyataan A sesuai).'
    },
    {
      p: TPA_PASSAGES.p2,
      q: 'Apa yang dimaksud dengan "personalisasi kurikulum" dalam bacaan?',
      opts: ['Siswa menyusun mata pelajaran mereka sendiri tanpa guru', 'Kurikulum disesuaikan dengan kecepatan belajar masing-masing siswa', 'Ujian dibuat secara acak untuk menghindari contek-menontek', 'Setiap siswa mendapatkan perangkat komputer baru secara gratis', 'Sekolah membedakan kurikulum siswa kaya dan siswa miskin'],
      ans: 1,
      exp: 'Teks menyebutkan: "...kurikulum dapat dipersonalisasi sesuai dengan kecepatan belajar masing-masing siswa."'
    },
    {
      p: TPA_PASSAGES.p2,
      q: 'Pernyataan mana yang TIDAK sesuai dengan isi wacana di atas?',
      opts: ['Kecerdasan buatan mendukung pembelajaran adaptif.', 'Guru memberikan empati yang tidak dimiliki AI.', 'AI memicu penurunan minat baca buku teks.', 'Daerah terpencil masih terkendala akses internet.', 'AI memicu kekhawatiran tentang berpikir kritis.'],
      ans: 2,
      exp: 'Teks mengaitkan ketergantungan jawaban instan AI dengan "penurunan berpikir kritis", bukan "penurunan minat baca buku teks".'
    },

    // Passage 3: Energi Hijau (20-29)
    {
      p: 'Transisi menuju energi hijau menjadi agenda krusial global guna menekan laju krisis iklim. Target utama transisi ini adalah menghentikan operasional pembangkit listrik berbahan bakar fosil, khususnya batubara, dan menggantikannya dengan sumber energi terbarukan seperti tenaga surya, angin, dan panas bumi. Hambatan terbesar proses ini adalah tingginya investasi awal infrastruktur energi bersih serta kestabilan pasokan listrik intermiten (tidak konsisten) dari panel surya dan kincir angin. Untuk mengatasinya, teknologi penyimpanan baterai skala besar mulai dikembangkan. Di samping itu, negara berkembang memerlukan bantuan pendanaan iklim dari negara-negara maju yang secara historis merupakan penyumbang emisi karbon terbesar di bumi agar transisi berjalan secara adil.',
      q: 'Apa target utama dari proses transisi energi hijau global menurut wacana?',
      opts: ['Mencari ladang minyak bumi baru di laut dalam', 'Menggantikan pembangkit fosil/batubara dengan energi terbarukan', 'Menurunkan konsumsi listrik masyarakat secara paksa', 'Membeli panel surya murah dari negara maju', 'Meningkatkan ekspor batubara ke negara berkembang'],
      ans: 1,
      exp: 'Teks menyebutkan: "Target utama transisi ini adalah menghentikan operasional pembangkit listrik berbahan bakar fosil... menggantikannya dengan sumber energi terbarukan."'
    },
    {
      p: TPA_PASSAGES.p3,
      q: 'Apa yang dimaksud dengan sifat "intermiten" dari energi surya dan angin berdasarkan bacaan?',
      opts: ['Tingginya polusi yang dihasilkan', 'Pasokan listrik yang tidak konsisten/tidak stabil', 'Mahalnya biaya pembuatan alat penangkap energi', 'Ketidakmampuan menghasilkan daya listrik besar', 'Sulitnya melakukan perawatan suku cadang generator'],
      ans: 1,
      exp: 'Teks menyebutkan: "...pasokan listrik intermiten (tidak konsisten) dari panel surya dan kincir angin."'
    },
    {
      p: TPA_PASSAGES.p3,
      q: 'Teknologi apa yang mulai dikembangkan untuk mengatasi ketidakstabilan pasokan energi bersih?',
      opts: ['Pembangkit batubara cadangan darurat', 'Teknologi penyimpanan baterai skala besar', 'Kabel transmisi listrik bawah laut internasional', 'Generator diesel hemat energi', 'Pemasangan kincir angin berukuran raksasa'],
      ans: 1,
      exp: 'Teks menyebutkan: "Untuk mengatasinya, teknologi penyimpanan baterai skala besar mulai dikembangkan."'
    },
    {
      p: TPA_PASSAGES.p3,
      q: 'Mengapa negara maju berkewajiban memberikan bantuan pendanaan iklim menurut wacana?',
      opts: ['Karena memiliki cadangan batubara melimpah', 'Secara historis merupakan penyumbang emisi terbesar', 'Untuk menjual produk panel surya buatan mereka', 'Negara maju memiliki teknologi baterai terlengkap', 'Untuk memonitor penggunaan energi negara berkembang'],
      ans: 1,
      exp: 'Teks menyebutkan: "...negara-negara maju yang secara historis merupakan penyumbang emisi karbon terbesar di bumi..."'
    },
    {
      p: TPA_PASSAGES.p3,
      q: 'Sumber energi terbarukan apa saja yang disebutkan secara spesifik dalam paragraf tersebut?',
      opts: ['Nuklir, batu bara, dan minyak bumi', 'Gas alam, biogas, dan energi surya', 'Tenaga surya, angin, dan panas bumi', 'Energi ombak, hidrogen, dan biomassa', 'Listrik dinamo, batubara, dan geothermal'],
      ans: 2,
      exp: 'Teks menyebutkan: "...sumber energi terbarukan seperti tenaga surya, angin, dan panas bumi."'
    },
    {
      p: TPA_PASSAGES.p3,
      q: 'Apa hambatan terbesar dalam transisi energi hijau yang dialami oleh negara berkembang?',
      opts: ['Tingginya harga batubara internasional', 'Tingginya investasi awal infrastruktur energi bersih', 'Kurangnya minat masyarakat menggunakan listrik bersih', 'Ketiadaan lahan untuk membangun kincir angin', 'Penolakan dari industri otomotif lokal'],
      ans: 1,
      exp: 'Teks menyebutkan: "Hambatan terbesar proses ini adalah tingginya investasi awal infrastruktur energi bersih..."'
    },
    {
      p: TPA_PASSAGES.p3,
      q: 'Apa tujuan utama dilaksanakannya transisi energi hijau dalam konteks global?',
      opts: ['Menurunkan tarif listrik domestik secara drastis', 'Menekan laju krisis iklim global', 'Mengurangi ketergantungan impor pangan', 'Mempermudah ekspor energi ke negara tetangga', 'Meningkatkan efisiensi pembangkit fosil'],
      ans: 1,
      exp: 'Teks menyebutkan: "...transisi menuju energi hijau menjadi agenda krusial global guna menekan laju krisis iklim."'
    },
    {
      p: TPA_PASSAGES.p3,
      q: 'Berdasarkan teks, bagaimana perbandingan peran negara maju dan berkembang dalam emisi karbon secara historis?',
      opts: ['Negara berkembang adalah penyumbang emisi terbesar', 'Negara maju secara historis merupakan penyumbang emisi terbesar', 'Emisi karbon kedua kelompok negara bernilai sama', 'Emisi karbon negara maju telah mencapai nol bersih', 'Negara berkembang tidak menyumbang emisi karbon sama sekali'],
      ans: 1,
      exp: 'Teks menyatakan: "...negara-negara maju yang secara historis merupakan penyumbang emisi karbon terbesar..."'
    },
    {
      p: TPA_PASSAGES.p3,
      q: 'Apa prasyarat agar transisi energi hijau di tingkat global dapat berjalan secara "adil"?',
      opts: ['Negara berkembang memberikan subsidi ke negara maju', 'Pemberian pendanaan iklim dari negara maju ke negara berkembang', 'Negara berkembang menghentikan industri manufaktur mereka', 'Pemberian batubara murah ke negara miskin', 'Seluruh dunia harus menggunakan panel surya merek yang sama'],
      ans: 1,
      exp: 'Teks menyatakan: "...negara berkembang memerlukan bantuan pendanaan iklim dari negara-negara maju... agar transisi berjalan secara adil."'
    },
    {
      p: TPA_PASSAGES.p3,
      q: 'Manakah pernyataan yang TIDAK sesuai dengan bacaan di atas?',
      opts: ['Penyimpanan baterai skala besar mengatasi intermitensi.', 'Pembangkit batu bara adalah target utama penghentian.', 'Panas bumi dikategorikan sebagai energi terbarukan.', 'Investasi awal infrastruktur energi bersih tergolong rendah.', 'Negara berkembang memerlukan dana iklim dari negara maju.'],
      ans: 3,
      exp: 'Teks menyebutkan "tingginya investasi awal", sehingga pernyataan D (investasi awal rendah) tidak sesuai.'
    }
  ]
};
const logicalBase = {
  penalaran: [
    { q: 'Jika hari ini hujan, maka jalanan basah. Hari ini jalanan tidak basah. Kesimpulan yang benar adalah ...', opts: ['Hari ini tidak hujan', 'Hari ini hujan', 'Jalanan kering karena panas', 'Kemungkinan hari ini hujan', 'Tidak ada kesimpulan'], ans: 0, exp: 'Modus tollens: p -> q, ~q, maka ~p (Hari ini tidak hujan).' },
    { q: 'Jika cuaca mendung, Ayah membawa payung. Hari ini Ayah tidak membawa payung. Kesimpulan yang benar adalah ...', opts: ['Cuaca mendung', 'Cuaca tidak mendung', 'Ayah lupa membawa payung', 'Hari ini hujan deras', 'Tidak ada kesimpulan'], ans: 1, exp: 'Modus tollens: p -> q, ~q, maka ~p (Cuaca tidak mendung).' },
    { q: 'Jika nilai ujian tinggi, maka Budi mendapat hadiah. Budi tidak mendapat hadiah. Kesimpulan yang benar adalah ...', opts: ['Budi rajin belajar', 'Budi tidak lulus ujian', 'Nilai ujian Budi tidak tinggi', 'Budi mendapat hadiah lain', 'Tidak ada kesimpulan'], ans: 2, exp: 'Modus tollens: p -> q, ~q, maka ~p (Nilai ujian Budi tidak tinggi).' },
    { q: 'Jika lampu merah menyala, kendaraan harus berhenti. Saat ini kendaraan tidak berhenti. Kesimpulan yang benar adalah ...', opts: ['Lampu merah tidak menyala', 'Lampu lalu lintas mati', 'Terjadi kemacetan jalan', 'Lampu hijau menyala', 'Tidak ada kesimpulan'], ans: 0, exp: 'Modus tollens: p -> q, ~q, maka ~p (Lampu merah tidak menyala).' },
    { q: 'Jika berolahraga secara rutin, tubuh menjadi sehat. Tubuh Roni tidak sehat. Kesimpulan yang benar adalah ...', opts: ['Roni rajin berolahraga', 'Roni tidak berolahraga secara rutin', 'Roni sedang sakit flu', 'Roni kurang tidur', 'Tidak ada kesimpulan'], ans: 1, exp: 'Modus tollens: p -> q, ~q, maka ~p (Roni tidak berolahraga secara rutin).' },
    { q: 'Jika harga BBM naik, tarif angkutan umum juga naik. Tarif angkutan umum tidak naik. Kesimpulan yang benar adalah ...', opts: ['Harga BBM naik', 'Harga BBM turun', 'Harga BBM tidak naik', 'Jumlah penumpang angkutan sepi', 'Tidak ada kesimpulan'], ans: 2, exp: 'Modus tollens: p -> q, ~q, maka ~p (Harga BBM tidak naik).' },
    { q: 'Jika listrik padam, pendingin ruangan mati. Pendingin ruangan saat ini hidup. Kesimpulan yang benar adalah ...', opts: ['Listrik padam', 'Listrik tidak padam', 'Terjadi korsleting listrik', 'Pendingin ruangan rusak', 'Tidak ada kesimpulan'], ans: 1, exp: 'Modus tollens: p -> q, ~q, maka ~p (Listrik tidak padam).' },
    { q: 'Jika dokumen lengkap, pengajuan paspor disetujui. Pengajuan paspor Tono ditolak (tidak disetujui). Kesimpulan yang benar adalah ...', opts: ['Dokumen Tono lengkap', 'Dokumen Tono tidak lengkap', 'Tono tidak ingin pergi ke luar negeri', 'Kantor imigrasi tutup', 'Tidak ada kesimpulan'], ans: 1, exp: 'Modus tollens: p -> q, ~q, maka ~p (Dokumen Tono tidak lengkap).' },
    { q: 'Jika lulus seleksi wawancara, pelamar masuk tahap orientasi. Dodi tidak masuk tahap orientasi. Kesimpulan yang benar adalah ...', opts: ['Dodi lulus wawancara', 'Dodi tidak lulus seleksi wawancara', 'Dodi mengundurkan diri', 'Dodi terlambat datang wawancara', 'Tidak ada kesimpulan'], ans: 1, exp: 'Modus tollens: p -> q, ~q, maka ~p (Dodi tidak lulus seleksi wawancara).' },
    { q: 'Jika musim kemarau tiba, debit air bendungan menurun. Debit air bendungan saat ini tidak menurun. Kesimpulan yang benar adalah ...', opts: ['Musim kemarau belum tiba', 'Musim hujan telah selesai', 'Pintu air bendungan ditutup', 'Terjadi banjir bandang', 'Tidak ada kesimpulan'], ans: 0, exp: 'Modus tollens: p -> q, ~q, maka ~p (Musim kemarau belum tiba).' },
    { q: 'Jika hari libur nasional, bank tidak beroperasi. Hari ini bank beroperasi. Kesimpulan yang benar adalah ...', opts: ['Hari ini hari libur nasional', 'Hari ini bukan hari libur nasional', 'Bank sedang mengalami kendala', 'Banyak nasabah yang mengantre', 'Tidak ada kesimpulan'], ans: 1, exp: 'Modus tollens: p -> q, ~q, maka ~p (Hari ini bukan hari libur nasional).' },
    { q: 'Jika koneksi internet lambat, streaming video akan tersendat. Streaming video berjalan sangat lancar. Kesimpulan yang benar adalah ...', opts: ['Koneksi internet lambat', 'Koneksi internet tidak lambat', 'Server video sedang mati', 'Kualitas video sangat rendah', 'Tidak ada kesimpulan'], ans: 1, exp: 'Modus tollens: p -> q, ~q, maka ~p (Koneksi internet tidak lambat).' },
    { q: 'Jika bahan baku langka, harga produk meningkat. Harga produk saat ini tidak meningkat. Kesimpulan yang benar adalah ...', opts: ['Bahan baku langka', 'Bahan baku tidak langka', 'Produk tidak laku di pasaran', 'Bahan baku impor murah', 'Tidak ada kesimpulan'], ans: 1, exp: 'Modus tollens: p -> q, ~q, maka ~p (Bahan baku tidak langka).' },
    { q: 'Jika tangki bensin bocor, aroma bensin tercium kuat. Aroma bensin tidak tercium kuat. Kesimpulan yang benar adalah ...', opts: ['Tangki bensin bocor', 'Tangki bensin tidak bocor', 'Mesin motor sedang mati', 'Bensin habis di jalan', 'Tidak ada kesimpulan'], ans: 1, exp: 'Modus tollens: p -> q, ~q, maka ~p (Tangki bensin tidak bocor).' },
    { q: 'Jika ragi ditambahkan, adonan roti akan mengembang. Adonan roti saat ini tidak mengembang. Kesimpulan yang benar adalah ...', opts: ['Ragi ditambahkan', 'Ragi tidak ditambahkan', 'Tepung terigu berkualitas rendah', 'Waktu fermentasi kurang lama', 'Tidak ada kesimpulan'], ans: 1, exp: 'Modus tollens: p -> q, ~q, maka ~p (Ragi tidak ditambahkan).' },
    { q: 'Jika udara dingin, Ani memakai jaket. Saat ini Ani tidak memakai jaket. Kesimpulan yang benar adalah ...', opts: ['Udara dingin', 'Udara tidak dingin', 'Ani lupa membawa jaket', 'Ani menyukai suhu dingin', 'Tidak ada kesimpulan'], ans: 1, exp: 'Modus tollens: p -> q, ~q, maka ~p (Udara tidak dingin).' },
    { q: 'Jika terjadi gempa bumi, alarm sirine akan berbunyi. Alarm sirine tidak berbunyi. Kesimpulan yang benar adalah ...', opts: ['Terjadi gempa bumi', 'Tidak terjadi gempa bumi', 'Alarm sirine rusak', 'Warga sedang mengungsi', 'Tidak ada kesimpulan'], ans: 1, exp: 'Modus tollens: p -> q, ~q, maka ~p (Tidak terjadi gempa bumi).' },
    { q: 'Jika baterai laptop habis, layar akan mati secara otomatis. Layar laptop saat ini hidup. Kesimpulan yang benar adalah ...', opts: ['Baterai laptop habis', 'Baterai laptop tidak habis', 'Laptop sedang diisi daya', 'Layar laptop rusak', 'Tidak ada kesimpulan'], ans: 1, exp: 'Modus tollens: p -> q, ~q, maka ~p (Baterai laptop tidak habis).' },
    { q: 'Jika kran air ditutup, aliran air berhenti. Aliran air saat ini tidak berhenti. Kesimpulan yang benar adalah ...', opts: ['Kran air ditutup', 'Kran air tidak ditutup', 'Pompa air sedang rusak', 'Tampungan air kosong', 'Tidak ada kesimpulan'], ans: 1, exp: 'Modus tollens: p -> q, ~q, maka ~p (Kran air tidak ditutup).' },
    { q: 'Jika pupuk organik digunakan, kesuburan tanah meningkat. Kesuburan tanah saat ini tidak meningkat. Kesimpulan yang benar adalah ...', opts: ['Pupuk organik digunakan', 'Pupuk organik tidak digunakan', 'Tanah terlalu gembur', 'Hujan terlalu sering turun', 'Tidak ada kesimpulan'], ans: 1, exp: 'Modus tollens: p -> q, ~q, maka ~p (Pupuk organik tidak digunakan).' },
    { q: 'Jika oven panas, kue akan matang. Kue saat ini belum matang. Kesimpulan yang benar adalah ...', opts: ['Oven panas', 'Oven tidak panas', 'Kue terlalu tebal', 'Adonan kue kurang telur', 'Tidak ada kesimpulan'], ans: 1, exp: 'Modus tollens: p -> q, ~q, maka ~p (Oven tidak panas).' },
    { q: 'Jika guru datang, suasana kelas menjadi tenang. Suasana kelas saat ini tidak tenang. Kesimpulan yang benar adalah ...', opts: ['Guru datang', 'Guru tidak datang', 'Siswa sedang berdiskusi', 'Bel pulang berbunyi', 'Tidak ada kesimpulan'], ans: 1, exp: 'Modus tollens: p -> q, ~q, maka ~p (Guru tidak datang).' },
    { q: 'Jika obat diminum, rasa sakit akan reda. Rasa sakit saat ini tidak reda. Kesimpulan yang benar adalah ...', opts: ['Obat diminum', 'Obat tidak diminum', 'Dosis obat terlalu rendah', 'Obat telah kedaluwarsa', 'Tidak ada kesimpulan'], ans: 1, exp: 'Modus tollens: p -> q, ~q, maka ~p (Obat tidak diminum).' },
    { q: 'Jika tanaman disiram teratur, daunnya berwarna hijau segar. Daun tanaman saat ini tidak berwarna hijau segar. Kesimpulan yang benar adalah ...', opts: ['Tanaman disiram teratur', 'Tanaman tidak disiram teratur', 'Tanaman kekurangan sinar matahari', 'Tanaman terlalu banyak pupuk', 'Tidak ada kesimpulan'], ans: 1, exp: 'Modus tollens: p -> q, ~q, maka ~p (Tanaman tidak disiram teratur).' },
    { q: 'Jika rem ditekan, kecepatan sepeda berkurang. Kecepatan sepeda saat ini tidak berkurang. Kesimpulan yang benar adalah ...', opts: ['Rem ditekan', 'Rem tidak ditekan', 'Kabel rem terputus', 'Jalanan menurun curam', 'Tidak ada kesimpulan'], ans: 1, exp: 'Modus tollens: p -> q, ~q, maka ~p (Rem tidak ditekan).' },
    { q: 'Jika cat kering, permukaan meja tidak lengket. Permukaan meja saat ini lengket. Kesimpulan yang benar adalah ...', opts: ['Cat kering', 'Cat tidak kering', 'Meja terbuat dari plastik', 'Meja baru saja dibersihkan', 'Tidak ada kesimpulan'], ans: 1, exp: 'Modus tollens: p -> q, ~q, maka ~p (Cat tidak kering).' },
    { q: 'Jika bel berbunyi, pintu gerbang dibuka. Pintu gerbang saat ini tidak dibuka. Kesimpulan yang benar adalah ...', opts: ['Bel berbunyi', 'Bel tidak berbunyi', 'Penjaga gerbang pergi', 'Tamu sudah pulang', 'Tidak ada kesimpulan'], ans: 1, exp: 'Modus tollens: p -> q, ~q, maka ~p (Bel tidak berbunyi).' },
    { q: 'Jika pupuk ditambahkan, pertumbuhan tanaman menjadi cepat. Pertumbuhan tanaman saat ini lambat. Kesimpulan yang benar adalah ...', opts: ['Pupuk ditambahkan', 'Pupuk tidak ditambahkan', 'Tanaman kekurangan air', 'Suhu udara terlalu panas', 'Tidak ada kesimpulan'], ans: 1, exp: 'Modus tollens: p -> q, ~q, maka ~p (Pupuk tidak ditambahkan).' },
    { q: 'Jika tiket dipesan awal, harga menjadi lebih murah. Harga tiket saat ini tidak lebih murah. Kesimpulan yang benar adalah ...', opts: ['Tiket dipesan awal', 'Tiket tidak dipesan awal', 'Tiket sudah habis terjual', 'Terjadi diskon besar-besaran', 'Tidak ada kesimpulan'], ans: 1, exp: 'Modus tollens: p -> q, ~q, maka ~p (Tiket tidak dipesan awal).' },
    { q: 'Jika alarm berbunyi, Budi bangun tidur. Budi saat ini tidak bangun tidur. Kesimpulan yang benar adalah ...', opts: ['Alarm berbunyi', 'Alarm tidak berbunyi', 'Budi begadang semalaman', 'Budi tidak mendengar alarm', 'Tidak ada kesimpulan'], ans: 1, exp: 'Modus tollens: p -> q, ~q, maka ~p (Alarm tidak berbunyi).' }
  ],
  silogisme: [
    { q: 'Semua mamalia menyusui anaknya. Lumba-lumba adalah mamalia. Kesimpulan yang sah adalah ...', opts: ['Lumba-lumba tidak menyusui anaknya', 'Semua yang menyusui anaknya adalah lumba-lumba', 'Lumba-lumba menyusui anaknya', 'Sebagian mamalia bukan lumba-lumba', 'Lumba-lumba bertelur dan menyusui'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Lumba-lumba menyusui anaknya).' },
    { q: 'Semua unggas bertelur. Bebek adalah unggas. Kesimpulan yang sah adalah ...', opts: ['Bebek tidak bertelur', 'Bebek adalah sejenis reptil', 'Bebek bertelur', 'Sebagian bebek tidak bertelur', 'Unggas bertelur hanya di air'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Bebek bertelur).' },
    { q: 'Semua tanaman membutuhkan air. Mawar adalah tanaman. Kesimpulan yang sah adalah ...', opts: ['Mawar hidup di gurun pasir', 'Mawar tidak membutuhkan air', 'Mawar membutuhkan air', 'Sebagian mawar mati kekeringan', 'Air hanya untuk mawar'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Mawar membutuhkan air).' },
    { q: 'Semua dokter memiliki lisensi praktek. Hendra adalah seorang dokter. Kesimpulan yang sah adalah ...', opts: ['Hendra tidak memiliki lisensi', 'Hendra bekerja di rumah sakit besar', 'Hendra memiliki lisensi praktek', 'Hendra adalah dokter spesialis', 'Tidak ada dokter yang tidak berlisensi'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Hendra memiliki lisensi praktek).' },
    { q: 'Semua kendaraan listrik ramah lingkungan. Mobil Tesla adalah kendaraan listrik. Kesimpulan yang sah adalah ...', opts: ['Tesla menggunakan bensin', 'Tesla tidak ramah lingkungan', 'Mobil Tesla ramah lingkungan', 'Sebagian mobil listrik tidak ramah', 'Semua kendaraan ramah adalah Tesla'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Mobil Tesla ramah lingkungan).' },
    { q: 'Semua mahasiswa universitas X harus mengikuti ospek. Soni adalah mahasiswa universitas X. Kesimpulan yang sah adalah ...', opts: ['Soni tidak harus mengikuti ospek', 'Soni mengikuti kegiatan kemahasiswaan', 'Soni harus mengikuti ospek', 'Soni adalah ketua panitia ospek', 'Ospek diadakan setahun sekali'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Soni harus mengikuti ospek).' },
    { q: 'Semua guru memiliki kompetensi pedagogik. Ibu Retno adalah seorang guru. Kesimpulan yang sah adalah ...', opts: ['Ibu Retno tidak berkompeten', 'Ibu Retno mengajar matematika saja', 'Ibu Retno memiliki kompetensi pedagogik', 'Sebagian guru tidak kompeten', 'Pendidikan keguruan sangat penting'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Ibu Retno memiliki kompetensi pedagogik).' },
    { q: 'Semua planet mengorbit bintang matahari. Jupiter adalah sebuah planet. Kesimpulan yang sah adalah ...', opts: ['Jupiter adalah bintang gas', 'Jupiter tidak mengorbit matahari', 'Jupiter mengorbit bintang matahari', 'Sebagian planet tidak mengorbit', 'Matahari adalah pusat galaksi'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Jupiter mengorbit bintang matahari).' },
    { q: 'Semua logam menghantarkan arus listrik. Tembaga adalah logam. Kesimpulan yang sah adalah ...', opts: ['Tembaga merupakan isolator listrik', 'Tembaga tidak menghantarkan listrik', 'Tembaga menghantarkan arus listrik', 'Tembaga adalah logam mulia', 'Listrik mengalir lewat tembaga saja'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Tembaga menghantarkan arus listrik).' },
    { q: 'Semua reptil berdarah dingin. Kadal adalah reptil. Kesimpulan yang sah adalah ...', opts: ['Kadal berdarah panas', 'Kadal tidak berdarah dingin', 'Kadal berdarah dingin', 'Sebagian kadal menyukai air', 'Reptil menyukai tempat lembab'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Kadal berdarah dingin).' },
    { q: 'Semua anak usia sekolah wajib imunisasi. Dito adalah anak usia sekolah. Kesimpulan yang sah adalah ...', opts: ['Dito tidak wajib imunisasi', 'Dito sedang sakit demam', 'Dito wajib imunisasi', 'Sebagian anak takut imunisasi', 'Imunisasi diadakan gratis'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Dito wajib imunisasi).' },
    { q: 'Semua lukisan abstrak sulit dipahami orang awam. Lukisan X adalah lukisan abstrak. Kesimpulan yang sah adalah ...', opts: ['Lukisan X mudah dipahami', 'Lukisan X berharga sangat mahal', 'Lukisan X sulit dipahami orang awam', 'Lukisan X dibuat oleh maestro terkenal', 'Orang awam menyukai lukisan X'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Lukisan X sulit dipahami orang awam).' },
    { q: 'Semua obat herbal tidak mengandung pengawet kimia. Kapsul Y adalah obat herbal. Kesimpulan yang sah adalah ...', opts: ['Kapsul Y rasanya sangat pahit', 'Kapsul Y mengandung pengawet kimia', 'Kapsul Y tidak mengandung pengawet kimia', 'Kapsul Y diproduksi secara modern', 'Semua yang berkhasiat adalah herbal'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Kapsul Y tidak mengandung pengawet kimia).' },
    { q: 'Semua pelari maraton memiliki stamina prima. Agus adalah pelari maraton. Kesimpulan yang sah adalah ...', opts: ['Agus sering merasa lelah', 'Agus tidak memiliki stamina prima', 'Agus memiliki stamina prima', 'Agus menjuarai lomba maraton', 'Stamina prima hanya untuk pelari'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Agus memiliki stamina prima).' },
    { q: 'Semua program komputer memerlukan memori RAM untuk berjalan. Program Z adalah program komputer. Kesimpulan yang sah adalah ...', opts: ['Program Z dapat berjalan tanpa memori RAM', 'Program Z tidak memerlukan memori RAM', 'Program Z memerlukan memori RAM untuk berjalan', 'Program Z berjalan sangat cepat', 'Memori RAM hanya untuk program Z'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Program Z memerlukan memori RAM untuk berjalan).' },
    { q: 'Semua serangga bernapas dengan trakea. Belalang adalah serangga. Kesimpulan yang sah adalah ...', opts: ['Belalang bernapas dengan paru-paru', 'Belalang tidak bernapas dengan trakea', 'Belalang bernapas dengan trakea', 'Sebagian serangga bernapas bebas', 'Trakea adalah organ mamalia'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Belalang bernapas dengan trakea).' },
    { q: 'Semua buah matang terasa manis. Mangga di atas meja sudah matang. Kesimpulan yang sah adalah ...', opts: ['Mangga itu berwarna kuning cerah', 'Mangga itu rasanya masam segar', 'Mangga di atas meja terasa manis', 'Sebagian buah manis adalah mangga', 'Semua buah di atas meja manis'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Mangga di atas meja terasa manis).' },
    { q: 'Semua pegawai negeri sipil mendapatkan gaji bulanan. Tono adalah pegawai negeri sipil. Kesimpulan yang sah adalah ...', opts: ['Tono tidak berstatus karyawan swasta', 'Tono tidak mendapatkan gaji bulanan', 'Tono mendapatkan gaji bulanan', 'Tono mendapat tunjangan hari raya', 'Gaji bulanan PNS selalu naik'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Tono mendapatkan gaji bulanan).' },
    { q: 'Semua alat musik tiup menggunakan udara untuk bersuara. Seruling adalah alat musik tiup. Kesimpulan yang sah adalah ...', opts: ['Seruling berbunyi karena dipukul', 'Seruling tidak menggunakan udara', 'Seruling menggunakan udara untuk bersuara', 'Seruling terbuat dari bambu pilihan', 'Udara mengalir di semua alat musik'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Seruling menggunakan udara untuk bersuara).' },
    { q: 'Semua bilangan genap habis dibagi dua. Angka delapan belas adalah bilangan genap. Kesimpulan yang sah adalah ...', opts: ['Angka delapan belas adalah bilangan ganjil', 'Angka delapan belas tidak habis dibagi dua', 'Angka delapan belas habis dibagi dua', 'Semua yang habis dibagi dua adalah 18', 'Delapan belas adalah bilangan prima'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Angka delapan belas habis dibagi dua).' },
    { q: 'Semua hewan karnivora memakan daging. Harimau adalah hewan karnivora. Kesimpulan yang sah adalah ...', opts: ['Harimau memakan tumbuh-tumbuhan', 'Harimau tidak memakan daging', 'Harimau memakan daging', 'Sebagian karnivora memakan daging', 'Harimau hidup di kebun binatang'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Harimau memakan daging).' },
    { q: 'Semua warga negara wajib membayar pajak bumi dan bangunan. Ayah adalah warga negara. Kesimpulan yang sah adalah ...', opts: ['Ayah dibebaskan dari pajak', 'Ayah tidak wajib membayar pajak', 'Ayah wajib membayar pajak bumi dan bangunan', 'Pajak digunakan untuk pembangunan jalan', 'Semua pembayar pajak adalah warga'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Ayah wajib membayar pajak bumi dan bangunan).' },
    { q: 'Semua siswa kelas XII harus mengikuti ujian kelulusan. Roni adalah siswa kelas XII. Kesimpulan yang sah adalah ...', opts: ['Roni dibebaskan dari ujian kelulusan', 'Roni tidak harus mengikuti ujian kelulusan', 'Roni harus mengikuti ujian kelulusan', 'Roni telah belajar giat semalaman', 'Ujian kelulusan diadakan serentak'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Roni harus mengikuti ujian kelulusan).' },
    { q: 'Semua jenis burung memiliki bulu sebagai penutup tubuh. Burung unta adalah jenis burung. Kesimpulan yang sah adalah ...', opts: ['Burung unta tidak bisa terbang bebas', 'Burung unta tidak memiliki bulu', 'Burung unta memiliki bulu sebagai penutup tubuh', 'Bulu burung unta berwarna cokelat', 'Bulu hanya dimiliki burung unta'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Burung unta memiliki bulu sebagai penutup tubuh).' },
    { q: 'Semua barang antik berharga tinggi. Guci dinasti Ming adalah barang antik. Kesimpulan yang sah adalah ...', opts: ['Guci itu dipajang di museum sejarah', 'Guci dinasti Ming harganya sangat murah', 'Guci dinasti Ming berharga tinggi', 'Sebagian barang antik murah harganya', 'Hanya guci Ming yang berharga tinggi'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Guci dinasti Ming berharga tinggi).' },
    { q: 'Semua zat asam mengubah warna lakmus biru menjadi merah. Cairan jeruk adalah zat asam. Kesimpulan yang sah adalah ...', opts: ['Cairan jeruk rasanya sangat asam', 'Cairan jeruk tidak mengubah warna lakmus', 'Cairan jeruk mengubah warna lakmus biru menjadi merah', 'Lakmus merah berubah menjadi biru cerah', 'Semua buah mengandung zat asam jeruk'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Cairan jeruk mengubah warna lakmus biru menjadi merah).' },
    { q: 'Semua peserta pelatihan berhak mendapatkan sertifikat kehadiran. Dina adalah peserta pelatihan. Kesimpulan yang sah adalah ...', opts: ['Dina tidak berhak mendapat sertifikat', 'Dina dibebaskan dari tugas pelatihan', 'Dina berhak mendapatkan sertifikat kehadiran', 'Dina lulus pelatihan dengan predikat terbaik', 'Sertifikat hanya diberikan kepada Dina'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Dina berhak mendapatkan sertifikat kehadiran).' },
    { q: 'Semua obat resep dokter harus dibeli dengan resep resmi. Obat X adalah obat resep dokter. Kesimpulan yang sah adalah ...', opts: ['Obat X bebas dibeli di toko obat', 'Obat X tidak perlu resep dokter', 'Obat X harus dibeli dengan resep resmi', 'Obat X diproduksi oleh pabrik besar', 'Semua obat dibeli dengan resep resmi'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Obat X harus dibeli dengan resep resmi).' },
    { q: 'Semua segitiga memiliki total sudut seratus delapan puluh derajat. Bangun datar Y adalah segitiga. Kesimpulan yang sah adalah ...', opts: ['Bangun Y memiliki sudut lancip semua', 'Bangun Y memiliki total sudut kurang dari 180', 'Bangun datar Y memiliki total sudut seratus delapan puluh derajat', 'Bangun Y merupakan segitiga siku-siku', 'Segitiga memiliki sudut bervariasi'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Bangun datar Y memiliki total sudut seratus delapan puluh derajat).' },
    { q: 'Semua masakan padang terkenal dengan bumbu rempahnya yang gurih. Rendang adalah masakan padang. Kesimpulan yang sah adalah ...', opts: ['Rendang rasanya manis dan gurih', 'Rendang tidak terkenal dengan rempahnya', 'Rendang terkenal dengan bumbu rempahnya yang gurih', 'Rendang dimasak dalam waktu singkat', 'Semua makanan gurih adalah rendang'], ans: 2, exp: 'Silogisme: Semua A adalah B. C adalah A. Maka C adalah B (Rendang terkenal dengan bumbu rempahnya yang gurih).' }
  ],
  analitis: [
    { q: 'Ali lebih tinggi dari Budi. Budi lebih pendek dari Cici. Cici lebih pendek dari Ali. Siapakah yang paling tinggi?', opts: ['Ali', 'Budi', 'Cici', 'Ali dan Cici sama tinggi', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan tinggi: Ali > Cici > Budi. Maka yang tertinggi adalah Ali.' },
    { q: 'Soni lebih tua dari Toni. Toni lebih muda dari Uni. Uni lebih muda dari Soni. Siapakah yang paling tua?', opts: ['Soni', 'Toni', 'Uni', 'Soni dan Uni sama usia', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan usia: Soni > Uni > Toni. Maka yang paling tua adalah Soni.' },
    { q: 'Tas merah lebih mahal dari tas biru. Tas biru lebih murah dari tas kuning. Tas kuning lebih murah dari tas merah. Tas manakah yang paling mahal?', opts: ['Tas merah', 'Tas biru', 'Tas kuning', 'Tas merah dan kuning sama harga', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan harga: Tas merah > Tas kuning > Tas biru. Maka yang paling mahal adalah tas merah.' },
    { q: 'Buku fisika lebih tebal dari buku kimia. Buku kimia lebih tipis dari buku biologi. Buku biologi lebih tipis dari buku fisika. Buku manakah yang paling tebal?', opts: ['Buku fisika', 'Buku kimia', 'Buku biologi', 'Buku fisika dan biologi sama tebal', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan tebal: Buku fisika > Buku biologi > Buku kimia. Maka yang paling tebal adalah buku fisika.' },
    { q: 'Rumah A lebih besar dari rumah B. Rumah B lebih kecil dari rumah C. Rumah C lebih kecil dari rumah A. Rumah manakah yang paling besar?', opts: ['Rumah A', 'Rumah B', 'Rumah C', 'Rumah A dan C sama besar', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan ukuran: Rumah A > Rumah C > Rumah B. Maka yang paling besar adalah rumah A.' },
    { q: 'Motor X lebih cepat dari motor Y. Motor Y lebih lambat dari motor Z. Motor Z lebih lambat dari motor X. Motor manakah yang paling cepat?', opts: ['Motor X', 'Motor Y', 'Motor Z', 'Motor X dan Z sama cepat', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan kecepatan: Motor X > Motor Z > Motor Y. Maka yang paling cepat adalah motor X.' },
    { q: 'Jeruk A lebih manis dari jeruk B. Jeruk B lebih masam dari jeruk C. Jeruk C lebih masam dari jeruk A. Jeruk manakah yang paling manis?', opts: ['Jeruk A', 'Jeruk B', 'Jeruk C', 'Jeruk A dan C sama manis', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan kemanisan: Jeruk A > Jeruk C > Jeruk B. Maka yang paling manis adalah jeruk A.' },
    { q: 'Roti P lebih lembut dari roti Q. Roti Q lebih keras dari roti R. Roti R lebih keras dari roti P. Roti manakah yang paling lembut?', opts: ['Roti P', 'Roti Q', 'Roti R', 'Roti P dan R sama lembut', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan kelembutan: Roti P > Roti R > Roti Q. Maka yang paling lembut adalah roti P.' },
    { q: 'Siswa A lebih rajin dari siswa B. Siswa B lebih malas dari siswa C. Siswa C lebih malas dari siswa A. Siapakah siswa yang paling rajin?', opts: ['Siswa A', 'Siswa B', 'Siswa C', 'Siswa A dan C sama rajin', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan kerajinan: Siswa A > Siswa C > Siswa B. Maka yang paling rajin adalah siswa A.' },
    { q: 'Nilai matematika Dito lebih tinggi dari nilai Budi. Nilai Budi lebih rendah dari nilai Cia. Nilai Cia lebih rendah dari nilai Dito. Siapa yang mendapat nilai tertinggi?', opts: ['Dito', 'Budi', 'Cia', 'Dito dan Cia sama nilainya', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan nilai: Dito > Cia > Budi. Maka yang mendapat nilai tertinggi adalah Dito.' },
    { q: 'Sepatu merah lebih baru dari sepatu hitam. Sepatu hitam lebih usang dari sepatu putih. Sepatu putih lebih usang dari sepatu merah. Sepatu manakah yang paling baru?', opts: ['Sepatu merah', 'Sepatu hitam', 'Sepatu putih', 'Sepatu merah dan putih sama baru', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan kebaruan: Sepatu merah > Sepatu putih > Sepatu hitam. Maka yang paling baru adalah sepatu merah.' },
    { q: 'Laptop A lebih cepat dari laptop B. Laptop B lebih lamban dari laptop C. Laptop C lebih lamban dari laptop A. Laptop manakah yang paling cepat?', opts: ['Laptop A', 'Laptop B', 'Laptop C', 'Laptop A dan C sama cepat', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan kecepatan: Laptop A > Laptop C > Laptop B. Maka yang paling cepat adalah laptop A.' },
    { q: 'Sungai X lebih dalam dari sungai Y. Sungai Y lebih dangkal dari sungai Z. Sungai Z lebih dangkal dari sungai X. Sungai manakah yang paling dalam?', opts: ['Sungai X', 'Sungai Y', 'Sungai Z', 'Sungai X dan Z sama dalam', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan kedalaman: Sungai X > Sungai Z > Sungai Y. Maka yang paling dalam adalah sungai X.' },
    { q: 'Kue A lebih manis dari kue B. Kue B lebih hambar dari kue C. Kue C lebih hambar dari kue A. Kue manakah yang paling manis?', opts: ['Kue A', 'Kue B', 'Kue C', 'Kue A dan C sama manis', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan rasa manis: Kue A > Kue C > Kue B. Maka yang paling manis adalah kue A.' },
    { q: 'Gedung A lebih tinggi dari gedung B. Gedung B lebih rendah dari gedung C. Gedung C lebih rendah dari gedung A. Gedung manakah yang paling tinggi?', opts: ['Gedung A', 'Gedung B', 'Gedung C', 'Gedung A dan C sama tinggi', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan tinggi: Gedung A > Gedung C > Gedung B. Maka yang paling tinggi adalah gedung A.' },
    { q: 'Meja A lebih panjang dari meja B. Meja B lebih pendek dari meja C. Meja C lebih pendek dari meja A. Meja manakah yang paling panjang?', opts: ['Meja A', 'Meja B', 'Meja C', 'Meja A dan C sama panjang', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan panjang: Meja A > Meja C > Meja B. Maka yang paling panjang adalah meja A.' },
    { q: 'Lampu A lebih terang dari lampu B. Lampu B lebih redup dari lampu C. Lampu C lebih redup dari lampu A. Lampu manakah yang paling terang?', opts: ['Lampu A', 'Lampu B', 'Lampu C', 'Lampu A dan C sama terang', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan keterangan: Lampu A > Lampu C > Lampu B. Maka yang paling terang adalah lampu A.' },
    { q: 'Pohon A lebih rimbun dari pohon B. Pohon B lebih gundul dari pohon C. Pohon C lebih gundul dari pohon A. Pohon manakah yang paling rimbun?', opts: ['Pohon A', 'Pohon B', 'Pohon C', 'Pohon A dan C sama rimbun', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan kerimbunan: Pohon A > Pohon C > Pohon B. Maka yang paling rimbun adalah pohon A.' },
    { q: 'Kain A lebih halus dari kain B. Kain B lebih kasar dari kain C. Kain C lebih kasar dari kain A. Kain manakah yang paling halus?', opts: ['Kain A', 'Kain B', 'Kain C', 'Kain A dan C sama halus', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan kehalusan: Kain A > Kain C > Kain B. Maka yang paling halus adalah kain A.' },
    { q: 'Jalan A lebih lebar dari jalan B. Jalan B lebih sempit dari jalan C. Jalan C lebih sempit dari jalan A. Jalan manakah yang paling lebar?', opts: ['Jalan A', 'Jalan B', 'Jalan C', 'Jalan A dan C sama lebar', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan kelebaran: Jalan A > Jalan C > Jalan B. Maka yang paling lebar adalah jalan A.' },
    { q: 'Lemari A lebih berat dari lemari B. Lemari B lebih ringan dari lemari C. Lemari C lebih ringan dari lemari A. Lemari manakah yang paling berat?', opts: ['Lemari A', 'Lemari B', 'Lemari C', 'Lemari A dan C sama berat', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan keberatan: Lemari A > Lemari C > Lemari B. Maka yang paling berat adalah lemari A.' },
    { q: 'Kamera A lebih mahal dari kamera B. Kamera B lebih murah dari kamera C. Kamera C lebih murah dari kamera A. Kamera manakah yang paling mahal?', opts: ['Kamera A', 'Kamera B', 'Kamera C', 'Kamera A dan C sama harga', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan harga: Kamera A > Kamera C > Kamera B. Maka yang paling mahal adalah kamera A.' },
    { q: 'Piring A lebih bersih dari piring B. Piring B lebih kotor dari piring C. Piring C lebih kotor dari piring A. Piring manakah yang paling bersih?', opts: ['Piring A', 'Piring B', 'Piring C', 'Piring A dan C sama bersih', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan kebersihan: Piring A > Piring C > Piring B. Maka yang paling bersih adalah piring A.' },
    { q: 'Kertas A lebih putih dari kertas B. Kertas B lebih buram dari kertas C. Kertas C lebih buram dari kertas A. Kertas manakah yang paling putih?', opts: ['Kertas A', 'Kertas B', 'Kertas C', 'Kertas A dan C sama putih', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan keputihan: Kertas A > Kertas C > Kertas B. Maka yang paling putih adalah kertas A.' },
    { q: 'Baju A lebih tebal dari baju B. Baju B lebih tipis dari baju C. Baju C lebih tipis dari baju A. Baju manakah yang paling tebal?', opts: ['Baju A', 'Baju B', 'Baju C', 'Baju A dan C sama tebal', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan ketebalan: Baju A > Baju C > Baju B. Maka yang paling tebal adalah baju A.' },
    { q: 'Celana A lebih murah dari celana B. Celana B lebih mahal dari celana C. Celana C lebih mahal dari celana A. Celana manakah yang paling murah?', opts: ['Celana A', 'Celana B', 'Celana C', 'Celana A dan C sama murah', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan kemurahan: Celana A < Celana C < Celana B. Maka yang paling murah adalah celana A.' },
    { q: 'Topi A lebih lebar dari topi B. Topi B lebih kecil dari topi C. Topi C lebih kecil dari topi A. Topi manakah yang paling lebar?', opts: ['Topi A', 'Topi B', 'Topi C', 'Topi A dan C sama lebar', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan kelebaran: Topi A > Topi C > Topi B. Maka yang paling lebar adalah topi A.' },
    { q: 'Kacamata A lebih bening dari kacamata B. Kacamata B lebih kusam dari kacamata C. Kacamata C lebih kusam dari kacamata A. Kacamata manakah yang paling bening?', opts: ['Kacamata A', 'Kacamata B', 'Kacamata C', 'Kacamata A dan C sama bening', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan kebeningan: Kacamata A > Kacamata C > Kacamata B. Maka yang paling bening adalah kacamata A.' },
    { q: 'Sendok A lebih mengkilap dari sendok B. Sendok B lebih kusam dari sendok C. Sendok C lebih kusam dari sendok A. Sendok manakah yang paling mengkilap?', opts: ['Sendok A', 'Sendok B', 'Sendok C', 'Sendok A dan C sama kilap', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan kilap: Sendok A > Sendok C > Sendok B. Maka yang paling mengkilap adalah sendok A.' },
    { q: 'Kursi A lebih empuk dari kursi B. Kursi B lebih keras dari kursi C. Kursi C lebih keras dari kursi A. Kursi manakah yang paling empuk?', opts: ['Kursi A', 'Kursi B', 'Kursi C', 'Kursi A dan C sama empuk', 'Tidak dapat ditentukan'], ans: 0, exp: 'Urutan keempukan: Kursi A > Kursi C > Kursi B. Maka yang paling empuk adalah kursi A.' }
  ]
};

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

  categories.forEach((cat) => {
    let questionIdCounter = 1;

    difficulties.forEach((diff) => {
      const diffIdx = difficulties.indexOf(diff);
      // Generate exactly 10 questions for this category and difficulty
      for (let i = 0; i < 10; i++) {
        const globalIdx = diffIdx * 10 + i; // unique index 0 to 29
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
          const base = verbalBase.sinonim[globalIdx];
          questionText = `Sinonim dari kata "${base.q}" adalah ...`;
          options = [...base.opts];
          correctAnswer = base.ans;
          explanation = base.exp;
        }
        else if (cat === 'verbal-antonim') {
          timeLimit = 30;
          const base = verbalBase.antonim[globalIdx];
          questionText = `Lawan kata (antonim) dari kata "${base.q}" adalah ...`;
          options = [...base.opts];
          correctAnswer = base.ans;
          explanation = base.exp;
        }
        else if (cat === 'verbal-analogi') {
          timeLimit = 45;
          const base = verbalBase.analogi[globalIdx];
          questionText = base.q;
          options = [...base.opts];
          correctAnswer = base.ans;
          explanation = base.exp;
        }
        else if (cat === 'verbal-bacaan') {
          timeLimit = 90;
          const base = verbalBase.bacaan[globalIdx];
          passageText = base.p;
          questionText = base.q;
          options = [...base.opts];
          correctAnswer = base.ans;
          explanation = base.exp;
        }
        else if (cat === 'numerik-deret') {
          timeLimit = 60;
          const dType = globalIdx % 3 === 0 ? 'tambah' : globalIdx % 3 === 1 ? 'kali' : 'fibonacci';
          const start = 2 + globalIdx * 2;
          const step = 3 + (globalIdx % 4);
          const d = generateDeret(dType, start, step);
          questionText = `Lanjutkan deret angka berikut: ${d.seq}`;
          options = [...d.opts];
          correctAnswer = d.corrIdx;
          explanation = `Deret angka ini memiliki pola ${dType === 'tambah' ? 'penambahan konstan +' + step : dType === 'kali' ? 'perkalian konstan *' + step : 'penambahan Fibonacci (jumlah 2 suku sebelumnya)'}. Suku berikutnya adalah ${d.ans}.`;
        }
        else if (cat === 'numerik-aritmatika') {
          timeLimit = 60;
          const val1 = 12 + globalIdx * 3;
          const val2 = 5 + (globalIdx % 3);
          const val3 = 24 / (1 + (globalIdx % 3));
          questionText = `Berapakah hasil dari ${val1} + ${val2} x ${val3} - 10?`;
          const result = val1 + val2 * val3 - 10;
          options = [result, result + 5, result - 5, result + 10, result - 10].map(String);
          correctAnswer = 0;
          explanation = `Lakukan perkalian dahulu: ${val2} x ${val3} = ${val2 * val3}. Lalu tambahkan ${val1} dan kurangi 10: ${val1} + ${val2 * val3} - 10 = ${result}.`;
        }
        else if (cat === 'numerik-perbandingan') {
          timeLimit = 45;
          const valX = 15 + globalIdx * 2;
          questionText = `Jika x = 2/3 dari ${valX}, dan y = 40% dari ${valX * 2}, manakah hubungan yang benar?`;
          const x = (2/3) * valX;
          const y = 0.4 * (valX * 2);
          options = ['x > y', 'x < y', 'x = y', 'x = 2y', 'Hubungan x dan y tidak dapat ditentukan'];
          correctAnswer = x > y ? 0 : x < y ? 1 : 2;
          explanation = `Dihitung: x = 2/3 * ${valX} = ${x.toFixed(1)}. y = 40% * ${valX * 2} = ${y.toFixed(1)}. Sehingga ${x > y ? 'x > y' : x < y ? 'x < y' : 'x = y'}.`;
        }
        else if (cat === 'numerik-cerita') {
          timeLimit = 90;
          const speed = 60 + globalIdx * 5;
          const time = 2 + (globalIdx % 3);
          questionText = `Sebuah mobil melaju dengan kecepatan konstan ${speed} km/jam selama ${time} jam. Berapa jarak total yang ditempuh mobil tersebut?`;
          const dist = speed * time;
          options = [dist, dist + 20, dist - 20, dist + 40, dist - 40].map((d) => `${d} km`);
          correctAnswer = 0;
          explanation = `Jarak = Kecepatan x Waktu = ${speed} km/jam x ${time} jam = ${dist} km.`;
        }
        else if (cat === 'logika-penalaran') {
          timeLimit = 60;
          const base = logicalBase.penalaran[globalIdx];
          questionText = base.q;
          options = [...base.opts];
          correctAnswer = base.ans;
          explanation = base.exp;
        }
        else if (cat === 'logika-silogisme') {
          timeLimit = 45;
          const base = logicalBase.silogisme[globalIdx];
          questionText = base.q;
          options = [...base.opts];
          correctAnswer = base.ans;
          explanation = base.exp;
        }
        else if (cat === 'logika-analitis') {
          timeLimit = 60;
          const base = logicalBase.analitis[globalIdx];
          questionText = base.q;
          options = [...base.opts];
          correctAnswer = base.ans;
          explanation = base.exp;
        }
        else if (cat === 'logika-diagram') {
          timeLimit = 60;
          const patternKeys = [
            'series1', 'series2', 'series3', 'series4', 'series5',
            'series6', 'series7', 'series8', 'series9', 'series10',
            'series11', 'series12', 'series13', 'series14', 'series15',
            'analogy1', 'analogy2', 'analogy3', 'analogy4', 'analogy5',
            'analogy6', 'analogy7', 'analogy8', 'analogy9', 'analogy10',
            'analogy11', 'analogy12', 'analogy13', 'analogy14', 'analogy15'
          ];
          const patternIndex = globalIdx % patternKeys.length;
          const patternKey = patternKeys[patternIndex];
          const basePattern = figuralPatterns[patternKey as keyof typeof figuralPatterns];
          
          figuralData = {
            type: (patternKey.startsWith('series') ? 'pattern-series' : 'analogy') as 'pattern-series' | 'analogy',
            figures: [basePattern.q1, basePattern.q2, basePattern.q3],
            options: [...basePattern.opts]
          };
          
          const patternDetails: Record<string, { ans: number; exp: string }> = {
            series1: {
              ans: 0,
              exp: 'Garis berputar 90 derajat searah jarum jam (CW), sedangkan titik kuning bertambah 1 di setiap suku. Suku berikutnya harus menunjuk ke kiri (270 deg) dan memiliki 4 titik.'
            },
            series2: {
              ans: 1,
              exp: 'Sisi bangun datar di dalam persegi bertambah 1 di setiap suku (Segitiga -> Segiempat -> Segilima -> Segienam). Suku berikutnya adalah segienam.'
            },
            series3: {
              ans: 1,
              exp: 'Segitiga berputar 90 derajat searah jarum jam (CW) di setiap suku. Suku berikutnya harus menunjuk ke kiri (270 deg).'
            },
            series4: {
              ans: 0,
              exp: 'Jumlah kotak kecil yang diarsir bertambah 1 di setiap langkah searah jarum jam (1 -> 2 -> 3 -> 4). Suku berikutnya harus memiliki semua 4 kotak diarsir.'
            },
            series5: {
              ans: 0,
              exp: 'Jumlah lingkaran konsentris bertambah 1 di setiap langkah (1 -> 2 -> 3 -> 4). Suku berikutnya harus memiliki 4 lingkaran konsentris.'
            },
            series6: {
              ans: 0,
              exp: 'Titik berputar searah jarum jam (CW) dari sudut ke sudut pada persegi (kiri atas -> kanan atas -> kanan bawah -> kiri bawah). Suku berikutnya berada di sudut kiri bawah.'
            },
            series7: {
              ans: 1,
              exp: 'Garis-garis jari (spoke) bertambah satu per satu searah jarum jam (atas -> kanan -> bawah -> kiri). Suku berikutnya harus memiliki 4 jari (atas, kanan, bawah, kiri).'
            },
            series8: {
              ans: 1,
              exp: 'Arsiran (shading) berputar searah jarum jam (CW) dari kuadran ke kuadran (kanan atas -> kanan bawah -> kiri bawah -> kiri atas). Suku berikutnya harus memiliki arsiran di kuadran kiri atas.'
            },
            series9: {
              ans: 0,
              exp: 'Bentuk elips berputar 45 derajat searah jarum jam (CW) di setiap langkah (0 -> 45 -> 90 -> 135 derajat). Suku berikutnya berputar 135 derajat.'
            },
            series10: {
              ans: 1,
              exp: 'Jumlah garis horizontal sejajar di dalam lingkaran bertambah 1 di setiap langkah (1 -> 2 -> 3 -> 4). Suku berikutnya memiliki 4 garis horizontal.'
            },
            series11: {
              ans: 0,
              exp: 'Jumlah segitiga konsentris bertambah 1 di setiap langkah (1 -> 2 -> 3 -> 4). Suku berikutnya memiliki 4 segitiga konsentris.'
            },
            series12: {
              ans: 1,
              exp: 'Panah tunggal berputar 90 derajat searah jarum jam (CW) di setiap langkah (atas -> kanan -> bawah -> kiri). Suku berikutnya harus menunjuk ke kiri.'
            },
            series13: {
              ans: 0,
              exp: 'Jumlah sisi bangun datar berkurang 1 di setiap langkah (Segienam [6] -> Segilima [5] -> Segiempat [4] -> Segitiga [3]). Suku berikutnya adalah segitiga.'
            },
            series14: {
              ans: 1,
              exp: 'Jumlah lingkaran kecil (titik) di dalam persegi bertambah 1 di setiap langkah (1 -> 2 -> 3 -> 4). Suku berikutnya memiliki 4 titik.'
            },
            series15: {
              ans: 0,
              exp: 'Titik berputar searah jarum jam (CW) dari titik sudut (vertex) ke titik sudut segienam (atas -> kanan atas -> kanan bawah -> bawah). Suku berikutnya harus berada di sudut bawah.'
            },
            analogy1: {
              ans: 1,
              exp: 'Hubungan gambar pertama dan kedua adalah bentuk luar dan dalam saling bertukar posisi. Maka, lingkaran di luar dan segitiga di dalam berubah menjadi segitiga di luar dan lingkaran di dalam.'
            },
            analogy2: {
              ans: 1,
              exp: 'Bentuk pertama diisi penuh (solid) dan bentuk kedua kosong (outline). Dengan hubungan yang sama, persegi padat berubah menjadi persegi kosong.'
            },
            analogy3: {
              ans: 1,
              exp: 'Gambar kedua merupakan hasil pencerminan secara vertikal (dibalik ke bawah) dari gambar pertama. Maka setengah lingkaran menghadap ke atas dibalik menjadi menghadap ke bawah.'
            },
            analogy4: {
              ans: 1,
              exp: 'Jumlah sisi bangun datar bertambah 1 (Segitiga [3] -> Persegi [4]). Dengan pola yang sama, Segilima [5] berubah menjadi Segienam [6].'
            },
            analogy5: {
              ans: 1,
              exp: 'Gambar kedua membagi bentuk gambar pertama menjadi dua kali lipat lebih banyak bagian (2 bagian menjadi 4 bagian). Maka lingkaran dengan 2 bagian terbagi menjadi 4 bagian.'
            },
            analogy6: {
              ans: 1,
              exp: 'Hubungan gambar pertama dan kedua adalah rotasi 90 derajat searah jarum jam (CW). Dengan hubungan yang sama, bentuk L diputar 90 derajat.'
            },
            analogy7: {
              ans: 0,
              exp: 'Hubungan gambar pertama dan kedua adalah pertukaran posisi luar-dalam bangun bersarang (nested). Maka, lingkaran di luar dan persegi di dalam bertukar menjadi persegi di luar dan lingkaran di dalam.'
            },
            analogy8: {
              ans: 1,
              exp: 'Garis tepi bangun datar berubah dari garis utuh (solid) menjadi garis putus-putus (dashed). Dengan pola yang sama, segitiga solid berubah menjadi segitiga dengan garis putus-putus.'
            },
            analogy9: {
              ans: 0,
              exp: 'Jumlah elemen di dalam bangun datar bertambah dari 1 menjadi 3. Dengan pola yang sama, persegi dengan 1 titik kecil di dalam berubah menjadi persegi dengan 3 titik kecil.'
            },
            analogy10: {
              ans: 1,
              exp: 'Posisi elemen kecil berubah secara simetris / pencerminan. Lingkaran kecil di sebelah kanan persegi berpindah ke sebelah kiri. Dengan pola yang sama, lingkaran kecil di atas segitiga berpindah ke bagian bawah.'
            },
            analogy11: {
              ans: 1,
              exp: 'Satu bangun besar berubah menjadi dua bangun berukuran sedang yang berdampingan. Dengan pola yang sama, satu lingkaran besar berubah menjadi dua lingkaran sedang.'
            },
            analogy12: {
              ans: 0,
              exp: 'Panah tunggal searah berubah menjadi panah dua arah (bolak-balik). Dengan pola yang sama, panah tunggal vertikal berubah menjadi panah dua arah vertikal.'
            },
            analogy13: {
              ans: 0,
              exp: 'Bangun datar diberikan garis pemisah (bisecting line) secara vertikal tepat di tengah. Dengan pola yang sama, segitiga kosong ditambahi garis vertikal pembelah dari puncak ke alas.'
            },
            analogy14: {
              ans: 1,
              exp: 'Bangun datar yang terisi warna solid berubah menjadi outline putih saja. Dengan pola yang sama, segitiga terisi warna berubah menjadi outline segitiga kosong.'
            },
            analogy15: {
              ans: 1,
              exp: 'Garis tepi solid dan dashed saling bertukar posisi. Lingkaran solid (luar) & persegi dashed (dalam) berubah menjadi lingkaran dashed & persegi solid. Dengan pola yang sama, persegi solid & segitiga dashed berubah menjadi persegi dashed & segitiga solid.'
            }
          };

          const detail = patternDetails[patternKey];
          questionText = `Perhatikan deret pola/diagram di bawah ini. Pilih gambar selanjutnya yang logis untuk melengkapi deret gambar tersebut.`;
          options = ['A', 'B', 'C', 'D', 'E'];
          correctAnswer = detail.ans;
          explanation = detail.exp;
        }

        // Mix option index to avoid standard index 0 bias for generated options
        if (correctAnswer === 0 && options.length > 1 && cat !== 'logika-diagram') {
          const originalOptions = [...options];
          const newCorrect = (globalIdx + 2) % options.length;
          
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

  const allQuestions = [...questions, ...additionalTPAQuestions, ...additionalTPAQuestions2, ...additionalTPAQuestions3];

  if (typeof window !== 'undefined') {
    try {
      const customStr = localStorage.getItem('hondana_custom_offline_tpa');
      if (customStr) {
        const customQs = JSON.parse(customStr);
        if (Array.isArray(customQs)) {
          customQs.forEach((q) => {
            if (!allQuestions.some((existing) => existing.id === q.id)) {
              allQuestions.push(q);
            }
          });
        }
      }
    } catch (e) {
      console.error('Failed to parse custom TPA offline questions:', e);
    }
  }

  return allQuestions;
}

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

const additionalTPAQuestions2: Question[] = [
  // 1. Sinonim (mudah)
  {
    id: "tpa-verbal-sinonim-mudah-add2-1",
    testType: "TPA",
    category: "verbal-sinonim",
    difficulty: "mudah",
    question: "Sinonim dari kata \"STIMULUS\" adalah ...",
    options: ["Insting", "Rangsangan", "Aktif", "Gerakan", "Reflek"],
    correctAnswer: 1,
    explanation: "Sinonim dari kata \"STIMULUS\" adalah rangsangan, dorongan, atau impuls.",
    timeLimit: 30
  },
  // 2. Antonim (mudah)
  {
    id: "tpa-verbal-antonim-mudah-add2-2",
    testType: "TPA",
    category: "verbal-antonim",
    difficulty: "mudah",
    question: "Lawan kata (antonim) dari kata \"KONSERVATIF\" adalah ...",
    options: ["Kuno", "Kokoh", "Pelestarian", "Kontinu", "Modern"],
    correctAnswer: 4,
    explanation: "Konservatif memiliki arti kolot, kuno, atau bersikap mempertahankan keadaan, kebiasaan, dan tradisi yang berlaku. Lawan katanya adalah modern atau progresif.",
    timeLimit: 30
  },
  // 3. Analogi (mudah)
  {
    id: "tpa-verbal-analogi-mudah-add2-3",
    testType: "TPA",
    category: "verbal-analogi",
    difficulty: "mudah",
    question: "KAYU : POHON = PLASTIK : ...",
    options: ["Kristal", "Kimia", "Kaca", "Minyak Bumi", "Batu Bara"],
    correctAnswer: 3,
    explanation: "Kayu merupakan produk olahan atau turunan langsung dari Pohon, sebagaimana Plastik merupakan produk olahan atau turunan langsung dari Minyak Bumi.",
    timeLimit: 45
  },
  // 4. Analogi (mudah)
  {
    id: "tpa-verbal-analogi-mudah-add2-4",
    testType: "TPA",
    category: "verbal-analogi",
    difficulty: "mudah",
    question: "DUKA : CITA = HATI : ...",
    options: ["Cinta", "Perasaan", "Ayam", "Liver", "Nurani"],
    correctAnswer: 4,
    explanation: "Duka dan Cita berpasangan membentuk kata majemuk dukacita (kesedihan). Hati dan Nurani berpasangan membentuk kata majemuk hati nurani (lubuk hati paling dalam).",
    timeLimit: 45
  },
  // 5. Analogi (mudah)
  {
    id: "tpa-verbal-analogi-mudah-add2-5",
    testType: "TPA",
    category: "verbal-analogi",
    difficulty: "mudah",
    question: "DAHAGA : AIR = BODOH : ...",
    options: ["Ilmu", "Pintar", "Awam", "Sekolah", "Otak"],
    correctAnswer: 0,
    explanation: "Dahaga dapat dihilangkan atau dipuaskan dengan Air, sebagaimana kebodohan (Bodoh) dapat dihilangkan atau dipuaskan dengan Ilmu.",
    timeLimit: 45
  },
  // 6. Analogi (mudah)
  {
    id: "tpa-verbal-analogi-mudah-add2-6",
    testType: "TPA",
    category: "verbal-analogi",
    difficulty: "mudah",
    question: "PIJAR : BINTANG = ... : PETIR",
    options: ["Hantam", "Hangus", "Sambar", "Bakar", "Awan"],
    correctAnswer: 2,
    explanation: "Bintang memiliki aktivitas atau sifat berpijar, sebagaimana petir memiliki aktivitas atau sifat menyambar.",
    timeLimit: 45
  },
  // 7. Analogi (mudah)
  {
    id: "tpa-verbal-analogi-mudah-add2-7",
    testType: "TPA",
    category: "verbal-analogi",
    difficulty: "mudah",
    question: "MENGUAP : MENGEMBUN = MENCAIR : ...",
    options: ["Kondensasi", "Menyublim", "Membeku", "Meleleh", "Mengeras"],
    correctAnswer: 2,
    explanation: "Menguap (perubahan zat cair ke gas) berlawanan arah dengan Mengembun (perubahan gas ke cair). Mencair (perubahan padat ke cair) berlawanan arah dengan Membeku (perubahan cair ke padat).",
    timeLimit: 45
  },
  // 8. Bacaan (sedang)
  {
    id: "tpa-verbal-bacaan-sedang-add2-8",
    testType: "TPA",
    category: "verbal-bacaan",
    difficulty: "sedang",
    passage: "Seorang warga bernama Budi (45) merasa terganggu dengan aktivitas truk pengangkut tanah proyek jalan tol Trans-Nusantara Seksi 5 di wilayah Desa Karanganyar. Hilir mudik kendaraan tersebut menyebabkan polusi debu tebal dan membuat kondisi jalan desa menjadi kumuh. Budi, yang juga pedagang kuliner di daerah tersebut, mengaku usahanya mengalami penurunan omzet karena polusi udara. Lapak ayam potong dan ikan bakar miliknya kini harus selalu tertutup rapat demi menjaga kebersihan makanan. Meskipun rumahnya berjarak sekitar 1,5 kilometer dari lokasi proyek, dampak debu tetap terasa signifikan.\n\nMerespons keluhan warga, pihak pemerintah desa and pengelola proyek akhirnya menyepakati pembatasan jam operasional armada truk. Truk hanya diperbolehkan melintas pada pukul 08.00 hingga 16.00 WIB untuk siang hari, serta pukul 20.00 hingga 24.00 WIB untuk malam hari guna memberikan waktu istirahat bagi warga sekitar.\n\nPerwakilan pemerintah desa menegaskan bahwa masyarakat kini memiliki wewenang untuk melakukan pengawasan langsung di lapangan. Jika ditemukan truk vendor yang melanggar batas jam operasional atau melebihi kapasitas tonase jalan, warga diizinkan untuk menghentikan kendaraan tersebut. Selain pengaturan jadwal, setiap truk wajib menggunakan terpal penutup tanah dan ban kendaraan harus dibersihkan atau disemprot air sebelum keluar ke jalan umum desa. Pihak pengelola proyek juga menyediakan ganti rugi fisik untuk bangunan warga yang retak akibat getaran alat berat.",
    question: "Simpulan yang tepat untuk wacana di atas adalah ...",
    options: [
      "Kerugian ekonomi yang dialami oleh Budi akibat polusi debu truk proyek pembangunan.",
      "Pembatasan jam operasional truk pengangkut tanah proyek jalan tol Trans-Nusantara.",
      "Masyarakat Desa Karanganyar berupaya mengatasi dampak negatif pembangunan jalan tol melalui mediasi dan pengawasan bersama.",
      "Penghentian paksa truk vendor oleh warga desa yang melanggar batas muatan tonase.",
      "Prosedur pembersihan ban truk proyek sebelum memasuki jalan umum pedesaan."
    ],
    correctAnswer: 2,
    explanation: "Simpulan wacana tersebut mencakup keseluruhan alur cerita: keluhan warga Desa Karanganyar mengenai dampak pembangunan tol direspons dengan pertemuan/mediasi yang melahirkan aturan operasional serta pengawasan bersama oleh warga.",
    timeLimit: 90
  },
  // 9. Bacaan (sedang)
  {
    id: "tpa-verbal-bacaan-sedang-add2-9",
    testType: "TPA",
    category: "verbal-bacaan",
    difficulty: "sedang",
    passage: "Sidang lanjutan kasus dugaan suap pembangunan jalan yang menjerat mantan Bupati Sukamakmur, Hendra Wijaya, mengungkap sejumlah fakta baru di pengadilan. Jaksa Penuntut Umum (JPU) menyoroti lemahnya pengawasan dari pihak inspektorat daerah sehingga membuka celah munculnya praktik fee proyek di lingkungan Dinas Bina Marga dan Bina Konstruksi (BMBK). Agenda sidang tersebut adalah pemeriksaan keterangan saksi.\n\nDalam persidangan, JPU mengungkap bahwa pengawasan internal oleh inspektorat tidak berjalan maksimal. Laporan tentang isu pengaturan proyek hanya ditindaklanjuti secara informal berupa klarifikasi lisan tanpa adanya investigasi dokumen resmi atau audit kontraktor. Saksi Trianto selaku Inspektur Sukamakmur mengakui telah mendengar desas-desus mengenai fee proyek, namun belum melangkah ke tahap audit menyeluruh. Walaupun Bupati Hendra Wijaya sempat meminta monitoring terhadap empat proyek jalan utama, inspektorat hanya melakukan konfirmasi verbal ke dinas terkait.\n\nJaksa juga mendalami kedekatan pribadi dan kesamaan partai politik antara terdakwa dengan seorang anggota DPRD setempat yang diduga berperan sebagai penghubung pihak swasta. Ketua Majelis Hakim memutuskan untuk menunda sidang sementara waktu guna memberikan kesempatan istirahat, ibadah, dan makan (isoma), dan sidang akan dilanjutkan dengan agenda mendengarkan keterangan saksi-saksi lainnya.",
    question: "Pernyataan berikut ini yang sesuai dengan wacana di atas, KECUALI ...",
    options: [
      "Sidang lanjutan kasus dugaan suap mantan Bupati Sukamakmur, Hendra Wijaya, membuka fakta baru di pengadilan.",
      "Bupati Hendra Wijaya pernah meminta dilakukannya pengawasan terhadap pembangunan empat proyek jalan utama.",
      "Terdapat dugaan kelemahan pengawasan internal dalam proyek-proyek infrastruktur di Sukamakmur.",
      "Jaksa mendalami hubungan kedekatan pribadi dan kesamaan partai politik terdakwa dengan salah satu anggota DPRD.",
      "Pemeriksaan seluruh saksi untuk mengungkap alur dugaan suap proyek infrastruktur tersebut telah selesai dilaksanakan sebelum sidang diistirahatkan."
    ],
    correctAnswer: 4,
    explanation: "Pernyataan E tidak sesuai dengan teks. Teks menyebutkan bahwa sidang dihentikan sementara (ditunda) untuk istirahat (isoma) dan akan dilanjutkan kembali dengan pemeriksaan saksi-saksi berikutnya, yang berarti pemeriksaan belum selesai sepenuhnya.",
    timeLimit: 90
  },
  // 10. Bacaan (sedang)
  {
    id: "tpa-verbal-bacaan-sedang-add2-10",
    testType: "TPA",
    category: "verbal-bacaan",
    difficulty: "sedang",
    passage: "Puluhan jemaah haji lansia diberangkatkan untuk melaksanakan ibadah umrah wajib dari tempat penginapan mereka di Hotel Al-Barakah, Makkah, dengan menggunakan bus hidrolik khusus. Bus hidrolik merupakan kendaraan ramah disabilitas yang dilengkapi sistem lift hidrolik untuk membantu menaikkan dan menurunkan kursi roda tanpa harus melewati anak tangga biasa. Kursi roda jemaah ditempatkan pada platform pengangkat yang bergerak naik sejajar lantai bus, sehingga proses masuk kendaraan berjalan aman dan cepat. Di dalam bus juga tersedia sabuk pengaman khusus untuk menstabilkan kursi roda selama perjalanan.\n\nPetugas Penyelenggara Ibadah Haji (PPIH) bidang Lansia dan Disabilitas, Regina, menjelaskan bahwa rombongan jemaah yang diberangkatkan hari itu berjumlah 47 lansia yang seluruhnya menggunakan kursi roda dan didampingi pendorong resmi. Jemaah tersebut berasal dari kloter Surabaya dan Mataram yang tiba di Makkah secara bertahap pada akhir April dan awal Mei.\n\nUntuk menjaga kesiapan fisik jemaah lansia dan menghindari risiko kelelahan akibat paparan suhu panas ekstrem di Makkah, keberangkatan dijadwalkan pada pagi hari. Setibanya di Masjidil Haram, rombongan langsung menggunakan jasa pendorong kursi roda resmi untuk menyelesaikan rangkaian ibadah tawaf dan sa'i secara tertib.",
    question: "Berdasarkan wacana di atas, siapakah pihak utama yang menjadi sasaran penggunaan fasilitas bus hidrolik?",
    options: [
      "Jemaah haji lansia dan penyandang disabilitas.",
      "Jemaah umrah lansia dan penyandang disabilitas umum.",
      "Petugas penyelenggara ibadah haji (PPIH) bidang Landis.",
      "Seluruh jemaah haji yang berasal dari daerah Surabaya dan Mataram.",
      "Seluruh jemaah yang menginap di Hotel Al-Barakah."
    ],
    correctAnswer: 0,
    explanation: "Berdasarkan wacana, bus hidrolik merupakan kendaraan khusus yang diperuntukkan bagi membantu mobilitas penumpang, terutama jemaah haji lansia dan penyandang disabilitas, khususnya yang menggunakan kursi roda.",
    timeLimit: 90
  },
  // 11. Silogisme (mudah)
  {
    id: "tpa-logika-silogisme-mudah-add2-11",
    testType: "TPA",
    category: "logika-silogisme",
    difficulty: "mudah",
    question: "Semua wilayah dengan tingkat investasi tinggi terletak di pulau Sumatra. Sebagian wilayah dengan tingkat kelestarian tinggi tidak terletak di pulau Sumatra. Kesimpulan yang benar adalah ...",
    options: [
      "Semua wilayah dengan tingkat kelestarian tinggi terletak di pulau Sumatra.",
      "Sebagian wilayah dengan tingkat investasi tinggi tidak memiliki kelestarian tinggi.",
      "Sebagian wilayah dengan tingkat investasi tinggi ada di pulau Sumatra.",
      "Sebagian wilayah dengan tingkat kelestarian tinggi tidak memiliki tingkat investasi tinggi.",
      "Tidak ada wilayah di pulau Sumatra dengan tingkat investasi tinggi."
    ],
    correctAnswer: 3,
    explanation: "Semua wilayah investasi tinggi (A) berada di Sumatra (B). Sebagian kelestarian tinggi (C) tidak berada di Sumatra (bukan B). Karena setiap A adalah B, maka jika sesuatu bukan B, ia pasti bukan A. Dengan demikian, sebagian C (wilayah kelestarian tinggi yang tidak di Sumatra) pasti bukan A (bukan wilayah investasi tinggi).",
    timeLimit: 45
  },
  // 12. Silogisme (mudah)
  {
    id: "tpa-logika-silogisme-mudah-add2-12",
    testType: "TPA",
    category: "logika-silogisme",
    difficulty: "mudah",
    question: "Sebagian karyawan divisi pemasaran menguasai analisis data. Semua karyawan divisi pemasaran sudah mengikuti pelatihan bisnis. Kesimpulan yang benar adalah ...",
    options: [
      "Semua karyawan yang sudah mengikuti pelatihan bisnis menguasai analisis data.",
      "Semua karyawan divisi pemasaran sudah menguasai analisis data.",
      "Sebagian karyawan divisi pemasaran tidak menguasai analisis data.",
      "Semua karyawan yang menguasai analisis data sudah mengikuti pelatihan bisnis.",
      "Sebagian karyawan yang sudah mengikuti pelatihan bisnis menguasai analisis data."
    ],
    correctAnswer: 4,
    explanation: "Sebagian karyawan pemasaran (A) menguasai analisis data (B). Semua karyawan pemasaran (A) mengikuti pelatihan bisnis (C). Karena semua A adalah C, maka bagian dari A yang menguasai analisis data (B) pasti juga merupakan C. Kesimpulannya, sebagian C (karyawan yang mengikuti pelatihan bisnis) menguasai analisis data (B).",
    timeLimit: 45
  },
  // 13. Silogisme (mudah)
  {
    id: "tpa-logika-silogisme-mudah-add2-13",
    testType: "TPA",
    category: "logika-silogisme",
    difficulty: "mudah",
    question: "Tidak ada produk herbal buatan lokal yang mengandung bahan kimia sintetis. Semua obat dari laboratorium luar negeri mengandung bahan kimia sintetis. Kesimpulan yang benar adalah ...",
    options: [
      "Beberapa obat laboratorium luar negeri adalah produk herbal buatan lokal.",
      "Produk herbal buatan lokal adalah obat dari laboratorium luar negeri.",
      "Tidak ada obat dari laboratorium luar negeri yang merupakan produk herbal buatan lokal.",
      "Tidak ada obat dari laboratorium luar negeri yang mengandung bahan kimia sintetis.",
      "Semua yang mengandung bahan kimia sintetis adalah obat dari laboratorium luar negeri."
    ],
    correctAnswer: 2,
    explanation: "Tidak ada A (produk herbal lokal) yang merupakan B (mengandung bahan kimia sintetis). Semua C (obat luar negeri) adalah B. Karena tidak ada A yang B, dan semua C adalah B, maka tidak ada C yang bisa menjadi A (Tidak ada obat laboratorium luar negeri yang merupakan produk herbal lokal).",
    timeLimit: 45
  },
  // 14. Silogisme (mudah)
  {
    id: "tpa-logika-silogisme-mudah-add2-14",
    testType: "TPA",
    category: "logika-silogisme",
    difficulty: "mudah",
    question: "Semua pekerja kreatif yang sukses memiliki kedisiplinan yang tinggi. Sebagian mahasiswa seni tidak memiliki kedisiplinan yang tinggi. Kesimpulan yang benar adalah ...",
    options: [
      "Sebagian pekerja kreatif yang sukses bukanlah mahasiswa seni.",
      "Semua mahasiswa seni yang sukses memiliki kedisiplinan tinggi.",
      "Sebagian mahasiswa seni tidak memiliki kedisiplinan tinggi.",
      "Sebagian mahasiswa seni bukan merupakan pekerja kreatif yang sukses.",
      "Sebagian pekerja kreatif yang sukses adalah mahasiswa seni."
    ],
    correctAnswer: 3,
    explanation: "Semua pekerja kreatif sukses (A) memiliki kedisiplinan tinggi (B). Sebagian mahasiswa seni (C) tidak memiliki kedisiplinan tinggi (bukan B). Karena semua A harus B, maka sesuatu yang tidak memiliki B (tidak disiplin) pasti bukan A (bukan pekerja kreatif sukses). Jadi, sebagian mahasiswa seni bukan pekerja kreatif sukses.",
    timeLimit: 45
  },
  // 15. Silogisme (mudah)
  {
    id: "tpa-logika-silogisme-mudah-add2-15",
    testType: "TPA",
    category: "logika-silogisme",
    difficulty: "mudah",
    question: "Tidak ada dosen tetap bersertifikat yang berstatus guru honorer. Sebagian pendidik di sekolah swasta daerah sudah bersertifikat. Kesimpulan yang benar adalah ...",
    options: [
      "Sebagian pendidik di sekolah swasta daerah tidak berstatus guru honorer.",
      "Sebagian pendidik honorer sudah memiliki sertifikat dosen tetap.",
      "Sebagian pendidik bersertifikat adalah guru honorer di sekolah swasta daerah.",
      "Tidak ada pendidik di sekolah swasta daerah yang berstatus guru honorer.",
      "Tidak semua pendidik bersertifikat di sekolah swasta daerah adalah honorer."
    ],
    correctAnswer: 0,
    explanation: "Tidak ada A (dosen bersertifikat) yang B (honorer). Sebagian C (pendidik swasta) adalah A (bersertifikat). Karena sebagian C adalah A, dan A tidak ada yang B, maka bagian C yang merupakan A tersebut pasti bukan B (Sebagian pendidik di sekolah swasta daerah tidak berstatus guru honorer).",
    timeLimit: 45
  },
  // 16. Silogisme (mudah)
  {
    id: "tpa-logika-silogisme-mudah-add2-16",
    testType: "TPA",
    category: "logika-silogisme",
    difficulty: "mudah",
    question: "Semua keputusan bisnis harus diambil dengan analisis data yang mendalam. Sebagian keputusan bisnis diambil dengan mempertimbangkan intuisi manajemen. Kesimpulan yang benar adalah ...",
    options: [
      "Semua keputusan yang diambil dengan analisis data mendalam adalah keputusan bisnis.",
      "Sebagian keputusan bisnis diambil dengan intuisi manajemen tanpa analisis data.",
      "Sebagian keputusan bisnis harus diambil dengan analisis data mendalam.",
      "Semua keputusan dengan analisis data mendalam tidak mempertimbangkan intuisi.",
      "Sebagian keputusan dengan analisis data mendalam diambil dengan mempertimbangkan intuisi manajemen."
    ],
    correctAnswer: 4,
    explanation: "Semua keputusan bisnis (A) harus dengan analisis data mendalam (B). Sebagian keputusan bisnis (A) dengan intuisi manajemen (C). Maka, sebagian keputusan yang dianalisis secara mendalam (B) tersebut juga mempertimbangkan intuisi manajemen (C).",
    timeLimit: 45
  },
  // 17. Silogisme (mudah)
  {
    id: "tpa-logika-silogisme-mudah-add2-17",
    testType: "TPA",
    category: "logika-silogisme",
    difficulty: "mudah",
    question: "Semua transaksi keuangan digital harus diverifikasi oleh otoritas keuangan. Sebagian transaksi keuangan digital dilakukan melalui aplikasi dompet digital. Kesimpulan yang benar adalah ...",
    options: [
      "Sebagian transaksi melalui aplikasi dompet digital dilakukan tanpa verifikasi otoritas keuangan.",
      "Sebagian transaksi yang harus diverifikasi oleh otoritas keuangan dilakukan melalui aplikasi dompet digital.",
      "Sebagian transaksi digital tanpa verifikasi dilakukan melalui aplikasi dompet digital.",
      "Semua transaksi melalui aplikasi dompet digital tidak memerlukan verifikasi otoritas keuangan.",
      "Semua transaksi keuangan digital dilakukan tanpa verifikasi otoritas."
    ],
    correctAnswer: 1,
    explanation: "Semua transaksi digital (A) diverifikasi otoritas (B). Sebagian transaksi digital (A) lewat dompet digital (C). Karena semua A adalah B, maka bagian A yang lewat dompet digital (C) pasti juga B. Sehingga sebagian transaksi yang diverifikasi (B) dilakukan lewat dompet digital (C).",
    timeLimit: 45
  },
  // 18. Silogisme (mudah)
  {
    id: "tpa-logika-silogisme-mudah-add2-18",
    testType: "TPA",
    category: "logika-silogisme",
    difficulty: "mudah",
    question: "Semua calon karyawan yang memiliki nilai tes di bawah 70 tidak masuk kelas pelatihan khusus. Calon karyawan yang masuk kelas pelatihan khusus mendapatkan jaminan beasiswa pendidikan. Kesimpulan yang benar adalah ...",
    options: [
      "Semua calon karyawan yang memiliki nilai tes di bawah 70 tidak mendapat jaminan beasiswa pendidikan.",
      "Semua calon karyawan yang memiliki nilai tes di bawah 70 mendapat jaminan beasiswa pendidikan.",
      "Sebagian calon karyawan yang memiliki nilai tes di bawah 70 tidak mendapat jaminan beasiswa pendidikan.",
      "Sebagian calon karyawan yang memiliki nilai tes di bawah 70 mendapat jaminan beasiswa pendidikan.",
      "Tidak semua calon karyawan yang memiliki nilai tes di bawah 70 mendapat jaminan beasiswa pendidikan."
    ],
    correctAnswer: 4,
    explanation: "Calon karyawan nilai < 70 tidak masuk kelas pelatihan khusus. Karena jaminan beasiswa didapatkan melalui kelas pelatihan khusus, maka jalur beasiswa ini tidak diperoleh oleh kelompok nilai < 70, sehingga tidak semua calon karyawan dengan nilai di bawah 70 mendapat jaminan beasiswa pendidikan.",
    timeLimit: 45
  },
  // 19. Silogisme (mudah)
  {
    id: "tpa-logika-silogisme-mudah-add2-19",
    testType: "TPA",
    category: "logika-silogisme",
    difficulty: "mudah",
    question: "Anggota klub sudah menyelesaikan ujian fisik apabila sudah membayar iuran tahunan. Anggota klub sudah terdaftar di liga daerah jika sudah menyelesaikan ujian fisik. Jika anggota klub sudah terdaftar di liga daerah maka mereka sudah memiliki kartu lisensi atlet. Kesimpulan yang benar adalah ...",
    options: [
      "Anggota klub sudah membayar iuran tahunan apabila sudah menyelesaikan ujian fisik.",
      "Anggota klub sudah memiliki kartu lisensi atlet apabila sudah membayar iuran tahunan.",
      "Jika anggota klub sudah memiliki kartu lisensi atlet maka mereka sudah membayar iuran tahunan.",
      "Anggota klub sudah membayar iuran tahunan jika sudah terdaftar di liga daerah.",
      "Anggota klub sudah terdaftar di liga daerah jika sudah memiliki kartu lisensi atlet."
    ],
    correctAnswer: 1,
    explanation: "Mengikuti rantai implikasi: Membayar iuran tahunan -> Menyelesaikan ujian fisik -> Terdaftar di liga daerah -> Memiliki kartu lisensi atlet. Maka, jika anggota telah membayar iuran tahunan, mereka pasti sudah memiliki kartu lisensi atlet.",
    timeLimit: 45
  },
  // 20. Penalaran (sedang)
  {
    id: "tpa-logika-penalaran-sedang-add2-20",
    testType: "TPA",
    category: "logika-penalaran",
    difficulty: "sedang",
    question: "Jika pameran lukisan ditunda, Roni akan pergi memancing. Jika awan mendung, angin bertiup sangat kencang. Ternyata pameran lukisan ditunda tetapi angin tidak bertiup kencang. Kesimpulan yang benar adalah ...",
    options: [
      "Roni pergi memancing tetapi awan mendung.",
      "Roni pergi memancing karena angin tidak bertiup kencang.",
      "Roni pergi memancing tetapi awan tidak mendung.",
      "Angin tidak bertiup kencang tetapi Roni tidak pergi memancing.",
      "Angin tidak bertiup kencang atau Roni pergi memancing."
    ],
    correctAnswer: 2,
    explanation: "Pameran ditunda -> Roni pergi memancing. Karena pameran ditunda, Roni pasti memancing. Awan mendung -> Angin kencang. Karena angin tidak kencang, berdasarkan modus tollens, awan tidak mendung. Maka, Roni pergi memancing tetapi awan tidak mendung.",
    timeLimit: 60
  },
  // 21. Penalaran (sedang)
  {
    id: "tpa-logika-penalaran-sedang-add2-21",
    testType: "TPA",
    category: "logika-penalaran",
    difficulty: "sedang",
    question: "Jika Budi pergi ke perpustakaan maka Ayah membaca koran di rumah. Jika Budi berlatih di lapangan basket maka Ayah mendampinginya. Kesimpulan yang benar adalah ...",
    options: [
      "Jika Budi ke perpustakaan dan berlatih di lapangan basket maka Ayah membaca koran dan mendampingi Budi.",
      "Jika Budi tidak ke perpustakaan atau tidak berlatih di lapangan basket maka Ayah tidak membaca koran atau tidak mendampinginya.",
      "Jika Budi ke perpustakaan atau berlatih di lapangan basket maka Ayah membaca koran atau mendampinginya.",
      "Jika Ayah tidak membaca koran atau tidak mendampingi Budi, maka Budi ke perpustakaan atau berlatih di lapangan basket.",
      "Jika Ayah tidak membaca koran dan tidak mendampingi Budi, maka Budi tidak pergi ke perpustakaan atau tidak berlatih di lapangan basket."
    ],
    correctAnswer: 2,
    explanation: "Aturan Dilema Konstruktif menyatakan jika (p -> q) dan (r -> s), maka (p atau r) -> (q atau s). Jadi, jika Budi ke perpustakaan atau berlatih di lapangan basket, maka Ayah membaca koran atau mendampinginya.",
    timeLimit: 60
  },
  // 22. Penalaran (sedang)
  {
    id: "tpa-logika-penalaran-sedang-add2-22",
    testType: "TPA",
    category: "logika-penalaran",
    difficulty: "sedang",
    question: "Jika Roni ikut klub tenis maka ia akan membeli raket baru. Tetapi jika Roni membeli celana dan sepatu olahraga maka ia akan ikut klub lari. Kesimpulan yang benar adalah ...",
    options: [
      "Jika Roni ikut klub tenis atau membeli celana dan sepatu olahraga maka ia akan membeli raket baru atau ikut klub lari.",
      "Jika Roni tidak akan membeli raket baru dan ikut klub lari maka ia tidak ikut klub tenis dan membeli celana dan sepatu olahraga.",
      "Jika Roni ikut klub tenis atau membeli celana dan sepatu olahraga maka ia akan membeli raket baru atau ikut klub lari.",
      "Jika Roni akan membeli raket baru atau ikut klub lari maka ia akan ikut klub tenis atau membeli celana dan sepatu olahraga.",
      "Jika Roni tidak ikut klub tenis atau membeli celana dan sepatu olahraga maka ia tidak akan membeli raket baru atau ikut klub lari."
    ],
    correctAnswer: 2,
    explanation: "Berdasarkan dilema konstruktif: Jika (p -> q) dan (r -> s), maka (p atau r) -> (q atau s). Sehingga, jika Roni ikut klub tenis atau membeli celana dan sepatu olahraga, maka ia akan membeli raket baru atau ikut klub lari.",
    timeLimit: 60
  },
  // 23. Penalaran (sedang)
  {
    id: "tpa-logika-penalaran-sedang-add2-23",
    testType: "TPA",
    category: "logika-penalaran",
    difficulty: "sedang",
    question: "Jika terjadi inflasi maka suku bunga naik. Jika ekspor menurun maka nilai mata uang melemah. Ternyata, terjadi inflasi atau ekspor menurun atau keduanya. Kesimpulan yang benar adalah ...",
    options: [
      "Tidak terjadi inflasi maka nilai mata uang tidak melemah.",
      "Suku bunga naik karena nilai mata uang melemah.",
      "Nilai mata uang melemah atau terjadi inflasi atau keduanya.",
      "Suku bunga naik atau nilai mata uang melemah atau keduanya.",
      "Suku bunga naik dan nilai mata uang melemah saja tanpa inflasi."
    ],
    correctAnswer: 3,
    explanation: "Aturan Dilema Konstruktif: p -> q dan r -> s. Diketahui fakta p atau r. Maka kesimpulannya adalah q atau s (Suku bunga naik atau nilai mata uang melemah atau keduanya).",
    timeLimit: 60
  },
  // 24. Analitis (sedang)
  {
    id: "tpa-logika-analitis-sedang-add2-24",
    testType: "TPA",
    category: "logika-analitis",
    difficulty: "sedang",
    question: "Siswa akan melakukan kunjungan ke empat galeri seni (Galeri P, Galeri Q, Galeri R, Galeri S) dari hari Senin sampai Kamis (satu galeri per hari). Aturan kunjungan sebagai berikut:\n- Kunjungan ke Galeri P dan R tidak boleh dilaksanakan pada hari Kamis.\n- Kunjungan ke Galeri R maupun Q tidak boleh dilaksanakan pada hari Selasa.\n- Ada 3 galeri yang dikunjungi setelah Galeri S.\nKunjungan ke Galeri R dilaksanakan pada hari ...",
    options: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"],
    correctAnswer: 2,
    explanation: "Karena ada 3 galeri dikunjungi setelah Galeri S, maka Galeri S dikunjungi hari Senin. Sisa hari Selasa, Rabu, Kamis untuk P, Q, R. Karena R tidak boleh Kamis dan tidak boleh Selasa, maka Galeri R wajib dikunjungi pada hari Rabu.",
    timeLimit: 60
  },
  // 25. Analitis (sedang)
  {
    id: "tpa-logika-analitis-sedang-add2-25",
    testType: "TPA",
    category: "logika-analitis",
    difficulty: "sedang",
    question: "Lima pemenang lomba maraton (Arya, Bagas, Candra, Dion, Elvan) berbaris berdampingan dari kiri ke kanan untuk menerima trofi. Aturan posisi berdiri:\n- Bagas berdiri di sebelah kanan Arya, tetapi tidak bersebelahan dengan Candra.\n- Candra berdiri tepat di sebelah Dion, yang di sebelah kirinya berdiri Bagas.\n- Elvan berdiri di posisi paling jauh dari Candra.\nSiapakah kontestan yang berdiri tepat di posisi tengah?",
    options: ["Arya", "Bagas", "Candra", "Dion", "Elvan"],
    correctAnswer: 1,
    explanation: "Elvan paling jauh dari Candra. Jika Candra di posisi 5, Elvan wajib di posisi 1. Dion berdiri di sebelah Candra, maka Dion di posisi 4. Bagas berdiri di sebelah kiri Dion, maka Bagas di posisi 3. Arya tersisa di posisi 2. Urutan lengkap: Elvan, Arya, Bagas, Dion, Candra. Yang di tengah adalah Bagas.",
    timeLimit: 60
  },
  // 26. Analitis (sedang)
  {
    id: "tpa-logika-analitis-sedang-add2-26",
    testType: "TPA",
    category: "logika-analitis",
    difficulty: "sedang",
    question: "Lima pelari (P, Q, R, S, T) sedang berlomba. Pelari P lebih cepat daripada T, namun lebih lambat dari R. Jika pelari Q tidak lebih cepat daripada T, dan pelari S tidak lebih cepat dari P, maka kemungkinan pelari tercepat kedua adalah ...",
    options: ["T", "R", "S", "Q", "P"],
    correctAnswer: 4,
    explanation: "Hubungan kecepatan: R > P > T. Diketahui Q tidak lebih cepat dari T (T >= Q), dan S tidak lebih cepat dari P (P >= S). Ini berarti pelari R adalah yang tercepat, dan semua pelari lainnya (S, T, Q) lebih lambat atau sama dengan P. Maka pelari tercepat kedua adalah P.",
    timeLimit: 60
  },
  // 27. Analitis (sedang)
  {
    id: "tpa-logika-analitis-sedang-add2-27",
    testType: "TPA",
    category: "logika-analitis",
    difficulty: "sedang",
    question: "Delapan jenis roti diletakkan menjadi dua baris (depan dan belakang, masing-masing empat roti dari kiri ke kanan). Roti rasa keju diletakkan di depan roti rasa cokelat. Roti rasa keju diapit oleh roti rasa stroberi di sebelah kiri dan roti rasa vanila di sebelah kanan. Roti rasa melon diletakkan di ujung paling kanan sederet dengan roti rasa cokelat yang diapit roti rasa kismis di sebelah kiri dan roti rasa pandan di sebelah kanan. Di manakah roti rasa taro diletakkan?",
    options: [
      "Di antara roti rasa stroberi dan roti rasa keju",
      "Di antara roti rasa melon dan roti rasa cokelat",
      "Di depan roti rasa melon",
      "Di depan roti rasa kismis",
      "Tepat di sebelah kanan roti rasa stroberi"
    ],
    correctAnswer: 2,
    explanation: "Susunan roti baris depan: stroberi, keju, vanila, taro. Baris belakang: kismis, cokelat, pandan, melon. Roti rasa taro berada di posisi keempat baris depan, yang berarti tepat berada di depan roti rasa melon (posisi keempat baris belakang).",
    timeLimit: 60
  },
  // 28. Analitis (sedang)
  {
    id: "tpa-logika-analitis-sedang-add2-28",
    testType: "TPA",
    category: "logika-analitis",
    difficulty: "sedang",
    question: "Departemen Ilmu Komputer akan mengirim 3 tim mahasiswa untuk lomba debat. Masing-masing tim terdiri dari 3 mahasiswa dari angkatan berbeda (2023, 2024, 2025) dan kelas berbeda (X, Y, Z). Mahasiswa: Kelas X (Adit, Nova, Utama); Kelas Y (Zaskia, Helmi, Gita); Kelas Z (Bimo, Irma, Kevin). Kriteria pembentukan tim:\n- Setiap tim harus memiliki satu perwakilan dari kelas X, Y, dan Z.\n- Anggota satu tim harus berasal dari angkatan yang berbeda.\n- Utama, Helmi, dan Irma adalah angkatan paling senior (2023).\n- Gita dan Nova berasal dari angkatan yang sama.\n- Kevin dan Zaskia berasal dari angkatan yang berbeda.\nTim yang dapat terbentuk secara valid adalah ...",
    options: [
      "Helmi, Kevin, Adit - Irma, Gita, Adit - Nova, Zaskia, Bimo",
      "Adit, Helmi, Bimo - Utama, Gita, Irma - Nova, Zaskia, Kevin",
      "Helmi, Nova, Kevin - Utama, Zaskia, Bimo - Irma, Gita, Adit",
      "Utama, Irma, Kevin - Helmi, Nova, Adit - Zaskia, Gita, Bimo",
      "Helmi, Nova, Bimo - Utama, Kevin, Zaskia - Irma, Gita, Adit"
    ],
    correctAnswer: 2,
    explanation: "Utama, Helmi, Irma (angkatan 2023) harus berada di tim yang berbeda. Pilihan C menempatkan mereka secara terpisah: Helmi di Tim 1, Utama di Tim 2, Irma di Tim 3. Setiap tim juga mewakili kelas X, Y, Z tanpa tumpang tindih nama anggota.",
    timeLimit: 60
  },
  // 29. Analitis (sedang)
  {
    id: "tpa-logika-analitis-sedang-add2-29",
    testType: "TPA",
    category: "logika-analitis",
    difficulty: "sedang",
    question: "Lima manajer (Agus, Bayu, Citra, Dewi, Ely) akan ditugaskan ke lima kota berbeda (Surabaya, Medan, Makassar, Bali, Balikpapan) untuk survei lokasi. Preferensi kota manajer:\n- Agus: Surabaya atau Medan.\n- Bayu: Surabaya, Medan, atau Makassar.\n- Citra: Surabaya, Medan, atau Bali.\n- Dewi: Medan atau Balikpapan.\n- Ely: Medan atau Surabaya.\nAgar tidak ada manajer yang ditempatkan di kota yang sama, Dewi harus ditugaskan ke kota ...",
    options: ["Surabaya", "Balikpapan", "Medan", "Makassar", "Bali"],
    correctAnswer: 1,
    explanation: "Agus dan Ely hanya bersedia ke Surabaya atau Medan. Maka, Surabaya dan Medan dialokasikan untuk Agus dan Ely. Tersisa Makassar, Bali, dan Balikpapan. Bayu ditempatkan di Makassar, Citra di Bali. Dewi yang bersedia ke Medan atau Balikpapan harus ditempatkan di Balikpapan karena Medan sudah terpakai.",
    timeLimit: 60
  },
  // 30. Analitis (sedang)
  {
    id: "tpa-logika-analitis-sedang-add2-30",
    testType: "TPA",
    category: "logika-analitis",
    difficulty: "sedang",
    question: "Enam lukisan bertema alam ditata berbaris dari kiri ke kanan (urutan 1 sampai 6) di sebuah pameran seni. Lukisan tersebut adalah: Fajar, Embun, Pelangi, Senja, Rumpun, dan Angin. Aturan penataan lukisan:\n- Lukisan Fajar berada di posisi paling kiri (urutan 1).\n- Lukisan Pelangi berada di posisi paling kanan (urutan 6).\n- Lukisan Embun diletakkan tepat di sebelah kiri lukisan Pelangi.\n- Lukisan Rumpun diletakkan bersebelahan dengan lukisan Senja.\n- Lukisan Senja diletakkan bersebelahan dengan lukisan Embun.\n- Lukisan Angin berada di sebelah kiri lukisan Rumpun.\n- Lukisan Rumpun tidak diletakkan bersebelahan dengan lukisan Fajar maupun Pelangi.\nLukisan yang berada di urutan ketiga dari kiri adalah lukisan ...",
    options: ["Senja", "Embun", "Pelangi", "Rumpun", "Angin"],
    correctAnswer: 3,
    explanation: "Penentuan urutan: Posisi 1 = Fajar, posisi 6 = Pelangi. Embun tepat di kiri Pelangi, berarti posisi 5 = Embun. Senja bersebelahan dengan Embun, berarti posisi 4 = Senja. Rumpun bersebelahan dengan Senja, berarti posisi 3 = Rumpun. Angin di kiri Rumpun, berarti posisi 2 = Angin. Urutan lengkap: Fajar, Angin, Rumpun, Senja, Embun, Pelangi. Lukisan urutan ketiga adalah Rumpun.",
    timeLimit: 60
  },
  // 31. Analitis (sedang)
  {
    id: "tpa-logika-analitis-sedang-add2-31",
    testType: "TPA",
    category: "logika-analitis",
    difficulty: "sedang",
    question: "Sebuah toko tas memajang 5 ransel dengan tinggi berbeda:\n- Ransel Merah lebih tinggi daripada ransel Hijau.\n- Ransel Ungu lebih pendek daripada ransel Kuning.\n- Ransel Hijau lebih tinggi daripada ransel Kuning.\n- Ransel Biru lebih tinggi daripada ransel Hijau, tetapi lebih pendek dari satu ransel lainnya.\nRansel yang paling tinggi berwarna ...",
    options: ["Biru", "Merah", "Hijau", "Ungu", "Kuning"],
    correctAnswer: 1,
    explanation: "Dari aturan: Merah > Hijau, Kuning > Ungu, Hijau > Kuning, sehingga Merah > Hijau > Kuning > Ungu. Ransel Biru lebih tinggi dari Hijau namun lebih pendek dari satu ransel (Merah). Urutan lengkap tinggi: Merah > Biru > Hijau > Kuning > Ungu. Ransel tertinggi adalah Merah.",
    timeLimit: 60
  },
  // 32. Analitis (sedang)
  {
    id: "tpa-logika-analitis-sedang-add2-32",
    testType: "TPA",
    category: "logika-analitis",
    difficulty: "sedang",
    question: "Fandi dan Gilang gemar bermain catur. Hendra dan Fandi gemar berkemah di gunung. Siapa yang gemar bermain catur sambil berkemah di gunung?",
    options: ["Hendra", "Fandi", "Gilang", "Hendra dan Fandi", "Gilang dan Fandi"],
    correctAnswer: 1,
    explanation: "Fandi menyukai bermain catur (bersama Gilang) dan juga menyukai berkemah (bersama Hendra). Jadi, orang yang menyukai kedua aktivitas tersebut adalah Fandi.",
    timeLimit: 60
  },
  // 33. Analitis (sedang)
  {
    id: "tpa-logika-analitis-sedang-add2-33",
    testType: "TPA",
    category: "logika-analitis",
    difficulty: "sedang",
    question: "Seorang pengrajin keramik membuat 8 produk dalam 3 motif (Flora, Fauna, Geometris) dan 2 segmen pasar (Lokal, Ekspor). Nama produk: Andara, Bima, Cakra, Dewa, Eka, Fajar, Genta, Hari. Aturan:\n- Andara dan Genta memiliki segmen pasar yang sama tetapi motif berbeda.\n- Bima dan Cakra memiliki motif dan segmen pasar yang sama.\n- Andara bermotif Flora seperti Cakra, tetapi segmen pasarnya berbeda.\n- Genta dan Hari ditujukan untuk segmen pasar Ekspor dan motif yang sama, tetapi bukan Fauna.\n- Dewa memiliki motif yang berbeda dengan Hari dan Andara.\n- Motif Flora dan Fauna masing-masing memiliki 3 produk.\n- Semua produk motif Fauna ditujukan untuk pasar Lokal, sedangkan semua Geometris untuk Ekspor.\nProduk apa saja yang termasuk dalam motif Fauna?",
    options: [
      "Andara, Bima, dan Cakra",
      "Dewa, Eka, dan Fajar",
      "Dewa, Hari, dan Andara",
      "Hari, Genta, dan Bima",
      "Fajar, Andara, dan Dewa"
    ],
    correctAnswer: 1,
    explanation: "Andara, Cakra, dan Bima bermotif Flora. Genta dan Hari bermotif Geometris (bukan Fauna, dan Flora sudah penuh). Maka produk tersisa (Dewa, Eka, Fajar) harus bermotif Fauna agar motif Fauna memiliki 3 produk.",
    timeLimit: 60
  },
  // 34. Analitis (sedang)
  {
    id: "tpa-logika-analitis-sedang-add2-34",
    testType: "TPA",
    category: "logika-analitis",
    difficulty: "sedang",
    question: "Lima siswa (Ambar, Badru, Citra, Dodi, Elsa) memilih kelas peminatan seni yang berbeda (Musik, Lukis, Tari, Teater, Kriya). Preferensi siswa:\n- Ambar: Musik, Lukis, Tari, Teater.\n- Badru: Lukis, Teater, Musik.\n- Elsa: Lukis, Teater, Musik.\n- Citra: Lukis, Musik, Tari, Kriya.\n- Dodi: Musik, Teater.\nJika Dodi memilih kelas Teater, maka kelas peminatan yang harus dipilih oleh Citra adalah ...",
    options: ["Musik", "Tari", "Lukis", "Teater", "Kriya"],
    correctAnswer: 4,
    explanation: "Jika Dodi mengambil Teater, Badru dan Elsa terpaksa memilih antara Lukis dan Musik (pilihan Teater habis). Maka kelas Lukis dan Musik sudah penuh. Ambar terpaksa memilih Tari (karena Musik, Lukis, Teater penuh). Citra harus memilih Kriya karena Lukis, Musik, dan Tari sudah terisi.",
    timeLimit: 60
  },
  // 35. Analitis (sedang)
  {
    id: "tpa-logika-analitis-sedang-add2-35",
    testType: "TPA",
    category: "logika-analitis",
    difficulty: "sedang",
    question: "Lima teknisi (Farel, Galih, Haris, Ian, Joko) menjadwalkan piket pemeliharaan mesin dari Senin sampai Jumat. Setiap hari minimal harus ada 3 orang teknisi yang berjaga. Aturan piket:\n- Farel hanya bisa piket hari Senin, Rabu, dan Jumat.\n- Galih tidak bisa piket hari Rabu.\n- Haris hanya bisa piket hari Selasa dan Rabu.\n- Ian tidak bisa piket hari Jumat.\n- Joko tidak bisa piket hari Senin.\nSiapa saja teknisi yang dapat diharapkan berjaga pada hari Senin?",
    options: [
      "Farel, Galih, dan Ian",
      "Farel, Joko, dan Haris",
      "Galih, Joko, dan Haris",
      "Galih, Haris, dan Ian",
      "Joko, Haris, dan Ian"
    ],
    correctAnswer: 0,
    explanation: "Analisis hari Senin: Farel (bisa), Galih (bisa), Haris (hanya Sel-Rab, tidak bisa), Ian (bisa), Joko (tidak bisa Senin). Jadi teknisi yang bisa bertugas hari Senin adalah Farel, Galih, dan Ian.",
    timeLimit: 60
  },
  // 36. Deret (sedang)
  {
    id: "tpa-numerik-deret-sedang-add2-36",
    testType: "TPA",
    category: "numerik-deret",
    difficulty: "sedang",
    question: "Lengkapi deret angka berikut: 18, 13, 22, 20, 26, ...",
    options: ["28", "16", "26", "27", "30"],
    correctAnswer: 3,
    explanation: "Deret terbagi menjadi dua pola selang-seling. Suku ganjil (18, 22, 26): bertambah 4 (+4). Suku genap (13, 20, [27]): bertambah 7 (+7). Angka selanjutnya adalah 20 + 7 = 27.",
    timeLimit: 60
  },
  // 37. Deret (sedang)
  {
    id: "tpa-numerik-deret-sedang-add2-37",
    testType: "TPA",
    category: "numerik-deret",
    difficulty: "sedang",
    question: "Lengkapi deret angka berikut: 13, 39, 34, 17, ..., 46, 23, 69",
    options: ["64", "52", "88", "62", "51"],
    correctAnswer: 4,
    explanation: "Operasi matematika deret ini adalah berulang: dikalikan 3 (x3), dikurangi 5 (-5), lalu dibagi 2 (:2). Setelah angka 17, operasinya adalah dikalikan 3, menghasilkan 17 x 3 = 51.",
    timeLimit: 60
  },
  // 38. Deret (sedang)
  {
    id: "tpa-numerik-deret-sedang-add2-38",
    testType: "TPA",
    category: "numerik-deret",
    difficulty: "sedang",
    question: "Lengkapi deret angka berikut: 6, 9, 18, 45, 126, 369, ...",
    options: ["1197", "1098", "2096", "1088", "1086"],
    correctAnswer: 1,
    explanation: "Selisih antar suku membentuk deret perpangkatan 3: +3 (3^1), +9 (3^2), +27 (3^3), +81 (3^4), +243 (3^5). Suku berikutnya bertambah 729 (3^6), sehingga 369 + 729 = 1098.",
    timeLimit: 60
  },
  // 39. Deret (sedang)
  {
    id: "tpa-numerik-deret-sedang-add2-39",
    testType: "TPA",
    category: "numerik-deret",
    difficulty: "sedang",
    question: "Lengkapi deret angka berikut: 11, 32, 30, ..., ..., 70, 68",
    options: ["61, 84", "43, 89", "57, 72", "51, 49", "66, 74"],
    correctAnswer: 3,
    explanation: "Pola selang-seling dengan penambahan +19 untuk masing-masing baris. Baris ganjil: 11, 30, [49], 68. Baris genap: 32, [51], 70. Sehingga angka yang mengisi rumpang adalah 51 dan 49.",
    timeLimit: 60
  },
  // 40. Deret (sedang)
  {
    id: "tpa-numerik-deret-sedang-add2-40",
    testType: "TPA",
    category: "numerik-deret",
    difficulty: "sedang",
    question: "Lengkapi deret angka berikut: 7, 7, 3, 9, 9, 5, 11, ..., ...",
    options: ["15, 12", "11, 6", "15, 9", "13, 7", "11, 7"],
    correctAnswer: 4,
    explanation: "Pola operasi selisih yang berulang (+0, -4, +6). Polanya: 7 (+0) -> 7 (-4) -> 3 (+6) -> 9 (+0) -> 9 (-4) -> 5 (+6) -> 11. Suku berikutnya adalah 11 + 0 = 11, dan 11 - 4 = 7.",
    timeLimit: 60
  },
  // 41. Deret (sedang)
  {
    id: "tpa-numerik-deret-sedang-add2-41",
    testType: "TPA",
    category: "numerik-deret",
    difficulty: "sedang",
    question: "Lengkapi deret angka berikut: 6, 12, 6, 18, 24, 12, 36, ..., ...",
    options: ["40, 32", "42, 21", "42, 22", "42, 23", "32, 21"],
    correctAnswer: 1,
    explanation: "Deret terbagi menjadi kelompok tiga angka. Pola dalam tiap kelompok: angka kedua = angka pertama + 6, angka ketiga = angka kedua / 2. Kelompok 1: 6, 12, 6. Kelompok 2: 18, 24, 12. Kelompok 3: 36, [42], [21].",
    timeLimit: 60
  },
  // 42. Aritmatika (sedang)
  {
    id: "tpa-numerik-aritmatika-sedang-add2-42",
    testType: "TPA",
    category: "numerik-aritmatika",
    difficulty: "sedang",
    question: "Jika y - 3/2 x = -1 dan -1,5y - 8 = x, manakah hubungan yang benar?",
    options: [
      "2y - 11 = 3x",
      "y + 10 = -3x",
      "2x = 8y",
      "x - 4 = 2y",
      "4x - 9y = 1"
    ],
    correctAnswer: 1,
    explanation: "Selesaikan sistem persamaan: y - 1,5x = -1 dan -1,5y - 8 = x. Setelah disubstitusikan, diperoleh x = -2 dan y = -4. Uji ke pilihan B: y + 10 = -4 + 10 = 6, dan -3x = -3(-2) = 6 (Benar).",
    timeLimit: 60
  },
  // 43. Aritmatika (sedang)
  {
    id: "tpa-numerik-aritmatika-sedang-add2-43",
    testType: "TPA",
    category: "numerik-aritmatika",
    difficulty: "sedang",
    question: "Jika B^3 - 44 = 299, dan y + 3B = 25, berapakah nilai y^2?",
    options: ["2", "4", "8", "16", "32"],
    correctAnswer: 3,
    explanation: "B^3 = 299 + 44 = 343 -> B = 7. Substitusikan B = 7 ke y + 3B = 25 -> y + 21 = 25 -> y = 4. Maka nilai y^2 = 4^2 = 16.",
    timeLimit: 60
  },
  // 44. Perbandingan (sedang)
  {
    id: "tpa-numerik-perbandingan-sedang-add2-44",
    testType: "TPA",
    category: "numerik-perbandingan",
    difficulty: "sedang",
    question: "Jika x + 2y = 14 dan 3x + 2y = 22, manakah hubungan yang benar?",
    options: [
      "x + 12 = 3y",
      "4y <= 3x",
      "y - 2x < -4",
      "x + y > 9",
      "2x > y + 1"
    ],
    correctAnswer: 4,
    explanation: "Kurangkan kedua persamaan: 2x = 8 -> x = 4. Substitusikan x = 4 ke persamaan pertama: 4 + 2y = 14 -> 2y = 10 -> y = 5. Uji ke pilihan E: 2(4) > 5 + 1 -> 8 > 6 (Benar).",
    timeLimit: 45
  },
  // 45. Aritmatika (sedang)
  {
    id: "tpa-numerik-aritmatika-sedang-add2-45",
    testType: "TPA",
    category: "numerik-aritmatika",
    difficulty: "sedang",
    question: "Berapakah hasil dari 33 1/3 % x (0,213 : 0,71)?",
    options: ["10%", "15%", "20%", "25%", "30%"],
    correctAnswer: 0,
    explanation: "33 1/3 % setara dengan 1/3. Pembagian 0,213 : 0,71 adalah 0,3 (atau 3/10). Maka, 1/3 x 3/10 = 1/10 = 10%.",
    timeLimit: 60
  },
  // 46. Aritmatika (sedang)
  {
    id: "tpa-numerik-aritmatika-sedang-add2-46",
    testType: "TPA",
    category: "numerik-aritmatika",
    difficulty: "sedang",
    question: "Jika y = x dan y = 5 - 2x/3, manakah hubungan yang benar?",
    options: [
      "y + 2x = 9",
      "3y - 2x = 1",
      "5x + y = 7",
      "x - 2y = 0",
      "4x + 6y = -1"
    ],
    correctAnswer: 0,
    explanation: "Substitusikan y = x ke persamaan kedua: x = 5 - 2x/3 -> 3x = 15 - 2x -> 5x = 15 -> x = 3. Maka y = 3. Uji ke pilihan A: y + 2x = 3 + 2(3) = 9 (Benar).",
    timeLimit: 60
  },
  // 47. Perbandingan (sedang)
  {
    id: "tpa-numerik-perbandingan-sedang-add2-47",
    testType: "TPA",
    category: "numerik-perbandingan",
    difficulty: "sedang",
    question: "Jika y = 2/3 x - 3 dan x - y = 3, manakah hubungan yang benar?",
    options: [
      "2x < 3y",
      "6x + 1 > 4y + 8",
      "4y - 5x < -16",
      "y + x = -8",
      "y > 10 + 2x"
    ],
    correctAnswer: 1,
    explanation: "Persamaan kedua menyatakan y = x - 3. Samakan: 2/3 x - 3 = x - 3 -> 2/3 x = x -> x = 0. Maka y = -3. Uji ke pilihan B: 6(0) + 1 > 4(-3) + 8 -> 1 > -4 (Benar).",
    timeLimit: 45
  },
  // 48. Cerita (sedang)
  {
    id: "tpa-numerik-cerita-sedang-add2-48",
    testType: "TPA",
    category: "numerik-cerita",
    difficulty: "sedang",
    question: "Di awal tahun 2025, Rahma menerima bonus kerja sebesar Rp25.000.000 yang langsung dipotong pajak PPh sebesar 15%. Sisa uang tersebut ditabungkan di bank dengan bunga tunggal 6% per tahun. Di akhir tahun, Rahma menarik seluruh uangnya untuk membeli sebuah laptop seharga Rp20.250.000 (harga belum termasuk PPN 11%). Berapakah sisa uang Rahma setelah transaksi pembelian laptop tersebut?",
    options: ["Rp55.000", "Rp45.500", "Rp35.000", "Rp45.000", "Rp47.500"],
    correctAnswer: 4,
    explanation: "Bonus bersih = 25 juta x 85% = Rp21.250.000. Tabungan akhir tahun (bunga 6%) = Rp21.250.000 x 1,06 = Rp22.525.000. Harga laptop + PPN 11% = Rp20.250.000 x 1,11 = Rp22.477.500. Sisa uang = Rp22.525.000 - Rp22.477.500 = Rp47.500.",
    timeLimit: 90
  },
  // 49. Cerita (sedang)
  {
    id: "tpa-numerik-cerita-sedang-add2-49",
    testType: "TPA",
    category: "numerik-cerita",
    difficulty: "sedang",
    question: "Pembangunan sebuah gedung kantor direncanakan selesai dalam waktu 42 hari dengan mempekerjakan 14 pekerja. Setelah dikerjakan selama 15 hari, pekerjaan dihentikan sementara untuk libur hari raya. Agar gedung selesai tepat waktu sesuai rencana, jumlah pekerja ditambah 7 orang. Berapa lama libur hari raya tersebut berlangsung?",
    options: ["7 hari", "10 hari", "6 hari", "9 hari", "8 hari"],
    correctAnswer: 3,
    explanation: "Sisa waktu normal = 27 hari dengan 14 pekerja (beban kerja = 378 orang-hari). Jumlah pekerja baru = 14 + 7 = 21 orang. Waktu pengerjaan baru = 378 / 21 = 18 hari. Durasi libur = Sisa waktu normal - Waktu pengerjaan baru = 27 - 18 = 9 hari.",
    timeLimit: 90
  },
  // 50. Cerita (sedang)
  {
    id: "tpa-numerik-cerita-sedang-add2-50",
    testType: "TPA",
    category: "numerik-cerita",
    difficulty: "sedang",
    question: "Sebuah bimbel memiliki 110 pengajar. Di antaranya, 55 pengajar memiliki sertifikat TOEFL Bahasa Inggris dan 65 pengajar memiliki sertifikat HSK Bahasa Mandarin. Sementara itu, jumlah pengajar yang tidak memiliki kedua sertifikat tersebut adalah dua per tiga dari jumlah pengajar yang memiliki kedua sertifikat sekaligus. Berapakah jumlah pengajar yang tidak memiliki kedua sertifikat tersebut?",
    options: ["50", "40", "35", "30", "20"],
    correctAnswer: 4,
    explanation: "Gunakan rumus himpunan: Total = E + M - B + N. Misal B adalah yang memiliki kedua sertifikat, maka N = 2/3 B. 110 = 55 + 65 - B + 2/3 B -> 110 = 120 - 1/3 B -> 1/3 B = 10 -> B = 30. Maka jumlah pengajar tanpa sertifikat (N) = 2/3 x 30 = 20 orang.",
    timeLimit: 90
  }
];
