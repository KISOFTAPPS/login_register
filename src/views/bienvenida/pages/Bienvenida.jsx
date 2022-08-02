import React from "react";
import { useAuthStore } from "../../../hooks";

export const Bienvenida = () => {
    const { startLogout, user } = useAuthStore();

    return (
        <section className="min-vh-100 p-5">
            <div className="card text-center bg-dark text-bg-dark shadow border-danger">
                <h1>
                    <strong>BIENVENIDO</strong>
                </h1>
                <h2>
                    Id: <strong>{user.uid}</strong>
                </h2>
                <h2>
                    Usuario: <strong>{user.name}</strong>
                </h2>
                <br />
                <button className="btn btn-danger m-5" onClick={startLogout}>
                    SALIR
                </button>
            </div>
        </section>
    );
};
