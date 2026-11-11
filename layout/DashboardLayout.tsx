"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import Navbar from "@/components/common/Navbar/Navbar";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import BottomNav from "@/components/common/BottomNav/BottomNav";
import useOnlineStatus from "@/hook/useOnlineStatus";
import useAuth from "@/hook/useAuth";
import { getToken } from "@/lib/auth/token";
import { AppDispatch } from "@/redux/store";
import { fetchCurrentUser } from "@/redux/features/auth/authSlice";

type DashboardLayoutProps = {
  children: ReactNode;
};

function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const online = useOnlineStatus();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();

  // Tanpa token -> kembali ke login. Dengan token tapi state Redux kosong
  // (mis. setelah refresh) -> pulihkan data user lewat GET /auth/me.
  useEffect(() => {
    if (!getToken()) {
      router.replace("/");
      return;
    }
    if (!user) {
      dispatch(fetchCurrentUser());
    }
  }, [user, dispatch, router]);

  return (
    <div className="min-h-screen bg-primary-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="min-h-screen lg:pl-[248px]">
        {/* Banner + Navbar digabung dalam satu wrapper sticky supaya keduanya
            nempel bareng di atas saat discroll, tanpa saling menimpa. Banner
            ada di alur normal (bukan fixed) jadi otomatis mendorong Navbar
            dan konten di bawahnya turun saat muncul. */}
        <div className="sticky top-0 z-20">
          {!online && (
            <div
              role="status"
              aria-live="polite"
              className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs font-semibold text-amber-900 sm:text-sm"
            >
              ⚠️ Koneksi sedang offline. Data yang disimpan akan disinkronkan otomatis setelah online kembali.
            </div>
          )}
          <Navbar onOpenSidebar={() => setIsSidebarOpen(true)} />
        </div>
        <Breadcrumb />
        <main className="p-3 pb-28 sm:p-6 sm:pb-28 lg:p-8 lg:pb-8">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}

export default DashboardLayout;
