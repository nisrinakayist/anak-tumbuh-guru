import { CiGrid41, CiUser, CiFileOn, CiBarcode, CiEdit } from "react-icons/ci";
import { FiClipboard } from "react-icons/fi";
import { IconType } from "react-icons";
import { HABIT_ORDER, HABIT_RECAP_CONFIG } from "@/lib/constants/habitRecapConfig";

export type NavLinkItem = {
  label: string;
  href: string;
  icon: IconType;
  // true = fitur belum punya endpoint backend: hanya tampil di mode data dummy.
  requiresMock?: boolean;
};

export type NavChildItem = {
  label: string;
  href: string;
  icon: IconType;
};

export type NavGroupItem = {
  label: string;
  icon: IconType;
  basePath: string;
  children: NavChildItem[];
  // true = fitur belum punya endpoint backend: hanya tampil di mode data dummy.
  requiresMock?: boolean;
};

export type NavItem = NavLinkItem | NavGroupItem;

export const isNavGroup = (item: NavItem): item is NavGroupItem => "children" in item;

// Submenu "Rekap Kebiasaan" dibangun otomatis dari HABIT_ORDER supaya
// selalu sinkron dengan konfigurasi & data dummy di habitRecapConfig.ts.
const habitRecapChildren: NavChildItem[] = HABIT_ORDER.map((habitId) => {
  const config = HABIT_RECAP_CONFIG[habitId];
  return { label: config.label, href: `/dashboard/habit-recap/${habitId}`, icon: config.icon };
});

// Menu Dashboard Guru. Dipakai bareng oleh Sidebar & Breadcrumb
// biar nama halaman selalu konsisten di satu sumber data.
export const NAV_ITEMS: NavItem[] = [
  { label: "Monitoring Rombel", href: "/dashboard", icon: CiGrid41 },
  { label: "Kelola Siswa", href: "/dashboard/students", icon: CiUser },
  { label: "Akun & QR Siswa", href: "/dashboard/students/accounts", icon: CiBarcode },
  {
    label: "Rekap Kebiasaan",
    icon: FiClipboard,
    basePath: "/dashboard/habit-recap",
    children: habitRecapChildren,
    // Menunggu endpoint rekap backend (INTEG-REKAP-001).
    requiresMock: true,
  },
  { label: "Report Center", href: "/dashboard/report", icon: CiFileOn, requiresMock: true },
  { label: "Pengaturan Panduan", href: "/dashboard/guide", icon: CiEdit, requiresMock: true },
];
