import { Metadata } from "next";
import HabitGuideEditor from "@/components/features/habitGuide/HabitGuideEditor";

export const metadata: Metadata = {
  title: "Pengaturan Panduan | ANAKTUMBUH.ID Guru",
};

const Page = () => {
  return <HabitGuideEditor />;
};

export default Page;
