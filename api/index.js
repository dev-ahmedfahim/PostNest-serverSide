import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import Config and Routes
import { connectDB } from "../config/db.js";
import userRoutes from "../routes/userRoutes.js";
import authRoutes from "../routes/authRoutes.js"; // 1. Import auth routes

// --- Initialize ---
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Connect to Database ---
await connectDB();

// --- API Routes ---
app.use("/users", userRoutes);
app.use("/auth", authRoutes); // 2. Use the auth routes

// --- Root Route for Testing ---
app.get("/", (req, res) => {
  res.send("ForumNexus Server is live!");
});

// --- Start Listening for local development ---
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// --- Export app for Vercel ---
export default app;
