import { useEffect, useState } from "react";
import api from "../services/api";

const AddBook = () => {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");

    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        try {

            const response = await api.get("/categories/getall");

            console.log("CATEGORIES:", response.data);

            setCategories(response.data.categories || []);

        } catch (error) {

            console.log("GET CATEGORIES ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Unable to load categories"
            );
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const addBook = async (e) => {
        e.preventDefault();

        try {

            const response = await api.post(
                "/books/addbook",
                {
                    title,
                    author,
                    category,
                    quantity: Number(quantity)
                }
            );

            alert(response.data.message);

            setTitle("");
            setAuthor("");
            setCategory("");
            setQuantity("");

        } catch (error) {

            console.log("ADD BOOK ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Unable to add book"
            );
        }
    };

    return (
        <div className="book-form-page">

            <div className="book-form-header">
                <h1>Add New Book</h1>
                <p>
                    Add a new book to the digital library.
                </p>
            </div>

            <div className="book-form-card">

                <form onSubmit={addBook}>

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
                        Add Book
                    </button>

                </form>

            </div>

        </div>
    );
};

export default AddBook;