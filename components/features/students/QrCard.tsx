"use client";

import { CiExport } from "react-icons/ci";

type QrCardProps = {
  name: string;
  nis: string;
  dataUrl: string | null;
};

function QrCard({ name, nis, dataUrl }: QrCardProps) {
  const handleDownload = () => {
    if (!dataUrl) return;
    const anchor = document.createElement("a");
    anchor.href = dataUrl;
    anchor.download = `qr-${nis}-${name.replace(/\s+/g, "-").toLowerCase()}.png`;
    anchor.click();
  };

  return (
    <div className="break-inside-avoid rounded-2xl border border-primary-100 p-4 text-center print:border-slate-300">
      {dataUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={dataUrl} alt={`QR Code ${name}`} className="mx-auto h-32 w-32" />
      ) : (
        <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-xl bg-primary-50 text-xs font-bold text-primary-900/40">
          Membuat QR...
        </div>
      )}
      <p className="mt-2 text-sm font-extrabold text-primary-900">{name}</p>
      <p className="text-xs text-primary-900/50">NIS {nis}</p>

      <button
        type="button"
        onClick={handleDownload}
        disabled={!dataUrl}
        className="mx-auto mt-3 flex items-center gap-1.5 rounded-lg border border-primary-200 px-2.5 py-1.5 text-[11px] font-black text-primary-900 transition hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-40 print:hidden"
      >
        <CiExport size={14} />
        Unduh PNG
      </button>
    </div>
  );
}

export default QrCard;
