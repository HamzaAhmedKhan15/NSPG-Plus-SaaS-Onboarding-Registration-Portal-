import { configureStore } from '@reduxjs/toolkit';

import ManageTenant from '../redux/slices/tenantSlice'

export const store = configureStore({
    reducer: {
        ManageTenant: ManageTenant,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;