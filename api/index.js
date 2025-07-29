import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect DB
await connectDB(); // Must run before routes

// Routes
app.get("/", (req, res) => {
  res.send("PostNest API is live via Vercel!");
});

// Export app as default (Vercel will handle the function)
export default app;
