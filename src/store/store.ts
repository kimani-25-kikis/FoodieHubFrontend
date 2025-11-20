import { configureStore } from '@reduxjs/toolkit'
import { AuthApi } from '../features/api/AuthApi'
import authSlice from '../features/slice/AuthSlice'
import storage from 'redux-persist/lib/storage' 
import { persistReducer, persistStore } from 'redux-persist';
import { menuItemApi } from '../features/api/MenuItemApi';
import { orderApi } from '../features/api/OrderApi';
import { userApi } from '../features/api/UserApi';
import { dashboardDataApi } from '../features/api/DataBoardDataApi'; 

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token', 'isAuthenticated', 'user'], 
};

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);

export const store = configureStore({
    reducer: {
        [AuthApi.reducerPath]: AuthApi.reducer,
        [menuItemApi.reducerPath]: menuItemApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [dashboardDataApi.reducerPath]: dashboardDataApi.reducer,
        authSlice: persistedAuthReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REGISTER'],
            },
        }).concat(
            AuthApi.middleware, 
            menuItemApi.middleware, 
            orderApi.middleware,
            userApi.middleware,          
            dashboardDataApi.middleware
        ),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
