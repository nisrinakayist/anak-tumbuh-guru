import { ValidatedStudentImportRow } from "@/lib/types/studentImportType";

type ImportPreviewTableProps = {
  rows: ValidatedStudentImportRow[];
};

function ImportPreviewTable({ rows }: ImportPreviewTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-primary-100">
      <table className="w-full min-w-[640px] text-left text-xs">
        <thead className="bg-primary-50 text-primary-900/60">
          <tr>
            <th className="px-3 py-3 font-bold">Baris</th>
            <th className="px-3 py-3 font-bold">Nama</th>
            <th className="px-3 py-3 font-bold">NIS</th>
            <th className="px-3 py-3 font-bold">Jenis Kelamin</th>
            <th className="px-3 py-3 font-bold">Status Validasi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-primary-50">
          {rows.map((row) => (
            <tr key={row.row_number}>
              <td className="px-3 py-3 text-primary-900/45">{row.row_number}</td>
              <td className="px-3 py-3 font-bold text-primary-900">{row.name || "—"}</td>
              <td className="px-3 py-3 text-primary-900">{row.nis || "—"}</td>
              <td className="px-3 py-3 text-primary-900">{row.gender || "—"}</td>
              <td className="px-3 py-3">
                {row.valid ? (
                  <span className="font-black text-emerald-600">Valid</span>
                ) : (
                  <div>
                    <span className="font-black text-red-600">Error</span>
                    <ul className="mt-1 list-disc pl-4 text-red-500">
                      {row.errors.map((message) => (
                        <li key={message}>{message}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ImportPreviewTable;
