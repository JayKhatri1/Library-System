import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");

    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        try {
            const response = await api.get("/categories/getall");
            setCategories(response.data.categories || []);
        } catch (error) {
            console.log("GET CATEGORIES ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Unable to load categories"
            );
        }
    };

    const getBook = async () => {
        try {
            const response = await api.get(`/books/${id}`);

            const book = response.data.book;

            setTitle(book.title);
            setAuthor(book.author);
            setCategory(book.category?._id || book.category);
            setQuantity(book.quantity);

        } catch (error) {
            console.log("GET BOOK ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Unable to load book"
            );
        }
    };

    useEffect(() => {
        getCategories();
        getBook();
    }, [id]);

    const updateBook = async (e) => {
        e.preventDefault();

        try {
            const response = await api.put(
                `/books/${id}`,
                {
                    title,
                    author,
                    category,
                    quantity: Number(quantity)
                }
            );

            alert(response.data.message);

            navigate("/admin/books");

        } catch (error) {
            console.log("UPDATE BOOK ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Unable to update book"
            );
        }
    };

    return (
        <div className="book-form-page">

            <div className="book-form-header">
                <h1>Edit Book</h1>

                <p>
                    Update the book information below.
                </p>
            </div>

            <div className="book-form-card">

                <form onSubmit={updateBook}>

                    <div className="book-form-group">
                        <label htmlFor="title">
                            Book Title
                        </label>

                        <input
                            id="title"
                            type="text"
                            placeholder="Enter book title"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            required
                        />
                    </div>


                    <div className="book-form-group">
                        <label htmlFor="author">
                            Author
                        </label>

                        <input
                            id="author"
                            type="text"
                            placeholder="Enter author name"
                            value={author}
                            onChange={(e) =>
                                setAuthor(e.target.value)
                            }
                            required
                        />
                    </div>


                    <div className="book-form-group">
                        <label htmlFor="category">
                            Category
                        </label>

                        <select
                            id="category"
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                            required
                        >
                            <option value="">
                                Select Category
                            </option>

                            {categories.map((cat) => (
                                <option
                                    key={cat._id}
                                    value={cat._id}
                                >
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div className="book-form-group">
                        <label htmlFor="quantity">
                            Quantity
                        </label>

                        <input
                            id="quantity"
                            type="number"
                            min="1"
                            placeholder="Enter quantity"
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(e.target.value)
                            }
                            required
                        />
                    </div>


                    <button
                        type="submit"
                        className="book-form-button"
                    >
                        Update Book
                    </button>

                </form>

            </div>

        </div>
    );
};

export default EditBook;