import {
  addStudentApi,
  commitStudentImportApi,
  previewStudentImportApi,
} from "@/lib/api/studentApi";
import {
  ImportCommitResult,
  ImportPreviewResult,
} from "@/lib/types/studentImportType";
import { AddStudentOutcome, AddStudentPayload } from "@/lib/types/studentType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type ImportStep = "idle" | "preview" | "done";

interface StudentState {
  addLoading: boolean;
  addError: string | null;
  addSuccessMessage: string | null;
  // Diisi saat data siswa tidak terkirim karena offline dan sudah diantrekan
  // ke IndexedDB (lihat lib/api/studentApi.ts, outcome "queued").
  addOfflineMessage: string | null;

  importStep: ImportStep;
  importLoading: boolean;
  importError: string | null;
  importPreview: ImportPreviewResult | null;
  importResult: ImportCommitResult | null;
}

const initialState: StudentState = {
  addLoading: false,
  addError: null,
  addSuccessMessage: null,
  addOfflineMessage: null,

  importStep: "idle",
  importLoading: false,
  importError: null,
  importPreview: null,
  importResult: null,
};

export const addStudent = createAsyncThunk<AddStudentOutcome, AddStudentPayload>(
  "student/add",
  async (payload) => addStudentApi(payload)
);

// File TIDAK disimpan di Redux (tidak serializable); wizard memegangnya dan
// mengirimnya lagi saat commit, sesuai kontrak backend.
export const previewStudentImport = createAsyncThunk<
  ImportPreviewResult,
  File,
  { rejectValue: string }
>("student/previewImport", async (file, { rejectWithValue }) => {
  const result = await previewStudentImportApi(file);
  if (!result.ok) return rejectWithValue(result.error.message);
  return result.data;
});

export const commitStudentImport = createAsyncThunk<
  ImportCommitResult,
  File,
  { rejectValue: string }
>("student/commitImport", async (file, { rejectWithValue }) => {
  const result = await commitStudentImportApi(file);
  if (!result.ok) return rejectWithValue(result.error.message);
  return result.data;
});

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    resetAddStudentStatus: (state) => {
      state.addError = null;
      state.addSuccessMessage = null;
      state.addOfflineMessage = null;
    },
    resetImportWizard: (state) => {
      state.importStep = "idle";
      state.importError = null;
      state.importPreview = null;
      state.importResult = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Tambah siswa manual
      .addCase(addStudent.pending, (state) => {
        state.addLoading = true;
        state.addError = null;
        state.addSuccessMessage = null;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.addLoading = false;
        state.addOfflineMessage = null;

        if (action.payload.kind === "saved") {
          state.addSuccessMessage = action.payload.message;
        } else if (action.payload.kind === "queued") {
          // Belum tersimpan di server, tapi data aman di antrean offline.
          state.addOfflineMessage = action.payload.message;
        } else {
          state.addError = action.payload.message;
        }
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.addLoading = false;
        state.addError = action.error.message || "Gagal menambahkan siswa";
      })

      // Preview import Excel
      .addCase(previewStudentImport.pending, (state) => {
        state.importLoading = true;
        state.importError = null;
      })
      .addCase(previewStudentImport.fulfilled, (state, action) => {
        state.importLoading = false;
        state.importPreview = action.payload;
        state.importStep = "preview";
      })
      .addCase(previewStudentImport.rejected, (state, action) => {
        state.importLoading = false;
        state.importError = action.payload ?? action.error.message ?? "File gagal divalidasi";
      })

      // Commit import
      .addCase(commitStudentImport.pending, (state) => {
        state.importLoading = true;
        state.importError = null;
      })
      .addCase(commitStudentImport.fulfilled, (state, action) => {
        state.importLoading = false;
        state.importResult = action.payload;
        state.importStep = "done";
      })
      .addCase(commitStudentImport.rejected, (state, action) => {
        state.importLoading = false;
        state.importError = action.payload ?? action.error.message ?? "Import gagal diproses";
      });
  },
});

export const { resetAddStudentStatus, resetImportWizard } = studentSlice.actions;
export default studentSlice.reducer;
