import { Metadata } from "next";
import StudentAccountsManagement from "@/components/features/students/StudentAccountsManagement";

export const metadata: Metadata = {
  title: "Akun & QR Siswa | ANAKHEBAT.ID Guru",
};

const Page = () => {
  return <StudentAccountsManagement />;
};

export default Page;
