import { configureStore } from '@reduxjs/toolkit'
import { AuthApi } from '../features/api/AuthApi'
import authSlice from '../features/slice/AuthSlice'
import storage from 'redux-persist/lib/storage' 
import { persistReducer, persistStore } from 'redux-persist';
import { menuItemApi } from '../features/api/MenuItemApi';
import { orderApi } from '../features/api/OrderApi';
import { userApi } from '../features/api/UserApi';
import { categoryApi } from '../features/api/CategoryApi';
import { dashboardDataApi } from '../features/api/DataBoardDataApi'; 
import { restaurantApi } from '../features/api/RestaurantApi';

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
        [categoryApi.reducerPath]: categoryApi.reducer, 
        [dashboardDataApi.reducerPath]: dashboardDataApi.reducer,
        [restaurantApi.reducerPath]: restaurantApi.reducer,
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
            categoryApi.middleware, 
            dashboardDataApi.middleware,
            restaurantApi.middleware
        ),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch