"use client";

import Link from "next/link";
import { IconType } from "react-icons";

type SidebarLinkProps = {
  label: string;
  href: string;
  icon: IconType;
  isActive: boolean;
  onNavigate: () => void;
};

export default function SidebarLink({ label, href, icon: Icon, isActive, onNavigate }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition ${
        isActive
          ? "bg-white text-primary-900 shadow-sm"
          : "text-white/90 hover:bg-white/10 hover:text-white"
      }`}
    >
      <Icon size={20} />
      <span className="truncate">{label}</span>
    </Link>
  );
}
