import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../App.css";

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    const menuItems = [
        {
            name: "Dashboard",
            path: "/admin/dashboard",
            icon: "📊"
        },
        {
            name: "Manage Users",
            path: "/admin/users",
            icon: "👥"
        },
        {
            name: "Manage Books",
            path: "/admin/books",
            icon: "📚"
        },
        {
            name: "Manage Categories",
            path: "/admin/categories",
            icon: "🏷️"
        },
        {
            name: "All Transactions",
            path: "/admin/transactions",
            icon: "📋"
        },
        {
            name: "Overdue Books",
            path: "/admin/overdue",
            icon: "⚠️"
        }
    ];

    return (
        <div className="admin-layout">

            {/* ================= NAVBAR ================= */}

            <header className="admin-navbar">

                <div className="navbar-left">

                    <button
                        className="dl-menu-button"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-label="Toggle sidebar"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <div className="admin-brand">
                        <div className="brand-icon">
                            📚
                        </div>

                        <div>
                            <h2>Digital Library</h2>
                            <span>Administration Panel</span>
                        </div>
                    </div>

                </div>

                <div className="navbar-right">

                    <div className="admin-profile">
                        <div className="admin-avatar">
                            A
                        </div>

                        <div className="admin-profile-info">
                            <strong>Administrator</strong>
                            <span>Admin</span>
                        </div>
                    </div>

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </header>


            {/* ================= SIDEBAR ================= */}

            <aside
                className={`admin-sidebar ${sidebarOpen ? "sidebar-open" : "sidebar-collapsed"
                    }`}
            >

                <div className="sidebar-header">

                    {sidebarOpen && (
                        <div>
                            <h3>Admin Menu</h3>
                            <p>Library Management</p>
                        </div>
                    )}

                </div>


                <nav className="sidebar-navigation">

                    {menuItems.map((item) => (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "active" : ""
                                }`
                            }
                        >

                            <span className="sidebar-icon">
                                {item.icon}
                            </span>

                            {sidebarOpen && (
                                <span className="sidebar-text">
                                    {item.name}
                                </span>
                            )}

                        </NavLink>

                    ))}

                </nav>


                {/* Sidebar bottom */}

                <div className="sidebar-bottom">

                    <button
                        className="sidebar-logout"
                        onClick={handleLogout}
                    >
                        <span className="sidebar-icon">
                            🚪
                        </span>

                        {sidebarOpen && (
                            <span className="sidebar-text">
                                Logout
                            </span>
                        )}
                    </button>

                </div>

            </aside>


            {/* ================= MAIN CONTENT ================= */}

            <main className={`dl-admin-main ${sidebarOpen ? "dl-main-open" : "dl-main-closed"}`}>
                <div className="dl-admin-content">
                    <Outlet />
                </div>
            </main>

        </div>
    );
};

export default AdminLayout;