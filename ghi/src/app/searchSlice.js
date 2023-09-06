import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    reset: (state) => {
      state.value = "";
    },
    search: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { search, reset } = searchSlice.actions;
export default searchSlice.reducer;
