"use client";

import useWakeUpRecap from "@/hook/useWakeUpRecap";
import { WAKE_UP_PERIOD_OPTIONS } from "@/lib/constants/wakeUpRecap";
import SpinLoader from "@/components/ui/Loader/SpinLoader";
import ErrorAlert from "@/components/ui/Alert/ErrorAlert";
import RecapHero from "@/components/features/habitRecap/RecapHero";
import PeriodFilter from "@/components/features/habitRecap/PeriodFilter";
import ExportRecapButton from "@/components/features/habitRecap/ExportRecapButton";
import RecapStatCards from "@/components/features/habitRecap/RecapStatCards";
import DailyRecordSection from "@/components/features/habitRecap/DailyRecordSection";

export default function WakeUpRecap() {
  const {
    recap,
    loading,
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
  } = useWakeUpRecap();

  if (loading && !recap) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <SpinLoader size={48} />
      </div>
    );
  }

  if (!recap) {
    return error ? <ErrorAlert message={error} /> : null;
  }

  const { class_group: classGroup, summary } = recap;

  return (
    <div className="space-y-6">
      {error && <ErrorAlert message={error} />}

      <RecapHero
        habitLabel="Kebiasaan 1 • Memulai Hari dengan Bangun Pagi"
        educationLevel={classGroup.education_level}
        rombelName={classGroup.name}
        targetTime={classGroup.target_wake_time}
        teacherName={classGroup.teacher_name}
        totalStudents={classGroup.total_students}
      >
        <PeriodFilter value={period} options={WAKE_UP_PERIOD_OPTIONS} onChange={handlePeriodChange} />
        <ExportRecapButton records={filteredStudents} fileName={`rekap-bangun-pagi-kelas-${classGroup.name}`} />
      </RecapHero>

      <RecapStatCards summary={summary} />

      <DailyRecordSection
        recordDateLabel={recap.record_date_label}
        rombelName={classGroup.name}
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
