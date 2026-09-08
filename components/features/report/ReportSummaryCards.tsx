import { CiUser, CiCalendar, CiTrophy } from "react-icons/ci";
import { ReportResult } from "@/lib/types/reportType";
import SummaryCard from "@/components/features/dashboard/SummaryCard";

type ReportSummaryCardsProps = {
  result: ReportResult;
};

function ReportSummaryCards({ result }: ReportSummaryCardsProps) {
  const cards = [
    { label: "Total Siswa", value: result.summary.total_students, icon: CiUser },
    { label: "Hari Aktif", value: result.summary.total_days_filled, icon: CiCalendar },
    { label: "Rata-rata Poin", value: result.summary.average_points, icon: CiTrophy },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
      {cards.map((card) => (
        <SummaryCard key={card.label} label={card.label} value={card.value} icon={card.icon} />
      ))}
    </div>
  );
}

export default ReportSummaryCards;
