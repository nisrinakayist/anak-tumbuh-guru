import { ImportPreviewResult } from "@/lib/types/studentImportType";

type ImportPreviewTableProps = {
  preview: ImportPreviewResult;
};

const FIELD_LABEL: Record<string, string> = {
  name: "Nama Lengkap",
  nisn: "NISN",
  gender: "Gender",
  general: "Umum",
};

// Backend hanya mengirim 5 contoh baris valid dan SELURUH baris yang error,
// jadi tabel contoh dan daftar error ditampilkan terpisah.
function ImportPreviewTable({ preview }: ImportPreviewTableProps) {
  return (
    <div className="space-y-4">
      {preview.invalid_rows.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-red-100">
          <table className="w-full min-w-[480px] text-left text-xs">
            <thead className="bg-red-50 text-red-700">
              <tr>
                <th className="px-3 py-3 font-bold">Baris Excel</th>
                <th className="px-3 py-3 font-bold">Masalah</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-50">
              {preview.invalid_rows.map((row) => (
                <tr key={row.row}>
                  <td className="px-3 py-3 font-black text-primary-900">{row.row}</td>
                  <td className="px-3 py-3">
                    <ul className="list-disc space-y-0.5 pl-4 text-red-600">
                      {Object.entries(row.errors).flatMap(([field, messages]) =>
                        messages.map((message) => (
                          <li key={`${field}-${message}`}>
                            <span className="font-bold">{FIELD_LABEL[field] ?? field}:</span> {message}
                          </li>
                        ))
                      )}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {preview.sample_valid.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-bold text-primary-900/60">
            Contoh baris valid (maksimal {preview.sample_valid.length} baris pertama)
          </p>
          <div className="overflow-x-auto rounded-2xl border border-primary-100">
            <table className="w-full min-w-[480px] text-left text-xs">
              <thead className="bg-primary-50 text-primary-900/60">
                <tr>
                  <th className="px-3 py-3 font-bold">Baris</th>
                  <th className="px-3 py-3 font-bold">Nama</th>
                  <th className="px-3 py-3 font-bold">NISN</th>
                  <th className="px-3 py-3 font-bold">Gender</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-50">
                {preview.sample_valid.map((row) => (
                  <tr key={row.row}>
                    <td className="px-3 py-3 text-primary-900/45">{row.row}</td>
                    <td className="px-3 py-3 font-bold text-primary-900">{row.data.name || "—"}</td>
                    <td className="px-3 py-3 text-primary-900">{row.data.nisn || "—"}</td>
                    <td className="px-3 py-3 text-primary-900">{row.data.gender || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImportPreviewTable;
