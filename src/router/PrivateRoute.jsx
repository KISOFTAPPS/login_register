import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../hooks";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuthStore();
    const { pathname, search } = useLocation();

    // para guardar la ultima ruta visitada
    const lastPath = pathname + search;
    localStorage.setItem("lastPath", lastPath);

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
