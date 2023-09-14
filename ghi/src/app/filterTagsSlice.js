import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const filterTagsSlice = createSlice({
  name: "filterTags",
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
      state.value.splice(action.payload, 1);
    },
  },
});

export const { reset, add, remove } = filterTagsSlice.actions;
export default filterTagsSlice.reducer;
