// Report Center: Laporan perkembangan siswa dalam rentang tanggal tertentu,
// sesuai dokumen bag. 1 ("Laporan perkembangan harian/berkala untuk sekolah
// dan orang tua") dan bag. 4 (Inisiatif Mandiri/Disuruh per kebiasaan).
// Disederhanakan untuk 1 rombel milik Guru yang login.
export type ReportPeriodPreset = "this_week" | "this_month" | "custom";

// Jenis laporan yang tersedia:
// - student: rekap umum per siswa (hari mengisi, poin, level)
// - achievement: rekap poin, level & ranking (Aturan Poin/Level/Ranking, dok bag. 5)
// - habit: rekap per kebiasaan tertentu + filter Inisiatif (dok bag. 4)
export type ReportScope = "student" | "achievement" | "habit";

export type ReportInitiative = "mandiri" | "disuruh";

export type ReportFilter = {
  scope: ReportScope;
  start_date: string;
  end_date: string;
  habit_id?: string;
  initiatives?: ReportInitiative[];
};

export type ReportRow = {
  student_id: number;
  name: string;
  nis: string;
  days_filled: number;
  total_points: number;
  level: number;
  // Hanya terisi untuk scope "achievement"
  class_rank?: number;
  // Hanya terisi untuk scope "habit"
  initiative_mandiri_count?: number;
  initiative_disuruh_count?: number;
  habit_percentage?: number | null;
  description_entry?: string;
  habit_points?: number | null;
};

export type ReportSummary = {
  total_students: number;
  total_days_filled: number;
  average_points: number;
};

export type ReportResult = {
  scope: ReportScope;
  period_start: string;
  period_end: string;
  summary: ReportSummary;
  rows: ReportRow[];
};

export type ReportResponse = {
  code: number;
  status: string;
  message: string;
  data: ReportResult | null;
};
