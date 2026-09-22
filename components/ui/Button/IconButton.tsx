"use client";

import { ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: IconType;
  label: string; // dipakai untuk aria-label & tooltip
};

export default function IconButton({ icon: Icon, label, className = "", ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`grid h-8 w-8 place-items-center rounded-lg text-primary-500 transition hover:bg-primary-50 hover:text-primary-700 ${className}`}
      {...rest}
    >
      <Icon size={16} />
    </button>
  );
}
