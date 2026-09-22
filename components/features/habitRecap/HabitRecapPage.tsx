"use client";

import useHabitRecap from "@/hook/useHabitRecap";
import { HABIT_PERIOD_OPTIONS, getHabitConfig } from "@/lib/constants/habitRecapConfig";
import { HabitId } from "@/lib/types/habitRecapType";
import SpinLoader from "@/components/ui/Loader/SpinLoader";
import ErrorAlert from "@/components/ui/Alert/ErrorAlert";
import RecapHero from "@/components/features/habitRecap/RecapHero";
import PeriodFilter from "@/components/features/habitRecap/PeriodFilter";
import ExportRecapButton from "@/components/features/habitRecap/ExportRecapButton";
import RecapStatCards from "@/components/features/habitRecap/RecapStatCards";
import DailyRecordSection from "@/components/features/habitRecap/DailyRecordSection";
import ComingSoonCard from "@/components/features/habitRecap/ComingSoonCard";

type HabitRecapPageProps = {
  habitId: HabitId;
};

// Halaman rekap kebiasaan generik: dipakai untuk SEMUA submenu "Rekap
// Kebiasaan" di Sidebar. Kontennya (banner, kartu ringkasan, kolom tabel)
// mengikuti `habitId` yang aktif, jadi berubah otomatis tanpa reload saat
// pindah menu di Sidebar (mis. dari "Bangun Pagi" ke "Beribadah").
export default function HabitRecapPage({ habitId }: HabitRecapPageProps) {
  const config = getHabitConfig(habitId);
  const {
    recap,
    loading,
    notFound,
    error,
    period,
    query,
    statusFilter,
    sortBy,
    remindedIds,
    filteredStudents,
    pagedStudents,
    totalItems,
    totalPages,
    currentPage,
    startIndex,
    handlePeriodChange,
    handleQueryChange,
    handleStatusChange,
    handleSortChange,
    handlePageChange,
    handleRemind,
  } = useHabitRecap(habitId);

  if (loading && !recap) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <SpinLoader size={48} />
      </div>
    );
  }

  if (notFound) {
    return <ComingSoonCard habitLabel={config.label} icon={config.icon} />;
  }

  if (!recap) {
    return error ? <ErrorAlert message={error} /> : null;
  }

  const { class_group: classGroup, summary } = recap;
  const columnLabels = { primary: config.primaryColumnLabel, method: config.methodColumnLabel };

  return (
    <div className="space-y-6">
      {error && <ErrorAlert message={error} />}

      <RecapHero
        heroBadgeText={config.heroBadgeText}
        educationLevel={classGroup.education_level}
        rombelName={classGroup.name}
        targetLabel={config.targetLabel}
        targetValue={classGroup.target_value}
        teacherName={classGroup.teacher_name}
        totalStudents={classGroup.total_students}
      >
        <PeriodFilter value={period} options={HABIT_PERIOD_OPTIONS} onChange={handlePeriodChange} />
        <ExportRecapButton
          records={filteredStudents}
          fileName={`rekap-${config.id}-kelas-${classGroup.name}`}
          columnLabels={columnLabels}
        />
      </RecapHero>

      <RecapStatCards summary={summary} />

      <DailyRecordSection
        recordDateLabel={recap.record_date_label}
        rombelName={classGroup.name}
        primaryColumnLabel={config.primaryColumnLabel}
        methodColumnLabel={config.methodColumnLabel}
        students={pagedStudents}
        totalItems={totalItems}
        page={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        query={query}
        statusFilter={statusFilter}
        sortBy={sortBy}
        remindedIds={remindedIds}
        onQueryChange={handleQueryChange}
        onStatusChange={handleStatusChange}
        onSortChange={handleSortChange}
        onPageChange={handlePageChange}
        onRemind={handleRemind}
      />
    </div>
  );
}
