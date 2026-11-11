import { apiRequest } from "@/lib/api/client";
import { getRombelInfoApi, getRombelStudentsApi } from "@/lib/api/classroomApi";
import { mockStudentCredentials } from "@/lib/mocks/studentAccountMock";
import { ApiResult } from "@/lib/types/apiType";
import { StudentCredential } from "@/lib/types/studentAccountType";
import { isMockEnabled, mockDelay } from "@/lib/utils/mock";

// Daftar siswa rombel untuk halaman Akun & QR. Backend belum punya endpoint
// status akun/QR per siswa, jadi daftar dibangun dari GET /students dan info
// rombel; status QR hanya diketahui untuk QR yang dibuat pada sesi ini.
export async function getStudentCredentialsApi(): Promise<ApiResult<StudentCredential[]>> {
  if (isMockEnabled()) {
    await mockDelay();
    return { ok: true, status: 200, data: mockStudentCredentials };
  }

  const [info, students] = await Promise.all([getRombelInfoApi(), getRombelStudentsApi()]);
  if (!info.ok) return info;
  if (!students.ok) return students;

  return {
    ok: true,
    status: 200,
    data: students.data.map((student) => ({
      student_id: student.id,
      name: student.fullname,
      nis: student.nisn,
      class_group_name: `${info.data.classGroup.education_level} · ${info.data.classGroup.name}`,
      academic_year: info.data.classGroup.academic_year,
      status: student.status,
    })),
  };
}

// POST /qr-tokens/{studentId}/regenerate -> { qr_payload }.
// PERHATIAN: QR lama milik siswa tersebut langsung tidak berlaku. qr_payload
// hanya dikirim sekali (tidak disimpan backend), jadi harus langsung dipakai.
export async function regenerateQrApi(studentId: number): Promise<ApiResult<{ qr_payload: string }>> {
  if (isMockEnabled()) {
    await mockDelay(300);
    return { ok: true, status: 200, data: { qr_payload: `mock-qr-payload-${studentId}` } };
  }

  return apiRequest<{ qr_payload: string }>(`/qr-tokens/${studentId}/regenerate`, {
    method: "POST",
  });
}

// POST /students/{id}/reset-password: wajib body { new_password } (min. 8 karakter).
export async function resetStudentPasswordApi(
  studentId: number,
  newPassword: string
): Promise<ApiResult<unknown>> {
  if (isMockEnabled()) {
    await mockDelay(300);
    return { ok: true, status: 200, data: null };
  }

  return apiRequest(`/students/${studentId}/reset-password`, {
    method: "POST",
    body: { new_password: newPassword },
  });
}
