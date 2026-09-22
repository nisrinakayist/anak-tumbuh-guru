"use client";

import { HabitStudentRecord } from "@/lib/types/habitRecapType";
import PrimaryValueCell from "@/components/features/habitRecap/PrimaryValueCell";
import MethodBadge from "@/components/features/habitRecap/MethodBadge";
import ReportStatusBadge from "@/components/features/habitRecap/ReportStatusBadge";
import PointsLabel from "@/components/features/habitRecap/PointsLabel";
import StudentRowActions from "@/components/features/habitRecap/StudentRowActions";

type StudentRecordListProps = {
  students: HabitStudentRecord[];
  startIndex: number;
  remindedIds: number[];
  onView?: (student: HabitStudentRecord) => void;
  onRemind: (studentId: number) => void;
};

// Versi mobile dari StudentRecordTable (tampil di bawah breakpoint md).
export default function StudentRecordList({ students, startIndex, remindedIds, onView, onRemind }: StudentRecordListProps) {
  return (
    <div className="divide-y divide-primary-50 md:hidden">
      {students.map((student, index) => (
        <div key={student.id} className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-extrabold text-primary-900">
                {String(startIndex + index + 1).padStart(2, "0")} · {student.name}
              </p>
              <p className="text-[11px] font-semibold text-primary-900/45">NIS: {student.nis}</p>
            </div>
            <StudentRowActions student={student} isReminded={remindedIds.includes(student.id)} onView={onView} onRemind={onRemind} />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <PrimaryValueCell value={student.primary_value} note={student.primary_note} />
            <MethodBadge label={student.method_label} tone={student.method_tone} />
            <ReportStatusBadge status={student.report_status} />
            <PointsLabel points={student.points} />
          </div>
        </div>
      ))}
    </div>
  );
}
