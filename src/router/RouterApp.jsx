import React, { useEffect, useId } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "../hooks";
import { LogReg } from "../views/auth";
import { Bienvenida } from "../views/bienvenida";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const RouterApp = () => {
    const { isAuthenticated, checkToken } = useAuthStore();
    useEffect(() => {
        checkToken();
    }, []);

    if (isAuthenticated === null) {
        return (
            <div className="min-vh-100 d-flex justify-content-center align-items-center">
                <img src="public/assets/img/loading.gif" alt="Cargando..." />
            </div>
        );
    }

    return (
        <>
            <Routes>
                <Route
                    path="login"
                    element={
                        <PublicRoute>
                            <LogReg />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Bienvenida />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="*"
                    element={
                        <Navigate to={`${isAuthenticated ? "/" : "login"}`} />
                    }
                />
            </Routes>
        </>
    );
};

export default RouterApp;
