import { useState } from "react";
import api from "../services/api";

const AddCategory = () => {

    const [name, setName] = useState("");
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");


    const addCategory = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setMessage("Category name is required!");
            return;
        }

        try {

            setSaving(true);
            setMessage("");

            const response = await api.post(
                "/categories/addcategory",
                {
                    name: name.trim()
                }
            );

            console.log("ADD CATEGORY:", response.data);

            alert(
                response.data.message ||
                "Category added successfully!"
            );

            setName("");

        } catch (error) {

            console.log(
                "ADD CATEGORY ERROR:",
                error.response?.data || error
            );

            setMessage(
                error.response?.data?.message ||
                "Unable to add category"
            );

        } finally {

            setSaving(false);

        }
    };


    return (

        <div className="category-form-page">

            <div className="category-form-header">

                <h1>
                    Add New Category
                </h1>

                <p>
                    Add a new category to organize library books.
                </p>

            </div>


            <div className="category-form-card">

                {message && (
                    <div className="category-form-message">
                        {message}
                    </div>
                )}


                <form onSubmit={addCategory}>

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


                    <div className="category-form-actions">

                        <button
                            type="submit"
                            className="category-update-button"
                            disabled={saving}
                        >
                            {saving
                                ? "Adding..."
                                : "Add Category"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
};

export default AddCategory;