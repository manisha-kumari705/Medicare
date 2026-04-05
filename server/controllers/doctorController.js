import Doctor from "../models/Doctor.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

// login doctor
export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Check email
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(404).json({
        message: "No doctor found",
      });
    }

    // 🔐 Check password
    const isMatch = await bcrypt.compare(password, doctor.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    // 🎟️ Token
    const token = jwt.sign(
      { id: doctor._id, role: "doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      doctor,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      specialization,
      image,
    } = req.body;

    const existing = await Doctor.findOne({ email });

    if (existing) {
      return res.status(400).json({
        message: "Doctor already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔥 CLOUDINARY UPLOAD
    let imageUrl = "";

    if (image) {
      const uploaded = await cloudinary.uploader.upload(image, {
        folder: "medicard_doctors",
      });

      imageUrl = uploaded.secure_url;
    }

    // ✅ SAVE DOCTOR
    const doctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      specialization,
      image: imageUrl || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      patients: [],
    });

    const savedDoctor = await doctor.save();

    res.status(201).json({
      message: "Doctor added successfully",
      doctor: savedDoctor,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// fetch all doctors from database
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });

    res.status(200).json({
      doctors,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// delete doctor
export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    await Doctor.findByIdAndDelete(id);

    res.status(200).json({
      message: "Doctor deleted successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// Assign to patient
export const assignPatient = async (req, res) => {
  try {
    const { doctorId, patientId } = req.body;

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    // ✅ Prevent duplicate assignment
    if (doctor.patients.includes(patientId)) {
      return res.status(400).json({
        message: "Patient already assigned",
      });
    }

    doctor.patients.push(patientId);
    await doctor.save();

    res.status(200).json({
      message: "Patient assigned successfully",
      doctor,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// fetch doctor assigned patient
export const getDoctorPatients = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctor = await Doctor.findById(doctorId)
      .populate({
        path: "patients",
        select: "-password", // 🔥 remove password
      });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      patients: doctor.patients,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// remove assigned patient
export const removePatient = async (req, res) => {
  try {
    const { doctorId, patientId } = req.body;

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    doctor.patients = doctor.patients.filter(
      (id) => id.toString() !== patientId
    );

    await doctor.save();

    res.status(200).json({ message: "Patient removed successfully", doctor });
  } catch (error) {
    res.status(500).json({ message: "Error removing patient" });
  }
};

// update patient medical information by doctors
export const updatePatientByDoctor = async (req, res) => {
  try {
    const { doctorId, patientId } = req.body;
    const { bloodGroup, allergies, diseases } = req.body;

    // 🔍 Find doctor
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    // 🔐 Check if patient is assigned
    if (!doctor.patients.includes(patientId)) {
      return res.status(403).json({
        message: "Not authorized to update this patient",
      });
    }

    // 🔄 Update patient
    const updatedPatient = await User.findByIdAndUpdate(
      patientId,
      {
        bloodGroup,
        allergies,
        diseases,
      },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Patient updated successfully",
      patient: updatedPatient,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};