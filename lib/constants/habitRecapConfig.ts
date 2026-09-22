import { IconType } from "react-icons";
import { FiActivity, FiBookOpen, FiCoffee, FiMoon, FiStar, FiSun, FiUsers } from "react-icons/fi";
import { HabitId, HabitPeriodId } from "@/lib/types/habitRecapType";

export type HabitRecapConfig = {
  id: HabitId;
  number: number; // urutan "Kebiasaan 1..7"
  label: string; // dipakai di Sidebar
  icon: IconType;
  heroBadgeText: string; // teks pill kecil di banner
  breadcrumbLabel: string; // "Kebiasaan 2: Beribadah"
  targetLabel: string; // "Target Jam Bangun" / "Target Ibadah Harian"
  primaryColumnLabel: string; // header kolom capaian utama di tabel
  methodColumnLabel: string; // header kolom metode/cara
};

// Urutan sesuai submenu Sidebar di desain.
export const HABIT_ORDER: HabitId[] = [
  "wake-up",
  "worship",
  "study",
  "healthy-eating",
  "exercise",
  "social",
  "early-sleep",
];

export const HABIT_RECAP_CONFIG: Record<HabitId, HabitRecapConfig> = {
  "wake-up": {
    id: "wake-up",
    number: 1,
    label: "Bangun Pagi",
    icon: FiSun,
    heroBadgeText: "Kebiasaan 1 • Memulai Hari dengan Bangun Pagi",
    breadcrumbLabel: "Kebiasaan 1: Bangun Pagi",
    targetLabel: "Target Jam Bangun",
    primaryColumnLabel: "Jam Bangun Tercatat",
    methodColumnLabel: "Metode Bangun",
  },
  worship: {
    id: "worship",
    number: 2,
    label: "Beribadah",
    icon: FiStar,
    heroBadgeText: "Kebiasaan 2 • Menjalankan Ibadah dengan Disiplin",
    breadcrumbLabel: "Kebiasaan 2: Beribadah",
    targetLabel: "Target Ibadah Harian",
    primaryColumnLabel: "Sholat Subuh Tercatat",
    methodColumnLabel: "Cara Beribadah",
  },
  study: {
    id: "study",
    number: 3,
    label: "Gemar Belajar",
    icon: FiBookOpen,
    heroBadgeText: "Kebiasaan 3 • Gemar Belajar Setiap Hari",
    breadcrumbLabel: "Kebiasaan 3: Gemar Belajar",
    targetLabel: "Target Durasi Belajar",
    primaryColumnLabel: "Durasi Belajar Tercatat",
    methodColumnLabel: "Cara Belajar",
  },
  "healthy-eating": {
    id: "healthy-eating",
    number: 4,
    label: "Makan Sehat",
    icon: FiCoffee,
    heroBadgeText: "Kebiasaan 4 • Makan Sehat dan Bergizi",
    breadcrumbLabel: "Kebiasaan 4: Makan Sehat",
    targetLabel: "Target Menu Sehat",
    primaryColumnLabel: "Menu Tercatat",
    methodColumnLabel: "Cara Makan",
  },
  exercise: {
    id: "exercise",
    number: 5,
    label: "Olahraga",
    icon: FiActivity,
    heroBadgeText: "Kebiasaan 5 • Rajin Berolahraga",
    breadcrumbLabel: "Kebiasaan 5: Olahraga",
    targetLabel: "Target Durasi Olahraga",
    primaryColumnLabel: "Durasi Olahraga Tercatat",
    methodColumnLabel: "Jenis Olahraga",
  },
  social: {
    id: "social",
    number: 6,
    label: "Bermasyarakat",
    icon: FiUsers,
    heroBadgeText: "Kebiasaan 6 • Gemar Bermasyarakat",
    breadcrumbLabel: "Kebiasaan 6: Bermasyarakat",
    targetLabel: "Target Kegiatan Sosial",
    primaryColumnLabel: "Kegiatan Tercatat",
    methodColumnLabel: "Cara Berpartisipasi",
  },
  "early-sleep": {
    id: "early-sleep",
    number: 7,
    label: "Tidur Cepat",
    icon: FiMoon,
    heroBadgeText: "Kebiasaan 7 • Tidur Cepat dan Berkualitas",
    breadcrumbLabel: "Kebiasaan 7: Tidur Cepat",
    targetLabel: "Target Jam Tidur",
    primaryColumnLabel: "Jam Tidur Tercatat",
    methodColumnLabel: "Metode Tidur",
  },
};

export const getHabitConfig = (habitId: HabitId): HabitRecapConfig => HABIT_RECAP_CONFIG[habitId];

export const HABIT_PERIOD_OPTIONS: { value: HabitPeriodId; label: string; rangeLabel: string }[] = [
  { value: "this_week", label: "Pekan Ini", rangeLabel: "10 - 16 Nov 2025" },
  { value: "last_week", label: "Pekan Lalu", rangeLabel: "3 - 9 Nov 2025" },
];

export const HABIT_STATUS_FILTER_OPTIONS = [
  { value: "all", label: "Semua Status" },
  { value: "confirmed", label: "Terkonfirmasi Ortu" },
  { value: "not_filled", label: "Belum Mengisi" },
] as const;

export const HABIT_SORT_OPTIONS = [
  { value: "number", label: "Urutkan: Nomor Urut" },
  { value: "primary_value", label: "Urutkan: Capaian Utama" },
  { value: "name", label: "Urutkan: Nama Siswa" },
  { value: "points", label: "Urutkan: Poin Tertinggi" },
] as const;

export const HABIT_PAGE_SIZE = 4;
