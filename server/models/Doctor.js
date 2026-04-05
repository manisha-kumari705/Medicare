import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    // 🔹 Basic Info
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true, // ✅ no duplicate doctor
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // 🔹 Professional Info
    specialization: {
      type: String,
      required: true,
    },

    // 🔹 Patients assigned to doctor
    patients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // 🔥 linking patient (User model)
      },
    ],

    // 🔹 Profile Image
    image: {
      type: String,
      default:
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },

    // 🔹 Role (VERY IMPORTANT)
    role: {
      type: String,
      default: "doctor",
    },

    // 🔹 Which hospital this doctor belongs to (🔥 VERY IMPORTANT)
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
    },

    // 🔹 Status (optional but useful)
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;