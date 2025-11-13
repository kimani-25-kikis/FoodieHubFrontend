import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const menuItemApi = createApi({
    reducerPath: 'menuItemApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    tagTypes: ['MenuItems'],
    endpoints: (builder) => ({

       // Fetch all Menu Items
        getAllMenuItems: builder.query<{ menu_item_id: number; name: string; description: string; price: number; is_available: boolean; menuitem_image_url: string }[], void>({
            query: () => '/menu-items',
            providesTags: ['MenuItems'],
        }),

        //get menu item by id
        getMenuItemById: builder.query<{ menu_item_id: number; name: string; description: string; price: number; is_available: boolean; menuitem_image_url: string }, number>({
            query: (id) => `/menu-items/${id}`,
            providesTags:['MenuItems'],
        }),

        //add new menu item
        addMenuItem: builder.mutation<{ message: string }, { name: string; description: string; price: number; is_available: boolean; menuitem_image_url: string }>({
            query: (newItem) => ({
                url: '/menu-items',
                method: 'POST',
                body: newItem,
            }),
            invalidatesTags: ['MenuItems'],
        }),
        //update menu item
        updateMenuItem: builder.mutation<{ message: string }, { menu_item_id: number; name?: string; description?: string; price?: number; is_available?: boolean; menuitem_image_url?: string }>({
            query: (updatedItem) => ({  
                url: `/menu-items/${updatedItem.menu_item_id}`,
                method: 'PUT',
                body: updatedItem,
            }),
            invalidatesTags: ['MenuItems'],
        }),
        //delete menu item
        deleteMenuItem: builder.mutation<{ message: string }, number>({
            query: (id) => ({
                url: `/menu-items/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['MenuItems'],
        }), 
    }),
})                                                                                                                                                                                                                                                                                                        