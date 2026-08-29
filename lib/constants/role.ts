// Aplikasi ini khusus Dashboard Guru (Teacher).
// Role lain (Super Admin, Headmaster, Student) memiliki aplikasi/dashboard terpisah.
export type UserRole = "teacher";

export const TEACHER_ROLE: UserRole = "teacher";
export const TEACHER_ROLE_LABEL = "Guru";
export const TEACHER_DASHBOARD_PATH = "/dashboard";
