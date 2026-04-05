import { useState, useEffect  } from "react";
import { Pencil, Trash2, Mail, Phone, User, Droplet, Search, X } from "lucide-react";
import EditPatientModal from "../../components/EditPatientModal";
import axios from "axios";
import toast from "react-hot-toast";

const Patients = () => {

  const [patients, setPatients] = useState([]);

  const [searchEmail, setSearchEmail] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const removePatient = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://medicare-backend-delta.vercel.app/api/users/delete/${id}`
      );

      toast.success("Patient removed successfully 🗑️");

      fetchPatients();

    } catch (error) {
      toast.error("Failed to delete ❌");
    }
  };

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setOpenModal(true);
  };

  const handleSave = async (updatedPatient) => {
    try {
      const res = await axios.put(
        `https://medicare-backend-delta.vercel.app/api/users/update-medical/${updatedPatient._id}`,
        {
          bloodGroup: updatedPatient.bloodGroup,
          allergies: updatedPatient.allergies,
          diseases: updatedPatient.diseases,
        }
      );

      toast.success("Updated successfully ✏️");

      fetchPatients();

    } catch (error) {
      toast.error("Update failed ❌");
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await axios.get(
        "https://medicare-backend-delta.vercel.app/api/users/all"
      );

      setPatients(res.data.users);
      setFilteredPatients(res.data.users);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    if (!searchEmail) {
      setFilteredPatients(patients);
    } else {
      const filtered = patients.filter((p) =>
        p.email.toLowerCase().includes(searchEmail.toLowerCase())
      );
      setFilteredPatients(filtered);
    }
  }, [searchEmail, patients]);

  return (
    <div className="h-full flex flex-col">

      {/* 🔷 Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-700">
          Patients List
        </h2>

        <p className="text-sm text-gray-500">
          Total Patients: {filteredPatients.length}
        </p>
      </div>

      {/* 🔍 Search Bar */}
      <div className="w-full mt-2">
        <div className="relative flex items-center bg-white border border-gray-200 rounded-md shadow-sm px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400 transition">

          {/* 🔍 Search Icon */}
          <Search size={18} className="text-gray-400 mr-2" />

          {/* 🔤 Input */}
          <input
            type="text"
            placeholder="Search by email..."
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
          />

          {/* ❌ Clear Button */}
          {searchEmail && (
            <button
              onClick={() => setSearchEmail("")}
              className="ml-2 text-gray-400 hover:text-red-500 transition"
            >
              <X size={16} />
            </button>
          )}
          
        </div>
      </div>

      {/* 🔷 Scrollable Area */}
      <div className="flex-1 overflow-y-auto mt-10">

        <div className="flex flex-wrap gap-4">

          {filteredPatients.map((p) => (
            <div
              key={p._id}
              className="bg-white w-72 rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >

              {/* 🔷 Top Banner */}
              <div className="bg-linear-to-r from-blue-600 to-indigo-500 h-20 relative">
                <img
                  src={p.image|| "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                  alt="patient"
                  className="w-20 h-20 rounded-full border-4 border-white object-cover absolute left-1/2 -bottom-10 transform -translate-x-1/2 shadow"
                />
              </div>

              {/* 🔷 Content */}
              <div className="pt-12 px-4 pb-4 space-y-3 text-center">

                {/* Name */}
                <h3 className="font-semibold text-gray-800 text-lg flex items-center justify-center gap-2">
                  <User size={16} className="text-gray-500" />
                  {p.fullName}
                </h3>

                {/* Blood Group */}
                <span className="inline-flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium">
                  <Droplet size={12} />
                  Blood Group: {p.bloodGroup}
                </span>

                {/* Contact */}
                <div className="text-sm text-gray-600 space-y-2 mt-2">

                  <div className="flex items-center justify-center gap-2">
                    <Mail size={14} className="text-gray-400" />
                    <span className="truncate">{p.email}</span>
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
                    {p.allergies.map((a, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Diseases */}
                <div>
                  <p className="text-xs text-gray-400 mb-1">Diseases</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {p.diseases.map((d, i) => (
                      <span
                        key={i}
                        className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 mt-4">

                  <button
                    onClick={() => handleEdit(p)}
                    className="flex-1 flex items-center justify-center gap-2 border text-sm text-blue-500 border-gray-200 hover:bg-blue-50 transition px-3 py-2 rounded-xl"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>

                  <button
                    onClick={() => removePatient(p._id)}
                    className="flex-1 flex items-center justify-center gap-2 border text-sm text-red-500 border-gray-200 hover:bg-red-50 transition px-3 py-2 rounded-xl"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>

        {filteredPatients.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No patients found
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