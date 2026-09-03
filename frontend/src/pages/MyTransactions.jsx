import { useEffect, useState } from "react";
import api from "../services/api";

const MyTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [returningId, setReturningId] = useState(null);
    const [message, setMessage] = useState("");

    const getTransactions = async () => {
        try {
            setLoading(true);

            const response = await api.get("/transactions/my-transactions");

            setTransactions(response.data.transactions || []);
            setMessage("");
        } catch (error) {
            console.log("GET TRANSACTIONS ERROR:", error);

            setTransactions([]);

            setMessage(
                error.response?.data?.message ||
                "Unable to load transactions"
            );
        } finally {
            setLoading(false);
        }
    };

    const returnBook = async (transactionId) => {
        const confirmReturn = window.confirm(
            "Are you sure you want to return this book?"
        );

        if (!confirmReturn) return;

        try {
            setReturningId(transactionId);
            setMessage("");

            const response = await api.put(
                `/transactions/return/${transactionId}`
            );

            const fine = response.data.fine || 0;
            const lateDays = response.data.lateDays || 0;

            if (fine > 0) {
                alert(
                    `${response.data.message}\n` +
                    `Late Days: ${lateDays}\n` +
                    `Fine: ₹${fine}`
                );
            } else {
                alert(
                    `${response.data.message}\n` +
                    `Fine: ₹0`
                );
            }

            await getTransactions();
        } catch (error) {
            console.log("RETURN BOOK ERROR:", error);

            setMessage(
                error.response?.data?.message ||
                "Unable to return book"
            );
        } finally {
            setReturningId(null);
        }
    };

    useEffect(() => {
        getTransactions();
    }, []);

    if (loading) {
        return (
            <div className="page-message">
                <h2>Loading transactions...</h2>
            </div>
        );
    }

    return (
        <div>
            <h1 className="dashboard-title">
                My Borrowed Books
            </h1>

            <p className="dashboard-welcome">
                View your borrowed books, due dates and return status.
            </p>

            {message && (
                <p className="page-message">
                    {message}
                </p>
            )}

            {transactions.length === 0 ? (
                <div className="empty-state">
                    <h2>No Transactions</h2>
                    <p>
                        You have not borrowed any books yet.
                    </p>
                </div>
            ) : (
                <div className="transaction-list">
                    {transactions.map((transaction) => {
                        const isBorrowed =
                            transaction.status === "borrowed";

                        const isReturned =
                            transaction.status === "returned";

                        const fine = transaction.fine || 0;

                        return (
                            <div
                                className="transaction-card"
                                key={transaction._id}
                            >
                                <div className="transaction-header">
                                    <div>
                                        <h2 className="transaction-title">
                                            📖{" "}
                                            {transaction.book?.title ||
                                                "Book unavailable"}
                                        </h2>

                                        <p className="transaction-author">
                                            Author:{" "}
                                            {transaction.book?.author ||
                                                "N/A"}
                                        </p>
                                    </div>

                                    <span
                                        className={`status-badge ${isBorrowed
                                                ? "status-borrowed"
                                                : "status-returned"
                                            }`}
                                    >
                                        {transaction.status}
                                    </span>
                                </div>

                                <div className="transaction-details">
                                    <div className="transaction-row">
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

                                    <div className="transaction-row">
                                        <span>Due Date</span>
                                        <strong>
                                            {transaction.dueDate
                                                ? new Date(
                                                    transaction.dueDate
                                                ).toLocaleDateString(
                                                    "en-IN"
                                                )
                                                : "N/A"}
                                        </strong>
                                    </div>

                                    {transaction.returnDate && (
                                        <div className="transaction-row">
                                            <span>Return Date</span>
                                            <strong>
                                                {new Date(
                                                    transaction.returnDate
                                                ).toLocaleDateString(
                                                    "en-IN"
                                                )}
                                            </strong>
                                        </div>
                                    )}

                                    <div className="transaction-row">
                                        <span>Fine</span>
                                        <strong
                                            className={
                                                fine > 0
                                                    ? "fine-danger"
                                                    : "fine-success"
                                            }
                                        >
                                            ₹{fine}
                                        </strong>
                                    </div>
                                </div>

                                {fine > 0 && (
                                    <div className="fine-box">
                                        ⚠️ Late return fine: ₹{fine}
                                    </div>
                                )}

                                <div className="transaction-action">
                                    {isBorrowed && (
                                        <button
                                            className="return-button"
                                            onClick={() =>
                                                returnBook(
                                                    transaction._id
                                                )
                                            }
                                            disabled={
                                                returningId ===
                                                transaction._id
                                            }
                                        >
                                            {returningId ===
                                                transaction._id
                                                ? "Returning..."
                                                : "Return Book"}
                                        </button>
                                    )}

                                    {isReturned && (
                                        <span className="returned-text">
                                            ✓ Book Returned
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyTransactions;