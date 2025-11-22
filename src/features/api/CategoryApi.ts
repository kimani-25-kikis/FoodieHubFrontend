import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Category} from '../../types/Types';
import { apiDomain } from '../../apiDomain/apiDomain';


export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiDomain }),
    tagTypes: ['Category'],
    endpoints: (builder) => ({

        // Fetch all Categories
        getAllCategory: builder.query<Category[], void>({
            query: () => 'categories',
            providesTags: ['Category'],
        }),

        //get category by id
        getCategoryById: builder.query<Category, {category_id: number}>({
            query: (category_id) => `/categories/${category_id}`,
            providesTags: ['Category'],
        }),

        //add new category
        addCategory: builder.mutation<{ message: string }, Partial<Omit<Category, 'category_id'>>>({
            query: (newCategory) => ({
                url: 'categories',
                method: 'POST',
                body: newCategory,
            }),
            invalidatesTags: ['Category'],
        }),
        //update category
        updateCategory: builder.mutation<{ message: string }, { category_id: number } & Partial<Omit<Category, 'category_id'>>>({
            query: ({ category_id, ...updatedCategory }) => ({
                url: `categories/${category_id}`,
                method: 'PUT',
                body: updatedCategory,
            }),
            invalidatesTags: ['Category'],
        }),
        //delete category
        deleteCategory: builder.mutation<{ message: string }, {category_id: number}>({
            query: (category_id) => ({
                url: `categories/${category_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category'],
        }),
    }),
})                                                                                                                                                                                                                                                                                                        