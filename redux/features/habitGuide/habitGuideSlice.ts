import { getHabitGuideApi, saveHabitGuideApi } from "@/lib/api/habitGuideApi";
import { SaveHabitGuidePayload } from "@/lib/types/habitGuideType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface HabitGuideState {
  contentHtml: string;
  loading: boolean;
  saving: boolean;
  error: string | null;
  saveMessage: string | null;
}

const initialState: HabitGuideState = {
  contentHtml: "",
  loading: false,
  saving: false,
  error: null,
  saveMessage: null,
};

export const fetchHabitGuide = createAsyncThunk(
  "habitGuide/fetch",
  async ({ habitId, classGroupId }: { habitId: string; classGroupId: number }) => {
    const response = await getHabitGuideApi(habitId, classGroupId);
    return response;
  }
);

export const saveHabitGuide = createAsyncThunk(
  "habitGuide/save",
  async (payload: SaveHabitGuidePayload) => {
    const response = await saveHabitGuideApi(payload);
    return response;
  }
);

const habitGuideSlice = createSlice({
  name: "habitGuide",
  initialState,
  reducers: {
    clearSaveMessage: (state) => {
      state.saveMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabitGuide.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.saveMessage = null;
      })
      .addCase(fetchHabitGuide.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.code === 200 && action.payload.data) {
          state.contentHtml = action.payload.data.content_html;
        } else {
          state.error = action.payload.message || "Gagal memuat panduan";
        }
      })
      .addCase(fetchHabitGuide.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Gagal memuat panduan";
      })

      .addCase(saveHabitGuide.pending, (state) => {
        state.saving = true;
      })
      .addCase(saveHabitGuide.fulfilled, (state, action) => {
        state.saving = false;
        if (action.payload.code === 200) {
          state.saveMessage = action.payload.message;
        }
      })
      .addCase(saveHabitGuide.rejected, (state) => {
        state.saving = false;
      });
  },
});

export const { clearSaveMessage } = habitGuideSlice.actions;
export default habitGuideSlice.reducer;
