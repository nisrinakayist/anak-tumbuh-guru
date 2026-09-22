import { NAV_ITEMS, isNavGroup } from "@/lib/constants/navigation";
import { HABIT_RECAP_CONFIG } from "@/lib/constants/habitRecapConfig";
import { HabitId } from "@/lib/types/habitRecapType";

// Susun label breadcrumb dari path aktif, contoh:
// "/dashboard/habit-recap/worship" -> ["Rekap Kebiasaan", "Kebiasaan 2: Beribadah"]
export const getBreadcrumbTrail = (pathname: string): string[] => {
  if (pathname.startsWith("/dashboard/habit-recap/")) {
    const habitId = pathname.split("/").pop() as HabitId;
    const config = HABIT_RECAP_CONFIG[habitId];
    if (config) return ["Rekap Kebiasaan", config.breadcrumbLabel];
  }

  if (pathname === "/dashboard/habit-recap") return ["Rekap Kebiasaan"];

  for (const item of NAV_ITEMS) {
    if (isNavGroup(item)) {
      const child = item.children.find((childItem) => childItem.href === pathname);
      if (child) return [item.label, child.label];
    } else if (item.href === pathname) {
      return [item.label];
    }
  }
  return ["Halaman"];
};
