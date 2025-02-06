import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import roomReducer from "../features/studyRoom/roomSlice";
import timerReducer from "../features/timer/timerSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    rooms: roomReducer,
    timer: timerReducer,
  },
});

export default store;
