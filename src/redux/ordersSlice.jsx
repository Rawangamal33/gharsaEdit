import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axios";

const initialState = {
  orders: [],
  order: [],
  orderStatus: null,
  ordersStatus: null,
  ordersFilter: {
    PageIndex: 1,
    PageSize: 10,
    OrderId: null,
  },
  totalPages: 0,
  // Add other state properties here
};

export const fetchOrders = createAsyncThunk(
  "order/fetch",
  async (ordersFilter, { getState, rejectWithValue }) => {
    const filter = { ...ordersFilter };
    const state = getState();
    const userRole = state.user.user.role; // جلب دور المستخدم من الـ Redux state

    // إذا كان المستخدم تاجرًا، نقوم بتصفية الطلبات حسب المنتج الذي يمتلكه
    if (userRole === "seller") {
      filter.productOwnerId = state.user.user.id;  // نضع معرف التاجر لتصفية الطلبات
    }

    try {
      const response = await instance.get("Order", { params: filter });
      return response.data.data;  // إرجاع البيانات المستلمة من الـ API
    } catch (error) {
      return rejectWithValue(error.message); // في حالة الخطأ
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  "order/fetchById",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await instance.get(`Order/${orderId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrdersFilter: (state, action) => {
      state.ordersFilter = {
        ...state.ordersFilter,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.ordersStatus = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.ordersStatus = "succeeded";
        const { items = [], count = 0, pageSize = 0 } = action.payload;
        state.orders = items;
        state.totalPages = Math.ceil(count / pageSize);
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.ordersStatus = "failed";
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.orderStatus = "loading";
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state) => {
        state.orderStatus = "failed";
      });
  },
});

export const { setOrdersFilter } = orderSlice.actions;

export default orderSlice.reducer;
