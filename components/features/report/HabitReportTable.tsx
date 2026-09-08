import { ReportRow } from "@/lib/types/reportType";

type HabitReportTableProps = {
  rows: ReportRow[];
};

const thClass = "px-5 py-3 font-bold uppercase tracking-wide text-xs";

const getInitiativeLabel = (row: ReportRow) => {
  const isMandiri = (row.initiative_mandiri_count ?? 0) > 0;
  const isDisuruh = (row.initiative_disuruh_count ?? 0) > 0;

  if (isMandiri && isDisuruh) return "Sadar Sendiri & Disuruh";
  if (isMandiri) return "Sadar Sendiri";
  if (isDisuruh) return "Disuruh";
  return "—";
};

function HabitReportTable({ rows }: HabitReportTableProps) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-primary-100 bg-white shadow-sm">
      <table className="w-full min-w-[860px] text-left text-sm">
        <thead className="bg-primary-50 text-primary-900/60">
          <tr>
            <th className={thClass}>Nama</th>
            <th className={thClass}>Aktivitas Kebiasaan %</th>
            <th className={thClass}>Deskripsi Isian</th>
            <th className={thClass}>Inisiatif</th>
            <th className={thClass}>Poin</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-primary-50">
          {rows.map((row) => (
            <tr key={row.student_id} className="hover:bg-primary-50/50">
              <td className="px-5 py-4 font-extrabold text-primary-900">{row.name}</td>
              <td className="px-5 py-4 font-bold text-primary-900">
                {row.habit_percentage ?? "—"}
              </td>
              <td className="px-5 py-4 font-bold text-primary-900">
                {row.description_entry ?? "—"}
              </td>
              <td className="px-5 py-4 font-bold text-primary-900">{getInitiativeLabel(row)}</td>
              <td className="px-5 py-4 font-bold text-primary-900">
                {row.habit_points ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!rows.length && (
        <div className="p-10 text-center text-sm font-semibold text-primary-900/50">
          Tidak ada data pada periode ini.
        </div>
      )}
    </div>
  );
}

export default HabitReportTable;
