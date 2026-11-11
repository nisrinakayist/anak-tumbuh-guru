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

export const fetchClassroomDashboard = createAsyncThunk<
  ClassroomDashboardData,
  void,
  { rejectValue: string }
>("classroom/fetchDashboard", async (_, { rejectWithValue }) => {
  const result = await getClassroomDashboardApi();
  if (!result.ok) return rejectWithValue(result.error.message);
  return result.data;
});

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
        state.classGroup = action.payload.class_group;
        state.summary = action.payload.summary;
        state.students = action.payload.students;
      })
      .addCase(fetchClassroomDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? "Gagal memuat data rombel";
      });
  },
});

export default classroomSlice.reducer;
