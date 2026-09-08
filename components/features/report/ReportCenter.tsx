"use client";

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiFileOn } from "react-icons/ci";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchClassroomReport } from "@/redux/features/report/reportSlice";
import useSearchFilter from "@/hook/useSearchFilter";
import { ReportFilter, ReportPeriodPreset, ReportScope, ReportInitiative } from "@/lib/types/reportType";
import { HABIT_OPTIONS } from "@/lib/constants/habit";
import { getPresetRange, getRowSearchText, initialReportFilter } from "@/lib/utils/report";
import ReportFilterForm from "@/components/features/report/ReportFilterForm";
import ReportSummaryCards from "@/components/features/report/ReportSummaryCards";
import ReportResultTable from "@/components/features/report/ReportResultTable";
import SpinLoader from "@/components/ui/Loader/SpinLoader";
import ErrorAlert from "@/components/ui/Alert/ErrorAlert";

function ReportCenter() {
  const [preset, setPreset] = useState<ReportPeriodPreset>("this_month");
  const [filter, setFilter] = useState<ReportFilter>(initialReportFilter);

  const dispatch = useDispatch<AppDispatch>();
  const { result, loading, error } = useSelector((state: RootState) => state.report);

  const handleScopeChange = (scope: ReportScope) => {
    setFilter((current) => ({
      ...current,
      scope,
      habit_id: scope === "habit" ? (current.habit_id ?? HABIT_OPTIONS[0].id) : current.habit_id,
      initiatives: scope === "habit" ? (current.initiatives ?? ["mandiri", "disuruh"]) : current.initiatives,
    }));
  };

  const handleHabitChange = (habitId: string) => {
    setFilter((current) => ({ ...current, habit_id: habitId }));
  };

  const handleInitiativeToggle = (initiative: ReportInitiative) => {
    setFilter((current) => {
      const values = current.initiatives ?? [];
      return {
        ...current,
        initiatives: values.includes(initiative)
          ? values.filter((item) => item !== initiative)
          : [...values, initiative],
      };
    });
  };

  const handlePresetChange = (nextPreset: ReportPeriodPreset) => {
    setPreset(nextPreset);
    if (nextPreset !== "custom") {
      setFilter((current) => ({ ...current, ...getPresetRange(nextPreset) }));
    }
  };

  const handleDateChange = (field: "start_date" | "end_date", value: string) => {
    setPreset("custom");
    setFilter((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = () => {
    dispatch(fetchClassroomReport(filter));
  };

  const reportRows = useMemo(() => result?.rows ?? [], [result]);
  const { query, setQuery, filteredItems: filteredRows } = useSearchFilter(
    reportRows,
    getRowSearchText
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-black text-primary-500">
            <CiFileOn size={18} />
            Report Center
          </div>
          <h1 className="mt-1 text-2xl font-extrabold text-primary-900 sm:text-3xl">
            Laporan Rombel
          </h1>
          <p className="mt-1 max-w-xl text-sm font-semibold text-primary-900/55">
            Pilih jenis laporan. Struktur tabel otomatis berubah mengikuti jenis yang dipilih.
          </p>
        </div>
        <span className="inline-flex w-fit items-center rounded-full bg-primary-50 px-3.5 py-2 text-xs font-black text-primary-900">
          Role: Wali Kelas
        </span>
      </div>

      <ReportFilterForm
        filter={filter}
        preset={preset}
        loading={loading}
        onScopeChange={handleScopeChange}
        onHabitChange={handleHabitChange}
        onInitiativeToggle={handleInitiativeToggle}
        onPresetChange={handlePresetChange}
        onDateChange={handleDateChange}
        onSubmit={handleSubmit}
      />

      {error && <ErrorAlert message={error} />}

      {loading && (
        <div className="flex min-h-[30vh] items-center justify-center">
          <SpinLoader size={40} />
        </div>
      )}

      {!loading && result && (
        <div className="space-y-4">
          <ReportSummaryCards result={result} />
          <ReportResultTable
            result={result}
            filter={filter}
            rows={filteredRows}
            query={query}
            onQueryChange={setQuery}
          />
        </div>
      )}
    </div>
  );
}

export default ReportCenter;
