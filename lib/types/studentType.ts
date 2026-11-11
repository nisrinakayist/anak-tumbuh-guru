// Status akun siswa di backend: active, inactive, graduated.
export type StudentStatus = "active" | "inactive" | "graduated";

// Status pengisian kebiasaan HARI INI. "filled" = siswa sudah mengirim minimal
// satu kebiasaan hari ini (tiap kebiasaan dikirim terpisah ke backend).
export type FillStatus = "filled" | "not_filled";

// Model siswa untuk UI. Dibentuk dari GET /students (nisn -> nis,
// fullname -> name, gender -> L/P, poin -> points) + GET /rankings/rombel
// (level, class_rank) + GET /habits/entries (today_status).
export type Student = {
  id: number;
  name: string;
  nis: string;
  gender: "L" | "P";
  status: StudentStatus;
  points: number;
  level: number;
  class_rank: number;
  today_status: FillStatus;
};

// Payload form Tambah Siswa (UI). Dikonversi ke payload backend
// ({rombel_id, name, nisn, gender: "laki-laki" | "perempuan"}) di studentApi.
export type AddStudentPayload = {
  name: string;
  nis: string;
  gender: "L" | "P";
};

// Payload yang dikirim ke POST /students (dan disimpan di antrean offline).
export type CreateStudentRequest = {
  rombel_id: number | null; // null = belum diketahui (offline), dicari saat sinkronisasi
  name: string;
  nisn: string;
  gender: "laki-laki" | "perempuan";
};

// Hasil tambah siswa:
//  saved  = tersimpan di server
//  queued = tidak ada koneksi, diantrekan di IndexedDB (disinkronkan otomatis)
//  failed = ditolak server / gagal (message dari backend)
export type AddStudentOutcome =
  | { kind: "saved"; message: string; student: Student | null }
  | { kind: "queued"; message: string }
  | { kind: "failed"; message: string };
