import { Metadata } from "next";
import FeatureUnavailable from "@/components/ui/Placeholder/FeatureUnavailable";
import { isMockEnabled } from "@/lib/utils/mock";
import HabitRecapOverview from "@/components/features/habitRecap/HabitRecapOverview";

export const metadata: Metadata = {
  title: "Rekap 7 Kebiasaan | ANAKHEBAT.ID Wali Kelas",
};

export default function Page() {
  if (!isMockEnabled()) {
    return <FeatureUnavailable title="Rekap Kebiasaan" />;
  }

  return <HabitRecapOverview />;
}
