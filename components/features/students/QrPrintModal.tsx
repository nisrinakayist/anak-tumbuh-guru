"use client";

import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import JSZip from "jszip";
import { CiViewList, CiExport } from "react-icons/ci";
import { StudentCredential } from "@/lib/types/studentAccountType";
import QrCard from "@/components/features/students/QrCard";
import SearchInput from "@/components/ui/Search/SearchInput";

type QrPrintModalProps = {
  credentials: StudentCredential[];
  onClose: () => void;
};

const buildQrToken = (nis: string) => `ANAKTUMBUH-${nis}`;

function QrPrintModal({ credentials, onClose }: QrPrintModalProps) {
  const [query, setQuery] = useState("");
  const [qrDataUrls, setQrDataUrls] = useState<Record<number, string>>({});
  const [isZipping, setIsZipping] = useState(false);

  // Generate semua QR sekali di sini (bukan per-kartu), supaya data URL-nya
  // bisa dipakai ulang baik untuk ditampilkan maupun untuk di-zip.
  useEffect(() => {
    let cancelled = false;

    Promise.all(
      credentials.map(async (credential) => {
        const dataUrl = await QRCode.toDataURL(buildQrToken(credential.nis), {
          margin: 1,
          width: 200,
        });
        return [credential.student_id, dataUrl] as const;
      })
    ).then((entries) => {
      if (cancelled) return;
      setQrDataUrls(Object.fromEntries(entries));
    });

    return () => {
      cancelled = true;
    };
  }, [credentials]);

  const filteredCredentials = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return credentials;
    return credentials.filter(
      (credential) =>
        credential.name.toLowerCase().includes(keyword) ||
        credential.nis.toLowerCase().includes(keyword)
    );
  }, [credentials, query]);

  const handleDownloadAll = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      filteredCredentials.forEach((credential) => {
        const dataUrl = qrDataUrls[credential.student_id];
        if (!dataUrl) return;
        const base64 = dataUrl.split(",")[1];
        const fileName = `qr-${credential.nis}-${credential.name.replace(/\s+/g, "-").toLowerCase()}.png`;
        zip.file(fileName, base64, { base64: true });
      });

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "qr-siswa.zip";
      anchor.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-900/50 p-4 backdrop-blur-sm print:static print:bg-white print:p-0 print:backdrop-blur-none">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl print:max-h-none print:max-w-none print:rounded-none print:shadow-none">
        <div className="flex flex-col gap-3 border-b border-primary-50 px-5 py-4 print:hidden sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-primary-500">
              Akun &amp; QR Siswa
            </p>
            <h2 className="mt-1 text-lg font-black text-primary-900">
              QR Siap Dicetak ({filteredCredentials.length})
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadAll}
              disabled={isZipping || !filteredCredentials.length}
              className="inline-flex items-center gap-1.5 rounded-xl border border-primary-200 px-3.5 py-2.5 text-xs font-black text-primary-900 transition hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CiExport size={16} />
              {isZipping ? "Menyiapkan..." : "Unduh Semua (ZIP)"}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary-500 px-4 py-2.5 text-xs font-black text-white transition hover:bg-primary-600"
            >
              <CiViewList size={16} />
              Cetak
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-primary-900/50 transition hover:bg-primary-50"
              aria-label="Tutup"
            >
              ×
            </button>
          </div>
        </div>

        <div className="border-b border-primary-50 px-5 py-3 print:hidden">
          <SearchInput
            placeholder="Cari nama atau NIS siswa..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <div className="grid flex-1 grid-cols-2 gap-4 overflow-y-auto p-5 sm:grid-cols-3 print:grid-cols-3 print:overflow-visible print:p-6">
          {filteredCredentials.map((credential) => (
            <QrCard
              key={credential.student_id}
              name={credential.name}
              nis={credential.nis}
              dataUrl={qrDataUrls[credential.student_id] ?? null}
            />
          ))}

          {!filteredCredentials.length && (
            <div className="col-span-full p-10 text-center text-sm font-semibold text-primary-900/50">
              Tidak ada siswa yang sesuai pencarian.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QrPrintModal;
