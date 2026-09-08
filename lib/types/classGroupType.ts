// Rombel (kelompok belajar). Sesuai ketentuan dokumen: 1 Teacher hanya
// mengampu tepat 1 rombel, jadi data ini selalu tunggal untuk akun Guru yang login.
export type ClassGroup = {
  id: number;
  uuid: string;
  name: string; // Nama Rombel, contoh: "1-A" / "TK A"
  education_level: string; // Tingkat Pendidikan, contoh: "Kelas 1" / "TK A"
  academic_year: string;
  total_students: number;
};
