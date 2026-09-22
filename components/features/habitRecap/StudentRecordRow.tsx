"use client";

import { HabitStudentRecord } from "@/lib/types/habitRecapType";
import PrimaryValueCell from "@/components/features/habitRecap/PrimaryValueCell";
import MethodBadge from "@/components/features/habitRecap/MethodBadge";
import ReportStatusBadge from "@/components/features/habitRecap/ReportStatusBadge";
import PointsLabel from "@/components/features/habitRecap/PointsLabel";
import StudentRowActions from "@/components/features/habitRecap/StudentRowActions";

type StudentRecordRowProps = {
  number: number;
  student: HabitStudentRecord;
  isReminded: boolean;
  onView?: (student: HabitStudentRecord) => void;
  onRemind: (studentId: number) => void;
};

export default function StudentRecordRow({ number, student, isReminded, onView, onRemind }: StudentRecordRowProps) {
  return (
    <tr className="border-t border-primary-50 transition hover:bg-primary-50/40">
      <td className="px-3 py-3.5 text-xs font-bold text-primary-900/45 first:pl-5">
        {String(number).padStart(2, "0")}
      </td>
      <td className="px-3 py-3.5">
        <p className="text-xs font-extrabold text-primary-900">{student.name}</p>
        <p className="whitespace-nowrap text-[10px] font-semibold text-primary-900/45">NIS: {student.nis}</p>
      </td>
      <td className="px-3 py-3.5">
        <PrimaryValueCell value={student.primary_value} note={student.primary_note} />
      </td>
      <td className="px-3 py-3.5">
        <MethodBadge label={student.method_label} tone={student.method_tone} />
      </td>
      <td className="px-3 py-3.5">
        <ReportStatusBadge status={student.report_status} />
      </td>
      <td className="px-3 py-3.5">
        <PointsLabel points={student.points} />
      </td>
      <td className="px-3 py-3.5 last:pr-5">
        <StudentRowActions student={student} isReminded={isReminded} onView={onView} onRemind={onRemind} />
      </td>
    </tr>
  );
}
