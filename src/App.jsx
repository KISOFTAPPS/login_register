import React from "react";
import RouterApp from "./router/RouterApp";
import { BrowserRouter } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <RouterApp />
        </BrowserRouter>
    );
};

export default App;
