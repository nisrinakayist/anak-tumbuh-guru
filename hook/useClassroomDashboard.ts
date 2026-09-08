import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchClassroomDashboard } from "@/redux/features/classroom/classroomSlice";

// Ambil data rombel (kelas, summary, daftar siswa) milik Guru yang login
// saat komponen pertama kali dipasang. Dipakai bersama oleh halaman
// Monitoring Rombel dan Kelola Siswa supaya logic fetch tidak diduplikasi.
export default function useClassroomDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const classroom = useSelector((state: RootState) => state.classroom);

  useEffect(() => {
    dispatch(fetchClassroomDashboard());
  }, [dispatch]);

  return classroom;
}
