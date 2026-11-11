// Akun & QR Siswa.
// Akun login siswa dibuat OTOMATIS saat siswa dibuat (username & password
// awal = NISN), jadi tidak ada lagi "generate akun". QR dibuat lewat
// POST /qr-tokens/{studentId}/regenerate; nilai qr_payload hanya dikirim
// SEKALI oleh backend (tidak disimpan), jadi hanya tersedia di sesi ini.
export type StudentCredential = {
  student_id: number;
  name: string;
  nis: string;
  class_group_name: string;
  academic_year: string;
  status: "active" | "inactive" | "graduated";
};

// Siswa yang QR-nya sudah dibuat pada sesi ini dan siap dicetak/diunduh.
export type PrintableQr = {
  student_id: number;
  name: string;
  nis: string;
  qr_payload: string;
};
