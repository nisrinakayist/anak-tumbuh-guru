import { apiRequest } from "@/lib/api/client";
import { mockHabitGuideContent } from "@/lib/mocks/habitGuideMock";
import { ApiResult } from "@/lib/types/apiType";
import { HabitGuideMap } from "@/lib/types/habitGuideType";
import { isMockEnabled, mockDelay } from "@/lib/utils/mock";

type ApiHabit = { id: number; code: string };
type ApiGuide = { habit_id: number; content: string };

// Kode kebiasaan di backend "makan_sehat_bergizi"; di FE "makan_sehat".
const toFrontendCode = (code: string) => (code === "makan_sehat_bergizi" ? "makan_sehat" : code);

let habitIdByCode: Promise<ApiResult<Record<string, number>>> | null = null;

// GET /habits (katalog 7 kebiasaan, semua role). Di-cache selama halaman terbuka.
async function getHabitIdByCode(): Promise<ApiResult<Record<string, number>>> {
  if (!habitIdByCode) {
    habitIdByCode = apiRequest<ApiHabit[]>("/habits").then((res) => {
      if (!res.ok) {
        habitIdByCode = null;
        return res;
      }
      const map: Record<string, number> = {};
      (res.data ?? []).forEach((habit) => {
        map[toFrontendCode(habit.code)] = habit.id;
      });
      return { ok: true, status: res.status, data: map } as ApiResult<Record<string, number>>;
    });
  }
  return habitIdByCode;
}

// Panduan seluruh kebiasaan di rombel Guru (hanya yang sudah ada).
export async function getHabitGuidesApi(rombelId: number): Promise<ApiResult<HabitGuideMap>> {
  if (isMockEnabled()) {
    await mockDelay();
    return { ok: true, status: 200, data: { ...mockHabitGuideContent } };
  }

  const [habits, guides] = await Promise.all([
    getHabitIdByCode(),
    apiRequest<ApiGuide[]>(`/rombels/${rombelId}/habit-guides`),
  ]);
  if (!habits.ok) return habits;
  if (!guides.ok) return guides;

  const codeById = new Map(Object.entries(habits.data).map(([code, id]) => [id, code]));
  const result: HabitGuideMap = {};
  (guides.data ?? []).forEach((guide) => {
    const code = codeById.get(guide.habit_id);
    if (code) result[code] = guide.content;
  });
  return { ok: true, status: 200, data: result };
}

// Simpan panduan satu kebiasaan. Teks kosong = hapus panduan (tetap 200).
export async function saveHabitGuideApi(
  rombelId: number,
  habitCode: string,
  content: string
): Promise<ApiResult<{ content: string | null }>> {
  if (isMockEnabled()) {
    await mockDelay();
    return { ok: true, status: 200, data: { content: content.trim() || null } };
  }

  const habits = await getHabitIdByCode();
  if (!habits.ok) return habits;
  const habitId = habits.data[habitCode];
  if (!habitId) {
    return {
      ok: false,
      status: 404,
      error: { code: "not_found", message: "Kebiasaan tidak ditemukan.", details: [] },
    };
  }

  return apiRequest<{ content: string | null }>(`/rombels/${rombelId}/habit-guides/${habitId}`, {
    method: "PATCH",
    body: { content },
  });
}
