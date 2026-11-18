"use client";

import { ChangeEvent, useRef, useState } from "react";
import { PHOTO_ACCEPT, validatePhotoFile } from "@/lib/utils/photoFile";

type PhotoInputProps = {
  label?: string;
  onChange: (file: File | null) => void;
};

// Pilih foto (opsional) dengan validasi tipe dan ukuran di sisi FE.
function PhotoInput({ label = "Foto (opsional)", onChange }: PhotoInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    if (inputRef.current) inputRef.current.value = "";
    setFileName(null);
    onChange(null);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return reset();

    const problem = validatePhotoFile(file);
    setError(problem);
    if (problem) return reset();

    setFileName(file.name);
    onChange(file);
  };

  return (
    <div>
      <label className="block text-xs font-black uppercase tracking-wider text-primary-900">
        {label}
      </label>
      <input
        ref={inputRef}
        type="file"
        accept={PHOTO_ACCEPT}
        onChange={handleChange}
        className="mt-2 block w-full text-xs font-semibold text-primary-900 file:mr-3 file:rounded-xl file:border-0 file:bg-primary-500 file:px-4 file:py-2.5 file:text-xs file:font-black file:text-white hover:file:bg-primary-600"
      />
      <p className="mt-1 text-xs font-semibold text-primary-900/55">
        JPG, PNG, atau WebP. Maks. 2 MB.
      </p>
      {fileName && (
        <button type="button" onClick={reset} className="mt-1 text-xs font-bold text-red-500 hover:underline">
          Hapus pilihan
        </button>
      )}
      {error && <p className="mt-1 text-xs font-bold text-red-600">{error}</p>}
    </div>
  );
}

export default PhotoInput;
