import express from "express";

import { createToken } from "../controllers/authController.js";

const router = express.Router();


router.post("/jwt", createToken);

export default router;
