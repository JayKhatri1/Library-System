import { useEffect, useState } from "react";
import api from "../services/api";

const Books = () => {

    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [borrowingId, setBorrowingId] = useState(null);

    // ==========================================
    // GET BOOKS
    // ==========================================

    const getBooks = async () => {

        try {

            setLoading(true);
            setMessage("");

            const response = await api.get("/books/getall");

            setBooks(response.data.books || []);

        } catch (error) {

            console.log("GET BOOKS ERROR:", error);

            setMessage(
                error.response?.data?.message ||
                "Unable to load books"
            );

        } finally {

            setLoading(false);
        }
    };


    // ==========================================
    // SEARCH BOOKS
    // ==========================================

    const searchBooks = async () => {

        if (!search.trim()) {
            getBooks();
            return;
        }

        try {

            setLoading(true);

            const response = await api.get(
                `/books/search?name=${encodeURIComponent(search)}`
            );

            setBooks(response.data.books || []);

        } catch (error) {

            console.log("SEARCH BOOK ERROR:", error);

            setMessage(
                error.response?.data?.message ||
                "Unable to search books"
            );

        } finally {

            setLoading(false);
        }
    };


    // ==========================================
    // BORROW BOOK
    // ==========================================

    const borrowBook = async (bookId) => {

        try {

            setBorrowingId(bookId);
            setMessage("");

            const response = await api.post(
                "/transactions/borrow",
                {
                    bookId
                }
            );

            alert(response.data.message);

            // Refresh book quantities
            await getBooks();

        } catch (error) {

            console.log("BORROW BOOK ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Unable to borrow book"
            );

        } finally {

            setBorrowingId(null);

        }
    };


    // ==========================================
    // LOAD BOOKS
    // ==========================================

    useEffect(() => {
        getBooks();
    }, []);


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div>
                <h2 className="dashboard-title">
                    Books
                </h2>

                <p className="dashboard-welcome">
                    Loading books...
                </p>
            </div>
        );
    }


    // ==========================================
    // PAGE
    // ==========================================

    return (
        <div>

            <h1 className="dashboard-title">
                Library Books
            </h1>

            <p className="dashboard-welcome">
                Browse available books and borrow them.
            </p>


            {message && (
                <p className="page-message">
                    {message}
                </p>
            )}


            {/* SEARCH */}

            <div className="book-search">

                <input
                    type="text"
                    placeholder="Search book by name..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            searchBooks();
                        }
                    }}
                />

                <button
                    className="primary-button"
                    onClick={searchBooks}
                >
                    Search
                </button>

                <button
                    className="secondary-button"
                    onClick={() => {
                        setSearch("");
                        getBooks();
                    }}
                >
                    Clear
                </button>

            </div>


            {/* BOOKS */}

            {books.length === 0 ? (

                <div className="empty-state">
                    <h3>No books found</h3>
                    <p>
                        There are currently no books available.
                    </p>
                </div>

            ) : (

                <div className="book-grid">

                    {books.map((book) => (

                        <div
                            className="book-card"
                            key={book._id}
                        >

                            <div className="book-icon">
                                📚
                            </div>

                            <h2>
                                {book.title}
                            </h2>

                            <p>
                                <strong>Author:</strong>{" "}
                                {book.author}
                            </p>

                            <p>
                                <strong>Category:</strong>{" "}
                                {book.category?.name || "N/A"}
                            </p>

                            <p>
                                <strong>Total:</strong>{" "}
                                {book.quantity}
                            </p>

                            <p>
                                <strong>Available:</strong>{" "}
                                {book.availableQuantity}
                            </p>


                            {book.availableQuantity > 0 ? (

                                <button
                                    className="primary-button borrow-button"
                                    onClick={() =>
                                        borrowBook(book._id)
                                    }
                                    disabled={
                                        borrowingId === book._id
                                    }
                                >
                                    {borrowingId === book._id
                                        ? "Borrowing..."
                                        : "Borrow Book"}
                                </button>

                            ) : (

                                <button
                                    className="disabled-button"
                                    disabled
                                >
                                    Not Available
                                </button>

                            )}

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default Books;