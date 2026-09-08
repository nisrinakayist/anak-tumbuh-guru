import {
  StudentCredentialListResponse,
  GenerateAccountsResponse,
  RevokeQrResponse,
} from "@/lib/types/studentAccountType";
import { isMockEnabled, mockDelay } from "@/lib/utils/mock";
import { mockStudentCredentials } from "@/lib/mocks/studentAccountMock";

// Ambil daftar status akun & QR seluruh siswa di rombel Guru yang login
export async function getStudentCredentialsApi(): Promise<StudentCredentialListResponse> {
  if (isMockEnabled()) {
    await mockDelay();
    return {
      code: 200,
      status: "success",
      message: "OK (data dummy)",
      data: mockStudentCredentials,
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/teacher/student/credentials`,
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

// Generate Akun + QR untuk siswa yang dipilih (yang belum punya akun)
export async function generateStudentAccountsApi(
  studentIds: number[]
): Promise<GenerateAccountsResponse> {
  if (isMockEnabled()) {
    await mockDelay();
    return {
      code: 200,
      status: "success",
      message: `${studentIds.length} akun & QR berhasil digenerate (data dummy)`,
      data: { generated_count: studentIds.length },
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/teacher/student/credentials/generate`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ student_ids: studentIds }),
      }
    );
    return await res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Revoke (nonaktifkan) QR Code siswa tertentu
export async function revokeStudentQrApi(studentId: number): Promise<RevokeQrResponse> {
  if (isMockEnabled()) {
    await mockDelay();
    return { code: 200, status: "success", message: "QR berhasil di-revoke (data dummy)" };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/teacher/student/credentials/${studentId}/revoke`,
      {
        method: "POST",
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
