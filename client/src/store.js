import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import departmentReducer from "./department/departmentSlice";
import employeeSlice from "./employee/employeeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    departments: departmentReducer,
    employee: employeeSlice,
  },
});
