import { useState, useEffect  } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Trash2,
  UserPlus,
  UserCheck,
  X,
  Mail,
  User,
  Stethoscope,
  Phone,
  HeartPulse,
  Search,
} from "lucide-react";
import AddDoctorModal from "../../components/AddDoctorModal";

const Doctors = () => {

  const [openAddModal, setOpenAddModal] = useState(false);

  const [searchEmail, setSearchEmail] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const [patientSearch, setPatientSearch] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);

  const handleAddDoctor = () => {
    fetchDoctors(); // 🔥 refresh from DB
  };
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/doctors/all"
      );

      setDoctors(res.data.doctors);
      setFilteredDoctors(res.data.doctors);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (!searchEmail) {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter((doc) =>
        doc.email.toLowerCase().includes(searchEmail.toLowerCase())
      );
      setFilteredDoctors(filtered);
    }
  }, [searchEmail, doctors]);

  //  Patients 
  const [patients, setPatients] = useState([]);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const removeDoctor = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/doctors/delete/${id}`
      );

      toast.success("Doctor removed successfully 🗑️");

      fetchDoctors(); // 🔥 refresh list

    } catch (error) {
      console.log(error);
      toast.error("Failed to delete doctor ❌");
    }
  };

  // fetch patients
  const fetchPatients = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users/all"
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
    if (!patientSearch) {
      setFilteredPatients(patients);
    } else {
      const filtered = patients.filter((p) =>
        p.email.toLowerCase().includes(patientSearch.toLowerCase()) ||
        p.fullName.toLowerCase().includes(patientSearch.toLowerCase())
      );
      setFilteredPatients(filtered);
    }
  }, [patientSearch, patients]);

  const assignPatient = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenModal(true);
  };

  const handleAssign = async (patient) => {
    try {
      await axios.post(
        "http://localhost:5000/api/doctors/assign",
        {
          doctorId: selectedDoctor._id,
          patientId: patient._id,
        }
      );

      toast.success("Patient assigned successfully 👨‍⚕️");

      // ✅ REFRESH DATA
      await fetchDoctors();

      // update selected doctor also
      const updatedDoctor = doctors.find(d => d._id === selectedDoctor._id);
      setSelectedDoctor(updatedDoctor);
      setOpenModal(false);

    } catch (error) {
      toast.error(error.response?.data?.message || "Error assigning patient");
    }
  };

  const handleRemove = async (patientId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/doctors/remove-patient",
        {
          doctorId: selectedDoctor._id,
          patientId,
        }
      );

      toast.success("Patient removed successfully ❌");

      // ✅ REFETCH
      await fetchDoctors();

      const updatedDoctor = doctors.find(d => d._id === selectedDoctor._id);
      setSelectedDoctor(updatedDoctor);
      setOpenModal(false);

    } catch (err) {
      console.error(err);
    }
  };

  // check patient already assigned 
  const isPatientAssigned = (patientId) => {
    return selectedDoctor?.patients?.some(
      (id) => id.toString() === patientId
    );
  };


  return (
    <div className="h-full flex flex-col">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-700">
          Doctors List
        </h2>

        <button onClick={() => setOpenAddModal(true)} className="flex items-center gap-2 bg-linear-to-r from-sky-600 to-blue-500 text-white px-4 py-2 rounded-xl hover:opacity-90 transition">
          <UserPlus size={18} />
          Add Doctor
        </button>
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


      {/* DOCTOR CARDS */}
      <div className="flex-1 overflow-y-auto mt-10">
        <div className="flex flex-wrap gap-6">

          {filteredDoctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white w-64 rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition"
            >

              {/* Banner */}
              <div className="bg-linear-to-r from-sky-600 to-blue-500 h-20 relative">
                <img
                  src={doc.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                  className="w-20 h-20 rounded-full border-4 border-white object-cover absolute left-1/2 -bottom-10 -translate-x-1/2 shadow"
                />
              </div>

              {/* Content */}
              <div className="pt-12 px-4 pb-5 text-center space-y-3">

                <h3 className="font-semibold text-gray-800 text-lg flex items-center justify-center gap-2">
                  <User size={16} />
                  {doc.name}
                </h3>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Mail size={14} />
                  {doc.email}
                </div>

                <span className="inline-flex items-center gap-1 bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-xs font-medium">
                  <Stethoscope size={12} />
                  {doc.specialization}
                </span>

                <div className="border-t pt-3"></div>

                <div className="space-y-2">

                  <button
                    onClick={() => assignPatient(doc)}
                    className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-xl text-sm hover:bg-green-600"
                  >
                    <UserCheck size={14} />
                    Assign Patient
                  </button>

                  <button
                    onClick={() => removeDoctor(doc._id)}
                    className="w-full flex items-center justify-center gap-2 border text-red-500 border-gray-200 py-2 rounded-xl text-sm hover:bg-red-50"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>
      </div>

      {/* MODAL */}
      {openModal && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

    <div className="bg-white w-[85%] h-[75vh] rounded-2xl p-6 flex flex-col shadow-xl">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-3 border-b pb-3">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <UserCheck size={18} className="text-green-500" />
          Assign Patient
        </h3>

        <button
          onClick={() => setOpenModal(false)}
          className="p-1 rounded-md hover:bg-gray-100 transition"
        >
          <X size={18} />
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Assign patient to{" "}
        <span className="font-semibold text-gray-700">
          {selectedDoctor?.name}
        </span>
      </p>

      {/* 🔍 SEARCH */}
      <div className="w-full mb-4">
        <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-md px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition">

          <Search size={18} className="text-gray-400 mr-2" />

          <input
            type="text"
            placeholder="Search patient by email or name..."
            value={patientSearch}
            onChange={(e) => setPatientSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
          />

          {patientSearch && (
            <button
              onClick={() => setPatientSearch("")}
              className="ml-2 text-gray-400 hover:text-red-500 transition"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* PATIENT CARDS */}
      <div className="flex-1 overflow-y-auto pr-2">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {filteredPatients.map((p) => (
            <div
            key={p._id}
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300"
          >

            {/* 🔷 PROFILE IMAGE */}
            <div className="flex justify-center">
              <img
                src={p.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                className="w-20 h-20 rounded-full object-cover border-4 border-blue-500 shadow"
              />
            </div>

            {/* 🔷 NAME */}
            <h3 className="text-center mt-3 text-lg font-semibold text-gray-800">
              {p.fullName}
            </h3>

            {/* 🔷 CONTACT + AGE */}
            <div className="flex justify-between items-center mt-4 text-sm text-gray-600">

              <div className="flex items-center gap-1">
                <Phone size={14} className="text-gray-400" />
                <span>{p.phone}</span>
              </div>

              <div className="flex items-center gap-1">
                <User size={14} className="text-gray-400" />
                <span>{p.age} yrs</span>
              </div>

            </div>

            {/* 🔷 EMAIL */}
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
              <Mail size={12} />
              <span className="truncate">{p.email}</span>
            </div>

            {/* 🔷 DIVIDER */}
            <div className="border-t mt-4 pt-3"></div>

            {/* 🔷 DISEASES */}
            <div className="mt-2">
              <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mb-1">
                <HeartPulse size={12} />
                Diseases
              </p>

              <div className="flex flex-wrap gap-2">
                {p.diseases?.length ? (
                  p.diseases.map((d, i) => (
                    <span
                      key={i}
                      className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs"
                    >
                      {d}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-xs">None</span>
                )}
              </div>
            </div>

            {/* 🔷 ALLERGIES */}
            <div className="mt-3">
              <p className="text-xs font-semibold text-blue-500 flex items-center gap-1 mb-1">
                <Stethoscope size={12} />
                Allergies
              </p>

              <div className="flex flex-wrap gap-2">
                {p.allergies?.length ? (
                  p.allergies.map((a, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs"
                    >
                      {a}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-xs">None</span>
                )}
              </div>
            </div>

            {/* 🔷 ACTION BUTTON */}
            {isPatientAssigned(p._id) ? (
              <button
                onClick={() => handleRemove(p._id)}
                className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm transition"
              >
                Remove Doctor
              </button>
            ) : (
              <button
                className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm transition"
                onClick={() => handleAssign(p)}
              >
                Assign Doctor
              </button>
            )}

          </div>
          ))}

        </div>

        {/* EMPTY STATE */}
        {filteredPatients.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No patients found
          </p>
        )}

      </div>

    </div>
  </div>
)}
      {filteredDoctors.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No doctors found
        </p>
      )}
      <AddDoctorModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAdd={handleAddDoctor}
      />

    </div>
  );
};

export default Doctors;