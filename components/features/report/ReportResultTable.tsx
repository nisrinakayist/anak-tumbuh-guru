import { ReportFilter, ReportResult, ReportRow } from "@/lib/types/reportType";
import { HABIT_OPTIONS } from "@/lib/constants/habit";
import ReportTable from "@/components/features/report/ReportTable";
import ExportReportButton from "@/components/features/report/ExportReportButton";
import SearchInput from "@/components/ui/Search/SearchInput";

type ReportResultTableProps = {
  result: ReportResult;
  filter: ReportFilter;
  rows: ReportRow[];
  query: string;
  onQueryChange: (value: string) => void;
};

const getInitiativeText = (filter: ReportFilter) => {
  const labels = (filter.initiatives ?? []).map((initiative) =>
    initiative === "mandiri" ? "Sadar sendiri" : "Disuruh"
  );
  return labels.length ? `${labels.join(" + ")}.` : "—";
};

function ReportResultTable({ result, filter, rows, query, onQueryChange }: ReportResultTableProps) {
  const habitName = HABIT_OPTIONS.find((habit) => habit.id === filter.habit_id)?.name ?? "";

  const title = result.scope === "habit" ? `Laporan ${habitName}` : "Laporan Siswa";
  const subtitle =
    result.scope === "habit"
      ? `Rekap ${habitName} · Inisiatif: ${getInitiativeText(filter)} · ${result.period_start} — ${result.period_end}`
      : `Rekap perkembangan siswa dalam periode terpilih · ${result.period_start} — ${result.period_end}`;

  return (
    <div className="overflow-hidden rounded-3xl border border-primary-100 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-primary-50 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <h2 className="text-sm font-black text-primary-900">{title}</h2>
          <p className="mt-1 text-xs font-semibold text-primary-900/50">{subtitle}</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <SearchInput
            placeholder="Cari siswa..."
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
          <div className="flex gap-2">
            <ExportReportButton filter={filter} format="csv" />
            <ExportReportButton filter={filter} format="pdf" />
          </div>
        </div>
      </div>

      <ReportTable rows={rows} scope={result.scope} />
    </div>
  );
}

export default ReportResultTable;
