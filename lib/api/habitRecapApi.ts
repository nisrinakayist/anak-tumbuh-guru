import { apiRequest, fetchAllPages } from "@/lib/api/client";
import { getRombelInfoApi, getRombelStudentsApi } from "@/lib/api/classroomApi";
import { HABIT_ORDER } from "@/lib/constants/habitRecapConfig";
import { HABIT_RECAP_MOCKS } from "@/lib/mocks/habitRecapMock";
import {
  ApiBermasyarakatEntry,
  ApiHabitEntry,
  ApiStudent,
} from "@/lib/types/apiModelType";
import { ApiResult } from "@/lib/types/apiType";
import {
  HabitId,
  HabitPeriodId,
  HabitRecapData,
  HabitStudentRecord,
  HabitSummaryMetric,
} from "@/lib/types/habitRecapType";
import { formatRecordDateLabel, todayInJakarta } from "@/lib/utils/date";
import { isMockEnabled, mockDelay } from "@/lib/utils/mock";

// Rekap kelas guru (hari ini), disusun di FE dari endpoint yang sudah ada:
//   GET /habits            katalog kebiasaan + indikator
//   GET /habits/entries?date=        6 kebiasaan umum (own active rombel)
//   GET /bermasyarakat/entries?date= kebiasaan Bermasyarakat
//   GET /students          daftar siswa rombel (untuk status "belum mengisi")
// Backend hanya menyaring per tanggal (tanpa filter siswa/rombel), jadi semua
// halaman dibaca (fetchAllPages, per_page 100). Rekap per periode (minggu)
// belum didukung: rekap asli selalu untuk hari ini.

// id kebiasaan di FE -> kode kebiasaan di backend.
const HABIT_CODE: Record<HabitId, string> = {
  "wake-up": "bangun_cepat",
  worship: "beribadah",
  study: "gemar_belajar",
  "healthy-eating": "makan_sehat_bergizi",
  exercise: "berolahraga",
  social: "bermasyarakat",
  "early-sleep": "tidur_cepat",
};

type ApiIndicator = { id: number; name: string; point: number };
type ApiHabitCatalog = { id: number; code: string; name: string; indicators?: ApiIndicator[] };

const unavailable = (): ApiResult<never> => ({
  ok: false,
  status: 404,
  error: {
    code: "not_available",
    message: "Rekap kebiasaan belum tersedia untuk kebiasaan ini.",
    details: [],
  },
});

type DaySnapshot = {
  date: string;
  catalog: ApiHabitCatalog[];
  students: ApiStudent[];
  habitEntries: ApiHabitEntry[];
  socialEntries: ApiBermasyarakatEntry[];
};

// Ambil semua data yang dibutuhkan untuk satu hari.
async function loadDay(): Promise<ApiResult<DaySnapshot>> {
  const date = todayInJakarta();
  const [catalog, students, habitEntries, socialEntries] = await Promise.all([
    fetchAllPages<ApiHabitCatalog>("/habits"),
    getRombelStudentsApi(),
    fetchAllPages<ApiHabitEntry>("/habits/entries", { date }),
    fetchAllPages<ApiBermasyarakatEntry>("/bermasyarakat/entries", { date }),
  ]);
  if (!catalog.ok) return catalog;
  if (!students.ok) return students;
  if (!habitEntries.ok) return habitEntries;
  if (!socialEntries.ok) return socialEntries;
  return {
    ok: true,
    status: 200,
    data: {
      date,
      catalog: catalog.data,
      students: students.data.filter((student) => student.status === "active"),
      habitEntries: habitEntries.data,
      socialEntries: socialEntries.data,
    },
  };
}

type Row = { primary: string; note: string | null; initiative: "mandiri" | "disuruh"; points: number };

// student_id -> isian kebiasaan tertentu pada hari itu.
function rowsForHabit(day: DaySnapshot, habit: ApiHabitCatalog): Map<number, Row> {
  const names = new Map((habit.indicators ?? []).map((indicator) => [indicator.id, indicator.name]));
  const rows = new Map<number, Row>();

  if (habit.code === "bermasyarakat") {
    day.socialEntries.forEach((entry) => {
      const chosen = entry.indicator_ids.map((id) => names.get(id)).filter((name): name is string => !!name);
      rows.set(entry.student_id, {
        primary: `${entry.indicator_ids.length} kegiatan`,
        note: chosen.join(", ") || null,
        initiative: entry.initiative,
        points: entry.poin_awarded,
      });
    });
    return rows;
  }

  day.habitEntries
    .filter((entry) => entry.habit_id === habit.id)
    .forEach((entry) => {
      rows.set(entry.student_id, {
        primary: names.get(entry.indicator_id) ?? "-",
        note: entry.note,
        initiative: entry.initiative,
        points: entry.poin_awarded,
      });
    });
  return rows;
}

const percent = (part: number, total: number) => (total ? Math.round((part / total) * 100) : 0);

