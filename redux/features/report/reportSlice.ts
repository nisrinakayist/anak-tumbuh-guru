import { getClassroomReportApi } from "@/lib/api/reportApi";
import { ReportFilter, ReportResult } from "@/lib/types/reportType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ReportState {
  result: ReportResult | null;
  loading: boolean;
  error: string | null;
}

const initialState: ReportState = {
  result: null,
  loading: false,
  error: null,
};

export const fetchClassroomReport = createAsyncThunk(
  "report/fetchClassroomReport",
  async (filter: ReportFilter) => {
    const response = await getClassroomReportApi(filter);
    return response;
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClassroomReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClassroomReport.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.code === 200 && action.payload.data) {
          state.result = action.payload.data;
        } else {
          state.error = action.payload.message || "Gagal memuat laporan";
        }
      })
      .addCase(fetchClassroomReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Gagal memuat laporan";
      });
  },
});

export default reportSlice.reducer;
