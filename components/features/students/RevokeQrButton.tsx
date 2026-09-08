"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { CiTrash } from "react-icons/ci";
import { AppDispatch } from "@/redux/store";
import { revokeStudentQr } from "@/redux/features/studentAccount/studentAccountSlice";

type RevokeQrButtonProps = {
  studentId: number;
};

function RevokeQrButton({ studentId }: RevokeQrButtonProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleRevoke = () => {
    dispatch(revokeStudentQr(studentId));
    setIsConfirming(false);
  };

  if (isConfirming) {
    return (
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={handleRevoke}
          className="rounded-lg bg-red-600 px-2.5 py-1.5 text-[11px] font-black text-white"
        >
          Yakin?
        </button>
        <button
          type="button"
          onClick={() => setIsConfirming(false)}
          className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-black text-primary-900/60"
        >
          Batal
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsConfirming(true)}
      className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-2.5 py-1.5 text-[11px] font-black text-red-600 transition hover:bg-red-100"
    >
      <CiTrash size={14} />
      Revoke
    </button>
  );
}

export default RevokeQrButton;
