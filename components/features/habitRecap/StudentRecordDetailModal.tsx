"use client";

import { HabitStudentRecord } from "@/lib/types/habitRecapType";

type StudentRecordDetailModalProps = {
  student: HabitStudentRecord;
  primaryColumnLabel: string;
  methodColumnLabel: string;
  dateLabel: string;
  onClose: () => void;
};

// Detail isian siswa (hanya baca). Entri kebiasaan tidak bisa diedit atau
// dihapus guru: backend tidak punya PATCH/DELETE entri (Contract v1.3).
export default function StudentRecordDetailModal({
  student,
  primaryColumnLabel,
  methodColumnLabel,
  dateLabel,
  onClose,
}: StudentRecordDetailModalProps) {
  const rows: [string, string][] = [
    ["Tanggal", dateLabel],
    ["NISN", student.nis],
    [primaryColumnLabel, student.primary_value ?? "-"],
    ["Catatan", student.primary_note ?? "-"],
    [methodColumnLabel, student.method_label ?? "-"],
    ["Poin", String(student.points)],
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary-900/50 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Detail isian ${student.name}`}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-lg font-extrabold text-primary-900">{student.name}</h2>
        <dl className="mt-4 divide-y divide-primary-50 text-sm">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 py-2.5">
              <dt className="font-semibold text-primary-900/60">{label}</dt>
              <dd className="text-right font-bold text-primary-900">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs font-semibold text-primary-900/50">
          Isian siswa bersifat tetap dan tidak dapat diubah.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-2xl bg-primary-500 px-4 py-3 text-sm font-black text-white hover:bg-primary-600"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
