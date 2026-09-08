import { CiGrid41, CiUser, CiFileOn, CiBarcode } from "react-icons/ci";
import { IconType } from "react-icons";

export type NavItem = {
  label: string;
  href: string;
  icon: IconType;
};

// Menu Dashboard Guru. Dipakai bareng oleh Sidebar & Breadcrumb
// biar nama halaman selalu konsisten di satu sumber data.
export const NAV_ITEMS: NavItem[] = [
  { label: "Monitoring Rombel", href: "/dashboard", icon: CiGrid41 },
  { label: "Kelola Siswa", href: "/dashboard/students", icon: CiUser },
  { label: "Akun & QR Siswa", href: "/dashboard/students/accounts", icon: CiBarcode },
  { label: "Report Center", href: "/dashboard/report", icon: CiFileOn },
];
