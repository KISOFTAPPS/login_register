import React from "react";
import { Routes, Route } from "react-router-dom";
import { LogReg } from "../views/auth";

const RouterApp = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<LogReg />} />
            </Routes>
        </>
    );
};

export default RouterApp;
