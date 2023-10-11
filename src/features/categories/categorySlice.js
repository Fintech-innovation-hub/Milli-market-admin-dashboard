import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categoryId: JSON.parse(localStorage.getItem("categoryId")) || "",
  },
  reducers: {
    chooseCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
  },
});

export const { chooseCategoryId } = categoriesSlice.actions;

export default categoriesSlice.reducer;
