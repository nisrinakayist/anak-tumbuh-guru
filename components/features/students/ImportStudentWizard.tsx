"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  validateStudentImport,
  commitStudentImport,
  resetImportWizard,
} from "@/redux/features/students/studentSlice";
import { fetchClassroomDashboard } from "@/redux/features/classroom/classroomSlice";
import FileInput from "@/components/ui/File/FileInput";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";
import ErrorAlert from "@/components/ui/Alert/ErrorAlert";
import ImportPreviewTable from "@/components/features/students/ImportPreviewTable";

type ImportStudentWizardProps = {
  onClose: () => void;
};

function ImportStudentWizard({ onClose }: ImportStudentWizardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    importStep,
    importLoading,
    importError,
    importRows,
    importValidCount,
    importInvalidCount,
    importedCount,
  } = useSelector((state: RootState) => state.student);

  const handleClose = () => {
    dispatch(resetImportWizard());
    onClose();
  };

  const handleFileSelect = (file: File) => {
    dispatch(validateStudentImport(file));
  };

  const handleCommit = async () => {
    const result = await dispatch(commitStudentImport(importRows));
    if (commitStudentImport.fulfilled.match(result) && result.payload.code === 200) {
      dispatch(fetchClassroomDashboard());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-900/50 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-primary-50 px-5 py-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-primary-500">
              Kelola Siswa
            </p>
            <h2 className="mt-1 text-lg font-black text-primary-900">Import Siswa via Excel</h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl p-2 text-primary-900/50 transition hover:bg-primary-50"
            aria-label="Tutup"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {importError && <ErrorAlert message={importError} />}

          {importStep === "idle" && (
            <FileInput onFileSelect={handleFileSelect} />
          )}

          {importLoading && importStep === "idle" && (
            <p className="mt-4 text-center text-xs font-bold text-primary-500">
              Memvalidasi file...
            </p>
          )}

          {importStep === "preview" && (
            <div className="space-y-4">
              <p className="text-xs font-bold text-primary-900/60">
                {importRows.length} baris · {importValidCount} valid · {importInvalidCount} error
              </p>
              <ImportPreviewTable rows={importRows} />
              <PrimaryButton
                type="button"
                isLoading={importLoading}
                disabled={importInvalidCount > 0 || importValidCount === 0}
                onClick={handleCommit}
              >
                Import {importValidCount} Siswa Valid
              </PrimaryButton>
              {importInvalidCount > 0 && (
                <p className="text-center text-xs font-semibold text-red-600">
                  Perbaiki baris error pada file lalu upload ulang.
                </p>
              )}
            </div>
          )}

          {importStep === "done" && (
            <div className="py-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="mt-4 text-lg font-black text-primary-900">Import berhasil</h3>
              <p className="mt-2 text-sm font-semibold text-primary-900/60">
                {importedCount} siswa berhasil ditambahkan ke rombel.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-6 rounded-xl bg-primary-500 px-5 py-3 text-sm font-black text-white transition hover:bg-primary-600"
              >
                Selesai
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImportStudentWizard;
