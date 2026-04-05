import React from "react";
import { ShieldCheck, Stethoscope, HeartPulse } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  // 🔹 Features Data
  const features = [
    {
      title: "100% Secure",
      desc: "Your data is fully encrypted.",
      icon: ShieldCheck,
    },
    {
      title: "Easy Access",
      desc: "Access your info anytime.",
      icon: Stethoscope,
    },
    {
      title: "For Patients & Doctors",
      desc: "Designed for all healthcare needs.",
      icon: HeartPulse,
    },
  ];

  return (
    <section className="px-4 py-10 md:px-10 bg-[#EEF9FF]">

      {/* 🔷 Hero Main */}
      <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 flex flex-col md:flex-row items-center gap-10">

        {/* 🔹 Left Content */}
        <div className="flex-1 text-center md:text-left">

          <h1 className="text-3xl md:text-5xl font-bold text-blue-900 leading-tight">
            Secure Your Health Data <br /> with Ease
          </h1>

          <p className="mt-4 text-gray-600 text-sm md:text-base max-w-md mx-auto md:mx-0">
            Create, access, and manage your medical profile securely
            with our encrypted QR code system.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <button onClick={()=> navigate('/register')} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition cursor-pointer">
              Register
            </button>
            <button onClick={()=> navigate('/card')} className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md transition cursor-pointer">
              My Medical Card
            </button>
          </div>
        </div>

        {/* 🔹 Right Image */}
        <div className="flex-1 flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            alt="medical"
            className="w-64 md:w-96"
          />
        </div>
      </div>

      {/* 🔷 Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 md:mt-10">

        {features.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 hover:shadow-md lg:hover:-mt-3 duration-300"
            >
              <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                <Icon size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Hero;