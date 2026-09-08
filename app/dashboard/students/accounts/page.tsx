import { Metadata } from "next";
import StudentAccountsManagement from "@/components/features/students/StudentAccountsManagement";

export const metadata: Metadata = {
  title: "Akun & QR Siswa | ANAKTUMBUH.ID Guru",
};

const Page = () => {
  return <StudentAccountsManagement />;
};

export default Page;
