import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const EditCategory = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");


    // ==========================================
    // GET CATEGORY
    // ==========================================

    const getCategory = async () => {

        try {

            const response = await api.get(
                `/categories/${id}`
            );

            console.log(
                "CATEGORY:",
                response.data
            );

            const category =
                response.data.category;

            setName(category.name || "");
            setDescription(
                category.description || ""
            );

        } catch (error) {

            console.log(
                "GET CATEGORY ERROR:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                "Unable to load category"
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        getCategory();

    }, [id]);


    // ==========================================
    // UPDATE CATEGORY
    // ==========================================

    const updateCategory = async (e) => {

        e.preventDefault();

        if (!name.trim()) {

            setMessage(
                "Category name is required!"
            );

            return;
        }


        try {

            setSaving(true);
            setMessage("");


            const response = await api.put(
                `/categories/${id}`,
                {
                    name: name.trim(),
                    description: description.trim()
                }
            );


            console.log(
                "UPDATE CATEGORY:",
                response.data
            );


            alert(
                response.data.message ||
                "Category updated successfully!"
            );


            navigate("/admin/categories");


        } catch (error) {

            console.log(
                "UPDATE CATEGORY ERROR:",
                error
            );

            setMessage(
                error.response?.data?.message ||
                "Unable to update category"
            );

        } finally {

            setSaving(false);

        }
    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <div className="category-loading">
                <h2>Loading category...</h2>
            </div>
        );

    }


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="category-form-page">

            <div className="category-form-header">

                <h1>
                    Edit Category
                </h1>

                <p>
                    Update the category information below.
                </p>

            </div>


            <div className="category-form-card">

                {message && (

                    <div className="category-form-message">
                        {message}
                    </div>

                )}


                <form onSubmit={updateCategory}>

                    <div className="category-form-group">

                        <label htmlFor="categoryName">
                            Category Name
                        </label>

                        <input
                            id="categoryName"
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Enter category name"
                            required
                        />

                    </div>


                    <div className="category-form-group">

                        <label htmlFor="description">
                            Description
                        </label>

                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                            placeholder="Enter category description"
                        />

                    </div>


                    <div className="category-form-actions">

                        <button
                            type="submit"
                            className="category-update-button"
                            disabled={saving}
                        >
                            {saving
                                ? "Updating..."
                                : "Update Category"}
                        </button>


                        <button
                            type="button"
                            className="category-cancel-button"
                            onClick={() =>
                                navigate("/admin/categories")
                            }
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
};

export default EditCategory;