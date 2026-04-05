import React from "react";
import {
  UserPlus,
  FileText,
  QrCode,
  ArrowRight,
  Users,
  Building2,
  Stethoscope,
  Clock,
} from "lucide-react";

const WorkFlow = () => {

  // 🔹 Steps Data
  const steps = [
    {
      id: "01",
      title: "Register / Login",
      desc: "Create your account as a patient, doctor, or hospital.",
      icon: UserPlus,
    },
    {
      id: "02",
      title: "Add Medical Details",
      desc: "Enter your blood group, allergies, diseases & other data.",
      icon: FileText,
    },
    {
      id: "03",
      title: "Generate QR Card",
      desc: "Get your encrypted QR code & carry it anywhere.",
      icon: QrCode,
    },
  ];

  // 🔹 Stats Data
  const stats = [
    {
      value: "5000+",
      label: "Patients Registered",
      icon: Users,
    },
    {
      value: "120+",
      label: "Hospitals Connected",
      icon: Building2,
    },
    {
      value: "800+",
      label: "Doctors Using",
      icon: Stethoscope,
    },
    {
      value: "24/7",
      label: "Emergency Ready",
      icon: Clock,
    },
  ];

  return (
    <section className="px-4 md:px-10 mt-10 lg:mt-20">

      {/* 🔷 Heading */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-bold text-blue-900">
          How It Works
        </h2>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Simple, fast & secure — Access medical information in just 3 steps
        </p>
      </div>

      {/* 🔷 Steps Section */}
      <div className="flex flex-col md:flex-row items-center gap-6">

        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <React.Fragment key={index}>

              {/* Step Card */}
              <div className="flex-1 bg-[#EEF9FF]  rounded-xl shadow-sm p-6 text-center hover:shadow-md lg:hover:-mt-3 duration-300">

                <div className="bg-blue-100 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                  <Icon className="text-blue-600" size={28} />
                </div>

                <div className="text-blue-600 font-bold mb-2">
                  {step.id}
                </div>

                <h3 className="font-semibold text-blue-900">
                  {step.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  {step.desc}
                </p>
              </div>

              {/* Arrow (except last) */}
              {index !== steps.length - 1 && (
                <ArrowRight className="hidden md:block text-gray-400" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* 🔷 Stats Section */}
      <div className="mt-10 bg-white rounded-xl shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex items-center gap-4 bg-[#EEF9FF] py-6 px-4 rounded-md justify-center md:justify-start"
            >
              <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                <Icon size={24} />
              </div>

              <div>
                <h4 className="text-lg font-bold text-blue-900">
                  {item.value}
                </h4>
                <p className="text-sm text-gray-500">
                  {item.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WorkFlow;