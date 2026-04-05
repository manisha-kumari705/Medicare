import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import QRCode from "qrcode";
import cloudinary from "../config/cloudinary.js";

// ================= REGISTER USER =================
export const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      gender,
      dob,
      age,
      phone,
      fullAddress,
      bloodGroup,
      allergies,
      diseases,
      image,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    if (!fullName || !email || !password || !phone || !dob || !fullAddress) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔥 CLOUDINARY UPLOAD
    let imageUrl = "";

    if (image) {
      const uploaded = await cloudinary.uploader.upload(image, {
        folder: "medicard_users",
      });

      imageUrl = uploaded.secure_url;
    }

    // ✅ CREATE USER WITH CLOUDINARY IMAGE
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      gender: gender || "Male",
      dob,
      age: age || "",
      phone,
      fullAddress,
      ...(bloodGroup && { bloodGroup }),
      allergies: Array.isArray(allergies) ? allergies : [],
      diseases: Array.isArray(diseases) ? diseases : [],
      image: imageUrl,
    });

    const savedUser = await user.save();

    const qrCode = await QRCode.toDataURL(savedUser._id.toString(), {
      width: 500,
      margin: 3,
      errorCorrectionLevel: "H",
    });

    savedUser.qrCode = qrCode;
    await savedUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: savedUser,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= LOGIN USER =================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Check email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not registered" });
    }

    // 🔐 Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // 🎟️ Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// fetch all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      users,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// update medical details 
export const updateMedicalDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { bloodGroup, allergies, diseases } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        bloodGroup,
        allergies,
        diseases,
      },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Medical details updated",
      user: updatedUser,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔥 Get patient by ID (QR)
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    res.status(200).json({
      user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};