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
    const startLogin = async ({ email, password }) => { // Se hace una funcion async con los datos del usuario
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

    // Funcion encargada de comunicarse con la api y hacer el logout
    const startLogout = () => { // no hace falta que sea async
        localStorage.clear(); // Se limpia el localStorage
        dispatch(onLogout()); // Se llama a la accion onLogout para volver todos los estados por defecto y salir
    };

    const startRegister = async ({ name, email, password }) => { // Se hace una funcion async con los datos del usuario
        dispatch(onChecking()); // Se llama a la accion para volver todos los estados por defecto
        try {
            // Se llama a la api para hacer el registro y se le pasa los datos del usuario por post
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
            // En caso de dar error se borran los datos de localStorage
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    };

    // Funcion que se encarga de checar el token de autenticacion y mantener la sesion
    const checkToken = async () => {
        const token = localStorage.getItem("token"); // Se obtiene el token de localStorage
        if (!token) return dispatch(onLogout()); // Si no hay token se llama a la accion onLogout y sale de la sesion
        try {
            const resp = await logReg.get("/auth/renew"); // Se llama a la api para checar el token y renovarlo
            localStorage.setItem("token", resp.data.token); // Se setea el nuevo token de autenticacion
            localStorage.setItem("token-init-date", new Date().getTime()); // Se setea la hora inicio del token
            dispatch(onLogin({ name: resp.data.name, uid: resp.data.uid }));   // Se llama a la accion onLogin una ves completado correctamente y se vuelven a ingresar los datos del usuario
        } catch (error) {
            localStorage.clear(); // Se limpia el localStorage
            dispatch(onLogout()); // Se hace un logout
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
