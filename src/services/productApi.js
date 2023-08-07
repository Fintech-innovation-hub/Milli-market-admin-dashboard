import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../constants'


export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
  }),
  tagTypes: ['Product'],
  endpoints: builder => ({
    products: builder.query({
      query: () => ({
        url: '/v1/product/',
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access-token"))}`
        }
      }),
      providesTags: ['Product'],
    }),
    productItem:builder.query({
      query: (productId) => ({
        url: `/v1/product/${productId}/items/`,
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access-token"))}`
        }
      }),
      providesTags: ['Product'],
    }),
    addProduct: builder.mutation({
      query: product => ({
        url: '/v1/product/',
        method: 'POST',
        body: product,
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access-token"))}`
        }
      }),

      invalidatesTags: ['Product'],
    }),
  
  }),
})
export const {
  useProductsQuery,
  useProductItemQuery,
  // useCategoryItemDetailsQuery,
  useAddProductMutation,
  // useAddCategoryChildMutation,
  // useUpdateCategoryMutation,
  // useDeleteCategoryMutation,
} = productApi;
