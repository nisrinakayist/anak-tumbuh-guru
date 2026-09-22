"use client";

import { HabitStudentRecord } from "@/lib/types/habitRecapType";
import StudentRecordRow from "@/components/features/habitRecap/StudentRecordRow";

type StudentRecordTableProps = {
  students: HabitStudentRecord[];
  startIndex: number;
  remindedIds: number[];
  primaryColumnLabel: string;
  methodColumnLabel: string;
  onView?: (student: HabitStudentRecord) => void;
  onRemind: (studentId: number) => void;
};

export default function StudentRecordTable({
  students,
  startIndex,
  remindedIds,
  primaryColumnLabel,
  methodColumnLabel,
  onView,
  onRemind,
}: StudentRecordTableProps) {
  const columns = ["No", "Nama Siswa", primaryColumnLabel, methodColumnLabel, "Status Laporan", "Poin Didapat", "Aksi"];

  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full text-sm">
        <thead className="bg-primary-50/60 text-primary-900/50">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="whitespace-nowrap px-3 py-3 text-left text-[10px] font-black uppercase tracking-wider first:pl-5 last:pr-5"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <StudentRecordRow
              key={student.id}
              number={startIndex + index + 1}
              student={student}
              isReminded={remindedIds.includes(student.id)}
              onView={onView}
              onRemind={onRemind}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
