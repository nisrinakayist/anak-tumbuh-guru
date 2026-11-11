import {
  getStudentCredentialsApi,
  regenerateQrApi,
  resetStudentPasswordApi,
} from "@/lib/api/studentAccountApi";
import { StudentCredential } from "@/lib/types/studentAccountType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface StudentAccountState {
  credentials: StudentCredential[];
  loading: boolean;
  error: string | null;

  // QR yang dibuat pada sesi ini: student_id -> qr_payload. Hanya di memori
  // (backend tidak menyimpan payload), hilang saat halaman ditutup.
  qrPayloads: Record<number, string>;
  qrBusyIds: number[];
  qrMessage: string | null;
  qrError: string | null;

  resetBusy: boolean;
  resetMessage: string | null;
  resetError: string | null;
}

const initialState: StudentAccountState = {
  credentials: [],
  loading: false,
  error: null,

  qrPayloads: {},
  qrBusyIds: [],
  qrMessage: null,
  qrError: null,

  resetBusy: false,
  resetMessage: null,
  resetError: null,
};

export const fetchStudentCredentials = createAsyncThunk<
  StudentCredential[],
  void,
  { rejectValue: string }
>("studentAccount/fetchCredentials", async (_, { rejectWithValue }) => {
  const result = await getStudentCredentialsApi();
  if (!result.ok) return rejectWithValue(result.error.message);
  return result.data;
});

// Buat QR baru untuk beberapa siswa, SATU PER SATU (menghindari lonjakan
// request). Siswa yang gagal tidak menghentikan yang lain.
export const regenerateQrBatch = createAsyncThunk<
  { payloads: Record<number, string>; failed: { id: number; message: string }[] },
  number[]
>("studentAccount/regenerateQrBatch", async (studentIds) => {
  const payloads: Record<number, string> = {};
  const failed: { id: number; message: string }[] = [];

  for (const id of studentIds) {
    const result = await regenerateQrApi(id);
    if (result.ok) payloads[id] = result.data.qr_payload;
    else failed.push({ id, message: result.error.message });
  }

  return { payloads, failed };
});

export const resetStudentPassword = createAsyncThunk<
  void,
  { studentId: number; newPassword: string },
  { rejectValue: string }
>("studentAccount/resetPassword", async ({ studentId, newPassword }, { rejectWithValue }) => {
  const result = await resetStudentPasswordApi(studentId, newPassword);
  if (!result.ok) return rejectWithValue(result.error.message);
});

const studentAccountSlice = createSlice({
  name: "studentAccount",
  initialState,
  reducers: {
    clearQrMessages: (state) => {
      state.qrMessage = null;
      state.qrError = null;
    },
    clearResetMessages: (state) => {
      state.resetMessage = null;
      state.resetError = null;
    },
    // Dipanggil saat halaman ditutup: qr_payload bersifat rahasia.
    clearQrPayloads: (state) => {
      state.qrPayloads = {};
      state.qrMessage = null;
      state.qrError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentCredentials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentCredentials.fulfilled, (state, action) => {
        state.loading = false;
        state.credentials = action.payload;
      })
      .addCase(fetchStudentCredentials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? "Gagal memuat data siswa";
      })

      .addCase(regenerateQrBatch.pending, (state, action) => {
        state.qrBusyIds = [...new Set([...state.qrBusyIds, ...action.meta.arg])];
        state.qrMessage = null;
        state.qrError = null;
      })
      .addCase(regenerateQrBatch.fulfilled, (state, action) => {
        const { payloads, failed } = action.payload;
        state.qrBusyIds = state.qrBusyIds.filter((id) => !action.meta.arg.includes(id));
        Object.assign(state.qrPayloads, payloads);

        const successCount = Object.keys(payloads).length;
        if (successCount > 0) {
          state.qrMessage = `${successCount} QR baru berhasil dibuat. QR lama siswa tersebut tidak berlaku lagi.`;
        }
        if (failed.length > 0) {
          state.qrError = `${failed.length} QR gagal dibuat: ${failed[0].message}`;
        }
      })
      .addCase(regenerateQrBatch.rejected, (state, action) => {
        state.qrBusyIds = state.qrBusyIds.filter((id) => !action.meta.arg.includes(id));
        state.qrError = action.error.message || "Gagal membuat QR";
      })

      .addCase(resetStudentPassword.pending, (state) => {
        state.resetBusy = true;
        state.resetMessage = null;
        state.resetError = null;
      })
      .addCase(resetStudentPassword.fulfilled, (state) => {
        state.resetBusy = false;
        state.resetMessage = "Password siswa berhasil direset.";
      })
      .addCase(resetStudentPassword.rejected, (state, action) => {
        state.resetBusy = false;
        state.resetError = action.payload ?? action.error.message ?? "Gagal mereset password";
      });
  },
});

export const { clearQrMessages, clearResetMessages, clearQrPayloads } = studentAccountSlice.actions;
export default studentAccountSlice.reducer;
