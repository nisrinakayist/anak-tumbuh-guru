import { HabitGuideResponse, SaveHabitGuidePayload, SaveHabitGuideResponse } from "@/lib/types/habitGuideType";
import { isMockEnabled, mockDelay } from "@/lib/utils/mock";
import { mockHabitGuideContent } from "@/lib/mocks/habitGuideMock";

// Ambil teks panduan pengisian untuk 1 kebiasaan di rombel Guru yang login
export async function getHabitGuideApi(
  habitId: string,
  classGroupId: number
): Promise<HabitGuideResponse> {
  if (isMockEnabled()) {
    await mockDelay();
    return {
      code: 200,
      status: "success",
      message: "OK (data dummy)",
      data: {
        habit_id: habitId,
        class_group_id: classGroupId,
        content_html: mockHabitGuideContent[habitId] ?? "<p></p>",
        updated_at: new Date().toISOString(),
      },
    };
  }

  try {
    const params = new URLSearchParams({
      habit_id: habitId,
      class_group_id: String(classGroupId),
    });
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/teacher/habit-guide?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return await res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Simpan (PUT) teks panduan pengisian yang sudah diedit Wali Kelas
export async function saveHabitGuideApi(
  payload: SaveHabitGuidePayload
): Promise<SaveHabitGuideResponse> {
  if (isMockEnabled()) {
    await mockDelay();
    return {
      code: 200,
      status: "success",
      message: "Panduan berhasil disimpan (data dummy)",
      data: {
        habit_id: payload.habit_id,
        class_group_id: payload.class_group_id,
        content_html: payload.content_html,
        updated_at: new Date().toISOString(),
      },
    };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/teacher/habit-guide`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
