import { ClassroomDashboardResponse } from "@/lib/types/classroomType";
import { Student } from "@/lib/types/studentType";

const mockStudentNames = [
  "Ahmad Fajar Ramadhan",
  "Bunga Citra Lestari",
  "Chandra Wijaya",
  "Dewi Anggraini",
  "Erlangga Putra",
  "Fitria Rahmawati",
  "Galih Prasetyo",
  "Hana Salsabila",
  "Indra Kusuma",
  "Jasmine Aulia",
];

const mockStudents: Student[] = mockStudentNames.map((name, index) => ({
  id: index + 1,
  uuid: `mock-student-${index + 1}`,
  name,
  nis: `20250${(index + 1).toString().padStart(2, "0")}`,
  gender: index % 2 === 0 ? "L" : "P",
  status: "active",
  points: 100 - index * 6,
  level: Math.max(1, 5 - Math.floor(index / 2)),
  class_rank: index + 1,
  today_status: index < 7 ? "filled" : "not_filled",
}));

export const mockClassroomDashboard: ClassroomDashboardResponse = {
  code: 200,
  status: "success",
  message: "OK (data dummy)",
  data: {
    class_group: {
      id: 1,
      uuid: "mock-class-group-1",
      name: "1-A",
      education_level: "Kelas 1",
      academic_year: "2025/2026",
      total_students: mockStudents.length,
    },
    summary: {
      total_students: mockStudents.length,
      filled_today: mockStudents.filter((s) => s.today_status === "filled").length,
      not_filled_today: mockStudents.filter((s) => s.today_status === "not_filled").length,
      average_points: Math.round(
        mockStudents.reduce((sum, s) => sum + s.points, 0) / mockStudents.length
      ),
    },
    students: mockStudents,
  },
};
