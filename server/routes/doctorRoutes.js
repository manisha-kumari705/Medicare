import express from "express";
import { addDoctor, getDoctors, deleteDoctor, assignPatient, loginDoctor, getDoctorPatients, updatePatientByDoctor, removePatient } from "../controllers/doctorController.js";

const router = express.Router();

router.post("/add", addDoctor);
router.get("/all", getDoctors);
router.delete("/delete/:id", deleteDoctor);
router.post("/assign", assignPatient);
router.post("/remove-patient", removePatient);
router.post("/login", loginDoctor);
router.get("/patients/:doctorId", getDoctorPatients);
router.put("/update-patient", updatePatientByDoctor);

export default router;