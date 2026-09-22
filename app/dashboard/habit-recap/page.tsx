import { Metadata } from "next";
import HabitRecapOverview from "@/components/features/habitRecap/HabitRecapOverview";

export const metadata: Metadata = {
  title: "Rekap 7 Kebiasaan | ANAKTUMBUH.ID Wali Kelas",
};

export default function Page() {
  return <HabitRecapOverview />;
}
