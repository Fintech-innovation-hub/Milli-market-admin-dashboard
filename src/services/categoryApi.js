import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../constants'


export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
  }),
  tagTypes: ['Category'],
  endpoints: builder => ({
    categories: builder.query({
      query: () => ({
        url: '/v1/product/category/',
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access-token"))}`
        }
      }),
      providesTags: ['Category'],
    }),
    categoryItemDetails: builder.query({
      // query: categoryId => `/v1/product/category/${categoryId}`,
      query: id => ({
        url: `/v1/product/category/?parent_id=${id}`,
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access-token"))}`
        },
        method: 'GET',
      }),
      providesTags: ['Category'],


    }),
    categoryItemChildDetails: builder.query({
      // query: categoryId => `/v1/product/category/${categoryId}`,
      query: id => ({
        url: `/v1/product/category/?parent_id=${id}`,
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access-token"))}`
        },
        method: 'GET',
      }),
      providesTags: ['Category'],

    }),
    categoryItemChildrenDetails: builder.query({
      // query: categoryId => `/v1/product/category/${categoryId}`,
      query: id => ({
        url: `/v1/product/category/`,
        params: {
          parent_id: id,
        },
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access-token"))}`
        },
        method: 'GET',
      }),
      providesTags: ['Category'],
    }),

    addCategory: builder.mutation({
      query: category => ({
        url: '/v1/product/category/',
        method: 'POST',
        body: category,
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access-token"))}`
        }
      }),

      invalidatesTags: ['Category'],
    }),
    addCategoryChild: builder.mutation({
      query: (childCategory) => ({
        url: `/v1/product/category/`,
        method: 'POST',
        body: childCategory,
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access-token"))}`
        }
      }),
      invalidatesTags: ['Category'],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/v1/product/category/${id}`,
        method: 'PUT',
        body: rest,
      }),

      invalidatesTags: ['Category'],
    }),
    deleteCategory: builder.mutation({
      query: id => ({
        url: `/v1/product/category/`,
        params: {
          category_id: id
        },
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access-token"))}`
        },
      }),
      invalidatesTags: ['Category'],
    }),
  }),
})
export const {
  useCategoriesQuery,
  useCategoryItemDetailsQuery,
  useCategoryItemChildDetailsQuery,
  useCategoryItemChildrenDetailsQuery,
  useAddCategoryMutation,
  useAddCategoryChildMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi
