import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../constants";

export const topProductApi = createApi({
  reducerPath: "topProductApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
  }),
  tagTypes: ["TopProduct"],
  endpoints: (builder) => ({
    topProducts: builder.query({
      query: () => ({
        url: "/v1/product/top/",
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access-token")
          )}`,
        },
      }),
      providesTags: ["TopProduct"],
    }),
    addTopProduct: builder.mutation({
      query: (topCategory) => ({
        url: "/v1/product/top/",
        method: "POST",
        body: topCategory,
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access-token")
          )}`,
        },
      }),

      invalidatesTags: ["TopProduct"],
    }),
    updateTopProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/v1/product/top/${id}`,
        method: "PATCH",
        body: formData,
      }),

      invalidatesTags: ["TopProduct"],
    }),
    deleteTopProduct: builder.mutation({
      query: (id) => ({
        url: `/v1/product/top/${id}/`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access-token")
          )}`,
        },
      }),
      invalidatesTags: ["TopProduct"],
    }),
  }),
});

export const {
  useTopProductsQuery,
  useAddTopProductMutation,
  useUpdateTopProductMutation,
  useDeleteTopProductMutation,
} = topProductApi;
