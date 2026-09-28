"use client";

import AddStudentForm from "@/components/features/students/AddStudentForm";

type AddStudentModalProps = {
  onClose: () => void;
};

// Popup "Tambah Siswa Manual" -- dibuka dari tombol di sebelah "Import Excel"
// (sekarang tampil di semua ukuran layar). Di desktop panel "Tambah Siswa
// Manual" yang permanen di StudentManagement tetap ada sebagai jalur alternatif.
function AddStudentModal({ onClose }: AddStudentModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-900/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-sm overflow-y-auto rounded-[2rem] bg-white p-5 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-sm font-extrabold text-primary-900">Tambah Siswa Manual</h2>
            <p className="mt-1 text-xs font-semibold text-primary-900/55">
              Siswa langsung masuk ke rombelmu.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-primary-900/50 transition hover:bg-primary-50"
            aria-label="Tutup"
          >
            ×
          </button>
        </div>

        <div className="mt-4">
          <AddStudentForm onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
}

export default AddStudentModal;
