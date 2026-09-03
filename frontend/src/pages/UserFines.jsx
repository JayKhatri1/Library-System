import { useEffect, useState } from "react";
import api from "../services/api";

const UserFines = () => {
    const [fines, setFines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const getFines = async () => {
        try {
            setLoading(true);
            setMessage("");

            const response = await api.get("/users/fines");

            console.log("MY FINES:", response.data);

            setFines(response.data.fines || []);
        } catch (error) {
            console.log("GET FINES ERROR:", error);

            setFines([]);

            setMessage(
                error.response?.data?.message ||
                "Unable to load fines"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getFines();
    }, []);

    if (loading) {
        return (
            <div className="page-message">
                <h2>Loading fines...</h2>
            </div>
        );
    }

    return (
        <div>
            <h1 className="dashboard-title">
                My Fines
            </h1>

            <p className="dashboard-welcome">
                View your library fines and returned book details.
            </p>

            {message && (
                <p className="page-message">
                    {message}
                </p>
            )}

            {fines.length === 0 ? (
                <div className="empty-state">
                    <h2>🎉 No Fines</h2>
                    <p>
                        Great! You currently have no library fines.
                    </p>
                </div>
            ) : (
                <div className="fine-list">
                    {fines.map((transaction) => (
                        <div
                            className="fine-card"
                            key={transaction._id}
                        >
                            <div className="fine-header">
                                <div>
                                    <h2 className="fine-title">
                                        📖{" "}
                                        {transaction.book?.title ||
                                            "Book unavailable"}
                                    </h2>

                                    <p className="fine-author">
                                        Author:{" "}
                                        {transaction.book?.author ||
                                            "N/A"}
                                    </p>
                                </div>

                                <div className="fine-amount">
                                    ₹{transaction.fine || 0}
                                </div>
                            </div>

                            <div className="fine-details">
                                <div className="fine-row">
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

                                <div className="fine-row">
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

                                <div className="fine-row">
                                    <span>Return Date</span>
                                    <strong>
                                        {transaction.returnDate
                                            ? new Date(
                                                transaction.returnDate
                                            ).toLocaleDateString(
                                                "en-IN"
                                            )
                                            : "Not returned"}
                                    </strong>
                                </div>

                                <div className="fine-row">
                                    <span>Status</span>

                                    <strong className="fine-status">
                                        {transaction.status}
                                    </strong>
                                </div>
                            </div>

                            <div className="fine-warning">
                                ⚠️ Fine charged: ₹
                                {transaction.fine || 0}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserFines;