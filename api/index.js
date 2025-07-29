import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// --- Import Config and Routes ---
import { connectDB } from "../config/db.js";
import userRoutes from "../routes/userRoutes.js"; 
import authRoutes from "../routes/authRoutes.js";

// --- Initialize ---
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// --- Core Middleware ---
app.use(cors());
app.use(express.json());

// --- API Routes ---
app.use("/users", userRoutes);
app.use("/auth", authRoutes); 

// --- Root Route for Testing ---
app.get("/", (req, res) => {
  res.send("ForumNexus Server is live!");
});

// --- Connect to DB and Start Server ---
const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

start();

// --- Export app for Vercel ---
export default app;
