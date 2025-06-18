import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../axios";


const initialState = {
    categories:[],
    categoryStatus:null,
}

export const fetchCategories = createAsyncThunk(
    "fetchCategories/check",
    async () => {
        const response = await instance.get("Category");
        return response.data;
    }  // replace this with your API call  
    // Note: axios is assumed to be imported and configured elsewhere in your app.
 );

const categoriesSlice = createSlice({
    name:"categories",
    initialState,

    extraReducers: (bulider)=>{
        bulider
        .addCase(fetchCategories.pending, (state) => {
            state.categoryStatus = "loading";
        })
       .addCase(fetchCategories.fulfilled, (state, action) => {
         state.categoryStatus = "succeeded";
            state.categories = action.payload;
       })
       .addCase(fetchCategories.rejected, (state) => {
            state.categoryStatus = "failed";
       })
    }
}
)

export default categoriesSlice.reducer;