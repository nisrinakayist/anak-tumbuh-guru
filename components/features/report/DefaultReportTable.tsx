import { ReportRow, ReportScope } from "@/lib/types/reportType";

type DefaultReportTableProps = {
  rows: ReportRow[];
  scope: ReportScope;
};

function DefaultReportTable({ rows, scope }: DefaultReportTableProps) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-primary-100 bg-white shadow-sm">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-primary-50 text-primary-900/60">
          <tr>
            <th className="px-5 py-3 font-bold">Siswa</th>
            {scope === "achievement" && <th className="px-5 py-3 font-bold">Ranking</th>}
            <th className="px-5 py-3 font-bold">Hari Mengisi</th>
            <th className="px-5 py-3 font-bold">Total Poin</th>
            <th className="px-5 py-3 font-bold">Level</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-primary-50">
          {rows.map((row) => (
            <tr key={row.student_id} className="hover:bg-primary-50/50">
              <td className="px-5 py-4">
                <p className="font-extrabold text-primary-900">{row.name}</p>
                <p className="text-xs text-primary-900/45">NIS {row.nis}</p>
              </td>
              {scope === "achievement" && (
                <td className="px-5 py-4 font-bold text-primary-900">#{row.class_rank}</td>
              )}
              <td className="px-5 py-4 font-bold text-primary-900">{row.days_filled} hari</td>
              <td className="px-5 py-4 font-bold text-primary-900">{row.total_points}</td>
              <td className="px-5 py-4 font-bold text-primary-900">Lv. {row.level}</td>
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

export default DefaultReportTable;
