"use client";

import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { NAV_ITEMS, isNavGroup } from "@/lib/constants/navigation";
import SidebarRoleCard from "@/components/common/Sidebar/SidebarRoleCard";
import SidebarLink from "@/components/common/Sidebar/SidebarLink";
import SidebarGroup from "@/components/common/Sidebar/SidebarGroup";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  // Nama rombel diambil dari data yang sudah dimuat halaman aktif (kalau ada)
  const rombelName = useSelector(
    (state: RootState) => state.classroom.classGroup?.name ?? state.habitRecap.data?.class_group.name
  );

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Tutup navigasi"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-primary-900/50 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[248px] flex-col overflow-y-auto bg-primary-900 shadow-xl transition-transform duration-300 lg:z-30 lg:translate-x-0 lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[72px] shrink-0 items-center gap-3 border-b border-white/10 px-5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary-500 font-black text-primary-900">
            AT
          </span>
          <span className="text-lg font-black tracking-tight text-white">
            anaktumbuh<span className="text-secondary-500">.id</span>
          </span>
        </div>

        <SidebarRoleCard roleLabel={rombelName ? `Wali Kelas ${rombelName}` : "Wali Kelas"} />

        <nav className="mt-6 flex-1 space-y-1.5 px-3 pb-6">
          {NAV_ITEMS.map((item) =>
            isNavGroup(item) ? (
              <SidebarGroup key={item.label} item={item} pathname={pathname} onNavigate={onClose} />
            ) : (
              <SidebarLink
                key={item.href}
                label={item.label}
                href={item.href}
                icon={item.icon}
                isActive={pathname === item.href}
                onNavigate={onClose}
              />
            )
          )}
        </nav>
      </aside>
    </>
  );
}
