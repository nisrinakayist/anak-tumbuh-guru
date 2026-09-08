import { ClassGroup } from "@/lib/types/classGroupType";
import { Student } from "@/lib/types/studentType";

export type ClassroomSummary = {
  total_students: number;
  filled_today: number;
  not_filled_today: number;
  average_points: number;
};

export type ClassroomDashboardData = {
  class_group: ClassGroup;
  summary: ClassroomSummary;
  students: Student[];
};

export type ClassroomDashboardResponse = {
  code: number;
  status: string;
  message: string;
  data: ClassroomDashboardData | null;
};
