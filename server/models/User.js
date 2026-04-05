import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // 🔹 Basic Info
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true, // ✅ UNIQUE EMAIL
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    age: {
      type: Number, // store as number (better for queries)
    },

    // 🔹 Contact Info
    phone: {
      type: String,
      required: true,
    },

    fullAddress: {
      type: String,
      required: true,
    },

    // 🔹 Medical Info
    bloodGroup: {
      type: String,
      enum: ["A+", "B+", "O+", "AB+"],
    },

    allergies: {
      type: [String], // ✅ ARRAY
      default: [],
    },

    diseases: {
      type: [String], // ✅ ARRAY
      default: [],
    },

    // 🔹 Profile Image
    image: {
      type: String, // URL or base64
    },

    // 🔥 QR CODE (VERY IMPORTANT FEATURE)
    qrCode: {
      type: String, // store QR image URL OR base64
    },

    // 🔐 Role (future use)
    role: {
      type: String,
      enum: ["user", "doctor", "hospital"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;