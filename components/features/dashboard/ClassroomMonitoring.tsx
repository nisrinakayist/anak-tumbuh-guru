"use client";

import { CiCircleCheck, CiCircleAlert, CiUser, CiTrophy } from "react-icons/ci";
import useClassroomDashboard from "@/hook/useClassroomDashboard";
import useSearchFilter from "@/hook/useSearchFilter";
import { Student } from "@/lib/types/studentType";
import SummaryCard from "@/components/features/dashboard/SummaryCard";
import SearchInput from "@/components/ui/Search/SearchInput";
import StudentTable from "@/components/features/dashboard/StudentTable";
import StudentListMobile from "@/components/features/dashboard/StudentListMobile";
import SpinLoader from "@/components/ui/Loader/SpinLoader";
import ErrorAlert from "@/components/ui/Alert/ErrorAlert";

const getStudentSearchText = (student: Student) => [student.name, student.nis];

function ClassroomMonitoring() {
  const { classGroup, summary, students, loading, error } = useClassroomDashboard();
  const { query, setQuery, filteredItems: filteredStudents } = useSearchFilter(
    students,
    getStudentSearchText
  );

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <SpinLoader size={48} />
      </div>
    );
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-gradient-to-br from-primary-900 to-primary-700 p-5 text-white shadow-lg sm:p-7">
        <p className="text-sm font-semibold text-primary-200">Monitoring Rombel</p>
        <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">
          {classGroup?.education_level} · {classGroup?.name}
        </h1>
        <p className="mt-1 text-sm text-primary-200">Tahun Ajaran {classGroup?.academic_year}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <SummaryCard label="Total Siswa" value={summary?.total_students ?? 0} icon={CiUser} />
        <SummaryCard
          label="Sudah Mengisi"
          value={summary?.filled_today ?? 0}
          icon={CiCircleCheck}
        />
        <SummaryCard
          label="Belum Mengisi"
          value={summary?.not_filled_today ?? 0}
          icon={CiCircleAlert}
        />
        <SummaryCard
          label="Rata-rata Poin"
          value={summary?.average_points ?? 0}
          icon={CiTrophy}
        />
      </div>

      <div className="overflow-hidden rounded-3xl border border-primary-100 bg-white shadow-sm">
        <div className="border-b border-primary-50 p-4 sm:p-5">
          <SearchInput
            placeholder="Cari nama atau NIS siswa..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <StudentTable students={filteredStudents} />
        <StudentListMobile students={filteredStudents} />
      </div>
    </div>
  );
}

export default ClassroomMonitoring;
