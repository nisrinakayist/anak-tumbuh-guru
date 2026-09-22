import { getWakeUpRecapApi } from "@/lib/api/wakeUpRecapApi";
import {
  WakeUpPeriodId,
  WakeUpRecapData,
  WakeUpSortBy,
  WakeUpStatusFilter,
} from "@/lib/types/wakeUpRecapType";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WakeUpRecapState {
  data: WakeUpRecapData | null;
  loading: boolean;
  error: string | null;

  // Kontrol tampilan (filter, urutan, halaman)
  period: WakeUpPeriodId;
  query: string;
  statusFilter: WakeUpStatusFilter;
  sortBy: WakeUpSortBy;
  page: number;

  // Siswa yang sudah diingatkan lewat tombol "Ingatkan"
  remindedIds: number[];
}

const initialState: WakeUpRecapState = {
  data: null,
  loading: false,
  error: null,

  period: "this_week",
  query: "",
  statusFilter: "all",
  sortBy: "number",
  page: 1,

  remindedIds: [],
};

export const fetchWakeUpRecap = createAsyncThunk(
  "wakeUpRecap/fetch",
  async (period: WakeUpPeriodId) => {
    const response = await getWakeUpRecapApi(period);
    return response;
  }
);

const wakeUpRecapSlice = createSlice({
  name: "wakeUpRecap",
  initialState,
  reducers: {
    setPeriod: (state, action: PayloadAction<WakeUpPeriodId>) => {
      state.period = action.payload;
      state.page = 1;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.page = 1;
    },
    setStatusFilter: (state, action: PayloadAction<WakeUpStatusFilter>) => {
      state.statusFilter = action.payload;
      state.page = 1;
    },
    setSortBy: (state, action: PayloadAction<WakeUpSortBy>) => {
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
      .addCase(fetchWakeUpRecap.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWakeUpRecap.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.code === 200 && action.payload.data) {
          state.data = action.payload.data;
        } else {
          state.error = action.payload.message || "Gagal memuat rekap bangun pagi";
        }
      })
      .addCase(fetchWakeUpRecap.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Gagal memuat rekap bangun pagi";
      });
  },
});

export const { setPeriod, setQuery, setStatusFilter, setSortBy, setPage, remindStudent } =
  wakeUpRecapSlice.actions;
export default wakeUpRecapSlice.reducer;
