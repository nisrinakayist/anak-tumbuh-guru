"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome } from "react-icons/fi";
import { getBreadcrumbTrail } from "@/lib/utils/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();
  const trail = getBreadcrumbTrail(pathname);

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-1.5 border-b border-primary-50 bg-white px-4 py-3 text-xs font-bold text-primary-900/50 sm:px-6"
    >
      <Link href="/dashboard" className="inline-flex items-center gap-1.5 transition hover:text-primary-900">
        <FiHome size={13} />
        Dashboard
      </Link>

      {trail.map((label, index) => {
        const isLast = index === trail.length - 1;
        return (
          <span key={label} className="inline-flex items-center gap-1.5">
            <span className="text-primary-900/25">/</span>
            <span className={isLast ? "text-primary-600" : undefined}>{label}</span>
          </span>
        );
      })}
    </nav>
  );
}
