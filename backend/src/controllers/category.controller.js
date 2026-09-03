import { Category } from "../models/category.model.js";
import { Book } from "../models/book.model.js";


// ==========================================
// ADD CATEGORY
// ==========================================

const addCategory = async (req, res) => {
    try {

        const { name, description } = req.body;

        // Validate
        if (!name) {
            return res.status(400).json({
                message: "Category name is required!"
            });
        }

        // Check existing category
        const existingCategory = await Category.findOne({
            name: name.trim()
        });

        if (existingCategory) {
            return res.status(400).json({
                message: "Category already exists!"
            });
        }

        // Create category
        const category = await Category.create({
            name: name.trim(),
            description
        });

        return res.status(201).json({
            message: "Category added successfully!",
            category
        });

    } catch (error) {

        console.error("ADD CATEGORY ERROR:", error);

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


// ==========================================
// GET ALL CATEGORIES
// ==========================================

const getCategories = async (req, res) => {
    try {

        const categories = await Category.find()
            .sort({ name: 1 });

        return res.status(200).json({
            message: "Categories fetched successfully!",
            count: categories.length,
            categories
        });

    } catch (error) {

        console.error("GET CATEGORIES ERROR:", error);

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


// ==========================================
// GET SINGLE CATEGORY
// ==========================================

const getCategory = async (req, res) => {
    try {

        const { id } = req.params;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found!"
            });
        }

        return res.status(200).json({
            message: "Category fetched successfully!",
            category
        });

    } catch (error) {

        console.error("GET CATEGORY ERROR:", error);

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


// ==========================================
// UPDATE CATEGORY
// ==========================================

const updateCategory = async (req, res) => {
    try {

        const { id } = req.params;
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Category name is required!"
            });
        }

        const category = await Category.findByIdAndUpdate(
            id,
            {
                name: name.trim(),
                description
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!category) {
            return res.status(404).json({
                message: "Category not found!"
            });
        }

        return res.status(200).json({
            message: "Category updated successfully!",
            category
        });

    } catch (error) {

        console.error("UPDATE CATEGORY ERROR:", error);

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


// ==========================================
// DELETE CATEGORY
// ==========================================

const deleteCategory = async (req, res) => {
    try {

        const { id } = req.params;

        // Check if category exists
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found!"
            });
        }

        // Check if any book is using this category
        const bookExists = await Book.findOne({
            category: id
        });

        if (bookExists) {
            return res.status(400).json({
                message:
                    "Cannot delete this category because it is being used by a book."
            });
        }

        // Delete category
        await Category.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Category deleted successfully!"
        });

    } catch (error) {

        console.error(
            "DELETE CATEGORY ERROR:",
            error
        );

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


export {
    addCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
};