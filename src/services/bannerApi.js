import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../constants";

export const bannerApi = createApi({
  reducerPath: "bannerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
  }),
  tagTypes: ["Banner"],
  endpoints: (builder) => ({
    banners: builder.query({
      query: () => ({
        url: "/v1/product/main-banner/",
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access-token")
          )}`,
        },
      }),
      providesTags: ["Banner"],
    }),
    addBanner: builder.mutation({
      query: (banner) => ({
        url: "/v1/product/main-banner/",
        method: "POST",
        body: banner,
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access-token")
          )}`,
        },
      }),

      invalidatesTags: ["Banner"],
    }),
    updateBanner: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/v1/product/main-banner/${id}`,
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access-token")
          )}`,
        },
      }),

      invalidatesTags: ["Banner"],
    }),
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/v1/product/main-banner/${id}/`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access-token")
          )}`,
        },
      }),
      invalidatesTags: ["Banner"],
    }),
  }),
});

export const {
  useBannersQuery,
  useAddBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = bannerApi;
