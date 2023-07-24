import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../constants";

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
  }),
  tagTypes: ["Brand"],
  endpoints: (builder) => ({
    brands: builder.query({
      query: () => ({
        url: "/v1/product/brand/",
        headers: {

          Authorization: `Bearer  ${JSON.parse(localStorage.getItem("access-token"))}`,

        },
      }),
      providesTags: ["Brand"],
    }),
  }),
});

export const { useBrandsQuery } = brandApi;
