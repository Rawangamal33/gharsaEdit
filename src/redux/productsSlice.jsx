import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axios";

const initialState = {
  products: [],
  productStatus: null,
  productFilter: {
    PageIndex: 1,
    PageSize: 10,
    CategoryId: null,
    SearchName: null,
    IsActive: false,
    UserId: null,
  },
  totalPages: 0,
};

export const fetchProducts = createAsyncThunk(
  "fetchProducts/products",
  async (productFilter, { rejectWithValue }) => {
    const filter = { ...productFilter };
    try {
      const response = await instance.get("Product", { params: filter });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  } // End of fetchProducts thunk
);
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductFilter: (state, action) => {
      state.productFilter = { ...state.productFilter, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
     .addCase(fetchProducts.pending, (state) => {
        state.productStatus = "loading";
      })
     .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productStatus = "succeeded";
        const {items=[], count = 0, pageSize = 0} = action.payload
        state.products = items;
        state.totalPages = Math.ceil(count / pageSize);
      })
     .addCase(fetchProducts.rejected, (state) => {
        state.productStatus = "failed";
      });
  }
});

export const { setProductFilter } = productSlice.actions;
export default productSlice.reducer;
