"use client";

import { useEffect, useState } from "react";

export default function PwaBootstrap() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);

    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Register only in production to avoid interfering with Next.js dev mode.
    if (
      process.env.NODE_ENV === "production" &&
      "serviceWorker" in navigator
    ) {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.error("PWA Service Worker gagal didaftarkan:", error);
      });
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (online) return null;

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
