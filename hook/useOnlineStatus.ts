import { useEffect, useState } from "react";

// Status online/offline browser, di-share ke komponen mana pun yang perlu
// (toast sinkronisasi di PwaBootstrap, banner offline di DashboardLayout)
// tanpa masing-masing pasang listener "online"/"offline" sendiri-sendiri.
export default function useOnlineStatus() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);

    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return online;
}
