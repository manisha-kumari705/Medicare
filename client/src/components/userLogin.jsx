import React, { useState } from "react";
import { Mail, Lock, X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const UserLogin = ({ show, setShow }) => {

  const { setUser, setFormData  } = useAppContext();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  if (!show) return null; // ✅ Hide if not open

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await axios.post(
      "http://localhost:5000/api/users/login",
      data
    );

    // ✅ Save token
    localStorage.setItem("token", res.data.token);

    // ✅ Save user data
    localStorage.setItem("userData", JSON.stringify(res.data.user));

    // ✅ Update context
    setUser(res.data.user);
    setFormData(res.data.user);

    toast.success("Login Successful 🎉");

    setShow(false);

  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed ❌");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* 🔥 BACKDROP */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setShow(false)}
      ></div>

      {/* 🔥 MODAL */}
      <div className="relative bg-white w-[90%] max-w-md p-6 rounded-2xl shadow-xl z-10 animate-scaleIn">

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X />
        </button>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          User Login
        </h2>

        {/* FORM */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">

  {/* EMAIL */}
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-600">
      Email Address
    </label>

    <div className="flex items-center border border-gray-300 rounded-lg px-3 h-11 gap-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition">
      <Mail size={18} className="text-gray-400" />
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={data.email}
        onChange={handleChange}
        required
        className="w-full outline-none text-gray-700 placeholder-gray-400 text-sm"
      />
    </div>
  </div>

  {/* PASSWORD */}
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-600">
      Password
    </label>

    <div className="flex items-center border border-gray-300 rounded-lg px-3 h-11 gap-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition">
      <Lock size={18} className="text-gray-400" />
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={data.password}
        onChange={handleChange}
        required
        className="w-full outline-none text-gray-700 placeholder-gray-400 text-sm"
      />
    </div>
  </div>

  {/* BUTTON */}
  <button
    type="submit"
    disabled={loading}
    className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white h-11 rounded-lg font-medium tracking-wide hover:opacity-90 transition active:scale-95 disabled:opacity-70"
  >
    {loading ? "Logging in..." : "Login"}
  </button>

</form>
      </div>
    </div>
  );
};

export default UserLogin;