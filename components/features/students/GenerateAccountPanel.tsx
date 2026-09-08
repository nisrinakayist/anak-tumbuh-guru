"use client";

import { CiCirclePlus, CiViewList } from "react-icons/ci";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";

type GenerateAccountPanelProps = {
  pendingCount: number;
  selectedCount: number;
  readyToPrintCount: number;
  generating: boolean;
  onGenerate: () => void;
  onOpenPrintList: () => void;
};

function GenerateAccountPanel({
  pendingCount,
  selectedCount,
  readyToPrintCount,
  generating,
  onGenerate,
  onOpenPrintList,
}: GenerateAccountPanelProps) {
  return (
    <div className="rounded-3xl border border-primary-100 bg-white p-5 shadow-sm">
      <p className="text-sm font-black text-primary-900">Generate Akun & QR</p>
      <p className="mt-1 text-xs font-semibold text-primary-900/55">
        Pilih target di sini, lalu Generate Akun &amp; QR. Setelah berhasil, semua QR hasil generate
        tersedia bersama untuk dicetak/diunduh.
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
            disabled={pendingCount === 0 || selectedCount === 0}
            onClick={onGenerate}
          >
            <span className="flex items-center gap-2">
              <CiCirclePlus size={18} />
              Generate Akun &amp; QR{selectedCount > 0 ? ` (${selectedCount})` : ""}
            </span>
          </PrimaryButton>
        </div>
      </div>

      {pendingCount === 0 && (
        <p className="mt-3 text-xs font-semibold text-emerald-600">
          Semua siswa di rombelmu sudah punya akun & QR.
        </p>
      )}
    </div>
  );
}

export default GenerateAccountPanel;
