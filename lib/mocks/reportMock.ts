import { ReportFilter, ReportResponse, ReportRow } from "@/lib/types/reportType";

const baseRows: ReportRow[] = [
  {
    student_id: 1, name: "Ahmad Fajar Ramadhan", nis: "202501", days_filled: 6, total_points: 100, level: 5,
    class_rank: 1, initiative_mandiri_count: 5, initiative_disuruh_count: 1,
    habit_percentage: 100, description_entry: "Bangun pukul 05.00", habit_points: 242,
  },
  {
    student_id: 2, name: "Bunga Citra Lestari", nis: "202502", days_filled: 5, total_points: 94, level: 4,
    class_rank: 2, initiative_mandiri_count: 0, initiative_disuruh_count: 4,
    habit_percentage: 100, description_entry: "Bangun pukul 05.10", habit_points: 256,
  },
  {
    student_id: 3, name: "Chandra Wijaya", nis: "202503", days_filled: 6, total_points: 88, level: 4,
    class_rank: 3, initiative_mandiri_count: 0, initiative_disuruh_count: 0,
    habit_percentage: null, description_entry: "Belum mengisi", habit_points: null,
  },
  {
    student_id: 4, name: "Dewi Anggraini", nis: "202504", days_filled: 4, total_points: 82, level: 4,
    class_rank: 4, initiative_mandiri_count: 2, initiative_disuruh_count: 2,
    habit_percentage: 80, description_entry: "Bangun pukul 05.30", habit_points: 198,
  },
  {
    student_id: 5, name: "Erlangga Putra", nis: "202505", days_filled: 3, total_points: 76, level: 3,
    class_rank: 5, initiative_mandiri_count: 0, initiative_disuruh_count: 0,
    habit_percentage: null, description_entry: "Belum mengisi", habit_points: null,
  },
];

export const buildMockReportResponse = (filter: ReportFilter): ReportResponse => ({
  code: 200,
  status: "success",
  message: "Laporan berhasil dimuat (data dummy)",
  data: {
    scope: filter.scope,
    period_start: filter.start_date,
    period_end: filter.end_date,
    summary: {
      total_students: baseRows.length,
      total_days_filled: baseRows.reduce((sum, row) => sum + row.days_filled, 0),
      average_points: Math.round(
        baseRows.reduce((sum, row) => sum + row.total_points, 0) / baseRows.length
      ),
    },
    rows: baseRows,
  },
});
