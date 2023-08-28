import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const recipeApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_HOST,
  }),
  endpoints: (builder) => ({
    getToken: builder.query({
      query: () => ({
        url: '/token',
        credentials: 'include'
      }),
      transformResponse: (response) => response?.account || null,
      providesTags: ["Account"]
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/token',
        method: "DELETE",
        credentials: 'include'
      }),
      invalidatesTags: ["Account"]
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
          credentials: "include"
        }
      },
      invalidatesTags: ["Account"]
    }),

    signup: builder.mutation({
      query: (body) => {
        return {
          url: "/api/accounts",
          method: "POST",
          body,
          credentials: "include"
        }
      },
      invalidatesTags: ["Account"]
    }),

    getRecipe: builder.query({
      query: () => ({
          url: "api/recipes",
          method: "GET",
          credentials: "include"
      }),
      providesTags: ["Recipe"]
    }),

    getAccounts: builder.query({
      query: () => ({
        url: "api/accounts",
        method: "GET",
        credentials: "include"
      }),
      providesTags: ["Account"]
    }),

    getMineRecipe: builder.query({
      query: () => ({
        url: "api/recipes/mine",
        method: "GET",
        credentials: "include"
      }),
      providesTags: ["Recipes"]
    })
  })
})

export const {
  useGetTokenQuery,
  useLogoutMutation,
  useLoginMutation,
  useSignupMutation,
  useGetRecipeQuery,
  useGetAccountsQuery,
  useGetMineRecipeQuery,
} = recipeApi;
