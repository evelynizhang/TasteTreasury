import { configureStore } from "@reduxjs/toolkit";
import { recipeApi } from "./recipeApiSlice";
import searchReducer from "./searchSlice";
import { nutritionApi } from "./nutritionApiSlice";
import filterTagsReducer from "./tagsSlice";

export const store = configureStore({
  reducer: {
    [nutritionApi.reducerPath]: nutritionApi.reducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
    search: searchReducer,
    filterTags: filterTagsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      recipeApi.middleware,
      nutritionApi.middleware
    ),
});
