import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import MedicalCard from "../components/MedicalCard";
import { Upload } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const RegisterPage = () => {

  const { formData, setFormData } = useAppContext();

  const [allergyInput, setAllergyInput] = useState("");
  const [diseaseInput, setDiseaseInput] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
  const { name, value } = e.target;

  // 🔥 If DOB changes → calculate age
  if (name === "dob") {
    const birthDate = new Date(value);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust age if birthday hasn't come yet this year
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    setFormData({
      ...formData,
      dob: value,
      age: age.toString(), // store as string (since inputs are string-based)
    });

  } else {
    setFormData({
      ...formData,
      [name]: value,
    });
  }
};

  const handleImage = (e) => {
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

  const addItem = (type) => {
    if (type === "allergies" && allergyInput) {
      setFormData({
        ...formData,
        allergies: [...formData.allergies, allergyInput],
      });
      setAllergyInput("");
    }

    if (type === "diseases" && diseaseInput) {
      setFormData({
        ...formData,
        diseases: [...formData.diseases, diseaseInput],
      });
      setDiseaseInput("");
    }
  };
  const removeItem = (type, index) => {
  if (type === "allergies") {
    const updated = formData.allergies.filter((_, i) => i !== index);
    setFormData({ ...formData, allergies: updated });
  }

  if (type === "diseases") {
    const updated = formData.diseases.filter((_, i) => i !== index);
    setFormData({ ...formData, diseases: updated });
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Please upload your profile image 📸");
      return;
    }

    setLoading(true);

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.phone ||
      !formData.dob ||
      !formData.fullAddress
    ) {
      toast.error("Please fill all required fields ❌");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://medicare-backend-delta.vercel.app/api/users/register",
        formData
      );

      console.log(res.data);
      toast.success("Registered Successfully 🎉");
      setFormData({
        fullName: "",
        gender: "Male",
        dob: "",
        age: "",
        phone: "",
        email: "",
        password: "",
        fullAddress: "",
        bloodGroup: "",
        allergies: [],
        diseases: [],
        image: "",
      });
      setLoading(false);

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong ❌");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-linear-to-b from-blue-50 to-white px-4 md:px-10 py-10">

      {/* ================= TITLE ================= */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-900">
          Register & Create Your Profile
        </h1>
        <p className="text-gray-500 mt-3 text-sm md:text-base">
          Create a secure, encrypted medical profile by filling out your details below.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit} className="flex-1 bg-[#EEF9FF] p-8 rounded-3xl shadow-xl border border-gray-100">

          {/* Header */}
          <div className="flex-row md:flex justify-between items-center mb-8">
            <h3 className="text-2xl max-sm:text-center font-semibold text-gray-700 max-sm:mb-4">
              Personal Information
            </h3>

            <label className="flex items-center gap-2 max-sm:w-full bg-linear-to-r from-sky-500 to-indigo-500 text-white px-6 py-3 rounded-xl cursor-pointer text-sm hover:scale-105 transition">
              <Upload size={16} /> Upload Photo
              <input type="file" hidden onChange={handleImage} />
            </label>
          </div>

          {/* FORM GRID */}
          <div className="md:grid md:grid-cols-2 gap-6">

            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-600 max-sm:w-full">Full Name</label>
              <input
                name="fullName"
                value={formData.fullName}
                placeholder="Enter your name"
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-400 rounded-xl focus:ring-2 focus:ring-sky-400 outline-none transition"
              />
            </div>

            {/* Gender */}
            <div className="max-sm:my-4">
              <label className="font-medium text-gray-600 max-sm:w-full">Gender</label>
              <div className="flex items-center gap-6 mt-2 text-sm text-gray-600">
                <label className="flex gap-2 items-center cursor-pointer hover:text-sky-600">
                  <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} required/>
                  Male
                </label>
                <label className="flex gap-2 items-center cursor-pointer hover:text-pink-500">
                  <input type="radio" name="gender" value="Female" onChange={handleChange}/>
                  Female
                </label>
              </div>
            </div>

            {/* Email */}
            <div className="col-span-2 flex flex-col gap-2">
              <label className="font-medium text-gray-600 max-sm:w-full">Email Address</label>
              <input
                name="email"
                value={formData.email}
                required
                placeholder="Enter your email"
                onChange={handleChange}
                className="px-4 py-2 border border-gray-400 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition"
              />
            </div>

            {/* Password */}
            <div className="col-span-2 flex flex-col gap-2">
              <label className="font-medium text-gray-600 max-sm:w-full">Password</label>
              <input
                name="password"
                value={formData.password}
                type="password"
                required
                placeholder="Enter password"
                onChange={handleChange}
                className="px-4 py-2 border border-gray-400 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition"
              />
            </div>
            

            {/* DOB */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-600 max-sm:w-full">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                required
                onChange={handleChange}
                className="px-4 py-2 border border-gray-400 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2 max-sm:my-4">
              <label className="font-medium text-gray-600 max-sm:w-full">Mobile Number</label>
              <div className="flex w-full">
                <span className="px-3 flex items-center bg-gray-100 border border-gray-400 border-r-0 rounded-l-xl text-sm whitespace-nowrap">
                  +91
                </span>
                <input
                  name="phone"
                  value={formData.phone}
                  required
                  placeholder="Mobile Number"
                  onChange={handleChange}
                  className="flex-1 min-w-0 px-4 py-2 border border-gray-400 rounded-r-xl focus:ring-2 focus:ring-sky-400 outline-none"
                />
              </div>
            </div>

            {/* Full Address */}
            <div className="col-span-2 flex flex-col gap-2">
              <label className="font-medium text-gray-600 max-sm:w-full">Full Address</label>
              <input
                name="fullAddress"
                value={formData.fullAddress}
                required
                placeholder="Enter full address"
                onChange={handleChange}
                className="px-4 py-2 border border-gray-400 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition"
              />
            </div>

            {/* Blood Group */}
            <div className="flex flex-col gap-2 max-sm:my-4">
              <label className="font-medium text-gray-600 max-sm:w-full">Blood Group</label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-400 rounded-xl focus:ring-2 focus:ring-red-400 outline-none"
              >
                <option value="" disabled>Select your blood group</option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="O+">O+</option>
                <option value="AB+">AB+</option>
              </select>
            </div>
            {/* Allergies */}
            <div>
              <label className="font-medium text-gray-600 max-sm:w-full">Allergies</label>

              <div className="flex mt-2 gap-2 w-full">
                <input
                  value={allergyInput}
                  onChange={(e)=>setAllergyInput(e.target.value)}
                  placeholder="Add an allergy"
                  className="flex-1 min-w-0 px-4 py-2 border border-gray-400 rounded-l-xl focus:ring-2 focus:ring-sky-400 outline-none"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    addItem("allergies");
                  }}
                  className="bg-linear-to-r from-sky-500 to-indigo-500 text-white px-4 rounded-r-md text-sm hover:opacity-90 transition"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {formData.allergies.map((a,i)=>(
                  <span
                    key={i}
                    onClick={() => removeItem("allergies", i)}
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs hover:bg-blue-200 cursor-pointer transition"
                  >
                    {a} ✕
                  </span>
                ))}
              </div>
            </div>

            {/* Diseases */}
            <div className="col-span-2 max-sm:mt-4">
              <label className="font-medium text-gray-600 max-sm:w-full">Chronic Diseases</label>

              <div className="flex mt-2 gap-2 w-full">
                <input
                  value={diseaseInput}
                  onChange={(e)=>setDiseaseInput(e.target.value)}
                  placeholder="Add a disease"
                  className="flex-1 min-w-0 px-4 py-2 border border-gray-400 rounded-l-xl focus:ring-2 focus:ring-red-400 outline-none"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    addItem("diseases");
                  }}
                  className="bg-linear-to-r from-red-500 to-pink-500 text-white px-4 rounded-r-md text-sm hover:opacity-90 transition"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {formData.diseases.map((d,i)=>(
                  <span
                    key={i}
                    onClick={() => removeItem("diseases", i)}
                    className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs hover:bg-red-200 cursor-pointer transition"
                  >
                    {d} ✕
                  </span>
                ))}
              </div>
            </div>

          </div>
          <button className="w-full border-2 py-3 rounded-lg bg-indigo-500 border-indigo-500 text-white cursor-pointer" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
        </form>

        {/* ================= CARD ================= */}
        <div className="flex-1 flex justify-center">
          <div className="sticky top-24 w-full">
            <MedicalCard />
          </div>
        </div>
      </div>

    </div>
  );
};

export default RegisterPage;