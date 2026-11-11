import { HABIT_ORDER } from "@/lib/constants/habitRecapConfig";
import { HABIT_RECAP_MOCKS } from "@/lib/mocks/habitRecapMock";
import { ApiResult } from "@/lib/types/apiType";
import { HabitId, HabitPeriodId, HabitRecapData } from "@/lib/types/habitRecapType";
import { isMockEnabled, mockDelay } from "@/lib/utils/mock";

// Rekap kelas guru MENUNGGU endpoint backend INTEG-REKAP-001 (usulan
// GET /habits/recap?rombel_id&from&to, rentang maks. 31 hari). Sampai addendum-nya
// terbit, rekap hanya berjalan di mode data dummy dan halamannya disembunyikan
// saat memakai backend asli (lihat app/dashboard/habit-recap/*).
// Catatan untuk saat endpoint siap: GET /habits/entries hanya memuat 6 kebiasaan,
// Bermasyarakat ada di GET /bermasyarakat/entries; gabungkan keduanya bila perlu.

const unavailable = (): ApiResult<never> => ({
  ok: false,
  status: 404,
  error: {
    code: "not_available",
    message: "Rekap kebiasaan belum tersedia. Fitur akan segera hadir.",
    details: [],
  },
});

export async function getHabitRecapApi(
  habitId: HabitId,
  period: HabitPeriodId
): Promise<ApiResult<HabitRecapData>> {
  if (!isMockEnabled()) return unavailable();

  void period;
  await mockDelay();

  const data = HABIT_RECAP_MOCKS[habitId];
  if (!data) return unavailable();
  return { ok: true, status: 200, data };
}

export type HabitOverview = {
  classLabel: string;
  averageRate: number; // persen, rata-rata tingkat laporan 7 kebiasaan
  totalEntries: number;
  rates: Record<HabitId, number>;
};

// Ringkasan 7 kebiasaan (data dummy).
export async function getHabitOverviewApi(): Promise<ApiResult<HabitOverview>> {
  if (!isMockEnabled()) return unavailable();

  await mockDelay(200);
  const rates = Object.fromEntries(
    HABIT_ORDER.map((id) => {
      const report = HABIT_RECAP_MOCKS[id]?.summary.find((item) => item.key === "report_rate");
      return [id, Number.parseInt(report?.value ?? "0", 10)];
    })
  ) as Record<HabitId, number>;

  return {
    ok: true,
    status: 200,
    data: { classLabel: "Kelas 1 • Rombel 1-A", averageRate: 71, totalEntries: 140, rates },
  };
}
