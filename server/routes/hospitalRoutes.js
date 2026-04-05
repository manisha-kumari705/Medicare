import express from "express";
import { loginHospital } from "../controllers/hospitalController.js";

const router = express.Router();

// ✅ Only login route
router.post("/login", loginHospital);

export default router;