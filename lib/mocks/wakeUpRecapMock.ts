import { WakeUpRecapResponse, WakeUpStudentRecord } from "@/lib/types/wakeUpRecapType";

const mockStudentNames = [
  "Ahmad Faiz Ramadhan",
  "Alya Zahra Kirana",
  "Bilal Atharrtariqi",
  "Daffa Alfarizi",
  "Bunga Citra Lestari",
  "Chandra Wijaya",
  "Dewi Anggraini",
  "Erlangga Putra",
  "Fitria Rahmawati",
  "Galih Prasetyo",
  "Hana Salsabila",
  "Indra Kusuma",
  "Jasmine Aulia",
  "Kevin Maulana",
  "Laila Nurfadilah",
  "Muhammad Rizky",
  "Nadia Safitri",
  "Omar Abdillah",
  "Putri Maharani",
  "Qori Ramadhani",
  "Rafi Hidayat",
  "Salsabila Putri",
  "Taufik Hidayat",
  "Umar Faruq",
  "Vina Melati",
  "Wahyu Setiawan",
  "Xena Ayunda",
  "Yusuf Maulana",
  "Zahra Amelia",
  "Fikri Alamsyah",
  "Gita Puspita",
  "Hafiz Pratama",
];

// Index (0-based) siswa yang belum mengisi & yang dibangunkan orang tua.
const NOT_FILLED_INDEXES = [3, 13, 24];
const PARENT_WAKE_INDEXES = [2, 8, 17, 27];

const TARGET_MINUTES = 5 * 60; // 05:00
const EARLIEST_MINUTES = 4 * 60 + 45; // 04:45

const formatMinutes = (totalMinutes: number) => {
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const minutes = String(totalMinutes % 60).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const mockStudents: WakeUpStudentRecord[] = mockStudentNames.map((name, index) => {
  const id = index + 1;
  const identity = { id, name, nis: `202501${String(id).padStart(3, "0")}` };

  if (NOT_FILLED_INDEXES.includes(index)) {
    return {
      ...identity,
      wake_time: null,
      time_note: null,
      method: null,
      report_status: "not_filled",
      points: 0,
    };
  }

  const isParentWake = PARENT_WAKE_INDEXES.includes(index);
  const minutes =
    index === 1 ? TARGET_MINUTES : index === 2 ? TARGET_MINUTES + 15 : EARLIEST_MINUTES + ((index * 7) % 35);

  return {
    ...identity,
    wake_time: formatMinutes(minutes),
    time_note: minutes < TARGET_MINUTES ? "early" : minutes === TARGET_MINUTES ? "on_time" : null,
    method: isParentWake ? "parent" : "self",
    report_status: "confirmed",
    points: isParentWake ? 15 : 20,
  };
});

export const mockWakeUpRecap: WakeUpRecapResponse = {
  code: 200,
  status: "success",
  message: "OK (data dummy)",
  data: {
    class_group: {
      education_level: "Kelas 1",
      name: "1-A",
      teacher_name: "Ibu Nurul Hidayati",
      total_students: mockStudents.length,
      target_wake_time: "05.00",
    },
    record_date_label: "Kamis, 13 Nov 2025",
    summary: {
      report_rate: 90,
      reported_count: 29,
      total_students: mockStudents.length,
      report_rate_trend: 10,
      report_hint: "9 dari 10 siswa aktif lapor pagi",
      average_wake_time: "05:12",
      average_wake_hint: "Sesuai rentang target waktu",
      independence_rate: 78,
      independent_count: 25,
      independence_hint: "Bangun sendiri tanpa dibangunkan",
      total_points: 840,
      points_trend: 120,
    },
    students: mockStudents,
  },
};
