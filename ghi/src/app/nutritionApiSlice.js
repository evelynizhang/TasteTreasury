import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const id = process.env.REACT_APP_APP_ID;
const key = process.env.REACT_APP_APP_KEY;
const API_URL = `https://api.edamam.com/api/nutrition-details?app_id=${id}&app_key=${key}`;

export const nutritionApi = createApi({
  reducerPath: "nutritionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    createNutrition: builder.mutation({
      query: (body) => ({
        method: "POST",
        body,
      }),
      providesTags: ["Nutrition"],
    }),
  }),
});

export const { useCreateNutritionMutation } = nutritionApi;
