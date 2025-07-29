import express from "express";
// Import the controller functions
import {
  getAllPosts,
  createPost,
  getPostById,
} from "../controllers/postController.js";

import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

// --- Public Route to get all posts ---

router.get("/", getAllPosts);

// --- Public Route to get a single post by ID ---

router.get("/:id", getPostById);

// --- Protected Route to create a post ---

router.post("/", verifyJWT, createPost);

export default router;
