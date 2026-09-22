"use client";

import { ReactNode } from "react";
import { FiClock } from "react-icons/fi";

type RecapHeroProps = {
  heroBadgeText: string;
  educationLevel: string;
  rombelName: string;
  targetLabel: string;
  targetValue: string;
  teacherName: string;
  totalStudents: number;
  children?: ReactNode; // area aksi di kanan (filter periode + tombol unduh)
};

// Banner biru tua solid (tanpa gradasi) di atas halaman rekap kebiasaan.
export default function RecapHero({
  heroBadgeText,
  educationLevel,
  rombelName,
  targetLabel,
  targetValue,
  teacherName,
  totalStudents,
  children,
}: RecapHeroProps) {
  return (
    <section className="rounded-[2rem] bg-primary-900 p-5 text-white shadow-lg sm:p-7 lg:flex lg:items-center lg:justify-between lg:gap-6">
      <div className="min-w-0">
        <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-secondary-500 ring-1 ring-white/15">
          {heroBadgeText}
        </span>

        <h1 className="mt-4 text-2xl font-black leading-tight sm:text-3xl">
          {educationLevel}
          {" "}
          <span className="mx-1 inline-block h-2.5 w-2.5 rounded-full bg-secondary-500 align-middle" />
          {" "}
          Rombel {rombelName}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs font-semibold text-primary-200">
          <span className="inline-flex items-center gap-1.5">
            <FiClock size={13} />
            {targetLabel}:{" "}
            <strong className="text-white">{targetValue}</strong>
          </span>
          <span className="text-white/30">•</span>
          <span>
            Wali Kelas: <strong className="text-white">{teacherName}</strong>
          </span>
          <span className="text-white/30">•</span>
          <span>
            Total Siswa: <strong className="text-white">{totalStudents} Anak</strong>
          </span>
        </div>
      </div>

      {children && (
        <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:mt-0 lg:flex-col lg:items-end">
          {children}
        </div>
      )}
    </section>
  );
}
