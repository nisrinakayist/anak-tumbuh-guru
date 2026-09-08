import {
  getStudentCredentialsApi,
  generateStudentAccountsApi,
  revokeStudentQrApi,
} from "@/lib/api/studentAccountApi";
import { StudentCredential } from "@/lib/types/studentAccountType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface StudentAccountState {
  credentials: StudentCredential[];
  loading: boolean;
  error: string | null;
  generating: boolean;
  generateMessage: string | null;
}

const initialState: StudentAccountState = {
  credentials: [],
  loading: false,
  error: null,
  generating: false,
  generateMessage: null,
};

export const fetchStudentCredentials = createAsyncThunk(
  "studentAccount/fetchCredentials",
  async () => {
    const response = await getStudentCredentialsApi();
    return response;
  }
);

export const generateStudentAccounts = createAsyncThunk(
  "studentAccount/generateAccounts",
  async (studentIds: number[]) => {
    const response = await generateStudentAccountsApi(studentIds);
    return response;
  }
);

export const revokeStudentQr = createAsyncThunk(
  "studentAccount/revokeQr",
  async (studentId: number) => {
    const response = await revokeStudentQrApi(studentId);
    return { studentId, response };
  }
);

const studentAccountSlice = createSlice({
  name: "studentAccount",
  initialState,
  reducers: {
    clearGenerateMessage: (state) => {
      state.generateMessage = null;
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
        if (action.payload.code === 200 && action.payload.data) {
          state.credentials = action.payload.data;
        } else {
          state.error = action.payload.message || "Gagal memuat data akun siswa";
        }
      })
      .addCase(fetchStudentCredentials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Gagal memuat data akun siswa";
      })

      .addCase(generateStudentAccounts.pending, (state) => {
        state.generating = true;
      })
      .addCase(generateStudentAccounts.fulfilled, (state, action) => {
        state.generating = false;
        if (action.payload.code === 200) {
          state.generateMessage = action.payload.message;
          state.credentials = state.credentials.map((credential) =>
            credential.account_status === "not_generated"
              ? { ...credential, account_status: "generated", qr_status: "active" }
              : credential
          );
        }
      })
      .addCase(generateStudentAccounts.rejected, (state) => {
        state.generating = false;
      })

      .addCase(revokeStudentQr.fulfilled, (state, action) => {
        if (action.payload.response.code === 200) {
          state.credentials = state.credentials.map((credential) =>
            credential.student_id === action.payload.studentId
              ? { ...credential, qr_status: "revoked" }
              : credential
          );
        }
      });
  },
});

export const { clearGenerateMessage } = studentAccountSlice.actions;
export default studentAccountSlice.reducer;
