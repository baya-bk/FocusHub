// src/features/timer/timerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
  name: "timer",
  initialState: {
    time: 0,
    isActive: false,
  },
  reducers: {
    startTimer: (state) => {
      state.isActive = true;
    },
    stopTimer: (state) => {
      state.isActive = false;
    },
    resetTimer: (state) => {
      state.time = 0;
      state.isActive = false;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
  },
});

export const { startTimer, stopTimer, resetTimer, setTime } =
  timerSlice.actions;
export default timerSlice.reducer;
