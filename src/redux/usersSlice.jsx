import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axios";

const initialState = {
  user: {},
  userStatus: "idle",
};

export const fetchUserById = createAsyncThunk(
  "fetchUserById/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const userId = localStorage.getItem("nameIdentifier");
      const response = await instance.get(`Account/${userId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.userStatus = "loading";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userStatus = "succeeded";
      })
      .addCase(fetchUserById.rejected, (state) => {
        state.userStatus = "failed";
        state.user = null;
      });
  },
});

export default userSlice.reducer;
