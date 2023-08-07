import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../constants";

export const charactericApi = createApi({
  reducerPath: "charactericApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
  }),
  tagTypes: ["Characteristics"],
  endpoints: (builder) => ({
    characteristics: builder.query({
      query: () => ({
        url: "/v1/product/character/items",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("access-token"))}`,
        },
      }),

      providesTags: ["Characteristics"],
    }),
    characterItemDetails: builder.query({
      query: parentId => ({
        url:`/v1/product/character/items/?parent_id=${parentId}`,
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("access-token"))}`,
        },
      })
    }),
  }),
});

// 

export const { useCharacteristicsQuery,useCharacterItemDetailsQuery } = charactericApi;
