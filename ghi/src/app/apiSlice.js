import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const recipeApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_HOST
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
        formData.append("password", info.passowrd);
        return {
          url: "/token",
          method: "POST",
          body: formData,
          credentials: "include"
        }
      },
      invalidatesTags: ["Account"]
    })
  })
})


export const {
  useGetTokenQuery,
  useLogoutMutation,
  useLoginMutation,
} = recipeApi;
