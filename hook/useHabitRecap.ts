import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchHabitRecap,
  remindStudent,
  setActiveHabit,
  setPage,
  setPeriod,
  setQuery,
  setSortBy,
  setStatusFilter,
} from "@/redux/features/habitRecap/habitRecapSlice";
import { HABIT_PAGE_SIZE } from "@/lib/constants/habitRecapConfig";
import { filterHabitRecords, paginateItems, sortHabitRecords } from "@/lib/utils/habitRecap";
import { HabitId, HabitPeriodId, HabitSortBy, HabitStatusFilter } from "@/lib/types/habitRecapType";

// Ambil rekap kebiasaan (sesuai `habitId` yang sedang dibuka di Sidebar),
// lalu olah (filter -> urutkan -> pagination) supaya komponen UI cukup
// menerima data yang sudah siap tampil.
export default function useHabitRecap(habitId: HabitId) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, notFound, error, period, query, statusFilter, sortBy, page, remindedIds } =
    useSelector((state: RootState) => state.habitRecap);

  useEffect(() => {
    dispatch(setActiveHabit(habitId));
  }, [dispatch, habitId]);

  useEffect(() => {
    dispatch(fetchHabitRecap({ habitId, period }));
  }, [dispatch, habitId, period]);

  const filteredStudents = useMemo(() => {
    if (!data) return [];
    return sortHabitRecords(filterHabitRecords(data.students, query, statusFilter), sortBy);
  }, [data, query, statusFilter, sortBy]);

  const totalItems = filteredStudents.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / HABIT_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * HABIT_PAGE_SIZE;
  const pagedStudents = paginateItems(filteredStudents, currentPage, HABIT_PAGE_SIZE);

  const handlePeriodChange = useCallback((value: HabitPeriodId) => dispatch(setPeriod(value)), [dispatch]);
  const handleQueryChange = useCallback((value: string) => dispatch(setQuery(value)), [dispatch]);
  const handleStatusChange = useCallback(
    (value: HabitStatusFilter) => dispatch(setStatusFilter(value)),
    [dispatch]
  );
  const handleSortChange = useCallback((value: HabitSortBy) => dispatch(setSortBy(value)), [dispatch]);
  const handlePageChange = useCallback((value: number) => dispatch(setPage(value)), [dispatch]);
  const handleRemind = useCallback((studentId: number) => dispatch(remindStudent(studentId)), [dispatch]);

  return {
    recap: data,
    loading,
    notFound,
    error,
    period,
    query,
    statusFilter,
    sortBy,
    remindedIds,
    filteredStudents,
    pagedStudents,
    totalItems,
    totalPages,
    currentPage,
    startIndex,
    handlePeriodChange,
    handleQueryChange,
    handleStatusChange,
    handleSortChange,
    handlePageChange,
    handleRemind,
  };
}
