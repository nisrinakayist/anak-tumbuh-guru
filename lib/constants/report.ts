import { ReportPeriodPreset, ReportScope } from "@/lib/types/reportType";

export const SCOPE_OPTIONS: { label: string; value: ReportScope }[] = [
  { label: "Siswa", value: "student" },
  { label: "Pencapaian", value: "achievement" },
  { label: "Per Kebiasaan", value: "habit" },
];

export const PERIOD_OPTIONS: { label: string; value: ReportPeriodPreset }[] = [
  { label: "Minggu Ini", value: "this_week" },
  { label: "Bulan Ini", value: "this_month" },
  { label: "Custom", value: "custom" },
];
