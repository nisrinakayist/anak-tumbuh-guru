import { WakeUpPeriodId, WakeUpRecapResponse } from "@/lib/types/wakeUpRecapType";
import { mockDelay } from "@/lib/utils/mock";
import { mockWakeUpRecap } from "@/lib/mocks/wakeUpRecapMock";

// Rekap kebiasaan "Bangun Pagi" rombel milik Wali Kelas yang login.
// Saat ini SELALU memakai data dummy. Kalau endpoint backend sudah ada,
// ganti isi fungsi ini dengan fetch seperti di lib/api/classroomApi.ts
// (parameter `period` dikirim sebagai query string).
export async function getWakeUpRecapApi(period: WakeUpPeriodId): Promise<WakeUpRecapResponse> {
  void period;
  await mockDelay();
  return mockWakeUpRecap;
}
