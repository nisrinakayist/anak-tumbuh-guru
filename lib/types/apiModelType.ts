// Bentuk data MENTAH dari backend (sesuai Resource Laravel). Dipakai oleh
// layer lib/api saja; UI memakai tipe di studentType/classroomType/dst
// setelah dipetakan lewat lib/utils/mappers.ts.

export type ApiStudent = {
  id: number;
  fullname: string;
  nisn: string;
  gender: "laki-laki" | "perempuan";
  photo: string | null;
  poin: number;
  status: "active" | "inactive" | "graduated";
  school: { id: number; name: string };
  username: string;
};

export type ApiTeacherDashboard = {
  rombel: { id: number; name: string };
  student_count: { active: number; inactive: number; graduated: number };
  habit_submission_today: { average_submitted: number; total: number };
};

export type ApiRombel = {
  id: number;
  school_id: number;
  academic_year_id: number;
  name: string;
  grade_level: number;
};

export type ApiAcademicYear = {
  id: number;
  school_id: number;
  name: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
};

export type ApiRankingEntry = {
  student_id: number;
  name: string;
  rombel: string;
  poin: number;
  level: number;
};

export type ApiIndicator = {
  id: number;
  habit_id: number;
  name: string;
  point: number | null;
  is_exclusive: boolean;
  sort_order: number;
};

export type ApiHabit = {
  id: number;
  code: string;
  name: string;
  allows_multi_select: boolean;
  sort_order: number;
  indicators?: ApiIndicator[];
};

export type ApiInitiative = "mandiri" | "disuruh";

// GET /habits/entries (6 kebiasaan selain Bermasyarakat)
export type ApiHabitEntry = {
  id: number;
  habit_id: number;
  student_id: number;
  indicator_id: number;
  initiative: ApiInitiative;
  habit_date: string; // YYYY-MM-DD
  classroom: string | null;
  note: string | null;
  poin_awarded: number;
};

// GET /bermasyarakat/entries
export type ApiBermasyarakatEntry = {
  id: number;
  habit_id: number;
  student_id: number;
  indicator_ids: number[];
  initiative: ApiInitiative;
  habit_date: string;
  classroom: string | null;
  poin_awarded: number;
};
