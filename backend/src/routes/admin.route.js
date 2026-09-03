import { Router } from "express";

import {
    getAllUsers,
    getAllBooks,
    getAllTransactions,
    getOverdueBooks,
    getAdminDashboard
} from "../controllers/admin.controller.js";

import {
    verifyToken,
    isAdmin
} from "../middleware/auth.middleware.js";


const router = Router();


// ==========================================
// ADMIN DASHBOARD
// ==========================================

router
    .route("/dashboard")
    .get(
        verifyToken,
        isAdmin,
        getAdminDashboard
    );


// ==========================================
// ALL USERS
// ==========================================

router
    .route("/users")
    .get(
        verifyToken,
        isAdmin,
        getAllUsers
    );


// ==========================================
// ALL BOOKS
// ==========================================

router
    .route("/books")
    .get(
        verifyToken,
        isAdmin,
        getAllBooks
    );


// ==========================================
// ALL TRANSACTIONS
// ==========================================

router
    .route("/transactions")
    .get(
        verifyToken,
        isAdmin,
        getAllTransactions
    );


// ==========================================
// OVERDUE BOOKS
// ==========================================

router
    .route("/overdue")
    .get(
        verifyToken,
        isAdmin,
        getOverdueBooks
    );


export default router;