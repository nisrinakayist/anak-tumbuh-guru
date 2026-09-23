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
    // grid-template-columns dipaksa lewat inline style (bukan cuma class
    // Tailwind) supaya 3 kolom ini PASTI diterapkan, apa pun kondisi
    // cache/build Tailwind-nya -- tidak pernah balik ke 1 kolom di mobile.
    <div className="grid gap-2 sm:gap-4" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
      {cards.map((card) => (
        <SummaryCard key={card.label} label={card.label} value={card.value} icon={card.icon} compact />
      ))}
    </div>
  );
}

export default ReportSummaryCards;
