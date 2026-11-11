"use client";

import { useState } from "react";
import { CiBarcode, CiViewList } from "react-icons/ci";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";

type QrActionPanelProps = {
  selectedCount: number;
  readyToPrintCount: number;
  generating: boolean;
  onGenerate: () => void;
  onOpenPrintList: () => void;
};

// Panel aksi QR. Membuat QR baru membuat QR lama siswa tidak berlaku lagi
// (kartu yang sudah dicetak jadi tidak bisa dipakai), jadi selalu minta
// konfirmasi dulu.
function QrActionPanel({
  selectedCount,
  readyToPrintCount,
  generating,
  onGenerate,
  onOpenPrintList,
}: QrActionPanelProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = () => {
    setIsConfirming(false);
    onGenerate();
  };

  return (
    <div className="rounded-3xl border border-primary-100 bg-white p-5 shadow-sm">
      <p className="text-sm font-black text-primary-900">Buat &amp; Cetak QR</p>
      <p className="mt-1 text-xs font-semibold text-primary-900/55">
        Akun siswa sudah dibuat otomatis saat siswa ditambahkan. Pilih siswa lalu buat QR baru;
        setelah berhasil, QR bisa dicetak atau diunduh. QR hanya bisa ditampilkan sekali pada
        sesi ini, jadi cetak sebelum menutup halaman.
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onOpenPrintList}
          disabled={!readyToPrintCount}
          className="inline-flex items-center gap-2 rounded-2xl border border-primary-200 px-4 py-3 text-sm font-black text-primary-900 transition hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CiViewList size={18} />
          QR siap dicetak ({readyToPrintCount})
        </button>

        <div className="min-w-[220px] flex-1">
          <PrimaryButton
            type="button"
            isLoading={generating}
            disabled={selectedCount === 0}
            onClick={() => setIsConfirming(true)}
          >
            <span className="flex items-center gap-2">
              <CiBarcode size={18} />
              Buat QR Baru{selectedCount > 0 ? ` (${selectedCount})` : ""}
            </span>
          </PrimaryButton>
        </div>
      </div>

      {isConfirming && (
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-black text-amber-900">
            Buat QR baru untuk {selectedCount} siswa?
          </p>
          <p className="mt-1 text-xs font-semibold text-amber-800">
            QR lama milik siswa tersebut (termasuk kartu yang sudah dicetak) langsung tidak berlaku lagi.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={handleConfirm}
              className="rounded-xl bg-amber-600 px-4 py-2 text-xs font-black text-white transition hover:bg-amber-700"
            >
              Ya, buat QR baru
            </button>
            <button
              type="button"
              onClick={() => setIsConfirming(false)}
              className="rounded-xl border border-amber-300 px-4 py-2 text-xs font-black text-amber-900 transition hover:bg-amber-100"
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QrActionPanel;
