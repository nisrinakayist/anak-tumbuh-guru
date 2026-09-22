"use client";

import { ReactNode, useState } from "react";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import Navbar from "@/components/common/Navbar/Navbar";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import BottomNav from "@/components/common/BottomNav/BottomNav";

type DashboardLayoutProps = {
  children: ReactNode;
};

function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-primary-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="min-h-screen lg:pl-[248px]">
        <Navbar onOpenSidebar={() => setIsSidebarOpen(true)} />
        <Breadcrumb />
        <main className="p-3 pb-28 sm:p-6 sm:pb-28 lg:p-8 lg:pb-8">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}

export default DashboardLayout;
