import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  X,
  User,
  Mail,
  Stethoscope,
  UploadCloud
} from "lucide-react";

const AddDoctorModal = ({ open, onClose, onAdd }) => {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specification: "",
    image: "",
  });

  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 Image Upload Handler
  const handleImageUpload = (e) => {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result, // ✅ BASE64
      });
    };

    reader.readAsDataURL(file);
  }
};

  // 🔥 UPDATED FUNCTION (NO UI CHANGE)
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    // ✅ Check required fields
    if (!formData.name || !formData.email || !formData.password) {
      return toast.error("Please fill all required fields");
    }

    // 🔥 NEW: Image validation
    if (!formData.image) {
      return toast.error("Please upload doctor profile photo 🧑‍⚕️📸");
    }

    try {
      setLoading(true); // 🔥 START LOADING

      const res = await axios.post(
        "http://localhost:5000/api/doctors/add",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          specialization: formData.specification,
          image: formData.image,
        }
      );

      toast.success("Doctor Added Successfully 👨‍⚕️");

      onAdd({
        id: res.data.doctor._id,
        name: res.data.doctor.name,
        email: res.data.doctor.email,
        specification: res.data.doctor.specialization,
        image: res.data.doctor.image,
      });

      // Reset
      setFormData({
        name: "",
        email: "",
        password: "",
        specification: "",
        image: "",
      });

      onClose();

    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding doctor");
    } finally {
      setLoading(false); // 🔥 STOP LOADING
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">

      {/* Modal */}
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden">

        {/* 🔷 Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-linear-to-r from-sky-600 to-blue-500 text-white">
          <h3 className="text-lg font-semibold tracking-wide">
            Add New Doctor
          </h3>

          <button
            onClick={onClose}
            className="hover:bg-white/20 p-1 rounded-full transition"
          >
            <X />
          </button>
        </div>

        {/* 🔷 Body */}
        <div className="p-6 space-y-6">

          {/* IMAGE UPLOAD */}
          <div className="flex flex-col items-center gap-3">

            <div className="w-24 h-24 rounded-full border-4 border-sky-100 overflow-hidden shadow">
              <img
                src={formData.image ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="preview"
                className="w-full h-full object-cover"
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-sky-600 cursor-pointer hover:underline">
              <UploadCloud size={16} />
              Upload Profile Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

          </div>

          {/* FORM */}
          <div className="space-y-4">

            {/* Name */}
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-sky-400">
              <User size={16} className="text-gray-400" />
              <input
                name="name"
                placeholder="Doctor Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full outline-none text-sm"
              />
            </div>

            {/* Email */}
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-sky-400">
              <Mail size={16} className="text-gray-400" />
              <input
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full outline-none text-sm"
              />
            </div>

            {/* Password */}
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-sky-400">
              <User size={16} className="text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full outline-none text-sm"
              />
            </div>

            {/* Specialization */}
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-sky-400">
              <Stethoscope size={16} className="text-gray-400" />
              <input
                name="specification"
                placeholder="Specialization (e.g. Cardiology)"
                value={formData.specification}
                onChange={handleChange}
                className="w-full outline-none text-sm"
              />
            </div>

          </div>

        </div>

        {/* 🔷 Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm border hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="px-5 py-2 rounded-xl text-sm text-white bg-linear-to-r from-sky-600 to-blue-500 hover:opacity-90 transition"
          >
            {loading ? "Adding Doctor..." : "Add Doctor"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default AddDoctorModal;