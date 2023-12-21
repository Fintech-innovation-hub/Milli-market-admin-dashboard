import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../constants";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    orders: builder.query({
      query: () => ({
        url: "/v1/order/",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("access-token"))}`,
        },
      }),
      providesTags: ["Order"],
    }),
  }),
});

export const { useOrdersQuery} = orderApi;
