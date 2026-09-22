import Link from "next/link";
import { FiChevronRight, FiDownload, FiTrendingUp } from "react-icons/fi";
import { HABIT_ORDER, HABIT_RECAP_CONFIG } from "@/lib/constants/habitRecapConfig";
import { HABIT_RECAP_MOCKS } from "@/lib/mocks/habitRecapMock";

const getPercentage = (habitId: (typeof HABIT_ORDER)[number]) => {
  const data = HABIT_RECAP_MOCKS[habitId];
  if (!data) return 0;
  const report = data.summary.find((item) => item.key === "report_rate");
  return Number.parseInt(report?.value ?? "0", 10);
};

const getDescription = (habitId: (typeof HABIT_ORDER)[number]) => {
  const descriptions: Record<(typeof HABIT_ORDER)[number], string> = {
    "wake-up": "Disiplin subuh & bangun tepat waktu",
    worship: "Sholat dan ibadah harian",
    study: "Membaca buku, mengulang materi & belajar",
    "healthy-eating": "Sarapan bergizi, sayur & buah",
    exercise: "Aktivitas fisik >30 menit / senam pagi",
    social: "Membantu, sopan santun & kegiatan sosial",
    "early-sleep": "Tidur sebelum 21.00 WIB tanpa gadget",
  };
  return descriptions[habitId];
};

export default function HabitRecapOverview() {
  return (
    <div className="mx-auto max-w-2xl space-y-4 pb-2 lg:max-w-5xl">
      <section className="rounded-2xl border border-primary-100 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-primary-500">Dashboard Pembiasaan</p>
            <h1 className="mt-1 text-xl font-black text-primary-900 sm:text-2xl">Rekap 7 Kebiasaan</h1>
            <p className="mt-1 text-xs font-semibold text-primary-900/55">Pantau capaian dan rekapitulasi per karakter anak</p>
          </div>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary-50 text-primary-600">
            <FiTrendingUp size={17} />
          </span>
        </div>

        <div className="mt-4 rounded-2xl bg-primary-900 p-4 text-white shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[9px] font-black uppercase tracking-wide text-primary-200">Kelas 1 • Rombel 1-A</p>
              <p className="mt-2 text-xs font-semibold text-primary-200">Rata-rata Keterlaksanaan Kelas</p>
              <div className="mt-0.5 flex items-end gap-2">
                <strong className="text-3xl font-black">71.4%</strong>
                <span className="pb-1 text-[9px] font-bold text-secondary-500">+3.2% minggu ini</span>
              </div>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white">
              <FiTrendingUp size={19} />
            </div>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/15">
            <div className="h-full w-[71.4%] rounded-full bg-secondary-500" />
          </div>
          <div className="mt-2 flex justify-between text-[8px] font-bold text-white/65">
            <span>Total: 140 Entri</span>
            <span>Konsistensi: Baik</span>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between px-1">
        <h2 className="text-[10px] font-black uppercase tracking-wide text-primary-900">Daftar Karakter Utama</h2>
        <span className="text-[9px] font-bold text-primary-500">Semester Ganjil</span>
      </div>

      <div className="space-y-2.5">
        {HABIT_ORDER.map((habitId) => {
          const config = HABIT_RECAP_CONFIG[habitId];
          const percentage = getPercentage(habitId);

          return (
            <Link
              key={habitId}
              href={`/dashboard/habit-recap/${habitId}`}
              className="group block rounded-xl border border-primary-100 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-600">
                  <config.icon size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-black text-primary-900">
                        {config.number}. {config.label}
                      </h3>
                      <p className="mt-0.5 truncate text-[9px] font-semibold text-primary-900/55">{getDescription(habitId)}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-primary-50 px-2 py-1 text-[8px] font-black text-primary-600">
                      {percentage >= 80 ? "Tinggi" : percentage >= 65 ? "Stabil" : "Perlu Pendampingan"}
                    </span>
                  </div>

                  <div className="mt-2 rounded-lg bg-primary-50/60 p-2">
                    <div className="flex items-center justify-between text-[8px] font-bold text-primary-900/50">
                      <span>Pencapaian</span>
                      <span className="font-black text-primary-900">{percentage}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-primary-100">
                      <div className="h-full rounded-full bg-primary-500" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                </div>
                <FiChevronRight className="mt-8 shrink-0 text-primary-900/45 transition group-hover:translate-x-0.5 group-hover:text-primary-600" size={16} />
              </div>
            </Link>
          );
        })}
      </div>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-3 text-[10px] font-black text-white shadow-sm transition hover:bg-primary-700"
      >
        <FiDownload size={15} />
        Unduh Rekap Lengkap (Semua Kebiasaan)
      </button>
      <p className="px-4 text-center text-[8px] font-semibold text-primary-900/45">
        Format PDF/Excel kompatibel untuk pelaporan wali murid & kepala sekolah
      </p>
    </div>
  );
}
