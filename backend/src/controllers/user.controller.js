
import { User } from "../models/user.model.js";
import { Transaction } from "../models/transaction.model.js";
import { Book } from "../models/book.model.js";
// import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";


// ==========================================
// REGISTER USER
// ==========================================

const registerUser = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required!"
            });
        }

        const existing = await User.findOne({
            email: email.toLowerCase()
        });

        if (existing) {
            return res.status(400).json({
                message: "User already exists!"
            });
        }

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false
        });

        return res.status(201).json({
            message: "User registered!",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });

    } catch (error) {

        console.error("REGISTER ERROR:", error);

        return res.status(500).json({
            message: "Internal server error",
            
        });
    }
};


// ==========================================
// LOGIN USER
// ==========================================

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required!"
            });
        }

        const normalizedEmail =
            email.trim().toLowerCase();


        // ==========================================
        // ADMIN LOGIN
        // ==========================================

        if (
            process.env.ADMIN_EMAIL &&
            normalizedEmail ===
            process.env.ADMIN_EMAIL.trim().toLowerCase() &&
            password === process.env.ADMIN_PASSWORD
        ) {

            const adminUser = {
                id: "admin",
                username: "Admin",
                email: normalizedEmail,
                role: "admin"
            };

            const token = generateToken(adminUser);

            return res.status(200).json({
                message: "Admin logged in successfully!",
                token,
                user: adminUser
            });
        }


        // ==========================================
        // FIND USER
        // ==========================================

        const user = await User.findOne({
            email: normalizedEmail
        }).select("+password");

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password!"
            })
        }


        // ==========================================
        // COMPARE PASSWORD
        // ==========================================

        const isPasswordCorrect =
            await user.comparePassword(password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password!"
            });
        }


        // ==========================================
        // USER OBJECT
        // ==========================================

        const loggedInUser = {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            role: user.role
        };


        // ==========================================
        // GENERATE JWT
        // ==========================================

        const token = generateToken(loggedInUser);


        return res.status(200).json({
            message: "User logged in successfully!",
            token,
            user: loggedInUser
        });

    } catch (error) {

        console.error("LOGIN ERROR:", error);

        return res.status(500).json({
            message: "Internal server error",
            
        });
    }
};


// ==========================================
// LOGOUT USER
// ==========================================

const logoutUser = async (req, res) => {

    try {

        return res.status(200).json({
            message: "Logout successful"
        });

    } catch (error) {

        console.error("LOGOUT ERROR:", error);

        return res.status(500).json({
            message: "Internal server error",
        
        });
    }
};


// ==========================================
// GET USER PROFILE
// ==========================================

const getUserProfile = async (req, res) => {

    try {

        // Get logged-in user from JWT
        const userId = req.user.id;

        const user = await User.findById(userId)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found!"
            });
        }

        return res.status(200).json({
            message: "Profile fetched successfully!",
            user
        });

    } catch (error) {

        console.error("GET PROFILE ERROR:", error);

        return res.status(500).json({
            message: "Internal server error",
            
        });
    }
};


// ==========================================
// GET MY BORROWED BOOKS
// ==========================================

const getMyBorrowedBooks = async (req, res) => {

    try {

        // IMPORTANT:
        // Get user ID from JWT
        const userId = req.user.id;

        const borrowedBooks =
            await Transaction.find({
                user: userId,
                returnDate: null
            })
                .populate("book", "title author category")
                .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Borrowed books fetched successfully!",
            count: borrowedBooks.length,
            borrowedBooks
        });

    } catch (error) {

        console.error(
            "GET MY BORROWED BOOKS ERROR:",
            error
        );

        return res.status(500).json({
            message: "Internal server error",
            
        });
    }
};


// ==========================================
// GET MY RETURNED BOOKS
// ==========================================

const getMyReturnedBooks = async (req, res) => {

    try {

        // IMPORTANT:
        // Get user ID from JWT
        const userId = req.user.id;

        const returnedBooks =
            await Transaction.find({
                user: userId,
                returnDate: { $ne: null }
            })
                .populate("book", "title author category")
                .sort({ returnDate: -1 });

        return res.status(200).json({
            message: "Returned books fetched successfully!",
            count: returnedBooks.length,
            returnedBooks
        });

    } catch (error) {

        console.error(
            "GET MY RETURNED BOOKS ERROR:",
            error
        );

        return res.status(500).json({
            message: "Internal server error",
        
        });
    }
};


// ==========================================
// GET MY FINES
// ==========================================

const getMyFines = async (req, res) => {

    try {

        // Get logged-in user's ID from JWT
        const userId = req.user.id;

        const transactions =
            await Transaction.find({
                user: userId,
                fine: { $gt: 0 }
            })
                .populate("book", "title author")
                .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Fines fetched successfully!",
            count: transactions.length,
            fines: transactions
        });

    } catch (error) {

        console.error(
            "GET MY FINES ERROR:",
            error
        );

        return res.status(500).json({
            message: "Internal server error",
            
        });
    }
};


// ==========================================
// GET USER DASHBOARD
// ==========================================

const getUserDashboard = async (req, res) => {
    try {

        res.set("Cache-Control", "no-store");

        // Get logged-in user's ID from JWT
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found!"
            });
        }

        // Total borrowed transactions
        const totalBorrowed =
            await Transaction.countDocuments({
                user: user._id
            });

        // Total returned books
        const returnedBooks =
            await Transaction.countDocuments({
                user: user._id,
                returnDate: { $ne: null }
            });

        // Currently borrowed books
        const currentlyBorrowed =
            await Transaction.countDocuments({
                user: user._id,
                returnDate: null
            });

        // Get transactions having fine
        const fines =
            await Transaction.find({
                user: user._id,
                fine: { $gt: 0 }
            });

        // Calculate total fine
        const totalFine = fines.reduce(
            (total, transaction) =>
                total + (transaction.fine || 0),
            0
        );

        return res.status(200).json({
            message: "Dashboard data fetched successfully!",

            dashboard: {
                totalBorrowed,
                currentlyBorrowed,
                returnedBooks,
                totalFine
            }
        });

    } catch (error) {

        console.error(
            "GET USER DASHBOARD ERROR:",
            error
        );

        return res.status(500).json({
            message: "Internal server error",
            
        });
    }
};


// ==========================================
// GET ALL BOOKS FOR USER
// ==========================================

const getAllBooksForUser = async (req, res) => {

    try {

        const {
            search,
            category,
            available
        } = req.query;

        let filter = {};


        if (search) {

            filter.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    author: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }


        if (category) {
            filter.category = category;
        }


        if (available === "true") {

            filter.availableQuantity = {
                $gt: 0
            };
        }


        const books = await Book.find(filter)
            .populate("category", "name")
            .sort({ createdAt: -1 });


        return res.status(200).json({
            message: "Books fetched successfully!",
            count: books.length,
            books
        });

    } catch (error) {

        console.error(
            "GET USER BOOKS ERROR:",
            error
        );

        return res.status(500).json({
            message: "Internal server error",
            
        });
    }
};


// ==========================================
// GET BOOK BY ID FOR USER
// ==========================================

const getBookByIdForUser = async (req, res) => {

    try {

        const { id } = req.params;

        const book = await Book.findById(id)
            .populate("category");

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

        console.error(
            "GET USER BOOK ERROR:",
            error
        );

        return res.status(500).json({
            message: "Internal server error",
            
        });
    }
};


// ==========================================
// EXPORT
// ==========================================

export {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    getMyBorrowedBooks,
    getMyReturnedBooks,
    getMyFines,
    getUserDashboard,
    getAllBooksForUser,
    getBookByIdForUser
};

