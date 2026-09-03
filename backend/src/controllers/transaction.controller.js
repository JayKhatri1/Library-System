import { Transaction } from "../models/transaction.model.js";
import { User } from "../models/user.model.js";
import { Book } from "../models/book.model.js";


// ==========================================
// BORROW BOOK
// ==========================================

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


        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({
                message: "Book not found!"
            });
        }


        if (book.availableQuantity <= 0) {
            return res.status(400).json({
                message: "Book is not available!"
            });
        }


        const existingTransaction =
            await Transaction.findOne({
                user: userId,
                book: bookId,
                returnDate: null
            });


        if (existingTransaction) {
            return res.status(400).json({
                message: "You have already borrowed this book!"
            });
        }


        const borrowDate = new Date();

        const dueDate = new Date(borrowDate);

        dueDate.setDate(
            dueDate.getDate() + 7
        );


        const transaction = await Transaction.create({
            user: userId,
            book: bookId,
            borrowDate,
            dueDate,
            status: "borrowed",
            fine: 0
        });


        book.availableQuantity -= 1;

        await book.save();


        const populatedTransaction =
            await Transaction.findById(
                transaction._id
            )
                .populate("user", "username email")
                .populate("book", "title author");


        return res.status(201).json({
            message: "Book borrowed successfully!",
            transaction: populatedTransaction
        });

    } catch (error) {

        console.error(
            "BORROW BOOK ERROR:",
            error
        );

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


// ==========================================
// GET USER BORROWED BOOKS
// ==========================================

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

        console.error(
            "GET MY TRANSACTIONS ERROR:",
            error
        );

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

// ==========================================
// RETURN BOOK
// ==========================================

const returnBook = async (req, res) => {
    try {

        const { transactionId } = req.params;

        // Get logged-in user's ID from JWT
        const userId = req.user.id;

        // Find ONLY this user's active transaction
        const transaction = await Transaction.findOne({
            _id: transactionId,
            user: userId,
            returnDate: null
        });

        if (!transaction) {
            return res.status(404).json({
                message: "Active transaction not found!"
            });
        }



        // Check if already returned

        if (transaction.status === "returned") {
            return res.status(400).json({
                message: "Book has already been returned!"
            });
        }


        // Find book

        const book = await Book.findById(
            transaction.book
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found!"
            });
        }


        // Return date

        const returnDate = new Date();


        // Calculate late days

        let lateDays = 0;
        let fine = 0;


        if (returnDate > transaction.dueDate) {

            const difference =
                returnDate - transaction.dueDate;

            lateDays = Math.ceil(
                difference / (1000 * 60 * 60 * 24)
            );

            // ₹10 per late day

            fine = lateDays * 10;
        }


        // Update transaction

        transaction.returnDate = returnDate;
        transaction.status = "returned";
        transaction.fine = fine;

        await transaction.save();


        // Increase available quantity

        book.availableQuantity += 1;

        await book.save();


        return res.status(200).json({
            message: "Book returned successfully!",
            transaction,
            lateDays,
            fine
        });

    } catch (error) {

        console.error("RETURN BOOK ERROR:", error);

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


export {
    borrowBook,
    getUserTransactions,
    returnBook
};