import { addStudentApi, validateStudentImportApi, commitStudentImportApi } from "@/lib/api/studentApi";
import { AddStudentPayload } from "@/lib/types/studentType";
import { ValidatedStudentImportRow } from "@/lib/types/studentImportType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type ImportStep = "idle" | "preview" | "done";

interface StudentState {
  addLoading: boolean;
  addError: string | null;
  addSuccessMessage: string | null;

  importStep: ImportStep;
  importLoading: boolean;
  importError: string | null;
  importRows: ValidatedStudentImportRow[];
  importValidCount: number;
  importInvalidCount: number;
  importedCount: number;
}

const initialState: StudentState = {
  addLoading: false,
  addError: null,
  addSuccessMessage: null,

  importStep: "idle",
  importLoading: false,
  importError: null,
  importRows: [],
  importValidCount: 0,
  importInvalidCount: 0,
  importedCount: 0,
};

export const addStudent = createAsyncThunk("student/add", async (payload: AddStudentPayload) => {
  const response = await addStudentApi(payload);
  return response;
});

export const validateStudentImport = createAsyncThunk("student/validateImport", async (file: File) => {
  const response = await validateStudentImportApi(file);
  return response;
});

export const commitStudentImport = createAsyncThunk(
  "student/commitImport",
  async (rows: ValidatedStudentImportRow[]) => {
    const response = await commitStudentImportApi(rows);
    return response;
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    resetAddStudentStatus: (state) => {
      state.addError = null;
      state.addSuccessMessage = null;
    },
    resetImportWizard: (state) => {
      state.importStep = "idle";
      state.importError = null;
      state.importRows = [];
      state.importValidCount = 0;
      state.importInvalidCount = 0;
      state.importedCount = 0;
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
        if (action.payload.code === 200) {
          state.addSuccessMessage = action.payload.message || "Siswa berhasil ditambahkan";
        } else {
          state.addError = action.payload.message || "Gagal menambahkan siswa";
        }
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.addLoading = false;
        state.addError = action.error.message || "Gagal menambahkan siswa";
      })

      // Validasi import Excel
      .addCase(validateStudentImport.pending, (state) => {
        state.importLoading = true;
        state.importError = null;
      })
      .addCase(validateStudentImport.fulfilled, (state, action) => {
        state.importLoading = false;
        if (action.payload.code === 200 && action.payload.data) {
          state.importRows = action.payload.data.rows;
          state.importValidCount = action.payload.data.valid_count;
          state.importInvalidCount = action.payload.data.invalid_count;
          state.importStep = "preview";
        } else {
          state.importError = action.payload.message || "File gagal divalidasi";
        }
      })
      .addCase(validateStudentImport.rejected, (state, action) => {
        state.importLoading = false;
        state.importError = action.error.message || "File gagal divalidasi";
      })

      // Commit import
      .addCase(commitStudentImport.pending, (state) => {
        state.importLoading = true;
        state.importError = null;
      })
      .addCase(commitStudentImport.fulfilled, (state, action) => {
        state.importLoading = false;
        if (action.payload.code === 200 && action.payload.data) {
          state.importedCount = action.payload.data.imported_count;
          state.importStep = "done";
        } else {
          state.importError = action.payload.message || "Import gagal dikomit";
        }
      })
      .addCase(commitStudentImport.rejected, (state, action) => {
        state.importLoading = false;
        state.importError = action.error.message || "Import gagal dikomit";
      });
  },
});

export const { resetAddStudentStatus, resetImportWizard } = studentSlice.actions;
export default studentSlice.reducer;
