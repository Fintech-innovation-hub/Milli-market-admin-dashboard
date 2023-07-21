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
          // 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg5NjY0ODczLCJpYXQiOjE2ODk1Nzg0NzMsImp0aSI6Ijc3ZGM3OTA0YjM0ZDQ3YjRhMmYzMDc3NTUyYWEyM2IwIiwidXNlcl9pZCI6MX0.Gq84NSDF6gexAJEh_uAf9f5nkFkZ8hsIlsRva4dH7-4`
        }
      }),
      providesTags: ['Category'],
    }),
    categoryItemDetails: builder.query({
      // query: categoryId => `/v1/product/category/${categoryId}`,
      query: id => ({
        url: `/v1/product/category/`,
        params: {
          parent_id: id || 8,
        },
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access-token"))}`
        },
        method: 'GET',
      }),

    }),
    categoryItemChildDetails: builder.query({
      // query: categoryId => `/v1/product/category/${categoryId}`,
      query: id => ({
        url: `/v1/product/category/`,
        params: {
          parent_id: id || 9,
        },
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("access-token"))}`
        },
        method: 'GET',
      }),

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

    }),

    addCategory: builder.mutation({
      query: category => ({
        url: '/v1/product/category/',
        method: 'POST',
        body: category,
        headers: {
          'Authorization': `Bearer  ${JSON.parse(localStorage.getItem("access-token"))}`
        }
      }),

      invalidatesTags: ['Category'],
    }),
    addCategoryChild: builder.mutation({

      query: (categoryChild) => ({
        url: '/v1/product/category/',
        method: 'POST',
        body: categoryChild.body,
        params: {
          parent_id: categoryChild.id
        },
        headers: {
          'Authorization': `Bearer  ${JSON.parse(localStorage.getItem("access-token"))}`
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
          'Authorization': `Bearer  ${JSON.parse(localStorage.getItem("access-token"))}`
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
  useCategoryItemChildrenDetails,
  useAddCategoryMutation,
  useAddCategoryChildMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi
