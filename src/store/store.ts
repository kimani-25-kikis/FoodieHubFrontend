import { configureStore } from '@reduxjs/toolkit'
import { AuthApi } from '../features/api/AuthApi'
import authSlice from '../features/slice/AuthSlice'
import storage from 'redux-persist/lib/storage' 
import { persistReducer, persistStore } from 'redux-persist';
import { menuItemApi } from '../features/api/MenuItemApi';


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

        
        authSlice: persistedAuthReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(AuthApi.middleware, menuItemApi.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch