import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const UserLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/", { replace: true });
    };

    const menuItems = [
        {
            name: "Dashboard",
            path: "/user/dashboard",
            icon: "📊"
        },
        {
            name: "Books",
            path: "/user/books",
            icon: "📚"
        },
        {
            name: "My Borrowed Books",
            path: "/user/transactions",
            icon: "📖"
        },
        {
            name: "My Fines",
            path: "/user/fines",
            icon: "💰"
        }
    ];

    return (
        <div className="dl-user-layout">

            {/* NAVBAR */}
            <header className="dl-user-navbar">

                <div className="dl-user-navbar-left">

                    <button
                        className="dl-user-menu-button"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <div className="dl-user-brand">
                        <div className="dl-user-brand-icon">
                            📚
                        </div>

                        <div>
                            <h2>Digital Library</h2>
                            <span>User Portal</span>
                        </div>
                    </div>

                </div>

                <div className="dl-user-navbar-right">

                    <div className="dl-user-profile">

                        <div className="dl-user-avatar">
                            {(user.username || "U")
                                .charAt(0)
                                .toUpperCase()}
                        </div>

                        <div className="dl-user-profile-text">
                            <strong>
                                {user.username || "User"}
                            </strong>

                            <span>User</span>
                        </div>

                    </div>

                    <button
                        className="dl-user-navbar-logout"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </header>


            {/* SIDEBAR */}
            <aside
                className={`dl-user-sidebar ${
                    sidebarOpen
                        ? "dl-user-sidebar-open"
                        : "dl-user-sidebar-closed"
                }`}
            >

                <div className="dl-user-sidebar-header">

                    {sidebarOpen && (
                        <>
                            <h3>Library Menu</h3>
                            <p>Student Library Portal</p>
                        </>
                    )}

                </div>


                <nav className="dl-user-sidebar-menu">

                    {menuItems.map((item) => (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `dl-user-sidebar-link ${
                                    isActive
                                        ? "dl-user-sidebar-active"
                                        : ""
                                }`
                            }
                        >

                            <span className="dl-user-sidebar-icon">
                                {item.icon}
                            </span>

                            {sidebarOpen && (
                                <span className="dl-user-sidebar-name">
                                    {item.name}
                                </span>
                            )}

                        </NavLink>

                    ))}

                </nav>


                <div className="dl-user-sidebar-bottom">

                    <button
                        className="dl-user-sidebar-logout"
                        onClick={logout}
                    >
                        <span className="dl-user-sidebar-icon">
                            🚪
                        </span>

                        {sidebarOpen && (
                            <span className="dl-user-sidebar-name">
                                Logout
                            </span>
                        )}
                    </button>

                </div>

            </aside>


            {/* MAIN CONTENT */}
            <main
                className={`dl-user-main ${
                    sidebarOpen
                        ? "dl-user-main-open"
                        : "dl-user-main-closed"
                }`}
            >
                <div className="dl-user-content">
                    <Outlet />
                </div>
            </main>

        </div>
    );
};

export default UserLayout;