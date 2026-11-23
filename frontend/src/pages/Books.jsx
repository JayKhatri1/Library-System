// import { useEffect, useState } from "react";
// import api from "../services/api";

// const Books = () => {

//     const [books, setBooks] = useState([]);
//     const [search, setSearch] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [message, setMessage] = useState("");
//     const [borrowingId, setBorrowingId] = useState(null);

//     // GET BOOKS

//     const getBooks = async () => {

//         try {

//             setLoading(true);
//             setMessage("");

//             const response = await api.get("/books/getall");

//             setBooks(response.data.books || []);

//         } catch (error) {

//             console.log("GET BOOKS ERROR:", error);

//             setMessage(
//                 error.response?.data?.message ||
//                 "Unable to load books"
//             );

//         } finally {

//             setLoading(false);
//         }
//     };

//     // SEARCH BOOKS

//     const searchBooks = async () => {

//         if (!search.trim()) {
//             getBooks();
//             return;
//         }

//         try {

//             setLoading(true);

//             const response = await api.get(
//                 `/books/search?name=${encodeURIComponent(search)}`
//             );

//             setBooks(response.data.books || []);

//         } catch (error) {

//             console.log("SEARCH BOOK ERROR:", error);

//             setMessage(
//                 error.response?.data?.message ||
//                 "Unable to search books"
//             );

//         } finally {

//             setLoading(false);
//         }
//     };


//     // BORROW BOOK

//     const borrowBook = async (bookId) => {

//         try {

//             setBorrowingId(bookId);
//             setMessage("");

//             const response = await api.post(
//                 "/transactions/borrow",
//                 {
//                     bookId
//                 }
//             );

//             alert(response.data.message);

//             // Refresh book quantities
//             await getBooks();

//         } catch (error) {

//             console.log("BORROW BOOK ERROR:", error);

//             alert(
//                 error.response?.data?.message ||
//                 "Unable to borrow book"
//             );

//         } finally {

//             setBorrowingId(null);

//         }
//     };


//     // LOAD BOOKS

//     useEffect(() => {
//         getBooks();
//     }, []);


//     // LOADING

//     if (loading) {
//         return (
//             <div>
//                 <h2 className="dashboard-title">
//                     Books
//                 </h2>

//                 <p className="dashboard-welcome">
//                     Loading books...
//                 </p>
//             </div>
//         );
//     }


//     // PAGE

//     return (
//         <div>

//             <h1 className="dashboard-title">
//                 Library Books
//             </h1>

//             <p className="dashboard-welcome">
//                 Browse available books and borrow them.
//             </p>


//             {message && (
//                 <p className="page-message">
//                     {message}
//                 </p>
//             )}

//             <div className="user-book-search">

//                 <div className="user-book-search-heading">
//                     <h3>Find a Book</h3>
//                     <p>Search by book title or author name</p>
//                 </div>

//                 <div className="user-book-search-box">

//                     <div className="user-book-search-input">

//                         <span className="user-book-search-icon">
//                             🔍
//                         </span>

//                         <input
//                             type="text"
//                             placeholder="Search for a book..."
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                         />

//                     </div>

//                     <button
//                         className="user-book-search-button"
//                         onClick={searchBooks}
//                     >
//                         Search
//                     </button>

//                     {search && (
//                         <button
//                             className="user-book-clear-button"
//                             onClick={() => {
//                                 setSearch("");
//                                 getBooks();
//                             }}
//                         >
//                             Clear
//                         </button>
//                     )}

//                 </div>

//             </div>

//             {/* BOOKS */}

//             {books.length === 0 ? (

//                 <div className="empty-state">
//                     <h3>No books found</h3>
//                     <p>
//                         There are currently no books available.
//                     </p>
//                 </div>

//             ) : (

//                 <div className="book-grid">

//                     {books.map((book) => (

//                         <div
//                             className="book-card"
//                             key={book._id}
//                         >

//                             <div className="book-icon">
//                                 📚
//                             </div>

//                             <h2>
//                                 {book.title}
//                             </h2>

//                             <p>
//                                 <strong>Author:</strong>{" "}
//                                 {book.author}
//                             </p>

//                             <p>
//                                 <strong>Category:</strong>{" "}
//                                 {book.category?.name || "N/A"}
//                             </p>

//                             <p>
//                                 <strong>Total:</strong>{" "}
//                                 {book.quantity}
//                             </p>

//                             <p>
//                                 <strong>Available:</strong>{" "}
//                                 {book.availableQuantity}
//                             </p>


//                             {book.availableQuantity > 0 ? (

