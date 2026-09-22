"use client";

import Link from "next/link";
import { IconType } from "react-icons";

type SidebarSubLinkProps = {
  label: string;
  href: string;
  icon: IconType;
  isActive: boolean;
  onNavigate: () => void;
};

export default function SidebarSubLink({ label, href, icon: Icon, isActive, onNavigate }: SidebarSubLinkProps) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold transition ${
        isActive ? "bg-white text-primary-900 shadow-sm" : "text-white/90 hover:bg-white/10 hover:text-white"
      }`}
    >
      <Icon size={16} className="shrink-0" />
      <span className="flex-1 truncate text-left">{label}</span>
      {isActive && <span className="h-2 w-2 shrink-0 rounded-full bg-primary-500" />}
    </Link>
  );
}
