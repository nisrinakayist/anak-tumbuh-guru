import { Student } from "@/lib/types/studentType";
import FillStatusBadge from "@/components/features/dashboard/FillStatusBadge";

type StudentTableProps = {
  students: Student[];
};

function StudentTable({ students }: StudentTableProps) {
  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full text-sm">
        <thead className="bg-primary-50 text-primary-900/60">
          <tr>
            <th className="px-5 py-3 text-left font-bold">Ranking</th>
            <th className="px-5 py-3 text-left font-bold">Siswa</th>
            <th className="px-5 py-3 text-left font-bold">Status Hari Ini</th>
            <th className="px-5 py-3 text-left font-bold">Poin</th>
            <th className="px-5 py-3 text-left font-bold">Level</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border-t border-primary-50 hover:bg-primary-50/50">
              <td className="px-5 py-4 font-extrabold text-primary-900">#{student.class_rank}</td>
              <td className="px-5 py-4">
                <p className="font-extrabold text-primary-900">{student.name}</p>
                <p className="text-xs text-primary-900/45">NIS {student.nis}</p>
              </td>
              <td className="px-5 py-4">
                <FillStatusBadge status={student.today_status} />
              </td>
              <td className="px-5 py-4 font-bold text-primary-900">{student.points}</td>
              <td className="px-5 py-4 font-bold text-primary-900">Lv. {student.level}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {!students.length && (
        <div className="p-10 text-center text-sm font-semibold text-primary-900/50">
          Tidak ada siswa yang sesuai pencarian.
        </div>
      )}
    </div>
  );
}

export default StudentTable;
