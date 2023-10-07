import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../constants";

export const adsProductApi = createApi({
  reducerPath: "adsProductApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
  }),
  tagTypes: ["AdsProduct"],
  endpoints: (builder) => ({
    adsProducts: builder.query({
      query: () => ({
        url: "/v1/product/ads/",
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access-token")
          )}`,
        },
      }),
      providesTags: ["AdsProduct"],
    }),
    addAdsProduct: builder.mutation({
      query: (adsProduct) => ({
        url: "/v1/product/ads/",
        method: "POST",
        body: adsProduct,
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access-token")
          )}`,
        },
      }),

      invalidatesTags: ["AdsProduct"],
    }),
    updateAdsProduct: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/v1/product/ads/${id}/`,
        method: "PATCH",
        body: rest,
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access-token")
          )}`,
        },
      }),

      invalidatesTags: ["AdsProduct"],
    }),
    deleteAdsProduct: builder.mutation({
      query: (id) => ({
        url: `/v1/product/ads/${id}/`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access-token")
          )}`,
        },
      }),
      invalidatesTags: ["AdsProduct"],
    }),
  }),
});

export const {
  useAdsProductsQuery,
  useAddAdsProductMutation,
  useUpdateAdsProductMutation,
  useDeleteAdsProductMutation,
} = adsProductApi;
