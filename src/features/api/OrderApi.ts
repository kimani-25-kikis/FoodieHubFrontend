import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { AllOrderData, OrderFormValues } from '../../types/Types';
import { apiDomain } from '../../apiDomain/apiDomain';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiDomain }),
    tagTypes: ['Orders'],

    endpoints: (builder) => ({

        // Fetch all Orders
        getAllOrders: builder.query<AllOrderData[], void>({
            query: () => 'orders',
            providesTags: ['Orders'],
        }),

        // Fetch orders for a specific customer
        getAllOrderByCustomerId: builder.query<Omit<AllOrderData[], 'customer_email' | 'customer_name'>, { customer_id: number }>({
            query: ({ customer_id }) => `orders/customer/${customer_id}`,
            providesTags: ['Orders'],
        }),

        // Get order by ID
        getOrderById: builder.query<AllOrderData, { order_id: number }>({
            query: ({ order_id }) => `orders/${order_id}`,
            providesTags: ['Orders'],
        }),

        // Add new order
        addNewOrder: builder.mutation<{ message: string }, OrderFormValues>({
            query: (newOrder) => ({
                url: 'orders',
                method: 'POST',
                body: newOrder,
            }),
            invalidatesTags: ['Orders'],
        }),

        // Update order status
        updateOrderStatus: builder.mutation<{ message: string }, { order_id: number; status: string }>({
            query: ({ order_id, ...updateOrder }) => ({
                url: `orders/${order_id}`,
                method: 'PATCH',
                body: updateOrder,
            }),
            invalidatesTags: ['Orders'],
        }),

        // ❌ Delete order
        deleteOrder: builder.mutation<{ message: string }, { order_id: number }>({
            query: ({ order_id }) => ({
                url: `orders/${order_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Orders'],
        }),

        // 🆕 CANCEL ORDER (PATCH — changes status to "cancelled")
        cancelOrder: builder.mutation<{ message: string }, { order_id: number }>({
            query: ({ order_id }) => ({
                url: `orders/${order_id}/cancel`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Orders'],
        }),
    }),
});
