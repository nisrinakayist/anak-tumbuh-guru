import { HABIT_RECAP_MOCKS } from "@/lib/mocks/habitRecapMock";
import { HabitId, HabitPeriodId, HabitRecapResponse } from "@/lib/types/habitRecapType";
import { mockDelay } from "@/lib/utils/mock";

// Rekap kebiasaan rombel milik Wali Kelas yang login, per kebiasaan.
// Saat ini SELALU memakai data dummy. Kalau endpoint backend sudah ada,
// ganti isi fungsi ini dengan fetch seperti di lib/api/classroomApi.ts
// (kirim `habitId` & `period` sebagai bagian path/query).
export async function getHabitRecapApi(habitId: HabitId, period: HabitPeriodId): Promise<HabitRecapResponse> {
  void period;
  await mockDelay();

  const data = HABIT_RECAP_MOCKS[habitId];
  if (!data) {
    return {
      code: 404,
      status: "not_found",
      message: "Rekap kebiasaan ini belum tersedia. Fitur akan segera hadir.",
      data: null,
    };
  }

  return { code: 200, status: "success", message: "OK (data dummy)", data };
}
