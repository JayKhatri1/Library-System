import { Router } from "express";

import {
    verifyToken
} from "../middleware/auth.middleware.js";

import {
    borrowBook,
    getUserTransactions,
    returnBook
} from "../controllers/transaction.controller.js";

const router = Router();


// Borrow book
router.route("/borrow").post(
    verifyToken,
    borrowBook
);


// Logged-in user's transactions only
router.route("/my-transactions").get(
    verifyToken,
    getUserTransactions
);


// Return book
router.route("/return/:transactionId").put(
    verifyToken,
    returnBook
);

export default router;