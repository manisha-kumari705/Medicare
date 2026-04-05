import express from "express";
import { registerUser, loginUser, getAllUsers, deleteUser, updateMedicalDetails, getUserById } from "../controllers/userController.js";

const router = express.Router();

// ✅ Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/all", getAllUsers);
router.delete("/delete/:id", deleteUser);
router.put("/update-medical/:id", updateMedicalDetails);
router.get("/:id", getUserById);

export default router;