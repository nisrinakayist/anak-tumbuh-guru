import { apiDownload, apiRequest, DownloadedFile } from "@/lib/api/client";
import { saveOfflineRecord } from "@/lib/pwa/offline-db";
import { buildMockAddStudent, buildMockImportCommit, mockImportPreview } from "@/lib/mocks/studentMock";
import { ApiStudent, ApiTeacherDashboard } from "@/lib/types/apiModelType";
import { ApiResult } from "@/lib/types/apiType";
import {
  ImportBatchStatus,
  ImportCommitResult,
  ImportPreviewResult,
} from "@/lib/types/studentImportType";
import {
  AddStudentOutcome,
  AddStudentPayload,
  CreateStudentRequest,
} from "@/lib/types/studentType";
import { genderToApi, mapApiStudent } from "@/lib/utils/mappers";
import { isMockEnabled, mockDelay } from "@/lib/utils/mock";
import { cacheRombelId, getCachedRombelId } from "@/lib/utils/rombelCache";

// Tipe record di antrean offline (IndexedDB), dibaca juga oleh offline-sync.
export const OFFLINE_ADD_STUDENT = "add_student";

// Rombel aktif guru untuk request tulis (tambah siswa, import).
// Online  : selalu ditanyakan ke server (GET /dashboard/teacher) agar tidak
//           memakai id basi bila penugasan wali kelas berubah.
// Offline : memakai id dari cache terakhir (bisa null).
export async function resolveRombelId(): Promise<ApiResult<number>> {
  const res = await apiRequest<ApiTeacherDashboard>("/dashboard/teacher");

  if (res.ok) {
    cacheRombelId(res.data.rombel.id);
    return { ok: true, status: 200, data: res.data.rombel.id };
  }

  if (res.status === 0) {
    const cached = getCachedRombelId();
    if (cached) return { ok: true, status: 200, data: cached };
  }

  return res;
}

// UI (nis, L/P) -> payload backend (nisn, laki-laki/perempuan).
const toCreateRequest = (payload: AddStudentPayload, rombelId: number | null): CreateStudentRequest => ({
  rombel_id: rombelId,
  name: payload.name.trim(),
  nisn: payload.nis.trim(),
  gender: genderToApi(payload.gender),
});

// Dipakai saat request tidak bisa sampai ke server (offline / koneksi putus).
// Data disimpan dulu ke IndexedDB dan dikirim ulang otomatis oleh
// lib/pwa/offline-sync.ts begitu koneksi kembali online.
const queueAddStudentOffline = async (
  request: CreateStudentRequest,
  message: string
): Promise<AddStudentOutcome> => {
  await saveOfflineRecord(OFFLINE_ADD_STUDENT, { ...request });
  return { kind: "queued", message };
};

const OFFLINE_MESSAGE =
  "Koneksi offline. Data siswa disimpan sementara di perangkat dan akan otomatis disinkronkan saat online kembali.";
const UNREACHABLE_MESSAGE =
  "Gagal terhubung ke server. Data siswa disimpan sementara di perangkat dan akan otomatis disinkronkan saat online kembali.";

// POST /students: tambah siswa ke rombel aktif guru yang login.
export async function addStudentApi(payload: AddStudentPayload): Promise<AddStudentOutcome> {
  // Cek offline duluan (berlaku juga di mode mock, supaya alur offline tetap
  // bisa dites sebelum backend siap).
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    return queueAddStudentOffline(toCreateRequest(payload, getCachedRombelId()), OFFLINE_MESSAGE);
  }

  if (isMockEnabled()) {
    await mockDelay();
    const student = buildMockAddStudent(payload);
    return { kind: "saved", message: `${payload.name} berhasil ditambahkan (data dummy)`, student };
  }

  const rombel = await resolveRombelId();
  if (!rombel.ok) {
    if (rombel.status === 0) {
      return queueAddStudentOffline(toCreateRequest(payload, null), UNREACHABLE_MESSAGE);
    }
    return { kind: "failed", message: rombel.error.message };
  }

  const request = toCreateRequest(payload, rombel.data);
  const res = await apiRequest<ApiStudent>("/students", { method: "POST", body: { ...request } });

  if (res.ok) {
    return {
      kind: "saved",
      message: `${res.data.fullname} berhasil ditambahkan`,
      student: mapApiStudent(res.data),
    };
  }

  // Gagal total (bukan sekadar respons error) = koneksi putus di tengah jalan.
  if (res.status === 0) return queueAddStudentOffline(request, UNREACHABLE_MESSAGE);

  return { kind: "failed", message: res.error.message };
}

// Kirim ulang 1 record antrean offline. Mendukung payload baru
// ({rombel_id, name, nisn, gender: "laki-laki"|"perempuan"}) dan payload
// lama ({name, nis, gender: "L"|"P"}) milik antrean versi sebelumnya.
// Return true hanya bila siswa tersimpan di server.
export async function replayQueuedStudent(raw: Record<string, unknown>): Promise<boolean> {
  const name = String(raw.name ?? "").trim();
  const nisn = String(raw.nisn ?? raw.nis ?? "").trim();
  const genderRaw = String(raw.gender ?? "");
  const gender =
    genderRaw === "perempuan" || genderRaw === "P" ? "perempuan" : "laki-laki";
  if (!name || !nisn) return false;

  let rombelId = typeof raw.rombel_id === "number" ? raw.rombel_id : null;
  if (!rombelId) {
    const resolved = await resolveRombelId();
    if (!resolved.ok) return false;
    rombelId = resolved.data;
  }

  const res = await apiRequest<ApiStudent>("/students", {
    method: "POST",
    body: { rombel_id: rombelId, name, nisn, gender },
  });
  return res.ok;
}

// ---------------------------------------------------------------- Import

// GET /student-imports/template: file .xlsx (Nama Lengkap, NISN, Gender).
export async function downloadStudentImportTemplateApi(): Promise<ApiResult<DownloadedFile>> {
  return apiDownload("/student-imports/template");
}

// Tahap 1: POST /student-imports/preview (multipart, file .xlsx maksimal 5 MB).
// Hanya validasi format; belum menyimpan apa pun.
export async function previewStudentImportApi(file: File): Promise<ApiResult<ImportPreviewResult>> {
  if (isMockEnabled()) {
    await mockDelay();
    void file;
    return { ok: true, status: 200, data: mockImportPreview };
  }

  const formData = new FormData();
  formData.append("file", file);
  return apiRequest<ImportPreviewResult>("/student-imports/preview", {
    method: "POST",
    body: formData,
  });
}

// Tahap 2: POST /student-imports/commit (file yang sama + rombel_id).
// Server memvalidasi ulang semua baris dan memprosesnya SINKRON; hasil
// langsung ada di response.
export async function commitStudentImportApi(file: File): Promise<ApiResult<ImportCommitResult>> {
  if (isMockEnabled()) {
    await mockDelay();
    void file;
    return { ok: true, status: 200, data: buildMockImportCommit() };
  }

  const rombel = await resolveRombelId();
  if (!rombel.ok) return rombel;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("rombel_id", String(rombel.data));
  return apiRequest<ImportCommitResult>("/student-imports/commit", {
    method: "POST",
    body: formData,
  });
}

// GET /student-imports/status/{batchId}: hasil batch yang sudah selesai
// (milik guru yang login). Import berjalan sinkron, jadi ini hanya untuk
// membuka ulang hasil, bukan untuk polling.
export async function getStudentImportStatusApi(
  batchId: number
): Promise<ApiResult<ImportBatchStatus>> {
  return apiRequest<ImportBatchStatus>(`/student-imports/status/${batchId}`);
}
