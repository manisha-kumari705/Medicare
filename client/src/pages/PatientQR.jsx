import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  User,
  Phone,
  Mail,
  MapPin,
  HeartPulse,
  Droplet,
  AlertTriangle
} from "lucide-react";

const PatientQR = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPatient = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/users/${id}`
      );
      setPatient(res.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatient();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading patient details...</p>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        Patient not found ❌
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">

      <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-4">
          <h2 className="text-lg font-semibold">
            MediCard Emergency Profile
          </h2>
          <p className="text-xs opacity-80">
            Scan Result
          </p>
        </div>

        {/* PROFILE */}
        <div className="p-5 text-center">

          <img
            src={patient.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500 shadow"
          />

          <h2 className="mt-3 text-xl font-semibold text-gray-800">
            {patient.fullName}
          </h2>

          <div className="mt-4 border-t"></div>

          {/* DETAILS */}
          <div className="mt-4 space-y-3 text-sm text-left">

            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span>{patient.email}</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>{patient.phone}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={14} />
              <span>{patient.fullAddress}</span>
            </div>

            <div className="flex items-center gap-2 text-red-500 font-semibold">
              <Droplet size={14} />
              <span>Blood Group: {patient.bloodGroup}</span>
            </div>

          </div>

          {/* MEDICAL */}
          <div className="mt-5">

            <h3 className="text-md font-semibold flex items-center gap-2 text-gray-700">
              <HeartPulse size={16} />
              Medical Info
            </h3>

            <div className="mt-3 space-y-2 text-sm">

              <div className="bg-red-50 p-3 rounded-lg">
                <p className="font-medium text-red-600 flex items-center gap-2">
                  <AlertTriangle size={14} />
                  Diseases
                </p>
                <p className="text-gray-700">
                  {patient.diseases?.length
                    ? patient.diseases.join(", ")
                    : "None"}
                </p>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="font-medium text-blue-600">
                  Allergies
                </p>
                <p className="text-gray-700">
                  {patient.allergies?.length
                    ? patient.allergies.join(", ")
                    : "None"}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* FOOTER */}
        <div className="bg-gray-50 text-center text-xs text-gray-500 py-2">
          MediCard • Emergency Access Only
        </div>

      </div>
    </div>
  );
};

export default PatientQR;