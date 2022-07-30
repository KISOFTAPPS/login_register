import React from "react";
import RouterApp from "./router/RouterApp";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux";

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <RouterApp />
            </BrowserRouter>
        </Provider>
    );
};

export default App;
