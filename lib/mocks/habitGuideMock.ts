// Konten default diringkas dari "Panduan Pengisian 7 Kebiasaan Anak Tumbuh V2"
export const mockHabitGuideContent: Record<string, string> = {
  bangun_cepat: `
    <p><strong>Manfaat:</strong> Memulai hari lebih awal melatih kedisiplinan dan memberimu waktu ekstra untuk bersiap tanpa terburu-buru.</p>
    <p><strong>Cara Mengisi Waktu Bangun:</strong></p>
    <ul>
      <li><strong>Sebelum pukul 4:</strong> bangun sangat awal, misalnya untuk ibadah malam atau belajar ekstra.</li>
      <li><strong>Pukul 04–05:</strong> bangun tepat waktu pada rentang waktu subuh.</li>
      <li><strong>Pukul 05–06:</strong> bangun menjelang jam persiapan rutin berangkat sekolah.</li>
      <li><strong>Di atas pukul 6:</strong> bangun melewati batas waktu ideal.</li>
    </ul>
    <p><strong>Cara Mengisi Tingkat Inisiatif:</strong></p>
    <ul>
      <li><strong>Mandiri:</strong> bangun sendiri (alarm sendiri/terbiasa bangun otomatis).</li>
      <li><strong>Disuruh:</strong> harus dibangunkan berkali-kali oleh orang tua/keluarga.</li>
    </ul>
  `,
  beribadah: `
    <p><strong>Manfaat:</strong> Menjaga ibadah tepat waktu adalah bentuk rasa syukur dan tanggung jawab diri.</p>
    <p><strong>Cara Mengisi Pelaksanaan:</strong></p>
    <ul>
      <li><strong>100% dilaksanakan:</strong> seluruh rangkaian ibadah wajib dikerjakan lengkap.</li>
      <li><strong>75–100%:</strong> dominan terlaksana, sebagian kecil tertinggal.</li>
      <li><strong>50–75%:</strong> hanya sekitar setengah kewajiban ibadah terlaksana.</li>
      <li><strong>Di bawah 50%:</strong> sebagian besar rutinitas ibadah wajib ditinggalkan.</li>
    </ul>
    <p><strong>Cara Mengisi Tingkat Inisiatif:</strong></p>
    <ul>
      <li><strong>Mandiri:</strong> beribadah tepat waktu atas kesadaran sendiri.</li>
      <li><strong>Disuruh:</strong> beribadah setelah diingatkan orang tua.</li>
    </ul>
  `,
  gemar_belajar: `
    <p><strong>Manfaat:</strong> Mengulang pelajaran atau membaca hal baru di rumah membuatmu semakin paham dan siap menghadapi tugas di kelas.</p>
    <p><strong>Cara Mengisi Durasi:</strong></p>
    <ul>
      <li><strong>Di atas 1 jam:</strong> fokus belajar/mengerjakan tugas mandiri lebih dari 60 menit.</li>
      <li><strong>45 menit–1 jam:</strong> durasi belajar cukup panjang.</li>
      <li><strong>15–45 menit:</strong> sempat me-review materi sebentar.</li>
      <li><strong>Di bawah 15 menit:</strong> hampir tidak membuka buku pelajaran.</li>
    </ul>
    <p><strong>Cara Mengisi Tingkat Inisiatif:</strong></p>
    <ul>
      <li><strong>Mandiri:</strong> membuka buku/mengerjakan PR atas kemauan sendiri.</li>
      <li><strong>Disuruh:</strong> baru mau belajar setelah diminta orang tua.</li>
    </ul>
  `,
  berolahraga: `
    <p><strong>Manfaat:</strong> Bergerak aktif menjaga kebugaran fisik, memperkuat tubuh, dan membuatmu tidak mudah lelah atau mengantuk.</p>
    <p><strong>Cara Mengisi Durasi:</strong></p>
    <ul>
      <li><strong>Di atas 1 jam:</strong> aktivitas fisik intensif lebih dari satu jam.</li>
      <li><strong>45 menit–1 jam:</strong> berolahraga durasi standar hingga berkeringat.</li>
      <li><strong>15–45 menit:</strong> pemanasan ringan/peregangan/jalan santai.</li>
      <li><strong>Di bawah 15 menit:</strong> tidak ada aktivitas fisik berarti.</li>
    </ul>
    <p><strong>Cara Mengisi Tingkat Inisiatif:</strong></p>
    <ul>
      <li><strong>Mandiri:</strong> berolahraga karena ingin sehat, berinisiatif sendiri.</li>
      <li><strong>Disuruh:</strong> baru mau berolahraga setelah diajak/disuruh.</li>
    </ul>
  `,
  bermasyarakat: `
    <p><strong>Manfaat:</strong> Mengukur tingkat inisiatif dan kepedulianmu terhadap kerapian pribadi, keluarga, dan lingkungan pertemanan.</p>
    <p><strong>Cara Mengisi Aktivitas (centang semua yang sesuai):</strong></p>
    <ul>
      <li>Membereskan tempat tidur dan kebersihan rumah.</li>
      <li>Membantu pekerjaan orang tua.</li>
      <li>Bermain bersama teman sebaya.</li>
      <li><strong>Kurang bermasyarakat:</strong> hanya dicentang jika ketiga aktivitas di atas sama sekali tidak dilakukan.</li>
    </ul>
    <p><strong>Cara Mengisi Tingkat Inisiatif:</strong></p>
    <ul>
      <li><strong>Mandiri:</strong> spontan merapikan/membantu/bersosialisasi tanpa diperintah.</li>
      <li><strong>Disuruh:</strong> melakukan aktivitas hanya jika diminta orang tua.</li>
    </ul>
  `,
  makan_sehat: `
    <p><strong>Manfaat:</strong> Asupan nutrisi seimbang adalah bahan bakar utama bagi daya pikir otak dan pertumbuhan fisikmu.</p>
    <p><strong>Cara Mengisi Kategori Makanan:</strong></p>
    <ul>
      <li><strong>Sangat beragam:</strong> makanan pokok, sayuran, lauk pauk/protein, dan buah lengkap.</li>
      <li><strong>Beragam:</strong> variasi nutrisi cukup baik (ada sayur dan lauk).</li>
      <li><strong>Kurang beragam:</strong> hanya satu jenis lauk tanpa sayuran.</li>
      <li><strong>Tidak beragam:</strong> hanya makanan instan/camilan kurang bernutrisi.</li>
    </ul>
    <p><strong>Cara Mengisi Tingkat Inisiatif:</strong></p>
    <ul>
      <li><strong>Mandiri (mudah makan):</strong> bersedia makan tepat waktu atas kesadaran sendiri.</li>
      <li><strong>Disuruh (susah makan):</strong> harus diingatkan/dibujuk berkali-kali.</li>
    </ul>
  `,
  tidur_cepat: `
    <p><strong>Manfaat:</strong> Istirahat cukup adalah kunci agar keesokan paginya kamu bangun dengan tubuh segar dan siap menyerap ilmu baru.</p>
    <p><strong>Cara Mengisi Waktu Tidur:</strong></p>
    <ul>
      <li><strong>Sebelum jam 8:</strong> beristirahat dan tidur sangat awal.</li>
      <li><strong>Jam 8–9:</strong> tidur pada rentang waktu ideal untuk pelajar.</li>
      <li><strong>Jam 9–10:</strong> mulai tidur sedikit larut.</li>
      <li><strong>Di atas jam 10:</strong> begadang, melewati batas ideal istirahat.</li>
    </ul>
    <p><strong>Cara Mengisi Tingkat Inisiatif:</strong></p>
    <ul>
      <li><strong>Mandiri:</strong> mematikan perangkat elektronik dan tidur dengan sendirinya.</li>
      <li><strong>Disuruh:</strong> baru mau tidur setelah dimarahi/disuruh berulang kali.</li>
    </ul>
  `,
};
