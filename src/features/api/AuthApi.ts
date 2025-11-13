import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const AuthApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    endpoints: (builder) => ({

        // User Login
        login: builder.mutation<{ token: string; userInfo: any }, { email: string; password: string }>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        // User Registration
        register: builder.mutation<{ message: string }, { first_name: string; last_name: string; email: string; phone_number: string; password: string }>({  
            query: (userInfo) => ({
                url: '/auth/register',
                method: 'POST',
                body: userInfo,
            }),
        }),
    }),
})