import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../constants";

export const modelApi = createApi({
  reducerPath: "modelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
  }),
  tagTypes: ["Model"],
  endpoints: (builder) => ({
    models: builder.query({
      query: (brandId) => ({
        url: `/v1/product/model/?brand_id=${brandId}`,
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("access-token"))}`,
        },
      }),
      providesTags: ["Model"],
    }),
  }),
});

export const { useModelsQuery } = modelApi;
