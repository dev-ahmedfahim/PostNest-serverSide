import express from "express";
// Import the controller functions
import { createUser, getAllUsers } from "../controllers/userController.js";
// Import our JWT middleware
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();


router.post("/", createUser);


router.get("/", verifyJWT, getAllUsers);

export default router;
