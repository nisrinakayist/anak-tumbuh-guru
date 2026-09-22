import { getHabitRecapApi } from "@/lib/api/habitRecapApi";
import {
  HabitId,
  HabitPeriodId,
  HabitRecapData,
  HabitSortBy,
  HabitStatusFilter,
} from "@/lib/types/habitRecapType";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HabitRecapState {
  activeHabitId: HabitId | null;
  data: HabitRecapData | null;
  loading: boolean;
  notFound: boolean; // true = kebiasaan ini belum ada data dummy-nya
  error: string | null;

  // Kontrol tampilan (filter, urutan, halaman)
  period: HabitPeriodId;
  query: string;
  statusFilter: HabitStatusFilter;
  sortBy: HabitSortBy;
  page: number;

  // Siswa yang sudah diingatkan lewat tombol "Ingatkan"
  remindedIds: number[];
}

const initialState: HabitRecapState = {
  activeHabitId: null,
  data: null,
  loading: false,
  notFound: false,
  error: null,

  period: "this_week",
  query: "",
  statusFilter: "all",
  sortBy: "number",
  page: 1,

  remindedIds: [],
};

export const fetchHabitRecap = createAsyncThunk(
  "habitRecap/fetch",
  async ({ habitId, period }: { habitId: HabitId; period: HabitPeriodId }) => {
    const response = await getHabitRecapApi(habitId, period);
    return response;
  }
);

const habitRecapSlice = createSlice({
  name: "habitRecap",
  initialState,
  reducers: {
    // Dipanggil saat pindah menu Sidebar (habitId berubah): reset filter,
    // halaman, dan daftar "sudah diingatkan" milik kebiasaan sebelumnya.
    setActiveHabit: (state, action: PayloadAction<HabitId>) => {
      state.activeHabitId = action.payload;
      state.query = "";
      state.statusFilter = "all";
      state.sortBy = "number";
      state.page = 1;
      state.remindedIds = [];
    },
    setPeriod: (state, action: PayloadAction<HabitPeriodId>) => {
      state.period = action.payload;
      state.page = 1;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.page = 1;
    },
    setStatusFilter: (state, action: PayloadAction<HabitStatusFilter>) => {
      state.statusFilter = action.payload;
      state.page = 1;
    },
    setSortBy: (state, action: PayloadAction<HabitSortBy>) => {
      state.sortBy = action.payload;
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    remindStudent: (state, action: PayloadAction<number>) => {
      if (!state.remindedIds.includes(action.payload)) {
        state.remindedIds.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabitRecap.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHabitRecap.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.code === 200 && action.payload.data) {
          state.data = action.payload.data;
          state.notFound = false;
        } else if (action.payload.code === 404) {
          state.data = null;
          state.notFound = true;
        } else {
          state.data = null;
          state.notFound = false;
          state.error = action.payload.message || "Gagal memuat rekap kebiasaan";
        }
      })
      .addCase(fetchHabitRecap.rejected, (state, action) => {
        state.loading = false;
        state.notFound = false;
        state.error = action.error.message || "Gagal memuat rekap kebiasaan";
      });
  },
});

export const { setActiveHabit, setPeriod, setQuery, setStatusFilter, setSortBy, setPage, remindStudent } =
  habitRecapSlice.actions;
export default habitRecapSlice.reducer;
