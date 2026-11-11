import { ApiStudent } from "@/lib/types/apiModelType";
import { Student } from "@/lib/types/studentType";

// Pemetaan istilah/nilai antara UI (frontend guru) dan backend Laravel.
// Aturan umum: komponen UI tidak memanggil backend langsung; layer lib/api
// memakai fungsi di sini agar perubahan istilah cukup di satu tempat.
//
//   UI              -> Backend
//   nis             -> nisn
//   name            -> fullname (response siswa) / name (payload create)
//   points          -> poin
//   "L" / "P"       -> "laki-laki" / "perempuan"
//   class_group     -> rombel
//   education_level -> grade_level (angka), tampil sebagai "Kelas {n}"
//   uuid            -> (dihapus, memakai id angka)

export type UiGender = "L" | "P";
export type ApiGender = "laki-laki" | "perempuan";

export const genderToApi = (gender: UiGender): ApiGender =>
  gender === "L" ? "laki-laki" : "perempuan";

export const genderFromApi = (gender: string | null | undefined): UiGender =>
  gender === "perempuan" ? "P" : "L";

export const gradeLevelToLabel = (gradeLevel: number | null | undefined): string =>
  gradeLevel ? `Kelas ${gradeLevel}` : "-";

// Siswa dari backend -> model UI. level/class_rank/today_status diisi
// pemanggil dari sumber lain (ranking dan entri kebiasaan hari ini).
export const mapApiStudent = (
  api: ApiStudent,
  extra: Partial<Pick<Student, "level" | "class_rank" | "today_status">> = {}
): Student => ({
  id: api.id,
  name: api.fullname,
  nis: api.nisn,
  gender: genderFromApi(api.gender),
  status: api.status,
  points: api.poin ?? 0,
  level: extra.level ?? 1,
  class_rank: extra.class_rank ?? 0,
  today_status: extra.today_status ?? "not_filled",
});
