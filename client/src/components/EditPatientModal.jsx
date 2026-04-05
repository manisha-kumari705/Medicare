import React, { useState, useEffect } from "react";
import { X, User, Mail, Phone, Droplet, HeartPulse, Stethoscope } from "lucide-react";

const EditPatientModal = ({ open, onClose, patient, onSave }) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bloodGroup: "",
    allergies: "",
    diseases: "",
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.fullName, // 🔥 FIXED
        email: patient.email,
        phone: patient.phone,
        bloodGroup: patient.bloodGroup,
        allergies: (patient.allergies || []).join(", "),
        diseases: (patient.diseases || []).join(", "),
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const updatedData = {
      ...patient,
      bloodGroup: formData.bloodGroup,
      allergies: formData.allergies.split(",").map((a) => a.trim()),
      diseases: formData.diseases.split(",").map((d) => d.trim()),
    };

    onSave(updatedData);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">

      {/* Modal */}
      <div className="bg-white w-full max-w-3xl h-[75vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden">

        {/* 🔷 Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-linear-to-r from-sky-600 to-blue-500 text-white">
          <h3 className="text-lg font-semibold tracking-wide">
            Edit Patient Details
          </h3>

          <button
            onClick={onClose}
            className="hover:bg-white/20 p-1 rounded-full transition"
          >
            <X />
          </button>
        </div>

        {/* 🔷 Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

          {/* PERSONAL DETAILS */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <User size={16} /> Personal Information
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="flex items-center gap-2 border rounded-xl px-3 py-2 bg-gray-50">
                <User size={14} className="text-gray-400" />
                <input value={formData.name} disabled className="w-full bg-transparent outline-none text-sm" />
              </div>

              <div className="flex items-center gap-2 border rounded-xl px-3 py-2 bg-gray-50">
                <Mail size={14} className="text-gray-400" />
                <input value={formData.email} disabled className="w-full bg-transparent outline-none text-sm" />
              </div>

              <div className="flex items-center gap-2 border rounded-xl px-3 py-2 bg-gray-50">
                <Phone size={14} className="text-gray-400" />
                <input value={formData.phone} disabled className="w-full bg-transparent outline-none text-sm" />
              </div>

              <div className="flex items-center gap-2 border rounded-xl px-3 py-2 bg-gray-50">
                <Droplet size={14} className="text-red-400" />
                <input value={formData.bloodGroup} className="w-full bg-transparent outline-none text-sm" />
              </div>

            </div>
          </div>

          {/* MEDICAL DETAILS */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <HeartPulse size={16} /> Medical Information
            </h4>

            <div className="space-y-4">

              {/* Diseases */}
              <div>
                <label className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                  <HeartPulse size={12} /> Diseases
                </label>

                <textarea
                  name="diseases"
                  value={formData.diseases}
                  onChange={handleChange}
                  placeholder="Enter diseases (comma separated)"
                  className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-red-400 outline-none transition"
                />
              </div>

              {/* Allergies */}
              <div>
                <label className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                  <Stethoscope size={12} /> Allergies
                </label>

                <textarea
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="Enter allergies (comma separated)"
                  className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-sky-400 outline-none transition"
                />
              </div>

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
            onClick={handleSubmit}
            className="px-5 py-2 rounded-xl text-sm text-white bg-linear-to-r from-sky-600 to-blue-500 hover:opacity-90 transition"
          >
            Save Changes
          </button>

        </div>

      </div>
    </div>
  );
};

export default EditPatientModal;