import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {

    const [dashboard, setDashboard] = useState({
        totalUsers: 0,
        totalBooks: 0,
        borrowedBooks: 0,
        returnedBooks: 0,
        overdueBooks: 0
    });

    const [loading, setLoading] = useState(true);

    const API_URL =
        import.meta.env.VITE_API_URL ||
        "https://library-system-backend-qkjn.onrender.com";

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                const response = await axios.get(
                    // `${API_URL}/api/v1/admin/dashboard`,
                    `${API_URL}/admin/dashboard`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                /*
                 * Keep this mapping according to
                 * your backend response.
                 */

                const data =
                    response.data.dashboard ||
                    response.data;

                setDashboard({
                    totalUsers:
                        data.totalUsers || 0,

                    totalBooks:
                        data.totalBooks || 0,

                    borrowedBooks:
                        data.borrowedBooks ||
                        data.totalBorrowedBooks ||
                        0,

                    returnedBooks:
                        data.returnedBooks ||
                        data.totalReturnedBooks ||
                        0,

                    overdueBooks:
                        data.overdueBooks || 0
                });

            } catch (error) {

                console.error(
                    "ADMIN DASHBOARD ERROR:",
                    error
                );

            } finally {

                setLoading(false);

            }
        };

        fetchDashboard();

    }, [API_URL]);


    const stats = [
        {
            title: "Total Users",
            value: dashboard.totalUsers,
            icon: "👥",
            description: "Registered users"
        },
        {
            title: "Total Books",
            value: dashboard.totalBooks,
            icon: "📚",
            description: "Books in library"
        },
        {
            title: "Borrowed Books",
            value: dashboard.borrowedBooks,
            icon: "📖",
            description: "Currently borrowed"
        },
        {
            title: "Returned Books",
            value: dashboard.returnedBooks,
            icon: "↩️",
            description: "Successfully returned"
        },
        {
            title: "Overdue Books",
            value: dashboard.overdueBooks,
            icon: "⚠️",
            description: "Require attention",
            warning: true
        }
    ];


    return (

        <div className="professional-dashboard">

            {/* ================= HEADER ================= */}

            <section className="dashboard-header">

                <div>

                    <p className="dashboard-label">
                        ADMINISTRATION
                    </p>

                    <h1>
                        Admin Dashboard
                    </h1>

                    <p>
                        Welcome back, Administrator.
                        Manage your digital library from one place.
                    </p>

                </div>

            </section>


            {/* ================= STATISTICS ================= */}

            <section className="dashboard-section">

                <div className="section-heading">

                    <div>
                        <h2>
                            Library Overview
                        </h2>

                        <p>
                            Current library statistics
                        </p>
                    </div>

                </div>


                <div className="statistics-grid">

                    {stats.map((stat) => (

                        <div
                            className={`stat-card ${
                                stat.warning
                                    ? "warning-card"
                                    : ""
                            }`}
                            key={stat.title}
                        >

                            <div className="stat-card-top">

                                <div className="stat-icon">
                                    {stat.icon}
                                </div>

                                {stat.warning && (
                                    <span className="status-dot">
                                    </span>
                                )}

                            </div>

                            <div className="stat-content">

                                <p>
                                    {stat.title}
                                </p>

                                <h3>
                                    {loading
                                        ? "..."
                                        : stat.value}
                                </h3>

                                <span>
                                    {stat.description}
                                </span>

                            </div>

                        </div>

                    ))}

                </div>

            </section>


            {/* ================= QUICK MANAGEMENT ================= */}

            <section className="dashboard-section">

                <div className="section-heading">

                    <div>
                        <h2>
                            Quick Management
                        </h2>

                        <p>
                            Frequently used administration tools
                        </p>
                    </div>

                </div>


                <div className="quick-management-grid">

                    <a
                        href="/admin/users"
                        className="management-card"
                    >

                        <div className="management-icon">
                            👥
                        </div>

                        <div>
                            <h3>
                                Manage Users
                            </h3>

                            <p>
                                View and manage registered users.
                            </p>
                        </div>

                        <span className="management-arrow">
                            →
                        </span>

                    </a>


                    <a
                        href="/admin/books"
                        className="management-card"
                    >

                        <div className="management-icon">
                            📚
                        </div>

                        <div>
                            <h3>
                                Manage Books
                            </h3>

                            <p>
                                Add, edit and delete books.
                            </p>
                        </div>

                        <span className="management-arrow">
                            →
                        </span>

                    </a>


                    <a
                        href="/admin/categories"
                        className="management-card"
                    >

                        <div className="management-icon">
                            🏷️
                        </div>

                        <div>
                            <h3>
                                Categories
                            </h3>

                            <p>
                                Manage book categories.
                            </p>
                        </div>

                        <span className="management-arrow">
                            →
                        </span>

                    </a>


                    <a
                        href="/admin/transactions"
                        className="management-card"
                    >

                        <div className="management-icon">
                            📋
                        </div>

                        <div>
                            <h3>
                                Transactions
                            </h3>

                            <p>
                                View all borrowing activity.
                            </p>
                        </div>

                        <span className="management-arrow">
                            →
                        </span>

                    </a>


                    <a
                        href="/admin/overdue"
                        className="management-card"
                    >

                        <div className="management-icon">
                            ⚠️
                        </div>

                        <div>
                            <h3>
                                Overdue Books
                            </h3>

                            <p>
                                Check books that need attention.
                            </p>
                        </div>

                        <span className="management-arrow">
                            →
                        </span>

                    </a>

                </div>

            </section>


            {/* ================= ADMIN INFO ================= */}

            <section className="dashboard-info">

                <div className="info-icon">
                    💡
                </div>

                <div>

                    <h3>
                        Administration Overview
                    </h3>

                    <p>
                        Use the sidebar to manage users, books,
                        categories and library transactions.
                    </p>

                </div>

            </section>

        </div>

    );
};

export default AdminDashboard;