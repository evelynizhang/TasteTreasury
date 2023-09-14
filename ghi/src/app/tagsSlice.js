import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const recipeTagsSlice = createSlice({
  name: "recipeTags",
  initialState,
  reducers: {
    reset: (state) => {
      state.value = [];
    },
    // passing the tag to add to the list in payload
    add: (state, action) => {
      state.value.push(action.payload);
    },
    // passing a new list minus one tag in payload
    remove: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { reset, add, remove } = recipeTagsSlice.actions;
export default recipeTagsSlice.reducer;
