import express from "express";
import {
  createBlog,
  deleteBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
} from "../controllers/blogsController.js";

const router = express.Router();

// Create Blog
router.post("/create/blogs", createBlog);

// Update Blog
router.put("/update/blogs/:id", updateBlog);

// Get All Blogs
router.get("/get/blogs", getBlogs);

// Get Single Blog
router.get("/get/single/blog/:id", getSingleBlog);

// Delete Blog
router.delete("/delete/blog/:id", deleteBlog);

export default router;
