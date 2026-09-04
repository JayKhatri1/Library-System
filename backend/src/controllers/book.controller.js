import { Book } from "../models/book.model.js";
import { Category } from "../models/category.model.js";


// ==========================================
// ADD BOOK
// ==========================================

const addBook = async (req, res) => {
    try {

        const {
            title,
            author,
            category,
            quantity
        } = req.body;


        // Validate fields

        if (!title || !author || !category || !quantity) {
            return res.status(400).json({
                message: "All fields are required!"
            });
        }


        // Check category

        const categoryExists = await Category.findById(category);

        if (!categoryExists) {
            return res.status(404).json({
                message: "Category not found!"
            });
        }


        // Create book

        const book = await Book.create({
            title: title.trim(),
            author: author.trim(),
            category,
            quantity,
            availableQuantity: quantity
        });


        return res.status(201).json({
            message: "Book added successfully!",
            book
        });

    } catch (error) {

        console.error("ADD BOOK ERROR:", error);

        return res.status(500).json({
            message: "Internal server error",
        
        });
    }
};


// ==========================================
// GET ALL BOOKS
// ==========================================

const getBooks = async (req, res) => {
    try {

        const books = await Book.find()
            .populate("category", "name")
            .sort({ createdAt: -1 });


        return res.status(200).json({
            message: "Books fetched successfully!",
            count: books.length,
            books
        });

    } catch (error) {

        console.error("GET BOOKS ERROR:", error);

        return res.status(500).json({
            message: "Internal server error",
            
        });
    }
};


// ==========================================
// GET ONE BOOK
// ==========================================

const getBook = async (req, res) => {
    try {

        const { id } = req.params;


        const book = await Book.findById(id)
            .populate("category", "name");


        if (!book) {
            return res.status(404).json({
                message: "Book not found!"
            });
        }


        return res.status(200).json({
            message: "Book fetched successfully!",
            book
        });

    } catch (error) {

        console.error("GET BOOK ERROR:", error);

        return res.status(500).json({
            message: "Internal server error",
            
        });
    }
};


// ==========================================
// UPDATE BOOK
// ==========================================

const updateBook = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            title,
            author,
            category,
            quantity
        } = req.body;


        // Validate

        if (!title || !author || !category || !quantity) {
            return res.status(400).json({
                message: "All fields are required!"
            });
        }


        // Check category

        const categoryExists = await Category.findById(category);

        if (!categoryExists) {
            return res.status(404).json({
                message: "Category not found!"
            });
        }


        // Find book

        const oldBook = await Book.findById(id);

        if (!oldBook) {
            return res.status(404).json({
                message: "Book not found!"
            });
        }


        // Calculate borrowed books

        const borrowedBooks =
            oldBook.quantity - oldBook.availableQuantity;


        // Prevent quantity from becoming smaller
        // than currently borrowed books

        if (quantity < borrowedBooks) {
            return res.status(400).json({
                message: `Quantity cannot be less than ${borrowedBooks} because some books are currently borrowed.`
            });
        }


        const newAvailableQuantity =
            quantity - borrowedBooks;


        const book = await Book.findByIdAndUpdate(
            id,
            {
                title: title.trim(),
                author: author.trim(),
                category,
                quantity,
                availableQuantity: newAvailableQuantity
            },
            {
                new: true,
                runValidators: true
            }
        ).populate("category", "name");


        return res.status(200).json({
            message: "Book updated successfully!",
            book
        });

    } catch (error) {

        console.error("UPDATE BOOK ERROR:", error);

        return res.status(500).json({
            message: "Internal server error",
        
        });
    }
};


// ==========================================
// DELETE BOOK
// ==========================================

const deleteBook = async (req, res) => {
    try {

        const { id } = req.params;

        // Find book
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found!"
            });
        }

        // Calculate currently borrowed copies
        const borrowedBooks =
            book.quantity - book.availableQuantity;

        // Don't delete if books are borrowed
        if (borrowedBooks > 0) {
            return res.status(400).json({
                message: `Cannot delete this book. ${borrowedBooks} copy/copies are currently borrowed.`
            });
        }

        // Delete book
        await Book.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Book deleted successfully!"
        });

    } catch (error) {

        console.error("DELETE BOOK ERROR:", error);

        return res.status(500).json({
            message: "Internal server error",
            
        });
    }
};

const searchBooks = async (req, res) => {
    try {

        const { name } = req.query;

        if (!name) {
            return res.status(400).json({
                message: "Book name is required"
            });
        }

        const books = await Book.find({
            title: { $regex: name, $options: "i" }
        }).populate("category", "name");

        res.status(200).json({
            message: "Books found",
            books
        });

    } catch (error) {

        res.status(500).json({
            message: "Internal server error",
            
        });

    }
};

export {
    addBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook,
    searchBooks
};