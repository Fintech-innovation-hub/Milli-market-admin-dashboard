import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../constants";

export const ikpuApi = createApi({
  reducerPath: "ikpuApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
  }),
  tagTypes: ["Ikpu"],
  endpoints: (builder) => ({
    ikpus: builder.query({
      query: () => ({
        url: "/v1/product/brand/",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("access-token"))}`,
        },
      }),
      providesTags: ["Ikpu"],
    }),
  }),
});

export const { useIkpusQuery } = ikpuApi;
