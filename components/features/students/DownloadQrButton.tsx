import { CiExport } from "react-icons/ci";

type DownloadQrButtonProps = {
  qrDataUrl: string;
  fileName: string;
};

function DownloadQrButton({ qrDataUrl, fileName }: DownloadQrButtonProps) {
  return (
    <a
      href={qrDataUrl}
      download={fileName}
      className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-primary-200 px-2.5 py-2 text-[11px] font-black text-primary-900 transition hover:bg-primary-50 print:hidden"
    >
      <CiExport size={14} />
      Download PNG
    </a>
  );
}

export default DownloadQrButton;
