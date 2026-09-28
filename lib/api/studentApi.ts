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
import { saveOfflineRecord } from "@/lib/pwa/offline-db";

// Dipakai saat request tidak bisa sampai ke server (offline / koneksi putus).
// Data disimpan dulu ke IndexedDB, nanti dikirim ulang otomatis oleh
// lib/pwa/offline-sync.ts begitu koneksi kembali online.
const queueAddStudentOffline = async (
  payload: AddStudentPayload,
  message: string
): Promise<AddStudentResponse> => {
  await saveOfflineRecord("add_student", payload);
  return {
    code: 202,
    status: "offline_pending",
    message,
    data: null,
  };
};

// Tambah siswa manual ke rombel Teacher yang login (dokumen bag. 2:
// "Teacher diberikan akses langsung untuk menambahkan/menginput data siswa baru")
export async function addStudentApi(payload: AddStudentPayload): Promise<AddStudentResponse> {
  // Cek offline duluan (berlaku juga saat mode mock, supaya alur offline
  // tetap bisa dites sebelum backend beneran siap).
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    return queueAddStudentOffline(
      payload,
      "Koneksi offline. Data siswa disimpan sementara di perangkat dan akan otomatis disinkronkan saat online kembali."
    );
  }

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
    // fetch gagal total (bukan sekadar respons error) biasanya berarti
    // koneksi putus di tengah jalan -> antrekan juga sebagai data offline.
    console.log(error);
    return queueAddStudentOffline(
      payload,
      "Gagal terhubung ke server. Data siswa disimpan sementara di perangkat dan akan otomatis disinkronkan saat online kembali."
    );
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
