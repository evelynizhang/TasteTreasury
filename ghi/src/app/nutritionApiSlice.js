import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const APP_ID = "526d1275";
const APP_KEY = "02cad011fb066788c97e41f9d8477dd7";
const api_url = `https://api.edamam.com/api/nutrition-details?app_id=${APP_ID}&app_key=${APP_KEY}`;

export const nutritionApi = createApi({
  reducerPath: "nutritionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api_url,
  }),
  endpoints: (builder) => ({
    createNutrition: builder.mutation({
      query: (body) => ({
        // url: "",
        method: "POST",
        body,
      }),
      providesTags: ["Nutrition"],
    }),
  }),
});

export const { useCreateNutritionMutation } = nutritionApi;
