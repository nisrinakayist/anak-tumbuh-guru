"use client";

import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  previewStudentImport,
  commitStudentImport,
  resetImportWizard,
} from "@/redux/features/students/studentSlice";
import { fetchClassroomDashboard } from "@/redux/features/classroom/classroomSlice";
import { downloadStudentImportTemplateApi } from "@/lib/api/studentApi";
import { saveBlob } from "@/lib/utils/download";
import { isMockEnabled } from "@/lib/utils/mock";
import FileInput from "@/components/ui/File/FileInput";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";
import ErrorAlert from "@/components/ui/Alert/ErrorAlert";
import ImportPreviewTable from "@/components/features/students/ImportPreviewTable";

type ImportStudentWizardProps = {
  onClose: () => void;
};

function ImportStudentWizard({ onClose }: ImportStudentWizardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { importStep, importLoading, importError, importPreview, importResult } = useSelector(
    (state: RootState) => state.student
  );

  // File dipegang di sini (bukan di Redux): backend meminta file yang SAMA
  // dikirim lagi saat commit.
  const fileRef = useRef<File | null>(null);
  const [templateError, setTemplateError] = useState<string | null>(null);
  const [templateLoading, setTemplateLoading] = useState(false);

  const handleClose = () => {
    fileRef.current = null;
    dispatch(resetImportWizard());
    onClose();
  };

  const handleFileSelect = (file: File) => {
    fileRef.current = file;
    dispatch(previewStudentImport(file));
  };

  const handleCommit = async () => {
    if (!fileRef.current) return;
    const result = await dispatch(commitStudentImport(fileRef.current));
    if (commitStudentImport.fulfilled.match(result)) {
      dispatch(fetchClassroomDashboard());
    }
  };

  const handleDownloadTemplate = async () => {
    setTemplateError(null);
    setTemplateLoading(true);
    const result = await downloadStudentImportTemplateApi();
    setTemplateLoading(false);

    if (!result.ok) {
      setTemplateError(result.error.message);
      return;
    }
    saveBlob(result.data.blob, result.data.filename ?? "template-import-siswa.xlsx");
  };

  const validCount = importPreview?.valid_count ?? 0;
  const invalidCount = importPreview?.invalid_count ?? 0;

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
          {templateError && <ErrorAlert message={templateError} onClose={() => setTemplateError(null)} />}

          {importStep === "idle" && (
            <div className="space-y-3">
              <FileInput
                accept=".xlsx"
                description="Format .xlsx sesuai template (kolom: Nama Lengkap, NISN, Gender), maksimal 5 MB"
                onFileSelect={handleFileSelect}
              />
              {!isMockEnabled() && (
                <button
                  type="button"
                  onClick={handleDownloadTemplate}
                  disabled={templateLoading}
                  className="w-full rounded-xl border border-primary-200 px-4 py-2.5 text-xs font-black text-primary-900 transition hover:bg-primary-50 disabled:opacity-50"
                >
                  {templateLoading ? "Mengunduh..." : "Unduh Template Excel"}
                </button>
              )}
            </div>
          )}

          {importLoading && importStep === "idle" && (
            <p className="mt-4 text-center text-xs font-bold text-primary-500">
              Memvalidasi file...
            </p>
          )}

          {importStep === "preview" && importPreview && (
            <div className="space-y-4">
              <p className="text-xs font-bold text-primary-900/60">
                {importPreview.total_rows} baris · {validCount} valid · {invalidCount} error
              </p>
              <ImportPreviewTable preview={importPreview} />
              <PrimaryButton
                type="button"
                isLoading={importLoading}
                disabled={invalidCount > 0 || validCount === 0}
                onClick={handleCommit}
              >
                Import {validCount} Siswa Valid
              </PrimaryButton>
              {invalidCount > 0 && (
                <p className="text-center text-xs font-semibold text-red-600">
                  Perbaiki baris error pada file lalu upload ulang.
                </p>
              )}
            </div>
          )}

          {importStep === "done" && importResult && (
            <div className="py-6 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="mt-4 text-lg font-black text-primary-900">Import selesai</h3>
              <p className="mt-2 text-sm font-semibold text-primary-900/60">
                {importResult.successful_rows} siswa berhasil ditambahkan ke rombel
                {importResult.rejected_rows > 0 ? `, ${importResult.rejected_rows} baris ditolak.` : "."}
              </p>

              {importResult.errors.length > 0 && (
                <div className="mt-4 overflow-x-auto rounded-2xl border border-red-100 text-left">
                  <table className="w-full min-w-[420px] text-xs">
                    <thead className="bg-red-50 text-red-700">
                      <tr>
                        <th className="px-3 py-3 font-bold">Baris</th>
                        <th className="px-3 py-3 font-bold">Alasan ditolak</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-red-50">
                      {importResult.errors.map((error) => (
                        <tr key={`${error.row}-${error.code}`}>
                          <td className="px-3 py-3 font-black text-primary-900">{error.row}</td>
                          <td className="px-3 py-3 text-red-600">{error.message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

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
