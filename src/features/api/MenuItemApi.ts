import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { MenuItem } from '../../types/Types'

export const menuItemApi = createApi({
    reducerPath: 'menuItemApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    tagTypes: ['MenuItems'],
    endpoints: (builder) => ({

        // Fetch all Menu Items
        getAllMenuItems: builder.query<
            { success: boolean; data: MenuItem[] },  // <-- FIXED TYPE
            void
        >({
            query: () => '/menu-items',
            providesTags: ['MenuItems'],
        }),

        // Get menu item by ID
        getMenuItemById: builder.query<
            { success: boolean; data: MenuItem },   // <-- FIXED TYPE
            number
        >({
            query: (id) => `/menu-items/${id}`,
            providesTags: ['MenuItems'],
        }),

        // Add new menu item
        addMenuItem: builder.mutation<
            { success: boolean; data: MenuItem },   // <-- FIXED TYPE
            Partial<MenuItem>
        >({
            query: (newItem) => ({
                url: '/menu-items',
                method: 'POST',
                body: newItem,
            }),
            invalidatesTags: ['MenuItems'],
        }),

        // Update menu item
        updateMenuItem: builder.mutation<
            { success: boolean; data: MenuItem },   // <-- FIXED TYPE
            Partial<MenuItem> & { menu_item_id: number }
        >({
            query: (updatedItem) => ({
                url: `/menu-items/${updatedItem.menu_item_id}`,
                method: 'PUT',
                body: updatedItem,
            }),
            invalidatesTags: ['MenuItems'],
        }),

        // Delete menu item
        deleteMenuItem: builder.mutation<
            { success: boolean; message: string }, // or data: MenuItem
            number
        >({
            query: (id) => ({
                url: `/menu-items/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['MenuItems'],
        }),
    }),
})
