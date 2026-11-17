import { Metadata } from "next";
import HabitRecapOverview from "@/components/features/habitRecap/HabitRecapOverview";

export const metadata: Metadata = {
  title: "Rekap 7 Kebiasaan | ANAKHEBAT.ID Wali Kelas",
};

export default function Page() {
  return <HabitRecapOverview />;
}
