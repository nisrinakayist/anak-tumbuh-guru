"use client";

import { useState } from "react";
import { CiImport } from "react-icons/ci";
import useClassroomDashboard from "@/hook/useClassroomDashboard";
import AddStudentForm from "@/components/features/students/AddStudentForm";
import ImportStudentWizard from "@/components/features/students/ImportStudentWizard";
import StudentTable from "@/components/features/dashboard/StudentTable";
import StudentListMobile from "@/components/features/dashboard/StudentListMobile";
import SpinLoader from "@/components/ui/Loader/SpinLoader";

function StudentManagement() {
  const [isImportOpen, setIsImportOpen] = useState(false);
  const { students, loading } = useClassroomDashboard();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-primary-900/55">Kelola Siswa</p>
        <h1 className="mt-1 text-2xl font-extrabold text-primary-900">
          Tambah &amp; Import Siswa Rombel
        </h1>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="rounded-3xl border border-primary-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-primary-50 p-4 sm:p-5">
            <h2 className="text-sm font-extrabold text-primary-900">Daftar Siswa</h2>
            <button
              type="button"
              onClick={() => setIsImportOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-primary-200 px-3 py-2 text-xs font-black text-primary-900 transition hover:bg-primary-50"
            >
              <CiImport size={18} />
              Import Excel
            </button>
          </div>

          {loading ? (
            <div className="flex min-h-[30vh] items-center justify-center">
              <SpinLoader size={40} />
            </div>
          ) : (
            <>
              <StudentTable students={students} />
              <StudentListMobile students={students} />
            </>
          )}
        </div>

        <div className="rounded-3xl border border-primary-100 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-extrabold text-primary-900">Tambah Siswa Manual</h2>
          <p className="mt-1 text-xs font-semibold text-primary-900/55">
            Siswa langsung masuk ke rombelmu.
          </p>
          <div className="mt-4">
            <AddStudentForm />
          </div>
        </div>
      </div>

      {isImportOpen && <ImportStudentWizard onClose={() => setIsImportOpen(false)} />}
    </div>
  );
}

export default StudentManagement;
