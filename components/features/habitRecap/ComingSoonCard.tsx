"use client";

import { IconType } from "react-icons";
import { FiClock } from "react-icons/fi";

type ComingSoonCardProps = {
  habitLabel: string;
  icon: IconType;
};

// Ditampilkan untuk kebiasaan yang belum punya data dummy/API-nya
// (selain Bangun Pagi & Beribadah), supaya menu tetap bisa diklik tanpa error.
export default function ComingSoonCard({ habitLabel, icon: Icon }: ComingSoonCardProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-3xl border border-dashed border-primary-200 bg-white p-10 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-50 text-primary-500">
        <Icon size={26} />
      </span>
      <h2 className="mt-4 text-lg font-black text-primary-900">Rekap {habitLabel} Segera Hadir</h2>
      <p className="mt-1.5 max-w-sm text-sm font-semibold text-primary-900/55">
        Halaman ini sudah terhubung ke menu Sidebar, tapi data & fiturnya masih dalam pengembangan.
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-black text-amber-700">
        <FiClock size={12} />
        Dalam Pengembangan
      </span>
    </div>
  );
}
