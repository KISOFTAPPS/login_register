import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../";

// Se crea el store
export const store = configureStore({
    // Se crea el reducer
    reducer: {
        auth: authSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});