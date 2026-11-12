import { Metadata } from "next";
import FeatureUnavailable from "@/components/ui/Placeholder/FeatureUnavailable";
import { isMockEnabled } from "@/lib/utils/mock";
import ReportCenter from "@/components/features/report/ReportCenter";

export const metadata: Metadata = {
  title: "Report Center | ANAKHEBAT.ID Wali Kelas",
};

const Page = () => {
  if (!isMockEnabled()) {
    return <FeatureUnavailable title="Report Center" />;
  }

  return <ReportCenter />;
};

export default Page;
