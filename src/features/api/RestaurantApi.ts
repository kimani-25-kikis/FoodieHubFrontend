import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Restaurant } from '../../types/Types';
import { apiDomain } from '../../apiDomain/apiDomain';

export const restaurantApi = createApi({
    reducerPath: 'restaurantApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: apiDomain,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any).authSlice?.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        }
    }),
    tagTypes: ['Restaurants'],
    endpoints: (builder) => ({
        // Fetch all restaurants
        getAllRestaurants: builder.query<Restaurant[], void>({
            query: () => 'restaurants',
            providesTags: ['Restaurants'],
        }),

        // Get restaurant by ID
        getRestaurantById: builder.query<Restaurant, { restaurant_id: number }>({
            query: ({ restaurant_id }) => `restaurants/${restaurant_id}`,
            providesTags: ['Restaurants'],
        }),

        // Create new restaurant
        createRestaurant: builder.mutation<{ message: string }, Omit<Restaurant, 'restaurant_id' | 'created_at'>>({
            query: (restaurantData) => ({
                url: 'restaurants',
                method: 'POST',
                body: restaurantData,
            }),
            invalidatesTags: ['Restaurants'],
        }),

        // Update restaurant
        updateRestaurant: builder.mutation<{ message: string }, { restaurant_id: number } & Partial<Omit<Restaurant, 'restaurant_id' | 'created_at'>>>({
            query: ({ restaurant_id, ...updateData }) => ({
                url: `restaurants/${restaurant_id}`,
                method: 'PUT',
                body: updateData,
            }),
            invalidatesTags: ['Restaurants'],
        }),

        // Delete restaurant
        deleteRestaurant: builder.mutation<{ message: string }, { restaurant_id: number }>({
            query: ({ restaurant_id }) => ({
                url: `restaurants/${restaurant_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Restaurants'],
        }),
    }),
})

export const {
    useGetAllRestaurantsQuery,
    useGetRestaurantByIdQuery,
    useCreateRestaurantMutation,
    useUpdateRestaurantMutation,
    useDeleteRestaurantMutation,
} = restaurantApi