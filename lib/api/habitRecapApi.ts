import { apiRequest, fetchAllPages } from "@/lib/api/client";
import { getMeApi } from "@/lib/api/authApi";
import { getRombelInfoApi, getRombelStudentsApi } from "@/lib/api/classroomApi";
import { HABIT_CODE_BY_ID } from "@/lib/constants/habitCodes";
import { HABIT_ORDER } from "@/lib/constants/habitRecapConfig";
import { HABIT_RECAP_MOCKS } from "@/lib/mocks/habitRecapMock";
import {
  ApiBermasyarakatEntry,
  ApiHabit,
  ApiHabitEntry,
  ApiIndicator,
  ApiInitiative,
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

// Satu entri kebiasaan dari backend, sudah diseragamkan untuk 7 kebiasaan.
type NormalizedEntry = {
  studentId: number;
  indicatorIds: number[];
  initiative: ApiInitiative;
  points: number;
};

const notFound = (message: string): ApiResult<never> => ({
  ok: false,
  status: 404,
  error: { code: "not_found", message, details: [] },
});

const INITIATIVE_LABEL: Record<ApiInitiative, { label: string; tone: "success" | "warning" }> = {
  mandiri: { label: "Mandiri / Sadar Sendiri", tone: "success" },
  disuruh: { label: "Diingatkan / Disuruh", tone: "warning" },
};

const percent = (part: number, total: number) => (total ? Math.round((part / total) * 100) : 0);

// Entri hari ini untuk SEMUA kebiasaan (6 umum + Bermasyarakat) dalam satu bentuk.
async function fetchEntriesByHabit(
  date: string
): Promise<ApiResult<Map<number, NormalizedEntry[]>>> {
  const [general, social] = await Promise.all([
    fetchAllPages<ApiHabitEntry>("/habits/entries", { date }),
    fetchAllPages<ApiBermasyarakatEntry>("/bermasyarakat/entries", { date }),
  ]);
  if (!general.ok) return general;
  if (!social.ok) return social;

  const byHabit = new Map<number, NormalizedEntry[]>();
  const push = (habitId: number, entry: NormalizedEntry) => {
    byHabit.set(habitId, [...(byHabit.get(habitId) ?? []), entry]);
  };

  general.data.forEach((entry) =>
    push(entry.habit_id, {
      studentId: entry.student_id,
      indicatorIds: [entry.indicator_id],
      initiative: entry.initiative,
      points: entry.poin_awarded,
    })
  );
  social.data.forEach((entry) =>
    push(entry.habit_id, {
      studentId: entry.student_id,
      indicatorIds: entry.indicator_ids,
      initiative: entry.initiative,
      points: entry.poin_awarded,
    })
  );

  return { ok: true, status: 200, data: byHabit };
}

const buildSummary = (
  filled: number,
  total: number,
  independent: number,
  totalPoints: number
): HabitSummaryMetric[] => {
  const reportRate = percent(filled, total);
  const independence = percent(independent, filled);

  return [
    {
      key: "report_rate",
      label: "Tingkat Laporan",
      value: `${reportRate}%`,
      suffix: `(${filled} / ${total})`,
      iconKey: "shield",
      tone: "orange",
      badgeLabel: reportRate >= 80 ? "Baik" : reportRate >= 50 ? "Cukup" : "Perlu Perhatian",
      badgeTone: reportRate >= 80 ? "success" : reportRate >= 50 ? "warning" : "danger",
      footer: `${filled} dari ${total} siswa aktif sudah mengisi hari ini`,
    },
    {
      key: "independence_rate",
      label: "Tingkat Kemandirian",
      value: `${independence}%`,
      suffix: `${independent} Anak`,
      suffixAccent: true,
      iconKey: "check",
      tone: "green",
      badgeLabel: independence >= 70 ? "Mandiri Tinggi" : "Perlu Pendampingan",
      badgeTone: independence >= 70 ? "success" : "warning",
      footer: "Melakukan tanpa disuruh",
      footerIconKey: "user",
    },
    {
      key: "total_points",
      label: "Total Poin Hari Ini",
      value: String(totalPoints),
      suffix: "PTS",
      suffixAccent: true,
      iconKey: "award",
      tone: "purple",
      badgeLabel: "Poin Kelas",
      badgeTone: "purple",
      footer: "Jumlah poin kebiasaan ini hari ini",
      footerIconKey: "plus",
    },
    {
      key: "average_points",
      label: "Rata-rata Poin",
      value: filled ? String(Math.round(totalPoints / filled)) : "0",
      suffix: "PTS / siswa",
      iconKey: "star",
      tone: "blue",
      badgeLabel: "Per Siswa Terlapor",
      badgeTone: "info",
      footer: "Rata-rata dari siswa yang sudah mengisi",
    },
  ];
};

// Rekap harian satu kebiasaan, dari GET /habits (indikator), GET /students dan
// entri hari ini. Backend belum punya endpoint rekap/periode mingguan, jadi
// rekap ini HANYA untuk hari ini dan `period` diabaikan.
export async function getHabitRecapApi(
  habitId: HabitId,
  period: HabitPeriodId
): Promise<ApiResult<HabitRecapData>> {
  if (isMockEnabled()) {
    void period;
    await mockDelay();

    const data = HABIT_RECAP_MOCKS[habitId];
    if (!data) return notFound("Rekap kebiasaan ini belum tersedia. Fitur akan segera hadir.");
    return { ok: true, status: 200, data };
  }

  const date = todayInJakarta();

  const [habitsRes, students, info, entries, me] = await Promise.all([
    apiRequest<ApiHabit[]>("/habits"),
    getRombelStudentsApi(),
    getRombelInfoApi(),
    fetchEntriesByHabit(date),
    getMeApi(),
  ]);

  if (!habitsRes.ok) return habitsRes;
  if (!students.ok) return students;
  if (!info.ok) return info;
  if (!entries.ok) return entries;

  const habit = habitsRes.data.find((item) => item.code === HABIT_CODE_BY_ID[habitId]);
  if (!habit) return notFound("Kebiasaan ini belum tersedia di server.");

  const indicators = new Map<number, ApiIndicator>(
    (habit.indicators ?? []).map((indicator) => [indicator.id, indicator])
  );
  const habitEntries = entries.data.get(habit.id) ?? [];
  const entryByStudent = new Map(habitEntries.map((entry) => [entry.studentId, entry]));

  const activeStudents = students.data
    .filter((student) => student.status === "active")
    .sort((a, b) => a.fullname.localeCompare(b.fullname));

  const records: HabitStudentRecord[] = activeStudents.map((student) => {
    const entry = entryByStudent.get(student.id);
    if (!entry) {
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

    const names = entry.indicatorIds
      .map((id) => indicators.get(id)?.name)
      .filter((name): name is string => Boolean(name));

    return {
      id: student.id,
      nis: student.nisn,
      name: student.fullname,
      primary_value: names.length ? names.join(", ") : "-",
      primary_note: null,
      method_label: INITIATIVE_LABEL[entry.initiative].label,
      method_tone: INITIATIVE_LABEL[entry.initiative].tone,
      report_status: "confirmed",
      points: entry.points,
    };
  });

  const filled = records.filter((record) => record.report_status === "confirmed");
  const independent = filled.filter((record) => record.method_tone === "success").length;
  const totalPoints = filled.reduce((sum, record) => sum + record.points, 0);

  // "Target" = indikator berpoin tertinggi (backend tidak punya target terpisah).
  const best = [...(habit.indicators ?? [])].sort((a, b) => (b.point ?? 0) - (a.point ?? 0))[0];

  return {
    ok: true,
    status: 200,
    data: {
      class_group: {
        education_level: info.data.classGroup.education_level,
        name: info.data.classGroup.name,
        teacher_name: me.ok ? (me.data.name ?? "-") : "-",
        total_students: records.length,
        target_value: best?.name ?? "-",
      },
      record_date_label: formatRecordDateLabel(),
      summary: buildSummary(filled.length, records.length, independent, totalPoints),
      students: records,
    },
  };
}

export type HabitOverview = {
  classLabel: string;
  averageRate: number; // persen, rata-rata tingkat laporan 7 kebiasaan
  totalEntries: number;
  rates: Record<HabitId, number>;
};

// Ringkasan 7 kebiasaan hari ini: persentase siswa aktif yang sudah mengisi
// tiap kebiasaan.
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

  const [habitsRes, students, info, entries] = await Promise.all([
    apiRequest<ApiHabit[]>("/habits"),
    getRombelStudentsApi(),
    getRombelInfoApi(),
    fetchEntriesByHabit(todayInJakarta()),
  ]);

  if (!habitsRes.ok) return habitsRes;
  if (!students.ok) return students;
  if (!info.ok) return info;
  if (!entries.ok) return entries;

  const activeIds = new Set(
    students.data.filter((student) => student.status === "active").map((student) => student.id)
  );

  const rates = {} as Record<HabitId, number>;
  let totalEntries = 0;

  HABIT_ORDER.forEach((habitId) => {
    const habit = habitsRes.data.find((item) => item.code === HABIT_CODE_BY_ID[habitId]);
    const list = (habit ? entries.data.get(habit.id) : undefined) ?? [];
    const reporters = new Set(list.filter((e) => activeIds.has(e.studentId)).map((e) => e.studentId));
    totalEntries += reporters.size;
    rates[habitId] = percent(reporters.size, activeIds.size);
  });

  const averageRate = Math.round(
    HABIT_ORDER.reduce((sum, habitId) => sum + rates[habitId], 0) / HABIT_ORDER.length
  );

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
