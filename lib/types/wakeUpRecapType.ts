// Metode bangun: bangun sendiri (mandiri) atau dibangunkan orang tua.
export type WakeUpMethod = "self" | "parent";

// Status laporan siswa: sudah dikonfirmasi orang tua atau belum mengisi.
export type WakeUpReportStatus = "confirmed" | "not_filled";

// Catatan ketepatan waktu bangun. `null` = tidak ada catatan khusus.
export type WakeUpTimeNote = "early" | "on_time" | null;

export type WakeUpPeriodId = "this_week" | "last_week";
export type WakeUpStatusFilter = "all" | WakeUpReportStatus;
export type WakeUpSortBy = "number" | "wake_time" | "name" | "points";

export type WakeUpStudentRecord = {
  id: number;
  nis: string;
  name: string;
  wake_time: string | null; // format "HH:mm", null = belum tercatat
  time_note: WakeUpTimeNote;
  method: WakeUpMethod | null;
  report_status: WakeUpReportStatus;
  points: number;
};

export type WakeUpRecapClassGroup = {
  education_level: string; // contoh: "Kelas 1"
  name: string; // contoh: "1-A"
  teacher_name: string;
  total_students: number;
  target_wake_time: string; // contoh: "05.00"
};

export type WakeUpRecapSummary = {
  report_rate: number; // persen
  reported_count: number;
  total_students: number;
  report_rate_trend: number; // persen naik/turun dari pekan lalu
  report_hint: string;
  average_wake_time: string; // "HH:mm"
  average_wake_hint: string;
  independence_rate: number; // persen
  independent_count: number;
  independence_hint: string;
  total_points: number;
  points_trend: number;
};

export type WakeUpRecapData = {
  class_group: WakeUpRecapClassGroup;
  record_date_label: string; // contoh: "Kamis, 13 Nov 2025"
  summary: WakeUpRecapSummary;
  students: WakeUpStudentRecord[];
};

export type WakeUpRecapResponse = {
  code: number;
  status: string;
  message: string;
  data: WakeUpRecapData | null;
};
