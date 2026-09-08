"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchStudentCredentials,
  generateStudentAccounts,
  clearGenerateMessage,
} from "@/redux/features/studentAccount/studentAccountSlice";
import GenerateAccountPanel from "@/components/features/students/GenerateAccountPanel";
import StudentCredentialTable from "@/components/features/students/StudentCredentialTable";
import QrPrintModal from "@/components/features/students/QrPrintModal";
import SpinLoader from "@/components/ui/Loader/SpinLoader";
import ErrorAlert from "@/components/ui/Alert/ErrorAlert";

function StudentAccountsManagement() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isPrintOpen, setIsPrintOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { credentials, loading, error, generating, generateMessage } = useSelector(
    (state: RootState) => state.studentAccount
  );

  useEffect(() => {
    dispatch(fetchStudentCredentials());
  }, [dispatch]);

  const pendingCredentials = useMemo(
    () => credentials.filter((credential) => credential.account_status === "not_generated"),
    [credentials]
  );
  const printableCredentials = useMemo(
    () => credentials.filter((credential) => credential.qr_status === "active"),
    [credentials]
  );

  const handleToggleSelect = (studentId: number) => {
    setSelectedIds((current) =>
      current.includes(studentId)
        ? current.filter((id) => id !== studentId)
        : [...current, studentId]
    );
  };

  const handleGenerate = async () => {
    const result = await dispatch(generateStudentAccounts(selectedIds));
    if (generateStudentAccounts.fulfilled.match(result) && result.payload.code === 200) {
      setSelectedIds([]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-primary-900/55">Kelola Siswa</p>
        <h1 className="mt-1 text-2xl font-extrabold text-primary-900">Akun &amp; QR Siswa</h1>
        <p className="mt-1 max-w-xl text-sm font-semibold text-primary-900/55">
          Generate akun login & QR Code untuk siswa yang belum punya, lalu cetak kartunya.
        </p>
      </div>

      <GenerateAccountPanel
        pendingCount={pendingCredentials.length}
        selectedCount={selectedIds.length}
        readyToPrintCount={printableCredentials.length}
        generating={generating}
        onGenerate={handleGenerate}
        onOpenPrintList={() => setIsPrintOpen(true)}
      />

      {generateMessage && (
        <div className="flex items-start justify-between gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-3 text-sm font-bold text-emerald-700">
          <span>{generateMessage}</span>
          <button
            type="button"
            onClick={() => dispatch(clearGenerateMessage())}
            className="rounded-lg px-2 font-black text-emerald-600 transition hover:bg-emerald-100"
            aria-label="Tutup pesan"
          >
            ×
          </button>
        </div>
      )}

      {error && <ErrorAlert message={error} />}

      {loading ? (
        <div className="flex min-h-[30vh] items-center justify-center">
          <SpinLoader size={40} />
        </div>
      ) : (
        <>
          <div>
            <h2 className="mb-3 text-sm font-black text-primary-900">Daftar Credential</h2>
            <p className="mb-3 -mt-2 text-xs font-semibold text-primary-900/55">
              Status akun dan QR siswa. Filter dan aksi download dilakukan dari proses Generate Akun
              &amp; QR / QR Siap Dicetak.
            </p>
            <StudentCredentialTable
              credentials={credentials}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
            />
          </div>
        </>
      )}

      {isPrintOpen && (
        <QrPrintModal credentials={printableCredentials} onClose={() => setIsPrintOpen(false)} />
      )}
    </div>
  );
}

export default StudentAccountsManagement;