//                                 <button
//                                     className="primary-button borrow-button"
//                                     onClick={() =>
//                                         borrowBook(book._id)
//                                     }
//                                     disabled={
//                                         borrowingId === book._id
//                                     }
//                                 >
//                                     {borrowingId === book._id
//                                         ? "Borrowing..."
//                                         : "Borrow Book"}
//                                 </button>

//                             ) : (

//                                 <button
//                                     className="disabled-button"
//                                     disabled
//                                 >
//                                     Not Available
//                                 </button>

//                             )}

//                         </div>

//                     ))}

//                 </div>

//             )}

//         </div>
//     );
// };

// export default Books;

// import { useEffect, useState } from "react";
// import api from "../services/api";

// const Books = () => {

//     const [books, setBooks] = useState([]);
//     const [categories, setCategories] = useState([]);

//     const [search, setSearch] = useState("");
//     const [selectedCategory, setSelectedCategory] = useState("all");

//     const [loading, setLoading] = useState(true);
//     const [message, setMessage] = useState("");
//     const [borrowingId, setBorrowingId] = useState(null);


//     // ==========================================
//     // GET BOOKS WITH SEARCH + CATEGORY FILTER
//     // ==========================================

//     const getBooks = async (
//         category = selectedCategory,
//         searchText = search
//     ) => {

//         try {

//             setLoading(true);
//             setMessage("");

//             const response = await api.get("/books/getall", {
//                 params: {
//                     category: category === "all" ? "" : category,
//                     search: searchText.trim()
//                 }
//             });

//             setBooks(response.data.books || []);

//         } catch (error) {

//             console.log("GET BOOKS ERROR:", error);

//             setMessage(
//                 error.response?.data?.message ||
//                 "Unable to load books"
//             );

//         } finally {

//             setLoading(false);

//         }
//     };


//     // ==========================================
//     // GET ALL CATEGORIES
//     // ==========================================

//     const getCategories = async () => {

//         try {

//             const response = await api.get("/categories/getall");

//             setCategories(response.data.categories || []);

//         } catch (error) {

//             console.log("GET CATEGORIES ERROR:", error);

//             setMessage(
//                 error.response?.data?.message ||
//                 "Unable to load categories"
//             );

//         }
//     };


//     // ==========================================
//     // SEARCH BOOKS
//     // ==========================================

//     const searchBooks = () => {

//         getBooks(selectedCategory, search);

//     };


//     // ==========================================
//     // SELECT CATEGORY
//     // ==========================================

//     const selectCategory = (categoryId) => {

//         setSelectedCategory(categoryId);

//         getBooks(categoryId, search);

//     };


//     // ==========================================
//     // CLEAR SEARCH AND FILTER
//     // ==========================================

//     const clearFilters = () => {

//         setSearch("");
//         setSelectedCategory("all");

//         getBooks("all", "");

//     };


//     // ==========================================
//     // BORROW BOOK
//     // ==========================================

//     const borrowBook = async (bookId) => {

//         try {

//             setBorrowingId(bookId);
//             setMessage("");

//             const response = await api.post(
//                 "/transactions/borrow",
//                 {
//                     bookId
//                 }
//             );

//             alert(response.data.message);

//             // Refresh current filtered books
//             await getBooks(selectedCategory, search);

//         } catch (error) {

//             console.log("BORROW BOOK ERROR:", error);

//             alert(
//                 error.response?.data?.message ||
//                 "Unable to borrow book"
//             );

//         } finally {

//             setBorrowingId(null);

//         }
//     };


//     // ==========================================
//     // LOAD DATA
//     // ==========================================

//     useEffect(() => {

//         getCategories();
//         getBooks("all", "");

//     }, []);


//     // ==========================================
//     // CATEGORY ICONS
//     // ==========================================

//     const getCategoryIcon = (name) => {

//         const icons = {
//             education: "🎓",
//             technology: "💻",
//             science: "🔬",
//             business: "💼",
//             travel: "✈️",
//             history: "🏛️",
//             literature: "📖",
//             "health & fitness": "❤️"
//         };

//         return icons[name?.toLowerCase()] || "📚";

//     };


//     // ==========================================
//     // PAGE
//     // ==========================================

//     return (

//         <div>

//             <h1 className="dashboard-title">
//                 Library Books
//             </h1>

//             <p className="dashboard-welcome">
//                 Browse available books and borrow them.
//             </p>


//             {/* ==================================
//                 SEARCH SECTION
//             ================================== */}

//             <div className="book-search">

//                 <input
//                     type="text"
//                     placeholder="Search books by title or author..."
//                     value={search}
//                     onChange={(e) =>
//                         setSearch(e.target.value)
//                     }
//                     onKeyDown={(e) => {
//                         if (e.key === "Enter") {
//                             searchBooks();
//                         }
//                     }}
//                 />

