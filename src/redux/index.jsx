import { configureStore } from "@reduxjs/toolkit";
import categorySliceReducer from "./categoriesSlice";
import productsSliceReducer from "./productsSlice";
import ordersSliceReducer from "./ordersSlice";
import salesSliceReducer from "./salesSlice";
import userSliceReducer from "./usersSlice";
const store = configureStore({
  reducer: {
    // Define your reducers here
    categories: categorySliceReducer,
    products: productsSliceReducer,
    orders: ordersSliceReducer,
    sales: salesSliceReducer,
    user: userSliceReducer,
    // Add your slice reducers here
  },
});

export default store;
