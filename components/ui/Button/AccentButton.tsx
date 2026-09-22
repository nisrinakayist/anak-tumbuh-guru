"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { IconType } from "react-icons";

type AccentButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  icon?: IconType;
};

// Tombol aksi berwarna kuning (aksen brand), dipakai untuk CTA di atas banner biru.
export default function AccentButton({ children, icon: Icon, className = "", ...rest }: AccentButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-secondary-500 px-4 py-2.5 text-xs font-black text-primary-900 shadow-sm transition hover:brightness-95 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...rest}
    >
      {Icon && <Icon size={15} />}
      {children}
    </button>
  );
}
