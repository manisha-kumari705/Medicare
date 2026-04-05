import Doctor from "../models/Doctor.js";
import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {
  try {
    const doctorsCount = await Doctor.countDocuments();
    const patientsCount = await User.countDocuments();

    res.status(200).json({
      doctors: doctorsCount,
      patients: patientsCount,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};