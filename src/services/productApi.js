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
    productItem: builder.query({
      query: (productId) => ({
        url: `/v1/product/${productId}/items/`,
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access-token"))}`
        }
      }),
      providesTags: ['Product'],
    }),
    patchProductDetails: builder.mutation({
      query: (product) => ({

        url: `/v1/product/${product.id}/`,
        method: 'PATCH',
        body: product.data,
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access-token"))}`
        }
      }),
      invalidatesTags: ['Product'],

    }),
    patchProductItem: builder.mutation({
      query: (product) => ({
        url: `/v1/product/${product.id}/items/`,
        method: 'PATCH',
        body: product.data,
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access-token"))}`
        }
      }),

      invalidatesTags: ['Product'],
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
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/v1/product/${id}/`,
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access-token"))}`
        }
      }),
      invalidatesTags: ["Product"]
    })

  }),
})
export const {
  useProductsQuery,
  useProductItemQuery,
  // useCategoryItemDetailsQuery,
  useAddProductMutation,
  usePatchProductItemMutation,
  usePatchProductDetailsMutation,
  useDeleteProductMutation,
  // useAddCategoryChildMutation,
  // useUpdateCategoryMutation,
  // useDeleteCategoryMutation,
} = productApi;
