import express from "express";
import {
  getCommentsByPostId,
  createComment,
} from "../controllers/commentController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

// This route will handle GET requests to /comments/:postId
router.get("/:postId", getCommentsByPostId);

// This route will handle POST requests to /comments
router.post("/", verifyJWT, createComment);

export default router;
