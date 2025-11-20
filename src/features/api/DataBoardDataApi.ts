import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {   AdminStatsResponse,  UserStatsResponse } from '../../types/Types';
import { apiDomain } from '../../apiDomain/apiDomain';

export const dashboardDataApi = createApi({
    reducerPath: 'dashboardDataApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiDomain }),
    tagTypes: ['DashboardData'],
    endpoints: (builder) => ({
        // Fetch admin data
        getAdminDashboardData: builder.query<AdminStatsResponse, void>({
            query: () => '/admin-dashboard',
            providesTags: ['DashboardData'],
        }),

        //get user data by user_id
        getUserDashboardById: builder.query<UserStatsResponse, number>({
            query: (user_id) => `/dashboard/${user_id}`,
            providesTags: ['DashboardData'],
        }),
    }),
})

export const {
    useGetAdminDashboardDataQuery,
    useGetUserDashboardByIdQuery
} = dashboardDataApi;