import express from "express";
// Import the controller functions
import { getAllPosts, createPost } from "../controllers/postController.js";
// Import our JWT middleware to protect the create route
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();


router.get("/", getAllPosts);


router.post("/", verifyJWT, createPost);

export default router;
