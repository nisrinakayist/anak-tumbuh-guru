"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiGrid41, CiUser, CiFileOn, CiEdit } from "react-icons/ci";
import { FiClipboard } from "react-icons/fi";

const items = [
  { label: "Monitoring", href: "/dashboard", icon: CiGrid41 },
  { label: "Kebiasaan", href: "/dashboard/habit-recap", icon: FiClipboard },
  { label: "Siswa", href: "/dashboard/students", icon: CiUser },
  { label: "Laporan", href: "/dashboard/report", icon: CiFileOn },
  { label: "Panduan", href: "/dashboard/guide", icon: CiEdit },
];

const isActiveItem = (pathname: string, href: string) => {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
};

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigasi utama mobile"
      className="mobile-bottom-nav"
    >
      <div className="mobile-bottom-nav__inner">
        {items.map(({ label, href, icon: Icon }) => {
          const active = isActiveItem(pathname, href);

          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`mobile-bottom-nav__item ${
                active ? "mobile-bottom-nav__item--active" : ""
              }`}
            >
              <Icon size={21} strokeWidth={active ? 2.4 : 1.8} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
