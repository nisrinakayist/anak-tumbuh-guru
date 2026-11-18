"use client";

import { useEffect, useState } from "react";
import { fetchProtectedImage } from "@/lib/api/client";

type StudentAvatarProps = {
  name: string;
  photo?: string | null;
  size?: number;
};

// Foto siswa dari endpoint terautentikasi (fetch -> blob). Bila belum ada
// foto (null/404), tampil inisial nama (backend tidak punya foto default).
function StudentAvatar({ name, photo, size = 36 }: StudentAvatarProps) {
  const [loaded, setLoaded] = useState<{ source: string; blob: string } | null>(null);

  useEffect(() => {
    if (!photo) return;
    let cancelled = false;
    let objectUrl: string | null = null;
    fetchProtectedImage(photo).then((blob) => {
      if (!blob) return;
      if (cancelled) return URL.revokeObjectURL(blob);
      objectUrl = blob;
      setLoaded({ source: photo, blob });
    });
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [photo]);

  const style = { width: size, height: size };
  if (photo && loaded?.source === photo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={loaded.blob} alt={name} style={style} className="rounded-full object-cover" />;
  }

  return (
    <span
      style={style}
      className="flex shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-black text-primary-500"
      aria-hidden
    >
      {name.trim().charAt(0).toUpperCase() || "?"}
    </span>
  );
}

export default StudentAvatar;
