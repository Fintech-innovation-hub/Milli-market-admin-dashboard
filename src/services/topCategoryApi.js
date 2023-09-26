import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../constants";

export const topCategoryApi = createApi({
  reducerPath: "topCategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
  }),
  tagTypes: ["TopCategory"],
  endpoints: (builder) => ({
    topCategories: builder.query({
      query: () => ({
        url: "/v1/product/top-category/",
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access-token")
          )}`,
        },
      }),
      providesTags: ["TopCategory"],
    }),
    addTopCategory: builder.mutation({
      query: (topCategory) => ({
        url: "/v1/product/top-category/",
        method: "POST",
        body: topCategory,
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access-token")
          )}`,
        },
      }),

      invalidatesTags: ["TopCategory"],
    }),
    updateTopCategory: builder.mutation({
      query: ({id,formData}) => ({
        url: `/v1/product/top-category/${id}`,
        method: "PATCH",
        body: formData,
      }),

      invalidatesTags: ["TopCategory"],
    }),
    deleteTopCategory: builder.mutation({
      query: (id) => ({
        url: `/v1/product/top-category/${id}/`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access-token")
          )}`,
        },
      }),
      invalidatesTags: ["TopCategory"],
    }),
  }),
});

export const {
  useTopCategoriesQuery,
  useAddTopCategoryMutation,
  useUpdateTopCategoryMutation,
  useDeleteTopCategoryMutation,
} = topCategoryApi;
