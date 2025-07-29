import express from "express";
// Import the controller functions
import {
  getAllAnnouncements,
  createAnnouncement,
} from "../controllers/announcementController.js";
// Import our security middleware
import verifyJWT from "../middleware/verifyJWT.js";
import verifyAdmin from "../middleware/verifyAdmin.js";

const router = express.Router();


router.get("/", getAllAnnouncements);

// --- Admin-Only Protected Route ---

router.post("/", verifyJWT, verifyAdmin, createAnnouncement);

export default router;
