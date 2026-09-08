// Alur import Excel siswa sesuai dokumen bag. 7:
// Upload -> Validasi Strict -> Preview -> Generate Akun
export type ImportStudentRow = {
  row_number: number;
  name: string;
  nis: string;
  gender: string;
  education_level: string;
  class_group_name: string;
};

export type ValidatedStudentImportRow = ImportStudentRow & {
  valid: boolean;
  errors: string[];
};

export type StudentImportValidationResponse = {
  code: number;
  status: string;
  message: string;
  data: {
    rows: ValidatedStudentImportRow[];
    valid_count: number;
    invalid_count: number;
  } | null;
};

export type StudentImportCommitResponse = {
  code: number;
  status: string;
  message: string;
  data: {
    imported_count: number;
  } | null;
};
