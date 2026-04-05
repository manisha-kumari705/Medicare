import Hospital from "../models/Hospital.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginHospital = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Check hospital email
    const hospital = await Hospital.findOne({ email });

    if (!hospital) {
      return res.status(404).json({
        message: "Hospital not registered",
      });
    }

    // 🔐 Match password
    const isMatch = await bcrypt.compare(password, hospital.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Wrong password",
      });
    }

    // 🎟️ Generate JWT
    const token = jwt.sign(
      { id: hospital._id, role: "hospital" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Hospital login successful",
      token,
      hospital,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};