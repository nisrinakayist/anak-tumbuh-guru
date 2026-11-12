import { Metadata } from "next";
import FeatureUnavailable from "@/components/ui/Placeholder/FeatureUnavailable";
import { isMockEnabled } from "@/lib/utils/mock";
import HabitGuideEditor from "@/components/features/habitGuide/HabitGuideEditor";

export const metadata: Metadata = {
  title: "Pengaturan Panduan | ANAKHEBAT.ID Guru",
};

const Page = () => {
  if (!isMockEnabled()) {
    return <FeatureUnavailable title="Pengaturan Panduan" />;
  }

  return <HabitGuideEditor />;
};

export default Page;
