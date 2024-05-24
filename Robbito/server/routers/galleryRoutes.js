import express from "express";
import {
  createGallery,
  deleteGallery,
  getAllGallery,
  getSingleGallery,
  updateGallery,
} from "../controllers/galleryController.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  singleCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

// Create Gallery
router.post("/create/gallery", createGallery);

// Update Gallery
router.patch("/update/gallery/:id", updateGallery);

// Get ALl Galleries
router.get("/all/galleries", getAllGallery);

// Single Gallery
router.get("/single/gallery/:id", getSingleGallery);

// Delete Gallery
router.delete("/delete/gallery/:id", deleteGallery);

// Create Category
router.post("/create/category", createCategory);

// Update Category
router.patch("/update/category/:id", updateCategory);

// Get Category
router.get("/get/category", getCategories);

// Delete Category
router.delete("/delete/category/:id", deleteCategory);
// Single Category
router.get("/get/single/category/:id", singleCategory);

export default router;
