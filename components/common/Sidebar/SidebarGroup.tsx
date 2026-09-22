"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { NavGroupItem } from "@/lib/constants/navigation";
import SidebarSubLink from "@/components/common/Sidebar/SidebarSubLink";

type SidebarGroupProps = {
  item: NavGroupItem;
  pathname: string;
  onNavigate: () => void;
};

export default function SidebarGroup({ item, pathname, onNavigate }: SidebarGroupProps) {
  const Icon = item.icon;
  const isGroupActive = pathname.startsWith(item.basePath);
  // Terbuka sejak awal (sesuai desain) dan tetap bisa ditutup manual.
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition ${
          isGroupActive ? "bg-white/10 text-white" : "text-white/90 hover:bg-white/10 hover:text-white"
        }`}
      >
        <Icon size={20} />
        <span className="flex-1 truncate text-left">{item.label}</span>
        <FiChevronDown size={16} className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="mt-1 space-y-1 pl-3">
          {item.children.map((child) => (
            <SidebarSubLink
              key={child.href}
              label={child.label}
              href={child.href}
              icon={child.icon}
              isActive={child.href === pathname}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
