import { AddStudentPayload, Student } from "@/lib/types/studentType";
import { ImportCommitResult, ImportPreviewResult } from "@/lib/types/studentImportType";
import { mockStudents } from "@/lib/mocks/classroomMock";

// Siswa baru benar-benar di-push ke mockStudents (array yang sama dipakai
// getMockClassroomDashboard), jadi begitu dashboard di-refresh siswa baru
// langsung kelihatan di tabel.
export const buildMockAddStudent = (payload: AddStudentPayload): Student => {
  const newStudent: Student = {
    id: mockStudents.length + 1,
    name: payload.name,
    nis: payload.nis,
    gender: payload.gender,
    status: "active",
    points: 0,
    level: 1,
    class_rank: mockStudents.length + 1,
    today_status: "not_filled",
  };

  mockStudents.push(newStudent);
  return newStudent;
};

// Baris 4 sengaja invalid untuk mendemokan tampilan error di preview import.
export const mockImportPreview: ImportPreviewResult = {
  total_rows: 3,
  valid_count: 2,
  invalid_count: 1,
  sample_valid: [
    { row: 2, data: { name: "Keisha Ramadhani", nisn: "2025011", gender: "perempuan" } },
    { row: 3, data: { name: "Lutfi Hakim", nisn: "2025012", gender: "laki-laki" } },
  ],
  invalid_rows: [
    {
      row: 4,
      errors: {
        name: ["Nama Lengkap wajib diisi"],
        nisn: ["Nilai '2025011' kembar dengan baris 2 di file ini"],
      },
    },
  ],
};

export const buildMockImportCommit = (): ImportCommitResult => ({
  batch_id: 1,
  total_rows: 2,
  processed_rows: 2,
  successful_rows: 2,
  rejected_rows: 0,
  errors: [],
});
