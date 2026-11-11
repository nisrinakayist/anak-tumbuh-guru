import { apiRequest, fetchAllPages } from "@/lib/api/client";
import { getMockClassroomDashboard } from "@/lib/mocks/classroomMock";
import {
  ApiAcademicYear,
  ApiBermasyarakatEntry,
  ApiHabitEntry,
  ApiRankingEntry,
  ApiRombel,
  ApiStudent,
  ApiTeacherDashboard,
} from "@/lib/types/apiModelType";
import { ApiFailure, ApiResult } from "@/lib/types/apiType";
import { ClassGroup } from "@/lib/types/classGroupType";
import { ClassroomDashboardData } from "@/lib/types/classroomType";
import { Student } from "@/lib/types/studentType";
import { todayInJakarta } from "@/lib/utils/date";
import { gradeLevelToLabel, mapApiStudent } from "@/lib/utils/mappers";
import { isMockEnabled, mockDelay } from "@/lib/utils/mock";
import { cacheRombelId } from "@/lib/utils/rombelCache";

const asFailure = (result: ApiFailure): ApiFailure => result;

export type RombelInfo = {
  classGroup: ClassGroup;
  studentCount: ApiTeacherDashboard["student_count"];
};

// Info rombel aktif guru: GET /dashboard/teacher (id, nama, jumlah siswa),
// GET /rombels/{id} (grade_level, tahun ajaran) dan GET /academic-years/{id}
// (nama tahun ajaran). Dua yang terakhir bersifat pelengkap: bila gagal,
// field-nya diisi "-" supaya dashboard tetap tampil.
export async function getRombelInfoApi(): Promise<ApiResult<RombelInfo>> {
  if (isMockEnabled()) {
    await mockDelay(200);
    const mock = getMockClassroomDashboard();
    return {
      ok: true,
      status: 200,
      data: {
        classGroup: mock.class_group,
        studentCount: { active: mock.students.length, inactive: 0, graduated: 0 },
      },
    };
  }

  const dashboard = await apiRequest<ApiTeacherDashboard>("/dashboard/teacher");
  if (!dashboard.ok) return asFailure(dashboard);

  const rombelId = dashboard.data.rombel.id;
  cacheRombelId(rombelId);

  const rombel = await apiRequest<ApiRombel>(`/rombels/${rombelId}`);
  const academicYear = rombel.ok
    ? await apiRequest<ApiAcademicYear>(`/academic-years/${rombel.data.academic_year_id}`)
    : null;

  return {
    ok: true,
    status: 200,
    data: {
      classGroup: {
        id: rombelId,
        name: dashboard.data.rombel.name,
        education_level: rombel.ok ? gradeLevelToLabel(rombel.data.grade_level) : "-",
        academic_year: academicYear?.ok ? academicYear.data.name : "-",
        total_students: dashboard.data.student_count.active,
      },
      studentCount: dashboard.data.student_count,
    },
  };
}

// Semua siswa rombel aktif guru (backend otomatis membatasi sesuai rombel guru).
export async function getRombelStudentsApi(): Promise<ApiResult<ApiStudent[]>> {
  return fetchAllPages<ApiStudent>("/students");
}

// Id siswa yang SUDAH mengirim minimal satu kebiasaan pada tanggal tertentu.
// Dua endpoint: 6 kebiasaan umum + Bermasyarakat (bentuk response berbeda).
export async function getFilledStudentIdsApi(date: string): Promise<ApiResult<Set<number>>> {
  const [habits, bermasyarakat] = await Promise.all([
    fetchAllPages<ApiHabitEntry>("/habits/entries", { date }),
    fetchAllPages<ApiBermasyarakatEntry>("/bermasyarakat/entries", { date }),
  ]);

  if (!habits.ok) return asFailure(habits);
  if (!bermasyarakat.ok) return asFailure(bermasyarakat);

  const ids = new Set<number>();
  habits.data.forEach((entry) => ids.add(entry.student_id));
  bermasyarakat.data.forEach((entry) => ids.add(entry.student_id));
  return { ok: true, status: 200, data: ids };
}

// Data dashboard kelas guru: info rombel + siswa + level/peringkat + status
// pengisian hari ini, digabung dari beberapa endpoint.
export async function getClassroomDashboardApi(): Promise<ApiResult<ClassroomDashboardData>> {
  if (isMockEnabled()) {
    await mockDelay();
    return { ok: true, status: 200, data: getMockClassroomDashboard() };
  }

  const [info, students, ranking, filled] = await Promise.all([
    getRombelInfoApi(),
    getRombelStudentsApi(),
    fetchAllPages<ApiRankingEntry>("/rankings/rombel"),
    getFilledStudentIdsApi(todayInJakarta()),
  ]);

  if (!info.ok) return asFailure(info);
  if (!students.ok) return asFailure(students);
  if (!filled.ok) return asFailure(filled);

  // Ranking bersifat pelengkap (level & peringkat). Bila gagal, peringkat
  // dihitung lokal dari poin dan level default 1.
  const rankingByStudent = new Map<number, { level: number; rank: number }>();
  if (ranking.ok) {
    ranking.data.forEach((entry, index) => {
      rankingByStudent.set(entry.student_id, { level: entry.level, rank: index + 1 });
    });
  }

  const activeApiStudents = students.data.filter((student) => student.status === "active");
  const byPoints = [...activeApiStudents].sort(
    (a, b) => b.poin - a.poin || a.fullname.localeCompare(b.fullname)
  );
  const localRank = new Map(byPoints.map((student, index) => [student.id, index + 1]));

  const mapped: Student[] = activeApiStudents
    .map((student) =>
      mapApiStudent(student, {
        level: rankingByStudent.get(student.id)?.level ?? 1,
        class_rank: rankingByStudent.get(student.id)?.rank ?? localRank.get(student.id) ?? 0,
        today_status: filled.data.has(student.id) ? "filled" : "not_filled",
      })
    )
    .sort((a, b) => a.class_rank - b.class_rank || a.name.localeCompare(b.name));

  const filledCount = mapped.filter((student) => student.today_status === "filled").length;
  const totalPoints = mapped.reduce((sum, student) => sum + student.points, 0);

  return {
    ok: true,
    status: 200,
    data: {
      class_group: { ...info.data.classGroup, total_students: mapped.length },
      summary: {
        total_students: mapped.length,
        filled_today: filledCount,
        not_filled_today: mapped.length - filledCount,
        average_points: mapped.length ? Math.round(totalPoints / mapped.length) : 0,
      },
      students: mapped,
    },
  };
}
