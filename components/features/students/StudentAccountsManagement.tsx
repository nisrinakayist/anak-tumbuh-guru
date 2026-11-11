"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchStudentCredentials,
  regenerateQrBatch,
  clearQrMessages,
  clearQrPayloads,
} from "@/redux/features/studentAccount/studentAccountSlice";
import { PrintableQr, StudentCredential } from "@/lib/types/studentAccountType";
import QrActionPanel from "@/components/features/students/QrActionPanel";
import StudentCredentialTable from "@/components/features/students/StudentCredentialTable";
import QrPrintModal from "@/components/features/students/QrPrintModal";
import ResetPasswordModal from "@/components/features/students/ResetPasswordModal";
import SpinLoader from "@/components/ui/Loader/SpinLoader";
import ErrorAlert from "@/components/ui/Alert/ErrorAlert";

function StudentAccountsManagement() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const [resetTarget, setResetTarget] = useState<StudentCredential | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { credentials, loading, error, qrPayloads, qrBusyIds, qrMessage, qrError } = useSelector(
    (state: RootState) => state.studentAccount
  );

  useEffect(() => {
    dispatch(fetchStudentCredentials());
    // qr_payload bersifat rahasia: hapus dari memori saat halaman ditutup.
    return () => {
      dispatch(clearQrPayloads());
    };
  }, [dispatch]);

  const readyIds = useMemo(() => Object.keys(qrPayloads).map(Number), [qrPayloads]);

  const printableQrs = useMemo<PrintableQr[]>(
    () =>
      credentials
        .filter((credential) => qrPayloads[credential.student_id])
        .map((credential) => ({
          student_id: credential.student_id,
          name: credential.name,
          nis: credential.nis,
          qr_payload: qrPayloads[credential.student_id],
        })),
    [credentials, qrPayloads]
  );

  const handleToggleSelect = (studentId: number) => {
    setSelectedIds((current) =>
      current.includes(studentId)
        ? current.filter((id) => id !== studentId)
        : [...current, studentId]
    );
  };

  const handleToggleSelectAll = () => {
    setSelectedIds((current) =>
      current.length === credentials.length ? [] : credentials.map((c) => c.student_id)
    );
  };

  const handleGenerate = async () => {
    const result = await dispatch(regenerateQrBatch(selectedIds));
    if (regenerateQrBatch.fulfilled.match(result)) {
      setSelectedIds([]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-primary-900/55">Kelola Siswa</p>
        <h1 className="mt-1 text-2xl font-extrabold text-primary-900">Akun &amp; QR Siswa</h1>
        <p className="mt-1 max-w-xl text-sm font-semibold text-primary-900/55">
          Buat QR login untuk siswa lalu cetak kartunya, atau reset password siswa.
        </p>
      </div>

      <QrActionPanel
        selectedCount={selectedIds.length}
        readyToPrintCount={printableQrs.length}
        generating={qrBusyIds.length > 0}
        onGenerate={handleGenerate}
        onOpenPrintList={() => setIsPrintOpen(true)}
      />

      {qrMessage && (
        <div className="flex items-start justify-between gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-3 text-sm font-bold text-emerald-700">
          <span>{qrMessage}</span>
          <button
            type="button"
            onClick={() => dispatch(clearQrMessages())}
            className="rounded-lg px-2 font-black text-emerald-600 transition hover:bg-emerald-100"
            aria-label="Tutup pesan"
          >
            ×
          </button>
        </div>
      )}

      {qrError && <ErrorAlert message={qrError} onClose={() => dispatch(clearQrMessages())} />}
      {error && <ErrorAlert message={error} />}

      {loading ? (
        <div className="flex min-h-[30vh] items-center justify-center">
          <SpinLoader size={40} />
        </div>
      ) : (
        <div>
          <h2 className="mb-3 text-sm font-black text-primary-900">Daftar Siswa</h2>
          <p className="mb-3 -mt-2 text-xs font-semibold text-primary-900/55">
            Status QR hanya menunjukkan QR yang dibuat pada sesi ini; backend tidak menyimpan
            QR yang sudah pernah dibuat.
          </p>
          <StudentCredentialTable
            credentials={credentials}
            selectedIds={selectedIds}
            readyIds={readyIds}
            busyIds={qrBusyIds}
            onToggleSelect={handleToggleSelect}
            onToggleSelectAll={handleToggleSelectAll}
            onResetPassword={setResetTarget}
          />
        </div>
      )}

      {isPrintOpen && <QrPrintModal items={printableQrs} onClose={() => setIsPrintOpen(false)} />}

      {resetTarget && (
        <ResetPasswordModal
          studentId={resetTarget.student_id}
          studentName={resetTarget.name}
          onClose={() => setResetTarget(null)}
        />
      )}
    </div>
  );
}

export default StudentAccountsManagement;
