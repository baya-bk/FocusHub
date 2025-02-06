// src/features/studyRoom/roomSlice.js
import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [],
  },
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    addRoom: (state, action) => {
      state.rooms.push(action.payload);
    },
  },
});

export const { setRooms, addRoom } = roomSlice.actions;
export default roomSlice.reducer;
