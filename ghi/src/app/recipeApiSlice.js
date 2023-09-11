import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recipeApi = createApi({
  reducerPath: "recipeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_HOST,
  }),
  endpoints: (builder) => ({
    getToken: builder.query({
      query: () => ({
        url: "/token",
        credentials: "include",
      }),
      transformResponse: (response) => response?.account || null,
      providesTags: ["Account"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/token",
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Account", { type: "Recipe", id: "MINE" }],
    }),

    login: builder.mutation({
      query: (info) => {
        const formData = new FormData();
        formData.append("username", info.username);
        formData.append("password", info.password);
        return {
          url: "/token",
          method: "POST",
          body: formData,
          credentials: "include",
        };
      },
      invalidatesTags: ["Account", { type: "Recipe", id: "MINE" }],
    }),

    signup: builder.mutation({
      query: (body) => {
        return {
          url: "/api/accounts",
          method: "POST",
          body,
          credentials: "include",
        };
      },
      invalidatesTags: ["Account", { type: "Recipe", id: "MINE" }],
    }),

    getAccounts: builder.query({
      query: () => ({
        url: "api/accounts",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Account"],
    }),

    getAllRecipes: builder.query({
      query: () => ({
        url: "api/recipes",
        method: "GET",
        credentials: "include",
      }),
      providesTags: [{ type: "Recipe", id: "ALL" }],
    }),

    getMyRecipes: builder.query({
      query: () => ({
        url: "api/recipes/mine",
        method: "GET",
        credentials: "include",
      }),
      providesTags: [{ type: "Recipe", id: "MINE" }],
    }),

    getAllTags: builder.query({
      query: () => ({
        url: "api/tags",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Tags"],
    }),

    createRecipe: builder.mutation({
      query: (body) => ({
        url: "api/recipes",
        method: "POST",
        body,
        credentials: "include",
      }),
      invalidatesTags: [
        { type: "Recipe", id: "ALL" },
        { type: "Recipe", id: "MINE" },
      ],
    }),

    getSingleRecipe: builder.query({
      query: (recipe_id) => ({
        url: `api/recipes/${recipe_id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: (arg) => {
        return [{ type: "Recipe", id: arg }];
      },
    }),

    deleteRecipe: builder.mutation({
      query: (recipe_id) => ({
        url: `api/recipes/${recipe_id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Recipe"],
    }),

    updateRecipe: builder.mutation({
      query: ({ recipe_id, ...body }) => {
        return {
          url: `api/recipes/${recipe_id}`,
          method: "PUT",
          body,
          credentials: "include",
        };
      },
      invalidatesTags: ["Recipe"],
    }),
  }),
});

export const {
  useGetTokenQuery,
  useLogoutMutation,
  useLoginMutation,
  useSignupMutation,
  useGetAccountsQuery,
  useGetAllRecipesQuery,
  useGetMyRecipesQuery,
  useGetAllTagsQuery,
  useCreateRecipeMutation,
  useGetSingleRecipeQuery,
  useDeleteRecipeMutation,
  useUpdateRecipeMutation,
} = recipeApi;
