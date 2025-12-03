import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  selected: null,
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    tasksStart(state) {
      state.loading = true;
      state.error = null;
    },
    tasksSuccess(state, action) {
      state.loading = false;
      state.items = action.payload || [];
      state.error = null;
    },
    tasksFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    taskSelected(state, action) {
      state.selected = action.payload;
    },
    taskCreated(state, action) {
      state.loading = false;
      state.items = [action.payload, ...state.items];
      state.error = null;
    },
    taskUpdated(state, action) {
      state.loading = false;
      state.items = state.items.map((task) =>
        task.id === action.payload?.id ? { ...task, ...action.payload } : task
      );
      state.error = null;
    },
    taskRemoved(state, action) {
      state.loading = false;
      state.items = state.items.filter((task) => task.id !== action.payload);
      state.error = null;
    },
  },
});

export const {
  tasksStart,
  tasksSuccess,
  tasksFailure,
  taskSelected,
  taskCreated,
  taskUpdated,
  taskRemoved,
} = tasksSlice.actions;

export default tasksSlice.reducer;
