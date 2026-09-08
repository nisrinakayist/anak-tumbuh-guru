import { getClassroomDashboardApi } from "@/lib/api/classroomApi";
import { ClassroomDashboardData } from "@/lib/types/classroomType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ClassroomState {
  classGroup: ClassroomDashboardData["class_group"] | null;
  summary: ClassroomDashboardData["summary"] | null;
  students: ClassroomDashboardData["students"];
  loading: boolean;
  error: string | null;
}

const initialState: ClassroomState = {
  classGroup: null,
  summary: null,
  students: [],
  loading: false,
  error: null,
};

export const fetchClassroomDashboard = createAsyncThunk(
  "classroom/fetchDashboard",
  async () => {
    const response = await getClassroomDashboardApi();
    return response;
  }
);

const classroomSlice = createSlice({
  name: "classroom",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClassroomDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClassroomDashboard.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.code === 200 && action.payload.data) {
          state.classGroup = action.payload.data.class_group;
          state.summary = action.payload.data.summary;
          state.students = action.payload.data.students;
        } else {
          state.error = action.payload.message || "Gagal memuat data rombel";
        }
      })
      .addCase(fetchClassroomDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Gagal memuat data rombel";
      });
  },
});

export default classroomSlice.reducer;
