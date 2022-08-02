import { Navigate } from "react-router-dom";
import { useAuthStore } from "../hooks";

const PublicRoute = ({ children }) => {
    const { isAuthenticated } = useAuthStore();

    return !isAuthenticated ? children : <Navigate to="/" />;
};

export default PublicRoute;
