import { configureStore } from '@reduxjs/toolkit'
import { recipeApi } from "./apiSlice";
import searchReducer from "./searchSlice"


export const store = configureStore({
  reducer: {
    [recipeApi.reducerPath]: recipeApi.reducer,
    search: searchReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipeApi.middleware),
})
