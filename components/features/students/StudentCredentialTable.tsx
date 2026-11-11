import { StudentCredential } from "@/lib/types/studentAccountType";
import StatusBadge from "@/components/ui/Badge/StatusBadge";

type StudentCredentialTableProps = {
  credentials: StudentCredential[];
  selectedIds: number[];
  readyIds: number[];
  busyIds: number[];
  onToggleSelect: (studentId: number) => void;
  onToggleSelectAll: () => void;
  onResetPassword: (credential: StudentCredential) => void;
};

const ACCOUNT_STATUS = {
  active: { label: "Aktif", tone: "success" },
  inactive: { label: "Nonaktif", tone: "muted" },
  graduated: { label: "Lulus", tone: "warning" },
} as const;

function StudentCredentialTable({
  credentials,
  selectedIds,
  readyIds,
  busyIds,
  onToggleSelect,
  onToggleSelectAll,
  onResetPassword,
}: StudentCredentialTableProps) {
  const allSelected = credentials.length > 0 && selectedIds.length === credentials.length;

  return (
    <div className="overflow-x-auto rounded-3xl border border-primary-100 bg-white shadow-sm">
      <table className="w-full min-w-[820px] text-left text-sm">
        <thead className="bg-primary-50 text-primary-900/60">
          <tr>
            <th className="w-10 px-5 py-3">
              <input
                type="checkbox"
                className="h-4 w-4 accent-primary-500"
                checked={allSelected}
                onChange={onToggleSelectAll}
                aria-label="Pilih semua siswa"
              />
            </th>
            <th className="px-5 py-3 font-bold">Siswa</th>
            <th className="px-5 py-3 font-bold">Kelas / Rombel</th>
            <th className="px-5 py-3 font-bold">Tahun Ajaran</th>
            <th className="px-5 py-3 font-bold">Status Akun</th>
            <th className="px-5 py-3 font-bold">QR (sesi ini)</th>
            <th className="px-5 py-3 font-bold">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-primary-50">
          {credentials.map((credential) => {
            const isBusy = busyIds.includes(credential.student_id);
            const isReady = readyIds.includes(credential.student_id);
            return (
              <tr key={credential.student_id} className="hover:bg-primary-50/50">
                <td className="px-5 py-4">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-primary-500"
                    checked={selectedIds.includes(credential.student_id)}
                    onChange={() => onToggleSelect(credential.student_id)}
                    aria-label={`Pilih ${credential.name}`}
                  />
                </td>
                <td className="px-5 py-4">
                  <p className="font-extrabold text-primary-900">{credential.name}</p>
                  <p className="text-xs text-primary-900/45">NISN {credential.nis}</p>
                </td>
                <td className="px-5 py-4 text-primary-900">{credential.class_group_name}</td>
                <td className="px-5 py-4 text-primary-900">{credential.academic_year}</td>
                <td className="px-5 py-4">
                  <StatusBadge
                    label={ACCOUNT_STATUS[credential.status].label}
                    tone={ACCOUNT_STATUS[credential.status].tone}
                  />
                </td>
                <td className="px-5 py-4">
                  {isBusy ? (
                    <StatusBadge label="Membuat..." tone="warning" />
                  ) : isReady ? (
                    <StatusBadge label="Siap dicetak" tone="success" />
                  ) : (
                    <StatusBadge label="Belum dibuat" tone="muted" />
                  )}
                </td>
                <td className="px-5 py-4">
                  <button
                    type="button"
                    onClick={() => onResetPassword(credential)}
                    className="rounded-lg border border-primary-200 px-2.5 py-1.5 text-[11px] font-black text-primary-900 transition hover:bg-primary-50"
                  >
                    Reset Password
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {!credentials.length && (
        <div className="p-10 text-center text-sm font-semibold text-primary-900/50">
          Belum ada data siswa di rombelmu.
        </div>
      )}
    </div>
  );
}

export default StudentCredentialTable;