function buildSummary(label: string, total: number, rows: Row[]): HabitSummaryMetric[] {
  const filled = rows.length;
  const mandiri = rows.filter((row) => row.initiative === "mandiri").length;
  const points = rows.reduce((sum, row) => sum + row.points, 0);
  const reportRate = percent(filled, total);
  const independence = percent(mandiri, filled);

  return [
    {
      key: "report_rate",
      label: "Tingkat Laporan",
      value: `${reportRate}%`,
      suffix: `(${filled} / ${total})`,
      iconKey: "shield",
      tone: "orange",
      badgeLabel: "Hari ini",
      badgeTone: "info",
      footer: `${filled} dari ${total} siswa aktif sudah mengisi`,
    },
    {
      key: "not_filled",
      label: "Belum Mengisi",
      value: String(Math.max(total - filled, 0)),
      suffix: "Anak",
      suffixAccent: true,
      iconKey: "clock",
      tone: "blue",
      badgeLabel: total - filled === 0 ? "Semua Lapor" : "Perlu Dipantau",
      badgeTone: total - filled === 0 ? "success" : "warning",
      footer: "Dibandingkan dengan daftar siswa aktif",
      footerIconKey: "check",
    },
    {
      key: "independence_rate",
      label: "Tingkat Kemandirian",
      value: `${independence}%`,
      suffix: `${mandiri} Anak`,
      suffixAccent: true,
      iconKey: "check",
      tone: "green",
      badgeLabel: independence >= 70 ? "Mandiri Tinggi" : "Perlu Dorongan",
      badgeTone: independence >= 70 ? "success" : "warning",
      footer: "Mengisi atas inisiatif sendiri",
      footerIconKey: "user",
    },
    {
      key: "total_points",
      label: `Poin ${label}`,
      value: String(points),
      suffix: "PTS",
      suffixAccent: true,
      iconKey: "award",
      tone: "purple",
      badgeLabel: "Poin Kelas",
      badgeTone: "purple",
      footer: "Total poin hari ini",
      footerIconKey: "plus",
    },
  ];
}

async function getTeacherName(): Promise<string> {
  const me = await apiRequest<{ name?: string }>("/auth/me");
  return me.ok ? (me.data.name ?? "-") : "-";
}

export async function getHabitRecapApi(
  habitId: HabitId,
  period: HabitPeriodId
): Promise<ApiResult<HabitRecapData>> {
  if (isMockEnabled()) {
    void period;
    await mockDelay();
    const data = HABIT_RECAP_MOCKS[habitId];
    return data ? { ok: true, status: 200, data } : unavailable();
  }

  const [day, info, teacherName] = await Promise.all([loadDay(), getRombelInfoApi(), getTeacherName()]);
  if (!day.ok) return day;
  if (!info.ok) return info;

  const habit = day.data.catalog.find((item) => item.code === HABIT_CODE[habitId]);
  if (!habit) return unavailable();

  const rows = rowsForHabit(day.data, habit);
  const best = [...(habit.indicators ?? [])].sort((a, b) => b.point - a.point)[0];

  const students: HabitStudentRecord[] = day.data.students
    .map((student): HabitStudentRecord => {
      const row = rows.get(student.id);
      if (!row) {
        return {
          id: student.id,
          nis: student.nisn,
          name: student.fullname,
          primary_value: null,
          primary_note: null,
          method_label: null,
          method_tone: null,
          report_status: "not_filled",
          points: 0,
        };
      }
      const independent = row.initiative === "mandiri";
      return {
        id: student.id,
        nis: student.nisn,
        name: student.fullname,
        primary_value: row.primary,
        primary_note: row.note,
        method_label: independent ? "Mandiri / Sadar Sendiri" : "Disuruh / Diingatkan",
        method_tone: independent ? "success" : "warning",
        report_status: "confirmed",
        points: row.points,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return {
    ok: true,
    status: 200,
    data: {
      class_group: {
        education_level: info.data.classGroup.education_level,
        name: info.data.classGroup.name,
        teacher_name: teacherName,
        total_students: students.length,
        target_value: best?.name ?? "-",
      },
      record_date_label: formatRecordDateLabel(),
      summary: buildSummary(
        habit.name,
        students.length,
        day.data.students.flatMap((student) => rows.get(student.id) ?? [])
      ),
      students,
    },
  };
}

export type HabitOverview = {
  classLabel: string;
  averageRate: number; // persen, rata-rata tingkat laporan 7 kebiasaan
  totalEntries: number;
  rates: Record<HabitId, number>;
};

// Ringkasan 7 kebiasaan hari ini.
export async function getHabitOverviewApi(): Promise<ApiResult<HabitOverview>> {
  if (isMockEnabled()) {
    await mockDelay(200);
    const rates = Object.fromEntries(
      HABIT_ORDER.map((id) => {
        const report = HABIT_RECAP_MOCKS[id]?.summary.find((item) => item.key === "report_rate");
        return [id, Number.parseInt(report?.value ?? "0", 10)];
      })
    ) as Record<HabitId, number>;

    return {
      ok: true,
      status: 200,
      data: { classLabel: "Kelas 1 • Rombel 1-A", averageRate: 71, totalEntries: 140, rates },
    };
  }

  const [day, info] = await Promise.all([loadDay(), getRombelInfoApi()]);
  if (!day.ok) return day;
  if (!info.ok) return info;

  const total = day.data.students.length;
  const activeIds = new Set(day.data.students.map((student) => student.id));
  let totalEntries = 0;

  const rates = Object.fromEntries(
    HABIT_ORDER.map((id) => {
      const habit = day.data.catalog.find((item) => item.code === HABIT_CODE[id]);
      const rows = habit ? rowsForHabit(day.data, habit) : new Map<number, Row>();
      const filled = [...rows.keys()].filter((studentId) => activeIds.has(studentId)).length;
      totalEntries += filled;
      return [id, percent(filled, total)];
    })
  ) as Record<HabitId, number>;

  const averageRate = Math.round(HABIT_ORDER.reduce((sum, id) => sum + rates[id], 0) / HABIT_ORDER.length);

  return {
    ok: true,
    status: 200,
    data: {
      classLabel: `${info.data.classGroup.education_level} • Rombel ${info.data.classGroup.name}`,
      averageRate,
      totalEntries,
      rates,
    },
  };
}
