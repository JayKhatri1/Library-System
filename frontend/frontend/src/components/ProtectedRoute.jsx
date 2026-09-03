import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {

    const storedUser = localStorage.getItem("user");

    // No user stored → go to login
    if (!storedUser) {
        return <Navigate to="/" replace />;
    }

    let user;

    try {
        user = JSON.parse(storedUser);
    } catch (error) {

        // Invalid localStorage data
        localStorage.removeItem("user");

        return <Navigate to="/" replace />;
    }

    // No valid user
    if (!user || !user.role) {

        localStorage.removeItem("user");

        return <Navigate to="/" replace />;
    }

    console.log("PROTECTED ROUTE USER:", user);
    console.log("ALLOWED ROLE:", allowedRole);

    // User doesn't have permission
    if (user.role !== allowedRole) {

        if (user.role === "admin") {
            return (
                <Navigate
                    to="/admin/dashboard"
                    replace
                />
            );
        }

        if (user.role === "user") {
            return (
                <Navigate
                    to="/user/dashboard"
                    replace
                />
            );
        }

        // Unknown role
        localStorage.removeItem("user");

        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;