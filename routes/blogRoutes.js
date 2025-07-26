// routes/blogRoutes.js

const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const upload = require("../middlewares/uploadMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

// Public routes
router.get("/blogs", blogController.getAllBlogs);
router.get("/blogs/:id", blogController.getBlogById);

// Protected routes (require login)
router.post("/blogs", authMiddleware, upload.single("image"), blogController.createBlog);
router.put("/blogs/:id", authMiddleware, upload.single("image"), blogController.updateBlog);
router.delete("/blogs/:id", authMiddleware, blogController.deleteBlog);

module.exports = router;
