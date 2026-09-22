"use client";

import { CiSaveDown2 } from "react-icons/ci";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";

type SaveGuideButtonProps = {
  isSaving: boolean;
  onClick: () => void;
};

function SaveGuideButton({ isSaving, onClick }: SaveGuideButtonProps) {
  return (
    <div className="sm:w-56">
      <PrimaryButton type="button" isLoading={isSaving} onClick={onClick}>
        <span className="flex items-center gap-2">
          <CiSaveDown2 size={18} />
          Simpan Panduan
        </span>
      </PrimaryButton>
    </div>
  );
}

export default SaveGuideButton;
