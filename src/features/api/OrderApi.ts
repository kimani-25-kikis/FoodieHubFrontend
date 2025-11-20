import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { AllOrderData,  OrderFormValues } from '../../types/Types';
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

        //fetch all order for one customer using custome id
        getAllOrderByCustomerId: builder.query<Omit<AllOrderData[], 'customer_email' | 'customer_name'>, { customer_id: number }>({
            query: ({ customer_id }) => `orders/customer/${customer_id}`,
            providesTags: ['Orders']
        }),

        //get order by id
        getOrderById: builder.query<AllOrderData, { order_id: number }>({
            query: ({ order_id }) => `orders/${order_id}`,
            providesTags: ['Orders'],
        }),

        //add new order
        addNewOrder: builder.mutation<{ message: string }, OrderFormValues>({
            query: (newOrder) => ({
                url: 'orders',
                method: 'POST',
                body: newOrder,
            }),
            invalidatesTags: ['Orders'],
        }),

        //update order status
        updateOrderStatus: builder.mutation<{ message: string }, { order_id: number, status:string }>({
            query: ({ order_id, ...updateOrder }) => ({
                url: `orders/${order_id}`,
                method: 'PATCH',
                body: updateOrder,
            }),
            invalidatesTags: ['Orders'],
        }),
        
        //delete order
        deleteOrder: builder.mutation<{ message: string }, { order_id: number }>({
            query: ({ order_id }) => ({
                url: `orders/${order_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Orders'],
        }),
    }),
})                                                                                                                                                                                                                                                                                                        