import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import roomService from "../../services/roomServices";

const initialState = {
  rooms: [],
  isLoading: false,
  isError: false,
  message: "",
};

// Fetch all study rooms
export const fetchRooms = createAsyncThunk(
  "rooms/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await roomService.getRooms();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default roomSlice.reducer;
