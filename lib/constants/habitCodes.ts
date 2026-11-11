import { HabitId } from "@/lib/types/habitRecapType";

// ID kebiasaan di UI guru -> kode kebiasaan di backend (GET /habits).
export const HABIT_CODE_BY_ID: Record<HabitId, string> = {
  "wake-up": "bangun_cepat",
  worship: "beribadah",
  study: "gemar_belajar",
  "healthy-eating": "makan_sehat_bergizi",
  exercise: "berolahraga",
  social: "bermasyarakat",
  "early-sleep": "tidur_cepat",
};

// Bermasyarakat memakai endpoint terpisah (multi-pilihan indikator).
export const SOCIAL_HABIT_ID: HabitId = "social";
