"use client";

import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import useCooldown from "@/hook/useCooldown";
import { RATE_LIMIT_MESSAGE } from "@/lib/api/client";
import {
  clearResetMessages,
  resetStudentPassword,
} from "@/redux/features/studentAccount/studentAccountSlice";
import TextInput from "@/components/ui/Input/TextInput";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";
import ErrorAlert from "@/components/ui/Alert/ErrorAlert";

type ResetPasswordModalProps = {
  studentId: number;
  studentName: string;
  onClose: () => void;
};

const MIN_PASSWORD_LENGTH = 8;

function ResetPasswordModal({ studentId, studentName, onClose }: ResetPasswordModalProps) {
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const { remaining, start: startCooldown } = useCooldown();
  const dispatch = useDispatch<AppDispatch>();
  const { resetBusy, resetMessage, resetError } = useSelector(
    (state: RootState) => state.studentAccount
  );

  const handleClose = () => {
    dispatch(clearResetMessages());
    onClose();
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLocalError(null);

    if (password.length < MIN_PASSWORD_LENGTH) {
      setLocalError(`Password baru minimal ${MIN_PASSWORD_LENGTH} karakter.`);
      return;
    }

    const result = await dispatch(resetStudentPassword({ studentId, newPassword: password }));
    if (resetStudentPassword.rejected.match(result) && result.payload === RATE_LIMIT_MESSAGE) {
      startCooldown();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-[2rem] bg-white p-5 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-sm font-extrabold text-primary-900">Reset Password Siswa</h2>
            <p className="mt-1 text-xs font-semibold text-primary-900/55">{studentName}</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl p-2 text-primary-900/50 transition hover:bg-primary-50"
            aria-label="Tutup"
          >
            ×
          </button>
        </div>

        {resetMessage ? (
          <div className="mt-4 space-y-4">
            <p className="rounded-2xl border border-emerald-100 bg-emerald-50 p-3 text-sm font-bold text-emerald-700">
              {resetMessage} Sampaikan password baru ke siswa/orang tua.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="w-full rounded-xl bg-primary-500 px-5 py-3 text-sm font-black text-white transition hover:bg-primary-600"
            >
              Selesai
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <TextInput
              label="Password Baru"
              name="new_password"
              type="text"
              placeholder={`Minimal ${MIN_PASSWORD_LENGTH} karakter`}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {(localError || resetError) && <ErrorAlert message={localError ?? resetError ?? ""} />}
            <PrimaryButton isLoading={resetBusy} disabled={remaining > 0}>
              {remaining > 0 ? `Coba lagi dalam ${remaining} detik` : "Reset Password"}
            </PrimaryButton>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPasswordModal;
