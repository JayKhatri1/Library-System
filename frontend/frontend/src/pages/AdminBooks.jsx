import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const AdminBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const getBooks = async () => {
        try {
            setLoading(true);

            const response = await api.get("/admin/books");

            console.log("ADMIN BOOKS:", response.data);

            setBooks(response.data.books || []);
            setMessage("");
        } catch (error) {
            console.log("GET ADMIN BOOKS ERROR:", error);

            setMessage(
                error.response?.data?.message ||
                "Unable to load books"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBooks();
    }, []);

    const deleteBook = async (bookId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this book?"
        );

        if (!confirmDelete) return;

        try {
            const response = await api.delete(
                `/books/${bookId}`
            );

            alert(response.data.message);

            setBooks((previousBooks) =>
                previousBooks.filter(
                    (book) => book._id !== bookId
                )
            );
        } catch (error) {
            console.log("DELETE BOOK ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Unable to delete book"
            );
        }
    };

    if (loading) {
        return (
            <div className="admin-page-message">
                <h2>Loading books...</h2>
            </div>
        );
    }

    return (
        <div className="admin-books-page">

            {/* Page Header */}

            <div className="admin-page-header">
                <div>
                    <h1 className="admin-page-title">
                        Manage Books
                    </h1>

                    <p className="admin-page-subtitle">
                        Add, edit and manage all library books.
                    </p>
                </div>

                <div className="admin-books-header-actions">
                    <div className="admin-count-box">
                        Total Books:{" "}
                        <strong>{books.length}</strong>
                    </div>

                    <Link
                        to="/admin/books/add"
                        className="admin-add-button"
                    >
                        + Add Book
                    </Link>
                </div>
            </div>

            {message && (
                <div className="admin-page-message">
                    {message}
                </div>
            )}

            {/* Books */}

            {books.length === 0 ? (
                <div className="admin-empty-state">

                    <div className="admin-empty-icon">
                        📚
                    </div>

                    <h2>No Books Found</h2>

                    <p>
                        There are currently no books in the library.
                    </p>

                    <Link
                        to="/admin/books/add"
                        className="admin-add-button"
                    >
                        + Add Your First Book
                    </Link>

                </div>
            ) : (
                <div className="admin-books-grid">

                    {books.map((book) => (
                        <div
                            className="admin-book-card"
                            key={book._id}
                        >

                            <div className="admin-book-icon">
                                📖
                            </div>

                            <div className="admin-book-content">

                                <h2>
                                    {book.title}
                                </h2>

                                <p className="admin-book-author">
                                    By {book.author}
                                </p>

                                <div className="admin-book-category">
                                    {book.category?.name ||
                                        "No Category"}
                                </div>

                                <div className="admin-book-stock">

                                    <div>
                                        <span>
                                            Total
                                        </span>

                                        <strong>
                                            {book.quantity}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>
                                            Available
                                        </span>

                                        <strong className={
                                            book.availableQuantity > 0
                                                ? "available-stock"
                                                : "unavailable-stock"
                                        }>
                                            {book.availableQuantity}
                                        </strong>
                                    </div>

                                </div>

                            </div>

                            <div className="admin-book-actions">

                                <Link
                                    to={`/admin/books/edit/${book._id}`}
                                    className="admin-edit-button"
                                >
                                    Edit
                                </Link>

                                <button
                                    className="admin-delete-button"
                                    onClick={() =>
                                        deleteBook(book._id)
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
};

export default AdminBooks;