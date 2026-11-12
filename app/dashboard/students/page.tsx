import { Metadata } from "next";
import StudentManagement from "@/components/features/students/StudentManagement";

export const metadata: Metadata = {
  title: "Kelola Siswa | ANAKHEBAT.ID Wali Kelas",
};

const Page = () => {
  return <StudentManagement />;
};

export default Page;
