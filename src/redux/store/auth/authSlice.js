import { createSlice } from "@reduxjs/toolkit";

// Se crea el slice el cual contiene todos los estados de la store y sus acciones
export const authSlice = createSlice({
    name: "auth", // Se le pasa el nombre del slice
    initialState: { // Se le pasa el estado inicial
        isAuthenticated: null,
        user: {},
        errorMessage: null,
    },
    reducers: {// Se le pasa las acciones
        onChecking: (state) => {
            state.isAuthenticated = null;
            state.user = {};
            state.errorMessage = null;
        },
        onLogin: (state, { payload }) => {
            state.isAuthenticated = true;
            state.user = payload;
            state.errorMessage = null;
        },
        onLogout: (state, action) => {
            state.isAuthenticated = false;
            state.user = {};
            state.errorMessage = action.payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = null;
        },
    },
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;