//                 <button
//                     className="primary-button"
//                     onClick={searchBooks}
//                 >
//                     Search
//                 </button>

//                 <button
//                     className="secondary-button"
//                     onClick={clearFilters}
//                 >
//                     Clear
//                 </button>

//             </div>


//             {/* ==================================
//                 BROWSE BY CATEGORY
//             ================================== */}

//             <div style={{ marginTop: "30px", marginBottom: "30px" }}>

//                 <h2 style={{ marginBottom: "8px" }}>
//                     Browse by Category
//                 </h2>

//                 <p style={{ color: "#777", marginBottom: "18px" }}>
//                     Select a category to explore books.
//                 </p>


//                 <div
//                     style={{
//                         display: "grid",
//                         gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
//                         gap: "14px"
//                     }}
//                 >

//                     {/* ALL BOOKS */}

//                     <button
//                         onClick={() => selectCategory("all")}
//                         style={{
//                             padding: "18px 12px",
//                             borderRadius: "12px",
//                             border: selectedCategory === "all"
//                                 ? "2px solid #4f46e5"
//                                 : "1px solid #ddd",
//                             background: selectedCategory === "all"
//                                 ? "#eef2ff"
//                                 : "#fff",
//                             cursor: "pointer",
//                             fontSize: "14px",
//                             fontWeight: "600"
//                         }}
//                     >

//                         <div style={{ fontSize: "27px", marginBottom: "8px" }}>
//                             📚
//                         </div>

//                         All Books

//                     </button>


//                     {/* DYNAMIC CATEGORIES */}

//                     {categories.map((category) => (

//                         <button
//                             key={category._id}
//                             onClick={() =>
//                                 selectCategory(category._id)
//                             }
//                             style={{
//                                 padding: "18px 12px",
//                                 borderRadius: "12px",
//                                 border: selectedCategory === category._id
//                                     ? "2px solid #4f46e5"
//                                     : "1px solid #ddd",
//                                 background: selectedCategory === category._id
//                                     ? "#eef2ff"
//                                     : "#fff",
//                                 cursor: "pointer",
//                                 fontSize: "14px",
//                                 fontWeight: "600"
//                             }}
//                         >

//                             <div style={{ fontSize: "27px", marginBottom: "8px" }}>
//                                 {getCategoryIcon(category.name)}
//                             </div>

//                             {category.name}

//                         </button>

//                     ))}

//                 </div>

//             </div>


//             {/* ==================================
//                 BOOK RESULTS
//             ================================== */}

//             <div style={{ marginBottom: "20px" }}>

//                 <h2>
//                     {selectedCategory === "all"
//                         ? "All Library Books"
//                         : categories.find(
//                             (c) => c._id === selectedCategory
//                         )?.name || "Selected Category"
//                     }
//                 </h2>

//                 <p style={{ color: "#777" }}>
//                     {books.length} book(s) found
//                 </p>

//             </div>


//             {message && (

//                 <p className="page-message">
//                     {message}
//                 </p>

//             )}


//             {loading ? (

//                 <p className="dashboard-welcome">
//                     Loading books...
//                 </p>

//             ) : books.length === 0 ? (

//                 <div className="empty-state">

//                     <h3>No Books Found</h3>

//                     <p>
//                         There are currently no books matching your selection.
//                     </p>

//                     <button
//                         className="primary-button"
//                         onClick={clearFilters}
//                     >
//                         View All Books
//                     </button>

//                 </div>

//             ) : (

//                 <div className="book-grid">

//                     {books.map((book) => (

//                         <div
//                             className="book-card"
//                             key={book._id}
//                         >

//                             <div className="book-icon">
//                                 📚
//                             </div>

//                             <h2>
//                                 {book.title}
//                             </h2>

//                             <p>
//                                 <strong>Author:</strong>{" "}
//                                 {book.author}
//                             </p>

//                             <p>
//                                 <strong>Category:</strong>{" "}
//                                 {book.category?.name || "N/A"}
//                             </p>

//                             <p>
//                                 <strong>Total:</strong>{" "}
//                                 {book.quantity}
//                             </p>

//                             <p>
//                                 <strong>Available:</strong>{" "}
//                                 {book.availableQuantity}
//                             </p>


//                             {book.availableQuantity > 0 ? (

//                                 <button
//                                     className="primary-button borrow-button"
//                                     onClick={() =>
//                                         borrowBook(book._id)
//                                     }
//                                     disabled={
//                                         borrowingId === book._id
//                                     }
//                                 >

