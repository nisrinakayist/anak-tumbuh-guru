"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { syncPendingOfflineRecords } from "@/lib/pwa/offline-sync";
import { fetchClassroomDashboard } from "@/redux/features/classroom/classroomSlice";
import useOnlineStatus from "@/hook/useOnlineStatus";

export default function PwaBootstrap() {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const online = useOnlineStatus();
  const [syncedMessage, setSyncedMessage] = useState<string | null>(null);

  // Notifikasi offline "mengambang" ini hanya untuk halaman di luar dashboard
  // (mis. halaman login). Di dalam dashboard, banner offline ditangani
  // langsung oleh DashboardLayout supaya menyatu dengan alur halaman.
  const isDashboardRoute = pathname?.startsWith("/dashboard");

  // Register service worker sekali saja saat komponen mount.
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    if (process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.error("PWA Service Worker gagal didaftarkan:", error);
      });
      return;
    }

    // Kalau app ini PERNAH dijalankan dalam mode production (npm run build
    // && npm start) di browser yang sama, service worker-nya akan tetap
    // aktif walau sekarang kembali ke `npm run dev`. Karena sw.js memakai
    // strategi cache-first untuk /_next/static/*, dia bisa terus nyajiin
    // chunk JS versi LAMA meski server dev sudah render HTML dari kode
    // terbaru -- inilah penyebab React Hydration Error yang "muncul sekali
    // lalu hilang setelah refresh". Supaya tidak kejadian lagi, matikan &
    // bersihkan semua service worker + cache-nya setiap kali app dijalankan
    // dalam mode development.
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => registration.unregister());
    });

    if ("caches" in window) {
      caches.keys().then((keys) => {
        keys
          .filter((key) => key.startsWith("anak-tumbuh-guru-"))
          .forEach((key) => caches.delete(key));
      });
    }
  }, []);

  // Kirim ulang data yang sempat diantrekan (IndexedDB) selagi offline.
  // Jalan otomatis saat app dibuka dalam kondisi online, dan setiap kali
  // koneksi berubah dari offline -> online, dari halaman mana pun.
  useEffect(() => {
    if (!online) return;

    let cancelled = false;

    const runSync = async () => {
      const result = await syncPendingOfflineRecords();
      if (cancelled) return;

      if (result.synced > 0) {
        setSyncedMessage(
          `${result.synced} data offline berhasil disinkronkan ke server.`
        );
        dispatch(fetchClassroomDashboard());
        setTimeout(() => setSyncedMessage(null), 4000);
      }
    };

    runSync();

    return () => {
      cancelled = true;
    };
  }, [online, dispatch]);

  // Toast konfirmasi sinkronisasi ini boleh muncul di halaman mana saja
  // (termasuk dashboard), karena di situlah form-form offline dipakai.
  if (syncedMessage) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="fixed bottom-4 left-1/2 z-[100000] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900 shadow-lg"
      >
        <div className="flex items-start gap-3">
          <span aria-hidden="true" className="text-lg">
            ✅
          </span>
          <p>{syncedMessage}</p>
        </div>
      </div>
    );
  }

  if (online || isDashboardRoute) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-1/2 z-[100000] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900 shadow-lg"
    >
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="text-lg">
          ⚠️
        </span>
        <div>
          <p>Koneksi sedang offline</p>
          <p className="mt-1 text-xs font-medium text-amber-800">
            Data yang nanti disimpan secara offline akan menunggu sinkronisasi
            setelah koneksi kembali.
          </p>
        </div>
      </div>
    </div>
  );
}
