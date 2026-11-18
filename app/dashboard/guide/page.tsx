import { Metadata } from "next";
import HabitGuideEditor from "@/components/features/habitGuide/HabitGuideEditor";

export const metadata: Metadata = {
  title: "Pengaturan Panduan | ANAKHEBAT.ID Guru",
};

const Page = () => <HabitGuideEditor />;

export default Page;
