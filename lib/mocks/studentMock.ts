import { AddStudentPayload, AddStudentResponse } from "@/lib/types/studentType";
import {
  StudentImportValidationResponse,
  StudentImportCommitResponse,
  ValidatedStudentImportRow,
} from "@/lib/types/studentImportType";

export const buildMockAddStudentResponse = (payload: AddStudentPayload): AddStudentResponse => ({
  code: 200,
  status: "success",
  message: `${payload.name} berhasil ditambahkan (data dummy)`,
  data: {
    id: 99,
    uuid: "mock-student-new",
    name: payload.name,
    nis: payload.nis,
    gender: payload.gender,
    status: "active",
    points: 0,
    level: 1,
    class_rank: 11,
    today_status: "not_filled",
  },
});

// Baris ke-3 sengaja dibuat invalid untuk mendemokan tampilan error preview import.
const mockImportRows: ValidatedStudentImportRow[] = [
  {
    row_number: 2,
    name: "Keisha Ramadhani",
    nis: "2025011",
    gender: "P",
    education_level: "Kelas 1",
    class_group_name: "1-A",
    valid: true,
    errors: [],
  },
  {
    row_number: 3,
    name: "Lutfi Hakim",
    nis: "2025012",
    gender: "L",
    education_level: "Kelas 1",
    class_group_name: "1-A",
    valid: true,
    errors: [],
  },
  {
    row_number: 4,
    name: "",
    nis: "2025011",
    gender: "L",
    education_level: "Kelas 1",
    class_group_name: "1-A",
    valid: false,
    errors: ["Nama Lengkap wajib diisi", "NIS duplikat dengan baris 2"],
  },
];

export const mockImportValidationResponse: StudentImportValidationResponse = {
  code: 200,
  status: "success",
  message: "File berhasil divalidasi (data dummy)",
  data: {
    rows: mockImportRows,
    valid_count: mockImportRows.filter((row) => row.valid).length,
    invalid_count: mockImportRows.filter((row) => !row.valid).length,
  },
};

export const buildMockCommitResponse = (
  rows: ValidatedStudentImportRow[]
): StudentImportCommitResponse => ({
  code: 200,
  status: "success",
  message: "Import berhasil (data dummy)",
  data: {
    imported_count: rows.filter((row) => row.valid).length,
  },
});
