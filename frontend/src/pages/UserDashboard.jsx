import { useEffect, useState } from "react";
import api from "../services/api";

const UserDashboard = () => {

    const [dashboard, setDashboard] = useState({
        totalBorrowed: 0,
        currentlyBorrowed: 0,
        returnedBooks: 0,
        totalFine: 0
    });

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const getDashboard = async () => {

        try {

            setLoading(true);

            const response = await api.get("/users/dashboard");

            console.log(
                "USER DASHBOARD:",
                response.data
            );

            setDashboard({
                totalBorrowed:
                    response.data.dashboard?.totalBorrowed || 0,

                currentlyBorrowed:
                    response.data.dashboard?.currentlyBorrowed || 0,

                returnedBooks:
                    response.data.dashboard?.returnedBooks || 0,

                totalFine:
                    response.data.dashboard?.totalFine || 0
            });

            setMessage("");

        } catch (error) {

            console.log(
                "USER DASHBOARD ERROR:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                "Unable to load dashboard"
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {
        getDashboard();
    }, []);


    if (loading) {

        return (
            <div className="user-page-message">
                <h2>Loading dashboard...</h2>
            </div>
        );

    }


    return (

        <div className="user-dashboard">

            {/* HEADER */}

            <div className="user-dashboard-header">

                <div>

                    <span className="user-dashboard-label">
                        LIBRARY PORTAL
                    </span>

                    <h1>
                        User Dashboard
                    </h1>

                    <p>
                        Welcome back,{" "}
                        <strong>
                            {user.username || "User"}
                        </strong>
                        ! Manage your library activity from one place.
                    </p>

                </div>

            </div>


            {message && (
                <div className="user-dashboard-error">
                    {message}
                </div>
            )}


            {/* SUMMARY */}

            <section>

                <div className="user-section-heading">

                    <div>
                        <h2>Library Summary</h2>

                        <p>
                            Overview of your borrowing activity
                        </p>
                    </div>

                </div>


                <div className="user-stat-grid">


                    {/* TOTAL BORROWED */}

                    <div className="user-stat-card">

                        <div className="user-stat-icon">
                            📚
                        </div>

                        <div className="user-stat-info">

                            <p>Total Borrowed</p>

                            <h2>
                                {dashboard.totalBorrowed}
                            </h2>

                            <span>
                                Books borrowed
                            </span>

                        </div>

                    </div>


                    {/* CURRENTLY BORROWED */}

                    <div className="user-stat-card">

                        <div className="user-stat-icon">
                            📖
                        </div>

                        <div className="user-stat-info">

                            <p>Currently Borrowed</p>

                            <h2>
                                {dashboard.currentlyBorrowed}
                            </h2>

                            <span>
                                Active borrowings
                            </span>

                        </div>

                    </div>


                    {/* RETURNED */}

                    <div className="user-stat-card">

                        <div className="user-stat-icon">
                            ↩️
                        </div>

                        <div className="user-stat-info">

                            <p>Returned Books</p>

                            <h2>
                                {dashboard.returnedBooks}
                            </h2>

                            <span>
                                Successfully returned
                            </span>

                        </div>

                    </div>


                    {/* FINE */}

                    <div className="user-stat-card user-fine-card">

                        <div className="user-stat-icon">
                            💰
                        </div>

                        <div className="user-stat-info">

                            <p>Total Fine</p>

                            <h2>
                                ₹{dashboard.totalFine}
                            </h2>

                            <span>
                                Outstanding fine
                            </span>

                        </div>

                    </div>

                </div>

            </section>


            {/* QUICK ACTIONS */}

            <section className="user-quick-section">

                <div className="user-section-heading">

                    <div>

                        <h2>Quick Access</h2>

                        <p>
                            Frequently used library features
                        </p>

                    </div>

                </div>


                <div className="user-quick-grid">

                    <a
                        href="/user/books"
                        className="user-quick-card"
                    >

                        <div className="user-quick-icon">
                            📚
                        </div>

                        <div>
                            <h3>Browse Books</h3>

                            <p>
                                Search and borrow books from the library.
                            </p>
                        </div>

                        <span>→</span>

                    </a>


                    <a
                        href="/user/transactions"
                        className="user-quick-card"
                    >

                        <div className="user-quick-icon">
                            📖
                        </div>

                        <div>
                            <h3>My Borrowed Books</h3>

                            <p>
                                View your currently borrowed books.
                            </p>
                        </div>

                        <span>→</span>

                    </a>


                    <a
                        href="/user/fines"
                        className="user-quick-card"
                    >

                        <div className="user-quick-icon">
                            💰
                        </div>

                        <div>
                            <h3>My Fines</h3>

                            <p>
                                Check your outstanding library fines.
                            </p>
                        </div>

                        <span>→</span>

                    </a>

                </div>

            </section>

        </div>

    );

};

export default UserDashboard;