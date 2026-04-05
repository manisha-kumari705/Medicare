import React from "react";
import { ShieldCheck, WifiOff, Siren, Building2 } from "lucide-react";

const WhyChooseUs = () => {

  // 🔹 Data (Reusable)
  const features = [
    {
      title: "100% Data Security",
      desc: "Your information is encrypted and protected.",
      icon: ShieldCheck,
    },
    {
      title: "Offline Access",
      desc: "Access vital info without internet.",
      icon: WifiOff,
    },
    {
      title: "Emergency Ready",
      desc: "Instant medical info in emergencies.",
      icon: Siren,
    },
    {
      title: "Multi-Hospital Support",
      desc: "Compatible across all hospitals.",
      icon: Building2,
    },
  ];

  return (
    <section className="px-4 md:px-10 mt-10 lg:mt-20">

      {/* 🔷 Heading */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-bold text-blue-900">
          Why Choose Us?
        </h2>
        <p className="text-gray-500 mt-2">
          Your Health, Our Priority
        </p>
        <div className="w-20 h-1 bg-blue-600 mx-auto mt-3 rounded"></div>
      </div>

      {/* 🔷 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

        {features.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md lg:hover:-translate-y-1 transition duration-300"
            >
              {/* Icon */}
              <div className="bg-blue-100 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                <Icon className="text-blue-600" size={28} />
              </div>

              {/* Title */}
              <h3 className="font-semibold text-blue-900 text-lg">
                {item.title}
              </h3>

              {/* Divider */}
              <div className="w-10 h-0.5 bg-gray-200 mx-auto my-3"></div>

              {/* Description */}
              <p className="text-sm text-gray-500">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyChooseUs;