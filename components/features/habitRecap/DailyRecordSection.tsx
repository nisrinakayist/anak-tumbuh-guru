"use client";

import { HabitSortBy, HabitStatusFilter, HabitStudentRecord } from "@/lib/types/habitRecapType";
import { HABIT_PAGE_SIZE } from "@/lib/constants/habitRecapConfig";
import RecordToolbar from "@/components/features/habitRecap/RecordToolbar";
import StudentRecordTable from "@/components/features/habitRecap/StudentRecordTable";
import StudentRecordList from "@/components/features/habitRecap/StudentRecordList";
import TablePagination from "@/components/ui/Pagination/TablePagination";

type DailyRecordSectionProps = {
  recordDateLabel: string;
  rombelName: string;
  primaryColumnLabel: string;
  methodColumnLabel: string;
  students: HabitStudentRecord[]; // data halaman aktif
  totalItems: number;
  page: number;
  totalPages: number;
  startIndex: number;
  query: string;
  statusFilter: HabitStatusFilter;
  sortBy: HabitSortBy;
  remindedIds: number[];
  onQueryChange: (value: string) => void;
  onStatusChange: (value: HabitStatusFilter) => void;
  onSortChange: (value: HabitSortBy) => void;
  onPageChange: (page: number) => void;
  onView?: (student: HabitStudentRecord) => void;
  onRemind: (studentId: number) => void;
};

export default function DailyRecordSection({
  recordDateLabel,
  rombelName,
  primaryColumnLabel,
  methodColumnLabel,
  students,
  totalItems,
  page,
  totalPages,
  startIndex,
  query,
  statusFilter,
  sortBy,
  remindedIds,
  onQueryChange,
  onStatusChange,
  onSortChange,
  onPageChange,
  onView,
  onRemind,
}: DailyRecordSectionProps) {
  const firstItem = totalItems ? startIndex + 1 : 0;
  const lastItem = Math.min(startIndex + HABIT_PAGE_SIZE, totalItems);

  return (
    <section className="overflow-hidden rounded-3xl border border-primary-100 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-primary-50 p-4 sm:p-5 xl:flex-row xl:items-center xl:justify-between xl:gap-6">
        <div className="min-w-0">
          <h2 className="text-base font-black text-primary-900">Catatan Harian Siswa</h2>
          <p className="mt-1 max-w-[18rem] text-[11px] font-semibold leading-relaxed text-primary-900/50">
            Menampilkan rekaman hari ini ({recordDateLabel})
          </p>
        </div>

        <RecordToolbar
          query={query}
          statusFilter={statusFilter}
          sortBy={sortBy}
          onQueryChange={onQueryChange}
          onStatusChange={onStatusChange}
          onSortChange={onSortChange}
        />
      </div>

      <StudentRecordTable
        students={students}
        startIndex={startIndex}
        remindedIds={remindedIds}
        primaryColumnLabel={primaryColumnLabel}
        methodColumnLabel={methodColumnLabel}
        onView={onView}
        onRemind={onRemind}
      />
      <StudentRecordList students={students} startIndex={startIndex} remindedIds={remindedIds} onView={onView} onRemind={onRemind} />

      {!students.length && (
        <div className="border-t border-primary-50 p-10 text-center text-sm font-semibold text-primary-900/50">
          Tidak ada siswa yang sesuai pencarian atau filter.
        </div>
      )}

      <div className="flex flex-col gap-3 border-t border-primary-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <p className="text-[11px] font-semibold text-primary-900/50">
          Menampilkan <strong className="text-primary-900">{firstItem}</strong> -{" "}
          <strong className="text-primary-900">{lastItem}</strong> dari <strong className="text-primary-900">{totalItems}</strong> siswa
          kelas {rombelName}
        </p>
        <TablePagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
      </div>
    </section>
  );
}
