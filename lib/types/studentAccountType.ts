// Akun & QR Siswa: fitur Generate Akun + QR Code untuk siswa di rombel Guru.
// Sesuai dokumen bag. 7 ("...Preview -> Generate Akun") dan bag. 8
// ("Akses Siswa (QR Code): Siswa menggunakan login berbasis QR Code...
// Kartu QR Code dapat dicetak oleh pihak sekolah/wali kelas").
export type AccountStatus = "generated" | "not_generated";
export type QrStatus = "active" | "revoked" | "not_available";

export type StudentCredential = {
  student_id: number;
  name: string;
  nis: string;
  class_group_name: string;
  academic_year: string;
  account_status: AccountStatus;
  qr_status: QrStatus;
};

export type StudentCredentialListResponse = {
  code: number;
  status: string;
  message: string;
  data: StudentCredential[] | null;
};

export type GenerateAccountsResponse = {
  code: number;
  status: string;
  message: string;
  data: { generated_count: number } | null;
};

export type RevokeQrResponse = {
  code: number;
  status: string;
  message: string;
};
