// /frontend/src/features/timer/timerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
  name: "timer",
  initialState: { timeLeft: 25 * 60, isRunning: false },
  reducers: {
    updateTimer(state, action) {
      state.timeLeft = action.payload.time;
      state.isRunning = action.payload.running;
    },
  },
});

export const { updateTimer } = timerSlice.actions;
export default timerSlice.reducer;
