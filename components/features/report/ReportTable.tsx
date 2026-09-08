import { ReportRow, ReportScope } from "@/lib/types/reportType";
import HabitReportTable from "@/components/features/report/HabitReportTable";
import DefaultReportTable from "@/components/features/report/DefaultReportTable";

type ReportTableProps = {
  rows: ReportRow[];
  scope: ReportScope;
};

function ReportTable({ rows, scope }: ReportTableProps) {
  if (scope === "habit") {
    return <HabitReportTable rows={rows} />;
  }

  return <DefaultReportTable rows={rows} scope={scope} />;
}

export default ReportTable;
