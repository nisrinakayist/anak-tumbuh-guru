"use client";

import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants/navigation";

function Breadcrumb() {
  const pathname = usePathname();
  const activeItem = NAV_ITEMS.find((item) => pathname === item.href);

  return (
    <div className="border-b border-primary-50 bg-white px-4 py-3 text-xs font-bold text-primary-900/50 sm:px-6">
      Dashboard Wali Kelas <span className="mx-1.5 text-primary-900/25">/</span>{" "}
      <span className="text-primary-900">{activeItem?.label ?? "Halaman"}</span>
    </div>
  );
}

export default Breadcrumb;
