import { Metadata } from "next";
import ReportCenter from "@/components/features/report/ReportCenter";

export const metadata: Metadata = {
  title: "Report Center | ANAKTUMBUH.ID Wali Kelas",
};

const Page = () => {
  return <ReportCenter />;
};

export default Page;
