// Pengaturan Panduan: teks panduan pengisian per kebiasaan yang bisa diedit
// Wali Kelas (rich text), lalu dirender di antarmuka siswa saat mengisi
// kebiasaan harian. Sesuai "Panduan Pengisian 7 Kebiasaan Anak Tumbuh".
export type HabitGuide = {
  habit_id: string;
  class_group_id: number;
  content_html: string;
  updated_at: string;
};

export type HabitGuideResponse = {
  code: number;
  status: string;
  message: string;
  data: HabitGuide | null;
};

export type SaveHabitGuidePayload = {
  habit_id: string;
  class_group_id: number;
  content_html: string;
};

export type SaveHabitGuideResponse = {
  code: number;
  status: string;
  message: string;
  data: HabitGuide | null;
};
