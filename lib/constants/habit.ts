// 7 Kebiasaan Anak Indonesia Hebat (7KAIH) sesuai dokumen bag. 4
export const HABIT_OPTIONS = [
  { id: "bangun_cepat", name: "Bangun Cepat" },
  { id: "beribadah", name: "Beribadah" },
  { id: "gemar_belajar", name: "Gemar Belajar" },
  { id: "berolahraga", name: "Berolahraga" },
  { id: "bermasyarakat", name: "Bermasyarakat" },
  { id: "makan_sehat", name: "Makan Sehat dan Bergizi" },
  { id: "tidur_cepat", name: "Tidur Cepat" },
] as const;

export type HabitId = (typeof HABIT_OPTIONS)[number]["id"];
