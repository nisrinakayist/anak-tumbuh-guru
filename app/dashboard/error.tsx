"use client";

import { useEffect } from "react";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

type DashboardErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

// Error boundary khusus segmen /dashboard. Tanpa file ini, error runtime di
// SALAH SATU halaman (mis. halaman rekap kebiasaan) akan melepas seluruh
// DashboardLayout (Sidebar & Navbar ikut hilang). Dengan boundary ini,
// Sidebar & Navbar tetap terpasang; hanya area konten yang menampilkan
// pesan error beserta tombol "Coba Lagi".
export default function DashboardError({ error, reset }: DashboardErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
      <FiAlertTriangle size={40} className="text-red-500" />
      <h2 className="mt-4 text-lg font-black text-red-700">Terjadi kesalahan saat memuat halaman</h2>
      <p className="mt-1 max-w-md text-sm font-semibold text-red-600">
        {error.message || "Silakan coba muat ulang halaman ini."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-primary-800"
      >
        <FiRefreshCw size={16} />
        Coba Lagi
      </button>
    </div>
  );
}
