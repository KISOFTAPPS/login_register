import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logReg } from "../apis";
import { onChecking, onLogin, onLogout, clearErrorMessage } from "../redux";

export const useAuthStore = () => {
    // Se llama con un selector a los estados de la store
    const { isAuthenticated, user, errorMessage } = useSelector(
        (state) => state.auth
    );
    // Se llama con un dispatch a los acciones de la store
    const dispatch = useDispatch();

    // Funcion encargada de comunicarse con la api y hacer el login
    const startLogin = async ({ email, password }) => {
        dispatch(onChecking()); // Se llama a la accion para volver todos los estados por defecto

        try {
            // Se llama a la api para hacer el login
            const resp = await logReg.post("/auth", { email, password });
            // Se setea el token de autenticacion
            localStorage.setItem("token", resp.data.token);
            //se setea la hora inicio del token
            localStorage.setItem("token-init-date", new Date().getTime());
            // Se llama a la accion onLogin una ves completado correctamente el login en la api
            dispatch(onLogin({ name: resp.data.name, uid: resp.data.uid }));
        } catch (error) {
            dispatch(onLogout("Credenciales incorrectas"));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    };

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    };

    const startRegister = async ({ name, email, password }) => {
        dispatch(onChecking());
        try {
            // Se llama a la api para hacer el registro
            const resp = await logReg.post("/auth/new", {
                name,
                email,
                password,
            });
            // Se setea el token de autenticacion
            localStorage.setItem("token", resp.data.token);
            //se setea la hora inicio del token
            localStorage.setItem("token-init-date", new Date().getTime());
            // Se llama a la accion onLogin una ves completado correctamente el login en la api
            dispatch(onLogin({ name: resp.data.name, uid: resp.data.uid }));

            console.log(resp.data);
        } catch (error) {
            dispatch(
                onLogout(error.response.data?.msg || "Error al registrarse")
            );
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    };

    const checkToken = async () => {
        const token = localStorage.getItem("token");
        if (!token) return dispatch(onLogout());
        try {
            const resp = await logReg.get("/auth/renew");
            localStorage.setItem("token", resp.data.token);
            localStorage.setItem("token-init-date", new Date().getTime());
            dispatch(onLogin({ name: resp.data.name, uid: resp.data.uid }));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    };

    // Se comparten las variables o metodos por medio de este hook
    return {
        //* Propiedades
        isAuthenticated,
        user,
        errorMessage,

        //* Metodos o funciones
        startLogin,
        startRegister,
        startLogout,
        checkToken,
    };
};
