import { Router } from "express";

import {
    addCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
} from "../controllers/category.controller.js";


const router = Router();


// Add category
router.route("/addcategory").post(addCategory);


// Get all categories
router.route("/getall").get(getCategories);


// Get one category
router.route("/:id").get(getCategory);


// Update category
router.route("/:id").put(updateCategory);


// Delete category
router.route("/:id").delete(deleteCategory);


export default router;