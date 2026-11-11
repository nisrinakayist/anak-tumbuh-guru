// Rombel (kelompok belajar). 1 Teacher mengampu tepat 1 rombel aktif, jadi
// data ini selalu tunggal untuk akun Guru yang login.
// Sumber: GET /dashboard/teacher (id, name), GET /rombels/{id} (grade_level,
// academic_year_id), GET /academic-years/{id} (name).
export type ClassGroup = {
  id: number;
  name: string; // Nama Rombel, contoh: "1-A"
  education_level: string; // dari grade_level, contoh: "Kelas 1"
  academic_year: string; // contoh: "2026/2027"
  total_students: number; // siswa aktif
};
