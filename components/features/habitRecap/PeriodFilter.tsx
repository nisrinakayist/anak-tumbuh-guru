"use client";

import { FiCalendar, FiChevronDown } from "react-icons/fi";
import { HabitPeriodId } from "@/lib/types/habitRecapType";

type PeriodFilterOption = {
  value: HabitPeriodId;
  label: string;
  rangeLabel: string;
};

type PeriodFilterProps = {
  value: HabitPeriodId;
  options: PeriodFilterOption[];
  onChange: (value: HabitPeriodId) => void;
};

export default function PeriodFilter({ value, options, onChange }: PeriodFilterProps) {
  return (
    <div className="relative w-full sm:w-auto">
      <FiCalendar size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/80" />
      <select
        aria-label="Filter periode"
        value={value}
        onChange={(event) => onChange(event.target.value as HabitPeriodId)}
        className="w-full appearance-none rounded-xl border border-white/20 bg-white/10 py-2.5 pl-9 pr-9 text-xs font-bold text-white outline-none transition hover:bg-white/15 focus:ring-4 focus:ring-white/20"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-primary-900">
            {option.label} ({option.rangeLabel})
          </option>
        ))}
      </select>
      <FiChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/80" />
    </div>
  );
}
