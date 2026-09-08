import { StudentCredential } from "@/lib/types/studentAccountType";
import StatusBadge from "@/components/ui/Badge/StatusBadge";
import RevokeQrButton from "@/components/features/students/RevokeQrButton";

type StudentCredentialTableProps = {
  credentials: StudentCredential[];
  selectedIds: number[];
  onToggleSelect: (studentId: number) => void;
};

function StudentCredentialTable({
  credentials,
  selectedIds,
  onToggleSelect,
}: StudentCredentialTableProps) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-primary-100 bg-white shadow-sm">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="bg-primary-50 text-primary-900/60">
          <tr>
            <th className="w-10 px-5 py-3" />
            <th className="px-5 py-3 font-bold">Siswa</th>
            <th className="px-5 py-3 font-bold">Kelas / Rombel</th>
            <th className="px-5 py-3 font-bold">Angkatan</th>
            <th className="px-5 py-3 font-bold">Akun</th>
            <th className="px-5 py-3 font-bold">QR</th>
            <th className="px-5 py-3 font-bold">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-primary-50">
          {credentials.map((credential) => {
            const isPending = credential.account_status === "not_generated";
            return (
              <tr key={credential.student_id} className="hover:bg-primary-50/50">
                <td className="px-5 py-4">
                  {isPending && (
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-primary-500"
                      checked={selectedIds.includes(credential.student_id)}
                      onChange={() => onToggleSelect(credential.student_id)}
                    />
                  )}
                </td>
                <td className="px-5 py-4">
                  <p className="font-extrabold text-primary-900">{credential.name}</p>
                  <p className="text-xs text-primary-900/45">{credential.nis}</p>
                </td>
                <td className="px-5 py-4 text-primary-900">{credential.class_group_name}</td>
                <td className="px-5 py-4 text-primary-900">{credential.academic_year}</td>
                <td className="px-5 py-4">
                  {credential.account_status === "generated" ? (
                    <StatusBadge label="Generated" tone="success" />
                  ) : (
                    <StatusBadge label="Belum" tone="muted" />
                  )}
                </td>
                <td className="px-5 py-4">
                  {credential.qr_status === "active" && <StatusBadge label="active" tone="success" />}
                  {credential.qr_status === "revoked" && <StatusBadge label="revoked" tone="danger" />}
                  {credential.qr_status === "not_available" && (
                    <StatusBadge label="Tidak tersedia" tone="muted" />
                  )}
                </td>
                <td className="px-5 py-4">
                  {credential.qr_status === "active" && (
                    <RevokeQrButton studentId={credential.student_id} />
                  )}
                  {credential.qr_status !== "active" && (
                    <span className="text-xs text-primary-900/30">—</span>
                  )}
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
