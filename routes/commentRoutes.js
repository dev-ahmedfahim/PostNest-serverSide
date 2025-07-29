import express from "express";

import {
  getCommentsByPostId,
  createComment,
} from "../controllers/commentController.js";

import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

// --- Public Route ---

router.get("/:postId", getCommentsByPostId);

// --- Protected Route ---

router.post("/", verifyJWT, createComment);

export default router;
