"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchClassroomDashboard } from "@/redux/features/classroom/classroomSlice";
import { updateStudentPhotoApi } from "@/lib/api/studentApi";
import { Student } from "@/lib/types/studentType";
import PhotoInput from "@/components/ui/Input/PhotoInput";
import ErrorAlert from "@/components/ui/Alert/ErrorAlert";

type ChangePhotoModalProps = {
  student: Student;
  onClose: () => void;
};

// Ganti foto siswa: POST /students/{id} (_method=PATCH, multipart).
// Aman diulang: bila penyimpanan gagal, backend tidak mengubah data.
function ChangePhotoModal({ student, onClose }: ChangePhotoModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [photo, setPhoto] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!photo) return;
    setSaving(true);
    setError(null);
    const res = await updateStudentPhotoApi(student.id, photo);
    setSaving(false);

    if (res.ok) {
      dispatch(fetchClassroomDashboard());
      onClose();
      return;
    }
    setError(
      res.status === 0 || res.status >= 500
        ? "Gagal menyimpan, coba lagi. Foto belum berubah."
        : res.error.message
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary-900/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Ganti foto ${student.name}`}
    >
      <div className="w-full max-w-sm rounded-[2rem] bg-white p-5 shadow-2xl">
        <h2 className="text-sm font-extrabold text-primary-900">Ganti Foto Siswa</h2>
        <p className="mt-1 text-xs font-semibold text-primary-900/55">{student.name}</p>

        <div className="mt-4 space-y-4">
          <PhotoInput label="Foto baru" onChange={setPhoto} />
          {error && <ErrorAlert message={error} onClose={() => setError(null)} />}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="flex-1 rounded-2xl border border-primary-200 px-4 py-3 text-sm font-black text-primary-900 hover:bg-primary-50 disabled:opacity-60"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!photo || saving}
              className="flex-1 rounded-2xl bg-primary-500 px-4 py-3 text-sm font-black text-white hover:bg-primary-600 disabled:opacity-60"
            >
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePhotoModal;