//                                     {borrowingId === book._id
//                                         ? "Borrowing..."
//                                         : "Borrow Book"
//                                     }

//                                 </button>

//                             ) : (

//                                 <button
//                                     className="disabled-button"
//                                     disabled
//                                 >
//                                     Not Available
//                                 </button>

//                             )}

//                         </div>

//                     ))}

//                 </div>

//             )}

//         </div>

//     );

// };

// export default Books;

import { useEffect, useState } from "react";
import api from "../services/api";

const Books = () => {

    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [categoryError, setCategoryError] = useState("");

    const [borrowingId, setBorrowingId] = useState(null);


    // ==========================================
    // GET ALL CATEGORIES
    // ==========================================

    const getCategories = async () => {

        try {

            const response = await api.get("/categories/getall");

            // Supports common category response formats
            const categoryData =
                response.data.categories ||
                response.data.data ||
                [];

            setCategories(
                Array.isArray(categoryData) ? categoryData : []
            );

        } catch (error) {

            console.log("GET CATEGORIES ERROR:", error);

            setCategoryError(
                error.response?.data?.message ||
                "Unable to load categories"
            );

        }
    };


    // ==========================================
    // GET BOOKS + SEARCH + CATEGORY FILTER
    // ==========================================

    const getBooks = async (
        category = selectedCategory,
        searchText = search
    ) => {

        try {

            setLoading(true);
            setMessage("");

            const params = {};

            if (category !== "all") {
                params.category = category;
            }

            if (searchText.trim()) {
                params.search = searchText.trim();
            }

            const response = await api.get(
                "/books/getall",
                { params }
            );

            setBooks(response.data.books || []);

        } catch (error) {

            console.log("GET BOOKS ERROR:", error);

            setBooks([]);

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

    const searchBooks = () => {

        getBooks(selectedCategory, search);
    };


    // ==========================================
    // SELECT CATEGORY
    // ==========================================

    const handleCategoryChange = (categoryId) => {

        setSelectedCategory(categoryId);

        getBooks(categoryId, search);
    };


    // ==========================================
    // CLEAR SEARCH AND FILTER
    // ==========================================

    const clearFilters = () => {

        setSearch("");
        setSelectedCategory("all");

        getBooks("all", "");
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

            // Refresh current search and category results
            await getBooks(selectedCategory, search);

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
    // LOAD DATA
    // ==========================================

    useEffect(() => {

        getCategories();
        getBooks("all", "");

    }, []);


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


            {/* MESSAGE */}

            {message && (
                <p className="page-message">
                    {message}
                </p>
            )}


            {/* SEARCH */}

            <div className="book-search">

                <input
                    type="text"
                    placeholder="Search books by title or author..."
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
                    disabled={loading}
                >
                    Search
                </button>

                <button
                    className="secondary-button"
                    onClick={clearFilters}
                >
                    Clear
                </button>

            </div>


            {/* BROWSE BY CATEGORY */}

            <h2 className="dashboard-title">
                Browse by Category
            </h2>

            {categoryError && (
                <p className="page-message">
                    {categoryError}
                </p>
            )}

            <div className="book-grid">

                {/* ALL BOOKS */}

                <div
                    className="book-card"
                    onClick={() => handleCategoryChange("all")}
                    style={{
                        cursor: "pointer",
                        border:
                            selectedCategory === "all"
                                ? "2px solid #2563eb"
                                : undefined
                    }}
                >

                    <div className="book-icon">
                        📚
                    </div>

                    <h3>All Books</h3>

                    <p>Browse all library books</p>

                </div>


                {/* DYNAMIC CATEGORIES */}

                {categories.map((category) => (

                    <div
                        className="book-card"
                        key={category._id}
                        onClick={() =>
                            handleCategoryChange(category._id)
                        }
                        style={{
                            cursor: "pointer",
                            border:
                                selectedCategory === category._id
                                    ? "2px solid #2563eb"
                                    : undefined
                        }}
                    >

                        <div className="book-icon">
                            📖
                        </div>

                        <h3>{category.name}</h3>

                        <p>Explore {category.name} books</p>

                    </div>

                ))}

            </div>


            {/* BOOK LIST */}

            <h2 className="dashboard-title">
                {selectedCategory === "all"
                    ? "All Books"
                    : categories.find(
                        (category) =>
                            category._id === selectedCategory
                    )?.name || "Category Books"}
            </h2>


            {loading ? (

                <p className="dashboard-welcome">
                    Loading books...
                </p>

            ) : books.length === 0 ? (

                <div className="empty-state">

                    <h3>No Books Found</h3>

                    <p>
                        No books match your selected category or search.
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
