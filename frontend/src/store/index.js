import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/redux/auth.slice";
import tasksReducer from "@/features/tasks/redux/tasks.slice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
});
