import { Student } from "@/lib/types/studentType";
import FillStatusBadge from "@/components/features/dashboard/FillStatusBadge";

type StudentListMobileProps = {
  students: Student[];
};

function StudentListMobile({ students }: StudentListMobileProps) {
  return (
    <div className="divide-y divide-primary-50 md:hidden">
      {students.map((student) => (
        <div key={student.id} className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-extrabold text-primary-900">
                #{student.class_rank} · {student.name}
              </p>
              <p className="mt-1 text-xs text-primary-900/45">NIS {student.nis}</p>
            </div>
            <FillStatusBadge status={student.today_status} />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-primary-900/45">Poin</p>
              <p className="mt-1 font-bold text-primary-900">{student.points}</p>
            </div>
            <div>
              <p className="text-primary-900/45">Level</p>
              <p className="mt-1 font-bold text-primary-900">Lv. {student.level}</p>
            </div>
          </div>
        </div>
      ))}

      {!students.length && (
        <div className="p-10 text-center text-sm font-semibold text-primary-900/50">
          Tidak ada siswa yang sesuai pencarian.
        </div>
      )}
    </div>
  );
}

export default StudentListMobile;
