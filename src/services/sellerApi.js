import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../constants";

export const sellerApi = createApi({
  reducerPath: "sellerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
  }),
  tagTypes: ["Seller"],
  endpoints: (builder) => ({
    sellers: builder.query({
      query: () => ({
        url: "/v1/user/seller/",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("access-token"))}`,
        },
      }),
      providesTags: ["Seller"],
    }),
  }),
});

export const { useSellersQuery } = sellerApi;
