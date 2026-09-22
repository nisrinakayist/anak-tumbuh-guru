import { Metadata } from "next";
import HabitRecapPage from "@/components/features/habitRecap/HabitRecapPage";

export const metadata: Metadata = {
  title: "Rekap Bangun Pagi | ANAKTUMBUH.ID Wali Kelas",
};

const Page = () => {
  return <HabitRecapPage habitId="wake-up" />;
};

export default Page;
