import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchWakeUpRecap,
  remindStudent,
  setPage,
  setPeriod,
  setQuery,
  setSortBy,
  setStatusFilter,
} from "@/redux/features/wakeUpRecap/wakeUpRecapSlice";
import { WAKE_UP_PAGE_SIZE } from "@/lib/constants/wakeUpRecap";
import { filterWakeUpRecords, paginateItems, sortWakeUpRecords } from "@/lib/utils/wakeUpRecap";
import { WakeUpPeriodId, WakeUpSortBy, WakeUpStatusFilter } from "@/lib/types/wakeUpRecapType";

// Ambil rekap bangun pagi lalu olah (filter -> urutkan -> pagination)
// supaya komponen UI cukup menerima data yang sudah siap tampil.
export default function useWakeUpRecap() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, period, query, statusFilter, sortBy, page, remindedIds } =
    useSelector((state: RootState) => state.wakeUpRecap);

  useEffect(() => {
    dispatch(fetchWakeUpRecap(period));
  }, [dispatch, period]);

  const filteredStudents = useMemo(() => {
    if (!data) return [];
    return sortWakeUpRecords(filterWakeUpRecords(data.students, query, statusFilter), sortBy);
  }, [data, query, statusFilter, sortBy]);

  const totalItems = filteredStudents.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / WAKE_UP_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * WAKE_UP_PAGE_SIZE;
  const pagedStudents = paginateItems(filteredStudents, currentPage, WAKE_UP_PAGE_SIZE);

  const handlePeriodChange = useCallback(
    (value: WakeUpPeriodId) => dispatch(setPeriod(value)),
    [dispatch]
  );
  const handleQueryChange = useCallback((value: string) => dispatch(setQuery(value)), [dispatch]);
  const handleStatusChange = useCallback(
    (value: WakeUpStatusFilter) => dispatch(setStatusFilter(value)),
    [dispatch]
  );
  const handleSortChange = useCallback(
    (value: WakeUpSortBy) => dispatch(setSortBy(value)),
    [dispatch]
  );
  const handlePageChange = useCallback((value: number) => dispatch(setPage(value)), [dispatch]);
  const handleRemind = useCallback((studentId: number) => dispatch(remindStudent(studentId)), [dispatch]);

  return {
    recap: data,
    loading,
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
