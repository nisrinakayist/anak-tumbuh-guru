import { STUDENT_NAME_LIST } from "@/lib/mocks/studentNameList";
import { HabitId, HabitRecapData, HabitStudentRecord } from "@/lib/types/habitRecapType";

const withIdentity = (index: number) => ({
  id: index + 1,
  name: STUDENT_NAME_LIST[index],
  nis: `202501${String(index + 1).padStart(3, "0")}`,
});

// ---------------- Kebiasaan 1: Bangun Pagi ----------------
const WAKE_UP_NOT_FILLED = [3, 13, 24];
const WAKE_UP_PARENT_WOKEN = [2, 8, 17, 27];
const TARGET_MINUTES = 5 * 60;
const EARLIEST_MINUTES = 4 * 60 + 45;

const formatMinutes = (totalMinutes: number) => {
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const minutes = String(totalMinutes % 60).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const wakeUpStudents: HabitStudentRecord[] = STUDENT_NAME_LIST.map((_, index) => {
  const identity = withIdentity(index);

  if (WAKE_UP_NOT_FILLED.includes(index)) {
    return { ...identity, primary_value: null, primary_note: null, method_label: null, method_tone: null, report_status: "not_filled", points: 0 };
  }

  const isParentWoken = WAKE_UP_PARENT_WOKEN.includes(index);
  const minutes = index === 1 ? TARGET_MINUTES : index === 2 ? TARGET_MINUTES + 15 : EARLIEST_MINUTES + ((index * 7) % 35);
  const time = formatMinutes(minutes);

  return {
    ...identity,
    primary_value: `${time} WIB`,
    primary_note: minutes < TARGET_MINUTES ? "Lebih Awal" : minutes === TARGET_MINUTES ? "Tepat Waktu" : null,
    method_label: isParentWoken ? "Dibangunkan Orang Tua" : "Sadar Sendiri / Mandiri",
    method_tone: isParentWoken ? "warning" : "success",
    report_status: "confirmed",
    points: isParentWoken ? 15 : 20,
  };
});

const wakeUpData: HabitRecapData = {
  class_group: {
    education_level: "Kelas 1",
    name: "1-A",
    teacher_name: "Ibu Nurul Hidayati",
    total_students: wakeUpStudents.length,
    target_value: "Pukul 05.00 WIB",
  },
  record_date_label: "Kamis, 13 Nov 2025",
  summary: [
    {
      key: "report_rate",
      label: "Tingkat Laporan",
      value: "90%",
      suffix: "(29 / 32)",
      iconKey: "shield",
      tone: "orange",
      badgeLabel: "+10%",
      badgeTone: "success",
      footer: "9 dari 10 siswa aktif lapor pagi",
    },
    {
      key: "average_wake_time",
      label: "Rata-rata Jam Bangun",
      value: "05:12",
      suffix: "WIB",
      iconKey: "clock",
      tone: "blue",
      badgeLabel: "Tepat Waktu",
      badgeTone: "info",
      footer: "Sesuai rentang target waktu",
      footerIconKey: "check",
    },
    {
      key: "independence_rate",
      label: "Tingkat Kemandirian",
      value: "78%",
      suffix: "25 Anak",
      suffixAccent: true,
      iconKey: "check",
      tone: "green",
      badgeLabel: "Mandiri Tinggi",
      badgeTone: "success",
      footer: "Bangun sendiri tanpa dibangunkan",
      footerIconKey: "user",
    },
    {
      key: "total_points",
      label: "Poin Bangun Pagi",
      value: "840",
      suffix: "PTS",
      suffixAccent: true,
      iconKey: "award",
      tone: "purple",
      badgeLabel: "Poin Kelas",
      badgeTone: "purple",
      footer: "+120 poin dari pekan lalu",
      footerIconKey: "plus",
    },
  ],
  students: wakeUpStudents,
};

// ---------------- Kebiasaan 2: Beribadah ----------------
const WORSHIP_NOT_FILLED = [5, 14, 21, 29];
const WORSHIP_PARTIAL = [1, 9, 16, 23]; // sholat belum lengkap 5 waktu, tetap lapor

const worshipStudents: HabitStudentRecord[] = STUDENT_NAME_LIST.map((_, index) => {
  const identity = withIdentity(index);

  if (WORSHIP_NOT_FILLED.includes(index)) {
    return { ...identity, primary_value: null, primary_note: null, method_label: null, method_tone: null, report_status: "not_filled", points: 0 };
  }

  const isPartial = WORSHIP_PARTIAL.includes(index);
  const completed = isPartial ? 3 + (index % 2) : 5;

  return {
    ...identity,
    primary_value: `${completed} dari 5 Waktu`,
    primary_note: completed === 5 ? "Lengkap" : null,
    method_label: isPartial ? "Diingatkan Orang Tua" : "Mandiri Tanpa Diingatkan",
    method_tone: isPartial ? "warning" : "success",
    report_status: "confirmed",
    points: completed === 5 ? 20 : 10,
  };
});

const worshipData: HabitRecapData = {
  class_group: {
    education_level: "Kelas 1",
    name: "1-A",
    teacher_name: "Ibu Nurul Hidayati",
    total_students: worshipStudents.length,
    target_value: "Sholat 5 Waktu",
  },
  record_date_label: "Kamis, 13 Nov 2025",
  summary: [
    {
      key: "report_rate",
      label: "Tingkat Laporan",
      value: "88%",
      suffix: "(28 / 32)",
      iconKey: "shield",
      tone: "orange",
      badgeLabel: "+6%",
      badgeTone: "success",
      footer: "28 siswa sudah lapor ibadah hari ini",
    },
    {
      key: "attendance_rate",
      label: "Tingkat Kehadiran Ibadah",
      value: "85%",
      suffix: "(24 Anak)",
      iconKey: "calendar",
      tone: "blue",
      badgeLabel: "Aktif Beribadah",
      badgeTone: "info",
      footer: "Rutin melapor 5 hari terakhir",
      footerIconKey: "check",
    },
    {
      key: "completion_rate",
      label: "Kelengkapan Sholat 5 Waktu",
      value: "75%",
      suffix: "21 Anak",
      suffixAccent: true,
      iconKey: "star",
      tone: "green",
      badgeLabel: "Konsisten",
      badgeTone: "success",
      footer: "Sholat 5 waktu tanpa terlewat",
      footerIconKey: "check",
    },
    {
      key: "total_points",
      label: "Poin Beribadah",
      value: "610",
      suffix: "PTS",
      suffixAccent: true,
      iconKey: "award",
      tone: "purple",
      badgeLabel: "Poin Kelas",
      badgeTone: "purple",
      footer: "+90 poin dari pekan lalu",
      footerIconKey: "plus",
    },
  ],
  students: worshipStudents,
};

// ---------------- Kebiasaan 3: Gemar Belajar ----------------
const STUDY_NOT_FILLED = [4, 15, 26];
const STUDY_BELOW_TARGET = [0, 11, 20, 28];
const STUDY_ACCOMPANIED = [3, 10, 19, 25, 30];

const studyStudents: HabitStudentRecord[] = STUDENT_NAME_LIST.map((_, index) => {
  const identity = withIdentity(index);

  if (STUDY_NOT_FILLED.includes(index)) {
    return { ...identity, primary_value: null, primary_note: null, method_label: null, method_tone: null, report_status: "not_filled", points: 0 };
  }

  const isBelowTarget = STUDY_BELOW_TARGET.includes(index);
  const isAccompanied = STUDY_ACCOMPANIED.includes(index);
  const duration = isBelowTarget ? 15 + ((index * 3) % 10) : 30 + ((index * 4) % 30);

  return {
    ...identity,
    primary_value: `${duration} Menit`,
    primary_note: isBelowTarget ? "Di Bawah Target" : "Tercapai",
    method_label: isAccompanied ? "Ditemani Orang Tua" : "Belajar Mandiri",
    method_tone: isAccompanied ? "warning" : "success",
    report_status: "confirmed",
    points: isBelowTarget ? 10 : 20,
  };
});

const studyData: HabitRecapData = {
  class_group: {
    education_level: "Kelas 1",
    name: "1-A",
    teacher_name: "Ibu Nurul Hidayati",
    total_students: studyStudents.length,
    target_value: "Minimal 30 Menit/Hari",
  },
  record_date_label: "Kamis, 13 Nov 2025",
  summary: [
    {
      key: "report_rate",
      label: "Tingkat Laporan",
      value: "91%",
      suffix: "(29 / 32)",
      iconKey: "shield",
      tone: "orange",
      badgeLabel: "+5%",
      badgeTone: "success",
      footer: "29 siswa sudah lapor belajar hari ini",
    },
    {
      key: "average_duration",
      label: "Rata-rata Durasi Belajar",
      value: "38",
      suffix: "Menit",
      iconKey: "book",
      tone: "blue",
      badgeLabel: "Sesuai Target",
      badgeTone: "info",
      footer: "Melebihi target minimal 30 menit",
      footerIconKey: "check",
    },
    {
      key: "target_rate",
      label: "Pencapaian Target Belajar",
      value: "81%",
      suffix: "26 Anak",
      suffixAccent: true,
      iconKey: "check",
      tone: "green",
      badgeLabel: "Konsisten",
      badgeTone: "success",
      footer: "Belajar minimal 30 menit tiap hari",
      footerIconKey: "check",
    },
    {
      key: "total_points",
      label: "Poin Gemar Belajar",
      value: "580",
      suffix: "PTS",
      suffixAccent: true,
      iconKey: "award",
      tone: "purple",
      badgeLabel: "Poin Kelas",
      badgeTone: "purple",
      footer: "+70 poin dari pekan lalu",
      footerIconKey: "plus",
    },
  ],
  students: studyStudents,
};

// ---------------- Kebiasaan 4: Makan Sehat ----------------
const EATING_NOT_FILLED = [6, 17, 27];
const EATING_PARTIAL = [2, 9, 18, 24];

const eatingStudents: HabitStudentRecord[] = STUDENT_NAME_LIST.map((_, index) => {
  const identity = withIdentity(index);

  if (EATING_NOT_FILLED.includes(index)) {
    return { ...identity, primary_value: null, primary_note: null, method_label: null, method_tone: null, report_status: "not_filled", points: 0 };
  }

  const isPartial = EATING_PARTIAL.includes(index);
  const menuCount = isPartial ? 1 + (index % 2) : 3;

  return {
    ...identity,
    primary_value: `${menuCount} dari 3 Menu Sehat`,
    primary_note: menuCount === 3 ? "Menu Lengkap" : null,
    method_label: isPartial ? "Menu Kantin" : "Menu Buatan Rumah",
    method_tone: isPartial ? "warning" : "success",
    report_status: "confirmed",
    points: menuCount === 3 ? 20 : 10,
  };
});

const eatingData: HabitRecapData = {
  class_group: {
    education_level: "Kelas 1",
    name: "1-A",
    teacher_name: "Ibu Nurul Hidayati",
    total_students: eatingStudents.length,
    target_value: "3x Menu Sehat/Hari",
  },
  record_date_label: "Kamis, 13 Nov 2025",
  summary: [
    {
      key: "report_rate",
      label: "Tingkat Laporan",
      value: "87%",
      suffix: "(28 / 32)",
      iconKey: "shield",
      tone: "orange",
      badgeLabel: "+4%",
      badgeTone: "success",
      footer: "28 siswa sudah lapor menu hari ini",
    },
    {
      key: "nutrition_rate",
      label: "Konsumsi Sayur & Buah",
      value: "82%",
      suffix: "(26 Anak)",
      iconKey: "heart",
      tone: "blue",
      badgeLabel: "Aktif",
      badgeTone: "info",
      footer: "Rutin konsumsi sayur & buah harian",
      footerIconKey: "check",
    },
    {
      key: "completion_rate",
      label: "Kelengkapan Menu Sehat",
      value: "72%",
      suffix: "23 Anak",
      suffixAccent: true,
      iconKey: "check",
      tone: "green",
      badgeLabel: "Konsisten",
      badgeTone: "success",
      footer: "3 menu sehat tanpa terlewat",
      footerIconKey: "check",
    },
    {
      key: "total_points",
      label: "Poin Makan Sehat",
      value: "560",
      suffix: "PTS",
      suffixAccent: true,
      iconKey: "award",
      tone: "purple",
      badgeLabel: "Poin Kelas",
      badgeTone: "purple",
      footer: "+60 poin dari pekan lalu",
      footerIconKey: "plus",
    },
  ],
  students: eatingStudents,
};

// ---------------- Kebiasaan 5: Olahraga ----------------
const EXERCISE_NOT_FILLED = [7, 16, 29];
const EXERCISE_BELOW_TARGET = [1, 12, 22, 30];
const EXERCISE_ACCOMPANIED = [5, 13, 23];

const exerciseStudents: HabitStudentRecord[] = STUDENT_NAME_LIST.map((_, index) => {
  const identity = withIdentity(index);

  if (EXERCISE_NOT_FILLED.includes(index)) {
    return { ...identity, primary_value: null, primary_note: null, method_label: null, method_tone: null, report_status: "not_filled", points: 0 };
  }

  const isBelowTarget = EXERCISE_BELOW_TARGET.includes(index);
  const isAccompanied = EXERCISE_ACCOMPANIED.includes(index);
  const duration = isBelowTarget ? 5 + (index % 8) : 15 + ((index * 3) % 20);

  return {
    ...identity,
    primary_value: `${duration} Menit`,
    primary_note: isBelowTarget ? "Di Bawah Target" : "Tercapai",
    method_label: isAccompanied ? "Bersama Keluarga" : "Olahraga Mandiri",
    method_tone: isAccompanied ? "warning" : "success",
    report_status: "confirmed",
    points: isBelowTarget ? 10 : 20,
  };
});

const exerciseData: HabitRecapData = {
  class_group: {
    education_level: "Kelas 1",
    name: "1-A",
    teacher_name: "Ibu Nurul Hidayati",
    total_students: exerciseStudents.length,
    target_value: "Minimal 15 Menit/Hari",
  },
  record_date_label: "Kamis, 13 Nov 2025",
  summary: [
    {
      key: "report_rate",
      label: "Tingkat Laporan",
      value: "85%",
      suffix: "(27 / 32)",
      iconKey: "shield",
      tone: "orange",
      badgeLabel: "+3%",
      badgeTone: "success",
      footer: "27 siswa sudah lapor olahraga hari ini",
    },
    {
      key: "average_duration",
      label: "Rata-rata Durasi Olahraga",
      value: "22",
      suffix: "Menit",
      iconKey: "clock",
      tone: "blue",
      badgeLabel: "Sesuai Target",
      badgeTone: "info",
      footer: "Melebihi target minimal 15 menit",
      footerIconKey: "check",
    },
    {
      key: "consistency_rate",
      label: "Konsistensi Berolahraga",
      value: "76%",
      suffix: "24 Anak",
      suffixAccent: true,
      iconKey: "check",
      tone: "green",
      badgeLabel: "Aktif Bergerak",
      badgeTone: "success",
      footer: "Rutin berolahraga 5 hari terakhir",
      footerIconKey: "check",
    },
    {
      key: "total_points",
      label: "Poin Olahraga",
      value: "520",
      suffix: "PTS",
      suffixAccent: true,
      iconKey: "award",
      tone: "purple",
      badgeLabel: "Poin Kelas",
      badgeTone: "purple",
      footer: "+55 poin dari pekan lalu",
      footerIconKey: "plus",
    },
  ],
  students: exerciseStudents,
};

// ---------------- Kebiasaan 6: Bermasyarakat ----------------
const SOCIAL_NOT_FILLED = [8, 19, 31];
const SOCIAL_INVITED = [4, 14, 21, 27];

const socialStudents: HabitStudentRecord[] = STUDENT_NAME_LIST.map((_, index) => {
  const identity = withIdentity(index);

  if (SOCIAL_NOT_FILLED.includes(index)) {
    return { ...identity, primary_value: null, primary_note: null, method_label: null, method_tone: null, report_status: "not_filled", points: 0 };
  }

  const isInvited = SOCIAL_INVITED.includes(index);

  return {
    ...identity,
    primary_value: "1 Kegiatan Sosial",
    primary_note: isInvited ? null : "Aktif Berpartisipasi",
    method_label: isInvited ? "Diajak Orang Tua" : "Inisiatif Sendiri",
    method_tone: isInvited ? "warning" : "success",
    report_status: "confirmed",
    points: isInvited ? 12 : 20,
  };
});

const socialData: HabitRecapData = {
  class_group: {
    education_level: "Kelas 1",
    name: "1-A",
    teacher_name: "Ibu Nurul Hidayati",
    total_students: socialStudents.length,
    target_value: "1 Kegiatan Sosial/Minggu",
  },
  record_date_label: "Kamis, 13 Nov 2025",
  summary: [
    {
      key: "report_rate",
      label: "Tingkat Laporan",
      value: "84%",
      suffix: "(27 / 32)",
      iconKey: "shield",
      tone: "orange",
      badgeLabel: "+2%",
      badgeTone: "success",
      footer: "27 siswa sudah lapor kegiatan pekan ini",
    },
    {
      key: "participation_rate",
      label: "Tingkat Partisipasi Kegiatan",
      value: "84%",
      suffix: "(27 Anak)",
      iconKey: "calendar",
      tone: "blue",
      badgeLabel: "Aktif",
      badgeTone: "info",
      footer: "Ikut kegiatan sosial pekan ini",
      footerIconKey: "check",
    },
    {
      key: "independence_rate",
      label: "Kemandirian Bersosialisasi",
      value: "68%",
      suffix: "18 Anak",
      suffixAccent: true,
      iconKey: "user",
      tone: "green",
      badgeLabel: "Inisiatif Tinggi",
      badgeTone: "success",
      footer: "Ikut kegiatan atas inisiatif sendiri",
      footerIconKey: "user",
    },
    {
      key: "total_points",
      label: "Poin Bermasyarakat",
      value: "470",
      suffix: "PTS",
      suffixAccent: true,
      iconKey: "award",
      tone: "purple",
      badgeLabel: "Poin Kelas",
      badgeTone: "purple",
      footer: "+50 poin dari pekan lalu",
      footerIconKey: "plus",
    },
  ],
  students: socialStudents,
};

// ---------------- Kebiasaan 7: Tidur Cepat ----------------
const SLEEP_NOT_FILLED = [9, 20, 30];
const SLEEP_LATE = [3, 12, 22, 29];
const SLEEP_ACCOMPANIED = [1, 10, 18, 26];
const TARGET_SLEEP_MINUTES = 21 * 60; // 21:00
const EARLIEST_SLEEP_MINUTES = 20 * 60 + 30; // 20:30

const sleepStudents: HabitStudentRecord[] = STUDENT_NAME_LIST.map((_, index) => {
  const identity = withIdentity(index);

  if (SLEEP_NOT_FILLED.includes(index)) {
    return { ...identity, primary_value: null, primary_note: null, method_label: null, method_tone: null, report_status: "not_filled", points: 0 };
  }

  const isLate = SLEEP_LATE.includes(index);
  const isAccompanied = SLEEP_ACCOMPANIED.includes(index);
  const minutes = isLate
    ? TARGET_SLEEP_MINUTES + 15 + ((index * 5) % 30)
    : EARLIEST_SLEEP_MINUTES + ((index * 6) % 25);

  return {
    ...identity,
    primary_value: `${formatMinutes(minutes)} WIB`,
    primary_note: minutes < TARGET_SLEEP_MINUTES ? "Lebih Awal" : minutes === TARGET_SLEEP_MINUTES ? "Tepat Waktu" : "Lewat Target",
    method_label: isAccompanied ? "Ditemani Orang Tua" : "Tidur Sendiri",
    method_tone: isAccompanied ? "warning" : "success",
    report_status: "confirmed",
    points: isAccompanied ? 15 : 20,
  };
});

const sleepData: HabitRecapData = {
  class_group: {
    education_level: "Kelas 1",
    name: "1-A",
    teacher_name: "Ibu Nurul Hidayati",
    total_students: sleepStudents.length,
    target_value: "Pukul 21.00 WIB",
  },
  record_date_label: "Kamis, 13 Nov 2025",
  summary: [
    {
      key: "report_rate",
      label: "Tingkat Laporan",
      value: "89%",
      suffix: "(28 / 32)",
      iconKey: "shield",
      tone: "orange",
      badgeLabel: "+7%",
      badgeTone: "success",
      footer: "28 siswa sudah lapor tidur malam ini",
    },
    {
      key: "average_sleep_time",
      label: "Rata-rata Jam Tidur",
      value: "20:45",
      suffix: "WIB",
      iconKey: "clock",
      tone: "blue",
      badgeLabel: "Tepat Waktu",
      badgeTone: "info",
      footer: "Sesuai rentang target waktu",
      footerIconKey: "check",
    },
    {
      key: "independence_rate",
      label: "Tingkat Kemandirian Tidur",
      value: "73%",
      suffix: "23 Anak",
      suffixAccent: true,
      iconKey: "check",
      tone: "green",
      badgeLabel: "Mandiri Tinggi",
      badgeTone: "success",
      footer: "Tidur sendiri tanpa ditemani",
      footerIconKey: "user",
    },
    {
      key: "total_points",
      label: "Poin Tidur Cepat",
      value: "600",
      suffix: "PTS",
      suffixAccent: true,
      iconKey: "award",
      tone: "purple",
      badgeLabel: "Poin Kelas",
      badgeTone: "purple",
      footer: "+65 poin dari pekan lalu",
      footerIconKey: "plus",
    },
  ],
  students: sleepStudents,
};

// Semua 7 kebiasaan sudah punya data dummy di sini.
export const HABIT_RECAP_MOCKS: Partial<Record<HabitId, HabitRecapData>> = {
  "wake-up": wakeUpData,
  worship: worshipData,
  study: studyData,
  "healthy-eating": eatingData,
  exercise: exerciseData,
  social: socialData,
  "early-sleep": sleepData,
};
