
import { Transaction } from "../models/transaction.model.js";
import { User } from "../models/user.model.js";
import { Book } from "../models/book.model.js";


const FINE_PER_DAY = 10;
const LIBRARY_TIMEZONE = "Asia/Kolkata";
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;


// Get calendar date in India
const getCalendarDay = (date) => {

    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: LIBRARY_TIMEZONE,
        year: "numeric",
        month: "numeric",
        day: "numeric"
    }).formatToParts(date);

    const year = Number(parts.find(p => p.type === "year").value);
    const month = Number(parts.find(p => p.type === "month").value);
    const day = Number(parts.find(p => p.type === "day").value);

    return Math.floor(
        Date.UTC(year, month - 1, day) / MILLISECONDS_PER_DAY
    );
};


// Create due date: 7 calendar days after borrowing
const getDueDate = (borrowDate) => {

    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: LIBRARY_TIMEZONE,
        year: "numeric",
        month: "numeric",
        day: "numeric"
    }).formatToParts(borrowDate);

    const year = Number(parts.find(p => p.type === "year").value);
    const month = Number(parts.find(p => p.type === "month").value);
    const day = Number(parts.find(p => p.type === "day").value);

    return new Date(
        Date.UTC(year, month - 1, day + 7, 18, 29, 59, 999)
    );
};


// Calculate fine only when returning the book
const calculateFine = (returnDate, dueDate) => {

    const returnDay = getCalendarDay(returnDate);
    const dueDay = getCalendarDay(dueDate);

    const lateDays = Math.max(0, returnDay - dueDay);

    const fine = lateDays * FINE_PER_DAY;

    return { lateDays, fine };
};



// BORROW BOOK

const borrowBook = async (req, res) => {
    try {

        const { bookId } = req.body;
        const userId = req.user.id;

        if (!bookId) {
            return res.status(400).json({
                message: "Book ID is required!"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found!"
            });
        }

        const existingTransaction = await Transaction.findOne({
            user: userId,
            book: bookId,
            returnDate: null,
            status: "borrowed"
        });

        if (existingTransaction) {
            return res.status(400).json({
                message: "You have already borrowed this book!"
            });
        }

        const book = await Book.findOneAndUpdate(
            {
                _id: bookId,
                availableQuantity: { $gt: 0 }
            },
            {
                $inc: { availableQuantity: -1 }
            },
            { new: true }
        );

        if (!book) {
            const bookExists = await Book.exists({ _id: bookId });

            return res.status(bookExists ? 400 : 404).json({
                message: bookExists
                    ? "Book is not available!"
                    : "Book not found!"
            });
        }

        const borrowDate = new Date();
        const dueDate = getDueDate(borrowDate);


        let transaction;

        try {

            transaction = await Transaction.create({
                user: userId,
                book: bookId,
                borrowDate,
                dueDate,
                status: "borrowed",
                fine: 0
            });

        } catch (createError) {

            // Restore available quantity if transaction creation fails
            try {

                await Book.updateOne(
                    { _id: bookId },
                    {
                        $inc: {
                            availableQuantity: 1
                        }
                    }
                );

            } catch (rollbackError) {

                console.error(
                    "BOOK QUANTITY ROLLBACK ERROR:",
                    rollbackError
                );

            }

            throw createError;
        }


        const populatedTransaction = await Transaction.findById(
            transaction._id
        )
            .populate("user", "username email")
            .populate("book", "title author");

        return res.status(201).json({
            message: "Book borrowed successfully!",
            transaction: populatedTransaction
        });

    } catch (error) {

        console.error("BORROW BOOK ERROR:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


// GET USER TRANSACTIONS

const getUserTransactions = async (req, res) => {
    try {

        const userId = req.user.id;

        const transactions = await Transaction.find({
            user: userId
        })
            .populate("user", "username email")
            .populate("book", "title author")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "My transactions fetched successfully!",
            count: transactions.length,
            transactions
        });

    } catch (error) {

        console.error("GET MY TRANSACTIONS ERROR:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


// RETURN BOOK


const returnBook = async (req, res) => {
    try {

        const { transactionId } = req.params;
        const userId = req.user.id;

        // Find this user's active transaction
        const transaction = await Transaction.findOne({
            _id: transactionId,
            user: userId,
            returnDate: null,
            status: "borrowed"
        });

        if (!transaction) {
            return res.status(404).json({
                message: "Active transaction not found!"
            });
        }

        // Find book
        const book = await Book.findById(transaction.book);

        if (!book) {
            return res.status(404).json({
                message: "Book not found!"
            });
        }

        // Return date
        const returnDate = new Date();

        // Calculate final fine using calendar days
        const { lateDays, fine } = calculateFine(
            returnDate,
            transaction.dueDate
        );

        // Atomically mark transaction as returned
        const updatedTransaction = await Transaction.findOneAndUpdate(
            {
                _id: transactionId,
                user: userId,
                returnDate: null,
                status: "borrowed"
            },
            {
                $set: {
                    returnDate: returnDate,
                    status: "returned",
                    fine: fine
                }
            },
            {
                new: true,
                runValidators: true
            }
        )
            .populate("user", "username email")
            .populate("book", "title author");

        // Check if another request already returned the book
        if (!updatedTransaction) {
            return res.status(400).json({
                message: "Book has already been returned!"
            });
        }

        // Increase available book quantity
        await Book.updateOne(
            { _id: transaction.book },
            {
                $inc: {
                    availableQuantity: 1
                }
            }
        );

        // Send response
        return res.status(200).json({
            message: "Book returned successfully!",
            transaction: updatedTransaction,
            lateDays: lateDays,
            fine: fine,
            finePerDay: FINE_PER_DAY
        });

    } catch (error) {

        console.error("RETURN BOOK ERROR:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


export {
    borrowBook,
    getUserTransactions,
    returnBook
};
