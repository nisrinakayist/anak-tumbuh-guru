import DownloadQrButton from "@/components/features/students/DownloadQrButton";

type QrCardProps = {
  name: string;
  nis: string;
  dataUrl: string | null;
};

function QrCard({ name, nis, dataUrl }: QrCardProps) {
  const fileName = `qr-${nis}-${name.replace(/\s+/g, "-").toLowerCase()}.png`;

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

      {dataUrl && <DownloadQrButton qrDataUrl={dataUrl} fileName={fileName} />}
    </div>
  );
}

export default QrCard;
