// Alur import Excel siswa (API Contract v1.2 §18):
//   Preview (POST /student-imports/preview, file .xlsx)
//   -> Commit (POST /student-imports/commit, file yang sama + rombel_id)
// Commit diproses sinkron: hasil langsung ada di response.

// Baris yang gagal validasi di preview. errors = { field: [pesan, ...] }.
export type ImportInvalidRow = {
  row: number; // nomor baris di Excel (baris 1 = header)
  errors: Record<string, string[]>;
  codes?: Record<string, string>;
};

// Contoh baris valid (backend hanya mengirim 5 baris pertama).
export type ImportSampleRow = {
  row: number;
  data: { name: string; nisn: string; gender: string };
};

export type ImportPreviewResult = {
  total_rows: number;
  valid_count: number;
  invalid_count: number;
  invalid_rows: ImportInvalidRow[];
  sample_valid: ImportSampleRow[];
};

export type ImportCommitError = {
  row: number;
  field: string | null;
  code: string;
  message: string;
};

export type ImportCommitResult = {
  batch_id: number;
  total_rows: number;
  processed_rows: number;
  successful_rows: number;
  rejected_rows: number;
  errors: ImportCommitError[];
};

// GET /student-imports/status/{batchId}: membaca hasil batch yang sudah selesai.
export type ImportBatchStatus = {
  batch_id: number;
  status: string;
  total_rows: number;
  processed_rows: number;
  successful_rows: number;
  rejected_rows: number;
  errors: ImportCommitError[];
};
