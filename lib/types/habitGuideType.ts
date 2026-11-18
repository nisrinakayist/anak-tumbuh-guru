// Pengaturan Panduan: teks polos panduan pengisian per (rombel x kebiasaan)
// yang ditulis Wali Kelas dan dibaca siswa rombel itu.
// Backend (Contract v1.3 INTEG-PANDUAN-001):
//   GET   /rombels/{rombel_id}/habit-guides            -> [{ habit_id, content }]
//   PATCH /rombels/{rombel_id}/habit-guides/{habit_id} -> body { content }
// Teks polos, maks. 2.000 karakter, tag HTML ditolak (422). Teks kosong
// menghapus panduan. JANGAN dirender sebagai HTML.
export const HABIT_GUIDE_MAX_LENGTH = 2000;

// Kunci = kode kebiasaan FE (lib/constants/habit.ts), nilai = teks panduan.
export type HabitGuideMap = Record<string, string>;
