import { useState, useEffect } from "react";
import { Users, Activity } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";

const Dashboard = () => {

  const { user } = useAppContext();

  const [stats, setStats] = useState({ totalPatients: 0,});

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/doctors/patients/${user._id}`
      );

      setStats({
        totalPatients: res.data.patients.length,
      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchStats();
    }
  }, [user]);

  return (
    <div className="space-y-6">

      {/* 🔷 Welcome Section */}
      <h2 className="text-2xl font-semibold text-gray-700">
        Welcome {user?.name || user?.fullName}
      </h2>

      {/* 🔷 Doctor Info Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border flex flex-col md:flex-row items-center gap-6">

        {/* Image */}
        <img
          src={user?.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
          alt="doctor"
          className="w-28 h-28 rounded-full object-cover"
        />

        {/* Info */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold text-gray-800">
            {user?.name || user?.fullName}
          </h3>

          <p className="text-gray-500 mt-1">
            Specialist: {user?.specialization || "Specialist"}
          </p>

          <p className="text-gray-600 mt-2 text-sm">
            {user?.email}
          </p>
        </div>
      </div>

      {/* 🔷 Stats Section */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Total Patients */}
        <div className="bg-white p-6 rounded-xl shadow-sm border flex items-center gap-4 hover:shadow-md transition">

          <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
            <Users size={24} />
          </div>

          <div>
            <h3 className="text-gray-600 text-sm">
              Total Patients
            </h3>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {stats.totalPatients}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;