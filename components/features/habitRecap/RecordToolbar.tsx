"use client";

import { FiFilter, FiSliders } from "react-icons/fi";
import SearchInput from "@/components/ui/Search/SearchInput";
import FilterSelect from "@/components/ui/Input/FilterSelect";
import { HABIT_SORT_OPTIONS, HABIT_STATUS_FILTER_OPTIONS } from "@/lib/constants/habitRecapConfig";
import { HabitSortBy, HabitStatusFilter } from "@/lib/types/habitRecapType";

type RecordToolbarProps = {
  query: string;
  statusFilter: HabitStatusFilter;
  sortBy: HabitSortBy;
  onQueryChange: (value: string) => void;
  onStatusChange: (value: HabitStatusFilter) => void;
  onSortChange: (value: HabitSortBy) => void;
};

export default function RecordToolbar({
  query,
  statusFilter,
  sortBy,
  onQueryChange,
  onStatusChange,
  onSortChange,
}: RecordToolbarProps) {
  return (
    <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
      <div className="sm:w-52">
        <SearchInput placeholder="Cari nama siswa atau NIS..." value={query} onChange={(event) => onQueryChange(event.target.value)} />
      </div>
      <FilterSelect
        ariaLabel="Filter status laporan"
        icon={FiFilter}
        value={statusFilter}
        options={HABIT_STATUS_FILTER_OPTIONS}
        onValueChange={onStatusChange}
        className="sm:w-44"
      />
      <FilterSelect
        ariaLabel="Urutkan siswa"
        icon={FiSliders}
        value={sortBy}
        options={HABIT_SORT_OPTIONS}
        onValueChange={onSortChange}
        className="sm:w-52"
      />
    </div>
  );
}
