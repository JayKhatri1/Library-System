// import { User } from "../models/user.model.js";
// import { Book } from "../models/book.model.js";
// import { Transaction } from "../models/transaction.model.js";

// const getAllUsers = async (req, res) => {
//     try {

//         const adminEmail =
//             process.env.ADMIN_EMAIL?.trim().toLowerCase();


//         const users = await User.find({
//             email: {
//                 $ne: adminEmail
//             }
//         }).select("-password");


//         return res.status(200).json({
//             message: "All users fetched successfully!",
//             count: users.length,
//             users
//         });

//     } catch (error) {

//         console.error(
//             "GET ALL USERS ERROR:",
//             error
//         );

//         return res.status(500).json({
//             message: "Internal server error",
//             error: error.message
//         });

//     }
// };

// const getAllBooks = async (req, res) => {
//     try {

//         const books = await Book.find()
//             .populate("category", "name")
//             .sort({ createdAt: -1 });

//         return res.status(200).json({
//             message: "Books fetched successfully!",
//             count: books.length,
//             books
//         });

//     } catch (error) {

//         console.error("GET ALL BOOKS ERROR:", error);

//         return res.status(500).json({
//             message: "Internal server error",
//             error: error.message
//         });
//     }
// };

// const getAllTransactions = async (req, res) => {
//     try {

//         const transactions = await Transaction.find()
//             .populate("user", "username email")
//             .populate("book", "title author")
//             .sort({ createdAt: -1 });

//         return res.status(200).json({
//             message: "Transactions fetched successfully!",
//             transactions
//         });

//     } catch (error) {

//         return res.status(500).json({
//             message: "Internal server error",
//             error: error.message
//         });
//     }
// };

// const getOverdueBooks = async (req, res) => {
//     try {

//         const overdueBooks = await Transaction.find({
//             dueDate: { $lt: new Date() },
//             returnDate: null,
//             status: "borrowed"
//         })
//             .populate("user", "username email")
//             .populate("book", "title author")
//             .sort({ dueDate: 1 });

//         return res.status(200).json({
//             message: "Overdue books fetched successfully!",
//             count: overdueBooks.length,
//             overdueBooks
//         });

//     } catch (error) {

//         console.error(
//             "GET OVERDUE BOOKS ERROR:",
//             error
//         );

//         return res.status(500).json({
//             message: "Internal server error",
//             error: error.message
//         });
//     }
// };

// const getAdminDashboard = async (req, res) => {
//     try {

//         const totalUsers = await User.countDocuments({
//             role: "user"
//         });

//         const totalBooks = await Book.countDocuments();

//         const borrowedBooks = await Transaction.countDocuments({
//             returnDate: null
//         });

//         const returnedBooks = await Transaction.countDocuments({
//             returnDate: { $ne: null }
//         });

//         const overdueBooks = await Transaction.countDocuments({
//             dueDate: { $lt: new Date() },
//             returnDate: null
//         });

//         return res.status(200).json({
//             message: "Dashboard data fetched successfully!",
//             dashboard: {
//                 totalUsers,
//                 totalBooks,
//                 borrowedBooks,
//                 returnedBooks,
//                 overdueBooks
//             }
//         });

//     } catch (error) {

//         return res.status(500).json({
//             message: "Internal server error",
//             error: error.message
//         });
//     }
// };


// export {
//     getAllUsers,
//     getAllBooks,
//     getAllTransactions,
//     getOverdueBooks,
//     getAdminDashboard
// };

import { User } from "../models/user.model.js";
import { Book } from "../models/book.model.js";
import { Transaction } from "../models/transaction.model.js";


// ==========================================
// GET ALL USERS
// ==========================================

const getAllUsers = async (req, res) => {
    try {

        const adminEmail =
            process.env.ADMIN_EMAIL?.trim().toLowerCase();

        const users = await User.find({
            email: {
                $ne: adminEmail
            }
        }).select("-password");

        return res.status(200).json({
            message: "All users fetched successfully!",
            count: users.length,
            users
        });

    } catch (error) {

        console.error(
            "GET ALL USERS ERROR:",
            error
        );

        return res.status(500).json({
            message: "Internal server error",
    
        });
    }
};


// ==========================================
// GET ALL BOOKS
// ==========================================

const getAllBooks = async (req, res) => {
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

        console.error(
            "GET ALL BOOKS ERROR:",
            error
        );

        return res.status(500).json({
            message: "Internal server error",
            
        });
    }
};


// ==========================================
// GET ALL TRANSACTIONS
// ==========================================

const getAllTransactions = async (req, res) => {
    try {

        const transactions =
            await Transaction.find()
                .populate("user", "username email")
                .populate("book", "title author")
                .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Transactions fetched successfully!",
            count: transactions.length,
            transactions
        });

    } catch (error) {

        console.error(
            "GET ALL TRANSACTIONS ERROR:",
            error
        );

        return res.status(500).json({
            message: "Internal server error",
            
        });
    }
};


// ==========================================
// GET OVERDUE BOOKS
// ==========================================

const getOverdueBooks = async (req, res) => {
    try {

        const overdueBooks =
            await Transaction.find({
                dueDate: {
                    $lt: new Date()
                },
                returnDate: null,
                status: "borrowed"
            })
                .populate("user", "username email")
                .populate("book", "title author")
                .sort({ dueDate: 1 });

        return res.status(200).json({
            message: "Overdue books fetched successfully!",
            count: overdueBooks.length,
            overdueBooks
        });

    } catch (error) {

        console.error(
            "GET OVERDUE BOOKS ERROR:",
            error
        );

        return res.status(500).json({
            message: "Internal server error",
            
        });
    }
};


// ==========================================
// ADMIN DASHBOARD
// ==========================================

const getAdminDashboard = async (req, res) => {
    try {

        const totalUsers =
            await User.countDocuments({
                role: "user"
            });

        const totalBooks =
            await Book.countDocuments();

        const borrowedBooks =
            await Transaction.countDocuments({
                returnDate: null,
                status: "borrowed"
            });

        const returnedBooks =
            await Transaction.countDocuments({
                returnDate: {
                    $ne: null
                },
                status: "returned"
            });

        const overdueBooks =
            await Transaction.countDocuments({
                dueDate: {
                    $lt: new Date()
                },
                returnDate: null,
                status: "borrowed"
            });

        return res.status(200).json({
            message: "Dashboard data fetched successfully!",
            dashboard: {
                totalUsers,
                totalBooks,
                borrowedBooks,
                returnedBooks,
                overdueBooks
            }
        });

    } catch (error) {

        console.error(
            "GET ADMIN DASHBOARD ERROR:",
            error
        );

        return res.status(500).json({
            message: "Internal server error",
            
        });
    }
};


export {
    getAllUsers,
    getAllBooks,
    getAllTransactions,
    getOverdueBooks,
    getAdminDashboard
};

