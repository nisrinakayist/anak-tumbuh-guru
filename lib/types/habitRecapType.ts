import type { StatusBadgeTone } from "@/components/ui/Badge/StatusBadge";

// Daftar id kebiasaan (7 Kebiasaan Anak Indonesia Hebat / 7KAIH).
// Urutan di sini menentukan urutan submenu Sidebar.
export type HabitId =
  | "wake-up"
  | "worship"
  | "study"
  | "healthy-eating"
  | "exercise"
  | "social"
  | "early-sleep";

// Kunci ikon yang boleh dipakai kartu ringkasan / footer, di-resolve ke
// komponen ikon aslinya lewat lib/constants/habitRecapIcons.ts. Dipisah dari
// tipe data supaya data (termasuk yang ada di Redux) tetap berupa string biasa.
export type HabitIconKey =
  | "shield"
  | "clock"
  | "check"
  | "award"
  | "calendar"
  | "star"
  | "book"
  | "heart"
  | "trophy"
  | "user"
  | "plus";

export type HabitPeriodId = "this_week" | "last_week";
export type HabitStatusFilter = "all" | "confirmed" | "not_filled";
export type HabitSortBy = "number" | "primary_value" | "name" | "points";

// Kartu ringkasan bersifat generik (tidak spesifik "jam bangun") supaya bisa
// dipakai ulang oleh kebiasaan apa pun; label & isinya datang dari data.
export type HabitSummaryMetric = {
  key: string;
  label: string;
  value: string;
  suffix?: string;
  suffixAccent?: boolean;
  iconKey: HabitIconKey;
  tone: "orange" | "blue" | "green" | "purple";
  badgeLabel: string;
  badgeTone: StatusBadgeTone;
  footer: string;
  footerIconKey?: HabitIconKey;
};

export type HabitClassGroup = {
  education_level: string; // contoh: "Kelas 1"
  name: string; // contoh: "1-A"
  teacher_name: string;
  total_students: number;
  target_value: string; // contoh: "Pukul 05.00 WIB" / "Sholat 5 Waktu"
};

export type HabitMethodTone = "success" | "warning";
export type HabitReportStatus = "confirmed" | "not_filled";

// Satu baris data siswa. Field-nya generik (bukan "wake_time") supaya
// kebiasaan apa pun (ibadah, belajar, dst) bisa memakai struktur yang sama.
export type HabitStudentRecord = {
  id: number;
  nis: string;
  name: string;
  primary_value: string | null; // capaian utama, mis. "04:45 WIB" / "5 dari 5 Waktu"
  primary_note: string | null; // catatan singkat, mis. "Lebih Awal" / "Lengkap"
  method_label: string | null; // mis. "Sadar Sendiri / Mandiri"
  method_tone: HabitMethodTone | null;
  report_status: HabitReportStatus;
  points: number;
};

export type HabitRecapData = {
  class_group: HabitClassGroup;
  record_date_label: string; // contoh: "Kamis, 13 Nov 2025"
  summary: HabitSummaryMetric[]; // selalu 4 kartu
  students: HabitStudentRecord[];
};

export type HabitRecapResponse = {
  code: number; // 200 = ada data, 404 = kebiasaan ini belum tersedia (dummy)
  status: string;
  message: string;
  data: HabitRecapData | null;
};
