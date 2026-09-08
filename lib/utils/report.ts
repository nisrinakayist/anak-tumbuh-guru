import { ReportFilter, ReportPeriodPreset, ReportRow } from "@/lib/types/reportType";
import { HABIT_OPTIONS } from "@/lib/constants/habit";

export const iso = (date: Date) => date.toISOString().slice(0, 10);

export const getRowSearchText = (row: ReportRow) => [row.name, row.nis];

export const getPresetRange = (preset: ReportPeriodPreset) => {
  const now = new Date();
  if (preset === "this_week") {
    const day = now.getDay() || 7;
    const start = new Date(now);
    start.setDate(now.getDate() - day + 1);
    return { start_date: iso(start), end_date: iso(now) };
  }
  if (preset === "this_month") {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    return { start_date: iso(start), end_date: iso(now) };
  }
  return { start_date: iso(now), end_date: iso(now) };
};

export const initialReportFilter: ReportFilter = {
  scope: "student",
  habit_id: HABIT_OPTIONS[0].id,
  initiatives: ["mandiri", "disuruh"],
  ...getPresetRange("this_month"),
};
