import { AddStudentPayload, AddStudentResponse } from "@/lib/types/studentType";
import {
  StudentImportValidationResponse,
  StudentImportCommitResponse,
  ValidatedStudentImportRow,
} from "@/lib/types/studentImportType";
import { isMockEnabled, mockDelay } from "@/lib/utils/mock";
import {
  buildMockAddStudentResponse,
  mockImportValidationResponse,
  buildMockCommitResponse,
} from "@/lib/mocks/studentMock";

// Tambah siswa manual ke rombel Teacher yang login (dokumen bag. 2:
// "Teacher diberikan akses langsung untuk menambahkan/menginput data siswa baru")
export async function addStudentApi(payload: AddStudentPayload): Promise<AddStudentResponse> {
  if (isMockEnabled()) {
    await mockDelay();
    return buildMockAddStudentResponse(payload);
  }

  try {
    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("nis", payload.nis);
    formData.append("gender", payload.gender);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/teacher/student/store`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: formData,
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Tahap 1: Upload file Excel untuk divalidasi (dokumen bag. 7: Validasi Strict)
export async function validateStudentImportApi(
  file: File
): Promise<StudentImportValidationResponse> {
  if (isMockEnabled()) {
    await mockDelay();
    void file;
    return mockImportValidationResponse;
  }

  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/teacher/student/import/validate`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: formData,
      }
    );
    const response = await res.json();
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Tahap 2: Commit baris yang valid untuk Generate Akun
export async function commitStudentImportApi(
  rows: ValidatedStudentImportRow[]
): Promise<StudentImportCommitResponse> {
  if (isMockEnabled()) {
    await mockDelay();
    return buildMockCommitResponse(rows);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/teacher/student/import/commit`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ rows }),
      }
    );
    const response = await res.json();
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
