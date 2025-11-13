import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface User {
    user_id: number
    first_name: string
    last_name: string
    email: string
    user_type: string
}

interface AuthState {
    isAuthenticated: boolean
    token: string | null
    user: User | null
}

const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    user: null,
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Set user credentials
        setCredentials: (state, action: PayloadAction<{ user: User; token: string}>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        // Clear user credentials
        clearCredentials: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
    },
})

export const { setCredentials, clearCredentials } = authSlice.actions
export default authSlice.reducer