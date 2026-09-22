"use client";

import { FiEye } from "react-icons/fi";
import IconButton from "@/components/ui/Button/IconButton";
import RemindButton from "@/components/features/habitRecap/RemindButton";
import { HabitStudentRecord } from "@/lib/types/habitRecapType";

type StudentRowActionsProps = {
  student: HabitStudentRecord;
  isReminded: boolean;
  onView?: (student: HabitStudentRecord) => void;
  onRemind: (studentId: number) => void;
};

// Sudah lapor -> ikon mata (lihat detail). Belum lapor -> tombol "Ingatkan".
export default function StudentRowActions({ student, isReminded, onView, onRemind }: StudentRowActionsProps) {
  if (student.report_status === "not_filled") {
    return <RemindButton isReminded={isReminded} onClick={() => onRemind(student.id)} />;
  }

  return <IconButton icon={FiEye} label={`Lihat detail ${student.name}`} onClick={() => onView?.(student)} />;
}
