import { configureStore } from '@reduxjs/toolkit'
import { recipeApi } from "./apiSlice";


export const store = configureStore({
  reducer: {
    [recipeApi.reducerPath]: recipeApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipeApi.middleware),
})
