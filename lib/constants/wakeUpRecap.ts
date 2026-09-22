import {
  WakeUpMethod,
  WakeUpPeriodId,
  WakeUpReportStatus,
  WakeUpSortBy,
  WakeUpStatusFilter,
  WakeUpTimeNote,
} from "@/lib/types/wakeUpRecapType";

export const WAKE_UP_PAGE_SIZE = 4;

// Rentang tanggal masih statis (dummy). Nanti diganti data dari backend.
export const WAKE_UP_PERIOD_OPTIONS: { value: WakeUpPeriodId; label: string; rangeLabel: string }[] = [
  { value: "this_week", label: "Pekan Ini", rangeLabel: "10 - 16 Nov 2025" },
  { value: "last_week", label: "Pekan Lalu", rangeLabel: "3 - 9 Nov 2025" },
];

export const WAKE_UP_STATUS_FILTER_OPTIONS: { value: WakeUpStatusFilter; label: string }[] = [
  { value: "all", label: "Semua Status" },
  { value: "confirmed", label: "Terkonfirmasi Ortu" },
  { value: "not_filled", label: "Belum Mengisi" },
];

export const WAKE_UP_SORT_OPTIONS: { value: WakeUpSortBy; label: string }[] = [
  { value: "number", label: "Urutkan: Nomor Urut" },
  { value: "wake_time", label: "Urutkan: Waktu Bangun" },
  { value: "name", label: "Urutkan: Nama Siswa" },
  { value: "points", label: "Urutkan: Poin Tertinggi" },
];

export const WAKE_UP_METHOD_LABEL: Record<WakeUpMethod, string> = {
  self: "Sadar Sendiri / Mandiri",
  parent: "Dibangunkan Orang Tua",
};

export const WAKE_UP_REPORT_STATUS_LABEL: Record<WakeUpReportStatus, string> = {
  confirmed: "Terkonfirmasi Ortu",
  not_filled: "Belum Mengisi",
};

export const WAKE_UP_TIME_NOTE_LABEL: Record<Exclude<WakeUpTimeNote, null>, string> = {
  early: "Lebih Awal",
  on_time: "Tepat Waktu",
};
