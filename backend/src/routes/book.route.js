import { Router } from "express";

import {
    addBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook,
    searchBooks
} from "../controllers/book.controller.js";

import {
    verifyToken,
    isAdmin
} from "../middleware/auth.middleware.js";

const router = Router();


// ==========================================
// ADMIN - ADD BOOK
// ==========================================

router.route("/addbook").post(
    verifyToken,
    isAdmin,
    addBook
);


// ==========================================
// GET ALL BOOKS
// USER + ADMIN
// ==========================================

router.route("/getall").get(
    getBooks
);


// ==========================================
// SEARCH BOOKS
// USER + ADMIN
// ==========================================

router.route("/search").get(
    searchBooks
);


// ==========================================
// GET ONE BOOK
// USER + ADMIN
// ==========================================

router.route("/:id").get(
    getBook
);


// ==========================================
// ADMIN - UPDATE BOOK
// ==========================================

router.route("/:id").put(
    verifyToken,
    isAdmin,
    updateBook
);


// ==========================================
// ADMIN - DELETE BOOK
// ==========================================

router.route("/:id").delete(
    verifyToken,
    isAdmin,
    deleteBook
);


export default router;