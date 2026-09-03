
import { Router } from "express";


import {
    loginUser,
    logoutUser,
    registerUser,
    getUserProfile,
    getMyBorrowedBooks,
    getMyReturnedBooks,
    getMyFines,
    getUserDashboard,
    getAllBooksForUser,
    getBookByIdForUser
} from "../controllers/user.controller.js";

import {
    verifyToken
} from "../middleware/auth.middleware.js";

const router = Router();


// ==========================================
// AUTH
// ==========================================

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout")
    .post(verifyToken, logoutUser);


// ==========================================
// USER PROFILE
// ==========================================

router.route("/profile").get(
    verifyToken,
    getUserProfile
);


// ==========================================
// USER DASHBOARD
// ==========================================

router.route("/dashboard").get(
    verifyToken,
    getUserDashboard
);


// ==========================================
// BOOKS
// ==========================================

router.route("/books").get(
    verifyToken,
    getAllBooksForUser
);

router.route("/books/:id").get(
    verifyToken,
    getBookByIdForUser
);


// ==========================================
// BORROWED BOOKS
// ==========================================

router.route("/borrowed-books").get(
    verifyToken,
    getMyBorrowedBooks
);


// ==========================================
// RETURNED BOOKS
// ==========================================

router.route("/returned-books").get(
    verifyToken,
    getMyReturnedBooks
);


// ==========================================
// USER FINES
// ==========================================

router.route("/fines").get(
    verifyToken,
    getMyFines
);


export default router;

