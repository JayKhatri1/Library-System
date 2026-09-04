import { Router } from "express";

import {
    addCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
} from "../controllers/category.controller.js";

import {
    verifyToken,
    isAdmin
} from "../middleware/auth.middleware.js";


const router = Router();


// ==========================================
// ADMIN - ADD CATEGORY
// ==========================================

router.route("/addcategory").post(
    verifyToken,
    isAdmin,
    addCategory
);


// ==========================================
// GET ALL CATEGORIES
// ==========================================

router.route("/getall").get(
    verifyToken,
    getCategories
);


// ==========================================
// GET ONE CATEGORY
// ==========================================

router.route("/:id").get(
    verifyToken,
    getCategory
);


// ==========================================
// ADMIN - UPDATE CATEGORY
// ==========================================

router.route("/:id").put(
    verifyToken,
    isAdmin,
    updateCategory
);


// ==========================================
// ADMIN - DELETE CATEGORY
// ==========================================

router.route("/:id").delete(
    verifyToken,
    isAdmin,
    deleteCategory
);


export default router;