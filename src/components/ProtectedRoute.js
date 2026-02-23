import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const isAuth = localStorage.getItem("auth");

    return isAuth ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoute;