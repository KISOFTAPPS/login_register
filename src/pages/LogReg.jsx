import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignInSchema = Yup.object().shape({
    correo: Yup.string().email("Invalid email").required("Required"),
    contraseña: Yup.string().required("Required"),
});

const SignUpSchema = Yup.object().shape({
    nombre: Yup.string().required("Required"),
    correo: Yup.string().email("Invalid email").required("Required"),
    contraseña: Yup.string().required("Required"),
    repContraseña: Yup.string()
        .required("Dato requerido")
        .when("contraseña", {
            is: (val) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("contraseña")],
                "Ambas contraseñas tienen que ser iguales"
            ),
        }),
});

export const LogReg = () => {
    return (
        <section style={{ backgroundImage: "url(assets/img/bg.jpg)" }}>
            <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
                <h1 className="border rounded bg-dark text-light opacity-75">PRACTICA DE LOGIN Y REGISTRO</h1>
                <div className="container">
                    <div className="row gx-2 gy-2">
                        <div className="col-md">
                            <div className="p-1 rounded bg-dark opacity-75">
                                <h5 className="text-center text-light">
                                    LOGIN
                                </h5>
                                <Formik
                                    initialValues={{
                                        correo: "",
                                        contraseña: "",
                                    }}
                                    validationSchema={SignInSchema}
                                    onSubmit={(value) => {
                                        // same shape as initial values
                                        console.log(value);
                                    }}
                                >
                                    <Form className="row justify-content-center ">
                                        <div className="form-group m-1 col-10 ">
                                            <Field
                                                name="correo"
                                                type="email"
                                                className="form-control"
                                                placeholder="Correo"
                                                required
                                            />
                                        </div>
                                        <div className="form-group m-1 col-10">
                                            <Field
                                                name="contraseña"
                                                type="password"
                                                className="form-control"
                                                placeholder="Contraseña"
                                                required
                                            />
                                        </div>
                                        <div className="form-group m-1 col-10">
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="submit"
                                            >
                                                Entrar
                                            </button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="p-1 rounded bg-dark opacity-75">
                                <h5 className="text-center text-light">
                                    REGISTER
                                </h5>

                                <Formik
                                    initialValues={{
                                        nombre: "",
                                        correo: "",
                                        contraseña: "",
                                        repContraseña: "",
                                    }}
                                    validationSchema={SignUpSchema}
                                    onSubmit={(value) => {
                                        // same shape as initial value
                                        console.log(value);
                                    }}
                                >
                                    <Form className="row justify-content-center">
                                        <div className="form-group m-1 col-10">
                                            <Field
                                                name="nombre"
                                                type="text"
                                                className="form-control"
                                                placeholder="Nombre"
                                                required
                                            />
                                        </div>
                                        <div className="form-group m-1 col-10">
                                            <Field
                                                name="correo"
                                                type="email"
                                                className="form-control"
                                                placeholder="Correo"
                                                required
                                            />
                                        </div>
                                        <div className="form-group m-1 col-10">
                                            <Field
                                                name="contraseña"
                                                type="password"
                                                className="form-control"
                                                placeholder="Contraseña"
                                                required
                                            />
                                        </div>
                                        <div className="form-group m-1 col-10">
                                            <Field
                                                name="repContraseña"
                                                type="password"
                                                className="form-control"
                                                placeholder="Contraseña"
                                                required
                                            />
                                        </div>
                                        <div className="form-group m-1 col-10">
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="submit"
                                            >
                                                Register
                                            </button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
