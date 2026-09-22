"use client";

import { SelectHTMLAttributes } from "react";
import { IconType } from "react-icons";
import { FiChevronDown } from "react-icons/fi";

type FilterSelectOption<T extends string> = {
  label: string;
  value: T;
};

type FilterSelectProps<T extends string> = Omit<SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange"> & {
  value: T;
  options: readonly FilterSelectOption<T>[];
  onValueChange: (value: T) => void;
  icon?: IconType;
  ariaLabel: string;
};

// Dropdown ringkas (pill) untuk toolbar filter tabel. Tinggi & radius disamakan
// dengan SearchInput (py-2.5, rounded-xl) supaya sejajar dalam satu baris.
export default function FilterSelect<T extends string>({
  value,
  options,
  onValueChange,
  icon: Icon,
  ariaLabel,
  className = "",
  ...rest
}: FilterSelectProps<T>) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      {Icon && <Icon size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-primary-900/45" />}
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(event) => onValueChange(event.target.value as T)}
        className={`w-full appearance-none rounded-xl border border-primary-100 bg-white py-2.5 pr-8 text-xs font-bold text-primary-900 outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 ${
          Icon ? "pl-9" : "pl-3"
        }`}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FiChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-primary-900/45" />
    </div>
  );
}
