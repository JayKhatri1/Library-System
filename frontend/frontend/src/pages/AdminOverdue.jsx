import { useEffect, useState } from "react";
import api from "../services/api";

const AdminOverdue = () => {
    const [overdueBooks, setOverdueBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const getOverdueBooks = async () => {
        try {
            setLoading(true);

            const response = await api.get("/admin/overdue");

            console.log("ADMIN OVERDUE BOOKS:", response.data);

            setOverdueBooks(
                response.data.overdueBooks || []
            );

            setMessage("");
        } catch (error) {
            console.log("GET OVERDUE BOOKS ERROR:", error);

            setMessage(
                error.response?.data?.message ||
                "Unable to load overdue books"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOverdueBooks();
    }, []);

    const getLateDays = (dueDate) => {
        if (!dueDate) return 0;

        const today = new Date();
        const due = new Date(dueDate);

        today.setHours(0, 0, 0, 0);
        due.setHours(0, 0, 0, 0);

        const difference = today - due;

        return Math.max(
            0,
            Math.floor(
                difference / (1000 * 60 * 60 * 24)
            )
        );
    };

    if (loading) {
        return (
            <div className="admin-page-message">
                <h2>Loading overdue books...</h2>
            </div>
        );
    }

    return (
        <div className="admin-overdue-page">

            {/* Header */}

            <div className="admin-page-header">
                <div>
                    <h1 className="admin-page-title">
                        Overdue Books
                    </h1>

                    <p className="admin-page-subtitle">
                        Monitor books that have passed their due date.
                    </p>
                </div>

                <div className="overdue-count-box">
                    ⚠️ Overdue:{" "}
                    <strong>{overdueBooks.length}</strong>
                </div>
            </div>

            {message && (
                <div className="admin-page-message">
                    {message}
                </div>
            )}

            {/* Empty State */}

            {overdueBooks.length === 0 ? (
                <div className="admin-empty-state">

                    <div className="admin-empty-icon">
                        🎉
                    </div>

                    <h2>No Overdue Books</h2>

                    <p>
                        Great! There are currently no overdue books.
                    </p>

                </div>
            ) : (

                <div className="overdue-list">

                    {overdueBooks.map((transaction) => {

                        const lateDays = getLateDays(
                            transaction.dueDate
                        );

                        return (
                            <div
                                className="overdue-card"
                                key={transaction._id}
                            >

                                <div className="overdue-card-header">

                                    <div className="overdue-book-info">

                                        <div className="overdue-book-icon">
                                            📖
                                        </div>

                                        <div>
                                            <h2>
                                                {transaction.book?.title ||
                                                    "Book unavailable"}
                                            </h2>

                                            <p>
                                                Author:{" "}
                                                {transaction.book?.author ||
                                                    "N/A"}
                                            </p>
                                        </div>

                                    </div>

                                    <span className="overdue-badge">
                                        {lateDays}{" "}
                                        {lateDays === 1
                                            ? "Day"
                                            : "Days"}{" "}
                                        Late
                                    </span>

                                </div>

                                <div className="overdue-details">

                                    <div className="overdue-detail">
                                        <span>User</span>

                                        <strong>
                                            {transaction.user?.username ||
                                                "N/A"}
                                        </strong>

                                        <small>
                                            {transaction.user?.email ||
                                                "N/A"}
                                        </small>
                                    </div>

                                    <div className="overdue-detail">
                                        <span>Borrow Date</span>

                                        <strong>
                                            {transaction.borrowDate
                                                ? new Date(
                                                    transaction.borrowDate
                                                ).toLocaleDateString(
                                                    "en-IN"
                                                )
                                                : "N/A"}
                                        </strong>
                                    </div>

                                    <div className="overdue-detail">
                                        <span>Due Date</span>

                                        <strong className="overdue-date">
                                            {transaction.dueDate
                                                ? new Date(
                                                    transaction.dueDate
                                                ).toLocaleDateString(
                                                    "en-IN"
                                                )
                                                : "N/A"}
                                        </strong>
                                    </div>

                                    <div className="overdue-detail">
                                        <span>Current Fine</span>

                                        <strong className="overdue-fine">
                                            ₹{transaction.fine || 0}
                                        </strong>
                                    </div>

                                </div>

                            </div>
                        );
                    })}

                </div>
            )}

        </div>
    );
};

export default AdminOverdue;