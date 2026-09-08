import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import classroomSlice from "./features/classroom/classroomSlice";
import studentSlice from "./features/students/studentSlice";
import reportSlice from "./features/report/reportSlice";
import studentAccountSlice from "./features/studentAccount/studentAccountSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    classroom: classroomSlice,
    student: studentSlice,
    report: reportSlice,
    studentAccount: studentAccountSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
