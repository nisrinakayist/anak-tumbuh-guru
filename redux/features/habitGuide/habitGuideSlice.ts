import { getHabitGuidesApi, saveHabitGuideApi } from "@/lib/api/habitGuideApi";
import { HabitGuideMap } from "@/lib/types/habitGuideType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface HabitGuideState {
  guides: HabitGuideMap;
  loading: boolean;
  saving: boolean;
  error: string | null;
  saveMessage: string | null;
}

const initialState: HabitGuideState = {
  guides: {},
  loading: false,
  saving: false,
  error: null,
  saveMessage: null,
};

export const fetchHabitGuides = createAsyncThunk<HabitGuideMap, number, { rejectValue: string }>(
  "habitGuide/fetch",
  async (rombelId, { rejectWithValue }) => {
    const res = await getHabitGuidesApi(rombelId);
    return res.ok ? res.data : rejectWithValue(res.error.message);
  }
);

export const saveHabitGuide = createAsyncThunk<
  { habitCode: string; content: string },
  { rombelId: number; habitCode: string; content: string },
  { rejectValue: string }
>("habitGuide/save", async ({ rombelId, habitCode, content }, { rejectWithValue }) => {
  const res = await saveHabitGuideApi(rombelId, habitCode, content);
  return res.ok ? { habitCode, content: res.data?.content ?? "" } : rejectWithValue(res.error.message);
});

const habitGuideSlice = createSlice({
  name: "habitGuide",
  initialState,
  reducers: {
    clearSaveMessage: (state) => {
      state.saveMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabitGuides.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.saveMessage = null;
      })
      .addCase(fetchHabitGuides.fulfilled, (state, action) => {
        state.loading = false;
        state.guides = action.payload;
      })
      .addCase(fetchHabitGuides.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Gagal memuat panduan.";
      })
      .addCase(saveHabitGuide.pending, (state) => {
        state.saving = true;
        state.error = null;
        state.saveMessage = null;
      })
      .addCase(saveHabitGuide.fulfilled, (state, action) => {
        state.saving = false;
        const { habitCode, content } = action.payload;
        if (content) state.guides[habitCode] = content;
        else delete state.guides[habitCode];
        state.saveMessage = content ? "Panduan berhasil disimpan." : "Panduan dihapus.";
      })
      .addCase(saveHabitGuide.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload ?? "Gagal menyimpan panduan.";
      });
  },
});

export const { clearSaveMessage } = habitGuideSlice.actions;
export default habitGuideSlice.reducer;
