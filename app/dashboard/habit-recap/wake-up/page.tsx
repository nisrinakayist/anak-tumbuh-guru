import { Metadata } from "next";
import FeatureUnavailable from "@/components/ui/Placeholder/FeatureUnavailable";
import { isMockEnabled } from "@/lib/utils/mock";
import HabitRecapPage from "@/components/features/habitRecap/HabitRecapPage";

export const metadata: Metadata = {
  title: "Rekap Bangun Pagi | ANAKHEBAT.ID Wali Kelas",
};

const Page = () => {
  if (!isMockEnabled()) {
    return <FeatureUnavailable title="Rekap Kebiasaan" />;
  }

  return <HabitRecapPage habitId="wake-up" />;
};

export default Page;
