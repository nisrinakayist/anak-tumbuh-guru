import { Metadata } from "next";
import ClassroomMonitoring from "@/components/features/dashboard/ClassroomMonitoring";

export const metadata: Metadata = {
  title: "Monitoring Rombel | ANAKHEBAT.ID Wali Kelas",
};

const Page = () => {
  return <ClassroomMonitoring />;
};

export default Page;
