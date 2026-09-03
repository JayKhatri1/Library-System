import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const getCategories = async () => {
        try {
            setLoading(true);

            const response = await api.get("/categories/getall");

            console.log("ADMIN CATEGORIES:", response.data);

            setCategories(response.data.categories || []);
            setMessage("");
        } catch (error) {
            console.log("GET CATEGORIES ERROR:", error);

            setMessage(
                error.response?.data?.message ||
                "Unable to load categories"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const deleteCategory = async (categoryId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmDelete) return;

        try {
            const response = await api.delete(
                `/categories/${categoryId}`
            );

            alert(response.data.message);

            setCategories((previousCategories) =>
                previousCategories.filter(
                    (category) => category._id !== categoryId
                )
            );
        } catch (error) {
            console.log("DELETE CATEGORY ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Unable to delete category"
            );
        }
    };

    if (loading) {
        return (
            <div className="admin-page-message">
                <h2>Loading categories...</h2>
            </div>
        );
    }

    return (
        <div className="admin-categories-page">

            {/* Header */}

            <div className="admin-page-header">
                <div>
                    <h1 className="admin-page-title">
                        Manage Categories
                    </h1>

                    <p className="admin-page-subtitle">
                        Organize books using library categories.
                    </p>
                </div>

                <div className="admin-categories-header-actions">
                    <div className="admin-count-box">
                        Total Categories:{" "}
                        <strong>{categories.length}</strong>
                    </div>

                    <Link
                        to="/admin/categories/add"
                        className="admin-add-button"
                    >
                        + Add Category
                    </Link>
                </div>
            </div>

            {message && (
                <div className="admin-page-message">
                    {message}
                </div>
            )}

            {/* Categories */}

            {categories.length === 0 ? (
                <div className="admin-empty-state">

                    <div className="admin-empty-icon">
                        📂
                    </div>

                    <h2>No Categories Found</h2>

                    <p>
                        There are currently no categories in the library.
                    </p>

                    <Link
                        to="/admin/categories/add"
                        className="admin-add-button"
                    >
                        + Add Your First Category
                    </Link>

                </div>
            ) : (
                <div className="admin-category-grid">

                    {categories.map((category) => (
                        <div
                            className="admin-category-card"
                            key={category._id}
                        >

                            <div className="admin-category-icon">
                                📂
                            </div>

                            <div className="admin-category-content">

                                <h2>
                                    {category.name}
                                </h2>

                                <p>
                                    {category.description ||
                                        "No description available."}
                                </p>

                            </div>

                            <div className="admin-category-actions">

                                <Link
                                    to={`/admin/categories/edit/${category._id}`}
                                    className="admin-edit-button"
                                >
                                    Edit
                                </Link>

                                <button
                                    className="admin-delete-button"
                                    onClick={() =>
                                        deleteCategory(category._id)
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

export default AdminCategories;