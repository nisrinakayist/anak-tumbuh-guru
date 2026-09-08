import { ClassroomDashboardResponse } from "@/lib/types/classroomType";
import { isMockEnabled, mockDelay } from "@/lib/utils/mock";
import { mockClassroomDashboard } from "@/lib/mocks/classroomMock";

// Ambil data rombel milik Guru yang sedang login beserta ringkasan &
// daftar siswanya. 1 Teacher = 1 rombel (dokumen bag. 2), jadi tidak
// perlu parameter class_group_id.
export async function getClassroomDashboardApi(): Promise<ClassroomDashboardResponse> {
  if (isMockEnabled()) {
    await mockDelay();
    return mockClassroomDashboard;
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/teacher/classroom/dashboard`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const response = await res.json();
    if (response.code === 401 || response.code === 403) {
      window.location.href = "/";
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
