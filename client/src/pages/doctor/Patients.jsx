import { useState, useEffect } from "react";
import { Pencil, Mail, Phone, User, Droplet, Search, X } from "lucide-react";
import EditPatientModal from "../../components/EditPatientModal";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const Patients = () => {

  const [patients, setPatients] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const { user } = useAppContext();

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setOpenModal(true);
  };

  const handleSave = async (updatedPatient) => {
    try {
      await axios.put(
        "http://localhost:5000/api/doctors/update-patient",
        {
          doctorId: user._id,          // 🔥 logged doctor
          patientId: updatedPatient._id,
          bloodGroup: updatedPatient.bloodGroup,
          allergies: updatedPatient.allergies,
          diseases: updatedPatient.diseases,
        }
      );

      toast.success("Patient updated successfully 🩺");

      fetchPatients(); // 🔥 refresh list

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update failed ❌"
      );
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/doctors/patients/${user._id}`
      );

      setPatients(res.data.patients);
      setFilteredPatients(res.data.patients);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchPatients();
    }
  }, [user]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredPatients(patients);
    } else {
      const filtered = patients.filter((p) =>
        p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.phone.includes(searchTerm)
      );
      setFilteredPatients(filtered);
    }
  }, [searchTerm, patients]);

  return (
    <div className="h-full flex flex-col">

      {/* 🔷 Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-700">
          My Patients
        </h2>

        <p className="text-sm text-gray-500">
          Total Patients: {filteredPatients.length}
        </p>
      </div>

      {/* 🔍 Search Bar */}
      <div className="w-full">
        <div className="relative flex items-center bg-white border border-gray-200 rounded-md shadow-sm px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400 transition">

          <Search size={18} className="text-gray-400 mr-2" />

          <input
            type="text"
            placeholder="Search by email, name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
          />

          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="ml-2 text-gray-400 hover:text-red-500 transition"
            >
              <X size={16} />
            </button>
          )}

        </div>
      </div>

      {/* 🔷 Scrollable Area */}
      <div className="flex-1 overflow-y-auto mt-10">

        <div className="flex flex-wrap gap-6">

          {filteredPatients.map((p) => (
            <div
              key={p._id}
              className="bg-white w-72 max-sm:w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >

              {/* 🔷 Top Banner */}
              <div className="h-20 bg-linear-to-r from-blue-600 to-indigo-500"></div>

              {/* 🔷 Profile Image */}
              <div className="flex justify-center -mt-10">
                <img
                  src={p.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                  alt="patient"
                  className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
                />
              </div>

              {/* 🔷 Content */}
              <div className="p-4 text-center space-y-3">

                {/* Name */}
                <h3 className="font-semibold text-gray-800 text-lg flex items-center justify-center gap-2">
                  <User size={16} className="text-gray-500" />
                  {p.fullName}
                </h3>

                {/* Blood Group Badge */}
                <span className="inline-flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium">
                  <Droplet size={12} />
                  Blood Group: {p.bloodGroup}
                </span>

                {/* Contact */}
                <div className="text-sm text-gray-500 space-y-2 mt-2">

                  <div className="flex items-center justify-center gap-2">
                    <Mail size={14} className="text-gray-400" />
                    <span>{p.email}</span>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <Phone size={14} className="text-gray-400" />
                    <span>{p.phone}</span>
                  </div>

                </div>

                {/* Divider */}
                <div className="border-t pt-3"></div>

                {/* Allergies */}
                <div>
                  <p className="text-xs text-gray-400 mb-1">Allergies</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {p.allergies.length > 0 ? (
                      p.allergies.map((a, i) => (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs"
                        >
                          {a}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">
                        None
                      </span>
                    )}
                  </div>
                </div>

                {/* Diseases */}
                <div>
                  <p className="text-xs text-gray-400 mb-1">Diseases</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {p.diseases.length > 0 ? (
                      p.diseases.map((d, i) => (
                        <span
                          key={i}
                          className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs"
                        >
                          {d}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">
                        None
                      </span>
                    )}
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={() => handleEdit(p)}
                  className="w-full mt-4 flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-indigo-500 text-white text-sm py-2 rounded-xl hover:opacity-90 active:scale-[0.98] transition"
                >
                  <Pencil size={14} />
                  Edit Medical Details
                </button>

              </div>
            </div>
          ))}

        </div>

        {/* Empty State */}
        {filteredPatients.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No patients assigned
          </p>
        )}

      </div>

      {/* 🔥 Modal */}
      <EditPatientModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        patient={selectedPatient}
        onSave={handleSave}
      />

    </div>
  );
};

export default Patients;