import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Shield } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { loginHospital } = useAppContext();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.email || !form.password) {
      return toast.error("Please fill all fields");
      setLoading(false);
    }

    try {
      const res = await loginHospital(form.email, form.password);

      toast.success("Login Successful 🏥");
      setLoading(false);
      navigate("/hospital");

    } catch (error) {
      toast.error(error.message || "Login failed ❌");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-blue-50 to-white px-4">

      {/* 🔷 Main Container */}
      <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* 🔷 Left Section */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 p-6">
          <img
            src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
            alt="doctor"
            className="w-80 object-contain"
          />
        </div>

        {/* 🔷 Right Section */}
        <form onSubmit={handleSubmit} className="flex-1 p-8 md:p-10">

          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="bg-blue-100 p-4 rounded-full shadow-sm">
              <Shield className="text-blue-600" size={30} />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Hospital Admin Login
          </h2>

          <p className="text-sm text-gray-500 text-center mt-1 mb-8">
            Sign in as an admin to manage hospital data
          </p>

          {/* Email */}
          <div className="mb-5">
            <label className="text-sm text-gray-600 font-medium">
              Email Address
            </label>

            <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2 mt-2 focus-within:ring-2 focus-within:ring-blue-400 transition">
              <Mail size={18} className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="admin@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="w-full outline-none text-sm bg-transparent"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <div className="flex justify-between items-center">
              <label className="text-sm text-gray-600 font-medium">
                Password
              </label>
              <span className="text-sm text-blue-600 cursor-pointer hover:underline">
                Forgot Password?
              </span>
            </div>

            <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2 mt-2 focus-within:ring-2 focus-within:ring-blue-400 transition">
              <Lock size={18} className="text-gray-400 mr-2" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="w-full outline-none text-sm bg-transparent"
              />

              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className="text-gray-500 hover:text-blue-500 transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            disabled={loading}
            type="submit"
            className="w-full mt-6 bg-linear-to-r from-blue-600 to-blue-400 text-white py-2.5 rounded-xl font-medium hover:opacity-90 active:scale-[0.98] transition"
          >
            Login
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Are you not an admin?{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              Go to Homepage
            </span>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;