import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: null,
        user: {},
        errorMessage: null,
    },
    reducers: {
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
