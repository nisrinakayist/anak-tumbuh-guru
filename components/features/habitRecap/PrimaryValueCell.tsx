"use client";

import { FiClock } from "react-icons/fi";

type PrimaryValueCellProps = {
  value: string | null;
  note: string | null;
};

// Sel capaian utama tabel (jam bangun / capaian ibadah / durasi belajar, dst).
export default function PrimaryValueCell({ value, note }: PrimaryValueCellProps) {
  if (!value) {
    return <span className="text-xs font-semibold text-primary-900/45">Belum tercatat</span>;
  }

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-secondary-100 px-2.5 py-1 text-xs font-black text-primary-900">
        <FiClock size={12} className="text-secondary-500" />
        {value}
      </span>
      {note && <span className="whitespace-nowrap text-[10px] font-bold text-emerald-600">({note})</span>}
    </div>
  );
}
