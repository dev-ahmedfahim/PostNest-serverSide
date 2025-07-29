import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "../config/db.js";



import userRoutes from "../routes/userRoutes.js";

// --- Initialize ---
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors());
app.use(express.json());


await connectDB();



app.use("/users", userRoutes);


app.get("/", (req, res) => {
  res.send("ForumNexus Server is live!");
});

// --- Start Listening for local development ---
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// --- Export app for Vercel ---
export default app;
