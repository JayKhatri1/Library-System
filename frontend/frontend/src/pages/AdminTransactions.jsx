import { useEffect, useState } from "react";
import api from "../services/api";

const AdminTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const getTransactions = async () => {
        try {
            setLoading(true);

            const response = await api.get("/admin/transactions");

            console.log("ADMIN TRANSACTIONS:", response.data);

            setTransactions(response.data.transactions || []);
            setMessage("");
        } catch (error) {
            console.log("GET ADMIN TRANSACTIONS ERROR:", error);

            setMessage(
                error.response?.data?.message ||
                "Unable to load transactions"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTransactions();
    }, []);

    if (loading) {
        return (
            <div className="admin-page-message">
                <h2>Loading transactions...</h2>
            </div>
        );
    }

    return (
        <div className="admin-transactions-page">

            <div className="admin-page-header">
                <div>
                    <h1 className="admin-page-title">
                        All Transactions
                    </h1>

                    <p className="admin-page-subtitle">
                        View all book borrowing and return activity.
                    </p>
                </div>

                <div className="admin-count-box">
                    Total Transactions:{" "}
                    <strong>{transactions.length}</strong>
                </div>
            </div>

            {message && (
                <div className="admin-page-message">
                    {message}
                </div>
            )}

            {transactions.length === 0 ? (
                <div className="admin-empty-state">
                    <div className="admin-empty-icon">
                        📋
                    </div>

                    <h2>No Transactions Found</h2>

                    <p>
                        There are currently no library transactions.
                    </p>
                </div>
            ) : (
                <div className="admin-transactions-table-container">

                    <table className="admin-transactions-table">

                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Book</th>
                                <th>User</th>
                                <th>Borrow Date</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Fine</th>
                            </tr>
                        </thead>

                        <tbody>
                            {transactions.map(
                                (transaction, index) => {

                                    const isReturned =
                                        transaction.status ===
                                        "returned";

                                    const fine =
                                        transaction.fine || 0;

                                    return (
                                        <tr
                                            key={
                                                transaction._id
                                            }
                                        >
                                            <td>
                                                {index + 1}
                                            </td>

                                            <td>
                                                <div className="admin-transaction-book">
                                                    <span>
                                                        📖
                                                    </span>

                                                    <div>
                                                        <strong>
                                                            {transaction
                                                                .book
                                                                ?.title ||
                                                                "Book unavailable"}
                                                        </strong>

                                                        <small>
                                                            {transaction
                                                                .book
                                                                ?.author ||
                                                                "N/A"}
                                                        </small>
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                <div className="admin-transaction-user">
                                                    <strong>
                                                        {transaction
                                                            .user
                                                            ?.username ||
                                                            "N/A"}
                                                    </strong>

                                                    <small>
                                                        {transaction
                                                            .user
                                                            ?.email ||
                                                            "N/A"}
                                                    </small>
                                                </div>
                                            </td>

                                            <td>
                                                {transaction.borrowDate
                                                    ? new Date(
                                                        transaction.borrowDate
                                                    ).toLocaleDateString(
                                                        "en-IN"
                                                    )
                                                    : "N/A"}
                                            </td>

                                            <td>
                                                {transaction.dueDate
                                                    ? new Date(
                                                        transaction.dueDate
                                                    ).toLocaleDateString(
                                                        "en-IN"
                                                    )
                                                    : "N/A"}
                                            </td>

                                            <td>
                                                <span
                                                    className={`transaction-status ${isReturned
                                                            ? "transaction-status-returned"
                                                            : "transaction-status-borrowed"
                                                        }`}
                                                >
                                                    {transaction.status}
                                                </span>
                                            </td>

                                            <td>
                                                <strong
                                                    className={
                                                        fine > 0
                                                            ? "transaction-fine"
                                                            : "transaction-no-fine"
                                                    }
                                                >
                                                    ₹{fine}
                                                </strong>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>

                    </table>

                </div>
            )}

        </div>
    );
};

export default AdminTransactions;