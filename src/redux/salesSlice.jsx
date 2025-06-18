import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axios";

const initialState = {
  sales: [],
  salesStatus: null,
  salesFilter: {
    PageIndex: 1,
    PageSize: 10,
  },
  totalPages: 0,
};

export const fetchSales = createAsyncThunk(
  "fetchSales/fetch",
  async (salesFilter, { rejectWithValue }) => {
    const filter = { ...salesFilter };
    try {
      const response = await instance.get("Order/summary", {
        params: filter,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    setSalesFilter: (state, action) => {
      state.salesFilter = {
       ...state.salesFilter,
       ...action.payload,
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSales.pending, (state) => {
        state.salesStatus = "loading";
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.salesStatus = "succeeded";
        const { items = [], count = 0, pageSize = 0 } = action.payload;
        state.sales = items;
        state.totalPages = Math.ceil(count / pageSize);
      })
      .addCase(fetchSales.rejected, (state) => {
        state.salesStatus = "failed";
        state.sales = [];
      });
  },
});

export const { setSalesFilter } = salesSlice.actions;

export default salesSlice.reducer;
