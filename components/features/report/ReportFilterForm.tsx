"use client";

import { CiFilter, CiCalendar, CiRedo } from "react-icons/ci";
import { ReportFilter, ReportPeriodPreset, ReportScope, ReportInitiative } from "@/lib/types/reportType";
import { SCOPE_OPTIONS, PERIOD_OPTIONS } from "@/lib/constants/report";
import HabitFilterFields from "@/components/features/report/HabitFilterFields";

type ReportFilterFormProps = {
  filter: ReportFilter;
  preset: ReportPeriodPreset;
  loading: boolean;
  onScopeChange: (scope: ReportScope) => void;
  onHabitChange: (habitId: string) => void;
  onInitiativeToggle: (initiative: ReportInitiative) => void;
  onPresetChange: (preset: ReportPeriodPreset) => void;
  onDateChange: (field: "start_date" | "end_date", value: string) => void;
  onSubmit: () => void;
};

const inputClass =
  "mt-2 w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-primary-900 outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20";
const labelClass = "text-xs font-black uppercase tracking-wider text-primary-900";

function ReportFilterForm({
  filter,
  preset,
  loading,
  onScopeChange,
  onHabitChange,
  onInitiativeToggle,
  onPresetChange,
  onDateChange,
  onSubmit,
}: ReportFilterFormProps) {
  const isHabitScope = filter.scope === "habit";

  return (
    <div className="rounded-3xl border border-primary-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-black text-primary-900">
        <CiFilter size={20} className="text-primary-500" />
        Filter Laporan
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className={labelClass}>
          Jenis Laporan
          <select
            value={filter.scope}
            onChange={(event) => onScopeChange(event.target.value as ReportScope)}
            className={inputClass}
          >
            {SCOPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className={labelClass}>
          Periode
          <select
            value={preset}
            onChange={(event) => onPresetChange(event.target.value as ReportPeriodPreset)}
            className={inputClass}
          >
            {PERIOD_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className={labelClass}>
          Mulai
          <div className="relative mt-2">
            <input
              type="date"
              value={filter.start_date}
              onChange={(event) => onDateChange("start_date", event.target.value)}
              className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 pr-10 text-sm font-semibold text-primary-900 outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20"
            />
            <CiCalendar size={20} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-primary-900/40" />
          </div>
        </label>

        <label className={labelClass}>
          Sampai
          <div className="relative mt-2">
            <input
              type="date"
              value={filter.end_date}
              onChange={(event) => onDateChange("end_date", event.target.value)}
              className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 pr-10 text-sm font-semibold text-primary-900 outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20"
            />
            <CiCalendar size={20} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-primary-900/40" />
          </div>
        </label>
      </div>

      {isHabitScope && (
        <HabitFilterFields
          filter={filter}
          onHabitChange={onHabitChange}
          onInitiativeToggle={onInitiativeToggle}
        />
      )}

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-semibold text-primary-900/45">
          Data mengikuti rombel milik akunmu.
        </p>
        <button
          type="button"
          onClick={onSubmit}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary-900 px-5 py-3 text-sm font-black text-white transition hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <CiRedo size={18} className={loading ? "animate-spin" : ""} />
          Tampilkan Laporan
        </button>
      </div>
    </div>
  );
}

export default ReportFilterForm;
