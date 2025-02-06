import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  time: 25 * 60, // Default 25 minutes
  isRunning: false,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer: (state) => {
      state.isRunning = true;
    },
    stopTimer: (state) => {
      state.isRunning = false;
    },
    resetTimer: (state) => {
      state.time = 25 * 60;
      state.isRunning = false;
    },
    decrementTime: (state) => {
      if (state.isRunning && state.time > 0) {
        state.time -= 1;
      }
    },
  },
});

export const { startTimer, stopTimer, resetTimer, decrementTime } =
  timerSlice.actions;
export default timerSlice.reducer;
