"use client";

import { FiBell, FiCheck } from "react-icons/fi";

type RemindButtonProps = {
  isReminded: boolean;
  onClick: () => void;
};

export default function RemindButton({ isReminded, onClick }: RemindButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isReminded}
      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-secondary-500/40 bg-secondary-100 px-2.5 py-1.5 text-[11px] font-black text-amber-700 transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isReminded ? <FiCheck size={12} /> : <FiBell size={12} />}
      {isReminded ? "Terkirim" : "Ingatkan"}
    </button>
  );
}
