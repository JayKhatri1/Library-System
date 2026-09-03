import { useEffect, useState } from "react";
import api from "../services/api";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const getUsers = async () => {
        try {
            setLoading(true);

            const response = await api.get("/admin/users");

            console.log("ADMIN USERS:", response.data);

            setUsers(response.data.users || []);
            setMessage("");
        } catch (error) {
            console.log("GET USERS ERROR:", error);

            setMessage(
                error.response?.data?.message ||
                "Unable to load users"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    if (loading) {
        return (
            <div className="admin-page-message">
                <h2>Loading users...</h2>
            </div>
        );
    }

    return (
        <div className="admin-users-page">

            <div className="admin-page-header">
                <div>
                    <h1 className="admin-page-title">
                        Manage Users
                    </h1>

                    <p className="admin-page-subtitle">
                        View all registered library users.
                    </p>
                </div>

                <div className="admin-count-box">
                    Total Users: <strong>{users.length}</strong>
                </div>
            </div>

            {message && (
                <div className="admin-page-message">
                    {message}
                </div>
            )}

            {users.length === 0 ? (
                <div className="admin-empty-state">
                    <div className="admin-empty-icon">
                        👥
                    </div>

                    <h2>No Users Found</h2>

                    <p>
                        There are currently no registered users.
                    </p>
                </div>
            ) : (
                <div className="admin-users-table-container">

                    <table className="admin-users-table">

                        <thead>
                            <tr>
                                <th>#</th>
                                <th>User</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id || user.id}>

                                    <td>
                                        {index + 1}
                                    </td>

                                    <td>
                                        <div className="user-info">

                                            <div className="user-avatar">
                                                {user.username
                                                    ?.charAt(0)
                                                    ?.toUpperCase() || "U"}
                                            </div>

                                            <strong>
                                                {user.username || "N/A"}
                                            </strong>

                                        </div>
                                    </td>

                                    <td>
                                        {user.email || "N/A"}
                                    </td>

                                    <td>
                                        <span
                                            className={`role-badge ${user.role === "admin"
                                                    ? "role-admin"
                                                    : "role-user"
                                                }`}
                                        >
                                            {user.role || "user"}
                                        </span>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>
            )}

        </div>
    );
};

export default AdminUsers;