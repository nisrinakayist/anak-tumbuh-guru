// Status akun siswa sesuai dokumen bag. 8: Active (default) & Inactive.
export type StudentStatus = "active" | "inactive";

// Status pengisian 7 kebiasaan hari ini. Pengisian bersifat sekali kirim
// dan langsung terkunci (dokumen bag. 6), jadi cukup 2 status.
export type FillStatus = "filled" | "not_filled";

export type Student = {
  id: number;
  uuid: string;
  name: string;
  nis: string;
  gender: "L" | "P";
  status: StudentStatus;
  points: number;
  level: number;
  class_rank: number;
  today_status: FillStatus;
};

// Payload untuk Teacher menambahkan siswa baru secara manual ke rombelnya
export type AddStudentPayload = {
  name: string;
  nis: string;
  gender: "L" | "P";
};

export type AddStudentResponse = {
  code: number;
  status: string;
  message: string;
  data: Student | null;
};
