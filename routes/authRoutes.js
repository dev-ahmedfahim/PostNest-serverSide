import express from "express";
// Import the 'createToken' function from the controller file
import { createToken } from "../controllers/authController.js";

const router = express.Router();

// This line connects the URL '/jwt' to our createToken function.
// When a POST request comes to /auth/jwt, it will run the function.
router.post("/jwt", createToken);

export default router;
