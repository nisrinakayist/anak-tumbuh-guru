import { StudentCredential } from "@/lib/types/studentAccountType";

export const mockStudentCredentials: StudentCredential[] = [
  {
    student_id: 1,
    name: "Neval",
    nis: "0987654",
    class_group_name: "Kelas 5 — Cendekia",
    academic_year: "2026/2027",
    account_status: "generated",
    qr_status: "active",
  },
  {
    student_id: 2,
    name: "Ahmad Rizky",
    nis: "0098765432",
    class_group_name: "Kelas 5 — Cendekia",
    academic_year: "2026/2027",
    account_status: "generated",
    qr_status: "active",
  },
  {
    student_id: 3,
    name: "Bintang Pratama",
    nis: "0098765433",
    class_group_name: "Kelas 5 — Cendekia",
    academic_year: "2026/2027",
    account_status: "not_generated",
    qr_status: "not_available",
  },
  {
    student_id: 4,
    name: "Citra Lestari",
    nis: "0098765434",
    class_group_name: "Kelas 5 — Cendekia",
    academic_year: "2026/2027",
    account_status: "generated",
    qr_status: "active",
  },
];
