import { QRCodeCanvas } from "qrcode.react";
import { useAppContext } from "../context/AppContext";
import { User, Phone, Mail, Droplet, Cake, MapPin   } from "lucide-react";

const MedicalCard = () => {
  const { formData } = useAppContext();

  return (
    <div className="w-full max-w-md mx-auto">

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">

        {/* ================= HEADER ================= */}
        <div className=" text-white px-5 py-3 text-center" style={{ background: "linear-gradient(to right, #1d4ed8, #4f46e5, #3b82f6)" }}>
          <h2 className="text-xs font-semibold tracking-wide">
            MediCard Health ID
          </h2>
          <p className="text-[10px] opacity-80">
            Government of India
          </p>
        </div>

        {/* ================= PROFILE ================= */}
        <div className="px-5 py-5 text-center">

          <img
            src={
              formData.image && formData.image.startsWith("blob:") ? formData.image
              : formData.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-blue-500 shadow"
          />

          <h2 className="text-lg font-semibold text-gray-800 mt-3">
            {formData.fullName || "Your Name"}
          </h2>

          {/* Divider */}
          <div className="w-full h-px bg-gray-200 mt-4"></div>

          {/* ================= DETAILS ================= */}
          <div className="mt-4 text-sm space-y-3 text-left">

            <div className="flex items-center gap-2">
              <Mail size={14} className="text-gray-500" />
              <span className="text-gray-500">Email</span>
              <span className="ml-auto font-medium text-gray-700 truncate max-w-35">
                {formData.email || "--"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={14} className="text-gray-500" />
              <span className="text-gray-500">Phone</span>
              <span className="ml-auto font-medium text-gray-700">
                {formData.phone || "--"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Cake size={14} className="text-gray-500" />
              <span className="text-gray-500">Age</span>
              <span className="ml-auto font-medium text-gray-700">
                {formData.age || "--"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <User size={14} className="text-gray-500" />
              <span className="text-gray-500">Gender</span>
              <span className="ml-auto font-medium text-gray-700">
                {formData.gender || "--"}
              </span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Droplet size={14} className="text-red-500" />
              <span className="text-gray-500">Blood Group</span>
              <span className="ml-auto font-semibold text-red-500">
                {formData.bloodGroup || "--"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-gray-500" />
              <span className="text-gray-500">Address</span>
              <span className="ml-auto font-medium text-gray-700">
                {formData.fullAddress || "--"}
              </span>
            </div>

          </div>
        </div>

        {/* ================= QR ================= */}
        <div className="bg-gray-50 border-t py-5 text-center">

          <div className="inline-block bg-white p-3 rounded-xl shadow">
            <QRCodeCanvas
              value={`https://medicare-iota-flame.vercel.app/patient/${formData._id}`}
              size={110}
            />
          </div>

          <p className="text-[11px] text-gray-500 mt-2">
            Scan to view medical details
          </p>
        </div>

      </div>
    </div>
  );
};

export default MedicalCard;