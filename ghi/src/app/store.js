import { configureStore } from "@reduxjs/toolkit";
import { recipeApi } from "./apiSlice";
import searchReducer from "./searchSlice";
import { nutritionApi } from "./nutritionApiSlice";

export const store = configureStore({
  reducer: {
    [nutritionApi.reducerPath]: nutritionApi.reducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      recipeApi.middleware,
      nutritionApi.middleware
    ),
});
